import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  private destroyRef = inject(DestroyRef);
  placeholder = input<string>('Поиск...');
  debounceTime = input<number>(300);
  
  valueChange = output<string>();
  
  protected value = '';
  private searchSubject = new Subject<string>();

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(this.debounceTime()),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(value => {
      this.valueChange.emit(value);
    });
  }

  protected onValueChange(value: string): void {
    this.searchSubject.next(value);
  }

  public reset(): void {
    this.value = '';
    this.searchSubject.next('');
  }
}
