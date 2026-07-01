import { chromium } from 'playwright';

const errors = [];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
page.on('pageerror', (err) => errors.push('pageerror: ' + err.message));
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });

await page.goto('http://localhost:5183', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(2500);

await page.evaluate(() => document.getElementById('gallery')?.scrollIntoView({ block: 'start' }));
await page.waitForTimeout(1000);

// Click "Diseño" filter button
const buttons = await page.$$('button');
for (const b of buttons) {
  const txt = (await b.textContent() || '').trim();
  if (txt === 'Diseño') { await b.click(); break; }
}
await page.waitForTimeout(1000);

const firstCard = await page.$('#gallery .grid > div');
if (firstCard) {
  await firstCard.click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'shots/modal-design-hero.png' });

  await page.evaluate(() => {
    const modal = document.querySelector('.custom-scrollbar');
    modal?.scrollTo({ top: window.innerHeight * 1.05, behavior: 'instant' });
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'shots/modal-design-content.png' });
} else {
  errors.push('NO DESIGN CARD FOUND');
}

console.log('ERRORS:', JSON.stringify(errors, null, 2));
await browser.close();
