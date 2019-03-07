import * as Copy from 'copy-to-clipboard';
import React from 'react';

export function CopyButton({copyData, text="Click here to copy"}){
    return (<button className="button is-primary is-fullwidth" onClick={()=>{
        Copy(copyData)
    }}>{text}</button>);
}