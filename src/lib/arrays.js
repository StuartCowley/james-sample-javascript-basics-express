const getNthElement = (index, array) => {
  if (index < array.length) {
    return array[index];
  }
  return array[index - array.length];
};

const arrayToCSVString = array => {
  return array.join();
};

const csvStringToArray = string => {
  return string.split(',');
};

const addToArray = (element, array) => {
  array.push(element);
};

const addToArray2 = (element, array) => {
  return array.concat(element);
};

const removeNthElement = (index, array) => {
  return array.splice(index, 1);
};

const numbersToStrings = numbers => {
  return numbers.map(num => {
    return num.toString();
  });
};

const uppercaseWordsInArray = strings => {
  return strings.map(string => {
    return string.toUpperCase();
  });
};

const reverseWordsInArray = strings => {
  return strings.map(string => {
    return string
      .split('')
      .reverse()
      .join('');
  });
};

const onlyEven = numbers => {
  return numbers.filter(num => {
    return num % 2 === 0;
  });
};

const removeNthElement2 = (index, array) => {
  return array.slice(0, index).concat(array.slice(index + 1));
};

const elementsStartingWithAVowel = strings => {
  return strings.filter(string => {
    return string.match(/^[aeiou]/i);
  });
};

const removeSpaces = string => {
  return string.split(' ').join('');
};

const sumNumbers = numbers => {
  return numbers.reduce((acc, number) => {
    return acc + number;
  });
};

const sortByLastLetter = strings => {
  return strings.sort((a, b) => {
    return a.charCodeAt(a.length - 1) - b.charCodeAt(b.length - 1);
  });
};

module.exports = {
  getNthElement,
  arrayToCSVString,
  csvStringToArray,
  addToArray,
  addToArray2,
  removeNthElement,
  numbersToStrings,
  uppercaseWordsInArray,
  reverseWordsInArray,
  onlyEven,
  removeNthElement2,
  elementsStartingWithAVowel,
  removeSpaces,
  sumNumbers,
  sortByLastLetter,
};
