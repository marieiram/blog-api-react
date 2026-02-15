import { useState } from "react";
import { useAuth } from "../contexts/useAuth";

function LoginForm({ message }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [message, setMessage] = useState("");

  const { Login } = useAuth();
  const handleSubmit = async (e) => {
    //通常<form>は送信すると、ページがリロードされるが、Reactではそれを止める
    e.preventDefault();
    // onSubmit({ email, password});
    try {
      await Login({ email, password });
    } catch {
      console.error("ログイン失敗");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="email"
        type="email"
      />

      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="password"
      />

      <button>Login</button>

      {/* message が空 → 表示しない・message がある → 表示 * */}
      {message && <p>{message}</p>}
    </form>
  );
}

export default LoginForm;
