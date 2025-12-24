import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi, productApi, orderApi, paymentApi } from './services';
import type {
  LoginRequest,
  RegisterRequest,
  CreateOrderRequest,
  PaymentRequest,
} from './types';

// User Queries
export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginRequest) => userApi.login(data),
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterRequest) => userApi.register(data),
  });
};

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => userApi.getUsers(),
  });
};

// Product Queries
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => productApi.getProducts(),
  });
};

export const useProduct = (id: number | null) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProduct(id!),
    enabled: !!id,
  });
};

// Order Queries
export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateOrderRequest) => orderApi.createOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const useOrder = (id: number | null) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => orderApi.getOrder(id!),
    enabled: !!id,
  });
};

export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => orderApi.getOrders(),
  });
};

export const usePayForOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, data }: { orderId: number; data: PaymentRequest }) =>
      orderApi.payForOrder(orderId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['paymentHistory'] });
    },
  });
};

// Payment Queries
export const useMakePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PaymentRequest) => paymentApi.makePayment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paymentHistory'] });
    },
  });
};

export const usePaymentHistory = (userId: number | null) => {
  return useQuery({
    queryKey: ['paymentHistory', userId],
    queryFn: () => paymentApi.getPaymentHistory(userId!),
    enabled: !!userId,
  });
};

