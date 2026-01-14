import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      setMessage("ログイン成功！");
    } else {
      setMessage("ログイン失敗");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>ログイン</h1>

      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">ログイン</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
