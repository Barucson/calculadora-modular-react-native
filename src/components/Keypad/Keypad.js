import React from 'react';
import { StyleSheet, View } from 'react-native';

import Button from '../Button/Button';
import { colors, spacing } from '../../theme/theme';

/**
 * Teclado: transforma o layout declarativo em <Button />.
 * Ele nao calcula nada — apenas repassa o descritor da tecla para onKeyPress.
 */
export default function Keypad({ layout, onKeyPress }) {
  return (
    <View style={styles.container}>
      {layout.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {row.map((key) => (
            <Button
              key={key.id}
              label={key.label}
              variant={key.variant}
              flex={key.flex}
              onPress={() => onKeyPress(key)}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.sm,
    backgroundColor: colors.background,
  },
  row: {
    flexDirection: 'row',
  },
});
