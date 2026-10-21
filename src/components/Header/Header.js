import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { fontFamily } from '../../theme/fonts';
import { colors, spacing, typography } from '../../theme/theme';

/**
 * Barra de titulo personalizada.
 * O texto vem por props — o componente nao sabe de onde ele foi lido.
 */
export default function Header({ title, subtitle }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.header,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    color: colors.text,
    fontSize: typography.title,
    fontFamily: fontFamily.uiBold,
    letterSpacing: 0.3,
  },
  subtitle: {
    marginTop: 3,
    color: colors.textMuted,
    fontSize: typography.caption,
    fontFamily: fontFamily.uiRegular,
    letterSpacing: 0.4,
  },
});
