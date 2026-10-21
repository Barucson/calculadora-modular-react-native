import { useCallback, useState } from 'react';

import { add } from '../core/math/operations';

/**
 * Hook customizado responsavel APENAS pela memoria da calculadora (MS / M+ / MR / MC).
 * Mantido separado do hook principal para isolar responsabilidades.
 */
export default function useMemory() {
  const [memory, setMemory] = useState(null);

  /** MS — grava (substitui) o valor na memoria. */
  const store = useCallback((value) => {
    setMemory(value);
  }, []);

  /** M+ — soma o valor ao que ja esta na memoria. */
  const accumulate = useCallback((value) => {
    setMemory((current) => (current === null ? value : add(current, value)));
  }, []);

  /** MR — devolve o valor gravado (0 quando a memoria esta vazia). */
  const recall = useCallback(() => (memory === null ? 0 : memory), [memory]);

  /** MC — limpa a memoria. */
  const clear = useCallback(() => {
    setMemory(null);
  }, []);

  return {
    memory,
    hasMemory: memory !== null,
    store,
    accumulate,
    recall,
    clear,
  };
}
