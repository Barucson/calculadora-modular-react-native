import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { fontFamily } from '../../theme/fonts';
import { colors, radius, spacing, typography } from '../../theme/theme';

/**
 * Visor principal: linha secundaria com a expressao, linha principal com o valor
 * e um indicador "M" quando existe numero gravado na memoria.
 */
export default function Display({ value, expression, hasMemory, memoryValue, hasError }) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        {hasMemory ? (
          <View style={styles.memoryBadge}>
            <Text style={styles.memoryBadgeText}>M {memoryValue}</Text>
          </View>
        ) : (
          <View />
        )}
        <Text style={styles.expression} numberOfLines={1}>
          {expression}
        </Text>
      </View>

      <Text style={[styles.value, hasError && styles.valueError]} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.5}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.surface,
    borderBottomLeftRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 26,
  },
  memoryBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.sm,
    backgroundColor: colors.memory,
  },
  memoryBadgeText: {
    color: colors.memoryText,
    fontSize: typography.caption,
    fontFamily: fontFamily.uiBold,
    letterSpacing: 0.5,
  },
  expression: {
    flex: 1,
    textAlign: 'right',
    color: colors.textMuted,
    fontSize: typography.expression,
    fontFamily: fontFamily.displayRegular,
  },
  value: {
    marginTop: spacing.sm,
    textAlign: 'right',
    color: colors.text,
    fontSize: typography.display,
    fontFamily: fontFamily.displayLight,
    letterSpacing: -1,
  },
  valueError: {
    color: colors.danger,
  },
});
