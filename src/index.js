import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      accessKey: '...',
      secretkey: '...',
    };
  }

  render() {
    return (
      <div>
        <Hello
          accessKey={this.state.accessKey}
          secretkey={this.state.secretkey}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
