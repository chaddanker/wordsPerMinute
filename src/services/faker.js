//generates random words for test string
import faker from 'faker';

const makeArray = (length, randomWord) => {
    return [...Array(length)].map((_, i) => {
        return randomWord();
    });
}

// Array containing 100 single word strings
const testString = makeArray(100, faker.random.word);

export default testString;