import React from "react";
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from "../hooks/auth";

import { SingIn } from '../screens/SignIn';
import { Background } from "../components/Background";

import { AuthRoutes } from './auth.routes';

export function Routes() {
  const { user } = useAuth();

  return (
    <Background>
      <NavigationContainer>
        { user.id ? <AuthRoutes /> : <SingIn />}
      </NavigationContainer>
    </Background>
  );
}