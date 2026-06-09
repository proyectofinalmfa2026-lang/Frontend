import { useAuthStore } from "@/store/authStore";
import WatchlistGuest from "@/Views/watchlist/watchlistGuest";
/* import WatchlistPage from "@/Views/watchlist/watchlistGuest"; */
export default function wachtlistPage() {
  /*   const { user } = useAuthStore(); */

  /* if (!user) { */
  return <WatchlistGuest />;
}

/* return <WatchlistView />;
} */
