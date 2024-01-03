let mainDomain = document.location.hostname
mainDomain = mainDomain.split(".")
if (mainDomain.length > 1) {
    mainDomain = `${mainDomain[mainDomain.length - 2]}.${mainDomain[mainDomain.length - 1]}`
}
else {
    mainDomain = document.location.hostname
}
const info = {
    get themes() {
        return {doc: document.documentElement.getAttribute("data-theme"), cookie: cookie.get("themes")};
    },
    set themes(setter) {
        document.documentElement.setAttribute("data-theme", setter);
        cookie.set("themes", setter);
    }
}
function basicSetup(){
    document.documentElement.setAttribute("data-theme", cookie.get("themes"))
}
async function lastUpdated({owner = "StioStudio", repo = "StioStudio.github.io", path = window.location.pathname, autoHTML = true, append = true}) {
    try {
        return await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?path=${path}&per_page=1`)
        .then(response => response.json())
        .then(data => {
            if(append) {
                const lastCommitDate = new Date(data[0].commit.author.date).toLocaleString();
                document.querySelector(".last-updated").innerHTML = (`<tra>Last Updated: </tra><time datetime="${lastCommitDate}">${lastCommitDate}</time>`);
            }
            if (autoHTML) {
                const lastCommitDate = new Date(data[0].commit.author.date).toLocaleString();
                return (`<tra>Last Updated: </tra><time datetime="${lastCommitDate}">${lastCommitDate}</time>`);
            }
            else {
                return new Date(data[0].commit.author.date).toLocaleString();
            }
        })
    } catch (error) {
        if(append) {
            document.querySelector(".last-updated").innerHTML = (`<tra>Last Updated: </tra><time datetime="ERROR getting date">ERROR getting date</time>`);
        }
        if (autoHTML) {
            return (`<tra>Last Updated: </tra><time datetime="ERROR getting date">ERROR getting date</time>`);
        }
        else {
            return "ERROR getting date";
        }
    }
}
const cookie = {
    get(name) {
        const cookies = document.cookie.split(';').map(cookie => cookie.trim())
        for (const cookieString of cookies) {
            const [cookieName, cookieValue] = cookieString.split('=')
            if (cookieName === name) {
                return decodeURIComponent(cookieValue)
            }
        }
        return null
    },
    set(name, value, { expires = false, domain = mainDomain, path = false, secure = false } = {}) {
        let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
        if (expires instanceof Date) {
            cookieString += `; expires=${expires.toUTCString()}`
        }
        if (domain) {
            cookieString += `; domain=${domain}`
        }
        if (path) {
            cookieString += `; path=${path}`
        }
        if (secure) {
            cookieString += `; secure`
        }
        document.cookie = cookieString
    },
    get raw() {
        return document.cookie;
    },
    get array(){
        let rem = []
        const cookies = document.cookie.split(';').map(cookie => cookie.trim())
        for (const cookieString of cookies) {
            const [cookieName, cookieValue] = cookieString.split('=')
            rem.push({cookieName, cookieValue})
        }
        return rem
    },
    get object(){
        let rem = {}
        const cookies = document.cookie.split(';').map(cookie => cookie.trim())
        for (const cookieString of cookies) {
            const [cookieName, cookieValue] = cookieString.split('=')
            rem[`${cookieName}`] = cookieValue
        }
        return rem
    },
}
let i18n = {
    async setLanguage(_lang = "en", _localesDir = "./locales/") {
        this.language = _lang;
        this.languageMsg = await (await fetch(`${_localesDir}${this.language}/messages.json`)).json()
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
    getPreferredLanguage() {
        return (document.documentElement.lang)
    },
    translated: 0,
    translatePage(_doc) {
        document.querySelectorAll("tra").forEach(e => {
            // console.log(e.cloneNode(true));
            e.style.display = "content";
            if(this.translated == 0) {
                e.setAttributeNS("tra", "tra", `${e.innerHTML}`)
                // console.log(e)
                e.innerHTML = this.getMessage(e.innerHTML)
            }
            else {
                // console.log(e)
                e.innerHTML = this.getMessage(e.getAttribute("tra"))
            }
        });
        this.translated++
    },
    resetTranslations() {
        if (this.translated == 0) {
            console.error("Have not been translated yet")
        }
        document.querySelectorAll("tra").forEach(e => {
            // e.setAttributeNS("tra", "tra", `${e.innerHTML}`)
            // console.log(e)
            e.innerHTML = e.getAttribute("tra")
        });
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
    createMessagesJSON({_oldJSON = {}, _document = document} = {}) {
        let tra = this.getTra(_document)
        let rem = _oldJSON
        tra.forEach(e => {
            if(rem[e] == undefined) {
                rem[e] = {message: e}
                console.log(rem[e])
            }
        });
        return rem
    }
}
i18n.language = i18n.getPreferredLanguage()

async function translationSetup({_translatePage = true, _localesDir = "./locales/"} = {}) {
    let rem = cookie.get("language")
    if(rem != null) {
        await i18n.setLanguage(rem, _localesDir)
        if(_translatePage) {
            i18n.translatePage()
        }
    }
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
        addProjectBox(_info[i][0]._type, _info[i][0]._projectBoxHeader, _info[i][0]._id, _info[i][0]._class, _info[i][1])
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
function addProjectBox(_type, _projectHeader, _id, _class, _projects) {
    document.querySelector(".content").insertAdjacentHTML("afterBegin", create_projectBox(_type, _projectHeader, _projects, _id, _class))
}
function createProject(_type, _projects) {
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
    let rem;
    if(_type == "A") {
        let remB = ""
        if(_projects._projectContentImageLink != undefined) {
            remB = `<img src="${_projects._projectContentImageLink}" alt="${_projects._projectContentImageLinkAlt}">`
        }
        rem = `<a class="projectType-${_projects._projectType} text-decoration-none" href="${_projects._link}">
    <div class="project overflow-hidden">
        <div class="project-header centerText overflow-overlay" style="font-size: ${fontSize
        }px">
            ${_projects._projectHeader}
        </div>
        <div class="project-content display-flex">
            ${remB}
        </div>                    
    </div>
</a>`
    }
    if(_type == "B") {
        let remB = ""
        if(_projects._projectContentImageLink != undefined) {
            remB = `<img src="${_projects._projectContentImageLink}" alt="${_projects._projectContentImageLinkAlt}">`
        }
        rem = `<a class="projectType-${_projects._projectType} text-decoration-none" href="${_projects._link}">
    <div class="project overflow-hidden">
        <div class="project-header centerText overflow-overlay" style="font-size: ${fontSize
        }px">
            ${_projects._projectHeader}
        </div>
        <div class="project-content display-flex">
            ${remB}
        </div>                    
    </div>
