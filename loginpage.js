

$(document).ready(() => {

    localStorage.getItem('login') && window.location.replace('./Orders.html')



$("#login-details").submit( (e) => {
    e.preventDefault();

   let username = $("#username").val();
   let password = $("#password").val();

   if(username === password){

    $.post("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/login" , {username: username , password: password} , ()=>{
        localStorage.setItem('login',JSON.stringify(true))
        alert('Logged In successfully !!')
        window.location.href='./Orders.html';
    });
   }
   else{
       alert(' Oops! Please Enter Valid Credentials')
   }

});
});

