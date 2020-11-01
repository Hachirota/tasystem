import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalSplashComponent } from './internal-splash.component';

describe('InternalSplashComponent', () => {
  let component: InternalSplashComponent;
  let fixture: ComponentFixture<InternalSplashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalSplashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalSplashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
