import { Badge } from "@/types/profile.types";

export const AVAILABLE_BADGES: Badge[] = [
  // ── LIBRES (cualquier usuario) ─────────────────────────────────────────
  { id: "first-review", label: "Cineasta", color: "gold", icon: "🎬", requiredTier: "free" },
  { id: "casual-10", label: "Cinéfilo Casual", color: "green", icon: "🎟️", requiredTier: "free" },
  { id: "chatty-50", label: "Crítico Social", color: "purple", icon: "💬", requiredTier: "free" },
  { id: "collector-50", label: "Coleccionista", color: "blue", icon: "📽️", requiredTier: "free" },
  { id: "versatile", label: "Versátil", color: "cyan", icon: "🌈", requiredTier: "free" },
  { id: "night-owl", label: "Maratonista Nocturno", color: "purple", icon: "🌙", requiredTier: "free" },
  { id: "streak-7", label: "Racha de Fuego", color: "purple", icon: "🔥", requiredTier: "free" },
  { id: "trailblazer", label: "Pionero", color: "cyan", icon: "🧭", requiredTier: "free" },

  // ── PREMIUM (solo suscriptores) ────────────────────────────────────────
  { id: "critic-50", label: "Crítico Estelar", color: "gold", icon: "⭐", requiredTier: "premium" },
  { id: "critic-100", label: "Crítico Legendario", color: "green", icon: "📝", requiredTier: "premium" },
  { id: "top-review", label: "Top Reviewer", color: "gold", icon: "🏆", requiredTier: "premium" },
  { id: "early-bird", label: "Early Adopter", color: "gold", icon: "🚀", requiredTier: "premium" },
  { id: "golden-popcorn", label: "Palomita de Oro", color: "rose", icon: "🍿", requiredTier: "premium" },
  { id: "expert-50", label: "Cinéfilo Experto", color: "green", icon: "🎭", requiredTier: "premium" },
  { id: "legend-100", label: "Cinéfilo Leyenda", color: "rose", icon: "👑", requiredTier: "premium" },
  { id: "heart-100", label: "Corazón Cinéfilo", color: "rose", icon: "❤️", requiredTier: "premium" },
  { id: "community-star", label: "Estrella de la Comunidad", color: "rose", icon: "🌟", requiredTier: "premium" },
  { id: "ai-explorer", label: "Explorador IA", color: "cyan", icon: "🤖", requiredTier: "premium" },
];

export const MAX_SELECTED_BADGES = 6;
