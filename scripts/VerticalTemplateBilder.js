class VerticalTemplateBilder {
    #parentContainer = null;
    #columnSettings = null;
    #childElements = null;
    #gapRows = 0;
    #gridRowHight = 5;
    constructor(id,percision = 5,gap = 1) {
        // intial gaps , grid row hight
        this.#gapRows = gap;
        this.#gridRowHight = percision;
        // get parent container
        this.#parentContainer = document.querySelector(`${id}.project-grid-parent`);
        // edit gap style
        this.#parentContainer.style.gap = `${this.#gapRows * this.#gridRowHight}px`;
        // populate child elements array with elements and heights
        // get childs
        let childElements =document.querySelectorAll(`${id}.project-grid-parent > .project-grid-child`);
        // get child content hights
        let contentSpan = Array.from(document.querySelectorAll(`${id}.project-grid-parent > .project-grid-child > *`)).map(e=> Math.floor((e.height?e.height:e.parentElement.getAttribute('grid-row-height')*this.#gridRowHight)/this.#gridRowHight));
        // create array of element and span of all child
        this.#childElements = [];
        for(let i=0 ; i<childElements.length ; i++) {
            this.#childElements[i] = {
                'element' : childElements[i],
                'span' : contentSpan[i],
            };
        }
    }
    // public methods
    // settings for column and page width
    setGridColumn = ((col={'0':1,'578':2,'768':3,'992':4})=>{
        // {'vw':colnum , 'vw':colnum , ...}
        let keys = Object.keys(col);
        let vals = Object.values(col);
        // populate settings array by set values of column for every view width
        this.#columnSettings = [];
        for(let i=0 ; i<keys.length ; i++){
            this.#columnSettings[i] = {
                'vw': keys[i],
                'col': vals[i]
            };
        }
        // render columns
        this.#gridEvent();
    });
    // enable view port width change event
    enableVWevent = (_=>window.addEventListener('resize',this.#gridEvent));

    // private methods
    // update child height
    #updateChildElementsHeights = (_=>this.#childElements.forEach(e=>e.span = Math.floor((e.element.firstElementChild.height?e.element.firstElementChild.height:e.element.getAttribute('grid-row-height')*this.#gridRowHight)/this.#gridRowHight)));
    // refersh column when view port width changed event
    #gridEvent = (_=>{
            let colNum = 0;
            this.#columnSettings.forEach(e=>colNum = e.vw <= window.innerWidth ? e.col : colNum);
            this.#gridRouten(colNum);
    });
    // create coulmns routen
    #gridRouten = ((colNum=2)=>{
        // col => number of colum 
        // create array for count every column content hight
        let colcount = Array(colNum).fill(0);
        // set column style as a number
        this.#parentContainer.style.gridTemplateColumns = `repeat(${colNum},calc(${100/colNum}% - ${this.#gapRows*(colNum-1)}px))`;
        // update elemet array with new height
        this.#childElements.forEach(e=>e.element.style.gridRow = '');
        this.#updateChildElementsHeights();
        // loop for every child element to set hight
        this.#childElements.forEach((e,i)=>{
            let col = colcount.indexOf(colcount.reduce((prev,crnt)=>prev<crnt?prev:crnt));
            // e.element.style.gridRow = `${colcount[col]+1} / span ${e.span-Math.floor(i/colNum)}`;
            e.element.style.gridRow = `${colcount[col]+1} / span ${e.span}`;
            colcount[col] += e.span;
        });
        this.#parentContainer.style.gridTemplateRows = `repeat(${colcount.reduce((prev,crnt)=>prev>crnt?prev:crnt)},auto)`;
    });
}

export default VerticalTemplateBilder;


let onloadProjects = ( ()=>{
    let styleProjectGrid = (()=>{
        document.querySelector('.project-grid-parent').style.gridTemplateRows = `repeat(${col1length>col2length?col1length:col2length},auto)`;
    })();
});
