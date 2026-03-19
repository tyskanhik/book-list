import { Component, inject, output, ViewChild } from '@angular/core';
import { BookService } from '../../core/services/book.service';
import { BookFilters, GENRE_OPTIONS, LANGUAGE_OPTIONS } from '../../core/models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectComponent } from '../shared/select/select.component';
import { RangeComponent } from '../shared/range/range.component';
import { InputComponent } from "../shared/input/input.component";

@Component({
  selector: 'app-book-filters',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    InputNumberModule,
    RangeComponent,
    SelectComponent,
    InputComponent,
],
  templateUrl: './book-filters.component.html',
  styleUrl: './book-filters.component.scss'
})

export class BookFiltersComponent {
  @ViewChild('genreSelect') genreSelect!: SelectComponent;
  @ViewChild('languageSelect') languageSelect!: SelectComponent;
  @ViewChild('pageRange') pageRange!: RangeComponent;
  @ViewChild('searchInput') searchInput!: InputComponent;
  
  protected genreOptions = GENRE_OPTIONS;
  protected languageOptions = LANGUAGE_OPTIONS;
  
  protected genreOptionsWithAll = [
    { label: 'Все жанры', value: null },
    ...this.genreOptions
  ];
  
  protected languageOptionsWithAll = [
    { label: 'Все языки', value: null },
    ...this.languageOptions
  ];
  
  protected filtersChange = output<BookFilters>();
  
  private currentFilters: BookFilters = {};

  protected onSearchChange(term: string): void {
    this.currentFilters.searchTerm = term || undefined;
    this.emitFilters();
  }

  protected onGenreChange(genre: string | null): void {
    this.currentFilters.genre = genre || undefined;
    this.emitFilters();
  }

  protected onLanguageChange(language: string | null): void {
    this.currentFilters.language = language || undefined;
    this.emitFilters();
  }

  protected onPageChange(range: { from: number | null; to: number | null }): void {
    this.currentFilters.pageCountFrom = range.from || undefined;
    this.currentFilters.pageCountTo = range.to || undefined;
    this.emitFilters();
  }

  private emitFilters(): void {
    this.filtersChange.emit({ ...this.currentFilters });
  }

  protected resetFilters(): void {
    this.currentFilters = {};

    this.searchInput?.reset();
    this.genreSelect?.reset();
    this.languageSelect?.reset();
    this.pageRange?.reset();
    
    this.emitFilters();
  }
}