</a>`
    }
    return rem;
}
/** Gives you a sting */
let projectCountId = 0
function create_projectBox(_type, _projectHeader, _projects, _id, _class = "") {
    projectCountId++

    let projectHeader = ""
    if(_projectHeader != undefined) {
        projectHeader = `<div class="bigBox-header centerText">
        <h3 class="noMargin">${_projectHeader}</h3>
        <a class="anchorjs-link" href="#${_id}"></a>
    </div>`
    }
    if(_type == "A") {
        let rem = `<div id="${_id}" class="type-${_type} bigBox projectBox box-shadow overflow-hidden ${_class}">
        ${projectHeader}
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
            rem = addInArray(rem, createProject(_type, _projects[i]), (rem.indexOf('</div helper="over HERE">')))
        }
        // console.log(rem)
        return rem
    }
    if(_type == "B") {
        let projectHeader = ""
        if(_projectHeader != undefined) {
            projectHeader = `<div class="bigBox-header centerText">
            <h3 class="noMargin">${_projectHeader}</h3>
            <a class="anchorjs-link" href="#${_id}"></a>
        </div>`
        }

        let rem = `
<div id="${_id}" class="type-${_type} bigBox projectBox box-shadow ${_class} projectCountIdA${projectCountId}">
    ${projectHeader}

</div helper="over HERE">`

        for (let i = 0; i < _projects.length; i++) {
            rem = addInArray(rem, createProject(_type, _projects[i]), (rem.indexOf('</div helper="over HERE">')))
        }
        // console.log(rem)
        return rem
    }
}
function addInArray(_array, _element, _InsertPosition) {
    return ("".concat(_array.slice(0, _InsertPosition), _element, _array.slice(_InsertPosition, _array.length)))
}

function Notification() {

}