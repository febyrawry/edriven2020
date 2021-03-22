var subtotal = document.getElementById("subtotal");
var tax = document.getElementById("tax");
var total = document.getElementById("total");
var amountpaid = document.getElementById("amountpaid");
var change = document.getElementById("change");
var submit = document.getElementById("submit");

subtotal.addEventListener("change", function(){
    if(parseInt(subtotal.value) >= 100 && parseInt(subtotal.value) <= 10000){
        amountpaid.disabled = false;
        tax.value = (subtotal.value * 0.12);
        total.value = parseInt(tax.value) + parseInt(subtotal.value);
        amountpaid.value = total.value;
        amountpaid.min = total.value;
        change.value = parseInt(amountpaid.value) - parseInt(total.value);
        submit.disabled = false;
        submit.style.backgroundColor = "green";
    }else{
        amountpaid.disabled = true;
        submit.disabled = true;
        submit.style.backgroundColor = "rgb";
    }
})

amountpaid.addEventListener("change", function(){
    change.value = parseInt(amountpaid.value) - parseInt(total.value);
    if(parseInt(change.value) >= 0){
        submit.disabled = false;
        submit.style.backgroundColor = "green";
    }
    else{
        submit.disabled = true;
        submit.style.backgroundColor = "rgb";
    }
})