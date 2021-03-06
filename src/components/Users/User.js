export var User = (function() {
  var full_name = "";
  var userID=0;
  var storeID=0;

  var getName = function() {
    return full_name;    // Or pull this from cookie/localStorage
  };

  var setName = function(name) {
    full_name = name;
    // Also set this in cookie/localStorage
  };

  var getStoreID=function(){
    return storeID;
  }

  var setStoreID=function(_storeID){
    storeID=_storeID;
  }

  var getUserID=function(){
    return userID;
  }

  var setUserID=function(_userID){
    userID=_userID;
  }

  return {
    getName: getName,
    setName: setName,
    getUserID:getUserID,
    setUserID:setUserID,
    getStoreID:getStoreID,
    setStoreID:setStoreID
  }

})();
