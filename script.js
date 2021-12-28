const messages = ["TIM ", "ARIA ","CONNOR ", " JANE ", " MICELI "]

var pinkrain = 0;
var orangerain = 25
var yellowrain = 50;
var greenrain = 104;
var bluerain = 207;
var purplerain = 255;

var M = {
        settings: {
            COL_WIDTH: 20,
            COL_HEIGHT: 25,
            VELOCITY_PARAMS: {
                min: 1,
                max: 5
            },
            CODE_LENGTH_PARAMS: {
                min: 4,
                max: 20
            }
        },
        animation: null,
        c: null,
        ctx: null,
        lineC: null,
        ctx2: null,
        WIDTH: window.innerWidth,
        HEIGHT: window.innerHeight,
        COLUMNS: null,
        canvii: [],
        letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '$', '+', '-', '*', '/', '=', '%', '"', '\'', '#', '&', '_', '(', ')', ',', '.', ';', ':', '?', '!', '\\', '|', '{', '}', '<', '>', '[', ']', '^ ', '~', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' '],
        codes: [],
        createCodeLoop: null,
        codesCounter: 0,
        init: function () {
            "use strict";
            if (typeof(G_vmlCanvasManager) != 'undefined') {
                M.c = G_vmlCanvasManager.initElement('canvas');
			} else {
                M.c = document.getElementById('canvas');
			}
            M.ctx = M.c.getContext('2d');
            M.c.width = M.WIDTH;
            M.c.height = M.HEIGHT;
            M.ctx.shadowBlur = 0;
            M.ctx.fillStyle = '#000';
            M.ctx.fillRect(0, 0, M.WIDTH, M.HEIGHT);
            M.ctx.font = M.font;
            var i = 0;
            M.COLUMNS = Math.ceil(M.WIDTH / M.settings.COL_WIDTH);
            for (i = 0; i < M.COLUMNS; i += 1) {
                M.codes[i] = [];
                M.codes[i][0] = {
                    'open': true,
                    'position': {'x': 0, 'y': 0},
                    'strength': 0
                };
            }
            M.loop();
            M.createLines();
            M.createCode();
            window.onresize = function () {
                window.cancelAnimationFrame(M.animation);
                M.animation = null;
                M.ctx.clearRect(0, 0, M.WIDTH, M.HEIGHT);
                M.codesCounter = 0;
                M.ctx2.clearRect(0, 0, M.WIDTH, M.HEIGHT);
                M.WIDTH = window.innerWidth;
                M.HEIGHT = window.innerHeight;
                M.init();
            };
        },
        loop: function () {
            "use strict";
            M.animation = requestAnimationFrame(function () { M.loop(); });
            M.draw();
        },
        draw: function () {
            "use strict";
            var velocity, height, x, y, c, ctx, i = 0;
            M.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            M.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            M.ctx.fillRect(0, 0, M.WIDTH, M.HEIGHT);
            M.ctx.globalCompositeOperation = 'source-over';
            for (i = 0; i < M.COLUMNS; i += 1) {
                if (M.codes[i][0].canvas) {
                    velocity = M.codes[i][0].velocity;
                    height = M.codes[i][0].canvas.height;
                    x = M.codes[i][0].position.x;
                    c = M.codes[i][0].canvas;
                    ctx = c.getContext('2d');
                    if ( i%2 ==0 ){
                        y = M.codes[i][0].position.y + height;
                        M.ctx.drawImage(c, x, y, M.settings.COL_WIDTH, height);
                        if ((M.codes[i][0].position.y + height) < M.HEIGHT) {
                            M.codes[i][0].position.y -= velocity;
                        } else {
                            M.codes[i][0].position.y = height;
                        }
                    }else{
                        y = M.codes[i][0].position.y - height;
                        M.ctx.drawImage(c, x, y, M.settings.COL_WIDTH, height);
                        if ((M.codes[i][0].position.y - height) < M.HEIGHT) {
                            M.codes[i][0].position.y += velocity;
                        } else {
                            M.codes[i][0].position.y = 0;
                        }
                    }
                }
            }
        },
        createCode: function () {
            "use strict";
            clearTimeout(M.createCodeLoop);
            var randomInterval = M.randomFromInterval(0, 100), column = M.assignColumn(), codeLength = 0, i = 0, reverseString = "";
            if (column) {
                var codeVelocity = (Math.random() * (M.settings.VELOCITY_PARAMS.max - M.settings.VELOCITY_PARAMS.min)) + M.settings.VELOCITY_PARAMS.min, lettersLength = M.letters.length, newLetter = 0;
                codeLength = M.randomFromInterval(M.settings.CODE_LENGTH_PARAMS.min, M.settings.CODE_LENGTH_PARAMS.max);
                M.codes[column][0].position = {'x': (column * M.settings.COL_WIDTH), 'y': 0};
                M.codes[column][0].velocity = codeVelocity;
                M.codes[column][0].strength = M.codes[column][0].velocity / M.settings.VELOCITY_PARAMS.max;
                M.CheckArray(codeLength, messages, column, lettersLength)
                M.createCanvii(column);
                M.codesCounter += 1;
            }
            M.createCodeLoop = setTimeout(M.createCode, randomInterval);
        },
        CheckArray: function (codeLength, messages, column, lettersLength) {
            "use strict";
            var messageLengths = [];
            messages.forEach(message => {messageLengths.push(message.length)});
            messages.forEach(item => {
                if (item.length == codeLength - 1) {
                    M.insertCustomMessages(codeLength, item, column);
                } else {
                    M.randomMessage(codeLength, column, lettersLength, messageLengths);
                }
            });
        },
        insertCustomMessages: function (codeLength, message, column) {
            "use strict";
            for (var i = 1; i <= codeLength; i = i + 1) {
                var reverseString = message.split('').reverse().join('');
                M.codes[column][i] = reverseString.substring(i - 1, i);
            }
        },
        randomMessage:function (codeLength, column, lettersLength, messageLengths){
            "use strict";
            if(messageLengths.includes(codeLength - 1)){
                return;
            }
            for (var i = 1; i <= codeLength; i = i + 1) {
                var newLetter = M.randomFromInterval(0, (lettersLength - 1));
                M.codes[column][i] = M.letters[newLetter];
            }
        },
        createCanvii: function (i) {
            "use strict";
            var j, text, fadeStrength, codeLen = M.codes[i].length - 1, canvHeight = codeLen * M.settings.COL_HEIGHT, velocity = M.codes[i][0].velocity, strength = M.codes[i][0].strength, newCanv = document.createElement('canvas'), newCtx = newCanv.getContext('2d');
            newCanv.width = M.settings.COL_WIDTH;
            newCanv.height = canvHeight;
            text = M.codes[i][j];
            newCtx.globalCompositeOperation = 'source-over';
            newCtx.font = '30px matrix-code';
            if (i%2==0){
                for (j = 1; j < codeLen; j += 1) {
                    text = M.codes[i][j];
                    if (j < codeLen*.14) {
                        newCtx.shadowColor = 'hsla(' + pinkrain + ', 79%, 74%)';
                        newCtx.fillStyle = 'hsla(' + pinkrain + ', 79%, 74%, ' + strength + ')';
                    } else if (j < codeLen*.28) {
                        newCtx.shadowColor = 'hsla(' + orangerain + ', 79%, 74%)';
                        newCtx.fillStyle = 'hsla(' + orangerain + ', 79%, 74%, ' + strength + ')';
                    } else if (j < codeLen*.42) {
                        newCtx.shadowColor = 'hsla(' + yellowrain + ', 79%, 74%)';
                        newCtx.fillStyle = 'hsla(' + yellowrain + ', 79%, 74%, ' + strength + ')';
                    } else if (j < codeLen*.54) {
                        newCtx.shadowColor = 'hsla(' + greenrain + ', 79%, 74%)';
                        newCtx.fillStyle = 'hsla(' + greenrain + ', 79%, 74%, ' + strength + ')';
                    } else if (j < codeLen*.68) {
                        newCtx.shadowColor = 'hsla(' + bluerain + ', 79%, 74%)';
                        newCtx.fillStyle = 'hsla(' + bluerain + ', 79%, 74%, ' + strength + ')';
                    } else {
                        newCtx.shadowColor = 'hsla(' + purplerain + ', 79%, 74%)';
                        newCtx.fillStyle = 'hsla(' + purplerain + ', 79%, 74%, ' + strength + ')';
                    }
                    newCtx.fillText(text, 0, (canvHeight - (j * M.settings.COL_HEIGHT)));
                }
            }
            else
            {
                for (j = codeLen; j > 1; j -= 1) {
                    text = M.codes[i][j];
                    if (j < codeLen*(.14)) {
                        newCtx.shadowColor = 'hsla(' + purplerain + ', 79%, 74%)';
                        newCtx.fillStyle = 'hsla(' + purplerain + ', 79%, 74%, ' + strength + ')';
                    } else if (j < codeLen*(.28)) {
                        newCtx.shadowColor = 'hsla(' + bluerain + ', 79%, 74%)';
                        newCtx.fillStyle = 'hsla(' + bluerain + ', 79%, 74%, ' + strength + ')';
                    } else if (j < codeLen*(.42)) {
                        newCtx.shadowColor = 'hsla(' + greenrain + ', 79%, 74%)';
                        newCtx.fillStyle = 'hsla(' + greenrain + ', 79%, 74%, ' + strength + ')';
                    } else if (j < codeLen*(.54)) {
                        newCtx.shadowColor = 'hsla(' + yellowrain + ', 79%, 74%)';
                        newCtx.fillStyle = 'hsla(' + yellowrain + ', 79%, 74%, ' + strength + ')';
                    } else if (j < codeLen*(.68)) {
                        newCtx.shadowColor = 'hsla(' + orangerain + ', 79%, 74%)';
                        newCtx.fillStyle = 'hsla(' + orangerain + ', 79%, 74%, ' + strength + ')';
                    } else {
                        newCtx.shadowColor = 'hsla(' + pinkrain + ', 79%, 74%)';
                        newCtx.fillStyle = 'hsla(' + pinkrain + ', 79%, 74%, ' + strength + ')';
                    }
                    newCtx.fillText(text, 0, (canvHeight - (j * M.settings.COL_HEIGHT)));
                } 
            }
            M.codes[i][0].canvas = newCanv;
        },
        swapCharacters: function () {
            "use strict";
            var randomCodeIndex, randomCode, randomCodeLen, randomCharIndex, newRandomCharIndex, newRandomChar, i = 0;
            for (i = 0; i < 20; i += 1) {
                randomCodeIndex = M.randomFromInterval(0, (M.codes.length - 1));
                randomCode = M.codes[randomCodeIndex];
                randomCodeLen = randomCode.length;
                randomCharIndex = M.randomFromInterval(2, (randomCodeLen - 1));
                newRandomCharIndex = M.randomFromInterval(0, (M.letters.length - 1));
                newRandomChar = M.letters[newRandomCharIndex];
                randomCode[randomCharIndex] = newRandomChar;
            }
            M.swapCharacters();
        },
        createLines: function () {
            "use strict";
            M.linesC = document.createElement('canvas');
            M.linesC.width = M.WIDTH;
            M.linesC.height = M.HEIGHT;
            M.linesC.style.position = 'absolute';
            M.linesC.style.top = 0;
            M.linesC.style.left = 0;
            M.linesC.style.zIndex = 10;
            document.body.appendChild(M.linesC);
            var linesYBlack = 0, linesYWhite = 0;
            M.ctx2 = M.linesC.getContext('2d');
            M.ctx2.beginPath();
            M.ctx2.lineWidth = 1;
            M.ctx2.strokeStyle = 'rgba(0, 0, 0, 0.7)';
            while (linesYBlack < M.HEIGHT) {
                M.ctx2.moveTo(0, linesYBlack);
                M.ctx2.lineTo(M.WIDTH, linesYBlack);
                linesYBlack += 5;
            }
            M.ctx2.lineWidth = 0.15;
            M.ctx2.strokeStyle = 'rgba(255, 255, 255, 0.7)';
            while (linesYWhite < M.HEIGHT) {
                M.ctx2.moveTo(0, linesYWhite + 1);
                M.ctx2.lineTo(M.WIDTH, linesYWhite + 1);
                linesYWhite += 5;
            }
        M.ctx2.stroke();
        },
        assignColumn: function () {
            "use strict";
		    var randomColumn = M.randomFromInterval(0, (M.COLUMNS - 1));
		    return randomColumn;
	    },
        randomFromInterval: function (from, to) {
	        "use strict";
	        return Math.floor(Math.random() * (to - from + 1 ) + from);
        },
        snapshot: function () {
            "use strict";
            window.open(M.c.toDataURL());
        }
    };
window.onload = function () {
    "use strict";
    M.init();
};
window.OnLoad= function () {
    "use strict";
    M.init();
}; 
