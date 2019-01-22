import * as React from "react";
import styled from 'styled-components';


const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;


export class App extends React.Component<{}, IState> {

    constructor(props: {}){
        super(props);

        this.state = {
            currentTask: "",
            tasks: []
        }
    }

    public handleSubmit(e: React.FormEvent<HTMLFormElement>): void{
        e.preventDefault();
        this.setState({
            currentTask: "",
            tasks: [
                ...this.state.tasks,
                {
                    id: this._timeInMilliSeconds(),
                    value: this.state.currentTask,
                    completed: false
                }
            ]
        })
    }

    public deleteTask(id: number): void {
        const filteredTasks: Array<ITask> = this.state.tasks.filter((task:ITask) => task.id !== id);
        this.setState({
            tasks: filteredTasks
        });
    }

    public toggleDone(index: number): void {
        let task: ITask[] = this.state.tasks.splice(index, 1);
        task[0].completed = !task[0].completed;
        const currentTasks: ITask[] = [ ...this.state.tasks, ...task ];
        this.setState({ tasks: currentTasks })
    }

    public renderTasks(): JSX.Element[] {
        return this.state.tasks.map((task:ITask, index: number) => {
            return (
                <div key={task.id} className="tdl-task">
                <span className={task.completed ? "is-completed" : ""}>{task.value}</span>
                <button onClick={() => this.deleteTask(task.id)}>delete</button>
                <button onClick={() => this.toggleDone(index)}>{task.completed ? "undo" : "done"}</button>
                </div>
            )
        })
    }

    public render(): JSX.Element {
        return (
            <div>
                <Title>React Typescript Todo List</Title>
                <form action="" onSubmit={(e) => this.handleSubmit(e)}>
                <input type="text" name="" className="tdl-input" id="" placeholder="Add a task" value={this.state.currentTask} onChange={(e) => this.setState({ currentTask: e.target.value })} />
                <button type="submit">Add Task</button>
                </form>
                <section>
                    {this.renderTasks()}
                </section>
            </div>
        );
    }


    private _timeInMilliSeconds(): number {
        const date:Date = new Date();
        return date.getTime();
    }
}


interface IState {
    currentTask: string;
    tasks: Array<ITask>;
}

interface ITask {
    id: number,
    value: string,
    completed: boolean
}