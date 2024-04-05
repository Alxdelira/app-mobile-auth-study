import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { URL_API } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface AuthContextType {
  userInfo: any;
  login: (userInfo: AuthContextType) => void;
  isLoading: boolean;
  email: string;
  senha: string;
  logout: () => void;
  isLogged: () => void | object;
  splashLoading: boolean;


};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }): React.ReactNode => {

  const [userInfo, setUserInfo] = useState<AuthContextType | object>({});
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [splashLoading, setSplashLoading] = useState<boolean>(false)

  const login = ({ email, senha }: AuthContextType) => {
    setIsLoading(true)
    axios.post(`${URL_API}/login`, {
      email,
      senha
    }).then(res => {
      let userInfo = res.data
      console.log(userInfo)
      setUserInfo(userInfo)
      AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
      setIsLoading(false)
    }).catch(err => {
      console.log(err)
      setIsLoading(false)
    })

  }
  const logout = () => {
    setIsLoading(true)
    AsyncStorage.removeItem('userInfo')
    setUserInfo({})
    setIsLoading(false)
  }

  const isLogged = async () => {
    try {
      setSplashLoading(true)
      let userInfo = await AsyncStorage.getItem('userInfo')
      userInfo = JSON.parse(userInfo as string);
      if (userInfo) {
        setUserInfo({ userInfo })
      }
      setSplashLoading(false)
    } catch (error) {
      console.log('Erro de login', error)
    }
  }

  useEffect(() => {
    isLogged()
  }, [])

  return (
    <AuthContext.Provider value={{
      userInfo,
      splashLoading,
      isLoading,
      login,
      logout
    } as AuthContextType}>{children}</AuthContext.Provider>
  );
};