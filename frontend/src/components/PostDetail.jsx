function PostDetail({ post, message }) {

    if (message) {
        //エラーの場合、メッセージを表示
        return <p>{message}</p>
    }
    if (!post) {
        console.log("loding");
        return <p>読み込み中</p>
    }
    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
        </div>
    );
}

export default PostDetail;
