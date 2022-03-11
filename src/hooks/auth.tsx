import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { api } from '../services/api';

import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { 
  REDIRECT_URI,
  RESPONSE_TYPE,
  CLIENT_ID,
  SCOPE,
  CDN_IMAGE  
} from '@env';

import { COLLECTION_USERS } from '../configs/database'; 

type UserProps = {
  id: string;
  username: string;
  firstName: string;
  avatar: string;
  email: string;
  token: string;
}

type AuthContextDataProps = {
  user: UserProps;
  loading: boolean;
  singInAuth: () => Promise<void>;
  singOutAuth: () => Promise<void>;
}

type AuthProviderProps = {
  children: ReactNode;
}

type AuthorizationResponseProps = AuthSession.AuthSessionResult & {
  params: {
    access_token?: string;
    error?: string;
  }
}

export const AuthContext = createContext({} as AuthContextDataProps);

function AuthProvider({ children }: AuthProviderProps) {
  const [ user, setUser ] = useState<UserProps>({} as UserProps);
  const [ loading, setLoading ] = useState(false);

  async function singInAuth() {
    try {
      setLoading(true);
  
      const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
  
      const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponseProps;

      if(type === 'success' && !params.error) {
        api.defaults.headers.authorization = `Bearer ${params.access_token}`;

        const userInfo = await api.get('/users/@me');
        
        const firstName = userInfo.data.username.split(' ')[0];
        userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`

        const userData = {
          ...userInfo.data,
          firstName,
          token: params.access_token
        }

        await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData));
        setUser(userData);
      } 
    } catch  {
      throw new Error('Não foi possível autenticar');
    } finally {
      setLoading(false);
    }
  }

  async function singOutAuth() {
    setUser({} as UserProps);
    await AsyncStorage.removeItem(COLLECTION_USERS);    
  }

  async function loadUserStorageData() {
    const storage = await AsyncStorage.getItem(COLLECTION_USERS);
    
    if(storage) {
      const userLogged = JSON.parse(storage) as UserProps;
      api.defaults.headers.authorization = `Bearer ${userLogged.token}`;

      setUser(userLogged);
    }
  }

  useEffect(() => {
    loadUserStorageData();
  },[])

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      singInAuth,
      singOutAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Criando nosso próprio hook useAuth
function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export {
  AuthProvider,
  useAuth
}

