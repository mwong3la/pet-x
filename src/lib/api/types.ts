// User Types
export interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
  role?: number; // 1 = user, 2 = admin
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
  image?: string; // Legacy support
  imageURL?: string; // New field from backend
  [key: string]: any;
}

// Order Types
export interface OrderItem {
  productId: number;
  quantity: number;
  productName?: string; // From order details response
  unitPrice?: number; // From order details response
  [key: string]: any;
}

export interface CreateOrderRequest {
  products: OrderItem[];
  userId: number;
}

export interface Order {
  id: number;
  orderItems?: OrderItem[]; // Legacy support
  items?: OrderItem[]; // New field from order details response
  orderStatus: number; // 1 = Pending, 2 = Paid, 3 = Processing, 4 = Shipped, 5 = Delivered, 6 = Cancelled, 7 = Refunded, 8 = Failed, 9 = Returned
  paymentStatus: number; // 1 = NotPaid, 2 = Paid
  stripeSessionId?: string | null;
  paymentIntentId?: string | null;
  userId?: number;
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
  status?: number; // 1 = NotPaid, 2 = Paid
  createdAt?: string;
  [key: string]: any;
}

// Product CRUD Types
export interface CreateProductRequest {
  name: string;
  description?: string;
  price: number;
  image?: string; // Legacy
  imageURL?: string; // New field
  deviceId?: string;
  [key: string]: any;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  image?: string; // Legacy
  imageURL?: string; // New field
  deviceId?: string;
  [key: string]: any;
}

export interface UpdateOrderStatusRequest {
  orderStatus: number;
}

