import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalSplashComponent } from './external-splash.component';

describe('ExternalSplashComponent', () => {
  let component: ExternalSplashComponent;
  let fixture: ComponentFixture<ExternalSplashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalSplashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalSplashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
