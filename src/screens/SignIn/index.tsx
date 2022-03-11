import React from 'react';
import { 
  View, 
  Text,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';

import { Background } from '../../components/Background';

import IllustrationImg from '../../assets/illustration.png';
import { ButtonIcon } from '../../components/ButtonIcon';

import { useAuth } from '../../hooks/auth';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

export function SingIn() {
  const { loading, singInAuth } = useAuth();

  async function handleSignInAuth() {
    try {
      await singInAuth();
    } catch (error) {
      Alert.alert('Não foi possível autenticar');
    }
  }

  return (
    <Background>
      <View style={styles.container}>
        <Image 
          source={IllustrationImg} 
          style={styles.image}
          resizeMode={'stretch'}
        />

        <View style={styles.content}>
          <Text style={styles.title}>
            Conecte-se {'\n'}
            e organize suas {'\n'}
            jogatinas
          </Text>

          <Text style={styles.subTitle}>
            Crie grupos para jogar seus games {'\n'}
            favoritos com seus amigos
          </Text>

          {   
            loading
            ? <ActivityIndicator color={theme.colors.primary} />
            : <ButtonIcon 
                title="Entrar com Discord"
                activeOpacity={0.7}
                onPress={handleSignInAuth}
              />
          }
        </View>
      </View>
    </Background>
  )
}