export interface Task {
    id: number;
    name: string;
    todo: string[];
}

export interface ActiveState {
    activeTask: Task | {};
}

export interface CommonState {
    tasks: Task[];
    addTask: Task[];
    selectTask: Task | undefined;
}