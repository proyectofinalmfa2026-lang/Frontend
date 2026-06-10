import api from "../lib/axios";

export const authServices = {
  login: (data: { email: string; password: string }) =>
    api.post("/auth/signin", data),

  register: (data: {
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => api.post("/auth/signup", data),

  me: () =>
    api.get("/auth/profile") /* Devuelve los datos del usuario autenticado */,

  logout: () =>
    api.post(
      "/auth/logout",
    ) /* avisamos al backend que el usuario cerro su sesion */,
};
