import CalculationError from './CalculationError';
import { MAX_DISPLAY_LENGTH } from '../../config/app';

const PRECISION = 12;

/**
 * Converte o texto do visor em numero.
 * Aceita visor parcial ("-", "5.") tratando-o como o numero equivalente.
 */
export function parseDisplay(display) {
  const value = Number.parseFloat(display);
  return Number.isNaN(value) ? 0 : value;
}

/**
 * Converte um numero em texto apresentavel no visor,
 * evitando lixo de ponto flutuante (0.30000000000000004).
 */
export function formatNumber(value) {
  if (!Number.isFinite(value)) {
    throw new CalculationError('Resultado invalido');
  }

  const rounded = Number(value.toPrecision(PRECISION));
  const magnitude = Math.abs(rounded);

  if (magnitude !== 0 && (magnitude >= 1e12 || magnitude < 1e-9)) {
    return rounded.toExponential(6);
  }

  const text = String(rounded);
  return text.length > MAX_DISPLAY_LENGTH ? rounded.toPrecision(8) : text;
}
