export default class Button {
    constructor({element}) {
        this._el = element;

        this._el.addEventListener('click', e => {
            
            let clearEvent = new CustomEvent('clearCanvas');
            this._el.dispatchEvent(clearEvent);
        })


    }

on(event, callback) {
    this._el.addEventListener(event, callback);
}

}