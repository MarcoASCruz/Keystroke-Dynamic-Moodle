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
                    
                    sendDataOnSubmit();
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
            element.addEventListener("keydown", function(event){
                listenerCallback(event, "DOWN");
            });
            element.addEventListener("keyup", function(event){
                listenerCallback(event, "UP");
            });
        }
        function listenerCallback(event, action){
            var keyCode = event.which || event.keyCode; // event.keyCode is used for IE8 and earlier
            addParamInModel(keyCode, action);
            event.stopPropagation();
        }
        function addParamInModel(keyCode, action) {
            model.push({ keyCode: keyCode, time: getTime(), action: action });
        }
        function getTime() {
            return new Date().getTime();
        }
        
        function sendDataOnSubmit(){
            var submitButton = document.getElementById('id_submitbutton');
                    
            submitButton.addEventListener("click", function(event){
                var requiredFields = document.getElementsByClassName('required');
                var quantRequiredFields = requiredFields.length;
                var fieldsOK = true;
                
                for (var i = 0; i < quantRequiredFields; i++) {
                    var elements = [];
                    var inputs = getFieldsInArray(requiredFields[i].getElementsByTagName("input"));
                    var textarea = getFieldsInArray(requiredFields[i].getElementsByTagName("textarea"));
                    elements = textarea.concat(inputs);
                    var quantElements = elements.length;
                    for (var j = 0; j < quantElements; j++) {
                        if (validate(elements[j]) == false){
                            fieldsOK = false;
                        };
                    }
                }
                
                if (fieldsOK){
                    sendModel();
                }
                
            });
        }
        
        function getFieldsInArray(fields){
            var elements = [];
            var quantFields = fields.length;
            for (var i = 0; i < quantFields; i++) {
                elements.push(fields[i]);
            }
            return elements;
        }

        function validate(element) {
            var result = false;
            if(element.value != ""){
                result = true;
            }
            return result;
        }
        
        function sendModel(){
            var request = new XMLHttpRequest();
            var formData = new FormData();
            formData.append('model', JSON.stringify(model));
            formData.append('original', "true"); //remove it when the web service be ok
            formData.append('training', "true"); //remove it when the web service be ok
		
            request.open("POST", "http://localhost:5000/validateModel", true);
            request.send(formData);
            clearModel();
        }
        
        function clearModel(){
            model = [];
        }

        // This line use existing name path if it exists, otherwise create a new one. 
        // This is to avoid to overwrite previously loaded module with same name.
        M.mod_forum = M.mod_forum || {}; 
        M.mod_forum.init_capture_keystroke = function(config) {
            return new MODULENAME(config);
        };
        M.mod_forum.get_model = function() {
            console.log(model);
            alert("test!");
        };
    }
    , 
    '@VERSION@', {
        requires:['base']
    }
);