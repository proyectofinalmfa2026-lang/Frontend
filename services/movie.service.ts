import api from "@/lib/axios";

export async function getMovies() {
  const response = await api.get("/movies");

  return response.data;
}
