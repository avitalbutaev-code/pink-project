import { useEffect, useState } from "react";
import { fetchComments, createComment, deletePost } from "../api";
import Comment from "./Comment";

export default function Post({ post, refreshPosts }) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const loadComments = async () => {
    const data = await fetchComments(post.post_id);
    setComments(data);
  };

  useEffect(() => {
    loadComments();
  }, [post.post_id]);

  const handleAddComment = async () => {
    if (!newComment) return;
    console.log(user.user_id, post.post_id, newComment);

    const created = await createComment(user.user_id, post.post_id, newComment);
    setComments((prev) => [...prev, created]);
    setNewComment("");
  };
  const handleDelete = async () => {
    await deletePost(post.post_id);
    refreshPosts();
  };

  return (
    <li>
      <h3>
        {post.title} (by {post.username})
      </h3>
      <span className="date">{new Date(post.date).toLocaleDateString()}</span>
      <p>{post.content}</p>
      {user.user_id === post.user_id && (
        <button onClick={handleDelete}>Delete</button>
      )}
      <div>
        <input
          placeholder="New comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
      <ul>
        {comments.map((comment) => (
          <Comment
            key={comment.comment_id}
            comment={comment}
            refreshComments={setComments}
          />
        ))}
      </ul>
    </li>
  );
}
