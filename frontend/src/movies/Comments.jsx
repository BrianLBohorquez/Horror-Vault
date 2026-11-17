import { useState } from "react";
import { addComment, deleteComment } from "../api/comments";
import { useAuth } from "../auth/AuthContext";

export default function Comments({
  movieId,
  comments,
  account,
  syncComments,
}) {
  const { token } = useAuth();
  const [error, setError] = useState(null);

  const tryAdd = async (formData) => {
    setError(null);
    const body = formData.get("body");

    try {
      await addComment(token, movieId, body);
      syncComments();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h2>Comments</h2>
      {token && (
        <form action={tryAdd}>
          <label>
            Leave a comment
            <textarea name="body" required />
          </label>
          <button>Post</button>
          {error && <p role="alert">{error}</p>}
        </form>
      )}
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              account={account}
              syncComments={syncComments}
            />
          ))}
        </ul>
      )}
    </>
  );
}

function CommentItem({ comment, account, syncComments }) {
  const { token } = useAuth();
  const [error, setError] = useState(null);

  const tryDelete = async () => {
    setError(null);

    try {
      await deleteComment(token, comment.id);
      syncComments();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <li>
      <p>{comment.username}</p>
      <p>{new Date(comment.date_posted).toLocaleDateString()}</p>
      <p>{comment.body}</p>
      {token && account && account.id === comment.user_id && (
        <button onClick={tryDelete}>Delete</button>
      )}
      {error && <p role="alert">{error}</p>}
    </li>
  );
}
