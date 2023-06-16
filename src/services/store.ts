export interface Store {
  setTuiStore(): void;
  setTemplate(data: string): void;
  findTuiValues(): {
    md: string;
    html: string;
    user: string;
  };
  updateTuiValues(data: {
    user?: string;
    html?: string;
  }): void;
  letter: string;
  table: string;
  default: string;
}

const store: Store = {
  findTuiValues() {
    if (!localStorage.tuiValues) {
      this.setTuiStore();
    }
    return { 
      md: JSON.parse(localStorage.tuiValues).md,
      html: JSON.parse(localStorage.tuiValues).html,
      user: JSON.parse(localStorage.tuiValues).user
    };
  },
  setTemplate(data: string) {
    if (data === 'user') {
      const tuiValues = JSON.parse(localStorage.tuiValues);
      tuiValues.md = tuiValues.user;
      localStorage.tuiValues = JSON.stringify(tuiValues);
    } else {
      const key = data as keyof Store;
      const tuiValues = JSON.parse(localStorage.tuiValues);
      tuiValues.md = this[key];
      localStorage.tuiValues = JSON.stringify(tuiValues);
    }
  },
  setTuiStore() {
    if (!localStorage.tuiValues) {
      localStorage.tuiValues = JSON.stringify({ 
        md: this.default,
        html: "Try to edit something first",
        user: "",
      });
    }
  },
  updateTuiValues(data: { user?: string, html?: string }) {
    if (!localStorage.tuiValues) {
      this.setTuiStore();
    }
    const tuiValues = JSON.parse(localStorage.tuiValues);
    if (data.user) {
      // TODO???: if value doesn't finish with '\n\n' => add '\n'
      // => to prevent erratic bug
      tuiValues.user = data.user;
    }
    if (data.html) {
      tuiValues.html = data.html;
    }
    localStorage.tuiValues = JSON.stringify(tuiValues);
  },
  letter: "<br>\n\n$$indent1\nJean-Jacques Jules<br>\n27, rue des Bienheureux<br>\n7983 Grâce-Destinée\n$$\n\n\n<br><br>\n\n$$indent6\nIsabelle Bleuet<br>\nCentre culturel multidisciplinaire<br>\n1733, rue du Labeur<br>\n4000 Vallée de Misère\n$$\n\n<br>\n\n$$indent6\nGrâce-Destinée, le 22 juin 2023\n$$\n\n<br>\n\n$$indent3\nObjet : candidature spontanée\n$$\n\n<br>\n\n$$indent3\nMadame Bleuet,\n$$\n\n\n$$indent1\nJe vous adresse ce courrier afin de vous présenter mon intérêt envers votre belle institution. En effet, votre publication a retenue toute mon attention...\n$$\n\n\n$$indent1\nBla bla bla bla bla bla bla [...]\n$$\n\n\n$$indent1\nDans l'attente d'une réponse, je vous envoie mes salutations.\n$$\n\n<br><br>\n\n$$indent6\nJean-Jacques Jules\n$$\n\n",
  table: "$$boxColorCenter\n<span class=\"large\">Tableau des intérêts</span>\n$$\n\n<br><br>\n\n|  | Passé | Futur | Pronostic |\n| :---: | :---: | :---: | :---: |\n| Jean | 1.987563% | 0.7% | Gagnant|\n| Jules | 97.333% | 0.2598135% | Perdant|\n| Jonas | 198.7563% | 70% | Favori|\n| Gilles | 9.333% | 25.98135% | Outsider|\n\n",
  default: "<span class=\"large\">Large</span> <span class=\"medium\">Medium</span> Normal <small>Small</small>\n[WebDeveloperie](https://www.webdeveloperie.be/)\n<br>\n***\n\n$$center\n 1<sup>st</sup> <u>underlined</u> text <mark>marked</mark>\n$$\n\n$$indent1\n<i>begin from indent1<i>\n$$\n\n$$indent6\n<b>to indent6<b>\n$$\n\n$$boxCenter\nboxed & centered\n$$\n\n$$colorCenter\nbackground & centered\n$$\n\n$$boxColorCenter\nbox & background & centered\n$$\n\n<br><br>\n\n|  | Passé | Futur |\n| --- | :--- | :--- |\n| JeanQuiRit | Il aurait pu fuire mais il a préféré rire, c'est son choix, pourquoi le blâmer pour cela? | A l'avenir, il sait qu'il reproduira le même comportement, cela lui réussit, c'est certain. |\n| JulesQuiFuit | Il a fuit mais en riant, car il était certain de son choix, son ami allait périr, et lui pas. | Il regrette quand même son choix, son ami lui manquera. Il s'en fera d'autres, il ne s'en fait pas. |\n\n<br><br>\n\n|  | Passé | Futur |\n| :---: | :---: | :---: |\n| JeanQuiRit | 1.987563% | 0.7% |\n| JulesQuiFuit | 97.333% | 0.2598135% |\n| JeanQuiPleure | 198.7563% | 70% |\n| JulesQuiRage | 9.333% | 25.98135% |\n\n"
}

export default store;