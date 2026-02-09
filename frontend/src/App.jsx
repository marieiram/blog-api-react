//値を保存して、画面と連動させる仕組み
import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import { getPosts } from "./api/posts";
import { createPost } from "./api/posts";
import { useAuth } from "./contexts/useAuth";

function App() {

  //
  const { Login, Logout, isAutheticated } = useAuth();

  //投稿一覧用
  const [posts, setPosts] = useState([])

  //新規投稿フォームを表示するかどうか
  const [showPostForm, setShowPostForm] = useState(false);

  //formメッセージ表示用
  const [formMessage, setFormMessage] = useState("");

  //投稿取得関数
  const fetchPosts = async () => {
    const data = await getPosts();
    setPosts(data);
  };

  //isAutheticatedが変わったら、投稿を再取得する
  useEffect(() => {
    if (isAutheticated) {
      fetchPosts();
    } else {
      setPosts([]);
    }

  }, [isAutheticated]);


  //投稿を新規作成するための関数
  const handleCreatePost = async (postData) => {
    try {
      await createPost(postData);
      //ここまできたら成功してるということ
      setFormMessage("投稿成功！");
      fetchPosts();
      setShowPostForm(false);
    } catch {
      setFormMessage("投稿失敗");
    }
  };

  //新規投稿フォーム表示
  const handleShowPostForm = () => {
    setShowPostForm(true);
    setFormMessage("");
  };

  return (
    <div style={{ padding: "40px" }}>

      {!isAutheticated ? (
        //ログイン前の画面
        <LoginForm onSubmit={Login} />

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
              <button onClick={Logout}>ログアウト</button>
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
