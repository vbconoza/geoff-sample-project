/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs   = require('fs');
var pdf  = require('html-pdf');
var path = require('path');
var ejs  = require('ejs');

module.exports = {
    new: function (req, res) {
        return res.view();
    },

    create: function (req, res) {

        List.create(req.body)
            .exec(function(err, list) {
                if (err) {
                    req.flash("error", "Something went wrong. Check your inputs.");
                    return res.redirect("/form");
                }
                
                return res.redirect("/list/" + list.id);
            });
    },

    index : function(req, res) {

        List.find().exec(function (err, list) {
            if (err) return res.serverError(err.stack);
            return res.view({item : list});
        });
    },

    show : function (req, res) {

        var item = req.param('id');
        List.findOne()
            .where({id : item})
            .exec(function (err, item) {
                if (err) return res.serverError(err.stack);
                return res.view({item : item});
            });
    },

    download : function (req, res) {
        var item = req.param('id', false);

        var criteria = (item) ? {id : item} : {};
        var file     = (item) ? 'views/template/pdf.ejs' : 'views/template/pdf1.ejs';

        List.find(criteria)
            .exec(function (err, item) {
                if (err) return res.serverError(err.stack);
                if (!item.length) return res.notFound();

                var result = (item.length == 1) ? item[0] : item;
                fs.readFile(path.normalize(file), 'utf8', function(err, template){
                    if (err)  return res.serverError(err.stack);
                    var html = ejs.render(template, {item : result});

                    pdf.create(html, { format: 'Letter' }).toFile("./form.pdf", function(err, result) {
                        res.set('Content-disposition', 'attachment; filename=' + "form.pdf");
                        res.set('Content-type', 'application/pdf');

                        var filestream = fs.createReadStream("./form.pdf");

                        filestream.on('open', function() {
                           filestream.pipe(res);
                        });
                        
                        filestream.on('error', function(err) {
                            sails.log.error(err);
                            return res.serverError(err);
                        });

                        filestream.on('end', function () {
                            filestream.close();
                            return res.ok();
                        });
                    });
                });
            });
    }
};
