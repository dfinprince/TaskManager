import { combineReducers, createStore } from 'redux';
import { reducer as tasksReducer } from './reducers';
import { CommonState } from './components/task';

export interface StoreState {
    taskSettings: CommonState;
}

const combinedReducers = combineReducers<StoreState>({
    taskSettings: tasksReducer
});

export const store = createStore<StoreState>(combinedReducers);
