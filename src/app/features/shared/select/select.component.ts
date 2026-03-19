import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  label = input<string>('');
  options = input<any[]>([]);
  placeholder = input<string>('Выберите');
  value = input<any>(null);
  valueChange = output<any>();

  protected selectedValue: any = null;

  ngOnInit() {
    this.selectedValue = this.value();
  }

  protected onChange(): void {
    this.valueChange.emit(this.selectedValue);
  }

  public setValue(value: any): void {
    this.selectedValue = value;
  }

  public reset(): void {
    this.selectedValue = null;
    this.valueChange.emit(null);
  }
}
