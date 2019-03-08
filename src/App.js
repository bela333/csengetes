import React, { Component } from 'react';
//import 'bulma/bulma.sass';
import './App.scss';
import {TimeTableDisplay} from './timetableDisplay'
import {TimeTableSettings} from './timetableSettings'
import {connect} from 'react-redux'

class App extends Component {
  render() {
    const preset = this.props.match.params.preset
    if (preset != null) {
      this.props.setPreset(preset);
    }
    return (
      <div className="section">
            <div className="columns">
              <div className="column is-two-thirds">
                <TimeTableDisplay />
              </div>
              <div className="column">
                <TimeTableSettings/>
              </div>
            </div>
      </div>
    );
  }
}

const reducerToProps = (reducer)=>{
  return {
      setPreset: (preset)=>{
          reducer({type: "SET_PRESET", preset: preset})
      }
  }
}

var connected = connect(null, reducerToProps)(App)

export {connected as App};
