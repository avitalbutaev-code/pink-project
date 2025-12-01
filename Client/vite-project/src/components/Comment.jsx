import { useState } from "react";
import { updateComment, deleteComment } from "../api";

export default function Comment({ comment, currentUser, refreshComments }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(comment.content);

  const handleSave = async () => {
    if (!text) return;
    await updateComment(currentUser.user_id, comment.comment_id, text);
    setEditing(false);
    refreshComments();
  };

  const handleDelete = async () => {
    await deleteComment(currentUser.user_id, comment.comment_id);
    refreshComments();
  };

  return (
    <li>
      <strong>{comment.username}:</strong>{" "}
      {editing ? (
        <>
          <input value={text} onChange={(e) => setText(e.target.value)} />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      ) : (
        <span>{comment.content}</span>
      )}
      {currentUser.user_id === comment.user_id && !editing && (
        <>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </li>
  );
}
