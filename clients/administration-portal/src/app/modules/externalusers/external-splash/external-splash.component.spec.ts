import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ExternalSplashComponent } from './external-splash.component';
import { RouterTestingModule } from '@angular/router/testing';
import { GoogleChartsModule } from 'angular-google-charts';

describe('ExternalSplashComponent', () => {
  let component: ExternalSplashComponent;
  let fixture: ComponentFixture<ExternalSplashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        GoogleChartsModule,
      ],
      declarations: [ExternalSplashComponent],
    }).compileComponents();
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
