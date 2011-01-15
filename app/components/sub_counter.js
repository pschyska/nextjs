var SubCounter;
__extends(SubCounter, Counter);
function SubCounter(name) {
    SubCounter.__super__.constructor.call(this, name, this.endpoints);
    this.anotherCounter = 0;
}

Counter.prototype.clientBaseClass = function() {
    return "NextJs.classes.Counter";
};

SubCounter.prototype.clientConfig = function() {
    var cc=NextJs.classes.SubCounter.superclass.clientConfig.call();
    cc.someSubclassConfig='some value';
    return cc;
};

module.exports = SubCounter;
