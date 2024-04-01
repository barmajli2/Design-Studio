let onloadProjects = ( ()=>{
    "use strict";
    let styleProjectGrid = (()=>{
        let gridCild = document.querySelectorAll('.project-grid-parent > .project-grid-child');
        let gridImgs = document.querySelectorAll('.project-grid-parent img');
        // get img heights in array and its index for track in itterates
        let imgHeights = Array.from(gridImgs).map(e=> e.height);
        let imgHeightIndex = 0;
        // gad between imgs and elements
        // this for trace height of columns in grid 
        let col1length = 0;
        let col2length = 0;

        Array.from(gridCild).forEach(e=>{
            if(imgHeightIndex < imgHeights.length) {
                if(col1length<=col2length) {
                    e.style.gridRow = `${col1length+1} / span ${Math.ceil(imgHeights[imgHeightIndex]/10)}`;
                    col1length += Math.ceil(imgHeights[imgHeightIndex++]/10);
                }
                else {
                    e.style.gridRow = `${col2length+1} / span ${Math.ceil(imgHeights[imgHeightIndex]/10)}`;
                    col2length += Math.ceil(imgHeights[imgHeightIndex++]/10);
                }
            }
            else {
                if(col1length<=col2length) {
                    e.style.gridRow = `${col1length+1} / span ${Math.abs(col1length - col2length)}`;
                    col1length += Math.abs(col1length - col2length);

                }
                else {
                    e.style.gridRow = `${col2length+1} / span ${Math.abs(col1length - col2length)}`;
                    col2length += Math.abs(col1length - col2length);
                }
            }
        });
        document.querySelector('.project-grid-parent').style.gridTemplateRows = `repeat(${col1length>col2length?col1length:col2length},auto)`;
    })();
});

window.addEventListener('load',onloadProjects);