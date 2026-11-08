import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "@supabase/supabase-js";

import { isCloudinaryConfigured } from "./cloudinary.ts";
import { handleDeleteImages, handleSignUpload } from "./cloudinary-actions.ts";
import { handleCreateProduct } from "./create-product.ts";
import { handleDeleteProduct } from "./delete-product.ts";
import { corsHeaders, isRecord, jsonResponse } from "./http.ts";
import { handleUpdateProduct } from "./update-product.ts";

type ProductAction = (body: Record<string, unknown>) => Promise<Response>;

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase function environment is incomplete.");
    return jsonResponse(
      { error: "Product management is not configured yet." },
      500,
    );
  }

  const token = request.headers
    .get("Authorization")
    ?.replace(/^Bearer\s+/i, "");
  if (!token) {
    return jsonResponse({ error: "Please sign in as an administrator." }, 401);
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: userData, error: userError } = await supabase.auth.getUser(
    token,
  );
  if (userError || !userData.user) {
    return jsonResponse(
      { error: "Your session is invalid. Please sign in again." },
      401,
    );
  }
  if (userData.user.app_metadata["role"] !== "admin") {
    return jsonResponse({ error: "Administrator access is required." }, 403);
  }

  const body = await parseRequestBody(request);
  if (!body) {
    return jsonResponse({ error: "Invalid request." }, 400);
  }

  const actions: Record<string, ProductAction> = {
    "sign-upload": (value) => handleSignUpload(supabase, value),
    "delete-images": handleDeleteImages,
    "create-product": (value) => handleCreateProduct(supabase, value),
    "update-product": (value) => handleUpdateProduct(supabase, value),
    "delete-product": (value) => handleDeleteProduct(supabase, value),
  };

  const action = body["action"];
  if (typeof action !== "string" || !actions[action]) {
    return jsonResponse({ error: "Unknown product action." }, 400);
  }

  try {
    return await actions[action](body);
  } catch (error) {
    console.error(`Product action "${action}" failed:`, error);
    return jsonResponse({
      error: "The product request could not be completed.",
    }, 500);
  }
});

async function parseRequestBody(
  request: Request,
): Promise<Record<string, unknown> | null> {
  try {
    const body: unknown = await request.json();
    return isRecord(body) ? body : null;
  } catch {
    return null;
  }
}
