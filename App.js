import React from 'react';

import CalculatorScreen from './src/screens/CalculatorScreen';

/**
 * Ponto de entrada da aplicacao.
 * Nao contem regra de negocio: apenas monta a tela principal.
 */
export default function App() {
  return <CalculatorScreen />;
}
