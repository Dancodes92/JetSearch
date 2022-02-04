const router = require("express").Router();
const puppeteer = require("puppeteer");
module.exports = router;

router.post("/", async (req, res, next) => {
  try {
    const { username, password, airport, date, passengers, categories } =
      req.body;
    console.log(req.body);
    const startSearch = await flightListPro(
      username,
      password,
      airport,
      date,
      passengers,
      categories
    );
    startSearch.then(result => {
      res.json(result);
    });
  } catch (err) {
    next(err);
  }
});

const flightListPro = async (
  username,
  password,
  airport,
  date,
  passengers,
  categories
) => {
  // headless mode
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  // const browser = await puppeteer.launch({
  //   headless: true,
  // });
  const page = await browser.newPage();
  await page.goto("https://flightlistpro.com/index.php");
  await page.setViewport({ width: 1297, height: 679 });

  await page.type("#username", "pschneider@luxury.aero"); //use environment variable for this
  await page.type("#password", "Spacecowboy989!"); //use environment variable for this
  await page.click("table > tbody > tr > td:nth-child(5) > input");
  // await page.waitForNavigation();

  await page.waitForTimeout(500);

  await page.waitForSelector("#code");
  await page.type("#code", airport);

  await page.waitForSelector("tbody > tr > .bold > #radiusDiv > select");
  await page.click("tbody > tr > .bold > #radiusDiv > select");
  await page.select("tbody > tr > .bold > #radiusDiv > select", "1000"); // selects 1000 mile radius from airport

  await page.waitForSelector("#pax");
  await page.click("#pax");
  await page.type("#pax", passengers);

  const checkCorrectBoxes = await page.evaluate(categories => {
    const aircraft = {
      "Ultra Long Range": "#catTable > tbody > tr > #td_11 > input",
      "Heavy Jet": "#catTable > tbody > tr > #td_1 > input",
      "Super-Mid Jet": "#catTable > tbody > tr > #td_11 > input",
      "Mid Jet": "#catTable > tbody > tr > #td_9 > input",
      "Light Jet": "#catTable > tbody > tr > #td_8 > input",
      "Very Light Jet": "#catTable > tbody > tr > #td_14 > input",
      Turboprop: "#catTable > tbody > tr > #td_12 > input",
      Piston: "#catTable > tbody > tr > #td_10 > input",
      "VIP Airliner": "#catTable > tbody > tr > #td_15 > input",
      "Jet Airliner": "#catTable > tbody > tr > #td_7 > input",
      "Regional Jet Airliner": "#catTable > tbody > tr > #td_19 > input",
      "Turboprop Airliner": "#catTable > tbody > tr > #td_13 > input",
      "Piston Airliner": "#catTable > tbody > tr > #td_17 > input",
      "Helicopter - Twin": "#catTable > tbody > tr > #td_6 > input",
      "Helicopter - Single": "#catTable > tbody > tr > #td_5 > input",
    };
    categories.forEach(category => {
      document.querySelector(aircraft[category]).click();
    });
  }, categories);

  // await page.waitForSelector("#catTable > tbody > tr > #td_11 > input");
  // await page.click("#catTable > tbody > tr > #td_11 > input");

  // await page.waitForSelector("#catTable > tbody > tr > #td_9 > input");
  // await page.click("#catTable > tbody > tr > #td_9 > input");

  // await page.waitForSelector("#catTable > tbody > tr > #td_8 > input");
  // await page.click("#catTable > tbody > tr > #td_8 > input");

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

  await page.click("#myModal > div > div > div.modal-header > button");

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
