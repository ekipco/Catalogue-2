import { Actions, EffectNotification, ofType, OnRunEffects } from '@ngrx/effects';
import { ActionCreator } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

export abstract class NgrxBaseEffects implements OnRunEffects {

  constructor(
    public actions: Actions,
    public destroyAction: ActionCreator,
  ) { }

  ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>): Observable<EffectNotification> {
    return resolvedEffects$.pipe(
      takeUntil(this.actions.pipe(
        ofType(this.destroyAction),
        tap(() => this.onRunDestroy())
      ))
    );
  }

  onRunDestroy(): void { }
}
