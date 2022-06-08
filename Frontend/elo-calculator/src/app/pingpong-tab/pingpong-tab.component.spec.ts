import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PingpongTabComponent } from './pingpong-tab.component';

describe('PingpongTabComponent', () => {
  let component: PingpongTabComponent;
  let fixture: ComponentFixture<PingpongTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PingpongTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PingpongTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
