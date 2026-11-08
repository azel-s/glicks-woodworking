import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase-service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private supabaseService: SupabaseService) {}

  async getContactEmail(): Promise<string> {
    return 'glickswoodworkingco@gmail.com';
  }

  async getContactPhone(): Promise<string> {
    return '9376218382';
  }
}
