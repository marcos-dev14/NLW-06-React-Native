import React, { ReactNode } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

type HeaderProps = {
  title: string;
  action?: ReactNode;
}

export function Header({ title, action }: HeaderProps) {
  const { secondary40, secondary100, heading } = theme.colors;

  const navigation = useNavigation();
  
  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={[ secondary100, secondary40 ]}
    >
      <TouchableOpacity activeOpacity={0.7} onPress={handleGoBack} >
        <Feather 
          name="arrow-left"
          size={24}
          color={heading}
        />
      </TouchableOpacity>

      <Text style={styles.title}>
        { title }
      </Text>

      {
        action ?
        <View>
          { action }
        </View>
        :
        <View style={{ width: 24 }} />
      }

    </LinearGradient>
  );
}