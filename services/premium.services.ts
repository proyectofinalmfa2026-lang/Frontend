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

export const subscribeWithStripe = async (token: string) => {
  const response = await axios.post(
    `${API_URL}/subscriptions/subscribe/stripe`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data; // { subscriptionId: '...', clientSecret: '...' }
};

export const confirmSubscription = async (token: string, preapprovalId: string) => {
  const response = await axios.post(
    `${API_URL}/subscriptions/confirm/${preapprovalId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};