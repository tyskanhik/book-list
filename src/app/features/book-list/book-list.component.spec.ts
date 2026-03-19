import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BookListComponent } from './book-list.component';
import { BookService } from '../../core/services/book.service';
import { Book } from '../../core/models';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let bookService: jasmine.SpyObj<BookService>;
  
  const mockBooks: Book[] = [
    {
      id: '1',
      title: 'Книга 1',
      author: 'Автор 1',
      description: 'Описание 1',
      pageCount: 100,
      language: 'Русский',
      genre: 'Роман',
      createdAt: new Date()
    }
  ];

  beforeEach(async () => {
    const booksSignal = signal<Book[]>(mockBooks);
    const loadingSignal = signal<boolean>(false);
    const errorSignal = signal<string | null>(null);
    const filtersSignal = signal({});

    const spy = jasmine.createSpyObj('BookService', ['loadBooks'], {
      books: booksSignal.asReadonly(),
      loading: loadingSignal.asReadonly(),
      error: errorSignal.asReadonly(),
      filters: filtersSignal.asReadonly(),
      totalBooks: signal(1).asReadonly()
    });
    
    spy.loadBooks.and.returnValue(of(mockBooks));

    await TestBed.configureTestingModule({
      imports: [BookListComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: BookService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    bookService = TestBed.inject(BookService) as jasmine.SpyObj<BookService>;

    (component as any).books = booksSignal.asReadonly();
    (component as any).loading = loadingSignal.asReadonly();
    (component as any).error = errorSignal.asReadonly();
    
    fixture.detectChanges();
  });

  it('должен загружать и отображать книги', () => {
    expect(bookService.loadBooks).toHaveBeenCalled();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.book-card')).toBeTruthy();
  });

  it('должен показывать загрузку', () => {
    const loadingSignal = signal<boolean>(true);
    (component as any).loading = loadingSignal.asReadonly();
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.loading-container')).toBeTruthy();
  });

  it('должен показывать ошибку', () => {
    const errorSignal = signal<string>('Ошибка загрузки');
    (component as any).error = errorSignal.asReadonly();
    (component as any).loading = signal(false).asReadonly();
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.error-container')).toBeTruthy();
  });
});