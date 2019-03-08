import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export function BreakOverrideMenu(props) {

    var breakOverrides = props.breakOverrides.map(e=>(
        <tr key={e.id}>
            <td>
                <div className="field has-addons breakoverride">
                    <div className="control">
                        <input className="input thin-number" type="number" value={e.lesson} onChange={(...a)=>props.setBreakLesson(e.id, ...a)} />
                    </div>
                    <div className="control">
                        <div className="button is-dark is-fullwidth" disabled>
                            . óra után
                        </div>
                    </div>
                    <div className="control">
                        <input className="input thin-number" type="number" value={e.duration} onChange={(...a)=>props.setBreakDuration(e.id, ...a)}/>
                    </div>
                    <div className="control">
                        <div className="button is-dark is-fullwidth" disabled>
                            perc
                        </div>
                    </div>
                    <div className="control">
                        <button className="button is-danger is-fullwidth" onClick={()=>props.removeOverride(e.id)}>
                            <FontAwesomeIcon icon="times" />
                        </button>
                    </div>
                </div>
            </td>
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