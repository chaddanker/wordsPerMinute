import React, { useEffect, useState } from 'react';

import './TypeInput.scss';

const TypeInput = ({testString, setTestString, original, setTimer, timer, addWord, addCharacter, addMistake, setAccuracy, wordCount, characterCount, mistakes, accuracy}) => {

    const [currentKey, setCurrentKey] = useState('');
    const [index, setIndex] = useState(0);
    const [typed, setTyped] = useState('');
    const [left, setLeft] = useState(0);
    const [remainingOffset, setRemainingOffset] = useState(0);
    const [letterCount, setLetterCount] = useState(22);

    const checkWidth = () => {
        if(window.innerWidth < 800 && window.innerWidth > 400) { 
            setLetterCount(11);
        } else if(window.innerWidth < 400) { 
            setLetterCount(5);
        };
    };

    useEffect(() => {
        document.addEventListener('keydown', (event) => setCurrentKey(event.key));
        window.onload = () => document.querySelector("#mainInput").focus();
    }, []);

    const _setTestString = (event) => {
        let typedOffset = window.innerWidth < 400 ? 0 : window.innerWidth < 800 ? 1 : 0.91;
        let remainOffset = window.innerWidth < 400 ? 0 : window.innerWidth < 800 ? 1 : 1.2;;
        if(index > 40) {
            typedOffset = 0;
            remainOffset = 0;
        } 

        if(index === 0) {
            //start timer
            setInterval(() => {
                if(timer > -1) {
                    setTimer(timer--);
                }
            }, 1000);
        }
        if(index === original.length) {
            addWord(wordCount + 1);
        }
        //as you type color of typed digit must be blue // other untyped digits must remain grey
        if(currentKey === 'Backspace') { 
            setLeft(left - typedOffset);
            setRemainingOffset(remainingOffset + remainOffset);
            setTyped(typed.slice(0, typed.length - 1)); 
            const newString = `${original.slice(index - 1, original.length)}`;
            setTestString(newString);
            setIndex(index - 1);          
            return;
        };
        if(currentKey.length < 2) {
            addCharacter(characterCount + 1);
            setLeft(left + typedOffset);
            setRemainingOffset(remainingOffset - remainOffset);
            if(currentKey !== original.charAt(index)) {
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
                <input 
                    type="text" 
                    value={typed} 
                    onChange={event => _setTestString(event)} 
                    id="mainInput"
                />
                    
                <span 
                 className="remaining" 
                 dangerouslySetInnerHTML={{__html: testString.slice(0, window.innerWidth < 400 ? 6 : window.innerWidth < 800 ? 12 : 20)}} 
                 style={{position: 'relative',  left: `${25 - remainingOffset}vw`}}
                >
                </span>
            </div>
        </div>
    );
};

export default TypeInput;
