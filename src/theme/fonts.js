import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import {
  JetBrainsMono_300Light,
  JetBrainsMono_400Regular,
  JetBrainsMono_700Bold,
} from '@expo-google-fonts/jetbrains-mono';

/**
 * Fontes da aplicacao.
 *
 * JetBrains Mono -> numeros e visor (digitos monoespacados nao "dancam"
 * quando o valor muda).
 * Inter -> rotulos de interface (MS, log2, AC, titulo).
 *
 * Com fontes customizadas o React Native ignora `fontWeight`: cada peso e
 * uma familia propria, por isso os tokens abaixo nomeiam o peso.
 */
export const fontFamily = {
  displayLight: 'JetBrainsMono_300Light',
  displayRegular: 'JetBrainsMono_400Regular',
  displayBold: 'JetBrainsMono_700Bold',
  uiRegular: 'Inter_400Regular',
  uiMedium: 'Inter_500Medium',
  uiSemiBold: 'Inter_600SemiBold',
  uiBold: 'Inter_700Bold',
};

/** Mapa consumido pelo carregador de fontes (a chave vira o fontFamily). */
export const FONT_ASSETS = {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  JetBrainsMono_300Light,
  JetBrainsMono_400Regular,
  JetBrainsMono_700Bold,
};

export default fontFamily;
