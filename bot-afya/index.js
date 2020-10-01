const puppeteer = require("puppeteer");

const user = "SEU CPF";
const password = "SUA SENHA";
const url_Course = "URL DAS PERGUNTAS EX >>>> https://afya.instructure.com/courses/556/quizzes/10022";

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://afya.instructure.com/');
    await page.waitFor(1000);
    await page.type("input[name='pseudonym_session[unique_id]']", user);
    await page.type("input[name='pseudonym_session[password]']", password);
    let btnLogin = await page.$x("//button[contains(text(), 'Login')]");
    await btnLogin[0].click();
    await page.waitFor(1000);
    await page.goto(url_Course);
    let btnPrimary = await page.$x("//a[contains(text(), 'Fazer o teste novamente')]");
    await btnPrimary[0].click();
    await page.waitFor(2000);
    let questions = await page.$$("div[aria-label='Pergunta']");
    console.log("Quantidade de questões: " + questions.length);

    for (i = 0; i < questions.length; i++) {
        let question = questions[i];
        let answers = await question.$$("input[type='radio']");
        console.log("Pergunta " + (i + 1) + ": " + answers.length + " Alternativas");
        for (cont = 0; cont < answers.length; cont++) {
            let answer = answers[0];
            await answer.click();
        }
    }
    let btnEnviar = await page.$x("//button[contains(text(), 'Enviar teste')]");
    await btnEnviar[0].click();
    await page.waitFor("span#user_answer_NaN_arrow");
    await page.waitFor(1000);
    const lista = [];
    for (i = 0; i < questions.length; i++) {
        let question = questions[i];

        let incorrect = await question.$("span#user_answer_NaN_arrow")
        if (incorrect.length > 0) {
            await lista.push({ question: i + 1, answer: "Incorreta"});
            console.log((i+1) + "Incorreta")
        }
        else {
            await lista.push({ question: i + 1, answer: "Correta"});
        }
    }
    console.log(lista);
    debugger;
})();