let createProjectInfo = {
    github(_api) {
        return _api
    },
    scratch(_api) {
        
    },
    youtube(_api) {
        
    }
}
function StringToHTML(_string) {
    return new DOMParser().parseFromString(_string, "text/html");
}
function roughScale(x, base) {
    const parsed = parseInt(x, base);
    if (isNaN(parsed)) { return 0; }
    return parsed;
}
function addProjectBox(_InsertPosition, _projectHeader, _projects) {
    document.querySelector(".content").insertAdjacentHTML(_InsertPosition, create_projectBox(_projectHeader, _projects))
}
function createProject(_projects) {
    let rem = `<a class="text-decoration-none" href="${_projects._link}">
    <div class="project overflow-hidden">
        <div class="project-header centerText">
            ${_projects._projectHeader}
        </div>
        <div class="project-content display-flex">
            <img src="${_projects._projectContentImageLink}" alt="${_projects._projectContentImageLinkAlt}">
        </div>                    
    </div>
</a>`
    return rem;
}
/** Gives you a sting */
let projectCountId = 0
function create_projectBox(_projectHeader, _projects) {
    projectCountId++

    let rem = `<div class="bigBox projectBox box-shadow">
    <div class="bigBox-header centerText">
        <h3 class="noMargin">${_projectHeader}</h3>
    </div>
    <div class="bigBox-content display-flex width100per">
        <button class="projectButton projectButton-left" onclick="
            let remA = document.querySelector('.projectCountIdA${projectCountId}')
            let leftA = roughScale(remA.style.left.slice(0, remA.style.left.length -2), 10)
            if (leftA < 0) {
                remA.style.left = (leftA + 170) + 'px'   
            }
        "></button>
        <div class="slideBox-list overflow-hidden width100per projectCountIdB${projectCountId}">
            <div class="slideBox-track projectCountIdA${projectCountId}">


            </div helper="over HERE">
        </div>
        <button class="projectButton projectButton-right" onclick="
            let remB = document.querySelector('.projectCountIdA${projectCountId}')
            let leftB = roughScale(remB.style.left.slice(0, remB.style.left.length -2), 10)
            if (leftB > ((document.querySelector('.projectCountIdA${projectCountId}').children.length * -170) + document.querySelector('.projectCountIdB${projectCountId}').getBoundingClientRect().width)) {
                remB.style.left = (leftB - 170) + 'px'   
            }
        "></button>
    </div>
</div>`
    for (let i = 0; i < _projects.length; i++) {
        rem = addInArray(rem, createProject(_projects[i]), (rem.indexOf('</div helper="over HERE">')))
    }
    console.log(rem)
    return rem
}
function addInArray(_array, _element, _InsertPosition) {
    return("".concat(_array.slice(0, _InsertPosition), _element, _array.slice(_InsertPosition, _array.length)))
}