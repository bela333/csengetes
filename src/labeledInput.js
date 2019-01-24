import React from 'react';

export function LabeledInput(props) {
    return (
    /*<div className="field is-horizontal">
        <div className="field-label"><label className="label">{props.title}</label></div>
        <div className="field-body">
            <div className="field">
                <div className="control">
                    {props.children}
                </div>
            </div>
        </div>
    </div>*/
    <div className="field">
        <label className="label">{props.title}</label>
        <div className="control">
            {props.children}
        </div>
    </div>
);
}