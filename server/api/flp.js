const router = require("express").Router();
const puppeteer = require("puppeteer");
module.exports = router;

const checkCredetials = async (email, password) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto("https://flightlistpro.com/index.php");
    await page.type("#username", email);
    await page.type("#password", password);
    await page.click("table > tbody > tr > td:nth-child(5) > input");
    await page.waitForTimeout(1000);
    const x = await page.$("#code");

    if (x) {
      console.log("logged in");
      await browser.close();
      return "logged in";
    } else {
      console.log("not logged in");
      // await browser.close();
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

router.post("/", async (req, res, next) => {
  try {
    res.send(await checkCredetials(req.body.email, req.body.password));
  } catch (err) {
    next(err);
  }
});
