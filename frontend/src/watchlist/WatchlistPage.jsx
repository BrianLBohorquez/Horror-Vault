import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getWatchlist } from "../api/watchlist";
import { useAuth } from "../auth/AuthContext";

import Watchlist from "./Watchlist";

export default function WatchlistPage() {
  const { token } = useAuth();

  const [watchlist, setWatchlist] = useState([]);

  const syncWatchlist = async () => {
    const data = await getWatchlist(token);
    setWatchlist(data);
  };

  useEffect(() => {
    if (token) syncWatchlist();
  }, []);

  if (!token) {
    return (
      <>
        <h1>Watchlist</h1>
        <p>You need to be logged in to see your watchlist.</p>
        <Link to="/login">Log in</Link>
        <Link to="/register">Register</Link>
      </>
    );
  }

  return (
    <>
      <h1>Watchlist</h1>
      <Watchlist watchlist={watchlist} syncWatchlist={syncWatchlist} />
    </>
  );
}
