



const { darkenChosen } = require("../source/Front-end/javascript/mainjest.js")

describe("darkenchosen testing", () => {
    test ("text and style should be default, shopitems=000, active=00000", () => {

        localStorage.setItem("shopitems", "000")
        localStorage.setItem("active", "00000")

        darkenChosen();

        // test style 
        expect(document.getElementById('wildjunglebuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");
        expect(document.getElementById('nightbuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");
        expect(document.getElementById('aquaticbuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");
        expect(document.getElementById('sanfranciscobuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");
        expect(document.getElementById('dogebuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");

        // test innnerHTML
        expect(document.getElementById('wildjunglebuy').innerHTML).toBe("Owned");
        expect(document.getElementById('nightbuy').innerHTML).toBe("Owned");
        expect(document.getElementById('aquaticbuy').innerHTML).toBe("Buy");
        expect(document.getElementById('sanfranciscobuy').innerHTML).toBe("Buy");
        expect(document.getElementById('dogebuy').innerHTML).toBe("Buy");
        
    })

    test ("should set appropriate text and style, shopitems=100, active=10000", () => {

        localStorage.setItem("shopitems", "100")
        localStorage.setItem("active", "10000")

        darkenChosen();

        // test style 
        expect(document.getElementById('wildjunglebuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.1)");
        expect(document.getElementById('nightbuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");
        expect(document.getElementById('aquaticbuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");
        expect(document.getElementById('sanfranciscobuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");
        expect(document.getElementById('dogebuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");

        // test innnerHTML
        expect(document.getElementById('wildjunglebuy').innerHTML).toBe("Selected");
        expect(document.getElementById('nightbuy').innerHTML).toBe("Owned");
        expect(document.getElementById('aquaticbuy').innerHTML).toBe("Owned");
        expect(document.getElementById('sanfranciscobuy').innerHTML).toBe("Buy");
        expect(document.getElementById('dogebuy').innerHTML).toBe("Buy");
    })

    test ("should set appropriate text and style, shopitems=100, active=01000", () => {

        localStorage.setItem("shopitems", "100")
        localStorage.setItem("active", "01000")

        darkenChosen();

        // test style 
        expect(document.getElementById('wildjunglebuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");
        expect(document.getElementById('nightbuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.1)");
        expect(document.getElementById('aquaticbuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");
        expect(document.getElementById('sanfranciscobuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");
        expect(document.getElementById('dogebuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");

        // test innnerHTML
        expect(document.getElementById('wildjunglebuy').innerHTML).toBe("Owned");
        expect(document.getElementById('nightbuy').innerHTML).toBe("Selected");

        expect(document.getElementById('aquaticbuy').innerHTML).toBe("Owned");
        expect(document.getElementById('sanfranciscobuy').innerHTML).toBe("Buy");
        expect(document.getElementById('dogebuy').innerHTML).toBe("Buy");
    })

    test ("should set appropriate text and style, shopitems=100, active=00010", () => {

        localStorage.setItem("shopitems", "100")
        localStorage.setItem("active", "00010")

        darkenChosen();

        // test style 
        expect(document.getElementById('wildjunglebuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");
        expect(document.getElementById('nightbuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");
        expect(document.getElementById('aquaticbuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");
        expect(document.getElementById('sanfranciscobuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.1)");
        expect(document.getElementById('dogebuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");

        // test innnerHTML
        
        // default items (Owned)
        expect(document.getElementById('wildjunglebuy').innerHTML).toBe("Owned");
        expect(document.getElementById('nightbuy').innerHTML).toBe("Owned");

        // shop items
        expect(document.getElementById('aquaticbuy').innerHTML).toBe("Owned");
        expect(document.getElementById('sanfranciscobuy').innerHTML).toBe("Selected");
        expect(document.getElementById('dogebuy').innerHTML).toBe("Buy");
    })

    test ("should set appropriate text and style, shopitems=100, active=00010", () => {

        localStorage.setItem("shopitems", "000")
        localStorage.setItem("active", "00100")

        darkenChosen();

        // test style 
        expect(document.getElementById('wildjunglebuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");
        expect(document.getElementById('nightbuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");
        expect(document.getElementById('aquaticbuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.1)");
        expect(document.getElementById('sanfranciscobuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");
        expect(document.getElementById('dogebuy').style.backgroundColor).toBe("rgba(255, 255, 255, 0.4)");

        // test innnerHTML
        
        // default items (Owned)
        expect(document.getElementById('wildjunglebuy').innerHTML).toBe("Owned");
        expect(document.getElementById('nightbuy').innerHTML).toBe("Owned");

        // shop items
        expect(document.getElementById('aquaticbuy').innerHTML).toBe("Selected");
        expect(document.getElementById('sanfranciscobuy').innerHTML).toBe("Buy");
        expect(document.getElementById('dogebuy').innerHTML).toBe("Buy");
    })
})