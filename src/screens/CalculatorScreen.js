import React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';

import { Display, Header, Keypad } from '../components';
import { APP_TITLE } from '../config/app';
import KEYPAD_LAYOUT from '../config/keypadLayout';
import { formatNumber } from '../core/math/format';
import useCalculator from '../hooks/useCalculator';
import { colors } from '../theme/theme';

/**
 * Camada de apresentacao.
 * Consome o hook useCalculator e distribui estado/acoes via props.
 * Nenhuma conta e feita aqui.
 */
export default function CalculatorScreen() {
  const { display, expression, hasError, hasMemory, memoryValue, press } = useCalculator();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.header} />
      <View style={styles.container}>
        <Header title={APP_TITLE} subtitle="Calculadora modular — React Native" />

        <Display
          value={display}
          expression={expression}
          hasError={hasError}
          hasMemory={hasMemory}
          memoryValue={hasMemory ? formatNumber(memoryValue) : ''}
        />

        <Keypad layout={KEYPAD_LAYOUT} onKeyPress={press} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
