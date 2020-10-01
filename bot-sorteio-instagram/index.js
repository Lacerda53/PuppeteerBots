const puppeteer = require("puppeteer");
require('dotenv').config();
const users = require("./list");

const URL_Sorteio = "https://www.instagram.com/p/CA6cB80pD5z/";

(async () => {
    console.log("INICIANDO...");
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    console.log("ABRINDO INSTAGRAM");
    await page.goto('https://www.instagram.com/');
    await page.waitFor(1000);
    console.log("LOGANDO...");
    await page.type('input[name="username"]', process.env.USER);
    await page.type('input[name="password"]', process.env.PASSWORD);
    const buttonLogin = await page.$x("//div[contains(text(), 'Entrar')]");
    await buttonLogin[0].click();
    await page.waitFor(1800);
    await page.goto(URL_Sorteio);
    await page.waitFor(1800);
    const btnPublicar = await page.$x("//button[contains(text(), 'Publicar')]");
    for (i = 0; i < users.length; i++) {
        await page.type('textarea[placeholder="Adicione um comentário..."]', "@" + users[i] + " ");
        await btnPublicar[0].click();
        console.log((i + 1) + "/" + users.length + " Enviados");
        await page.waitFor(60000);
    }

    debugger;
})();

