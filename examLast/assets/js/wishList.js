/// WISH LIST 
var wishList = (function() {
    // =============================
    // Private methods and propeties
    // =============================
    wlist = [];
    
    // Constructor
    function Item(name, price, img) {
      this.name = name
      this.price = price
      this.img = img
    }
    
    // Save 
    function saveWishList() {
      sessionStorage.setItem('wishList', JSON.stringify(wlist));
    }
    
    // Load 
    function loadWishList() {
      wlist = JSON.parse(sessionStorage.getItem('wishList'));
    }
    if (sessionStorage.getItem("wishList") != null) {
      loadWishList();
    }
    
    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};
    
    // Add item
    obj.addItemToWishList = function(name, price, img) {
      for(var item in wlist) {
        if(wlist[item].name === name) {
          saveWishList();
          return;
        }
      }
      var item = new Item(name, price, img);
      wlist.push(item);
      saveWishList();
    }

    // Remove item 
    obj.removeItemWishList = function(name) {
        for(var item in wlist) {
          if(wlist[item].name === name) {
            wlist.splice(item, 1);
            break;
          }
      }
      saveWishList();
    }
    
    // Count  
    obj.totalCount = function() {
      var totalCount = 0;
      for(var item in wlist) {
        totalCount += 1
      }
      return totalCount;
    }

    // List 
    obj.listWishList= function() {
      var wlistCopy = [];
      for(i in wlist) {
        item = wlist[i];
        itemCopy = {};
        for(p in item) {
          itemCopy[p] = item[p];
  
        }
        //itemCopy.total = Number(item.price * item.count).toFixed(2);
        wlistCopy.push(itemCopy)
      }
      return wlistCopy;
    }

    obj.checkItem = function(name) {
      for(var item in wlist) {
        if(wlist[item].name === name) {
          return 1
        }
      }
    }
  
    return obj;
  })();