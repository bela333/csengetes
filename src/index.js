import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {v4} from 'uuid'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faTimes, faPlus} from '@fortawesome/free-solid-svg-icons'

library.add(faTimes);
library.add(faPlus);

const defaultState = {
    lessons: 7,
    lessonLength: 45,
    breakLength: 10,
    startHour: 8,
    startMinute: 0,
    breakOverrides: [
        {lesson: 3, duration: 15, id:v4()}
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
        var newOverrides = [...state.breakOverrides]
        for (let i = 0; i < newOverrides.length; i++) {
            if (newOverrides[i].id === action.id) {
                newOverrides[i].duration = Number(action.duration)
            }
        }
        return {...state, breakOverrides: newOverrides}
    }
    if (action.type === "SET_BREAK_LESSON") {
        var newOverrides = [...state.breakOverrides]
        for (let i = 0; i < newOverrides.length; i++) {
            if (newOverrides[i].id === action.id) {
                newOverrides[i].lesson = Number(action.lesson)
            }
        }
        return {...state, breakOverrides: newOverrides}
    }
    if (action.type === "REMOVE_OVERRIDE") {
        var newOverrides = state.breakOverrides.filter(a=>a.id!==action.id)
        console.log(newOverrides)
        return {...state, breakOverrides: newOverrides}
    }
    if (action.type === "ADD_OVERRIDE") {
        var newOverrides = [...state.breakOverrides, 
            {lesson: action.lesson, duration: action.duration, id:v4()}
        ];
        return {...state, breakOverrides: newOverrides};
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
