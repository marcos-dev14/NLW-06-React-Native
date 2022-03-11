import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { GuildIcon } from '../GuildIcon';
import { categories } from '../../utils/categories';

import PlayerSvg from '../../assets/player.svg';
import CalendarSvg from '../../assets/calendar.svg';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

import { GuildDataProps } from '../Guild';

export type AppointmentDataProps = {
  id: string;
  guild: GuildDataProps;
  category: string;
  date: string;
  description: string;
}

type AppointmentProps = TouchableOpacityProps & {
  data: AppointmentDataProps;
}

export function Appointment({ data, ...rest }: AppointmentProps) {
  const [ category ] = categories.filter(item => item?.id === data.category);
  const { owner } = data.guild;
  const { primary, on, secondary50, secondary70 } = theme.colors;

  return (
    <TouchableOpacity {...rest}>
      <View style={styles.container}>
        <LinearGradient 
          style={styles.guildIconContainer}
          colors={[ secondary50, secondary70 ]}
        >
          <GuildIcon guildId={data.guild.id} iconId={data.guild.icon} />
        </LinearGradient>
        
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>
              { data.guild.name } 
            </Text>
            
            <Text style={styles.category}>
              { category?.title } 
            </Text>
          </View>

          <View style={styles.footer}>
            <View style={styles.dateInfo}>
              <CalendarSvg />

              <Text style={styles.date}>
                { data.date }
              </Text>
            </View>

            <View style={styles.playersInfo}>
              <PlayerSvg fill={ owner ? primary : on } />

              <Text style={[
                styles.player,
                {color: owner ? primary : on}
              ]}>
                { owner ? 'Anfritrião' : 'Visitante' }
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}