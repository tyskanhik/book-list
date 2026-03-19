import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/books',
    pathMatch: 'full'
  },
  {
    path: 'books',
    loadComponent: () => import('./features/book-list/book-list.component')
      .then(m => m.BookListComponent),
    title: 'Список книг'
  },
  {
    path: 'books/create',
    loadComponent: () => import('./features/book-form/book-form.component')
      .then(m => m.BookFormComponent),
    title: 'Добавить книгу'
  }
];