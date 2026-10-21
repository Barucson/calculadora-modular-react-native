/**
 * Tokens visuais da aplicacao (cores, espacamentos e tipografia).
 * Centralizados para que nenhum componente use valores "soltos".
 */
export const colors = {
  background: '#10141c',
  surface: '#171c26',
  surfaceAlt: '#1f2632',
  header: '#1b2230',
  border: '#2a3242',
  text: '#f3f5f9',
  textMuted: '#8b94a7',
  number: '#232b39',
  operator: '#2f3a4e',
  function: '#263142',
  memory: '#1d3b3a',
  memoryText: '#5fd4c4',
  accent: '#f0a92c',
  accentText: '#1a1205',
  danger: '#e2585c',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
};

export const typography = {
  display: 54,
  expression: 18,
  key: 24,
  keySmall: 17,
  title: 17,
  caption: 12,
};

export default { colors, spacing, radius, typography };
