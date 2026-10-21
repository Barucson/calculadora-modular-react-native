import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '../../theme/theme';

/**
 * Tela exibida enquanto as fontes sao carregadas.
 * Usa a fonte do sistema de proposito: as customizadas ainda nao existem aqui.
 */
export default function Splash({ message = 'Carregando...' }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.accent} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  message: {
    marginTop: spacing.md,
    color: colors.textMuted,
    fontSize: typography.caption,
    letterSpacing: 1,
  },
});
