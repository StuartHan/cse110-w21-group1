

const { drainColor } = require("../source/Front-end/javascript/mainjest.js");

describe("drainColor testing", () => {

    test("before setting, should be empty string", () => {
        header = document.getElementById("header");
        footer = document.getElementById("footer");
        gear = document.getElementById("gear");

        expect(header.style.backgroundColor).toBe("");
        expect(footer.style.backgroundColor).toBe("");
        expect(gear.style.backgroundColor).toBe("");

    })

    test("should set style attribute", () => {
        header = document.getElementById("header");
        footer = document.getElementById("footer");
        gear = document.getElementById("gear");
        gear_img = "source/Front-end/css/assets/gearblack.png";

        drainColor();

        // after calling function
        expect(header.style.backgroundColor).toBe("grey");
        expect(header.style.color).toBe("black");
        expect(header.style.textShadow).toBe("0px 0px black");
        expect(footer.style.backgroundColor).toBe("grey");
        expect(gear.src).toEqual("http://localhost/" + gear_img);
    });
});