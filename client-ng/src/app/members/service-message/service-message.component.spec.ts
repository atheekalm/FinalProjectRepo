import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceMessageComponent } from './service-message.component';

describe('ServiceMessageComponent', () => {
  let component: ServiceMessageComponent;
  let fixture: ComponentFixture<ServiceMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
