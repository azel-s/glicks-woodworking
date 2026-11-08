import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { SupabaseService } from './supabase-service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private supabaseService: SupabaseService) {}

  async getAdminEmail(): Promise<string> {
    return 's.4bbas@gmail.com';
  }

  async getAdminPhone(): Promise<string> {
    return '6302478811';
  }
}
