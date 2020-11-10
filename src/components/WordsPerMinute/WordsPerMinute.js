import React, { useState, useEffect } from 'react';

import Display from './Display';
import TypeInput from './TypeInput';

import './WordsPerMinute.scss';

const tester = "generate a string of 100 random words here";

const WordsPerMinute = () => {

    const [testValue, setTestValue] = useState(tester);
    const [timer, setTimer] = useState(60);
    const [wordCount, addWord] = useState(0);
    const [characterCount, addCharacter] = useState(0);
    const [mistakes, addMistake] = useState(0);
    const [accuracy, setAccuracy] = useState(100);

    useEffect(() => {
        setAccuracy((mistakes/wordCount)*100);
    }, [mistakes, wordCount]);

    return (
        <div className="WordsPerMinute">
            <Display 
                timer={timer} 
                wordCount={wordCount}
                characterCount={characterCount}
                mistakes={mistakes}
                accuracy={accuracy}
            />
            <TypeInput 
                setTimer={setTimer} 
                timer={timer} 
                testString={testValue} 
                setTestString={setTestValue} 
                original={tester}
                addWord={addWord}
                addCharacter={addCharacter}
                addMistake={addMistake}
                setAccuracy={setAccuracy}
                wordCount={wordCount}
                characterCount={characterCount}
                mistakes={mistakes}
                accuracy={accuracy}
            />
        </div>
    );
};

export default WordsPerMinute;