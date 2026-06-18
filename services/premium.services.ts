import api from "@/lib/axios";

export const premiumService = {
  subscribeMercadoPago: async () => {
    const res = await api.post("/subscriptions/subscribe");
    return res.data;
  },

  subscribeStripe: async () => {
    const res = await api.post("/subscriptions/subscribe/stripe");
    return res.data;
  },

  getMySubscription: async () => {
    const res = await api.get("/subscriptions/my-subscription");
    return res.data;
  },

  cancelSubscription: async () => {
    const res = await api.delete("/subscriptions/cancel");
    return res.data;
  },
};
