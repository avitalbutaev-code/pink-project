import { useState } from "react";
import { updateComment, deleteComment } from "../api";

export default function Comment({ comment, refreshComments }) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(comment.content);

  const handleSave = async () => {
    if (!text) return;
    await updateComment(comment.comment_id, text);
    setEditing(false);
    refreshComments((prev) =>
      prev.map((c) =>
        c.comment_id === comment.comment_id ? { ...c, content: text } : c
      )
    );
  };

  const handleDelete = async () => {
    await deleteComment(comment.comment_id);
    refreshComments((prev) =>
      prev.filter((c) => c.comment_id !== comment.comment_id)
    );
  };

  return (
    <li>
      <strong>{comment.username}:</strong>
      {editing ? (
        <>
          <input value={text} onChange={(e) => setText(e.target.value)} />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      ) : (
        <span>{comment.content}</span>
      )}
      <span className="date">
        {new Date(comment.date).toLocaleDateString()}
      </span>
      {user.user_id === comment.user_id && !editing && (
        <>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </li>
  );
}
