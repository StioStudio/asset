function idGoTo(_id) {
    let rem = document.querySelector(_id)
    setActive(document.querySelector(`${_id} .bigBox-header a`))
    rem.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
}
function contentCreate(_info) {
    for (let i = _info.length - 1; i > -1; i--) {
        addProjectBox(_info[i][0]._InsertPosition, _info[i][0]._projectBoxHeader, _info[i][0]._id, _info[i][1])
    }
    idGoTo(document.location.hash)
    document.querySelectorAll(".bigBox-header a").forEach((_element)=>{
        _element.addEventListener("click", ()=>{
            setActive(_element)
        })
    })
}
let active = undefined
function setActive(_element) {
    if (active != undefined) {
        active.classList.remove("active")
    }
    active = _element
    _element.classList.add("active")    
}
function StringToHTML(_string) {
    return new DOMParser().parseFromString(_string, "text/html");
}
function roughScale(x, base) {
    const parsed = parseInt(x, base);
    if (isNaN(parsed)) { return 0; }
    return parsed;
}
function addProjectBox(_InsertPosition, _projectHeader, _id, _projects) {
    document.querySelector(".content").insertAdjacentHTML(_InsertPosition, create_projectBox(_projectHeader, _projects, _id))
}
function createProject(_projects) {
    let fontSize = 17
    if (_projects._projectHeader.length > 14 && _projects._projectType == "A") {
        fontSize = 15
    }
    if (_projects._projectHeader.length > 20 && _projects._projectType == "A") {
        fontSize = 9
    }
    if (_projects._projectType == "C") {
        fontSize = 50
    }
    if (_projects._projectHeader.length > 5 && _projects._projectType == "C") {
        fontSize = 35
    }
    if (_projects._projectHeader.length > 7 && _projects._projectType == "C") {
        fontSize = 30
    }
    if (_projects._projectHeader.length > 10 && _projects._projectType == "C") {
        fontSize = 25
    }
    if (_projects._projectHeader.length > 15 && _projects._projectType == "C") {
        fontSize = 15
    }
    let rem = `<a class="projectType-${_projects._projectType} text-decoration-none" href="${_projects._link}">
    <div class="project overflow-hidden">
        <div class="project-header centerText overflow-overlay" style="font-size: ${
            fontSize
        }px">
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
function create_projectBox(_projectHeader, _projects, _id) {
    projectCountId++
    let rem = `<div id="${_id}" class="bigBox projectBox box-shadow overflow-hidden">
    <div class="bigBox-header centerText">
        <h3 class="noMargin">${_projectHeader}</h3>
        <a class="anchorjs-link" href="#${_id}"></a>
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
    // console.log(rem)
    return rem
}
function addInArray(_array, _element, _InsertPosition) {
    return("".concat(_array.slice(0, _InsertPosition), _element, _array.slice(_InsertPosition, _array.length)))
}