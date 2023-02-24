const express = require('express');
const app = express();
const fs = require('fs');
const request = require('request');

const { PORT } = require('./config'); 
const { API_KEY } = require('./config');

const appStartup = require('./AppStartup.js');

const path = require('path');

app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

app.get("/*", function(req, res){ 
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"))
});

app.get('/fmTracks', function(req, res){ 
    var urlTracks = 'https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=5b1038179263368c6a41c67b728ff403&format=json';

    request.get({
        url: urlTracks,
        json: true,
        headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
        if (err) {
            console.log('Error:', err);
        } else if (res.statusCode !== 200) {
            console.log('Status:', res.statusCode);
        } else {
            var newData = JSON.stringify(data);
            fs.writeFile('fmTracks.json', newData, err => {
                if(err) throw err;
                console.log(data);
            })
        }
    });

    res.end(); 
})


app.get('/fmArtists', function(req, res){ 
    var urlArtists = 'http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=5b1038179263368c6a41c67b728ff403&format=json';

    request.get({
        url: urlArtists,
        json: true,
        headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
        if (err) {
            console.log('Error:', err);
        } else if (res.statusCode !== 200) {
            console.log('Status:', res.statusCode);
        } else {
            var newData = JSON.stringify(data)
            fs.writeFile('fmArtists.json', newData, err => {
                if(err) throw err;
                console.log(data);
            })
        }
    });

    res.end();
})

app.get('/fmTags', function(req, res){ 
    var urlTags = 'http://ws.audioscrobbler.com/2.0/?method=chart.gettoptags&api_key=5b1038179263368c6a41c67b728ff403&format=json';

    request.get({
        url: urlTags,
        json: true,
        headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
        if (err) {
            console.log('Error:', err);
        } else if (res.statusCode !== 200) {
            console.log('Status:', res.statusCode);
        } else {
            var newData = JSON.stringify(data)
            fs.writeFile('fmTags.json', newData, err => {
                if(err) throw err;
                console.log(data);
            })
        }
    });

    res.end() 
})

appStartup.start();



app.listen(PORT || 4001, () => { console.log("Server running", PORT) })