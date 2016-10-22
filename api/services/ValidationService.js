module.exports = {

    consolidateErrors  : function (errors){
        return _.reduce(errors, function(result, errs, key){
                                var msg = _.uniq(_.map(errs, function(err_msg, err_rule){return err_msg;}));
                                result[key] = msg.join(" ");
                                return result;
                            }, {});
    },

    getValidationErrors : function(model, validationError, group) {
        if (typeof group == 'undefined') group = true;
        var messages = model.validationMessages;
        var default_msg = "Something went wrong";
        var error_messages = {};
        var error_msg;
        _.forEach(validationError, function(errors, field){
            _.forEach(errors, function(details){
                if (messages[field] && messages[field][details.rule])
                    error_msg = messages[field][details.rule];
                else {
                    sails.log.error('Undefined validation message for ' + model.adapter.identity + '.' + field + '; rule: ' + details.rule + '; message: ' + details.message);
                    error_msg = default_msg;
                }

                if (group){
                    if (!error_messages[field]) error_messages[field] = [];
                    error_messages[field].push(error_msg);
                }
                else {
                    if (!error_messages[field]) error_messages[field] = {};
                    error_messages[field][details.rule] = error_msg;
                }
            });
            
            if (group)
                error_messages[field] = _.uniq(error_messages[field]).join(". ");
        });
    
        return error_messages;
    },
};