export interface CartItem {
  id: string;
  title: string;
  price: number;
}

export function buildMetadataItems(items: CartItem[]) {
  return items.map((item) => ({
    product_id: item.id,
    title: item.title,
    price: item.price,
  }));
}

export function validateCartPrices(cartItems: CartItem[], dbProducts: any[]) {
  const priceMap = new Map(dbProducts.map((p) => [p.id, p.price]));

  return cartItems.map((item) => {
    const dbPrice = priceMap.get(item.id);

    if (!dbPrice || dbPrice !== item.price) {
      throw new Error(`Price validation failed for product ${item.id}`);
    }

    return {
      product_id: item.id,
      title: item.title,
      price: dbPrice,
      quantity: 1
    };
  });
}
