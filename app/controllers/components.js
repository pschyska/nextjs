module.exports = {
    index: function(request, response) {
        return response.send(ComponentRegistry.get(request.params.componentId).render());
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
