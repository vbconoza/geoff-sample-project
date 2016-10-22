/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt    = require('bcrypt');

module.exports = {
    new: function (req, res) {
        return res.view();
    },

    create: function (req, res) {

        var username = req.body.username;
        var password = req.body.password;
        
        if (!username || !password) {
            req.flash("error", "Check your inputs");
            return res.redirect("/login");
        }

        User.findOne().where({username: username})
            .exec(function (err, user) {
                if (err)   {
                    req.flash("error", "Something went wrong. Try again.");
                    return res.redirect("/login");
                }
                if (!user) {
                    req.flash("error", "User not found");
                    return res.redirect("/login");
                }

                bcrypt.compare(password, user.password, function (err, valid) {
                    if (err)   {
                        req.flash("error", "Something went wrong. Try again.");
                        return res.redirect("/login");
                    }

                    if (!valid) {
                        req.flash("error", "Login Failed");
                        return res.redirect("/login");
                    }

                    delete user.password;
                    if (user.role == 'ADMIN') req.session.admin = true;
                    req.session.user = user;
                    return res.redirect("/form");
                });
            });
    }, 
    
    destroy: function (req, res) {
        req.session.destroy();
        return res.redirect("/login");
    },
};
