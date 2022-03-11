import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';
import { 
  Alert, 
  FlatList, 
  ImageBackground, 
  Text, 
  View,
  Share,
  Platform,
  TouchableOpacity
} from 'react-native';

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { ListHeader } from '../../components/ListHeader';
import { Member, MemberDataProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';

import BannerImg from '../../assets/banner.png';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

import { AppointmentDataProps } from '../../components/Appointment';
import { api } from '../../services/api';
import { Load } from '../../components/Load';

type ParamsProps = {
  guildSelected: AppointmentDataProps;
}

type GuildWidgetProps = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberDataProps[];
}

export function AppointmentDetails() {
  const [ widget, setWidget ] = useState<GuildWidgetProps>({} as GuildWidgetProps);
  const [ loading, setLoading ] = useState(true);

  const route = useRoute();
  const { guildSelected } = route.params as ParamsProps;

  async function fetchGuildWidget() {
    try {
      const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
      setWidget(response.data);

    } catch (error) {
      Alert.alert('Verifique as configurações do servidor. Será que o Widget está habilitado?');
    } finally {
      setLoading(false);
    }
  }

  function handleShareInvitation() {
    const message = Platform.OS === 'ios'
    ? `Junte-se a ${guildSelected.guild.name}`
    : widget.instant_invite;

    Share.share({
      message,
      url: widget.instant_invite
    })
  }

  useEffect(() => {
    fetchGuildWidget();
  },[])

  return (
    <Background>
      <Header 
        title="Detalhes"
        action={
          guildSelected.guild.owner &&
          <TouchableOpacity activeOpacity={0.7} onPress={handleShareInvitation}>
            <Fontisto 
              name="share"
              size={24}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
        }
      />
      
      <ImageBackground 
        source={BannerImg}
        style={styles.banner}
      >
        <View style={styles.bannerContent}>
          <Text style={styles.title}>
            {guildSelected.guild.name}
          </Text>

          <Text style={styles.subTitle}>
            {guildSelected.description}
          </Text>
        </View>
      </ImageBackground>


      {
        loading ? <Load /> : 
        <>
          <ListHeader 
            title="Jogadores"
            subTitle={`Total ${widget.members.length}`}
          />

          <FlatList 
            data={widget.members}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Member data={item} />
            )}
            ItemSeparatorComponent={() => <ListDivider />}
            style={styles.members}
          />
        </>
      }
      <View style={styles.footer}>
        <ButtonIcon title='Entrar na partida'/>
      </View>
    </Background>
  );
}