import {products} from "/js/products1.js";


const pgrids = document.querySelectorAll(".jsproduct-grid");

pgrids.forEach((pgrid) => {
  products.forEach((product) => {
  const productCard = document.createElement("div");
  productCard.className = "product-card";
  
  productCard.innerHTML = `
   
      <div onclick="location.href='product.html'" >
        <div class="media"><img src="${product.image}"></div>
        <div class="body">
          <h3>${product.id}</h3>
          <p>${product.name}</p>
          <div class="price">${product.price}</div>
        </div>
      </div>
      <div class="addtocart-btn">
        <button class="addto-cartbtn123 btn primary">Add to Cart</button>
      </div>   
  `;  
  pgrid.appendChild(productCard);
});

});







