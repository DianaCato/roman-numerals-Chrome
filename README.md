# Chrome Extension Roman-numeral

This is a project to run the [Roman Numerals](https://github.com/DianaCato/REG003-roman-numerals) module through a Chrome extension.

## Roman Numeral

It allows to make two conversions:

- Roman numerals to Arabic numerals, receives a string and returns a number. If it is not a valid Roman number, it will throw an error specifying the cause.

- Arabic to Roman numbers, receives a number and returns a String with the representation of the number received as a Roman number. Valid range is 1 to 3999

## How to use

It must be installed from developer mode, as it is not published in the Chrome extensions store.

1. We clone the Github repository in a local directory:
```bash
git clone https://github.com/DianaCato/roman-numerals-Chrome.git
```

2. Go to the Chrome option  `Menu`>` More Tools`> `Extensions`

3. At the top right we activate the option of `Developer Mode`

4. We access the new button `Load Unpacked`

5. We select the directory that we have just cloned.
6. You can start using it, just enter a number and choose between converting to Arabic or Roman

