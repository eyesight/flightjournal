import React, { Component } from 'react';
import Header from './components/header/header';
import StartMain from './components/start-main';

class App extends Component {
  render() {
    return (
      <div className="page">
          <Header />
          <StartMain />
      </div>
    );
  }
}

export default App;
