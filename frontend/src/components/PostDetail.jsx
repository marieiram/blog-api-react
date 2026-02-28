function PostDetail({ post }) {

    return (
        <div>
            <h2>Post</h2>
            <ul>

                <li key={post.id}>
                    <p>{post.title}</p>
                    <p>{post.body}</p>
                </li>

            </ul>
        </div>
    );
}

export default PostDetail;
