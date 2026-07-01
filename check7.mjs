import { chromium } from 'playwright';

const errors = [];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
page.on('pageerror', (err) => errors.push('pageerror: ' + err.message));
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });

await page.goto('http://localhost:5183', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(2500);

// open extended gallery via nav icon button (title attr)
const galleryBtn = await page.$('button[title="Galería Artística Extendida"]');
if (galleryBtn) {
  await galleryBtn.click();
  await page.waitForTimeout(1500);
  // click "Fotografía"? category isn't named that in ArtisticGallery filters; find a bounce card image alt matching photography title
  const img = await page.$('img[alt="Visitantes Emplumados"], img[alt="Vida Salvaje y Doméstica: Una Mirada Cercana"]');
  if (img) {
    await img.click({ force: true });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'shots/modal-photo-hero.png' });
    await page.evaluate(() => {
      const modal = document.querySelector('.custom-scrollbar');
      modal?.scrollTo({ top: window.innerHeight * 1.05, behavior: 'instant' });
    });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'shots/modal-photo-content.png' });
  } else {
    errors.push('NO PHOTOGRAPHY IMG FOUND');
    await page.screenshot({ path: 'shots/artistic-gallery-debug.png' });
  }
} else {
  errors.push('NO GALLERY BUTTON');
}

console.log('ERRORS:', JSON.stringify(errors, null, 2));
await browser.close();
