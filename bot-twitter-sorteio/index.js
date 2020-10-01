const puppeteer = require("puppeteer");
require('dotenv').config();
const users = require("./list");

const URL_Sorteio = "https://twitter.com/CanalDoSaullo/status/1269386210767765506";

(async () => {
    console.log("INICIANDO...");
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    console.log("ABRINDO TWITTER");
    await page.goto('https://twitter.com/login');
    await page.waitFor(1000);
    console.log("DIGITANDO...");
    await page.type('input[name="session[username_or_email]"]', process.env.USER);
    await page.type('input[name="session[password]"]', process.env.PASSWORD);
    const buttonLogin = await page.$x("//span[text()= 'Entrar']");
    await buttonLogin[0].click();
    console.log("LOGANDO...");
    await page.waitFor(1800);
    await page.goto(URL_Sorteio);
    await page.waitFor(1800);
    const btnComment = await page.$("div[aria-label='Responder']");
    for (i = 0; i < users.length; i++) {
        await btnComment.click();
        await page.waitFor(1000);
        await page.keyboard.type("@" + users[i] + " ");
        await page.waitFor(1000);
        const btnPublicar = await page.$x("//span[text()= 'Responder']");
        await btnPublicar[0].click();
        console.log((i + 1) + "/" + users.length + " Enviados");
        await page.waitFor(78000);
    }
    

    debugger;
})();
