

const { SwitchToChinese } = require("../source/Front-end/javascript/mainjest.js")


describe("switchToChinese testing", () => {
    test("test", () => {

        SwitchToChinese();

        // Login- 1st page
        expect(document.getElementById("heytitle").innerHTML).toBe("嗨！");
        expect(document.getElementById("lookstitle").innerH).toBe("您还未登陆");
        expect(document.getElementById("guestCont").innerHTM).toBe("访客使用");
        expect(document.getElementById("loginCont").innerHTM).toBe("登陆");
        expect(document.getElementById("notifCreate").innerHTM).toBe("创建账号");
        expect(document.getElementById("createTitle").innerHTML).toBe("创建账号");
        // Login - login
        expect(document.getElementById("logintitle").innerHTML).toBe("登陆");
        expect(document.getElementById("usertext").innerHTML).toBe("用户名");
        expect(document.getElementById("passtext").innerHTML).toBe("密码");
        expect(document.getElementById("proceedLogin").innerHTML).toBe("登陆");
        expect(document.getElementById("createAccInstead").innerHTML).toBe("去注册");
        // Login - create account
        expect(document.getElementById("emailtext").innerHTML).toBe("邮箱");
        expect(document.getElementById("createPassText").innerHTML).toBe("密码");
        expect(document.getElementById("nameText").innerHTML).toBe("用户名");
        expect(document.getElementById("switchToLogin").innerHTML).toBe("去登陆");
        expect(document.getElementById("createAcc").innerHTML).toBe("注册");
        //document.getElementById("welcome").innerHTML = "欢迎使用");
        expect(document.getElementById("workText").innerHTML).toBe("工作时段");
        expect(document.getElementById("ShortBreakText").innerHTML).toBe("较短休息时段");
        expect(document.getElementById("LongBreakText").innerHTML).toBe("较长休息时段");
        expect(document.getElementById("start-btn").innerHTML).toBe("开始计时");
        expect(document.getElementById("settingsTitle").innerHTML).toBe("设置");
        expect(document.getElementById("WorkTimeTitle").innerHTML).toBe("工作时段时间(分钟)：");
        expect(document.getElementById("ShortBreakTitle").innerHTML).toBe("较短休息时段(分钟）：");
        expect(document.getElementById("LongBreakTitle").innerHTML).toBe("较长休息时段(分钟）：");
        expect(document.getElementById("languageTitle").innerHTML).toBe("语言：");
        expect(document.getElementById("LongBreakInterval").innerHTML).toBe("较长休息时段区间：");
        expect(document.getElementById("sound-select").innerHTML).toBe("铃声：");
        expect(document.getElementById("Bell").innerHTML).toBe("闹钟");
        expect(document.getElementById("BigBen").innerHTML).toBe("大本钟");
        expect(document.getElementById("Temple").innerHTML).toBe("教堂（低频）");
        expect(document.getElementById("colorblindtitle").innerHTML).toBe("色盲模式：");
        expect(document.getElementById("statistics").innerHTML).toBe("统计");
        expect(document.getElementById("saveSettings").innerHTML).toBe("保存");
        expect(document.getElementById("statisticsTitle").innerHTML).toBe("统计数据");
        expect(document.getElementById("statsCong").innerHTML).toBe("继续加油吧！");
        expect(alertTime).toBe("请输入1到120的整数。");
        expect(alertIntv).toBe("请输入1到10的整数");
        // Doge Shop
        expect(document.getElementById("dogeTitle").innerHTML).toBe("Doge 商店");
        expect(document.getElementById("themeTitle").innerHTML).toBe("主题");
        expect(document.getElementById("preview").innerHTML).toBe("点击预览");
        expect(document.getElementById("select").innerHTML).toBe("购买/选择");
        expect(document.getElementById("wildjungletitle").innerHTML).toBe("原始森林");
        expect(document.getElementById("junglecost").innerHTML).toBe("免费");
        expect(document.getElementById("nightmodetitle").innerHTML).toBe("夜间模式");
        expect(document.getElementById("nightcost").innerHTML).toBe("免费");
        expect(document.getElementById("aquatictitle").innerHTML).toBe("深海");
        expect(document.getElementById("aquaticcost").innerHTML).toBe("50金币");
        expect(document.getElementById("sanfranciscotitle").innerHTML).toBe("旧金山");
        expect(document.getElementById("sanfranciscocost").innerHTML).toBe("100金币");
        expect(document.getElementById("dogelandtitle").innerHTML).toBe("Doge天地");
        expect(document.getElementById("dogecost").innerHTML).toBe("倾家荡产");
        expect(document.getElementById("dogebuy").innerHTML).toBe("购买");
        expect(document.getElementById("dogeSave").innerHTML).toBe("关闭");
        expect(document.getElementById("insufficientText").innerHTML).toBe("金币不足");

    })

})