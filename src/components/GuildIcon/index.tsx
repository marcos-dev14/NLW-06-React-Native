import React from 'react';
import { Image } from 'react-native';

import { styles } from './styles';

export function GuildIcon() {
  const uri = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe57ICF6Eeb-ZmBFsHFcfKw2XZGYulxgqW-3PxnzbvdBJtJDdgbr37ig9m5ENpAdxvRqo&usqp=CAU'

  return (
    <Image 
      source={{ uri }}
      style={styles.image}
      resizeMode="cover"
    />
  );
}