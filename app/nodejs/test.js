const indexController = require("express");
const puppeteer = require("puppeteer");

async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight - window.innerHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

indexController.getListImageFromInstagram = async function (req, res) {
    let url = req.query.url ?? '';

    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
    });
    let page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);


    // delete h4m39qi9 class

    try {
        await page.goto('https://www.instagram.com/accounts/login/', {
            waitUntil: 'networkidle0',
        });
        await page.waitForSelector('input[name="username"]');
        await page.type('input[name="username"]', '0939657348');
        await page.type('input[name="password"]', 'kimlongdev9201');
        await Promise.all([
            page.click('[type="submit"]'),
            page.waitForNavigation({
                waitUntil: 'networkidle0',
            }),
        ]);

        await page.goto(url, {"waitUntil": "networkidle0", timeout: 0});
        await page.setViewport({width: 1000, height: 2500});
        await page.waitForSelector('._aabd._aa8k._aanf');
        await page.waitForSelector('._aabd._aa8k._aanf ._aagv img');

        await autoScroll(page);
        await autoScroll(page);
        await autoScroll(page);
        await autoScroll(page);

        await page.screenshot({path: 'fullpage.png', fullPage: true});

        await browser.close();
        res.send({
            'data': 1
        });
    } catch (e) {
        console.log(e);
        res.send({
            'data': e, ne
        });
    }
}