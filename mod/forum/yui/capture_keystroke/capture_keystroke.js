YUI.add('moodle-mod_forum-capture_keystroke', 
    function(Y) {
        var ModulenameNAME = 'capture_keystroke';
        var models = [];
        var sample = undefined;
        var idUser = undefined;
        
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
                    
                    idUser = document.getElementsByName('id_user')[0].value;
                    
                    var serviceName = undefined;
                    if(sample){
                        serviceName = "setSample";
                    }
                    else{
                        serviceName = "validate";
                    }
                    sendDataOnSubmit(serviceName);
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
            var id = createNewId();
            element.addEventListener("keydown", function(event){
                listenerCallback(event, "DOWN", id);
            });
            element.addEventListener("keyup", function(event){
                listenerCallback(event, "UP", id);
            });
        }
        function createNewId(){
            var id = models.length; //last position of array
            models[id] = [];
            return id;
        }
		function listenerCallback(event, action, id){
			var keyCode = event.which || event.keyCode; // event.keyCode is used for IE8 and earlier
			var keyCodeChar = event.key.charCodeAt(0)
			var key = event.key
			if (keyCode != 9){
				addParamInModel(keyCode, action, id, keyCodeChar, key);
				console.log('keyCode: ' + keyCode)
				console.log('keyCodeChar: ' + keyCodeChar)
				console.log('key: ' + key)
			};
			event.stopPropagation();
		}
		function addParamInModel(keyCode, action, id, keyCodeChar, key) {
			models[id].push({ keyCode: keyCode, time: getTime(), action: action, keyCodeChar: keyCodeChar, key: key });
		}
        function getTime() {
            return new Date().getTime();
        }
        
        function sendDataOnSubmit(serviceName){
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
                    sendModel(serviceName);
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
        
        function sendModel(serviceName){
            var request = new XMLHttpRequest();
            var formData = new FormData();
            formData.append('model', JSON.stringify(getValidatedModel()));
            formData.append('idUser', idUser);
        
            request.open("POST", "http://104.236.17.154:8080/pesquisaEOpiniao/moodle/" + serviceName, true);
            request.send(formData);
            clearModel();
        }
        
        function getValidatedModel(){
            var validatedModel = [];
            models.forEach(function(item, index){
                if (item.length > 0){
                    validatedModel.push(item);
                }
            })
            return validatedModel;
        }
        
        function clearModel(){
            models = [];
        }

        // This line use existing name path if it exists, otherwise create a new one. 
        // This is to avoid to overwrite previously loaded module with same name.
        M.mod_forum = M.mod_forum || {}; 
        M.mod_forum.init_capture_keystroke_sample = function(config) {
            sample = true;
            return new MODULENAME();
        };
        M.mod_forum.init_capture_keystroke_test = function(config) {
            sample = false;
            return new MODULENAME();
        };
    }
    , 
    '@VERSION@', {
        requires:['base']
    }
);
