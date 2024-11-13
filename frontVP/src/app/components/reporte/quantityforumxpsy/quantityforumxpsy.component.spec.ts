import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityforumxpsyComponent } from './quantityforumxpsy.component';

describe('QuantityforumxpsyComponent', () => {
  let component: QuantityforumxpsyComponent;
  let fixture: ComponentFixture<QuantityforumxpsyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantityforumxpsyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuantityforumxpsyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
