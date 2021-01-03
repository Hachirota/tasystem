import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalusersComponent } from './externalusers.component';

describe('ExternalusersComponent', () => {
  let component: ExternalusersComponent;
  let fixture: ComponentFixture<ExternalusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalusersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
