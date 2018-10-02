'use strict'
module.exports = function (app) {
    var learn = require("../controllers/learnController");

    app.route('/learn')
        .get(learn.get_all);
        //.post(learn.post);

    app.route('/learn/:id')
        .get(learn.get_by_id);
        //.put(learn.put)
       // .delete(learn.delete);
}