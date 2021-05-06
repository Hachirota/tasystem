import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StaffDetailComponent } from './staff-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiRequestService } from 'src/app/api-request.service';

describe('StaffDetailComponent', () => {
  let component: StaffDetailComponent;
  let fixture: ComponentFixture<StaffDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ApiRequestService],
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [StaffDetailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
