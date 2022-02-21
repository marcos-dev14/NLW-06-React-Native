import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './styles';

type ListProps = {
  title: string;
  subTitle: string;
}

export function ListHeader({ title, subTitle }: ListProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        { title }
      </Text>

      <Text style={styles.subTitle}>
        { subTitle }
      </Text>
    </View>
  );
}