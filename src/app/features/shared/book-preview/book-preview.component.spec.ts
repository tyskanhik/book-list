import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPreviewComponent } from './book-preview.component';
import { Book } from '../../../core/models';

describe('BookPreviewComponent', () => {
  let component: BookPreviewComponent;
  let fixture: ComponentFixture<BookPreviewComponent>;
  const mockBook: Book = {
    id: '1',
    title: 'Тестовая книга',
    author: 'Тест Автор',
    description: 'Описание',
    pageCount: 100,
    language: 'Русский',
    genre: 'Роман',
    createdAt: new Date()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('должен создавать компонент', () => {
    expect(component).toBeTruthy();
  });

  it('должен открываться с книгой', () => {
    component.open(mockBook);
    expect(component['book']).toEqual(mockBook);
    expect(component['visible']).toBeTrue();
  });
});
