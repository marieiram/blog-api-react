//値を保存して、画面と連動させる仕組み
import { useState ,useEffect} from "react";
import LoginForm from "./components/LoginForm";
import PostList from"./components/PostList";
import PostForm from "./components/PostForm";
import { getPosts } from "./api/posts";
import { createPost } from "./api/posts";
import { login } from "./api/sessions";

function App() {

  //tokenがあるかどうか（ログイン状態を知るため）
  const [token,setToken] = useState(localStorage.getItem("token"));

  //投稿一覧用
  const [posts, setPosts] = useState([])

  //新規投稿フォームを表示するかどうか
  const [showPostForm, setShowPostForm] = useState(false);

  //formメッセージ表示用
  const [formMessage, setFormMessage] = useState("");

  //投稿取得関数
const fetchPosts = async () => {
  if (!token) return;
  const data = await getPosts (token);
  setPosts (data);
};

  //tokenが変化したら実行 ログイン後に投稿取得
  useEffect(()=> {
    console.log("posts:", posts);
    console.log('posts state:', posts);
    fetchPosts();
  },[token]);

  //投稿を新規作成するための関数
  const handleCreatePost = async (postData) => {
    try{
    const res = await createPost(token, postData);
    //ここまできたら成功してるということ
      setFormMessage("投稿成功！");
      fetchPosts();
      setShowPostForm(false);
    } catch (error) {
      setFormMessage("投稿失敗");
    } 
  };

  //ログインするための関数
  const handleLogin = async (userData) => {
   try {
      const res = await login(userData);
      //ログイン成功したらtokenを保存
      localStorage.setItem("token", res.token);
      setToken(res.token);
    } catch (error) {
      console.error("ログイン失敗", error);
    }
  };

   // ログアウト
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setPosts([]);
  };

  //新規投稿フォーム表示
  const handleShowPostForm = () => {
    setShowPostForm(true);
    setFormMessage("");
  };
  
  return (
    <div style={{ padding: "40px" }}>

{!token ? (
   //ログイン前の画面
<LoginForm onSubmit={handleLogin}/>
     
    ) : (
    
   //ログイン後の画面
    <>
    {showPostForm ? (
      <>
      <PostForm onSubmit={handleCreatePost}
      message={formMessage} />

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
