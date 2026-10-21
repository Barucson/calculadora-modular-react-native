/**
 * Layout declarativo do teclado.
 *
 * Cada tecla e um descritor passado por props ao componente <Button />:
 *   label   -> texto exibido
 *   variant -> estilo visual (number | operator | function | memory | danger | accent)
 *   action  -> qual regra do hook deve ser executada
 *   payload -> parametro da regra (o digito ou o id da operacao matematica)
 *   flex    -> largura relativa da tecla (opcional, padrao 1)
 *
 * Para acrescentar uma operacao basta registrar a funcao em core/math/operations.js
 * e adicionar uma linha aqui — nenhum componente precisa mudar.
 */
const digit = (value) => ({
  id: `digit-${value}`,
  label: value,
  variant: 'number',
  action: 'digit',
  payload: value,
});

export const KEYPAD_LAYOUT = [
  [
    { id: 'ms', label: 'MS', variant: 'memory', action: 'memoryStore' },
    { id: 'm-add', label: 'M+', variant: 'memory', action: 'memoryAdd' },
    { id: 'mr', label: 'MR', variant: 'memory', action: 'memoryRecall' },
    { id: 'mc', label: 'MC', variant: 'memory', action: 'memoryClear' },
  ],
  [
    { id: 'sqrt', label: '√x', variant: 'function', action: 'unary', payload: 'squareRoot' },
    { id: 'power', label: 'xʸ', variant: 'function', action: 'binary', payload: 'power' },
    { id: 'log10', label: 'log', variant: 'function', action: 'unary', payload: 'logBase10' },
    { id: 'log2', label: 'log₂', variant: 'function', action: 'unary', payload: 'logBase2' },
  ],
  [
    { id: 'clear', label: 'AC', variant: 'danger', action: 'clear' },
    { id: 'backspace', label: '⌫', variant: 'function', action: 'backspace' },
    { id: 'negate', label: '+/−', variant: 'function', action: 'unary', payload: 'negate' },
    { id: 'divide', label: '÷', variant: 'operator', action: 'binary', payload: 'divide' },
  ],
  [digit('7'), digit('8'), digit('9'), { id: 'multiply', label: '×', variant: 'operator', action: 'binary', payload: 'multiply' }],
  [digit('4'), digit('5'), digit('6'), { id: 'subtract', label: '−', variant: 'operator', action: 'binary', payload: 'subtract' }],
  [digit('1'), digit('2'), digit('3'), { id: 'add', label: '+', variant: 'operator', action: 'binary', payload: 'add' }],
  [
    { ...digit('0'), flex: 2 },
    { id: 'decimal', label: '.', variant: 'number', action: 'decimal' },
    { id: 'equals', label: '=', variant: 'accent', action: 'equals' },
  ],
];

export default KEYPAD_LAYOUT;
