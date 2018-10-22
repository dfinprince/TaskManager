import * as React from 'react';
import { Task, CommonState } from '../components/task';
import { KnownAction } from '../actions';
import { store } from '../store';
import { setTimeout } from 'timers';

export interface TaskProps {
    tasks: Task[];
    addTask: (task: Task) => KnownAction;
}

interface InternalState {
    addingTask: boolean;
    projects: string[];
    selectedProject: string;
    todoItem: string;
}

function getProjects(keyword: string): string[] {
    const projects = ['Personal', 'Shopping', 'Work', 'Errands'];
    return projects.filter(v => v.toLowerCase().includes(keyword.toLowerCase()));
}

function getProjectsAsync(keyword: string): Promise<string[]> {
    const delay = Math.random() * 800 + 200; // delay 200~1000ms
    return new Promise<string[]>((resolve, reject) => {
        setTimeout(resolve, delay, getProjects(keyword));
    });
}

type TaskManagerState = CommonState & InternalState;
export class TaskManager extends React.Component<TaskProps, TaskManagerState> {
    emptyTask: Task;
    placeholder: string = 'eg: Pickup package from Fedex #personal';
    taskEdit: HTMLInputElement | null;

    constructor(props: TaskProps) {
        super(props);
    }

    componentDidMount() {
        this.setState({
            tasks: store.getState().taskSettings.tasks,
            addingTask: false,
            projects: [],
            selectedProject: '',
            todoItem: ''
        });
        // this.setState({ addingTask: false, tasks: [] });
    }

    clone(): Task {
        return JSON.parse(JSON.stringify(this.emptyTask));
    }

    addNewTask(): void {
        // const tasks = this.state.tasks.concat(this.clone());
        this.setState({
            addingTask: false
        });

        this.props.addTask(this.emptyTask);
    }

    addTask(): void {
        const id = store.getState().taskSettings.tasks.length + 1;
        //  const id: number = this.state && this.state.tasks ? this.state.tasks.length + 1 : 1;
        this.emptyTask = {
            id: id,
            name: '',
            todo: []
        };

        this.setState({ addingTask: true });
    }

    cancelTask(): void {
        this.setState({ addingTask: false });
    }

    // Set the value when project selection changes.
    onSelectChange(value: string): void {
        this.setState({
            selectedProject: value
        });

        const task: Task = {
            id: 1,
            name: value,
            todo: [this.state.todoItem]
        };

        this.props.addTask(task);
        if (this.taskEdit) {
            this.taskEdit.value = '';
        }

        this.setState({ projects: [], todoItem: '' });
    }

    setTask(keyword: string): void {
        const n = keyword.lastIndexOf('#');
        if (n > -1) {
            const search = keyword.substring(n + 1);
            getProjectsAsync(search).then(v => {
                // tslint:disable-next-line:no-console
                console.log(v);
                this.setState({ projects: v, todoItem: keyword.substr(0, n) });
            });
        }
    }

    showProjectOptions(): JSX.Element {
        const options = this.state.projects;
        return (
            <div>
                <select className="projectSelect" value={this.state.selectedProject}
                    onChange={e => this.onSelectChange(e.target.value)}>
                    <option disabled={true} value="">Select Project</option>
                    {options.map(o => {
                        return (<option value={o} key={o} >{o}</option>);
                    })}
                </select>
            </div>);
    }

    editTask(): JSX.Element {
        return (
            <div>
                <label className="label">Inbox</label>
                <div>
                    <input className="taskEdit"
                        type="text"
                        min={4}
                        max={30}
                        placeholder={this.placeholder}
                        onChange={(e) => { this.setTask(e.target.value); }}
                        ref={t => this.taskEdit = t}
                    />
                    {
                        this.state && this.state.projects &&
                        (this.state.projects.length > 0) &&
                        this.showProjectOptions()
                    }
                </div>
            </div>);
    }

    render() {
        return (
            <div className="container">
                <div className="projects">
                    <h4>Projects</h4>
                    {
                        Array.isArray(this.props.tasks) &&
                        this.props.tasks.map((s, i) => {
                            return (<div className="projectItem" key={s.name}>
                                {s.name}
                                <span className="projectSize">{s.todo.length}</span>
                                {
                                    s.todo.map((t, j) => <div className="projectItems" key={t}><span>{t}</span></div>)
                                }
                            </div>);
                        })
                    }
                </div>
                <div className="task">
                    <h3>Click the button to add a new task</h3>
                    {
                        this.state && this.state.addingTask && this.editTask()
                    }
                    <div className="buttonsContainer">
                        <button className="fancy" onClick={() => this.addTask()}>Add Task</button>
                        <button className="not-fancy" onClick={() => this.cancelTask()}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}
