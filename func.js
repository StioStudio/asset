let cookie = {
    get(_key, _cookie = document.cookie) {
        let rem = _cookie
        rem = rem.slice(document.cookie.indexOf(`${_key}=`)+_key.length+1, document.cookie.length)
        // console.log(rem)
        if(rem.includes(";")) {
            return document.cookie.slice(document.cookie.indexOf(`${_key}=`)+_key.length+1, rem.indexOf(";")+document.cookie.length-rem.length)
        }
        else {
            return document.cookie.slice(document.cookie.indexOf(`${_key}=`)+_key.length+1, document.cookie.length)
        }    
    },
    set(_key, _value) {
        // console.log(`${_key}=${_value};domain=${window.location.hostname}`)
        document.cookie = `${_key}=${_value};domain=${window.location.hostname}`
    }
}
let i18n = {
    async setLanguage(_lang = "en") {
        this.language = _lang;
        this.languageMsg = await (await fetch(`./locales/${this.language}/messages.json`)).json()
    },
    getMessage(_msg, _get = "message") {
        let rem = ""
        try {
            rem = this.languageMsg[_msg][_get]
        } catch (error) {
            rem = ""
        }
        return (rem)
    },
    getPreferedLanguage() {
        return (document.documentElement.lang)
    },
    tranlated: 0,
    tranlatePage(_doc) {
        document.querySelectorAll("tra").forEach(e => {
            // console.log(e.cloneNode(true));
            e.style.display = "content";
            if(this.tranlated == 0) {
                e.setAttributeNS("tra", "tra", `${e.innerHTML}`)
                // console.log(e)
                e.innerHTML = this.getMessage(e.innerHTML)
            }
            else {
                // console.log(e)
                e.innerHTML = this.getMessage(e.getAttribute("tra"))
            }
        });
        this.tranlated++
    },
    language: "en",
    languageMsg: {},
    getTra(_document = document) {
        let tra = _document.querySelectorAll("tra")
        let rem = []
        tra.forEach(e => {
            rem.push(e.innerHTML)
        });
        return rem
    },
    createMessagesJSON(_document = document) {
        let tra = this.getTra(_document)
        let rem = {}
        tra.forEach(e => {
            rem[e] = {message: e}
        });
        return rem
    }
}
i18n.language = i18n.getPreferedLanguage()

async function translationSetup(_tranlatePage = false) {
    let rem = cookie.get("language")
    console.log(rem)
}
function StringToDoc(_string) {
    return new DOMParser().parseFromString(`_string`, "text/html")
}
function idGoTo(_id) {
    let rem = document.querySelector(_id)
    setActive(document.querySelector(`${_id} .bigBox-header a`))
    rem.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
}
function contentCreate(_info) {
    for (let i = _info.length - 1; i > -1; i--) {
        addProjectBox(_info[i][0]._InsertPosition, _info[i][0]._projectBoxHeader, _info[i][0]._id, _info[i][0]._class, _info[i][1])
    }
    if (document.location.hash != "") {
        idGoTo(document.location.hash)
    }
    document.querySelectorAll(".bigBox-header a").forEach((_element) => {
        _element.addEventListener("click", () => {
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
function addProjectBox(_InsertPosition, _projectHeader, _id, _class, _projects) {
    document.querySelector(".content").insertAdjacentHTML(_InsertPosition, create_projectBox(_projectHeader, _projects, _id, _class))
}
function createProject(_projects) {
    let fontSize = 17
    if (_projects._projectHeader.length > 14+(11 * _projects._projectHeader.includes("<tra>")) && _projects._projectType == "A") {
        fontSize = 15
    }
    if (_projects._projectHeader.length > 20+(11 * _projects._projectHeader.includes("<tra>")) && _projects._projectType == "A") {
        fontSize = 9
    }
    if (_projects._projectType == "C") {
        fontSize = 50
    }
    if (_projects._projectHeader.length > 5+(11 * _projects._projectHeader.includes("<tra>")) && _projects._projectType == "C") {
        fontSize = 35
    }
    if (_projects._projectHeader.length > 7+(11 * _projects._projectHeader.includes("<tra>")) && _projects._projectType == "C") {
        fontSize = 30
    }
    if (_projects._projectHeader.length > 10+(11 * _projects._projectHeader.includes("<tra>")) && _projects._projectType == "C") {
        fontSize = 20
    }
    if (_projects._projectHeader.length > 15+(11 * _projects._projectHeader.includes("<tra>")) && _projects._projectType == "C") {
        fontSize = 15
    }
    let rem = `<a class="projectType-${_projects._projectType} text-decoration-none" href="${_projects._link}">
    <div class="project overflow-hidden">
        <div class="project-header centerText overflow-overlay" style="font-size: ${fontSize
        }px">
            ${_projects._projectHeader}
        </div>
        <div class="project-content display-flex">
            ${_projects._projectContentImageLink == undefined || `<img src="${_projects._projectContentImageLink}" alt="${_projects._projectContentImageLinkAlt}">`}
        </div>                    
    </div>
</a>`
    return rem;
}
/** Gives you a sting */
let projectCountId = 0
function create_projectBox(_projectHeader, _projects, _id, _class = "") {
    projectCountId++
    let rem = `<div id="${_id}" class="bigBox projectBox box-shadow overflow-hidden ${_class}">
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
    return ("".concat(_array.slice(0, _InsertPosition), _element, _array.slice(_InsertPosition, _array.length)))
}

function Notification() {

}