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
    const {
      airport,
      to,
      date,
      passengers,
      time,
      categories,
      date2,
      time2,
      radius,
    } = req.body;
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
      time2,
      radius
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
      time2,
      radius
    );
    res.send(startSearch);
  } catch (err) {
    console.log(err);
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
  time2,
  radius
) => {
  // headless mode
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.goto("https://flightlistpro.com/index.php");
  // await page.setViewport({ width: 1297, height: 679 });
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
  );

  await page.type("#username", email);
  await page.type("#password", password);
  await page.click("table > tbody > tr > td:nth-child(5) > input");
  // await page.waitForNavigation();

  await page.waitForTimeout(3000);

  await page.waitForSelector("#code");
  await page.type("#code", airport);

  await page.waitForSelector("tbody > tr > .bold > #radiusDiv > select");
  await page.click("tbody > tr > .bold > #radiusDiv > select");
  await page.select("tbody > tr > .bold > #radiusDiv > select", `${radius}`);

  await page.waitForSelector("#pax");
  await page.click("#pax");
  await page.type("#pax", `${passengers}`);

  // in the array of categories, click the checkboxes
  const clickCheckboxes = async () => {
    const aircraft = {
      "Ultra Long Range": "#catTable > tbody > tr > #td_20 > input",
      "Heavy Jet": "#catTable > tbody > tr > #td_1 > input",
      "Super-Mid Jet": "#catTable > tbody > tr > #td_11 > input",
      "Mid Jet": "#catTable > tbody > tr > #td_9 > input",
      "Light Jet": "#catTable > tbody > tr > #td_8 > input",
      "Very Light Jet": "#catTable > tbody > tr > #td_14 > input",
      "Turboprop": "#catTable > tbody > tr > #td_12 > input",
      "Piston": "#catTable > tbody > tr > #td_10 > input",
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
  // find the next page button which will be the second to last a tag
  var allSelects = [];
  // recursively re-write the flightPick function if there is a next page button then keep clicking
  const flightPick = async () => {
    // an array of each plane clicked
    const flightPicker = await page.evaluate(() => {
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
      const tailNumber = document.querySelectorAll(
        " #frmSelect > table > tbody > tr > td:nth-child(5)"
      );

      console.log("tailNumber char at 6", tailNumber[0].innerText.charAt(1));

      for (let i = 0; i < companyName.length - 1; i++) {
        let curCompanyName = companyName[i];
        let curJet = jetType[i];
        let compAndType = `${curCompanyName.innerText} ${curJet.innerText}`;

        if (
          !opAndJet.includes(compAndType) &&
          tailNumber[i].innerText.charAt(1) === "N"
        ) {
          button[i].click();
          opAndJet.push(`${curCompanyName.innerText} ${curJet.innerText}`);
        }
      }
      // we need to return the opAndJet array so that it can be used in the next page function and add it to the allSelects array
      return opAndJet;
    });

    allSelects.push(flightPicker);
    // if there is a next page button then click it
    const nextPage = await page.evaluate(() => {
      const nextPage = document.querySelectorAll(
        "#frmSelect > table > tbody > tr:nth-child(3) > td > a"
      );
      const theNextPage = nextPage[nextPage.length - 2];
      // find the inner text of the next page button
      const nextPageText = theNextPage?.innerText;
      if (nextPageText === "Next") {
        theNextPage.click();
        return true;
      } else {
        return false;
      }
    });

    if (nextPage) {
      await page.waitForNavigation();
      await flightPick();
      await page.waitForTimeout(1000);
    } else {
      // if there is no next page button then return the opAndJet array
      return allSelects;
    }
  };

  // call the flightPick function
  const opAndJet = await flightPick();
  // add the opAndJet array to the allSelects array
  allSelects.push(opAndJet);

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
    const subjectBox = await page.$("#subject");
    // click three times to clear the subject box
    await subjectBox.click({ clickCount: 3 });
    await subjectBox.type(
      `NEED RT: ${date} - ${date2} ${airport} - ${to} - ${airport} ${passengers} PAX`
    );
    const textBox = await page.$("#comments");
    await textBox.type(`Hi Team,
Please quote the following round trip-

${date} (${time})
${airport} to ${to}

${date2} (${time2})
${to} to ${airport}

${passengers} Pax

  Thanks.`);
  } else {
    const subjectBox = await page.$("#subject");
    await subjectBox.click({ clickCount: 3 });
    await subjectBox.type(
      `NEED OW: ${date} ${airport} - ${to} ${passengers} PAX`
    );
    const textBox = await page.$("#comments");
    await textBox.type(`Hi Team,
Please quote the following one way-

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
  console.log("allSelects", allSelects);
  // flatten the allSelects array
  const flatSelects = allSelects.flat();

  return flatSelects;
};
