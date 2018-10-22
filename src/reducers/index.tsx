import { Reducer } from 'redux';
import * as actions from '../actions';
import { CommonState } from '../components/task';

const unloadedState: CommonState = {
    tasks: [
        {
            id: 1,
            name: 'Personal',
            todo: []
        }, {
            id: 2,
            name: 'Shopping',
            todo: []
        }, {
            id: 3,
            name: 'Work',
            todo: []
        }, {
            id: 4,
            name: 'Errands',
            todo: []
        }
    ],
    addTask: [],
    selectTask: undefined
};

export const reducer: Reducer<CommonState> =
 (state: CommonState, action: actions.KnownAction): CommonState => {
    switch (action.type) {
        case actions.TASK_ADDED: {
            const task = state.tasks.find(t => t.name === action.task.name);
            if (task) {
                task.todo = [...task.todo, ...action.task.todo];
            }
            return state;
        }
        case actions.TASK_SELECTED: {
            return { ...state, selectTask: action.task };
        }
        default:

            return state || unloadedState;
    }
};
