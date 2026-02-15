//Loginページ
import PostForm from "../components/PostForm";
import { useAuth } from "../contexts/useAuth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createPost } from "../api/posts";

function PostFormPage() {
    const { isAutheticated } = useAuth();

    //URL切り替え用
    const navigate = useNavigate();

    //新規投稿関数
    const handlecreatePost = async (postData) => {
        try {
            await createPost(postData);
            //ここまできたら成功してるということ
            setFormMessage("投稿成功！");
            //投稿が完了したら一覧ページに遷移
            navigate("/posts");
        } catch {
            setFormMessage("投稿失敗");
        }
    };



    //一覧に戻るボタンを押したら投稿一覧ページに遷移
    const navigatePosts = () => {
        navigate("/posts");
    }


    //ログインしてない時はログインページへ遷移
    useEffect(() => {
        if (!isAutheticated) {
            navigate("/login")
            return;
        }
    }, [isAutheticated, navigate]);

    return (
        <>
            <PostForm onSubmit={handlecreatePost} />
            <button onClick={navigatePosts}>一覧に戻る</button>
        </>
    )


}

export default PostFormPage;