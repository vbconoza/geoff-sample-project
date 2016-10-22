console/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    home: function (req, res) {
        return res.view();
    },

    new: function (req, res) {
        return res.view();
    },

    create: function (req, res) {

        var username = req.body.username;
        var password = req.body.password;
        var role     = req.body.role;

        User.create({username: username, password: password, role: role})
            .exec(function(err, user) {
                if (err) {
                    req.flash("error", "Something went wrong. Check your inputs.");
                    return res.redirect("/register");
                }
                
                var location = "/login";
                if (req.session.user)  location = "/form";
                if (req.session.admin) location = "/list";

                return res.redirect(location);
            });
    },
};
