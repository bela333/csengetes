import React, {Component} from 'react';
import {connect} from 'react-redux';

class TimeTableDisplay extends Component{

    render(){
        var TableElements = [];
        var currentHour = this.props.startHour;
        var currentMinute = this.props.startMinute;
        for (let i = 0; i < this.props.lessons; i++) {
            var nextHour = currentHour;
            var nextMinute = currentMinute;
            nextMinute += this.props.lessonLength;
            nextHour += Math.floor(nextMinute/60)
            nextMinute %= 60;
            nextHour %= 24;

            TableElements[i] = (
            <tr key={i}>
                <td>
                    <div className="is-pulled-left"><b>{i+1}. óra</b></div>
                    <div className="is-pulled-right">
                    {currentHour}:{(currentMinute+"").padStart(2, '0')} 
                    {/*This is some really shitty hack tbh*/ " - "}
                    {nextHour}:{(nextMinute+"").padStart(2, '0')} 
                    </div>
                </td>
            </tr>
            );
            var breakLength = this.props.breakLength;
            const override = this.props.breakOverrides.find(a=>a.lesson === i+1);
            if (override != null) {
                breakLength = override.duration;
            }
            currentMinute += this.props.lessonLength+breakLength;
            currentHour += Math.floor(currentMinute/60)
            currentMinute %= 60;
            currentHour %= 24;
        }


        return (
            <div className="panel">
                <div className="panel-heading">Csengetési rend</div>
                <div className="panel-block">
                    <table className="table is-hoverable is-fullwidth">
                        <tbody>
                            {TableElements}
                        </tbody>
                    </table>
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


const connected = connect(stateToProps)(TimeTableDisplay);

export {connected as TimeTableDisplay};