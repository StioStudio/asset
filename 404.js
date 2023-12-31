/**
 * Use the url you are on now to show the files
 * So https://asset.stio.studio/logo/stio/ would show 404, transperent and white
 * Making this to a file system
 * Or the path will open to the link.
 * And lets you click on a link symbol on the side of the path that makes the url to that path.
 */
function jsonToFileSystem(_json) {
    let rem = _json.tree
    
    let file = []
    rem.forEach(e => {
        file.push(e.path.split("/"))
    });
    
    console.log(file)
}
function addFile(_path){
    let rem = document.createElement("div")
    rem.classList.add("file")
    let b = document.createElement("a")
    b.href = "/" + _path.path
    b.innerText = _path.path.split("/")[_path.path.split("/").length - 1]
    let a = document.createElement("div")
    a.innerText = _path.type
    rem.append(a)
    rem.append(b)
    rem.append(document.createElement("br"))
    rem.style.marginLeft = (_path.path.split("/").length -1) * 50 + "px"
    rem.style.marginBottom = "10px"
    document.querySelector(".files").append(rem)
}
let rem = await(await fetch("https://api.github.com/repos/stiostudio/asset/git/trees/main?recursive=1")).json()
jsonToFileSystem(rem)
if (rem.truncated != undefined) {
    for (let i = 0; i < rem.tree.length; i++) {
        addFile(rem.tree[i])
    }
}
else {
    console.log("error")
}