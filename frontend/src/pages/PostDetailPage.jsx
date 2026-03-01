/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import PostDetail from "../components/PostDetail";
import { useAuth } from "../contexts/useAuth";
import { useParams, useNavigate } from "react-router-dom";
import { getPostDetail } from "../api/posts";


function PostDetailPage() {

    //ログイン状態を管理 
    const { isAuthenticated, Logout } = useAuth();

    //投稿詳細の状態を管理
    const [post, setPost] = useState(null);

    //エラーメッセージの状態管理
    const [ErrorMessage, SetErrorMessage] = useState("");

    //URLのパラメータを取得
    const { id } = useParams();

    //URL切り替え用
    const navigate = useNavigate();

    //詳細取得関数
    const fetchPostDetail = async () => {
        try {
            const data = await getPostDetail(id);
            setPost(data);
        } catch {
            setPost(null);
            SetErrorMessage("投稿が見つかりませんでした");
        }
    }

    //idが変わるたびに、詳細取得関数を実行する
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login")
            return;
        }
        fetchPostDetail();
    }, [id, isAuthenticated]);


    //一覧に戻るボタンを押したら投稿一覧ページに遷移
    const navigatePosts = () => {
        navigate("/posts");
    }


    return (
        <div>
            <PostDetail post={post} message={ErrorMessage} />
            <button onClick={navigatePosts}>一覧に戻る</button>

        </div>
    )

}


export default PostDetailPage;