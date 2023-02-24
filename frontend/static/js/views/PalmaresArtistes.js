import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params){
        super(params)
        this.setTitle("Palmares des artistes")
    }

    async getHtml(){
        async function getData(urlArtists){
            const response = await fetch(urlArtists);
            return response.json();
        }
        const data = await getData('/static/assets/fmArtists.json');

        let listArtists = "<ul>";

        let i = 0;

        data.artists.artist.forEach(element => {
            listArtists += "<li><a href='/palmaresArtistesView/"+i+"' data-link>"+element.name+"</a></li>";
            i++;
        });

        listArtists += "</ul>";

        return `
                <h1>Palmarès des Artistes 1-50</h1>
                `+listArtists+`
                <p><a href="/palmares" data-link>Retour</a></p>
        `;
    }
}