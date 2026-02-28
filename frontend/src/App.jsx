import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PostsPage from "./pages/PostsPage";
import PostFormPage from "./pages/PostFormPage";
import PostDetailPage from "./pages/PostDetailPage"

function App() {

  return (
    <div style={{ padding: "40px" }}>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/new" element={<PostFormPage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
      </Routes>

    </div>
  );
}


//他ファイル（main.jsx）から <App /> として使える
export default App;
