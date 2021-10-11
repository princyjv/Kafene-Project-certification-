const logout = () => {
    localStorage.clear();
    window.location.href = './index.html';
}


$(document).ready ( () => {
    $.get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders" , (orderData) =>{
    const checkLogin = () => {
        if(!localStorage.getItem('login')) {
            window.location.href = "./index.html";
        }
    }
    class OrderCards{
        constructor(filterData){
            this.id       = filterData.id;
            this.customer = filterData.customerName;
            this.date     = filterData.orderDate;
            this.time     = filterData.orderTime;
            this.amount   = filterData.amount;
            this.status   = filterData.orderStatus;
        }

        printOrderCards() {
            return (`<tr>
            <td class="light"> ${this.id} </td>
            <td> ${this.customer} </td>
            <td>${this.date}<p class="light lightP">${this.time}</p> </td>
            <td class="light">$${this.amount}</td>
            <td>${this.status}</td>
        </tr> `)
        }
    }
let apiData = orderData;
let filteredData = [];

let filterContent = () => {
    const newId = $('#New').prop('checked');
    const packedId = $('#Packed').prop('checked');
    const intransitId = $('#Intransit').prop('checked');
    const deliveredId = $('#Delivered').prop('checked');
    filteredData = [];

    if(apiData.length > 0) {
        filteredData = apiData.filter((OrderCards) => {
            if (newId && OrderCards.orderStatus === 'New') return true
            if (packedId && OrderCards.orderStatus === 'Packed') return true
           if (deliveredId && OrderCards.orderStatus === 'Delivered') return true
           if (intransitId && OrderCards.orderStatus === 'InTransit') return true
          return false
        })
        renderUI(filteredData);
    }

}


const renderUI = (args) => {


    $('#cards').html(" ");

    $('#count').html(args.length)

    let generateOrderCard = [];
    let htmlstr = " ";


    if(args.length > 0) {
        for (let i = 0; i < args.length; i++) {
    
            generateOrderCard[i] = new OrderCards(args[i]);
            htmlstr += generateOrderCard[i].printOrderCards();
        
        }

    $("#cards").html(htmlstr);
    }
}

checkLogin();
filterContent();
$('.Checkbox').change(filterContent);


});


});
 

   