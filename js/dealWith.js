const dealWith = (arr, bgC, msg,hotMun) => {
    // 清空背景原有的颜色
    bgC.fill(0)
    msg.length = 0

    const getLastNum = (index) => {
        if (arr.length < index) return -1
        return arr[arr.length - index]
    }
    const addGreen = (index) => {
        if (typeof index === typeof '') {
            index = parseInt(index)
        }
        if (index === -1) {
        } else if (typeof index === typeof 1) {
            bgC[index]++
        } else {
            index.forEach(i => {
                if (i !== -1) {
                    bgC[i]++
                }
            })
        }
    }
    const addGreenMin = () => {
        addGreen([0, 1, 2, 3, 4])
    }
    const addGreenMax = () => {
        addGreen([5, 6, 7, 8, 9])
    }
    const addGreen05 = () => {
        addGreen([0, 5])
    }
    const countMaxNum = () => {
        return arr.slice(-10).filter(num => num >= 5).length
    }
    const countMinNum = () => {
        return arr.slice(-10).filter(num => num < 5).length
    }

    /**
     * 后1位热出  例如34538  8，8是开的数字，这局压的8和3
     */
    if (hotMun!==-1){
        addGreen(hotMun)
        msg.push("热号是："+hotMun)
    }

    /**   规则
     * 出5/0后第4局出0/5，没有出会第8局出0/5
     * 提醒：连续多少次未出0/5
     */
    let count0 = arr.length - arr.lastIndexOf('0') - 1
    let count5 = arr.length - arr.lastIndexOf('5') - 1
    let countL = count0 > count5 ? [count0, 0] : [count5, 5];
    let countR = count0 < count5 ? [count0, 0] : [count5, 5];
    if (count0 > 4) {
        msg.push("提醒: 连续" + count0 + "次未出" + 0)
    }
    if (count5 > 4) {
        msg.push("提醒: 连续" + count5 + "次未出" + 5)
    }
    if (countR[0] >= 8) {
        addGreen05()
        addGreen05()
        addGreen05()
        // 连续8次未出 0或5, 必压 0 5
        msg.push("连续" + countR[0] + "次未出 0或5, 必压 0 5")
    } else if (countL[0] === 4 && arr.length !== 4) {
        addGreen05()
        addGreen05()
        addGreen05()
        msg.push("第" + countL[0] + "次未出 0 5 建议 压 0 5")
    }
    /**
     * 出5/0中的一个，下局出0/5必须加上带3局配上常规，例如0285
     */
    if (count0 !== count5 && countR[0] <= 2) {
        addGreen05()
        msg.push(++countR[0] + "局以内出了" + countR[1] + " 下" + (4 - countR[0]) + "局带上 0 5")
    }


    /**   规则
     * 开大压大开小压小
     * 10局以内出大7次以上压小
     * 10局以内出小7次以上压大
     */
    if (arr.length !== 0) {
        if (countMaxNum() >= 7) {
            addGreenMin()
            msg.push("10局以内出大7次以上压小")
        } else if (countMinNum() >= 7) {
            addGreenMax()
            msg.push("10局以内出小7次以上压大")
        } else if (getLastNum(1) >= 5) {
            addGreen(getLastNum(1))
            msg.push(getLastNum(1) + "压" + getLastNum(1) + "大")
        } else if (getLastNum(1) < 5) {
            addGreen(getLastNum(1))
            msg.push(getLastNum(1) + "压" + getLastNum(1) + "小")

        }
    }


    /** 规则
     * 1.组合1/3/4/7
     * 2.组合2/9/8/6
     * 3.组合2/5/8/0
     * 4.组合1/4/7
     * 5.组合3/6/9
     */
    const numSets = [
        ['1', '3', '4', '7'],
        ['2', '9', '8', '6'],
        ['2', '5', '8', '0'],
        ['3', '6', '9']
    ]
    const addGroup = (num) => {
        s =[]
        for (let i = 0; i < numSets.length; i++) {
            if (numSets[i].includes(num.toString())) {
                addGreen(numSets[i]);
                // msg.push("组合：" + numSets[i].join(","));
                s.push(numSets[i].join(","))
            }
        }
        return s.join(" | ")
    }

    for (let i = 0; i < numSets.length; i++) {
        if (numSets[i].includes(getLastNum(1).toString())) {
            addGreen(numSets[i]);
            msg.push("组合：" + numSets[i].join(","));
        }
    }
    /** 规则
     * 1.出A后面第4,5个也是A
     */

    if (getLastNum(3) !== -1) {
        let n3 = getLastNum(3)
        let n4 = getLastNum(4)
        console.log(n3)
        console.log(n4)
        addGreen([n3, n4])
        if (n3 === n4) {
            addGroup(n3)
            msg.push("注意单押 " + n3 + " +组合" +addGroup(n3))

        } else if (n4 !== -1) {
            msg.push("注意单押 " + n3 + " +组合" +addGroup(n3))
            msg.push("注意单押 " + n4 + " +组合"+addGroup(n4))
        }
    }

}
