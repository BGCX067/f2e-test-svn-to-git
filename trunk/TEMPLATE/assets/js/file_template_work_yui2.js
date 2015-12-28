/* Copyright (c) 2010, Taobao.com Inc. All rights reserved. */

/**
 * Particular script of {file}, Project {project}.
 *
 * @author      fahai
 * @version     1.0.0
 */

/*
 * General wrapper.
 */
(function() {

    /*
     * Quick alias.
     */
    var $U = YAHOO.util,
            $D = $U.Dom,
            $E = $U.Event,
            $ready = $E.onDOMReady;

    /**
     * A new namespace as the main container.
     *
     * @namespace   TB.app
     * @module      project
     */
    var $P = TB.namespace("app.project");

    /**
     * Add sub-module-a. It's a static object.
     *
     * @namespace   TB.app.project
     * @class       SubModuleA
     * @static
     */
    $P.SubModuleA = {

        /**
         * attribute-a.
         *
         * @property    attributeA
         * @type        Array
         */
        attributeA:[],

        /**
         * method-a.
         *
         * @method      methodA
         * @param       {Element}   el   description.
         * @return      {?Object}   el   description.
         */
        methodA:function(el) {
            return el;
        }
    };

    /**
     * Add sub-module-b. It's a constructor.
     *
     * @namespace   TB.app.project
     * @class       SubModuleB
     * @param       {String}    s   description for s.
     * @param       {Object}    o   description for o.
     * @constructor
     */
    $P.SubModuleB = function(s, o) {

        /**
         * string.
         *
         * @property    string
         * @type        String
         */
        this.string = s;

        /**
         * object.
         *
         * @property    object
         * @type        Object
         */
        this.object = o;
    };

    /**
     * Load module dependencies dynamically.
     * Including YUI components and custom components.
     *
     * @method  load
     * @param   {Object|Array.<string>}  config     module name or custom configuration.
     * @param   {Function}              onSuccess   callback on success.
     * @param   {?Function}             onFailure   callback on failure.
     * @static
     */
    $P.load = function(config, onSuccess, onFailure) {

        /*
         * default config
         */
        var _config = {
            base: "http://a.tbcdn.cn/yui/2.8.1/build/",
            require: [],
            loadOptional: true
        }, c, loader;

        // divided entrances
        switch (typeof config) {

            // single YUI component
            case "string":
                c = YAHOO.lang.merge(_config, {
                    require: [config]
                });
                break;

            case "object":

                // a list of YUI components
                if (config instanceof Array) {
                    c = YAHOO.lang.merge(_config, {
                        require: config
                    });
                } else { // custom components
                    c = undefined;
                }
                break;
        }

        try {

            // initial instance
            loader = new YAHOO.util.YUILoader(c);

            // config for custom components
            if (config.name) {
                loader.addModule(config);
                loader.require(config.name);
            }

            // set callback
            loader.onSuccess = onSuccess;
            loader.onFailure = onFailure;

            // insert assets
            loader.insert();
        } catch(e) {
            throw new Error(e);
        } finally {
            delete loader;
        }

    };

    /**
     * Initialize.
     *
     * @method  init
     * @private
     */
    $P._init = function() {

        /*
         * Elements references.
         */
        var body = document.body;

        /*
         * In addition, you can load module dynamically.
         * And YUILoader is already included in tbra-aio.js.
         */
        $P.load({
            name: "",
            type: "",
            path: "",
            fullpath: "",
            requires: ["", ""]
        }, function() {
        });

        /*
         * Other stuff you wanna do!
         */
        $P.SubModuleA.methodA(body);
    };

    /*
     * Init when ready.
     */
    $ready($P._init);
})();