(function() {
    YAHOO.namespace("util.Command.Behavior");

    var U = YAHOO.util, Dom = U.Dom, Event = U.Event, Behavior = U.Command.Behavior;
    var NONE = "none", FALSE = "false", BLOCK = "block", MIN = "0", HIDDEN = "hidden", BLANK = "";

    U.Command.init = function(c) {
        var _config = {
            func:function() {
            },
            preventDefault:true,
            target:null,
            filter:function() {
                return true;
            },
            getTarget:function() {
            },
            extraFunc:function() {
            },
            beforeEnd:function() {
            }
        }, config = YAHOO.lang.merge(_config, c || {});

        return function(e) {
            var trigger, target;
            trigger = e.target || e.srcElement;

            if (config.filter(trigger)) {
                target = config.target || config.getTarget(trigger) || trigger;

                if (!(config.preventDefault === FALSE)) {
                    Event.preventDefault(e);
                }

                config.func(target, config.extraFunc);
            }
            config.beforeEnd();
        };
    };


    Behavior.hide = function(target, extraFunc) {
        return Dom.batch(target, Behavior._hide, extraFunc);
    };

    Behavior._hide = function(o, extraFunc) {
        if (Dom.getStyle(o, "display") != NONE) {
            Dom.setStyle(o, "display", NONE);
        }
        if (extraFunc) {
            extraFunc(o);
        }
    };

    Behavior.show = function(target, extraFunc) {
        return Dom.batch(target, Behavior._show, extraFunc);
    };

    Behavior._show = function(o, extraFunc) {
        if (Dom.getStyle(o, "display") == NONE) {
            Dom.setStyle(o, "display", BLOCK);
        }
        if (extraFunc) {
            extraFunc(o);
        }
    };

    Behavior.toggleHide = function(target, extraFunc) {
        return Dom.batch(target, Behavior._toggleHide, extraFunc);
    };

    Behavior._toggleHide = function(o, extraFunc) {
        if (Dom.getStyle(o, "display") != NONE) {
            Dom.setStyle(o, "display", NONE);
        } else {
            Dom.setStyle(o, "display", BLOCK);
        }
        if (extraFunc) {
            extraFunc(o);
        }
    };

    Behavior.fold = function(target, extraFunc) {
        return Dom.batch(target, Behavior._fold, extraFunc);
    };

    Behavior._fold = function(o, extraFunc) {
        if (parseInt(Dom.getStyle(o, "height")) != parseInt(MIN)) {
            Dom.setStyle(o, "height", MIN);
            Dom.setStyle(o, "overflow", HIDDEN);
        }
        if (extraFunc) {
            extraFunc(o);
        }
    };

    Behavior.unfold = function(target, extraFunc) {
        return Dom.batch(target, Behavior._unfold, extraFunc);
    };

    Behavior._unfold = function(o, extraFunc) {
        if (parseInt(Dom.getStyle(o, "height")) == parseInt(MIN)) {
            Dom.setStyle(o, "height", BLANK);
            Dom.setStyle(o, "overflow", BLANK);
        }
        if (extraFunc) {
            extraFunc(o);
        }
    };

    Behavior.toggleFold = function(target, extraFunc) {
        return Dom.batch(target, Behavior._toggleFold, extraFunc);
    };

    Behavior._toggleFold = function(o, extraFunc) {
        if (parseInt(Dom.getStyle(o, "height")) != parseInt(MIN)) {
            Dom.setStyle(o, "height", MIN);
            Dom.setStyle(o, "overflow", HIDDEN);
        } else {
            Dom.setStyle(o, "height", BLANK);
            Dom.setStyle(o, "overflow", BLANK);
        }
        if (extraFunc) {
            extraFunc(o);
        }
    };

    U.Command.NodeWrapper = function(o) {
        var _config = {
            template:"",
            data:[],
            container:null
        }, config = YAHOO.lang.merge(_config, o || {});

        this.template = config.template;
        this.data = config.data;
        this.container = config.container;
        this.source = this.container.innerHTML;

        this.init();
    };

    U.Command.NodeWrapper.prototype = {
        render:function() {
            var result = [];
            for (var i = 0, l = this.data.length; i < l; i++) {
                if (!this.data[i]) {
                    continue;
                }
                result.push(YAHOO.lang.substitute(this.template, this.data[i]));
            }
            this.container.innerHTML = result.join("");
        },
        parse:function() {

        },
        init:function() {
            this.parse();
            this.render();
        }
    };
})();