import { computed, inject, Injectable, signal } from '@angular/core';
import { Book, BookFilters, CreateBookDto } from '../models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_URLS } from '../constants/api.constants';
import { catchError, Observable, of, tap } from 'rxjs';

interface BooksState {
  books: Book[];
  loading: boolean;
  error: string | null;
  filters: BookFilters;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = API_URLS.BOOKS;

  private readonly state = signal<BooksState>({
    books: [],
    loading: false,
    error: null,
    filters: {}
  });

  public readonly books = computed(() => this.state().books);
  public readonly loading = computed(() => this.state().loading);
  public readonly error = computed(() => this.state().error);
  public readonly filters = computed(() => this.state().filters);


  public loadBooks(filters?: BookFilters): Observable<Book[]> {
    if (filters) {
      this.updateFilters(filters);
    }

    this.state.update(state => ({ ...state, loading: true, error: null }));

    const params = this.buildQueryParams(this.state().filters);
    
    return this.http.get<Book[]>(this.apiUrl, { params }).pipe(
      tap(books => {
        const sortedBooks = [...books].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.state.update(state => ({ ...state, books: sortedBooks, loading: false }));
      }),
      catchError(err => {
        console.error('Error loading books:', err);
        this.state.update(state => ({ ...state, error: 'Не удалось загрузить книги', loading: false }));
        return of([]);
      })
    );
  }

  public getBookById(id: string): Observable<Book | null> {
    this.state.update(state => ({ ...state, loading: true, error: null }));

    return this.http.get<Book>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.state.update(state => ({ ...state, loading: false }))),
      catchError(err => {
        console.error(`Error loading book ${id}:`, err);
        this.state.update(state => ({ ...state, error: 'Не удалось загрузить книгу', loading: false }));
        return of(null);
      })
    );
  }

  public createBook(book: CreateBookDto): Observable<Book | null> {
    const newBook = {
      ...book,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      pageCount: book.pageCount ?? 0,
      publishedYear: book.publishedYear ?? undefined
    };

    this.state.update(state => ({ ...state, books: [newBook as Book, ...state.books] }));

    return this.http.post<Book>(this.apiUrl, newBook).pipe(
      catchError(err => {
        console.error('Error creating book:', err);
        this.state.update(state => ({
          ...state,
          books: state.books.filter(b => b.id !== newBook.id),
          error: 'Не удалось создать книгу'
        }));
        return of(null);
      })
    );
  }

  public updateFilters(filters: Partial<BookFilters>): void {
    this.state.update(state => ({ ...state, filters: { ...state.filters, ...filters } }));
  }

  private buildQueryParams(filters: BookFilters): HttpParams {
    let params = new HttpParams();
    
    if (filters.searchTerm) {
      params = params.set('q', filters.searchTerm);
    }
    
    if (filters.genre) {
      params = params.set('genre', filters.genre);
    }
    
    if (filters.language) {
      params = params.set('language', filters.language);
    }
    
    if (filters.pageCountFrom) {
      params = params.set('pageCount_gte', filters.pageCountFrom.toString());
    }
    
    if (filters.pageCountTo) {
      params = params.set('pageCount_lte', filters.pageCountTo.toString());
    }
    
    return params;
  }
}
