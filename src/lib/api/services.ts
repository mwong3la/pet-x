import apiClient from '../api-client';
import type {
  User,
  LoginRequest,
  RegisterRequest,
  LoginResponse,
  Product,
  CreateOrderRequest,
  Order,
  PaymentRequest,
  PaymentHistory,
  CreateProductRequest,
  UpdateProductRequest,
  UpdateOrderStatusRequest,
} from './types';

// User APIs
export const userApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/api/User/login', data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<User> => {
    const response = await apiClient.post<User>('/api/User/register', data);
    return response.data;
  },

  getUsers: async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>('/api/User');
    return response.data;
  },
};

// Blob APIs
export const blobApi = {
  uploadFile: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post<string>('/api/Blob/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    // API returns the URL string directly, not an object
    return typeof response.data === 'string' ? response.data : response.data;
  },
};

// Product APIs
export const productApi = {
  getProducts: async (): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>('/api/Product');
    return response.data;
  },

  getProduct: async (id: number): Promise<Product> => {
    const response = await apiClient.get<Product>(`/api/Product/getProduct/${id}`);
    return response.data;
  },

  createProduct: async (data: any): Promise<Product> => {
    const response = await apiClient.post<Product>('/api/Product/addProduct', data);
    return response.data;
  },

  updateProduct: async (id: number, data: any): Promise<Product> => {
    const response = await apiClient.put<Product>(`/api/Product/update/${id}`, data);
    return response.data;
  },

  deleteProduct: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/Product/delete/${id}`);
  },
};

// Order APIs
export const orderApi = {
  createOrder: async (data: CreateOrderRequest): Promise<Order> => {
    const response = await apiClient.post<Order>('/api/Order/addOrder', data);
    return response.data;
  },

  getOrder: async (id: number): Promise<Order> => {
    const response = await apiClient.get<Order>(`/api/Order/${id}`);
    return response.data;
  },

  getOrders: async (): Promise<Order[]> => {
    const response = await apiClient.get<Order[]>('/api/Order');
    return response.data;
  },

  payForOrder: async (orderId: number, data: PaymentRequest): Promise<any> => {
    const response = await apiClient.post(`/api/Order/order/${orderId}`, data);
    return response.data;
  },

  updateOrderStatus: async (orderId: number, orderStatus: number): Promise<Order> => {
    const response = await apiClient.put<Order>(`/api/Order/status/${orderId}?updatedStatus=${orderStatus}`);
    return response.data;
  },
};

// Payment APIs
export const paymentApi = {
  makePayment: async (data: PaymentRequest): Promise<any> => {
    const response = await apiClient.post('/api/Payment', data);
    return response.data;
  },

  getPaymentHistory: async (userId: number): Promise<PaymentHistory[]> => {
    const response = await apiClient.get<PaymentHistory[]>(`/api/Payment/history/${userId}`);
    return response.data;
  },

  getAllPayments: async (): Promise<PaymentHistory[]> => {
    const response = await apiClient.get<PaymentHistory[]>('/api/Payment');
    return response.data;
  },

  verifyPayment: async (orderId: number, stripeSessionId: string): Promise<any> => {
    const response = await apiClient.post('/api/Order/validate', {
      orderId,
      stripeSessionId,
    });
    return response.data;
  },
};

