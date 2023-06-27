let title = document.getElementById('Title');
price = document.getElementById('price');
taxes = document.getElementById('taxes');
    ads = document.getElementById('ads');
    discount = document.getElementById('discount');
    total = document.getElementById('total');
    count = document.getElementById('count');
    category = document.getElementById('category');
    submit = document.getElementById('submit');
    
    mood = 'Create';
    let tpm;
    // get total

    function getPrices(){
        if(price.value != ''){
            let result = (+price.value + +taxes.value + +ads.value - +discount.value)
            total.innerHTML = result
            total.style.background = 'green'
        } else{
        total.innerHTML = ''
        total.style.background = '#9c1212'
        
    }
}

// create product
let dataPro;
if (localStorage.pro != null) {
    dataPro = JSON.parse(localStorage.pro)
}else{
    dataPro = [];
}


submit.onclick = function() {
    let product = { 
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }
    
    // clean data
    if(title.value != '' && price.value != '' && category.value != '' && count.value < 101){
        // count
        if(mood === 'Create'){
            if(product.count > 1){
                for(let i = 0; i < product.count; i++ ){
                    dataPro.push(product)
                    
                }
            }else{
                dataPro.push(product)
    
}
} else {
    dataPro[tpm] = product
    mood = 'Create'
submit.innerHTML = 'Create'
count.style.display = 'block'
}
clearData()

}else{

    alert(" All Fields Required")
}





// save localstorage
localStorage.setItem('pro',   JSON.stringify(dataPro))

readData()
}


// clear input

function clearData(){
    title.value = '',
    price.value = '',
    taxes.value = '',
    ads.value = '',
    discount.value = '',
    total.innerHTML = '',
    count.value = '',
    category.value = ''
};

// read

function readData(){
    getPrices()

    let table = '';
    for(let i = 0; i < dataPro.length; i++){
        table +=`
<tr>
    <td>${[i + 1]}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>t${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button onclick= "updateData(${i})" id="update">update</button></td>
    <td><button onclick= "ByDelete(${i})" id="delete">delete</button></td>
</tr>
`
    }
    document.getElementById("tbody").innerHTML = table;
    let deleteAll = document.getElementById('deleteAll')
    if(dataPro.length > 0){
       deleteAll.innerHTML = `<button onclick = "btnDeleteAll()">deleteAll (${dataPro.length})</button>`
    } else{
        deleteAll.innerHTML = ''
    }
}
readData()
// delete

function ByDelete(i) {
    dataPro.splice(i,1)
    localStorage.pro = JSON.stringify(dataPro)
    readData()
}


function btnDeleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    readData();
    
}


// update

function updateData(i){
    title.value = dataPro[i].title
    price.value = dataPro[i].price
    taxes.value = dataPro[i].taxes
    ads.value = dataPro[i].ads
    discount.value = dataPro[i].discount
    category.value = dataPro[i].category

    count.style.display = 'none'
    submit.innerHTML = 'Update'
    tpm = i
    mood = 'Update'
    scroll({
        top:0,
        behavior:"smooth",
    })
    getPrices()
}

// search
let searchMood = 'title'

function searchData(id){
    let search = document.getElementById('search')

    if(id === 'searchTitle'){
        searchMood = 'title';
    }else{
        searchMood = 'category';
    }

    search.placeholder= 'Search By ' + searchMood;

    search.focus()
    search.value = ''
    readData()
}




function searchOfMood(value){

    let table = '';
    for(let i = 0; i < dataPro.length; i++ ){

    if(searchMood === 'title'){


            if(dataPro[i].title.includes(value.toLowerCase())){

                table +=`
                <tr>
                    <td>${[i]}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>t${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick= "updateData(${i})" id="update">update</button></td>
                    <td><button onclick= "ByDelete(${i})" id="delete">delete</button></td>
                </tr>
                `
            }
        
    }else{
        

            if(dataPro[i].category.includes(value.toLowerCase())){

                table +=`
                <tr>
                    <td>${[i]}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>t${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick= "updateData(${i})" id="update">update</button></td>
                    <td><button onclick= "ByDelete(${i})" id="delete">delete</button></td>
                </tr>
                `
            }
        
        }
    document.getElementById("tbody").innerHTML = table;
    }
}