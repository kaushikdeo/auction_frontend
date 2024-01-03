import React from "react";
import "./widget.scss"

const Widget = () => {
    return (
        <div className="widget">
            <div className="left">
                <span className="title">Left</span>
            </div>
            <div className="right">
                <span className="title">Right</span>
            </div>
        </div>
    )
}

export default Widget