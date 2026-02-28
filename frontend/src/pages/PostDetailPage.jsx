import { useEffect, useState } from "react";
import PostDetail from "../components/PostDetail";
import { useAuth } from "../contexts/useAuth";
import { useParams, useNavigate } from "react-router-dom";
import { getPostDetail } from "../api/posts";


function PostDetailPage() {

    //ログイン状態を管理 
    const { isAuthenticated, Logout } = useAuth();

    //投稿詳細の状態を管理
    const [post, setPost] = useState([])

    //URLのパラメータを取得
    const { id } = useParams();
    console.log(id);

    //URL切り替え用
    const navigate = useNavigate();

    //詳細取得関数
    const fetchPostDetail = async () => {
        const date = await getPostDetail(id);
        setPost(date);
    }

    //idが変わるたびに、詳細取得関数を実行する
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login")
            return;
        }
        fetchPostDetail();
    }, [id]

    )


    return (
        <div>
            <PostDetail post={post} />
        </div>
    )

}


export default PostDetailPage;