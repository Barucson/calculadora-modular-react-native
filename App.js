import React from 'react';

import Splash from './src/components/Splash/Splash';
import useAppFonts from './src/hooks/useAppFonts';
import CalculatorScreen from './src/screens/CalculatorScreen';

/**
 * Ponto de entrada da aplicacao.
 * Nao contem regra de negocio: aguarda as fontes e monta a tela principal.
 */
export default function App() {
  const { fontsReady } = useAppFonts();

  if (!fontsReady) {
    return <Splash message="Carregando fontes..." />;
  }

  return <CalculatorScreen />;
}
