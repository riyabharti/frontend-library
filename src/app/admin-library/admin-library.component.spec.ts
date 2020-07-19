import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLibraryComponent } from './admin-library.component';

describe('AdminLibraryComponent', () => {
  let component: AdminLibraryComponent;
  let fixture: ComponentFixture<AdminLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
