var newOrder=document.getElementById('newOrder')
var custName=document.getElementById('custName')
var orNumber=document.getElementById('orNumber')
var iitem1=document.getElementById('iitem1')
var iitem2=document.getElementById('iitem2')
var iitem3=document.getElementById('iitem3')
var iitem4=document.getElementById('iitem4')
var iitemList=[iitem1, iitem2, iitem3, iitem4]
var price1=document.getElementById('price1')
var price2=document.getElementById('price2')
var price3=document.getElementById('price3')
var price4=document.getElementById('price4')
var qty1=document.getElementById('qty1')
var qty2=document.getElementById('qty2')
var qty3=document.getElementById('qty3')
var qty4=document.getElementById('qty4')
var subtotal1=document.getElementById('subtotal1')
var subtotal2=document.getElementById('subtotal2')
var subtotal3=document.getElementById('subtotal3')
var subtotal4=document.getElementById('subtotal4')
var save=document.getElementById('save')
var a=[orNumber, custName, iitem1, iitem2, iitem3, iitem4, price1, price2, price3, price4, qty1, qty2, qty3, qty4, subtotal1, subtotal2, subtotal3, subtotal4]


newOrder.addEventListener('show.bs.modal', function(){
    for(var i=0;1<a.length;i++){
        a[i].value=''
        if(i>=2){
            a[i].disabled=true
        }
    }
})

const request='https://www.themealdb.com/api/json/v1/1/filter.php?c=dessert'
var response
fetch(request)
.then((res)=>{
    let converted = res.json()
    .then((data)=>{
        response=data
        for(var i=0; i<iitemList.length; i++){
            for(var ii=0; ii<data['meals'].length;ii++){
                var option=document.createElement("option")
                var optionTextNode=document.createTextNode(data['meals'][ii]['strMeal'])
                option.value=data['meals'][ii]['strMeal']
                option.appendChild(optionTextNode)
                iitemList[i].appendChild(option)
            }
        }
    })
    .catch((err)=>{
        console.log(err)
    })
})
.catch((err)=>{
    console.log(err)
})

