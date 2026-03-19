import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-range',
  standalone: true,
  imports: [CommonModule, FormsModule, InputNumberModule],
  templateUrl: './range.component.html',
  styleUrl: './range.component.scss'
})
export class RangeComponent {
  private destroyRef = inject(DestroyRef);
  
  label = input<string>('');
  min = input<number>(0);
  max = input<number>(2000);
  fromPlaceholder = input<string>('От');
  toPlaceholder = input<string>('До');
  
  rangeChange = output<{ from: number | null; to: number | null }>();
  
  protected fromValue: number | null = null;
  protected toValue: number | null = null;
  
  private rangeSubject = new Subject<{ from: number | null; to: number | null }>();

  ngOnInit(): void {
    this.rangeSubject.pipe(
      debounceTime(500),
      distinctUntilChanged((prev, curr) => 
        prev.from === curr.from && prev.to === curr.to
      ),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(range => {
      this.rangeChange.emit(range);
    });
  }

  protected onFromChange(value: number | null): void {
    this.fromValue = value;
    this.rangeSubject.next({ from: value, to: this.toValue });
  }

  protected onToChange(value: number | null): void {
    this.toValue = value;
    this.rangeSubject.next({ from: this.fromValue, to: value });
  }

  public reset(): void {
    this.fromValue = null;
    this.toValue = null;
    this.rangeSubject.next({ from: null, to: null });
  }
}
