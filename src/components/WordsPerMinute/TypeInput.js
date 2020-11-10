import React, { useEffect, useState } from 'react';

const TypeInput = ({testString, setTestString, original, setTimer, timer, addWord, addCharacter, addMistake, setAccuracy, wordCount, characterCount, mistakes, accuracy}) => {

    const [currentKey, setCurrentKey] = useState('');
    const [index, setIndex] = useState(0);
    const [typed, setTyped] = useState('');
    const [left, setLeft] = useState(0);
    const [remainingOffset, setRemainingOffset] = useState(0);

    useEffect(() => {
        document.addEventListener('keydown', (event) => {
            setCurrentKey(event.key);
        });

        window.onload = () => {
            document.querySelector("#mainInput").focus();
        }

    }, []);

    const _setTestString = (event) => {
        if(index === 0) {
            //start timer
            setInterval(() => {
                if(timer > -1) {
                    setTimer(timer--);
                }
            }, 1000);
        }
        //as you type color of typed digit must be blue // other untyped digits must remain grey
        if(currentKey === 'Backspace') { 
            setLeft(left - .91);
            setRemainingOffset(remainingOffset - 0.245);
            setTyped(typed.slice(0, typed.length - 1)); 
            const newString = `${original.slice(index - 1, original.length)}`;
            setTestString(newString);
            setIndex(index - 1);           
            return;
        };
        if(currentKey.length < 2) {
            setLeft(left + .91);
            setRemainingOffset(remainingOffset + 0.245);
            //compare currentKey to original.charAt(index);
            if(currentKey !== original.charAt(index)) {
                //strikethrough or red color end word
                addMistake(mistakes + 1);
            }
            if(currentKey === ' ') {
                addWord(wordCount + 1);
            }
            const newString = `${original.slice(index + 1, original.length)}`;
            setTyped(`${typed + currentKey}`);
            setTestString(newString);
            setIndex(index + 1);
        }
    };

    return (
        <div className="TypeInput">
            <div style={{position: 'relative', left: `-${left}em`}}>
                <input type="text" value={typed} onChange={event => _setTestString(event)} id="mainInput"/>
                    <span className="app-input-left">
                        {typed}
                    </span>
                    
                    <span className="remaining" dangerouslySetInnerHTML={{__html: testString}} style={{position: 'relative', left: `${43.4 - remainingOffset}%`}}>
                    </span>
            </div>
        </div>
    );
};

export default TypeInput;
