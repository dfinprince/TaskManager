import * as React from 'react';
import { Task, CommonState } from '../components/task';
import { KnownAction } from '../actions';

export interface TasksProps {
    tasks: Task[];
    startTask: (task: Task) => KnownAction;
}

export class ProjectList extends React.Component<TasksProps, CommonState> {

    constructor(props: TasksProps) {
        super(props);
    }

    render() {
        return (
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
        );
    }
}