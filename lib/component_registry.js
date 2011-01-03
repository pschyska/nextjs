/* this registers component instances to be looked up for RPC calls
 TODO: attach to session */

module.exports = {
    components: {},
    register: function(component) {
        if (this.components[component.globalId()]) {
            throw 'component of class ' + component.constructor.name + ' called ' + component.name + ' has been registered before as globalId ' + component.globalId;
        }
        return this.components[component.globalId()] = component;
    },
    get: function(globalId) {
        return this.components[globalId];
    }
};