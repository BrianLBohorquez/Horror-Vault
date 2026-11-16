import { useState } from "react";
import { Link } from "react-router";
import { updateWatchlistItem, removeFromWatchlist } from "../api/watchlist";
import { useAuth } from "../auth/AuthContext";

export default function Watchlist({ watchlist, syncWatchlist }) {
  if (watchlist.length === 0) return <p>Your watchlist is empty.</p>;

  return (
    <ul>
      {watchlist.map((item) => (
        <WatchlistItem
          key={item.id}
          item={item}
          syncWatchlist={syncWatchlist}
        />
      ))}
    </ul>
  );
}

function WatchlistItem({ item, syncWatchlist }) {
  const { token } = useAuth();
  const [error, setError] = useState(null);

  const tryWatched = async () => {
    setError(null);

    try {
      await updateWatchlistItem(token, item.id, !item.watched);
      syncWatchlist();
    } catch (e) {
      setError(e.message);
    }
  };

  const tryRemove = async () => {
    setError(null);

    try {
      await removeFromWatchlist(token, item.id);
      syncWatchlist();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <li>
      {item.poster_url ? (
        <img
          src={item.poster_url}
          alt={"Poster of " + item.title}
          loading="lazy"
        />
      ) : (
        <p>No poster</p>
      )}
      <Link to={"/movies/" + item.movie_id}>{item.title}</Link>
      <p>{item.year}</p>
      <label>
        <input type="checkbox" checked={item.watched} onChange={tryWatched} />
        Watched
      </label>
      <button onClick={tryRemove}>Remove</button>
      {error && <p role="alert">{error}</p>}
    </li>
  );
}
