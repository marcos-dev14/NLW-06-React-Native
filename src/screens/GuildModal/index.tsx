import React from 'react';
import { View, FlatList } from 'react-native';
import { Guild, GuildDataProps } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';

import { styles } from './styles';

type GuildModalProps = {
  handleGuildSelect: (guild: GuildDataProps) => void;
}

export function GuildModal({ handleGuildSelect }: GuildModalProps) {
  const guilds = [
    {
      id: '1',
      name: 'Lendários',
      icon: 'image.png',
      owner: true,
    },
    {
      id: '2',
      name: 'Galera do CS',
      icon: 'image.png',
      owner: true,
    },
    {
      id: '3',
      name: 'Galera do CS',
      icon: 'image.png',
      owner: true,
    },
    {
      id: '4',
      name: 'Galera do CS',
      icon: 'image.png',
      owner: true,
    },
    {
      id: '5',
      name: 'Galera do CS',
      icon: 'image.png',
      owner: true,
    },
    {
      id: '6',
      name: 'Galera do CS',
      icon: 'image.png',
      owner: true,
    }
  ]

  return (
    <View style={styles.container}>
      <FlatList 
        data={guilds}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Guild 
            data={item} 
            onPress={() => handleGuildSelect(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 69 }}
        ItemSeparatorComponent={() => <ListDivider />}
        style={styles.guilds}
      />
    </View>
  );
}