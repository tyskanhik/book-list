export const LANGUAGES = {
  RUSSIAN: 'Русский',
  ENGLISH: 'Английский',
  GERMAN: 'Немецкий',
  FRENCH: 'Французский',
  SPANISH: 'Испанский',
  ITALIAN: 'Итальянский',
  CHINESE: 'Китайский',
  JAPANESE: 'Японский',
  KOREAN: 'Корейский',
  ARABIC: 'Арабский',
  HINDI: 'Хинди',
  PORTUGUESE: 'Португальский',
  DUTCH: 'Голландский',
  POLISH: 'Польский',
  CZECH: 'Чешский',
  UKRAINIAN: 'Украинский',
  BELARUSIAN: 'Белорусский',
  TURKISH: 'Турецкий',
  SWEDISH: 'Шведский',
  DANISH: 'Датский',
  NORWEGIAN: 'Норвежский',
  FINNISH: 'Финский'
} as const;

export type Language = typeof LANGUAGES[keyof typeof LANGUAGES];

export const LANGUAGE_OPTIONS = Object.entries(LANGUAGES).map(([_, value]) => ({
  label: value,
  value: value
}));