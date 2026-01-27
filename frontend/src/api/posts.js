//postsに関するAPI呼び出しを行う関数を定義するファイル

//client.jsをインポート
import request from './client.js';

//client.jsに渡す関数を操作ごとに定義
//一覧取得
export const getPosts = async (token) => {
    //clients.jsから結果を受け取る
    return await request({
        endpoint: 'posts',
        method: 'GET',
        token: token,
    });
};


//新規作成
export const createPost = async(token,postDate) =>{
    //clients.jsから結果を受け取る
    return await request({
        endpoint: 'posts',
        method: 'POST',
        token: token,
        body: postDate,
    });
}

//詳細取得
//更新
//削除



//componentへ結果を渡す