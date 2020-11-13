import React, { useEffect, useState } from 'react';

import './TypeInput.scss';

const TypeInput = ({testString, setTestString, original, setTimer, timer, addWord, addCharacter, addMistake, setAccuracy, wordCount, characterCount, mistakes, accuracy}) => {

    const [currentKey, setCurrentKey] = useState('');
    const [index, setIndex] = useState(0);
    const [typed, setTyped] = useState('');

    useEffect(() => {
        document.addEventListener('keydown', (event) => setCurrentKey(event.key));
        window.onload = () => document.querySelector("#mainInput").focus();
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
        if(index === original.length) {
            addWord(wordCount + 1);
        }
        //as you type color of typed digit must be blue // other untyped digits must remain grey
        if(currentKey === 'Backspace') { 
            setTyped(typed.slice(0, typed.length - 1)); 
            setIndex(index - 1);          
            return;
        };
        if(currentKey.length < 2) {
            addCharacter(characterCount + 1);
            if(currentKey !== original.charAt(index)) {
                addMistake(mistakes + 1);
            }
            if(currentKey === ' ') {
                addWord(wordCount + 1);
            }
            setTyped(`${typed + currentKey}`);
            setIndex(index + 1);
        }
    };

    return (
        <div className="TypeInput">
            <div>
                <input 
                    type="text" 
                    value={typed} 
                    onChange={event => _setTestString(event)} 
                    id="mainInput"
                />
                    
                <span 
                 className="remaining" 
                 dangerouslySetInnerHTML={{__html: testString.slice(index, window.innerWidth < 400 ? 5 + index: window.innerWidth < 800 ? 12 + index: 20 + index)}} 
                 style={{position: 'absolute',  right: `${1.5}vw`, bottom: '5.54vw' , zIndex: 999}}
                >
                </span>
            </div>
        </div>
    );
};

export default TypeInput;
