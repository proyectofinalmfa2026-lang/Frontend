export function timeAgo(dateStr: string): string {
  const days = Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / 86400000,
  );

  if (days === 0) return "hoy";
  if (days === 1) return "hace 1 día";
  if (days < 7) return `hace ${days} días`;

  if (days < 30) {
    const weeks = Math.floor(days / 7);
    return `hace ${weeks} semana${weeks > 1 ? "s" : ""}`;
  }

  const months = Math.floor(days / 30);
  return `hace ${months} mes${months > 1 ? "es" : ""}`;
}
