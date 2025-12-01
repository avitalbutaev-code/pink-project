import { useEffect, useState } from "react";
import { fetchPosts, createPost } from "../api";
import Post from "../components/Post";

export default function Posts({ user }) {
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [showAll, setShowAll] = useState(true);
  const loadPosts = async () => {
    const data = showAll ? await fetchPosts() : await fetchPosts(user.id);
    setPosts(data);
  };

  useEffect(() => {
    loadPosts();
  }, [showAll]);
  async function changeShow() {
    setShowAll((prev) => !prev);
  }
  async function handleAddPost() {
    if (!newPostTitle || !newPostContent) return;
    await createPost(user.user_id, newPostTitle, newPostContent);
    setNewPostTitle("");
    setNewPostContent("");
    loadPosts();
  }

  return (
    <div>
      <h2>Posts</h2>

      <label>
        <input
          type="checkbox"
          checked={showAll}
          onChange={() => {
            changeShow();
          }}
        />
        Show posts of all users
      </label>
      <div>
        <input
          placeholder="Post title"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
        />
        <input
          placeholder="Post content"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        />
        <button onClick={handleAddPost}>Add Post</button>
      </div>
      <ul>
        {posts.map((post) => (
          <Post
            key={post.post_id}
            post={post}
            currentUser={user}
            refreshPosts={loadPosts}
          />
        ))}
      </ul>
    </div>
  );
}
