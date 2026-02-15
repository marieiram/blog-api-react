//Loginページ
import { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../contexts/useAuth";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const { isAutheticated } = useAuth();
    const navigate = useNavigate();



    //ログイン状態が変わったら（＝ログインに成功したら）URLを変更する
    useEffect(() => {
        if (isAutheticated) {
            navigate("/posts");
        }
    }, [isAutheticated, navigate])

    return (
        <LoginForm />
    )

}

export default LoginPage;