//postsに関するAPI呼び出しを行う関数を定義するファイル

//client.jsをインポート
import request from './client.js';

//client.jsにリクエストする関数を操作ごとに定義
//一覧取得
export const getPosts = async () => {
    // client.js の request を呼び出し、
    // API通信の完了を待って結果をそのまま返す
    return await request({
        endpoint: 'posts',
        method: 'GET',
        // token: token,
    });
};

//新規作成
export const createPost = async (postData) => {
    //clients.jsから結果を受け取る
    return await request({
        endpoint: 'posts',
        method: 'POST',
        // token: token,
        body: {
            post: postData,
        },
    });
}

//詳細取得
export const getPostDetail = async (id) => {
    // client.js の request を呼び出し、
    // API通信の完了を待って結果をそのまま返す
    return await request({
        endpoint: `posts/${id}`,
        method: 'GET',
        // token: token,
    });
};


//更新
export const updatePost = async (id, postData) => {
    return await request({
        endpoint: `posts/${id}`,
        method: 'PATCH',
        // token: token,
        body: {
            post: postData,
        },
    });
}

//削除