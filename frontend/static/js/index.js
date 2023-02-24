//router
import LastFm from "./views/LastFm.js"
import Palmares from "./views/Palmares.js"
import PalmaresChansons from "./views/PalmaresChansons.js"
import PalmaresChansonsView from "./views/PalmaresChansonsView.js"
import PalmaresArtistes from "./views/PalmaresArtistes.js"
import PalmaresArtistesView from "./views/PalmaresArtistesView.js"
import PalmaresGenres from "./views/PalmaresGenres.js"
import PalmaresGenresView from "./views/PalmaresGenresView.js"
import Parametres from "./views/Parametres.js"


const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(
/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1) // values est égal à l'id
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result =>
        result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
        }));
}

const router = async () => {
    const routes = [
        {path: "/", view:LastFm},
        {path: "/palmares", view:Palmares},
        {path: "/palmaresChansons", view:PalmaresChansons},
        {path: "/palmaresArtistes", view:PalmaresArtistes},
        {path: "/palmaresGenres", view:PalmaresGenres},
        {path: "/parametres", view:Parametres},
        {path: "/palmaresChansonsView/:id", view:PalmaresChansonsView},
        {path: "/palmaresArtistesView/:id", view:PalmaresArtistesView},
        {path: "/palmaresGenresView/:id", view:PalmaresGenresView}
    ]

    //match
    const potentialMatches = routes.map(route => {
        return{
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        }
    })

    //console.log(potentialMatches);
    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null)

    if (!match) {
        match = {
            route: routes[0],
            result: (location.pathname)
        }
    }
    console.log(match)
    const view = new match.route.view(getParams(match))
    document.querySelector('#app').innerHTML = await view.getHtml()
}

const navigateTo = url => {
    history.pushState(null, null, url);
    router()
}  

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href)
        }
    })
    router()
})