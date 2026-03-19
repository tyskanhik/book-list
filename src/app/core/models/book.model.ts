import { Genre } from './genre.enum';
import { Language } from './language.enum';

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  pageCount: number;
  language: Language;
  genre: Genre;
  publishedYear?: number;
  createdAt: Date;
}

export interface CreateBookDto {
  title: string;
  author: string;
  description: string;
  pageCount: number | null;
  language: Language;
  genre: Genre;
  publishedYear?: number | null;
}

export interface BookFormValue {
  title: string;
  author: string;
  description: string;
  pageCount: number | null;
  language: Language | null;
  genre: Genre | null;
  publishedYear: number | null;
}