import express from 'express'
import axios from 'axios';
import * as cheerio from 'cheerio';


const eventRouter = express.Router()

eventRouter.post('/', async (req, res) => {
    const { city, country } = req.body;
    console.log(city, country);

    try {
        const url = `https://www.eventbrite.com/d/${country.toLowerCase()}--${city.toLowerCase()}/events/`;
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const events = [];
        // Wait for event cards to load
        $('.popular_events--bucket-wrapper .browse-cards-container .small-card-mobile').each((i, el) => {
            const name = $(el).find('.event-card__clamp-line--two').text().trim();
            const venue = $(el).find('.event-card__clamp-line--one').text().trim();
            const date = $(el).find('.event-card-details .Typography_body-md-bold__487rx').eq(0).text().trim();
            const ticketUrl = $(el).find('.event-card-link').attr('href');
            const photo = $(el).find('.event-card-image').attr('src');

            events.push({
                name,
                venue,
                date,
                ticketUrl,
                photo
            });
        });

        res.json({ city, country, events });

    } catch (error) {
        console.error('Scraping failed:', error.message);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

export default eventRouter