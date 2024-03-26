import puppeteer from 'puppeteer'

const getTableRows = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Navigate to the webpage
  await page.goto('https://www.johannesgeworkianhellman.se/calender/');

  // Wait for the container to be present
  await page.waitForSelector('.wolf-past-shows.wolf-shows');


  const trElements = await page.evaluate(() => {
    const container = document.querySelector('.wolf-past-shows.wolf-shows');
    return container.querySelectorAll('tr')
  })

  const trs = []

  for (const tr of trs) {
    await page.evaluate(() => {
      const date = tr.querySelector('td:nth-child(1)').innerText   
    })
  }


  for (const tr of trs) {


  }

  await browser.close()

  return trElements
}

getTableRows()
  .then(console.log)
  .catch(console.error)
