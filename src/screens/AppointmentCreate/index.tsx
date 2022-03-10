import React, { useState } from 'react';
import { 
  Text, 
  View, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  ScrollView, 
  Platform 
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Background } from '../../components/Background';
import { CategorySelect } from '../../components/CategorySelect';
import { GuildIcon } from '../../components/GuildIcon';
import { Header } from '../../components/Header';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';

import { ModalView } from '../../components/ModalView';
import { GuildModal } from '../GuildModal';

import { theme } from '../../global/styles/theme';
import { styles } from  './styles';

import { GuildDataProps } from '../../components/Guild';


export function AppointmentCreate() {
  const [ category, setCategory ] = useState('');
  const [ openGuildsModal, setOpenGuildsModal ] = useState(false);
  const [ guild, setGuild ] = useState<GuildDataProps>({} as GuildDataProps);

  function handleOpenGuilds() {
    setOpenGuildsModal(true);
  }

  function handleCloseGuilds() {
    setOpenGuildsModal(false);
  }

  function handleGuildSelect(guildSelect: GuildDataProps) {
    setGuild(guildSelect);
    setOpenGuildsModal(false);
  }

  function handleCategorySelect(categoryId: string) {
    setCategory(categoryId)
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView>
        <Background>
          <Header 
            title="Agendar partida"
          />
          
          <Text style={[
            styles.label, 
            { marginLeft: 24,
              marginTop: 36,
              marginBottom: 18,
            }]}>
            Categoria
          </Text>

          <CategorySelect 
            hasCheckBox
            setCategory={handleCategorySelect}
            categorySelected={category}
          />

          <View style={styles.form}>
            <TouchableOpacity onPress={handleOpenGuilds}>
              <View style={styles.select}>
                { guild.icon 
                  ? <GuildIcon guildId={guild.id} iconId={guild.icon} /> 
                  : <View style={styles.image} /> 
                }

                <View style={styles.selectBody}>
                  <Text style={styles.selectText}>
                    { guild.name 
                      ? guild.name 
                      : 'Selecione um servidor'
                    }
                  </Text>
                </View>

                <Feather 
                  name="chevron-right"
                  color={theme.colors.heading}
                  size={18}
                />
              </View>
            </TouchableOpacity>

            <View style={styles.field}>
              <View>
                <Text style={[styles.label, {marginBottom: 17}]}>
                  Dia e Mês
                </Text>

                <View style={styles.column}>
                  <SmallInput maxLength={2} />
                  <Text style={styles.divider}>
                    /
                  </Text>
                  <SmallInput maxLength={2} />
                </View>
              </View>

              <View>
                <Text style={[styles.label, { marginBottom: 17 }]}>
                  Hora e Minutos
                </Text>

                <View style={styles.column}>
                  <SmallInput maxLength={2} />
                  <Text style={styles.divider}>
                    :
                  </Text>
                  <SmallInput maxLength={2} />
                </View>
              </View>
            </View>

            <View style={[styles.field, { marginBottom: 12}]}>
              <Text style={styles.label}>
                Descrição
              </Text>

              <Text style={styles.caracteresLimit}>
                Max 100 caracteres
              </Text>
            </View>

            <TextArea 
              multiline
              maxLength={100}
              numberOfLines={5}
              autoCorrect={false}
            />

            <View style={styles.footer}>
              <Button title="Agendar" />
            </View>
          </View>
        </Background>
      </ScrollView>

       <ModalView visible={openGuildsModal} closeModal={handleCloseGuilds}>
        <GuildModal handleGuildSelect={handleGuildSelect} />
      </ModalView>
    </KeyboardAvoidingView>
  );
}