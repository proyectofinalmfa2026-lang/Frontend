import api from "../lib/axios";

export const authServices = {
  login: (data: { email: string; password: string }) =>
    api.post("/auth/login", data),

  register: (data: { name: string; email: string; password: string }) =>
    api.post("/auth/register", data),

  me: () =>
    api.get("/auth/me") /* Devuelve los datos del usuario autenticado */,

  logout: () =>
    api.post(
      "/auth/logout",
    ) /* avisamos al backend que el usuario cerro su sesion */,
};
