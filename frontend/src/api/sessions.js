//sessions（ログイン状態をどう扱いたいか）に関するAPI呼び出しを行う関数を定義するファイル

//client.jsをインポート
import request from './client.js';

//client.jsにリクエストする関数を操作ごとに定義
export const login = async (UserData) => {
    // client.js の request を呼び出し、
    // API通信の完了を待って結果をそのまま返す
    return await request({
        endpoint: 'sessions',
        method: 'POST',
        // token: token,　//ログイン前なのでtokenは不要
        body: UserData,
    });
}

//ログアウト（未ログインからログイン済みにする操作）
export const logout = async (token) => {
    return await request({
        endpoint: 'logout',
        method: 'DELETE',
        token: token,
    });
}

