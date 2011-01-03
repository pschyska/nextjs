function Component(name, endpoints) {
    if (!name) throw 'Need a name';
    this.name = name;
    this.endpoints = endpoints;
    ComponentRegistry.register(this);
    return this;
}


Component.prototype.endpointConfig = function(endpoints) {
    var res = [];
    for (var k in endpoints) {
        res += '{"name":"' + k + '" , "len":' + endpoints[k].length + '}';
    }
    return res;
};

Component.prototype.clientBaseClass = function() {
    if (this.constructor.__super__ != null) {
        return 'NextJs.classes.' + this.constructor.__super__.constructor.name;
    } else {
        return 'Ext.Component';
    }
};

Component.prototype.globalId = function() {
    return this.name.replace(/[^0-9A-Za-z_]/g, '-').replace(/\-+(.)?/g,
    function(match, c) {
        return (c || '').toUpperCase();
    });
};

Component.prototype.missingClasses = function() {
    var res;
    res = '';
    if (!ClassRegistry.clientHasClass(this.constructor.name)) {
        res += 'var classdef=' + (this.client.toString()) + '\n';
        res += 'NextJs.classes.' + this.constructor.name + '=Ext.extend(' + (this.clientBaseClass()) + ', classdef());';
        ClassRegistry.register(this.constructor.name);
    }
    res;
    if (this.constructor.name !== 'Component') {
        res = this.constructor.__super__.missingClasses() + '\n' + res;
    }
    return res;
};
Component.prototype.render = function() {
    var clientCode = 'Ext.ns("NextJs.providers","NextJs.classes","NextJs.components")\n';
    clientCode += this.missingClasses() + "\n";
    clientCode += 'Ext.Direct.addProvider({"type": "remoting", "url":"components", "actions": {\n';
    clientCode += '"' + this.globalId() + '": [\n';
    clientCode += this.endpointConfig(this.endpoints) + '\n';
    clientCode += ']\n';
    clientCode += '}});\n';
    clientCode += 'var config=' + this.clientConfig.toString() + '\n';
    clientCode += 'NextJs.components.' + this.globalId() + '=new NextJs.classes.' + this.constructor.name + '(config());\n';
    clientCode += 'NextJs.components.' + this.globalId() + '.server = NextJs.providers.' + this.globalId() + ';\n';
    return clientCode;
};
Component.prototype.clientConfig = function() {};
Component.prototype.client = function() {
    return {
        isNextJs: true
    };
};

module.exports = Component;