import ImgScroller from './ImgScroller.js';
import VerticalTemplateBilder from './VerticalTemplateBilder.js';

let onloadPage = (_=>{
    let projects = new VerticalTemplateBilder('#projectsGalary',10);
    projects.setGridColumn({'0':1,'576':2});
    projects.enableVWevent();
    let otherProjects = new ImgScroller('#otherProjectScroll');
    otherProjects.enableLeftArrow();
    otherProjects.enableRightArrow();
    otherProjects.enableIndexClick();
    otherProjects.enableAutoMove();
});

window.addEventListener('load',onloadPage);