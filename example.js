import fs from "fs";
import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(
    "https://www.crunchbase.com/search/people/507d2609e9c427b143683519a6714535"
  );

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  // Type into search box
  // await page.type(".search-box__input", "automate beyond recorder");

  // Wait and click on first result
  // const searchResultSelector = ".search-box__link";
  // await page.waitForSelector(searchResultSelector);
  // await page.click(searchResultSelector);

  // Locate the full title with a unique string
  // const textSelector = await page.waitForSelector(".show-all-results-upsell");
  // const fullTitle = await textSelector?.evaluate((el) => el.textContent);

  const tableContent = await page.$$eval(
    "div.body-wrapper > grid-row",
    (rows) => {
      return Array.from(rows, (row) => {
        const column = row.querySelectorAll("grid-cell");
        return Array.from(column, (col) => {
          return col.textContent.trim();
        });
      });
    }
  );

  // Print the full title
  console.log(tableContent);

  await browser.close();
})();
