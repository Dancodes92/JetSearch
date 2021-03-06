const router = require("express").Router();
const puppeteer = require("puppeteer");
const {
  models: { User },
} = require("../db");
module.exports = router;

const avinodeSearcher = async (
  avinodeEmail,
  avinodePassword,
  from,
  to,
  date,
  time,
  date2,
  time2,
  pax,
  catagory
) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  // await page.setViewport({ width: 1306, height: 844 });

  await page.goto("https://marketplace.avinode.com/sso/mvc/login");
  await page.type("#username", avinodeEmail); //use environment variable for this
  await page.type("#password", avinodePassword); //use environment variable for this
  await page.click(
    "body > div.avi-page > div > div > div > div > form > div.avi-button-group.avi-is-section-group > div > button"
  );
  await page.waitForTimeout(3000);

  await page.goto(
    "https://marketplace.avinode.com/marketplace/mvc/search#preSearch"
  );
  //if its a round trip then we need to click on the round trip button
  if (date2) {
    await page.click(
      "body > div.avi-page > div > div.avi-page-section.avi-is-fullscreen > div > form > div.avi-box.avi-tab-menu.avi-is-in-page.avi-is-full-down.avi-is-child-spacing-none.avi-is-aligned-left.avi-is-text-aligned-left > span:nth-child(2) > span"
    );

    await page.waitForTimeout(2000);
    await page.type("#segments\\[0\\]\\.startAirportSearchValue", from);
    await page.type("#segments\\[0\\]\\.endAirportSearchValue", to);
    await page.click("#segments\\[0\\]\\.dateTime\\.date", { clickCount: 2 });
    await page.type("#segments\\[0\\]\\.dateTime\\.date", date);
    await page.click("#segments\\[0\\]\\.dateTime\\.time", { clickCount: 3 });
    await page.type("#segments\\[0\\]\\.dateTime\\.time", time);
    await page.click("#segments\\[1\\]\\.dateTime\\.date", { clickCount: 2 }); //
    await page.type("#segments\\[1\\]\\.dateTime\\.date", date2); //
    await page.click("#segments\\[1\\]\\.dateTime\\.time", { clickCount: 3 }); //
    await page.type("#segments\\[1\\]\\.dateTime\\.time", time2); //
    await page.click("#segments\\[0\\]\\.paxCount", { clickCount: 2 });
    await page.type("#segments\\[0\\]\\.paxCount", pax);
    await page.click("#aircraftCategory");
    await page.click(
      "body > div.avi-drop-down-container > div > div:nth-child(1) > div"
    );
    await page.waitForSelector(
      "body > div.avi-page > div > div.avi-page-section.avi-is-fullscreen > div > form > div.avi-box.avi-is-none-down.avi-is-child-spacing-none.avi-is-aligned-left.avi-is-text-aligned-left > div:nth-child(3) > div:nth-child(2) > div > button"
    );
    await page.click(
      "body > div.avi-page > div > div.avi-page-section.avi-is-fullscreen > div > form > div.avi-box.avi-is-none-down.avi-is-child-spacing-none.avi-is-aligned-left.avi-is-text-aligned-left > div:nth-child(3) > div:nth-child(2) > div > button"
    );
  } else {
    await page.type("#segments\\[0\\]\\.startAirportSearchValue", from);
    await page.type("#segments\\[0\\]\\.endAirportSearchValue", to);
    await page.click("#segments\\[0\\]\\.dateTime\\.date", { clickCount: 2 });
    await page.type("#segments\\[0\\]\\.dateTime\\.date", date);
    await page.click("#segments\\[0\\]\\.dateTime\\.time", { clickCount: 3 });
    await page.type("#segments\\[0\\]\\.dateTime\\.time", time);
    await page.click("#segments\\[0\\]\\.paxCount", { clickCount: 2 });
    await page.type("#segments\\[0\\]\\.paxCount", pax);
    await page.click("#aircraftCategory");
    await page.click(
      "body > div.avi-drop-down-container > div > div:nth-child(1) > div"
    );
    // click the search button
    await page.waitForSelector(
      "body > div.avi-page > div > div.avi-page-section.avi-is-fullscreen > div > form > div.avi-box.avi-is-none-down.avi-is-child-spacing-none.avi-is-aligned-left.avi-is-text-aligned-left > div.avi-flex-grid.avi-vertical-flow-none > div:nth-child(4) > div > button"
    );
    await page.click(
      "body > div.avi-page > div > div.avi-page-section.avi-is-fullscreen > div > form > div.avi-box.avi-is-none-down.avi-is-child-spacing-none.avi-is-aligned-left.avi-is-text-aligned-left > div.avi-flex-grid.avi-vertical-flow-none > div:nth-child(4) > div > button"
    );
  }

  // select category of jet

  await page.waitForSelector(
    "body > div.avi-page > div > div.avi-flex-grid.avi-vertical-flow-none > div.avi-first-level-collapsable-page-section.avi-is-horizontal-flow-half > div > div > div.avi-page-header > div > span > svg > circle"
  );
  await page.click(
    "body > div.avi-page > div > div.avi-flex-grid.avi-vertical-flow-none > div.avi-first-level-collapsable-page-section.avi-is-horizontal-flow-half > div > div > div.avi-page-header > div > span > svg > circle"
  );

  // array of all the jet categories
  const userSelection = catagory;
  ////////////////////////////////////////////////////////////////////////////////
  const jetCategories = await page.$$eval(
    "body > div.avi-page > div > div.avi-flex-grid.avi-vertical-flow-none > div.avi-first-level-collapsable-page-section.avi-is-horizontal-flow-half > div > div > div.avi-first-level-collapsable-page-section-content-wrapper > div > div:nth-child(5) > div > div:nth-child(2) > div > div > div",
    elements => {
      let jetObj = {};
      for (let i = 0; i < elements.length; i++) {
        jetObj[elements[i].innerText] =
          "body > div.avi-page > div > div.avi-flex-grid.avi-vertical-flow-none > div.avi-first-level-collapsable-page-section.avi-is-horizontal-flow-half > div > div > div.avi-first-level-collapsable-page-section-content-wrapper > div > div:nth-child(5) > div > div:nth-child(2) > div > div:nth-child(" +
          (i + 1) +
          ") > div";
      }
      return jetObj;
    }
  );

  // loop through userSelections array and click each value in the jetCategories object whose key matches the value in the userSelections array
  let selections = [];
  const startSelecting = async () => {
    await page.waitForSelector(jetCategories[userSelection]);
    await page.click(jetCategories[userSelection]);
    // get only the ".t-company-name" with the parent class of "row avi-list-item avi-list-item-expandable"
    // scroll to the bottom of the page
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    const x = await page.$$eval(".t-company-link", elements => {
      const getParentElement = element => {
        // find the parent element which has the class "row avi-list-item avi-list-item-expandable"
        let parent = element.parentElement;
        while (
          parent.className !== "row avi-list-item avi-list-item-expandable"
        ) {
          parent = parent.parentElement;
        }
        return parent;
      };
      const getChildElement = element => {
        // find the last child element of the parent element
        let child = element.children[element.children.length - 1];
        // return the next child element of the last child element
        return child.children[0];
      };

      const getAircraftName = element => {
        // get the 2nd child element of the parent element
        let child = element.children[1];
        // get the <a> element of child
        return child.children[0].innerText;
      };

      let companyNames = [];
      let flightArr = [];
      for (let i = 0; i < elements.length; i++) {
        // if companyNames array.lenght is >= 30, break the loop
        if (companyNames.length >= 30) {
          break;
        }
        if (
          elements[i].parentElement.parentElement.parentElement.parentElement
            .parentElement.className ===
            "row avi-list-item avi-list-item-expandable" ||
          elements[i].parentElement.parentElement.parentElement.parentElement
            .className === "row avi-list-item avi-list-item-expandable"
        ) {
          let companyName = elements[i].innerText;
          let par = getParentElement(elements[i]);
          let button = getChildElement(par);
          let aircraftName = getAircraftName(par);
          let operatorAndJet = companyName + " " + aircraftName;
          if (!companyNames.includes(operatorAndJet)) {
            button.click();
            companyNames.push(operatorAndJet);
            flightArr.push({ company: companyName, jet: aircraftName });
          }
        }
      }
      return flightArr;
    });
    selections.push(x);

    /// clicks the button to open modal
    await page.waitForSelector(
      "body > div.avi-page > div > div.avi-flex-grid.avi-vertical-flow-none > div.avi-flex-grid-column > div > div.avi-page-header > div > div > button"
    );
    await page.click(
      "body > div.avi-page > div > div.avi-flex-grid.avi-vertical-flow-none > div.avi-flex-grid-column > div > div.avi-page-header > div > div > button"
    );

    // click the text box
    await page.waitForSelector("#buyerMessage");
    await page.click("#buyerMessage");

    await page.waitForTimeout(2000);

    const button = await page.$x(
      "/html/body/div[5]/div/div/div/div/form/div[5]/div/button"
    );
    await button[0].click();

    // close the modal

    // click this document.querySelector("#avi-icon-close")
    // if (await page.$(".avi-window-modal")) {
    //   await page.click(".avi-window-modal > div > div > div > span > svg");
    // }

    // await page.waitForTimeout(1000);

    return;
  };

  await startSelecting();
  await browser.close();
  return selections;
};

router.post("/", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    const { from, to, date, time, date2, time2, pax, categories } = req.body;
    if (!user) {
      return res.status(401).send({ error: "User not found" });
    }
    console.log(
      user.avinodeEmail,
      user.avinodePassword,
      from,
      to,
      date,
      time,
      date2,
      time2,
      pax,
      categories
    );
    // send through one category at a time
    let selections = [];
    for (let i = 0; i < categories.length; i++) {
      let userSelection = categories[i];
      let x = await avinodeSearcher(
        user.avinodeEmail,
        user.avinodePassword,
        from,
        to,
        date,
        time,
        date2,
        time2,
        pax,
        userSelection
      );
      selections.push(x);
    }
    // send back one array of selections

    selections = selections.flat();
    console.log(selections);
    res.send(selections);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// request comes in with all categories in an array. we can do categories.forEach(async category => {
//   const selections = await avinodeSearcher(
//     user.avinodeEmail,
//     user.avinodePassword,
//     from,
//     to,
//     date,
//     time,
//     date2,
//     time2,
//     pax,
//     category
//   );
//   return selections;
// });

// log on
// search inputs
// click search
// click category
// quit
