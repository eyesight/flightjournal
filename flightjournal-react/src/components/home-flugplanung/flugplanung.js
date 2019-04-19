import React, { Component } from 'react';
import FlugplanungRight from './flugplanung-right';
import FlugplanungLeft from './flugplanung-left';
import ScrollableAnchor from 'react-scrollable-anchor';

class Flugplanung extends Component {
    render() {
        return (
            <ScrollableAnchor id={'flugplanung'}>
                <section className="start">
                    <FlugplanungLeft />
                    <FlugplanungRight />
                </section>
            </ScrollableAnchor>
        );
    }
}

export default Flugplanung;
