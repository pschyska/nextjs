/*  this registers component classes (client side Ext classes). it is able to determine if a client already has some class.
    TODO: attach to session */

module.exports = {
    classes: {},
    register: function(className) {
/*        if (this.classes[className]) {
            throw new Error('class ' + className + ' has been registered before');
        }
        this.classes[className] = true;*/
    },
    clientHasClass: function(className) {
        return false;//this.classes[className];
    }
};
