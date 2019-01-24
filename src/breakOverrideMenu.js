import React from 'react';

export function BreakOverrideMenu(props) {

    var breakOverrides = props.breakOverrides.map(e=>(
        <tr key={e.id}>
            <td>
                <div className="field has-addons">
                    <div className="control">
                        <input className="input thin-number" type="number" value={e.lesson} onChange={(...a)=>props.setBreakLesson(e.id, ...a)} />
                    </div>
                    <div className="control">
                        <div className="button is-dark" disabled>
                            . óra után
                        </div>
                    </div>
                    <div className="control">
                        <input className="input thin-number" type="number" value={e.duration} onChange={(...a)=>props.setBreakDuration(e.id, ...a)}/>
                    </div>
                    <div className="control">
                        <div className="button is-dark" disabled>
                            perc
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    ));

    return (
        <div className="field is-grouped">
            <label className="label">Szünet átírása</label>
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
    );
}