import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ManagerEffects } from './manager.effects';

describe('ManagerEffects', () => {
  let actions$: Observable<any>;
  let effects: ManagerEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManagerEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(ManagerEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
