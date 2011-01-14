module.exports = {
    index: function(request, response) {
        response.send(ComponentRegistry.get(request.params.componentId).render());
    },
    indexPost: function(request, response) {
      if(request.body.type != 'rpc') {
        throw("This request is not a rpc request");
      }
      var action = request.body.action;
      var method = request.body.method;
      var data = request.body.data;
      var tid = request.body.tid;
      // find the component specified in action
      var componentInstance = ComponentRegistry.get(action);
      var result="";
      if (componentInstance) {
        // call the function specified in method and pass the data specified in data
        result=componentInstance.endpoints[method].apply(componentInstance, data).toString();
      }
      serverExpansion = /\$[a-zA-Z0-9]*/;
      expansion = result.match(serverExpansion);
      while (expansion) {
          result = result.replace(expansion[0], componentInstance[expansion[0].slice(1)]);
          expansion = result.match(serverExpansion);
      }
      var resp={
        "type": "event",
        "name": "rpcResult",
        "data": {
          "comp": componentInstance.globalId(),
          "code": result
        }
      };
      response.send(JSON.stringify(resp));
    },
    endpoint: function(request, response) {
        var component,
        expansion,
        result,
        serverExpansion,
        _ref;
        component = ComponentRegistry.get(request.params.componentId);
        result = (_ref = component.endpoints)[request.params.endpoint].apply(_ref, JSON.parse(request.params.args)).toString();
        serverExpansion = /\$[a-zA-Z0-9]*/;
        expansion = result.match(serverExpansion);
        while (expansion) {
            result = result.replace(expansion[0], component[expansion[0].slice(1)]);
            expansion = result.match(serverExpansion);
        }
        return response.send('(' + result + ').call(this)');
    }
};
