import React, { createContext, useContext, useState, ReactNode } from 'react';
import { api } from '../services/api';

import * as AuthSession from 'expo-auth-session';

import { 
  REDIRECT_URI,
  RESPONSE_TYPE,
  CLIENT_ID,
  SCOPE,
  CDN_IMAGE  
} from '../configs';

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
  SingInAuth: () => Promise<void>;
}

type AuthProviderProps = {
  children: ReactNode;
}

type AuthorizationResponseProps = AuthSession.AuthSessionResult & {
  params: {
    access_token: string;
  }
}

export const AuthContext = createContext({} as AuthContextDataProps);

function AuthProvider({ children }: AuthProviderProps) {
  const [ user, setUser ] = useState<UserProps>({} as UserProps);
  const [ loading, setLoading ] = useState(false);

  async function SingInAuth() {
    try {
      setLoading(true);
  
      const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
  
      const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponseProps;

      if(type === 'success') {
        api.defaults.headers.authorization = `Bearer ${params.access_token}`;

        const userInfo = await api.get('/users/@me');
        
        const firstName = userInfo.data.username.split(' ')[0];
        userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`

        setUser({
          ...userInfo.data,
          firstName,
          token: params.access_token
        });
        setLoading(false);
      } else {
        setLoading(false);
      }

    } catch  {
      throw new Error('Não foi possível autenticar');
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      SingInAuth
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

