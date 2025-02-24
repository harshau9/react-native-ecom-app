import { useAuth } from '@/store/authStore';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

export async function createOrder(items: OrderItem[]) {
  const token = useAuth.getState().token;

  if (!token) {
    throw new Error('User not authenticated');
  }

  const res = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ order: {}, items }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.log(data);
    throw new Error('Error creating order');
  }

  return data;
}
