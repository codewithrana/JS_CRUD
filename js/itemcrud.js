const itemOperations = {
    itemList:[],
    add(id, name, price,itemdate, desc, url, color ){
        var itemObject = new Item(id, name, price,itemdate, desc, url, color);
        this.itemList.push(itemObject);

    },
    getItems(){
        return this.itemList;
    },
    searchById(id){
        return this.itemList.filter(itemObject=>itemObject.id==id)[0];
        //var items = this.itemList.filter(itemObject=>itemObject.id==id);
        //return items[0];
    },
    mark(id){
        this.searchById(id).toggle();
    },
    countMark(){
        return this.itemList.filter(itemObject=>itemObject.markForDelete).length;
    }
}