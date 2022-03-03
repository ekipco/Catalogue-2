import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SliderImage } from '@modules/shopping/models';
import { SliderService } from '@modules/shopping/services';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { Actions, EffectSources } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { sliderSelectors } from './store';
import * as actions from './store/actions';
import { SliderEffects } from './store/effects';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SliderComponent implements OnInit, OnDestroy {

  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;

  loading$: Observable<boolean>;
  images$: Observable<SliderImage[]>;

  constructor(
    private _store$: Store,
    private _actions$: Actions,
    private _effects$: EffectSources,
    private _sliderService: SliderService
  ) { }

  ngOnInit(): void {
    this._effects$.addEffects(new SliderEffects(this._actions$, this._sliderService));
    this._store$.dispatch(actions.initialize());
    this.initAsyncs();
  }

  ngOnDestroy(): void {
    this._store$.dispatch(actions.destroy());
  }

  private initAsyncs(): void {
    this.loading$ = this._store$.select(sliderSelectors.loading);
    this.images$ = this._store$.select(sliderSelectors.images);
  }

}
