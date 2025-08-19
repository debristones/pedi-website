
const manyproducts = [
  {name: "Product 1", price: "$10", image: "image1.jpg",cartegory: "electronics"},
  {name: "Product 2", price: "$20", image: "image2.jpg",cartegory: "electronics"},
  {name: "Product 3", price: "$30", image: "image3.jpg",cartegory: "electronics"},
  {name: "Product 3", price: "$30", image: "image3.jpg",cartegory: "electronics"}
];

const pgrids = document.querySelectorAll(".jsproduct-grid");

pgrids.forEach((pgrid) => {
  manyproducts.forEach((productz) => {
  const productCard = document.createElement("div");
  productCard.className = "product-card";
  
  productCard.innerHTML = `
   
      <div onclick="location.href='product.html'" >
        <div class="media">${productz.image}</div>
        <div class="body">
          <h3>${productz.cartegory}</h3>
          <p>${productz.name}</p>
          <div class="price">${productz.price}</div>
        </div>
      </div>
      <div class="addtocart-btn">
        <button class="btn primary">Add to Cart</button>
      </div>   
  `;  
  pgrid.appendChild(productCard);
});

});







