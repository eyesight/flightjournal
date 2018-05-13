import React, { Component } from 'react';
import * as routes from '../../constants/routes';
import { withRouter } from 'react-router-dom';

class FlightTable extends Component {
    render() {
        return (
            <section id="fluege" className="centered-layout">
                <div className="centered-layout__header">
                    <h2 className="title-h2">Flugtagebuch.<br /><span className="title--regular">Unsere Flüge im Überblick.</span>
                    </h2>
                    <button className="button-without-border" onClick={(event) => {event.preventDefault(); this.props.history.push(routes.FLUGDATEN_ERFASSEN)}}>+ Flug hinzufügen</button>
                </div>
                <div className="filter">
                    <ul className="filter__list">
                        <li><a className="filter__list-item active" href="index.html">Jan.</a></li>
                        <li><a className="filter__list-item active" href="index.html">Feb.</a></li>
                        <li><a className="filter__list-item" href="index.html">Mär.</a></li>
                        <li><a className="filter__list-item" href="index.html">Apr.</a></li>
                        <li><a className="filter__list-item" href="index.html">Mai</a></li>
                        <li><a className="filter__list-item" href="index.html">Jun.</a></li>
                        <li><a className="filter__list-item" href="index.html">Jul.</a></li>
                        <li><a className="filter__list-item" href="index.html">Aug.</a></li>
                        <li><a className="filter__list-item" href="index.html">Sep.</a></li>
                        <li><a className="filter__list-item" href="index.html">Okt.</a></li>
                        <li><a className="filter__list-item" href="index.html">Nov.</a></li>
                        <li><a className="filter__list-item" href="index.html">Dez.</a></li>
                    </ul>
                    <div className="filter__list-dropdown">
                        <button className="filter__dropdown-item filter__dropdown--short">Jahr wählen <i
                            className="fas fa-angle-down"></i>
                            <div className="filter__sub-dropdown">
                                <a className="filter__sub-dropdown-item">2018</a>
                                <a className="filter__sub-dropdown-item">2017</a>
                                <a className="filter__sub-dropdown-item">2016</a>
                            </div>
                        </button>
                        <button className="filter__dropdown-item">Pilot wählen <i className="fas fa-angle-down"></i>
                            <div className="filter__sub-dropdown filter__dropdown--short">
                                <a className="filter__sub-dropdown-item">Jonas & Claudia</a>
                                <a className="filter__sub-dropdown-item">Claudia</a>
                                <a className="filter__sub-dropdown-item">Jonas</a>
                            </div>
                        </button>
                    </div>
                </div>
                <div className="table-wrapper">
                    <div className="table-inner">
                        <table className="table">
                            <thead>
                            <tr>
                                <th className="table__header table&index.html45;&#45;sort js-table&#45;&#45;sort"><span className="active">Datum</span><span
                                    className="arrow-up visible"> &#8593;</span><span className="arrow-down"> &#8595;</span>
                                </th>
                                <th className="table__header table&#45;&#45;sort js-table&#45;&#45;sort"><span>Pilot</span><span
                                    className="arrow-up"> &#8593;</span><span className="arrow-down"> &#8595;</span></th>
                                <th className="table__header table&#45;&#45;sort js-table&#45;&#45;sort"><span>Startplatz</span><span
                                    className="arrow-up"> &#8593;</span><span className="arrow-down">&#8595;</span></th>
                                <th className="table__header table&#45;&#45;sort js-table&#45;&#45;sort">
                                    <span>Flugzeit</span><span className="arrow-up"> &#8593;</span><span className="arrow-down"> &#8595;</span>
                                </th>
                                <th className="table__header table&#45;&#45;sortjs-table&#45;&#45;sort">
                                    <span>XC-Distanz</span><span className="arrow-up"> &#8593;</span><span className="arrow-down"> &#8595;</span>
                                </th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody className="table__tbody">
                            <tr>
                                <td className="table__date">22.1.2018</td>
                                <td className="table__pilot"><a className="table__link">Jonas</a></td>
                                <td className="table__start"><a className="table__link">Castelluccio, Fontanile, 1900 m</a></td>
                                <td className="table__duration">45 min</td>
                                <td className="table__distance">11 Kilometer</td>
                                <td className="table__details"><a className="table__link">Flugdetails</a></td>
                            </tr>
                            <tr>
                                <td className="table__date">22.1.2018</td>
                                <td className="table__pilot"><a className="table__link">Claudia</a></td>
                                <td className="table__start"><a className="table__link">Engelberg, Herzlisee, 1800 m</a></td>
                                <td className="table__duration">1 h 45 min</td>
                                <td className="table__distance">21 Kilometer</td>
                                <td className="table__details"><a className="table__link">Flugdetails</a></td>
                            </tr>
                            </tbody>
                        </table>

                        <div className="button-wrapper">
                            <button className="button">mehr Flüge anzeigen</button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default withRouter(FlightTable);
