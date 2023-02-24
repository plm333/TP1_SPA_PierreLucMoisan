import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params){
        super(params)
        this.setTitle("Palmares")
    }

    async getHtml(){
        return `
                <h1>Palmarès sur last.fm</h1>
                <ul>
                    <li><a href="/palmaresChansons" data-link>Chansons</a></li>
                    <li><a href="/palmaresArtistes" data-link>Artistes</a></li>
                    <li><a href="/palmaresGenres" data-link>Genres</a></li>
                </ul>
        `;
    }
}