import React, { Component } from 'react';
import Flugplanung from './flugplanung/flugplanung';
import FlightTable from './flight-table/flight-table';
import StartingPlaces from './startingplaces/startingplaces';
import { getUser } from '../actions/UserActions';
import { connect } from 'react-redux';

class StartMain extends Component {
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

export default connect(mapStateToProps, { getUser }) (StartMain);
