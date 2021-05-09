import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApplicantDetailComponent } from './applicant-detail.component';
import { ApiRequestService } from 'src/app/api-request.service';

describe('ApplicantDetailComponent', () => {
  let component: ApplicantDetailComponent;
  let fixture: ComponentFixture<ApplicantDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ApiRequestService],
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ApplicantDetailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
