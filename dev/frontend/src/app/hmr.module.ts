import { ApplicationRef, Injectable } from '@angular/core';
import { createInputTransfer, createNewHosts, removeNgStyles } from '@angularclass/hmr';
import { ActionReducer, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { State } from './reducers';

export function stateSetter(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state: any, action: any) => {
    if (action.type === 'SET_ROOT_STATE') {
      return action.payload;
    }
    return reducer(state, action);
  };
}

@Injectable()
export class HmrModule {
  constructor(public appRef: ApplicationRef, public store: Store<State>) {}

  hmrOnInit(store) {
    if (!store || !store.rootState) {
      return;
    }
    // restore state by dispatching a SET_ROOT_STATE action
    if (store.rootState) {
      this.store.dispatch({
        type: 'SET_ROOT_STATE',
        payload: store.rootState,
      });
    }

    if ('restoreInputValues' in store) {
      store.restoreInputValues();
    }
    this.appRef.tick();
    Object.keys(store).forEach(prop => delete store[prop]);
  }

  hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    this.store.pipe(take(1)).subscribe(s => (store.rootState = s));
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
