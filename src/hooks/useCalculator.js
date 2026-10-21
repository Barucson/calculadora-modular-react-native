import { useCallback, useState } from 'react';

import CalculationError from '../core/math/CalculationError';
import { formatNumber, parseDisplay } from '../core/math/format';
import { getBinaryOperation, getUnaryOperation } from '../core/math/operations';
import { MAX_DISPLAY_LENGTH } from '../config/app';
import useMemory from './useMemory';

const INITIAL_STATE = {
  display: '0',
  expression: '',
  accumulator: null,
  operator: null,
  /** true quando o proximo digito deve substituir o visor em vez de concatenar. */
  overwrite: true,
  error: false,
};

/**
 * Hook principal: concentra TODO o estado e TODAS as regras da calculadora.
 * A camada de apresentacao apenas consome os valores e as funcoes retornadas aqui.
 */
export default function useCalculator() {
  const [state, setState] = useState(INITIAL_STATE);
  const memory = useMemory();

  /** Aplica uma transicao de estado protegida contra CalculationError. */
  const transition = useCallback((reducer) => {
    setState((current) => {
      const base = current.error ? { ...INITIAL_STATE } : current;
      try {
        return { ...base, ...reducer(base) };
      } catch (error) {
        if (error instanceof CalculationError) {
          return { ...INITIAL_STATE, display: 'Erro', expression: error.message, error: true };
        }
        throw error;
      }
    });
  }, []);

  /* ---------- entrada de dados ---------- */

  const inputDigit = useCallback(
    (digit) =>
      transition((current) => {
        if (current.overwrite) {
          return { display: digit, overwrite: false };
        }
        if (current.display === '0') {
          return { display: digit };
        }
        if (current.display.replace(/[-.]/g, '').length >= MAX_DISPLAY_LENGTH) {
          return {};
        }
        return { display: current.display + digit };
      }),
    [transition],
  );

  const inputDecimal = useCallback(
    () =>
      transition((current) => {
        if (current.overwrite) {
          return { display: '0.', overwrite: false };
        }
        return current.display.includes('.') ? {} : { display: `${current.display}.` };
      }),
    [transition],
  );

  const backspace = useCallback(
    () =>
      transition((current) => {
        if (current.overwrite) {
          return { display: '0' };
        }
        const next = current.display.slice(0, -1);
        return { display: next === '' || next === '-' ? '0' : next };
      }),
    [transition],
  );

  const clearAll = useCallback(() => setState(INITIAL_STATE), []);

  /* ---------- operacoes ---------- */

  /**
   * Seleciona uma operacao binaria (+, -, x, /, x^y).
   * Se ja havia uma operacao pendente, resolve o calculo anterior (calculo em cadeia).
   */
  const chooseOperation = useCallback(
    (operationId) =>
      transition((current) => {
        const operation = getBinaryOperation(operationId);
        const value = parseDisplay(current.display);

        if (current.operator !== null && !current.overwrite) {
          const pending = getBinaryOperation(current.operator);
          const result = pending.apply(current.accumulator, value);
          return {
            display: formatNumber(result),
            accumulator: result,
            operator: operationId,
            overwrite: true,
            expression: `${formatNumber(result)} ${operation.symbol}`,
          };
        }

        const accumulator = current.operator !== null ? current.accumulator : value;
        return {
          accumulator,
          operator: operationId,
          overwrite: true,
          expression: `${formatNumber(accumulator)} ${operation.symbol}`,
        };
      }),
    [transition],
  );

  /** Aplica uma operacao unaria (raiz, log, log2, sinal) sobre o valor do visor. */
  const applyUnary = useCallback(
    (operationId) =>
      transition((current) => {
        const operation = getUnaryOperation(operationId);
        const value = parseDisplay(current.display);
        const result = operation.apply(value);
        return {
          display: formatNumber(result),
          expression: `${operation.describe(formatNumber(value))} =`,
          overwrite: true,
        };
      }),
    [transition],
  );

  /** Resolve a operacao pendente. */
  const equals = useCallback(
    () =>
      transition((current) => {
        if (current.operator === null) {
          return {};
        }
        const operation = getBinaryOperation(current.operator);
        const value = parseDisplay(current.display);
        const result = operation.apply(current.accumulator, value);
        return {
          display: formatNumber(result),
          expression: `${formatNumber(current.accumulator)} ${operation.symbol} ${formatNumber(value)} =`,
          accumulator: null,
          operator: null,
          overwrite: true,
        };
      }),
    [transition],
  );

  /* ---------- memoria ---------- */

  const memoryStore = useCallback(() => {
    memory.store(parseDisplay(state.display));
    setState((current) => ({ ...current, overwrite: true }));
  }, [memory, state.display]);

  const memoryAdd = useCallback(() => {
    memory.accumulate(parseDisplay(state.display));
    setState((current) => ({ ...current, overwrite: true }));
  }, [memory, state.display]);

  const memoryRecall = useCallback(() => {
    const value = memory.recall();
    transition(() => ({
      display: formatNumber(value),
      overwrite: true,
    }));
  }, [memory, transition]);

  const memoryClear = useCallback(() => memory.clear(), [memory]);

  /* ---------- despachante usado pelo teclado ---------- */

  /**
   * Recebe o descritor de tecla ({ action, payload }) vindo das props do botao
   * e chama a regra correspondente. E o unico ponto de contato da UI com a logica.
   */
  const press = useCallback(
    ({ action, payload }) => {
      switch (action) {
        case 'digit':
          return inputDigit(payload);
        case 'decimal':
          return inputDecimal();
        case 'backspace':
          return backspace();
        case 'clear':
          return clearAll();
        case 'binary':
          return chooseOperation(payload);
        case 'unary':
          return applyUnary(payload);
        case 'equals':
          return equals();
        case 'memoryStore':
          return memoryStore();
        case 'memoryAdd':
          return memoryAdd();
        case 'memoryRecall':
          return memoryRecall();
        case 'memoryClear':
          return memoryClear();
        default:
          return undefined;
      }
    },
    [
      applyUnary,
      backspace,
      chooseOperation,
      clearAll,
      equals,
      inputDecimal,
      inputDigit,
      memoryAdd,
      memoryClear,
      memoryRecall,
      memoryStore,
    ],
  );

  return {
    // estado exposto para a camada de visualizacao
    display: state.display,
    expression: state.expression,
    hasError: state.error,
    memoryValue: memory.memory,
    hasMemory: memory.hasMemory,
    // acoes
    press,
    inputDigit,
    inputDecimal,
    backspace,
    clearAll,
    chooseOperation,
    applyUnary,
    equals,
    memoryStore,
    memoryAdd,
    memoryRecall,
    memoryClear,
  };
}
