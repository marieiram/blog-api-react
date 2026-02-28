function PostDetail({ post, message }) {

    if (message) {
        return <p>{message}</p>
    }
    if (!post) {
        console.log("loding");
        return <p>読み込み中</p>
    }
    return (
        <div>
            <h2>{post.title}</h2>
            <ul>
                <p>{post.body}</p>
            </ul>
        </div>
    );
}

export default PostDetail;
