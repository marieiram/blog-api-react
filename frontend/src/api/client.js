//client.jsはサーバーへ指定されたリクエストを送るための関数

//共通のAPIベースURL
const API_BASE_URL = 'http://localhost:3000/api';
//共通のヘッダー部分
const COMMON_HEADERS = {
    'Content-Type': 'application/json',
};

//railsにAPIリクエストを送信
const request = async (hikisu) => {
//tokenを取得
const token = hikisu.token;
    //headersを共通ヘッダーとマージ
   const headers = {
        ...COMMON_HEADERS,
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...hikisu.headers,
    };

    //fetch関数でAPIリクエストを送信
    const res = await fetch(`${API_BASE_URL}/${hikisu.endpoint}`, {
        method: hikisu.method, //POST, PUT, DELETEなど
        headers: headers,
        cache: 'no-store', //常に最新データを取得するためキャッシュ無効化
       //hikisu.body があるときだけ { body: ... } を展開
       ...(hikisu.body && {body: JSON.stringify(hikisu.body)}),
    });

//レスポンス処理
//成功時 データをreturn
if (res.ok) {
    const data = await res.json();
    return data;
}

//失敗時 エラーをthrow
else {
    const errorData = await res.json();
    const err = new Error(errorData.message || 'API request failed');
    err.status = res.status;
    err.details = errorData;
    throw err;
}

};

export default request;

