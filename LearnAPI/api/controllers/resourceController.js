'use strict'

var os = require('os');

exports.get_cpu = function(req,res){
    res.json(os.cpus());
}

exports.get_memory = function(req,res){
    res.json(os.totalmem());
}