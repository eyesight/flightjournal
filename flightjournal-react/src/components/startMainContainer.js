import React, { Component } from 'react';
import Flugplanung from './home-flugplanung/flugplanung';
import FlightTable from './home-flightTable/flightTable';
import StartingPlaces from './home-startingplaces/startingplaces';
import { getUser } from '../actions/UserActions';
import { connect } from 'react-redux';

class StartMainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authUser: false
        };
    }
    componentWillMount() {
        this.props.getUser();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.email !== undefined) {
            this.setState({
                authUser: true
            });
        }else{
            this.setState({
                authUser: false
            });
        }
    }
    render() {
        console.log(this.props.user.email);
        return (
            <main className="main">
                {this.state.authUser ?
                  <div>
                    <Flugplanung />
                    <FlightTable />
                    <StartingPlaces />
                  </div> :
                    <div>
                        <Flugplanung />
                    </div>
                }

            </main>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps, { getUser }) (StartMainContainer);
