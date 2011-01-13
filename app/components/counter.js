var Counter;
__extends(Counter, Component);
function Counter(name) {
    Counter.__super__.constructor.call(this, name, this.endpoints);
    this.counter = 0;
}

Counter.prototype.clientBaseClass = function() {
    return "Ext.Panel";
};

Counter.prototype.endpoints = {
    count: function(howMany) {
        if (!howMany) {
            howMany = 1;
        }
        this.counter += howMany;
        return function() {
            return this.setTitle('The servers says the counter says its at ' + $counter);
        };
    }
};

Counter.prototype.clientConfig = function() {
    return {
        xtype: 'panel',
        header: true,
        title: 'Some panel',
        items: [
        {
            xtype: 'button',
            text: 'Click me, please',
            handler: function() {
                return this.ownerCt.someEndpointFunction();
            }
        }
        ]
    };
};

Counter.prototype.client = function() {
    return {
        someClientVal: 0,
        someClientFunction: function() {
            return this.someClientVal++;
        },
        someEndpointFunction: function() {
            return this.server.count(1);
        }
    };
};

module.exports = Counter;
