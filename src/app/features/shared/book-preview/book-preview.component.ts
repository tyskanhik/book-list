import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { Book } from '../../../core/models';

@Component({
  selector: 'app-book-preview',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    TagModule,
    DividerModule
  ],
  templateUrl: './book-preview.component.html',
  styleUrl: './book-preview.component.scss'
})
export class BookPreviewComponent {
  protected visible = false;
  protected book: Book | null = null;

  public open(book: Book): void {
    this.book = book;
    this.visible = true;
  }
}
