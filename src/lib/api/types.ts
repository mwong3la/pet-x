// User Types
export interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  phone: string;
}

export interface LoginResponse {
  token?: string;
  user?: User;
  [key: string]: any;
}

// Product Types
export interface Product {
  id: number;
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  [key: string]: any;
}

// Order Types
export interface OrderItem {
  productId: number;
  quantity: number;
  [key: string]: any;
}

export interface CreateOrderRequest {
  products: OrderItem[];
  userId: number;
}

export interface Order {
  id: number;
  orderItems: OrderItem[];
  orderStatus: number; // 0 = pending, 1 = processing, 2 = shipped, 3 = delivered, etc.
  paymentStatus: number; // 0 = pending, 1 = paid, 2 = failed, etc.
  stripeSessionId: string | null;
  paymentIntentId: string | null;
  userId: number;
  total: number;
  createdAt?: string;
  [key: string]: any;
}

// Payment Types
export interface PaymentRequest {
  userId: number;
  amount: number;
  successURL: string;
  cancelURL: string;
}

export interface PaymentHistory {
  id: number;
  userId: number;
  amount: number;
  status?: string;
  createdAt?: string;
  [key: string]: any;
}

