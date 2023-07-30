function addFile(_path){
    let rem = document.createElement("div")
    let a = document.createElement("a")
    a.href = _path
    a.innerText = _path
    rem.append(a)
    rem.append(document.createElement("br"))
    document.querySelector(".files").append(rem)
}
let rem = await(await fetch("https://api.github.com/repos/stiostudio/assets/git/trees/main?recursive=1")).json()
if (rem.truncated != undefined) {
    console.log(rem)
    for (let i = 0; i < rem.tree.length; i++) {
        addFile(rem.tree[i].path)
    }
}
else {
    console.log("error")
}
