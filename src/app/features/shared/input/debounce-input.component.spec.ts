import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('должен создавать компонент', () => {
    expect(component).toBeTruthy();
  });

  it('должен эмитить значение после debounce', fakeAsync(() => {
    const spy = jasmine.createSpy('valueChange');
    component.valueChange.subscribe(spy);
    
    component['onValueChange']('тест');
    expect(spy).not.toHaveBeenCalled();
    
    tick(300);
    expect(spy).toHaveBeenCalledWith('тест');
  }));
});
