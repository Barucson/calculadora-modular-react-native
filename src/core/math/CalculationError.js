/**
 * Erro de dominio da camada matematica.
 * A interface nao precisa conhecer "como" o erro ocorreu, apenas exibir a mensagem.
 */
export default class CalculationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CalculationError';
  }
}
