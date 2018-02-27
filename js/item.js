// class Item{
//     constructor(id, name, price,itemdate, desc, url, color){
//         this.id =id;
//         this.name = name;
//         this.price = price;
//         this.desc = desc;
//         this.itemdate = itemdate;
        
//         this.url = url;
//         this.color =color;
//         this.markForDelete = false;
//     }
//     toggle(){
//         this.markForDelete= !this.markForDelete;
//     }
// }

function Item(id, name, price,itemdate, desc, url, color){
this.id =id;
        this.name = name;
        this.price = price;
        this.desc = desc;
        this.itemdate = itemdate;
        
        this.url = url;
        this.color =color;
        this.markForDelete = false;
        this.toggle=function(){
             this.markForDelete= !this.markForDelete;
        }
}