const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    //slowMo: 300,
    defaultViewport: null,
    args: ["--start-maximized"],
    devtools: false,
  });
  const page = await browser.newPage();
  await page.goto("https://rbc.ru", { timeout: 200000 });

  const advSel = "body > div.live-tv-popup.js-live-tv-popup.active > div.live-tv-popup__head > div";
  await page.waitForSelector(advSel);
  await page.click(advSel);

  const notNow = "body > div.push-allow.js-push-allow > div.push-allow__block.js-push-allow-block.js-push-allow-block-subscribe.active > div.push-allow__controls > div:nth-child(2) > a";
  await page.waitForSelector(notNow);
  await page.click(notNow);

  //const bannersOff = "body > header > div > div.topline__inner.l-row.js-topline > div.topline__right > div.topline__disable-adv.g-desktop > a";
  //await page.waitForSelector(bannersOff);
  //await page.click(bannersOff);

    const news = await page.evaluate( () => {
    const newsElems = document.querySelectorAll("span.main__feed__title");
    const result = [];
        for (i = 0; i < newsElems.length; i++) {
            result.push(newsElems[i].innerText)
        }
        return result;
    })

    console.log(news);


  //await page.waitForTimeout(5000);

  //const emailSel = 'input[type="email"]';
  //await page.type(emailSel, "yourmail@gmail.com", { delay: 100 });

  //await page.screenshot({ path: "example.png" });

  await browser.close();
})();
