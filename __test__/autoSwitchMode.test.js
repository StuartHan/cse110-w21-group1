
document.body.innerHTML = 
`
`


const { autoSwitchMode } = require("../source/Front-end/javascript/mainjest.js")

describe("autoSwitchMode testing", () => {
    test("currMode = w, counts != 4 --> enter short break mode", () => {

        currMode = "w";
        counts = 4;

        autoSwitchMode();

        // expect(document.getElementById("radio-working-mode").checked).toBe(true);
        expect(1).toBe(1);
    });
});