/*
 * openModalClass class with attr relModal refer to the modal element contain the modal link to auto open
 * clearModalVars class with attr relModal refer to the modal element contain the modal link to auto clear vars
 * 
 * */

function modalWindow(settings) {
    var self = this;
    var defaultSettings = {
        height: '55%',
        width: '70%',
        iframe: true,
        url: null
    };
    if (!settings)
        var settings = {};

    self.height = (settings.hasOwnProperty('height')) ? settings.height : defaultSettings.height;
    self.width = (settings.hasOwnProperty('width')) ? settings.width : defaultSettings.width;
    self.iframe = (settings.hasOwnProperty('iframe')) ? settings.iframe : defaultSettings.iframe;
    self.url = (settings.hasOwnProperty('url')) ? settings.url : defaultSettings.url;

    this.showWithUrl = function() {
        $.colorbox({
            'width': self.width,
            'height': self.height,
            'iframe': self.iframe,
            'href': self.url
        });

    }

    this.show = function() {
        $.colorbox({
            'width': self.width,
            'height': self.height,
            'iframe': self.iframe,
            'href': $(document.activeElement).attr('modal')
        });
    }
    this.close = function() {

        if (this.iframe) {
            parent.$.fn.colorbox.close();
        } else {
            $.fn.colorbox.close();
        }
    }
    this.modalClassOpen = function() {
        var element = '';
        $('.openModalClass').css('cursor', 'pointer');
        $('.openModalClass').live('click', function() {
            if (typeof $(this).attr('relModal') !== 'undefined' &&
                    $(this).attr('relModal') !== false) {

                if (typeof $(this).attr('modalWidth') !== 'undefined' &&
                        $(this).attr('modalWidth') !== false)
                    self.width = $(this).attr('modalWidth') + (($(this).attr('modalWidth').indexOf('px') == -1) ? '%' : 'px');

                if (typeof $(this).attr('modalHeight') !== 'undefined' &&
                        $(this).attr('modalHeight') !== false)
                    self.height = $(this).attr('modalHeight') + (($(this).attr('modalHeight').indexOf('px') == -1) ? '%' : 'px');
                ;

                element = $('#' + $(this).attr('relModal'));

                if (typeof element.attr('modal') !== 'undefined' &&
                        element.attr('modal') !== false) {

                    self.url = element.attr('modal');
                    self.showWithUrl();

                }
            }

            else {

                element = $('.openModalClass').parent().parent().find('input');
                $.each(element, function(index, value) {
                    if (typeof $(this).attr('modal') !== 'undefined' &&
                            $(this).attr('modal') !== false) {
                        self.url = $(this).attr('modal');
                        self.showWithUrl();
                    }
                });
            }
        });
    }

    this.clearEvent = function() {
        $('.clearModalVars').css('cursor', 'pointer');
        var confirmHTML = '<div class="hide"><div id="confirmClear" class="cbox_content"><div class="sepH_c tac">';
        confirmHTML += '<strong id="confirm_dialog_title">'
                + _tl('are you sure you want to clear input')
                + '</strong></div><div class="tac">';
        confirmHTML += '<a href="#" class="btn btn-gebo confirm_yes">' + _tl('Yes') + '</a> <a href="#"class="btn confirm_no">' + _tl('No') + '</a>';
        confirmHTML += '</div></div></div>';

        $('body').append(confirmHTML);

        $('.clearModalVars').live('click', function() {
            var clearElement = $(this);
            $.colorbox({
                initialHeight: '0',
                initialWidth: '0',
                href: "#confirmClear",
                inline: true,
                opacity: '0.3',
                onComplete: function() {
                    $('.confirm_yes').click(function(e) {

                        if (typeof clearElement.attr('relModal') !== 'undefined' &&
                                clearElement.attr('relModal') !== false) {
                            var clearElements = clearElement.attr('relModal').split(",");
                            if (clearElements.length > 0) {
                                for (var n = 0; n < clearElements.length; n++) {
                                    element = $('#' + clearElements[n]);
                                    element.val('');
                                }
                            }
                        }

                        else {

                            var element = clearElement.parent().parent().find('input');
                            $.each(element, function(index, value) {
                                $(this).val('');
                            });
                        }
                        element.attr('disabled', false);

                        $.colorbox.close();
                    });
                    $('.confirm_no').click(function(e) {
                        e.preventDefault();
                        $('.confirm_yes').unbind();
                        $('.confirm_no').unbind();
                        $.colorbox.close();
                    });
                }
            });

        });

    }

}

var modalWindowOb = new modalWindow();
/*modalWindowOb.url="http://www.yahoo.com";
 modalWindowOb.showWithUrl();*/
modalWindowOb.clearEvent();
modalWindowOb.modalClassOpen();
