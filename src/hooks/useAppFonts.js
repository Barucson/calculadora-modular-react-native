import { useFonts } from 'expo-font';

import { FONT_ASSETS } from '../theme/fonts';

/**
 * Hook customizado responsavel apenas pelo carregamento das fontes.
 * Se o download falhar, libera a interface com a fonte do sistema
 * em vez de deixar o app preso na tela de carregamento.
 */
export default function useAppFonts() {
  const [loaded, error] = useFonts(FONT_ASSETS);

  return {
    fontsReady: loaded || Boolean(error),
    fontsError: error || null,
  };
}
