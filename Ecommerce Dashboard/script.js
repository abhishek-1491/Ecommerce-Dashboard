let allProducts = [];
async function fetchProducts() {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    allProducts = products;
    // console.log(products);
    displayProducts(products);
    // popup(3);
}
var category = new Map();
function displayProducts(products) {
    const container = document.getElementById('container');
    container.innerHTML = "";
    products.forEach((product, index) => {
        let cat = product.category;
        if (category.has(cat)) {
            category.set(cat, '1');
        }
        else {
            category.set(cat, '1');
        }

        const card = document.createElement('div');
        card.className = "product-card";

        card.innerHTML = `
            
            <img src="${product.image}">
            <h3>${product.title}</h3>
            <p class="price">${product.price.toFixed(2)}</p>
            <p>${product.category}</p>
            <button>Add To Cart</button>

            `;
        card.addEventListener('click', () => { popup(index) });
        container.appendChild(card);

    });
    displayCategory(category);
}
function popup(index) {
    let product = allProducts[index];
    console.log(product);

    let id = product.id;
    console.log(id);
    let popupContainer = document.getElementById('pop');

    let html = `
        <span class="close" onclick="closepopup()">Close</span>
        <img src="${product.image}">
        <div class="details">
            <h3>${product.title}</h3>
            <p class="price"><strong>Price : ${product.price}</strong></p>
            <p class="category"><strong>Category :</strong> ${product.category}</p>
            <p class="description">
                <dl>
                    <dt><strong>Description : </strong></dt>
                    <dd>${product.description}</dd>
                </dl>
            </p>
            <p class="rating"><strong>Rating : </strong>${product.rating.rate}</p>
            <button>Add To Cart</button>
        </div>
    `;
    popupContainer.innerHTML = html;
    popupContainer.style.display = "block";
}

// window.addEventListener('click',(event)=>{
//     if(event.target == close){
//         pop.style.display="none";
//     }
// });

function closepopup() {
    document.getElementById('pop').style.display = "none";
}
// function displayCategory(category){
//     const header = document.getElementById('header');
//     // console.log(header);
//     var html = '<div class="header-btns">';
//     for (let [key, value] of category) {
//         let ca = key;

//     //    html += `
//     //     <button onclick="filterProducts(ca)">${key}</button>
//     //    `;
//        html += "<button onclick='filterProducts('"+ca+"')>"+key+"</button>";
//       }
//       html += "</div>";
//       header.innerHTML = html;
// }
function displayCategory(category) {
    const header = document.getElementById('category');
    let html = `<button onclick="filterProducts('all')">All</button>`;
    for (let [key, value] of category) {
        let ca = key.replace(/[^a-zA-Z0-9]/g, "");
        // console.log(ca.replace(/[^a-zA-Z0-9]/g,""));
        html += `<button onclick="filterProducts('${ca}')">${key}</button>`;
    }

    header.innerHTML = html;
    // console.log(header);
}


function filterProducts(fill) {

    console.log("Done");
    // console.log(fill);
    var filterProduct = [];
    allProducts.forEach(product => {
        if (product.category.replace(/[^a-zA-Z0-9]/g, "") === fill) {
            filterProduct.push(product);
        } else if (fill === "all") {
            filterProduct.push(product);
        }
    });

    displayProducts(filterProduct);
}

function sortProducts() {

    const sortOption = document.getElementById('sort').value;
    let sortedProducts = [...allProducts];

    switch (sortOption) {
        case 'priceLowHigh':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;

        case 'priceHighLow':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;

        case 'nameAZ':
            sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
            break;

        case 'nameZA':
            sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
            break;

        default:
            sortedProducts = [...allProducts];
    }

    displayProducts(sortedProducts);
}



function showProducts() {
    document.getElementById('users-container').style.display="none";
    let header = document.getElementById('header');
    // let container = document.getElementById('container');

    header.style.display = "block";
    container.style.display = "block";
    fetchProducts();
}

function showUsers() {
    document.getElementById('container').style.display="none";
    document.getElementById('header').style.display="none";
    document.getElementById('users-container').style.display="block";

    const container = document.getElementById('users-container');



    fetch('https://dummyjson.com/users')
        .then((response) => {
            return response.json();
        })
        .then((users) => {
            allUsers = users;
            let html = `
                <div class="users-table">
                    <h2>Manage Users</h2>
                    <table>
                        <tr>
                            <th>Sr. No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>City</th>
                            <th>Action</th>
                        </tr>
        `;
        // container.innerHTML = html;
        allUsers.forEach((user, index)=>{
            html += `
                <tr>
                    <td>${index+1}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>${user.address.city}</td>
                    <td><button>Show Details</button></td>
                </tr>
            `;
            users.push(user);
        })
        html += `</table></div>`;
        container.innerHTML = html ;



        })
        .catch((error) => console.log(error))
}



var allUsers = [];
function fetchAllUsers(){

    fetch('https://dummyjson.com/users')
    .then((response)=>{
        return response.json();
    })
    .then((users)=>{
        
        users.forEach(user=>{
            let a = user;
            allUsers.push(a);
        })
    
        // console.log(allUsers);
    })
    .catch((error)=>console.log(error))

    
}

setTimeout(() => {
    console.log(allUsers);
}, 5000);
fetchAllUsers();


