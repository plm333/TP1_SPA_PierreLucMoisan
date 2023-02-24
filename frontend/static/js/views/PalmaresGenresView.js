import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params){
        super(params)
        this.setTitle("Palmarès genres view")
    }

    async getHtml(){
        //console.log(this.params.id);
        const nu = Number(this.params.id);

        async function getData(urlTags){
            const response = await fetch(urlTags)
            return response.json()
        }

        const data = await getData('/static/assets/fmTags.json');

        const genre = data.tags.tag[nu];

        return `
                <h1>`+genre.name+`</h1>
                <p>Nombre d\'écoute :`+genre.taggings+`</p>
                <p><a target="_blank" href="`+genre.url+`">Voir plus de détails</a></p>
                <p><a href="/palmaresGenres" data-link>Retour</a></p>
        `; 
    }
}