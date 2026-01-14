//値を保存して、画面と連動させる仕組み
import { useState ,useEffect} from "react";

function App() {
//状態の定義
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  //tokenがあるかどうか（ログイン状態を知るため）
  const [token,setToken] = useState(localStorage.getItem("token"));
  //投稿一覧用
  const [posts, setPosts] = useState([])

  //ログイン処理
  const handleLogin = async (e) => {
    //通常<form>は送信すると、ページがリロードされるが、Reactではそれを止める
    e.preventDefault();

    //railsのログインAPI
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


  //投稿取得関数
  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
    
    const res = await fetch("http://localhost:3000/api/posts",{
      headers:{
        "Authorization": `Bearer ${token}`,
      }
    })
  const data = await res.json();
  setPosts(data);
}

  //tokenが変化したら実行 ログイン後に投稿取得
  useEffect(()=> {
    if (token){
      fetchPosts();
    }
  },[token]);

   // ログアウト
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setPosts([]);
  };

  
  return (
    <div style={{ padding: "40px" }}>

{!token ? (
   //ログイン前の画面
   <form onSubmit={handleLogin}>
         <h1>ログイン</h1>
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
     
      
    ) : (
    
      //ログイン後の画面
     <div>
        <h1>ログイン済み</h1>
        <p>ようこそ！</p>
        <button onClick={handleLogout}>ログアウト</button>
        <h2>投稿</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <small>作成者: {post.user.email}</small>
            </li>
          ))}
        </ul>
     </div>

  )}  
      
     
 {/* message が空 → 表示しない・message がある → 表示 */}
      {message && <p>{message}</p>}
    </div>

  );
}

//他ファイル（main.jsx）から <App /> として使える
export default App;
