let list = document.getElementById("list");

let listItemsData = [{
  id: "ip13pro",
  name: "Iphone 13 Pro",
  price: 60,
  desc:"6.1' 1170x2532 pixels, 12MP, 2160p, 6GB RAM, Apple A15 Bionic, 3095mAh Li-Ion",
  img: "img/13pro.png"
},
{
  id: "ip13",
  name: "Iphone 13",
  price: 60,
  desc:"6.1' 1170x2532 pixels, 12MP 2160p, 4GB RAM, Apple A15 Bionic, 3240mAh Li-Ion",
  img: "img/13.png"
},
{
  id: "ip12pro",
  name: "Iphone 12 Pro",
  price: 60,
  desc:"6.1' 1170x2532 pixels, 12MP 2160p, 6GB RAM, Apple A14 Bionic, 2815mAh Li-Ion",
  img: "img/12pro.png"
},
{
  id: "ip12",
  name: "Iphone 12",
  price: 60,
  desc:"6.1' 1170x2532 pixels, 12MP 2160p, 4GB RAM, Apple A14 Bionic, 2815mAh Li-Ion",
  img: "img/12.png"
},
{id: "ip11pro",
name: "Iphone 11 Pro",
price: 60,
desc:"5.8' 1125x2436 pixels, 12MP 2160p, 4GB RAM, Apple A13 Bionic, 3046mAh Li-Ion",
img: "img/11pro.png"},
{
  id: "ip11",
  name: "Iphone 11",
  price: 60,
  desc:"6.1' 828x1792 pixels, 12MP 2160p, 4GB RAM, Apple A13 Bionic, 3110mAh Li-Ion",
  img: "img/11.png"
},
{
  id: "fold4",
  name: "Galaxy Z Fold4",
  price: 60,
  desc:"6.1' 828x1792 pixels, 12MP 2160p, 4GB RAM, Apple A13 Bionic, 3110mAh Li-Ion",
  img: "img/fold4.png"
},
{
  id: "flip4",
  name: "Galaxy z Flip4",
  price: 60,
  desc:"6.7' 1080x2640 pixels, 12MP 2160p, 8GB RAM, Snapdragon 8+ Gen 1, 3700mAh Li-Po",
  img: "img/flip4.png"
},
{
  id: "s22ultra",
  name: "Galaxy S22 Ultra",
  price: 60,
  desc:"6.8' 1440x3088 pixels, 108MP 4320p, 8/12GB RAM, Exynos 2200, 5000mAh Li-Ion",
  img: "img/s22ultra.png"
},
{
  id: "s22plus",
  name: "Galaxy S22+",
  price: 60,
  desc:"6.6' 1080x2340 pixels, 50MP 4320p, 8GB RAM, Exynos 2200, 4500mAh Li-Ion",
  img: "img/s22+.png"
},
{
  id: "s22",
  name: "Galaxy S22",
  price: 60,
  desc:"6.1' 1080x2340 pixels, 50MP 4320p, 8GB RAM, Exynos 2200, 3700mAh Li-Ion",
  img: "img/s22.png"
},
{
  id: "a73",
  name: "Galaxy A73 5G",
  price: 60,
  desc:"6.7' 1080x2400 pixels, 108MP 2160p, 6/8GB RAM, Snapdragon 778G 5G, 5000mAh Li-Po",
  img: "img/a73.png"
}
];

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateList = () => {
  return (list.innerHTML = listItemsData.map((x)=>{
    let {id,name,price,desc,img} = x;
    let search = basket.find((x) => x.id === id) || [];
    return `
    <article id=product-id-${id} class="product">
      <header>
        <a href="preview.html" class="redirect">
          <img src=${img} alt="...">
        </a>
      </header>
      <div class="content">
        <h1>${name}</h1>
          ${desc}
      </div>
      <footer class="content">
        <span class="qt-minus"><i onclick="decrement(${id})" class="bi bi-dash-lg"></i></span>
        <span id=${id} class="qt"> ${search.item === undefined ? 0 : search.item} </span>
        <span class="qt-plus"><i onclick="increment(${id})" class="bi bi-plus-lg"></i></span>
        <h2 class="full-price">$ ${search.item === undefined ? 0 : search.item * price}</h2>
        <h2 class="price">$ ${price}</h2>
      </footer>
    </article>`
  }).join("")); 
};
generateList();

let increment = (id) => {
  let selectedItems = id;
  let search = basket.find((x) => x.id === selectedItems.id);

  if(search === undefined){
    basket.push({
      id: selectedItems.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  
  update(selectedItems.id);
  generateList();
  // localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
  let selectedItems = id;
  let search = basket.find((x) => x.id === selectedItems.id);

  if(search === undefined)
    return;
  else if(search.item === 0) 
    return;
  else {
    search.item -= 1;
  }
  
  update(selectedItems.id);
  basket = basket.filter((x) => x.item !== 0);
  generateList();

  // localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calc();
  TotalAmount();
};

let calc = () => {
  let allitem = document.getElementById("total-item");
  allitem.innerHTML = "Total Item : " + basket.map((x)=>x.item).reduce((x,y) => x+y, 0)
};
calc();

let TotalAmount = () => {
  if(basket.length !== 0) {
    let amount = basket.map((x) => {
      let {item, id} = x;
      let search = listItemsData.find((y) => y.id === id) || [];
      return item * search.price;
    }).reduce((x,y) => x+y, 0);
    let totalprice = document.getElementById("total-price");
    totalprice.innerHTML = `Total Price: $ ${amount}`
  }
  else return;
}
TotalAmount();