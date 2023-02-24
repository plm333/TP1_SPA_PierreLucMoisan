
const fs = require('fs') 
const request = require('request')

// fichiers json mis à jour à chaque démarrage du serveur 
exports.start = function(){
    const refreshes = [
        {   
            fileName: "frontend/static/assets/fmTracks.json",
            url:'https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=5b1038179263368c6a41c67b728ff403&format=json'
        },

        {   
            fileName: "frontend/static/assets/fmArtists.json",
            url:'http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=5b1038179263368c6a41c67b728ff403&format=json'
        },

        {   
            fileName: "frontend/static/assets/fmTags.json",
            url:'http://ws.audioscrobbler.com/2.0/?method=chart.gettoptags&api_key=5b1038179263368c6a41c67b728ff403&format=json'
        }
    ];

    refreshes.forEach(element => {
        request.get({url: element.url, json: true, headers: {'User-Agent': 'request'}}, (err, res, data) => {
            if (err) {
                console.log('Error:', err);
            } else if (res.statusCode !== 200) {
                console.log('Status:', res.statusCode);
            } else {
                var newData = JSON.stringify(data);
    
                fs.writeFile(element.fileName, newData, err => {
                    if(err) throw err;
                    console.log(data);
                });
            }
        });
    });

}