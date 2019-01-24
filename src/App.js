import React, { Component } from 'react';
import 'bulma/bulma.sass';
import './App.scss';
import {TimeTableDisplay} from './timetableDisplay'
import {TimeTableSettings} from './timetableSettings'

class App extends Component {
  render() {
    return (
      <div className="section">
            <div className="columns">
              <div className="column is-two-thirds">
                <TimeTableDisplay />
              </div>
              <div className="column">
                <TimeTableSettings />
              </div>
            </div>
      </div>
    );
  }
}

export default App;
