import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params){
        super(params)
        this.setTitle("last.fm")
    }

    async getHtml(){
        return `
                <h1>Bienvenu sur last.fm</h1>
                <p>
                Explorez la meilleure musique alimentée par vos Scrobbles
                Nous rassemblons vos services de musique préférés et joignons l'écoute, la visualisation et le partage pour connecter votre monde musical.
                
                Ci-dessous, vous pouvez visualiser, en temps réel, les habitudes d'écoute et les tendances de la communauté mondiale de Last.fm. Allez explorer.</p>
                <p>
                    <a href="/palmares" data-link>Voir les palmarès</a>
                </p>
        `;
    }
}