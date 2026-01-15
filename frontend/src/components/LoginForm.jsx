import { useState } from "react";

function LoginForm({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    //通常<form>は送信すると、ページがリロードされるが、Reactではそれを止める
    e.preventDefault();

    //railsのログインAPI
    const res = await fetch("http://localhost:3000/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    //レスポンス処理 Railsが返したjsonをオブジェクトに返す
    const data = await res.json();
    //成功時
    if (res.ok) {
      //ローカルストレージに保存（ブラウザに永久保存）
      localStorage.setItem("token", data.token);
      setToken(data.token);
      //画面更新
      setMessage("ログイン成功！");
    } 
    //失敗時
    else {
      setMessage("ログイン失敗");
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
