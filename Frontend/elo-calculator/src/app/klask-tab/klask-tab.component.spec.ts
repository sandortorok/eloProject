import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlaskTabComponent } from './klask-tab.component';

describe('KlaskTabComponent', () => {
  let component: KlaskTabComponent;
  let fixture: ComponentFixture<KlaskTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KlaskTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KlaskTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
