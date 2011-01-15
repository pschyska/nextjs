var processRpc=function (rpc) {
      if(rpc.type != 'rpc') {
        throw new Error("This request is not a rpc request");
      }
      var action = rpc.action;
      var method = rpc.method;
      var data = rpc.data;
      var tid = rpc.tid;
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
      return resp;
};

module.exports = {
    index: function(request, response) {
        response.send(ComponentRegistry.get(request.params.componentId).render());
    },
    indexPost: function(request, response) {
      var responses=[];
      if(request.body instanceof Array) {
        reqs=request.body;
        for(var i=0;i<reqs.length;i++) {
          responses.push(processRpc(reqs[i]));
        }
      } else if (request.body instanceof Object) {
        responses.push(processRpc(request.body));
      }
      response.send(JSON.stringify(responses));
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
