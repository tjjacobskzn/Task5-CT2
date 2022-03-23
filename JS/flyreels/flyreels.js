// This function calculates subtotal before tax (total value of items together without TAX)
function calcSub(cartItems) {
    let subTotal = 0;
    cartItems.forEach(flyreel => {
        subTotal = subTotal + flyreel.price
        subTotal.id = "subTotalId";
    });
    return subTotal;
}
// this function calculates Cart Total and is used within JS to alert Cart Total everytime something is added to cart
function calcTotal(subTotal) {
    let tax = (subTotal / 100) * 15;
    let total = subTotal + tax;
    total.id = "myTotal";
    return total;
}

$(document).ready(function () {
    // this function acts as a constructor/class for my objects and give them their properties of make, model etc
    function reel(make, price, image, itemPageSrc) {
        this.make = make;
        this.price = price;
        this.myImage = image;
        this.itemPageSrc = itemPageSrc;
    }

    // Below is my objects with their properties

    // NOTE : all objects are appended to table data elements within rows within a table FOR future styling .

    // object 1
    let reel1 = new reel(
        "Fly Reel 1wt",
        250.00,
        "../../images/R1.jfif",
        "../itemPages/img1.html"
    );

    // object 2
    let reel2 = new reel(
        "Fly Reel 2wt",
        250.00,
        "../../images/R2.jfif",
        "../itemPages/img2.html"
    );

    // object 3
    let reel3 = new reel(
        "Fly Reel 3wt",
        300.00,
        "../../images/R3.jfif",
        "../itemPages/img3.html"
    );

    // object 4
    let reel4 = new reel(
        "Fly Reel 4wt",
        500.00,
        "../../images/R4.jfif",
        "../itemPages/img4.html"
    );

    // this is my object array
    let reelArray = [reel1, reel2, reel3, reel4];

    // this function/Method creates a loop that iterates through my array and displays the designates information on the html website

    reelArray.forEach(function (flyreel) {

        // here I select my table to append child elements to it
        let table = document.getElementById("table");

        //here I create an image element . I style and add images to it as it is whithin this loop
        let images = document.createElement("img");
        images.src = flyreel.myImage;
        images.alt = flyreel.make;


        // here I create an hr element and style it's width and margin to make it appear better. 
        let line = document.createElement("hr");
        line.style.width = "width: max-content;";
        line.style.marginTop = "-15px";
        // line.style.marginBottom = "50px";

        // here I create headings for all images and add values to them through the innerHtml method.
        let reelProps = document.createElement("h2");
        reelProps.innerHTML = flyreel.make;

        let reelPrice = document.createElement("h3");
        reelPrice.innerHTML = flyreel.price + " " + "$";

        // here I create rows for a table . It is used for easy styling of my items
        let myRow = document.createElement("tr");

        // here I create table data for a table . It is used for easy styling of my items.
        let data = document.createElement("td");

        let addToCartButton = document.createElement("button");
        addToCartButton.innerHTML = "Add to Cart";
        addToCartButton.style.marginBottom = "50px";

        // this gets the index of the object.
        let i = (reelArray, flyreel);

        // This adds an item to localStorage when the item's button is clicked on
        addToCartButton.addEventListener("click", function () {
            let savedItems = JSON.parse(localStorage.getItem("cartItems"));

            if (!savedItems) {
                savedItems = [];
            }
            savedItems.push(i);
            localStorage.setItem("cartItems", JSON.stringify(savedItems));

            let subTotal = calcSub(savedItems);
            let total = calcTotal(subTotal);
            alert("Cart Value : " + " " + "$" + " " + total);
        });

        // this creates an href to each items page.
        let view = document.createElement("a");
        view.href = flyreel.itemPageSrc;
        // here I append my functions/elements/properties to their superior elements or call methods.

        // appending my images , properties and horizontal lines to a table data element (td).
        view.appendChild(images);
        data.appendChild(view)
        data.appendChild(view);
        data.appendChild(reelProps);
        data.appendChild(reelPrice);
        data.appendChild(line);
        data.appendChild(addToCartButton);

        // appending my td to a tr element .
        myRow.appendChild(data);

        // finally appending my tr to my table element.
        table.appendChild(myRow);
    });
});