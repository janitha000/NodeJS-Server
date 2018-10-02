'use strict'

module.exports = function (app) {
    var resourceController = require("../controllers/resourceController");

    app.route('/cpu')
        .get(resourceController.get_cpu);
    
    app.route('/memory')
        .get(resourceController.get_memory);
}