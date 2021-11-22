Matrix code rain
================

**See live demo [here](https://janemiceli.github.io/matrix/)**

Uses [stats.js](https://github.com/mrdoob/stats.js/) for the performance logging, and *Matrix* font is from [here](http://www.dafont.com/matrix-code-nfi.font).

TO DO
- Improve performance, aim for 60FPS with as many code columns as possible
- Randomly replace code characters as code falls, only one string per character length is allowed for some reason

CONFIGURATION 
- Change color of the rain in script.js, by assigning variable "colorrain" a number that corresonds with the color:
```
bluerain = 207;
var colorrain = bluerain;
```
Live examples:
 * [Pink](https://janemiceli.github.io/Happy_birthday_aria/)
 * [Orange](https://janemiceli.github.io/Happy_birthday_aria/)
 * [Yellow](https://janemiceli.github.io/Happy_birthday_connor/)
 * [Green](https://janemiceli.github.io/matrix_tim/)
 * [Blue](https://janemiceli.github.io/matrix)
 * [Purple](https://janemiceli.github.io/Happy_birthday_angie/)

- Change the messages/words that appear in the rain by using all CAPS and assign to array "messages"
```
const messages = ["ALPHA", "BETA", "GAMMA"]
```