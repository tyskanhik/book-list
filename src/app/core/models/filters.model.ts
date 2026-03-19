export interface BookFilters {
  searchTerm?: string;        // Поиск по названию, описанию, автору
  pageCountFrom?: number;      // Фильтр по страницам от
  pageCountTo?: number;        // Фильтр по страницам до
  genre?: string;              // Фильтр по жанру
  language?: string;           // Фильтр по языку
}