import { connect } from 'react-redux';
import { selectTaskAction } from '../actions';
import { bindActionCreators, Dispatch } from 'redux';
import { ProjectList } from '../components/projectlist';

// tslint:disable-next-line:no-any
function mapStateToProps(state: any) {
    return {
        tasks: state.tasks
    };
}

// tslint:disable-next-line:no-any
function matchDispatchToProps(dispatch: Dispatch<any>) {
    return bindActionCreators({
        startTask: selectTaskAction
    },                        dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ProjectList);
