import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCell } from './select-cell';

describe('SelectCell', () => {
  let component: SelectCell;
  let fixture: ComponentFixture<SelectCell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectCell]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectCell);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
