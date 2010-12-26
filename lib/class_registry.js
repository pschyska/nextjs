/*  this registers component classes (client side Ext classes). it is able to determine if a client already has some class.
    TODO: attach to session */

module.exports = {
  classes: {},
  register: function(className) {
    if (this.classes[className]) {
      throw "class " + className + " has been registered before";
    }
    return this.classes[className] = true;
  },
  clientHasClass: function(className) {
    return this.classes[className];
  }
};