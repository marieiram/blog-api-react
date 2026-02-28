import { useState, useEffect } from "react";
import PostList from "../components/PostList";
import { useAuth } from "../contexts/useAuth";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../api/posts";

function PostsPage() {

    //ログイン状態を管理 
    const { isAuthenticated, Logout } = useAuth();
    //投稿一覧用
    const [posts, setPosts] = useState([])
    //URL切り替え用
    const navigate = useNavigate();

    //新規投稿ボタンを押したら投稿フォームページに遷移
    const navigateNewPost = () => {
        navigate("/posts/new");
    }

    //投稿がクリックされたら、詳細画面へ遷移
    const navigatePostDetail = async (id) => {
        navigate(`/posts/${id}`)
    }

    //ログアウトボタンを押したらログインページに遷移
    const navigateLogin = () => {
        Logout();
    }

    //投稿取得関数
    const fetchPosts = async () => {
        const data = await getPosts();
        setPosts(data);
    };

    //URLのpostsにアクセスしたら、ログイン状態の時には投稿を再取得する
    //未ログインの時には、ログイン画面へ遷移する
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login")
            return;
        }
        fetchPosts();
    }, [isAuthenticated, navigate]);

    return (
        <>
            <button onClick={navigateNewPost}>新規投稿</button>
            <button onClick={navigateLogin}>ログアウト</button>
            <PostList posts={posts} onClickPost={navigatePostDetail} />

        </>
    )

}

export default PostsPage;