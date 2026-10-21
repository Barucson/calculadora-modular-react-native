import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, radius, spacing, typography } from '../../theme/theme';

/**
 * Botao generico e reutilizavel.
 * Nao conhece calculadora: recebe tudo por props (rotulo, estilo e manipulador).
 */
export default function Button({ label, variant = 'number', flex = 1, onPress, accessibilityLabel }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || label}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant] || variantStyles.number,
        { flex },
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.label, labelStyles[variant]]} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: spacing.xs,
    paddingVertical: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: {
    opacity: 0.6,
    transform: [{ scale: 0.97 }],
  },
  label: {
    color: colors.text,
    fontSize: typography.key,
    fontWeight: '500',
  },
});

const variantStyles = StyleSheet.create({
  number: { backgroundColor: colors.number },
  operator: { backgroundColor: colors.operator },
  function: { backgroundColor: colors.function },
  memory: { backgroundColor: colors.memory, borderColor: colors.memoryText },
  danger: { backgroundColor: colors.danger, borderColor: colors.danger },
  accent: { backgroundColor: colors.accent, borderColor: colors.accent },
});

const labelStyles = StyleSheet.create({
  memory: { color: colors.memoryText, fontSize: typography.keySmall, fontWeight: '700' },
  function: { fontSize: typography.keySmall, fontWeight: '600' },
  danger: { fontWeight: '700' },
  accent: { color: colors.accentText, fontWeight: '700' },
  operator: { fontWeight: '700' },
});
