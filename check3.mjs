import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto('http://localhost:5183', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(2500);

// Hero close-up (star sticker)
await page.screenshot({ path: 'shots/hero-full.png' });

// Scroll to polaroid marquee (right after hero)
await page.evaluate(() => window.scrollTo(0, window.innerHeight * 0.95));
await page.waitForTimeout(1500);
await page.screenshot({ path: 'shots/marquee.png' });

// About section (smile/flame stickers + polaroid paper)
await page.evaluate(() => {
  const el = Array.from(document.querySelectorAll('h2')).find(e => e.textContent?.includes('SOBRE'));
  el?.scrollIntoView({ block: 'start' });
});
await page.waitForTimeout(1500);
await page.screenshot({ path: 'shots/about.png' });

// Services cards (paper)
await page.evaluate(() => {
  document.getElementById('services')?.scrollIntoView({ block: 'start' });
});
await page.waitForTimeout(1500);
await page.screenshot({ path: 'shots/services.png' });

// Contact paper
await page.evaluate(() => {
  document.getElementById('contact')?.scrollIntoView({ block: 'start' });
});
await page.waitForTimeout(1500);
await page.screenshot({ path: 'shots/contact.png' });

// Skills (crown sticker)
await page.evaluate(() => {
  document.getElementById('skills')?.scrollIntoView({ block: 'start' });
});
await page.waitForTimeout(1500);
await page.screenshot({ path: 'shots/skills.png' });

await browser.close();
