const logout = () => {
    localStorage.clear();
    window.location.href = './index.html';
}


$(document).ready ( () => {
    $.get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products" , (productData) =>{
    const checkLogin = () => {
        if(!localStorage.getItem('login')) {
            window.location.href = "./index.html";
        }
    }
    class ProductCards{

        constructor(filterData) {

            this.id = filterData.id;
            this.productName = filterData.medicineName;
            this.productBrand = filterData.medicineBrand;
            this.expiryDate = filterData.expiryDate;
            this.unitPrice = filterData.unitPrice;
            this.stock = filterData.stock;
        }

        printProductCards() {
            return (`<tr>
            <td class="light"> ${this.id} </td>
            <td> ${this.productName} </td>
            <td class="light"> ${this.productBrand} </td>
            <td> ${this.expiryDate} </td>
            <td class="light">$${this.unitPrice}</td>
            <td class="light">${this.stock}</td>
        </tr>`)
        }
    }
let apiData = productData;
let filteredData = [];

let filterContent = () => {

    const Expired = $('#Expired').prop('checked');
    const LowStock= $('#Lowstock').prop('checked');
    filteredData = [];

    if(apiData.length > 0 ) {
        filteredData = apiData.filter((ProductCards) => {
         
            if(Expired) return (new Date() > new Date(ProductCards.expiryDate));
            return true;
        });
        filteredData = filteredData.filter((ProductCards) => {
            if(LowStock) return (ProductCards.stock < 100);
            return true;
        });
        renderUI(filteredData);
    }

}


const renderUI = (args) => {


    $('#cards').html(" ");

    $('#count').html(args.length)

    let generateProductCard = [];
    let htmlstr = " ";


    if(args.length > 0) {
        for (let i = 0; i < args.length; i++) {
    
            generateProductCard[i] = new ProductCards(args[i]);
            htmlstr += generateProductCard[i].printProductCards();
        
        }

    $("#cards").html(htmlstr);
    }
}

checkLogin();
filterContent();
$('.Checkbox').change(filterContent);


});


});
 
   