import { useState } from "react";

function PostForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ title, body}),
    });


    if (res.ok) {  
    setTitle("");
    setBody("");
    setMessage("投稿成功！");
    onCreated();
    } else {
      setMessage("投稿失敗");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Post</h2>

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="title"
      />

      <textarea
        value={body}
        onChange={e => setBody(e.target.value)}
        placeholder="body"
      />

      <button>投稿</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default PostForm;