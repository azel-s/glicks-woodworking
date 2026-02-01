export type OrderStatus = 'pending' | 'paid' | 'cancelled';

export interface Order {
  id: string;
  stripe_session_id?: string;
  email: string;
  price: number;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
}