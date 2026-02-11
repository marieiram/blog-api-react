import { useContext } from "react";
import { AuthContext } from "./AuthContext";

//AuthContextを使うためのカスタムフック
export const useAuth = () => {
    return useContext(AuthContext);
};
