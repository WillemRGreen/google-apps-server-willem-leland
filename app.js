const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const app = express();

app.use(morgan('common'));
app.use(cors())

const apps = require('./app-data.js')

app.get('/apps', (req, res) => {
    const { search = "", sort, genres} = req.query;
    let results = apps;

    if (sort){
        if(!['Rating', 'App'].includes(sort)) {
            return res
                .status(400)
                .send('Sort must be either rating or app')
        }
        results.filter(app => {
            app
                .App
                .toLowerCase()
                .includes(search.toLowerCase())
        })
        results
            .sort((a, b) => {
                return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
            });
    };

    if(genres){
        if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
            return res
                .status(400)
                .send('Genres must be Action, Puzzle, Strategy, Casual, Arcade, or Card')
        }
        results = results.filter(app => {
                app.Genres.toLowerCase().includes(app[sort].toLowerCase());
            })
    }

    res.json(results);
});

app.listen(8000, () => {
    console.log('Server started on port 8000')
})