import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params){
        super(params)
        this.setTitle("Palmares des chansons")
    }

    async getHtml(){
        async function getData(urlTracks){
            const response = await fetch(urlTracks);
            return response.json();
        }
        const data = await getData('/static/assets/fmTracks.json');

        let listChansons = "<ul>";

        let i = 0;

        data.tracks.track.forEach(element => {
            listChansons += "<li><a href='/palmaresChansonsView/"+i+"' data-link>"+element.name+" by "+element.artist.name+"</a></li>";
            i++;
        });

        listChansons += "</ul>";

        return `
                <h1>Palmarès des Chansons 1-50</h1>
                `+listChansons+`
                <p><a href="/palmares" data-link>Retour</a></p>
        `;
    }
}