import { Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BookService } from '../../core/services/book.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { Book, BookFilters } from '../../core/models';
import { BookFiltersComponent } from "../book-filters/book-filters.component";
import { BookPreviewComponent } from "../shared/book-preview/book-preview.component";

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ButtonModule,
    CardModule,
    TagModule,
    ProgressSpinnerModule,
    MessageModule,
    BookFiltersComponent,
    BookPreviewComponent
],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {
  @ViewChild(BookPreviewComponent) previewModal!: BookPreviewComponent;
  private bookService = inject(BookService);
  private destroyRef = inject(DestroyRef);
  
  protected books = this.bookService.books;
  protected loading = this.bookService.loading;
  protected error = this.bookService.error;

  ngOnInit(): void {
    this.loadBooks();
  }

  protected loadBooks(filters?: any): void {
    this.bookService.loadBooks(filters)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  protected openBookPreview(book: Book): void {
    this.previewModal.open(book);
  }

  protected retryLoading(): void {
    this.loadBooks(this.bookService.filters());
  }

  protected onFiltersChange(filters: BookFilters): void {
    console.log(filters)
    this.loadBooks(filters);
  }
}
