import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PostsPage from "./pages/PostsPage";
import PostNewPage from "./pages/PostNewPage";
import PostDetailPage from "./pages/PostDetailPage"
import PostEditPage from "./pages/PostEditPage"

function App() {

  return (
    <div style={{ padding: "40px" }}>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/new" element={<PostNewPage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route path="/posts/:id/edit" element={<PostEditPage />} />
      </Routes>

    </div>
  );
}


//他ファイル（main.jsx）から <App /> として使える
export default App;
