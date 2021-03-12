
const { updateTable } = require("../source/Front-end/javascript/mainjest.js");

describe("updateTable testing", () => {
    let counter = document.getElementById("counter");
    let workPhase = document.getElementById("workPhase");
    let longBreak = document.getElementById("longBreak");
    let shortBreak = document.getElementById("shortBreak");

    test("should updateTable, currMode=w, counts=0", () => {
        let currMode = "w";
        let counts = 0;

        updateTable();

        expect(counter.style.opacity).toBe("0.4");
        expect(workPhase.style.opacity).toBe("1");
        expect(longBreak.style.opacity).toBe("0.4");
        expect(shortBreak.style.opacity).toBe("0.4");

        expect(counter.innerHTML).toBe("4x");
    });

    test("should updateTable, currMode=w, counts=1", () => {
        let currMode = "w";
        let counts = 1;

        updateTable();

        expect(counter.style.opacity).toBe("0.4");
        expect(workPhase.style.opacity).toBe("1");
        expect(longBreak.style.opacity).toBe("0.4");
        expect(shortBreak.style.opacity).toBe("0.4");

        // expect(counter.innerHTML).toBe("3x");
    });

    test("should updateTable, currMode=w, counts=2", () => {
        let currMode = "w";
        let counts = 2;

        updateTable();

        expect(counter.style.opacity).toBe("0.4");
        expect(workPhase.style.opacity).toBe("1");
        expect(longBreak.style.opacity).toBe("0.4");
        expect(shortBreak.style.opacity).toBe("0.4");

        // expect(counter.innerHTML).toBe("2x");
    });

    test("should updateTable, currMode=w, counts=3", () => {
        let currMode = "w";
        let counts = 3;

        updateTable();

        expect(counter.style.opacity).toBe("0.4");
        expect(workPhase.style.opacity).toBe("1");
        expect(longBreak.style.opacity).toBe("0.4");
        expect(shortBreak.style.opacity).toBe("0.4");

        // expect(counter.innerHTML).toBe("1x");
    });

    test("should updateTable, currMode=w, counts=4", () => {
        let currMode = "w";
        let counts = 4;

        updateTable();

        expect(counter.style.opacity).toBe("0.4");
        expect(workPhase.style.opacity).toBe("1");
        expect(longBreak.style.opacity).toBe("0.4");
        expect(shortBreak.style.opacity).toBe("0.4");

        //     expect(counter.innerHTML).toBe("0x");
    });
});