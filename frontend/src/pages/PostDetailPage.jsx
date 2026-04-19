/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import PostDetail from "../components/PostDetail";
import { useAuth } from "../contexts/useAuth";
import { useParams, useNavigate } from "react-router-dom";
import { getPostDetail } from "../api/posts";
import ConfirmDialog from "../components/ConfirmDialog"


function PostDetailPage() {

    //ログイン状態を管理 
    const { isAuthenticated, Logout } = useAuth();

    //投稿詳細の状態を管理
    const [post, setPost] = useState(null);

    //エラーメッセージの状態管理
    const [ErrorMessage, SetErrorMessage] = useState("");

    //削除ダイアログの開閉状態を管理
    const [isOpen, setIsOpen] = useState(false);

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

    //編集ボタンを押したら投稿編集ページに遷移
    const navigateEditPost = () => {
        navigate(`/posts/${id}/edit`);
    }

    //削除ボタンを押したら、削除確認ダイアログを表示
    const handleDeleteConfirm = () => {
        setIsOpen(true);

    }

    //確認ダイアログの削除ボタンを押したら、削除関数を実行
    const handleDeletePost = () => {
        //削除APIを呼び出し
        console.log("削除ボタンを押したよ")
    }


    return (
        <div>
            <PostDetail post={post} message={ErrorMessage} />
            <ConfirmDialog isOpen={isOpen}
                title="この投稿を削除しますか？"
                description="本当に削除する？"
                ActionLabel="削除"
                onAction={handleDeletePost}
                onCancel={() => setIsOpen(false)} />
            <button onClick={navigatePosts}>一覧に戻る</button>
            <button onClick={navigateEditPost}>編集</button>
            <button onClick={handleDeleteConfirm}>削除</button>

        </div>
    )

}


export default PostDetailPage;