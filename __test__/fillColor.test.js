


const { fillColor } = require("../source/Front-end/javascript/mainjest.js");

describe("fillColor testing", () => {
    test("before setting, should be empty string", () => {
        header = document.getElementById("header");
        footer = document.getElementById("footer");
        gear = document.getElementById("gear");

        expect(header.style.backgroundColor).toBe("");
        expect(header.style.color).toBe("");
        expect(header.style.textShadow).toBe("");
        expect(footer.style.backgroundColor).toBe("");
    });

    test("should set style attribute", () => {
        header = document.getElementById("header");
        footer = document.getElementById("footer");
        gear = document.getElementById("gear");
        gear_img = "source/Front-end/css/assets/Geartransparent.png";

        fillColor();

        // after calling function
        expect(header.style.backgroundColor).toBe("rgba(3, 165, 89, 0.6)");
        expect(header.style.color).toBe("white");
        expect(header.style.textShadow).toBe("2px 2px black");
        expect(footer.style.backgroundColor).toBe("rgba(3, 165, 89, 0.6)");
        expect(gear.src).toBe("http://localhost/" + gear_img);
    });
});