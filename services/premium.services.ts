import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');

export const subscribeWithMercadoPago = async (token: string) => {
  const response = await axios.post(
    `${API_URL}/subscriptions/subscribe`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data; // { initPoint: '...' }
};

export const getMySubscription = async (token: string) => {
  const response = await axios.get(
    `${API_URL}/subscriptions/my-subscription`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const cancelSubscription = async (token: string) => {
  const response = await axios.delete(
    `${API_URL}/subscriptions/cancel`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};