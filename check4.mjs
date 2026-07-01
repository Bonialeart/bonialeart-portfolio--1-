import { chromium } from 'playwright';

const errors = [];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
page.on('pageerror', (err) => errors.push('pageerror: ' + err.message));
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });

await page.goto('http://localhost:5183', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(2500);

// Skills section
await page.evaluate(() => document.getElementById('skills')?.scrollIntoView({ block: 'start' }));
await page.waitForTimeout(1500);
await page.screenshot({ path: 'shots/skills-new.png' });

// Open first gallery item modal
await page.evaluate(() => document.getElementById('gallery')?.scrollIntoView({ block: 'start' }));
await page.waitForTimeout(1500);
const firstCard = await page.$('#gallery .grid > div');
if (firstCard) {
  await firstCard.click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'shots/modal-hero.png' });

  // scroll within modal to content sections
  await page.evaluate(() => {
    const modal = document.querySelector('.custom-scrollbar');
    modal?.scrollTo({ top: window.innerHeight * 1.05, behavior: 'instant' });
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'shots/modal-content1.png' });

  await page.evaluate(() => {
    const modal = document.querySelector('.custom-scrollbar');
    modal?.scrollTo({ top: window.innerHeight * 2, behavior: 'instant' });
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'shots/modal-content2.png' });
} else {
  errors.push('NO GALLERY CARD FOUND');
}

console.log('ERRORS:', JSON.stringify(errors, null, 2));
await browser.close();
