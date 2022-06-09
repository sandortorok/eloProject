import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleElimBracketComponent } from './single-elim-bracket.component';

describe('SingleElimBracketComponent', () => {
  let component: SingleElimBracketComponent;
  let fixture: ComponentFixture<SingleElimBracketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleElimBracketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleElimBracketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
