import * as React from 'react';
import './App.css';
import TaskManager from '../containers/TaskManager';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <TaskManager />
      </div>
    );
  }
}

export default App;
