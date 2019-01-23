const http = require('http');

const URL = 'http://kodaktor.ru/api2/buffer2';
const resultArray = [];
let currentN = 333;
const maxN = 335;
let hiddenWord = '';

const getN = n =>
    http.get(`${URL}/${currentN}`, r => {
        let buf = '';
        r.on('data', d => {
            if(String(d).match(/[a-z]{4}/)) {
                hiddenWord = String(d);
                console.log(`Bytes before hidden word: ${buf.length}`);
            }
            buf+=d;
        });
        r.on('end', () => {
            resultArray.push({ n: currentN, data: buf.length });
            console.log(`N: ${currentN}, size: ${buf.length}`);
            if(currentN < maxN) {
                currentN += 1;
                getN(currentN);
            }
            else {
                console.log(resultArray);
                console.log(`Hidden word: ${hiddenWord}`);
            }
        });
    });

getN(currentN);