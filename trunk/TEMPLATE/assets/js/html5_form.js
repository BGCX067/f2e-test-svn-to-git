/* Copyright (c) 2010, All rights reserved. */

/**
 * @author      pushiming
 * @version     1.0.0
 */

// namespace
var HTML5 = window.HTML5 || {};
HTML5.form = HTML5.form || {};

// feature detection
(function() {
    var input = document.createElement("input"),
            textarea = document.createElement("textarea");
    HTML5.form.supports = {
        placeholder: "placeholder" in input,
        maxLength: "maxLength" in textarea
    };
})();

// activate
(function() {

    // Alias
    var U = YAHOO.util, Dom = U.Dom, Event = U.Event;

    HTML5.form.activate = {

        // placeholder
        placeholder: function(el) {

            // references
            el = Dom.get(el);
            var ATTR = "placeholder", CLASS = "placeholder", BLANK = "", TIP = el.getAttribute(ATTR);

            // hide on focus while show on blur
            Event.on(el, "focus", function() {
                _hidePlaceholder(el, CLASS, BLANK);
            });

            Event.on(el, "blur", function() {
                _showPlaceholder(el, CLASS, TIP);
            });

            // BUG! Most Browsers (FF, IE) will keep previous values in form inputs
            // so if there are simulated placeholders (as their values) and next refresh we'll get
            // the inputs filled with PLACEHOLDERS' VALUE!! Thus we reset their values in case previous
            // values are placeholders but if users themselves input the values as placeholders
            // in accident, we failed.
            if (el.value == TIP) {
                el.value = BLANK;
            }

            // init
            _showPlaceholder(el, CLASS, TIP);

            // private functions
            function _showPlaceholder(el, className, value) {
                if (!Dom.hasClass(el, className) && !el.value) {
                    el.value = value;
                    Dom.addClass(el, className);
                }
            }

            function _hidePlaceholder(el, className, value) {
                if (Dom.hasClass(el, className)) {
                    el.value = value;
                    Dom.removeClass(el, className);
                }
            }
        },

        // maxLength in textarea
        // BUG: form.supports["maxLength"] return true in Opera but I can't see the effect in Opera.
        maxLength: function(el) {

            // references
            el = Dom.get(el);
            var ATTR = "maxLength", MAX_LENGTH = el.getAttribute(ATTR);

            // cut on dragging text into textarea
            Event.on(el, "dragenter", function() {
                // TODO
            });

            // cut on pasting text from clipboard
            Event.on(el, "paste", function() {
                // TODO
            });

            // cut on press keys
            Event.on(el, "keypress", function(e) {

                // firefox and opera are parsing "keypress" event in a damn wrong way
                if ((YAHOO.env.ua.gecko || YAHOO.env.ua.opera)) {
                    switch (e.which) {

                        // backspace
                        case 8:
                        // other special key
                        case 0:
                            return;
                            break;
                        default:
                            break;
                    }
                }

                if (_overMaxLength(el, MAX_LENGTH)) {
                    Event.preventDefault(e);
                }
            });

            // private functions
            function _overMaxLength(el, maxLength) {
                var currentLength = el.value.length;
                return currentLength >= maxLength;
            }
        }
    };
})();