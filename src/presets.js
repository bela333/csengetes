import {v4} from 'uuid'
import * as Base58 from 'base-58';

export const defaultState = {
    lessons: 7,
    lessonLength: 45,
    breakLength: 10,
    startHour: 8,
    startMinute: 0,
    breakOverrides: [
        {lesson: 3, duration: 15, id:v4()}
    ],
    loadedPreset: false
};

export function generateLesson(preset){
    //Try to parse preset
    try{
        return parsePreset(preset)
    }catch{
        //If not successful, return default state
        return defaultState;
    }

}

//Format: # of lessons              - lessons
//        length of lessons         - lessonLength
//        length of breaks          - breakLength
//        hour of school starting   - startHour
//        minute of school starting - startMinute
//        ARRAY OF OVERRIDES:       - breakOverrides
//           lesson                 - lesson
//           duration in minutes    - duration
//           (MAKE SURE TO ADD ID)  - id (v4)
function parsePreset(preset){
    const data = Base58.decode(preset);
    if (data.length <= 4) {
        throw new Error("Not enough data.");
    }
    var state = {};
    state.lessons = data[0];
    state.lessonLength = data[1];
    state.breakLength = data[2];
    state.startHour = data[3];
    state.startMinute = data[4];
    state.breakOverrides = [];
    for (let i = 5; i < data.length; i+=2) {
        var lesson = data[i];
        var duration = data[i+1];
        state.breakOverrides.push({lesson: lesson, duration: duration, id: v4()})
    }
    return state;
}

//Format: # of lessons
//        length of lessons
//        length of breaks
//        hour of school starting
//        minute of school starting
//        ARRAY OF OVERRIDES:
//           lesson
//           duration in minutes
export function generatePreset(state){
    var output = [  state.lessons,
                    state.lessonLength,
                    state.breakLength,
                    state.startHour,
                    state.startMinute];
    state.breakOverrides.forEach((override)=>{
        output.push(override.lesson)
        output.push(override.duration)
    })
    //TODO: Limit all state variables to 8 bits
    var uintarray = new Uint8Array(output);
    return Base58.encode(uintarray);
    
}