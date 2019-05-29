import React, { Component } from 'react';
//import 'bulma/bulma.sass';
import './App.scss';
import {TimeTableDisplay} from './timetableDisplay'
import {TimeTableSettings} from './timetableSettings'
import {connect} from 'react-redux'

class App extends Component {
  constructor(props){
    super(props);
    const preset = this.props.match.params.preset
    if (preset != null) {
      this.props.setPreset(preset);
    }
  }
  render() {
    var content = (
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
    if (this.props.match.params.preset && !this.props.loadedPreset) {
      content = (<div />)
    }

    return content;
  }
}

const reducerToProps = (reducer)=>{
  return {
      setPreset: (preset)=>{
          reducer({type: "SET_PRESET", preset: preset})
      }
  }
}

const stateToProps = (state)=>{
  return {
    loadedPreset: state.loadedPreset
  }
}

var connected = connect(stateToProps, reducerToProps)(App)

export {connected as App};
