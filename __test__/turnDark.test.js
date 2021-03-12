
const { turnDark, color } = require("../source/Front-end/javascript/mainjest.js");

describe("turnDark testing", () => {
    test("test", () => {

        turnDark();

        expect(document.getElementById("header").style.backgroundColor).toBe("rgba(102, 102, 102, 0.4)");
        expect(document.getElementById("main").style.backgroundColor).toBe("rgba(102, 102, 102, 0.4)");
        expect(document.getElementById("footer").style.backgroundColor).toBe("rgba(102, 102, 102, 0.4)");
        // expect(color).toBe("rgba(102, 102, 102, 0.4)");
    })

})