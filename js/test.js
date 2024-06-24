function getIndicesInOrder(arr) {
    let res = []
    arr = arr.slice()
    let sortedArr = arr.slice().sort((a, b) => b - a)

    for (let num of sortedArr) {
        let index = arr.indexOf(num)
        res.push(index)
        arr[index] = -1
    }
    return res
}

arr = [0, 2, 0, 1, 1, 0, 0, 1, 0, 0]
res = getIndicesInOrder(arr.slice())
console.log(arr)
console.log(res)

//希望返回 1,3,4,7,0,2,5,6,8,9
// 结果返回[1, 3, 3, 3, 0, 0, 0, 0, 0, 0 ]