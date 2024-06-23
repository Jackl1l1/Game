const dealWith = (arr, bgC, msg) => {
    // 清空背景原有的颜色
    bgC.fill(0)
    msg.length = 0


    const getLastNum = (index) => {
        if (arr.length < index) return -1
        return arr[arr.length - index]
    }
    const addGreen = (index) => {
        console.log(bgC)
        if (typeof index === typeof 1) {
            bgC[index]++
        }
        index.forEach(i => {
            if (i !== -1) {
                bgC[i]++
            }
        })
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
        return arr.filter(num => num >= 5).length
    }
    const countMinNum = () => {
        return arr.filter(num => num < 5).length
    }
    /**   规则
     * 开大压大开小压小
     * 10局以内出大7次以上压小
     * 10局以内出小7次以上压大
     */
    const rule1 = () => {
        if (arr.length !== 0) {
            if (countMaxNum() >= 7) {
                addGreenMin()
                msg.push("10局以内出大7次以上压小")
            } else if (countMinNum() >= 7) {
                addGreenMax()
                msg.push("10局以内出小7次以上压大")
            } else if (getLastNum(1) >= 5) {
                addGreenMax()
                msg.push("开"+getLastNum(1) +"压"+getLastNum(1) )
            } else if (getLastNum(1) < 5) {
                addGreenMin()
                msg.push("开"+getLastNum(1) +"压"+getLastNum(1) )

            }
        }
    }
    rule1()

    /**   规则
     * 出5/0后第4局出0/5，没有出会第8局出0/5
     * 提醒：连续多少次未出0/5
     */
    const rule2 = () => {
        let count0 = Math.min(10 - arr.lastIndexOf('0'), arr.length);
        let count5 = Math.min(10 - arr.lastIndexOf('5'), arr.length);
        let count = count0 > count5 ? [count0, 0] : [count5, 5];
        if (count[0] >= 8) {
            addGreen05()
            msg.push("连续" + count[0] + "次未出" + count[1] + " 必 压 0 5")
        } else if (count[0] === 4 && arr.length !== 4) {
            addGreen05()
            msg.push("第" + count[0] + "次未出" + count[1] + " 建议 压 0 5")
        }
        msg.push("提醒: 连续" + count0 + "次未出" + 0)
        msg.push("提醒: 连续" + count5 + "次未出" + 5)

    }
    rule2()

    /** 规则
     * 1.组合1/3/4/7
     * 2.组合2/9/8/6
     * 3.组合2/5/8/0
     * 4.组合1/4/7
     * 5.组合3/6/9
     */
    const rule3 = () => {
        const numSets = [
            ['1', '3', '4', '7'],
            ['2', '9', '8', '6'],
            ['2', '5', '8', '0'],
            ['3', '6', '9']
        ];
        for (let i = 0; i < numSets.length; i++) {
            if (numSets[i].includes(getLastNum(1).toString())) {
                addGreen(numSets[i]);
                msg.push("组合 " + numSets[i].join(","));
            }
        }
    }
    rule3()

    /** 规则
     * 1.出A后面第4,5个也是A
     */
    const rule4 = () => {
        if (arr.length > 3) {
            addGreen([getLastNum(3)])
            msg.push("注意单押 " + getLastNum(3) + " +组合")
            addGreen([getLastNum(4)])
            msg.push("注意单押 " + getLastNum(4) + " +组合")
        }
    }
    rule4()

}
