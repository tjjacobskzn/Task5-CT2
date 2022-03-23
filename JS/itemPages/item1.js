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

    // constructor for item as to append it dynamically
    function reel(make, price, image, prop) {
        this.make = make;
        this.price = price;
        this.myImage = image;
        this.prop = prop;
    };

    // item
    let reel1 = new reel(
        "Fly reel 1wt",
        250,
        "../../images/R1.jfif",
        "This reel has a sealed drag for extra protection in the ocean"
    );

    let itemArray = [reel1];

    // this forEach will create our item and append it to the page through a table
    itemArray.forEach(function (flyreel) {

        // creating an img element for item
        let images = document.createElement("img");
        images.src = flyreel.myImage;
        images.alt = "flyreel";
        images.className = "imageClass";

        // creating titles for item
        let make = document.createElement("h2");
        make.innerHTML = flyreel.make;
        make.className = "desc";

        // creating properties for item
        let properties = document.createElement("p");
        properties.innerHTML = flyreel.prop;
        properties.className = "reelProp";

        // price of item
        let itemPrice = document.createElement("h3");
        itemPrice.innerHTML = "$" + " " + flyreel.price;
        itemPrice.className = "price";

        // this button adds the item to cart by pushing it into our localStorage
        let addToCartButton = document.createElement("button");
        addToCartButton.innerHTML = "Add to Cart";
        addToCartButton.className = "addToCartButton";
        addToCartButton.id = "aTCB";

        let itemTable = document.getElementById("itemTable");
        let itemRow = document.createElement("tr");
        let itemData = document.createElement("td");

        // appending all item properties to td
        itemData.appendChild(images);
        itemData.appendChild(make);
        itemData.appendChild(properties);
        itemData.appendChild(itemPrice);
        itemData.appendChild(addToCartButton);

        // appending td to tr and tr to table
        itemRow.appendChild(itemData);
        itemTable.appendChild(itemRow);

        let i = itemArray[0];

        // this button adds the item to localStorage which in turn adds it to our cart
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
    });
});