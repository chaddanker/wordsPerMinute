import React, { useState } from 'react';

const Display = ({timer, wordCount, mistakes, accuracy}) => {
    return (
        <div className="Display">
            <div>
                {/* <h1>{`${wordCount} ${mistakes} ${accuracy}%`}</h1> */}
                <h1 className="timer">{timer}s</h1>
            </div>
        </div>
    );
};

export default Display;