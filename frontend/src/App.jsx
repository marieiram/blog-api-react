//値を保存して、画面と連動させる仕組み
import { useState, useEffect } from "react";
// import LoginForm from "./components/LoginForm";
// import PostList from "./components/PostList";
// import PostForm from "./components/PostForm";
// import { getPosts } from "./api/posts";
//import { createPost } from "./api/posts";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PostsPage from "./pages/PostsPage";
import PostFormPage from "./pages/PostFormPage";
// import { useAuth } from "./contexts/useAuth";

function App() {

  //formメッセージ表示用
  const [formMessage, setFormMessage] = useState("");

  return (
    <div style={{ padding: "40px" }}>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/new" element={<PostFormPage />} />
      </Routes>

    </div>
  );
}


//他ファイル（main.jsx）から <App /> として使える
export default App;
