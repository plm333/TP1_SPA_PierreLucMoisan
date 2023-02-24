import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params){
        super(params)
        this.setTitle("Paramètres")
    }

    async getHtml(){
        return `
                <h1>Paramètres</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quas cumque harum libero! Dicta explicabo voluptatibus iste vitae dolor corrupti, voluptas assumenda pariatur cum obcaecati dignissimos ipsa, repellat delectus saepe.</p>
        `; // backtick alt À
    }
}