function add (_list, _num, _place){
    return [].concat(_list.slice(0, _place), [_num], _list.slice(_place, _list.length))
}
function sort(_list) {
    let a = _list
    let b = []
    
    let higest = a[a.length - 1]
    let lowest = a[a.length - 1]
    let length = a.length
    for (let i = 0; i < length; i++) {
        let rem = a.pop()
        if (rem <= lowest) {
            lowest = rem
        }
        if (higest <= rem) {
            higest = rem

        }
        let e = Math.ceil(rem/higest*b.length)
        if (e == NaN) {
            e = 0
        }
        // console.log(rem, b[e], e)
        console.log(
                "a: ", a, "\n",
                "b: ", b, "\n",
                "rem: ", rem, "\n",
                "e: ", e, "\n",
                "length: ", length, "\n",
                "lowest: ", lowest, "\n",
                "higest", higest, "\n",    
        )
        const loop = () => {
            if (b[e] > rem)
            b = add(b, rem, e)
            return
            console.log(e)
            if (rem < b[e]) {
                e--
                loop()
            }
            if (rem > b[e]) {
                e++
                loop()
            }
            else {
            }
        }
        loop()
        console.log(
                "a: ", a, "\n",
                "b: ", b, "\n",
                "rem: ", rem, "\n",
                "e: ", e, "\n",
                "length: ", length, "\n",
                "lowest: ", lowest, "\n",
                "higest", higest, "\n",    
        )
    }
    return b
}
console.log(sort([100, 52, 1, 200, 32, 52, 0]))