Ext.onReady(function() {
    Ext.Direct.on('event', function(event,provider) {
      if(event.name == "rpcResult") {
        var targetComponent=NextJs.components[event.getData().comp];
        var fun=eval('('+event.getData().code+');');
        fun.apply(targetComponent);
      }
    });
    NextJs.components.someCounter.render('container');
    NextJs.components.anotherCounter.render('container2');
});
