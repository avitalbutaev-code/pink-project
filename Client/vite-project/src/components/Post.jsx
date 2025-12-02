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
    <li className="post-item">
      <div className="post-header">
        <h3>{post.title}</h3>
        <span className="post-user">by {post.username}</span>
        <span className="post-date">
          {" "}
          {new Date(post.date).toLocaleDateString()}
        </span>
        {user.user_id === post.user_id && (
          <button className="delete-post" onClick={handleDelete}>
            Delete
          </button>
        )}
      </div>
      <p>{post.content}</p>

      <div className="post-comments">
        <div className="comment-input">
          <input
            placeholder="New comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleAddComment}>Add</button>
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
      </div>
    </li>
  );
}
