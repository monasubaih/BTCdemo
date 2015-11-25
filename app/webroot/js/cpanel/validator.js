//not a number
$.validator.addMethod("nonNumeric", function(value, element) {
    return this.optional(element) || !isNaN(Number(value));
}, _tl("Only alphabatic characters allowed."));

//numeric
$.validator.addMethod(
        "numeric",
        function(value, element) {
            return  (/^\d*$/.test(value));
        },
        _tl("Only digits characters allowed.")
        );

//float 
$.validator.addMethod(
        "float",
        function(value, element) {
            return  (/^[0-9]*\.?[0-9]*$/.test(value));
        },
        _tl("Only digits characters allowed.")
        );
// mobile 
$.validator.addMethod(
        "mobile",
        function(value, element) {
            return  (/^((\+){0,1}91(\s){0,1}(\-){0,1}(\s){0,1})?([0-9]{10})$/.test(value));
        },
        _tl("wrong mobile number.")
        );

/* CUSTOM Date Validator */
var isDate = function(value) {
    var validDate = /^(\d{2})\/(\d{2})\/(\d{4})?$/;
    var validDatewithoneDigit = /^(\d{1})\/(\d{1})\/(\d{4})?$/;
    if (value != '' && value != null)
        return validDate.test(value) ||validDatewithoneDigit.test(value);
    else
        return true;
}
$.validator.addMethod(
        "isdate",
        function(value, element) {
            return isDate(value);
        });

$.validator.addMethod(//adding a method to validate select box//
        "chosen",
        function(value, element) {
            return (value == null ? false : (value.length == 0 ? false : true))
        },
        "please select an option"//custom message
        );
cpanelValidator = {
    validator: null,
    resetErrors: function(validatorOb) {
        validatorOb = (validatorOb == null) ? cpanelValidator.validator : validatorOb;
        var rulesElement = validatorOb.settings.rules;
        if (rulesElement) {
            var element = null;
            $.each(rulesElement, function(elementName, elementRules) {
                element = $('[name="' + elementName + '"]');
                element = cpanelValidator.getElementErrorPlace(element);
                cpanelValidator.destroyQtip(element);
                element.closest('div').removeClass("f_error");
            });
        }
    },
    getElementErrorPlace: function(element) {
        if (element.attr('errorPlaceElement') !== undefined && element.attr('errorPlaceElement') !== false) {
            element = $(element.attr('errorPlaceElement'));
        }
        return element;

    },
    destroyQtip: function(element) {
        if ((element.is(':checkbox')) || (element.is(':radio'))) {
            element.parent('label').parent('div').find('.error_placement').qtip('destroy');
        } else {
            element.qtip('destroy');
        }

    },
    validate: function(selector, rules, messages) {
        this.validator = $(selector).validate({
            onkeyup: true,
            errorClass: 'error',
            validClass: 'valid',
            focusInvalid: "false",
            onfocusout: function(element) {
                $(element).valid()
            },
            onkeyup: false,
                    debug: false,
            highlight: function(element) {
                $(element).closest('div').addClass("f_error");
            },
            unhighlight: function(element) {
                $(element).closest('div').removeClass("f_error");
            },
            rules: rules,
            messages: messages,
            ignore: [],
            invalidHandler: function(form, validator) {

            },
            errorPlacement: function(error, element) {
                // Set positioning based on the currencies position in the form
                var elem = $(element);
                elem = cpanelValidator.getElementErrorPlace(elem);
                // Check we have a valid error message
                if (!error.is(':empty')) {
                    var qtipInvalidObSetting = {
                        overwrite: false,
                        content: error,
                        position: {
                            my: 'bottom left',
                            at: 'top right',
                            viewport: $(window),
                            adjust: {x: -8, y: 6}
                        },
                        show: {
                            event: false,
                            ready: true
                        },
                        hide: false,
                        style: {
                            classes: 'ui-tooltip-red ui-tooltip-rounded' // Make it red... the classic error colour!
                        }
                    };

                    if ((elem.is(':checkbox')) || (elem.is(':radio'))) {
                        qtipInvalidObSetting.overwrite = true;
                        qtipInvalidObSetting.position = {
                            my: 'left bottom',
                            at: 'center right',
                            viewport: $(window),
                            adjust: {
                                x: 6
                            }
                        };

                        // Apply the tooltip only if it isn't valid
                        elem.filter(':not(.valid)').parent('label').parent('div').find('.error_placement').qtip(qtipInvalidObSetting)
                                // If we have a tooltip on this element already, just update its content
                                .qtip('option', 'content.text', error);

                    } else {
                        // Apply the tooltip only if it isn't valid
                        elem.filter(':not(.valid)').qtip(qtipInvalidObSetting)
                                // If we have a tooltip on this element already, just update its content
                                .qtip('option', 'content.text', error);
                    }
                    ;

                }
                // If the error is empty, remove the qTip
                else
                    cpanelValidator.destroyQtip(elem);
            },
            success: $.noop // Odd workaround for errorPlacement not firing!
        });

    }};