newOrder.addEventListener('change', function(){ //TRIGGER EVERY CONTENT CHANGE INSIDE MODAL
    if(orNumber.value != '' && custName.value != ''){
        iitem1.disabled = false
    }
    else{
        iitem1.disabled = true
    }
})
orNumber.addEventListener('change', function(){ //ORNUMBER VALIDATOR
    var data = JSON.parse(localStorage.getItem('customers'))
    if(data != null){
        for(var i = 0; i < data.length; i++){
            if(orNumber.value == data[i]['orNumber']){
                orNumber.value = ''
                break
            }
        }
    }
})
custName.addEventListener('change', function(){ //CUSTOMERNAME VALIDATOR
    if(custName.value.search(' ') != -1 && custName.value.split(' ').length == 2 && (isNaN(custName.value.split(' ')[0]) && isNaN(custName.value.split(' ')[1]))){
        var checker = true
        var custNameArray = custName.value.split(' ')
        var firstNameArray = custNameArray[0].split('')
        var lastNameArray = custNameArray[1].split('')       
        for(var i = 0; i < firstNameArray.length; i++){
            if(!((firstNameArray[i] >= "a" && firstNameArray[i] <= "z") || (firstNameArray[i] >= "A" && firstNameArray[i] <= "Z"))){
                custName.value = ''
                checker = false
                break
            }
        }
        if(checker){
            for(var i = 0; i < lastNameArray.length; i++){
                if(!((lastNameArray[i] >= "a" && lastNameArray[i] <= "z") || (lastNameArray[i] >= "A" && lastNameArray[i] <= "Z"))){
                    custName.value = ''
                    checker = false
                    break
                }
            }
            if(checker){
                iitem1.disabled = false   
            }
            else{
                iitem1.disabled = true   
            }               
        }
        else{
            custName.value = ''
        }              
           
    }
    else{
        iitem1.disabled = true
        custName.value = ''
    }
    
})
iitem1.addEventListener('change', function(){ //ITEM1 VALIDATOR (REFER VARIABLE NAMING FOR OTHER ITEMS)
    price1.value = ''
    qty1.value = ''
    subtotal1.value = ''
    price1.disabled = false
    qty1.disabled = false
    
    iitem2.value = ''
    price2.value = ''
    qty2.value = ''
    subtotal2.value = ''
    iitem2.disabled = true
    price2.disabled = true
    qty2.disabled = true

    iitem3.value = ''
    price3.value = ''
    qty3.value = ''
    subtotal3.value = ''
    iitem3.disabled = true
    price3.disabled = true
    qty3.disabled = true

    iitem4.value = ''
    price4.value = ''
    qty4.value = ''
    subtotal4.value = ''
    iitem4.disabled = true
    price4.disabled = true
    qty4.disabled = true
})
price1.addEventListener('change', function(){ // PRICE1 VALIDATOR (REFER VARIABLE NAMING FOR OTHER PRICES)
    if(isNaN(price1.value)){

        price1.value = ''
        subtotal1.value = ''
        save.disabled = true

        iitem2.value = ''
        price2.value = ''
        qty2.value = ''
        subtotal2.value = ''
        iitem2.disabled = true
        price2.disabled = true
        qty2.disabled = true

        iitem3.value = ''
        price3.value = ''
        qty3.value = ''
        subtotal3.value = ''
        iitem3.disabled = true
        price3.disabled = true
        qty3.disabled = true

        iitem4.value = ''
        price4.value = ''
        qty4.value = ''
        subtotal4.value = ''
        iitem4.disabled = true
        price4.disabled = true
        qty4.disabled = true
    }
    else{
        if(qty1.value <= "0" || qty1.value == ''){
            subtotal1.value = ''
            save.disabled = true

            iitem2.value = ''
            price2.value = ''
            qty2.value = ''
            subtotal2.value = ''
            iitem2.disabled = true
            price2.disabled = true
            qty2.disabled = true
    
            iitem3.value = ''
            price3.value = ''
            qty3.value = ''
            subtotal3.value = ''
            iitem3.disabled = true
            price3.disabled = true
            qty3.disabled = true
    
            iitem4.value = ''
            price4.value = ''
            qty4.value = ''
            subtotal4.value = ''
            iitem4.disabled = true
            price4.disabled = true
            qty4.disabled = true 
        }
        else{
            var result = parseFloat(price1.value) * parseInt(qty1.value)
            subtotal1.value = result.toFixed(2)
            save.disabled = false
            iitem2.disabled = false
            price2.disabled = false
            qty2.disabled = false            
        }            
    }
})
qty1.addEventListener('change', function(){// QTY VALIDATOR (REFER VARIABLE NAMING FOR OTHER QTYS)
    if(price1.value <= '0'){
        qty1.value = ''
        subtotal1.value = ''
        save.disabled = true

        iitem2.value = ''
        price2.value = ''
        qty2.value = ''
        subtotal2.value = ''
        iitem2.disabled = true
        price2.disabled = true
        qty2.disabled = true

        iitem3.value = ''
        price3.value = ''
        qty3.value = ''
        subtotal3.value = ''
        iitem3.disabled = true
        price3.disabled = true
        qty3.disabled = true

        iitem4.value = ''
        price4.value = ''
        qty4.value = ''
        subtotal4.value = ''
        iitem4.disabled = true
        price4.disabled = true
        qty4.disabled = true
    }
    else{
        if(qty1.value <= '0'){
            qty1.value = ''
            subtotal1.value = ''
            save.disabled = true
    
            iitem2.value = ''
            price2.value = ''
            qty2.value = ''
            subtotal2.value = ''
            iitem2.disabled = true
            price2.disabled = true
            qty2.disabled = true
    
            iitem3.value = ''
            price3.value = ''
            qty3.value = ''
            subtotal3.value = ''
            iitem3.disabled = true
            price3.disabled = true
            qty3.disabled = true
    
            iitem4.value = ''
            price4.value = ''
            qty4.value = ''
            subtotal4.value = ''
            iitem4.disabled = true
            price4.disabled = true
            qty4.disabled = true         
        }
        else{
            if(price1.value <= "0" || price1.value == ''){
                subtotal1.value = ''
                save.disabled = true
    
                iitem2.value = ''
                price2.value = ''
                qty2.value = ''
                subtotal2.value = ''
                iitem2.disabled = true
                price2.disabled = true
                qty2.disabled = true
        
                iitem3.value = ''
                price3.value = ''
                qty3.value = ''
                subtotal3.value = ''
                iitem3.disabled = true
                price3.disabled = true
                qty3.disabled = true
        
                iitem4.value = ''
                price4.value = ''
                qty4.value = ''
                subtotal4.value = ''
                iitem4.disabled = true
                price4.disabled = true
                qty4.disabled = true 
            }
            else{
                var result = parseFloat(price1.value) * parseInt(qty1.value)
                subtotal1.value = result.toFixed(2)
                save.disabled = false
                iitem2.disabled = false
                price2.disabled = false
                qty2.disabled = false            
            }     
        }
    }
    
})
iitem2.addEventListener('change', function(){
    price2.value = ''
    qty2.value = ''
    subtotal2.value = ''
    price2.disabled = false
    qty2.disabled = false
    save.disabled = true

    iitem3.value = ''
    price3.value = ''
    qty3.value = ''
    subtotal3.value = ''
    iitem3.disabled = true
    price3.disabled = true
    qty3.disabled = true

    iitem4.value = ''
    price4.value = ''
    qty4.value = ''
    subtotal4.value = ''
    iitem4.disabled = true
    price4.disabled = true
    qty4.disabled = true
})
price2.addEventListener('change', function(){
    if(isNaN(price2.value)){
        price2.value = ''
        subtotal2.value = ''
        save.disabled = true

        iitem3.value = ''
        price3.value = ''
        qty3.value = ''
        subtotal3.value = ''
        iitem3.disabled = true
        price3.disabled = true
        qty3.disabled = true

        iitem4.value = ''
        price4.value = ''
        qty4.value = ''
        subtotal4.value = ''
        iitem4.disabled = true
        price4.disabled = true
        qty4.disabled = true
    }
    else{
        if(price2.value <= '0'){
            subtotal2.value = ''
            qty2.value = ''
            save.disabled = true
    
            iitem3.value = ''
            price3.value = ''
            qty3.value = ''
            subtotal3.value = ''
            iitem3.disabled = true
            price3.disabled = true
            qty3.disabled = true
    
            iitem4.value = ''
            price4.value = ''
            qty4.value = ''
            subtotal4.value = ''
            iitem4.disabled = true
            price4.disabled = true
            qty4.disabled = true 
        }
        else{
            if(qty2.value <= "0" || qty2.value == ''){
                subtotal2.value = ''
                save.disabled = true
        
                iitem3.value = ''
                price3.value = ''
                qty3.value = ''
                subtotal3.value = ''
                iitem3.disabled = true
                price3.disabled = true
                qty3.disabled = true
        
                iitem4.value = ''
                price4.value = ''
                qty4.value = ''
                subtotal4.value = ''
                iitem4.disabled = true
                price4.disabled = true
                qty4.disabled = true 
            }
            else{
                var result = parseFloat(price2.value) * parseInt(qty2.value)
                subtotal2.value = result.toFixed(2)
                save.disabled = false
                iitem3.disabled = false
                price3.disabled = false
                qty3.disabled = false            
            }            
        }
    }
})
qty2.addEventListener('change', function(){
    if(price2.value <= '0'){
        qty2.value = ''
        subtotal2.value = ''
        save.disabled = true

        iitem3.value = ''
        price3.value = ''
        qty3.value = ''
        subtotal3.value = ''
        iitem3.disabled = true
        price3.disabled = true
        qty3.disabled = true

        iitem4.value = ''
        price4.value = ''
        qty4.value = ''
        subtotal4.value = ''
        iitem4.disabled = true
        price4.disabled = true
        qty4.disabled = true
    }
    else{
        if(qty2.value <= '0'){
            qty2.value = ''
            subtotal2.value = ''
            save.disabled = true
        
            iitem3.value = ''
            price3.value = ''
            qty3.value = ''
            subtotal3.value = ''
            iitem3.disabled = true
            price3.disabled = true
            qty3.disabled = true
    
            iitem4.value = ''
            price4.value = ''
            qty4.value = ''
            subtotal4.value = ''
            iitem4.disabled = true
            price4.disabled = true
            qty4.disabled = true         
        }
        else{
            if(price2.value <= "0" || price2.value == ''){
                subtotal2.value = ''
                save.disabled = true
        
                iitem3.value = ''
                price3.value = ''
                qty3.value = ''
                subtotal3.value = ''
                iitem3.disabled = true
                price3.disabled = true
                qty3.disabled = true
        
                iitem4.value = ''
                price4.value = ''
                qty4.value = ''
                subtotal4.value = ''
                iitem4.disabled = true
                price4.disabled = true
                qty4.disabled = true 
            }
            else{
                var result = parseFloat(price2.value) * parseInt(qty2.value)
                subtotal2.value = result.toFixed(2)
                save.disabled = false
                iitem3.disabled = false
                price3.disabled = false
                qty3.disabled = false            
            }     
        }
    }
    
})
iitem3.addEventListener('change', function(){
    price3.value = ''
    qty3.value = ''
    subtotal3.value = ''
    price3.disabled = false
    qty3.disabled = false
    save.disabled = true

    iitem4.value = ''
    price4.value = ''
    qty4.value = ''
    subtotal4.value = ''
    iitem4.disabled = true
    price4.disabled = true
    qty4.disabled = true
})
price3.addEventListener('change', function(){
    if(isNaN(price3.value)){
        price3.value = ''
        subtotal3.value = ''
        save.disabled = true

        iitem4.value = ''
        price4.value = ''
        qty4.value = ''
        subtotal4.value = ''
        iitem4.disabled = true
        price4.disabled = true
        qty4.disabled = true
    }
    else{
        if(price3.value <= '0'){
            subtotal3.value = ''
            qty3.value = ''
            save.disabled = true
    
            iitem4.value = ''
            price4.value = ''
            qty4.value = ''
            subtotal4.value = ''
            iitem4.disabled = true
            price4.disabled = true
            qty4.disabled = true 
        }
        else{
            if(qty3.value <= "0" || qty3.value == ''){
                subtotal3.value = ''
                save.disabled = true
        
                iitem4.value = ''
                price4.value = ''
                qty4.value = ''
                subtotal4.value = ''
                iitem4.disabled = true
                price4.disabled = true
                qty4.disabled = true 
            }
            else{
                var result = parseFloat(price3.value) * parseInt(qty3.value)
                subtotal3.value = result.toFixed(2)
                save.disabled = false
                iitem4.disabled = false
                price4.disabled = false
                qty4.disabled = false            
            }            
        }
    }
})
qty3.addEventListener('change', function(){
    if(price3.value <= '0'){
        qty3.value = ''
        subtotal3.value = ''
        save.disabled = true

        iitem4.value = ''
        price4.value = ''
        qty4.value = ''
        subtotal4.value = ''
        iitem4.disabled = true
        price4.disabled = true
        qty4.disabled = true
    }
    else{
        if(qty3.value <= '0'){
            qty3.value = ''
            subtotal3.value = ''
            save.disabled = true
    
            iitem4.value = ''
            price4.value = ''
            qty4.value = ''
            subtotal4.value = ''
            iitem4.disabled = true
            price4.disabled = true
            qty4.disabled = true         
        }
        else{
            if(price3.value <= "0" || price3.value == ''){
                subtotal3.value = ''
                save.disabled = true
        
                iitem4.value = ''
                price4.value = ''
                qty4.value = ''
                subtotal4.value = ''
                iitem4.disabled = true
                price4.disabled = true
                qty4.disabled = true 
            }
            else{
                var result = parseFloat(price3.value) * parseInt(qty3.value)
                subtotal3.value = result.toFixed(2)
                save.disabled = false
                iitem4.disabled = false
                price4.disabled = false
                qty4.disabled = false            
            }     
        }
    }
    
})
iitem4.addEventListener('change', function(){
    price4.value = ''
    qty4.value = ''
    subtotal4.value = ''
    price4.disabled = false
    qty4.disabled = false
    save.disabled = true
})
price4.addEventListener('change', function(){
if(isNaN(price4.value)){
    price4.value = ''
    subtotal4.value = ''
    save.disabled = true
}
else{
    if(price4.value <= '0'){
        subtotal4.value = ''
        qty4.value = ''
        save.disabled = true
    }
    else{
        if(qty4.value <= "0" || qty4.value == ''){
            subtotal4.value = ''
            save.disabled = true
        }
        else{
            var result = parseFloat(price4.value) * parseInt(qty4.value)
            subtotal4.value = result.toFixed(2)
            save.disabled = false          
        }            
    }
}
})
qty4.addEventListener('change', function(){
    if(price4.value <= '0'){
        qty4.value = ''
        subtotal4.value = ''
        save.disabled = true
    }
    else{
        if(qty4.value <= '0'){
            qty4.value = ''
            subtotal4.value = ''
            save.disabled = true      
        }
        else{
            if(price4.value <= "0" || price4.value == ''){
                subtotal4.value = ''
                save.disabled = true
            }
            else{
                var result = parseFloat(price4.value) * parseInt(qty4.value)
                subtotal4.value = result.toFixed(2)
                save.disabled = false          
            }     
        }
    }
    
})