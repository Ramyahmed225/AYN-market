import { useMutation } from "@apollo/client";
import {useNavigate} from 'react-router-dom'
import AuthAPI from '../api/auth.api';
import { useAuthContext } from "./useAuthContext";
import TokenStorage from '../services/TokenStorage.service';

export const useAuthApi = () => {
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();
    const [createUser] = useMutation(AuthAPI.createUser());
    const [obtainToken] = useMutation(AuthAPI.obtainToken());
    const [refreshToken] = useMutation(AuthAPI.refreshToken());

    const createUserApi = (input) => {
        
        return createUser({variables:{input}})
    }

   const obtainTokenApi = async (email,password) => {
        const response = await obtainToken({ variables: { email, password } });
       if (response?.data) {
           const { token, refreshToken, user } = response.data.obtainToken;
           if (token && refreshToken) {
               TokenStorage.storeToken(token);
               TokenStorage.storeRefreshToken(refreshToken);
               TokenStorage.storeUser(user);
               dispatch({ type: "LOGIN", payload: response.data.obtainToken.user, token: response.data.obtainToken.token });
               if (response.data.obtainToken.user.isSuperuser) {
                   navigate("/profile");
               }
               else {
                   navigate("/");
               }

           }
       }
    }

    const refreshTokenApi = (token) => {
        return refreshToken({variables:{refreshToken: token}})
    }

 return{
        createUserApi,
        obtainTokenApi,
        refreshTokenApi,
 }

};