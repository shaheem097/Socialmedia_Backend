"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const randString = () => {
    const len = 3;
    let randStr = '';
    for (let i = 0; i < len; i++) {
        const ch = Math.floor((Math.random() * 10) + 1);
        randStr += ch;
    }
    return randStr;
};
exports.default = randString;
