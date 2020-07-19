import { TestBed, async, inject } from '@angular/core/testing';

import { CheckLogoutGuard } from './check-logout.guard';

describe('CheckLogoutGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckLogoutGuard]
    });
  });

  it('should ...', inject([CheckLogoutGuard], (guard: CheckLogoutGuard) => {
    expect(guard).toBeTruthy();
  }));
});
