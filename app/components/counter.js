__extends(Counter, Component)
function Counter(name, endpoints) {
  Counter.__super__.constructor.call(this, name, endpoints);
}

module.exports = Counter