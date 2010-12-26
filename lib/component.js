
function Component(name, endpoints) {
  if(!name) throw "Need a name"
  this.name = name;
  this.endpoints = endpoints;
  ComponentRegistry.register(this);
  return this;
}

Component.prototype.globalId = function () {
  return this.name.replace(/[^0-9A-Za-z_]/g, "-").replace(/\-+(.)?/g, function(match, char) {
    return (char || '').toUpperCase();
  });  
};

Component.prototype.endpointConfig = function(endpoints) {
  var res = [];
  for (var k in endpoints) {
    res += "{'name':'" + k + "' , 'len':" + endpoints[k].length + "}";
  }
  return res;
};

module.exports = Component