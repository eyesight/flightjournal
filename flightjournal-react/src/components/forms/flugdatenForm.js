import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../actions/UserActions';
import { withRouter } from 'react-router-dom';
import * as routes from '../../constants/routes';

class FlugdatenForm extends Component {
    componentWillMount() {
        this.props.getUser();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.email === undefined) {
            this.props.history.push(routes.LANDING);
        }
    }
    render() {
        return (<div>test</div>);
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}

export default withRouter(connect(mapStateToProps, { getUser })(FlugdatenForm));
