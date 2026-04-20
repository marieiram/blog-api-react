import { useState, useEffect, createContext } from "react"
import { setAuthToken } from "../api/client";
//sessionsloginをloginApiという名前で使う
import { login as loginApi } from "../api/sessions";


//認証情報の箱を作る
const AuthContext = createContext(null);
export { AuthContext };

export const AuthProvider = ({ children }) => {
    //tokenの状態を管理
    const [token, setToken] = useState(localStorage.getItem("token"));

    //tokenが変化したらtokenの状態を更新、clientの設定を変更
    useEffect(() => {
        setAuthToken(token);
    }, [token]);


    //Loginする
    const Login = async (userData) => {
        try {
            const res = await loginApi(userData);
            //ログイン成功したらtokenを保存
            console.log("login response:", res); // ← 追加
            localStorage.setItem("token", res.token);
            setToken(res.token);
        } catch (error) {
            console.error("ログイン失敗", error);
            throw error;
        }
    };

    //Logoutする
    const Logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    const value = {
        Login,
        Logout,
        isAuthenticated: !!token, //tokenがあればtrue、なければfalse
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};



