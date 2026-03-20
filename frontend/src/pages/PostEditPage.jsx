import PostForm from "../components/PostForm";
import { useAuth } from "../contexts/useAuth";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, } from "react";
import { updatePost, getPostDetail } from "../api/posts";


function PostEditPage() {
    const { isAuthenticated } = useAuth();

    //URL切り替え用
    const navigate = useNavigate();

    //formメッセージ表示用
    const [formMessage, setFormMessage] = useState("");

    //URLのパラメータを取得
    const { id } = useParams();

    //投稿詳細の状態を管理
    const [post, setPost] = useState();


    //初期値を取得する関数
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPostDetail(id);
                setPost(data);
            } catch {
                setFormMessage("投稿が見つかりませんでした");
            }
        };
        fetchData();
    }, [id]);

    //投稿更新関数
    async function handleUpdatePost(postData) {
        try {
            //ここでAPIを呼び出して投稿を更新する
            await updatePost(id, postData);
            setFormMessage("投稿の更新に成功しました");
            //投稿が完了したら詳細ページに遷移
            navigate(`/posts/${id}`);
        } catch {
            setFormMessage("投稿の更新に失敗しました");
        }
    }


    //キャンセルボタンを押したら投稿詳細ページに遷移
    const navigatePosts = () => {
        navigate(`/posts/${id}`);
    }

    //ログインしてない時はログインページへ遷移
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login")
            return;
        }
    }, [isAuthenticated, navigate]);

    return (
        <div>
            <PostForm mode="edit" onSubmit={handleUpdatePost} message={formMessage} post={post} />
            <button onClick={navigatePosts}>キャンセル</button>
        </div>
    );
}

export default PostEditPage;