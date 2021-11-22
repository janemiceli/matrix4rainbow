Matrix code rain
================

**See live demo [here](https://janemiceli.github.io/matrix/)**

Uses [stats.js](https://github.com/mrdoob/stats.js/) for the performance logging, and *Matrix* font is from [here](http://www.dafont.com/matrix-code-nfi.font).

TO DO

- Improve performance, aim for 60FPS with as many code columns as possible
- Randomly replace code characters as code falls, only one string per character length is allowed for some reason

CONFIGURATION 
- Change color of the rain in script.js, by assigning variable "colorrain" a number that corresonds with the color:
'''
bluerain = 207;
var colorrain = bluerain;
'''
- Change the messages/words that appear in the rain by using all CAPS and assign to array "messages"
```
const messages = ["ALPHA", "BETA", "GAMMA"]
```