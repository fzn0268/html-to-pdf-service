'use strict';

const puppeteer = require(process.env.ENV === 'debug' ? 'puppeteer-core' : 'puppeteer');
const uuidv4 = require('uuid').v4;

const fs = require('fs');
const os = require('os');
const path = require('path');

/**
 * Convert html to pdf
 *
 * body ConversionParam Conversion parameter
 * returns byte[]
 **/
exports.v1ConversionFromHtmlToPdfPOST = function(body) {
  return new Promise(async function(resolve, reject) {
    const htmlString = body.htmlString;
    const tmpFilename = uuidv4() + '.html';
    const tmpFileFullPath = path.join(os.tmpdir(), tmpFilename);
    fs.writeFile(tmpFileFullPath, htmlString, err => {
      if (err) {
        console.error(err.stack);
        reject(err);
      }
      console.info(tmpFileFullPath + ' saved');
    });

    try {
      const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      const page = await browser.newPage();
      await page.goto('file://' + tmpFileFullPath, {waitUntil: 'networkidle2'});
      const options = body.options || {format: 'A4'};
      await page.pdf(options).then(value => {
        resolve(value);
      }).finally(() => fs.unlink(tmpFileFullPath, err => {
        if (err) throw err;
        console.info(tmpFileFullPath + ' deleted');
      }));

      await browser.close();
    } catch (e) {
      console.error(e.stack);
      reject(e);
    }
  });
}

