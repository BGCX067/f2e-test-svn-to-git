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
    var $S = KISSY,
            $D = $S.DOM,
            $ready = $S.ready;

    /*
     * Create a new app if necessary.
     */
    var $P = $S.app("AppName");

    /**
     * Add new custom module.
     *
     * @module      module-a
     */
    $P.add("module-a", function(ns) {

        /**
         * Create sub-module if necessary.
         *
         * @namespace   AppName
         * @class       SubModuleA
         * @static
         */
        ns.namespace("SubModuleA");

        /*
         * Property container.
         */
        var wrap = {

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

        // Augment wrap to SubModuleA.
        $S.mix(ns.SubModuleA, wrap);
    }, {
        // Request additional modules if it requires.
        requires: ["jq"]
    });

    /**
     * Add new third-party module.
     */
    $P.add("jq", {
        fullpath: "http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"
    });

    /**
     * Initialize when ready.
     *
     * @method  init
     * @private
     */
    $ready(function() {

        /*
         * Elements references.
         */
        var body = document.body;

        /*
         * Use defined custom module.
         */
        $P.use("module-a", function(ns) {

            ns.methodA(body);
        });
    });

})();