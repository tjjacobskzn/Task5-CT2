// This function calculates subtotal before tax (total value of items together without TAX)
function calcSub(cartItems) {
    let subTotal = 0;
    cartItems.forEach(flyreel => {
        subTotal = subTotal + flyreel.price;
        subTotal.id = "subTotalId";
    });
    return subTotal;
};
// this function calculates Cart Total and is used within JS to alert Cart Total everytime something is added to cart
function calcTotal(subTotal) {
    let tax = (subTotal / 100) * 15;
    let total = (subTotal + tax);
    total.id = "toTal";
    return [total, tax];
};

// this function will calculate the cart total and update it dynamically depending on the inputs and selected options
function recalculateTotal(cartItems, deliveryCost, discount) {

    // This calculates the total amount of all item prices and displays it as SUBTOTAL because it does not include TAX
    let subTotal = calcSub(cartItems);
    let sub = document.getElementById("subTotalItems");
    sub.innerHTML = "Subtotal : " + " " + " " + " " + "$" + " " + (subTotal).toFixed(2);

    // This calculates 15% TAX of total item price and displays it as TOTAL value
    let [total, tax] = calcTotal(subTotal);
    let taxData = document.getElementById("vatItems");
    taxData.innerHTML = "VAT" + " " + "15%" + " " + ":" + " " + "$" + " " + (tax).toFixed(2);

    let finalTotal = document.getElementById("toTal");
    finalTotal.innerHTML = "Total" + " " + ":" + " " + "$" + " " + (total + deliveryCost - discount).toFixed(2);
};

$(document).ready(function () {
    // getting localStorage as to pull data from it and display it to cart
    let cartItems = JSON.parse(localStorage.getItem("cartItems"));

    // this forEach loop will build the items from localStorage and display them .
    cartItems.forEach(function (flyreel) {
        let table = document.getElementById("cartTable");
        let myRow = document.createElement("tr");
        let data = document.createElement("td");

        // this builds and sets an image src as to display it
        let images = document.createElement("img");
        images.src = flyreel.myImage;
        images.alt = flyreel.make;

        let line = document.createElement("hr");
        line.className = "hLine";

        let reelProps = document.createElement("h2");
        reelProps.innerHTML = flyreel.make;

        let reelPrice = document.createElement("h3");
        reelPrice.innerHTML = flyreel.price + " " + "$";

        // the delButton will splice the selected item from localStorage rendering the button as "Remove from cart"
        let delButton = document.createElement("button");
        delButton.addEventListener("click", function () {
            let i = cartItems.indexOf(flyreel);

            delButton = JSON.parse(localStorage.getItem("cartItems"));
            delButton.value = document.location.reload(true);
            delButton = cartItems.splice(i, 1);
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        });
        delButton.innerHTML = "Remove from Cart";

        // appending to td, tr and table
        data.appendChild(images);
        data.appendChild(reelProps);
        data.appendChild(reelPrice);
        data.appendChild(delButton)
        data.appendChild(line);
        myRow.appendChild(data);
        table.appendChild(myRow);

        // this displays the items to the total box to make price viewing easy
        itemRow = document.getElementById("ItemCostTable");
        let newData = document.createElement("td");
        let newRow = document.createElement("tr");

        newData.innerHTML = flyreel.make + " :" + " " + " $" + flyreel.price;
        newData.id = "newData";

        newRow.appendChild(newData);
        itemRow.appendChild(newRow);
    })

    // this is a constructor for the delivery options
    function delivery(deliveryOption, deliveryCost) {
        this.deliveryOption = deliveryOption;
        this.deliveryCost = deliveryCost;
    };
    // this is the base for the options
    let choose = new delivery(
        "Choose delivery option",
        0);
    // deliver
    let overnight = new delivery(
        "Overnight shipping",
        20);

    // pickup
    let pickup = new delivery(
        "Pickup",
        0);

    // making an array to access delivery options later
    let delivOptions = [choose, overnight, pickup];
    let select = document.getElementById("deliveryHtml");

    // this forEach loop will create an option an option element and append every delivery option to it
    delivOptions.forEach(function (deliveries) {
        let option = document.createElement("option");
        option.innerHTML = deliveries.deliveryOption;
        select.appendChild(option);
    });

    // this will display the selected delivery option's value.

    $(select).change(function(e) {
        let i = e.target.selectedIndex;
        let delCost = document.getElementById("deliveryItems");
        delCost.innerHTML = "Delivery" + " " + ":" + " " + "$" + " " + parseFloat(delivOptions[i].deliveryCost).toFixed(2);

        let discount = 0;
        let input = document.getElementById("voucherInput");
        // if user input is the letters "hello" the user will recieve a 50$ discount.
        if (input.value === "hello") {
            discount = 50;
        };
        // we run "recalculateTotal" to update our total.
        recalculateTotal(cartItems, delivOptions[i].deliveryCost, discount);
    });

    // this is the main discount calculator.
    let discount = 0;
    document.getElementById("submitButton").addEventListener("click", function () {
        let input = document.getElementById("voucherInput");
        if (input.value === "hello") {
            discount = 50;

            let data = document.getElementById("discountItems");
            data.innerHTML = "Discount :" + " " + "$" + " " + discount;
        };
        // we run "recalculateTotal" to update the total.
        recalculateTotal(cartItems, delivOptions[select.selectedIndex].deliveryCost, discount);
    });

    // here we run "recalculateTotal" to update our total dynamically
    recalculateTotal(cartItems, delivOptions[select.selectedIndex].deliveryCost, discount);


    let orderButton = document.getElementById("placeOrderButton");

    select.addEventListener("change", function () {
        // this enables the order button when a user has clarified their delivery option
        document.getElementById("placeOrderButton").removeAttribute("disabled");
    });
    // this alerts the user that their order was unsuccesful
    orderButton.addEventListener("click", function () {
        alert("Your order was succesful");

        // this generates a refference number
        function* generator(i) {
            yield i;
        };
        // refference
        const gen = generator("Your" + " " + "Refference" + " " + ":" + " " + "B123");
        alert(gen.next().value);
    });

    // required jQuery functions.

    // this hides cart items and at the same time acts as an animation
    $("#hideButton").click(function () {
        $("#cartTable").fadeOut(1);
    });
    // this shows cart items and at the same time acts as an animation
    $("#showButton").click(function () {
        $("#cartTable").fadeIn(1);
    });

    // this is a chained effect
    $("#shakeButton").click(function () {
        $("*").slideUp(1000).slideDown(1000);
    });
});