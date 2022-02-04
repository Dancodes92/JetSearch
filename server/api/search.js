const router = require("express").Router();
const puppeteer = require("puppeteer");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const startSearch = await flightListPro();
    res.send(startSearch).status(200);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

const flightListPro = async info => {
  // headless mode
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  // const browser = await puppeteer.launch({
  //   headless: true,
  // });
  const page = await browser.newPage();
  await page.goto("https://flightlistpro.com/index.php");
  await page.setViewport({ width: 1297, height: 679 });

  await page.screenshot({
    path: "first.png",
  });

  await page.type("#username", "pschneider@luxury.aero"); //use environment variable for this
  await page.type("#password", "Spacecowboy989!"); //use environment variable for this
  await page.click("table > tbody > tr > td:nth-child(5) > input");
  // await page.waitForNavigation();

  await page.waitForTimeout(500);

  await page.screenshot({
    path: "second.png",
  });
  await page.waitForSelector("#code");
  await page.type("#code", "KPWK");

  await page.waitForSelector("tbody > tr > .bold > #radiusDiv > select");
  await page.click("tbody > tr > .bold > #radiusDiv > select");

  await page.select("tbody > tr > .bold > #radiusDiv > select", "1000");

  await page.waitForSelector("#pax");
  await page.click("#pax");
  await page.type("#pax", "3");

  await page.waitForSelector("#catTable > tbody > tr > #td_11 > input");
  await page.click("#catTable > tbody > tr > #td_11 > input");

  await page.waitForSelector("#catTable > tbody > tr > #td_9 > input");
  await page.click("#catTable > tbody > tr > #td_9 > input");

  await page.waitForSelector("#catTable > tbody > tr > #td_8 > input");
  await page.click("#catTable > tbody > tr > #td_8 > input");

  await page.waitForSelector(".tablecl > tbody > tr > td > .button");
  await page.click(".tablecl > tbody > tr > td > .button");

  await page.waitForNavigation();

  let allSelects = [];

  // theres a way to do this with recursion
  const flightPicker = await page.evaluate(() => {
    let arr = [];
    const companyName = document.querySelectorAll(
      "#frmSelect > table > tbody > tr > td:nth-child(2) > a"
    );
    const jetType = document.querySelectorAll(
      "#frmSelect > table > tbody > tr > td:nth-child(3) > a"
    );
    const button = document.querySelectorAll(
      "#frmSelect > table > tbody > tr > td.phone-column > input[type=checkbox]"
    );

    for (let i = 0; i < companyName.length - 1; i++) {
      let curCompanyName = companyName[i];
      let curJet = jetType[i];
      let nextCompanyName = companyName[i + 1];
      let nextJet = jetType[i + 1];
      if (
        `${curCompanyName.innerText} ${curJet.innerText}` !==
        `${nextCompanyName.innerText} ${nextJet.innerText}`
      ) {
        button[i].click();
        arr.push(`${curCompanyName.innerText} ${curJet.innerText}`);
      }
    }
    return arr;
  });

  allSelects.push(flightPicker);

  // got the the next page of flights and re run the function
  await page.waitForSelector(
    "#frmSelect > table > tbody > tr:nth-child(55) > td > span:nth-child(2) > a"
  );
  await page.click(
    "#frmSelect > table > tbody > tr:nth-child(55) > td > span:nth-child(2) > a"
  );
  ///////
  await page.waitForTimeout(500);

  const flightPicker2 = await page.evaluate(() => {
    let arr = [];
    const companyName = document.querySelectorAll(
      "#frmSelect > table > tbody > tr > td:nth-child(2) > a"
    );
    const jetType = document.querySelectorAll(
      "#frmSelect > table > tbody > tr > td:nth-child(3) > a"
    );
    const button = document.querySelectorAll(
      "#frmSelect > table > tbody > tr > td.phone-column > input[type=checkbox]"
    );

    for (let i = 0; i < companyName.length - 1; i++) {
      let curCompanyName = companyName[i];
      let curJet = jetType[i];
      let nextCompanyName = companyName[i + 1];
      let nextJet = jetType[i + 1];
      if (
        `${curCompanyName.innerText} ${curJet.innerText}` !==
        `${nextCompanyName.innerText} ${nextJet.innerText}`
      ) {
        button[i].click();
        arr.push(`${curCompanyName.innerText} ${curJet.innerText}`);
      }
    }
    return arr;
  });

  allSelects.push(flightPicker2);
  /////

  // go to the next page of flights
  await page.waitForSelector(
    "#frmSelect > table > tbody > tr:nth-child(55) > td > span:nth-child(5) > a"
  );
  await page.click(
    "#frmSelect > table > tbody > tr:nth-child(55) > td > span:nth-child(5) > a"
  );

  //////
  await page.waitForTimeout(500);

  const flightPicker3 = await page.evaluate(() => {
    let arr = [];
    const companyName = document.querySelectorAll(
      "#frmSelect > table > tbody > tr > td:nth-child(2) > a"
    );
    const jetType = document.querySelectorAll(
      "#frmSelect > table > tbody > tr > td:nth-child(3) > a"
    );
    const button = document.querySelectorAll(
      "#frmSelect > table > tbody > tr > td.phone-column > input[type=checkbox]"
    );

    for (let i = 0; i < companyName.length - 1; i++) {
      let curCompanyName = companyName[i];
      let curJet = jetType[i];
      let nextCompanyName = companyName[i + 1];
      let nextJet = jetType[i + 1];
      if (
        `${curCompanyName.innerText} ${curJet.innerText}` !==
        `${nextCompanyName.innerText} ${nextJet.innerText}`
      ) {
        button[i].click();
        arr.push(`${curCompanyName.innerText} ${curJet.innerText}`);
      }
    }
    return arr;
  });

  allSelects.push(flightPicker3);

  page.waitForTimeout(500);

  await page.click("#sendFeedback");

  await page.waitForTimeout(1000);

  // await page.$eval("#myModal > div > div > div.modal-header > button", el =>
  //   el.click()
  // );

  await page.waitForSelector(
    "#myModal > div > div > div.modal-header > button"
  );
  await page.screenshot({
    path: "third.png",
  });
  await page.click("#myModal > div > div > div.modal-header > button");

  await page.screenshot({
    path: "shot.png",
  });

  await browser.close();
  return allSelects;
};

router.post("/yo", (req, res, next) => {
  try {
    console.log(req.body);
  } catch (err) {
    console.log(err);
    next(err);
  }
});
