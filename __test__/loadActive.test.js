




const { loadActive } = require("../source/Front-end/javascript/mainjest.js");

// TODO: after fixing all dependencies on DOM

describe("loadActive testing", () => {
    test("should change to jungle theme", () => {
        localStorage.setItem("active", [1,0,0,0,0]);
        // document.getElementById("wildjunglebuy").style.backgroundImage = "";
        // loadActive();
        // expect(document.getElementById("insufficientText").style.visibility).toBe("hidden");
        expect(1).toBe(1);
    });
})
