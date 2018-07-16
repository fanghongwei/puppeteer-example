let assert = require('chai').assert;

describe('Array', () => {
    describe('#indexOf()', () => {
        it('should return -1 when the value is not present', () => {
            assert.equal([1,2,3].indexOf(4), -1);
        });
    });
}); 

let puppeteer = require('puppeteer');
describe('Puppeter', function() {
    this.timeout(50000);
    let browser;
    let page;
    before(async () => {
        browser = await puppeteer.launch({headless: false});
        page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 1024 });
        await page.goto('https://github.com/');
        
        await page.evaluate(() => {
            const login = document.querySelector('a[href="/login"]');
            login.click();
        });
        await page.waitForNavigation();

        await page.evaluate((username, password) => {
            document.querySelector('#login_field').value = username;
            document.querySelector('#password').value = password;
            document.querySelector('input[name="commit"]').click();
            
        }, 'fhw8234@gmail.com', 'some password');

        await page.waitForNavigation();
    });

    it('#Screenshot', async function() {
        assert.equal(await page.title(), 'GitHub');
        await page.evaluate(() => {
            let userId = document.querySelector('li[class*="header-nav-current-user"] > strong').innerHTML
            document.querySelector(`a[href="/${userId}"]`).click();
        });
        await page.waitForNavigation();
    });

    after(async () => {
        await browser.close()
    })
});