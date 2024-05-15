let shop = document.getElementById("shop");
let arr =[];
/*
 Basket to hold all the selected items
 the getItem part is retrieving data from the local storage (obeject)
 if local storage is blank, basket becomes an empty array
 */

let basket = JSON.parse(localStorage.getItem("data")) || [];// it take data from data.js file or empty array
     
/*
  1.  Generates the shop with product cards composed of
  2.  images, title, price, buttons, description
 */

let generateShop = (shopItems) => {// function for generating cart
  return (shop.innerHTML = shopItems
    .map((x) => {
      let { id, name, price, desc, img} = x;
      let search = basket.find((y) => y.id === id) || [];
      return `
    <div id=product-id-${id} class="item">
      <img width="100%" height ="250px" src=${img} alt="">
      <div class="details">
        <h3>${name}</h3>
        <p>${desc}</p>
        <div class="price-quantity">
          <h2>Rs. ${price} </h2>
          <div class="buttons">
            <i onclick="decrement(${id})" class="fa-solid fa-circle-minus"></i>
           
            <i  class="bi bi-dash-lg"></i>
            <div id=${id} class="quantity">${
        search.item === undefined ? 0 : search.item
      }</div>
            <i  onclick="increment(${id})" class="fa-solid fa-circle-plus fa-fade"></i>
            
          </div>
        </div>
      </div>
  </div>
    `;
    })
    .join(""));
};

// generateShop();// call the generating fuction to include in cast
/*
   used to increase the selected product item quantity by 1
 */

let increment = (id) => { // increaing quantity
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });

  } 
  else {
    search.item += 1;
  }

  // console.log(basket);
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

/*
 * used to decrease the selected product item quantity by 1
 */

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
    // console.log(selectedItem);
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
};

/*
 * ! To update the digits of picked items on each item card
 */

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

/*
 * ! To calculate total amount of selected Items
 */

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
console.log( "display button  hello");
const btnContainer = document.querySelector(".btn-container");
// console.log(sectionCenter);
console.log( "display button ",btnContainer);
// display all items when page loads
window.addEventListener("DOMContentLoaded", function () {
  // diplayMenuItems(menu);
  generateShop(shopItemsData);// call the generating fuction to include in cast
  displayMenuButtons();
});
function displayMenuButtons() {
  // create a categries array that store all the categories of food 
  const properties = shopItemsData.reduce(
    function (values, item) {
      // console.log("value",values);
      // console.log("item",item);
      // console.log("gender",item.gender);
      if (!values.includes(item.gender)) {// checking the value is null or not 
        values.push(item.gender);
      }
      if (!values.includes(item.level)) {// checking the value is null or not 
        values.push(item.level);
      }
      if (!values.includes(item.color)) {// checking the value is null or not 
        values.push(item.color);
      }
      if (!values.includes(item.type)) {// checking the value is null or not 
        values.push(item.type);
      }
      return values;
    },
    ["all"]
  );
  // creating button 
  const categoryBtns =  properties
    .map(function (popt) {
      return `<button type="button" class="filter-btn" data-id=${popt}>
          ${popt}
        </button>`;
    })
    .join("");

  btnContainer.innerHTML = categoryBtns;
  // creating a filter button 
  // filterBtns are the array of button that all the button as Nodelist
  const filterBtns = btnContainer.querySelectorAll(".filter-btn");
  console.log(filterBtns);

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      // console.log(e);
      // console.log(e.currentTarget);
      // console.log(e.currentTarget.dataset);
      // console.log(e.currentTarget.dataset.id);
      const popt = e.currentTarget.dataset.id;// finding category whitch user choose
      //  filtering from menu 
      // if the item is belong to category then it goes as a form of objec in menuCategory
  
    const shopGen = shopItemsData.filter(function (shopItem) {
            console.log(shopItem.gender);
        if (shopItem.gender === popt|| shopItem.level === popt||shopItem.type === popt||shopItem.color === popt) {// checking category
          return shopItem;
        }
      });
      console.log( shopGen);
      //  displaying on user screen 
      if (popt === "all") {
        generateShop(shopItemsData)
      } else {
        generateShop(shopGen)
      }
    });
  });
}
