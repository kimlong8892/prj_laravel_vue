const indexController = require('express');

function setFullUrl(url, page_number_name, page_number) {
    if (url.indexOf('?') === -1) {
        return url + '?' + page_number_name + '=' + page_number;
    } else {
        return url + '&' + page_number_name + '=' + page_number;
    }
}

indexController.getProductsShoppe = async function (req, res) {
    let url = req.query.url ?? '';
    let page_number = req.query.page ?? 1;
    page_number = parseInt(page_number);

    if (url == '') {
        res.send({
            'success': false,
            'mgs': 'url not found'
        });
    }

    let full_url = setFullUrl(url, 'page', page_number);
    full_url += '&sortBy=price&order=asc';

    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
    });
    const page = await browser.newPage();

    await page.goto(full_url, {waitUntil: 'networkidle2'});
    await page.setViewport({width: 1500, height: 6000});

    try {
        await page.waitForSelector('.shopee-search-item-result');
        await page.waitForSelector('a[data-sqe="link"] img');
        await page.waitForSelector('a[data-sqe="link"] .Cve6sh');
        await page.waitForSelector('footer');
        await autoScroll(page);

        const list_data_search = await page.evaluate(() => {
            let a_tags = document.querySelectorAll('a[data-sqe="link"]');
            let a_tags_array = [];
            a_tags.forEach(item => {
                let price = null;

                if (item.querySelector('.ZEgDH9')) {
                    price = item.querySelector('.ZEgDH9').innerHTML ?? 0;
                    price = price.replaceAll('.', '');
                    price = parseInt(price);
                }

                a_tags_array.push({
                    url: 'https://shopee.vn' + item.getAttribute('href').trim(),
                    name: item.querySelector(`.Cve6sh`).innerHTML,
                    src_img: item.querySelector('img').getAttribute('src'),
                    price: price,
                });
            });
            return a_tags_array;
        });

        await browser.close();

        res.send({
            list_data_search: list_data_search,
            'next_page': page_number + 1,
            'previous_page': page_number > 1 ? page_number - 1 : null
        });
    } catch (e) {
        res.send({
            list_data_search: null,
            'next_page': null,
            'previous_page': null
        });
    }
}

indexController.getProductsTiki = async function (req, res) {
    let url = req.query.url ?? '';
    let page_number = req.query.page ?? 1;
    page_number = parseInt(page_number);

    if (url == '') {
        res.send({
            'success': false,
            'mgs': 'url not found'
        });
    }

    let full_url = setFullUrl(url, 'page', page_number);
    full_url += '&sort=price%2Casc';

    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
    });
    let page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.goto(full_url, {waitUntil: 'domcontentloaded'});

    try {
        await page.setViewport({width: 1500, height: 1500});
        await page.waitForSelector('.product-item img.WebpImg__StyledImg-sc-h3ozu8-0.fWjUGo');
        await page.waitForSelector('.product-item div.name h3');
        await page.waitForSelector('.price-discount__price');
        await page.waitForSelector('.WebpImg__StyledImg-sc-h3ozu8-0.fWjUGo');
        await page.waitForSelector('.image-wrapper');
        await autoScroll(page);

        const list_data_search = await page.evaluate(() => {
            let a_tags = document.querySelectorAll('.product-item');
            let a_tags_array = [];
            a_tags.forEach(item => {
                let price = item.querySelector('.price-discount__price').innerHTML.replaceAll('.', '').replaceAll('₫', '').trim();

                if (item && item.getAttribute('href')) {
                    a_tags_array.push({
                        url: 'https://tiki.vn' + item.getAttribute('href').trim(),
                        name: item.querySelector('div.name h3').innerHTML.trim(),
                        src_img: item.querySelector('img.WebpImg__StyledImg-sc-h3ozu8-0.fWjUGo').getAttribute('src'),
                        price: parseInt(price)
                    });
                }
            });
            return a_tags_array;
        });

        await browser.close();

        res.send({
            'list_data_search': list_data_search,
            'next_page': page_number + 1,
            'previous_page': page_number > 1 ? page_number - 1 : null
        });
    } catch (e) {
        console.log(e);
        res.send({
            'list_data_search': null,
            'next_page': null,
            'previous_page': null
        });
    }
}

indexController.getProductsLazada = async function (req, res) {
    let url = req.query.url ?? '';
    let page_number = req.query.page ?? 1;
    page_number = parseInt(page_number);

    if (url == '') {
        res.send({
            'success': false,
            'mgs': 'url not found'
        });
    }

    let full_url = setFullUrl(url, 'page', page_number);
    full_url += '&sort=priceasc';

    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(full_url, {waitUntil: 'domcontentloaded'});
    await page.setViewport({width: 1500, height: 6000});

    try {
        await page.waitForSelector('.Bm3ON[data-qa-locator="product-item"]');
        await page.waitForSelector('.Bm3ON[data-qa-locator="product-item"] .aBrP0 span')
        await page.waitForSelector('.Ms6aG.MefHh img[type="product"]');
        await page.waitForSelector('.Ms6aG.MefHh ._95X4G a');
        await page.waitForSelector('.Ms6aG.MefHh .RfADt a i');
        await autoScroll(page);

        const list_data_search = await page.evaluate(() => {
            let a_tags = document.querySelectorAll('.Bm3ON[data-qa-locator="product-item"]');
            let a_tags_array = [];

            a_tags.forEach(function (item) {
                let price = item.querySelector('.aBrP0 span').innerHTML.replaceAll('.', '').replaceAll('₫', '').replaceAll('.000', '000').trim();
                let product_url = 'https://lazada.vn' + item.querySelector('a').getAttribute('href').trim();

                a_tags_array.push({
                    url: product_url,
                    name: item.querySelector('img[type="product"]').getAttribute('alt').trim(),
                    src_img: item.querySelector('img[type="product"]').getAttribute('src').trim(),
                    price: parseInt(price)
                });
            });

            return a_tags_array;
        });

        await browser.close();

        res.send({
            list_data_search: list_data_search ?? null,
            'next_page': page_number + 1,
            'previous_page': page_number > 1 ? page_number - 1 : null
        });
    } catch (e) {
        res.send({
            list_data_search: null,
            'next_page': null,
            'previous_page': null
        });
    }
}

module.exports = indexController;