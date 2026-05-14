export const COUNTRY_PREFIXES = [
  { code: 'AR', name: 'Argentina', prefix: '+54', flag: '🇦🇷' },
  { code: 'UY', name: 'Uruguay', prefix: '+598', flag: '🇺🇾' },
  { code: 'CL', name: 'Chile', prefix: '+56', flag: '🇨🇱' },
  { code: 'PY', name: 'Paraguay', prefix: '+595', flag: '🇵🇾' },
  { code: 'BR', name: 'Brasil', prefix: '+55', flag: '🇧🇷' },
  { code: 'BO', name: 'Bolivia', prefix: '+591', flag: '🇧🇴' },
  { code: 'CO', name: 'Colombia', prefix: '+57', flag: '🇨🇴' },
  { code: 'PE', name: 'Perú', prefix: '+51', flag: '🇵🇪' },
  { code: 'EC', name: 'Ecuador', prefix: '+593', flag: '🇪🇨' },
  { code: 'VE', name: 'Venezuela', prefix: '+58', flag: '🇻🇪' },
  { code: 'MX', name: 'México', prefix: '+52', flag: '🇲🇽' },
  { code: 'ES', name: 'España', prefix: '+34', flag: '🇪🇸' },
  { code: 'US', name: 'Estados Unidos', prefix: '+1', flag: '🇺🇸' },
];

// Lista letal de términos y raíces prohibidas
export const FORBIDDEN_WORDS = [
  // Raíces y palabras clave
  'bolud', 'pelotud', 'mierd', 'puto', 'puta', 'concha', 'pij', 'orto',
  'pajer', 'cagon', 'forro', 'forra', 'culon', 'culo', 'chota', 'choto',
  'trolo', 'trola', 'garca', 'falopa', 'nazi', 'hitler', 'violad', 'pedofilo',
  'hdp', 'pene', 'vagina', 'clitoris', 'tetas', 'teta', 'garch', 'poronga',
  'paja', 'pajeo', 'verga', 'ojete', 'zorra', 'zorr', 'mame', 'mamar', 'chupa',
  'pete', 'petera', 'trava', 'travesti', 'pajerin', 'pajon',
  
  // Verbos y combinaciones peligrosas
  'viol', 'pije', 'culi'
];

// Palabras que son seguras y NO deben ser bloqueadas aunque contengan raíces prohibidas
export const SAFE_WORDS = [
  'pajaro', 'pajarito', 'musculo', 'muscular', 'arcos', 'arco', 'aparcar', 
  'concha espina', 'ricardo', 'espada', 'casco', 'botas', 'pelota', 'pelotazo',
  'rompe arcos', 'rompe redes', 'rompe-arcos', 'cañonero', 'goleador', 'delantero',
  'arquero', 'defensa', 'mediocampo', 'capitan', 'arbitro', 'estadio', 'tribuna'
];

// Combinaciones que son ofensivas solo cuando aparecen juntas
export const FORBIDDEN_PHRASES = [
  'hijo de puta', 'la concha de', 'la puta madre', 'andate a la', 
  'rompe orto', 'rompe culo', 'chupa pija', 'pela verga', 'pela pija',
  'come mierda', 'traga leche', 'traga sable'
];

/**
 * Normaliza básico: minúsculas, sin acentos y leetspeak avanzado.
 */
function getLeetNormalized(text: string): string {
  const leetMap: { [key: string]: string } = {
    '0': 'o', '1': 'i', '2': 'z', '3': 'e', '4': 'a', '5': 's', '7': 't', '8': 'b', '9': 'g',
    '@': 'a', '!': 'i', '$': 's', '|': 'l', '(': 'c', '[': 'c', '{': 'c', 'k': 'c', 'v': 'v',
    'x': 'x', 'w': 'v'
  };
  return text.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split('')
    .map(char => leetMap[char] || char)
    .join('');
}

/**
 * Valida si un apodo contiene palabras inadecuadas con triple chequeo.
 */
export function isValidNickname(nickname: string): boolean {
  if (!nickname || nickname.length < 3) return false;

  const original = nickname.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const leet = getLeetNormalized(nickname);
  const collapsed = leet.replace(/(.)\1+/g, '$1'); 
  const stripped = leet.replace(/[^a-z]/g, '');

  // 1. Chequeo de FRASES prohibidas (más específicas)
  if (FORBIDDEN_PHRASES.some(phrase => {
    const phraseNorm = getLeetNormalized(phrase).replace(/[^a-z]/g, '');
    return stripped.includes(phraseNorm) || original.includes(phrase.toLowerCase());
  })) return false;

  // 2. Chequeo de PALABRAS prohibidas
  const hasForbiddenWord = FORBIDDEN_WORDS.some(word => {
    const wordNorm = getLeetNormalized(word);
    
    // Si la palabra prohibida está presente en alguna de las normalizaciones
    const isPresent = (
      original.includes(wordNorm) || 
      leet.includes(wordNorm) || 
      collapsed.includes(wordNorm) || 
      stripped.includes(wordNorm)
    );

    if (!isPresent) return false;

    // Si está presente, verificamos si es parte de una SAFE_WORD
    const isSafe = SAFE_WORDS.some(safe => {
      const safeNorm = getLeetNormalized(safe);
      const safeStripped = safeNorm.replace(/[^a-z]/g, '');
      
      // Si la palabra segura contiene la palabra prohibida, 
      // y el apodo contiene la palabra segura en el mismo lugar donde está la prohibida
      return (
        (safeNorm.includes(wordNorm) && original.includes(safeNorm)) ||
        (safeStripped.includes(wordNorm) && stripped.includes(safeStripped))
      );
    });

    return !isSafe;
  });

  return !hasForbiddenWord;
}
