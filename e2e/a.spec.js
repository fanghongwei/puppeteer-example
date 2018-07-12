let assert = require('chai').assert;

describe('Array', () => {
    describe('#indexOf()', () => {
        it('should return -1 when the value is not present', () => {
            assert.equal([1,2,3].indexOf(4), -1);
        });
    });
}); 

let puppeteer = require('puppeteer');
describe('Puppeter', () => {
    let browser;
    let page;
    before(async () => {
        browser = await puppeteer.launch({headless: false});
        page = await browser.newPage();
        await page.goto('https://www.google.com');
    });

    it('#Screenshot', async function() {
        this.timeout(50000);
        await page.evaluate((a) => {
            document.querySelector('#lst-ib').value = a;
            document.querySelector('input[type=submit]').click();
        }, 'dbs');
        await page.waitForNavigation();
        assert.equal(await page.title(), 'dbs - Google Search');
        
    });

    after(async () => {
        await browser.close()
    })
});