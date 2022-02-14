const router = require('express').Router()
const puppeteer = require('puppeteer')
module.exports = router

const checkCredetials = async (email, password) => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto("https://marketplace.avinode.com/sso/mvc/login");
  await page.type("#username", email); //use environment variable for this
  await page.type("#password", password); //use environment variable for this
  await page.click(
    "body > div.avi-page > div > div > div > div > form > div.avi-button-group.avi-is-section-group > div > button"
  );
  // if this selector shows "body > div.avi-page > div > div > div > div > div" throw error
  const x = await page.evaluate(() => {
    console.log(document.querySelector("body > div.avi-page > div > div > div > div > div").innerText);
    if(document.querySelector("body > div.avi-page > div > div > div > div > div").innerText === "Invalid credentials") {
      return false
    } else {
      return true;
    }
  });

  // await browser.close();
 return x;
  } catch (err) {
    return false;
  }
}



router.post('/', async (req, res, next) => {
  try {
    const { email, password } = req.body
    if(await checkCredetials(email, password)) {
      res.send(true).status(200)
    } else {
      res.send(false).status(401)
    }
  } catch (err) {
    res.status(500)
  }
})


