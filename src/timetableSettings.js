import React, {Component} from 'react';
import {connect} from 'react-redux';
import {LabeledInput} from './labeledInput'
import { formatMinute } from './formatting';
import { BreakOverrideMenu } from './breakOverrideMenu';

class TimeTableSettings extends Component{

    setLessons = (e)=>{
        var lessons = Number(e.target.value);
        if (lessons < 1) {
            lessons = 1;
        }
        this.props.setLessons(lessons)
    }

    setLessonLength = (e)=>{
        this.props.setLessonLength(Number(e.target.value))
    }
    setBreakLength = (e)=>{
        this.props.setBreakLength(Number(e.target.value))
    }
    setStartHour = (e)=>{
        var hour = Number(e.target.value) % 24;
        while (hour < 0) {
            hour += 24;
        }
        this.props.setStartHour(hour)
    }
    setStartMinute = (e)=>{
        var minute = Number(e.target.value) % 60;
        while (minute < 0) {
            minute += 60;
        }
        this.props.setStartMinute(minute)
    }

    setBreakLesson = (id, e)=>{
        var value = e.target.value;
        if (value < 1) {
            value = 1;
        }
        if (value >= this.props.lessons) {
            value = this.props.lessons-1;
        }
        this.props.setBreakLesson(value, id)
    }

    setBreakDuration = (id, e)=>{
        var value = e.target.value;
        if(value < 0){
            value = 0;
        }
        this.props.setBreakDuration(value, id)
    }

    render(){
        return (
            <div className="panel">
                <div className="panel-heading">Beállítások</div>
                <div className="panel-block">
                    <div>
                        <LabeledInput title="Órák száma">
                            <input type="number" className="input" onChange={this.setLessons} value={this.props.lessons} />
                        </LabeledInput>
                        <LabeledInput title="Órák hossza">
                            <input type="number" className="input" onChange={this.setLessonLength} value={this.props.lessonLength} />
                        </LabeledInput>
                        <LabeledInput title="Szünet hossza">
                            <input type="number" className="input" onChange={this.setBreakLength} value={this.props.breakLength} />
                        </LabeledInput>
                        <div className="field is-grouped">
                            <label className="label">Órák kezdete</label>
                            <div className="control">
                                <input type="number" className="input thin-number" onChange={this.setStartHour} value={this.props.startHour} />
                            </div>
                            <div className="control">
                                :
                            </div>
                            <div className="control">
                                <input type="number" className="input thin-number" onChange={this.setStartMinute} value={formatMinute(this.props.startMinute)} />
                            </div>
                        </div>
                        <BreakOverrideMenu breakOverrides={this.props.breakOverrides} setBreakLesson={this.setBreakLesson} setBreakDuration={this.setBreakDuration}/>
                    </div>
                </div>
            </div>
        );
    }
}

const stateToProps = (state)=>{
    return {
        lessons: state.lessons,
        startHour: state.startHour,
        startMinute: state.startMinute,
        lessonLength: state.lessonLength,
        breakLength: state.breakLength,
        breakOverrides: state.breakOverrides
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
    }
}

const connected = connect(stateToProps, reducerToProps)(TimeTableSettings)

export {connected as TimeTableSettings};