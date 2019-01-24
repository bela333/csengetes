import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

var id = 0;

const defaultState = {
    lessons: 7,
    lessonLength: 45,
    breakLength: 10,
    startHour: 8,
    startMinute: 0,
    breakOverrides: [
        {lesson: 3, duration: 15, id:id++}
    ]
};

function reducer(state = defaultState, action) {
    if (action.type === "SET_LESSONS") {
        return {...state, lessons: action.lessons};
    }
    if (action.type === "SET_LESSON_LENGTH") {
        return {...state, lessonLength: action.length};
    }
    if (action.type === "SET_BREAK_LENGTH") {
        return {...state, breakLength: action.length};
    }
    if (action.type === "SET_START_HOUR") {
        return {...state, startHour: action.hour};
    }
    if (action.type === "SET_START_MINUTE") {
        return {...state, startMinute: action.minute};
    }
    if (action.type === "SET_BREAK_DURATION") {
        var lastOne = state.breakOverrides.find(a=>a.id==action.id);
        if (lastOne != null) {
            var newOverrides = [...(state.breakOverrides.filter(a=>a.id!=action.id)),
                {lesson: lastOne.lesson, id: lastOne.id, duration: Number(action.duration)}]
            return {...state, breakOverrides: newOverrides};   

        }
        
    }
    if (action.type === "SET_BREAK_LESSON") {
        var lastOne = state.breakOverrides.find(a=>a.id==action.id);
        if (lastOne != null) {
            var newOverrides = [...(state.breakOverrides.filter(a=>a.id!=action.id)),
                {lesson: Number(action.lesson), id: lastOne.id, duration: lastOne.duration}]
            return {...state, breakOverrides: newOverrides};   
        }
        
    }
    return state;
}

const store = createStore(reducer);

store.subscribe((a)=>{
    console.log(store.getState());
})

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
