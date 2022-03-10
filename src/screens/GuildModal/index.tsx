import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';

import { Guild, GuildDataProps } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';
import { Load } from '../../components/Load';
import { api } from '../../services/api';

import { styles } from './styles';

type GuildModalProps = {
  handleGuildSelect: (guild: GuildDataProps) => void;
}

export function GuildModal({ handleGuildSelect }: GuildModalProps) {
  const [ guilds, setGuilds ] = useState<GuildDataProps[]>([]);
  const [ loading, setLoading ] = useState(true);

  async function fetchGuilds() {
    const response = await api.get('/users/@me/guilds');

    setGuilds(response.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchGuilds();
  },[])

  return (
    <View style={styles.container}>
      {
        loading ? <Load /> : 
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
      }
    </View>
  );
}