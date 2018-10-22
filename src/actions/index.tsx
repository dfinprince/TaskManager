import { Task } from '../components/task';

export const TASK_ADDED = 'TASK_ADDED';
export const TASK_SELECTED = 'TASK_SELECTED';

export interface TaskSelected {
    type: typeof TASK_SELECTED;
    task: Task;
}

export interface TaskAdded {
    type: typeof TASK_ADDED;
    task: Task;
}

export type KnownAction = TaskAdded | TaskSelected;

export function addTaskAction(task: Task): KnownAction {
    return {
        type: TASK_ADDED,
        task: task,
    };
}

export function selectTaskAction(task: Task): KnownAction {
    return {
        type: TASK_SELECTED,
        task: task,
    };
}
