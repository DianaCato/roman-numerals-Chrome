(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const {
  errorLetter,
  letterMesagge,
  isValidLetters,
  isValidRepetition,
  isValidChar,
  isValidSubstraction,
  isValidPosition,
  letterConvertion,
} = require('./roman');
const { convertRoman } = require('./arabigo');

module.exports.parse = (roman) => {
  if (typeof roman !== 'string') {
    throw new Error('Not a string');
  }
  const romanCapital = roman.toUpperCase();
  const arrayRomans = romanCapital.split('');

  if (!isValidChar(arrayRomans)) {
    throw new Error('Unknown roman numeral');
  }
  if (!isValidLetters(arrayRomans)) {
    throw new Error(`Invalid repetition of number starting with 5: ${letterMesagge(errorLetter[0])}`);
  }

  if (!isValidRepetition(romanCapital)) {
    throw new Error(`Too many repetitions of roman numeral ${errorLetter[0]}`);
  }
  if (!isValidSubstraction(romanCapital)) {
    throw new Error(`Invalid substraction prefix ${errorLetter[0]}`);
  }
  if (!isValidPosition(romanCapital)) {
    throw new Error('Invalid order');
  }
  return letterConvertion(arrayRomans);
};

module.exports.stringify = (arabigo) => {
  if (typeof arabigo !== 'number') {
    throw new Error('Not a number');
  }

  if (arabigo <= 0 || arabigo >= 4000) {
    throw new Error('out of range');
  }

  return convertRoman(arabigo);
};

},{"./arabigo":2,"./roman":3}],2:[function(require,module,exports){
const numbers = [
  {
    roman: 'M',
    arabic: 1000,
  },
  {
    roman: 'CM',
    arabic: 900,
  },
  {
    roman: 'D',
    arabic: 500,
  },
  {
    roman: 'CD',
    arabic: 400,
  },
  {
    roman: 'C',
    arabic: 100,
  },
  {
    roman: 'XC',
    arabic: 90,
  },
  {
    roman: 'L',
    arabic: 50,
  },
  {
    roman: 'XL',
    arabic: 40,
  },
  {
    roman: 'X',
    arabic: 10,
  },
  {
    roman: 'IX',
    arabic: 9,
  },
  {
    roman: 'V',
    arabic: 5,
  },
  {
    roman: 'IV',
    arabic: 4,
  },
  {
    roman: 'I',
    arabic: 1,
  },
];

const convertRoman = (number) => {
  let result = number;
  let romanNumber = '';
  while (result > 0) {
    const filter = numbers.filter((n) => n.arabic <= result)[0];
    result -= filter.arabic;
    romanNumber += filter.roman;
  }

  return romanNumber;
};

module.exports = {
  convertRoman,
};

},{}],3:[function(require,module,exports){
const errorLetter = [];

const letterMesagge = (letter) => {
  let mesagge;
  switch (letter) {
    case 'V':
      mesagge = 'V (5)';
      break;
    case 'L':
      mesagge = 'L (50)';
      break;
    case 'D':
      mesagge = 'D (500)';
      break;
    default:
      mesagge = 'Not error';
      break;
  }
  return mesagge;
};

const isValidLetters = (arrayRomans) => {
  const romans = ['V', 'L', 'D'];
  const count = romans.map((letter) => arrayRomans.filter((e) => e === letter).length);
  const valid = count.every((n) => n < 2);
  count.filter((e, index) => {
    if (e >= 2) errorLetter[0] = romans[index];
    return null;
  });
  return valid;
};

const isValidRepetition = (stringRomans) => {
  const romans = ['I', 'X', 'C', 'M'];
  const regex = /(.)\1*/g;
  const arr = stringRomans.match(regex);
  const arrOne = arr.filter((e) => romans.indexOf(e[0]) !== -1);

  let mapFinal = arrOne.map((n) => n.length < 4);

  let isValid = mapFinal.every((e) => e === true);

  if (isValid) {
    const arrayRoman = stringRomans.split('').sort().join('');
    const arr2 = arrayRoman.match(regex);
    const arrTwo = arr2.filter((e) => romans.indexOf(e[0]) !== -1);

    mapFinal = arrTwo.map((n) => n.length < 5);

    isValid = mapFinal.every((e) => e === true);
  }

  mapFinal.filter((e, index) => {
    if (e === false) errorLetter[0] = arrOne[index].charAt(0);
    return null;
  });
  return isValid;
};

const isValidChar = (arrayRomans) => {
  const romans = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
  const isFound = arrayRomans.every((e) => romans.includes(e));
  return isFound;
};

const isValidSubstraction = (roman) => {
  const romans = ['VX', 'VL', 'VC', 'VD', 'VM', 'LC', 'LD', 'LM', 'DM'];
  const exist = romans.map((e) => roman.indexOf(e));
  const valid = exist.every((n) => n < 0);
  exist.filter((e, index) => {
    if (e >= 0) errorLetter[0] = romans[index].charAt(0);
    return null;
  });
  return valid;
};

const isValidPosition = (roman) => {
  const romans = ['IIV', 'IIX', 'IL', 'IC', 'ID', 'IM', 'XXL', 'XXC', 'XD', 'XM', 'IVI', 'IXI'];
  const exist = romans.map((e) => roman.indexOf(e));
  const valid = exist.every((n) => n < 0);
  return valid;
};

const convert = (letter) => {
  let mesagge;
  switch (letter) {
    case 'I':
      mesagge = 1;
      break;
    case 'V':
      mesagge = 5;
      break;
    case 'X':
      mesagge = 10;
      break;
    case 'L':
      mesagge = 50;
      break;
    case 'C':
      mesagge = 100;
      break;
    case 'D':
      mesagge = 500;
      break;
    case 'M':
      mesagge = 1000;
      break;
    default:
      mesagge = 'error';
      break;
  }
  return mesagge;
};

const letterConvertion = (romans) => {
  const arabigos = romans.map((e) => convert(e));
  let total = 0;

  arabigos.forEach((current, index, array) => {
    if (current >= array[index + 1] || index === array.length - 1) {
      total += current;
    } else {
      total -= current;
    }
  });

  return total;
};

module.exports = {
  errorLetter,
  letterMesagge,
  isValidLetters,
  isValidRepetition,
  isValidChar,
  isValidSubstraction,
  isValidPosition,
  letterConvertion,
};

},{}],4:[function(require,module,exports){

const  {parse, stringify} =require( 'roman-numerals');

    const text = document.getElementById("number");
    const answer = document.getElementById("text");
    const regex = /^[0-9]*$/;
  
    text.addEventListener("keyup", () => {
      if (regex.test(text.value)){
        document.getElementById("arabic").classList.add('active');
      }else {
        document.getElementById("roman").classList.add('active');
      }
    })
  
  document.getElementById("roman").addEventListener("click", function () {
    document.getElementById("roman").classList.remove('active');
      try {
            answer.innerHTML = parse(text.value);
          } catch (error) {
            answer.innerHTML = error.message;
          }      
   });
  
  document.getElementById("arabic").addEventListener("click", function () {
    document.getElementById("arabic").classList.remove('active');
    if(!isNaN(+text.value)){
        try {
            answer.innerHTML = stringify(+text.value);
          } catch (error) {
            answer.innerHTML = error.message;
          }
    }else {
        answer.innerHTML = 'Not a number';
    }
  });
  
  document.getElementById("clear").addEventListener("click", () => {
    document.getElementById("arabic").classList.remove('active');
    document.getElementById("roman").classList.remove('active');
    text.value = "";
    answer.innerHTML = "";
  })

},{"roman-numerals":1}]},{},[4]);
