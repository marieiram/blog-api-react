//Loginページ
import { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../contexts/useAuth";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();



    //ログイン状態が変わったら（＝ログインに成功したら）URLを変更する
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/posts");
        }
    }, [isAuthenticated, navigate])

    return (
        <LoginForm />
    )

}

export default LoginPage;