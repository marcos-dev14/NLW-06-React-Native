import React from "react";
import { 
  Text,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native';

// Por questão de não conseguir usar o butão no Emulador do Android, não da para usar o RectButton

// import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

// type ButtonProps = RectButtonProps & {
//   title: string; 
// }

import DiscordImg from '../../assets/discord.png';

import { styles } from './styles';

type ButtonProps = TouchableOpacityProps & {
  title: string; 
}

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity 
      style={styles.container}
      {...rest}  
    >
      <Text 
        style={styles.titleButton}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}