let title = document.getElementById('title');
let price = document.getElementById('price'); 
let tax = document.getElementById('tax');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let NameOfRestaurant = document.getElementById('Name Of Restaurant');
let submit = document.getElementById('submit');

let mood = 'create'
let kafaka;



function getTotal()
{
    if (price.value>0){
        let result = (+price.value + +tax.value)
        - +discount.value;
        total.innerHTML = result
        total.style.background = '#040';
    }else{
        total.innerHTML = ' ';
        total.style.background = ('#704792');
    }
}




let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = [];
}


submit.onclick = function(){
    let newPro = {
        title:title.value,
        price:price.value,
        tax:tax.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        NameOfRestaurant:NameOfRestaurant.value,
    }
    if(title.value !=''
    && price.value !=''
    && NameOfRestaurant.value !=''){
        if(mood === 'create'){
        dataPro.push(newPro);
    }else{
        dataPro[  kafaka  ] = newPro
        mood = 'create';
        submit.innerHTML = 'create'
    }
    clearData()
    }
    


    
    localStorage.setItem('product',     JSON.stringify(dataPro)   )
    


    showData()
}



function clearData(){
    title.value = '';
    price.value = '';
    tax.value = '';
    discount.value = '';
    total.innerHTML ='';
    count.value = '';
    NameOfRestaurant.value = '';
}




function showData()
{
getTotal()
let table = '';
for(let i = 0; i < dataPro.length;i++)
{
    table += `
    <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].tax}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].count}</td>
        <td>${dataPro[i].NameOfRestaurant}</td>
        <td><button onclick="updateData(${i})" id="UPDATE">update</button></td>
        <td><button onclick="deleteData(${i})" id="DELETE">delete</button></td>
    </tr>`
}

document.getElementById('data').innerHTML = table;
let btnDelete = document.getElementById("deleteAll");
if(dataPro.length > 0){
    btnDelete.innerHTML =`<button onclick="deleteAll()">Delete All (${dataPro.length})</button>
    `
}else{btnDelete.innerHTML = ''};
}
showData()



function deleteData(i)
{
    dataPro.splice(i,1);
    localStorage.product =JSON.stringify(dataPro);
    showData()
}


function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData()
}



function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    tax.value = dataPro[i].tax;
    discount.value = dataPro[i].discount;
    count.value = dataPro[i].count;
    NameOfRestaurant.value = dataPro[i].NameOfRestaurant;
    getTotal()
    submit.innerHTML = 'Update'
    mood = 'update';
    kafaka = i;
    scroll({
        top:0,
        behavior:'smooth'
    })

}








let searchMood = 'title';

function getSearchMood(id)
{
    let search = document.getElementById('search');
    if(id == 'searchtitle'){
        searchMood = 'title'
        
    }else{
        searchMood = 'Name Of Restaurant';
    }
    search.placeholder = 'Search By '+ searchMood;
    search.focus()
    search.value ='';
    showData()
}


function searchData(value)
{
    let table=''
    if(searchMood == 'title')
    {

        for(let i =0; i < dataPro.length;i++){
            if(dataPro[i].title.includes(value)){
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].tax}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].count}</td>
                    <td>${dataPro[i].NameOfRestaurant}</td>
                    <td><button onclick="updateData(${i})" id="UPDATE">update</button></td>
                    <td><button onclick=deleteData(${i}) id="DELETE">delete</button></td>
                </tr>`
            }
        }
    }else{
        for(let i =0; i < dataPro.length;i++){
            if(dataPro[i].NameOfRestaurant.includes(value)){
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].tax}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].count}</td>
                    <td>${dataPro[i].NameOfRestaurant}</td>
                    <td><button onclick="updateData(${i})" id="UPDATE">update</button></td>
                    <td><button onclick=deleteData(${i}) id="DELETE">delete</button></td>
                </tr>`
            }
        }

    }
    document.getElementById('data').innerHTML = table;

}








