import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { BookService } from '../../core/services/book.service';
import { MessageService } from 'primeng/api';
import { BookFormValue, CreateBookDto, GENRE_OPTIONS, LANGUAGE_OPTIONS } from '../../core/models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    DropdownModule,
    CardModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent {
  private fb = inject(FormBuilder);
  private bookService = inject(BookService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private destroyRef = inject(DestroyRef);

  protected genreOptions = GENRE_OPTIONS;
  protected languageOptions = LANGUAGE_OPTIONS;
  
  protected form!: FormGroup;
  protected loading = false;

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      author: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      pageCount: [null, [Validators.required, Validators.min(1), Validators.max(5000)]],
      language: [null, Validators.required],
      genre: [null, Validators.required],
      publishedYear: [null, [Validators.min(1000), Validators.max(new Date().getFullYear())]]
    });
  }

    protected onSubmit(): void {
      if (this.form.invalid) {
        this.markAllAsTouched();
        return;
      }

      this.loading = true;
      const formValue: BookFormValue = this.form.value;

      const dto: CreateBookDto = {
        title: formValue.title,
        author: formValue.author,
        description: formValue.description,
        pageCount: formValue.pageCount ?? 0,
        language: formValue.language!,
        genre: formValue.genre!,
        publishedYear: formValue.publishedYear ?? undefined
      };

      this.bookService.createBook(dto).pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe({
        next: (book) => {
          if (book) {
            this.messageService.add({
              severity: 'success',
              summary: 'Успех',
              detail: 'Книга успешно создана'
            });
            setTimeout(() => this.router.navigate(['/books']), 1000);
          }
        },
        error: (error) => {
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: 'Не удалось создать книгу'
          });
        }
      });
    }

  protected onCancel(): void {
    this.router.navigate(['/books']);
  }

  protected hasError(controlName: string, errorName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.touched && control.hasError(errorName);
  }

  private markAllAsTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });
  }
}
