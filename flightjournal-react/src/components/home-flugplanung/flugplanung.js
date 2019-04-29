
import React, { Component } from 'react';
import FlugplanungRight from './flugplanung-right';
import FlugplanungLeft from './flugplanung-left';

class Flugplanung extends Component {
    render() {
        return (
            <section className="start">
                <FlugplanungLeft />
                <FlugplanungRight />
            </section>
        );
    }
}

export default Flugplanung;