import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { addTaskAction } from '../actions';
import { TaskManager } from '../components/taskmanager';

// tslint:disable-next-line:no-any
function mapStateToProps(state: any) {
    return {
        tasks: state.tasks
    };
}

// tslint:disable-next-line:no-any
function mapDispatchToProps(dispatch: Dispatch<any>) {
    return bindActionCreators({ addTask: addTaskAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskManager);
