import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessTabComponent } from './chess-tab.component';

describe('ChessTabComponent', () => {
  let component: ChessTabComponent;
  let fixture: ComponentFixture<ChessTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChessTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChessTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
