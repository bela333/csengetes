import React, {Component} from 'react';
import {connect} from 'react-redux';
import {LabeledInput} from './labeledInput'
import { formatMinute } from './formatting';
import { BreakOverrideMenu } from './breakOverrideMenu';
import { generatePreset } from './presets';
import { CopyButton } from './copyButton';

class TimeTableSettings extends Component{

    updateState(props, state){
        var hour = this.state.startHour;
        if (this.state.startHour < 0 || this.state.startHour >= 24) {
            hour = props.startHour
            this.setState({startHour: hour})
        }
        var minute = this.state.startMinute;
        minute = formatMinute(minute)
        if (this.state.startMinute < 0 || this.state.startMinute >= 60) {
            minute = props.startMinute
            this.setState({startMinute: minute})
        }
        
        props.setLessons(this.state.lessons)
        props.setLessonLength(this.state.lessonLength)
        props.setBreakLength(this.state.breakLength)
        props.setStartHour(Number(hour))
        props.setStartMinute(Number(minute))
        
    }

    setLessons = (e)=>{
        this.setState({
            lessons: Number(e.target.value)
        })
    }

    setLessonLength = (e)=>{
        this.setState({
            lessonLength: Number(e.target.value)
        })
    }
    setBreakLength = (e)=>{
        this.setState({
            breakLength: Number(e.target.value)
        })
    }
    setStartHour = (e)=>{
        this.setState({
            startHour: e.target.value
        })
    }
    setStartMinute = (e)=>{
        this.setState({
            startMinute: e.target.value
        })
    }

    setBreakLesson = (id, value)=>{
        if (value < 1) {
            value = 1;
        }
        if (value >= this.props.lessons) {
            value = this.props.lessons-1;
        }
        this.props.setBreakLesson(value, id)
    }

    setBreakDuration = (id, value)=>{
        if(value < 0){
            value = 0;
        }
        this.props.setBreakDuration(value, id)
    }

    removeOverride = (id)=>{
        this.props.removeOverride(id);
    }

    addOverride = ()=>{
        this.props.addOverride();
    }

    constructor(props){
        super(props);
        this.state = {
            lessons: this.props.lessons,
            startHour: this.props.startHour,
            startMinute: this.props.startMinute,
            lessonLength: this.props.lessonLength,
            breakLength: this.props.breakLength,
            uninitialized: false
        };
    }

    render(){
        return (
            <div className="panel">
                <div className="panel-heading">
                    <div className="level">
                        <div className="level-left">
                            <span className="level-item">Beállítások</span>
                        </div>
                        <div className="level-right">
                            <CopyButton className="level-item" copyData={`${window.location.origin}/${this.props.preset}`} text="Link" />
                        </div>
                    </div>
                </div>
                <div className="panel-block">
                    <div className="allwidth">
                        <LabeledInput title="Órák száma">
                            <input onBlur={()=>this.updateState(this.props, this.state)} type="number" className="input" onChange={this.setLessons} value={this.state.lessons} />
                        </LabeledInput>
                        <LabeledInput title="Órák hossza">
                            <input onBlur={()=>this.updateState(this.props, this.state)} type="number" className="input" onChange={this.setLessonLength} value={this.state.lessonLength} />
                        </LabeledInput>
                        <LabeledInput title="Szünet hossza">
                            <input onBlur={()=>this.updateState(this.props, this.state)} type="number" className="input" onChange={this.setBreakLength} value={this.state.breakLength} />
                        </LabeledInput>
                        <div className="field">
                            <label className="label">Órák kezdete</label>
                        </div>
                        <div className="field has-addons">
                            <div className="control">
                                <input onBlur={()=>this.updateState(this.props, this.state)} type="number" className="input thin-number" onChange={this.setStartHour} value={this.state.startHour} />
                            </div>
                            <div className="control">
                                <div className="button is-dark" disabled>
                                    :
                                </div>
                            </div>
                            <div className="control">
                                <input onBlur={()=>this.updateState(this.props, this.state)} type="number" className="input thin-number" onChange={this.setStartMinute} value={this.state.startMinute} />
                            </div>
                        </div>
                        <BreakOverrideMenu
                            breakOverrides={this.props.breakOverrides}
                            setBreakLesson={this.setBreakLesson}
                            setBreakDuration={this.setBreakDuration}
                            removeOverride={this.removeOverride}
                            addOverride={this.addOverride}/>
                    </div>
                </div>
            </div>
        );
    }
}

const stateToProps = (state)=>{
    console.log(state, generatePreset(state));
    return {
        lessons: state.lessons,
        startHour: state.startHour,
        startMinute: state.startMinute,
        lessonLength: state.lessonLength,
        breakLength: state.breakLength,
        breakOverrides: state.breakOverrides,
        preset: generatePreset(state)
    }
}

const reducerToProps = (reducer)=>{
    return {
        setLessons: (lessons)=>{
            reducer({type: "SET_LESSONS", lessons: lessons})
        },
        setLessonLength: (length)=>{
            reducer({type: "SET_LESSON_LENGTH", length: length})
        },
        setBreakLength: (length)=>{
            reducer({type: "SET_BREAK_LENGTH", length: length})
        },
        setStartHour: (hour)=>{
            reducer({type: "SET_START_HOUR", hour: hour})
        },
        setStartMinute: (minute)=>{
            reducer({type: "SET_START_MINUTE", minute: minute})
        },
        setBreakDuration: (duration, id)=>{
            reducer({type: "SET_BREAK_DURATION", duration: duration, id: id})
        },
        setBreakLesson: (lesson, id)=>{
            reducer({type: "SET_BREAK_LESSON", lesson: lesson, id: id})
        },
        removeOverride: (id) => {
            reducer({type: "REMOVE_OVERRIDE", id: id})
        },
        addOverride: () => {
            reducer({type: "ADD_OVERRIDE", lesson: 1, duration: 15})
        }
    }
}

const connected = connect(stateToProps, reducerToProps)(TimeTableSettings)

export {connected as TimeTableSettings};