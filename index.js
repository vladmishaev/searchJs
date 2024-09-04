/**
 * Класс для создание поиска
 * @constructor
 * @param {Array} ArrayGroups - [
 *      HTMLInputElement,
 *      NodeList - Elements that contain a search string,
 *      settings = {matchCase:bool, charIgnore:Array[chart]}
 * ]
 */
class SearchItems {
    input = undefined;
    elementsArrayList = [];
    settings = {
        matchCase: true,
        charIgnore: []
    };


    constructor(input, elementsNodeList, settings) {
        this.input = input;
        this.elementsArrayList = [...elementsNodeList];
        Object.assign(this.settings, settings);

        this.#init();
    }

    #substringSearch(str, substr) {
        if (substr === "") return true;
        const { matchCase, charIgnore } = this.settings;

        if (matchCase === false) {
            str = str.toLowerCase()
            substr = substr.toLowerCase()
        }

        charIgnore.forEach(chart => {
            str = str.replaceAll(chart, "");
            substr = substr.replaceAll(chart, "");
        })

        return str.indexOf(substr) >= 0 ? true : false;
    }

    #inputHandler(event) {
        const searchString = event.target.value.trim();

        this.elementsArrayList.forEach((item) => {
            const isSearchStringInItem = this.#substringSearch(item.textContent, searchString);
            if (isSearchStringInItem) {
                item.dataset.searchVisible = "true";
            } else {
                item.dataset.searchVisible = "false";
            }
        });
    }

    #init() {
        this.input.addEventListener('input', this.#inputHandler.bind(this));
        this.elementsArrayList.forEach((item) => {
            item.dataset.searchVisible = "true";
        });
    }
}