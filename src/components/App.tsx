import * as React from 'react';
import './App.css';
import TaskManager from '../containers/TaskManager';
import ProjectList from '../containers/ProjectList';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <div className="container">
          <ProjectList />
          <TaskManager />
        </div>
      </div>
    );
  }
}

export default App;
