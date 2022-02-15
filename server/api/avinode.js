const router = require('express').Router()
const puppeteer = require('puppeteer')
module.exports = router

const checkCredetials = async (email, password) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto("https://marketplace.avinode.com/sso/mvc/login");
  await page.type("#username", email); //use environment variable for this
  await page.type("#password", password); //use environment variable for this
  await page.click(
    "body > div.avi-page > div > div > div > div > form > div.avi-button-group.avi-is-section-group > div > button"
  );

  await page.waitForTimeout(2000);

const x = await page.$("#bulletin-tab-4wMRuakn537mSeNkPaIJMA > div");

  if (x) {
    console.log("logged in");
    await browser.close();
    return "logged in";

  } else {

    console.log("not logged in");
    await browser.close();
    return false;


  }
  } catch (err) {
    console.log(err)
  }
}


router.post('/', async (req, res, next) => {
  try {
    res.send(await checkCredetials(req.body.email, req.body.password))
  } catch (err) {
    next(err);
  }
});


