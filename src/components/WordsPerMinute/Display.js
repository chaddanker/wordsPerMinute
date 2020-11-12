import React, { useState } from 'react';

import './Display.scss';

const Display = ({timer, wordCount, mistakes, accuracy, characterCount}) => {
    return (
        <div className="Display">
            <div className="upper">
                <div className="item">
                    <h1>{wordCount}<span>{` `}words</span></h1>
                </div>
                <div className="item">
                    <h1>{characterCount}<span>{` `}characters</span></h1>
                </div>
                <div className="item">
                    <h1>{isNaN(Math.floor(100 - accuracy)) ? 100 : Math.floor(100 - accuracy)}<span>{` `}% accuracy</span></h1>
                </div>
            </div>
            <div>
                {/* <h1>{`${wordCount}words ${mistakes}errors ${accuracy}%`}</h1> */}
                <h1 className="timer">{timer}<span>s</span></h1>
            </div>
        </div>
    );
};

export default Display;