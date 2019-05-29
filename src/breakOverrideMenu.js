import React, {useState, useEffect, useCallback} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

function BreakOverrideElement({e, removeOverride, ...props}){
    const _setBreakLesson = props.setBreakLesson;
    const _setBreakDuration = props.setBreakDuration;
    const [lesson,setLesson] = useState(e.lesson);
    const [duration,setDuration] = useState(e.duration);
    const updateState = useCallback(()=>{
        _setBreakLesson(e.id, lesson);
        _setBreakDuration(e.id, duration);
    }, [e.id, _setBreakLesson, _setBreakDuration, lesson, duration])
    return (<td>
        <div className="field has-addons breakoverride">
            <div className="control">
                <input onBlur={updateState} className="input thin-number" type="number" value={lesson} onChange={(a)=>setLesson(a.target.value)} />
            </div>
            <div className="control">
                <div className="button is-dark is-fullwidth" disabled>
                    . óra után
                </div>
            </div>
            <div className="control">
                <input onBlur={updateState} className="input thin-number" type="number" value={duration} onChange={(a)=>setDuration(a.target.value)}/>
            </div>
            <div className="control">
                <div className="button is-dark is-fullwidth" disabled>
                    perc
                </div>
            </div>
            <div className="control">
                <button className="button is-danger is-fullwidth" onClick={()=>removeOverride(e.id)}>
                    <FontAwesomeIcon icon="times" />
                </button>
            </div>
        </div>
    </td>);
}

export function BreakOverrideMenu(props) {
    var breakOverrides = props.breakOverrides.map(e=>(
        <tr key={e.id}>
            <BreakOverrideElement e={e} setBreakLesson={props.setBreakLesson} setBreakDuration={props.setBreakDuration} removeOverride={props.removeOverride} />
        </tr>
    ));

    return (
        

        <div>
            <div className="field">
                <label className="label">Szünet átírása</label>
                <button className="button is-fullwidth is-primary" onClick={props.addOverride}>
                    <FontAwesomeIcon icon="plus" />
                </button>
            </div>
            <div className="field">
                <div className="control">
                    <div className="box is-fullwidth">
                        <table className="table is-hoverable is-fullwidth">
                            <tbody>
                                {breakOverrides}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}