import { useEffect, useState } from "react";
import { fetchComments, createComment } from "../api";
import Comment from "./Comment";

export default function Post({ post, currentUser, refreshPosts }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  async function loadComments() {
    const data = await fetchComments(post.post_id);
    setComments(data);
  }

  useEffect(() => {
    loadComments();
  }, []);

  async function handleAddComment() {
    if (!newComment) return;
    await createComment(currentUser.user_id, post.post_id, newComment);
    setNewComment("");
    loadComments();
  }

  return (
    <li>
      <h3>
        {post.title} (by {post.username})
      </h3>
      <p>{post.content}</p>
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
            currentUser={currentUser}
            refreshComments={loadComments}
          />
        ))}
      </ul>
    </li>
  );
}
