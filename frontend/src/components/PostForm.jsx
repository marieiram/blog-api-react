import { useState } from "react";

function PostForm({ onSubmit, message, mode }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  //「投稿」ボタンをクリックしたときにPostデータを渡す
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, body });
  }

  return (
    <form onSubmit={handleSubmit}>
      {mode === "new" && <h2>Create post</h2>}
      {mode === "edit" && <h2>Edit post</h2>}

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
      {mode === "new" && <button>send</button>}
      {mode === "edit" && <button>save</button>}
      {message && <p>{message}</p>}
    </form>
  );
}

export default PostForm;