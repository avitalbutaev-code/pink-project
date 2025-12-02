import { useEffect, useState } from "react";
import { fetchPosts, createPost } from "../api";
import Post from "../components/Post";

export default function Posts() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [showAll, setShowAll] = useState(true);

  const loadPosts = async () => {
    const data = showAll ? await fetchPosts() : await fetchPosts(user.user_id);
    setPosts(data);
  };

  useEffect(() => {
    loadPosts();
  }, [showAll]);

  const handleAddPost = async () => {
    console.log(user.user_id, newPostTitle, newPostContent);
    if (!newPostTitle || !newPostContent) return;

    const created = await createPost(
      user.user_id,
      newPostTitle,
      newPostContent
    );
    setPosts((prev) => [...prev, created]);
    setNewPostTitle("");
    setNewPostContent("");
  };

  return (
    <div className="posts">
      <h2>Posts</h2>
      <label>
        <input
          type="checkbox"
          checked={showAll}
          onChange={() => setShowAll((prev) => !prev)}
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
          <Post key={post.post_id} post={post} refreshPosts={loadPosts} />
        ))}
      </ul>
    </div>
  );
}
