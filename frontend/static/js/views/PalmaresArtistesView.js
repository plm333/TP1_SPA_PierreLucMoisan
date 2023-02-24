import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params){
        super(params)
        this.setTitle("Palmarès artistes view")
    }

    async getHtml(){
        //console.log(this.params.id);
        const nu = Number(this.params.id);

        async function getData(urlArtists){
            const response = await fetch(urlArtists)
            return response.json()
        }

        const data = await getData('/static/assets/fmArtists.json');

        const artiste = data.artists.artist[nu];

        return `
                <h1>`+artiste.name+`</h1>
                <p>Nombre d\'écoute :`+artiste.listeners+`</p>
                <p><a target="_blank" href="`+artiste.url+`">Voir plus de détails</a></p>
                <p><a href="/palmaresArtistes" data-link>Retour</a></p>
        `; 
    }
}