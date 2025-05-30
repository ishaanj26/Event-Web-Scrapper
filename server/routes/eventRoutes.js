import express from 'express'
import puppeteer from 'puppeteer';

const eventRouter = express.Router()

eventRouter.post('/', async (req, res) => {
    const { city, country } = req.body;
    console.log(city, country);

    try {
        const url = `https://www.eventbrite.com/d/${country.toLowerCase()}--${city.toLowerCase()}/events/`;

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Wait for event cards to load
        await page.waitForSelector('.small-card-mobile', { timeout: 10000 });

        const events = await page.evaluate(() => {
            const eventNodes = document.querySelectorAll('.popular_events--bucket-wrapper .browse-cards-container .small-card-mobile');
            const data = [];

            eventNodes.forEach(el => {
                const photoEl = el.querySelector('.event-card-image');
                const nameEl = el.querySelector('.event-card__clamp-line--two');
                const venueEl = el.querySelector('.Typography_root__487rx.Typography_body-md__487rx.event-card__clamp-line--one.Typography_align-match-parent__487rx');
                const ticketEl = el.querySelector('.event-card-link');

                const dateEls = el.querySelectorAll('.event-card-details .Typography_root__487rx.Typography_body-md-bold__487rx.Typography_align-match-parent__487rx');
                const date = dateEls.length >= 2 ? dateEls[dateEls.length - 2].innerText.trim() : '';

                data.push({
                    name: nameEl?.innerText.trim() || '',
                    venue: venueEl?.innerText.trim() || '',
                    date: date || '',
                    ticketUrl: ticketEl?.getAttribute('href') || '',
                    photo: photoEl?.getAttribute('src') || ''
                });
            });

            return data;
        });

        await browser.close();

        res.json({ city, country, events });

    } catch (error) {
        console.error('Scraping failed:', error.message);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

export default eventRouter