import CalculationError from './CalculationError';

/**
 * Regra de negocio matematica — funcoes puras, sem React e sem estado.
 * Toda operacao recebe numeros e devolve numero (ou lanca CalculationError).
 */

const ensureFinite = (value) => {
  if (!Number.isFinite(value)) {
    throw new CalculationError('Resultado invalido');
  }
  return value;
};

/* ---------- operacoes binarias ---------- */

export const add = (a, b) => ensureFinite(a + b);

export const subtract = (a, b) => ensureFinite(a - b);

export const multiply = (a, b) => ensureFinite(a * b);

export const divide = (a, b) => {
  if (b === 0) {
    throw new CalculationError('Divisao por zero');
  }
  return ensureFinite(a / b);
};

/** Potencia: a elevado a b. */
export const power = (a, b) => {
  const result = Math.pow(a, b);
  if (Number.isNaN(result)) {
    throw new CalculationError('Potencia invalida');
  }
  return ensureFinite(result);
};

/* ---------- operacoes unarias ---------- */

export const squareRoot = (a) => {
  if (a < 0) {
    throw new CalculationError('Raiz de negativo');
  }
  return ensureFinite(Math.sqrt(a));
};

export const logBase10 = (a) => {
  if (a <= 0) {
    throw new CalculationError('Log exige valor > 0');
  }
  return ensureFinite(Math.log10(a));
};

export const logBase2 = (a) => {
  if (a <= 0) {
    throw new CalculationError('Log exige valor > 0');
  }
  return ensureFinite(Math.log2(a));
};

export const negate = (a) => ensureFinite(-a);

/* ---------- registros consultados pelo hook ---------- */

/**
 * Cada operacao binaria declara seu simbolo (para o visor) e sua funcao pura.
 * Adicionar uma nova operacao = adicionar uma entrada aqui + um botao no layout.
 */
export const BINARY_OPERATIONS = {
  add: { symbol: '+', apply: add },
  subtract: { symbol: '-', apply: subtract },
  multiply: { symbol: 'x', apply: multiply },
  divide: { symbol: '/', apply: divide },
  power: { symbol: '^', apply: power },
};

export const UNARY_OPERATIONS = {
  squareRoot: { apply: squareRoot, describe: (value) => `raiz(${value})` },
  logBase10: { apply: logBase10, describe: (value) => `log(${value})` },
  logBase2: { apply: logBase2, describe: (value) => `log2(${value})` },
  negate: { apply: negate, describe: (value) => `-(${value})` },
};

export const getBinaryOperation = (id) => {
  const operation = BINARY_OPERATIONS[id];
  if (!operation) {
    throw new CalculationError(`Operacao desconhecida: ${id}`);
  }
  return operation;
};

export const getUnaryOperation = (id) => {
  const operation = UNARY_OPERATIONS[id];
  if (!operation) {
    throw new CalculationError(`Operacao desconhecida: ${id}`);
  }
  return operation;
};
