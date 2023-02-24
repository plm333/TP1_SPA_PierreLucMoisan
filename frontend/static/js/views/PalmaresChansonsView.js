import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params){
        super(params)
        this.setTitle("Palmarès chansons view")
    }

    async getHtml(){
        //console.log(this.params.id);
        const nu = Number(this.params.id);

        async function getData(urlTracks){
            const response = await fetch(urlTracks)
            return response.json()
        }

        const data = await getData('/static/assets/fmTracks.json');

        const chanson = data.tracks.track[nu];

        return `
                <h1>`+chanson.name+`</h1>
                <p>`+chanson.artist.name+`</p>
                <p>Nombre d\'écoute :`+chanson.listeners+`</p>
                <p><a target="_blank" href="`+chanson.url+`">Voir plus de détails</a></p>
                <p><audio src="/music/good_enough.mp3" controls>	
                <embed 
                    src="`+chanson.url+`"
                    width="300"
                    height="90"
                    loop="false"
                    autostart="false">
            </audio></p>
                <p><a href="/palmaresChansons" data-link>Retour</a></p>
        `; 
    }
}