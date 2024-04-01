class ImgScroller {
    #leftArrow = null;
    #rightArrow = null;
    #viewCount =0;
    #items= [];
    constructor (id) {
        //deffine arrows
        this.#leftArrow   = document.querySelector(`${id}.project-scroll .scroll-control .scroll-indecators .scroll-left`);
        this.#rightArrow  = document.querySelector(`${id}.project-scroll .scroll-control .scroll-indecators .scroll-right`);
        // count images
        this.#viewCount   = Array.from(document.querySelectorAll(`${id}.project-scroll .scroll-view *`)).length;
        // add indexes to DOM
        for(let i=0 ; i< this.#viewCount ; i++) {
            let index = document.createElement('span');
            index.appendChild(document.createElement('span'));
            document.querySelector(`${id}.project-scroll .scroll-control .scroll-indexs`).appendChild(index);
        }
        document.querySelector(`${id}.project-scroll .scroll-control .scroll-indexs span`).classList.add('active');
        // define object have a pair of index and view image
        // add order style
        let view = document.querySelectorAll(`${id}.project-scroll .scroll-view > *`);
        let index = document.querySelectorAll(`${id}.project-scroll .scroll-control .scroll-indexs > *`);
        for(let i=0 ; i< this.#viewCount ; i++) {
            this.#items[i] = {
                'view' : view[i],
                'index' : index[i],
            };
            this.#items[i].view.style.order = i+1;
        }
        // // add event for hover on image , change the index to active and correct order
        // this.#items.forEach(e=>{
        //     e.view.addEventListener('mouseover',_=>{
        //         this.#cleanActiveIndex();
        //         e.index.classList.add('active');
        //         let order = e.view.style.order;
        //         this.#items.forEach(e => {
        //             e.view.style.order = this.#viewCount + 1 - order + Number(e.view.style.order) > this.#viewCount? 1 + Number(e.view.style.order) - order : this.#viewCount + 1 - order + Number(e.view.style.order);
        //         });
        //     });
        // });
    }
    // public methods
    // enable left arrow clicked 
    enableLeftArrow = (_=>{this.#leftArrow.addEventListener('click',_=>{this.#moveScroll('backward')})});
    // enable right arrow clicked
    enableRightArrow = (_=>{this.#rightArrow.addEventListener('click',_=>{this.#moveScroll('forward')})});
    // enable index clicked
    enableIndexClick = (_=>{
        // add event for index click , change view order
        this.#items.forEach(e=>{
            e.index.addEventListener('click',_=>{
                this.#cleanActiveIndex();
                e.index.classList.add('active');
                let order = e.view.style.order;
                this.#items.forEach(e => {
                    e.view.style.order = this.#viewCount + 1 - order + Number(e.view.style.order) > this.#viewCount? 1 + Number(e.view.style.order) - order : this.#viewCount + 1 - order + Number(e.view.style.order);
                });
            });
        });
    });
    // enable auto move 
    enableAutoMove = (_=>{
        setInterval(_=>{
            this.#rightArrow.click();
        },4000);
    });

    // private methods
    // remove active from all index.
    #cleanActiveIndex = (_=>this.#items.forEach(e=>e.index.classList.remove('active')));
    // move view and move image from start to end (forward | backward)
    #moveScroll = (direction=>{
        // get item with order 1
        // get width 
        // margin left with width 
        // set timer to change order
        // set order = all view count +1
        // subtract -1 from all orders
        // change index
        let view = null;
        this.#items.forEach(e=>e.view.style.order === (direction==='forward'?'1':`${this.#viewCount}`) ? view = e.view : null);
        let viewwidth = view.width;
        direction==='forward'?view.style.marginLeft = viewwidth * -1+'px':view.style.marginRight = viewwidth * -1+'px';
        setTimeout(_=>{
            view.style.order = (direction==='forward'?this.#viewCount +1:0);
            direction==='forward'?view.style.marginLeft = 0+'px':view.style.marginRight = 0+'px';
            this.#items.forEach(e=>(direction==='forward'?e.view.style.order --:e.view.style.order ++));
            let index = null;
            this.#items.forEach(e=>e.view.style.order === '1' ? index = e.index : null);
            this.#cleanActiveIndex();
            index.classList.add('active');
        },(direction==='forward'?500:500));
    });
}

export default ImgScroller;