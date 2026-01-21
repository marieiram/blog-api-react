//値を保存して、画面と連動させる仕組み
import { useState ,useEffect} from "react";
import LoginForm from "./components/LoginForm";
import PostList from"./components/PostList";
import PostForm from "./components/PostForm";

function App() {

  //tokenがあるかどうか（ログイン状態を知るため）
  const [token,setToken] = useState(localStorage.getItem("token"));
  //投稿一覧用
  const [posts, setPosts] = useState([])

  //新規投稿フォームを表示するかどうか
  const [showPostForm, setShowPostForm] = useState(false);

  //投稿取得関数
  const fetchPosts = async () => { 
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

  //新規投稿フォーム表示
  const handleShowPostForm = () => {
    setShowPostForm(true);
  };
  
  return (
    <div style={{ padding: "40px" }}>

{!token ? (
   //ログイン前の画面
<LoginForm setToken={setToken}/>
     
    ) : (
    
   //ログイン後の画面
    <>
    {showPostForm ? (
      <>
      <PostForm onCreated={() => {
        fetchPosts();
      setShowPostForm(false);
    }} />
      <button onClick={() => setShowPostForm(false)}>一覧に戻る</button>
      </>
    ) : (
      <>
       <button onClick={handleShowPostForm}>新規投稿</button>
       <PostList posts={posts} />
       <button onClick={handleLogout}>ログアウト</button>
      </>
    )}
     </>
  )}  
    
 {/* message が空 → 表示しない・message がある → 表示 */}
    </div>
  );
}
//他ファイル（main.jsx）から <App /> として使える
export default App;
