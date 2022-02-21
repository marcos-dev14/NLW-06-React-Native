import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { SingIn } from '../screens/SignIn';
import { AppointmentCreate } from "../screens/AppointmentCreate";
import { AppointmentDetails } from "../screens/AppointmentDetails";

import { theme } from "../global/styles/theme";

const { Navigator, Screen } = createNativeStackNavigator()

export function AuthRoutes() {
  return (
    <Navigator
      initialRouteName="SingIn"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.secondary100
        }
      }}
    >
       <Screen 
        name="SingIn"
        component={SingIn}
      />
      <Screen 
        name="Home"
        component={Home}
      />

      <Screen 
        name="AppointmentDetails"
        component={AppointmentDetails}
      />

      <Screen 
        name="AppointmentCreate"
        component={AppointmentCreate}
      />
    </Navigator>
  );
}