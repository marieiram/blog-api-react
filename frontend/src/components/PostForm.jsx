import { useState } from "react";

function PostForm({ onSubmit, message }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");


  //「投稿」ボタンをクリックしたときにPostデータを渡す
const handleSubmit = (e) => {
  e.preventDefault();
  onSubmit({title, body});
  }

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