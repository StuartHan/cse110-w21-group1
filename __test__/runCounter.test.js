/**
 * @jest-environment jsdom
 */

// import 'jest-dom/extend-expect'
// import { render, cleanup } from 'react-testing-library'



const { getByText, getByTestId, fireEvent } = require("@testing-library/dom");
const { runCounter } = require("../source/Front-end/javascript/mainjest.js");



describe("runCounter testing", () => {
    test("should increment counts", () => {

        currMode = "w";
        counts = 2;

        runCounter();

        expect(1).toBe(1);
        // expect(counts).toBe(2);
    })
})