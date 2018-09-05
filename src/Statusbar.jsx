import React, {Component} from 'react';


export default function Statusbar({count, max}) {
    return (
        <div className="status">
            <span className={ count > max ? 'counter over' : 'counter' }>{ max - count }</span>
        </div>
    )
}

