# Calculadora Modular — React Native

Trabalho individual de Engenharia de Aplicações Móveis.
Cabeçalho exigido: **Calculadora - Rafael Baruc Sementile Alves** (definido em `src/config/app.js`).

## Como executar

```bash
npm install
npx expo start      # leia o QR Code com o app Expo Go
```

No **Snack** (snack.expo.dev): crie os mesmos arquivos/pastas e cole o conteúdo.
`App.js` já é o ponto de entrada esperado pelo Snack.

## Estrutura de pastas

```
App.js                        ponto de entrada (só monta a tela)
src/
├── components/               componentização atômica (apresentação pura)
│   ├── Button/Button.js      botão genérico e reutilizável
│   ├── Display/Display.js    visor (valor, expressão e indicador de memória)
│   ├── Header/Header.js      barra de título personalizada
│   ├── Keypad/Keypad.js      grade de teclas a partir do layout
│   ├── Splash/Splash.js      tela de carregamento das fontes
│   └── index.js              barril de exportações
├── config/
│   ├── app.js                nome do autor / título / limite do visor
│   └── keypadLayout.js       layout declarativo das teclas (props dos botões)
├── core/math/                regra de negócio (funções puras, sem React)
│   ├── CalculationError.js   erro de domínio
│   ├── format.js             formatação/parse do visor
│   └── operations.js         operações + registros BINARY/UNARY
├── hooks/
│   ├── useAppFonts.js        hook customizado: carregamento das fontes
│   ├── useCalculator.js      hook customizado: todo o estado e as regras
│   └── useMemory.js          hook customizado: memória (MS/M+/MR/MC)
├── screens/
│   └── CalculatorScreen.js   composição da tela (consome o hook)
└── theme/
    ├── fonts.js              famílias de fonte + mapa de carregamento
    └── theme.js              tokens de cor, espaçamento e tipografia
```

## Tipografia

| Fonte | Uso |
|---|---|
| **JetBrains Mono** (300/400/700) | visor, expressão e teclas numéricas — dígitos monoespaçados não deslocam o layout quando o valor muda |
| **Inter** (400/500/600/700) | rótulos de interface: título, `MS`, `M+`, `log₂`, `AC` |

Carregadas via `expo-font` + `@expo-google-fonts/*` no hook `useAppFonts`, que
mostra `<Splash />` enquanto baixa e libera a interface com a fonte do sistema
caso o carregamento falhe. Com fontes customizadas o React Native ignora
`fontWeight`, por isso cada peso é uma família própria em `theme/fonts.js`.

## Requisitos funcionais atendidos

| Requisito | Onde |
|---|---|
| Barra de título `Calculadora - NOME` | `components/Header` + `config/app.js` |
| Visor de entrada e saída | `components/Display` |
| Teclado numérico, `+ − × ÷`, `AC` | `config/keypadLayout.js` |
| Raiz quadrada (`√x`) | `squareRoot` em `core/math/operations.js` |
| Potência (`xʸ`) | `power` (operação binária: base `xʸ` expoente `=`) |
| Logaritmo base 10 (`log`) e base 2 (`log₂`) | `logBase10` / `logBase2` |
| Gravar na memória (`MS` / `M+`) | `hooks/useMemory.js` |
| Recuperar da memória (`MR`), limpar (`MC`) | `hooks/useMemory.js` |

Extras: backspace (`⌫`), troca de sinal (`+/−`), cálculo em cadeia (`2 + 3 + 4 =`),
indicador `M` no visor e tratamento de erros (divisão por zero, raiz de negativo,
log de valor ≤ 0) sem travar o app.

## Decisões de arquitetura

- **Separação de regras de negócio**: `src/core/math` contém apenas funções puras
  (`add`, `power`, `squareRoot`, `logBase10`, ...). Elas não importam React e podem
  ser testadas isoladamente.
- **Hooks customizados**: `useCalculator` concentra estado (visor, acumulador,
  operação pendente) e expõe ações; `useMemory` isola a memória e é composto por ele.
  A camada de visualização apenas consome o que o hook devolve.
- **Comunicação por props**: cada tecla é um descritor
  (`{ label, variant, action, payload }`) em `config/keypadLayout.js`. O `<Keypad />`
  repassa o descritor ao `press()` do hook, e o `<Button />` recebe rótulo, estilo e
  manipulador exclusivamente por props — nenhum componente de UI faz contas.
- **Extensibilidade**: para adicionar uma operação, registre a função pura em
  `operations.js` e acrescente uma linha no layout. Nenhum componente muda.

## Entregas do trabalho

- [ ] Link do app no Expo Go
- [ ] Link do código-fonte no Snack
- [ ] Vídeo de demonstração no YouTube
