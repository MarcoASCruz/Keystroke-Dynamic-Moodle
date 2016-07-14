YUI.add('moodle-mod_forum-capture_keystroke', 
    function(Y) {
        var ModulenameNAME = 'capture_keystroke';
        var model = [];
        
        var MODULENAME = function() {
            MODULENAME.superclass.constructor.apply(this, arguments);
        };
        
        Y.extend(
            MODULENAME
            ,
            Y.Base
            ,
            {
                initializer : function() {
                    var elements = document.getElementsByClassName('capture_keystroke');
                    var quantElements = elements.length;
                    for (var i = 0; i < quantElements; i++) {
                        addKeyListeners(elements[i]);
                    }
                }
            }
            , 
            {
                NAME : ModulenameNAME, //module name is something mandatory. 
                                        // It should be in lower case without space 
                                        // as YUI use it for name space sometimes.
                ATTRS : {
                         aparam : {}
                } // Attributes are the parameters sent when the $PAGE->requires->yui_module calls the module. 
                  // Here you can declare default values or run functions on the parameter. 
                  // The param names must be the same as the ones declared 
                  // in the $PAGE->requires->yui_module call.
            }
        );
        
        //"private" methods
        function addKeyListeners(element){
            element.addEventListener("keydown", listenerCallback);
            element.addEventListener("keyup", listenerCallback);
        }
        function listenerCallback(event){
            var keyCode = event.which || event.keyCode; // event.keyCode is used for IE8 and earlier
            addParamInModel(keyCode);
            event.stopPropagation();
        }
        function addParamInModel(keyCode) {
            model.push({ keyCode: keyCode, time: getTime() });
        }
        function getTime() {
            return new Date().getTime();
        }

        // This line use existing name path if it exists, otherwise create a new one. 
        // This is to avoid to overwrite previously loaded module with same name.
        M.mod_forum = M.mod_forum || {}; 
        M.mod_forum.init_capture_keystroke = function(config) {
            return new MODULENAME(config);
        };
    }
    , 
    '@VERSION@', {
        requires:['base']
    }
);