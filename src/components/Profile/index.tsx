import React from "react";
import { View, Text, TouchableOpacity, Alert } from 'react-native';

import { useAuth } from "../../hooks/auth";

import { Avatar } from "../Avatar";

import { styles } from "./styles";

export function Profile() {
  const { user, singOutAuth } = useAuth();

  function handleSignOut() {
    Alert.alert('Logout', 'Deseja desconectar do GamePlay?',
    [
      {
        text: 'Não',
        style: 'cancel'
      },
      {
        text: 'Sim',
        onPress: () => singOutAuth()
      }
    ])
  }

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={handleSignOut} activeOpacity={0.7}>
        <Avatar urlImage={user.avatar}/>
      </TouchableOpacity>

      <View>
        <View style={styles.user}>
          <Text style={styles.greeting}>
            Olá.
          </Text>

          <Text style={styles.userName}>
            {user.firstName}
          </Text>
        </View>

        <Text style={styles.message}>
          Hoje é dia de vitória
        </Text>
      </View>
    </View>
  );
}