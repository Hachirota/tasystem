import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPortalUserComponent } from './register-portal-user.component';

describe('RegisterPortalUserComponent', () => {
  let component: RegisterPortalUserComponent;
  let fixture: ComponentFixture<RegisterPortalUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPortalUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPortalUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
