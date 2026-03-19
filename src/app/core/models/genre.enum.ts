export const GENRES = {
  FICTION: 'Роман',
  FANTASY: 'Фэнтези',
  MYSTERY: 'Детектив',
  ROMANCE: 'Любовный роман',
  SCIENCE: 'Научная литература',
  BIOGRAPHY: 'Биография',
  HISTORY: 'История',
  CLASSIC: 'Классика',
  SCIENCE_FICTION: 'Фантастика',
  THRILLER: 'Триллер',
  HORROR: 'Ужасы',
  POETRY: 'Поэзия',
  ADVENTURE: 'Приключения',
  PHILOSOPHY: 'Философия',
  PSYCHOLOGY: 'Психология',
  BUSINESS: 'Бизнес',
  CHILDREN: 'Детская литература',
  YOUNG_ADULT: 'Подростковая литература',
  DRAMA: 'Драма',
  FAIRY_TALE: 'Сказка',
  DETECTIVE: 'Детектив',
  COMEDY: 'Комедия',
  TRAGEDY: 'Трагедия',
  MYTHOLOGY: 'Мифология',
  RELIGION: 'Религия',
  ART: 'Искусство',
  COMPUTERS: 'Компьютеры и IT',
  MEDICINE: 'Медицина',
  COOKING: 'Кулинария',
  TRAVEL: 'Путешествия',
  SPORT: 'Спорт'
} as const;

export type Genre = typeof GENRES[keyof typeof GENRES];

export const GENRE_OPTIONS = Object.entries(GENRES).map(([_, value]) => ({
  label: value,
  value: value
}));