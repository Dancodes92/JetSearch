const avinodeSearcher = async (email, password) => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.goto("https://marketplace.avinode.com/sso/mvc/login");
  await page.type("#username", "pschneider@luxury.aero"); //use environment variable for this
  await page.type("#password", "Luxury1!"); //use environment variable for this
  await page.click(
    "body > div.avi-page > div > div > div > div > form > div.avi-button-group.avi-is-section-group > div > button"
  );
  await page.waitForTimeout(1000);

  await page.goto(
    "https://marketplace.avinode.com/marketplace/mvc/search#preSearch"
  );

  await page.type("#segments\\[0\\]\\.startAirportSearchValue", "SFO");
  await page.type("#segments\\[0\\]\\.endAirportSearchValue", "LAX");
  await page.click("#segments\\[0\\]\\.dateTime\\.date", { clickCount: 2 });
  await page.type("#segments\\[0\\]\\.dateTime\\.date", "032222");
  await page.click("#segments\\[0\\]\\.dateTime\\.time", { clickCount: 3 });
  await page.type("#segments\\[0\\]\\.dateTime\\.time", "1200");
  await page.click("#segments\\[0\\]\\.paxCount", { clickCount: 2 });
  await page.type("#segments\\[0\\]\\.paxCount", "3");
  await page.click("#aircraftCategory");
  await page.click(
    "body > div.avi-drop-down-container > div > div:nth-child(5) > div"
  );

  await page.waitForSelector(
    "body > div.avi-page > div > div.avi-page-section.avi-is-fullscreen > div > form > div.avi-box.avi-is-none-down.avi-is-child-spacing-none.avi-is-aligned-left.avi-is-text-aligned-left > div.avi-flex-grid.avi-vertical-flow-none > div:nth-child(4) > div > button"
  );
  await page.click(
    "body > div.avi-page > div > div.avi-page-section.avi-is-fullscreen > div > form > div.avi-box.avi-is-none-down.avi-is-child-spacing-none.avi-is-aligned-left.avi-is-text-aligned-left > div.avi-flex-grid.avi-vertical-flow-none > div:nth-child(4) > div > button"
  );
  await page.waitForSelector("body > div.avi-page > div > div.avi-flex-grid.avi-vertical-flow-none > div.avi-first-level-collapsable-page-section.avi-is-horizontal-flow-half > div > div > div.avi-first-level-collapsable-page-section-content-wrapper > div > div:nth-child(5) > div > div:nth-child(2) > div > div:nth-child(1) > div")

  await page.click("body > div.avi-page > div > div.avi-flex-grid.avi-vertical-flow-none > div.avi-first-level-collapsable-page-section.avi-is-horizontal-flow-half > div > div > div.avi-first-level-collapsable-page-section-content-wrapper > div > div:nth-child(5) > div > div:nth-child(2) > div > div:nth-child(1) > div")

}

