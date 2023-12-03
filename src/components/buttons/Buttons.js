// Import packages
import React from "react";

// Import utils

// Import styles
import "./buttons.scss";



export function PrimaryButton (props) {
    const { title, className, cb, loading, disabled, id } = props;
    return <button className={`PrimaryButton ${className ? className : ''}`}
                   id={id}
                   disabled={disabled || false}
                   onClick={(e) => {
                       if (!loading && cb) {
                           e.preventDefault();
                           e.stopPropagation()
                           cb();
                       }
                   }}>
        <span className="title">{title}</span>
    </button>
}

