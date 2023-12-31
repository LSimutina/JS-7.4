let page;

jest.setTimeout(60000);

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title = await page.title();
    expect(title).toEqual("GitHub: Let’s build from here · GitHub");
  }, 60000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 60000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  }, 60000);
});

describe("More three tests to check title", () => {
  test("CI/CD & Automation page checking title'", async () => {
    await page.goto("https://github.com/solutions/ci-cd/");
    await page.waitForSelector("h1");
    const title = await page.title();
    expect(title).toContain("A Complete CI/CD Solution | GitHub · GitHub");
  }, 60000);

  test("Pricing page checking title'", async () => {
    await page.goto("https://github.com/pricing");
    await page.waitForSelector("h1");
    const title = await page.title();
    expect(title).toContain("Pricing · Plans for every developer · GitHub");
  }, 60000);

  test("Trending page checking title'", async () => {
    await page.goto("https://github.com/trending");
    await page.waitForSelector("h1");
    const title = await page.title();
    expect(title).toContain("Trending");
  }, 60000);
});
