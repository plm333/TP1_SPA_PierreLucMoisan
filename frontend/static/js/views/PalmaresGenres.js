import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params){
        super(params)
        this.setTitle("Palmares par genre")
    }

    async getHtml(){
        async function getData(urlTags){
            const response = await fetch(urlTags);
            return response.json();
        }
        const data = await getData('/static/assets/fmTags.json');

        let listGenres = "<ul>";

        let i = 0;

        data.tags.tag.forEach(element => {
            listGenres += "<li><a href='/palmaresGenresView/"+i+"' data-link>"+element.name+"</a></li>";
            i++;
        });

        listGenres += "</ul>";

        return `
                <h1>Palmarès par Genre 1-50</h1>
                `+listGenres+`
                <p><a href="/palmares" data-link>Retour</a></p>
        `;
    }
}