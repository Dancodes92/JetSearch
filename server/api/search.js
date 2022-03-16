const router = require("express").Router();
const puppeteer = require("puppeteer");
const {
  models: { User },
} = require("../db");
module.exports = router;

router.post("/", async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    const { airport, to, date, passengers, time, categories, date2, time2 } =
      req.body;
    if (!user) {
      return res.status(401).send({ error: "Not Authorized" });
    }
    console.log(
      user.flightListProEmail,
      user.flightListProPassword,
      airport,
      date,
      passengers,
      time,
      categories,
      date2,
      time2
    );
    const startSearch = await flightListPro(
      user.flightListProEmail,
      user.flightListProPassword,
      airport,
      to,
      date,
      passengers,
      time,
      categories,
      date2,
      time2
    );
    res.send(startSearch);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

const flightListPro = async (
  email,
  password,
  airport,
  to,
  date,
  passengers,
  time,
  categories,
  date2,
  time2
) => {
  // headless mode
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.goto("https://flightlistpro.com/index.php");
  // await page.setViewport({ width: 1297, height: 679 });

  await page.type("#username", email);
  await page.type("#password", password);
  await page.click("table > tbody > tr > td:nth-child(5) > input");
  // await page.waitForNavigation();

  await page.waitForTimeout(3000);

  await page.waitForSelector("#code");
  await page.type("#code", airport);

  await page.waitForSelector("tbody > tr > .bold > #radiusDiv > select");
  await page.click("tbody > tr > .bold > #radiusDiv > select");
  await page.select("tbody > tr > .bold > #radiusDiv > select", "1000"); // selects 1000 mile radius from airport

  await page.waitForSelector("#pax");
  await page.click("#pax");
  await page.type("#pax", passengers);

  // in the array of categories, click the checkboxes
  const clickCheckboxes = async () => {
    const aircraft = {
      "Ultra Long Range": "#catTable > tbody > tr > #td_20 > input",
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
    for (let i = 0; i < categories.length; i++) {
      await page.waitForSelector(aircraft[categories[i]]);
      await page.click(aircraft[categories[i]]);
    }
  };

  await clickCheckboxes();

  await page.waitForSelector(".tablecl > tbody > tr > td > .button");
  await page.click(".tablecl > tbody > tr > td > .button");
  ///////////////////////////////////
  await page.waitForNavigation();
  ///////////////////////////////////
  let allSelects = [];
  // theres a way to do this with recursion
  const flightPicker = await page.evaluate(() => {
    let arr = [];
    let opAndJet = [];
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
      let compAndType = `${curCompanyName.innerText} ${curJet.innerText}`;
      if (!opAndJet.includes(compAndType)) {
        button[i].click();
        opAndJet.push(`${curCompanyName.innerText} ${curJet.innerText}`);
        arr.push({
          company: curCompanyName.innerText,
          jet: curJet.innerText,
        });
      }
    }
    return arr;
  });

  allSelects.push(flightPicker);

  // got the the next page of flights and re run the function
  // if the selector is not there, then we are on the last page
  while (
    await page.$(
      "#frmSelect > table > tbody > tr:nth-child(55) > td > span:nth-child(2) > a"
    )
  ) {
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
      let opAndJet = [];
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
        let compAndType = `${curCompanyName.innerText} ${curJet.innerText}`;
        if (!opAndJet.includes(compAndType)) {
          opAndJet.push(`${curCompanyName.innerText} ${curJet.innerText}`);
          button[i].click();
          arr.push({
            company: curCompanyName.innerText,
            jet: curJet.innerText,
          });
        }
      }
      return arr;
    });

    allSelects.push(flightPicker2);
    /////
  }

  while (
    await page.$(
      "#frmSelect > table > tbody > tr:nth-child(55) > td > span:nth-child(5) > a"
    )
  ) {
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
      let opAndJet = [];
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
        let compAndType = `${curCompanyName.innerText} ${curJet.innerText}`;

        if (!opAndJet.includes(compAndType)) {
          opAndJet.push(`${curCompanyName.innerText} ${curJet.innerText}`);
          button[i].click();
          arr.push({
            company: curCompanyName.innerText,
            jet: curJet.innerText,
          });
        }
      }
      return arr;
    });

    allSelects.push(flightPicker3);
    break;
  }

  page.waitForTimeout(500);

  await page.click("#sendFeedback");

  await page.waitForTimeout(2000);

  if (await page.$(".modal-open")) {
    console.log("modal is there");
    await page.waitForSelector(
      "#myModal > div > div > div.modal-header > button"
    );
    await page.click("#myModal > div > div > div.modal-header > button");
  }
  // click anywhere to close on the page
  await page.click("body");

  await page.waitForTimeout(500);

  if (date2) {
    const textBox = await page.$("#comments");
    await textBox.type(`Hi Team,
Please quote the following round trip-

${date} (${time})
${airport} to ${to}
${date2} (${time2})

${passengers} Pax

  Thanks.`);
  } else {
    const textBox = await page.$("#comments");
    await textBox.type(`Hi Team,
Please quote the following-

${date} (${time})
${airport} to ${to}

${passengers} Pax

  Thanks.`);
  }

  await page.waitForSelector(
    "#frmSendFeedback > table:nth-child(12) > tbody > tr:nth-child(18) > td > input:nth-child(1)"
  );
  await page.click(
    "#frmSendFeedback > table:nth-child(12) > tbody > tr:nth-child(18) > td > input:nth-child(1)"
  );

  await browser.close();
  return allSelects;
};
