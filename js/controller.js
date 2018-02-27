window.addEventListener("load", init);

function init(){
    updateCount();
    bindEvents();
    document.querySelector("#update").setAttribute("disabled",true);
}

function disable(flag){
   // var buttons = document.querySelectorAll("button");
   var buttons= document.getElementsByTagName("button"); 
   Array.prototype.forEach.call(buttons,(button)=>{
        // if(button.id!=='update'){
          button.setAttribute("disabled",flag);
        // }
       
    });
     if(flag){
        document.querySelector("#update").removeAttribute("disabled");    
        //document.querySelector("#update").setAttribute("disabled",false);
        }
        else{
             document.querySelector("#update").setAttribute("disabled",true);
        } 
   
}


function bindEvents() {
    document.querySelector("#add").addEventListener("click", addItem);
    document.querySelector("#update").addEventListener("click",updateItem);
    document.querySelector("#save").addEventListener("click",saveItem);
    document.querySelector("#load").addEventListener("click",loadItem);
    document.querySelector("#loadfromserver").addEventListener("click",loadFromServer);
}
function loadFromServer(){
    fetch(urlConfig.itemUrl).then(data=>data.json().then(res=>{
        itemOperations.itemList = res.items;
        printTable();
    }));
}
function loadItem(){
    if(localStorage && localStorage.items){
        var items = JSON.parse(localStorage.items);
        itemOperations.itemList = items;
        printTable();
    }
    else{
        alert("Can't Load Either LocalStorage or Key Not Present...");
    }
}
function saveItem(){
    if(localStorage){
       var itemArray =  itemOperations.getItems();
       var json = JSON.stringify(itemArray);
       console.log("Item Array is ",itemArray);
       console.log("JSON is ",json);
       localStorage.items = json;
       alert("Data Saved...");
    }
    else{
        alert("LocalStorage Not Support by Your Browser....");
    }
}

function createIcon(path,id,fn){
    var img = document.createElement("img");
    img.src = path;
    img.className="size";
    img.setAttribute("itemid",id);
    img.addEventListener("click",fn);
    return img;
}

function toggleDelete(){
    console.log("Toggle Happen ",this.getAttribute("itemid"));
    var id = parseInt(this.getAttribute("itemid"));
    var img = this;
    var tr = img.parentNode.parentNode;
    console.log("TR is ",tr);
    tr.classList.toggle("red");
    itemOperations.mark(id);
    updateCount();

}

function addItem() {
    var id = document.querySelector("#id").value;
    var name = document.querySelector("#name").value;
    var price = document.querySelector("#price").value;
    var desc = document.querySelector("#desc").value;
    var itemDate = document.querySelector("#itemdate").value;
    var url = document.querySelector("#url").value;
    var color = document.querySelector("#color").value;
    itemOperations.add(id, name, price, itemDate, desc, url, color);
    var items = itemOperations.getItems();
    var lastItemObject = items[items.length-1];
    updateCount();
    print(lastItemObject);
}

function updateCount(){
    document.querySelector("#total").innerHTML =  itemOperations.getItems().length;
    document.querySelector("#mark").innerText = itemOperations.countMark();
    document.querySelector("#unmark").innerText = itemOperations.getItems().length - itemOperations.countMark();
}

function print(itemObject) {
    var itemTable= document.querySelector("#itemtable");
    var tr = itemTable.insertRow();
    var index = 0;
    for(let key in itemObject){
        if(key=='markForDelete' || key=='toggle'){
            continue;
        }
    tr.insertCell(index).innerText = itemObject[key];
    index++;
    }   
    var td = tr.insertCell(index);
    td.appendChild(createIcon("images/trash.png",itemObject.id,toggleDelete));
    td.appendChild(createIcon("images/edit.png",itemObject.id,editItem));

   //itemTable.insertRow()
}
 var itemObject ;
function editItem(){
    var id = parseInt(this.getAttribute("itemid"));
    itemObject = itemOperations.searchById(id);
    for(let key in itemObject){ 
     if(key=='markForDelete'){
         continue;
     }   
    document.querySelector("#"+key).value = itemObject[key];
    }
    disable(true);
    //document.querySelector("#update").setAttribute("disabled",false); 
}

function updateItem(){
    for(let key in itemObject){
        if(key=='id' || key=='markForDelete'){
            continue;
        }
        itemObject[key] = document.querySelector("#"+key).value;
    }
    printTable();
    disable(false);
}

function printTable(){
    document.querySelector("#itemtable").innerHTML = "";
    itemOperations.getItems().forEach(print);   
}