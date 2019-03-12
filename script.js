class Canvas {
    constructor({element}) {
        this._el = element;
        this._content  = element.getContext('2d');
        this._clickHandler();
        
    }

_clickHandler() {
    let points = [];
    let count = 0;

    this._el.addEventListener('click', e => {
            count++;

            if (count < 4) {
                console.log(e);

                let point = {
                    x: e.clientX,
                    y: e.clientY,
                };

                points.push(point);
            };
         });

        console.log('points', points);
    }
    


    _draw() {

    }
    
}









let canvas = new Canvas({
    element: document.querySelector('.main-canvas')
})

