(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 25/06/2017.
 */

"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);

function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;
    var currCampaign = ctx.repositories.status.getCurrentCampaign();
    self.campaignName = ko.observable(currCampaign.name);
    self.selectionReplica = ko.observable(currCampaign.selection_replica);
    self.threshold = ko.observable(currCampaign.threshold);
    self.annotationReplica = ko.observable(currCampaign.annotation_replica);
    self.annotationSize = ko.observable(currCampaign.annotation_size);

}

exports.register = function () {
    ko.components.register('campaign-info', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./template.html":2}],2:[function(require,module,exports){
module.exports = "<nav-bar params = \"repositories: repositories\"></nav-bar>\r\n<div class=\"container\" style = \"margin: auto\">\r\n\r\n    <div class=\"row\" >\r\n        <div class = \"col-sm-2\"></div>\r\n        <div class = \"col-sm-8\">\r\n            <div class=\"panel panel-primary\">\r\n                <div class=\"panel-heading\">Edit Campaign </div>\r\n                <div class=\"panel-body\">\r\n                    <form class=\"form-horizontal\">\r\n                        <div class=\"form-group\">\r\n                            <label class=\"control-label col-sm-4\" for=\"campaignname\">Name:</label>\r\n                            <div class=\"col-sm-8\">\r\n                                <input type=\"text\" disabled class=\"form-control\" id=\"campaignname\" required placeholder=\"Campaign Name\" data-bind = \"textInput: campaignName\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label class=\"control-label col-sm-4\" for=\"selectionreplica\">Selection Replica:</label>\r\n                            <div class=\"col-sm-8\">\r\n                                <input type=\"number\" disabled class=\"form-control\" id=\"selectionreplica\" required placeholder=\"Selection Replica\" data-bind = \"textInput: selectionReplica\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label class=\"control-label col-sm-4\" for=\"threshold\">Threshold:</label>\r\n                            <div class=\"col-sm-8\">\r\n                                <input type=\"number\" disabled class=\"form-control\" id=\"threshold\" required placeholder=\"Threshold\" data-bind = \"textInput: threshold\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label class=\"control-label col-sm-4\" for=\"annotationreplica\">Annotation Replica:</label>\r\n                            <div class=\"col-sm-8\">\r\n                                <input type=\"number\" disabled class=\"form-control\" id=\"annotationreplica\" required placeholder=\"Annotation Replica\" data-bind = \"textInput: annotationReplica\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label class=\"control-label col-sm-4\" for=\"annotationsize\">Annotation Size:</label>\r\n                            <div class=\"col-sm-8\">\r\n                                <input type=\"number\" disabled class=\"form-control\" id=\"annotationsize\" required placeholder=\"Annotation Size (px)\" data-bind = \"textInput: annotationSize\">\r\n                            </div>\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class = \"col-sm-2\"></div>\r\n    </div>\r\n</div>";

},{}],3:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 02/06/2017.
 */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);

function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;
    self.campaignName = ko.observable();
    self.selectionReplica = ko.observable();
    self.threshold = ko.observable();
    self.annotationReplica = ko.observable();
    self.annotationSize = ko.observable();

    //self.shouldShowMessage = ko.observable(false);
    //self.errorMessage = ko.observable();
    self.alertMessages = ko.observableArray();

    self.createCampaign = function () {
        ctx.repositories.createcampaign.createCampaign(
            ctx.repositories.status.getAuthApiToken(),
            self.campaignName(),
            self.selectionReplica(),
            self.threshold(),
            self.annotationReplica(),
            self.annotationSize()
        ).then(function (result) {
            alert("Success");
            ctx.repositories.status.setSuccessNext('/UserHome');
            location.hash = '/OperationSuccess';
        }).catch(function (e) {
            alert("Error");
            /*self.shouldShowMessage(true);
            var temp = ''
            for(var x in e.error){
                temp += x + ": " + e.error[x];
            }
            self.errorMessage(" " +temp);*/
            self.alertMessages.removeAll();
            var tempErr = "";
            for(var i in e.errors.error) {
                tempErr += " "+i +": " +e.errors.error[i] + ".";
            }
            self.alertMessages.push({shouldShowMessage:true, errorMessage:tempErr});
        });
    };

}

exports.register = function () {
    ko.components.register('create-campaign', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./template.html":4}],4:[function(require,module,exports){
module.exports = "<nav-bar params = \"repositories: repositories\"></nav-bar>\r\n<div class=\"container\" style = \"margin: auto\">\r\n\r\n    <div class=\"row\" >\r\n        <div class = \"col-sm-2\"></div>\r\n        <div class = \"col-sm-8\">\r\n            <div class=\"panel panel-primary\">\r\n                <div class=\"panel-heading\">New Campaign Creation </div>\r\n                <div class=\"panel-body\">\r\n                    <form class=\"form-horizontal\">\r\n                        <div data-bind = \"foreach:alertMessages\">\r\n                        <div class=\"alert alert-danger alert-dismissable fade in\" data-bind = \"visible: shouldShowMessage\">\r\n                            <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>\r\n                            <strong>Warning!</strong><span data-bind = \"text:errorMessage\"></span>\r\n                        </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label class=\"control-label col-sm-4\" for=\"campaignname\">Name:</label>\r\n                            <div class=\"col-sm-8\">\r\n                                <input type=\"text\" class=\"form-control\" id=\"campaignname\" placeholder=\"Campaign Name\" data-bind = \"textInput: campaignName\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label class=\"control-label col-sm-4\" for=\"selectionreplica\">Selection Replica:</label>\r\n                            <div class=\"col-sm-8\">\r\n                                <input type=\"number\" class=\"form-control\" id=\"selectionreplica\" placeholder=\"Selection Replica\" data-bind = \"textInput: selectionReplica\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label class=\"control-label col-sm-4\" for=\"threshold\">Threshold:</label>\r\n                            <div class=\"col-sm-8\">\r\n                                <input type=\"number\" class=\"form-control\" id=\"threshold\" placeholder=\"Threshold\" data-bind = \"textInput: threshold\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label class=\"control-label col-sm-4\" for=\"annotationreplica\">Annotation Replica:</label>\r\n                            <div class=\"col-sm-8\">\r\n                                <input type=\"number\" class=\"form-control\" id=\"annotationreplica\" placeholder=\"Annotation Replica\" data-bind = \"textInput: annotationReplica\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label class=\"control-label col-sm-4\" for=\"annotationsize\">Annotation Size:</label>\r\n                            <div class=\"col-sm-8\">\r\n                                <input type=\"number\" class=\"form-control\" id=\"annotationsize\" placeholder=\"Annotation Size (px)\" data-bind = \"textInput: annotationSize\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"col-sm-offset-2 col-sm-10\">\r\n                                <button type=\"submit\" class=\"btn btn-default\" data-bind = \"click: createCampaign\">Create Campaign</button>\r\n                            </div>\r\n                        </div>\r\n                    </form>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class = \"col-sm-2\"></div>\r\n    </div>\r\n</div>";

},{}],5:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 25/06/2017.
 */

"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);

function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;
    var currCampaign = ctx.repositories.status.getCurrentCampaign();
    self.campaignName = ko.observable(currCampaign.name);
    self.selectionReplica = ko.observable(currCampaign.selection_replica);
    self.threshold = ko.observable(currCampaign.threshold);
    self.annotationReplica = ko.observable(currCampaign.annotation_replica);
    self.annotationSize = ko.observable(currCampaign.annotation_size);

    //self.shouldShowMessage = ko.observable(false);
    //self.errorMessage = ko.observable();
    self.alertMessages = ko.observableArray();

    self.editCampaign = function () {
        ctx.repositories.editcampaign.editCampaign(
            ctx.repositories.status.getAuthApiToken(),
            currCampaign.id,
            self.campaignName(),
            self.selectionReplica(),
            self.threshold(),
            self.annotationReplica(),
            self.annotationSize()
        ).then(function (result) {
            //alert("Success");
            ctx.repositories.status.setSuccessNext('/UserHome');
            location.hash = '/OperationSuccess';
        }).catch(function (e) {
            //alert("Error");
            self.alertMessages.removeAll();
            var tempErr = [];
            for(var i in e.errors.error) {
                tempErr.push(" "+i +": " +e.errors.error[i]);
            }
            self.alertMessages.push({shouldShowMessage:true, errorMessage:tempErr});
            /*
            self.shouldShowMessage(true);
            var temp = ''
            for(var x in e.errors){
                temp += x + ": " + e.errors[x];
            }
            self.errorMessage(" " +temp);*/
        });
    };

}

exports.register = function () {
    ko.components.register('edit-campaign-info', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./template.html":6}],6:[function(require,module,exports){
module.exports = "<nav-bar params = \"repositories: repositories\"></nav-bar>\r\n<div class=\"container\" style = \"margin: auto\">\r\n\r\n    <div class=\"row\" >\r\n        <div class = \"col-sm-2\"></div>\r\n        <div class = \"col-sm-8\">\r\n            <div class=\"panel panel-primary\">\r\n                <div class=\"panel-heading\">Edit Campaign </div>\r\n                <div class=\"panel-body\">\r\n                    <form data-bind=\"submit: editCampaign\" class=\"form-horizontal\">\r\n                        <div data-bind = \"foreach:alertMessages\">\r\n                        <div class=\"alert alert-danger alert-dismissable fade in\" data-bind = \"visible: shouldShowMessage\">\r\n                            <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>\r\n                            <strong>Warning!</strong><span data-bind = \"text:errorMessage\"></span>\r\n                        </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label class=\"control-label col-sm-4\" for=\"campaignname\">Name:</label>\r\n                            <div class=\"col-sm-8\">\r\n                                <input type=\"text\" class=\"form-control\" id=\"campaignname\" required placeholder=\"Campaign Name\" data-bind = \"textInput: campaignName\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label class=\"control-label col-sm-4\" for=\"selectionreplica\">Selection Replica:</label>\r\n                            <div class=\"col-sm-8\">\r\n                                <input type=\"number\" class=\"form-control\" id=\"selectionreplica\" required placeholder=\"Selection Replica\" data-bind = \"textInput: selectionReplica\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label class=\"control-label col-sm-4\" for=\"threshold\">Threshold:</label>\r\n                            <div class=\"col-sm-8\">\r\n                                <input type=\"number\" class=\"form-control\" id=\"threshold\" required placeholder=\"Threshold\" data-bind = \"textInput: threshold\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label class=\"control-label col-sm-4\" for=\"annotationreplica\">Annotation Replica:</label>\r\n                            <div class=\"col-sm-8\">\r\n                                <input type=\"number\" class=\"form-control\" id=\"annotationreplica\" required placeholder=\"Annotation Replica\" data-bind = \"textInput: annotationReplica\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label class=\"control-label col-sm-4\" for=\"annotationsize\">Annotation Size:</label>\r\n                            <div class=\"col-sm-8\">\r\n                                <input type=\"number\" class=\"form-control\" id=\"annotationsize\" required placeholder=\"Annotation Size (px)\" data-bind = \"textInput: annotationSize\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"col-sm-offset-2 col-sm-10\">\r\n                                <button type=\"submit\" class=\"btn btn-default\" >Edit Campaign</button>\r\n                            </div>\r\n                        </div>\r\n                    </form>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class = \"col-sm-2\"></div>\r\n    </div>\r\n</div>";

},{}],7:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 03/06/2017.
 */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);



function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;
    self.images = ko.observableArray();
    self.imageInfo = ko.observable();
    self.accepted = ko.observable();
    self.rejected = ko.observable();
    self.annotation = ko.observableArray();
    /*self.images().imageUrlSrc = function(){
        return "http://awt.ifmledit.org"+this.canonical;
    }*/
    //self.imageStatistics = ko.observable();


    self.addImages = function(){
        /*for(var x in ctx.repositories.status.getCurrentCampaign()) {
            alert(x + " "+ ctx.repositories.status.getCurrentCampaign()[x]);
        }*/

        var data = new FormData();
        data.append("file",document.getElementById("images").files[0]);

        /*var i = 0;
        for(var x in document.getElementById("images").files[x]){
            i++;
            data.append("file"+i,document.getElementById("images").files[x]);
            alert("file"+i + " appended");
        }

        /* $(":file").change(function () {
            if (this.files && this.files[0]) {
                var reader = new FileReader();
                reader.onload = imageIsLoaded;
                reader.readAsDataURL(this.files[0]);
            }
        });

         function imageIsLoaded(e) {
         $('#myImg').attr('src', e.target.result);
         };
         http://jsfiddle.net/vacidesign/ja0tyj0f/


        /*var data = new FormData();
        data.append("file",$("#images").files[0]);

        var i = 0;
        for(var x in $("#images").files[x]){
            i++;
            data.append("file"+i,$("#images").files[x]);
            alert("file"+i + " appended");
        }
        /*jQuery.each($("#images").files, function(i, file) {
            data.append('file-'+i, file);
        });*/
        //alert(ctx.repositories.status.getAuthApiToken());

        ctx.repositories.editimages.uploadCampaignPhotos(
            ctx.repositories.status.getAuthApiToken(),
            data,
            ctx.repositories.status.getCurrentCampaign().image
        ).then(function (result) {
            //alert("Success upload");
            self.loaded();
        }).catch(function (e) {
            /*alert("Error upload");
            alert(e);*/
        });

        /*for(var i in $("#images").files){
            var upload = new Upload($("#images").files[i]);
            upload.doUpload();
            //var reader = new FileReader();

            //reader.readAsDataURL($("#images").files[i]);
            //DA FARE: Progress Bar
            /*var progBar = $("<div></div>").attr({"class":"progress"}).
                appendChild($("<div></div>").attr({
                    "id":i,
                    "class":"progress-bar",
                    "role": "progressbar",
                    "aria-valuenow":"0",
                    "aria-valuemin":"0",
                    "aria-valuemax":"100",
                    "style":"width:70%"
            })).text(0 + "%");
            $("#nextButton").before(progBar);*/
            //$("#nextButton").before($("<span></span>").attr({"id":i}).text("caricato il 0 %"));
            //$("#nextButton").before($("<img></img>").attr({"id":"image"+i}));
            //reader.onprogress = function(evt) { self.updateProgress(evt,i);};
            //reader.onload = function(evt) {self.loaded(evt,i)};
            //reader.onerror = self.errorHandler;
            //reader.onprogress = self.updateProgress(evt);
            //reader.onload = self.loaded(evt);
            //reader.onerror = self.errorHandler;
        //}
    }

    /*self.updateProgress = function(evt,i){
        if (evt.lengthComputable) {
            var loaded = (evt.loaded / evt.total);
            //INSERISCI CODICE PROGRESS BAR
            if (loaded < 1) {
                // Increase the prog bar length
                // style.width = (loaded * 200) + "px";
                $("#"+i).text("caricato il "+ loaded +"%");
            } if(loaded ==1){
                //nascondi barra
            }
        }
    };
    self.loaded = function(evt,i){
        $("#image"+i).attr('src', evt.target.result);
    };*/
    self.removeImage = function(image){
        //alert(image.id);
        ctx.repositories.editimages.removeImage(
            ctx.repositories.status.getAuthApiToken(),
            image.id
            //self.images(this)).id
        ).then(function (result) {
            //alert("Success Removed");
            self.loaded();
        }).catch(function (e) {
            /*alert("Error Removed");
            alert(e);*/
        });
    }

    self.loaded = function(){
        alert(ctx.repositories.status.getCurrentCampaign().image);
       ctx.repositories.editimages.getCampaignImages(
           ctx.repositories.status.getAuthApiToken(),
           ctx.repositories.status.getCurrentCampaign().image
       ).
       then(function (result) {
           /*alert(Object.keys(result).length);
           for(var x in Object.getOwnPropertyNames(result))
           {
               alert(x + " " +result[x]);
           }
           for(var x in result.images){
               alert(result.images[x].id);
           }
           alert("Success loaded");*/
           self.images(result.images);

           /*for(var x in result.images){
               result.images[x].canonical = "http://awt.ifmledit.org" + result.images[x].canonical;
           }*/

           if(!(result[images] === undefined)) {
               if (result[images].length > 0) {
                   self.images(result);
               }
           }
       }).catch(function (e) {
           /*alert("Error loaded");
           alert(e);*/
       });
    };

    self.errorHandler = function(evt){
        alert(evt.target.error.name);
    };

    self.loaded();



    //$("images").on("click",self.addImages);
}

exports.register = function () {
    ko.components.register('edit-images-campaign', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./template.html":8}],8:[function(require,module,exports){
module.exports = "<nav-bar params = \"repositories: repositories\"></nav-bar>\r\n<div class=\"container\" style = \"margin: auto\">\r\n\r\n    <div class=\"row\" >\r\n        <div class = \"col-sm-1\"></div>\r\n\r\n        <div class = \"col-sm-7\">\r\n            <div class=\"panel panel-primary\">\r\n                <div class=\"panel-heading\">Add images to the Campaign</div>\r\n                <div class=\"panel-body\">\r\n                    <form class=\"form-horizontal\">\r\n                        <input id = \"images\"  type=\"file\" accept = \"image/jpeg\" class=\"btn btn-default\"></input>\r\n                        <input type = \"submit\" value = \"Add Images\" name = \"file\" data-bind = \"click: addImages\"/>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n            <div class=\"panel panel-primary\">\r\n                <div class=\"panel-heading\">Edit images of Campaign</div>\r\n                <div class=\"panel-body\">\r\n                        <p> Press the X button to remove an image from the campaign</p>\r\n                    <ul data-bind=\"foreach: images\" style = \"list-style-type:none\">\r\n                        <li>\r\n                        <div class=\"panel panel-primary\">\r\n                            <div class=\"panel-heading\">\r\n                                <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\" data-bind = \"click: $parent.removeImage\">&times;</a>\r\n                            </div>\r\n                            <div class=\"panel-body\">\r\n                                <div class=\"row\">\r\n                                    <div class=\"col-md-4\">\r\n                                        <div class=\"thumbnail\">\r\n                                            <!--<a href = \"#\" data-bind = \"click: $parent.getImageInfo\">-->\r\n                                                <img data-bind = \"attr: {src: canonical}\"/>\r\n                                            <!--</a>-->\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                     </li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class = \"col-sm-1\"></div>\r\n    </div>\r\n</div>";

},{}],9:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 03/06/2017.
 */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);



function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;
    self.workers = ko.observableArray();
    self.currentWorker = ko.observable();

    self.getWorkers = function(){
        //alert("sto per fare workers");
        ctx.repositories.editworkers.getWorkers(
            ctx.repositories.status.getAuthApiToken(),
            ctx.repositories.status.getCurrentCampaign().worker
        ).
        then(function (result) {
           // alert("successo workers");
           // alert(Object.keys(result).length);
            /*for(var x in Object.getOwnPropertyNames(result))
            {
                alert(x + " " +result[x]);
            }*/
           /* for(var x in result.workers){
                alert(result.workers[x].id);
            }*/
            self.workers(result.workers);
        }).catch(function (e) {
            alert("Error workers");
            alert(e);
        });
    };
    self.getWorkers();

    self.submitWorker = function(worker){
        //alert("sto per fare submitWorker");
        ctx.repositories.editworkers.getWorkerInfo(
            ctx.repositories.status.getAuthApiToken(),
            worker.id
        ).
        then(function (result) {
           // alert("successo submitWorker");
            /*for(var x in Object.getOwnPropertyNames(result))
             {
             alert(x + " " +result[x]);
             }*/
            self.currentWorker(result);
            self.setSelector(worker);
            self.setAnnotator(worker);
        }).catch(function (e) {
            alert("Error submitWorker");
            alert(e);
        });
    };


    self.setSelector = function(worker){
        //alert("Sto per fare setSelector");
        ctx.repositories.editworkers.setSelector(
            ctx.repositories.status.getAuthApiToken(),
            worker.selector,
            self.currentWorker().selection
        ).
        then(function (result) {
            //alert("successo selectionEdit");
        }).catch(function (e) {
            //alert("Successo");
            alert(e);
        });
    };
    self.setAnnotator = function(worker){

        ctx.repositories.editworkers.setSelector(
            ctx.repositories.status.getAuthApiToken(),
            worker.annotator,
            self.currentWorker().annotation
        ).
        then(function (result) {
            alert("Successo");
        }).catch(function (e) {
            alert("Error annotationEdit");
            alert(e);
        });
    };
}

exports.register = function () {
    ko.components.register('edit-workers-campaign', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./template.html":10}],10:[function(require,module,exports){
module.exports = "<nav-bar params = \"repositories: repositories\"></nav-bar>\r\n<div class=\"container\" style = \"margin: auto\">\r\n\r\n    <div class=\"row\" >\r\n        <div class = \"col-sm-2\"></div>\r\n        <div class = \"col-sm-8\">\r\n            <div class=\"panel panel-primary\">\r\n                <div class=\"panel-heading\">Workers for the campaign</div>\r\n                <div class=\"panel-body\">\r\n                    <h4>Assign one or more roles to the desired workers, then click submit: </h4>\r\n                    <table class = \"table-hover\">\r\n                        <thead>\r\n                        <tr><th>Worker Name</th><th>Selector</th><th>Annotator</th></tr>\r\n                        </thead>\r\n                        <tbody data-bind=\"foreach: workers\">\r\n                        <tr>\r\n                            <td><span data-bind=\"text: fullname\"></span></td>\r\n                            <td> <input type=\"checkbox\" data-bind=\"checked: selector\" /></td>\r\n                            <td> <input type=\"checkbox\" data-bind=\"checked: annotator\" /></td>\r\n                            <td><button class=\"btn btn-default\" data-bind = \"click: $parent.submitWorker\">Submit</button></td>\r\n                        </tr>\r\n                        </tbody>\r\n                    </table>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class = \"col-sm-2\"></div>\r\n    </div>\r\n    <div>\r\n        <p><span data-bind = \"currentWorker.selection\"></span></br><span data-bind = \"currentWorker.annotation\"></span></p>\r\n    </div>\r\n</div>";

},{}],11:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 10/06/2017.
 */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);

function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;
    self.campaignName = ko.observable(ctx.repositories.status.getCurrentCampaign().name);
    var tempStat = ctx.repositories.status.getCurrentCampaignStatistics();
    self.imagesC = ko.observable(tempStat.images);
    self.accepted = ko.observable(tempStat.accepted);
    self.rejected = ko.observable(tempStat.rejected);
    self.annotation = ko.observable(tempStat.annotation);
    self.images = ko.observableArray(ctx.repositories.status.getCurrentCampaignStatisticsImages());


//    self.setCampaignStatistics = function(result){

  //  };
    //self.getCampaignStatistics = function () {
        /*var cachedResult = ctx.repositories.status.getCurrentCampaignStatistics();
         if(cachedResult){
         self.setCampaignStatistics(cachedResult);
         }else {*/
       /* ctx.repositories.endedcampaignstatistics.getCampaignStatistics(
            ctx.repositories.status.getAuthApiToken(),
            ctx.repositories.status.getCurrentCampaign().statistics
        ).then(function (result) {
            //alert("Success");
            self.imagesC(result.images);
            self.accepted(result.accepted);
            self.rejected(result.rejected);
            self.annotation(result.annotation);
            //ctx.repositories.status.setCurrentCampaignStatistics(result);
        }).catch(function (e) {
            //alert("Error");
            self.shouldShowMessage(true);
            var temp = '';
            for (var x in e.errors) {
                temp += x + ": " + e.errors[x];
            }
            self.errorMessage(" " + temp);
        });
        //}
    };

        self.loaded = function(){
        ctx.repositories.editimages.getCampaignImages(
        ctx.repositories.status.getAuthApiToken(),
        ctx.repositories.status.getCurrentCampaign().image
        ).
        then(function (result) {
        self.images(result.images);
        }).catch(function (e) {
        alert("Error loaded");
        alert(e);
        });
        };
*/

    //RACCOGLIE STATISTIC URL, POI LO USA PER ALTRO SCOPO
    self.getImageInfo = function(image){
        ctx.repositories.endedcampaignstatistics.getImageInfo(
            ctx.repositories.status.getAuthApiToken(),
            image.id
        ).then(function (result) {
            ctx.repositories.endedcampaignstatistics.getImageStatistics(
                ctx.repositories.status.getAuthApiToken(),
                result.statistics
            ).then(function(result){
                ctx.repositories.status.setCurrentImageStatistics(result);
                ctx.repositories.status.setCurrentImage(image.canonical);
                location.hash = "/ImageStatistics";
            }).catch(function (e){
                alert("Error getImageStatistics");
                alert(e);
            });
        }).catch(function (e) {
            alert("Error getImageInfo");
            alert(e);
        });

    };

   // self.loaded();
    // self.getCampaignStatistics();
}

exports.register = function () {
    ko.components.register('ended-campaign-statistics', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./template.html":12}],12:[function(require,module,exports){
module.exports = "<nav-bar params = \"repositories: repositories\"></nav-bar>\r\n<div class=\"container\" style = \"margin: auto\">\r\n\r\n    <div class=\"row\" >\r\n        <div class = \"col-sm-2\"></div>\r\n        <div class = \"col-sm-8\">\r\n                <div class=\"panel panel-primary\">\r\n                    <div class=\"panel-heading\">Campaign statistics</div>\r\n                    <div class=\"panel-body\">\r\n                        <p>\r\n                            Number of images: <span data-bind = \"text:imagesC\"></span><br/>\r\n                            Number of accepted images: <span data-bind = \"text:accepted\"></span><br/>\r\n                            Number of rejected images: <span data-bind = \"text:rejected\"></span><br/>\r\n                            Number of annotations: <span data-bind = \"text:annotation\"></span>\r\n                        </p>\r\n                    </div>\r\n                </div>\r\n        </div>\r\n        <div class = \"col-sm-2\"></div>\r\n    </div>\r\n    <div class = \"row\">\r\n        <div class = \"col-sm-2\"></div>\r\n        <div class = \"col-sm-8\">\r\n            <div class=\"panel panel-primary\">\r\n                <div class=\"panel-heading\"> Images of the Campaign</div>\r\n                <div class=\"panel-body\">\r\n                    <ul data-bind=\"foreach: images\" style = \"list-style-type:none\">\r\n                        <li>\r\n                            <div class=\"panel-body\">\r\n                                <div class=\"row\">\r\n                                    <div class=\"col-md-4\">\r\n                                        <div class=\"thumbnail\">\r\n                                            <a href = \"#\" data-bind = \"click: $parent.getImageInfo\">\r\n                                                <img class=\"img-thumbnail img-responsive\" data-bind = \"attr: {src: canonical}\"/>\r\n                                            </a>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class = \"col-sm-2\"></div>\r\n    </div>\r\n</div>";

},{}],13:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 22/05/2017.
 */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);

function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;
}

exports.register = function () {
    ko.components.register('home-page', {
        template: require('./template.html'),
        viewModel: ViewModel,
    });
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./template.html":14}],14:[function(require,module,exports){
module.exports = "\r\n<nav-bar params = \"repositories: repositories\"></nav-bar>\r\n<div class=\"container\" style = \"margin: auto\">\r\n    <div class=\"row\" >\r\n        <div class = \"col-sm-2\"></div>\r\n        <div class=\"col-sm-8\">\r\n            <h1 style = \"padding-bottom:1em; text-align: center\">Your Crowdsourcing Campaign Starts Now</h1>\r\n            <div class = \"row\">\r\n                <div class = \"col-sm-3\"></div>\r\n                <div class = \"col-sm-3\">\r\n                    <a data-bind = \"path: '/SignUp'\" class=\"btn btn-primary\" role=\"button\"><span class=\"glyphicon glyphicon-user\"></span> SignUp</a>\r\n                </div>\r\n                <div class = \"col-sm-3\">\r\n                    <a data-bind = \"path: '/LogIn'\" class=\"btn btn-primary\" role=\"button\"><span class=\"glyphicon glyphicon-log-in\"></span> LogIn</a>\r\n                </div>\r\n                <div class = \"col-sm-3\"></div>\r\n            </div>\r\n        </div>\r\n        <div class = \"col-sm-2\"></div>\r\n    </div>\r\n</div>\r\n";

},{}],15:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 09/06/2017.
 */
"use strict";
var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null), $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);



function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;

    var statistics = ctx.repositories.status.getCurrentImageStatistics();
    self.accepted = ko.observable(statistics.selection.accepted);
    self.rejected = ko.observable(statistics.selection.rejected);
    self.annotation = ko.observableArray(statistics.annotation);
    for(var x in statistics.annotation){
        alert(x + " " + statistics.annotation[x]);
    }
    self.annotationAvailable = ko.observable(self.annotation().length);


    //alert(ctx.repositories.status.getCurrentImage());
    self.src = ko.observable(ctx.repositories.status.getCurrentImage()); //canonical URL

    //alert(ctx.repositories.status.getCurrentCampaign().annotation_size);
    self.size = ko.observable(ctx.repositories.status.getCurrentCampaign().annotation_size);

    $("#canvas").on("load", function(){
        ctx = $("#canvas").getContext('2d');
        var image = new Image();
        image.addEventListener("load", function () {
            ctx.drawImage(img, 0, 0);
        });
        image.src = value;
    });

}

exports.register = function () {
    ko.components.register('image-statistics', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};
/*
 self.getImageInfo = function(image){
 ctx.repositories.editimages.getImageInfo(
 ctx.repositories.status.getAuthApiToken(),
 //self.images(this).id
 image.id
 ).
 then(function (result) {
 alert("Success imageInfo");
 self.imageInfo(result);
 ctx.repositories.status.setCurrentImage(self.imageInfo().id);
 self.getImageStatistics();
 }).catch(function (e) {
 alert("Error imageInfo");
 alert(e);
 });
 }
 ;
 self.getImageStatistics = function(){
 ctx.repositories.editimages.getImageStatistics(
 ctx.repositories.status.getAuthApiToken(),
 ctx.repositories.status.getCurrentImage()
 ).
 then(function (result) {
 alert("Success imageStatistics");
 //self.imageStatistics(result);
 //alert("acc" +result.selection.accepted);
 //self.accepted(result.selection.accepted);
 alert("rej"+result.selection.rejected);
 self.rejected(result.selection.rejected);
 alert(result.annotation.length);
 self.annotation(result.annotation);
 }).catch(function (e) {
 alert("Error imageStatistics");
 alert(e);
 });
 */
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./template.html":16}],16:[function(require,module,exports){
module.exports = "<nav-bar params = \"repositories: repositories\"></nav-bar>\r\n<div class=\"container\" style = \"margin: auto\">\r\n    <div class=\"row\" >\r\n<div class = \"col-sm-2\">\r\n</div>\r\n    <div class = \"col-sm-4\">\r\n        <div class=\"panel panel-primary\">\r\n            <div class=\"panel-heading\">Selection Statistics</div>\r\n            <div class=\"panel-body\">\r\n                <p>\r\n                    Selection:<br/>\r\n                    Accepted: <span data-bind = \"text:accepted\"></span><br/>\r\n                    Rejected: <span  data-bind = \"text:rejected\"></span><br/>\r\n                </p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class = \"col-sm-6\">\r\n        <div class=\"panel panel-primary\">\r\n            <div class=\"panel-heading\">Annotation Statistics</div>\r\n            <div class=\"panel-body\">\r\n                <div data-bind = \"ifnot: annotationAvailable\">\r\n                    No annotations are avilable for this campaign.\r\n                </div>\r\n                <div data-bind = \"if:annotationAvailable\">\r\n                    <!--TEMPORANEO-->\r\n                    <ol data-bind = \"foreach: {data: annotation, as: 'myAnnotation'}\">\r\n                        <li class = \"linedrawer\">\r\n                            <line-displayer params=\"src: $parent.src, data: myAnnotation\"></line-displayer>\r\n                            <!--<img data-bind=\"attr: { src: $parent.src }\" class=\"background\" draggable=\"false\">\r\n                            <canvas id = \"canvas\"></canvas>\r\n                            <span data-bind = \"text: annotation\"></span>-->\r\n                        </li>\r\n                    </ol>\r\n                    <!--\r\n                <div id=\"myCarousel\" class=\"carousel slide\" data-ride=\"carousel\" >\r\n\r\n                    <ol class=\"carousel-indicators\" data-bind = \"foreach: annotation\">\r\n                        <div data-bind = \"ifnot:$index\">\r\n                            <li data-target=\"#myCarousel\" data-slide-to=\"$index\" class=\"active\"></li>\r\n                        </div>\r\n                        <div data-bind = \"if:$index\">\r\n                            <li data-target=\"#myCarousel\" data-slide-to=\"$index\"></li>\r\n                        </div>\r\n                    </ol>\r\n\r\n                    <div class=\"carousel-inner\" data-bind = \"foreach: annotation\">\r\n                        <div data-bind = \"ifnot:$index\" class=\"item active\">\r\n                            <line-displayer params=\"src: image, pen: size, line: $data\"></line-displayer>\r\n                        </div>\r\n\r\n                        <div class=\"item\" data-bind = \"if:$index\">\r\n                            <line-displayer params=\"src: image, pen: size, line: $data\"></line-displayer>\r\n                        </div>\r\n\r\n                    </div>\r\n\r\n\r\n                    <a class=\"left carousel-control\" href=\"#myCarousel\" data-slide=\"prev\">\r\n                        <span class=\"glyphicon glyphicon-chevron-left\"></span>\r\n                        <span class=\"sr-only\">Previous</span>\r\n                    </a>\r\n                    <a class=\"right carousel-control\" href=\"#myCarousel\" data-slide=\"next\">\r\n                        <span class=\"glyphicon glyphicon-chevron-right\"></span>\r\n                        <span class=\"sr-only\">Next</span>\r\n                    </a>\r\n                    -->\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class = \"col-sm-2\"></div>\r\n</div>\r\n<div class = \"row\">\r\n    <div class = \"col-sm-2\"></div>\r\n    <div class = \"col-sm-2\">\r\n        <a data-bind = \"path: '/CampaignStatistics'\" class=\"btn btn-primary\" role=\"button\"><span class=\"glyphicon glyphicon-backward\"></span>Back</a>\r\n    </div>\r\n    <div class = \"col-sm-8\"></div>\r\n</div>\r\n<!--\r\n    <div class=\"panel panel-primary\">\r\n        <div class=\"panel-heading\">Campaign Images</div>\r\n        <div class=\"panel-body\">\r\n            <!--<button type=\"button\" class=\"btn btn-primary\" data-toggle=\"collapse\" data-target=\"#statistics\" data-bind = \"click: getImageStatistics\" style = \"margin-bottom: 0.5em;\" >Statistics</button>\r\n    -->\r\n           <!-- <div id=\"statistics\" >--><!--class=\"collapse\"-->\r\n               <!-- <h4>Selection</h4>\r\n                <p data-bind = \"text: accepted\"></p>\r\n                <p data-bind = \"text: rejected\"></p>\r\n                <h4>Annotation</h4>\r\n                <ul data-bind = \"foreach: annotation\">\r\n                    <li data-bind = \"text: $data\"></li>\r\n                </ul>\r\n            </div>\r\n\r\n            <img data-bind = \"attr: {src: imageInfo.canonical}\">\r\n        </div>\r\n    </div>\r\n</div>-->\r\n<!-- nella lista di imagini, ricopiala da edit-images campaign, metti <a href = \"#\" data-bind = \"click: $parent.getImageInfo\">-->";

},{}],17:[function(require,module,exports){
/*jslint node:true */
"use strict";

exports.register = function (options) {
    require('./home-page').register(options);
    require('./sign-up').register(options);
    require('./log-in').register(options);
    require('./sign-up-outcome-p').register(options);
    require('./user-home').register(options);
    require('./log-out').register(options);
    require('./create-campaign').register(options);
    require('./edit-images-campaign').register(options);
    require('./edit-workers-campaign').register(options);
    require('./operation-success').register(options);
    require('./ended-campaign-statistics').register(options);
    require('./task-statistics').register(options);
    require('./task-working-session').register(options);
    require('./line-drawer').register(options);
    require('./nav-bar').register(options);
    require('./image-statistics').register(options);
    require('./line-displayer').register(options);
    require('./edit-campaign-info').register(options);
    require('./campaign-info').register(options);
};

},{"./campaign-info":1,"./create-campaign":3,"./edit-campaign-info":5,"./edit-images-campaign":7,"./edit-workers-campaign":9,"./ended-campaign-statistics":11,"./home-page":13,"./image-statistics":15,"./line-displayer":18,"./line-drawer":20,"./log-in":22,"./log-out":24,"./nav-bar":26,"./operation-success":28,"./sign-up":32,"./sign-up-outcome-p":30,"./task-statistics":34,"./task-working-session":36,"./user-home":38}],18:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 14/06/2017.
 */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null), $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);


ko.bindingHandlers.InitCanvas = {
    init: function (element, valueAccessor) {
        var value = ko.unwrap(valueAccessor()),
            ctx = element.getContext('2d');
        var image = new Image();
        image.addEventListener("load", function () {
            ctx.drawImage(image, 0, 0);
        });
        image.src = value;
    }
};/*,
    update: function (element, valueAccessor) {
        var value = ko.unwrap(valueAccessor()),
            ctx = element.getContext('2d');


        }
};*/
ko.bindingHandlers.LineDrawSetSize = {
    update: function (element, valueAccessor) {
        var value = valueAccessor()();
        if (!value) { return; }
        element.height = value.height;
        element.width = value.width;
    }
};

ko.bindingHandlers.LineDrawNaturalSize = {
    init: function (element, valueAccessor) {
        var value = valueAccessor();
        function update() {
            value({
                width: element.naturalWidth,
                height: element.naturalHeight
            });
        }
        update();
        $(element).on('load', update);
    }
};

function ViewModel(params) {
    var self = this;
    self.src = params.src;
    self.data = params.data;


    self.naturalSize = ko.observable();
}


exports.register = function () {
    ko.components.register('line-displayer', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};


/*
"use strict";

var ko = require('knockout'), $ = require('jquery');

ko.bindingHandlers.LineDrawSetSize = {
    update: function (element, valueAccessor) {
        var value = valueAccessor()();
        if (!value) { return; }
        element.height = value.height;
        element.width = value.width;
    }
};

ko.bindingHandlers.LineDrawNaturalSize = {
    init: function (element, valueAccessor) {
        var value = valueAccessor();
        function update() {
            value({
                width: element.naturalWidth,
                height: element.naturalHeight
            });
        }
        update();
        $(element).on('load', update);
    }
};

ko.bindingHandlers.LineDraw = {
    init: function (element, valueAccessor) {
        var value = valueAccessor(),
            ctx = element.getContext('2d'),
            $element = $(element);
        $element.on('mousedown', function (e) {
            var x = (e.pageX - $element.offset().left) / $element.width() * element.width,
                y = (e.pageY - $element.offset().top) / $element.height() * element.height;
            ctx.beginPath();
            ctx.moveTo(x, y);
            function draw(e) {
                var pen = parseInt($element.data('pen'), 10) || 1,
                    tx = (e.pageX - $element.offset().left) / $element.width() * element.width,
                    ty = (e.pageY - $element.offset().top) / $element.height() * element.height;
                ctx.lineTo(tx, ty);
                ctx.strokeStyle = 'rgb(255,0,0)';
                ctx.lineWidth = pen;
                ctx.lineCap = 'round';
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(tx, ty);
            }
            function end() {
                $element.off('mousemove', draw);
                $element.off('mouseup', end);
                value(element.toDataURL('image/png'));
            }
            $element.on('mousemove', draw);
            $element.on('mouseup', end);
        });
        //var $resetButton = $($element.prev()).prev();
        $element.on('contextmenu',function(e){
            e.preventDefault();
            ctx.clearRect(0, 0, element.width, element.height);
            value(undefined);
        });
    }
};

ko.bindingHandlers.LineDrawPen = {
    update: function (element, valueAccessor) {
        var value = valueAccessor(),
            $element = $(element);
        $element.data('pen', value);
    }
};

function ViewModel(params) {
    var self = this;
    self.src = params.src;
    self.pen = params.pen;
    self.line = params.line;

    self.naturalSize = ko.observable();
}


exports.register = function () {
    ko.components.register('line-drawer', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};
*/
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./template.html":19}],19:[function(require,module,exports){
module.exports = "<img data-bind=\"attr: { src: src },LineDrawNaturalSize: naturalSize\" class=\"background\" draggable=\"false\">\r\n<canvas id = \"canvas\" data-bind=\"InitCanvas: data,LineDrawSetSize: naturalSize\"></canvas>\r\n\r\n";

},{}],20:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 14/06/2017.
 */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null), $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
ko.bindingHandlers.LineDrawSetSize = {
    update: function (element, valueAccessor) {
        var value = ko.unwrap(valueAccessor());
        if (!value) { return; }
        element.height = value.height;
        element.width = value.width;
    }
};

ko.bindingHandlers.LineDrawNaturalSize = {
    init: function (element, valueAccessor) {
        var value = valueAccessor();
        function update() {
            value({
                width: element.naturalWidth,
                height: element.naturalHeight
            });
        }
        update();
        $(element).on('load', update);
    }
};

ko.bindingHandlers.LineDraw = {
    init: function (element, valueAccessor) {
        var value = valueAccessor(),
            ctx = element.getContext('2d'),
            $element = $(element);
        $element.on('mousedown', function (e) {
            var x = (e.pageX - $element.offset().left) / $element.width() * element.width,
                y = (e.pageY - $element.offset().top) / $element.height() * element.height;
            ctx.beginPath();
            ctx.moveTo(x, y);
            function draw(e) {
                var pen = parseInt($element.data('pen'), 10) || 1,
                    tx = (e.pageX - $element.offset().left) / $element.width() * element.width,
                    ty = (e.pageY - $element.offset().top) / $element.height() * element.height;
                ctx.lineTo(tx, ty);
                ctx.strokeStyle = 'rgb(255,0,0)';
                ctx.lineWidth = pen;
                ctx.lineCap = 'round';
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(tx, ty);
            }
            function end() {
                $element.off('mousemove', draw);
                $element.off('mouseup', end);
                value(element.toDataURL('image/png'));
            }
            $element.on('mousemove', draw);
            $element.on('mouseup', end);
        });
    },
    update: function (element, valueAccessor) {
        var value = ko.unwrap(valueAccessor()),
            ctx = element.getContext('2d');
        if (!value || value === '') {
            ctx.clearRect(0, 0, element.width, element.height);
        }
    }
};

ko.bindingHandlers.LineDrawPen = {
    update: function (element, valueAccessor) {
        var value = ko.unwrap(valueAccessor()),
            $element = $(element);
        $element.data('pen', value);
    }
};

function ViewModel(params) {
    var self = this;
    self.src = params.src;
    self.pen = params.pen;
    self.line = params.line;

    self.naturalSize = ko.observable();
}


exports.register = function () {
    ko.components.register('line-drawer', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};


/*
"use strict";

var ko = require('knockout'), $ = require('jquery');

ko.bindingHandlers.LineDrawSetSize = {
    update: function (element, valueAccessor) {
        var value = valueAccessor()();
        if (!value) { return; }
        element.height = value.height;
        element.width = value.width;
    }
};

ko.bindingHandlers.LineDrawNaturalSize = {
    init: function (element, valueAccessor) {
        var value = valueAccessor();
        function update() {
            value({
                width: element.naturalWidth,
                height: element.naturalHeight
            });
        }
        update();
        $(element).on('load', update);
    }
};

ko.bindingHandlers.LineDraw = {
    init: function (element, valueAccessor) {
        var value = valueAccessor(),
            ctx = element.getContext('2d'),
            $element = $(element);
        $element.on('mousedown', function (e) {
            var x = (e.pageX - $element.offset().left) / $element.width() * element.width,
                y = (e.pageY - $element.offset().top) / $element.height() * element.height;
            ctx.beginPath();
            ctx.moveTo(x, y);
            function draw(e) {
                var pen = parseInt($element.data('pen'), 10) || 1,
                    tx = (e.pageX - $element.offset().left) / $element.width() * element.width,
                    ty = (e.pageY - $element.offset().top) / $element.height() * element.height;
                ctx.lineTo(tx, ty);
                ctx.strokeStyle = 'rgb(255,0,0)';
                ctx.lineWidth = pen;
                ctx.lineCap = 'round';
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(tx, ty);
            }
            function end() {
                $element.off('mousemove', draw);
                $element.off('mouseup', end);
                value(element.toDataURL('image/png'));
            }
            $element.on('mousemove', draw);
            $element.on('mouseup', end);
        });
        //var $resetButton = $($element.prev()).prev();
        $element.on('contextmenu',function(e){
            e.preventDefault();
            ctx.clearRect(0, 0, element.width, element.height);
            value(undefined);
        });
    }
};

ko.bindingHandlers.LineDrawPen = {
    update: function (element, valueAccessor) {
        var value = valueAccessor(),
            $element = $(element);
        $element.data('pen', value);
    }
};

function ViewModel(params) {
    var self = this;
    self.src = params.src;
    self.pen = params.pen;
    self.line = params.line;

    self.naturalSize = ko.observable();
}


exports.register = function () {
    ko.components.register('line-drawer', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};
*/
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./template.html":21}],21:[function(require,module,exports){
module.exports = "<img data-bind=\"attr: { src: src }, LineDrawNaturalSize: naturalSize\" class=\"background\" draggable=\"false\">\r\n<canvas id = \"canvas\" data-bind=\"LineDraw: line, LineDrawSetSize: naturalSize, LineDrawPen: pen\"></canvas>\r\n\r\n";

},{}],22:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 17/05/2017.
 */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);

function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;
    //QUESTI ERROR IN REALTA' SONO BINDATI A DEI COSI HTML!!! VEDI L'ESEMPIO KO
    self.username = ko.observable();
    self.usernameError = ko.observable();
    self.username.subscribe(function(){
        self.usernameError(undefined);
    });

    self.password = ko.observable();
    self.passwordError = ko.observable();

    self.shouldShowMessage = ko.observable(false);
    self.errorMessage = ko.observable();

    self.login = function () {
        ctx.repositories.login.login(
            self.username(),
            self.password()
        ).then(function (result) {
            //alert("Success");
            ctx.repositories.status.setApiToken(result.token);
            //alert("HO SETTATO API TOKEN");
            /*for(var x in ctx){
                alert(x + " " +ctx[x]);
            }
            ctx.updateStatusLogged();
            ctx.updateStatusLogged();*/
            //alert(ctx.repositories.status.getApiToken());
            location.hash = '/UserHome';
        }).catch(function (e) {
           // alert("Error");
            self.shouldShowMessage(true);
            self.errorMessage(" " +e.errors.error);
        });
    };
}


exports.register = function () {
    ko.components.register('log-in', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./template.html":23}],23:[function(require,module,exports){
module.exports = "<nav-bar params = \"repositories: repositories\"></nav-bar>\r\n<div class=\"container\" style = \"margin: auto\">\r\n    <div class=\"row\" >\r\n        <div class = \"col-sm-2\"></div>\r\n        <div class=\"col-sm-8\">\r\n            <h1 style = \"padding-bottom:1em; text-align: center\">Fill in Your Credentials to Log-in</h1>\r\n            <div class=\"alert alert-danger alert-dismissable fade in\" data-bind = \"visible: shouldShowMessage\">\r\n                <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>\r\n                <strong>Warning!</strong><span data-bind = \"text:errorMessage\"></span>\r\n            </div>\r\n            <form data-bind=\"submit: login\" class=\"form-horizontal\">\r\n                <div class=\"form-group\">\r\n                    <label class=\"control-label col-sm-2\" for = \"username\">Username:</label>\r\n                    <div class=\"col-sm-10\">\r\n                        <input type=\"text\" class=\"form-control\" id = \"username\" placeholder=\"Enter your Username\" required  data-bind = \"textInput: username\">\r\n                    </div>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label class=\"control-label col-sm-2\" for=\"pwd1\">Password:</label>\r\n                    <div class=\"col-sm-10\">\r\n                        <input type=\"password\" class=\"form-control\" id=\"pwd1\" placeholder=\"Enter password\" required data-bind = \"textInput: password\">\r\n                    </div>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-offset-2 col-sm-10\">\r\n                        <button type=\"submit\" class=\"btn btn-primary\">Login</button>\r\n                    </div>\r\n                </div>\r\n            </form>\r\n        </div>\r\n        <div class = \"col-sm-2\"></div>\r\n    </div>\r\n</div>\r\n";

},{}],24:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 24/05/2017.
 */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);

function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;
    self.shouldShowMessage = ko.observable(false);
    self.errorMessage = ko.observable();

    self.logout = function () {
       // alert("STo per eliminare: "+ctx.repositories.status.getApiToken());
        ctx.repositories.logout.logout(
            ctx.repositories.status.getApiToken()
        ).then(function (result) {
           // alert("Successo");
            ctx.repositories.status.clearCache();
            location.hash = "/";
        }).catch(function (e) {
            alert("Errore");
            for( var x in e.jqXHR)
            {
                alert(e.jqXHR[x]);
            }
            self.shouldShowMessage(true);
        });

    };
}

exports.register = function () {
    ko.components.register('log-out', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./template.html":25}],25:[function(require,module,exports){
module.exports = "<nav-bar params = \"repositories: repositories\"></nav-bar>\r\n<div class=\"container\" style = \"margin: auto\">\r\n    <div class=\"row\" >\r\n        <div class = \"col-sm-2\"></div>\r\n        <div class=\"col-sm-8\">\r\n            <h1 style = \"padding-bottom:1em; text-align: center\">Are you sure you want to logout?</h1>\r\n            <div class=\"alert alert-danger alert-dismissable fade in\" data-bind = \"visible: shouldShowMessage\">\r\n                <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>\r\n                <strong>Warning!</strong><span data-bind = \"text:errorMessage\"></span>\r\n            </div>\r\n            <div class = \"row\">\r\n                <div class = \"col-sm-3\"></div>\r\n                <div class = \"col-sm-3\">\r\n                    <a data-bind = \"click: logout\" class=\"btn btn-primary\" role=\"button\" style = \"text-align:center;\"> Yes </a>\r\n                </div>\r\n                <div class = \"col-sm-3\">\r\n                    <a data-bind = \"path: '/UserHome'\" class=\"btn btn-primary\" role=\"button\" style = \"text-align:center;\"> No </a>\r\n                </div>\r\n                <div class = \"col-sm-3\"></div>\r\n            </div>\r\n            </form>\r\n        </div>\r\n        <div class = \"col-sm-2\"></div>\r\n    </div>\r\n</div>";

},{}],26:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 17/06/2017.
 */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null), $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);// router = require('ko-component-router');


function ViewModel(param) {
    var self = this;
    self.repositories = param.repositories;
    self.statusLogged = param.repositories.status.getApiToken();
    /*
    self.statusLogged = ko.computed(function()
        { return param.repositories.status.getApiToken();});*/
    //self.statusLogged = param.statusLogged;
    //ko.computed(function(){return param.statusLogged;});
}

/*
ko.bindingHandlers.repositories = {
    update: function (element, valueAccessor, allBindings,viewModel,bindingContext) {
        var value = valueAccessor(),
            $element = $(element);
        $element.data('repositories', value);
    }
};
*/

exports.register = function () {
    ko.components.register('nav-bar', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./template.html":27}],27:[function(require,module,exports){
module.exports = "<nav class=\"navbar navbar-inverse\">\r\n    <div class=\"container-fluid\">\r\n        <div class=\"navbar-header\">\r\n            <a class=\"navbar-brand\" href = \"#\" >Crowdsourcing Campaigns</a> <!--data-bind = \"path: '/'\"-->\r\n        </div>\r\n        <ul class = \"nav navbar-nav navbar-left\">\r\n            <li data-bind = \"path:'/UserHome', if: statusLogged\">\r\n                <a data-bind = \"path: '/UserHome'\">\r\n                    <span class = \"glyphicon glyphicon-home\">\r\n                        Home\r\n                    </span>\r\n                </a>\r\n            </li>\r\n        </ul>\r\n        <ul class=\"nav navbar-nav navbar-right\">\r\n\r\n            <li data-bind=\"path: '/SignUp', ifnot: statusLogged\">\r\n                <a data-bind=\"path: '/SignUp'\">\r\n                      <span class=\"glyphicon glyphicon-user\">\r\n                      </span>Sign Up\r\n                </a>\r\n            </li>\r\n\r\n            <li data-bind =\"path: '/LogIn', ifnot: statusLogged\">\r\n                <a data-bind=\"path: '/LogIn'\">\r\n                      <span class=\"glyphicon glyphicon-log-in\">\r\n                      </span> Login\r\n                </a>\r\n            </li>\r\n\r\n            <li data-bind =\"path: '/LogOut', if: statusLogged\">\r\n                <a data-bind=\"path: '/LogOut'\">\r\n                      <span class=\"glyphicon glyphicon-log-out\">\r\n                      </span> Logout\r\n                </a>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n</nav>";

},{}],28:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 03/06/2017.
 */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);

function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;
    self.proceed = function () {
        var temp = ctx.repositories.status.getSuccessNext();
        ctx.repositories.status.deleteSuccessNext();
        location.hash = temp;
    };
}

exports.register = function () {
    ko.components.register('operation-success', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./template.html":29}],29:[function(require,module,exports){
module.exports = "<nav-bar params = \"repositories: repositories\"></nav-bar>\r\n<div class=\"container\" style = \"margin: auto\">\r\n    <div class=\"row\" >\r\n        <div class = \"col-sm-2\"></div>\r\n        <div class=\"col-sm-8\">\r\n            <h1 style = \"padding-bottom:1em; text-align: center\">Success! The operation has been correctly carried out</h1>\r\n            <div class = \"row\">\r\n                <div class = \"col-sm-6\"></div>\r\n                <div class = \"col-sm-2\">\r\n                    <button data-bind = \"click: proceed\" class=\"btn btn-primary\">Proceed</button>\r\n                </div>\r\n                <div class = \"col-sm-4\"></div>\r\n            </div>\r\n        </div>\r\n        <div class = \"col-sm-2\"></div>\r\n    </div>\r\n</div>";

},{}],30:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 24/05/2017.
 */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);
exports.register = function () {
    ko.components.register('sign-up-outcome-p', {
        template: require('./template.html'),
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./template.html":31}],31:[function(require,module,exports){
module.exports = "<nav-bar params = \"repositories: repositories\"></nav-bar>\r\n<div class=\"container\" style = \"margin: auto\">\r\n    <div class=\"row\" >\r\n        <div class = \"col-sm-2\"></div>\r\n        <div class=\"col-sm-8\">\r\n            <h1 style = \"padding-bottom:1em; text-align: center\">Congratulations, the sign-up procedure succeded!</h1>\r\n            <p style = \"text-align:center; padding-bottom:0.5em\">Now you can Login</p>\r\n        </div>\r\n        <div class = \"col-sm-2\"></div>\r\n    </div>\r\n</div>";

},{}],32:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 17/05/2017.
 */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);

function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;


    self.fullname = ko.observable();
    self.fullnameError = ko.observable();
    self.fullname.subscribe(function(){
        self.fullnameError(undefined);
    });
    //QUESTI ERROR IN REALTA' SONO BINDATI A DEI COSI HTML!!! VEDI L'ESEMPIO KO
    self.username = ko.observable();
    //     self.usernameError = ko.observable();

    self.password1 = ko.observable();
    //self.password1Error = ko.observable();

    /*self.password2 = ko.observable();
    self.password2Error = ko.observable();*/

    self.role = ko.observable("master");
    //  self.roleError = ko.observable();

    self.shouldShowMessage = ko.observable(false);
    self.errorMessage = ko.observableArray();
    self.alertMessages = ko.observableArray();

    self.validateAndSend = function () {
            ctx.repositories.signup.validateAndSend(
                self.fullname(),
                self.username(),
                self.password1(),
                self.role()
            ).then(function (result) {
               // alert("Messaggio inviato, risposta ricevuta");
                //alert(result);//undefined???
                location.hash = "/SignUpOutcomeP";
            }).catch(function (e) {
                self.alertMessages.removeAll();
                var tempErr = [];
                if(e.errors.error.username === undefined && e.errors.error.password === undefined)
                    tempErr.push(e.errors.error);
                else
                for(var i in e.errors.error) {
                    tempErr.push(" "+i +": " +e.errors.error[i]);
                }
                self.alertMessages.push({shouldShowMessage:true, errorMessage:tempErr})
                /*self.shouldShowMessage(true);
                self.errorMessage.removeAll();
                for(var i in e.errors.error) {
                    self.errorMessage.push(" "+i +": " +e.errors.error[i]);
                }*/
                /*
                if (e.errors) {
                    alert("Errore");
                    /*self.usernameError(e.errors.username);
                    self.fullnameError(e.errors.fullname);
                    self.roleError(e.errors.role);*/
                /*} else {
                    alert("Errore");
                    alert(e.message);
                }*/
            });
        //}
    };
}

exports.register = function () {
    ko.components.register('sign-up', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./template.html":33}],33:[function(require,module,exports){
module.exports = "<nav-bar params = \"repositories: repositories\"></nav-bar>\r\n<div class=\"container\" style = \"margin: auto\">\r\n    <div class=\"row\" >\r\n        <div class = \"col-sm-2\"></div>\r\n        <div class=\"col-sm-8\">\r\n            <h1 style = \"padding-bottom:1em; text-align: center\">Fill These Forms to Get Started</h1>\r\n            <form data-bind=\"submit: validateAndSend\" class=\"form-horizontal\">\r\n                <div data-bind = \"foreach:alertMessages\">\r\n                <div class=\"alert alert-danger alert-dismissable fade in\" data-bind = \"visible: shouldShowMessage\">\r\n                    <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>\r\n                    <ul data-bind = \"foreach: errorMessage\" style = \"list-style-type:none\">\r\n                        <li>\r\n                            <strong>Warning!</strong><span data-bind = \"text:$data\"></span>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label class=\"control-label col-sm-2\" for = \"fullname\">Full Name:</label>\r\n                    <div class=\"col-sm-10\">\r\n                        <input type=\"text\" class=\"form-control\" id = \"fullname\" placeholder=\"Enter your Full Name\" required data-bind = \"textInput:fullname\">\r\n                    </div>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label class=\"control-label col-sm-2\" for = \"username\">Username:</label>\r\n                    <div class=\"col-sm-10\">\r\n                        <input type=\"text\" class=\"form-control\" id = \"username\" placeholder=\"Enter your Username\" required data-bind = \"textInput:username\">\r\n                    </div>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label class=\"control-label col-sm-2\" for=\"pwd1\">Password:</label>\r\n                    <div class=\"col-sm-10\">\r\n                        <input type=\"password\" class=\"form-control\" id=\"pwd1\" placeholder=\"Enter password\" required data-bind = \"textInput:password1\" minlength = \"6\">\r\n                    </div>\r\n                </div>\r\n                <!-- PER ORA NON COMPLICARTI LA VITA <div class=\"form-group\">\r\n                    <label class=\"control-label col-sm-2\" for=\"pwd2\">Confirm your Password:</label>\r\n                    <div class=\"col-sm-10\">\r\n                        <input type=\"password\" class=\"form-control\" id=\"pwd2\" placeholder=\"Enter password\" required>\r\n                    </div>\r\n                </div>-->\r\n                <div class=\"form-group\">\r\n                    <label class=\"control-label col-sm-2\">Role:</label>\r\n                    <div class=\"col-sm-10\">\r\n                        <label class=\"radio-inline\">\r\n                            <input type=\"radio\" name=\"role\" value = \"master\" data-bind = \"checked: role\" >Master\r\n                        </label>\r\n                        <label class=\"radio-inline\">\r\n                            <input type=\"radio\" name=\"role\"  value = \"worker\" data-bind = \"checked: role\">Worker\r\n                        </label>\r\n                    </div>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <div class=\"col-sm-offset-2 col-sm-10\">\r\n                        <button type=\"submit\" class=\"btn btn-primary\" id = \"submit\">Submit</button>\r\n                    </div>\r\n                </div>\r\n            </form>\r\n        </div>\r\n        <div class = \"col-sm-2\"></div>\r\n    </div>\r\n</div>\r\n";

},{}],34:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 12/06/2017.
 */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);

function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;
    self.numAvailable = ko.observable();
    self.numAccepted = ko.observable();
    self.numRejected = ko.observable();
    self.numAnnotated = ko.observable();
    self.isSelect = ko.observable(false);
    self.isAnnotate = ko.observable(false);

    self.getTaskStatistics = function () {
       // alert(ctx.repositories.status.getCurrentTask().statistics);
        ctx.repositories.taskstatistics.getTaskStatistics(
            ctx.repositories.status.getAuthApiToken(),
            ctx.repositories.status.getCurrentTask().statistics
        ).then(function (result) {
           // alert("Success");
            self.numAvailable(result.available);
            self.numAccepted(result.accepted);
            self.numRejected(result.rejected);
            self.numAnnotated(result.annotated);
            (result.annotated === undefined)?self.isSelect(true):self.isAnnotate(true);
        }).catch(function (e) {
            alert("Error");
           alert(e);
        });
    };

    self.getTaskStatistics();

}


exports.register = function () {
    ko.components.register('task-statistics', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./template.html":35}],35:[function(require,module,exports){
module.exports = "<nav-bar params = \"repositories: repositories\"></nav-bar>\r\n<div class=\"container\" style = \"margin: auto\">\r\n\r\n    <div class=\"row\" >\r\n        <div class = \"col-sm-2\"></div>\r\n        <div class = \"col-sm-8\">\r\n            <div class=\"panel panel-primary\">\r\n                <div class=\"panel-heading\">Task statistics</div>\r\n                <div class=\"panel-body\">\r\n                    <p>\r\n                        Number of images: <span data-bind = \"text:numAvailable\"></span><br/>\r\n                        <span data-bind  =\"if:isSelect\">\r\n                        Number of accepted images: <span data-bind = \"text:numAccepted\"></span><br/>\r\n                        Number of rejected images: <span data-bind = \"text:numRejected\"></span><br/>\r\n                        </span>\r\n                        <span data-bind = \"if:isAnnotate\">\r\n                        Number of annotations: <span data-bind = \"text:numAnnotated\"></span>\r\n                        </span>\r\n                    </p>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class = \"col-sm-2\"></div>\r\n    </div>\r\n</div>";

},{}],36:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 13/06/2017.
 */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);

function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;
    self.type = ko.observable();
    self.image = ko.observable();
    self.size = ko.observable();
    self.nextTaskAvailable = ko.observable(true);
    self.annotationEnabled = ko.observable(true);
    self.shouldShow = ko.computed(function(){return self.nextTaskAvailable() && self.annotationEnabled();});

    self.line = ko.observable();
    self.line.subscribe(function () {
        //alert(self.line());
    });

    self.clearAnnotation = function(){
        self.line('');
        /*$("#annotation").remove("#line-drawer");
        self.line = ko.observable();
        $("#annotation").append("<line-drawer id = 'line-drawer' params='src: image, pen: size, line: line'></line-drawer>");*/
    };

    self.startWorkingSession = function (/*isNext*/) {
        ctx.repositories.taskworkingsession.startWorkingSession(
            ctx.repositories.status.getAuthApiToken(),
            ctx.repositories.status.getCurrentTask().session
        ).then(function (result) {
            //alert("Success start working sessione");
           // if(isNext){
                self.getNextTaskInstance();
           // }
        }).catch(function (e) {
            alert("errore in start working session");
            alert(e.status);
            if(e.jqXHR.status == 410 && ctx.repositories.status.getCurrentTask().type == "selection"){
                self.nextTaskAvailable(false);
            }else if(e.jqXHR.status == 410 && ctx.repositories.status.getCurrentTask().type == "annotation"){
                self.annotationEnabled(false);
            }
            //alert("session" + e.textStatus);
            //alert("Error");
            //alert(e);
        });
    };

    self.startWorkingSession();

    self.getNextTaskInstance = function(){
        ctx.repositories.taskworkingsession.getNextTaskInstance(
            ctx.repositories.status.getAuthApiToken(),
            ctx.repositories.status.getCurrentTask().session
        ).then(function (result) {
           // alert("Success next task instance");
            self.type(result.type);
            self.image(result.image);
            self.size(result.size);
            }).catch(function (e) {
                alert("errore in getNexttaskinstance");
                alert(e);
            if(e.jqXHR.status == 404 && ctx.repositories.status.getCurrentTask().type == "selection"){
                self.nextTaskAvailable(false);
            }else if (e.jqXHR.status == 410 && ctx.repositories.status.getCurrentTask().type == "selection"){
                self.nextTaskAvailable(false); 
            }else if (e.jqXHR.status == 404 && ctx.repositories.status.getCurrentTask().type == "annotation"){
                self.annotationEnabled(false);
            }else if (e.jqXHR.status == 410 && ctx.repositories.status.getCurrentTask().type == "annotation"){
                self.annotationEnabled(false);
            }
            //alert("getNextTask" + e);
            //alert("Error");
           // alert(e);//GONE = Già fatto
        });
    };
    //self.getNextTaskInstance();


    self.submitAnnotation = function(){
        if(self.line()) {
            ctx.repositories.taskworkingsession.submitAnnotation(
                ctx.repositories.status.getAuthApiToken(),
                ctx.repositories.status.getCurrentTask().session,
                self.line()
            ).then(function (result) {
                alert("Submitted");
                self.line('');
                self.getNextTaskInstance();
                //self.startWorkingSession(true);
            }).catch(function (e) {
                alert("Error");
                alert(e);
            });
        }else{
            alert("You cannot submit an empty annotation!");
        }
    };

    self.rejectSelection = function(){
        ctx.repositories.taskworkingsession.submitSelection(
            ctx.repositories.status.getAuthApiToken(),
            ctx.repositories.status.getCurrentTask().session,
            false
        ).then(function (result) {
            alert("Submitted");
            self.getNextTaskInstance();
            //self.startWorkingSession(true);
        }).catch(function (e) {
            alert("Error");
            alert(e);
        });
    };

    self.acceptSelection = function(){
        ctx.repositories.taskworkingsession.submitSelection(
            ctx.repositories.status.getAuthApiToken(),
            ctx.repositories.status.getCurrentTask().session,
            true
        ).then(function (result) {
            alert("Submitted");
            self.getNextTaskInstance();
            //self.startWorkingSession(true);
        }).catch(function (e) {
            alert("Error");
            alert(e);
        });
    };
}


exports.register = function () {
    ko.components.register('task-working-session', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./template.html":37}],37:[function(require,module,exports){
module.exports = "<nav-bar params = \"repositories: repositories\"></nav-bar>\r\n<div class=\"container\" style = \"margin: auto\">\r\n\r\n    <div class=\"row\" >\r\n        <div class = \"col-sm-2\"></div>\r\n        <div class = \"col-sm-8\" data-bind = \"if:shouldShow\">\r\n            <div class=\"panel panel-primary\" >\r\n                <div class=\"panel-heading\" data-bind = \"text:type\"></div>\r\n                <div class=\"panel-body\">\r\n\r\n                    <div data-bind = \"ifnot:size\">\r\n                        <img data-bind = \"attr : {src : image}\">\r\n                        <button class = \"btn btn-primary\" data-bind = \"click: rejectSelection\">Reject</button>\r\n                        <button class = \"btn btn-primary\" data-bind = \"click: acceptSelection\">Accept</button>\r\n                    </div>\r\n                    <div id = \"annotation\" data-bind = \"if:size\">\r\n                        <line-drawer id = \"line-drawer\" params=\"src: image, pen: size, line: line\"></line-drawer>\r\n                        <button class=\"pull-right btn btn-primary\" data-bind = \"click: submitAnnotation\">Submit</button>\r\n                        <button class=\"pull-right btn btn-primary\" data-bind = \"click: clearAnnotation\">Clear</button>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class = \"col-sm-8\" data-bind = \"ifnot:nextTaskAvailable\">\r\n        <div class=\"panel panel-primary\" >\r\n            <div class=\"panel-heading\">You completed your task!</div>\r\n            <div class=\"panel-body\">\r\n                Congratulations! You completed your task, no more images are available for this task! Return to <a data-bind = \"path:'/UserHome'\"> your personal homepage</a>.\r\n            </div>\r\n        </div>\r\n        </div>\r\n        <div class = \"col-sm-8\" data-bind = \"ifnot:annotationEnabled\">\r\n            <div class=\"panel panel-primary\" >\r\n                <div class=\"panel-heading\">Wait!</div>\r\n                <div class=\"panel-body\">\r\n                    The annotation task is not enabled! Return at your <a data-bind = \"path:'/UserHome'\">home page</a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class = \"col-sm-2\"></div>\r\n    </div>\r\n</div>";

},{}],38:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 24/05/2017.
 */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null);
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);

function ViewModel(ctx) {
    var self = this;
    self.repositories = ctx.repositories;
    self.visible = false;
    self.editUserString = ko.observable("Edit User Info");
    //QUESTI ERROR IN REALTA' SONO BINDATI A DEI COSI HTML!!! VEDI L'ESEMPIO KO
    self.username = ko.observable();
    self.fullname = ko.observable();
    self.role = ko.observable();
    self.isUserMaster = ko.observable();

    self.readyCampaignsAvailable = ko.observable(false);
    self.readyCampaigns = ko.observableArray();
    self.startedCampaignsAvailable = ko.observable(false);
    self.startedCampaigns = ko.observableArray();
    self.endedCampaignsAvailable = ko.observable(false);
    self.endedCampaigns = ko.observableArray();

    self.newpassword = ko.observable("");
    self.newfullname = ko.observable("");

    //self.shouldShowErrorMessage = ko.observable(false);
    //self.errorMessage = ko.observable();

    //self.shouldShowSuccessMessage = ko.observable(false);
    //self.successMessage = ko.observable();


    self.tasksAvailable = ko.observable(false);
    self.tasks = ko.observableArray();

    self.alertMessages = ko.observableArray();

    self.setUserCampaigns = function(result){
        if (!(result === undefined)) {
            for (var x in Object.getOwnPropertyNames(result.campaigns)) {
                if (!(result.campaigns[x] == undefined)) {
                    switch (result.campaigns[x].status) {
                        case "ended":
                            self.endedCampaigns().push(result.campaigns[x]);
                            //alert("ended available");
                            break;
                        case "started":
                            self.startedCampaigns().push(result.campaigns[x]);
                            //alert("started available");
                            break;
                        case "ready":
                            // alert(result.campaigns[x]);
                            self.readyCampaigns().push(result.campaigns[x]);
                            //alert('The length of the array is ' + self.readyCampaigns().length);
                            //alert("ready available");
                            break;
                        default:
                            //alert("Errore switch campagna");
                    }
                }
            }
        }
        //alert(self.endedCampaigns().length + "ended");
        //alert(self.startedCampaigns().length + "started");
        //alert(self.readyCampaigns().length + "ready");
        self.endedCampaignsAvailable(self.endedCampaigns().length > 0 ? true : false);
        self.startedCampaignsAvailable(self.startedCampaigns().length > 0 ? true : false);
        self.readyCampaignsAvailable(self.readyCampaigns().length > 0 ? true : false);
    };
    self.getUserCampaigns = function(){
        /*var result = ctx.repositories.status.getUserCampaigns();
        if (result) {
            self.setUserCampaigns(result);
        }else { @TODO NO CACHING: lo stato della campagna lato server può essere cambiato! bisogna ripetere il fetch!*/
            ctx.repositories.userhome.getUserCampaigns(
                ctx.repositories.status.getAuthApiToken()
            ).then(function (result) {
                //alert("Successo Campagna");
                //var temp = JSON.parse(result);
                /*alert("Successo Parse");
                 alert(result);//ritorna undefined
                 for(var x in result.campaigns){
                 alert(x+""+result.campaigns[x]);
                 }
                 self.endedCampaigns([]);
                 self.startedCampaigns([]);
                 self.readyCampaigns([]);*/
                //alert(result);
                self.setUserCampaigns(result);
            }).catch(function (e) {
                alert("Fallito");
                alert(e);
            });
        };

    self.setTasksInfo = function(result){
        /*var temp = result.tasks;

        self.tasksAvailable((temp.length > 0) ? true : false);
        if(temp.length >0){
            for(var x in temp)
            ctx.repositories.userhome.getTaskInfo(
                ctx.repositories.status.getAuthApiToken(),
                temp[x].id
            ).then(function (result) {
                for(var y in result){
                    alert(""+y+""+result[y]);
                }
                temp[x].campaignName = result.campaign;
                alert(temp[x].type);
                alert(temp[x].campaignName);
                self.tasks(temp);
            }).catch(function (e) {
                alert("Errore");
                alert(e);
            });
        }*/
        var temp = result.tasks;
        self.tasksAvailable((temp.length > 0) ? true : false);
        if(temp.length >0) {
            for (var x in temp) {
                ctx.repositories.userhome.getTaskInfo(
                    ctx.repositories.status.getAuthApiToken(),
                    temp[x].id
                ).then(function (result) {
                    //alert(result.id)
                   // alert(result.type);
                    self.tasks.push({
                        id: result.id,
                        type: result.type,
                        campaignName: result.campaign,
                        session: result.session,
                        statistics: result.statistics
                    });
                }).catch(function (e) {
                    alert("Errore");
                    alert(e);
                });
            }
        }
    };

    self.getTasksInfo = function(){
      /*  var result = ctx.repositories.status.getTasksInfo();
        if (result) {
            self.setTasksInfo(result);
        }else {*/
            ctx.repositories.userhome.getTasksInfo(
                ctx.repositories.status.getAuthApiToken()
            ).then(function (result) {
                //alert("successo tasksInfo");
                //ctx.repositories.status.setTasksInfo(result);
                self.setTasksInfo(result);
            }).catch(function (e) {
                alert("Errore");
            });
        //}
    };

    self.setUserInfo = function(result){
        self.username(result.username);
        self.role(result.type);
        self.fullname(result.fullname);
        self.isUserMaster((result.type == "master") ? true : false);
        (result.type == "master") ? self.getUserCampaigns() : self.getTasksInfo();
    };

    self.getUserInfo = function() {
        var result = ctx.repositories.status.getUserInfo();
        if (result) {
            self.setUserInfo(result);
        } else {
            ctx.repositories.userhome.getUserInfo(
                ctx.repositories.status.getAuthApiToken()
            ).then(function (result) {
                ctx.repositories.status.setUserInfo(result);
                self.setUserInfo(result);
            }).catch(function (e) {
                alert("Errore");
            });
        }
    };
    self.getUserInfo();




    self.workTask = function(task){
        /*ctx.repositories.status.setCurrentTask(task);
        location.hash = "/WorkingSessionTask";*/

        ctx.repositories.userhome.getTaskInfo(
            ctx.repositories.status.getAuthApiToken(),
            task.id
        ).then(function (result) {
            //for(var x in result){
            //    alert(x + " " + result[x]);
            //}
            ctx.repositories.status.setCurrentTask(result);
            location.hash = "/WorkingSessionTask";
        }).catch(function (e) {
            alert("Errore");
        });
    };

    self.getTaskStatistics = function(task){
        ctx.repositories.status.setCurrentTask(task);
        location.hash = "/TaskStatistics";/*
        ctx.repositories.userhome.getTaskInfo(
            ctx.repositories.status.getAuthApiToken(),
            task.id
        ).then(function (result) {
            ctx.repositories.status.setCurrentTask(result);
            location.hash = "/TaskStatistics";
        }).catch(function (e) {
            alert("Errore");
        });*/
    };


    self.editUserInfo = function () {
        //alert("Chiamo editUserInfo");
        //alert(self.newpassword());
        //alert(self.newfullname());
        var fullname = self.newfullname();
        var tempErr = "";
        if(self.newfullname().toString().length < 3 )
            tempErr += "Fullname should be at least 3 chars.";
        if(self.newpassword().toString().length < 8)
            tempErr += "Password should be at least 8 chars."
        if(self.newfullname().toString().length < 3 || self.newpassword().toString().length < 8){
            self.alertMessages.removeAll();
            self.alertMessages.push({shouldShowSuccessMessage:false, shouldShowErrorMessage:true, errorMessage:tempErr});
        }else {
            ctx.repositories.userhome.editUserInfo(
                self.newfullname(),
                self.newpassword(),
                ctx.repositories.status.getAuthApiToken()
            ).then(function (result) {
                //alert("Successo Edit Dati utente");
                self.alertMessages.removeAll();
                self.alertMessages.push({shouldShowSuccessMessage:true, shouldShowErrorMessage:false, errorMessage: null});
                //self.shouldShowSuccessMessage(true);
                //alert(result);
                //self.successMessage();
                var result1 = ctx.repositories.status.getUserInfo();
                result1.fullname = fullname;
                ctx.repositories.status.setUserInfo(result1);
                self.fullname(result1.fullname);

                //successMessage(); //@todo, capito cosa è result vedi come scrivi il messaggio
            }).catch(function (e) {
                alert("Fallito Edit ");
                //self.shouldShowErrorMessage(true);
                var tempString = '';
                for (var x in e.errors.error) {
                    tempString += x + ": " + e.errors.error[x] + ". ";
                }
                //self.errorMessage(tempString);
                self.alertMessages.removeAll();
                self.alertMessages().push({shouldShowSuccessMessage:false, shouldShowErrorMessage:true, errorMessage:tempString});
            });
        }
    };



    //self.getUserCampaigns(); //important: calls it

    self.addCampaign = function(){
        location.hash = "/AddCampaign";
    };
    self.editImages = function(campaign){
        /*if(ctx.repositories.status.getCurrentCampaign() !== undefined &&
            ctx.repositories.status.getCurrentCampaign().id === campaign.id
            && ctx.repositories.status.getOldImagesUrl() === ctx.repositories.status.getCurrentCampaign().image ) {
            location.hash = "/EditImagesCampaign";
        }else{*/
            ctx.repositories.userhome.getCampaignInfo(
                campaign.id,
                ctx.repositories.status.getAuthApiToken()
            ).then(function (result) {
                //alert("Successo GetCampaignInfo");
                ctx.repositories.status.setCurrentCampaign(result);
                ctx.repositories.status.setOldImagesUrl(result.image);

                ctx.repositories.editimages.getCampaignImages(
                    ctx.repositories.status.getAuthApiToken(),
                    ctx.repositories.status.getCurrentCampaign().image
                ).then(function (result) {

                    ctx.repositories.status.setCurrentCampaignImages(result);
                    //alert("Success loaded");

                }).catch(function (e) {
                    alert("Error loaded");
                    alert(e);
                });
                location.hash = "/EditImagesCampaign";
            }).catch(function (e) {
                alert("Fallito GetCampaignInfo ");
                alert(e);
            });
        //}

    };
    self.editCampaign = function(campaign){
        //NO CACHE QUI, PERCHE' SE FAI EDIT E POI NON AGGIORNI PRELOADI I DATI PRIMA DELL'EDIT!
            ctx.repositories.userhome.getCampaignInfo(
                campaign.id,
                ctx.repositories.status.getAuthApiToken()
            ).then(function (result) {
               // alert("Successo GetCampaignInfo");
                ctx.repositories.status.setCurrentCampaign(result);
                location.hash = "/EditCampaign";
            }).catch(function (e) {
                alert("Fallito GetCampaignInfo ");
                alert(e);
            });

    };
    self.getCampaignInformation = function(campaign){
        //NO CACHE QUI, PERCHE' SE FAI EDIT E POI NON AGGIORNI PRELOADI I DATI PRIMA DELL'EDIT!
        ctx.repositories.userhome.getCampaignInfo(
            campaign.id,
            ctx.repositories.status.getAuthApiToken()
        ).then(function (result) {
            // alert("Successo GetCampaignInfo");
            ctx.repositories.status.setCurrentCampaign(result);
            location.hash = "/CampaignInfo";
        }).catch(function (e) {
            alert("Fallito GetCampaignInfo ");
            alert(e);
        });

    };
    self.editWorkers = function(campaign){

        ctx.repositories.userhome.getCampaignInfo(
            campaign.id,
            ctx.repositories.status.getAuthApiToken()
        ).then(function (result) {
            //alert("Successo GetCampaignInfo");
            ctx.repositories.status.setCurrentCampaign(result);
            location.hash = "/EditWorkersCampaign";
        }).catch(function (e) {
            alert("Fallito GetCampaignInfo ");
            alert(e);
        });
    };
    self.campaignStatistics = function(campaign){
        ctx.repositories.userhome.getCampaignInfo(
            campaign.id,
            ctx.repositories.status.getAuthApiToken()
        ).then(function (result) {
            //alert("Successo GetCampaignInfo");
            ctx.repositories.status.setCurrentCampaign(result);

            ctx.repositories.endedcampaignstatistics.getCampaignStatistics(
                ctx.repositories.status.getAuthApiToken(),
                ctx.repositories.status.getCurrentCampaign().statistics
            ).then(function (result) {
                //alert("Success");
                ctx.repositories.status.setCurrentCampaignStatistics(result);

                ctx.repositories.editimages.getCampaignImages(
                    ctx.repositories.status.getAuthApiToken(),
                    ctx.repositories.status.getCurrentCampaign().image
                ).
                then(function (result) {
                    ctx.repositories.status.setCurrentCampaignStatisticsImages(result.images);
                    location.hash = "/CampaignStatistics";
                }).catch(function (e) {
                    alert("Error loaded");
                    alert(e);
                });

            }).catch(function (e) {
                //alert("Error");
                self.shouldShowMessage(true);
                var temp = '';
                for (var x in e.errors) {
                    temp += x + ": " + e.errors[x];
                }
                self.errorMessage(" " + temp);
            });

        }).catch(function (e) {
            alert("Fallito GetCampaignInfo ");
            alert(e);
        });
    };


    //$("#editButton").addEventListener("click",
    self.setEditUserForm = function(){

        if(self.visible) {
            //self.shouldShowSuccessMessage(false);
            //self.shouldShowErrorMessage(false);
            self.newpassword('');
            self.newfullname('');

            self.visible = !self.visible;
            self.editUserString("Edit User Info");
        }else{
            self.visible = !self.visible;
            self.editUserString("Close Edit Box");
        }
    }//);
    self.startCampaign = function(campaign){

        ctx.repositories.userhome.getCampaignInfo(
            campaign.id,
            ctx.repositories.status.getAuthApiToken()
        ).then(function (result) {
           // alert("Successo GetCampaignInfoForStart");
           // alert("execution should be "+result.execution);
            ctx.repositories.userhome.startCampaign(
                result.execution,
                ctx.repositories.status.getAuthApiToken())
                .then(function (result1) {
                   // alert("Successo startCampaign");
                    self.readyCampaigns.remove(function(campaignTemp){
                        if(campaignTemp == campaign)
                        {
                            if(self.startedCampaigns().length ==0)
                                self.startedCampaignsAvailable(true);

                            self.startedCampaigns.push(campaign);

                            if(self.readyCampaigns().length ==1)
                                self.readyCampaignsAvailable(false);
                        }
                        return campaignTemp == campaign;});
                    //self.getUserCampaigns();
                }).catch(function (e1) {
                alert("Fallito startCampaign ");
                alert(e1);
            });
        }).catch(function (e) {
            alert("Fallito GetCampaignInfoForStart ");
            alert(e);
        });

    }

    self.terminateCampaign = function(campaign){

        ctx.repositories.userhome.getCampaignInfo(
            campaign.id,
            ctx.repositories.status.getAuthApiToken()
        ).then(function (result) {
         //   alert("Successo GetCampaignInfoForTermination");
         //   alert("execution should be "+result.execution);
            ctx.repositories.userhome.terminateCampaign(
                result.execution,
                ctx.repositories.status.getAuthApiToken())
                .then(function (result1) {
                 //   alert("Successo terminateCampaign");
                    location.hash = "/UserHome";
                    //self.getUserCampaigns();
                    self.startedCampaigns.remove(function(campaignTemp){
                        if(campaignTemp == campaign)
                        {
                            if(self.endedCampaigns().length ==0)
                                self.endedCampaignsAvailable(true);

                            self.endedCampaigns.push(campaign);

                            if(self.startedCampaigns().length ==1)
                                self.startedCampaignsAvailable(false);
                        }
                        return campaignTemp == campaign;});
                }).catch(function (e1) {
                alert("Fallito terminateCampaign ");
                alert(e1);
            });
        }).catch(function (e) {
            alert("Fallito GetCampaignInfoForStart ");
            alert(e);
        });

    }
}


exports.register = function () {
    ko.components.register('user-home', {
        template: require('./template.html'),
        viewModel: ViewModel
    });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./template.html":39}],39:[function(require,module,exports){
module.exports = "<nav-bar params = \"repositories: repositories\"></nav-bar>\r\n<div class=\"container\" style = \"margin: auto\">\r\n    <div class=\"row\" >\r\n        <!--SHARED USER PROFILE MANAGEMENT -->\r\n        <div class = \"col-sm-4\">\r\n            <div class=\"panel panel-primary\">\r\n                <div class=\"panel-heading\">User Profile</div>\r\n                <div class=\"panel-body\">\r\n                    <p>\r\n                        User data:<br/>\r\n                        Fullname: <span data-bind = \"text:fullname\"></span><br/>\r\n                        Username: <span  data-bind = \"text:username\"></span><br/>\r\n                        Role: <span data-bind = \"text:role\"></span>\r\n                    </p>\r\n                    <button type=\"button\" class=\"btn btn-primary\" data-toggle=\"collapse\" data-target=\"#edit\" data-bind = \"click: setEditUserForm\" style = \"margin-bottom: 0.5em;\" ><span data-bind = \"text: editUserString\"></span></button>\r\n\r\n                    <div id=\"edit\" class=\"collapse\">\r\n                        <form class=\"form-horizontal\">\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label col-sm-4\" for=\"fullname\">New Full Name:</label>\r\n                                <div class=\"col-sm-8\">\r\n                                    <input type=\"text\" class=\"form-control\" id=\"fullname\" placeholder=\"New Full Name\" data-bind = \"value: newfullname\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <label class=\"control-label col-sm-4\" for=\"newpwd\">New Password:</label>\r\n                                <div class=\"col-sm-8\">\r\n                                    <input type=\"password\" class=\"form-control\" id=\"newpwd\" placeholder=\"New Password\" data-bind = \"value: newpassword\" minlength = \"8\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <div class=\"col-sm-offset-2 col-sm-10\">\r\n                                    <button type=\"submit\" class=\"btn btn-default\" data-bind = \"click: editUserInfo\">Apply</button>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                    </div>\r\n\r\n                    <div data-bind=\"foreach: alertMessages\">\r\n                    <div class=\"alert alert-danger alert-dismissable fade in\" data-bind = \"visible: shouldShowErrorMessage\">\r\n                        <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>\r\n                        <strong>Warning!</strong><span data-bind = \"text:errorMessage\"></span>\r\n                    </div>\r\n                    <div class=\"alert alert-success alert-dismissable fade in\" data-bind = \"visible: shouldShowSuccessMessage\">\r\n                        <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>\r\n                        <strong>Success!</strong><!--<span data-bind = \"text:successMessage\"></span>-->\r\n                    </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class = \"col-sm-1\"></div>\r\n        <!--MASTER-->\r\n        <div class = \"col-sm-6\" data-bind = \"if:isUserMaster\">\r\n            <div class=\"panel panel-default\">\r\n                <div class=\"panel-heading\">\r\n                    Ready Campaigns\r\n                    <button type=\"button\" class=\"btn btn-primary pull-right\" data-bind = \"click: addCampaign\" style = \"margin-bottom:0.5em;\"><span class = \"glyphicon glyphicon-plus\"></span>Add Campaign</button>\r\n                </div>\r\n                <div class=\"panel-body\">\r\n                    <p data-bind = \"ifnot:readyCampaignsAvailable\"> No Ready Campaigns available, add one.</p>\r\n                    <table calss = \"table-hover\" data-bind = \"if:readyCampaignsAvailable\">\r\n                        <thead>\r\n                        <tr><th>Campaign Name</th><th>Actions</th></tr>\r\n                        </thead>\r\n                        <tbody data-bind=\"foreach: readyCampaigns\">\r\n                        <tr>\r\n                            <td><span data-bind = \"text: name\"></span></td>\r\n                            <td><button class=\"btn btn-default\" data-bind = \"click: $parent.editCampaign\">Edit Infos</button></td>\r\n                            <td><button class=\"btn btn-default\" data-bind = \"click: $parent.editImages\">Edit Images</button></td>\r\n                            <td><button class=\"btn btn-default\" data-bind = \"click: $parent.editWorkers\">Edit Workers</button></td>\r\n                            <td><button class=\"btn btn-default\" data-bind =\"click: $parent.startCampaign\">Start!</button></td>\r\n                        </tr>\r\n                        </tbody>\r\n                    </table>\r\n                </div>\r\n            </div>\r\n            <div class=\"panel-group\">\r\n                <div class=\"panel panel-default\">\r\n                    <div class=\"panel-heading\">\r\n                        Started Campaigns\r\n                    </div>\r\n                    <div class=\"panel-body\">\r\n                        <p data-bind = \"ifnot:startedCampaignsAvailable\"> No Started Campaigns available, add one.</p>\r\n                        <table class = \"table-hover\" data-bind = \"if:startedCampaignsAvailable\">\r\n                            <thead>\r\n                            <tr><th>Campaign Name</th><th>Actions</th></tr>\r\n                            </thead>\r\n                            <tbody data-bind=\"foreach: startedCampaigns\">\r\n                            <tr>\r\n                                <td><span data-bind = \"text: name\"></span></td>\r\n                                <td> <button class=\"btn btn-default\" data-bind = \"click: $parent.getCampaignInformation\">Infos</button></td>\r\n                                <td><button  class=\"btn btn-default\" data-bind = \"click:$parent.terminateCampaign\">Terminate</button></td>\r\n                            </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                </div>\r\n                <div class=\"panel panel-default\">\r\n                    <div class=\"panel-heading\">\r\n                        Ended Campaigns\r\n                    </div>\r\n                    <div class=\"panel-body\">\r\n                        <p data-bind = \"ifnot:endedCampaignsAvailable\"> No Ended Campaigns available, add one.</p>\r\n                        <table class = \"table-hover\" data-bind = \"if:endedCampaignsAvailable\">\r\n                            <thead>\r\n                            <tr><th>Campaign Name</th><th>Actions</th></tr>\r\n                            </thead>\r\n                            <tbody data-bind=\"foreach: endedCampaigns\">\r\n                            <tr>\r\n                                <td><span data-bind = \"text: name\"></span></td>\r\n\r\n                                <td><button class=\"btn btn-default\" data-bind = \"click: $parent.campaignStatistics\">Statistics</button></td>\r\n                            </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                </div>\r\n        </div>\r\n        <div class = \"col-sm-1\"></div>\r\n    </div>\r\n        <!--WORKER-->\r\n        <div class = \"col-sm-6\" data-bind = \"ifnot:isUserMaster\">\r\n            <div class=\"panel-group\">\r\n                <div class=\"panel panel-default\">\r\n                    <div class=\"panel-heading\">\r\n                        User Tasks\r\n                    </div>\r\n                    <div class=\"panel-body\">\r\n                        <p data-bind = \"ifnot:tasksAvailable\"> No Tasks available for the user.</p>\r\n                        <table class = \"table-hover\" data-bind = \"if:tasksAvailable\">\r\n                            <thead>\r\n                            <tr><th>Campaign</th><th>Task Type</th><th>Actions</th></tr>\r\n                            </thead>\r\n                            <tbody data-bind=\"foreach: tasks\">\r\n                            <tr>\r\n                                <td><span data-bind = \"text: campaignName\"></span></td>\r\n                                <td><span data-bind = \"text: type\"></span></td>\r\n                                <td><button class=\"btn btn-default\" data-bind = \"click:$parent.workTask\">Start Working</button></td>\r\n                                <td><button  class=\"btn btn-default\" data-bind = \"click:$parent.getTaskStatistics\">Statistics</button></td>\r\n                            </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

},{}],40:[function(require,module,exports){
(function (global){
/*jslint node:true */
"use strict";

var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null),
    $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
    components = require('./components'),
    createRepositories = require('./repositories').createRepositories;

components.register();
var repositories = createRepositories('http://localhost:8080');

function App() {
    this.routes = {
        '/': 'home-page',
        '/SignUp':'sign-up',
        '/LogIn':'log-in',
        '/SignUpOutcomeP': 'sign-up-outcome-p',
        '/UserHome':'user-home',
        '/Logout':'log-out',
        '/AddCampaign':'create-campaign',
        '/EditImagesCampaign':'edit-images-campaign',
        '/EditWorkersCampaign':'edit-workers-campaign',
        '/OperationSuccess':'operation-success',
        '/CampaignStatistics':'ended-campaign-statistics',
        '/TaskStatistics':'task-statistics',
        '/WorkingSessionTask':'task-working-session',
        '/ImageStatistics':'image-statistics',
        '/EditCampaign':'edit-campaign-info',
        '/CampaignInfo':'campaign-info'
    };
    this.repositories = repositories;
    $("#su").on("click",function(){$("#home").css("display","none");});
    $("#li").on("click",function(){$("#home").css("display","none");});
    $("#suN").on("click",function(){$("#home").css("display","none");});
    $("#liN").on("click",function(){$("#home").css("display","none");});
   /* this.firstPage = true;
    this.notFirstPage = function(data){
        this.firstPage = false;
        if(data == "SU"){
            location.hash = "/SignUp";
        }else if(data == "LI"){
            location.hash = "/LogIn";
        }
    };
    /*this.statusLogged = ko.observable(false);

    this.updateStatusLogged = function(){
        alert("STO PER AGGIORNARE LO STATO");
        this.statusLogged(repositories.status.getApiToken());
    };*/
}

ko.applyBindings(new App());

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./components":17,"./repositories":46}],41:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 03/06/2017.
 */
"use strict";

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
    Promise = require('bluebird');

function Repository(server) {
    if (!(this instanceof Repository)) {
        return new Repository(server);
    }
    this._server = server || '';
}

Repository.prototype.createCampaign = function (apiToken,campaignName,selectionReplica,threshold,annotationReplica,annotationSize) {
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + '/api/campaign',
            type: 'POST',
            headers:{
                'Authorization': apiToken,
                'Content-Type':'application/json'
            },
            data: JSON.stringify({
                name:campaignName,
                selection_replica: parseInt(selectionReplica),
                threshold: parseInt(threshold),
                annotation_replica:parseInt(annotationReplica),
                annotation_size: parseInt(annotationSize)
            })
        }).done(function (result) {
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            //alert("Ho fallito");
            /*for(var x in jqXHR){
                alert(x + " " + jqXHR[x]);
            }*/
            alert(jqXHR.responseJSON.error);
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            alert(jqXHR.responseText);
            var temp = JSON.parse(jqXHR.responseText);
            for(var x in temp){
                alert(x +" "+ temp[x]);
            }
            error.errors = JSON.parse(jqXHR.responseText);
            reject(error);
        });
    });
};

exports.Repository = Repository;
exports.createRepository = Repository;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"bluebird":55}],42:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 25/06/2017.
 */
"use strict";

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
    Promise = require('bluebird');

function Repository(server) {
    if (!(this instanceof Repository)) {
        return new Repository(server);
    }
    this._server = server || '';
}

Repository.prototype.editCampaign = function (apiToken,id,campaignName,selectionReplica,threshold,annotationReplica,annotationSize) {
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + id,
            type: 'PUT',
            headers:{
                'Authorization': apiToken,
                'Content-Type':'application/json'
            },
            data: JSON.stringify({
                name:campaignName,
                selection_replica: parseInt(selectionReplica),
                threshold: parseInt(threshold),
                annotation_replica:parseInt(annotationReplica),
                annotation_size: parseInt(annotationSize)
            })
        }).done(function (result) {
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            //alert("Ho fallito");
            /*for(var x in jqXHR){
             alert(x + " " + jqXHR[x]);
             }*/
            //alert(jqXHR.responseJSON.error);
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            //alert(jqXHR.responseText);
            var temp = JSON.parse(jqXHR.responseText);
            /*for(var x in temp){
                alert(x +" "+ temp[x]);
            }*/
            error.errors = JSON.parse(jqXHR.responseText);
            reject(error);
        });
    });
};

exports.Repository = Repository;
exports.createRepository = Repository;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"bluebird":55}],43:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 04/06/2017.
 */

"use strict";

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
    Promise = require('bluebird');

function Repository(server) {
    if (!(this instanceof Repository)) {
        return new Repository(server);
    }
    this._server = server || '';
}

Repository.prototype.uploadCampaignPhotos = function (apiToken,file, imageUrl) { //forse dovresti crare upload file con un parametro URL che usi per riciclare lo stesso metodo per diverse ufnzionalità
    var self = this;
    //return ctx.repositories.uploadfile(apiToken, files, imageUrl ); @TODO vedi se è più elegante fare uploadfile o come hai deciso di fare ora (in tal caso passa ctx in uploadCampaignPhotos se lo usi)
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: self._server + imageUrl,
            headers:{
                'Authorization': apiToken//,
                //'Content-Type': 'multipart/form-data;'// boundary=----------287032381131322'
            },
            data: file,
            cache: false,
            processData: false,
            contentType: false,
            success: function(data){
                alert("Caricamento avvenuto con successo!");
            }
        }).done(function (result) {
            for(var x in result){
                alert(x + " " + result[x]);
            }
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseJSON.error);
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = jqXHR.responseJSON.error;
            reject(error);
        });
    });
};

Repository.prototype.getCampaignImages = function (apiToken, imageUrl){
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + imageUrl,
            type: 'GET',
            dataType:"json",
            headers:{
                'Authorization': apiToken,
            },
        }).done(function (result) {
            /*for(var x in Object.keys(result)){
                alert(Object.keys(result)[x]);
            }

            for(var x in result){
                alert(result[x]);
            }*/
            for(var x in result.images){
                result.images[x].canonical = self._server+result.images[x].canonical;
            }
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            //alert("Ho fallito");
            /*for(var x in jqXHR){
             alert(x + " " + jqXHR[x]);
             }*/
            alert(jqXHR.responseJSON.error);
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            alert(jqXHR.responseText);
            var temp = JSON.parse(jqXHR.responseText);
            for(var x in temp){
                alert(x +" "+ temp[x]);
            }
            error.errors = jqXHR.responseJSON;
            reject(error);
        });
    });

};

Repository.prototype.getImageInfo = function(apiToken,imageUrl){
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + imageUrl,
            type: 'GET',
            dataType:"json",
            headers:{
                'Authorization': apiToken,
            },
        }).done(function (result) {
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            //alert("Ho fallito");
            /*for(var x in jqXHR){
             alert(x + " " + jqXHR[x]);
             }*/
            alert(jqXHR.responseJSON.error);
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            alert(jqXHR.responseText);
            var temp = JSON.parse(jqXHR.responseText);
            for(var x in temp){
                alert(x +" "+ temp[x]);
            }
            error.errors = jqXHR.responseJSON;
            reject(error);
        });
    });

};

Repository.prototype.getImageStatistics = function(apiToken,imageUrl){
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + imageUrl,
            type: 'GET',
            dataType:"json",
            headers:{
                'Authorization': apiToken,
            },
        }).done(function (result) {
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            //alert("Ho fallito");
            /*for(var x in jqXHR){
             alert(x + " " + jqXHR[x]);
             }*/
            alert(jqXHR.responseJSON.error);
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            alert(jqXHR.responseText);
            var temp = JSON.parse(jqXHR.responseText);
            for(var x in temp){
                alert(x +" "+ temp[x]);
            }
            error.errors = jqXHR.responseJSON;
            reject(error);
        });
    });

};

Repository.prototype.removeImage = function(apiToken,imageUrl){
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + imageUrl,
            type: 'DELETE',
            headers:{
                'Authorization': apiToken
            }
        }).done(function (result) {
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {

            alert(jqXHR.responseJSON.error);
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            alert(jqXHR.responseText);
            var temp = JSON.parse(jqXHR.responseText);
            for(var x in temp){
                alert(x +" "+ temp[x]);
            }
            error.errors = jqXHR.responseJSON;
            reject(error);
        });
    });

};
exports.Repository = Repository;
exports.createRepository = Repository;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"bluebird":55}],44:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 11/06/2017.
 */
"use strict";

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
    Promise = require('bluebird');

function Repository(server) {
    if (!(this instanceof Repository)) {
        return new Repository(server);
    }
    this._server = server || '';
}

Repository.prototype.getWorkers = function (apiToken, workerUrl) {
    var self = this;
    //alert("Promise");
    return new Promise(function (resolve, reject) {
        //alert(self._server + workerUrl);
        //alert(apiToken);
        $.ajax({
            url: self._server + workerUrl,
            type: 'GET',
            dataType: "json",
            headers: {
                'Authorization': apiToken,
            }
        }).done(function (result) {
            /*for(var x in Object.keys(result)){
             alert(Object.keys(result)[x]);
             }

             for(var x in result){
             alert(result[x]);
             }*/
            //alert("successoAjaxWorkers");
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("Ho fallito");
            for (var x in jqXHR) {
                alert(x + " " + jqXHR[x]);
            }
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = jqXHR.responseJSON;
            reject(error);
        });
    });
};

Repository.prototype.getWorkerInfo = function (apiToken, workerUrl) {
        var self = this;
       // alert("Promise");
        return new Promise(function (resolve, reject) {
            //alert(self._server + workerUrl);
            //alert(apiToken);
            $.ajax({
                url: self._server + workerUrl,
                type: 'GET',
                dataType: "json",
                headers: {
                    'Authorization': apiToken,
                }
            }).done(function (result) {
               /* for(var x in Object.keys(result)){
                 alert(Object.keys(result)[x]);
                 }

                 for(var x in result){
                 alert(result[x]);
                 }
                alert("successoAjaxWorkerInfo");*/
                resolve(result);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                alert("fallitoAjaxWorkerInfo");
                /*for (var x in jqXHR) {
                    alert(x + " " + jqXHR[x]);
                }*/
                var error = new Error(errorThrown);
                error.textStatus = textStatus;
                error.jqXHR = jqXHR;
                error.errors = jqXHR.responseJSON;
                reject(error);
            });
        });
};

Repository.prototype.setSelector = function (apiToken, isSelector, workerUrl) {
    var self = this;
   // alert("Promise");
    return new Promise(function (resolve, reject) {
        /*alert(self._server + workerUrl);
        alert(apiToken);*/
        $.ajax({
            url: self._server + workerUrl,
            type: isSelector?'POST':'DELETE',
            headers: {
                'Authorization': apiToken,
            }
        }).done(function (result) {
            //alert("successoAjaxSelector");
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("fallitoAjaxSelector");
            /*for (var x in jqXHR) {
                alert(x + " " + jqXHR[x]);
            }*/
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = jqXHR.responseJSON;
            reject(error);
        });
    });
};

Repository.prototype.setAnnotator = function (apiToken, isAnnotator, workerUrl) {
    var self = this;
    //alert("Promise");
    return new Promise(function (resolve, reject) {
      //  alert(self._server + workerUrl);
       // alert(apiToken);
        $.ajax({
            url: self._server + workerUrl,
            type: isAnnotator?'POST':'DELETE',
            headers: {
                'Authorization': apiToken,
            }
        }).done(function (result) {
            //alert("successoAjaxAnnotator");
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("FallitoAjaxAnnotator");
            /*for (var x in jqXHR) {
                alert(x + " " + jqXHR[x]);
            }*/
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = jqXHR.responseJSON;
            reject(error);
        });
    });
};
exports.Repository = Repository;
exports.createRepository = Repository;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"bluebird":55}],45:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 10/06/2017.
 */
"use strict";

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
    Promise = require('bluebird');

function Repository(server) {
    if (!(this instanceof Repository)) {
        return new Repository(server);
    }
    this._server = server || '';
}

Repository.prototype.getCampaignStatistics = function (apiToken,statisticsUrl) {
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + statisticsUrl,
            type: 'GET',
            dataType:"json",
            headers:{
                'Authorization': apiToken,
            }
        }).done(function (result) {
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            //alert("Ho fallito");
            /*for(var x in jqXHR){
             alert(x + " " + jqXHR[x]);
             }*/
            alert(jqXHR.responseJSON.error);
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            alert(jqXHR.responseText);
            var temp = JSON.parse(jqXHR.responseText);
            for(var x in temp){
                alert(x +" "+ temp[x]);
            }
            error.errors = jqXHR.responseJSON;
            reject(error);
        });
    });
};

Repository.prototype.getImageInfo = function (apiToken,imageId) {
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + imageId,
            type: 'GET',
            dataType:"json",
            headers:{
                'Authorization': apiToken,
            }
        }).done(function (result) {
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseJSON.error);
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = jqXHR.responseJSON;
            reject(error);
        });
    });
};

Repository.prototype.getImageStatistics = function (apiToken,imageStatisticsUrl) {
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + imageStatisticsUrl,
            type: 'GET',
            dataType:"json",
            headers:{
                'Authorization': apiToken
            }
        }).done(function (result) {
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseJSON.error);
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = jqXHR.responseJSON;
            reject(error);
        });
    });
};

exports.Repository = Repository;
exports.createRepository = Repository;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"bluebird":55}],46:[function(require,module,exports){
/*jslint node:true */
"use strict";

exports.createRepositories = function (options) {
    return {
        signup: require('./signup').createRepository(options),
        login: require('./login').createRepository(options),
        userhome: require('./userhome').createRepository(options),
        logout : require('./logout').createRepository(options),
        status: require('./status').createRepository(options),
        createcampaign : require("./createcampaign").createRepository(options),
        editimages: require("./editimages").createRepository(options),
        uploadfile: require("./uploadfile").createRepository(options),
        endedcampaignstatistics: require("./endedcampaignstatistics").createRepository(options),
        editworkers: require("./editworkers").createRepository(options),
        taskstatistics:require("./taskstatistics").createRepository(options),
        taskworkingsession:require("./taskworkingsession").createRepository(options),
        editcampaign: require("./editcampaign").createRepository(options)
    };
};

},{"./createcampaign":41,"./editcampaign":42,"./editimages":43,"./editworkers":44,"./endedcampaignstatistics":45,"./login":47,"./logout":48,"./signup":49,"./status":50,"./taskstatistics":51,"./taskworkingsession":52,"./uploadfile":53,"./userhome":54}],47:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 23/05/2017.
 */
"use strict";

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
    Promise = require('bluebird');

function Repository(server) {
    if (!(this instanceof Repository)) {
        return new Repository(server);
    }
    this._server = server || '';
}

Repository.prototype.login = function (username,pwd) {
    var self = this;
    //per i test dada, dada, legiliments  (role master) -> registrato con successo
    //anche dada1,dada1,legiliments (role worker) -> registrato con successo
    //alert("Sto per fare il Promise con dati" + username + pwd);
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + '/api/auth',
            type: 'POST',
            headers:{
             
                'Content-Type':'application/json'
            },
            data: JSON.stringify({
                username: username,
                password: pwd
            })
        }).done(function (result) {
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            //alert("Ho fallito");
            //alert(jqXHR.responseJSON.error);
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = JSON.parse(jqXHR.responseText);
            reject(error);
        });
    });
};

exports.Repository = Repository;
exports.createRepository = Repository;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"bluebird":55}],48:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 24/05/2017.
 */
"use strict";

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
    Promise = require('bluebird');

function Repository(server) {
    if (!(this instanceof Repository)) {
        return new Repository(server);
    }
    this._server = server || '';
}

Repository.prototype.logout = function (apitoken) {
    var self = this;
    var auth = 'APIToken '+apitoken;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + '/api/auth',
            type: 'DELETE',
            headers:{
                'Authorization': auth
            }
        }).done(function (result) {
            resolve(result.result);
        }).fail(function (jqXHR, textStatus, errorThrown) {

            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = jqXHR.responseJSON.errors;
            reject(error);
        });
    });
};

exports.Repository = Repository;
exports.createRepository = Repository;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"bluebird":55}],49:[function(require,module,exports){
(function (global){
/*jslint node:true, nomen: true */
"use strict";

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
    Promise = require('bluebird');

function Repository(server) {
    if (!(this instanceof Repository)) {
        return new Repository(server);
    }
    this._server = server || '';
}

Repository.prototype.validateAndSend = function (fullname,username,pwd1,role) {
    var self = this;
    //per i test dada, dada, legiliments -> registrato con successo
    //anche dada1,dada1,legiliments
    //alert("Sto per fare il Promise con dati" + fullname + username + pwd1 + role);
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: self._server + '/api/user',
                type: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                data: JSON.stringify({
                    fullname: fullname,
                    username: username,
                    password: pwd1,
                    type: role
                })
            }).done(function (result) {
                //alert("Ho inviato il messaggio");
                resolve(result.result);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                //alert("Ho fallito");
                /*alert(textStatus);
                for (var x in jqXHR)
                {
                    alert(jqXHR[x]);
                }*/
                //404, Not Found -> credo il problema sia che non acchiappi il sito
                //RISOLTO inserendo come parametro server http://awt ecc.
                //401 Unauthorized
                var error = new Error(errorThrown);
                error.textStatus = textStatus;
                error.jqXHR = jqXHR;
                error.errors = JSON.parse(jqXHR.responseText);
                //error.errors = jqXHR.responseJSON.errors;
                /*for (var x in jqXHR)
                {
                    alert("Posizione " + x + " .... " + jqXHR[x]);
                }*/
                reject(error);
            });
        });
};

exports.Repository = Repository;
exports.createRepository = Repository;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"bluebird":55}],50:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 25/05/2017.
 */
"use strict";

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
    Promise = require('bluebird');

function Repository(server) {
    if (!(this instanceof Repository)) {
        return new Repository();
    }
    this._server = server || '';
}

Repository.prototype.setApiToken = function (apiToken) {
    var self = this;
    //per i test dada, dada, legiliments  (role master) -> registrato con successo
    //anche dada1,dada1,legiliments (role worker) -> registrato con successo
    self.apiToken = apiToken;
    self.authApiToken = 'APIToken '+apiToken;
};

Repository.prototype.deleteApiToken = function () {
    var self = this;
    //per i test dada, dada, legiliments  (role master) -> registrato con successo
    //anche dada1,dada1,legiliments (role worker) -> registrato con successo
    self.apiToken = undefined;
    self.authApiToken = undefined;
};
Repository.prototype.getApiToken = function () {
    var self = this;
    return self.apiToken;
};

Repository.prototype.getAuthApiToken = function () {
    var self = this;
    return self.authApiToken;
};

Repository.prototype.setSuccessNext = function (next){
    var self = this;
    self.next = next;
};

Repository.prototype.getSuccessNext = function (){
    var self = this;
    return self.next;
};

Repository.prototype.deleteSuccessNext = function(){
    var self = this;
    delete self.next;
};

Repository.prototype.setCurrentCampaign = function(campaign){
    var self = this;
    self.campaign = campaign;
};

Repository.prototype.getCurrentCampaign = function(){
    var self = this;
    return self.campaign;
};

Repository.prototype.deleteCurrentCampaign = function(){
    var self = this;
    delete self.campaign;
};

Repository.prototype.setCurrentImage = function(image){
    var self = this;
    self.image = image;
};

Repository.prototype.getCurrentImage = function(){
    var self = this;
    return self.image;
};
Repository.prototype.deleteCurrentImage = function(){
    var self = this;
    delete self.image;
};

Repository.prototype.setCurrentTask = function(task){
    var self = this;
    self.task = task;
};

Repository.prototype.getCurrentTask = function(){
    var self = this;
    return self.task;
};
Repository.prototype.deleteCurrentTask = function(){
    var self = this;
    self.task = undefined;
};

Repository.prototype.setCurrentImageStatistics = function(imageStatistics){
    var self = this;
    self.imageStatistics = imageStatistics;
};

Repository.prototype.getCurrentImageStatistics = function(){
    var self = this;
    return self.imageStatistics;
};

Repository.prototype.getUserInfo = function () {
    var self = this;
    return self.userInfo;
};
Repository.prototype.deleteUserInfo = function () {
    var self = this;
    self.userInfo = undefined;
};
Repository.prototype.setUserInfo = function (userInfo) {
    var self = this;
    self.userInfo = userInfo;
};

Repository.prototype.getTasksInfo = function () {
    var self = this;
    return self.tasksInfo;
};
Repository.prototype.deleteTasksInfo = function () {
    var self = this;
    self.tasksInfo = undefined;
};
Repository.prototype.setTasksInfo = function (tasksInfo) {
    var self = this;
    self.tasksInfo = tasksInfo;
};

Repository.prototype.getUserCampaigns = function () {
    var self = this;
    return self.userCampaigns;
};
Repository.prototype.deleteUserCampaigns = function () {
    var self = this;
    self.userCampaigns = undefined;
};
Repository.prototype.setUserCampaigns = function (userCampaigns) {
    var self = this;
    self.userCampaigns = userCampaigns;
};

Repository.prototype.getCurrentCampaignStatistics = function () {
    var self = this;
    return self.currentCampaignStatistics;
};
Repository.prototype.deleteCurrentCampaignStatistics = function () {
    var self = this;
    self.currentCampaignStatistics = undefined;
};
Repository.prototype.setCurrentCampaignStatistics = function (currentCampaignStatistics) {
    var self = this;
    self.currentCampaignStatistics = currentCampaignStatistics;
};

Repository.prototype.setCurrentCampaignStatisticsImages = function(imgs){
    var self = this;
    self.currentCampaignStatisticsImages = imgs;
}

Repository.prototype.getCurrentCampaignStatisticsImages = function () {
    var self = this;
    return self.currentCampaignStatisticsImages;
};


Repository.prototype.setCurrentCampaignImages = function(imgs){
    var self = this;
    self.currentCampaignImages = imgs;
};

Repository.prototype.getCurrentCampaignImages = function(){
    var self = this;
    return self.currentCampaignImages;
};

Repository.prototype.deleteCurrentCampaignImages = function(){
    var self = this;
    self.currentCampaignImages = undefined;
};

Repository.prototype.setOldImagesUrl = function(old){
    var self = this;
    self.oldImagesUrl;
};
Repository.prototype.getOldImagesUrl = function(){
    var self = this;
    return self.oldImagesUrl;
};
Repository.prototype.deleteOldImagesUrl = function(){
    var self = this;
    self.oldImagesUrl = undefined;
};


Repository.prototype.clearCache = function(){
    var self = this;
    self.deleteCurrentImage();
    self.deleteCurrentCampaignStatistics();
    self.deleteCurrentCampaign();
    self.deleteApiToken();
    self.deleteCurrentTask();
    self.deleteUserInfo();
    self.deleteTasksInfo();
    self.deleteUserCampaigns();
    self.deleteCurrentCampaignImages();
    self.deleteOldImagesUrl();
};

exports.Repository = Repository;
exports.createRepository = Repository;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"bluebird":55}],51:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 12/06/2017.
 */
"use strict";

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
    Promise = require('bluebird');

function Repository(server) {
    if (!(this instanceof Repository)) {
        return new Repository(server);
    }
    this._server = server || '';
}

Repository.prototype.getTaskStatistics = function (apiToken,statisticsUrl) {
    var self = this;
    return new Promise(function (resolve, reject) {
        alert(apiToken);
        $.ajax({
            url: self._server + statisticsUrl,
            type: 'GET',
            headers:{
                'Authorization': apiToken
            }
        }).done(function (result) {
            /*for(var x in result){
                alert(x+" "+result[x]);
            }*/
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            for (var x in jqXHR)
            {
                alert(jqXHR[x]);
            }
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = jqXHR.responseJSON;
            reject(error);
        });
    });
};

exports.Repository = Repository;
exports.createRepository = Repository;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"bluebird":55}],52:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 13/06/2017.
 */
"use strict";

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
    Promise = require('bluebird');

function Repository(server) {
    if (!(this instanceof Repository)) {
        return new Repository(server);
    }
    this._server = server || '';
}

Repository.prototype.startWorkingSession = function (apiToken,sessionUrl) {
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + sessionUrl,
            type: 'POST',
            headers:{
                'Authorization': apiToken
            }
        }).done(function (result) {
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = jqXHR.responseJSON;
            reject(error);
        });
    });
};


Repository.prototype.getNextTaskInstance = function (apiToken,sessionUrl) {
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + sessionUrl,
            type: 'GET',
            dataType:"json",
            headers:{
                'Authorization': apiToken
            }
        }).done(function (result) {
            alert(result.image);
            result.image = self._server+result.image;
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            /*for (var x in jqXHR)
            {
                alert(jqXHR[x]);
            }*/
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = jqXHR.responseJSON;
            reject(error);
        });
    });
};

Repository.prototype.submitAnnotation = function(apiToken,sessionUrl,skyline){
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + sessionUrl,// + "/annotation",
            type: 'PUT',
            headers:{
                'Authorization': apiToken,
                'Content-Type':"application/json"
            },
            data: JSON.stringify({skyline:skyline})
        }).done(function (result) {
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            for (var x in jqXHR)
            {
                alert(jqXHR[x]);
            }
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = jqXHR.responseJSON;
            reject(error);
        });
    });
};

Repository.prototype.submitSelection = function(apiToken,sessionUrl,accepted) {
    var self = this;
    return new Promise(function (resolve, reject) {
        //var acc = new String(accepted);
        $.ajax({
            url: self._server + sessionUrl,//+"/selection",
            type: 'PUT',
            headers: {
                'Authorization': apiToken,
                'Content-Type': "application/json"
            },
            data: JSON.stringify({accepted: accepted})
        }).done(function (result) {
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            /*for (var x in jqXHR) {
                alert(jqXHR[x]);
            }*/
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = jqXHR.responseJSON;
            reject(error);
        });
    });
};

exports.Repository = Repository;
exports.createRepository = Repository;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"bluebird":55}],53:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 05/06/2017.
 */
"use strict";

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
    Promise = require('bluebird');

function Repository(server) {
    if (!(this instanceof Repository)) {
        return new Repository(server);
    }
    this._server = server || '';
}

Repository.prototype.uploadImages = function (apitoken, files, imageUrl) {
    var self = this;
    //reference: https://stackoverflow.com/questions/2320069/jquery-ajax-file-upload
    //reference prof.: https://stackoverflow.com/questions/5392344/sending-multipart-formdata-with-jquery-ajax
    //var formData = new FormData();
    // add assoc key values, this will be posts values
    //formData.append("file", file, file.name);
    //formData.append("upload_file", true);

    return new Promise(function (resolve, reject) {
    $.ajax({
        type: "POST",
        url: self._server + imageUrl,
        headers:{
            'Authorization': apitoken,
            'Content-Type':'multipart/form-data'
        },
        data: files,
        cache: false,
        processData: false,
        success: function(files){
            alert("Caricamento avvenuto con successo!");
        }
    }).done(function (result) {
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseJSON.error);
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = JSON.parse(jqXHR.responseText);
            reject(error);
        });
    });
};

//la creazione di una nuova campagna la sposterei in un'altra component/repository

exports.Repository = Repository;
exports.createRepository = Repository;



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"bluebird":55}],54:[function(require,module,exports){
(function (global){
/**
 * Created by Utente on 24/05/2017.
 */
"use strict";

var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
    Promise = require('bluebird');

function Repository(server) {
    if (!(this instanceof Repository)) {
        return new Repository(server);
    }
    this._server = server || '';
}

Repository.prototype.getUserInfo = function (apitoken) {
    var self = this;

    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + '/api/user/me',
            type: 'GET',
            dataType: 'json',
            headers:{
                'Authorization': apitoken
            }
        }).done(function (result) {
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("ERRORE IN GETUSERINFO");
            alert(jqXHR.responseJSON.error);
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = JSON.parse(jqXHR.responseText);
            reject(error);
        });
    });
};

Repository.prototype.getTasksInfo = function (apitoken){
    var self = this;

    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + '/api/task',
            type: 'GET',
            dataType: 'json',
            headers:{
                'Authorization': apitoken
            }
        }).done(function (result) {
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = JSON.parse(jqXHR.responseText);
            alert("errore in Tasks info primo");
            alert(error.errors);
            reject(error);
        });
    });
};

Repository.prototype.getTaskInfo = function (apitoken,taskUrl){
    var self = this;

    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + taskUrl,
            type: 'GET',
            dataType: 'json',
            headers:{
                'Authorization': apitoken
            }
        }).done(function (result) {
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            //for (var x in jqXHR) {
            //    alert("" + x + ":" + jqXHR[x]);
            //}
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = JSON.parse(jqXHR.responseText);
            alert("Errore in taskInfo");
            alert(error.errors);

            reject(error);
        });
    });
};

Repository.prototype.getCampaignInfo = function (id,apitoken){
    var self = this;

    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + id,
            type: 'GET',
            headers:{
                'Authorization': apitoken
            }
        }).done(function (result) {
            //alert("successo getCampaignAjax");
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseJSON.error);
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = JSON.parse(jqXHR.responseText);
            reject(error);
            alert("Fallito getCampaignAjax");
        });
    });
}

Repository.prototype.editUserInfo = function (fullname, password, apitoken) {
    var self = this;

    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + '/api/user/me',
            type: 'PUT',
            //dataType : 'json',
            headers:{
                'Authorization': apitoken,
                'Content-Type':'application/json',
            },
            data: JSON.stringify({
                fullname: fullname,
                password: password,
            })
        }).done(function (result) {
            //alert("SuccessoAjax");
            resolve(result.result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            //alert("FallitoAjax");
            /*for (var x in jqXHR) {
                alert("" + x + ":" + jqXHR[x]);
            }
            /*for(var x in jqXHR.error){
                alert( ""+x+" :"+jqXHR.error[x]);
                tempErrors.push((""+x+" :"+jqXHR.error[x]));
            }*/
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = JSON.parse(jqXHR.responseText);
            reject(error);
        });
    });
};

Repository.prototype.getUserCampaigns = function (apitoken) {
    var self = this;

    return new Promise(function (resolve, reject) {

        $.ajax({
            url: self._server + '/api/campaign',
            type: 'GET',
            dataType : 'json',
            headers:{
                'Authorization': apitoken,
                'Content-Type':'application/json',
            },
        }).done(function (result) {
            //alert("SuccessoAjaxCampaigns");
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("FallitoAjax");
            /*for (var x in jqXHR) {
             alert("" + x + ":" + jqXHR[x]);
             }
             /*for(var x in jqXHR.error){
             alert( ""+x+" :"+jqXHR.error[x]);
             tempErrors.push((""+x+" :"+jqXHR.error[x]));
             }*/
            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = JSON.parse(jqXHR.responseText);
            reject(error);
        });
    });
};

Repository.prototype.startCampaign = function(campaign,apitoken) {
    var self = this;
    return new Promise(function (resolve, reject) {
    $.ajax({
        url: self._server + campaign,
        type: 'POST',
        headers: {
            'Authorization': apitoken
        }
    }).done(function (result) {
       // alert("SuccessoAjaxStartCampaign");
        resolve(result);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("FallitoAjaxStartCampaign");
        alert(textStatus);
        for (var x in jqXHR) {
         alert("" + x + ":" + jqXHR[x]);
         }/*
         for(var x in jqXHR.error){
         alert( ""+x+" :"+jqXHR.error[x]);
         tempErrors.push((""+x+" :"+jqXHR.error[x]));
         }*/

        var error = new Error(errorThrown);
        error.textStatus = textStatus;
        error.jqXHR = jqXHR;
        error.errors = JSON.parse(jqXHR.responseText);
        reject(error);
    });
})};

Repository.prototype.terminateCampaign = function(campaign,apitoken) {
    var self = this;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: self._server + campaign,
            type: 'DELETE',
            headers: {
                'Authorization': apitoken
            }
        }).done(function (result) {
           // alert("SuccessoAjaxTerminateCampaign");
            resolve(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("FallitoAjaxTerminateCampaign");
            alert(textStatus);
            for (var x in jqXHR) {
                alert("" + x + ":" + jqXHR[x]);
            }/*
             for(var x in jqXHR.error){
             alert( ""+x+" :"+jqXHR.error[x]);
             tempErrors.push((""+x+" :"+jqXHR.error[x]));
             }*/

            var error = new Error(errorThrown);
            error.textStatus = textStatus;
            error.jqXHR = jqXHR;
            error.errors = JSON.parse(jqXHR.responseText);
            reject(error);
        });
    })};

//la creazione di una nuova campagna la sposterei in un'altra component/repository

exports.Repository = Repository;
exports.createRepository = Repository;



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"bluebird":55}],55:[function(require,module,exports){
(function (process,global){
/* @preserve
 * The MIT License (MIT)
 * 
 * Copyright (c) 2013-2017 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
/**
 * bluebird build version 3.5.0
 * Features enabled: core, race, call_get, generators, map, nodeify, promisify, props, reduce, settle, some, using, timers, filter, any, each
*/
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Promise=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof _dereq_=="function"&&_dereq_;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof _dereq_=="function"&&_dereq_;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
var SomePromiseArray = Promise._SomePromiseArray;
function any(promises) {
    var ret = new SomePromiseArray(promises);
    var promise = ret.promise();
    ret.setHowMany(1);
    ret.setUnwrap();
    ret.init();
    return promise;
}

Promise.any = function (promises) {
    return any(promises);
};

Promise.prototype.any = function () {
    return any(this);
};

};

},{}],2:[function(_dereq_,module,exports){
"use strict";
var firstLineError;
try {throw new Error(); } catch (e) {firstLineError = e;}
var schedule = _dereq_("./schedule");
var Queue = _dereq_("./queue");
var util = _dereq_("./util");

function Async() {
    this._customScheduler = false;
    this._isTickUsed = false;
    this._lateQueue = new Queue(16);
    this._normalQueue = new Queue(16);
    this._haveDrainedQueues = false;
    this._trampolineEnabled = true;
    var self = this;
    this.drainQueues = function () {
        self._drainQueues();
    };
    this._schedule = schedule;
}

Async.prototype.setScheduler = function(fn) {
    var prev = this._schedule;
    this._schedule = fn;
    this._customScheduler = true;
    return prev;
};

Async.prototype.hasCustomScheduler = function() {
    return this._customScheduler;
};

Async.prototype.enableTrampoline = function() {
    this._trampolineEnabled = true;
};

Async.prototype.disableTrampolineIfNecessary = function() {
    if (util.hasDevTools) {
        this._trampolineEnabled = false;
    }
};

Async.prototype.haveItemsQueued = function () {
    return this._isTickUsed || this._haveDrainedQueues;
};


Async.prototype.fatalError = function(e, isNode) {
    if (isNode) {
        process.stderr.write("Fatal " + (e instanceof Error ? e.stack : e) +
            "\n");
        process.exit(2);
    } else {
        this.throwLater(e);
    }
};

Async.prototype.throwLater = function(fn, arg) {
    if (arguments.length === 1) {
        arg = fn;
        fn = function () { throw arg; };
    }
    if (typeof setTimeout !== "undefined") {
        setTimeout(function() {
            fn(arg);
        }, 0);
    } else try {
        this._schedule(function() {
            fn(arg);
        });
    } catch (e) {
        throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
};

function AsyncInvokeLater(fn, receiver, arg) {
    this._lateQueue.push(fn, receiver, arg);
    this._queueTick();
}

function AsyncInvoke(fn, receiver, arg) {
    this._normalQueue.push(fn, receiver, arg);
    this._queueTick();
}

function AsyncSettlePromises(promise) {
    this._normalQueue._pushOne(promise);
    this._queueTick();
}

if (!util.hasDevTools) {
    Async.prototype.invokeLater = AsyncInvokeLater;
    Async.prototype.invoke = AsyncInvoke;
    Async.prototype.settlePromises = AsyncSettlePromises;
} else {
    Async.prototype.invokeLater = function (fn, receiver, arg) {
        if (this._trampolineEnabled) {
            AsyncInvokeLater.call(this, fn, receiver, arg);
        } else {
            this._schedule(function() {
                setTimeout(function() {
                    fn.call(receiver, arg);
                }, 100);
            });
        }
    };

    Async.prototype.invoke = function (fn, receiver, arg) {
        if (this._trampolineEnabled) {
            AsyncInvoke.call(this, fn, receiver, arg);
        } else {
            this._schedule(function() {
                fn.call(receiver, arg);
            });
        }
    };

    Async.prototype.settlePromises = function(promise) {
        if (this._trampolineEnabled) {
            AsyncSettlePromises.call(this, promise);
        } else {
            this._schedule(function() {
                promise._settlePromises();
            });
        }
    };
}

Async.prototype._drainQueue = function(queue) {
    while (queue.length() > 0) {
        var fn = queue.shift();
        if (typeof fn !== "function") {
            fn._settlePromises();
            continue;
        }
        var receiver = queue.shift();
        var arg = queue.shift();
        fn.call(receiver, arg);
    }
};

Async.prototype._drainQueues = function () {
    this._drainQueue(this._normalQueue);
    this._reset();
    this._haveDrainedQueues = true;
    this._drainQueue(this._lateQueue);
};

Async.prototype._queueTick = function () {
    if (!this._isTickUsed) {
        this._isTickUsed = true;
        this._schedule(this.drainQueues);
    }
};

Async.prototype._reset = function () {
    this._isTickUsed = false;
};

module.exports = Async;
module.exports.firstLineError = firstLineError;

},{"./queue":26,"./schedule":29,"./util":36}],3:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL, tryConvertToPromise, debug) {
var calledBind = false;
var rejectThis = function(_, e) {
    this._reject(e);
};

var targetRejected = function(e, context) {
    context.promiseRejectionQueued = true;
    context.bindingPromise._then(rejectThis, rejectThis, null, this, e);
};

var bindingResolved = function(thisArg, context) {
    if (((this._bitField & 50397184) === 0)) {
        this._resolveCallback(context.target);
    }
};

var bindingRejected = function(e, context) {
    if (!context.promiseRejectionQueued) this._reject(e);
};

Promise.prototype.bind = function (thisArg) {
    if (!calledBind) {
        calledBind = true;
        Promise.prototype._propagateFrom = debug.propagateFromFunction();
        Promise.prototype._boundValue = debug.boundValueFunction();
    }
    var maybePromise = tryConvertToPromise(thisArg);
    var ret = new Promise(INTERNAL);
    ret._propagateFrom(this, 1);
    var target = this._target();
    ret._setBoundTo(maybePromise);
    if (maybePromise instanceof Promise) {
        var context = {
            promiseRejectionQueued: false,
            promise: ret,
            target: target,
            bindingPromise: maybePromise
        };
        target._then(INTERNAL, targetRejected, undefined, ret, context);
        maybePromise._then(
            bindingResolved, bindingRejected, undefined, ret, context);
        ret._setOnCancel(maybePromise);
    } else {
        ret._resolveCallback(target);
    }
    return ret;
};

Promise.prototype._setBoundTo = function (obj) {
    if (obj !== undefined) {
        this._bitField = this._bitField | 2097152;
        this._boundTo = obj;
    } else {
        this._bitField = this._bitField & (~2097152);
    }
};

Promise.prototype._isBound = function () {
    return (this._bitField & 2097152) === 2097152;
};

Promise.bind = function (thisArg, value) {
    return Promise.resolve(value).bind(thisArg);
};
};

},{}],4:[function(_dereq_,module,exports){
"use strict";
var old;
if (typeof Promise !== "undefined") old = Promise;
function noConflict() {
    try { if (Promise === bluebird) Promise = old; }
    catch (e) {}
    return bluebird;
}
var bluebird = _dereq_("./promise")();
bluebird.noConflict = noConflict;
module.exports = bluebird;

},{"./promise":22}],5:[function(_dereq_,module,exports){
"use strict";
var cr = Object.create;
if (cr) {
    var callerCache = cr(null);
    var getterCache = cr(null);
    callerCache[" size"] = getterCache[" size"] = 0;
}

module.exports = function(Promise) {
var util = _dereq_("./util");
var canEvaluate = util.canEvaluate;
var isIdentifier = util.isIdentifier;

var getMethodCaller;
var getGetter;
if (!true) {
var makeMethodCaller = function (methodName) {
    return new Function("ensureMethod", "                                    \n\
        return function(obj) {                                               \n\
            'use strict'                                                     \n\
            var len = this.length;                                           \n\
            ensureMethod(obj, 'methodName');                                 \n\
            switch(len) {                                                    \n\
                case 1: return obj.methodName(this[0]);                      \n\
                case 2: return obj.methodName(this[0], this[1]);             \n\
                case 3: return obj.methodName(this[0], this[1], this[2]);    \n\
                case 0: return obj.methodName();                             \n\
                default:                                                     \n\
                    return obj.methodName.apply(obj, this);                  \n\
            }                                                                \n\
        };                                                                   \n\
        ".replace(/methodName/g, methodName))(ensureMethod);
};

var makeGetter = function (propertyName) {
    return new Function("obj", "                                             \n\
        'use strict';                                                        \n\
        return obj.propertyName;                                             \n\
        ".replace("propertyName", propertyName));
};

var getCompiled = function(name, compiler, cache) {
    var ret = cache[name];
    if (typeof ret !== "function") {
        if (!isIdentifier(name)) {
            return null;
        }
        ret = compiler(name);
        cache[name] = ret;
        cache[" size"]++;
        if (cache[" size"] > 512) {
            var keys = Object.keys(cache);
            for (var i = 0; i < 256; ++i) delete cache[keys[i]];
            cache[" size"] = keys.length - 256;
        }
    }
    return ret;
};

getMethodCaller = function(name) {
    return getCompiled(name, makeMethodCaller, callerCache);
};

getGetter = function(name) {
    return getCompiled(name, makeGetter, getterCache);
};
}

function ensureMethod(obj, methodName) {
    var fn;
    if (obj != null) fn = obj[methodName];
    if (typeof fn !== "function") {
        var message = "Object " + util.classString(obj) + " has no method '" +
            util.toString(methodName) + "'";
        throw new Promise.TypeError(message);
    }
    return fn;
}

function caller(obj) {
    var methodName = this.pop();
    var fn = ensureMethod(obj, methodName);
    return fn.apply(obj, this);
}
Promise.prototype.call = function (methodName) {
    var args = [].slice.call(arguments, 1);;
    if (!true) {
        if (canEvaluate) {
            var maybeCaller = getMethodCaller(methodName);
            if (maybeCaller !== null) {
                return this._then(
                    maybeCaller, undefined, undefined, args, undefined);
            }
        }
    }
    args.push(methodName);
    return this._then(caller, undefined, undefined, args, undefined);
};

function namedGetter(obj) {
    return obj[this];
}
function indexedGetter(obj) {
    var index = +this;
    if (index < 0) index = Math.max(0, index + obj.length);
    return obj[index];
}
Promise.prototype.get = function (propertyName) {
    var isIndex = (typeof propertyName === "number");
    var getter;
    if (!isIndex) {
        if (canEvaluate) {
            var maybeGetter = getGetter(propertyName);
            getter = maybeGetter !== null ? maybeGetter : namedGetter;
        } else {
            getter = namedGetter;
        }
    } else {
        getter = indexedGetter;
    }
    return this._then(getter, undefined, undefined, propertyName, undefined);
};
};

},{"./util":36}],6:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, PromiseArray, apiRejection, debug) {
var util = _dereq_("./util");
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;
var async = Promise._async;

Promise.prototype["break"] = Promise.prototype.cancel = function() {
    if (!debug.cancellation()) return this._warn("cancellation is disabled");

    var promise = this;
    var child = promise;
    while (promise._isCancellable()) {
        if (!promise._cancelBy(child)) {
            if (child._isFollowing()) {
                child._followee().cancel();
            } else {
                child._cancelBranched();
            }
            break;
        }

        var parent = promise._cancellationParent;
        if (parent == null || !parent._isCancellable()) {
            if (promise._isFollowing()) {
                promise._followee().cancel();
            } else {
                promise._cancelBranched();
            }
            break;
        } else {
            if (promise._isFollowing()) promise._followee().cancel();
            promise._setWillBeCancelled();
            child = promise;
            promise = parent;
        }
    }
};

Promise.prototype._branchHasCancelled = function() {
    this._branchesRemainingToCancel--;
};

Promise.prototype._enoughBranchesHaveCancelled = function() {
    return this._branchesRemainingToCancel === undefined ||
           this._branchesRemainingToCancel <= 0;
};

Promise.prototype._cancelBy = function(canceller) {
    if (canceller === this) {
        this._branchesRemainingToCancel = 0;
        this._invokeOnCancel();
        return true;
    } else {
        this._branchHasCancelled();
        if (this._enoughBranchesHaveCancelled()) {
            this._invokeOnCancel();
            return true;
        }
    }
    return false;
};

Promise.prototype._cancelBranched = function() {
    if (this._enoughBranchesHaveCancelled()) {
        this._cancel();
    }
};

Promise.prototype._cancel = function() {
    if (!this._isCancellable()) return;
    this._setCancelled();
    async.invoke(this._cancelPromises, this, undefined);
};

Promise.prototype._cancelPromises = function() {
    if (this._length() > 0) this._settlePromises();
};

Promise.prototype._unsetOnCancel = function() {
    this._onCancelField = undefined;
};

Promise.prototype._isCancellable = function() {
    return this.isPending() && !this._isCancelled();
};

Promise.prototype.isCancellable = function() {
    return this.isPending() && !this.isCancelled();
};

Promise.prototype._doInvokeOnCancel = function(onCancelCallback, internalOnly) {
    if (util.isArray(onCancelCallback)) {
        for (var i = 0; i < onCancelCallback.length; ++i) {
            this._doInvokeOnCancel(onCancelCallback[i], internalOnly);
        }
    } else if (onCancelCallback !== undefined) {
        if (typeof onCancelCallback === "function") {
            if (!internalOnly) {
                var e = tryCatch(onCancelCallback).call(this._boundValue());
                if (e === errorObj) {
                    this._attachExtraTrace(e.e);
                    async.throwLater(e.e);
                }
            }
        } else {
            onCancelCallback._resultCancelled(this);
        }
    }
};

Promise.prototype._invokeOnCancel = function() {
    var onCancelCallback = this._onCancel();
    this._unsetOnCancel();
    async.invoke(this._doInvokeOnCancel, this, onCancelCallback);
};

Promise.prototype._invokeInternalOnCancel = function() {
    if (this._isCancellable()) {
        this._doInvokeOnCancel(this._onCancel(), true);
        this._unsetOnCancel();
    }
};

Promise.prototype._resultCancelled = function() {
    this.cancel();
};

};

},{"./util":36}],7:[function(_dereq_,module,exports){
"use strict";
module.exports = function(NEXT_FILTER) {
var util = _dereq_("./util");
var getKeys = _dereq_("./es5").keys;
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;

function catchFilter(instances, cb, promise) {
    return function(e) {
        var boundTo = promise._boundValue();
        predicateLoop: for (var i = 0; i < instances.length; ++i) {
            var item = instances[i];

            if (item === Error ||
                (item != null && item.prototype instanceof Error)) {
                if (e instanceof item) {
                    return tryCatch(cb).call(boundTo, e);
                }
            } else if (typeof item === "function") {
                var matchesPredicate = tryCatch(item).call(boundTo, e);
                if (matchesPredicate === errorObj) {
                    return matchesPredicate;
                } else if (matchesPredicate) {
                    return tryCatch(cb).call(boundTo, e);
                }
            } else if (util.isObject(e)) {
                var keys = getKeys(item);
                for (var j = 0; j < keys.length; ++j) {
                    var key = keys[j];
                    if (item[key] != e[key]) {
                        continue predicateLoop;
                    }
                }
                return tryCatch(cb).call(boundTo, e);
            }
        }
        return NEXT_FILTER;
    };
}

return catchFilter;
};

},{"./es5":13,"./util":36}],8:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
var longStackTraces = false;
var contextStack = [];

Promise.prototype._promiseCreated = function() {};
Promise.prototype._pushContext = function() {};
Promise.prototype._popContext = function() {return null;};
Promise._peekContext = Promise.prototype._peekContext = function() {};

function Context() {
    this._trace = new Context.CapturedTrace(peekContext());
}
Context.prototype._pushContext = function () {
    if (this._trace !== undefined) {
        this._trace._promiseCreated = null;
        contextStack.push(this._trace);
    }
};

Context.prototype._popContext = function () {
    if (this._trace !== undefined) {
        var trace = contextStack.pop();
        var ret = trace._promiseCreated;
        trace._promiseCreated = null;
        return ret;
    }
    return null;
};

function createContext() {
    if (longStackTraces) return new Context();
}

function peekContext() {
    var lastIndex = contextStack.length - 1;
    if (lastIndex >= 0) {
        return contextStack[lastIndex];
    }
    return undefined;
}
Context.CapturedTrace = null;
Context.create = createContext;
Context.deactivateLongStackTraces = function() {};
Context.activateLongStackTraces = function() {
    var Promise_pushContext = Promise.prototype._pushContext;
    var Promise_popContext = Promise.prototype._popContext;
    var Promise_PeekContext = Promise._peekContext;
    var Promise_peekContext = Promise.prototype._peekContext;
    var Promise_promiseCreated = Promise.prototype._promiseCreated;
    Context.deactivateLongStackTraces = function() {
        Promise.prototype._pushContext = Promise_pushContext;
        Promise.prototype._popContext = Promise_popContext;
        Promise._peekContext = Promise_PeekContext;
        Promise.prototype._peekContext = Promise_peekContext;
        Promise.prototype._promiseCreated = Promise_promiseCreated;
        longStackTraces = false;
    };
    longStackTraces = true;
    Promise.prototype._pushContext = Context.prototype._pushContext;
    Promise.prototype._popContext = Context.prototype._popContext;
    Promise._peekContext = Promise.prototype._peekContext = peekContext;
    Promise.prototype._promiseCreated = function() {
        var ctx = this._peekContext();
        if (ctx && ctx._promiseCreated == null) ctx._promiseCreated = this;
    };
};
return Context;
};

},{}],9:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, Context) {
var getDomain = Promise._getDomain;
var async = Promise._async;
var Warning = _dereq_("./errors").Warning;
var util = _dereq_("./util");
var canAttachTrace = util.canAttachTrace;
var unhandledRejectionHandled;
var possiblyUnhandledRejection;
var bluebirdFramePattern =
    /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/;
var nodeFramePattern = /\((?:timers\.js):\d+:\d+\)/;
var parseLinePattern = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/;
var stackFramePattern = null;
var formatStack = null;
var indentStackFrames = false;
var printWarning;
var debugging = !!(util.env("BLUEBIRD_DEBUG") != 0 &&
                        (true ||
                         util.env("BLUEBIRD_DEBUG") ||
                         util.env("NODE_ENV") === "development"));

var warnings = !!(util.env("BLUEBIRD_WARNINGS") != 0 &&
    (debugging || util.env("BLUEBIRD_WARNINGS")));

var longStackTraces = !!(util.env("BLUEBIRD_LONG_STACK_TRACES") != 0 &&
    (debugging || util.env("BLUEBIRD_LONG_STACK_TRACES")));

var wForgottenReturn = util.env("BLUEBIRD_W_FORGOTTEN_RETURN") != 0 &&
    (warnings || !!util.env("BLUEBIRD_W_FORGOTTEN_RETURN"));

Promise.prototype.suppressUnhandledRejections = function() {
    var target = this._target();
    target._bitField = ((target._bitField & (~1048576)) |
                      524288);
};

Promise.prototype._ensurePossibleRejectionHandled = function () {
    if ((this._bitField & 524288) !== 0) return;
    this._setRejectionIsUnhandled();
    async.invokeLater(this._notifyUnhandledRejection, this, undefined);
};

Promise.prototype._notifyUnhandledRejectionIsHandled = function () {
    fireRejectionEvent("rejectionHandled",
                                  unhandledRejectionHandled, undefined, this);
};

Promise.prototype._setReturnedNonUndefined = function() {
    this._bitField = this._bitField | 268435456;
};

Promise.prototype._returnedNonUndefined = function() {
    return (this._bitField & 268435456) !== 0;
};

Promise.prototype._notifyUnhandledRejection = function () {
    if (this._isRejectionUnhandled()) {
        var reason = this._settledValue();
        this._setUnhandledRejectionIsNotified();
        fireRejectionEvent("unhandledRejection",
                                      possiblyUnhandledRejection, reason, this);
    }
};

Promise.prototype._setUnhandledRejectionIsNotified = function () {
    this._bitField = this._bitField | 262144;
};

Promise.prototype._unsetUnhandledRejectionIsNotified = function () {
    this._bitField = this._bitField & (~262144);
};

Promise.prototype._isUnhandledRejectionNotified = function () {
    return (this._bitField & 262144) > 0;
};

Promise.prototype._setRejectionIsUnhandled = function () {
    this._bitField = this._bitField | 1048576;
};

Promise.prototype._unsetRejectionIsUnhandled = function () {
    this._bitField = this._bitField & (~1048576);
    if (this._isUnhandledRejectionNotified()) {
        this._unsetUnhandledRejectionIsNotified();
        this._notifyUnhandledRejectionIsHandled();
    }
};

Promise.prototype._isRejectionUnhandled = function () {
    return (this._bitField & 1048576) > 0;
};

Promise.prototype._warn = function(message, shouldUseOwnTrace, promise) {
    return warn(message, shouldUseOwnTrace, promise || this);
};

Promise.onPossiblyUnhandledRejection = function (fn) {
    var domain = getDomain();
    possiblyUnhandledRejection =
        typeof fn === "function" ? (domain === null ?
                                            fn : util.domainBind(domain, fn))
                                 : undefined;
};

Promise.onUnhandledRejectionHandled = function (fn) {
    var domain = getDomain();
    unhandledRejectionHandled =
        typeof fn === "function" ? (domain === null ?
                                            fn : util.domainBind(domain, fn))
                                 : undefined;
};

var disableLongStackTraces = function() {};
Promise.longStackTraces = function () {
    if (async.haveItemsQueued() && !config.longStackTraces) {
        throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    if (!config.longStackTraces && longStackTracesIsSupported()) {
        var Promise_captureStackTrace = Promise.prototype._captureStackTrace;
        var Promise_attachExtraTrace = Promise.prototype._attachExtraTrace;
        config.longStackTraces = true;
        disableLongStackTraces = function() {
            if (async.haveItemsQueued() && !config.longStackTraces) {
                throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
            }
            Promise.prototype._captureStackTrace = Promise_captureStackTrace;
            Promise.prototype._attachExtraTrace = Promise_attachExtraTrace;
            Context.deactivateLongStackTraces();
            async.enableTrampoline();
            config.longStackTraces = false;
        };
        Promise.prototype._captureStackTrace = longStackTracesCaptureStackTrace;
        Promise.prototype._attachExtraTrace = longStackTracesAttachExtraTrace;
        Context.activateLongStackTraces();
        async.disableTrampolineIfNecessary();
    }
};

Promise.hasLongStackTraces = function () {
    return config.longStackTraces && longStackTracesIsSupported();
};

var fireDomEvent = (function() {
    try {
        if (typeof CustomEvent === "function") {
            var event = new CustomEvent("CustomEvent");
            util.global.dispatchEvent(event);
            return function(name, event) {
                var domEvent = new CustomEvent(name.toLowerCase(), {
                    detail: event,
                    cancelable: true
                });
                return !util.global.dispatchEvent(domEvent);
            };
        } else if (typeof Event === "function") {
            var event = new Event("CustomEvent");
            util.global.dispatchEvent(event);
            return function(name, event) {
                var domEvent = new Event(name.toLowerCase(), {
                    cancelable: true
                });
                domEvent.detail = event;
                return !util.global.dispatchEvent(domEvent);
            };
        } else {
            var event = document.createEvent("CustomEvent");
            event.initCustomEvent("testingtheevent", false, true, {});
            util.global.dispatchEvent(event);
            return function(name, event) {
                var domEvent = document.createEvent("CustomEvent");
                domEvent.initCustomEvent(name.toLowerCase(), false, true,
                    event);
                return !util.global.dispatchEvent(domEvent);
            };
        }
    } catch (e) {}
    return function() {
        return false;
    };
})();

var fireGlobalEvent = (function() {
    if (util.isNode) {
        return function() {
            return process.emit.apply(process, arguments);
        };
    } else {
        if (!util.global) {
            return function() {
                return false;
            };
        }
        return function(name) {
            var methodName = "on" + name.toLowerCase();
            var method = util.global[methodName];
            if (!method) return false;
            method.apply(util.global, [].slice.call(arguments, 1));
            return true;
        };
    }
})();

function generatePromiseLifecycleEventObject(name, promise) {
    return {promise: promise};
}

var eventToObjectGenerator = {
    promiseCreated: generatePromiseLifecycleEventObject,
    promiseFulfilled: generatePromiseLifecycleEventObject,
    promiseRejected: generatePromiseLifecycleEventObject,
    promiseResolved: generatePromiseLifecycleEventObject,
    promiseCancelled: generatePromiseLifecycleEventObject,
    promiseChained: function(name, promise, child) {
        return {promise: promise, child: child};
    },
    warning: function(name, warning) {
        return {warning: warning};
    },
    unhandledRejection: function (name, reason, promise) {
        return {reason: reason, promise: promise};
    },
    rejectionHandled: generatePromiseLifecycleEventObject
};

var activeFireEvent = function (name) {
    var globalEventFired = false;
    try {
        globalEventFired = fireGlobalEvent.apply(null, arguments);
    } catch (e) {
        async.throwLater(e);
        globalEventFired = true;
    }

    var domEventFired = false;
    try {
        domEventFired = fireDomEvent(name,
                    eventToObjectGenerator[name].apply(null, arguments));
    } catch (e) {
        async.throwLater(e);
        domEventFired = true;
    }

    return domEventFired || globalEventFired;
};

Promise.config = function(opts) {
    opts = Object(opts);
    if ("longStackTraces" in opts) {
        if (opts.longStackTraces) {
            Promise.longStackTraces();
        } else if (!opts.longStackTraces && Promise.hasLongStackTraces()) {
            disableLongStackTraces();
        }
    }
    if ("warnings" in opts) {
        var warningsOption = opts.warnings;
        config.warnings = !!warningsOption;
        wForgottenReturn = config.warnings;

        if (util.isObject(warningsOption)) {
            if ("wForgottenReturn" in warningsOption) {
                wForgottenReturn = !!warningsOption.wForgottenReturn;
            }
        }
    }
    if ("cancellation" in opts && opts.cancellation && !config.cancellation) {
        if (async.haveItemsQueued()) {
            throw new Error(
                "cannot enable cancellation after promises are in use");
        }
        Promise.prototype._clearCancellationData =
            cancellationClearCancellationData;
        Promise.prototype._propagateFrom = cancellationPropagateFrom;
        Promise.prototype._onCancel = cancellationOnCancel;
        Promise.prototype._setOnCancel = cancellationSetOnCancel;
        Promise.prototype._attachCancellationCallback =
            cancellationAttachCancellationCallback;
        Promise.prototype._execute = cancellationExecute;
        propagateFromFunction = cancellationPropagateFrom;
        config.cancellation = true;
    }
    if ("monitoring" in opts) {
        if (opts.monitoring && !config.monitoring) {
            config.monitoring = true;
            Promise.prototype._fireEvent = activeFireEvent;
        } else if (!opts.monitoring && config.monitoring) {
            config.monitoring = false;
            Promise.prototype._fireEvent = defaultFireEvent;
        }
    }
    return Promise;
};

function defaultFireEvent() { return false; }

Promise.prototype._fireEvent = defaultFireEvent;
Promise.prototype._execute = function(executor, resolve, reject) {
    try {
        executor(resolve, reject);
    } catch (e) {
        return e;
    }
};
Promise.prototype._onCancel = function () {};
Promise.prototype._setOnCancel = function (handler) { ; };
Promise.prototype._attachCancellationCallback = function(onCancel) {
    ;
};
Promise.prototype._captureStackTrace = function () {};
Promise.prototype._attachExtraTrace = function () {};
Promise.prototype._clearCancellationData = function() {};
Promise.prototype._propagateFrom = function (parent, flags) {
    ;
    ;
};

function cancellationExecute(executor, resolve, reject) {
    var promise = this;
    try {
        executor(resolve, reject, function(onCancel) {
            if (typeof onCancel !== "function") {
                throw new TypeError("onCancel must be a function, got: " +
                                    util.toString(onCancel));
            }
            promise._attachCancellationCallback(onCancel);
        });
    } catch (e) {
        return e;
    }
}

function cancellationAttachCancellationCallback(onCancel) {
    if (!this._isCancellable()) return this;

    var previousOnCancel = this._onCancel();
    if (previousOnCancel !== undefined) {
        if (util.isArray(previousOnCancel)) {
            previousOnCancel.push(onCancel);
        } else {
            this._setOnCancel([previousOnCancel, onCancel]);
        }
    } else {
        this._setOnCancel(onCancel);
    }
}

function cancellationOnCancel() {
    return this._onCancelField;
}

function cancellationSetOnCancel(onCancel) {
    this._onCancelField = onCancel;
}

function cancellationClearCancellationData() {
    this._cancellationParent = undefined;
    this._onCancelField = undefined;
}

function cancellationPropagateFrom(parent, flags) {
    if ((flags & 1) !== 0) {
        this._cancellationParent = parent;
        var branchesRemainingToCancel = parent._branchesRemainingToCancel;
        if (branchesRemainingToCancel === undefined) {
            branchesRemainingToCancel = 0;
        }
        parent._branchesRemainingToCancel = branchesRemainingToCancel + 1;
    }
    if ((flags & 2) !== 0 && parent._isBound()) {
        this._setBoundTo(parent._boundTo);
    }
}

function bindingPropagateFrom(parent, flags) {
    if ((flags & 2) !== 0 && parent._isBound()) {
        this._setBoundTo(parent._boundTo);
    }
}
var propagateFromFunction = bindingPropagateFrom;

function boundValueFunction() {
    var ret = this._boundTo;
    if (ret !== undefined) {
        if (ret instanceof Promise) {
            if (ret.isFulfilled()) {
                return ret.value();
            } else {
                return undefined;
            }
        }
    }
    return ret;
}

function longStackTracesCaptureStackTrace() {
    this._trace = new CapturedTrace(this._peekContext());
}

function longStackTracesAttachExtraTrace(error, ignoreSelf) {
    if (canAttachTrace(error)) {
        var trace = this._trace;
        if (trace !== undefined) {
            if (ignoreSelf) trace = trace._parent;
        }
        if (trace !== undefined) {
            trace.attachExtraTrace(error);
        } else if (!error.__stackCleaned__) {
            var parsed = parseStackAndMessage(error);
            util.notEnumerableProp(error, "stack",
                parsed.message + "\n" + parsed.stack.join("\n"));
            util.notEnumerableProp(error, "__stackCleaned__", true);
        }
    }
}

function checkForgottenReturns(returnValue, promiseCreated, name, promise,
                               parent) {
    if (returnValue === undefined && promiseCreated !== null &&
        wForgottenReturn) {
        if (parent !== undefined && parent._returnedNonUndefined()) return;
        if ((promise._bitField & 65535) === 0) return;

        if (name) name = name + " ";
        var handlerLine = "";
        var creatorLine = "";
        if (promiseCreated._trace) {
            var traceLines = promiseCreated._trace.stack.split("\n");
            var stack = cleanStack(traceLines);
            for (var i = stack.length - 1; i >= 0; --i) {
                var line = stack[i];
                if (!nodeFramePattern.test(line)) {
                    var lineMatches = line.match(parseLinePattern);
                    if (lineMatches) {
                        handlerLine  = "at " + lineMatches[1] +
                            ":" + lineMatches[2] + ":" + lineMatches[3] + " ";
                    }
                    break;
                }
            }

            if (stack.length > 0) {
                var firstUserLine = stack[0];
                for (var i = 0; i < traceLines.length; ++i) {

                    if (traceLines[i] === firstUserLine) {
                        if (i > 0) {
                            creatorLine = "\n" + traceLines[i - 1];
                        }
                        break;
                    }
                }

            }
        }
        var msg = "a promise was created in a " + name +
            "handler " + handlerLine + "but was not returned from it, " +
            "see http://goo.gl/rRqMUw" +
            creatorLine;
        promise._warn(msg, true, promiseCreated);
    }
}

function deprecated(name, replacement) {
    var message = name +
        " is deprecated and will be removed in a future version.";
    if (replacement) message += " Use " + replacement + " instead.";
    return warn(message);
}

function warn(message, shouldUseOwnTrace, promise) {
    if (!config.warnings) return;
    var warning = new Warning(message);
    var ctx;
    if (shouldUseOwnTrace) {
        promise._attachExtraTrace(warning);
    } else if (config.longStackTraces && (ctx = Promise._peekContext())) {
        ctx.attachExtraTrace(warning);
    } else {
        var parsed = parseStackAndMessage(warning);
        warning.stack = parsed.message + "\n" + parsed.stack.join("\n");
    }

    if (!activeFireEvent("warning", warning)) {
        formatAndLogError(warning, "", true);
    }
}

function reconstructStack(message, stacks) {
    for (var i = 0; i < stacks.length - 1; ++i) {
        stacks[i].push("From previous event:");
        stacks[i] = stacks[i].join("\n");
    }
    if (i < stacks.length) {
        stacks[i] = stacks[i].join("\n");
    }
    return message + "\n" + stacks.join("\n");
}

function removeDuplicateOrEmptyJumps(stacks) {
    for (var i = 0; i < stacks.length; ++i) {
        if (stacks[i].length === 0 ||
            ((i + 1 < stacks.length) && stacks[i][0] === stacks[i+1][0])) {
            stacks.splice(i, 1);
            i--;
        }
    }
}

function removeCommonRoots(stacks) {
    var current = stacks[0];
    for (var i = 1; i < stacks.length; ++i) {
        var prev = stacks[i];
        var currentLastIndex = current.length - 1;
        var currentLastLine = current[currentLastIndex];
        var commonRootMeetPoint = -1;

        for (var j = prev.length - 1; j >= 0; --j) {
            if (prev[j] === currentLastLine) {
                commonRootMeetPoint = j;
                break;
            }
        }

        for (var j = commonRootMeetPoint; j >= 0; --j) {
            var line = prev[j];
            if (current[currentLastIndex] === line) {
                current.pop();
                currentLastIndex--;
            } else {
                break;
            }
        }
        current = prev;
    }
}

function cleanStack(stack) {
    var ret = [];
    for (var i = 0; i < stack.length; ++i) {
        var line = stack[i];
        var isTraceLine = "    (No stack trace)" === line ||
            stackFramePattern.test(line);
        var isInternalFrame = isTraceLine && shouldIgnore(line);
        if (isTraceLine && !isInternalFrame) {
            if (indentStackFrames && line.charAt(0) !== " ") {
                line = "    " + line;
            }
            ret.push(line);
        }
    }
    return ret;
}

function stackFramesAsArray(error) {
    var stack = error.stack.replace(/\s+$/g, "").split("\n");
    for (var i = 0; i < stack.length; ++i) {
        var line = stack[i];
        if ("    (No stack trace)" === line || stackFramePattern.test(line)) {
            break;
        }
    }
    if (i > 0 && error.name != "SyntaxError") {
        stack = stack.slice(i);
    }
    return stack;
}

function parseStackAndMessage(error) {
    var stack = error.stack;
    var message = error.toString();
    stack = typeof stack === "string" && stack.length > 0
                ? stackFramesAsArray(error) : ["    (No stack trace)"];
    return {
        message: message,
        stack: error.name == "SyntaxError" ? stack : cleanStack(stack)
    };
}

function formatAndLogError(error, title, isSoft) {
    if (typeof console !== "undefined") {
        var message;
        if (util.isObject(error)) {
            var stack = error.stack;
            message = title + formatStack(stack, error);
        } else {
            message = title + String(error);
        }
        if (typeof printWarning === "function") {
            printWarning(message, isSoft);
        } else if (typeof console.log === "function" ||
            typeof console.log === "object") {
            console.log(message);
        }
    }
}

function fireRejectionEvent(name, localHandler, reason, promise) {
    var localEventFired = false;
    try {
        if (typeof localHandler === "function") {
            localEventFired = true;
            if (name === "rejectionHandled") {
                localHandler(promise);
            } else {
                localHandler(reason, promise);
            }
        }
    } catch (e) {
        async.throwLater(e);
    }

    if (name === "unhandledRejection") {
        if (!activeFireEvent(name, reason, promise) && !localEventFired) {
            formatAndLogError(reason, "Unhandled rejection ");
        }
    } else {
        activeFireEvent(name, promise);
    }
}

function formatNonError(obj) {
    var str;
    if (typeof obj === "function") {
        str = "[function " +
            (obj.name || "anonymous") +
            "]";
    } else {
        str = obj && typeof obj.toString === "function"
            ? obj.toString() : util.toString(obj);
        var ruselessToString = /\[object [a-zA-Z0-9$_]+\]/;
        if (ruselessToString.test(str)) {
            try {
                var newStr = JSON.stringify(obj);
                str = newStr;
            }
            catch(e) {

            }
        }
        if (str.length === 0) {
            str = "(empty array)";
        }
    }
    return ("(<" + snip(str) + ">, no stack trace)");
}

function snip(str) {
    var maxChars = 41;
    if (str.length < maxChars) {
        return str;
    }
    return str.substr(0, maxChars - 3) + "...";
}

function longStackTracesIsSupported() {
    return typeof captureStackTrace === "function";
}

var shouldIgnore = function() { return false; };
var parseLineInfoRegex = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
function parseLineInfo(line) {
    var matches = line.match(parseLineInfoRegex);
    if (matches) {
        return {
            fileName: matches[1],
            line: parseInt(matches[2], 10)
        };
    }
}

function setBounds(firstLineError, lastLineError) {
    if (!longStackTracesIsSupported()) return;
    var firstStackLines = firstLineError.stack.split("\n");
    var lastStackLines = lastLineError.stack.split("\n");
    var firstIndex = -1;
    var lastIndex = -1;
    var firstFileName;
    var lastFileName;
    for (var i = 0; i < firstStackLines.length; ++i) {
        var result = parseLineInfo(firstStackLines[i]);
        if (result) {
            firstFileName = result.fileName;
            firstIndex = result.line;
            break;
        }
    }
    for (var i = 0; i < lastStackLines.length; ++i) {
        var result = parseLineInfo(lastStackLines[i]);
        if (result) {
            lastFileName = result.fileName;
            lastIndex = result.line;
            break;
        }
    }
    if (firstIndex < 0 || lastIndex < 0 || !firstFileName || !lastFileName ||
        firstFileName !== lastFileName || firstIndex >= lastIndex) {
        return;
    }

    shouldIgnore = function(line) {
        if (bluebirdFramePattern.test(line)) return true;
        var info = parseLineInfo(line);
        if (info) {
            if (info.fileName === firstFileName &&
                (firstIndex <= info.line && info.line <= lastIndex)) {
                return true;
            }
        }
        return false;
    };
}

function CapturedTrace(parent) {
    this._parent = parent;
    this._promisesCreated = 0;
    var length = this._length = 1 + (parent === undefined ? 0 : parent._length);
    captureStackTrace(this, CapturedTrace);
    if (length > 32) this.uncycle();
}
util.inherits(CapturedTrace, Error);
Context.CapturedTrace = CapturedTrace;

CapturedTrace.prototype.uncycle = function() {
    var length = this._length;
    if (length < 2) return;
    var nodes = [];
    var stackToIndex = {};

    for (var i = 0, node = this; node !== undefined; ++i) {
        nodes.push(node);
        node = node._parent;
    }
    length = this._length = i;
    for (var i = length - 1; i >= 0; --i) {
        var stack = nodes[i].stack;
        if (stackToIndex[stack] === undefined) {
            stackToIndex[stack] = i;
        }
    }
    for (var i = 0; i < length; ++i) {
        var currentStack = nodes[i].stack;
        var index = stackToIndex[currentStack];
        if (index !== undefined && index !== i) {
            if (index > 0) {
                nodes[index - 1]._parent = undefined;
                nodes[index - 1]._length = 1;
            }
            nodes[i]._parent = undefined;
            nodes[i]._length = 1;
            var cycleEdgeNode = i > 0 ? nodes[i - 1] : this;

            if (index < length - 1) {
                cycleEdgeNode._parent = nodes[index + 1];
                cycleEdgeNode._parent.uncycle();
                cycleEdgeNode._length =
                    cycleEdgeNode._parent._length + 1;
            } else {
                cycleEdgeNode._parent = undefined;
                cycleEdgeNode._length = 1;
            }
            var currentChildLength = cycleEdgeNode._length + 1;
            for (var j = i - 2; j >= 0; --j) {
                nodes[j]._length = currentChildLength;
                currentChildLength++;
            }
            return;
        }
    }
};

CapturedTrace.prototype.attachExtraTrace = function(error) {
    if (error.__stackCleaned__) return;
    this.uncycle();
    var parsed = parseStackAndMessage(error);
    var message = parsed.message;
    var stacks = [parsed.stack];

    var trace = this;
    while (trace !== undefined) {
        stacks.push(cleanStack(trace.stack.split("\n")));
        trace = trace._parent;
    }
    removeCommonRoots(stacks);
    removeDuplicateOrEmptyJumps(stacks);
    util.notEnumerableProp(error, "stack", reconstructStack(message, stacks));
    util.notEnumerableProp(error, "__stackCleaned__", true);
};

var captureStackTrace = (function stackDetection() {
    var v8stackFramePattern = /^\s*at\s*/;
    var v8stackFormatter = function(stack, error) {
        if (typeof stack === "string") return stack;

        if (error.name !== undefined &&
            error.message !== undefined) {
            return error.toString();
        }
        return formatNonError(error);
    };

    if (typeof Error.stackTraceLimit === "number" &&
        typeof Error.captureStackTrace === "function") {
        Error.stackTraceLimit += 6;
        stackFramePattern = v8stackFramePattern;
        formatStack = v8stackFormatter;
        var captureStackTrace = Error.captureStackTrace;

        shouldIgnore = function(line) {
            return bluebirdFramePattern.test(line);
        };
        return function(receiver, ignoreUntil) {
            Error.stackTraceLimit += 6;
            captureStackTrace(receiver, ignoreUntil);
            Error.stackTraceLimit -= 6;
        };
    }
    var err = new Error();

    if (typeof err.stack === "string" &&
        err.stack.split("\n")[0].indexOf("stackDetection@") >= 0) {
        stackFramePattern = /@/;
        formatStack = v8stackFormatter;
        indentStackFrames = true;
        return function captureStackTrace(o) {
            o.stack = new Error().stack;
        };
    }

    var hasStackAfterThrow;
    try { throw new Error(); }
    catch(e) {
        hasStackAfterThrow = ("stack" in e);
    }
    if (!("stack" in err) && hasStackAfterThrow &&
        typeof Error.stackTraceLimit === "number") {
        stackFramePattern = v8stackFramePattern;
        formatStack = v8stackFormatter;
        return function captureStackTrace(o) {
            Error.stackTraceLimit += 6;
            try { throw new Error(); }
            catch(e) { o.stack = e.stack; }
            Error.stackTraceLimit -= 6;
        };
    }

    formatStack = function(stack, error) {
        if (typeof stack === "string") return stack;

        if ((typeof error === "object" ||
            typeof error === "function") &&
            error.name !== undefined &&
            error.message !== undefined) {
            return error.toString();
        }
        return formatNonError(error);
    };

    return null;

})([]);

if (typeof console !== "undefined" && typeof console.warn !== "undefined") {
    printWarning = function (message) {
        console.warn(message);
    };
    if (util.isNode && process.stderr.isTTY) {
        printWarning = function(message, isSoft) {
            var color = isSoft ? "\u001b[33m" : "\u001b[31m";
            console.warn(color + message + "\u001b[0m\n");
        };
    } else if (!util.isNode && typeof (new Error().stack) === "string") {
        printWarning = function(message, isSoft) {
            console.warn("%c" + message,
                        isSoft ? "color: darkorange" : "color: red");
        };
    }
}

var config = {
    warnings: warnings,
    longStackTraces: false,
    cancellation: false,
    monitoring: false
};

if (longStackTraces) Promise.longStackTraces();

return {
    longStackTraces: function() {
        return config.longStackTraces;
    },
    warnings: function() {
        return config.warnings;
    },
    cancellation: function() {
        return config.cancellation;
    },
    monitoring: function() {
        return config.monitoring;
    },
    propagateFromFunction: function() {
        return propagateFromFunction;
    },
    boundValueFunction: function() {
        return boundValueFunction;
    },
    checkForgottenReturns: checkForgottenReturns,
    setBounds: setBounds,
    warn: warn,
    deprecated: deprecated,
    CapturedTrace: CapturedTrace,
    fireDomEvent: fireDomEvent,
    fireGlobalEvent: fireGlobalEvent
};
};

},{"./errors":12,"./util":36}],10:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
function returner() {
    return this.value;
}
function thrower() {
    throw this.reason;
}

Promise.prototype["return"] =
Promise.prototype.thenReturn = function (value) {
    if (value instanceof Promise) value.suppressUnhandledRejections();
    return this._then(
        returner, undefined, undefined, {value: value}, undefined);
};

Promise.prototype["throw"] =
Promise.prototype.thenThrow = function (reason) {
    return this._then(
        thrower, undefined, undefined, {reason: reason}, undefined);
};

Promise.prototype.catchThrow = function (reason) {
    if (arguments.length <= 1) {
        return this._then(
            undefined, thrower, undefined, {reason: reason}, undefined);
    } else {
        var _reason = arguments[1];
        var handler = function() {throw _reason;};
        return this.caught(reason, handler);
    }
};

Promise.prototype.catchReturn = function (value) {
    if (arguments.length <= 1) {
        if (value instanceof Promise) value.suppressUnhandledRejections();
        return this._then(
            undefined, returner, undefined, {value: value}, undefined);
    } else {
        var _value = arguments[1];
        if (_value instanceof Promise) _value.suppressUnhandledRejections();
        var handler = function() {return _value;};
        return this.caught(value, handler);
    }
};
};

},{}],11:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL) {
var PromiseReduce = Promise.reduce;
var PromiseAll = Promise.all;

function promiseAllThis() {
    return PromiseAll(this);
}

function PromiseMapSeries(promises, fn) {
    return PromiseReduce(promises, fn, INTERNAL, INTERNAL);
}

Promise.prototype.each = function (fn) {
    return PromiseReduce(this, fn, INTERNAL, 0)
              ._then(promiseAllThis, undefined, undefined, this, undefined);
};

Promise.prototype.mapSeries = function (fn) {
    return PromiseReduce(this, fn, INTERNAL, INTERNAL);
};

Promise.each = function (promises, fn) {
    return PromiseReduce(promises, fn, INTERNAL, 0)
              ._then(promiseAllThis, undefined, undefined, promises, undefined);
};

Promise.mapSeries = PromiseMapSeries;
};


},{}],12:[function(_dereq_,module,exports){
"use strict";
var es5 = _dereq_("./es5");
var Objectfreeze = es5.freeze;
var util = _dereq_("./util");
var inherits = util.inherits;
var notEnumerableProp = util.notEnumerableProp;

function subError(nameProperty, defaultMessage) {
    function SubError(message) {
        if (!(this instanceof SubError)) return new SubError(message);
        notEnumerableProp(this, "message",
            typeof message === "string" ? message : defaultMessage);
        notEnumerableProp(this, "name", nameProperty);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        } else {
            Error.call(this);
        }
    }
    inherits(SubError, Error);
    return SubError;
}

var _TypeError, _RangeError;
var Warning = subError("Warning", "warning");
var CancellationError = subError("CancellationError", "cancellation error");
var TimeoutError = subError("TimeoutError", "timeout error");
var AggregateError = subError("AggregateError", "aggregate error");
try {
    _TypeError = TypeError;
    _RangeError = RangeError;
} catch(e) {
    _TypeError = subError("TypeError", "type error");
    _RangeError = subError("RangeError", "range error");
}

var methods = ("join pop push shift unshift slice filter forEach some " +
    "every map indexOf lastIndexOf reduce reduceRight sort reverse").split(" ");

for (var i = 0; i < methods.length; ++i) {
    if (typeof Array.prototype[methods[i]] === "function") {
        AggregateError.prototype[methods[i]] = Array.prototype[methods[i]];
    }
}

es5.defineProperty(AggregateError.prototype, "length", {
    value: 0,
    configurable: false,
    writable: true,
    enumerable: true
});
AggregateError.prototype["isOperational"] = true;
var level = 0;
AggregateError.prototype.toString = function() {
    var indent = Array(level * 4 + 1).join(" ");
    var ret = "\n" + indent + "AggregateError of:" + "\n";
    level++;
    indent = Array(level * 4 + 1).join(" ");
    for (var i = 0; i < this.length; ++i) {
        var str = this[i] === this ? "[Circular AggregateError]" : this[i] + "";
        var lines = str.split("\n");
        for (var j = 0; j < lines.length; ++j) {
            lines[j] = indent + lines[j];
        }
        str = lines.join("\n");
        ret += str + "\n";
    }
    level--;
    return ret;
};

function OperationalError(message) {
    if (!(this instanceof OperationalError))
        return new OperationalError(message);
    notEnumerableProp(this, "name", "OperationalError");
    notEnumerableProp(this, "message", message);
    this.cause = message;
    this["isOperational"] = true;

    if (message instanceof Error) {
        notEnumerableProp(this, "message", message.message);
        notEnumerableProp(this, "stack", message.stack);
    } else if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
    }

}
inherits(OperationalError, Error);

var errorTypes = Error["__BluebirdErrorTypes__"];
if (!errorTypes) {
    errorTypes = Objectfreeze({
        CancellationError: CancellationError,
        TimeoutError: TimeoutError,
        OperationalError: OperationalError,
        RejectionError: OperationalError,
        AggregateError: AggregateError
    });
    es5.defineProperty(Error, "__BluebirdErrorTypes__", {
        value: errorTypes,
        writable: false,
        enumerable: false,
        configurable: false
    });
}

module.exports = {
    Error: Error,
    TypeError: _TypeError,
    RangeError: _RangeError,
    CancellationError: errorTypes.CancellationError,
    OperationalError: errorTypes.OperationalError,
    TimeoutError: errorTypes.TimeoutError,
    AggregateError: errorTypes.AggregateError,
    Warning: Warning
};

},{"./es5":13,"./util":36}],13:[function(_dereq_,module,exports){
var isES5 = (function(){
    "use strict";
    return this === undefined;
})();

if (isES5) {
    module.exports = {
        freeze: Object.freeze,
        defineProperty: Object.defineProperty,
        getDescriptor: Object.getOwnPropertyDescriptor,
        keys: Object.keys,
        names: Object.getOwnPropertyNames,
        getPrototypeOf: Object.getPrototypeOf,
        isArray: Array.isArray,
        isES5: isES5,
        propertyIsWritable: function(obj, prop) {
            var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
            return !!(!descriptor || descriptor.writable || descriptor.set);
        }
    };
} else {
    var has = {}.hasOwnProperty;
    var str = {}.toString;
    var proto = {}.constructor.prototype;

    var ObjectKeys = function (o) {
        var ret = [];
        for (var key in o) {
            if (has.call(o, key)) {
                ret.push(key);
            }
        }
        return ret;
    };

    var ObjectGetDescriptor = function(o, key) {
        return {value: o[key]};
    };

    var ObjectDefineProperty = function (o, key, desc) {
        o[key] = desc.value;
        return o;
    };

    var ObjectFreeze = function (obj) {
        return obj;
    };

    var ObjectGetPrototypeOf = function (obj) {
        try {
            return Object(obj).constructor.prototype;
        }
        catch (e) {
            return proto;
        }
    };

    var ArrayIsArray = function (obj) {
        try {
            return str.call(obj) === "[object Array]";
        }
        catch(e) {
            return false;
        }
    };

    module.exports = {
        isArray: ArrayIsArray,
        keys: ObjectKeys,
        names: ObjectKeys,
        defineProperty: ObjectDefineProperty,
        getDescriptor: ObjectGetDescriptor,
        freeze: ObjectFreeze,
        getPrototypeOf: ObjectGetPrototypeOf,
        isES5: isES5,
        propertyIsWritable: function() {
            return true;
        }
    };
}

},{}],14:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL) {
var PromiseMap = Promise.map;

Promise.prototype.filter = function (fn, options) {
    return PromiseMap(this, fn, options, INTERNAL);
};

Promise.filter = function (promises, fn, options) {
    return PromiseMap(promises, fn, options, INTERNAL);
};
};

},{}],15:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, tryConvertToPromise, NEXT_FILTER) {
var util = _dereq_("./util");
var CancellationError = Promise.CancellationError;
var errorObj = util.errorObj;
var catchFilter = _dereq_("./catch_filter")(NEXT_FILTER);

function PassThroughHandlerContext(promise, type, handler) {
    this.promise = promise;
    this.type = type;
    this.handler = handler;
    this.called = false;
    this.cancelPromise = null;
}

PassThroughHandlerContext.prototype.isFinallyHandler = function() {
    return this.type === 0;
};

function FinallyHandlerCancelReaction(finallyHandler) {
    this.finallyHandler = finallyHandler;
}

FinallyHandlerCancelReaction.prototype._resultCancelled = function() {
    checkCancel(this.finallyHandler);
};

function checkCancel(ctx, reason) {
    if (ctx.cancelPromise != null) {
        if (arguments.length > 1) {
            ctx.cancelPromise._reject(reason);
        } else {
            ctx.cancelPromise._cancel();
        }
        ctx.cancelPromise = null;
        return true;
    }
    return false;
}

function succeed() {
    return finallyHandler.call(this, this.promise._target()._settledValue());
}
function fail(reason) {
    if (checkCancel(this, reason)) return;
    errorObj.e = reason;
    return errorObj;
}
function finallyHandler(reasonOrValue) {
    var promise = this.promise;
    var handler = this.handler;

    if (!this.called) {
        this.called = true;
        var ret = this.isFinallyHandler()
            ? handler.call(promise._boundValue())
            : handler.call(promise._boundValue(), reasonOrValue);
        if (ret === NEXT_FILTER) {
            return ret;
        } else if (ret !== undefined) {
            promise._setReturnedNonUndefined();
            var maybePromise = tryConvertToPromise(ret, promise);
            if (maybePromise instanceof Promise) {
                if (this.cancelPromise != null) {
                    if (maybePromise._isCancelled()) {
                        var reason =
                            new CancellationError("late cancellation observer");
                        promise._attachExtraTrace(reason);
                        errorObj.e = reason;
                        return errorObj;
                    } else if (maybePromise.isPending()) {
                        maybePromise._attachCancellationCallback(
                            new FinallyHandlerCancelReaction(this));
                    }
                }
                return maybePromise._then(
                    succeed, fail, undefined, this, undefined);
            }
        }
    }

    if (promise.isRejected()) {
        checkCancel(this);
        errorObj.e = reasonOrValue;
        return errorObj;
    } else {
        checkCancel(this);
        return reasonOrValue;
    }
}

Promise.prototype._passThrough = function(handler, type, success, fail) {
    if (typeof handler !== "function") return this.then();
    return this._then(success,
                      fail,
                      undefined,
                      new PassThroughHandlerContext(this, type, handler),
                      undefined);
};

Promise.prototype.lastly =
Promise.prototype["finally"] = function (handler) {
    return this._passThrough(handler,
                             0,
                             finallyHandler,
                             finallyHandler);
};


Promise.prototype.tap = function (handler) {
    return this._passThrough(handler, 1, finallyHandler);
};

Promise.prototype.tapCatch = function (handlerOrPredicate) {
    var len = arguments.length;
    if(len === 1) {
        return this._passThrough(handlerOrPredicate,
                                 1,
                                 undefined,
                                 finallyHandler);
    } else {
         var catchInstances = new Array(len - 1),
            j = 0, i;
        for (i = 0; i < len - 1; ++i) {
            var item = arguments[i];
            if (util.isObject(item)) {
                catchInstances[j++] = item;
            } else {
                return Promise.reject(new TypeError(
                    "tapCatch statement predicate: "
                    + "expecting an object but got " + util.classString(item)
                ));
            }
        }
        catchInstances.length = j;
        var handler = arguments[i];
        return this._passThrough(catchFilter(catchInstances, handler, this),
                                 1,
                                 undefined,
                                 finallyHandler);
    }

};

return PassThroughHandlerContext;
};

},{"./catch_filter":7,"./util":36}],16:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise,
                          apiRejection,
                          INTERNAL,
                          tryConvertToPromise,
                          Proxyable,
                          debug) {
var errors = _dereq_("./errors");
var TypeError = errors.TypeError;
var util = _dereq_("./util");
var errorObj = util.errorObj;
var tryCatch = util.tryCatch;
var yieldHandlers = [];

function promiseFromYieldHandler(value, yieldHandlers, traceParent) {
    for (var i = 0; i < yieldHandlers.length; ++i) {
        traceParent._pushContext();
        var result = tryCatch(yieldHandlers[i])(value);
        traceParent._popContext();
        if (result === errorObj) {
            traceParent._pushContext();
            var ret = Promise.reject(errorObj.e);
            traceParent._popContext();
            return ret;
        }
        var maybePromise = tryConvertToPromise(result, traceParent);
        if (maybePromise instanceof Promise) return maybePromise;
    }
    return null;
}

function PromiseSpawn(generatorFunction, receiver, yieldHandler, stack) {
    if (debug.cancellation()) {
        var internal = new Promise(INTERNAL);
        var _finallyPromise = this._finallyPromise = new Promise(INTERNAL);
        this._promise = internal.lastly(function() {
            return _finallyPromise;
        });
        internal._captureStackTrace();
        internal._setOnCancel(this);
    } else {
        var promise = this._promise = new Promise(INTERNAL);
        promise._captureStackTrace();
    }
    this._stack = stack;
    this._generatorFunction = generatorFunction;
    this._receiver = receiver;
    this._generator = undefined;
    this._yieldHandlers = typeof yieldHandler === "function"
        ? [yieldHandler].concat(yieldHandlers)
        : yieldHandlers;
    this._yieldedPromise = null;
    this._cancellationPhase = false;
}
util.inherits(PromiseSpawn, Proxyable);

PromiseSpawn.prototype._isResolved = function() {
    return this._promise === null;
};

PromiseSpawn.prototype._cleanup = function() {
    this._promise = this._generator = null;
    if (debug.cancellation() && this._finallyPromise !== null) {
        this._finallyPromise._fulfill();
        this._finallyPromise = null;
    }
};

PromiseSpawn.prototype._promiseCancelled = function() {
    if (this._isResolved()) return;
    var implementsReturn = typeof this._generator["return"] !== "undefined";

    var result;
    if (!implementsReturn) {
        var reason = new Promise.CancellationError(
            "generator .return() sentinel");
        Promise.coroutine.returnSentinel = reason;
        this._promise._attachExtraTrace(reason);
        this._promise._pushContext();
        result = tryCatch(this._generator["throw"]).call(this._generator,
                                                         reason);
        this._promise._popContext();
    } else {
        this._promise._pushContext();
        result = tryCatch(this._generator["return"]).call(this._generator,
                                                          undefined);
        this._promise._popContext();
    }
    this._cancellationPhase = true;
    this._yieldedPromise = null;
    this._continue(result);
};

PromiseSpawn.prototype._promiseFulfilled = function(value) {
    this._yieldedPromise = null;
    this._promise._pushContext();
    var result = tryCatch(this._generator.next).call(this._generator, value);
    this._promise._popContext();
    this._continue(result);
};

PromiseSpawn.prototype._promiseRejected = function(reason) {
    this._yieldedPromise = null;
    this._promise._attachExtraTrace(reason);
    this._promise._pushContext();
    var result = tryCatch(this._generator["throw"])
        .call(this._generator, reason);
    this._promise._popContext();
    this._continue(result);
};

PromiseSpawn.prototype._resultCancelled = function() {
    if (this._yieldedPromise instanceof Promise) {
        var promise = this._yieldedPromise;
        this._yieldedPromise = null;
        promise.cancel();
    }
};

PromiseSpawn.prototype.promise = function () {
    return this._promise;
};

PromiseSpawn.prototype._run = function () {
    this._generator = this._generatorFunction.call(this._receiver);
    this._receiver =
        this._generatorFunction = undefined;
    this._promiseFulfilled(undefined);
};

PromiseSpawn.prototype._continue = function (result) {
    var promise = this._promise;
    if (result === errorObj) {
        this._cleanup();
        if (this._cancellationPhase) {
            return promise.cancel();
        } else {
            return promise._rejectCallback(result.e, false);
        }
    }

    var value = result.value;
    if (result.done === true) {
        this._cleanup();
        if (this._cancellationPhase) {
            return promise.cancel();
        } else {
            return promise._resolveCallback(value);
        }
    } else {
        var maybePromise = tryConvertToPromise(value, this._promise);
        if (!(maybePromise instanceof Promise)) {
            maybePromise =
                promiseFromYieldHandler(maybePromise,
                                        this._yieldHandlers,
                                        this._promise);
            if (maybePromise === null) {
                this._promiseRejected(
                    new TypeError(
                        "A value %s was yielded that could not be treated as a promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a\u000a".replace("%s", String(value)) +
                        "From coroutine:\u000a" +
                        this._stack.split("\n").slice(1, -7).join("\n")
                    )
                );
                return;
            }
        }
        maybePromise = maybePromise._target();
        var bitField = maybePromise._bitField;
        ;
        if (((bitField & 50397184) === 0)) {
            this._yieldedPromise = maybePromise;
            maybePromise._proxy(this, null);
        } else if (((bitField & 33554432) !== 0)) {
            Promise._async.invoke(
                this._promiseFulfilled, this, maybePromise._value()
            );
        } else if (((bitField & 16777216) !== 0)) {
            Promise._async.invoke(
                this._promiseRejected, this, maybePromise._reason()
            );
        } else {
            this._promiseCancelled();
        }
    }
};

Promise.coroutine = function (generatorFunction, options) {
    if (typeof generatorFunction !== "function") {
        throw new TypeError("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    var yieldHandler = Object(options).yieldHandler;
    var PromiseSpawn$ = PromiseSpawn;
    var stack = new Error().stack;
    return function () {
        var generator = generatorFunction.apply(this, arguments);
        var spawn = new PromiseSpawn$(undefined, undefined, yieldHandler,
                                      stack);
        var ret = spawn.promise();
        spawn._generator = generator;
        spawn._promiseFulfilled(undefined);
        return ret;
    };
};

Promise.coroutine.addYieldHandler = function(fn) {
    if (typeof fn !== "function") {
        throw new TypeError("expecting a function but got " + util.classString(fn));
    }
    yieldHandlers.push(fn);
};

Promise.spawn = function (generatorFunction) {
    debug.deprecated("Promise.spawn()", "Promise.coroutine()");
    if (typeof generatorFunction !== "function") {
        return apiRejection("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    var spawn = new PromiseSpawn(generatorFunction, this);
    var ret = spawn.promise();
    spawn._run(Promise.spawn);
    return ret;
};
};

},{"./errors":12,"./util":36}],17:[function(_dereq_,module,exports){
"use strict";
module.exports =
function(Promise, PromiseArray, tryConvertToPromise, INTERNAL, async,
         getDomain) {
var util = _dereq_("./util");
var canEvaluate = util.canEvaluate;
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;
var reject;

if (!true) {
if (canEvaluate) {
    var thenCallback = function(i) {
        return new Function("value", "holder", "                             \n\
            'use strict';                                                    \n\
            holder.pIndex = value;                                           \n\
            holder.checkFulfillment(this);                                   \n\
            ".replace(/Index/g, i));
    };

    var promiseSetter = function(i) {
        return new Function("promise", "holder", "                           \n\
            'use strict';                                                    \n\
            holder.pIndex = promise;                                         \n\
            ".replace(/Index/g, i));
    };

    var generateHolderClass = function(total) {
        var props = new Array(total);
        for (var i = 0; i < props.length; ++i) {
            props[i] = "this.p" + (i+1);
        }
        var assignment = props.join(" = ") + " = null;";
        var cancellationCode= "var promise;\n" + props.map(function(prop) {
            return "                                                         \n\
                promise = " + prop + ";                                      \n\
                if (promise instanceof Promise) {                            \n\
                    promise.cancel();                                        \n\
                }                                                            \n\
            ";
        }).join("\n");
        var passedArguments = props.join(", ");
        var name = "Holder$" + total;


        var code = "return function(tryCatch, errorObj, Promise, async) {    \n\
            'use strict';                                                    \n\
            function [TheName](fn) {                                         \n\
                [TheProperties]                                              \n\
                this.fn = fn;                                                \n\
                this.asyncNeeded = true;                                     \n\
                this.now = 0;                                                \n\
            }                                                                \n\
                                                                             \n\
            [TheName].prototype._callFunction = function(promise) {          \n\
                promise._pushContext();                                      \n\
                var ret = tryCatch(this.fn)([ThePassedArguments]);           \n\
                promise._popContext();                                       \n\
                if (ret === errorObj) {                                      \n\
                    promise._rejectCallback(ret.e, false);                   \n\
                } else {                                                     \n\
                    promise._resolveCallback(ret);                           \n\
                }                                                            \n\
            };                                                               \n\
                                                                             \n\
            [TheName].prototype.checkFulfillment = function(promise) {       \n\
                var now = ++this.now;                                        \n\
                if (now === [TheTotal]) {                                    \n\
                    if (this.asyncNeeded) {                                  \n\
                        async.invoke(this._callFunction, this, promise);     \n\
                    } else {                                                 \n\
                        this._callFunction(promise);                         \n\
                    }                                                        \n\
                                                                             \n\
                }                                                            \n\
            };                                                               \n\
                                                                             \n\
            [TheName].prototype._resultCancelled = function() {              \n\
                [CancellationCode]                                           \n\
            };                                                               \n\
                                                                             \n\
            return [TheName];                                                \n\
        }(tryCatch, errorObj, Promise, async);                               \n\
        ";

        code = code.replace(/\[TheName\]/g, name)
            .replace(/\[TheTotal\]/g, total)
            .replace(/\[ThePassedArguments\]/g, passedArguments)
            .replace(/\[TheProperties\]/g, assignment)
            .replace(/\[CancellationCode\]/g, cancellationCode);

        return new Function("tryCatch", "errorObj", "Promise", "async", code)
                           (tryCatch, errorObj, Promise, async);
    };

    var holderClasses = [];
    var thenCallbacks = [];
    var promiseSetters = [];

    for (var i = 0; i < 8; ++i) {
        holderClasses.push(generateHolderClass(i + 1));
        thenCallbacks.push(thenCallback(i + 1));
        promiseSetters.push(promiseSetter(i + 1));
    }

    reject = function (reason) {
        this._reject(reason);
    };
}}

Promise.join = function () {
    var last = arguments.length - 1;
    var fn;
    if (last > 0 && typeof arguments[last] === "function") {
        fn = arguments[last];
        if (!true) {
            if (last <= 8 && canEvaluate) {
                var ret = new Promise(INTERNAL);
                ret._captureStackTrace();
                var HolderClass = holderClasses[last - 1];
                var holder = new HolderClass(fn);
                var callbacks = thenCallbacks;

                for (var i = 0; i < last; ++i) {
                    var maybePromise = tryConvertToPromise(arguments[i], ret);
                    if (maybePromise instanceof Promise) {
                        maybePromise = maybePromise._target();
                        var bitField = maybePromise._bitField;
                        ;
                        if (((bitField & 50397184) === 0)) {
                            maybePromise._then(callbacks[i], reject,
                                               undefined, ret, holder);
                            promiseSetters[i](maybePromise, holder);
                            holder.asyncNeeded = false;
                        } else if (((bitField & 33554432) !== 0)) {
                            callbacks[i].call(ret,
                                              maybePromise._value(), holder);
                        } else if (((bitField & 16777216) !== 0)) {
                            ret._reject(maybePromise._reason());
                        } else {
                            ret._cancel();
                        }
                    } else {
                        callbacks[i].call(ret, maybePromise, holder);
                    }
                }

                if (!ret._isFateSealed()) {
                    if (holder.asyncNeeded) {
                        var domain = getDomain();
                        if (domain !== null) {
                            holder.fn = util.domainBind(domain, holder.fn);
                        }
                    }
                    ret._setAsyncGuaranteed();
                    ret._setOnCancel(holder);
                }
                return ret;
            }
        }
    }
    var args = [].slice.call(arguments);;
    if (fn) args.pop();
    var ret = new PromiseArray(args).promise();
    return fn !== undefined ? ret.spread(fn) : ret;
};

};

},{"./util":36}],18:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise,
                          PromiseArray,
                          apiRejection,
                          tryConvertToPromise,
                          INTERNAL,
                          debug) {
var getDomain = Promise._getDomain;
var util = _dereq_("./util");
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;
var async = Promise._async;

function MappingPromiseArray(promises, fn, limit, _filter) {
    this.constructor$(promises);
    this._promise._captureStackTrace();
    var domain = getDomain();
    this._callback = domain === null ? fn : util.domainBind(domain, fn);
    this._preservedValues = _filter === INTERNAL
        ? new Array(this.length())
        : null;
    this._limit = limit;
    this._inFlight = 0;
    this._queue = [];
    async.invoke(this._asyncInit, this, undefined);
}
util.inherits(MappingPromiseArray, PromiseArray);

MappingPromiseArray.prototype._asyncInit = function() {
    this._init$(undefined, -2);
};

MappingPromiseArray.prototype._init = function () {};

MappingPromiseArray.prototype._promiseFulfilled = function (value, index) {
    var values = this._values;
    var length = this.length();
    var preservedValues = this._preservedValues;
    var limit = this._limit;

    if (index < 0) {
        index = (index * -1) - 1;
        values[index] = value;
        if (limit >= 1) {
            this._inFlight--;
            this._drainQueue();
            if (this._isResolved()) return true;
        }
    } else {
        if (limit >= 1 && this._inFlight >= limit) {
            values[index] = value;
            this._queue.push(index);
            return false;
        }
        if (preservedValues !== null) preservedValues[index] = value;

        var promise = this._promise;
        var callback = this._callback;
        var receiver = promise._boundValue();
        promise._pushContext();
        var ret = tryCatch(callback).call(receiver, value, index, length);
        var promiseCreated = promise._popContext();
        debug.checkForgottenReturns(
            ret,
            promiseCreated,
            preservedValues !== null ? "Promise.filter" : "Promise.map",
            promise
        );
        if (ret === errorObj) {
            this._reject(ret.e);
            return true;
        }

        var maybePromise = tryConvertToPromise(ret, this._promise);
        if (maybePromise instanceof Promise) {
            maybePromise = maybePromise._target();
            var bitField = maybePromise._bitField;
            ;
            if (((bitField & 50397184) === 0)) {
                if (limit >= 1) this._inFlight++;
                values[index] = maybePromise;
                maybePromise._proxy(this, (index + 1) * -1);
                return false;
            } else if (((bitField & 33554432) !== 0)) {
                ret = maybePromise._value();
            } else if (((bitField & 16777216) !== 0)) {
                this._reject(maybePromise._reason());
                return true;
            } else {
                this._cancel();
                return true;
            }
        }
        values[index] = ret;
    }
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= length) {
        if (preservedValues !== null) {
            this._filter(values, preservedValues);
        } else {
            this._resolve(values);
        }
        return true;
    }
    return false;
};

MappingPromiseArray.prototype._drainQueue = function () {
    var queue = this._queue;
    var limit = this._limit;
    var values = this._values;
    while (queue.length > 0 && this._inFlight < limit) {
        if (this._isResolved()) return;
        var index = queue.pop();
        this._promiseFulfilled(values[index], index);
    }
};

MappingPromiseArray.prototype._filter = function (booleans, values) {
    var len = values.length;
    var ret = new Array(len);
    var j = 0;
    for (var i = 0; i < len; ++i) {
        if (booleans[i]) ret[j++] = values[i];
    }
    ret.length = j;
    this._resolve(ret);
};

MappingPromiseArray.prototype.preservedValues = function () {
    return this._preservedValues;
};

function map(promises, fn, options, _filter) {
    if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util.classString(fn));
    }

    var limit = 0;
    if (options !== undefined) {
        if (typeof options === "object" && options !== null) {
            if (typeof options.concurrency !== "number") {
                return Promise.reject(
                    new TypeError("'concurrency' must be a number but it is " +
                                    util.classString(options.concurrency)));
            }
            limit = options.concurrency;
        } else {
            return Promise.reject(new TypeError(
                            "options argument must be an object but it is " +
                             util.classString(options)));
        }
    }
    limit = typeof limit === "number" &&
        isFinite(limit) && limit >= 1 ? limit : 0;
    return new MappingPromiseArray(promises, fn, limit, _filter).promise();
}

Promise.prototype.map = function (fn, options) {
    return map(this, fn, options, null);
};

Promise.map = function (promises, fn, options, _filter) {
    return map(promises, fn, options, _filter);
};


};

},{"./util":36}],19:[function(_dereq_,module,exports){
"use strict";
module.exports =
function(Promise, INTERNAL, tryConvertToPromise, apiRejection, debug) {
var util = _dereq_("./util");
var tryCatch = util.tryCatch;

Promise.method = function (fn) {
    if (typeof fn !== "function") {
        throw new Promise.TypeError("expecting a function but got " + util.classString(fn));
    }
    return function () {
        var ret = new Promise(INTERNAL);
        ret._captureStackTrace();
        ret._pushContext();
        var value = tryCatch(fn).apply(this, arguments);
        var promiseCreated = ret._popContext();
        debug.checkForgottenReturns(
            value, promiseCreated, "Promise.method", ret);
        ret._resolveFromSyncValue(value);
        return ret;
    };
};

Promise.attempt = Promise["try"] = function (fn) {
    if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util.classString(fn));
    }
    var ret = new Promise(INTERNAL);
    ret._captureStackTrace();
    ret._pushContext();
    var value;
    if (arguments.length > 1) {
        debug.deprecated("calling Promise.try with more than 1 argument");
        var arg = arguments[1];
        var ctx = arguments[2];
        value = util.isArray(arg) ? tryCatch(fn).apply(ctx, arg)
                                  : tryCatch(fn).call(ctx, arg);
    } else {
        value = tryCatch(fn)();
    }
    var promiseCreated = ret._popContext();
    debug.checkForgottenReturns(
        value, promiseCreated, "Promise.try", ret);
    ret._resolveFromSyncValue(value);
    return ret;
};

Promise.prototype._resolveFromSyncValue = function (value) {
    if (value === util.errorObj) {
        this._rejectCallback(value.e, false);
    } else {
        this._resolveCallback(value, true);
    }
};
};

},{"./util":36}],20:[function(_dereq_,module,exports){
"use strict";
var util = _dereq_("./util");
var maybeWrapAsError = util.maybeWrapAsError;
var errors = _dereq_("./errors");
var OperationalError = errors.OperationalError;
var es5 = _dereq_("./es5");

function isUntypedError(obj) {
    return obj instanceof Error &&
        es5.getPrototypeOf(obj) === Error.prototype;
}

var rErrorKey = /^(?:name|message|stack|cause)$/;
function wrapAsOperationalError(obj) {
    var ret;
    if (isUntypedError(obj)) {
        ret = new OperationalError(obj);
        ret.name = obj.name;
        ret.message = obj.message;
        ret.stack = obj.stack;
        var keys = es5.keys(obj);
        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!rErrorKey.test(key)) {
                ret[key] = obj[key];
            }
        }
        return ret;
    }
    util.markAsOriginatingFromRejection(obj);
    return obj;
}

function nodebackForPromise(promise, multiArgs) {
    return function(err, value) {
        if (promise === null) return;
        if (err) {
            var wrapped = wrapAsOperationalError(maybeWrapAsError(err));
            promise._attachExtraTrace(wrapped);
            promise._reject(wrapped);
        } else if (!multiArgs) {
            promise._fulfill(value);
        } else {
            var args = [].slice.call(arguments, 1);;
            promise._fulfill(args);
        }
        promise = null;
    };
}

module.exports = nodebackForPromise;

},{"./errors":12,"./es5":13,"./util":36}],21:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
var util = _dereq_("./util");
var async = Promise._async;
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;

function spreadAdapter(val, nodeback) {
    var promise = this;
    if (!util.isArray(val)) return successAdapter.call(promise, val, nodeback);
    var ret =
        tryCatch(nodeback).apply(promise._boundValue(), [null].concat(val));
    if (ret === errorObj) {
        async.throwLater(ret.e);
    }
}

function successAdapter(val, nodeback) {
    var promise = this;
    var receiver = promise._boundValue();
    var ret = val === undefined
        ? tryCatch(nodeback).call(receiver, null)
        : tryCatch(nodeback).call(receiver, null, val);
    if (ret === errorObj) {
        async.throwLater(ret.e);
    }
}
function errorAdapter(reason, nodeback) {
    var promise = this;
    if (!reason) {
        var newReason = new Error(reason + "");
        newReason.cause = reason;
        reason = newReason;
    }
    var ret = tryCatch(nodeback).call(promise._boundValue(), reason);
    if (ret === errorObj) {
        async.throwLater(ret.e);
    }
}

Promise.prototype.asCallback = Promise.prototype.nodeify = function (nodeback,
                                                                     options) {
    if (typeof nodeback == "function") {
        var adapter = successAdapter;
        if (options !== undefined && Object(options).spread) {
            adapter = spreadAdapter;
        }
        this._then(
            adapter,
            errorAdapter,
            undefined,
            this,
            nodeback
        );
    }
    return this;
};
};

},{"./util":36}],22:[function(_dereq_,module,exports){
"use strict";
module.exports = function() {
var makeSelfResolutionError = function () {
    return new TypeError("circular promise resolution chain\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
};
var reflectHandler = function() {
    return new Promise.PromiseInspection(this._target());
};
var apiRejection = function(msg) {
    return Promise.reject(new TypeError(msg));
};
function Proxyable() {}
var UNDEFINED_BINDING = {};
var util = _dereq_("./util");

var getDomain;
if (util.isNode) {
    getDomain = function() {
        var ret = process.domain;
        if (ret === undefined) ret = null;
        return ret;
    };
} else {
    getDomain = function() {
        return null;
    };
}
util.notEnumerableProp(Promise, "_getDomain", getDomain);

var es5 = _dereq_("./es5");
var Async = _dereq_("./async");
var async = new Async();
es5.defineProperty(Promise, "_async", {value: async});
var errors = _dereq_("./errors");
var TypeError = Promise.TypeError = errors.TypeError;
Promise.RangeError = errors.RangeError;
var CancellationError = Promise.CancellationError = errors.CancellationError;
Promise.TimeoutError = errors.TimeoutError;
Promise.OperationalError = errors.OperationalError;
Promise.RejectionError = errors.OperationalError;
Promise.AggregateError = errors.AggregateError;
var INTERNAL = function(){};
var APPLY = {};
var NEXT_FILTER = {};
var tryConvertToPromise = _dereq_("./thenables")(Promise, INTERNAL);
var PromiseArray =
    _dereq_("./promise_array")(Promise, INTERNAL,
                               tryConvertToPromise, apiRejection, Proxyable);
var Context = _dereq_("./context")(Promise);
 /*jshint unused:false*/
var createContext = Context.create;
var debug = _dereq_("./debuggability")(Promise, Context);
var CapturedTrace = debug.CapturedTrace;
var PassThroughHandlerContext =
    _dereq_("./finally")(Promise, tryConvertToPromise, NEXT_FILTER);
var catchFilter = _dereq_("./catch_filter")(NEXT_FILTER);
var nodebackForPromise = _dereq_("./nodeback");
var errorObj = util.errorObj;
var tryCatch = util.tryCatch;
function check(self, executor) {
    if (self == null || self.constructor !== Promise) {
        throw new TypeError("the promise constructor cannot be invoked directly\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    if (typeof executor !== "function") {
        throw new TypeError("expecting a function but got " + util.classString(executor));
    }

}

function Promise(executor) {
    if (executor !== INTERNAL) {
        check(this, executor);
    }
    this._bitField = 0;
    this._fulfillmentHandler0 = undefined;
    this._rejectionHandler0 = undefined;
    this._promise0 = undefined;
    this._receiver0 = undefined;
    this._resolveFromExecutor(executor);
    this._promiseCreated();
    this._fireEvent("promiseCreated", this);
}

Promise.prototype.toString = function () {
    return "[object Promise]";
};

Promise.prototype.caught = Promise.prototype["catch"] = function (fn) {
    var len = arguments.length;
    if (len > 1) {
        var catchInstances = new Array(len - 1),
            j = 0, i;
        for (i = 0; i < len - 1; ++i) {
            var item = arguments[i];
            if (util.isObject(item)) {
                catchInstances[j++] = item;
            } else {
                return apiRejection("Catch statement predicate: " +
                    "expecting an object but got " + util.classString(item));
            }
        }
        catchInstances.length = j;
        fn = arguments[i];
        return this.then(undefined, catchFilter(catchInstances, fn, this));
    }
    return this.then(undefined, fn);
};

Promise.prototype.reflect = function () {
    return this._then(reflectHandler,
        reflectHandler, undefined, this, undefined);
};

Promise.prototype.then = function (didFulfill, didReject) {
    if (debug.warnings() && arguments.length > 0 &&
        typeof didFulfill !== "function" &&
        typeof didReject !== "function") {
        var msg = ".then() only accepts functions but was passed: " +
                util.classString(didFulfill);
        if (arguments.length > 1) {
            msg += ", " + util.classString(didReject);
        }
        this._warn(msg);
    }
    return this._then(didFulfill, didReject, undefined, undefined, undefined);
};

Promise.prototype.done = function (didFulfill, didReject) {
    var promise =
        this._then(didFulfill, didReject, undefined, undefined, undefined);
    promise._setIsFinal();
};

Promise.prototype.spread = function (fn) {
    if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util.classString(fn));
    }
    return this.all()._then(fn, undefined, undefined, APPLY, undefined);
};

Promise.prototype.toJSON = function () {
    var ret = {
        isFulfilled: false,
        isRejected: false,
        fulfillmentValue: undefined,
        rejectionReason: undefined
    };
    if (this.isFulfilled()) {
        ret.fulfillmentValue = this.value();
        ret.isFulfilled = true;
    } else if (this.isRejected()) {
        ret.rejectionReason = this.reason();
        ret.isRejected = true;
    }
    return ret;
};

Promise.prototype.all = function () {
    if (arguments.length > 0) {
        this._warn(".all() was passed arguments but it does not take any");
    }
    return new PromiseArray(this).promise();
};

Promise.prototype.error = function (fn) {
    return this.caught(util.originatesFromRejection, fn);
};

Promise.getNewLibraryCopy = module.exports;

Promise.is = function (val) {
    return val instanceof Promise;
};

Promise.fromNode = Promise.fromCallback = function(fn) {
    var ret = new Promise(INTERNAL);
    ret._captureStackTrace();
    var multiArgs = arguments.length > 1 ? !!Object(arguments[1]).multiArgs
                                         : false;
    var result = tryCatch(fn)(nodebackForPromise(ret, multiArgs));
    if (result === errorObj) {
        ret._rejectCallback(result.e, true);
    }
    if (!ret._isFateSealed()) ret._setAsyncGuaranteed();
    return ret;
};

Promise.all = function (promises) {
    return new PromiseArray(promises).promise();
};

Promise.cast = function (obj) {
    var ret = tryConvertToPromise(obj);
    if (!(ret instanceof Promise)) {
        ret = new Promise(INTERNAL);
        ret._captureStackTrace();
        ret._setFulfilled();
        ret._rejectionHandler0 = obj;
    }
    return ret;
};

Promise.resolve = Promise.fulfilled = Promise.cast;

Promise.reject = Promise.rejected = function (reason) {
    var ret = new Promise(INTERNAL);
    ret._captureStackTrace();
    ret._rejectCallback(reason, true);
    return ret;
};

Promise.setScheduler = function(fn) {
    if (typeof fn !== "function") {
        throw new TypeError("expecting a function but got " + util.classString(fn));
    }
    return async.setScheduler(fn);
};

Promise.prototype._then = function (
    didFulfill,
    didReject,
    _,    receiver,
    internalData
) {
    var haveInternalData = internalData !== undefined;
    var promise = haveInternalData ? internalData : new Promise(INTERNAL);
    var target = this._target();
    var bitField = target._bitField;

    if (!haveInternalData) {
        promise._propagateFrom(this, 3);
        promise._captureStackTrace();
        if (receiver === undefined &&
            ((this._bitField & 2097152) !== 0)) {
            if (!((bitField & 50397184) === 0)) {
                receiver = this._boundValue();
            } else {
                receiver = target === this ? undefined : this._boundTo;
            }
        }
        this._fireEvent("promiseChained", this, promise);
    }

    var domain = getDomain();
    if (!((bitField & 50397184) === 0)) {
        var handler, value, settler = target._settlePromiseCtx;
        if (((bitField & 33554432) !== 0)) {
            value = target._rejectionHandler0;
            handler = didFulfill;
        } else if (((bitField & 16777216) !== 0)) {
            value = target._fulfillmentHandler0;
            handler = didReject;
            target._unsetRejectionIsUnhandled();
        } else {
            settler = target._settlePromiseLateCancellationObserver;
            value = new CancellationError("late cancellation observer");
            target._attachExtraTrace(value);
            handler = didReject;
        }

        async.invoke(settler, target, {
            handler: domain === null ? handler
                : (typeof handler === "function" &&
                    util.domainBind(domain, handler)),
            promise: promise,
            receiver: receiver,
            value: value
        });
    } else {
        target._addCallbacks(didFulfill, didReject, promise, receiver, domain);
    }

    return promise;
};

Promise.prototype._length = function () {
    return this._bitField & 65535;
};

Promise.prototype._isFateSealed = function () {
    return (this._bitField & 117506048) !== 0;
};

Promise.prototype._isFollowing = function () {
    return (this._bitField & 67108864) === 67108864;
};

Promise.prototype._setLength = function (len) {
    this._bitField = (this._bitField & -65536) |
        (len & 65535);
};

Promise.prototype._setFulfilled = function () {
    this._bitField = this._bitField | 33554432;
    this._fireEvent("promiseFulfilled", this);
};

Promise.prototype._setRejected = function () {
    this._bitField = this._bitField | 16777216;
    this._fireEvent("promiseRejected", this);
};

Promise.prototype._setFollowing = function () {
    this._bitField = this._bitField | 67108864;
    this._fireEvent("promiseResolved", this);
};

Promise.prototype._setIsFinal = function () {
    this._bitField = this._bitField | 4194304;
};

Promise.prototype._isFinal = function () {
    return (this._bitField & 4194304) > 0;
};

Promise.prototype._unsetCancelled = function() {
    this._bitField = this._bitField & (~65536);
};

Promise.prototype._setCancelled = function() {
    this._bitField = this._bitField | 65536;
    this._fireEvent("promiseCancelled", this);
};

Promise.prototype._setWillBeCancelled = function() {
    this._bitField = this._bitField | 8388608;
};

Promise.prototype._setAsyncGuaranteed = function() {
    if (async.hasCustomScheduler()) return;
    this._bitField = this._bitField | 134217728;
};

Promise.prototype._receiverAt = function (index) {
    var ret = index === 0 ? this._receiver0 : this[
            index * 4 - 4 + 3];
    if (ret === UNDEFINED_BINDING) {
        return undefined;
    } else if (ret === undefined && this._isBound()) {
        return this._boundValue();
    }
    return ret;
};

Promise.prototype._promiseAt = function (index) {
    return this[
            index * 4 - 4 + 2];
};

Promise.prototype._fulfillmentHandlerAt = function (index) {
    return this[
            index * 4 - 4 + 0];
};

Promise.prototype._rejectionHandlerAt = function (index) {
    return this[
            index * 4 - 4 + 1];
};

Promise.prototype._boundValue = function() {};

Promise.prototype._migrateCallback0 = function (follower) {
    var bitField = follower._bitField;
    var fulfill = follower._fulfillmentHandler0;
    var reject = follower._rejectionHandler0;
    var promise = follower._promise0;
    var receiver = follower._receiverAt(0);
    if (receiver === undefined) receiver = UNDEFINED_BINDING;
    this._addCallbacks(fulfill, reject, promise, receiver, null);
};

Promise.prototype._migrateCallbackAt = function (follower, index) {
    var fulfill = follower._fulfillmentHandlerAt(index);
    var reject = follower._rejectionHandlerAt(index);
    var promise = follower._promiseAt(index);
    var receiver = follower._receiverAt(index);
    if (receiver === undefined) receiver = UNDEFINED_BINDING;
    this._addCallbacks(fulfill, reject, promise, receiver, null);
};

Promise.prototype._addCallbacks = function (
    fulfill,
    reject,
    promise,
    receiver,
    domain
) {
    var index = this._length();

    if (index >= 65535 - 4) {
        index = 0;
        this._setLength(0);
    }

    if (index === 0) {
        this._promise0 = promise;
        this._receiver0 = receiver;
        if (typeof fulfill === "function") {
            this._fulfillmentHandler0 =
                domain === null ? fulfill : util.domainBind(domain, fulfill);
        }
        if (typeof reject === "function") {
            this._rejectionHandler0 =
                domain === null ? reject : util.domainBind(domain, reject);
        }
    } else {
        var base = index * 4 - 4;
        this[base + 2] = promise;
        this[base + 3] = receiver;
        if (typeof fulfill === "function") {
            this[base + 0] =
                domain === null ? fulfill : util.domainBind(domain, fulfill);
        }
        if (typeof reject === "function") {
            this[base + 1] =
                domain === null ? reject : util.domainBind(domain, reject);
        }
    }
    this._setLength(index + 1);
    return index;
};

Promise.prototype._proxy = function (proxyable, arg) {
    this._addCallbacks(undefined, undefined, arg, proxyable, null);
};

Promise.prototype._resolveCallback = function(value, shouldBind) {
    if (((this._bitField & 117506048) !== 0)) return;
    if (value === this)
        return this._rejectCallback(makeSelfResolutionError(), false);
    var maybePromise = tryConvertToPromise(value, this);
    if (!(maybePromise instanceof Promise)) return this._fulfill(value);

    if (shouldBind) this._propagateFrom(maybePromise, 2);

    var promise = maybePromise._target();

    if (promise === this) {
        this._reject(makeSelfResolutionError());
        return;
    }

    var bitField = promise._bitField;
    if (((bitField & 50397184) === 0)) {
        var len = this._length();
        if (len > 0) promise._migrateCallback0(this);
        for (var i = 1; i < len; ++i) {
            promise._migrateCallbackAt(this, i);
        }
        this._setFollowing();
        this._setLength(0);
        this._setFollowee(promise);
    } else if (((bitField & 33554432) !== 0)) {
        this._fulfill(promise._value());
    } else if (((bitField & 16777216) !== 0)) {
        this._reject(promise._reason());
    } else {
        var reason = new CancellationError("late cancellation observer");
        promise._attachExtraTrace(reason);
        this._reject(reason);
    }
};

Promise.prototype._rejectCallback =
function(reason, synchronous, ignoreNonErrorWarnings) {
    var trace = util.ensureErrorObject(reason);
    var hasStack = trace === reason;
    if (!hasStack && !ignoreNonErrorWarnings && debug.warnings()) {
        var message = "a promise was rejected with a non-error: " +
            util.classString(reason);
        this._warn(message, true);
    }
    this._attachExtraTrace(trace, synchronous ? hasStack : false);
    this._reject(reason);
};

Promise.prototype._resolveFromExecutor = function (executor) {
    if (executor === INTERNAL) return;
    var promise = this;
    this._captureStackTrace();
    this._pushContext();
    var synchronous = true;
    var r = this._execute(executor, function(value) {
        promise._resolveCallback(value);
    }, function (reason) {
        promise._rejectCallback(reason, synchronous);
    });
    synchronous = false;
    this._popContext();

    if (r !== undefined) {
        promise._rejectCallback(r, true);
    }
};

Promise.prototype._settlePromiseFromHandler = function (
    handler, receiver, value, promise
) {
    var bitField = promise._bitField;
    if (((bitField & 65536) !== 0)) return;
    promise._pushContext();
    var x;
    if (receiver === APPLY) {
        if (!value || typeof value.length !== "number") {
            x = errorObj;
            x.e = new TypeError("cannot .spread() a non-array: " +
                                    util.classString(value));
        } else {
            x = tryCatch(handler).apply(this._boundValue(), value);
        }
    } else {
        x = tryCatch(handler).call(receiver, value);
    }
    var promiseCreated = promise._popContext();
    bitField = promise._bitField;
    if (((bitField & 65536) !== 0)) return;

    if (x === NEXT_FILTER) {
        promise._reject(value);
    } else if (x === errorObj) {
        promise._rejectCallback(x.e, false);
    } else {
        debug.checkForgottenReturns(x, promiseCreated, "",  promise, this);
        promise._resolveCallback(x);
    }
};

Promise.prototype._target = function() {
    var ret = this;
    while (ret._isFollowing()) ret = ret._followee();
    return ret;
};

Promise.prototype._followee = function() {
    return this._rejectionHandler0;
};

Promise.prototype._setFollowee = function(promise) {
    this._rejectionHandler0 = promise;
};

Promise.prototype._settlePromise = function(promise, handler, receiver, value) {
    var isPromise = promise instanceof Promise;
    var bitField = this._bitField;
    var asyncGuaranteed = ((bitField & 134217728) !== 0);
    if (((bitField & 65536) !== 0)) {
        if (isPromise) promise._invokeInternalOnCancel();

        if (receiver instanceof PassThroughHandlerContext &&
            receiver.isFinallyHandler()) {
            receiver.cancelPromise = promise;
            if (tryCatch(handler).call(receiver, value) === errorObj) {
                promise._reject(errorObj.e);
            }
        } else if (handler === reflectHandler) {
            promise._fulfill(reflectHandler.call(receiver));
        } else if (receiver instanceof Proxyable) {
            receiver._promiseCancelled(promise);
        } else if (isPromise || promise instanceof PromiseArray) {
            promise._cancel();
        } else {
            receiver.cancel();
        }
    } else if (typeof handler === "function") {
        if (!isPromise) {
            handler.call(receiver, value, promise);
        } else {
            if (asyncGuaranteed) promise._setAsyncGuaranteed();
            this._settlePromiseFromHandler(handler, receiver, value, promise);
        }
    } else if (receiver instanceof Proxyable) {
        if (!receiver._isResolved()) {
            if (((bitField & 33554432) !== 0)) {
                receiver._promiseFulfilled(value, promise);
            } else {
                receiver._promiseRejected(value, promise);
            }
        }
    } else if (isPromise) {
        if (asyncGuaranteed) promise._setAsyncGuaranteed();
        if (((bitField & 33554432) !== 0)) {
            promise._fulfill(value);
        } else {
            promise._reject(value);
        }
    }
};

Promise.prototype._settlePromiseLateCancellationObserver = function(ctx) {
    var handler = ctx.handler;
    var promise = ctx.promise;
    var receiver = ctx.receiver;
    var value = ctx.value;
    if (typeof handler === "function") {
        if (!(promise instanceof Promise)) {
            handler.call(receiver, value, promise);
        } else {
            this._settlePromiseFromHandler(handler, receiver, value, promise);
        }
    } else if (promise instanceof Promise) {
        promise._reject(value);
    }
};

Promise.prototype._settlePromiseCtx = function(ctx) {
    this._settlePromise(ctx.promise, ctx.handler, ctx.receiver, ctx.value);
};

Promise.prototype._settlePromise0 = function(handler, value, bitField) {
    var promise = this._promise0;
    var receiver = this._receiverAt(0);
    this._promise0 = undefined;
    this._receiver0 = undefined;
    this._settlePromise(promise, handler, receiver, value);
};

Promise.prototype._clearCallbackDataAtIndex = function(index) {
    var base = index * 4 - 4;
    this[base + 2] =
    this[base + 3] =
    this[base + 0] =
    this[base + 1] = undefined;
};

Promise.prototype._fulfill = function (value) {
    var bitField = this._bitField;
    if (((bitField & 117506048) >>> 16)) return;
    if (value === this) {
        var err = makeSelfResolutionError();
        this._attachExtraTrace(err);
        return this._reject(err);
    }
    this._setFulfilled();
    this._rejectionHandler0 = value;

    if ((bitField & 65535) > 0) {
        if (((bitField & 134217728) !== 0)) {
            this._settlePromises();
        } else {
            async.settlePromises(this);
        }
    }
};

Promise.prototype._reject = function (reason) {
    var bitField = this._bitField;
    if (((bitField & 117506048) >>> 16)) return;
    this._setRejected();
    this._fulfillmentHandler0 = reason;

    if (this._isFinal()) {
        return async.fatalError(reason, util.isNode);
    }

    if ((bitField & 65535) > 0) {
        async.settlePromises(this);
    } else {
        this._ensurePossibleRejectionHandled();
    }
};

Promise.prototype._fulfillPromises = function (len, value) {
    for (var i = 1; i < len; i++) {
        var handler = this._fulfillmentHandlerAt(i);
        var promise = this._promiseAt(i);
        var receiver = this._receiverAt(i);
        this._clearCallbackDataAtIndex(i);
        this._settlePromise(promise, handler, receiver, value);
    }
};

Promise.prototype._rejectPromises = function (len, reason) {
    for (var i = 1; i < len; i++) {
        var handler = this._rejectionHandlerAt(i);
        var promise = this._promiseAt(i);
        var receiver = this._receiverAt(i);
        this._clearCallbackDataAtIndex(i);
        this._settlePromise(promise, handler, receiver, reason);
    }
};

Promise.prototype._settlePromises = function () {
    var bitField = this._bitField;
    var len = (bitField & 65535);

    if (len > 0) {
        if (((bitField & 16842752) !== 0)) {
            var reason = this._fulfillmentHandler0;
            this._settlePromise0(this._rejectionHandler0, reason, bitField);
            this._rejectPromises(len, reason);
        } else {
            var value = this._rejectionHandler0;
            this._settlePromise0(this._fulfillmentHandler0, value, bitField);
            this._fulfillPromises(len, value);
        }
        this._setLength(0);
    }
    this._clearCancellationData();
};

Promise.prototype._settledValue = function() {
    var bitField = this._bitField;
    if (((bitField & 33554432) !== 0)) {
        return this._rejectionHandler0;
    } else if (((bitField & 16777216) !== 0)) {
        return this._fulfillmentHandler0;
    }
};

function deferResolve(v) {this.promise._resolveCallback(v);}
function deferReject(v) {this.promise._rejectCallback(v, false);}

Promise.defer = Promise.pending = function() {
    debug.deprecated("Promise.defer", "new Promise");
    var promise = new Promise(INTERNAL);
    return {
        promise: promise,
        resolve: deferResolve,
        reject: deferReject
    };
};

util.notEnumerableProp(Promise,
                       "_makeSelfResolutionError",
                       makeSelfResolutionError);

_dereq_("./method")(Promise, INTERNAL, tryConvertToPromise, apiRejection,
    debug);
_dereq_("./bind")(Promise, INTERNAL, tryConvertToPromise, debug);
_dereq_("./cancel")(Promise, PromiseArray, apiRejection, debug);
_dereq_("./direct_resolve")(Promise);
_dereq_("./synchronous_inspection")(Promise);
_dereq_("./join")(
    Promise, PromiseArray, tryConvertToPromise, INTERNAL, async, getDomain);
Promise.Promise = Promise;
Promise.version = "3.5.0";
_dereq_('./map.js')(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
_dereq_('./call_get.js')(Promise);
_dereq_('./using.js')(Promise, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug);
_dereq_('./timers.js')(Promise, INTERNAL, debug);
_dereq_('./generators.js')(Promise, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug);
_dereq_('./nodeify.js')(Promise);
_dereq_('./promisify.js')(Promise, INTERNAL);
_dereq_('./props.js')(Promise, PromiseArray, tryConvertToPromise, apiRejection);
_dereq_('./race.js')(Promise, INTERNAL, tryConvertToPromise, apiRejection);
_dereq_('./reduce.js')(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
_dereq_('./settle.js')(Promise, PromiseArray, debug);
_dereq_('./some.js')(Promise, PromiseArray, apiRejection);
_dereq_('./filter.js')(Promise, INTERNAL);
_dereq_('./each.js')(Promise, INTERNAL);
_dereq_('./any.js')(Promise);
                                                         
    util.toFastProperties(Promise);                                          
    util.toFastProperties(Promise.prototype);                                
    function fillTypes(value) {                                              
        var p = new Promise(INTERNAL);                                       
        p._fulfillmentHandler0 = value;                                      
        p._rejectionHandler0 = value;                                        
        p._promise0 = value;                                                 
        p._receiver0 = value;                                                
    }                                                                        
    // Complete slack tracking, opt out of field-type tracking and           
    // stabilize map                                                         
    fillTypes({a: 1});                                                       
    fillTypes({b: 2});                                                       
    fillTypes({c: 3});                                                       
    fillTypes(1);                                                            
    fillTypes(function(){});                                                 
    fillTypes(undefined);                                                    
    fillTypes(false);                                                        
    fillTypes(new Promise(INTERNAL));                                        
    debug.setBounds(Async.firstLineError, util.lastLineError);               
    return Promise;                                                          

};

},{"./any.js":1,"./async":2,"./bind":3,"./call_get.js":5,"./cancel":6,"./catch_filter":7,"./context":8,"./debuggability":9,"./direct_resolve":10,"./each.js":11,"./errors":12,"./es5":13,"./filter.js":14,"./finally":15,"./generators.js":16,"./join":17,"./map.js":18,"./method":19,"./nodeback":20,"./nodeify.js":21,"./promise_array":23,"./promisify.js":24,"./props.js":25,"./race.js":27,"./reduce.js":28,"./settle.js":30,"./some.js":31,"./synchronous_inspection":32,"./thenables":33,"./timers.js":34,"./using.js":35,"./util":36}],23:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL, tryConvertToPromise,
    apiRejection, Proxyable) {
var util = _dereq_("./util");
var isArray = util.isArray;

function toResolutionValue(val) {
    switch(val) {
    case -2: return [];
    case -3: return {};
    case -6: return new Map();
    }
}

function PromiseArray(values) {
    var promise = this._promise = new Promise(INTERNAL);
    if (values instanceof Promise) {
        promise._propagateFrom(values, 3);
    }
    promise._setOnCancel(this);
    this._values = values;
    this._length = 0;
    this._totalResolved = 0;
    this._init(undefined, -2);
}
util.inherits(PromiseArray, Proxyable);

PromiseArray.prototype.length = function () {
    return this._length;
};

PromiseArray.prototype.promise = function () {
    return this._promise;
};

PromiseArray.prototype._init = function init(_, resolveValueIfEmpty) {
    var values = tryConvertToPromise(this._values, this._promise);
    if (values instanceof Promise) {
        values = values._target();
        var bitField = values._bitField;
        ;
        this._values = values;

        if (((bitField & 50397184) === 0)) {
            this._promise._setAsyncGuaranteed();
            return values._then(
                init,
                this._reject,
                undefined,
                this,
                resolveValueIfEmpty
           );
        } else if (((bitField & 33554432) !== 0)) {
            values = values._value();
        } else if (((bitField & 16777216) !== 0)) {
            return this._reject(values._reason());
        } else {
            return this._cancel();
        }
    }
    values = util.asArray(values);
    if (values === null) {
        var err = apiRejection(
            "expecting an array or an iterable object but got " + util.classString(values)).reason();
        this._promise._rejectCallback(err, false);
        return;
    }

    if (values.length === 0) {
        if (resolveValueIfEmpty === -5) {
            this._resolveEmptyArray();
        }
        else {
            this._resolve(toResolutionValue(resolveValueIfEmpty));
        }
        return;
    }
    this._iterate(values);
};

PromiseArray.prototype._iterate = function(values) {
    var len = this.getActualLength(values.length);
    this._length = len;
    this._values = this.shouldCopyValues() ? new Array(len) : this._values;
    var result = this._promise;
    var isResolved = false;
    var bitField = null;
    for (var i = 0; i < len; ++i) {
        var maybePromise = tryConvertToPromise(values[i], result);

        if (maybePromise instanceof Promise) {
            maybePromise = maybePromise._target();
            bitField = maybePromise._bitField;
        } else {
            bitField = null;
        }

        if (isResolved) {
            if (bitField !== null) {
                maybePromise.suppressUnhandledRejections();
            }
        } else if (bitField !== null) {
            if (((bitField & 50397184) === 0)) {
                maybePromise._proxy(this, i);
                this._values[i] = maybePromise;
            } else if (((bitField & 33554432) !== 0)) {
                isResolved = this._promiseFulfilled(maybePromise._value(), i);
            } else if (((bitField & 16777216) !== 0)) {
                isResolved = this._promiseRejected(maybePromise._reason(), i);
            } else {
                isResolved = this._promiseCancelled(i);
            }
        } else {
            isResolved = this._promiseFulfilled(maybePromise, i);
        }
    }
    if (!isResolved) result._setAsyncGuaranteed();
};

PromiseArray.prototype._isResolved = function () {
    return this._values === null;
};

PromiseArray.prototype._resolve = function (value) {
    this._values = null;
    this._promise._fulfill(value);
};

PromiseArray.prototype._cancel = function() {
    if (this._isResolved() || !this._promise._isCancellable()) return;
    this._values = null;
    this._promise._cancel();
};

PromiseArray.prototype._reject = function (reason) {
    this._values = null;
    this._promise._rejectCallback(reason, false);
};

PromiseArray.prototype._promiseFulfilled = function (value, index) {
    this._values[index] = value;
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= this._length) {
        this._resolve(this._values);
        return true;
    }
    return false;
};

PromiseArray.prototype._promiseCancelled = function() {
    this._cancel();
    return true;
};

PromiseArray.prototype._promiseRejected = function (reason) {
    this._totalResolved++;
    this._reject(reason);
    return true;
};

PromiseArray.prototype._resultCancelled = function() {
    if (this._isResolved()) return;
    var values = this._values;
    this._cancel();
    if (values instanceof Promise) {
        values.cancel();
    } else {
        for (var i = 0; i < values.length; ++i) {
            if (values[i] instanceof Promise) {
                values[i].cancel();
            }
        }
    }
};

PromiseArray.prototype.shouldCopyValues = function () {
    return true;
};

PromiseArray.prototype.getActualLength = function (len) {
    return len;
};

return PromiseArray;
};

},{"./util":36}],24:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL) {
var THIS = {};
var util = _dereq_("./util");
var nodebackForPromise = _dereq_("./nodeback");
var withAppended = util.withAppended;
var maybeWrapAsError = util.maybeWrapAsError;
var canEvaluate = util.canEvaluate;
var TypeError = _dereq_("./errors").TypeError;
var defaultSuffix = "Async";
var defaultPromisified = {__isPromisified__: true};
var noCopyProps = [
    "arity",    "length",
    "name",
    "arguments",
    "caller",
    "callee",
    "prototype",
    "__isPromisified__"
];
var noCopyPropsPattern = new RegExp("^(?:" + noCopyProps.join("|") + ")$");

var defaultFilter = function(name) {
    return util.isIdentifier(name) &&
        name.charAt(0) !== "_" &&
        name !== "constructor";
};

function propsFilter(key) {
    return !noCopyPropsPattern.test(key);
}

function isPromisified(fn) {
    try {
        return fn.__isPromisified__ === true;
    }
    catch (e) {
        return false;
    }
}

function hasPromisified(obj, key, suffix) {
    var val = util.getDataPropertyOrDefault(obj, key + suffix,
                                            defaultPromisified);
    return val ? isPromisified(val) : false;
}
function checkValid(ret, suffix, suffixRegexp) {
    for (var i = 0; i < ret.length; i += 2) {
        var key = ret[i];
        if (suffixRegexp.test(key)) {
            var keyWithoutAsyncSuffix = key.replace(suffixRegexp, "");
            for (var j = 0; j < ret.length; j += 2) {
                if (ret[j] === keyWithoutAsyncSuffix) {
                    throw new TypeError("Cannot promisify an API that has normal methods with '%s'-suffix\u000a\u000a    See http://goo.gl/MqrFmX\u000a"
                        .replace("%s", suffix));
                }
            }
        }
    }
}

function promisifiableMethods(obj, suffix, suffixRegexp, filter) {
    var keys = util.inheritedDataKeys(obj);
    var ret = [];
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var value = obj[key];
        var passesDefaultFilter = filter === defaultFilter
            ? true : defaultFilter(key, value, obj);
        if (typeof value === "function" &&
            !isPromisified(value) &&
            !hasPromisified(obj, key, suffix) &&
            filter(key, value, obj, passesDefaultFilter)) {
            ret.push(key, value);
        }
    }
    checkValid(ret, suffix, suffixRegexp);
    return ret;
}

var escapeIdentRegex = function(str) {
    return str.replace(/([$])/, "\\$");
};

var makeNodePromisifiedEval;
if (!true) {
var switchCaseArgumentOrder = function(likelyArgumentCount) {
    var ret = [likelyArgumentCount];
    var min = Math.max(0, likelyArgumentCount - 1 - 3);
    for(var i = likelyArgumentCount - 1; i >= min; --i) {
        ret.push(i);
    }
    for(var i = likelyArgumentCount + 1; i <= 3; ++i) {
        ret.push(i);
    }
    return ret;
};

var argumentSequence = function(argumentCount) {
    return util.filledRange(argumentCount, "_arg", "");
};

var parameterDeclaration = function(parameterCount) {
    return util.filledRange(
        Math.max(parameterCount, 3), "_arg", "");
};

var parameterCount = function(fn) {
    if (typeof fn.length === "number") {
        return Math.max(Math.min(fn.length, 1023 + 1), 0);
    }
    return 0;
};

makeNodePromisifiedEval =
function(callback, receiver, originalName, fn, _, multiArgs) {
    var newParameterCount = Math.max(0, parameterCount(fn) - 1);
    var argumentOrder = switchCaseArgumentOrder(newParameterCount);
    var shouldProxyThis = typeof callback === "string" || receiver === THIS;

    function generateCallForArgumentCount(count) {
        var args = argumentSequence(count).join(", ");
        var comma = count > 0 ? ", " : "";
        var ret;
        if (shouldProxyThis) {
            ret = "ret = callback.call(this, {{args}}, nodeback); break;\n";
        } else {
            ret = receiver === undefined
                ? "ret = callback({{args}}, nodeback); break;\n"
                : "ret = callback.call(receiver, {{args}}, nodeback); break;\n";
        }
        return ret.replace("{{args}}", args).replace(", ", comma);
    }

    function generateArgumentSwitchCase() {
        var ret = "";
        for (var i = 0; i < argumentOrder.length; ++i) {
            ret += "case " + argumentOrder[i] +":" +
                generateCallForArgumentCount(argumentOrder[i]);
        }

        ret += "                                                             \n\
        default:                                                             \n\
            var args = new Array(len + 1);                                   \n\
            var i = 0;                                                       \n\
            for (var i = 0; i < len; ++i) {                                  \n\
               args[i] = arguments[i];                                       \n\
            }                                                                \n\
            args[i] = nodeback;                                              \n\
            [CodeForCall]                                                    \n\
            break;                                                           \n\
        ".replace("[CodeForCall]", (shouldProxyThis
                                ? "ret = callback.apply(this, args);\n"
                                : "ret = callback.apply(receiver, args);\n"));
        return ret;
    }

    var getFunctionCode = typeof callback === "string"
                                ? ("this != null ? this['"+callback+"'] : fn")
                                : "fn";
    var body = "'use strict';                                                \n\
        var ret = function (Parameters) {                                    \n\
            'use strict';                                                    \n\
            var len = arguments.length;                                      \n\
            var promise = new Promise(INTERNAL);                             \n\
            promise._captureStackTrace();                                    \n\
            var nodeback = nodebackForPromise(promise, " + multiArgs + ");   \n\
            var ret;                                                         \n\
            var callback = tryCatch([GetFunctionCode]);                      \n\
            switch(len) {                                                    \n\
                [CodeForSwitchCase]                                          \n\
            }                                                                \n\
            if (ret === errorObj) {                                          \n\
                promise._rejectCallback(maybeWrapAsError(ret.e), true, true);\n\
            }                                                                \n\
            if (!promise._isFateSealed()) promise._setAsyncGuaranteed();     \n\
            return promise;                                                  \n\
        };                                                                   \n\
        notEnumerableProp(ret, '__isPromisified__', true);                   \n\
        return ret;                                                          \n\
    ".replace("[CodeForSwitchCase]", generateArgumentSwitchCase())
        .replace("[GetFunctionCode]", getFunctionCode);
    body = body.replace("Parameters", parameterDeclaration(newParameterCount));
    return new Function("Promise",
                        "fn",
                        "receiver",
                        "withAppended",
                        "maybeWrapAsError",
                        "nodebackForPromise",
                        "tryCatch",
                        "errorObj",
                        "notEnumerableProp",
                        "INTERNAL",
                        body)(
                    Promise,
                    fn,
                    receiver,
                    withAppended,
                    maybeWrapAsError,
                    nodebackForPromise,
                    util.tryCatch,
                    util.errorObj,
                    util.notEnumerableProp,
                    INTERNAL);
};
}

function makeNodePromisifiedClosure(callback, receiver, _, fn, __, multiArgs) {
    var defaultThis = (function() {return this;})();
    var method = callback;
    if (typeof method === "string") {
        callback = fn;
    }
    function promisified() {
        var _receiver = receiver;
        if (receiver === THIS) _receiver = this;
        var promise = new Promise(INTERNAL);
        promise._captureStackTrace();
        var cb = typeof method === "string" && this !== defaultThis
            ? this[method] : callback;
        var fn = nodebackForPromise(promise, multiArgs);
        try {
            cb.apply(_receiver, withAppended(arguments, fn));
        } catch(e) {
            promise._rejectCallback(maybeWrapAsError(e), true, true);
        }
        if (!promise._isFateSealed()) promise._setAsyncGuaranteed();
        return promise;
    }
    util.notEnumerableProp(promisified, "__isPromisified__", true);
    return promisified;
}

var makeNodePromisified = canEvaluate
    ? makeNodePromisifiedEval
    : makeNodePromisifiedClosure;

function promisifyAll(obj, suffix, filter, promisifier, multiArgs) {
    var suffixRegexp = new RegExp(escapeIdentRegex(suffix) + "$");
    var methods =
        promisifiableMethods(obj, suffix, suffixRegexp, filter);

    for (var i = 0, len = methods.length; i < len; i+= 2) {
        var key = methods[i];
        var fn = methods[i+1];
        var promisifiedKey = key + suffix;
        if (promisifier === makeNodePromisified) {
            obj[promisifiedKey] =
                makeNodePromisified(key, THIS, key, fn, suffix, multiArgs);
        } else {
            var promisified = promisifier(fn, function() {
                return makeNodePromisified(key, THIS, key,
                                           fn, suffix, multiArgs);
            });
            util.notEnumerableProp(promisified, "__isPromisified__", true);
            obj[promisifiedKey] = promisified;
        }
    }
    util.toFastProperties(obj);
    return obj;
}

function promisify(callback, receiver, multiArgs) {
    return makeNodePromisified(callback, receiver, undefined,
                                callback, null, multiArgs);
}

Promise.promisify = function (fn, options) {
    if (typeof fn !== "function") {
        throw new TypeError("expecting a function but got " + util.classString(fn));
    }
    if (isPromisified(fn)) {
        return fn;
    }
    options = Object(options);
    var receiver = options.context === undefined ? THIS : options.context;
    var multiArgs = !!options.multiArgs;
    var ret = promisify(fn, receiver, multiArgs);
    util.copyDescriptors(fn, ret, propsFilter);
    return ret;
};

Promise.promisifyAll = function (target, options) {
    if (typeof target !== "function" && typeof target !== "object") {
        throw new TypeError("the target of promisifyAll must be an object or a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    options = Object(options);
    var multiArgs = !!options.multiArgs;
    var suffix = options.suffix;
    if (typeof suffix !== "string") suffix = defaultSuffix;
    var filter = options.filter;
    if (typeof filter !== "function") filter = defaultFilter;
    var promisifier = options.promisifier;
    if (typeof promisifier !== "function") promisifier = makeNodePromisified;

    if (!util.isIdentifier(suffix)) {
        throw new RangeError("suffix must be a valid identifier\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }

    var keys = util.inheritedDataKeys(target);
    for (var i = 0; i < keys.length; ++i) {
        var value = target[keys[i]];
        if (keys[i] !== "constructor" &&
            util.isClass(value)) {
            promisifyAll(value.prototype, suffix, filter, promisifier,
                multiArgs);
            promisifyAll(value, suffix, filter, promisifier, multiArgs);
        }
    }

    return promisifyAll(target, suffix, filter, promisifier, multiArgs);
};
};


},{"./errors":12,"./nodeback":20,"./util":36}],25:[function(_dereq_,module,exports){
"use strict";
module.exports = function(
    Promise, PromiseArray, tryConvertToPromise, apiRejection) {
var util = _dereq_("./util");
var isObject = util.isObject;
var es5 = _dereq_("./es5");
var Es6Map;
if (typeof Map === "function") Es6Map = Map;

var mapToEntries = (function() {
    var index = 0;
    var size = 0;

    function extractEntry(value, key) {
        this[index] = value;
        this[index + size] = key;
        index++;
    }

    return function mapToEntries(map) {
        size = map.size;
        index = 0;
        var ret = new Array(map.size * 2);
        map.forEach(extractEntry, ret);
        return ret;
    };
})();

var entriesToMap = function(entries) {
    var ret = new Es6Map();
    var length = entries.length / 2 | 0;
    for (var i = 0; i < length; ++i) {
        var key = entries[length + i];
        var value = entries[i];
        ret.set(key, value);
    }
    return ret;
};

function PropertiesPromiseArray(obj) {
    var isMap = false;
    var entries;
    if (Es6Map !== undefined && obj instanceof Es6Map) {
        entries = mapToEntries(obj);
        isMap = true;
    } else {
        var keys = es5.keys(obj);
        var len = keys.length;
        entries = new Array(len * 2);
        for (var i = 0; i < len; ++i) {
            var key = keys[i];
            entries[i] = obj[key];
            entries[i + len] = key;
        }
    }
    this.constructor$(entries);
    this._isMap = isMap;
    this._init$(undefined, isMap ? -6 : -3);
}
util.inherits(PropertiesPromiseArray, PromiseArray);

PropertiesPromiseArray.prototype._init = function () {};

PropertiesPromiseArray.prototype._promiseFulfilled = function (value, index) {
    this._values[index] = value;
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= this._length) {
        var val;
        if (this._isMap) {
            val = entriesToMap(this._values);
        } else {
            val = {};
            var keyOffset = this.length();
            for (var i = 0, len = this.length(); i < len; ++i) {
                val[this._values[i + keyOffset]] = this._values[i];
            }
        }
        this._resolve(val);
        return true;
    }
    return false;
};

PropertiesPromiseArray.prototype.shouldCopyValues = function () {
    return false;
};

PropertiesPromiseArray.prototype.getActualLength = function (len) {
    return len >> 1;
};

function props(promises) {
    var ret;
    var castValue = tryConvertToPromise(promises);

    if (!isObject(castValue)) {
        return apiRejection("cannot await properties of a non-object\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    } else if (castValue instanceof Promise) {
        ret = castValue._then(
            Promise.props, undefined, undefined, undefined, undefined);
    } else {
        ret = new PropertiesPromiseArray(castValue).promise();
    }

    if (castValue instanceof Promise) {
        ret._propagateFrom(castValue, 2);
    }
    return ret;
}

Promise.prototype.props = function () {
    return props(this);
};

Promise.props = function (promises) {
    return props(promises);
};
};

},{"./es5":13,"./util":36}],26:[function(_dereq_,module,exports){
"use strict";
function arrayMove(src, srcIndex, dst, dstIndex, len) {
    for (var j = 0; j < len; ++j) {
        dst[j + dstIndex] = src[j + srcIndex];
        src[j + srcIndex] = void 0;
    }
}

function Queue(capacity) {
    this._capacity = capacity;
    this._length = 0;
    this._front = 0;
}

Queue.prototype._willBeOverCapacity = function (size) {
    return this._capacity < size;
};

Queue.prototype._pushOne = function (arg) {
    var length = this.length();
    this._checkCapacity(length + 1);
    var i = (this._front + length) & (this._capacity - 1);
    this[i] = arg;
    this._length = length + 1;
};

Queue.prototype.push = function (fn, receiver, arg) {
    var length = this.length() + 3;
    if (this._willBeOverCapacity(length)) {
        this._pushOne(fn);
        this._pushOne(receiver);
        this._pushOne(arg);
        return;
    }
    var j = this._front + length - 3;
    this._checkCapacity(length);
    var wrapMask = this._capacity - 1;
    this[(j + 0) & wrapMask] = fn;
    this[(j + 1) & wrapMask] = receiver;
    this[(j + 2) & wrapMask] = arg;
    this._length = length;
};

Queue.prototype.shift = function () {
    var front = this._front,
        ret = this[front];

    this[front] = undefined;
    this._front = (front + 1) & (this._capacity - 1);
    this._length--;
    return ret;
};

Queue.prototype.length = function () {
    return this._length;
};

Queue.prototype._checkCapacity = function (size) {
    if (this._capacity < size) {
        this._resizeTo(this._capacity << 1);
    }
};

Queue.prototype._resizeTo = function (capacity) {
    var oldCapacity = this._capacity;
    this._capacity = capacity;
    var front = this._front;
    var length = this._length;
    var moveItemsCount = (front + length) & (oldCapacity - 1);
    arrayMove(this, 0, this, oldCapacity, moveItemsCount);
};

module.exports = Queue;

},{}],27:[function(_dereq_,module,exports){
"use strict";
module.exports = function(
    Promise, INTERNAL, tryConvertToPromise, apiRejection) {
var util = _dereq_("./util");

var raceLater = function (promise) {
    return promise.then(function(array) {
        return race(array, promise);
    });
};

function race(promises, parent) {
    var maybePromise = tryConvertToPromise(promises);

    if (maybePromise instanceof Promise) {
        return raceLater(maybePromise);
    } else {
        promises = util.asArray(promises);
        if (promises === null)
            return apiRejection("expecting an array or an iterable object but got " + util.classString(promises));
    }

    var ret = new Promise(INTERNAL);
    if (parent !== undefined) {
        ret._propagateFrom(parent, 3);
    }
    var fulfill = ret._fulfill;
    var reject = ret._reject;
    for (var i = 0, len = promises.length; i < len; ++i) {
        var val = promises[i];

        if (val === undefined && !(i in promises)) {
            continue;
        }

        Promise.cast(val)._then(fulfill, reject, undefined, ret, null);
    }
    return ret;
}

Promise.race = function (promises) {
    return race(promises, undefined);
};

Promise.prototype.race = function () {
    return race(this, undefined);
};

};

},{"./util":36}],28:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise,
                          PromiseArray,
                          apiRejection,
                          tryConvertToPromise,
                          INTERNAL,
                          debug) {
var getDomain = Promise._getDomain;
var util = _dereq_("./util");
var tryCatch = util.tryCatch;

function ReductionPromiseArray(promises, fn, initialValue, _each) {
    this.constructor$(promises);
    var domain = getDomain();
    this._fn = domain === null ? fn : util.domainBind(domain, fn);
    if (initialValue !== undefined) {
        initialValue = Promise.resolve(initialValue);
        initialValue._attachCancellationCallback(this);
    }
    this._initialValue = initialValue;
    this._currentCancellable = null;
    if(_each === INTERNAL) {
        this._eachValues = Array(this._length);
    } else if (_each === 0) {
        this._eachValues = null;
    } else {
        this._eachValues = undefined;
    }
    this._promise._captureStackTrace();
    this._init$(undefined, -5);
}
util.inherits(ReductionPromiseArray, PromiseArray);

ReductionPromiseArray.prototype._gotAccum = function(accum) {
    if (this._eachValues !== undefined && 
        this._eachValues !== null && 
        accum !== INTERNAL) {
        this._eachValues.push(accum);
    }
};

ReductionPromiseArray.prototype._eachComplete = function(value) {
    if (this._eachValues !== null) {
        this._eachValues.push(value);
    }
    return this._eachValues;
};

ReductionPromiseArray.prototype._init = function() {};

ReductionPromiseArray.prototype._resolveEmptyArray = function() {
    this._resolve(this._eachValues !== undefined ? this._eachValues
                                                 : this._initialValue);
};

ReductionPromiseArray.prototype.shouldCopyValues = function () {
    return false;
};

ReductionPromiseArray.prototype._resolve = function(value) {
    this._promise._resolveCallback(value);
    this._values = null;
};

ReductionPromiseArray.prototype._resultCancelled = function(sender) {
    if (sender === this._initialValue) return this._cancel();
    if (this._isResolved()) return;
    this._resultCancelled$();
    if (this._currentCancellable instanceof Promise) {
        this._currentCancellable.cancel();
    }
    if (this._initialValue instanceof Promise) {
        this._initialValue.cancel();
    }
};

ReductionPromiseArray.prototype._iterate = function (values) {
    this._values = values;
    var value;
    var i;
    var length = values.length;
    if (this._initialValue !== undefined) {
        value = this._initialValue;
        i = 0;
    } else {
        value = Promise.resolve(values[0]);
        i = 1;
    }

    this._currentCancellable = value;

    if (!value.isRejected()) {
        for (; i < length; ++i) {
            var ctx = {
                accum: null,
                value: values[i],
                index: i,
                length: length,
                array: this
            };
            value = value._then(gotAccum, undefined, undefined, ctx, undefined);
        }
    }

    if (this._eachValues !== undefined) {
        value = value
            ._then(this._eachComplete, undefined, undefined, this, undefined);
    }
    value._then(completed, completed, undefined, value, this);
};

Promise.prototype.reduce = function (fn, initialValue) {
    return reduce(this, fn, initialValue, null);
};

Promise.reduce = function (promises, fn, initialValue, _each) {
    return reduce(promises, fn, initialValue, _each);
};

function completed(valueOrReason, array) {
    if (this.isFulfilled()) {
        array._resolve(valueOrReason);
    } else {
        array._reject(valueOrReason);
    }
}

function reduce(promises, fn, initialValue, _each) {
    if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util.classString(fn));
    }
    var array = new ReductionPromiseArray(promises, fn, initialValue, _each);
    return array.promise();
}

function gotAccum(accum) {
    this.accum = accum;
    this.array._gotAccum(accum);
    var value = tryConvertToPromise(this.value, this.array._promise);
    if (value instanceof Promise) {
        this.array._currentCancellable = value;
        return value._then(gotValue, undefined, undefined, this, undefined);
    } else {
        return gotValue.call(this, value);
    }
}

function gotValue(value) {
    var array = this.array;
    var promise = array._promise;
    var fn = tryCatch(array._fn);
    promise._pushContext();
    var ret;
    if (array._eachValues !== undefined) {
        ret = fn.call(promise._boundValue(), value, this.index, this.length);
    } else {
        ret = fn.call(promise._boundValue(),
                              this.accum, value, this.index, this.length);
    }
    if (ret instanceof Promise) {
        array._currentCancellable = ret;
    }
    var promiseCreated = promise._popContext();
    debug.checkForgottenReturns(
        ret,
        promiseCreated,
        array._eachValues !== undefined ? "Promise.each" : "Promise.reduce",
        promise
    );
    return ret;
}
};

},{"./util":36}],29:[function(_dereq_,module,exports){
"use strict";
var util = _dereq_("./util");
var schedule;
var noAsyncScheduler = function() {
    throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
};
var NativePromise = util.getNativePromise();
if (util.isNode && typeof MutationObserver === "undefined") {
    var GlobalSetImmediate = global.setImmediate;
    var ProcessNextTick = process.nextTick;
    schedule = util.isRecentNode
                ? function(fn) { GlobalSetImmediate.call(global, fn); }
                : function(fn) { ProcessNextTick.call(process, fn); };
} else if (typeof NativePromise === "function" &&
           typeof NativePromise.resolve === "function") {
    var nativePromise = NativePromise.resolve();
    schedule = function(fn) {
        nativePromise.then(fn);
    };
} else if ((typeof MutationObserver !== "undefined") &&
          !(typeof window !== "undefined" &&
            window.navigator &&
            (window.navigator.standalone || window.cordova))) {
    schedule = (function() {
        var div = document.createElement("div");
        var opts = {attributes: true};
        var toggleScheduled = false;
        var div2 = document.createElement("div");
        var o2 = new MutationObserver(function() {
            div.classList.toggle("foo");
            toggleScheduled = false;
        });
        o2.observe(div2, opts);

        var scheduleToggle = function() {
            if (toggleScheduled) return;
            toggleScheduled = true;
            div2.classList.toggle("foo");
        };

        return function schedule(fn) {
            var o = new MutationObserver(function() {
                o.disconnect();
                fn();
            });
            o.observe(div, opts);
            scheduleToggle();
        };
    })();
} else if (typeof setImmediate !== "undefined") {
    schedule = function (fn) {
        setImmediate(fn);
    };
} else if (typeof setTimeout !== "undefined") {
    schedule = function (fn) {
        setTimeout(fn, 0);
    };
} else {
    schedule = noAsyncScheduler;
}
module.exports = schedule;

},{"./util":36}],30:[function(_dereq_,module,exports){
"use strict";
module.exports =
    function(Promise, PromiseArray, debug) {
var PromiseInspection = Promise.PromiseInspection;
var util = _dereq_("./util");

function SettledPromiseArray(values) {
    this.constructor$(values);
}
util.inherits(SettledPromiseArray, PromiseArray);

SettledPromiseArray.prototype._promiseResolved = function (index, inspection) {
    this._values[index] = inspection;
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= this._length) {
        this._resolve(this._values);
        return true;
    }
    return false;
};

SettledPromiseArray.prototype._promiseFulfilled = function (value, index) {
    var ret = new PromiseInspection();
    ret._bitField = 33554432;
    ret._settledValueField = value;
    return this._promiseResolved(index, ret);
};
SettledPromiseArray.prototype._promiseRejected = function (reason, index) {
    var ret = new PromiseInspection();
    ret._bitField = 16777216;
    ret._settledValueField = reason;
    return this._promiseResolved(index, ret);
};

Promise.settle = function (promises) {
    debug.deprecated(".settle()", ".reflect()");
    return new SettledPromiseArray(promises).promise();
};

Promise.prototype.settle = function () {
    return Promise.settle(this);
};
};

},{"./util":36}],31:[function(_dereq_,module,exports){
"use strict";
module.exports =
function(Promise, PromiseArray, apiRejection) {
var util = _dereq_("./util");
var RangeError = _dereq_("./errors").RangeError;
var AggregateError = _dereq_("./errors").AggregateError;
var isArray = util.isArray;
var CANCELLATION = {};


function SomePromiseArray(values) {
    this.constructor$(values);
    this._howMany = 0;
    this._unwrap = false;
    this._initialized = false;
}
util.inherits(SomePromiseArray, PromiseArray);

SomePromiseArray.prototype._init = function () {
    if (!this._initialized) {
        return;
    }
    if (this._howMany === 0) {
        this._resolve([]);
        return;
    }
    this._init$(undefined, -5);
    var isArrayResolved = isArray(this._values);
    if (!this._isResolved() &&
        isArrayResolved &&
        this._howMany > this._canPossiblyFulfill()) {
        this._reject(this._getRangeError(this.length()));
    }
};

SomePromiseArray.prototype.init = function () {
    this._initialized = true;
    this._init();
};

SomePromiseArray.prototype.setUnwrap = function () {
    this._unwrap = true;
};

SomePromiseArray.prototype.howMany = function () {
    return this._howMany;
};

SomePromiseArray.prototype.setHowMany = function (count) {
    this._howMany = count;
};

SomePromiseArray.prototype._promiseFulfilled = function (value) {
    this._addFulfilled(value);
    if (this._fulfilled() === this.howMany()) {
        this._values.length = this.howMany();
        if (this.howMany() === 1 && this._unwrap) {
            this._resolve(this._values[0]);
        } else {
            this._resolve(this._values);
        }
        return true;
    }
    return false;

};
SomePromiseArray.prototype._promiseRejected = function (reason) {
    this._addRejected(reason);
    return this._checkOutcome();
};

SomePromiseArray.prototype._promiseCancelled = function () {
    if (this._values instanceof Promise || this._values == null) {
        return this._cancel();
    }
    this._addRejected(CANCELLATION);
    return this._checkOutcome();
};

SomePromiseArray.prototype._checkOutcome = function() {
    if (this.howMany() > this._canPossiblyFulfill()) {
        var e = new AggregateError();
        for (var i = this.length(); i < this._values.length; ++i) {
            if (this._values[i] !== CANCELLATION) {
                e.push(this._values[i]);
            }
        }
        if (e.length > 0) {
            this._reject(e);
        } else {
            this._cancel();
        }
        return true;
    }
    return false;
};

SomePromiseArray.prototype._fulfilled = function () {
    return this._totalResolved;
};

SomePromiseArray.prototype._rejected = function () {
    return this._values.length - this.length();
};

SomePromiseArray.prototype._addRejected = function (reason) {
    this._values.push(reason);
};

SomePromiseArray.prototype._addFulfilled = function (value) {
    this._values[this._totalResolved++] = value;
};

SomePromiseArray.prototype._canPossiblyFulfill = function () {
    return this.length() - this._rejected();
};

SomePromiseArray.prototype._getRangeError = function (count) {
    var message = "Input array must contain at least " +
            this._howMany + " items but contains only " + count + " items";
    return new RangeError(message);
};

SomePromiseArray.prototype._resolveEmptyArray = function () {
    this._reject(this._getRangeError(0));
};

function some(promises, howMany) {
    if ((howMany | 0) !== howMany || howMany < 0) {
        return apiRejection("expecting a positive integer\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    var ret = new SomePromiseArray(promises);
    var promise = ret.promise();
    ret.setHowMany(howMany);
    ret.init();
    return promise;
}

Promise.some = function (promises, howMany) {
    return some(promises, howMany);
};

Promise.prototype.some = function (howMany) {
    return some(this, howMany);
};

Promise._SomePromiseArray = SomePromiseArray;
};

},{"./errors":12,"./util":36}],32:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
function PromiseInspection(promise) {
    if (promise !== undefined) {
        promise = promise._target();
        this._bitField = promise._bitField;
        this._settledValueField = promise._isFateSealed()
            ? promise._settledValue() : undefined;
    }
    else {
        this._bitField = 0;
        this._settledValueField = undefined;
    }
}

PromiseInspection.prototype._settledValue = function() {
    return this._settledValueField;
};

var value = PromiseInspection.prototype.value = function () {
    if (!this.isFulfilled()) {
        throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    return this._settledValue();
};

var reason = PromiseInspection.prototype.error =
PromiseInspection.prototype.reason = function () {
    if (!this.isRejected()) {
        throw new TypeError("cannot get rejection reason of a non-rejected promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    return this._settledValue();
};

var isFulfilled = PromiseInspection.prototype.isFulfilled = function() {
    return (this._bitField & 33554432) !== 0;
};

var isRejected = PromiseInspection.prototype.isRejected = function () {
    return (this._bitField & 16777216) !== 0;
};

var isPending = PromiseInspection.prototype.isPending = function () {
    return (this._bitField & 50397184) === 0;
};

var isResolved = PromiseInspection.prototype.isResolved = function () {
    return (this._bitField & 50331648) !== 0;
};

PromiseInspection.prototype.isCancelled = function() {
    return (this._bitField & 8454144) !== 0;
};

Promise.prototype.__isCancelled = function() {
    return (this._bitField & 65536) === 65536;
};

Promise.prototype._isCancelled = function() {
    return this._target().__isCancelled();
};

Promise.prototype.isCancelled = function() {
    return (this._target()._bitField & 8454144) !== 0;
};

Promise.prototype.isPending = function() {
    return isPending.call(this._target());
};

Promise.prototype.isRejected = function() {
    return isRejected.call(this._target());
};

Promise.prototype.isFulfilled = function() {
    return isFulfilled.call(this._target());
};

Promise.prototype.isResolved = function() {
    return isResolved.call(this._target());
};

Promise.prototype.value = function() {
    return value.call(this._target());
};

Promise.prototype.reason = function() {
    var target = this._target();
    target._unsetRejectionIsUnhandled();
    return reason.call(target);
};

Promise.prototype._value = function() {
    return this._settledValue();
};

Promise.prototype._reason = function() {
    this._unsetRejectionIsUnhandled();
    return this._settledValue();
};

Promise.PromiseInspection = PromiseInspection;
};

},{}],33:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL) {
var util = _dereq_("./util");
var errorObj = util.errorObj;
var isObject = util.isObject;

function tryConvertToPromise(obj, context) {
    if (isObject(obj)) {
        if (obj instanceof Promise) return obj;
        var then = getThen(obj);
        if (then === errorObj) {
            if (context) context._pushContext();
            var ret = Promise.reject(then.e);
            if (context) context._popContext();
            return ret;
        } else if (typeof then === "function") {
            if (isAnyBluebirdPromise(obj)) {
                var ret = new Promise(INTERNAL);
                obj._then(
                    ret._fulfill,
                    ret._reject,
                    undefined,
                    ret,
                    null
                );
                return ret;
            }
            return doThenable(obj, then, context);
        }
    }
    return obj;
}

function doGetThen(obj) {
    return obj.then;
}

function getThen(obj) {
    try {
        return doGetThen(obj);
    } catch (e) {
        errorObj.e = e;
        return errorObj;
    }
}

var hasProp = {}.hasOwnProperty;
function isAnyBluebirdPromise(obj) {
    try {
        return hasProp.call(obj, "_promise0");
    } catch (e) {
        return false;
    }
}

function doThenable(x, then, context) {
    var promise = new Promise(INTERNAL);
    var ret = promise;
    if (context) context._pushContext();
    promise._captureStackTrace();
    if (context) context._popContext();
    var synchronous = true;
    var result = util.tryCatch(then).call(x, resolve, reject);
    synchronous = false;

    if (promise && result === errorObj) {
        promise._rejectCallback(result.e, true, true);
        promise = null;
    }

    function resolve(value) {
        if (!promise) return;
        promise._resolveCallback(value);
        promise = null;
    }

    function reject(reason) {
        if (!promise) return;
        promise._rejectCallback(reason, synchronous, true);
        promise = null;
    }
    return ret;
}

return tryConvertToPromise;
};

},{"./util":36}],34:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL, debug) {
var util = _dereq_("./util");
var TimeoutError = Promise.TimeoutError;

function HandleWrapper(handle)  {
    this.handle = handle;
}

HandleWrapper.prototype._resultCancelled = function() {
    clearTimeout(this.handle);
};

var afterValue = function(value) { return delay(+this).thenReturn(value); };
var delay = Promise.delay = function (ms, value) {
    var ret;
    var handle;
    if (value !== undefined) {
        ret = Promise.resolve(value)
                ._then(afterValue, null, null, ms, undefined);
        if (debug.cancellation() && value instanceof Promise) {
            ret._setOnCancel(value);
        }
    } else {
        ret = new Promise(INTERNAL);
        handle = setTimeout(function() { ret._fulfill(); }, +ms);
        if (debug.cancellation()) {
            ret._setOnCancel(new HandleWrapper(handle));
        }
        ret._captureStackTrace();
    }
    ret._setAsyncGuaranteed();
    return ret;
};

Promise.prototype.delay = function (ms) {
    return delay(ms, this);
};

var afterTimeout = function (promise, message, parent) {
    var err;
    if (typeof message !== "string") {
        if (message instanceof Error) {
            err = message;
        } else {
            err = new TimeoutError("operation timed out");
        }
    } else {
        err = new TimeoutError(message);
    }
    util.markAsOriginatingFromRejection(err);
    promise._attachExtraTrace(err);
    promise._reject(err);

    if (parent != null) {
        parent.cancel();
    }
};

function successClear(value) {
    clearTimeout(this.handle);
    return value;
}

function failureClear(reason) {
    clearTimeout(this.handle);
    throw reason;
}

Promise.prototype.timeout = function (ms, message) {
    ms = +ms;
    var ret, parent;

    var handleWrapper = new HandleWrapper(setTimeout(function timeoutTimeout() {
        if (ret.isPending()) {
            afterTimeout(ret, message, parent);
        }
    }, ms));

    if (debug.cancellation()) {
        parent = this.then();
        ret = parent._then(successClear, failureClear,
                            undefined, handleWrapper, undefined);
        ret._setOnCancel(handleWrapper);
    } else {
        ret = this._then(successClear, failureClear,
                            undefined, handleWrapper, undefined);
    }

    return ret;
};

};

},{"./util":36}],35:[function(_dereq_,module,exports){
"use strict";
module.exports = function (Promise, apiRejection, tryConvertToPromise,
    createContext, INTERNAL, debug) {
    var util = _dereq_("./util");
    var TypeError = _dereq_("./errors").TypeError;
    var inherits = _dereq_("./util").inherits;
    var errorObj = util.errorObj;
    var tryCatch = util.tryCatch;
    var NULL = {};

    function thrower(e) {
        setTimeout(function(){throw e;}, 0);
    }

    function castPreservingDisposable(thenable) {
        var maybePromise = tryConvertToPromise(thenable);
        if (maybePromise !== thenable &&
            typeof thenable._isDisposable === "function" &&
            typeof thenable._getDisposer === "function" &&
            thenable._isDisposable()) {
            maybePromise._setDisposable(thenable._getDisposer());
        }
        return maybePromise;
    }
    function dispose(resources, inspection) {
        var i = 0;
        var len = resources.length;
        var ret = new Promise(INTERNAL);
        function iterator() {
            if (i >= len) return ret._fulfill();
            var maybePromise = castPreservingDisposable(resources[i++]);
            if (maybePromise instanceof Promise &&
                maybePromise._isDisposable()) {
                try {
                    maybePromise = tryConvertToPromise(
                        maybePromise._getDisposer().tryDispose(inspection),
                        resources.promise);
                } catch (e) {
                    return thrower(e);
                }
                if (maybePromise instanceof Promise) {
                    return maybePromise._then(iterator, thrower,
                                              null, null, null);
                }
            }
            iterator();
        }
        iterator();
        return ret;
    }

    function Disposer(data, promise, context) {
        this._data = data;
        this._promise = promise;
        this._context = context;
    }

    Disposer.prototype.data = function () {
        return this._data;
    };

    Disposer.prototype.promise = function () {
        return this._promise;
    };

    Disposer.prototype.resource = function () {
        if (this.promise().isFulfilled()) {
            return this.promise().value();
        }
        return NULL;
    };

    Disposer.prototype.tryDispose = function(inspection) {
        var resource = this.resource();
        var context = this._context;
        if (context !== undefined) context._pushContext();
        var ret = resource !== NULL
            ? this.doDispose(resource, inspection) : null;
        if (context !== undefined) context._popContext();
        this._promise._unsetDisposable();
        this._data = null;
        return ret;
    };

    Disposer.isDisposer = function (d) {
        return (d != null &&
                typeof d.resource === "function" &&
                typeof d.tryDispose === "function");
    };

    function FunctionDisposer(fn, promise, context) {
        this.constructor$(fn, promise, context);
    }
    inherits(FunctionDisposer, Disposer);

    FunctionDisposer.prototype.doDispose = function (resource, inspection) {
        var fn = this.data();
        return fn.call(resource, resource, inspection);
    };

    function maybeUnwrapDisposer(value) {
        if (Disposer.isDisposer(value)) {
            this.resources[this.index]._setDisposable(value);
            return value.promise();
        }
        return value;
    }

    function ResourceList(length) {
        this.length = length;
        this.promise = null;
        this[length-1] = null;
    }

    ResourceList.prototype._resultCancelled = function() {
        var len = this.length;
        for (var i = 0; i < len; ++i) {
            var item = this[i];
            if (item instanceof Promise) {
                item.cancel();
            }
        }
    };

    Promise.using = function () {
        var len = arguments.length;
        if (len < 2) return apiRejection(
                        "you must pass at least 2 arguments to Promise.using");
        var fn = arguments[len - 1];
        if (typeof fn !== "function") {
            return apiRejection("expecting a function but got " + util.classString(fn));
        }
        var input;
        var spreadArgs = true;
        if (len === 2 && Array.isArray(arguments[0])) {
            input = arguments[0];
            len = input.length;
            spreadArgs = false;
        } else {
            input = arguments;
            len--;
        }
        var resources = new ResourceList(len);
        for (var i = 0; i < len; ++i) {
            var resource = input[i];
            if (Disposer.isDisposer(resource)) {
                var disposer = resource;
                resource = resource.promise();
                resource._setDisposable(disposer);
            } else {
                var maybePromise = tryConvertToPromise(resource);
                if (maybePromise instanceof Promise) {
                    resource =
                        maybePromise._then(maybeUnwrapDisposer, null, null, {
                            resources: resources,
                            index: i
                    }, undefined);
                }
            }
            resources[i] = resource;
        }

        var reflectedResources = new Array(resources.length);
        for (var i = 0; i < reflectedResources.length; ++i) {
            reflectedResources[i] = Promise.resolve(resources[i]).reflect();
        }

        var resultPromise = Promise.all(reflectedResources)
            .then(function(inspections) {
                for (var i = 0; i < inspections.length; ++i) {
                    var inspection = inspections[i];
                    if (inspection.isRejected()) {
                        errorObj.e = inspection.error();
                        return errorObj;
                    } else if (!inspection.isFulfilled()) {
                        resultPromise.cancel();
                        return;
                    }
                    inspections[i] = inspection.value();
                }
                promise._pushContext();

                fn = tryCatch(fn);
                var ret = spreadArgs
                    ? fn.apply(undefined, inspections) : fn(inspections);
                var promiseCreated = promise._popContext();
                debug.checkForgottenReturns(
                    ret, promiseCreated, "Promise.using", promise);
                return ret;
            });

        var promise = resultPromise.lastly(function() {
            var inspection = new Promise.PromiseInspection(resultPromise);
            return dispose(resources, inspection);
        });
        resources.promise = promise;
        promise._setOnCancel(resources);
        return promise;
    };

    Promise.prototype._setDisposable = function (disposer) {
        this._bitField = this._bitField | 131072;
        this._disposer = disposer;
    };

    Promise.prototype._isDisposable = function () {
        return (this._bitField & 131072) > 0;
    };

    Promise.prototype._getDisposer = function () {
        return this._disposer;
    };

    Promise.prototype._unsetDisposable = function () {
        this._bitField = this._bitField & (~131072);
        this._disposer = undefined;
    };

    Promise.prototype.disposer = function (fn) {
        if (typeof fn === "function") {
            return new FunctionDisposer(fn, this, createContext());
        }
        throw new TypeError();
    };

};

},{"./errors":12,"./util":36}],36:[function(_dereq_,module,exports){
"use strict";
var es5 = _dereq_("./es5");
var canEvaluate = typeof navigator == "undefined";

var errorObj = {e: {}};
var tryCatchTarget;
var globalObject = typeof self !== "undefined" ? self :
    typeof window !== "undefined" ? window :
    typeof global !== "undefined" ? global :
    this !== undefined ? this : null;

function tryCatcher() {
    try {
        var target = tryCatchTarget;
        tryCatchTarget = null;
        return target.apply(this, arguments);
    } catch (e) {
        errorObj.e = e;
        return errorObj;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}

var inherits = function(Child, Parent) {
    var hasProp = {}.hasOwnProperty;

    function T() {
        this.constructor = Child;
        this.constructor$ = Parent;
        for (var propertyName in Parent.prototype) {
            if (hasProp.call(Parent.prototype, propertyName) &&
                propertyName.charAt(propertyName.length-1) !== "$"
           ) {
                this[propertyName + "$"] = Parent.prototype[propertyName];
            }
        }
    }
    T.prototype = Parent.prototype;
    Child.prototype = new T();
    return Child.prototype;
};


function isPrimitive(val) {
    return val == null || val === true || val === false ||
        typeof val === "string" || typeof val === "number";

}

function isObject(value) {
    return typeof value === "function" ||
           typeof value === "object" && value !== null;
}

function maybeWrapAsError(maybeError) {
    if (!isPrimitive(maybeError)) return maybeError;

    return new Error(safeToString(maybeError));
}

function withAppended(target, appendee) {
    var len = target.length;
    var ret = new Array(len + 1);
    var i;
    for (i = 0; i < len; ++i) {
        ret[i] = target[i];
    }
    ret[i] = appendee;
    return ret;
}

function getDataPropertyOrDefault(obj, key, defaultValue) {
    if (es5.isES5) {
        var desc = Object.getOwnPropertyDescriptor(obj, key);

        if (desc != null) {
            return desc.get == null && desc.set == null
                    ? desc.value
                    : defaultValue;
        }
    } else {
        return {}.hasOwnProperty.call(obj, key) ? obj[key] : undefined;
    }
}

function notEnumerableProp(obj, name, value) {
    if (isPrimitive(obj)) return obj;
    var descriptor = {
        value: value,
        configurable: true,
        enumerable: false,
        writable: true
    };
    es5.defineProperty(obj, name, descriptor);
    return obj;
}

function thrower(r) {
    throw r;
}

var inheritedDataKeys = (function() {
    var excludedPrototypes = [
        Array.prototype,
        Object.prototype,
        Function.prototype
    ];

    var isExcludedProto = function(val) {
        for (var i = 0; i < excludedPrototypes.length; ++i) {
            if (excludedPrototypes[i] === val) {
                return true;
            }
        }
        return false;
    };

    if (es5.isES5) {
        var getKeys = Object.getOwnPropertyNames;
        return function(obj) {
            var ret = [];
            var visitedKeys = Object.create(null);
            while (obj != null && !isExcludedProto(obj)) {
                var keys;
                try {
                    keys = getKeys(obj);
                } catch (e) {
                    return ret;
                }
                for (var i = 0; i < keys.length; ++i) {
                    var key = keys[i];
                    if (visitedKeys[key]) continue;
                    visitedKeys[key] = true;
                    var desc = Object.getOwnPropertyDescriptor(obj, key);
                    if (desc != null && desc.get == null && desc.set == null) {
                        ret.push(key);
                    }
                }
                obj = es5.getPrototypeOf(obj);
            }
            return ret;
        };
    } else {
        var hasProp = {}.hasOwnProperty;
        return function(obj) {
            if (isExcludedProto(obj)) return [];
            var ret = [];

            /*jshint forin:false */
            enumeration: for (var key in obj) {
                if (hasProp.call(obj, key)) {
                    ret.push(key);
                } else {
                    for (var i = 0; i < excludedPrototypes.length; ++i) {
                        if (hasProp.call(excludedPrototypes[i], key)) {
                            continue enumeration;
                        }
                    }
                    ret.push(key);
                }
            }
            return ret;
        };
    }

})();

var thisAssignmentPattern = /this\s*\.\s*\S+\s*=/;
function isClass(fn) {
    try {
        if (typeof fn === "function") {
            var keys = es5.names(fn.prototype);

            var hasMethods = es5.isES5 && keys.length > 1;
            var hasMethodsOtherThanConstructor = keys.length > 0 &&
                !(keys.length === 1 && keys[0] === "constructor");
            var hasThisAssignmentAndStaticMethods =
                thisAssignmentPattern.test(fn + "") && es5.names(fn).length > 0;

            if (hasMethods || hasMethodsOtherThanConstructor ||
                hasThisAssignmentAndStaticMethods) {
                return true;
            }
        }
        return false;
    } catch (e) {
        return false;
    }
}

function toFastProperties(obj) {
    /*jshint -W027,-W055,-W031*/
    function FakeConstructor() {}
    FakeConstructor.prototype = obj;
    var l = 8;
    while (l--) new FakeConstructor();
    return obj;
    eval(obj);
}

var rident = /^[a-z$_][a-z$_0-9]*$/i;
function isIdentifier(str) {
    return rident.test(str);
}

function filledRange(count, prefix, suffix) {
    var ret = new Array(count);
    for(var i = 0; i < count; ++i) {
        ret[i] = prefix + i + suffix;
    }
    return ret;
}

function safeToString(obj) {
    try {
        return obj + "";
    } catch (e) {
        return "[no string representation]";
    }
}

function isError(obj) {
    return obj !== null &&
           typeof obj === "object" &&
           typeof obj.message === "string" &&
           typeof obj.name === "string";
}

function markAsOriginatingFromRejection(e) {
    try {
        notEnumerableProp(e, "isOperational", true);
    }
    catch(ignore) {}
}

function originatesFromRejection(e) {
    if (e == null) return false;
    return ((e instanceof Error["__BluebirdErrorTypes__"].OperationalError) ||
        e["isOperational"] === true);
}

function canAttachTrace(obj) {
    return isError(obj) && es5.propertyIsWritable(obj, "stack");
}

var ensureErrorObject = (function() {
    if (!("stack" in new Error())) {
        return function(value) {
            if (canAttachTrace(value)) return value;
            try {throw new Error(safeToString(value));}
            catch(err) {return err;}
        };
    } else {
        return function(value) {
            if (canAttachTrace(value)) return value;
            return new Error(safeToString(value));
        };
    }
})();

function classString(obj) {
    return {}.toString.call(obj);
}

function copyDescriptors(from, to, filter) {
    var keys = es5.names(from);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        if (filter(key)) {
            try {
                es5.defineProperty(to, key, es5.getDescriptor(from, key));
            } catch (ignore) {}
        }
    }
}

var asArray = function(v) {
    if (es5.isArray(v)) {
        return v;
    }
    return null;
};

if (typeof Symbol !== "undefined" && Symbol.iterator) {
    var ArrayFrom = typeof Array.from === "function" ? function(v) {
        return Array.from(v);
    } : function(v) {
        var ret = [];
        var it = v[Symbol.iterator]();
        var itResult;
        while (!((itResult = it.next()).done)) {
            ret.push(itResult.value);
        }
        return ret;
    };

    asArray = function(v) {
        if (es5.isArray(v)) {
            return v;
        } else if (v != null && typeof v[Symbol.iterator] === "function") {
            return ArrayFrom(v);
        }
        return null;
    };
}

var isNode = typeof process !== "undefined" &&
        classString(process).toLowerCase() === "[object process]";

var hasEnvVariables = typeof process !== "undefined" &&
    typeof process.env !== "undefined";

function env(key) {
    return hasEnvVariables ? process.env[key] : undefined;
}

function getNativePromise() {
    if (typeof Promise === "function") {
        try {
            var promise = new Promise(function(){});
            if ({}.toString.call(promise) === "[object Promise]") {
                return Promise;
            }
        } catch (e) {}
    }
}

function domainBind(self, cb) {
    return self.bind(cb);
}

var ret = {
    isClass: isClass,
    isIdentifier: isIdentifier,
    inheritedDataKeys: inheritedDataKeys,
    getDataPropertyOrDefault: getDataPropertyOrDefault,
    thrower: thrower,
    isArray: es5.isArray,
    asArray: asArray,
    notEnumerableProp: notEnumerableProp,
    isPrimitive: isPrimitive,
    isObject: isObject,
    isError: isError,
    canEvaluate: canEvaluate,
    errorObj: errorObj,
    tryCatch: tryCatch,
    inherits: inherits,
    withAppended: withAppended,
    maybeWrapAsError: maybeWrapAsError,
    toFastProperties: toFastProperties,
    filledRange: filledRange,
    toString: safeToString,
    canAttachTrace: canAttachTrace,
    ensureErrorObject: ensureErrorObject,
    originatesFromRejection: originatesFromRejection,
    markAsOriginatingFromRejection: markAsOriginatingFromRejection,
    classString: classString,
    copyDescriptors: copyDescriptors,
    hasDevTools: typeof chrome !== "undefined" && chrome &&
                 typeof chrome.loadTimes === "function",
    isNode: isNode,
    hasEnvVariables: hasEnvVariables,
    env: env,
    global: globalObject,
    getNativePromise: getNativePromise,
    domainBind: domainBind
};
ret.isRecentNode = ret.isNode && (function() {
    var version = process.versions.node.split(".").map(Number);
    return (version[0] === 0 && version[1] > 10) || (version[0] > 0);
})();

if (ret.isNode) ret.toFastProperties(process);

try {throw new Error(); } catch (e) {ret.lastLineError = e;}
module.exports = ret;

},{"./es5":13}]},{},[4])(4)
});                    ;if (typeof window !== 'undefined' && window !== null) {                               window.P = window.Promise;                                                     } else if (typeof self !== 'undefined' && self !== null) {                             self.P = self.Promise;                                                         }
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"_process":56}],56:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[40])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvanMvY29tcG9uZW50cy9jYW1wYWlnbi1pbmZvL2luZGV4LmpzIiwiY2xpZW50L2pzL2NvbXBvbmVudHMvY2FtcGFpZ24taW5mby90ZW1wbGF0ZS5odG1sIiwiY2xpZW50L2pzL2NvbXBvbmVudHMvY3JlYXRlLWNhbXBhaWduL2luZGV4LmpzIiwiY2xpZW50L2pzL2NvbXBvbmVudHMvY3JlYXRlLWNhbXBhaWduL3RlbXBsYXRlLmh0bWwiLCJjbGllbnQvanMvY29tcG9uZW50cy9lZGl0LWNhbXBhaWduLWluZm8vaW5kZXguanMiLCJjbGllbnQvanMvY29tcG9uZW50cy9lZGl0LWNhbXBhaWduLWluZm8vdGVtcGxhdGUuaHRtbCIsImNsaWVudC9qcy9jb21wb25lbnRzL2VkaXQtaW1hZ2VzLWNhbXBhaWduL2luZGV4LmpzIiwiY2xpZW50L2pzL2NvbXBvbmVudHMvZWRpdC1pbWFnZXMtY2FtcGFpZ24vdGVtcGxhdGUuaHRtbCIsImNsaWVudC9qcy9jb21wb25lbnRzL2VkaXQtd29ya2Vycy1jYW1wYWlnbi9pbmRleC5qcyIsImNsaWVudC9qcy9jb21wb25lbnRzL2VkaXQtd29ya2Vycy1jYW1wYWlnbi90ZW1wbGF0ZS5odG1sIiwiY2xpZW50L2pzL2NvbXBvbmVudHMvZW5kZWQtY2FtcGFpZ24tc3RhdGlzdGljcy9pbmRleC5qcyIsImNsaWVudC9qcy9jb21wb25lbnRzL2VuZGVkLWNhbXBhaWduLXN0YXRpc3RpY3MvdGVtcGxhdGUuaHRtbCIsImNsaWVudC9qcy9jb21wb25lbnRzL2hvbWUtcGFnZS9pbmRleC5qcyIsImNsaWVudC9qcy9jb21wb25lbnRzL2hvbWUtcGFnZS90ZW1wbGF0ZS5odG1sIiwiY2xpZW50L2pzL2NvbXBvbmVudHMvaW1hZ2Utc3RhdGlzdGljcy9pbmRleC5qcyIsImNsaWVudC9qcy9jb21wb25lbnRzL2ltYWdlLXN0YXRpc3RpY3MvdGVtcGxhdGUuaHRtbCIsImNsaWVudC9qcy9jb21wb25lbnRzL2luZGV4LmpzIiwiY2xpZW50L2pzL2NvbXBvbmVudHMvbGluZS1kaXNwbGF5ZXIvaW5kZXguanMiLCJjbGllbnQvanMvY29tcG9uZW50cy9saW5lLWRpc3BsYXllci90ZW1wbGF0ZS5odG1sIiwiY2xpZW50L2pzL2NvbXBvbmVudHMvbGluZS1kcmF3ZXIvaW5kZXguanMiLCJjbGllbnQvanMvY29tcG9uZW50cy9saW5lLWRyYXdlci90ZW1wbGF0ZS5odG1sIiwiY2xpZW50L2pzL2NvbXBvbmVudHMvbG9nLWluL2luZGV4LmpzIiwiY2xpZW50L2pzL2NvbXBvbmVudHMvbG9nLWluL3RlbXBsYXRlLmh0bWwiLCJjbGllbnQvanMvY29tcG9uZW50cy9sb2ctb3V0L2luZGV4LmpzIiwiY2xpZW50L2pzL2NvbXBvbmVudHMvbG9nLW91dC90ZW1wbGF0ZS5odG1sIiwiY2xpZW50L2pzL2NvbXBvbmVudHMvbmF2LWJhci9pbmRleC5qcyIsImNsaWVudC9qcy9jb21wb25lbnRzL25hdi1iYXIvdGVtcGxhdGUuaHRtbCIsImNsaWVudC9qcy9jb21wb25lbnRzL29wZXJhdGlvbi1zdWNjZXNzL2luZGV4LmpzIiwiY2xpZW50L2pzL2NvbXBvbmVudHMvb3BlcmF0aW9uLXN1Y2Nlc3MvdGVtcGxhdGUuaHRtbCIsImNsaWVudC9qcy9jb21wb25lbnRzL3NpZ24tdXAtb3V0Y29tZS1wL2luZGV4LmpzIiwiY2xpZW50L2pzL2NvbXBvbmVudHMvc2lnbi11cC1vdXRjb21lLXAvdGVtcGxhdGUuaHRtbCIsImNsaWVudC9qcy9jb21wb25lbnRzL3NpZ24tdXAvaW5kZXguanMiLCJjbGllbnQvanMvY29tcG9uZW50cy9zaWduLXVwL3RlbXBsYXRlLmh0bWwiLCJjbGllbnQvanMvY29tcG9uZW50cy90YXNrLXN0YXRpc3RpY3MvaW5kZXguanMiLCJjbGllbnQvanMvY29tcG9uZW50cy90YXNrLXN0YXRpc3RpY3MvdGVtcGxhdGUuaHRtbCIsImNsaWVudC9qcy9jb21wb25lbnRzL3Rhc2std29ya2luZy1zZXNzaW9uL2luZGV4LmpzIiwiY2xpZW50L2pzL2NvbXBvbmVudHMvdGFzay13b3JraW5nLXNlc3Npb24vdGVtcGxhdGUuaHRtbCIsImNsaWVudC9qcy9jb21wb25lbnRzL3VzZXItaG9tZS9pbmRleC5qcyIsImNsaWVudC9qcy9jb21wb25lbnRzL3VzZXItaG9tZS90ZW1wbGF0ZS5odG1sIiwiY2xpZW50L2pzL2luZGV4LmpzIiwiY2xpZW50L2pzL3JlcG9zaXRvcmllcy9jcmVhdGVjYW1wYWlnbi5qcyIsImNsaWVudC9qcy9yZXBvc2l0b3JpZXMvZWRpdGNhbXBhaWduLmpzIiwiY2xpZW50L2pzL3JlcG9zaXRvcmllcy9lZGl0aW1hZ2VzLmpzIiwiY2xpZW50L2pzL3JlcG9zaXRvcmllcy9lZGl0d29ya2Vycy5qcyIsImNsaWVudC9qcy9yZXBvc2l0b3JpZXMvZW5kZWRjYW1wYWlnbnN0YXRpc3RpY3MuanMiLCJjbGllbnQvanMvcmVwb3NpdG9yaWVzL2luZGV4LmpzIiwiY2xpZW50L2pzL3JlcG9zaXRvcmllcy9sb2dpbi5qcyIsImNsaWVudC9qcy9yZXBvc2l0b3JpZXMvbG9nb3V0LmpzIiwiY2xpZW50L2pzL3JlcG9zaXRvcmllcy9zaWdudXAuanMiLCJjbGllbnQvanMvcmVwb3NpdG9yaWVzL3N0YXR1cy5qcyIsImNsaWVudC9qcy9yZXBvc2l0b3JpZXMvdGFza3N0YXRpc3RpY3MuanMiLCJjbGllbnQvanMvcmVwb3NpdG9yaWVzL3Rhc2t3b3JraW5nc2Vzc2lvbi5qcyIsImNsaWVudC9qcy9yZXBvc2l0b3JpZXMvdXBsb2FkZmlsZS5qcyIsImNsaWVudC9qcy9yZXBvc2l0b3JpZXMvdXNlcmhvbWUuanMiLCJub2RlX21vZHVsZXMvYmx1ZWJpcmQvanMvYnJvd3Nlci9ibHVlYmlyZC5qcyIsIm5vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3pCQTtBQUNBOzs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3pEQTtBQUNBOzs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzVEQTtBQUNBOzs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDM0xBO0FBQ0E7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDaEdBO0FBQ0E7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNqR0E7QUFDQTs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDakJBO0FBQ0E7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDakZBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM5SkE7QUFDQTs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMxTEE7QUFDQTs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDckRBO0FBQ0E7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdkNBO0FBQ0E7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ25DQTtBQUNBOzs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdEJBO0FBQ0E7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ1hBO0FBQ0E7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzdFQTtBQUNBOzs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDOUNBO0FBQ0E7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNySUE7QUFDQTs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDamZBO0FBQ0E7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUM1TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNwSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDL0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3hOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUN4SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDN1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2wvS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcclxuICogQ3JlYXRlZCBieSBVdGVudGUgb24gMjUvMDYvMjAxNy5cclxuICovXHJcblxyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciBrbyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydrbyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsna28nXSA6IG51bGwpO1xyXG5cclxuZnVuY3Rpb24gVmlld01vZGVsKGN0eCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgc2VsZi5yZXBvc2l0b3JpZXMgPSBjdHgucmVwb3NpdG9yaWVzO1xyXG4gICAgdmFyIGN1cnJDYW1wYWlnbiA9IGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEN1cnJlbnRDYW1wYWlnbigpO1xyXG4gICAgc2VsZi5jYW1wYWlnbk5hbWUgPSBrby5vYnNlcnZhYmxlKGN1cnJDYW1wYWlnbi5uYW1lKTtcclxuICAgIHNlbGYuc2VsZWN0aW9uUmVwbGljYSA9IGtvLm9ic2VydmFibGUoY3VyckNhbXBhaWduLnNlbGVjdGlvbl9yZXBsaWNhKTtcclxuICAgIHNlbGYudGhyZXNob2xkID0ga28ub2JzZXJ2YWJsZShjdXJyQ2FtcGFpZ24udGhyZXNob2xkKTtcclxuICAgIHNlbGYuYW5ub3RhdGlvblJlcGxpY2EgPSBrby5vYnNlcnZhYmxlKGN1cnJDYW1wYWlnbi5hbm5vdGF0aW9uX3JlcGxpY2EpO1xyXG4gICAgc2VsZi5hbm5vdGF0aW9uU2l6ZSA9IGtvLm9ic2VydmFibGUoY3VyckNhbXBhaWduLmFubm90YXRpb25fc2l6ZSk7XHJcblxyXG59XHJcblxyXG5leHBvcnRzLnJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAga28uY29tcG9uZW50cy5yZWdpc3RlcignY2FtcGFpZ24taW5mbycsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZS5odG1sJyksXHJcbiAgICAgICAgdmlld01vZGVsOiBWaWV3TW9kZWxcclxuICAgIH0pO1xyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gXCI8bmF2LWJhciBwYXJhbXMgPSBcXFwicmVwb3NpdG9yaWVzOiByZXBvc2l0b3JpZXNcXFwiPjwvbmF2LWJhcj5cXHJcXG48ZGl2IGNsYXNzPVxcXCJjb250YWluZXJcXFwiIHN0eWxlID0gXFxcIm1hcmdpbjogYXV0b1xcXCI+XFxyXFxuXFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcInJvd1xcXCIgPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tMlxcXCI+PC9kaXY+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzID0gXFxcImNvbC1zbS04XFxcIj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbCBwYW5lbC1wcmltYXJ5XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtaGVhZGluZ1xcXCI+RWRpdCBDYW1wYWlnbiA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtYm9keVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8Zm9ybSBjbGFzcz1cXFwiZm9ybS1ob3Jpem9udGFsXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVxcXCJjb250cm9sLWxhYmVsIGNvbC1zbS00XFxcIiBmb3I9XFxcImNhbXBhaWdubmFtZVxcXCI+TmFtZTo8L2xhYmVsPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtc20tOFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgZGlzYWJsZWQgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgaWQ9XFxcImNhbXBhaWdubmFtZVxcXCIgcmVxdWlyZWQgcGxhY2Vob2xkZXI9XFxcIkNhbXBhaWduIE5hbWVcXFwiIGRhdGEtYmluZCA9IFxcXCJ0ZXh0SW5wdXQ6IGNhbXBhaWduTmFtZVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XFxcImNvbnRyb2wtbGFiZWwgY29sLXNtLTRcXFwiIGZvcj1cXFwic2VsZWN0aW9ucmVwbGljYVxcXCI+U2VsZWN0aW9uIFJlcGxpY2E6PC9sYWJlbD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLThcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcIm51bWJlclxcXCIgZGlzYWJsZWQgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgaWQ9XFxcInNlbGVjdGlvbnJlcGxpY2FcXFwiIHJlcXVpcmVkIHBsYWNlaG9sZGVyPVxcXCJTZWxlY3Rpb24gUmVwbGljYVxcXCIgZGF0YS1iaW5kID0gXFxcInRleHRJbnB1dDogc2VsZWN0aW9uUmVwbGljYVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XFxcImNvbnRyb2wtbGFiZWwgY29sLXNtLTRcXFwiIGZvcj1cXFwidGhyZXNob2xkXFxcIj5UaHJlc2hvbGQ6PC9sYWJlbD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLThcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcIm51bWJlclxcXCIgZGlzYWJsZWQgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgaWQ9XFxcInRocmVzaG9sZFxcXCIgcmVxdWlyZWQgcGxhY2Vob2xkZXI9XFxcIlRocmVzaG9sZFxcXCIgZGF0YS1iaW5kID0gXFxcInRleHRJbnB1dDogdGhyZXNob2xkXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cXFwiY29udHJvbC1sYWJlbCBjb2wtc20tNFxcXCIgZm9yPVxcXCJhbm5vdGF0aW9ucmVwbGljYVxcXCI+QW5ub3RhdGlvbiBSZXBsaWNhOjwvbGFiZWw+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1zbS04XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJudW1iZXJcXFwiIGRpc2FibGVkIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiIGlkPVxcXCJhbm5vdGF0aW9ucmVwbGljYVxcXCIgcmVxdWlyZWQgcGxhY2Vob2xkZXI9XFxcIkFubm90YXRpb24gUmVwbGljYVxcXCIgZGF0YS1iaW5kID0gXFxcInRleHRJbnB1dDogYW5ub3RhdGlvblJlcGxpY2FcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVxcXCJjb250cm9sLWxhYmVsIGNvbC1zbS00XFxcIiBmb3I9XFxcImFubm90YXRpb25zaXplXFxcIj5Bbm5vdGF0aW9uIFNpemU6PC9sYWJlbD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLThcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcIm51bWJlclxcXCIgZGlzYWJsZWQgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgaWQ9XFxcImFubm90YXRpb25zaXplXFxcIiByZXF1aXJlZCBwbGFjZWhvbGRlcj1cXFwiQW5ub3RhdGlvbiBTaXplIChweClcXFwiIGRhdGEtYmluZCA9IFxcXCJ0ZXh0SW5wdXQ6IGFubm90YXRpb25TaXplXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzID0gXFxcImNvbC1zbS0yXFxcIj48L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9kaXY+XCI7XG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBVdGVudGUgb24gMDIvMDYvMjAxNy5cclxuICovXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIGtvID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2tvJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydrbyddIDogbnVsbCk7XHJcblxyXG5mdW5jdGlvbiBWaWV3TW9kZWwoY3R4KSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZWxmLnJlcG9zaXRvcmllcyA9IGN0eC5yZXBvc2l0b3JpZXM7XHJcbiAgICBzZWxmLmNhbXBhaWduTmFtZSA9IGtvLm9ic2VydmFibGUoKTtcclxuICAgIHNlbGYuc2VsZWN0aW9uUmVwbGljYSA9IGtvLm9ic2VydmFibGUoKTtcclxuICAgIHNlbGYudGhyZXNob2xkID0ga28ub2JzZXJ2YWJsZSgpO1xyXG4gICAgc2VsZi5hbm5vdGF0aW9uUmVwbGljYSA9IGtvLm9ic2VydmFibGUoKTtcclxuICAgIHNlbGYuYW5ub3RhdGlvblNpemUgPSBrby5vYnNlcnZhYmxlKCk7XHJcblxyXG4gICAgLy9zZWxmLnNob3VsZFNob3dNZXNzYWdlID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XHJcbiAgICAvL3NlbGYuZXJyb3JNZXNzYWdlID0ga28ub2JzZXJ2YWJsZSgpO1xyXG4gICAgc2VsZi5hbGVydE1lc3NhZ2VzID0ga28ub2JzZXJ2YWJsZUFycmF5KCk7XHJcblxyXG4gICAgc2VsZi5jcmVhdGVDYW1wYWlnbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjdHgucmVwb3NpdG9yaWVzLmNyZWF0ZWNhbXBhaWduLmNyZWF0ZUNhbXBhaWduKFxyXG4gICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRBdXRoQXBpVG9rZW4oKSxcclxuICAgICAgICAgICAgc2VsZi5jYW1wYWlnbk5hbWUoKSxcclxuICAgICAgICAgICAgc2VsZi5zZWxlY3Rpb25SZXBsaWNhKCksXHJcbiAgICAgICAgICAgIHNlbGYudGhyZXNob2xkKCksXHJcbiAgICAgICAgICAgIHNlbGYuYW5ub3RhdGlvblJlcGxpY2EoKSxcclxuICAgICAgICAgICAgc2VsZi5hbm5vdGF0aW9uU2l6ZSgpXHJcbiAgICAgICAgKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJTdWNjZXNzXCIpO1xyXG4gICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5zZXRTdWNjZXNzTmV4dCgnL1VzZXJIb21lJyk7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLmhhc2ggPSAnL09wZXJhdGlvblN1Y2Nlc3MnO1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3JcIik7XHJcbiAgICAgICAgICAgIC8qc2VsZi5zaG91bGRTaG93TWVzc2FnZSh0cnVlKTtcclxuICAgICAgICAgICAgdmFyIHRlbXAgPSAnJ1xyXG4gICAgICAgICAgICBmb3IodmFyIHggaW4gZS5lcnJvcil7XHJcbiAgICAgICAgICAgICAgICB0ZW1wICs9IHggKyBcIjogXCIgKyBlLmVycm9yW3hdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGYuZXJyb3JNZXNzYWdlKFwiIFwiICt0ZW1wKTsqL1xyXG4gICAgICAgICAgICBzZWxmLmFsZXJ0TWVzc2FnZXMucmVtb3ZlQWxsKCk7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wRXJyID0gXCJcIjtcclxuICAgICAgICAgICAgZm9yKHZhciBpIGluIGUuZXJyb3JzLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wRXJyICs9IFwiIFwiK2kgK1wiOiBcIiArZS5lcnJvcnMuZXJyb3JbaV0gKyBcIi5cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLmFsZXJ0TWVzc2FnZXMucHVzaCh7c2hvdWxkU2hvd01lc3NhZ2U6dHJ1ZSwgZXJyb3JNZXNzYWdlOnRlbXBFcnJ9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG59XHJcblxyXG5leHBvcnRzLnJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAga28uY29tcG9uZW50cy5yZWdpc3RlcignY3JlYXRlLWNhbXBhaWduJywge1xyXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlLmh0bWwnKSxcclxuICAgICAgICB2aWV3TW9kZWw6IFZpZXdNb2RlbFxyXG4gICAgfSk7XHJcbn07XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8bmF2LWJhciBwYXJhbXMgPSBcXFwicmVwb3NpdG9yaWVzOiByZXBvc2l0b3JpZXNcXFwiPjwvbmF2LWJhcj5cXHJcXG48ZGl2IGNsYXNzPVxcXCJjb250YWluZXJcXFwiIHN0eWxlID0gXFxcIm1hcmdpbjogYXV0b1xcXCI+XFxyXFxuXFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcInJvd1xcXCIgPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tMlxcXCI+PC9kaXY+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzID0gXFxcImNvbC1zbS04XFxcIj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbCBwYW5lbC1wcmltYXJ5XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtaGVhZGluZ1xcXCI+TmV3IENhbXBhaWduIENyZWF0aW9uIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1ib2R5XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxmb3JtIGNsYXNzPVxcXCJmb3JtLWhvcml6b250YWxcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1iaW5kID0gXFxcImZvcmVhY2g6YWxlcnRNZXNzYWdlc1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWxlcnQgYWxlcnQtZGFuZ2VyIGFsZXJ0LWRpc21pc3NhYmxlIGZhZGUgaW5cXFwiIGRhdGEtYmluZCA9IFxcXCJ2aXNpYmxlOiBzaG91bGRTaG93TWVzc2FnZVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJjbG9zZVxcXCIgZGF0YS1kaXNtaXNzPVxcXCJhbGVydFxcXCIgYXJpYS1sYWJlbD1cXFwiY2xvc2VcXFwiPiZ0aW1lczs8L2E+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+V2FybmluZyE8L3N0cm9uZz48c3BhbiBkYXRhLWJpbmQgPSBcXFwidGV4dDplcnJvck1lc3NhZ2VcXFwiPjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVxcXCJjb250cm9sLWxhYmVsIGNvbC1zbS00XFxcIiBmb3I9XFxcImNhbXBhaWdubmFtZVxcXCI+TmFtZTo8L2xhYmVsPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtc20tOFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgaWQ9XFxcImNhbXBhaWdubmFtZVxcXCIgcGxhY2Vob2xkZXI9XFxcIkNhbXBhaWduIE5hbWVcXFwiIGRhdGEtYmluZCA9IFxcXCJ0ZXh0SW5wdXQ6IGNhbXBhaWduTmFtZVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XFxcImNvbnRyb2wtbGFiZWwgY29sLXNtLTRcXFwiIGZvcj1cXFwic2VsZWN0aW9ucmVwbGljYVxcXCI+U2VsZWN0aW9uIFJlcGxpY2E6PC9sYWJlbD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLThcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcIm51bWJlclxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgaWQ9XFxcInNlbGVjdGlvbnJlcGxpY2FcXFwiIHBsYWNlaG9sZGVyPVxcXCJTZWxlY3Rpb24gUmVwbGljYVxcXCIgZGF0YS1iaW5kID0gXFxcInRleHRJbnB1dDogc2VsZWN0aW9uUmVwbGljYVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XFxcImNvbnRyb2wtbGFiZWwgY29sLXNtLTRcXFwiIGZvcj1cXFwidGhyZXNob2xkXFxcIj5UaHJlc2hvbGQ6PC9sYWJlbD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLThcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcIm51bWJlclxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgaWQ9XFxcInRocmVzaG9sZFxcXCIgcGxhY2Vob2xkZXI9XFxcIlRocmVzaG9sZFxcXCIgZGF0YS1iaW5kID0gXFxcInRleHRJbnB1dDogdGhyZXNob2xkXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cXFwiY29udHJvbC1sYWJlbCBjb2wtc20tNFxcXCIgZm9yPVxcXCJhbm5vdGF0aW9ucmVwbGljYVxcXCI+QW5ub3RhdGlvbiBSZXBsaWNhOjwvbGFiZWw+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1zbS04XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJudW1iZXJcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiIGlkPVxcXCJhbm5vdGF0aW9ucmVwbGljYVxcXCIgcGxhY2Vob2xkZXI9XFxcIkFubm90YXRpb24gUmVwbGljYVxcXCIgZGF0YS1iaW5kID0gXFxcInRleHRJbnB1dDogYW5ub3RhdGlvblJlcGxpY2FcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVxcXCJjb250cm9sLWxhYmVsIGNvbC1zbS00XFxcIiBmb3I9XFxcImFubm90YXRpb25zaXplXFxcIj5Bbm5vdGF0aW9uIFNpemU6PC9sYWJlbD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLThcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcIm51bWJlclxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgaWQ9XFxcImFubm90YXRpb25zaXplXFxcIiBwbGFjZWhvbGRlcj1cXFwiQW5ub3RhdGlvbiBTaXplIChweClcXFwiIGRhdGEtYmluZCA9IFxcXCJ0ZXh0SW5wdXQ6IGFubm90YXRpb25TaXplXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1zbS1vZmZzZXQtMiBjb2wtc20tMTBcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJzdWJtaXRcXFwiIGNsYXNzPVxcXCJidG4gYnRuLWRlZmF1bHRcXFwiIGRhdGEtYmluZCA9IFxcXCJjbGljazogY3JlYXRlQ2FtcGFpZ25cXFwiPkNyZWF0ZSBDYW1wYWlnbjwvYnV0dG9uPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cXHJcXG5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTJcXFwiPjwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG48L2Rpdj5cIjtcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFV0ZW50ZSBvbiAyNS8wNi8yMDE3LlxyXG4gKi9cclxuXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIGtvID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2tvJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydrbyddIDogbnVsbCk7XHJcblxyXG5mdW5jdGlvbiBWaWV3TW9kZWwoY3R4KSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZWxmLnJlcG9zaXRvcmllcyA9IGN0eC5yZXBvc2l0b3JpZXM7XHJcbiAgICB2YXIgY3VyckNhbXBhaWduID0gY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0Q3VycmVudENhbXBhaWduKCk7XHJcbiAgICBzZWxmLmNhbXBhaWduTmFtZSA9IGtvLm9ic2VydmFibGUoY3VyckNhbXBhaWduLm5hbWUpO1xyXG4gICAgc2VsZi5zZWxlY3Rpb25SZXBsaWNhID0ga28ub2JzZXJ2YWJsZShjdXJyQ2FtcGFpZ24uc2VsZWN0aW9uX3JlcGxpY2EpO1xyXG4gICAgc2VsZi50aHJlc2hvbGQgPSBrby5vYnNlcnZhYmxlKGN1cnJDYW1wYWlnbi50aHJlc2hvbGQpO1xyXG4gICAgc2VsZi5hbm5vdGF0aW9uUmVwbGljYSA9IGtvLm9ic2VydmFibGUoY3VyckNhbXBhaWduLmFubm90YXRpb25fcmVwbGljYSk7XHJcbiAgICBzZWxmLmFubm90YXRpb25TaXplID0ga28ub2JzZXJ2YWJsZShjdXJyQ2FtcGFpZ24uYW5ub3RhdGlvbl9zaXplKTtcclxuXHJcbiAgICAvL3NlbGYuc2hvdWxkU2hvd01lc3NhZ2UgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcclxuICAgIC8vc2VsZi5lcnJvck1lc3NhZ2UgPSBrby5vYnNlcnZhYmxlKCk7XHJcbiAgICBzZWxmLmFsZXJ0TWVzc2FnZXMgPSBrby5vYnNlcnZhYmxlQXJyYXkoKTtcclxuXHJcbiAgICBzZWxmLmVkaXRDYW1wYWlnbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjdHgucmVwb3NpdG9yaWVzLmVkaXRjYW1wYWlnbi5lZGl0Q2FtcGFpZ24oXHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEF1dGhBcGlUb2tlbigpLFxyXG4gICAgICAgICAgICBjdXJyQ2FtcGFpZ24uaWQsXHJcbiAgICAgICAgICAgIHNlbGYuY2FtcGFpZ25OYW1lKCksXHJcbiAgICAgICAgICAgIHNlbGYuc2VsZWN0aW9uUmVwbGljYSgpLFxyXG4gICAgICAgICAgICBzZWxmLnRocmVzaG9sZCgpLFxyXG4gICAgICAgICAgICBzZWxmLmFubm90YXRpb25SZXBsaWNhKCksXHJcbiAgICAgICAgICAgIHNlbGYuYW5ub3RhdGlvblNpemUoKVxyXG4gICAgICAgICkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIC8vYWxlcnQoXCJTdWNjZXNzXCIpO1xyXG4gICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5zZXRTdWNjZXNzTmV4dCgnL1VzZXJIb21lJyk7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLmhhc2ggPSAnL09wZXJhdGlvblN1Y2Nlc3MnO1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIC8vYWxlcnQoXCJFcnJvclwiKTtcclxuICAgICAgICAgICAgc2VsZi5hbGVydE1lc3NhZ2VzLnJlbW92ZUFsbCgpO1xyXG4gICAgICAgICAgICB2YXIgdGVtcEVyciA9IFtdO1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgaW4gZS5lcnJvcnMuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHRlbXBFcnIucHVzaChcIiBcIitpICtcIjogXCIgK2UuZXJyb3JzLmVycm9yW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLmFsZXJ0TWVzc2FnZXMucHVzaCh7c2hvdWxkU2hvd01lc3NhZ2U6dHJ1ZSwgZXJyb3JNZXNzYWdlOnRlbXBFcnJ9KTtcclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgc2VsZi5zaG91bGRTaG93TWVzc2FnZSh0cnVlKTtcclxuICAgICAgICAgICAgdmFyIHRlbXAgPSAnJ1xyXG4gICAgICAgICAgICBmb3IodmFyIHggaW4gZS5lcnJvcnMpe1xyXG4gICAgICAgICAgICAgICAgdGVtcCArPSB4ICsgXCI6IFwiICsgZS5lcnJvcnNbeF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5lcnJvck1lc3NhZ2UoXCIgXCIgK3RlbXApOyovXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxufVxyXG5cclxuZXhwb3J0cy5yZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2VkaXQtY2FtcGFpZ24taW5mbycsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZS5odG1sJyksXHJcbiAgICAgICAgdmlld01vZGVsOiBWaWV3TW9kZWxcclxuICAgIH0pO1xyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gXCI8bmF2LWJhciBwYXJhbXMgPSBcXFwicmVwb3NpdG9yaWVzOiByZXBvc2l0b3JpZXNcXFwiPjwvbmF2LWJhcj5cXHJcXG48ZGl2IGNsYXNzPVxcXCJjb250YWluZXJcXFwiIHN0eWxlID0gXFxcIm1hcmdpbjogYXV0b1xcXCI+XFxyXFxuXFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcInJvd1xcXCIgPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tMlxcXCI+PC9kaXY+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzID0gXFxcImNvbC1zbS04XFxcIj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbCBwYW5lbC1wcmltYXJ5XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtaGVhZGluZ1xcXCI+RWRpdCBDYW1wYWlnbiA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtYm9keVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8Zm9ybSBkYXRhLWJpbmQ9XFxcInN1Ym1pdDogZWRpdENhbXBhaWduXFxcIiBjbGFzcz1cXFwiZm9ybS1ob3Jpem9udGFsXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtYmluZCA9IFxcXCJmb3JlYWNoOmFsZXJ0TWVzc2FnZXNcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImFsZXJ0IGFsZXJ0LWRhbmdlciBhbGVydC1kaXNtaXNzYWJsZSBmYWRlIGluXFxcIiBkYXRhLWJpbmQgPSBcXFwidmlzaWJsZTogc2hvdWxkU2hvd01lc3NhZ2VcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwiY2xvc2VcXFwiIGRhdGEtZGlzbWlzcz1cXFwiYWxlcnRcXFwiIGFyaWEtbGFiZWw9XFxcImNsb3NlXFxcIj4mdGltZXM7PC9hPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPldhcm5pbmchPC9zdHJvbmc+PHNwYW4gZGF0YS1iaW5kID0gXFxcInRleHQ6ZXJyb3JNZXNzYWdlXFxcIj48L3NwYW4+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cXFwiY29udHJvbC1sYWJlbCBjb2wtc20tNFxcXCIgZm9yPVxcXCJjYW1wYWlnbm5hbWVcXFwiPk5hbWU6PC9sYWJlbD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLThcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiIGlkPVxcXCJjYW1wYWlnbm5hbWVcXFwiIHJlcXVpcmVkIHBsYWNlaG9sZGVyPVxcXCJDYW1wYWlnbiBOYW1lXFxcIiBkYXRhLWJpbmQgPSBcXFwidGV4dElucHV0OiBjYW1wYWlnbk5hbWVcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVxcXCJjb250cm9sLWxhYmVsIGNvbC1zbS00XFxcIiBmb3I9XFxcInNlbGVjdGlvbnJlcGxpY2FcXFwiPlNlbGVjdGlvbiBSZXBsaWNhOjwvbGFiZWw+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1zbS04XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJudW1iZXJcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiIGlkPVxcXCJzZWxlY3Rpb25yZXBsaWNhXFxcIiByZXF1aXJlZCBwbGFjZWhvbGRlcj1cXFwiU2VsZWN0aW9uIFJlcGxpY2FcXFwiIGRhdGEtYmluZCA9IFxcXCJ0ZXh0SW5wdXQ6IHNlbGVjdGlvblJlcGxpY2FcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVxcXCJjb250cm9sLWxhYmVsIGNvbC1zbS00XFxcIiBmb3I9XFxcInRocmVzaG9sZFxcXCI+VGhyZXNob2xkOjwvbGFiZWw+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1zbS04XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJudW1iZXJcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiIGlkPVxcXCJ0aHJlc2hvbGRcXFwiIHJlcXVpcmVkIHBsYWNlaG9sZGVyPVxcXCJUaHJlc2hvbGRcXFwiIGRhdGEtYmluZCA9IFxcXCJ0ZXh0SW5wdXQ6IHRocmVzaG9sZFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XFxcImNvbnRyb2wtbGFiZWwgY29sLXNtLTRcXFwiIGZvcj1cXFwiYW5ub3RhdGlvbnJlcGxpY2FcXFwiPkFubm90YXRpb24gUmVwbGljYTo8L2xhYmVsPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtc20tOFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwibnVtYmVyXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIiBpZD1cXFwiYW5ub3RhdGlvbnJlcGxpY2FcXFwiIHJlcXVpcmVkIHBsYWNlaG9sZGVyPVxcXCJBbm5vdGF0aW9uIFJlcGxpY2FcXFwiIGRhdGEtYmluZCA9IFxcXCJ0ZXh0SW5wdXQ6IGFubm90YXRpb25SZXBsaWNhXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cXFwiY29udHJvbC1sYWJlbCBjb2wtc20tNFxcXCIgZm9yPVxcXCJhbm5vdGF0aW9uc2l6ZVxcXCI+QW5ub3RhdGlvbiBTaXplOjwvbGFiZWw+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1zbS04XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJudW1iZXJcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiIGlkPVxcXCJhbm5vdGF0aW9uc2l6ZVxcXCIgcmVxdWlyZWQgcGxhY2Vob2xkZXI9XFxcIkFubm90YXRpb24gU2l6ZSAocHgpXFxcIiBkYXRhLWJpbmQgPSBcXFwidGV4dElucHV0OiBhbm5vdGF0aW9uU2l6ZVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtc20tb2Zmc2V0LTIgY29sLXNtLTEwXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cXFwic3VibWl0XFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1kZWZhdWx0XFxcIiA+RWRpdCBDYW1wYWlnbjwvYnV0dG9uPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cXHJcXG5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTJcXFwiPjwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG48L2Rpdj5cIjtcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFV0ZW50ZSBvbiAwMy8wNi8yMDE3LlxyXG4gKi9cclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIga28gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sna28nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2tvJ10gOiBudWxsKTtcclxuXHJcblxyXG5cclxuZnVuY3Rpb24gVmlld01vZGVsKGN0eCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgc2VsZi5yZXBvc2l0b3JpZXMgPSBjdHgucmVwb3NpdG9yaWVzO1xyXG4gICAgc2VsZi5pbWFnZXMgPSBrby5vYnNlcnZhYmxlQXJyYXkoKTtcclxuICAgIHNlbGYuaW1hZ2VJbmZvID0ga28ub2JzZXJ2YWJsZSgpO1xyXG4gICAgc2VsZi5hY2NlcHRlZCA9IGtvLm9ic2VydmFibGUoKTtcclxuICAgIHNlbGYucmVqZWN0ZWQgPSBrby5vYnNlcnZhYmxlKCk7XHJcbiAgICBzZWxmLmFubm90YXRpb24gPSBrby5vYnNlcnZhYmxlQXJyYXkoKTtcclxuICAgIC8qc2VsZi5pbWFnZXMoKS5pbWFnZVVybFNyYyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIFwiaHR0cDovL2F3dC5pZm1sZWRpdC5vcmdcIit0aGlzLmNhbm9uaWNhbDtcclxuICAgIH0qL1xyXG4gICAgLy9zZWxmLmltYWdlU3RhdGlzdGljcyA9IGtvLm9ic2VydmFibGUoKTtcclxuXHJcblxyXG4gICAgc2VsZi5hZGRJbWFnZXMgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8qZm9yKHZhciB4IGluIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEN1cnJlbnRDYW1wYWlnbigpKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KHggKyBcIiBcIisgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0Q3VycmVudENhbXBhaWduKClbeF0pO1xyXG4gICAgICAgIH0qL1xyXG5cclxuICAgICAgICB2YXIgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgIGRhdGEuYXBwZW5kKFwiZmlsZS5qcGdcIixkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImltYWdlc1wiKS5maWxlc1swXSk7XHJcblxyXG4gICAgICAgIC8qdmFyIGkgPSAwO1xyXG4gICAgICAgIGZvcih2YXIgeCBpbiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImltYWdlc1wiKS5maWxlc1t4XSl7XHJcbiAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgZGF0YS5hcHBlbmQoXCJmaWxlXCIraSxkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImltYWdlc1wiKS5maWxlc1t4XSk7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiZmlsZVwiK2kgKyBcIiBhcHBlbmRlZFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qICQoXCI6ZmlsZVwiKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5maWxlcyAmJiB0aGlzLmZpbGVzWzBdKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuICAgICAgICAgICAgICAgIHJlYWRlci5vbmxvYWQgPSBpbWFnZUlzTG9hZGVkO1xyXG4gICAgICAgICAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwodGhpcy5maWxlc1swXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgIGZ1bmN0aW9uIGltYWdlSXNMb2FkZWQoZSkge1xyXG4gICAgICAgICAkKCcjbXlJbWcnKS5hdHRyKCdzcmMnLCBlLnRhcmdldC5yZXN1bHQpO1xyXG4gICAgICAgICB9O1xyXG4gICAgICAgICBodHRwOi8vanNmaWRkbGUubmV0L3ZhY2lkZXNpZ24vamEwdHlqMGYvXHJcblxyXG5cclxuICAgICAgICAvKnZhciBkYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgZGF0YS5hcHBlbmQoXCJmaWxlXCIsJChcIiNpbWFnZXNcIikuZmlsZXNbMF0pO1xyXG5cclxuICAgICAgICB2YXIgaSA9IDA7XHJcbiAgICAgICAgZm9yKHZhciB4IGluICQoXCIjaW1hZ2VzXCIpLmZpbGVzW3hdKXtcclxuICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICBkYXRhLmFwcGVuZChcImZpbGVcIitpLCQoXCIjaW1hZ2VzXCIpLmZpbGVzW3hdKTtcclxuICAgICAgICAgICAgYWxlcnQoXCJmaWxlXCIraSArIFwiIGFwcGVuZGVkXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKmpRdWVyeS5lYWNoKCQoXCIjaW1hZ2VzXCIpLmZpbGVzLCBmdW5jdGlvbihpLCBmaWxlKSB7XHJcbiAgICAgICAgICAgIGRhdGEuYXBwZW5kKCdmaWxlLScraSwgZmlsZSk7XHJcbiAgICAgICAgfSk7Ki9cclxuICAgICAgICAvL2FsZXJ0KGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEF1dGhBcGlUb2tlbigpKTtcclxuXHJcbiAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5lZGl0aW1hZ2VzLnVwbG9hZENhbXBhaWduUGhvdG9zKFxyXG4gICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRBdXRoQXBpVG9rZW4oKSxcclxuICAgICAgICAgICAgZGF0YSxcclxuICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0Q3VycmVudENhbXBhaWduKCkuaW1hZ2VcclxuICAgICAgICApLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAvL2FsZXJ0KFwiU3VjY2VzcyB1cGxvYWRcIik7XHJcbiAgICAgICAgICAgIHNlbGYubG9hZGVkKCk7XHJcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgLyphbGVydChcIkVycm9yIHVwbG9hZFwiKTtcclxuICAgICAgICAgICAgYWxlcnQoZSk7Ki9cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLypmb3IodmFyIGkgaW4gJChcIiNpbWFnZXNcIikuZmlsZXMpe1xyXG4gICAgICAgICAgICB2YXIgdXBsb2FkID0gbmV3IFVwbG9hZCgkKFwiI2ltYWdlc1wiKS5maWxlc1tpXSk7XHJcbiAgICAgICAgICAgIHVwbG9hZC5kb1VwbG9hZCgpO1xyXG4gICAgICAgICAgICAvL3ZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG5cclxuICAgICAgICAgICAgLy9yZWFkZXIucmVhZEFzRGF0YVVSTCgkKFwiI2ltYWdlc1wiKS5maWxlc1tpXSk7XHJcbiAgICAgICAgICAgIC8vREEgRkFSRTogUHJvZ3Jlc3MgQmFyXHJcbiAgICAgICAgICAgIC8qdmFyIHByb2dCYXIgPSAkKFwiPGRpdj48L2Rpdj5cIikuYXR0cih7XCJjbGFzc1wiOlwicHJvZ3Jlc3NcIn0pLlxyXG4gICAgICAgICAgICAgICAgYXBwZW5kQ2hpbGQoJChcIjxkaXY+PC9kaXY+XCIpLmF0dHIoe1xyXG4gICAgICAgICAgICAgICAgICAgIFwiaWRcIjppLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiY2xhc3NcIjpcInByb2dyZXNzLWJhclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicm9sZVwiOiBcInByb2dyZXNzYmFyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhcmlhLXZhbHVlbm93XCI6XCIwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhcmlhLXZhbHVlbWluXCI6XCIwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhcmlhLXZhbHVlbWF4XCI6XCIxMDBcIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlXCI6XCJ3aWR0aDo3MCVcIlxyXG4gICAgICAgICAgICB9KSkudGV4dCgwICsgXCIlXCIpO1xyXG4gICAgICAgICAgICAkKFwiI25leHRCdXR0b25cIikuYmVmb3JlKHByb2dCYXIpOyovXHJcbiAgICAgICAgICAgIC8vJChcIiNuZXh0QnV0dG9uXCIpLmJlZm9yZSgkKFwiPHNwYW4+PC9zcGFuPlwiKS5hdHRyKHtcImlkXCI6aX0pLnRleHQoXCJjYXJpY2F0byBpbCAwICVcIikpO1xyXG4gICAgICAgICAgICAvLyQoXCIjbmV4dEJ1dHRvblwiKS5iZWZvcmUoJChcIjxpbWc+PC9pbWc+XCIpLmF0dHIoe1wiaWRcIjpcImltYWdlXCIraX0pKTtcclxuICAgICAgICAgICAgLy9yZWFkZXIub25wcm9ncmVzcyA9IGZ1bmN0aW9uKGV2dCkgeyBzZWxmLnVwZGF0ZVByb2dyZXNzKGV2dCxpKTt9O1xyXG4gICAgICAgICAgICAvL3JlYWRlci5vbmxvYWQgPSBmdW5jdGlvbihldnQpIHtzZWxmLmxvYWRlZChldnQsaSl9O1xyXG4gICAgICAgICAgICAvL3JlYWRlci5vbmVycm9yID0gc2VsZi5lcnJvckhhbmRsZXI7XHJcbiAgICAgICAgICAgIC8vcmVhZGVyLm9ucHJvZ3Jlc3MgPSBzZWxmLnVwZGF0ZVByb2dyZXNzKGV2dCk7XHJcbiAgICAgICAgICAgIC8vcmVhZGVyLm9ubG9hZCA9IHNlbGYubG9hZGVkKGV2dCk7XHJcbiAgICAgICAgICAgIC8vcmVhZGVyLm9uZXJyb3IgPSBzZWxmLmVycm9ySGFuZGxlcjtcclxuICAgICAgICAvL31cclxuICAgIH1cclxuXHJcbiAgICAvKnNlbGYudXBkYXRlUHJvZ3Jlc3MgPSBmdW5jdGlvbihldnQsaSl7XHJcbiAgICAgICAgaWYgKGV2dC5sZW5ndGhDb21wdXRhYmxlKSB7XHJcbiAgICAgICAgICAgIHZhciBsb2FkZWQgPSAoZXZ0LmxvYWRlZCAvIGV2dC50b3RhbCk7XHJcbiAgICAgICAgICAgIC8vSU5TRVJJU0NJIENPRElDRSBQUk9HUkVTUyBCQVJcclxuICAgICAgICAgICAgaWYgKGxvYWRlZCA8IDEpIHtcclxuICAgICAgICAgICAgICAgIC8vIEluY3JlYXNlIHRoZSBwcm9nIGJhciBsZW5ndGhcclxuICAgICAgICAgICAgICAgIC8vIHN0eWxlLndpZHRoID0gKGxvYWRlZCAqIDIwMCkgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAkKFwiI1wiK2kpLnRleHQoXCJjYXJpY2F0byBpbCBcIisgbG9hZGVkICtcIiVcIik7XHJcbiAgICAgICAgICAgIH0gaWYobG9hZGVkID09MSl7XHJcbiAgICAgICAgICAgICAgICAvL25hc2NvbmRpIGJhcnJhXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgc2VsZi5sb2FkZWQgPSBmdW5jdGlvbihldnQsaSl7XHJcbiAgICAgICAgJChcIiNpbWFnZVwiK2kpLmF0dHIoJ3NyYycsIGV2dC50YXJnZXQucmVzdWx0KTtcclxuICAgIH07Ki9cclxuICAgIHNlbGYucmVtb3ZlSW1hZ2UgPSBmdW5jdGlvbihpbWFnZSl7XHJcbiAgICAgICAgLy9hbGVydChpbWFnZS5pZCk7XHJcbiAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5lZGl0aW1hZ2VzLnJlbW92ZUltYWdlKFxyXG4gICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRBdXRoQXBpVG9rZW4oKSxcclxuICAgICAgICAgICAgaW1hZ2UuaWRcclxuICAgICAgICAgICAgLy9zZWxmLmltYWdlcyh0aGlzKSkuaWRcclxuICAgICAgICApLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAvL2FsZXJ0KFwiU3VjY2VzcyBSZW1vdmVkXCIpO1xyXG4gICAgICAgICAgICBzZWxmLmxvYWRlZCgpO1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIC8qYWxlcnQoXCJFcnJvciBSZW1vdmVkXCIpO1xyXG4gICAgICAgICAgICBhbGVydChlKTsqL1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGYubG9hZGVkID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBhbGVydChjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRDdXJyZW50Q2FtcGFpZ24oKS5pbWFnZSk7XHJcbiAgICAgICBjdHgucmVwb3NpdG9yaWVzLmVkaXRpbWFnZXMuZ2V0Q2FtcGFpZ25JbWFnZXMoXHJcbiAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0QXV0aEFwaVRva2VuKCksXHJcbiAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0Q3VycmVudENhbXBhaWduKCkuaW1hZ2VcclxuICAgICAgICkuXHJcbiAgICAgICB0aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAvKmFsZXJ0KE9iamVjdC5rZXlzKHJlc3VsdCkubGVuZ3RoKTtcclxuICAgICAgICAgICBmb3IodmFyIHggaW4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocmVzdWx0KSlcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGFsZXJ0KHggKyBcIiBcIiArcmVzdWx0W3hdKTtcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgICAgZm9yKHZhciB4IGluIHJlc3VsdC5pbWFnZXMpe1xyXG4gICAgICAgICAgICAgICBhbGVydChyZXN1bHQuaW1hZ2VzW3hdLmlkKTtcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgICAgYWxlcnQoXCJTdWNjZXNzIGxvYWRlZFwiKTsqL1xyXG4gICAgICAgICAgIHNlbGYuaW1hZ2VzKHJlc3VsdC5pbWFnZXMpO1xyXG5cclxuICAgICAgICAgICAvKmZvcih2YXIgeCBpbiByZXN1bHQuaW1hZ2VzKXtcclxuICAgICAgICAgICAgICAgcmVzdWx0LmltYWdlc1t4XS5jYW5vbmljYWwgPSBcImh0dHA6Ly9hd3QuaWZtbGVkaXQub3JnXCIgKyByZXN1bHQuaW1hZ2VzW3hdLmNhbm9uaWNhbDtcclxuICAgICAgICAgICB9Ki9cclxuXHJcbiAgICAgICAgICAgaWYoIShyZXN1bHRbaW1hZ2VzXSA9PT0gdW5kZWZpbmVkKSkge1xyXG4gICAgICAgICAgICAgICBpZiAocmVzdWx0W2ltYWdlc10ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgc2VsZi5pbWFnZXMocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIH1cclxuICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgLyphbGVydChcIkVycm9yIGxvYWRlZFwiKTtcclxuICAgICAgICAgICBhbGVydChlKTsqL1xyXG4gICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHNlbGYuZXJyb3JIYW5kbGVyID0gZnVuY3Rpb24oZXZ0KXtcclxuICAgICAgICBhbGVydChldnQudGFyZ2V0LmVycm9yLm5hbWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICBzZWxmLmxvYWRlZCgpO1xyXG5cclxuXHJcblxyXG4gICAgLy8kKFwiaW1hZ2VzXCIpLm9uKFwiY2xpY2tcIixzZWxmLmFkZEltYWdlcyk7XHJcbn1cclxuXHJcbmV4cG9ydHMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdlZGl0LWltYWdlcy1jYW1wYWlnbicsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZS5odG1sJyksXHJcbiAgICAgICAgdmlld01vZGVsOiBWaWV3TW9kZWxcclxuICAgIH0pO1xyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gXCI8bmF2LWJhciBwYXJhbXMgPSBcXFwicmVwb3NpdG9yaWVzOiByZXBvc2l0b3JpZXNcXFwiPjwvbmF2LWJhcj5cXHJcXG48ZGl2IGNsYXNzPVxcXCJjb250YWluZXJcXFwiIHN0eWxlID0gXFxcIm1hcmdpbjogYXV0b1xcXCI+XFxyXFxuXFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcInJvd1xcXCIgPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tMVxcXCI+PC9kaXY+XFxyXFxuXFxyXFxuICAgICAgICA8ZGl2IGNsYXNzID0gXFxcImNvbC1zbS03XFxcIj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbCBwYW5lbC1wcmltYXJ5XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtaGVhZGluZ1xcXCI+QWRkIGltYWdlcyB0byB0aGUgQ2FtcGFpZ248L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtYm9keVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8Zm9ybSBjbGFzcz1cXFwiZm9ybS1ob3Jpem9udGFsXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQgPSBcXFwiaW1hZ2VzXFxcIiAgdHlwZT1cXFwiZmlsZVxcXCIgYWNjZXB0ID0gXFxcImltYWdlL2pwZWdcXFwiIGNsYXNzPVxcXCJidG4gYnRuLWRlZmF1bHRcXFwiPjwvaW5wdXQ+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGUgPSBcXFwic3VibWl0XFxcIiB2YWx1ZSA9IFxcXCJBZGQgSW1hZ2VzXFxcIiBkYXRhLWJpbmQgPSBcXFwiY2xpY2s6IGFkZEltYWdlc1xcXCIvPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbCBwYW5lbC1wcmltYXJ5XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtaGVhZGluZ1xcXCI+RWRpdCBpbWFnZXMgb2YgQ2FtcGFpZ248L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtYm9keVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+IFByZXNzIHRoZSBYIGJ1dHRvbiB0byByZW1vdmUgYW4gaW1hZ2UgZnJvbSB0aGUgY2FtcGFpZ248L3A+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8dWwgZGF0YS1iaW5kPVxcXCJmb3JlYWNoOiBpbWFnZXNcXFwiIHN0eWxlID0gXFxcImxpc3Qtc3R5bGUtdHlwZTpub25lXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwgcGFuZWwtcHJpbWFyeVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWhlYWRpbmdcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcImNsb3NlXFxcIiBkYXRhLWRpc21pc3M9XFxcImFsZXJ0XFxcIiBhcmlhLWxhYmVsPVxcXCJjbG9zZVxcXCIgZGF0YS1iaW5kID0gXFxcImNsaWNrOiAkcGFyZW50LnJlbW92ZUltYWdlXFxcIj4mdGltZXM7PC9hPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtYm9keVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1tZC00XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidGh1bWJuYWlsXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08YSBocmVmID0gXFxcIiNcXFwiIGRhdGEtYmluZCA9IFxcXCJjbGljazogJHBhcmVudC5nZXRJbWFnZUluZm9cXFwiPi0tPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgZGF0YS1iaW5kID0gXFxcImF0dHI6IHtzcmM6IGNhbm9uaWNhbH1cXFwiLz5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08L2E+LS0+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgIDwvbGk+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tMVxcXCI+PC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcbjwvZGl2PlwiO1xuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgVXRlbnRlIG9uIDAzLzA2LzIwMTcuXHJcbiAqL1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciBrbyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydrbyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsna28nXSA6IG51bGwpO1xyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBWaWV3TW9kZWwoY3R4KSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZWxmLnJlcG9zaXRvcmllcyA9IGN0eC5yZXBvc2l0b3JpZXM7XHJcbiAgICBzZWxmLndvcmtlcnMgPSBrby5vYnNlcnZhYmxlQXJyYXkoKTtcclxuICAgIHNlbGYuY3VycmVudFdvcmtlciA9IGtvLm9ic2VydmFibGUoKTtcclxuXHJcbiAgICBzZWxmLmdldFdvcmtlcnMgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vYWxlcnQoXCJzdG8gcGVyIGZhcmUgd29ya2Vyc1wiKTtcclxuICAgICAgICBjdHgucmVwb3NpdG9yaWVzLmVkaXR3b3JrZXJzLmdldFdvcmtlcnMoXHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEF1dGhBcGlUb2tlbigpLFxyXG4gICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRDdXJyZW50Q2FtcGFpZ24oKS53b3JrZXJcclxuICAgICAgICApLlxyXG4gICAgICAgIHRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgIC8vIGFsZXJ0KFwic3VjY2Vzc28gd29ya2Vyc1wiKTtcclxuICAgICAgICAgICAvLyBhbGVydChPYmplY3Qua2V5cyhyZXN1bHQpLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIC8qZm9yKHZhciB4IGluIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHJlc3VsdCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KHggKyBcIiBcIiArcmVzdWx0W3hdKTtcclxuICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgLyogZm9yKHZhciB4IGluIHJlc3VsdC53b3JrZXJzKXtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KHJlc3VsdC53b3JrZXJzW3hdLmlkKTtcclxuICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgIHNlbGYud29ya2VycyhyZXN1bHQud29ya2Vycyk7XHJcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJFcnJvciB3b3JrZXJzXCIpO1xyXG4gICAgICAgICAgICBhbGVydChlKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBzZWxmLmdldFdvcmtlcnMoKTtcclxuXHJcbiAgICBzZWxmLnN1Ym1pdFdvcmtlciA9IGZ1bmN0aW9uKHdvcmtlcil7XHJcbiAgICAgICAgLy9hbGVydChcInN0byBwZXIgZmFyZSBzdWJtaXRXb3JrZXJcIik7XHJcbiAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5lZGl0d29ya2Vycy5nZXRXb3JrZXJJbmZvKFxyXG4gICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRBdXRoQXBpVG9rZW4oKSxcclxuICAgICAgICAgICAgd29ya2VyLmlkXHJcbiAgICAgICAgKS5cclxuICAgICAgICB0aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAvLyBhbGVydChcInN1Y2Nlc3NvIHN1Ym1pdFdvcmtlclwiKTtcclxuICAgICAgICAgICAgLypmb3IodmFyIHggaW4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocmVzdWx0KSlcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgIGFsZXJ0KHggKyBcIiBcIiArcmVzdWx0W3hdKTtcclxuICAgICAgICAgICAgIH0qL1xyXG4gICAgICAgICAgICBzZWxmLmN1cnJlbnRXb3JrZXIocmVzdWx0KTtcclxuICAgICAgICAgICAgc2VsZi5zZXRTZWxlY3Rvcih3b3JrZXIpO1xyXG4gICAgICAgICAgICBzZWxmLnNldEFubm90YXRvcih3b3JrZXIpO1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3Igc3VibWl0V29ya2VyXCIpO1xyXG4gICAgICAgICAgICBhbGVydChlKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHNlbGYuc2V0U2VsZWN0b3IgPSBmdW5jdGlvbih3b3JrZXIpe1xyXG4gICAgICAgIC8vYWxlcnQoXCJTdG8gcGVyIGZhcmUgc2V0U2VsZWN0b3JcIik7XHJcbiAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5lZGl0d29ya2Vycy5zZXRTZWxlY3RvcihcclxuICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0QXV0aEFwaVRva2VuKCksXHJcbiAgICAgICAgICAgIHdvcmtlci5zZWxlY3RvcixcclxuICAgICAgICAgICAgc2VsZi5jdXJyZW50V29ya2VyKCkuc2VsZWN0aW9uXHJcbiAgICAgICAgKS5cclxuICAgICAgICB0aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgLy9hbGVydChcInN1Y2Nlc3NvIHNlbGVjdGlvbkVkaXRcIik7XHJcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgLy9hbGVydChcIlN1Y2Nlc3NvXCIpO1xyXG4gICAgICAgICAgICBhbGVydChlKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBzZWxmLnNldEFubm90YXRvciA9IGZ1bmN0aW9uKHdvcmtlcil7XHJcblxyXG4gICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuZWRpdHdvcmtlcnMuc2V0U2VsZWN0b3IoXHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEF1dGhBcGlUb2tlbigpLFxyXG4gICAgICAgICAgICB3b3JrZXIuYW5ub3RhdG9yLFxyXG4gICAgICAgICAgICBzZWxmLmN1cnJlbnRXb3JrZXIoKS5hbm5vdGF0aW9uXHJcbiAgICAgICAgKS5cclxuICAgICAgICB0aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJTdWNjZXNzb1wiKTtcclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBhbGVydChcIkVycm9yIGFubm90YXRpb25FZGl0XCIpO1xyXG4gICAgICAgICAgICBhbGVydChlKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydHMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdlZGl0LXdvcmtlcnMtY2FtcGFpZ24nLCB7XHJcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGUuaHRtbCcpLFxyXG4gICAgICAgIHZpZXdNb2RlbDogVmlld01vZGVsXHJcbiAgICB9KTtcclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPG5hdi1iYXIgcGFyYW1zID0gXFxcInJlcG9zaXRvcmllczogcmVwb3NpdG9yaWVzXFxcIj48L25hdi1iYXI+XFxyXFxuPGRpdiBjbGFzcz1cXFwiY29udGFpbmVyXFxcIiBzdHlsZSA9IFxcXCJtYXJnaW46IGF1dG9cXFwiPlxcclxcblxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiID5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTJcXFwiPjwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tOFxcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwgcGFuZWwtcHJpbWFyeVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWhlYWRpbmdcXFwiPldvcmtlcnMgZm9yIHRoZSBjYW1wYWlnbjwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1ib2R5XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxoND5Bc3NpZ24gb25lIG9yIG1vcmUgcm9sZXMgdG8gdGhlIGRlc2lyZWQgd29ya2VycywgdGhlbiBjbGljayBzdWJtaXQ6IDwvaDQ+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3MgPSBcXFwidGFibGUtaG92ZXJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8dHI+PHRoPldvcmtlciBOYW1lPC90aD48dGg+U2VsZWN0b3I8L3RoPjx0aD5Bbm5vdGF0b3I8L3RoPjwvdHI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHkgZGF0YS1iaW5kPVxcXCJmb3JlYWNoOiB3b3JrZXJzXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8dHI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD48c3BhbiBkYXRhLWJpbmQ9XFxcInRleHQ6IGZ1bGxuYW1lXFxcIj48L3NwYW4+PC90ZD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPiA8aW5wdXQgdHlwZT1cXFwiY2hlY2tib3hcXFwiIGRhdGEtYmluZD1cXFwiY2hlY2tlZDogc2VsZWN0b3JcXFwiIC8+PC90ZD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPiA8aW5wdXQgdHlwZT1cXFwiY2hlY2tib3hcXFwiIGRhdGEtYmluZD1cXFwiY2hlY2tlZDogYW5ub3RhdG9yXFxcIiAvPjwvdGQ+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD48YnV0dG9uIGNsYXNzPVxcXCJidG4gYnRuLWRlZmF1bHRcXFwiIGRhdGEtYmluZCA9IFxcXCJjbGljazogJHBhcmVudC5zdWJtaXRXb3JrZXJcXFwiPlN1Ym1pdDwvYnV0dG9uPjwvdGQ+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTJcXFwiPjwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG4gICAgPGRpdj5cXHJcXG4gICAgICAgIDxwPjxzcGFuIGRhdGEtYmluZCA9IFxcXCJjdXJyZW50V29ya2VyLnNlbGVjdGlvblxcXCI+PC9zcGFuPjwvYnI+PHNwYW4gZGF0YS1iaW5kID0gXFxcImN1cnJlbnRXb3JrZXIuYW5ub3RhdGlvblxcXCI+PC9zcGFuPjwvcD5cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9kaXY+XCI7XG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBVdGVudGUgb24gMTAvMDYvMjAxNy5cclxuICovXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIGtvID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2tvJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydrbyddIDogbnVsbCk7XHJcblxyXG5mdW5jdGlvbiBWaWV3TW9kZWwoY3R4KSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZWxmLnJlcG9zaXRvcmllcyA9IGN0eC5yZXBvc2l0b3JpZXM7XHJcbiAgICBzZWxmLmNhbXBhaWduTmFtZSA9IGtvLm9ic2VydmFibGUoY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0Q3VycmVudENhbXBhaWduKCkubmFtZSk7XHJcbiAgICB2YXIgdGVtcFN0YXQgPSBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRDdXJyZW50Q2FtcGFpZ25TdGF0aXN0aWNzKCk7XHJcbiAgICBzZWxmLmltYWdlc0MgPSBrby5vYnNlcnZhYmxlKHRlbXBTdGF0LmltYWdlcyk7XHJcbiAgICBzZWxmLmFjY2VwdGVkID0ga28ub2JzZXJ2YWJsZSh0ZW1wU3RhdC5hY2NlcHRlZCk7XHJcbiAgICBzZWxmLnJlamVjdGVkID0ga28ub2JzZXJ2YWJsZSh0ZW1wU3RhdC5yZWplY3RlZCk7XHJcbiAgICBzZWxmLmFubm90YXRpb24gPSBrby5vYnNlcnZhYmxlKHRlbXBTdGF0LmFubm90YXRpb24pO1xyXG4gICAgc2VsZi5pbWFnZXMgPSBrby5vYnNlcnZhYmxlQXJyYXkoY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0Q3VycmVudENhbXBhaWduU3RhdGlzdGljc0ltYWdlcygpKTtcclxuXHJcblxyXG4vLyAgICBzZWxmLnNldENhbXBhaWduU3RhdGlzdGljcyA9IGZ1bmN0aW9uKHJlc3VsdCl7XHJcblxyXG4gIC8vICB9O1xyXG4gICAgLy9zZWxmLmdldENhbXBhaWduU3RhdGlzdGljcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvKnZhciBjYWNoZWRSZXN1bHQgPSBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRDdXJyZW50Q2FtcGFpZ25TdGF0aXN0aWNzKCk7XHJcbiAgICAgICAgIGlmKGNhY2hlZFJlc3VsdCl7XHJcbiAgICAgICAgIHNlbGYuc2V0Q2FtcGFpZ25TdGF0aXN0aWNzKGNhY2hlZFJlc3VsdCk7XHJcbiAgICAgICAgIH1lbHNlIHsqL1xyXG4gICAgICAgLyogY3R4LnJlcG9zaXRvcmllcy5lbmRlZGNhbXBhaWduc3RhdGlzdGljcy5nZXRDYW1wYWlnblN0YXRpc3RpY3MoXHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEF1dGhBcGlUb2tlbigpLFxyXG4gICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRDdXJyZW50Q2FtcGFpZ24oKS5zdGF0aXN0aWNzXHJcbiAgICAgICAgKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgLy9hbGVydChcIlN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgIHNlbGYuaW1hZ2VzQyhyZXN1bHQuaW1hZ2VzKTtcclxuICAgICAgICAgICAgc2VsZi5hY2NlcHRlZChyZXN1bHQuYWNjZXB0ZWQpO1xyXG4gICAgICAgICAgICBzZWxmLnJlamVjdGVkKHJlc3VsdC5yZWplY3RlZCk7XHJcbiAgICAgICAgICAgIHNlbGYuYW5ub3RhdGlvbihyZXN1bHQuYW5ub3RhdGlvbik7XHJcbiAgICAgICAgICAgIC8vY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuc2V0Q3VycmVudENhbXBhaWduU3RhdGlzdGljcyhyZXN1bHQpO1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIC8vYWxlcnQoXCJFcnJvclwiKTtcclxuICAgICAgICAgICAgc2VsZi5zaG91bGRTaG93TWVzc2FnZSh0cnVlKTtcclxuICAgICAgICAgICAgdmFyIHRlbXAgPSAnJztcclxuICAgICAgICAgICAgZm9yICh2YXIgeCBpbiBlLmVycm9ycykge1xyXG4gICAgICAgICAgICAgICAgdGVtcCArPSB4ICsgXCI6IFwiICsgZS5lcnJvcnNbeF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5lcnJvck1lc3NhZ2UoXCIgXCIgKyB0ZW1wKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL31cclxuICAgIH07XHJcblxyXG4gICAgICAgIHNlbGYubG9hZGVkID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBjdHgucmVwb3NpdG9yaWVzLmVkaXRpbWFnZXMuZ2V0Q2FtcGFpZ25JbWFnZXMoXHJcbiAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0QXV0aEFwaVRva2VuKCksXHJcbiAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0Q3VycmVudENhbXBhaWduKCkuaW1hZ2VcclxuICAgICAgICApLlxyXG4gICAgICAgIHRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgIHNlbGYuaW1hZ2VzKHJlc3VsdC5pbWFnZXMpO1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgYWxlcnQoXCJFcnJvciBsb2FkZWRcIik7XHJcbiAgICAgICAgYWxlcnQoZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuKi9cclxuXHJcbiAgICAvL1JBQ0NPR0xJRSBTVEFUSVNUSUMgVVJMLCBQT0kgTE8gVVNBIFBFUiBBTFRSTyBTQ09QT1xyXG4gICAgc2VsZi5nZXRJbWFnZUluZm8gPSBmdW5jdGlvbihpbWFnZSl7XHJcbiAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5lbmRlZGNhbXBhaWduc3RhdGlzdGljcy5nZXRJbWFnZUluZm8oXHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEF1dGhBcGlUb2tlbigpLFxyXG4gICAgICAgICAgICBpbWFnZS5pZFxyXG4gICAgICAgICkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuZW5kZWRjYW1wYWlnbnN0YXRpc3RpY3MuZ2V0SW1hZ2VTdGF0aXN0aWNzKFxyXG4gICAgICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0QXV0aEFwaVRva2VuKCksXHJcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhdGlzdGljc1xyXG4gICAgICAgICAgICApLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcclxuICAgICAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLnNldEN1cnJlbnRJbWFnZVN0YXRpc3RpY3MocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLnNldEN1cnJlbnRJbWFnZShpbWFnZS5jYW5vbmljYWwpO1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaGFzaCA9IFwiL0ltYWdlU3RhdGlzdGljc1wiO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIkVycm9yIGdldEltYWdlU3RhdGlzdGljc1wiKTtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBhbGVydChcIkVycm9yIGdldEltYWdlSW5mb1wiKTtcclxuICAgICAgICAgICAgYWxlcnQoZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgIC8vIHNlbGYubG9hZGVkKCk7XHJcbiAgICAvLyBzZWxmLmdldENhbXBhaWduU3RhdGlzdGljcygpO1xyXG59XHJcblxyXG5leHBvcnRzLnJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAga28uY29tcG9uZW50cy5yZWdpc3RlcignZW5kZWQtY2FtcGFpZ24tc3RhdGlzdGljcycsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZS5odG1sJyksXHJcbiAgICAgICAgdmlld01vZGVsOiBWaWV3TW9kZWxcclxuICAgIH0pO1xyXG59O1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPG5hdi1iYXIgcGFyYW1zID0gXFxcInJlcG9zaXRvcmllczogcmVwb3NpdG9yaWVzXFxcIj48L25hdi1iYXI+XFxyXFxuPGRpdiBjbGFzcz1cXFwiY29udGFpbmVyXFxcIiBzdHlsZSA9IFxcXCJtYXJnaW46IGF1dG9cXFwiPlxcclxcblxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiID5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTJcXFwiPjwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tOFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsIHBhbmVsLXByaW1hcnlcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtaGVhZGluZ1xcXCI+Q2FtcGFpZ24gc3RhdGlzdGljczwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtYm9keVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE51bWJlciBvZiBpbWFnZXM6IDxzcGFuIGRhdGEtYmluZCA9IFxcXCJ0ZXh0OmltYWdlc0NcXFwiPjwvc3Bhbj48YnIvPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBOdW1iZXIgb2YgYWNjZXB0ZWQgaW1hZ2VzOiA8c3BhbiBkYXRhLWJpbmQgPSBcXFwidGV4dDphY2NlcHRlZFxcXCI+PC9zcGFuPjxici8+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE51bWJlciBvZiByZWplY3RlZCBpbWFnZXM6IDxzcGFuIGRhdGEtYmluZCA9IFxcXCJ0ZXh0OnJlamVjdGVkXFxcIj48L3NwYW4+PGJyLz5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTnVtYmVyIG9mIGFubm90YXRpb25zOiA8c3BhbiBkYXRhLWJpbmQgPSBcXFwidGV4dDphbm5vdGF0aW9uXFxcIj48L3NwYW4+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzID0gXFxcImNvbC1zbS0yXFxcIj48L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuICAgIDxkaXYgY2xhc3MgPSBcXFwicm93XFxcIj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTJcXFwiPjwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tOFxcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwgcGFuZWwtcHJpbWFyeVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWhlYWRpbmdcXFwiPiBJbWFnZXMgb2YgdGhlIENhbXBhaWduPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWJvZHlcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPHVsIGRhdGEtYmluZD1cXFwiZm9yZWFjaDogaW1hZ2VzXFxcIiBzdHlsZSA9IFxcXCJsaXN0LXN0eWxlLXR5cGU6bm9uZVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1ib2R5XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInJvd1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLW1kLTRcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ0aHVtYm5haWxcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZiA9IFxcXCIjXFxcIiBkYXRhLWJpbmQgPSBcXFwiY2xpY2s6ICRwYXJlbnQuZ2V0SW1hZ2VJbmZvXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVxcXCJpbWctdGh1bWJuYWlsIGltZy1yZXNwb25zaXZlXFxcIiBkYXRhLWJpbmQgPSBcXFwiYXR0cjoge3NyYzogY2Fub25pY2FsfVxcXCIvPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC91bD5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTJcXFwiPjwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG48L2Rpdj5cIjtcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFV0ZW50ZSBvbiAyMi8wNS8yMDE3LlxyXG4gKi9cclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIga28gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sna28nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2tvJ10gOiBudWxsKTtcclxuXHJcbmZ1bmN0aW9uIFZpZXdNb2RlbChjdHgpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHNlbGYucmVwb3NpdG9yaWVzID0gY3R4LnJlcG9zaXRvcmllcztcclxufVxyXG5cclxuZXhwb3J0cy5yZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2hvbWUtcGFnZScsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZS5odG1sJyksXHJcbiAgICAgICAgdmlld01vZGVsOiBWaWV3TW9kZWwsXHJcbiAgICB9KTtcclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IFwiXFxyXFxuPG5hdi1iYXIgcGFyYW1zID0gXFxcInJlcG9zaXRvcmllczogcmVwb3NpdG9yaWVzXFxcIj48L25hdi1iYXI+XFxyXFxuPGRpdiBjbGFzcz1cXFwiY29udGFpbmVyXFxcIiBzdHlsZSA9IFxcXCJtYXJnaW46IGF1dG9cXFwiPlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiID5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTJcXFwiPjwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLThcXFwiPlxcclxcbiAgICAgICAgICAgIDxoMSBzdHlsZSA9IFxcXCJwYWRkaW5nLWJvdHRvbToxZW07IHRleHQtYWxpZ246IGNlbnRlclxcXCI+WW91ciBDcm93ZHNvdXJjaW5nIENhbXBhaWduIFN0YXJ0cyBOb3c8L2gxPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3MgPSBcXFwicm93XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tM1xcXCI+PC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTNcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGEgZGF0YS1iaW5kID0gXFxcInBhdGg6ICcvU2lnblVwJ1xcXCIgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCIgcm9sZT1cXFwiYnV0dG9uXFxcIj48c3BhbiBjbGFzcz1cXFwiZ2x5cGhpY29uIGdseXBoaWNvbi11c2VyXFxcIj48L3NwYW4+IFNpZ25VcDwvYT5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTNcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGEgZGF0YS1iaW5kID0gXFxcInBhdGg6ICcvTG9nSW4nXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIiByb2xlPVxcXCJidXR0b25cXFwiPjxzcGFuIGNsYXNzPVxcXCJnbHlwaGljb24gZ2x5cGhpY29uLWxvZy1pblxcXCI+PC9zcGFuPiBMb2dJbjwvYT5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTNcXFwiPjwvZGl2PlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzID0gXFxcImNvbC1zbS0yXFxcIj48L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9kaXY+XFxyXFxuXCI7XG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBVdGVudGUgb24gMDkvMDYvMjAxNy5cclxuICovXHJcblwidXNlIHN0cmljdFwiO1xyXG52YXIga28gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sna28nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2tvJ10gOiBudWxsKSwgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKTtcclxuXHJcblxyXG5cclxuZnVuY3Rpb24gVmlld01vZGVsKGN0eCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgc2VsZi5yZXBvc2l0b3JpZXMgPSBjdHgucmVwb3NpdG9yaWVzO1xyXG5cclxuICAgIHZhciBzdGF0aXN0aWNzID0gY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0Q3VycmVudEltYWdlU3RhdGlzdGljcygpO1xyXG4gICAgc2VsZi5hY2NlcHRlZCA9IGtvLm9ic2VydmFibGUoc3RhdGlzdGljcy5zZWxlY3Rpb24uYWNjZXB0ZWQpO1xyXG4gICAgc2VsZi5yZWplY3RlZCA9IGtvLm9ic2VydmFibGUoc3RhdGlzdGljcy5zZWxlY3Rpb24ucmVqZWN0ZWQpO1xyXG4gICAgc2VsZi5hbm5vdGF0aW9uID0ga28ub2JzZXJ2YWJsZUFycmF5KHN0YXRpc3RpY3MuYW5ub3RhdGlvbik7XHJcbiAgICBmb3IodmFyIHggaW4gc3RhdGlzdGljcy5hbm5vdGF0aW9uKXtcclxuICAgICAgICBhbGVydCh4ICsgXCIgXCIgKyBzdGF0aXN0aWNzLmFubm90YXRpb25beF0pO1xyXG4gICAgfVxyXG4gICAgc2VsZi5hbm5vdGF0aW9uQXZhaWxhYmxlID0ga28ub2JzZXJ2YWJsZShzZWxmLmFubm90YXRpb24oKS5sZW5ndGgpO1xyXG5cclxuXHJcbiAgICAvL2FsZXJ0KGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEN1cnJlbnRJbWFnZSgpKTtcclxuICAgIHNlbGYuc3JjID0ga28ub2JzZXJ2YWJsZShjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRDdXJyZW50SW1hZ2UoKSk7IC8vY2Fub25pY2FsIFVSTFxyXG5cclxuICAgIC8vYWxlcnQoY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0Q3VycmVudENhbXBhaWduKCkuYW5ub3RhdGlvbl9zaXplKTtcclxuICAgIHNlbGYuc2l6ZSA9IGtvLm9ic2VydmFibGUoY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0Q3VycmVudENhbXBhaWduKCkuYW5ub3RhdGlvbl9zaXplKTtcclxuXHJcbiAgICAkKFwiI2NhbnZhc1wiKS5vbihcImxvYWRcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICBjdHggPSAkKFwiI2NhbnZhc1wiKS5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIHZhciBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIDAsIDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGltYWdlLnNyYyA9IHZhbHVlO1xyXG4gICAgfSk7XHJcblxyXG59XHJcblxyXG5leHBvcnRzLnJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAga28uY29tcG9uZW50cy5yZWdpc3RlcignaW1hZ2Utc3RhdGlzdGljcycsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZS5odG1sJyksXHJcbiAgICAgICAgdmlld01vZGVsOiBWaWV3TW9kZWxcclxuICAgIH0pO1xyXG59O1xyXG4vKlxyXG4gc2VsZi5nZXRJbWFnZUluZm8gPSBmdW5jdGlvbihpbWFnZSl7XHJcbiBjdHgucmVwb3NpdG9yaWVzLmVkaXRpbWFnZXMuZ2V0SW1hZ2VJbmZvKFxyXG4gY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0QXV0aEFwaVRva2VuKCksXHJcbiAvL3NlbGYuaW1hZ2VzKHRoaXMpLmlkXHJcbiBpbWFnZS5pZFxyXG4gKS5cclxuIHRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gYWxlcnQoXCJTdWNjZXNzIGltYWdlSW5mb1wiKTtcclxuIHNlbGYuaW1hZ2VJbmZvKHJlc3VsdCk7XHJcbiBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5zZXRDdXJyZW50SW1hZ2Uoc2VsZi5pbWFnZUluZm8oKS5pZCk7XHJcbiBzZWxmLmdldEltYWdlU3RhdGlzdGljcygpO1xyXG4gfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcclxuIGFsZXJ0KFwiRXJyb3IgaW1hZ2VJbmZvXCIpO1xyXG4gYWxlcnQoZSk7XHJcbiB9KTtcclxuIH1cclxuIDtcclxuIHNlbGYuZ2V0SW1hZ2VTdGF0aXN0aWNzID0gZnVuY3Rpb24oKXtcclxuIGN0eC5yZXBvc2l0b3JpZXMuZWRpdGltYWdlcy5nZXRJbWFnZVN0YXRpc3RpY3MoXHJcbiBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRBdXRoQXBpVG9rZW4oKSxcclxuIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEN1cnJlbnRJbWFnZSgpXHJcbiApLlxyXG4gdGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiBhbGVydChcIlN1Y2Nlc3MgaW1hZ2VTdGF0aXN0aWNzXCIpO1xyXG4gLy9zZWxmLmltYWdlU3RhdGlzdGljcyhyZXN1bHQpO1xyXG4gLy9hbGVydChcImFjY1wiICtyZXN1bHQuc2VsZWN0aW9uLmFjY2VwdGVkKTtcclxuIC8vc2VsZi5hY2NlcHRlZChyZXN1bHQuc2VsZWN0aW9uLmFjY2VwdGVkKTtcclxuIGFsZXJ0KFwicmVqXCIrcmVzdWx0LnNlbGVjdGlvbi5yZWplY3RlZCk7XHJcbiBzZWxmLnJlamVjdGVkKHJlc3VsdC5zZWxlY3Rpb24ucmVqZWN0ZWQpO1xyXG4gYWxlcnQocmVzdWx0LmFubm90YXRpb24ubGVuZ3RoKTtcclxuIHNlbGYuYW5ub3RhdGlvbihyZXN1bHQuYW5ub3RhdGlvbik7XHJcbiB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gYWxlcnQoXCJFcnJvciBpbWFnZVN0YXRpc3RpY3NcIik7XHJcbiBhbGVydChlKTtcclxuIH0pO1xyXG4gKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPG5hdi1iYXIgcGFyYW1zID0gXFxcInJlcG9zaXRvcmllczogcmVwb3NpdG9yaWVzXFxcIj48L25hdi1iYXI+XFxyXFxuPGRpdiBjbGFzcz1cXFwiY29udGFpbmVyXFxcIiBzdHlsZSA9IFxcXCJtYXJnaW46IGF1dG9cXFwiPlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiID5cXHJcXG48ZGl2IGNsYXNzID0gXFxcImNvbC1zbS0yXFxcIj5cXHJcXG48L2Rpdj5cXHJcXG4gICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tNFxcXCI+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbCBwYW5lbC1wcmltYXJ5XFxcIj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1oZWFkaW5nXFxcIj5TZWxlY3Rpb24gU3RhdGlzdGljczwvZGl2PlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWJvZHlcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8cD5cXHJcXG4gICAgICAgICAgICAgICAgICAgIFNlbGVjdGlvbjo8YnIvPlxcclxcbiAgICAgICAgICAgICAgICAgICAgQWNjZXB0ZWQ6IDxzcGFuIGRhdGEtYmluZCA9IFxcXCJ0ZXh0OmFjY2VwdGVkXFxcIj48L3NwYW4+PGJyLz5cXHJcXG4gICAgICAgICAgICAgICAgICAgIFJlamVjdGVkOiA8c3BhbiAgZGF0YS1iaW5kID0gXFxcInRleHQ6cmVqZWN0ZWRcXFwiPjwvc3Bhbj48YnIvPlxcclxcbiAgICAgICAgICAgICAgICA8L3A+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTZcXFwiPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwgcGFuZWwtcHJpbWFyeVxcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtaGVhZGluZ1xcXCI+QW5ub3RhdGlvbiBTdGF0aXN0aWNzPC9kaXY+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtYm9keVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1iaW5kID0gXFxcImlmbm90OiBhbm5vdGF0aW9uQXZhaWxhYmxlXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIE5vIGFubm90YXRpb25zIGFyZSBhdmlsYWJsZSBmb3IgdGhpcyBjYW1wYWlnbi5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1iaW5kID0gXFxcImlmOmFubm90YXRpb25BdmFpbGFibGVcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPCEtLVRFTVBPUkFORU8tLT5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxvbCBkYXRhLWJpbmQgPSBcXFwiZm9yZWFjaDoge2RhdGE6IGFubm90YXRpb24sIGFzOiAnbXlBbm5vdGF0aW9uJ31cXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcyA9IFxcXCJsaW5lZHJhd2VyXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpbmUtZGlzcGxheWVyIHBhcmFtcz1cXFwic3JjOiAkcGFyZW50LnNyYywgZGF0YTogbXlBbm5vdGF0aW9uXFxcIj48L2xpbmUtZGlzcGxheWVyPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tPGltZyBkYXRhLWJpbmQ9XFxcImF0dHI6IHsgc3JjOiAkcGFyZW50LnNyYyB9XFxcIiBjbGFzcz1cXFwiYmFja2dyb3VuZFxcXCIgZHJhZ2dhYmxlPVxcXCJmYWxzZVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjYW52YXMgaWQgPSBcXFwiY2FudmFzXFxcIj48L2NhbnZhcz5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1iaW5kID0gXFxcInRleHQ6IGFubm90YXRpb25cXFwiPjwvc3Bhbj4tLT5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9vbD5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwhLS1cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cXFwibXlDYXJvdXNlbFxcXCIgY2xhc3M9XFxcImNhcm91c2VsIHNsaWRlXFxcIiBkYXRhLXJpZGU9XFxcImNhcm91c2VsXFxcIiA+XFxyXFxuXFxyXFxuICAgICAgICAgICAgICAgICAgICA8b2wgY2xhc3M9XFxcImNhcm91c2VsLWluZGljYXRvcnNcXFwiIGRhdGEtYmluZCA9IFxcXCJmb3JlYWNoOiBhbm5vdGF0aW9uXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtYmluZCA9IFxcXCJpZm5vdDokaW5kZXhcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgZGF0YS10YXJnZXQ9XFxcIiNteUNhcm91c2VsXFxcIiBkYXRhLXNsaWRlLXRvPVxcXCIkaW5kZXhcXFwiIGNsYXNzPVxcXCJhY3RpdmVcXFwiPjwvbGk+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLWJpbmQgPSBcXFwiaWY6JGluZGV4XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGRhdGEtdGFyZ2V0PVxcXCIjbXlDYXJvdXNlbFxcXCIgZGF0YS1zbGlkZS10bz1cXFwiJGluZGV4XFxcIj48L2xpPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9vbD5cXHJcXG5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNhcm91c2VsLWlubmVyXFxcIiBkYXRhLWJpbmQgPSBcXFwiZm9yZWFjaDogYW5ub3RhdGlvblxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLWJpbmQgPSBcXFwiaWZub3Q6JGluZGV4XFxcIiBjbGFzcz1cXFwiaXRlbSBhY3RpdmVcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGluZS1kaXNwbGF5ZXIgcGFyYW1zPVxcXCJzcmM6IGltYWdlLCBwZW46IHNpemUsIGxpbmU6ICRkYXRhXFxcIj48L2xpbmUtZGlzcGxheWVyPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcblxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIml0ZW1cXFwiIGRhdGEtYmluZCA9IFxcXCJpZjokaW5kZXhcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGluZS1kaXNwbGF5ZXIgcGFyYW1zPVxcXCJzcmM6IGltYWdlLCBwZW46IHNpemUsIGxpbmU6ICRkYXRhXFxcIj48L2xpbmUtZGlzcGxheWVyPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcblxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuXFxyXFxuXFxyXFxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cXFwibGVmdCBjYXJvdXNlbC1jb250cm9sXFxcIiBocmVmPVxcXCIjbXlDYXJvdXNlbFxcXCIgZGF0YS1zbGlkZT1cXFwicHJldlxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcImdseXBoaWNvbiBnbHlwaGljb24tY2hldnJvbi1sZWZ0XFxcIj48L3NwYW4+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcInNyLW9ubHlcXFwiPlByZXZpb3VzPC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9hPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XFxcInJpZ2h0IGNhcm91c2VsLWNvbnRyb2xcXFwiIGhyZWY9XFxcIiNteUNhcm91c2VsXFxcIiBkYXRhLXNsaWRlPVxcXCJuZXh0XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwiZ2x5cGhpY29uIGdseXBoaWNvbi1jaGV2cm9uLXJpZ2h0XFxcIj48L3NwYW4+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcInNyLW9ubHlcXFwiPk5leHQ8L3NwYW4+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2E+XFxyXFxuICAgICAgICAgICAgICAgICAgICAtLT5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTJcXFwiPjwvZGl2PlxcclxcbjwvZGl2PlxcclxcbjxkaXYgY2xhc3MgPSBcXFwicm93XFxcIj5cXHJcXG4gICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tMlxcXCI+PC9kaXY+XFxyXFxuICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTJcXFwiPlxcclxcbiAgICAgICAgPGEgZGF0YS1iaW5kID0gXFxcInBhdGg6ICcvQ2FtcGFpZ25TdGF0aXN0aWNzJ1xcXCIgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCIgcm9sZT1cXFwiYnV0dG9uXFxcIj48c3BhbiBjbGFzcz1cXFwiZ2x5cGhpY29uIGdseXBoaWNvbi1iYWNrd2FyZFxcXCI+PC9zcGFuPkJhY2s8L2E+XFxyXFxuICAgIDwvZGl2PlxcclxcbiAgICA8ZGl2IGNsYXNzID0gXFxcImNvbC1zbS04XFxcIj48L2Rpdj5cXHJcXG48L2Rpdj5cXHJcXG48IS0tXFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsIHBhbmVsLXByaW1hcnlcXFwiPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtaGVhZGluZ1xcXCI+Q2FtcGFpZ24gSW1hZ2VzPC9kaXY+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1ib2R5XFxcIj5cXHJcXG4gICAgICAgICAgICA8IS0tPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiIGRhdGEtdG9nZ2xlPVxcXCJjb2xsYXBzZVxcXCIgZGF0YS10YXJnZXQ9XFxcIiNzdGF0aXN0aWNzXFxcIiBkYXRhLWJpbmQgPSBcXFwiY2xpY2s6IGdldEltYWdlU3RhdGlzdGljc1xcXCIgc3R5bGUgPSBcXFwibWFyZ2luLWJvdHRvbTogMC41ZW07XFxcIiA+U3RhdGlzdGljczwvYnV0dG9uPlxcclxcbiAgICAtLT5cXHJcXG4gICAgICAgICAgIDwhLS0gPGRpdiBpZD1cXFwic3RhdGlzdGljc1xcXCIgPi0tPjwhLS1jbGFzcz1cXFwiY29sbGFwc2VcXFwiLS0+XFxyXFxuICAgICAgICAgICAgICAgPCEtLSA8aDQ+U2VsZWN0aW9uPC9oND5cXHJcXG4gICAgICAgICAgICAgICAgPHAgZGF0YS1iaW5kID0gXFxcInRleHQ6IGFjY2VwdGVkXFxcIj48L3A+XFxyXFxuICAgICAgICAgICAgICAgIDxwIGRhdGEtYmluZCA9IFxcXCJ0ZXh0OiByZWplY3RlZFxcXCI+PC9wPlxcclxcbiAgICAgICAgICAgICAgICA8aDQ+QW5ub3RhdGlvbjwvaDQ+XFxyXFxuICAgICAgICAgICAgICAgIDx1bCBkYXRhLWJpbmQgPSBcXFwiZm9yZWFjaDogYW5ub3RhdGlvblxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8bGkgZGF0YS1iaW5kID0gXFxcInRleHQ6ICRkYXRhXFxcIj48L2xpPlxcclxcbiAgICAgICAgICAgICAgICA8L3VsPlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcblxcclxcbiAgICAgICAgICAgIDxpbWcgZGF0YS1iaW5kID0gXFxcImF0dHI6IHtzcmM6IGltYWdlSW5mby5jYW5vbmljYWx9XFxcIj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG48L2Rpdj4tLT5cXHJcXG48IS0tIG5lbGxhIGxpc3RhIGRpIGltYWdpbmksIHJpY29waWFsYSBkYSBlZGl0LWltYWdlcyBjYW1wYWlnbiwgbWV0dGkgPGEgaHJlZiA9IFxcXCIjXFxcIiBkYXRhLWJpbmQgPSBcXFwiY2xpY2s6ICRwYXJlbnQuZ2V0SW1hZ2VJbmZvXFxcIj4tLT5cIjtcbiIsIi8qanNsaW50IG5vZGU6dHJ1ZSAqL1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbmV4cG9ydHMucmVnaXN0ZXIgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgcmVxdWlyZSgnLi9ob21lLXBhZ2UnKS5yZWdpc3RlcihvcHRpb25zKTtcclxuICAgIHJlcXVpcmUoJy4vc2lnbi11cCcpLnJlZ2lzdGVyKG9wdGlvbnMpO1xyXG4gICAgcmVxdWlyZSgnLi9sb2ctaW4nKS5yZWdpc3RlcihvcHRpb25zKTtcclxuICAgIHJlcXVpcmUoJy4vc2lnbi11cC1vdXRjb21lLXAnKS5yZWdpc3RlcihvcHRpb25zKTtcclxuICAgIHJlcXVpcmUoJy4vdXNlci1ob21lJykucmVnaXN0ZXIob3B0aW9ucyk7XHJcbiAgICByZXF1aXJlKCcuL2xvZy1vdXQnKS5yZWdpc3RlcihvcHRpb25zKTtcclxuICAgIHJlcXVpcmUoJy4vY3JlYXRlLWNhbXBhaWduJykucmVnaXN0ZXIob3B0aW9ucyk7XHJcbiAgICByZXF1aXJlKCcuL2VkaXQtaW1hZ2VzLWNhbXBhaWduJykucmVnaXN0ZXIob3B0aW9ucyk7XHJcbiAgICByZXF1aXJlKCcuL2VkaXQtd29ya2Vycy1jYW1wYWlnbicpLnJlZ2lzdGVyKG9wdGlvbnMpO1xyXG4gICAgcmVxdWlyZSgnLi9vcGVyYXRpb24tc3VjY2VzcycpLnJlZ2lzdGVyKG9wdGlvbnMpO1xyXG4gICAgcmVxdWlyZSgnLi9lbmRlZC1jYW1wYWlnbi1zdGF0aXN0aWNzJykucmVnaXN0ZXIob3B0aW9ucyk7XHJcbiAgICByZXF1aXJlKCcuL3Rhc2stc3RhdGlzdGljcycpLnJlZ2lzdGVyKG9wdGlvbnMpO1xyXG4gICAgcmVxdWlyZSgnLi90YXNrLXdvcmtpbmctc2Vzc2lvbicpLnJlZ2lzdGVyKG9wdGlvbnMpO1xyXG4gICAgcmVxdWlyZSgnLi9saW5lLWRyYXdlcicpLnJlZ2lzdGVyKG9wdGlvbnMpO1xyXG4gICAgcmVxdWlyZSgnLi9uYXYtYmFyJykucmVnaXN0ZXIob3B0aW9ucyk7XHJcbiAgICByZXF1aXJlKCcuL2ltYWdlLXN0YXRpc3RpY3MnKS5yZWdpc3RlcihvcHRpb25zKTtcclxuICAgIHJlcXVpcmUoJy4vbGluZS1kaXNwbGF5ZXInKS5yZWdpc3RlcihvcHRpb25zKTtcclxuICAgIHJlcXVpcmUoJy4vZWRpdC1jYW1wYWlnbi1pbmZvJykucmVnaXN0ZXIob3B0aW9ucyk7XHJcbiAgICByZXF1aXJlKCcuL2NhbXBhaWduLWluZm8nKS5yZWdpc3RlcihvcHRpb25zKTtcclxufTtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgVXRlbnRlIG9uIDE0LzA2LzIwMTcuXHJcbiAqL1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciBrbyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydrbyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsna28nXSA6IG51bGwpLCAkID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJyQnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJyQnXSA6IG51bGwpO1xyXG5cclxuXHJcbmtvLmJpbmRpbmdIYW5kbGVycy5Jbml0Q2FudmFzID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKGVsZW1lbnQsIHZhbHVlQWNjZXNzb3IpIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSBrby51bndyYXAodmFsdWVBY2Nlc3NvcigpKSxcclxuICAgICAgICAgICAgY3R4ID0gZWxlbWVudC5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIHZhciBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWFnZSwgMCwgMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaW1hZ2Uuc3JjID0gdmFsdWU7XHJcbiAgICB9XHJcbn07LyosXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChlbGVtZW50LCB2YWx1ZUFjY2Vzc29yKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0ga28udW53cmFwKHZhbHVlQWNjZXNzb3IoKSksXHJcbiAgICAgICAgICAgIGN0eCA9IGVsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHJcblxyXG4gICAgICAgIH1cclxufTsqL1xyXG5rby5iaW5kaW5nSGFuZGxlcnMuTGluZURyYXdTZXRTaXplID0ge1xyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZWxlbWVudCwgdmFsdWVBY2Nlc3Nvcikge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHZhbHVlQWNjZXNzb3IoKSgpO1xyXG4gICAgICAgIGlmICghdmFsdWUpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgZWxlbWVudC5oZWlnaHQgPSB2YWx1ZS5oZWlnaHQ7XHJcbiAgICAgICAgZWxlbWVudC53aWR0aCA9IHZhbHVlLndpZHRoO1xyXG4gICAgfVxyXG59O1xyXG5cclxua28uYmluZGluZ0hhbmRsZXJzLkxpbmVEcmF3TmF0dXJhbFNpemUgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbiAoZWxlbWVudCwgdmFsdWVBY2Nlc3Nvcikge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHZhbHVlQWNjZXNzb3IoKTtcclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGUoKSB7XHJcbiAgICAgICAgICAgIHZhbHVlKHtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiBlbGVtZW50Lm5hdHVyYWxXaWR0aCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogZWxlbWVudC5uYXR1cmFsSGVpZ2h0XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB1cGRhdGUoKTtcclxuICAgICAgICAkKGVsZW1lbnQpLm9uKCdsb2FkJywgdXBkYXRlKTtcclxuICAgIH1cclxufTtcclxuXHJcbmZ1bmN0aW9uIFZpZXdNb2RlbChwYXJhbXMpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHNlbGYuc3JjID0gcGFyYW1zLnNyYztcclxuICAgIHNlbGYuZGF0YSA9IHBhcmFtcy5kYXRhO1xyXG5cclxuXHJcbiAgICBzZWxmLm5hdHVyYWxTaXplID0ga28ub2JzZXJ2YWJsZSgpO1xyXG59XHJcblxyXG5cclxuZXhwb3J0cy5yZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ2xpbmUtZGlzcGxheWVyJywge1xyXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlLmh0bWwnKSxcclxuICAgICAgICB2aWV3TW9kZWw6IFZpZXdNb2RlbFxyXG4gICAgfSk7XHJcbn07XHJcblxyXG5cclxuLypcclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIga28gPSByZXF1aXJlKCdrbm9ja291dCcpLCAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XHJcblxyXG5rby5iaW5kaW5nSGFuZGxlcnMuTGluZURyYXdTZXRTaXplID0ge1xyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZWxlbWVudCwgdmFsdWVBY2Nlc3Nvcikge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHZhbHVlQWNjZXNzb3IoKSgpO1xyXG4gICAgICAgIGlmICghdmFsdWUpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgZWxlbWVudC5oZWlnaHQgPSB2YWx1ZS5oZWlnaHQ7XHJcbiAgICAgICAgZWxlbWVudC53aWR0aCA9IHZhbHVlLndpZHRoO1xyXG4gICAgfVxyXG59O1xyXG5cclxua28uYmluZGluZ0hhbmRsZXJzLkxpbmVEcmF3TmF0dXJhbFNpemUgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbiAoZWxlbWVudCwgdmFsdWVBY2Nlc3Nvcikge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHZhbHVlQWNjZXNzb3IoKTtcclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGUoKSB7XHJcbiAgICAgICAgICAgIHZhbHVlKHtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiBlbGVtZW50Lm5hdHVyYWxXaWR0aCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogZWxlbWVudC5uYXR1cmFsSGVpZ2h0XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB1cGRhdGUoKTtcclxuICAgICAgICAkKGVsZW1lbnQpLm9uKCdsb2FkJywgdXBkYXRlKTtcclxuICAgIH1cclxufTtcclxuXHJcbmtvLmJpbmRpbmdIYW5kbGVycy5MaW5lRHJhdyA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uIChlbGVtZW50LCB2YWx1ZUFjY2Vzc29yKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gdmFsdWVBY2Nlc3NvcigpLFxyXG4gICAgICAgICAgICBjdHggPSBlbGVtZW50LmdldENvbnRleHQoJzJkJyksXHJcbiAgICAgICAgICAgICRlbGVtZW50ID0gJChlbGVtZW50KTtcclxuICAgICAgICAkZWxlbWVudC5vbignbW91c2Vkb3duJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgdmFyIHggPSAoZS5wYWdlWCAtICRlbGVtZW50Lm9mZnNldCgpLmxlZnQpIC8gJGVsZW1lbnQud2lkdGgoKSAqIGVsZW1lbnQud2lkdGgsXHJcbiAgICAgICAgICAgICAgICB5ID0gKGUucGFnZVkgLSAkZWxlbWVudC5vZmZzZXQoKS50b3ApIC8gJGVsZW1lbnQuaGVpZ2h0KCkgKiBlbGVtZW50LmhlaWdodDtcclxuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICBjdHgubW92ZVRvKHgsIHkpO1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBkcmF3KGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwZW4gPSBwYXJzZUludCgkZWxlbWVudC5kYXRhKCdwZW4nKSwgMTApIHx8IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgdHggPSAoZS5wYWdlWCAtICRlbGVtZW50Lm9mZnNldCgpLmxlZnQpIC8gJGVsZW1lbnQud2lkdGgoKSAqIGVsZW1lbnQud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgdHkgPSAoZS5wYWdlWSAtICRlbGVtZW50Lm9mZnNldCgpLnRvcCkgLyAkZWxlbWVudC5oZWlnaHQoKSAqIGVsZW1lbnQuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgY3R4LmxpbmVUbyh0eCwgdHkpO1xyXG4gICAgICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJ3JnYigyNTUsMCwwKSc7XHJcbiAgICAgICAgICAgICAgICBjdHgubGluZVdpZHRoID0gcGVuO1xyXG4gICAgICAgICAgICAgICAgY3R4LmxpbmVDYXAgPSAncm91bmQnO1xyXG4gICAgICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICAgICAgY3R4Lm1vdmVUbyh0eCwgdHkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGVuZCgpIHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50Lm9mZignbW91c2Vtb3ZlJywgZHJhdyk7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5vZmYoJ21vdXNldXAnLCBlbmQpO1xyXG4gICAgICAgICAgICAgICAgdmFsdWUoZWxlbWVudC50b0RhdGFVUkwoJ2ltYWdlL3BuZycpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbignbW91c2Vtb3ZlJywgZHJhdyk7XHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKCdtb3VzZXVwJywgZW5kKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL3ZhciAkcmVzZXRCdXR0b24gPSAkKCRlbGVtZW50LnByZXYoKSkucHJldigpO1xyXG4gICAgICAgICRlbGVtZW50Lm9uKCdjb250ZXh0bWVudScsZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBlbGVtZW50LndpZHRoLCBlbGVtZW50LmhlaWdodCk7XHJcbiAgICAgICAgICAgIHZhbHVlKHVuZGVmaW5lZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5rby5iaW5kaW5nSGFuZGxlcnMuTGluZURyYXdQZW4gPSB7XHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChlbGVtZW50LCB2YWx1ZUFjY2Vzc29yKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gdmFsdWVBY2Nlc3NvcigpLFxyXG4gICAgICAgICAgICAkZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcbiAgICAgICAgJGVsZW1lbnQuZGF0YSgncGVuJywgdmFsdWUpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZnVuY3Rpb24gVmlld01vZGVsKHBhcmFtcykge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgc2VsZi5zcmMgPSBwYXJhbXMuc3JjO1xyXG4gICAgc2VsZi5wZW4gPSBwYXJhbXMucGVuO1xyXG4gICAgc2VsZi5saW5lID0gcGFyYW1zLmxpbmU7XHJcblxyXG4gICAgc2VsZi5uYXR1cmFsU2l6ZSA9IGtvLm9ic2VydmFibGUoKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydHMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdsaW5lLWRyYXdlcicsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZS5odG1sJyksXHJcbiAgICAgICAgdmlld01vZGVsOiBWaWV3TW9kZWxcclxuICAgIH0pO1xyXG59O1xyXG4qLyIsIm1vZHVsZS5leHBvcnRzID0gXCI8aW1nIGRhdGEtYmluZD1cXFwiYXR0cjogeyBzcmM6IHNyYyB9LExpbmVEcmF3TmF0dXJhbFNpemU6IG5hdHVyYWxTaXplXFxcIiBjbGFzcz1cXFwiYmFja2dyb3VuZFxcXCIgZHJhZ2dhYmxlPVxcXCJmYWxzZVxcXCI+XFxyXFxuPGNhbnZhcyBpZCA9IFxcXCJjYW52YXNcXFwiIGRhdGEtYmluZD1cXFwiSW5pdENhbnZhczogZGF0YSxMaW5lRHJhd1NldFNpemU6IG5hdHVyYWxTaXplXFxcIj48L2NhbnZhcz5cXHJcXG5cXHJcXG5cIjtcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFV0ZW50ZSBvbiAxNC8wNi8yMDE3LlxyXG4gKi9cclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIga28gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sna28nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2tvJ10gOiBudWxsKSwgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKTtcclxua28uYmluZGluZ0hhbmRsZXJzLkxpbmVEcmF3U2V0U2l6ZSA9IHtcclxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGVsZW1lbnQsIHZhbHVlQWNjZXNzb3IpIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSBrby51bndyYXAodmFsdWVBY2Nlc3NvcigpKTtcclxuICAgICAgICBpZiAoIXZhbHVlKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGVsZW1lbnQuaGVpZ2h0ID0gdmFsdWUuaGVpZ2h0O1xyXG4gICAgICAgIGVsZW1lbnQud2lkdGggPSB2YWx1ZS53aWR0aDtcclxuICAgIH1cclxufTtcclxuXHJcbmtvLmJpbmRpbmdIYW5kbGVycy5MaW5lRHJhd05hdHVyYWxTaXplID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKGVsZW1lbnQsIHZhbHVlQWNjZXNzb3IpIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSB2YWx1ZUFjY2Vzc29yKCk7XHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlKCkge1xyXG4gICAgICAgICAgICB2YWx1ZSh7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogZWxlbWVudC5uYXR1cmFsV2lkdGgsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGVsZW1lbnQubmF0dXJhbEhlaWdodFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdXBkYXRlKCk7XHJcbiAgICAgICAgJChlbGVtZW50KS5vbignbG9hZCcsIHVwZGF0ZSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5rby5iaW5kaW5nSGFuZGxlcnMuTGluZURyYXcgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbiAoZWxlbWVudCwgdmFsdWVBY2Nlc3Nvcikge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHZhbHVlQWNjZXNzb3IoKSxcclxuICAgICAgICAgICAgY3R4ID0gZWxlbWVudC5nZXRDb250ZXh0KCcyZCcpLFxyXG4gICAgICAgICAgICAkZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcbiAgICAgICAgJGVsZW1lbnQub24oJ21vdXNlZG93bicsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIHZhciB4ID0gKGUucGFnZVggLSAkZWxlbWVudC5vZmZzZXQoKS5sZWZ0KSAvICRlbGVtZW50LndpZHRoKCkgKiBlbGVtZW50LndpZHRoLFxyXG4gICAgICAgICAgICAgICAgeSA9IChlLnBhZ2VZIC0gJGVsZW1lbnQub2Zmc2V0KCkudG9wKSAvICRlbGVtZW50LmhlaWdodCgpICogZWxlbWVudC5oZWlnaHQ7XHJcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgY3R4Lm1vdmVUbyh4LCB5KTtcclxuICAgICAgICAgICAgZnVuY3Rpb24gZHJhdyhlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGVuID0gcGFyc2VJbnQoJGVsZW1lbnQuZGF0YSgncGVuJyksIDEwKSB8fCAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHR4ID0gKGUucGFnZVggLSAkZWxlbWVudC5vZmZzZXQoKS5sZWZ0KSAvICRlbGVtZW50LndpZHRoKCkgKiBlbGVtZW50LndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5ID0gKGUucGFnZVkgLSAkZWxlbWVudC5vZmZzZXQoKS50b3ApIC8gJGVsZW1lbnQuaGVpZ2h0KCkgKiBlbGVtZW50LmhlaWdodDtcclxuICAgICAgICAgICAgICAgIGN0eC5saW5lVG8odHgsIHR5KTtcclxuICAgICAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICdyZ2IoMjU1LDAsMCknO1xyXG4gICAgICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHBlbjtcclxuICAgICAgICAgICAgICAgIGN0eC5saW5lQ2FwID0gJ3JvdW5kJztcclxuICAgICAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgICAgIGN0eC5tb3ZlVG8odHgsIHR5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBlbmQoKSB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5vZmYoJ21vdXNlbW92ZScsIGRyYXcpO1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQub2ZmKCdtb3VzZXVwJywgZW5kKTtcclxuICAgICAgICAgICAgICAgIHZhbHVlKGVsZW1lbnQudG9EYXRhVVJMKCdpbWFnZS9wbmcnKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oJ21vdXNlbW92ZScsIGRyYXcpO1xyXG4gICAgICAgICAgICAkZWxlbWVudC5vbignbW91c2V1cCcsIGVuZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZWxlbWVudCwgdmFsdWVBY2Nlc3Nvcikge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IGtvLnVud3JhcCh2YWx1ZUFjY2Vzc29yKCkpLFxyXG4gICAgICAgICAgICBjdHggPSBlbGVtZW50LmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgaWYgKCF2YWx1ZSB8fCB2YWx1ZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBlbGVtZW50LndpZHRoLCBlbGVtZW50LmhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxua28uYmluZGluZ0hhbmRsZXJzLkxpbmVEcmF3UGVuID0ge1xyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZWxlbWVudCwgdmFsdWVBY2Nlc3Nvcikge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IGtvLnVud3JhcCh2YWx1ZUFjY2Vzc29yKCkpLFxyXG4gICAgICAgICAgICAkZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcbiAgICAgICAgJGVsZW1lbnQuZGF0YSgncGVuJywgdmFsdWUpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZnVuY3Rpb24gVmlld01vZGVsKHBhcmFtcykge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgc2VsZi5zcmMgPSBwYXJhbXMuc3JjO1xyXG4gICAgc2VsZi5wZW4gPSBwYXJhbXMucGVuO1xyXG4gICAgc2VsZi5saW5lID0gcGFyYW1zLmxpbmU7XHJcblxyXG4gICAgc2VsZi5uYXR1cmFsU2l6ZSA9IGtvLm9ic2VydmFibGUoKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydHMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdsaW5lLWRyYXdlcicsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZS5odG1sJyksXHJcbiAgICAgICAgdmlld01vZGVsOiBWaWV3TW9kZWxcclxuICAgIH0pO1xyXG59O1xyXG5cclxuXHJcbi8qXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIGtvID0gcmVxdWlyZSgna25vY2tvdXQnKSwgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG5cclxua28uYmluZGluZ0hhbmRsZXJzLkxpbmVEcmF3U2V0U2l6ZSA9IHtcclxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGVsZW1lbnQsIHZhbHVlQWNjZXNzb3IpIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSB2YWx1ZUFjY2Vzc29yKCkoKTtcclxuICAgICAgICBpZiAoIXZhbHVlKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGVsZW1lbnQuaGVpZ2h0ID0gdmFsdWUuaGVpZ2h0O1xyXG4gICAgICAgIGVsZW1lbnQud2lkdGggPSB2YWx1ZS53aWR0aDtcclxuICAgIH1cclxufTtcclxuXHJcbmtvLmJpbmRpbmdIYW5kbGVycy5MaW5lRHJhd05hdHVyYWxTaXplID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKGVsZW1lbnQsIHZhbHVlQWNjZXNzb3IpIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSB2YWx1ZUFjY2Vzc29yKCk7XHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlKCkge1xyXG4gICAgICAgICAgICB2YWx1ZSh7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogZWxlbWVudC5uYXR1cmFsV2lkdGgsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGVsZW1lbnQubmF0dXJhbEhlaWdodFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdXBkYXRlKCk7XHJcbiAgICAgICAgJChlbGVtZW50KS5vbignbG9hZCcsIHVwZGF0ZSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5rby5iaW5kaW5nSGFuZGxlcnMuTGluZURyYXcgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbiAoZWxlbWVudCwgdmFsdWVBY2Nlc3Nvcikge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHZhbHVlQWNjZXNzb3IoKSxcclxuICAgICAgICAgICAgY3R4ID0gZWxlbWVudC5nZXRDb250ZXh0KCcyZCcpLFxyXG4gICAgICAgICAgICAkZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcbiAgICAgICAgJGVsZW1lbnQub24oJ21vdXNlZG93bicsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIHZhciB4ID0gKGUucGFnZVggLSAkZWxlbWVudC5vZmZzZXQoKS5sZWZ0KSAvICRlbGVtZW50LndpZHRoKCkgKiBlbGVtZW50LndpZHRoLFxyXG4gICAgICAgICAgICAgICAgeSA9IChlLnBhZ2VZIC0gJGVsZW1lbnQub2Zmc2V0KCkudG9wKSAvICRlbGVtZW50LmhlaWdodCgpICogZWxlbWVudC5oZWlnaHQ7XHJcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgY3R4Lm1vdmVUbyh4LCB5KTtcclxuICAgICAgICAgICAgZnVuY3Rpb24gZHJhdyhlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGVuID0gcGFyc2VJbnQoJGVsZW1lbnQuZGF0YSgncGVuJyksIDEwKSB8fCAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHR4ID0gKGUucGFnZVggLSAkZWxlbWVudC5vZmZzZXQoKS5sZWZ0KSAvICRlbGVtZW50LndpZHRoKCkgKiBlbGVtZW50LndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5ID0gKGUucGFnZVkgLSAkZWxlbWVudC5vZmZzZXQoKS50b3ApIC8gJGVsZW1lbnQuaGVpZ2h0KCkgKiBlbGVtZW50LmhlaWdodDtcclxuICAgICAgICAgICAgICAgIGN0eC5saW5lVG8odHgsIHR5KTtcclxuICAgICAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICdyZ2IoMjU1LDAsMCknO1xyXG4gICAgICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHBlbjtcclxuICAgICAgICAgICAgICAgIGN0eC5saW5lQ2FwID0gJ3JvdW5kJztcclxuICAgICAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgICAgIGN0eC5tb3ZlVG8odHgsIHR5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBlbmQoKSB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5vZmYoJ21vdXNlbW92ZScsIGRyYXcpO1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQub2ZmKCdtb3VzZXVwJywgZW5kKTtcclxuICAgICAgICAgICAgICAgIHZhbHVlKGVsZW1lbnQudG9EYXRhVVJMKCdpbWFnZS9wbmcnKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJGVsZW1lbnQub24oJ21vdXNlbW92ZScsIGRyYXcpO1xyXG4gICAgICAgICAgICAkZWxlbWVudC5vbignbW91c2V1cCcsIGVuZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy92YXIgJHJlc2V0QnV0dG9uID0gJCgkZWxlbWVudC5wcmV2KCkpLnByZXYoKTtcclxuICAgICAgICAkZWxlbWVudC5vbignY29udGV4dG1lbnUnLGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgZWxlbWVudC53aWR0aCwgZWxlbWVudC5oZWlnaHQpO1xyXG4gICAgICAgICAgICB2YWx1ZSh1bmRlZmluZWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxua28uYmluZGluZ0hhbmRsZXJzLkxpbmVEcmF3UGVuID0ge1xyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZWxlbWVudCwgdmFsdWVBY2Nlc3Nvcikge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHZhbHVlQWNjZXNzb3IoKSxcclxuICAgICAgICAgICAgJGVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG4gICAgICAgICRlbGVtZW50LmRhdGEoJ3BlbicsIHZhbHVlKTtcclxuICAgIH1cclxufTtcclxuXHJcbmZ1bmN0aW9uIFZpZXdNb2RlbChwYXJhbXMpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHNlbGYuc3JjID0gcGFyYW1zLnNyYztcclxuICAgIHNlbGYucGVuID0gcGFyYW1zLnBlbjtcclxuICAgIHNlbGYubGluZSA9IHBhcmFtcy5saW5lO1xyXG5cclxuICAgIHNlbGYubmF0dXJhbFNpemUgPSBrby5vYnNlcnZhYmxlKCk7XHJcbn1cclxuXHJcblxyXG5leHBvcnRzLnJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAga28uY29tcG9uZW50cy5yZWdpc3RlcignbGluZS1kcmF3ZXInLCB7XHJcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGUuaHRtbCcpLFxyXG4gICAgICAgIHZpZXdNb2RlbDogVmlld01vZGVsXHJcbiAgICB9KTtcclxufTtcclxuKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGltZyBkYXRhLWJpbmQ9XFxcImF0dHI6IHsgc3JjOiBzcmMgfSwgTGluZURyYXdOYXR1cmFsU2l6ZTogbmF0dXJhbFNpemVcXFwiIGNsYXNzPVxcXCJiYWNrZ3JvdW5kXFxcIiBkcmFnZ2FibGU9XFxcImZhbHNlXFxcIj5cXHJcXG48Y2FudmFzIGlkID0gXFxcImNhbnZhc1xcXCIgZGF0YS1iaW5kPVxcXCJMaW5lRHJhdzogbGluZSwgTGluZURyYXdTZXRTaXplOiBuYXR1cmFsU2l6ZSwgTGluZURyYXdQZW46IHBlblxcXCI+PC9jYW52YXM+XFxyXFxuXFxyXFxuXCI7XG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBVdGVudGUgb24gMTcvMDUvMjAxNy5cclxuICovXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIGtvID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2tvJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydrbyddIDogbnVsbCk7XHJcblxyXG5mdW5jdGlvbiBWaWV3TW9kZWwoY3R4KSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZWxmLnJlcG9zaXRvcmllcyA9IGN0eC5yZXBvc2l0b3JpZXM7XHJcbiAgICAvL1FVRVNUSSBFUlJPUiBJTiBSRUFMVEEnIFNPTk8gQklOREFUSSBBIERFSSBDT1NJIEhUTUwhISEgVkVESSBMJ0VTRU1QSU8gS09cclxuICAgIHNlbGYudXNlcm5hbWUgPSBrby5vYnNlcnZhYmxlKCk7XHJcbiAgICBzZWxmLnVzZXJuYW1lRXJyb3IgPSBrby5vYnNlcnZhYmxlKCk7XHJcbiAgICBzZWxmLnVzZXJuYW1lLnN1YnNjcmliZShmdW5jdGlvbigpe1xyXG4gICAgICAgIHNlbGYudXNlcm5hbWVFcnJvcih1bmRlZmluZWQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgc2VsZi5wYXNzd29yZCA9IGtvLm9ic2VydmFibGUoKTtcclxuICAgIHNlbGYucGFzc3dvcmRFcnJvciA9IGtvLm9ic2VydmFibGUoKTtcclxuXHJcbiAgICBzZWxmLnNob3VsZFNob3dNZXNzYWdlID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XHJcbiAgICBzZWxmLmVycm9yTWVzc2FnZSA9IGtvLm9ic2VydmFibGUoKTtcclxuXHJcbiAgICBzZWxmLmxvZ2luID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGN0eC5yZXBvc2l0b3JpZXMubG9naW4ubG9naW4oXHJcbiAgICAgICAgICAgIHNlbGYudXNlcm5hbWUoKSxcclxuICAgICAgICAgICAgc2VsZi5wYXNzd29yZCgpXHJcbiAgICAgICAgKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgLy9hbGVydChcIlN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLnNldEFwaVRva2VuKHJlc3VsdC50b2tlbik7XHJcbiAgICAgICAgICAgIC8vYWxlcnQoXCJITyBTRVRUQVRPIEFQSSBUT0tFTlwiKTtcclxuICAgICAgICAgICAgLypmb3IodmFyIHggaW4gY3R4KXtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KHggKyBcIiBcIiArY3R4W3hdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjdHgudXBkYXRlU3RhdHVzTG9nZ2VkKCk7XHJcbiAgICAgICAgICAgIGN0eC51cGRhdGVTdGF0dXNMb2dnZWQoKTsqL1xyXG4gICAgICAgICAgICAvL2FsZXJ0KGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEFwaVRva2VuKCkpO1xyXG4gICAgICAgICAgICBsb2NhdGlvbi5oYXNoID0gJy9Vc2VySG9tZSc7XHJcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAvLyBhbGVydChcIkVycm9yXCIpO1xyXG4gICAgICAgICAgICBzZWxmLnNob3VsZFNob3dNZXNzYWdlKHRydWUpO1xyXG4gICAgICAgICAgICBzZWxmLmVycm9yTWVzc2FnZShcIiBcIiArZS5lcnJvcnMuZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxufVxyXG5cclxuXHJcbmV4cG9ydHMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdsb2ctaW4nLCB7XHJcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGUuaHRtbCcpLFxyXG4gICAgICAgIHZpZXdNb2RlbDogVmlld01vZGVsXHJcbiAgICB9KTtcclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxuYXYtYmFyIHBhcmFtcyA9IFxcXCJyZXBvc2l0b3JpZXM6IHJlcG9zaXRvcmllc1xcXCI+PC9uYXYtYmFyPlxcclxcbjxkaXYgY2xhc3M9XFxcImNvbnRhaW5lclxcXCIgc3R5bGUgPSBcXFwibWFyZ2luOiBhdXRvXFxcIj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwicm93XFxcIiA+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzID0gXFxcImNvbC1zbS0yXFxcIj48L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1zbS04XFxcIj5cXHJcXG4gICAgICAgICAgICA8aDEgc3R5bGUgPSBcXFwicGFkZGluZy1ib3R0b206MWVtOyB0ZXh0LWFsaWduOiBjZW50ZXJcXFwiPkZpbGwgaW4gWW91ciBDcmVkZW50aWFscyB0byBMb2ctaW48L2gxPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImFsZXJ0IGFsZXJ0LWRhbmdlciBhbGVydC1kaXNtaXNzYWJsZSBmYWRlIGluXFxcIiBkYXRhLWJpbmQgPSBcXFwidmlzaWJsZTogc2hvdWxkU2hvd01lc3NhZ2VcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwiY2xvc2VcXFwiIGRhdGEtZGlzbWlzcz1cXFwiYWxlcnRcXFwiIGFyaWEtbGFiZWw9XFxcImNsb3NlXFxcIj4mdGltZXM7PC9hPlxcclxcbiAgICAgICAgICAgICAgICA8c3Ryb25nPldhcm5pbmchPC9zdHJvbmc+PHNwYW4gZGF0YS1iaW5kID0gXFxcInRleHQ6ZXJyb3JNZXNzYWdlXFxcIj48L3NwYW4+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPGZvcm0gZGF0YS1iaW5kPVxcXCJzdWJtaXQ6IGxvZ2luXFxcIiBjbGFzcz1cXFwiZm9ybS1ob3Jpem9udGFsXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XFxcImNvbnRyb2wtbGFiZWwgY29sLXNtLTJcXFwiIGZvciA9IFxcXCJ1c2VybmFtZVxcXCI+VXNlcm5hbWU6PC9sYWJlbD5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1zbS0xMFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiIGlkID0gXFxcInVzZXJuYW1lXFxcIiBwbGFjZWhvbGRlcj1cXFwiRW50ZXIgeW91ciBVc2VybmFtZVxcXCIgcmVxdWlyZWQgZGF0YS1iaW5kID0gXFxcInRleHRJbnB1dDogdXNlcm5hbWVcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cXFwiY29udHJvbC1sYWJlbCBjb2wtc20tMlxcXCIgZm9yPVxcXCJwd2QxXFxcIj5QYXNzd29yZDo8L2xhYmVsPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLTEwXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwicGFzc3dvcmRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiIGlkPVxcXCJwd2QxXFxcIiBwbGFjZWhvbGRlcj1cXFwiRW50ZXIgcGFzc3dvcmRcXFwiIHJlcXVpcmVkIGRhdGEtYmluZCA9IFxcXCJ0ZXh0SW5wdXQ6IHBhc3N3b3JkXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtc20tb2Zmc2V0LTIgY29sLXNtLTEwXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XFxcInN1Ym1pdFxcXCIgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCI+TG9naW48L2J1dHRvbj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8L2Zvcm0+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTJcXFwiPjwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG48L2Rpdj5cXHJcXG5cIjtcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFV0ZW50ZSBvbiAyNC8wNS8yMDE3LlxyXG4gKi9cclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIga28gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sna28nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2tvJ10gOiBudWxsKTtcclxuXHJcbmZ1bmN0aW9uIFZpZXdNb2RlbChjdHgpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHNlbGYucmVwb3NpdG9yaWVzID0gY3R4LnJlcG9zaXRvcmllcztcclxuICAgIHNlbGYuc2hvdWxkU2hvd01lc3NhZ2UgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcclxuICAgIHNlbGYuZXJyb3JNZXNzYWdlID0ga28ub2JzZXJ2YWJsZSgpO1xyXG5cclxuICAgIHNlbGYubG9nb3V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgLy8gYWxlcnQoXCJTVG8gcGVyIGVsaW1pbmFyZTogXCIrY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0QXBpVG9rZW4oKSk7XHJcbiAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5sb2dvdXQubG9nb3V0KFxyXG4gICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRBcGlUb2tlbigpXHJcbiAgICAgICAgKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAvLyBhbGVydChcIlN1Y2Nlc3NvXCIpO1xyXG4gICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5jbGVhckNhY2hlKCk7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLmhhc2ggPSBcIi9cIjtcclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBhbGVydChcIkVycm9yZVwiKTtcclxuICAgICAgICAgICAgZm9yKCB2YXIgeCBpbiBlLmpxWEhSKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChlLmpxWEhSW3hdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLnNob3VsZFNob3dNZXNzYWdlKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydHMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdsb2ctb3V0Jywge1xyXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlLmh0bWwnKSxcclxuICAgICAgICB2aWV3TW9kZWw6IFZpZXdNb2RlbFxyXG4gICAgfSk7XHJcbn07XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8bmF2LWJhciBwYXJhbXMgPSBcXFwicmVwb3NpdG9yaWVzOiByZXBvc2l0b3JpZXNcXFwiPjwvbmF2LWJhcj5cXHJcXG48ZGl2IGNsYXNzPVxcXCJjb250YWluZXJcXFwiIHN0eWxlID0gXFxcIm1hcmdpbjogYXV0b1xcXCI+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcInJvd1xcXCIgPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tMlxcXCI+PC9kaXY+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtc20tOFxcXCI+XFxyXFxuICAgICAgICAgICAgPGgxIHN0eWxlID0gXFxcInBhZGRpbmctYm90dG9tOjFlbTsgdGV4dC1hbGlnbjogY2VudGVyXFxcIj5BcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gbG9nb3V0PzwvaDE+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWxlcnQgYWxlcnQtZGFuZ2VyIGFsZXJ0LWRpc21pc3NhYmxlIGZhZGUgaW5cXFwiIGRhdGEtYmluZCA9IFxcXCJ2aXNpYmxlOiBzaG91bGRTaG93TWVzc2FnZVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJjbG9zZVxcXCIgZGF0YS1kaXNtaXNzPVxcXCJhbGVydFxcXCIgYXJpYS1sYWJlbD1cXFwiY2xvc2VcXFwiPiZ0aW1lczs8L2E+XFxyXFxuICAgICAgICAgICAgICAgIDxzdHJvbmc+V2FybmluZyE8L3N0cm9uZz48c3BhbiBkYXRhLWJpbmQgPSBcXFwidGV4dDplcnJvck1lc3NhZ2VcXFwiPjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzID0gXFxcInJvd1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTNcXFwiPjwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzID0gXFxcImNvbC1zbS0zXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxhIGRhdGEtYmluZCA9IFxcXCJjbGljazogbG9nb3V0XFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIiByb2xlPVxcXCJidXR0b25cXFwiIHN0eWxlID0gXFxcInRleHQtYWxpZ246Y2VudGVyO1xcXCI+IFllcyA8L2E+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzID0gXFxcImNvbC1zbS0zXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxhIGRhdGEtYmluZCA9IFxcXCJwYXRoOiAnL1VzZXJIb21lJ1xcXCIgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeVxcXCIgcm9sZT1cXFwiYnV0dG9uXFxcIiBzdHlsZSA9IFxcXCJ0ZXh0LWFsaWduOmNlbnRlcjtcXFwiPiBObyA8L2E+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzID0gXFxcImNvbC1zbS0zXFxcIj48L2Rpdj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8L2Zvcm0+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTJcXFwiPjwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG48L2Rpdj5cIjtcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFV0ZW50ZSBvbiAxNy8wNi8yMDE3LlxyXG4gKi9cclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIga28gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sna28nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2tvJ10gOiBudWxsKSwgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKTsvLyByb3V0ZXIgPSByZXF1aXJlKCdrby1jb21wb25lbnQtcm91dGVyJyk7XHJcblxyXG5cclxuZnVuY3Rpb24gVmlld01vZGVsKHBhcmFtKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZWxmLnJlcG9zaXRvcmllcyA9IHBhcmFtLnJlcG9zaXRvcmllcztcclxuICAgIHNlbGYuc3RhdHVzTG9nZ2VkID0gcGFyYW0ucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRBcGlUb2tlbigpO1xyXG4gICAgLypcclxuICAgIHNlbGYuc3RhdHVzTG9nZ2VkID0ga28uY29tcHV0ZWQoZnVuY3Rpb24oKVxyXG4gICAgICAgIHsgcmV0dXJuIHBhcmFtLnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0QXBpVG9rZW4oKTt9KTsqL1xyXG4gICAgLy9zZWxmLnN0YXR1c0xvZ2dlZCA9IHBhcmFtLnN0YXR1c0xvZ2dlZDtcclxuICAgIC8va28uY29tcHV0ZWQoZnVuY3Rpb24oKXtyZXR1cm4gcGFyYW0uc3RhdHVzTG9nZ2VkO30pO1xyXG59XHJcblxyXG4vKlxyXG5rby5iaW5kaW5nSGFuZGxlcnMucmVwb3NpdG9yaWVzID0ge1xyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZWxlbWVudCwgdmFsdWVBY2Nlc3NvciwgYWxsQmluZGluZ3Msdmlld01vZGVsLGJpbmRpbmdDb250ZXh0KSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gdmFsdWVBY2Nlc3NvcigpLFxyXG4gICAgICAgICAgICAkZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcbiAgICAgICAgJGVsZW1lbnQuZGF0YSgncmVwb3NpdG9yaWVzJywgdmFsdWUpO1xyXG4gICAgfVxyXG59O1xyXG4qL1xyXG5cclxuZXhwb3J0cy5yZWdpc3RlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGtvLmNvbXBvbmVudHMucmVnaXN0ZXIoJ25hdi1iYXInLCB7XHJcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGUuaHRtbCcpLFxyXG4gICAgICAgIHZpZXdNb2RlbDogVmlld01vZGVsXHJcbiAgICB9KTtcclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxuYXYgY2xhc3M9XFxcIm5hdmJhciBuYXZiYXItaW52ZXJzZVxcXCI+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbnRhaW5lci1mbHVpZFxcXCI+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJuYXZiYXItaGVhZGVyXFxcIj5cXHJcXG4gICAgICAgICAgICA8YSBjbGFzcz1cXFwibmF2YmFyLWJyYW5kXFxcIiBocmVmID0gXFxcIiNcXFwiID5Dcm93ZHNvdXJjaW5nIENhbXBhaWduczwvYT4gPCEtLWRhdGEtYmluZCA9IFxcXCJwYXRoOiAnLydcXFwiLS0+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDx1bCBjbGFzcyA9IFxcXCJuYXYgbmF2YmFyLW5hdiBuYXZiYXItbGVmdFxcXCI+XFxyXFxuICAgICAgICAgICAgPGxpIGRhdGEtYmluZCA9IFxcXCJwYXRoOicvVXNlckhvbWUnLCBpZjogc3RhdHVzTG9nZ2VkXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGEgZGF0YS1iaW5kID0gXFxcInBhdGg6ICcvVXNlckhvbWUnXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzID0gXFxcImdseXBoaWNvbiBnbHlwaGljb24taG9tZVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgSG9tZVxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICA8L2E+XFxyXFxuICAgICAgICAgICAgPC9saT5cXHJcXG4gICAgICAgIDwvdWw+XFxyXFxuICAgICAgICA8dWwgY2xhc3M9XFxcIm5hdiBuYXZiYXItbmF2IG5hdmJhci1yaWdodFxcXCI+XFxyXFxuXFxyXFxuICAgICAgICAgICAgPGxpIGRhdGEtYmluZD1cXFwicGF0aDogJy9TaWduVXAnLCBpZm5vdDogc3RhdHVzTG9nZ2VkXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGEgZGF0YS1iaW5kPVxcXCJwYXRoOiAnL1NpZ25VcCdcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwiZ2x5cGhpY29uIGdseXBoaWNvbi11c2VyXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlNpZ24gVXBcXHJcXG4gICAgICAgICAgICAgICAgPC9hPlxcclxcbiAgICAgICAgICAgIDwvbGk+XFxyXFxuXFxyXFxuICAgICAgICAgICAgPGxpIGRhdGEtYmluZCA9XFxcInBhdGg6ICcvTG9nSW4nLCBpZm5vdDogc3RhdHVzTG9nZ2VkXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGEgZGF0YS1iaW5kPVxcXCJwYXRoOiAnL0xvZ0luJ1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJnbHlwaGljb24gZ2x5cGhpY29uLWxvZy1pblxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj4gTG9naW5cXHJcXG4gICAgICAgICAgICAgICAgPC9hPlxcclxcbiAgICAgICAgICAgIDwvbGk+XFxyXFxuXFxyXFxuICAgICAgICAgICAgPGxpIGRhdGEtYmluZCA9XFxcInBhdGg6ICcvTG9nT3V0JywgaWY6IHN0YXR1c0xvZ2dlZFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxhIGRhdGEtYmluZD1cXFwicGF0aDogJy9Mb2dPdXQnXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcImdseXBoaWNvbiBnbHlwaGljb24tbG9nLW91dFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj4gTG9nb3V0XFxyXFxuICAgICAgICAgICAgICAgIDwvYT5cXHJcXG4gICAgICAgICAgICA8L2xpPlxcclxcbiAgICAgICAgPC91bD5cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9uYXY+XCI7XG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBVdGVudGUgb24gMDMvMDYvMjAxNy5cclxuICovXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIGtvID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2tvJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydrbyddIDogbnVsbCk7XHJcblxyXG5mdW5jdGlvbiBWaWV3TW9kZWwoY3R4KSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZWxmLnJlcG9zaXRvcmllcyA9IGN0eC5yZXBvc2l0b3JpZXM7XHJcbiAgICBzZWxmLnByb2NlZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHRlbXAgPSBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRTdWNjZXNzTmV4dCgpO1xyXG4gICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmRlbGV0ZVN1Y2Nlc3NOZXh0KCk7XHJcbiAgICAgICAgbG9jYXRpb24uaGFzaCA9IHRlbXA7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnRzLnJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAga28uY29tcG9uZW50cy5yZWdpc3Rlcignb3BlcmF0aW9uLXN1Y2Nlc3MnLCB7XHJcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGUuaHRtbCcpLFxyXG4gICAgICAgIHZpZXdNb2RlbDogVmlld01vZGVsXHJcbiAgICB9KTtcclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPG5hdi1iYXIgcGFyYW1zID0gXFxcInJlcG9zaXRvcmllczogcmVwb3NpdG9yaWVzXFxcIj48L25hdi1iYXI+XFxyXFxuPGRpdiBjbGFzcz1cXFwiY29udGFpbmVyXFxcIiBzdHlsZSA9IFxcXCJtYXJnaW46IGF1dG9cXFwiPlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiID5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTJcXFwiPjwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLThcXFwiPlxcclxcbiAgICAgICAgICAgIDxoMSBzdHlsZSA9IFxcXCJwYWRkaW5nLWJvdHRvbToxZW07IHRleHQtYWxpZ246IGNlbnRlclxcXCI+U3VjY2VzcyEgVGhlIG9wZXJhdGlvbiBoYXMgYmVlbiBjb3JyZWN0bHkgY2FycmllZCBvdXQ8L2gxPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3MgPSBcXFwicm93XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tNlxcXCI+PC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLWJpbmQgPSBcXFwiY2xpY2s6IHByb2NlZWRcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiPlByb2NlZWQ8L2J1dHRvbj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTRcXFwiPjwvZGl2PlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzID0gXFxcImNvbC1zbS0yXFxcIj48L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9kaXY+XCI7XG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBVdGVudGUgb24gMjQvMDUvMjAxNy5cclxuICovXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIGtvID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2tvJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydrbyddIDogbnVsbCk7XHJcbmV4cG9ydHMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCdzaWduLXVwLW91dGNvbWUtcCcsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZS5odG1sJyksXHJcbiAgICB9KTtcclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxuYXYtYmFyIHBhcmFtcyA9IFxcXCJyZXBvc2l0b3JpZXM6IHJlcG9zaXRvcmllc1xcXCI+PC9uYXYtYmFyPlxcclxcbjxkaXYgY2xhc3M9XFxcImNvbnRhaW5lclxcXCIgc3R5bGUgPSBcXFwibWFyZ2luOiBhdXRvXFxcIj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwicm93XFxcIiA+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzID0gXFxcImNvbC1zbS0yXFxcIj48L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1zbS04XFxcIj5cXHJcXG4gICAgICAgICAgICA8aDEgc3R5bGUgPSBcXFwicGFkZGluZy1ib3R0b206MWVtOyB0ZXh0LWFsaWduOiBjZW50ZXJcXFwiPkNvbmdyYXR1bGF0aW9ucywgdGhlIHNpZ24tdXAgcHJvY2VkdXJlIHN1Y2NlZGVkITwvaDE+XFxyXFxuICAgICAgICAgICAgPHAgc3R5bGUgPSBcXFwidGV4dC1hbGlnbjpjZW50ZXI7IHBhZGRpbmctYm90dG9tOjAuNWVtXFxcIj5Ob3cgeW91IGNhbiBMb2dpbjwvcD5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tMlxcXCI+PC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcbjwvZGl2PlwiO1xuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgVXRlbnRlIG9uIDE3LzA1LzIwMTcuXHJcbiAqL1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciBrbyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydrbyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsna28nXSA6IG51bGwpO1xyXG5cclxuZnVuY3Rpb24gVmlld01vZGVsKGN0eCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgc2VsZi5yZXBvc2l0b3JpZXMgPSBjdHgucmVwb3NpdG9yaWVzO1xyXG5cclxuXHJcbiAgICBzZWxmLmZ1bGxuYW1lID0ga28ub2JzZXJ2YWJsZSgpO1xyXG4gICAgc2VsZi5mdWxsbmFtZUVycm9yID0ga28ub2JzZXJ2YWJsZSgpO1xyXG4gICAgc2VsZi5mdWxsbmFtZS5zdWJzY3JpYmUoZnVuY3Rpb24oKXtcclxuICAgICAgICBzZWxmLmZ1bGxuYW1lRXJyb3IodW5kZWZpbmVkKTtcclxuICAgIH0pO1xyXG4gICAgLy9RVUVTVEkgRVJST1IgSU4gUkVBTFRBJyBTT05PIEJJTkRBVEkgQSBERUkgQ09TSSBIVE1MISEhIFZFREkgTCdFU0VNUElPIEtPXHJcbiAgICBzZWxmLnVzZXJuYW1lID0ga28ub2JzZXJ2YWJsZSgpO1xyXG4gICAgLy8gICAgIHNlbGYudXNlcm5hbWVFcnJvciA9IGtvLm9ic2VydmFibGUoKTtcclxuXHJcbiAgICBzZWxmLnBhc3N3b3JkMSA9IGtvLm9ic2VydmFibGUoKTtcclxuICAgIC8vc2VsZi5wYXNzd29yZDFFcnJvciA9IGtvLm9ic2VydmFibGUoKTtcclxuXHJcbiAgICAvKnNlbGYucGFzc3dvcmQyID0ga28ub2JzZXJ2YWJsZSgpO1xyXG4gICAgc2VsZi5wYXNzd29yZDJFcnJvciA9IGtvLm9ic2VydmFibGUoKTsqL1xyXG5cclxuICAgIHNlbGYucm9sZSA9IGtvLm9ic2VydmFibGUoXCJtYXN0ZXJcIik7XHJcbiAgICAvLyAgc2VsZi5yb2xlRXJyb3IgPSBrby5vYnNlcnZhYmxlKCk7XHJcblxyXG4gICAgc2VsZi5zaG91bGRTaG93TWVzc2FnZSA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xyXG4gICAgc2VsZi5lcnJvck1lc3NhZ2UgPSBrby5vYnNlcnZhYmxlQXJyYXkoKTtcclxuICAgIHNlbGYuYWxlcnRNZXNzYWdlcyA9IGtvLm9ic2VydmFibGVBcnJheSgpO1xyXG5cclxuICAgIHNlbGYudmFsaWRhdGVBbmRTZW5kID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnNpZ251cC52YWxpZGF0ZUFuZFNlbmQoXHJcbiAgICAgICAgICAgICAgICBzZWxmLmZ1bGxuYW1lKCksXHJcbiAgICAgICAgICAgICAgICBzZWxmLnVzZXJuYW1lKCksXHJcbiAgICAgICAgICAgICAgICBzZWxmLnBhc3N3b3JkMSgpLFxyXG4gICAgICAgICAgICAgICAgc2VsZi5yb2xlKClcclxuICAgICAgICAgICAgKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgLy8gYWxlcnQoXCJNZXNzYWdnaW8gaW52aWF0bywgcmlzcG9zdGEgcmljZXZ1dGFcIik7XHJcbiAgICAgICAgICAgICAgICAvL2FsZXJ0KHJlc3VsdCk7Ly91bmRlZmluZWQ/Pz9cclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhhc2ggPSBcIi9TaWduVXBPdXRjb21lUFwiO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5hbGVydE1lc3NhZ2VzLnJlbW92ZUFsbCgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRlbXBFcnIgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgaSBpbiBlLmVycm9ycy5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBFcnIucHVzaChcIiBcIitpICtcIjogXCIgK2UuZXJyb3JzLmVycm9yW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNlbGYuYWxlcnRNZXNzYWdlcy5wdXNoKHtzaG91bGRTaG93TWVzc2FnZTp0cnVlLCBlcnJvck1lc3NhZ2U6dGVtcEVycn0pXHJcbiAgICAgICAgICAgICAgICAvKnNlbGYuc2hvdWxkU2hvd01lc3NhZ2UodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmVycm9yTWVzc2FnZS5yZW1vdmVBbGwoKTtcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgaSBpbiBlLmVycm9ycy5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZXJyb3JNZXNzYWdlLnB1c2goXCIgXCIraSArXCI6IFwiICtlLmVycm9ycy5lcnJvcltpXSk7XHJcbiAgICAgICAgICAgICAgICB9Ki9cclxuICAgICAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICBpZiAoZS5lcnJvcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcIkVycm9yZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAvKnNlbGYudXNlcm5hbWVFcnJvcihlLmVycm9ycy51c2VybmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5mdWxsbmFtZUVycm9yKGUuZXJyb3JzLmZ1bGxuYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnJvbGVFcnJvcihlLmVycm9ycy5yb2xlKTsqL1xyXG4gICAgICAgICAgICAgICAgLyp9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3JlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KGUubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICB9Ki9cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy99XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnRzLnJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAga28uY29tcG9uZW50cy5yZWdpc3Rlcignc2lnbi11cCcsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZS5odG1sJyksXHJcbiAgICAgICAgdmlld01vZGVsOiBWaWV3TW9kZWxcclxuICAgIH0pO1xyXG59O1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPG5hdi1iYXIgcGFyYW1zID0gXFxcInJlcG9zaXRvcmllczogcmVwb3NpdG9yaWVzXFxcIj48L25hdi1iYXI+XFxyXFxuPGRpdiBjbGFzcz1cXFwiY29udGFpbmVyXFxcIiBzdHlsZSA9IFxcXCJtYXJnaW46IGF1dG9cXFwiPlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiID5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTJcXFwiPjwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLThcXFwiPlxcclxcbiAgICAgICAgICAgIDxoMSBzdHlsZSA9IFxcXCJwYWRkaW5nLWJvdHRvbToxZW07IHRleHQtYWxpZ246IGNlbnRlclxcXCI+RmlsbCBUaGVzZSBGb3JtcyB0byBHZXQgU3RhcnRlZDwvaDE+XFxyXFxuICAgICAgICAgICAgPGZvcm0gZGF0YS1iaW5kPVxcXCJzdWJtaXQ6IHZhbGlkYXRlQW5kU2VuZFxcXCIgY2xhc3M9XFxcImZvcm0taG9yaXpvbnRhbFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1iaW5kID0gXFxcImZvcmVhY2g6YWxlcnRNZXNzYWdlc1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImFsZXJ0IGFsZXJ0LWRhbmdlciBhbGVydC1kaXNtaXNzYWJsZSBmYWRlIGluXFxcIiBkYXRhLWJpbmQgPSBcXFwidmlzaWJsZTogc2hvdWxkU2hvd01lc3NhZ2VcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcImNsb3NlXFxcIiBkYXRhLWRpc21pc3M9XFxcImFsZXJ0XFxcIiBhcmlhLWxhYmVsPVxcXCJjbG9zZVxcXCI+JnRpbWVzOzwvYT5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDx1bCBkYXRhLWJpbmQgPSBcXFwiZm9yZWFjaDogZXJyb3JNZXNzYWdlXFxcIiBzdHlsZSA9IFxcXCJsaXN0LXN0eWxlLXR5cGU6bm9uZVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPldhcm5pbmchPC9zdHJvbmc+PHNwYW4gZGF0YS1iaW5kID0gXFxcInRleHQ6JGRhdGFcXFwiPjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC91bD5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cXFwiY29udHJvbC1sYWJlbCBjb2wtc20tMlxcXCIgZm9yID0gXFxcImZ1bGxuYW1lXFxcIj5GdWxsIE5hbWU6PC9sYWJlbD5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1zbS0xMFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiIGlkID0gXFxcImZ1bGxuYW1lXFxcIiBwbGFjZWhvbGRlcj1cXFwiRW50ZXIgeW91ciBGdWxsIE5hbWVcXFwiIHJlcXVpcmVkIGRhdGEtYmluZCA9IFxcXCJ0ZXh0SW5wdXQ6ZnVsbG5hbWVcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cXFwiY29udHJvbC1sYWJlbCBjb2wtc20tMlxcXCIgZm9yID0gXFxcInVzZXJuYW1lXFxcIj5Vc2VybmFtZTo8L2xhYmVsPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLTEwXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgaWQgPSBcXFwidXNlcm5hbWVcXFwiIHBsYWNlaG9sZGVyPVxcXCJFbnRlciB5b3VyIFVzZXJuYW1lXFxcIiByZXF1aXJlZCBkYXRhLWJpbmQgPSBcXFwidGV4dElucHV0OnVzZXJuYW1lXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XFxcImNvbnRyb2wtbGFiZWwgY29sLXNtLTJcXFwiIGZvcj1cXFwicHdkMVxcXCI+UGFzc3dvcmQ6PC9sYWJlbD5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1zbS0xMFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcInBhc3N3b3JkXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIiBpZD1cXFwicHdkMVxcXCIgcGxhY2Vob2xkZXI9XFxcIkVudGVyIHBhc3N3b3JkXFxcIiByZXF1aXJlZCBkYXRhLWJpbmQgPSBcXFwidGV4dElucHV0OnBhc3N3b3JkMVxcXCIgbWlubGVuZ3RoID0gXFxcIjZcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8IS0tIFBFUiBPUkEgTk9OIENPTVBMSUNBUlRJIExBIFZJVEEgPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XFxcImNvbnRyb2wtbGFiZWwgY29sLXNtLTJcXFwiIGZvcj1cXFwicHdkMlxcXCI+Q29uZmlybSB5b3VyIFBhc3N3b3JkOjwvbGFiZWw+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtc20tMTBcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJwYXNzd29yZFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgaWQ9XFxcInB3ZDJcXFwiIHBsYWNlaG9sZGVyPVxcXCJFbnRlciBwYXNzd29yZFxcXCIgcmVxdWlyZWQ+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+LS0+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVxcXCJjb250cm9sLWxhYmVsIGNvbC1zbS0yXFxcIj5Sb2xlOjwvbGFiZWw+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtc20tMTBcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cXFwicmFkaW8taW5saW5lXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcInJhZGlvXFxcIiBuYW1lPVxcXCJyb2xlXFxcIiB2YWx1ZSA9IFxcXCJtYXN0ZXJcXFwiIGRhdGEtYmluZCA9IFxcXCJjaGVja2VkOiByb2xlXFxcIiA+TWFzdGVyXFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XFxcInJhZGlvLWlubGluZVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJyYWRpb1xcXCIgbmFtZT1cXFwicm9sZVxcXCIgIHZhbHVlID0gXFxcIndvcmtlclxcXCIgZGF0YS1iaW5kID0gXFxcImNoZWNrZWQ6IHJvbGVcXFwiPldvcmtlclxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLW9mZnNldC0yIGNvbC1zbS0xMFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJzdWJtaXRcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiIGlkID0gXFxcInN1Ym1pdFxcXCI+U3VibWl0PC9idXR0b24+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPC9mb3JtPlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzID0gXFxcImNvbC1zbS0yXFxcIj48L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9kaXY+XFxyXFxuXCI7XG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBVdGVudGUgb24gMTIvMDYvMjAxNy5cclxuICovXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIGtvID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2tvJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydrbyddIDogbnVsbCk7XHJcblxyXG5mdW5jdGlvbiBWaWV3TW9kZWwoY3R4KSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZWxmLnJlcG9zaXRvcmllcyA9IGN0eC5yZXBvc2l0b3JpZXM7XHJcbiAgICBzZWxmLm51bUF2YWlsYWJsZSA9IGtvLm9ic2VydmFibGUoKTtcclxuICAgIHNlbGYubnVtQWNjZXB0ZWQgPSBrby5vYnNlcnZhYmxlKCk7XHJcbiAgICBzZWxmLm51bVJlamVjdGVkID0ga28ub2JzZXJ2YWJsZSgpO1xyXG4gICAgc2VsZi5udW1Bbm5vdGF0ZWQgPSBrby5vYnNlcnZhYmxlKCk7XHJcbiAgICBzZWxmLmlzU2VsZWN0ID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XHJcbiAgICBzZWxmLmlzQW5ub3RhdGUgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcclxuXHJcbiAgICBzZWxmLmdldFRhc2tTdGF0aXN0aWNzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgLy8gYWxlcnQoY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0Q3VycmVudFRhc2soKS5zdGF0aXN0aWNzKTtcclxuICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnRhc2tzdGF0aXN0aWNzLmdldFRhc2tTdGF0aXN0aWNzKFxyXG4gICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRBdXRoQXBpVG9rZW4oKSxcclxuICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0Q3VycmVudFRhc2soKS5zdGF0aXN0aWNzXHJcbiAgICAgICAgKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAvLyBhbGVydChcIlN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgIHNlbGYubnVtQXZhaWxhYmxlKHJlc3VsdC5hdmFpbGFibGUpO1xyXG4gICAgICAgICAgICBzZWxmLm51bUFjY2VwdGVkKHJlc3VsdC5hY2NlcHRlZCk7XHJcbiAgICAgICAgICAgIHNlbGYubnVtUmVqZWN0ZWQocmVzdWx0LnJlamVjdGVkKTtcclxuICAgICAgICAgICAgc2VsZi5udW1Bbm5vdGF0ZWQocmVzdWx0LmFubm90YXRlZCk7XHJcbiAgICAgICAgICAgIChyZXN1bHQuYW5ub3RhdGVkID09PSB1bmRlZmluZWQpP3NlbGYuaXNTZWxlY3QodHJ1ZSk6c2VsZi5pc0Fubm90YXRlKHRydWUpO1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3JcIik7XHJcbiAgICAgICAgICAgYWxlcnQoZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHNlbGYuZ2V0VGFza1N0YXRpc3RpY3MoKTtcclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnRzLnJlZ2lzdGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAga28uY29tcG9uZW50cy5yZWdpc3RlcigndGFzay1zdGF0aXN0aWNzJywge1xyXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlLmh0bWwnKSxcclxuICAgICAgICB2aWV3TW9kZWw6IFZpZXdNb2RlbFxyXG4gICAgfSk7XHJcbn07XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8bmF2LWJhciBwYXJhbXMgPSBcXFwicmVwb3NpdG9yaWVzOiByZXBvc2l0b3JpZXNcXFwiPjwvbmF2LWJhcj5cXHJcXG48ZGl2IGNsYXNzPVxcXCJjb250YWluZXJcXFwiIHN0eWxlID0gXFxcIm1hcmdpbjogYXV0b1xcXCI+XFxyXFxuXFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcInJvd1xcXCIgPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tMlxcXCI+PC9kaXY+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzID0gXFxcImNvbC1zbS04XFxcIj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbCBwYW5lbC1wcmltYXJ5XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtaGVhZGluZ1xcXCI+VGFzayBzdGF0aXN0aWNzPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWJvZHlcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPHA+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgTnVtYmVyIG9mIGltYWdlczogPHNwYW4gZGF0YS1iaW5kID0gXFxcInRleHQ6bnVtQXZhaWxhYmxlXFxcIj48L3NwYW4+PGJyLz5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLWJpbmQgID1cXFwiaWY6aXNTZWxlY3RcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIE51bWJlciBvZiBhY2NlcHRlZCBpbWFnZXM6IDxzcGFuIGRhdGEtYmluZCA9IFxcXCJ0ZXh0Om51bUFjY2VwdGVkXFxcIj48L3NwYW4+PGJyLz5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICBOdW1iZXIgb2YgcmVqZWN0ZWQgaW1hZ2VzOiA8c3BhbiBkYXRhLWJpbmQgPSBcXFwidGV4dDpudW1SZWplY3RlZFxcXCI+PC9zcGFuPjxici8+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtYmluZCA9IFxcXCJpZjppc0Fubm90YXRlXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICBOdW1iZXIgb2YgYW5ub3RhdGlvbnM6IDxzcGFuIGRhdGEtYmluZCA9IFxcXCJ0ZXh0Om51bUFubm90YXRlZFxcXCI+PC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvcD5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTJcXFwiPjwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG48L2Rpdj5cIjtcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFV0ZW50ZSBvbiAxMy8wNi8yMDE3LlxyXG4gKi9cclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIga28gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sna28nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2tvJ10gOiBudWxsKTtcclxuXHJcbmZ1bmN0aW9uIFZpZXdNb2RlbChjdHgpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHNlbGYucmVwb3NpdG9yaWVzID0gY3R4LnJlcG9zaXRvcmllcztcclxuICAgIHNlbGYudHlwZSA9IGtvLm9ic2VydmFibGUoKTtcclxuICAgIHNlbGYuaW1hZ2UgPSBrby5vYnNlcnZhYmxlKCk7XHJcbiAgICBzZWxmLnNpemUgPSBrby5vYnNlcnZhYmxlKCk7XHJcbiAgICBzZWxmLm5leHRUYXNrQXZhaWxhYmxlID0ga28ub2JzZXJ2YWJsZSh0cnVlKTtcclxuICAgIHNlbGYuYW5ub3RhdGlvbkVuYWJsZWQgPSBrby5vYnNlcnZhYmxlKHRydWUpO1xyXG4gICAgc2VsZi5zaG91bGRTaG93ID0ga28uY29tcHV0ZWQoZnVuY3Rpb24oKXtyZXR1cm4gc2VsZi5uZXh0VGFza0F2YWlsYWJsZSgpICYmIHNlbGYuYW5ub3RhdGlvbkVuYWJsZWQoKTt9KTtcclxuXHJcbiAgICBzZWxmLmxpbmUgPSBrby5vYnNlcnZhYmxlKCk7XHJcbiAgICBzZWxmLmxpbmUuc3Vic2NyaWJlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL2FsZXJ0KHNlbGYubGluZSgpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHNlbGYuY2xlYXJBbm5vdGF0aW9uID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBzZWxmLmxpbmUoJycpO1xyXG4gICAgICAgIC8qJChcIiNhbm5vdGF0aW9uXCIpLnJlbW92ZShcIiNsaW5lLWRyYXdlclwiKTtcclxuICAgICAgICBzZWxmLmxpbmUgPSBrby5vYnNlcnZhYmxlKCk7XHJcbiAgICAgICAgJChcIiNhbm5vdGF0aW9uXCIpLmFwcGVuZChcIjxsaW5lLWRyYXdlciBpZCA9ICdsaW5lLWRyYXdlcicgcGFyYW1zPSdzcmM6IGltYWdlLCBwZW46IHNpemUsIGxpbmU6IGxpbmUnPjwvbGluZS1kcmF3ZXI+XCIpOyovXHJcbiAgICB9O1xyXG5cclxuICAgIHNlbGYuc3RhcnRXb3JraW5nU2Vzc2lvbiA9IGZ1bmN0aW9uICgvKmlzTmV4dCovKSB7XHJcbiAgICAgICAgY3R4LnJlcG9zaXRvcmllcy50YXNrd29ya2luZ3Nlc3Npb24uc3RhcnRXb3JraW5nU2Vzc2lvbihcclxuICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0QXV0aEFwaVRva2VuKCksXHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEN1cnJlbnRUYXNrKCkuc2Vzc2lvblxyXG4gICAgICAgICkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIC8vYWxlcnQoXCJTdWNjZXNzIHN0YXJ0IHdvcmtpbmcgc2Vzc2lvbmVcIik7XHJcbiAgICAgICAgICAgLy8gaWYoaXNOZXh0KXtcclxuICAgICAgICAgICAgICAgIHNlbGYuZ2V0TmV4dFRhc2tJbnN0YW5jZSgpO1xyXG4gICAgICAgICAgIC8vIH1cclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZihlID09IFwiRXJyb3I6IE5vdCBGb3VuZFwiICYmIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEN1cnJlbnRUYXNrKCkudHlwZSA9PSBcInNlbGVjdGlvblwiKXtcclxuICAgICAgICAgICAgICAgIHNlbGYubmV4dFRhc2tBdmFpbGFibGUoZmFsc2UpO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihlID09IFwiRXJyb3I6IE5vdCBGb3VuZFwiICYmIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEN1cnJlbnRUYXNrKCkudHlwZSA9PSBcImFubm90YXRpb25cIil7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmFubm90YXRpb25FbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2FsZXJ0KFwic2Vzc2lvblwiICsgZS50ZXh0U3RhdHVzKTtcclxuICAgICAgICAgICAgLy9hbGVydChcIkVycm9yXCIpO1xyXG4gICAgICAgICAgICAvL2FsZXJ0KGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBzZWxmLnN0YXJ0V29ya2luZ1Nlc3Npb24oKTtcclxuXHJcbiAgICBzZWxmLmdldE5leHRUYXNrSW5zdGFuY2UgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIGN0eC5yZXBvc2l0b3JpZXMudGFza3dvcmtpbmdzZXNzaW9uLmdldE5leHRUYXNrSW5zdGFuY2UoXHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEF1dGhBcGlUb2tlbigpLFxyXG4gICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRDdXJyZW50VGFzaygpLnNlc3Npb25cclxuICAgICAgICApLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgIC8vIGFsZXJ0KFwiU3VjY2VzcyBuZXh0IHRhc2sgaW5zdGFuY2VcIik7XHJcbiAgICAgICAgICAgIHNlbGYudHlwZShyZXN1bHQudHlwZSk7XHJcbiAgICAgICAgICAgIHNlbGYuaW1hZ2UocmVzdWx0LmltYWdlKTtcclxuICAgICAgICAgICAgc2VsZi5zaXplKHJlc3VsdC5zaXplKTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYoZSA9PSBcIkVycm9yOiBHb25lXCIgJiYgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0Q3VycmVudFRhc2soKS50eXBlID09IFwic2VsZWN0aW9uXCIpe1xyXG4gICAgICAgICAgICAgICAgc2VsZi5uZXh0VGFza0F2YWlsYWJsZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmICggY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0Q3VycmVudFRhc2soKS50eXBlID09IFwiYW5ub3RhdGlvblwiKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuYW5ub3RhdGlvbkVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vYWxlcnQoXCJnZXROZXh0VGFza1wiICsgZSk7XHJcbiAgICAgICAgICAgIC8vYWxlcnQoXCJFcnJvclwiKTtcclxuICAgICAgICAgICAvLyBhbGVydChlKTsvL0dPTkUgPSBHacOgIGZhdHRvXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLy9zZWxmLmdldE5leHRUYXNrSW5zdGFuY2UoKTtcclxuXHJcblxyXG4gICAgc2VsZi5zdWJtaXRBbm5vdGF0aW9uID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBpZihzZWxmLmxpbmUoKSkge1xyXG4gICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnRhc2t3b3JraW5nc2Vzc2lvbi5zdWJtaXRBbm5vdGF0aW9uKFxyXG4gICAgICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0QXV0aEFwaVRva2VuKCksXHJcbiAgICAgICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRDdXJyZW50VGFzaygpLnNlc3Npb24sXHJcbiAgICAgICAgICAgICAgICBzZWxmLmxpbmUoKVxyXG4gICAgICAgICAgICApLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJTdWJtaXR0ZWRcIik7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxpbmUoJycpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5nZXROZXh0VGFza0luc3RhbmNlKCk7XHJcbiAgICAgICAgICAgICAgICAvL3NlbGYuc3RhcnRXb3JraW5nU2Vzc2lvbih0cnVlKTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICBhbGVydChlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiWW91IGNhbm5vdCBzdWJtaXQgYW4gZW1wdHkgYW5ub3RhdGlvbiFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBzZWxmLnJlamVjdFNlbGVjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgY3R4LnJlcG9zaXRvcmllcy50YXNrd29ya2luZ3Nlc3Npb24uc3VibWl0U2VsZWN0aW9uKFxyXG4gICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRBdXRoQXBpVG9rZW4oKSxcclxuICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0Q3VycmVudFRhc2soKS5zZXNzaW9uLFxyXG4gICAgICAgICAgICBmYWxzZVxyXG4gICAgICAgICkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiU3VibWl0dGVkXCIpO1xyXG4gICAgICAgICAgICBzZWxmLmdldE5leHRUYXNrSW5zdGFuY2UoKTtcclxuICAgICAgICAgICAgLy9zZWxmLnN0YXJ0V29ya2luZ1Nlc3Npb24odHJ1ZSk7XHJcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJFcnJvclwiKTtcclxuICAgICAgICAgICAgYWxlcnQoZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHNlbGYuYWNjZXB0U2VsZWN0aW9uID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnRhc2t3b3JraW5nc2Vzc2lvbi5zdWJtaXRTZWxlY3Rpb24oXHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEF1dGhBcGlUb2tlbigpLFxyXG4gICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRDdXJyZW50VGFzaygpLnNlc3Npb24sXHJcbiAgICAgICAgICAgIHRydWVcclxuICAgICAgICApLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBhbGVydChcIlN1Ym1pdHRlZFwiKTtcclxuICAgICAgICAgICAgc2VsZi5nZXROZXh0VGFza0luc3RhbmNlKCk7XHJcbiAgICAgICAgICAgIC8vc2VsZi5zdGFydFdvcmtpbmdTZXNzaW9uKHRydWUpO1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3JcIik7XHJcbiAgICAgICAgICAgIGFsZXJ0KGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxufVxyXG5cclxuXHJcbmV4cG9ydHMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCd0YXNrLXdvcmtpbmctc2Vzc2lvbicsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90ZW1wbGF0ZS5odG1sJyksXHJcbiAgICAgICAgdmlld01vZGVsOiBWaWV3TW9kZWxcclxuICAgIH0pO1xyXG59O1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPG5hdi1iYXIgcGFyYW1zID0gXFxcInJlcG9zaXRvcmllczogcmVwb3NpdG9yaWVzXFxcIj48L25hdi1iYXI+XFxyXFxuPGRpdiBjbGFzcz1cXFwiY29udGFpbmVyXFxcIiBzdHlsZSA9IFxcXCJtYXJnaW46IGF1dG9cXFwiPlxcclxcblxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiID5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTJcXFwiPjwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tOFxcXCIgZGF0YS1iaW5kID0gXFxcImlmOnNob3VsZFNob3dcXFwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsIHBhbmVsLXByaW1hcnlcXFwiID5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtaGVhZGluZ1xcXCIgZGF0YS1iaW5kID0gXFxcInRleHQ6dHlwZVxcXCI+PC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWJvZHlcXFwiPlxcclxcblxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLWJpbmQgPSBcXFwiaWZub3Q6c2l6ZVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBkYXRhLWJpbmQgPSBcXFwiYXR0ciA6IHtzcmMgOiBpbWFnZX1cXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3MgPSBcXFwiYnRuIGJ0bi1wcmltYXJ5XFxcIiBkYXRhLWJpbmQgPSBcXFwiY2xpY2s6IHJlamVjdFNlbGVjdGlvblxcXCI+UmVqZWN0PC9idXR0b24+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcyA9IFxcXCJidG4gYnRuLXByaW1hcnlcXFwiIGRhdGEtYmluZCA9IFxcXCJjbGljazogYWNjZXB0U2VsZWN0aW9uXFxcIj5BY2NlcHQ8L2J1dHRvbj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBpZCA9IFxcXCJhbm5vdGF0aW9uXFxcIiBkYXRhLWJpbmQgPSBcXFwiaWY6c2l6ZVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpbmUtZHJhd2VyIGlkID0gXFxcImxpbmUtZHJhd2VyXFxcIiBwYXJhbXM9XFxcInNyYzogaW1hZ2UsIHBlbjogc2l6ZSwgbGluZTogbGluZVxcXCI+PC9saW5lLWRyYXdlcj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVxcXCJwdWxsLXJpZ2h0IGJ0biBidG4tcHJpbWFyeVxcXCIgZGF0YS1iaW5kID0gXFxcImNsaWNrOiBzdWJtaXRBbm5vdGF0aW9uXFxcIj5TdWJtaXQ8L2J1dHRvbj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVxcXCJwdWxsLXJpZ2h0IGJ0biBidG4tcHJpbWFyeVxcXCIgZGF0YS1iaW5kID0gXFxcImNsaWNrOiBjbGVhckFubm90YXRpb25cXFwiPkNsZWFyPC9idXR0b24+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLThcXFwiIGRhdGEtYmluZCA9IFxcXCJpZm5vdDpuZXh0VGFza0F2YWlsYWJsZVxcXCI+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbCBwYW5lbC1wcmltYXJ5XFxcIiA+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtaGVhZGluZ1xcXCI+WW91IGNvbXBsZXRlZCB5b3VyIHRhc2shPC9kaXY+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtYm9keVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIENvbmdyYXR1bGF0aW9ucyEgWW91IGNvbXBsZXRlZCB5b3VyIHRhc2ssIG5vIG1vcmUgaW1hZ2VzIGFyZSBhdmFpbGFibGUgZm9yIHRoaXMgdGFzayEgUmV0dXJuIHRvIDxhIGRhdGEtYmluZCA9IFxcXCJwYXRoOicvVXNlckhvbWUnXFxcIj4geW91ciBwZXJzb25hbCBob21lcGFnZTwvYT4uXFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tOFxcXCIgZGF0YS1iaW5kID0gXFxcImlmbm90OmFubm90YXRpb25FbmFibGVkXFxcIj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbCBwYW5lbC1wcmltYXJ5XFxcIiA+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWhlYWRpbmdcXFwiPldhaXQhPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWJvZHlcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgVGhlIGFubm90YXRpb24gdGFzayBpcyBub3QgZW5hYmxlZCEgUmV0dXJuIGF0IHlvdXIgPGEgZGF0YS1iaW5kID0gXFxcInBhdGg6Jy9Vc2VySG9tZSdcXFwiPmhvbWUgcGFnZTwvYT5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTJcXFwiPjwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG48L2Rpdj5cIjtcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFV0ZW50ZSBvbiAyNC8wNS8yMDE3LlxyXG4gKi9cclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIga28gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sna28nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2tvJ10gOiBudWxsKTtcclxudmFyICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCk7XHJcblxyXG5mdW5jdGlvbiBWaWV3TW9kZWwoY3R4KSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZWxmLnJlcG9zaXRvcmllcyA9IGN0eC5yZXBvc2l0b3JpZXM7XHJcbiAgICBzZWxmLnZpc2libGUgPSBmYWxzZTtcclxuICAgIHNlbGYuZWRpdFVzZXJTdHJpbmcgPSBrby5vYnNlcnZhYmxlKFwiRWRpdCBVc2VyIEluZm9cIik7XHJcbiAgICAvL1FVRVNUSSBFUlJPUiBJTiBSRUFMVEEnIFNPTk8gQklOREFUSSBBIERFSSBDT1NJIEhUTUwhISEgVkVESSBMJ0VTRU1QSU8gS09cclxuICAgIHNlbGYudXNlcm5hbWUgPSBrby5vYnNlcnZhYmxlKCk7XHJcbiAgICBzZWxmLmZ1bGxuYW1lID0ga28ub2JzZXJ2YWJsZSgpO1xyXG4gICAgc2VsZi5yb2xlID0ga28ub2JzZXJ2YWJsZSgpO1xyXG4gICAgc2VsZi5pc1VzZXJNYXN0ZXIgPSBrby5vYnNlcnZhYmxlKCk7XHJcblxyXG4gICAgc2VsZi5yZWFkeUNhbXBhaWduc0F2YWlsYWJsZSA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xyXG4gICAgc2VsZi5yZWFkeUNhbXBhaWducyA9IGtvLm9ic2VydmFibGVBcnJheSgpO1xyXG4gICAgc2VsZi5zdGFydGVkQ2FtcGFpZ25zQXZhaWxhYmxlID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XHJcbiAgICBzZWxmLnN0YXJ0ZWRDYW1wYWlnbnMgPSBrby5vYnNlcnZhYmxlQXJyYXkoKTtcclxuICAgIHNlbGYuZW5kZWRDYW1wYWlnbnNBdmFpbGFibGUgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcclxuICAgIHNlbGYuZW5kZWRDYW1wYWlnbnMgPSBrby5vYnNlcnZhYmxlQXJyYXkoKTtcclxuXHJcbiAgICBzZWxmLm5ld3Bhc3N3b3JkID0ga28ub2JzZXJ2YWJsZShcIlwiKTtcclxuICAgIHNlbGYubmV3ZnVsbG5hbWUgPSBrby5vYnNlcnZhYmxlKFwiXCIpO1xyXG5cclxuICAgIC8vc2VsZi5zaG91bGRTaG93RXJyb3JNZXNzYWdlID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XHJcbiAgICAvL3NlbGYuZXJyb3JNZXNzYWdlID0ga28ub2JzZXJ2YWJsZSgpO1xyXG5cclxuICAgIC8vc2VsZi5zaG91bGRTaG93U3VjY2Vzc01lc3NhZ2UgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcclxuICAgIC8vc2VsZi5zdWNjZXNzTWVzc2FnZSA9IGtvLm9ic2VydmFibGUoKTtcclxuXHJcblxyXG4gICAgc2VsZi50YXNrc0F2YWlsYWJsZSA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xyXG4gICAgc2VsZi50YXNrcyA9IGtvLm9ic2VydmFibGVBcnJheSgpO1xyXG5cclxuICAgIHNlbGYuYWxlcnRNZXNzYWdlcyA9IGtvLm9ic2VydmFibGVBcnJheSgpO1xyXG5cclxuICAgIHNlbGYuc2V0VXNlckNhbXBhaWducyA9IGZ1bmN0aW9uKHJlc3VsdCl7XHJcbiAgICAgICAgaWYgKCEocmVzdWx0ID09PSB1bmRlZmluZWQpKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIHggaW4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocmVzdWx0LmNhbXBhaWducykpIHtcclxuICAgICAgICAgICAgICAgIGlmICghKHJlc3VsdC5jYW1wYWlnbnNbeF0gPT0gdW5kZWZpbmVkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocmVzdWx0LmNhbXBhaWduc1t4XS5zdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImVuZGVkXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmVuZGVkQ2FtcGFpZ25zKCkucHVzaChyZXN1bHQuY2FtcGFpZ25zW3hdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYWxlcnQoXCJlbmRlZCBhdmFpbGFibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInN0YXJ0ZWRcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc3RhcnRlZENhbXBhaWducygpLnB1c2gocmVzdWx0LmNhbXBhaWduc1t4XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2FsZXJ0KFwic3RhcnRlZCBhdmFpbGFibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInJlYWR5XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhbGVydChyZXN1bHQuY2FtcGFpZ25zW3hdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmVhZHlDYW1wYWlnbnMoKS5wdXNoKHJlc3VsdC5jYW1wYWlnbnNbeF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9hbGVydCgnVGhlIGxlbmd0aCBvZiB0aGUgYXJyYXkgaXMgJyArIHNlbGYucmVhZHlDYW1wYWlnbnMoKS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9hbGVydChcInJlYWR5IGF2YWlsYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9hbGVydChcIkVycm9yZSBzd2l0Y2ggY2FtcGFnbmFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vYWxlcnQoc2VsZi5lbmRlZENhbXBhaWducygpLmxlbmd0aCArIFwiZW5kZWRcIik7XHJcbiAgICAgICAgLy9hbGVydChzZWxmLnN0YXJ0ZWRDYW1wYWlnbnMoKS5sZW5ndGggKyBcInN0YXJ0ZWRcIik7XHJcbiAgICAgICAgLy9hbGVydChzZWxmLnJlYWR5Q2FtcGFpZ25zKCkubGVuZ3RoICsgXCJyZWFkeVwiKTtcclxuICAgICAgICBzZWxmLmVuZGVkQ2FtcGFpZ25zQXZhaWxhYmxlKHNlbGYuZW5kZWRDYW1wYWlnbnMoKS5sZW5ndGggPiAwID8gdHJ1ZSA6IGZhbHNlKTtcclxuICAgICAgICBzZWxmLnN0YXJ0ZWRDYW1wYWlnbnNBdmFpbGFibGUoc2VsZi5zdGFydGVkQ2FtcGFpZ25zKCkubGVuZ3RoID4gMCA/IHRydWUgOiBmYWxzZSk7XHJcbiAgICAgICAgc2VsZi5yZWFkeUNhbXBhaWduc0F2YWlsYWJsZShzZWxmLnJlYWR5Q2FtcGFpZ25zKCkubGVuZ3RoID4gMCA/IHRydWUgOiBmYWxzZSk7XHJcbiAgICB9O1xyXG4gICAgc2VsZi5nZXRVc2VyQ2FtcGFpZ25zID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAvKnZhciByZXN1bHQgPSBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRVc2VyQ2FtcGFpZ25zKCk7XHJcbiAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBzZWxmLnNldFVzZXJDYW1wYWlnbnMocmVzdWx0KTtcclxuICAgICAgICB9ZWxzZSB7IEBUT0RPIE5PIENBQ0hJTkc6IGxvIHN0YXRvIGRlbGxhIGNhbXBhZ25hIGxhdG8gc2VydmVyIHB1w7IgZXNzZXJlIGNhbWJpYXRvISBiaXNvZ25hIHJpcGV0ZXJlIGlsIGZldGNoISovXHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMudXNlcmhvbWUuZ2V0VXNlckNhbXBhaWducyhcclxuICAgICAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEF1dGhBcGlUb2tlbigpXHJcbiAgICAgICAgICAgICkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAvL2FsZXJ0KFwiU3VjY2Vzc28gQ2FtcGFnbmFcIik7XHJcbiAgICAgICAgICAgICAgICAvL3ZhciB0ZW1wID0gSlNPTi5wYXJzZShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgLyphbGVydChcIlN1Y2Nlc3NvIFBhcnNlXCIpO1xyXG4gICAgICAgICAgICAgICAgIGFsZXJ0KHJlc3VsdCk7Ly9yaXRvcm5hIHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgIGZvcih2YXIgeCBpbiByZXN1bHQuY2FtcGFpZ25zKXtcclxuICAgICAgICAgICAgICAgICBhbGVydCh4K1wiXCIrcmVzdWx0LmNhbXBhaWduc1t4XSk7XHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgIHNlbGYuZW5kZWRDYW1wYWlnbnMoW10pO1xyXG4gICAgICAgICAgICAgICAgIHNlbGYuc3RhcnRlZENhbXBhaWducyhbXSk7XHJcbiAgICAgICAgICAgICAgICAgc2VsZi5yZWFkeUNhbXBhaWducyhbXSk7Ki9cclxuICAgICAgICAgICAgICAgIC8vYWxlcnQocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0VXNlckNhbXBhaWducyhyZXN1bHQpO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJGYWxsaXRvXCIpO1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgc2VsZi5zZXRUYXNrc0luZm8gPSBmdW5jdGlvbihyZXN1bHQpe1xyXG4gICAgICAgIC8qdmFyIHRlbXAgPSByZXN1bHQudGFza3M7XHJcblxyXG4gICAgICAgIHNlbGYudGFza3NBdmFpbGFibGUoKHRlbXAubGVuZ3RoID4gMCkgPyB0cnVlIDogZmFsc2UpO1xyXG4gICAgICAgIGlmKHRlbXAubGVuZ3RoID4wKXtcclxuICAgICAgICAgICAgZm9yKHZhciB4IGluIHRlbXApXHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMudXNlcmhvbWUuZ2V0VGFza0luZm8oXHJcbiAgICAgICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRBdXRoQXBpVG9rZW4oKSxcclxuICAgICAgICAgICAgICAgIHRlbXBbeF0uaWRcclxuICAgICAgICAgICAgKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgeSBpbiByZXN1bHQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiXCIreStcIlwiK3Jlc3VsdFt5XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0ZW1wW3hdLmNhbXBhaWduTmFtZSA9IHJlc3VsdC5jYW1wYWlnbjtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KHRlbXBbeF0udHlwZSk7XHJcbiAgICAgICAgICAgICAgICBhbGVydCh0ZW1wW3hdLmNhbXBhaWduTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnRhc2tzKHRlbXApO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJFcnJvcmVcIik7XHJcbiAgICAgICAgICAgICAgICBhbGVydChlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSovXHJcbiAgICAgICAgdmFyIHRlbXAgPSByZXN1bHQudGFza3M7XHJcbiAgICAgICAgc2VsZi50YXNrc0F2YWlsYWJsZSgodGVtcC5sZW5ndGggPiAwKSA/IHRydWUgOiBmYWxzZSk7XHJcbiAgICAgICAgaWYodGVtcC5sZW5ndGggPjApIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgeCBpbiB0ZW1wKSB7XHJcbiAgICAgICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnVzZXJob21lLmdldFRhc2tJbmZvKFxyXG4gICAgICAgICAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEF1dGhBcGlUb2tlbigpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBbeF0uaWRcclxuICAgICAgICAgICAgICAgICkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9hbGVydChyZXN1bHQuaWQpXHJcbiAgICAgICAgICAgICAgICAgICAvLyBhbGVydChyZXN1bHQudHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50YXNrcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHJlc3VsdC5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogcmVzdWx0LnR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbXBhaWduTmFtZTogcmVzdWx0LmNhbXBhaWduLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXNzaW9uOiByZXN1bHQuc2Vzc2lvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGlzdGljczogcmVzdWx0LnN0YXRpc3RpY3NcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJFcnJvcmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgc2VsZi5nZXRUYXNrc0luZm8gPSBmdW5jdGlvbigpe1xyXG4gICAgICAvKiAgdmFyIHJlc3VsdCA9IGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldFRhc2tzSW5mbygpO1xyXG4gICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgc2VsZi5zZXRUYXNrc0luZm8ocmVzdWx0KTtcclxuICAgICAgICB9ZWxzZSB7Ki9cclxuICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy51c2VyaG9tZS5nZXRUYXNrc0luZm8oXHJcbiAgICAgICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRBdXRoQXBpVG9rZW4oKVxyXG4gICAgICAgICAgICApLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgLy9hbGVydChcInN1Y2Nlc3NvIHRhc2tzSW5mb1wiKTtcclxuICAgICAgICAgICAgICAgIC8vY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuc2V0VGFza3NJbmZvKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNldFRhc2tzSW5mbyhyZXN1bHQpO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJFcnJvcmVcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vfVxyXG4gICAgfTtcclxuXHJcbiAgICBzZWxmLnNldFVzZXJJbmZvID0gZnVuY3Rpb24ocmVzdWx0KXtcclxuICAgICAgICBzZWxmLnVzZXJuYW1lKHJlc3VsdC51c2VybmFtZSk7XHJcbiAgICAgICAgc2VsZi5yb2xlKHJlc3VsdC50eXBlKTtcclxuICAgICAgICBzZWxmLmZ1bGxuYW1lKHJlc3VsdC5mdWxsbmFtZSk7XHJcbiAgICAgICAgc2VsZi5pc1VzZXJNYXN0ZXIoKHJlc3VsdC50eXBlID09IFwibWFzdGVyXCIpID8gdHJ1ZSA6IGZhbHNlKTtcclxuICAgICAgICAocmVzdWx0LnR5cGUgPT0gXCJtYXN0ZXJcIikgPyBzZWxmLmdldFVzZXJDYW1wYWlnbnMoKSA6IHNlbGYuZ2V0VGFza3NJbmZvKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHNlbGYuZ2V0VXNlckluZm8gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0VXNlckluZm8oKTtcclxuICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHNlbGYuc2V0VXNlckluZm8ocmVzdWx0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnVzZXJob21lLmdldFVzZXJJbmZvKFxyXG4gICAgICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0QXV0aEFwaVRva2VuKClcclxuICAgICAgICAgICAgKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLnNldFVzZXJJbmZvKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNldFVzZXJJbmZvKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIkVycm9yZVwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHNlbGYuZ2V0VXNlckluZm8oKTtcclxuXHJcblxyXG5cclxuXHJcbiAgICBzZWxmLndvcmtUYXNrID0gZnVuY3Rpb24odGFzayl7XHJcbiAgICAgICAgLypjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5zZXRDdXJyZW50VGFzayh0YXNrKTtcclxuICAgICAgICBsb2NhdGlvbi5oYXNoID0gXCIvV29ya2luZ1Nlc3Npb25UYXNrXCI7Ki9cclxuXHJcbiAgICAgICAgY3R4LnJlcG9zaXRvcmllcy51c2VyaG9tZS5nZXRUYXNrSW5mbyhcclxuICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0QXV0aEFwaVRva2VuKCksXHJcbiAgICAgICAgICAgIHRhc2suaWRcclxuICAgICAgICApLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAvL2Zvcih2YXIgeCBpbiByZXN1bHQpe1xyXG4gICAgICAgICAgICAvLyAgICBhbGVydCh4ICsgXCIgXCIgKyByZXN1bHRbeF0pO1xyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuc2V0Q3VycmVudFRhc2socmVzdWx0KTtcclxuICAgICAgICAgICAgbG9jYXRpb24uaGFzaCA9IFwiL1dvcmtpbmdTZXNzaW9uVGFza1wiO1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3JlXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBzZWxmLmdldFRhc2tTdGF0aXN0aWNzID0gZnVuY3Rpb24odGFzayl7XHJcbiAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuc2V0Q3VycmVudFRhc2sodGFzayk7XHJcbiAgICAgICAgbG9jYXRpb24uaGFzaCA9IFwiL1Rhc2tTdGF0aXN0aWNzXCI7LypcclxuICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnVzZXJob21lLmdldFRhc2tJbmZvKFxyXG4gICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRBdXRoQXBpVG9rZW4oKSxcclxuICAgICAgICAgICAgdGFzay5pZFxyXG4gICAgICAgICkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLnNldEN1cnJlbnRUYXNrKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLmhhc2ggPSBcIi9UYXNrU3RhdGlzdGljc1wiO1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3JlXCIpO1xyXG4gICAgICAgIH0pOyovXHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICBzZWxmLmVkaXRVc2VySW5mbyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL2FsZXJ0KFwiQ2hpYW1vIGVkaXRVc2VySW5mb1wiKTtcclxuICAgICAgICAvL2FsZXJ0KHNlbGYubmV3cGFzc3dvcmQoKSk7XHJcbiAgICAgICAgLy9hbGVydChzZWxmLm5ld2Z1bGxuYW1lKCkpO1xyXG4gICAgICAgIHZhciBmdWxsbmFtZSA9IHNlbGYubmV3ZnVsbG5hbWUoKTtcclxuICAgICAgICB2YXIgdGVtcEVyciA9IFwiXCI7XHJcbiAgICAgICAgaWYoc2VsZi5uZXdmdWxsbmFtZSgpLnRvU3RyaW5nKCkubGVuZ3RoIDwgMyApXHJcbiAgICAgICAgICAgIHRlbXBFcnIgKz0gXCJGdWxsbmFtZSBzaG91bGQgYmUgYXQgbGVhc3QgMyBjaGFycy5cIjtcclxuICAgICAgICBpZihzZWxmLm5ld3Bhc3N3b3JkKCkudG9TdHJpbmcoKS5sZW5ndGggPCA4KVxyXG4gICAgICAgICAgICB0ZW1wRXJyICs9IFwiUGFzc3dvcmQgc2hvdWxkIGJlIGF0IGxlYXN0IDggY2hhcnMuXCJcclxuICAgICAgICBpZihzZWxmLm5ld2Z1bGxuYW1lKCkudG9TdHJpbmcoKS5sZW5ndGggPCAzIHx8IHNlbGYubmV3cGFzc3dvcmQoKS50b1N0cmluZygpLmxlbmd0aCA8IDgpe1xyXG4gICAgICAgICAgICBzZWxmLmFsZXJ0TWVzc2FnZXMucmVtb3ZlQWxsKCk7XHJcbiAgICAgICAgICAgIHNlbGYuYWxlcnRNZXNzYWdlcy5wdXNoKHtzaG91bGRTaG93U3VjY2Vzc01lc3NhZ2U6ZmFsc2UsIHNob3VsZFNob3dFcnJvck1lc3NhZ2U6dHJ1ZSwgZXJyb3JNZXNzYWdlOnRlbXBFcnJ9KTtcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMudXNlcmhvbWUuZWRpdFVzZXJJbmZvKFxyXG4gICAgICAgICAgICAgICAgc2VsZi5uZXdmdWxsbmFtZSgpLFxyXG4gICAgICAgICAgICAgICAgc2VsZi5uZXdwYXNzd29yZCgpLFxyXG4gICAgICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0QXV0aEFwaVRva2VuKClcclxuICAgICAgICAgICAgKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIC8vYWxlcnQoXCJTdWNjZXNzbyBFZGl0IERhdGkgdXRlbnRlXCIpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5hbGVydE1lc3NhZ2VzLnJlbW92ZUFsbCgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5hbGVydE1lc3NhZ2VzLnB1c2goe3Nob3VsZFNob3dTdWNjZXNzTWVzc2FnZTp0cnVlLCBzaG91bGRTaG93RXJyb3JNZXNzYWdlOmZhbHNlLCBlcnJvck1lc3NhZ2U6IG51bGx9KTtcclxuICAgICAgICAgICAgICAgIC8vc2VsZi5zaG91bGRTaG93U3VjY2Vzc01lc3NhZ2UodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAvL2FsZXJ0KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAvL3NlbGYuc3VjY2Vzc01lc3NhZ2UoKTtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQxID0gY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0VXNlckluZm8oKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdDEuZnVsbG5hbWUgPSBmdWxsbmFtZTtcclxuICAgICAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLnNldFVzZXJJbmZvKHJlc3VsdDEpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5mdWxsbmFtZShyZXN1bHQxLmZ1bGxuYW1lKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3N1Y2Nlc3NNZXNzYWdlKCk7IC8vQHRvZG8sIGNhcGl0byBjb3NhIMOoIHJlc3VsdCB2ZWRpIGNvbWUgc2NyaXZpIGlsIG1lc3NhZ2dpb1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJGYWxsaXRvIEVkaXQgXCIpO1xyXG4gICAgICAgICAgICAgICAgLy9zZWxmLnNob3VsZFNob3dFcnJvck1lc3NhZ2UodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGVtcFN0cmluZyA9ICcnO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeCBpbiBlLmVycm9ycy5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBTdHJpbmcgKz0geCArIFwiOiBcIiArIGUuZXJyb3JzLmVycm9yW3hdICsgXCIuIFwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9zZWxmLmVycm9yTWVzc2FnZSh0ZW1wU3RyaW5nKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuYWxlcnRNZXNzYWdlcy5yZW1vdmVBbGwoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuYWxlcnRNZXNzYWdlcygpLnB1c2goe3Nob3VsZFNob3dTdWNjZXNzTWVzc2FnZTpmYWxzZSwgc2hvdWxkU2hvd0Vycm9yTWVzc2FnZTp0cnVlLCBlcnJvck1lc3NhZ2U6dGVtcFN0cmluZ30pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgLy9zZWxmLmdldFVzZXJDYW1wYWlnbnMoKTsgLy9pbXBvcnRhbnQ6IGNhbGxzIGl0XHJcblxyXG4gICAgc2VsZi5hZGRDYW1wYWlnbiA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbG9jYXRpb24uaGFzaCA9IFwiL0FkZENhbXBhaWduXCI7XHJcbiAgICB9O1xyXG4gICAgc2VsZi5lZGl0SW1hZ2VzID0gZnVuY3Rpb24oY2FtcGFpZ24pe1xyXG4gICAgICAgIC8qaWYoY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0Q3VycmVudENhbXBhaWduKCkgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRDdXJyZW50Q2FtcGFpZ24oKS5pZCA9PT0gY2FtcGFpZ24uaWRcclxuICAgICAgICAgICAgJiYgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0T2xkSW1hZ2VzVXJsKCkgPT09IGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEN1cnJlbnRDYW1wYWlnbigpLmltYWdlICkge1xyXG4gICAgICAgICAgICBsb2NhdGlvbi5oYXNoID0gXCIvRWRpdEltYWdlc0NhbXBhaWduXCI7XHJcbiAgICAgICAgfWVsc2V7Ki9cclxuICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy51c2VyaG9tZS5nZXRDYW1wYWlnbkluZm8oXHJcbiAgICAgICAgICAgICAgICBjYW1wYWlnbi5pZCxcclxuICAgICAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEF1dGhBcGlUb2tlbigpXHJcbiAgICAgICAgICAgICkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAvL2FsZXJ0KFwiU3VjY2Vzc28gR2V0Q2FtcGFpZ25JbmZvXCIpO1xyXG4gICAgICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuc2V0Q3VycmVudENhbXBhaWduKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5zZXRPbGRJbWFnZXNVcmwocmVzdWx0LmltYWdlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLmVkaXRpbWFnZXMuZ2V0Q2FtcGFpZ25JbWFnZXMoXHJcbiAgICAgICAgICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0QXV0aEFwaVRva2VuKCksXHJcbiAgICAgICAgICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0Q3VycmVudENhbXBhaWduKCkuaW1hZ2VcclxuICAgICAgICAgICAgICAgICkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLnNldEN1cnJlbnRDYW1wYWlnbkltYWdlcyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vYWxlcnQoXCJTdWNjZXNzIGxvYWRlZFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3IgbG9hZGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5oYXNoID0gXCIvRWRpdEltYWdlc0NhbXBhaWduXCI7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIkZhbGxpdG8gR2V0Q2FtcGFpZ25JbmZvIFwiKTtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAvL31cclxuXHJcbiAgICB9O1xyXG4gICAgc2VsZi5lZGl0Q2FtcGFpZ24gPSBmdW5jdGlvbihjYW1wYWlnbil7XHJcbiAgICAgICAgLy9OTyBDQUNIRSBRVUksIFBFUkNIRScgU0UgRkFJIEVESVQgRSBQT0kgTk9OIEFHR0lPUk5JIFBSRUxPQURJIEkgREFUSSBQUklNQSBERUxMJ0VESVQhXHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMudXNlcmhvbWUuZ2V0Q2FtcGFpZ25JbmZvKFxyXG4gICAgICAgICAgICAgICAgY2FtcGFpZ24uaWQsXHJcbiAgICAgICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRBdXRoQXBpVG9rZW4oKVxyXG4gICAgICAgICAgICApLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAvLyBhbGVydChcIlN1Y2Nlc3NvIEdldENhbXBhaWduSW5mb1wiKTtcclxuICAgICAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLnNldEN1cnJlbnRDYW1wYWlnbihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaGFzaCA9IFwiL0VkaXRDYW1wYWlnblwiO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJGYWxsaXRvIEdldENhbXBhaWduSW5mbyBcIik7XHJcbiAgICAgICAgICAgICAgICBhbGVydChlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuICAgIHNlbGYuZ2V0Q2FtcGFpZ25JbmZvcm1hdGlvbiA9IGZ1bmN0aW9uKGNhbXBhaWduKXtcclxuICAgICAgICAvL05PIENBQ0hFIFFVSSwgUEVSQ0hFJyBTRSBGQUkgRURJVCBFIFBPSSBOT04gQUdHSU9STkkgUFJFTE9BREkgSSBEQVRJIFBSSU1BIERFTEwnRURJVCFcclxuICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnVzZXJob21lLmdldENhbXBhaWduSW5mbyhcclxuICAgICAgICAgICAgY2FtcGFpZ24uaWQsXHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEF1dGhBcGlUb2tlbigpXHJcbiAgICAgICAgKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgLy8gYWxlcnQoXCJTdWNjZXNzbyBHZXRDYW1wYWlnbkluZm9cIik7XHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLnNldEN1cnJlbnRDYW1wYWlnbihyZXN1bHQpO1xyXG4gICAgICAgICAgICBsb2NhdGlvbi5oYXNoID0gXCIvQ2FtcGFpZ25JbmZvXCI7XHJcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJGYWxsaXRvIEdldENhbXBhaWduSW5mbyBcIik7XHJcbiAgICAgICAgICAgIGFsZXJ0KGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcbiAgICBzZWxmLmVkaXRXb3JrZXJzID0gZnVuY3Rpb24oY2FtcGFpZ24pe1xyXG5cclxuICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnVzZXJob21lLmdldENhbXBhaWduSW5mbyhcclxuICAgICAgICAgICAgY2FtcGFpZ24uaWQsXHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLmdldEF1dGhBcGlUb2tlbigpXHJcbiAgICAgICAgKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgLy9hbGVydChcIlN1Y2Nlc3NvIEdldENhbXBhaWduSW5mb1wiKTtcclxuICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuc2V0Q3VycmVudENhbXBhaWduKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLmhhc2ggPSBcIi9FZGl0V29ya2Vyc0NhbXBhaWduXCI7XHJcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJGYWxsaXRvIEdldENhbXBhaWduSW5mbyBcIik7XHJcbiAgICAgICAgICAgIGFsZXJ0KGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHNlbGYuY2FtcGFpZ25TdGF0aXN0aWNzID0gZnVuY3Rpb24oY2FtcGFpZ24pe1xyXG4gICAgICAgIGN0eC5yZXBvc2l0b3JpZXMudXNlcmhvbWUuZ2V0Q2FtcGFpZ25JbmZvKFxyXG4gICAgICAgICAgICBjYW1wYWlnbi5pZCxcclxuICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0QXV0aEFwaVRva2VuKClcclxuICAgICAgICApLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAvL2FsZXJ0KFwiU3VjY2Vzc28gR2V0Q2FtcGFpZ25JbmZvXCIpO1xyXG4gICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5zZXRDdXJyZW50Q2FtcGFpZ24ocmVzdWx0KTtcclxuXHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuZW5kZWRjYW1wYWlnbnN0YXRpc3RpY3MuZ2V0Q2FtcGFpZ25TdGF0aXN0aWNzKFxyXG4gICAgICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0QXV0aEFwaVRva2VuKCksXHJcbiAgICAgICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRDdXJyZW50Q2FtcGFpZ24oKS5zdGF0aXN0aWNzXHJcbiAgICAgICAgICAgICkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAvL2FsZXJ0KFwiU3VjY2Vzc1wiKTtcclxuICAgICAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMuc3RhdHVzLnNldEN1cnJlbnRDYW1wYWlnblN0YXRpc3RpY3MocmVzdWx0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLmVkaXRpbWFnZXMuZ2V0Q2FtcGFpZ25JbWFnZXMoXHJcbiAgICAgICAgICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0QXV0aEFwaVRva2VuKCksXHJcbiAgICAgICAgICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0Q3VycmVudENhbXBhaWduKCkuaW1hZ2VcclxuICAgICAgICAgICAgICAgICkuXHJcbiAgICAgICAgICAgICAgICB0aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5zZXRDdXJyZW50Q2FtcGFpZ25TdGF0aXN0aWNzSW1hZ2VzKHJlc3VsdC5pbWFnZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhhc2ggPSBcIi9DYW1wYWlnblN0YXRpc3RpY3NcIjtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJFcnJvciBsb2FkZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAvL2FsZXJ0KFwiRXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNob3VsZFNob3dNZXNzYWdlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRlbXAgPSAnJztcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHggaW4gZS5lcnJvcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wICs9IHggKyBcIjogXCIgKyBlLmVycm9yc1t4XTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNlbGYuZXJyb3JNZXNzYWdlKFwiIFwiICsgdGVtcCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBhbGVydChcIkZhbGxpdG8gR2V0Q2FtcGFpZ25JbmZvIFwiKTtcclxuICAgICAgICAgICAgYWxlcnQoZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvLyQoXCIjZWRpdEJ1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixcclxuICAgIHNlbGYuc2V0RWRpdFVzZXJGb3JtID0gZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgaWYoc2VsZi52aXNpYmxlKSB7XHJcbiAgICAgICAgICAgIC8vc2VsZi5zaG91bGRTaG93U3VjY2Vzc01lc3NhZ2UoZmFsc2UpO1xyXG4gICAgICAgICAgICAvL3NlbGYuc2hvdWxkU2hvd0Vycm9yTWVzc2FnZShmYWxzZSk7XHJcbiAgICAgICAgICAgIHNlbGYubmV3cGFzc3dvcmQoJycpO1xyXG4gICAgICAgICAgICBzZWxmLm5ld2Z1bGxuYW1lKCcnKTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYudmlzaWJsZSA9ICFzZWxmLnZpc2libGU7XHJcbiAgICAgICAgICAgIHNlbGYuZWRpdFVzZXJTdHJpbmcoXCJFZGl0IFVzZXIgSW5mb1wiKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgc2VsZi52aXNpYmxlID0gIXNlbGYudmlzaWJsZTtcclxuICAgICAgICAgICAgc2VsZi5lZGl0VXNlclN0cmluZyhcIkNsb3NlIEVkaXQgQm94XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0vLyk7XHJcbiAgICBzZWxmLnN0YXJ0Q2FtcGFpZ24gPSBmdW5jdGlvbihjYW1wYWlnbil7XHJcblxyXG4gICAgICAgIGN0eC5yZXBvc2l0b3JpZXMudXNlcmhvbWUuZ2V0Q2FtcGFpZ25JbmZvKFxyXG4gICAgICAgICAgICBjYW1wYWlnbi5pZCxcclxuICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0QXV0aEFwaVRva2VuKClcclxuICAgICAgICApLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgIC8vIGFsZXJ0KFwiU3VjY2Vzc28gR2V0Q2FtcGFpZ25JbmZvRm9yU3RhcnRcIik7XHJcbiAgICAgICAgICAgLy8gYWxlcnQoXCJleGVjdXRpb24gc2hvdWxkIGJlIFwiK3Jlc3VsdC5leGVjdXRpb24pO1xyXG4gICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnVzZXJob21lLnN0YXJ0Q2FtcGFpZ24oXHJcbiAgICAgICAgICAgICAgICByZXN1bHQuZXhlY3V0aW9uLFxyXG4gICAgICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0QXV0aEFwaVRva2VuKCkpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0MSkge1xyXG4gICAgICAgICAgICAgICAgICAgLy8gYWxlcnQoXCJTdWNjZXNzbyBzdGFydENhbXBhaWduXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucmVhZHlDYW1wYWlnbnMucmVtb3ZlKGZ1bmN0aW9uKGNhbXBhaWduVGVtcCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNhbXBhaWduVGVtcCA9PSBjYW1wYWlnbilcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5zdGFydGVkQ2FtcGFpZ25zKCkubGVuZ3RoID09MClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXJ0ZWRDYW1wYWlnbnNBdmFpbGFibGUodHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zdGFydGVkQ2FtcGFpZ25zLnB1c2goY2FtcGFpZ24pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNlbGYucmVhZHlDYW1wYWlnbnMoKS5sZW5ndGggPT0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmVhZHlDYW1wYWlnbnNBdmFpbGFibGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYW1wYWlnblRlbXAgPT0gY2FtcGFpZ247fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZWxmLmdldFVzZXJDYW1wYWlnbnMoKTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlMSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJGYWxsaXRvIHN0YXJ0Q2FtcGFpZ24gXCIpO1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoZTEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBhbGVydChcIkZhbGxpdG8gR2V0Q2FtcGFpZ25JbmZvRm9yU3RhcnQgXCIpO1xyXG4gICAgICAgICAgICBhbGVydChlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2VsZi50ZXJtaW5hdGVDYW1wYWlnbiA9IGZ1bmN0aW9uKGNhbXBhaWduKXtcclxuXHJcbiAgICAgICAgY3R4LnJlcG9zaXRvcmllcy51c2VyaG9tZS5nZXRDYW1wYWlnbkluZm8oXHJcbiAgICAgICAgICAgIGNhbXBhaWduLmlkLFxyXG4gICAgICAgICAgICBjdHgucmVwb3NpdG9yaWVzLnN0YXR1cy5nZXRBdXRoQXBpVG9rZW4oKVxyXG4gICAgICAgICkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgIC8vICAgYWxlcnQoXCJTdWNjZXNzbyBHZXRDYW1wYWlnbkluZm9Gb3JUZXJtaW5hdGlvblwiKTtcclxuICAgICAgICAgLy8gICBhbGVydChcImV4ZWN1dGlvbiBzaG91bGQgYmUgXCIrcmVzdWx0LmV4ZWN1dGlvbik7XHJcbiAgICAgICAgICAgIGN0eC5yZXBvc2l0b3JpZXMudXNlcmhvbWUudGVybWluYXRlQ2FtcGFpZ24oXHJcbiAgICAgICAgICAgICAgICByZXN1bHQuZXhlY3V0aW9uLFxyXG4gICAgICAgICAgICAgICAgY3R4LnJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0QXV0aEFwaVRva2VuKCkpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0MSkge1xyXG4gICAgICAgICAgICAgICAgIC8vICAgYWxlcnQoXCJTdWNjZXNzbyB0ZXJtaW5hdGVDYW1wYWlnblwiKTtcclxuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5oYXNoID0gXCIvVXNlckhvbWVcIjtcclxuICAgICAgICAgICAgICAgICAgICAvL3NlbGYuZ2V0VXNlckNhbXBhaWducygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3RhcnRlZENhbXBhaWducy5yZW1vdmUoZnVuY3Rpb24oY2FtcGFpZ25UZW1wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2FtcGFpZ25UZW1wID09IGNhbXBhaWduKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLmVuZGVkQ2FtcGFpZ25zKCkubGVuZ3RoID09MClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmVuZGVkQ2FtcGFpZ25zQXZhaWxhYmxlKHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZW5kZWRDYW1wYWlnbnMucHVzaChjYW1wYWlnbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5zdGFydGVkQ2FtcGFpZ25zKCkubGVuZ3RoID09MSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXJ0ZWRDYW1wYWlnbnNBdmFpbGFibGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYW1wYWlnblRlbXAgPT0gY2FtcGFpZ247fSk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZTEpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiRmFsbGl0byB0ZXJtaW5hdGVDYW1wYWlnbiBcIik7XHJcbiAgICAgICAgICAgICAgICBhbGVydChlMSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRmFsbGl0byBHZXRDYW1wYWlnbkluZm9Gb3JTdGFydCBcIik7XHJcbiAgICAgICAgICAgIGFsZXJ0KGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydHMucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBrby5jb21wb25lbnRzLnJlZ2lzdGVyKCd1c2VyLWhvbWUnLCB7XHJcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGUuaHRtbCcpLFxyXG4gICAgICAgIHZpZXdNb2RlbDogVmlld01vZGVsXHJcbiAgICB9KTtcclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxuYXYtYmFyIHBhcmFtcyA9IFxcXCJyZXBvc2l0b3JpZXM6IHJlcG9zaXRvcmllc1xcXCI+PC9uYXYtYmFyPlxcclxcbjxkaXYgY2xhc3M9XFxcImNvbnRhaW5lclxcXCIgc3R5bGUgPSBcXFwibWFyZ2luOiBhdXRvXFxcIj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwicm93XFxcIiA+XFxyXFxuICAgICAgICA8IS0tU0hBUkVEIFVTRVIgUFJPRklMRSBNQU5BR0VNRU5UIC0tPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tNFxcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwgcGFuZWwtcHJpbWFyeVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWhlYWRpbmdcXFwiPlVzZXIgUHJvZmlsZTwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1ib2R5XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxwPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIFVzZXIgZGF0YTo8YnIvPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIEZ1bGxuYW1lOiA8c3BhbiBkYXRhLWJpbmQgPSBcXFwidGV4dDpmdWxsbmFtZVxcXCI+PC9zcGFuPjxici8+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgVXNlcm5hbWU6IDxzcGFuICBkYXRhLWJpbmQgPSBcXFwidGV4dDp1c2VybmFtZVxcXCI+PC9zcGFuPjxici8+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgUm9sZTogPHNwYW4gZGF0YS1iaW5kID0gXFxcInRleHQ6cm9sZVxcXCI+PC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiIGRhdGEtdG9nZ2xlPVxcXCJjb2xsYXBzZVxcXCIgZGF0YS10YXJnZXQ9XFxcIiNlZGl0XFxcIiBkYXRhLWJpbmQgPSBcXFwiY2xpY2s6IHNldEVkaXRVc2VyRm9ybVxcXCIgc3R5bGUgPSBcXFwibWFyZ2luLWJvdHRvbTogMC41ZW07XFxcIiA+PHNwYW4gZGF0YS1iaW5kID0gXFxcInRleHQ6IGVkaXRVc2VyU3RyaW5nXFxcIj48L3NwYW4+PC9idXR0b24+XFxyXFxuXFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVxcXCJlZGl0XFxcIiBjbGFzcz1cXFwiY29sbGFwc2VcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxmb3JtIGNsYXNzPVxcXCJmb3JtLWhvcml6b250YWxcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cXFwiY29udHJvbC1sYWJlbCBjb2wtc20tNFxcXCIgZm9yPVxcXCJmdWxsbmFtZVxcXCI+TmV3IEZ1bGwgTmFtZTo8L2xhYmVsPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXNtLThcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIiBpZD1cXFwiZnVsbG5hbWVcXFwiIHBsYWNlaG9sZGVyPVxcXCJOZXcgRnVsbCBOYW1lXFxcIiBkYXRhLWJpbmQgPSBcXFwidmFsdWU6IG5ld2Z1bGxuYW1lXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XFxcImNvbnRyb2wtbGFiZWwgY29sLXNtLTRcXFwiIGZvcj1cXFwibmV3cHdkXFxcIj5OZXcgUGFzc3dvcmQ6PC9sYWJlbD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1zbS04XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwicGFzc3dvcmRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiIGlkPVxcXCJuZXdwd2RcXFwiIHBsYWNlaG9sZGVyPVxcXCJOZXcgUGFzc3dvcmRcXFwiIGRhdGEtYmluZCA9IFxcXCJ2YWx1ZTogbmV3cGFzc3dvcmRcXFwiIG1pbmxlbmd0aCA9IFxcXCI4XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtc20tb2Zmc2V0LTIgY29sLXNtLTEwXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XFxcInN1Ym1pdFxcXCIgY2xhc3M9XFxcImJ0biBidG4tZGVmYXVsdFxcXCIgZGF0YS1iaW5kID0gXFxcImNsaWNrOiBlZGl0VXNlckluZm9cXFwiPkFwcGx5PC9idXR0b24+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuXFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtYmluZD1cXFwiZm9yZWFjaDogYWxlcnRNZXNzYWdlc1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJhbGVydCBhbGVydC1kYW5nZXIgYWxlcnQtZGlzbWlzc2FibGUgZmFkZSBpblxcXCIgZGF0YS1iaW5kID0gXFxcInZpc2libGU6IHNob3VsZFNob3dFcnJvck1lc3NhZ2VcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJjbG9zZVxcXCIgZGF0YS1kaXNtaXNzPVxcXCJhbGVydFxcXCIgYXJpYS1sYWJlbD1cXFwiY2xvc2VcXFwiPiZ0aW1lczs8L2E+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz5XYXJuaW5nITwvc3Ryb25nPjxzcGFuIGRhdGEtYmluZCA9IFxcXCJ0ZXh0OmVycm9yTWVzc2FnZVxcXCI+PC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJhbGVydCBhbGVydC1zdWNjZXNzIGFsZXJ0LWRpc21pc3NhYmxlIGZhZGUgaW5cXFwiIGRhdGEtYmluZCA9IFxcXCJ2aXNpYmxlOiBzaG91bGRTaG93U3VjY2Vzc01lc3NhZ2VcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJjbG9zZVxcXCIgZGF0YS1kaXNtaXNzPVxcXCJhbGVydFxcXCIgYXJpYS1sYWJlbD1cXFwiY2xvc2VcXFwiPiZ0aW1lczs8L2E+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz5TdWNjZXNzITwvc3Ryb25nPjwhLS08c3BhbiBkYXRhLWJpbmQgPSBcXFwidGV4dDpzdWNjZXNzTWVzc2FnZVxcXCI+PC9zcGFuPi0tPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTFcXFwiPjwvZGl2PlxcclxcbiAgICAgICAgPCEtLU1BU1RFUi0tPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcyA9IFxcXCJjb2wtc20tNlxcXCIgZGF0YS1iaW5kID0gXFxcImlmOmlzVXNlck1hc3RlclxcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwgcGFuZWwtZGVmYXVsdFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWhlYWRpbmdcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgUmVhZHkgQ2FtcGFpZ25zXFxyXFxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XFxcIiBkYXRhLWJpbmQgPSBcXFwiY2xpY2s6IGFkZENhbXBhaWduXFxcIiBzdHlsZSA9IFxcXCJtYXJnaW4tYm90dG9tOjAuNWVtO1xcXCI+PHNwYW4gY2xhc3MgPSBcXFwiZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzXFxcIj48L3NwYW4+QWRkIENhbXBhaWduPC9idXR0b24+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1ib2R5XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxwIGRhdGEtYmluZCA9IFxcXCJpZm5vdDpyZWFkeUNhbXBhaWduc0F2YWlsYWJsZVxcXCI+IE5vIFJlYWR5IENhbXBhaWducyBhdmFpbGFibGUsIGFkZCBvbmUuPC9wPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNhbHNzID0gXFxcInRhYmxlLWhvdmVyXFxcIiBkYXRhLWJpbmQgPSBcXFwiaWY6cmVhZHlDYW1wYWlnbnNBdmFpbGFibGVcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8dHI+PHRoPkNhbXBhaWduIE5hbWU8L3RoPjx0aD5BY3Rpb25zPC90aD48L3RyPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5IGRhdGEtYmluZD1cXFwiZm9yZWFjaDogcmVhZHlDYW1wYWlnbnNcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPjxzcGFuIGRhdGEtYmluZCA9IFxcXCJ0ZXh0OiBuYW1lXFxcIj48L3NwYW4+PC90ZD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPjxidXR0b24gY2xhc3M9XFxcImJ0biBidG4tZGVmYXVsdFxcXCIgZGF0YS1iaW5kID0gXFxcImNsaWNrOiAkcGFyZW50LmVkaXRDYW1wYWlnblxcXCI+RWRpdCBJbmZvczwvYnV0dG9uPjwvdGQ+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD48YnV0dG9uIGNsYXNzPVxcXCJidG4gYnRuLWRlZmF1bHRcXFwiIGRhdGEtYmluZCA9IFxcXCJjbGljazogJHBhcmVudC5lZGl0SW1hZ2VzXFxcIj5FZGl0IEltYWdlczwvYnV0dG9uPjwvdGQ+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD48YnV0dG9uIGNsYXNzPVxcXCJidG4gYnRuLWRlZmF1bHRcXFwiIGRhdGEtYmluZCA9IFxcXCJjbGljazogJHBhcmVudC5lZGl0V29ya2Vyc1xcXCI+RWRpdCBXb3JrZXJzPC9idXR0b24+PC90ZD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPjxidXR0b24gY2xhc3M9XFxcImJ0biBidG4tZGVmYXVsdFxcXCIgZGF0YS1iaW5kID1cXFwiY2xpY2s6ICRwYXJlbnQuc3RhcnRDYW1wYWlnblxcXCI+U3RhcnQhPC9idXR0b24+PC90ZD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1ncm91cFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsIHBhbmVsLWRlZmF1bHRcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtaGVhZGluZ1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgU3RhcnRlZCBDYW1wYWlnbnNcXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtYm9keVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgZGF0YS1iaW5kID0gXFxcImlmbm90OnN0YXJ0ZWRDYW1wYWlnbnNBdmFpbGFibGVcXFwiPiBObyBTdGFydGVkIENhbXBhaWducyBhdmFpbGFibGUsIGFkZCBvbmUuPC9wPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzcyA9IFxcXCJ0YWJsZS1ob3ZlclxcXCIgZGF0YS1iaW5kID0gXFxcImlmOnN0YXJ0ZWRDYW1wYWlnbnNBdmFpbGFibGVcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj48dGg+Q2FtcGFpZ24gTmFtZTwvdGg+PHRoPkFjdGlvbnM8L3RoPjwvdHI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keSBkYXRhLWJpbmQ9XFxcImZvcmVhY2g6IHN0YXJ0ZWRDYW1wYWlnbnNcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+PHNwYW4gZGF0YS1iaW5kID0gXFxcInRleHQ6IG5hbWVcXFwiPjwvc3Bhbj48L3RkPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPiA8YnV0dG9uIGNsYXNzPVxcXCJidG4gYnRuLWRlZmF1bHRcXFwiIGRhdGEtYmluZCA9IFxcXCJjbGljazogJHBhcmVudC5nZXRDYW1wYWlnbkluZm9ybWF0aW9uXFxcIj5JbmZvczwvYnV0dG9uPjwvdGQ+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+PGJ1dHRvbiAgY2xhc3M9XFxcImJ0biBidG4tZGVmYXVsdFxcXCIgZGF0YS1iaW5kID0gXFxcImNsaWNrOiRwYXJlbnQudGVybWluYXRlQ2FtcGFpZ25cXFwiPlRlcm1pbmF0ZTwvYnV0dG9uPjwvdGQ+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwgcGFuZWwtZGVmYXVsdFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1oZWFkaW5nXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICBFbmRlZCBDYW1wYWlnbnNcXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtYm9keVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgZGF0YS1iaW5kID0gXFxcImlmbm90OmVuZGVkQ2FtcGFpZ25zQXZhaWxhYmxlXFxcIj4gTm8gRW5kZWQgQ2FtcGFpZ25zIGF2YWlsYWJsZSwgYWRkIG9uZS48L3A+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzID0gXFxcInRhYmxlLWhvdmVyXFxcIiBkYXRhLWJpbmQgPSBcXFwiaWY6ZW5kZWRDYW1wYWlnbnNBdmFpbGFibGVcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj48dGg+Q2FtcGFpZ24gTmFtZTwvdGg+PHRoPkFjdGlvbnM8L3RoPjwvdHI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keSBkYXRhLWJpbmQ9XFxcImZvcmVhY2g6IGVuZGVkQ2FtcGFpZ25zXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPjxzcGFuIGRhdGEtYmluZCA9IFxcXCJ0ZXh0OiBuYW1lXFxcIj48L3NwYW4+PC90ZD5cXHJcXG5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD48YnV0dG9uIGNsYXNzPVxcXCJidG4gYnRuLWRlZmF1bHRcXFwiIGRhdGEtYmluZCA9IFxcXCJjbGljazogJHBhcmVudC5jYW1wYWlnblN0YXRpc3RpY3NcXFwiPlN0YXRpc3RpY3M8L2J1dHRvbj48L3RkPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTFcXFwiPjwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwhLS1XT1JLRVItLT5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3MgPSBcXFwiY29sLXNtLTZcXFwiIGRhdGEtYmluZCA9IFxcXCJpZm5vdDppc1VzZXJNYXN0ZXJcXFwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWdyb3VwXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwgcGFuZWwtZGVmYXVsdFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1oZWFkaW5nXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICBVc2VyIFRhc2tzXFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWJvZHlcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGRhdGEtYmluZCA9IFxcXCJpZm5vdDp0YXNrc0F2YWlsYWJsZVxcXCI+IE5vIFRhc2tzIGF2YWlsYWJsZSBmb3IgdGhlIHVzZXIuPC9wPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzcyA9IFxcXCJ0YWJsZS1ob3ZlclxcXCIgZGF0YS1iaW5kID0gXFxcImlmOnRhc2tzQXZhaWxhYmxlXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+PHRoPkNhbXBhaWduPC90aD48dGg+VGFzayBUeXBlPC90aD48dGg+QWN0aW9uczwvdGg+PC90cj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5IGRhdGEtYmluZD1cXFwiZm9yZWFjaDogdGFza3NcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+PHNwYW4gZGF0YS1iaW5kID0gXFxcInRleHQ6IGNhbXBhaWduTmFtZVxcXCI+PC9zcGFuPjwvdGQ+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+PHNwYW4gZGF0YS1iaW5kID0gXFxcInRleHQ6IHR5cGVcXFwiPjwvc3Bhbj48L3RkPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPjxidXR0b24gY2xhc3M9XFxcImJ0biBidG4tZGVmYXVsdFxcXCIgZGF0YS1iaW5kID0gXFxcImNsaWNrOiRwYXJlbnQud29ya1Rhc2tcXFwiPlN0YXJ0IFdvcmtpbmc8L2J1dHRvbj48L3RkPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPjxidXR0b24gIGNsYXNzPVxcXCJidG4gYnRuLWRlZmF1bHRcXFwiIGRhdGEtYmluZCA9IFxcXCJjbGljazokcGFyZW50LmdldFRhc2tTdGF0aXN0aWNzXFxcIj5TdGF0aXN0aWNzPC9idXR0b24+PC90ZD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcbjwvZGl2PlwiO1xuIiwiLypqc2xpbnQgbm9kZTp0cnVlICovXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIGtvID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2tvJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydrbyddIDogbnVsbCksXHJcbiAgICAkID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJyQnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJyQnXSA6IG51bGwpLFxyXG4gICAgY29tcG9uZW50cyA9IHJlcXVpcmUoJy4vY29tcG9uZW50cycpLFxyXG4gICAgY3JlYXRlUmVwb3NpdG9yaWVzID0gcmVxdWlyZSgnLi9yZXBvc2l0b3JpZXMnKS5jcmVhdGVSZXBvc2l0b3JpZXM7XHJcblxyXG5jb21wb25lbnRzLnJlZ2lzdGVyKCk7XHJcbnZhciByZXBvc2l0b3JpZXMgPSBjcmVhdGVSZXBvc2l0b3JpZXMoJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MCcpO1xyXG5cclxuZnVuY3Rpb24gQXBwKCkge1xyXG4gICAgdGhpcy5yb3V0ZXMgPSB7XHJcbiAgICAgICAgJy8nOiAnaG9tZS1wYWdlJyxcclxuICAgICAgICAnL1NpZ25VcCc6J3NpZ24tdXAnLFxyXG4gICAgICAgICcvTG9nSW4nOidsb2ctaW4nLFxyXG4gICAgICAgICcvU2lnblVwT3V0Y29tZVAnOiAnc2lnbi11cC1vdXRjb21lLXAnLFxyXG4gICAgICAgICcvVXNlckhvbWUnOid1c2VyLWhvbWUnLFxyXG4gICAgICAgICcvTG9nb3V0JzonbG9nLW91dCcsXHJcbiAgICAgICAgJy9BZGRDYW1wYWlnbic6J2NyZWF0ZS1jYW1wYWlnbicsXHJcbiAgICAgICAgJy9FZGl0SW1hZ2VzQ2FtcGFpZ24nOidlZGl0LWltYWdlcy1jYW1wYWlnbicsXHJcbiAgICAgICAgJy9FZGl0V29ya2Vyc0NhbXBhaWduJzonZWRpdC13b3JrZXJzLWNhbXBhaWduJyxcclxuICAgICAgICAnL09wZXJhdGlvblN1Y2Nlc3MnOidvcGVyYXRpb24tc3VjY2VzcycsXHJcbiAgICAgICAgJy9DYW1wYWlnblN0YXRpc3RpY3MnOidlbmRlZC1jYW1wYWlnbi1zdGF0aXN0aWNzJyxcclxuICAgICAgICAnL1Rhc2tTdGF0aXN0aWNzJzondGFzay1zdGF0aXN0aWNzJyxcclxuICAgICAgICAnL1dvcmtpbmdTZXNzaW9uVGFzayc6J3Rhc2std29ya2luZy1zZXNzaW9uJyxcclxuICAgICAgICAnL0ltYWdlU3RhdGlzdGljcyc6J2ltYWdlLXN0YXRpc3RpY3MnLFxyXG4gICAgICAgICcvRWRpdENhbXBhaWduJzonZWRpdC1jYW1wYWlnbi1pbmZvJyxcclxuICAgICAgICAnL0NhbXBhaWduSW5mbyc6J2NhbXBhaWduLWluZm8nXHJcbiAgICB9O1xyXG4gICAgdGhpcy5yZXBvc2l0b3JpZXMgPSByZXBvc2l0b3JpZXM7XHJcbiAgICAkKFwiI3N1XCIpLm9uKFwiY2xpY2tcIixmdW5jdGlvbigpeyQoXCIjaG9tZVwiKS5jc3MoXCJkaXNwbGF5XCIsXCJub25lXCIpO30pO1xyXG4gICAgJChcIiNsaVwiKS5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXskKFwiI2hvbWVcIikuY3NzKFwiZGlzcGxheVwiLFwibm9uZVwiKTt9KTtcclxuICAgICQoXCIjc3VOXCIpLm9uKFwiY2xpY2tcIixmdW5jdGlvbigpeyQoXCIjaG9tZVwiKS5jc3MoXCJkaXNwbGF5XCIsXCJub25lXCIpO30pO1xyXG4gICAgJChcIiNsaU5cIikub24oXCJjbGlja1wiLGZ1bmN0aW9uKCl7JChcIiNob21lXCIpLmNzcyhcImRpc3BsYXlcIixcIm5vbmVcIik7fSk7XHJcbiAgIC8qIHRoaXMuZmlyc3RQYWdlID0gdHJ1ZTtcclxuICAgIHRoaXMubm90Rmlyc3RQYWdlID0gZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgdGhpcy5maXJzdFBhZ2UgPSBmYWxzZTtcclxuICAgICAgICBpZihkYXRhID09IFwiU1VcIil7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLmhhc2ggPSBcIi9TaWduVXBcIjtcclxuICAgICAgICB9ZWxzZSBpZihkYXRhID09IFwiTElcIil7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLmhhc2ggPSBcIi9Mb2dJblwiO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKnRoaXMuc3RhdHVzTG9nZ2VkID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XHJcblxyXG4gICAgdGhpcy51cGRhdGVTdGF0dXNMb2dnZWQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIGFsZXJ0KFwiU1RPIFBFUiBBR0dJT1JOQVJFIExPIFNUQVRPXCIpO1xyXG4gICAgICAgIHRoaXMuc3RhdHVzTG9nZ2VkKHJlcG9zaXRvcmllcy5zdGF0dXMuZ2V0QXBpVG9rZW4oKSk7XHJcbiAgICB9OyovXHJcbn1cclxuXHJcbmtvLmFwcGx5QmluZGluZ3MobmV3IEFwcCgpKTtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgVXRlbnRlIG9uIDAzLzA2LzIwMTcuXHJcbiAqL1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciAkID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJyQnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJyQnXSA6IG51bGwpLFxyXG4gICAgUHJvbWlzZSA9IHJlcXVpcmUoJ2JsdWViaXJkJyk7XHJcblxyXG5mdW5jdGlvbiBSZXBvc2l0b3J5KHNlcnZlcikge1xyXG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJlcG9zaXRvcnkpKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXBvc2l0b3J5KHNlcnZlcik7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9zZXJ2ZXIgPSBzZXJ2ZXIgfHwgJyc7XHJcbn1cclxuXHJcblJlcG9zaXRvcnkucHJvdG90eXBlLmNyZWF0ZUNhbXBhaWduID0gZnVuY3Rpb24gKGFwaVRva2VuLGNhbXBhaWduTmFtZSxzZWxlY3Rpb25SZXBsaWNhLHRocmVzaG9sZCxhbm5vdGF0aW9uUmVwbGljYSxhbm5vdGF0aW9uU2l6ZSkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IHNlbGYuX3NlcnZlciArICcvYXBpL2NhbXBhaWduJyxcclxuICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOntcclxuICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYXBpVG9rZW4sXHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzonYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTpjYW1wYWlnbk5hbWUsXHJcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25fcmVwbGljYTogcGFyc2VJbnQoc2VsZWN0aW9uUmVwbGljYSksXHJcbiAgICAgICAgICAgICAgICB0aHJlc2hvbGQ6IHBhcnNlSW50KHRocmVzaG9sZCksXHJcbiAgICAgICAgICAgICAgICBhbm5vdGF0aW9uX3JlcGxpY2E6cGFyc2VJbnQoYW5ub3RhdGlvblJlcGxpY2EpLFxyXG4gICAgICAgICAgICAgICAgYW5ub3RhdGlvbl9zaXplOiBwYXJzZUludChhbm5vdGF0aW9uU2l6ZSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24gKGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge1xyXG4gICAgICAgICAgICAvL2FsZXJ0KFwiSG8gZmFsbGl0b1wiKTtcclxuICAgICAgICAgICAgLypmb3IodmFyIHggaW4ganFYSFIpe1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoeCArIFwiIFwiICsganFYSFJbeF0pO1xyXG4gICAgICAgICAgICB9Ki9cclxuICAgICAgICAgICAgYWxlcnQoanFYSFIucmVzcG9uc2VKU09OLmVycm9yKTtcclxuICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKGVycm9yVGhyb3duKTtcclxuICAgICAgICAgICAgZXJyb3IudGV4dFN0YXR1cyA9IHRleHRTdGF0dXM7XHJcbiAgICAgICAgICAgIGVycm9yLmpxWEhSID0ganFYSFI7XHJcbiAgICAgICAgICAgIGFsZXJ0KGpxWEhSLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wID0gSlNPTi5wYXJzZShqcVhIUi5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICBmb3IodmFyIHggaW4gdGVtcCl7XHJcbiAgICAgICAgICAgICAgICBhbGVydCh4ICtcIiBcIisgdGVtcFt4XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZXJyb3IuZXJyb3JzID0gSlNPTi5wYXJzZShqcVhIUi5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5leHBvcnRzLlJlcG9zaXRvcnkgPSBSZXBvc2l0b3J5O1xyXG5leHBvcnRzLmNyZWF0ZVJlcG9zaXRvcnkgPSBSZXBvc2l0b3J5O1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBVdGVudGUgb24gMjUvMDYvMjAxNy5cclxuICovXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCksXHJcbiAgICBQcm9taXNlID0gcmVxdWlyZSgnYmx1ZWJpcmQnKTtcclxuXHJcbmZ1bmN0aW9uIFJlcG9zaXRvcnkoc2VydmVyKSB7XHJcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmVwb3NpdG9yeSkpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJlcG9zaXRvcnkoc2VydmVyKTtcclxuICAgIH1cclxuICAgIHRoaXMuX3NlcnZlciA9IHNlcnZlciB8fCAnJztcclxufVxyXG5cclxuUmVwb3NpdG9yeS5wcm90b3R5cGUuZWRpdENhbXBhaWduID0gZnVuY3Rpb24gKGFwaVRva2VuLGlkLGNhbXBhaWduTmFtZSxzZWxlY3Rpb25SZXBsaWNhLHRocmVzaG9sZCxhbm5vdGF0aW9uUmVwbGljYSxhbm5vdGF0aW9uU2l6ZSkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IHNlbGYuX3NlcnZlciArIGlkLFxyXG4gICAgICAgICAgICB0eXBlOiAnUFVUJyxcclxuICAgICAgICAgICAgaGVhZGVyczp7XHJcbiAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGFwaVRva2VuLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6J2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgIG5hbWU6Y2FtcGFpZ25OYW1lLFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uX3JlcGxpY2E6IHBhcnNlSW50KHNlbGVjdGlvblJlcGxpY2EpLFxyXG4gICAgICAgICAgICAgICAgdGhyZXNob2xkOiBwYXJzZUludCh0aHJlc2hvbGQpLFxyXG4gICAgICAgICAgICAgICAgYW5ub3RhdGlvbl9yZXBsaWNhOnBhcnNlSW50KGFubm90YXRpb25SZXBsaWNhKSxcclxuICAgICAgICAgICAgICAgIGFubm90YXRpb25fc2l6ZTogcGFyc2VJbnQoYW5ub3RhdGlvblNpemUpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcclxuICAgICAgICAgICAgLy9hbGVydChcIkhvIGZhbGxpdG9cIik7XHJcbiAgICAgICAgICAgIC8qZm9yKHZhciB4IGluIGpxWEhSKXtcclxuICAgICAgICAgICAgIGFsZXJ0KHggKyBcIiBcIiArIGpxWEhSW3hdKTtcclxuICAgICAgICAgICAgIH0qL1xyXG4gICAgICAgICAgICAvL2FsZXJ0KGpxWEhSLnJlc3BvbnNlSlNPTi5lcnJvcik7XHJcbiAgICAgICAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihlcnJvclRocm93bik7XHJcbiAgICAgICAgICAgIGVycm9yLnRleHRTdGF0dXMgPSB0ZXh0U3RhdHVzO1xyXG4gICAgICAgICAgICBlcnJvci5qcVhIUiA9IGpxWEhSO1xyXG4gICAgICAgICAgICAvL2FsZXJ0KGpxWEhSLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wID0gSlNPTi5wYXJzZShqcVhIUi5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAvKmZvcih2YXIgeCBpbiB0ZW1wKXtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KHggK1wiIFwiKyB0ZW1wW3hdKTtcclxuICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgIGVycm9yLmVycm9ycyA9IEpTT04ucGFyc2UoanFYSFIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0cy5SZXBvc2l0b3J5ID0gUmVwb3NpdG9yeTtcclxuZXhwb3J0cy5jcmVhdGVSZXBvc2l0b3J5ID0gUmVwb3NpdG9yeTtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgVXRlbnRlIG9uIDA0LzA2LzIwMTcuXHJcbiAqL1xyXG5cclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKSxcclxuICAgIFByb21pc2UgPSByZXF1aXJlKCdibHVlYmlyZCcpO1xyXG5cclxuZnVuY3Rpb24gUmVwb3NpdG9yeShzZXJ2ZXIpIHtcclxuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBSZXBvc2l0b3J5KSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVwb3NpdG9yeShzZXJ2ZXIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fc2VydmVyID0gc2VydmVyIHx8ICcnO1xyXG59XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS51cGxvYWRDYW1wYWlnblBob3RvcyA9IGZ1bmN0aW9uIChhcGlUb2tlbixmaWxlcywgaW1hZ2VVcmwpIHsgLy9mb3JzZSBkb3ZyZXN0aSBjcmFyZSB1cGxvYWQgZmlsZSBjb24gdW4gcGFyYW1ldHJvIFVSTCBjaGUgdXNpIHBlciByaWNpY2xhcmUgbG8gc3Rlc3NvIG1ldG9kbyBwZXIgZGl2ZXJzZSB1Zm56aW9uYWxpdMOgXHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAvL3JldHVybiBjdHgucmVwb3NpdG9yaWVzLnVwbG9hZGZpbGUoYXBpVG9rZW4sIGZpbGVzLCBpbWFnZVVybCApOyBAVE9ETyB2ZWRpIHNlIMOoIHBpw7kgZWxlZ2FudGUgZmFyZSB1cGxvYWRmaWxlIG8gY29tZSBoYWkgZGVjaXNvIGRpIGZhcmUgb3JhIChpbiB0YWwgY2FzbyBwYXNzYSBjdHggaW4gdXBsb2FkQ2FtcGFpZ25QaG90b3Mgc2UgbG8gdXNpKVxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgdXJsOiBzZWxmLl9zZXJ2ZXIgKyBpbWFnZVVybCxcclxuICAgICAgICAgICAgaGVhZGVyczp7XHJcbiAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGFwaVRva2VuLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkYXRhOiBmaWxlcyxcclxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBwcm9jZXNzRGF0YTogZmFsc2UsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZmlsZXMpe1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJDYXJpY2FtZW50byBhdnZlbnV0byBjb24gc3VjY2Vzc28hXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGZvcih2YXIgeCBpbiByZXN1bHQpe1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoeCArIFwiIFwiICsgcmVzdWx0W3hdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGpxWEhSLnJlc3BvbnNlSlNPTi5lcnJvcik7XHJcbiAgICAgICAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihlcnJvclRocm93bik7XHJcbiAgICAgICAgICAgIGVycm9yLnRleHRTdGF0dXMgPSB0ZXh0U3RhdHVzO1xyXG4gICAgICAgICAgICBlcnJvci5qcVhIUiA9IGpxWEhSO1xyXG4gICAgICAgICAgICBlcnJvci5lcnJvcnMgPSBqcVhIUi5yZXNwb25zZUpTT04uZXJyb3I7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcblJlcG9zaXRvcnkucHJvdG90eXBlLmdldENhbXBhaWduSW1hZ2VzID0gZnVuY3Rpb24gKGFwaVRva2VuLCBpbWFnZVVybCl7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogc2VsZi5fc2VydmVyICsgaW1hZ2VVcmwsXHJcbiAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTpcImpzb25cIixcclxuICAgICAgICAgICAgaGVhZGVyczp7XHJcbiAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGFwaVRva2VuLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAvKmZvcih2YXIgeCBpbiBPYmplY3Qua2V5cyhyZXN1bHQpKXtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KE9iamVjdC5rZXlzKHJlc3VsdClbeF0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IodmFyIHggaW4gcmVzdWx0KXtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KHJlc3VsdFt4XSk7XHJcbiAgICAgICAgICAgIH0qL1xyXG4gICAgICAgICAgICBmb3IodmFyIHggaW4gcmVzdWx0LmltYWdlcyl7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQuaW1hZ2VzW3hdLmNhbm9uaWNhbCA9IFwiaHR0cDovL2F3dC5pZm1sZWRpdC5vcmdcIityZXN1bHQuaW1hZ2VzW3hdLmNhbm9uaWNhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XHJcbiAgICAgICAgICAgIC8vYWxlcnQoXCJIbyBmYWxsaXRvXCIpO1xyXG4gICAgICAgICAgICAvKmZvcih2YXIgeCBpbiBqcVhIUil7XHJcbiAgICAgICAgICAgICBhbGVydCh4ICsgXCIgXCIgKyBqcVhIUlt4XSk7XHJcbiAgICAgICAgICAgICB9Ki9cclxuICAgICAgICAgICAgYWxlcnQoanFYSFIucmVzcG9uc2VKU09OLmVycm9yKTtcclxuICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKGVycm9yVGhyb3duKTtcclxuICAgICAgICAgICAgZXJyb3IudGV4dFN0YXR1cyA9IHRleHRTdGF0dXM7XHJcbiAgICAgICAgICAgIGVycm9yLmpxWEhSID0ganFYSFI7XHJcbiAgICAgICAgICAgIGFsZXJ0KGpxWEhSLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wID0gSlNPTi5wYXJzZShqcVhIUi5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICBmb3IodmFyIHggaW4gdGVtcCl7XHJcbiAgICAgICAgICAgICAgICBhbGVydCh4ICtcIiBcIisgdGVtcFt4XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZXJyb3IuZXJyb3JzID0ganFYSFIucmVzcG9uc2VKU09OO1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG59O1xyXG5cclxuUmVwb3NpdG9yeS5wcm90b3R5cGUuZ2V0SW1hZ2VJbmZvID0gZnVuY3Rpb24oYXBpVG9rZW4saW1hZ2VVcmwpe1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IHNlbGYuX3NlcnZlciArIGltYWdlVXJsLFxyXG4gICAgICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICAgICAgZGF0YVR5cGU6XCJqc29uXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6e1xyXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBhcGlUb2tlbixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24gKGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge1xyXG4gICAgICAgICAgICAvL2FsZXJ0KFwiSG8gZmFsbGl0b1wiKTtcclxuICAgICAgICAgICAgLypmb3IodmFyIHggaW4ganFYSFIpe1xyXG4gICAgICAgICAgICAgYWxlcnQoeCArIFwiIFwiICsganFYSFJbeF0pO1xyXG4gICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgIGFsZXJ0KGpxWEhSLnJlc3BvbnNlSlNPTi5lcnJvcik7XHJcbiAgICAgICAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihlcnJvclRocm93bik7XHJcbiAgICAgICAgICAgIGVycm9yLnRleHRTdGF0dXMgPSB0ZXh0U3RhdHVzO1xyXG4gICAgICAgICAgICBlcnJvci5qcVhIUiA9IGpxWEhSO1xyXG4gICAgICAgICAgICBhbGVydChqcVhIUi5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICB2YXIgdGVtcCA9IEpTT04ucGFyc2UoanFYSFIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgZm9yKHZhciB4IGluIHRlbXApe1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoeCArXCIgXCIrIHRlbXBbeF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVycm9yLmVycm9ycyA9IGpxWEhSLnJlc3BvbnNlSlNPTjtcclxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxufTtcclxuXHJcblJlcG9zaXRvcnkucHJvdG90eXBlLmdldEltYWdlU3RhdGlzdGljcyA9IGZ1bmN0aW9uKGFwaVRva2VuLGltYWdlVXJsKXtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBzZWxmLl9zZXJ2ZXIgKyBpbWFnZVVybCxcclxuICAgICAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOlwianNvblwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOntcclxuICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYXBpVG9rZW4sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcclxuICAgICAgICAgICAgLy9hbGVydChcIkhvIGZhbGxpdG9cIik7XHJcbiAgICAgICAgICAgIC8qZm9yKHZhciB4IGluIGpxWEhSKXtcclxuICAgICAgICAgICAgIGFsZXJ0KHggKyBcIiBcIiArIGpxWEhSW3hdKTtcclxuICAgICAgICAgICAgIH0qL1xyXG4gICAgICAgICAgICBhbGVydChqcVhIUi5yZXNwb25zZUpTT04uZXJyb3IpO1xyXG4gICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoZXJyb3JUaHJvd24pO1xyXG4gICAgICAgICAgICBlcnJvci50ZXh0U3RhdHVzID0gdGV4dFN0YXR1cztcclxuICAgICAgICAgICAgZXJyb3IuanFYSFIgPSBqcVhIUjtcclxuICAgICAgICAgICAgYWxlcnQoanFYSFIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgdmFyIHRlbXAgPSBKU09OLnBhcnNlKGpxWEhSLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIGZvcih2YXIgeCBpbiB0ZW1wKXtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KHggK1wiIFwiKyB0ZW1wW3hdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlcnJvci5lcnJvcnMgPSBqcVhIUi5yZXNwb25zZUpTT047XHJcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbn07XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5yZW1vdmVJbWFnZSA9IGZ1bmN0aW9uKGFwaVRva2VuLGltYWdlVXJsKXtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBzZWxmLl9zZXJ2ZXIgKyBpbWFnZVVybCxcclxuICAgICAgICAgICAgdHlwZTogJ0RFTEVURScsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6e1xyXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBhcGlUb2tlbixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24gKGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge1xyXG5cclxuICAgICAgICAgICAgYWxlcnQoanFYSFIucmVzcG9uc2VKU09OLmVycm9yKTtcclxuICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKGVycm9yVGhyb3duKTtcclxuICAgICAgICAgICAgZXJyb3IudGV4dFN0YXR1cyA9IHRleHRTdGF0dXM7XHJcbiAgICAgICAgICAgIGVycm9yLmpxWEhSID0ganFYSFI7XHJcbiAgICAgICAgICAgIGFsZXJ0KGpxWEhSLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wID0gSlNPTi5wYXJzZShqcVhIUi5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICBmb3IodmFyIHggaW4gdGVtcCl7XHJcbiAgICAgICAgICAgICAgICBhbGVydCh4ICtcIiBcIisgdGVtcFt4XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZXJyb3IuZXJyb3JzID0ganFYSFIucmVzcG9uc2VKU09OO1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG59O1xyXG5leHBvcnRzLlJlcG9zaXRvcnkgPSBSZXBvc2l0b3J5O1xyXG5leHBvcnRzLmNyZWF0ZVJlcG9zaXRvcnkgPSBSZXBvc2l0b3J5O1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBVdGVudGUgb24gMTEvMDYvMjAxNy5cclxuICovXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCksXHJcbiAgICBQcm9taXNlID0gcmVxdWlyZSgnYmx1ZWJpcmQnKTtcclxuXHJcbmZ1bmN0aW9uIFJlcG9zaXRvcnkoc2VydmVyKSB7XHJcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmVwb3NpdG9yeSkpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJlcG9zaXRvcnkoc2VydmVyKTtcclxuICAgIH1cclxuICAgIHRoaXMuX3NlcnZlciA9IHNlcnZlciB8fCAnJztcclxufVxyXG5cclxuUmVwb3NpdG9yeS5wcm90b3R5cGUuZ2V0V29ya2VycyA9IGZ1bmN0aW9uIChhcGlUb2tlbiwgd29ya2VyVXJsKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAvL2FsZXJ0KFwiUHJvbWlzZVwiKTtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgLy9hbGVydChzZWxmLl9zZXJ2ZXIgKyB3b3JrZXJVcmwpO1xyXG4gICAgICAgIC8vYWxlcnQoYXBpVG9rZW4pO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogc2VsZi5fc2VydmVyICsgd29ya2VyVXJsLFxyXG4gICAgICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGFwaVRva2VuLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIC8qZm9yKHZhciB4IGluIE9iamVjdC5rZXlzKHJlc3VsdCkpe1xyXG4gICAgICAgICAgICAgYWxlcnQoT2JqZWN0LmtleXMocmVzdWx0KVt4XSk7XHJcbiAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgZm9yKHZhciB4IGluIHJlc3VsdCl7XHJcbiAgICAgICAgICAgICBhbGVydChyZXN1bHRbeF0pO1xyXG4gICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgIC8vYWxlcnQoXCJzdWNjZXNzb0FqYXhXb3JrZXJzXCIpO1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiSG8gZmFsbGl0b1wiKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgeCBpbiBqcVhIUikge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoeCArIFwiIFwiICsganFYSFJbeF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihlcnJvclRocm93bik7XHJcbiAgICAgICAgICAgIGVycm9yLnRleHRTdGF0dXMgPSB0ZXh0U3RhdHVzO1xyXG4gICAgICAgICAgICBlcnJvci5qcVhIUiA9IGpxWEhSO1xyXG4gICAgICAgICAgICBlcnJvci5lcnJvcnMgPSBqcVhIUi5yZXNwb25zZUpTT047XHJcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcblJlcG9zaXRvcnkucHJvdG90eXBlLmdldFdvcmtlckluZm8gPSBmdW5jdGlvbiAoYXBpVG9rZW4sIHdvcmtlclVybCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgIC8vIGFsZXJ0KFwiUHJvbWlzZVwiKTtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICAvL2FsZXJ0KHNlbGYuX3NlcnZlciArIHdvcmtlclVybCk7XHJcbiAgICAgICAgICAgIC8vYWxlcnQoYXBpVG9rZW4pO1xyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBzZWxmLl9zZXJ2ZXIgKyB3b3JrZXJVcmwsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGFwaVRva2VuLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5kb25lKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgLyogZm9yKHZhciB4IGluIE9iamVjdC5rZXlzKHJlc3VsdCkpe1xyXG4gICAgICAgICAgICAgICAgIGFsZXJ0KE9iamVjdC5rZXlzKHJlc3VsdClbeF0pO1xyXG4gICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgZm9yKHZhciB4IGluIHJlc3VsdCl7XHJcbiAgICAgICAgICAgICAgICAgYWxlcnQocmVzdWx0W3hdKTtcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhbGVydChcInN1Y2Nlc3NvQWpheFdvcmtlckluZm9cIik7Ki9cclxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcImZhbGxpdG9BamF4V29ya2VySW5mb1wiKTtcclxuICAgICAgICAgICAgICAgIC8qZm9yICh2YXIgeCBpbiBqcVhIUikge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KHggKyBcIiBcIiArIGpxWEhSW3hdKTtcclxuICAgICAgICAgICAgICAgIH0qL1xyXG4gICAgICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKGVycm9yVGhyb3duKTtcclxuICAgICAgICAgICAgICAgIGVycm9yLnRleHRTdGF0dXMgPSB0ZXh0U3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgZXJyb3IuanFYSFIgPSBqcVhIUjtcclxuICAgICAgICAgICAgICAgIGVycm9yLmVycm9ycyA9IGpxWEhSLnJlc3BvbnNlSlNPTjtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG59O1xyXG5cclxuUmVwb3NpdG9yeS5wcm90b3R5cGUuc2V0U2VsZWN0b3IgPSBmdW5jdGlvbiAoYXBpVG9rZW4sIGlzU2VsZWN0b3IsIHdvcmtlclVybCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAvLyBhbGVydChcIlByb21pc2VcIik7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIC8qYWxlcnQoc2VsZi5fc2VydmVyICsgd29ya2VyVXJsKTtcclxuICAgICAgICBhbGVydChhcGlUb2tlbik7Ki9cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IHNlbGYuX3NlcnZlciArIHdvcmtlclVybCxcclxuICAgICAgICAgICAgdHlwZTogaXNTZWxlY3Rvcj8nUE9TVCc6J0RFTEVURScsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYXBpVG9rZW4sXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgLy9hbGVydChcInN1Y2Nlc3NvQWpheFNlbGVjdG9yXCIpO1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiZmFsbGl0b0FqYXhTZWxlY3RvclwiKTtcclxuICAgICAgICAgICAgLypmb3IgKHZhciB4IGluIGpxWEhSKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydCh4ICsgXCIgXCIgKyBqcVhIUlt4XSk7XHJcbiAgICAgICAgICAgIH0qL1xyXG4gICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoZXJyb3JUaHJvd24pO1xyXG4gICAgICAgICAgICBlcnJvci50ZXh0U3RhdHVzID0gdGV4dFN0YXR1cztcclxuICAgICAgICAgICAgZXJyb3IuanFYSFIgPSBqcVhIUjtcclxuICAgICAgICAgICAgZXJyb3IuZXJyb3JzID0ganFYSFIucmVzcG9uc2VKU09OO1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5zZXRBbm5vdGF0b3IgPSBmdW5jdGlvbiAoYXBpVG9rZW4sIGlzQW5ub3RhdG9yLCB3b3JrZXJVcmwpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIC8vYWxlcnQoXCJQcm9taXNlXCIpO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgLy8gIGFsZXJ0KHNlbGYuX3NlcnZlciArIHdvcmtlclVybCk7XHJcbiAgICAgICAvLyBhbGVydChhcGlUb2tlbik7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBzZWxmLl9zZXJ2ZXIgKyB3b3JrZXJVcmwsXHJcbiAgICAgICAgICAgIHR5cGU6IGlzQW5ub3RhdG9yPydQT1NUJzonREVMRVRFJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBhcGlUb2tlbixcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAvL2FsZXJ0KFwic3VjY2Vzc29BamF4QW5ub3RhdG9yXCIpO1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRmFsbGl0b0FqYXhBbm5vdGF0b3JcIik7XHJcbiAgICAgICAgICAgIC8qZm9yICh2YXIgeCBpbiBqcVhIUikge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoeCArIFwiIFwiICsganFYSFJbeF0pO1xyXG4gICAgICAgICAgICB9Ki9cclxuICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKGVycm9yVGhyb3duKTtcclxuICAgICAgICAgICAgZXJyb3IudGV4dFN0YXR1cyA9IHRleHRTdGF0dXM7XHJcbiAgICAgICAgICAgIGVycm9yLmpxWEhSID0ganFYSFI7XHJcbiAgICAgICAgICAgIGVycm9yLmVycm9ycyA9IGpxWEhSLnJlc3BvbnNlSlNPTjtcclxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59O1xyXG5leHBvcnRzLlJlcG9zaXRvcnkgPSBSZXBvc2l0b3J5O1xyXG5leHBvcnRzLmNyZWF0ZVJlcG9zaXRvcnkgPSBSZXBvc2l0b3J5O1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBVdGVudGUgb24gMTAvMDYvMjAxNy5cclxuICovXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCksXHJcbiAgICBQcm9taXNlID0gcmVxdWlyZSgnYmx1ZWJpcmQnKTtcclxuXHJcbmZ1bmN0aW9uIFJlcG9zaXRvcnkoc2VydmVyKSB7XHJcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmVwb3NpdG9yeSkpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJlcG9zaXRvcnkoc2VydmVyKTtcclxuICAgIH1cclxuICAgIHRoaXMuX3NlcnZlciA9IHNlcnZlciB8fCAnJztcclxufVxyXG5cclxuUmVwb3NpdG9yeS5wcm90b3R5cGUuZ2V0Q2FtcGFpZ25TdGF0aXN0aWNzID0gZnVuY3Rpb24gKGFwaVRva2VuLHN0YXRpc3RpY3NVcmwpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBzZWxmLl9zZXJ2ZXIgKyBzdGF0aXN0aWNzVXJsLFxyXG4gICAgICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICAgICAgZGF0YVR5cGU6XCJqc29uXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6e1xyXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBhcGlUb2tlbixcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XHJcbiAgICAgICAgICAgIC8vYWxlcnQoXCJIbyBmYWxsaXRvXCIpO1xyXG4gICAgICAgICAgICAvKmZvcih2YXIgeCBpbiBqcVhIUil7XHJcbiAgICAgICAgICAgICBhbGVydCh4ICsgXCIgXCIgKyBqcVhIUlt4XSk7XHJcbiAgICAgICAgICAgICB9Ki9cclxuICAgICAgICAgICAgYWxlcnQoanFYSFIucmVzcG9uc2VKU09OLmVycm9yKTtcclxuICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKGVycm9yVGhyb3duKTtcclxuICAgICAgICAgICAgZXJyb3IudGV4dFN0YXR1cyA9IHRleHRTdGF0dXM7XHJcbiAgICAgICAgICAgIGVycm9yLmpxWEhSID0ganFYSFI7XHJcbiAgICAgICAgICAgIGFsZXJ0KGpxWEhSLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wID0gSlNPTi5wYXJzZShqcVhIUi5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICBmb3IodmFyIHggaW4gdGVtcCl7XHJcbiAgICAgICAgICAgICAgICBhbGVydCh4ICtcIiBcIisgdGVtcFt4XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZXJyb3IuZXJyb3JzID0ganFYSFIucmVzcG9uc2VKU09OO1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5nZXRJbWFnZUluZm8gPSBmdW5jdGlvbiAoYXBpVG9rZW4saW1hZ2VJZCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IHNlbGYuX3NlcnZlciArIGltYWdlSWQsXHJcbiAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTpcImpzb25cIixcclxuICAgICAgICAgICAgaGVhZGVyczp7XHJcbiAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGFwaVRva2VuLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcclxuICAgICAgICAgICAgYWxlcnQoanFYSFIucmVzcG9uc2VKU09OLmVycm9yKTtcclxuICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKGVycm9yVGhyb3duKTtcclxuICAgICAgICAgICAgZXJyb3IudGV4dFN0YXR1cyA9IHRleHRTdGF0dXM7XHJcbiAgICAgICAgICAgIGVycm9yLmpxWEhSID0ganFYSFI7XHJcbiAgICAgICAgICAgIGVycm9yLmVycm9ycyA9IGpxWEhSLnJlc3BvbnNlSlNPTjtcclxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuUmVwb3NpdG9yeS5wcm90b3R5cGUuZ2V0SW1hZ2VTdGF0aXN0aWNzID0gZnVuY3Rpb24gKGFwaVRva2VuLGltYWdlU3RhdGlzdGljc1VybCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IHNlbGYuX3NlcnZlciArIGltYWdlU3RhdGlzdGljc1VybCxcclxuICAgICAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOlwianNvblwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOntcclxuICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYXBpVG9rZW5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGpxWEhSLnJlc3BvbnNlSlNPTi5lcnJvcik7XHJcbiAgICAgICAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihlcnJvclRocm93bik7XHJcbiAgICAgICAgICAgIGVycm9yLnRleHRTdGF0dXMgPSB0ZXh0U3RhdHVzO1xyXG4gICAgICAgICAgICBlcnJvci5qcVhIUiA9IGpxWEhSO1xyXG4gICAgICAgICAgICBlcnJvci5lcnJvcnMgPSBqcVhIUi5yZXNwb25zZUpTT047XHJcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmV4cG9ydHMuUmVwb3NpdG9yeSA9IFJlcG9zaXRvcnk7XHJcbmV4cG9ydHMuY3JlYXRlUmVwb3NpdG9yeSA9IFJlcG9zaXRvcnk7XHJcbiIsIi8qanNsaW50IG5vZGU6dHJ1ZSAqL1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbmV4cG9ydHMuY3JlYXRlUmVwb3NpdG9yaWVzID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc2lnbnVwOiByZXF1aXJlKCcuL3NpZ251cCcpLmNyZWF0ZVJlcG9zaXRvcnkob3B0aW9ucyksXHJcbiAgICAgICAgbG9naW46IHJlcXVpcmUoJy4vbG9naW4nKS5jcmVhdGVSZXBvc2l0b3J5KG9wdGlvbnMpLFxyXG4gICAgICAgIHVzZXJob21lOiByZXF1aXJlKCcuL3VzZXJob21lJykuY3JlYXRlUmVwb3NpdG9yeShvcHRpb25zKSxcclxuICAgICAgICBsb2dvdXQgOiByZXF1aXJlKCcuL2xvZ291dCcpLmNyZWF0ZVJlcG9zaXRvcnkob3B0aW9ucyksXHJcbiAgICAgICAgc3RhdHVzOiByZXF1aXJlKCcuL3N0YXR1cycpLmNyZWF0ZVJlcG9zaXRvcnkob3B0aW9ucyksXHJcbiAgICAgICAgY3JlYXRlY2FtcGFpZ24gOiByZXF1aXJlKFwiLi9jcmVhdGVjYW1wYWlnblwiKS5jcmVhdGVSZXBvc2l0b3J5KG9wdGlvbnMpLFxyXG4gICAgICAgIGVkaXRpbWFnZXM6IHJlcXVpcmUoXCIuL2VkaXRpbWFnZXNcIikuY3JlYXRlUmVwb3NpdG9yeShvcHRpb25zKSxcclxuICAgICAgICB1cGxvYWRmaWxlOiByZXF1aXJlKFwiLi91cGxvYWRmaWxlXCIpLmNyZWF0ZVJlcG9zaXRvcnkob3B0aW9ucyksXHJcbiAgICAgICAgZW5kZWRjYW1wYWlnbnN0YXRpc3RpY3M6IHJlcXVpcmUoXCIuL2VuZGVkY2FtcGFpZ25zdGF0aXN0aWNzXCIpLmNyZWF0ZVJlcG9zaXRvcnkob3B0aW9ucyksXHJcbiAgICAgICAgZWRpdHdvcmtlcnM6IHJlcXVpcmUoXCIuL2VkaXR3b3JrZXJzXCIpLmNyZWF0ZVJlcG9zaXRvcnkob3B0aW9ucyksXHJcbiAgICAgICAgdGFza3N0YXRpc3RpY3M6cmVxdWlyZShcIi4vdGFza3N0YXRpc3RpY3NcIikuY3JlYXRlUmVwb3NpdG9yeShvcHRpb25zKSxcclxuICAgICAgICB0YXNrd29ya2luZ3Nlc3Npb246cmVxdWlyZShcIi4vdGFza3dvcmtpbmdzZXNzaW9uXCIpLmNyZWF0ZVJlcG9zaXRvcnkob3B0aW9ucyksXHJcbiAgICAgICAgZWRpdGNhbXBhaWduOiByZXF1aXJlKFwiLi9lZGl0Y2FtcGFpZ25cIikuY3JlYXRlUmVwb3NpdG9yeShvcHRpb25zKVxyXG4gICAgfTtcclxufTtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgVXRlbnRlIG9uIDIzLzA1LzIwMTcuXHJcbiAqL1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciAkID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJyQnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJyQnXSA6IG51bGwpLFxyXG4gICAgUHJvbWlzZSA9IHJlcXVpcmUoJ2JsdWViaXJkJyk7XHJcblxyXG5mdW5jdGlvbiBSZXBvc2l0b3J5KHNlcnZlcikge1xyXG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJlcG9zaXRvcnkpKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXBvc2l0b3J5KHNlcnZlcik7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9zZXJ2ZXIgPSBzZXJ2ZXIgfHwgJyc7XHJcbn1cclxuXHJcblJlcG9zaXRvcnkucHJvdG90eXBlLmxvZ2luID0gZnVuY3Rpb24gKHVzZXJuYW1lLHB3ZCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgLy9wZXIgaSB0ZXN0IGRhZGEsIGRhZGEsIGxlZ2lsaW1lbnRzICAocm9sZSBtYXN0ZXIpIC0+IHJlZ2lzdHJhdG8gY29uIHN1Y2Nlc3NvXHJcbiAgICAvL2FuY2hlIGRhZGExLGRhZGExLGxlZ2lsaW1lbnRzIChyb2xlIHdvcmtlcikgLT4gcmVnaXN0cmF0byBjb24gc3VjY2Vzc29cclxuICAgIC8vYWxlcnQoXCJTdG8gcGVyIGZhcmUgaWwgUHJvbWlzZSBjb24gZGF0aVwiICsgdXNlcm5hbWUgKyBwd2QpO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IHNlbGYuX3NlcnZlciArICcvYXBpL2F1dGgnLFxyXG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6e1xyXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiAnQVBJS2V5IGRlMjA1OTZlLWVhMjMtNGJmOC04OWY5LTBiN2Y4OTI4ZDQzNScsXHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzonYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lLFxyXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHB3ZCxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24gKGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge1xyXG4gICAgICAgICAgICAvL2FsZXJ0KFwiSG8gZmFsbGl0b1wiKTtcclxuICAgICAgICAgICAgLy9hbGVydChqcVhIUi5yZXNwb25zZUpTT04uZXJyb3IpO1xyXG4gICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoZXJyb3JUaHJvd24pO1xyXG4gICAgICAgICAgICBlcnJvci50ZXh0U3RhdHVzID0gdGV4dFN0YXR1cztcclxuICAgICAgICAgICAgZXJyb3IuanFYSFIgPSBqcVhIUjtcclxuICAgICAgICAgICAgZXJyb3IuZXJyb3JzID0gSlNPTi5wYXJzZShqcVhIUi5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5leHBvcnRzLlJlcG9zaXRvcnkgPSBSZXBvc2l0b3J5O1xyXG5leHBvcnRzLmNyZWF0ZVJlcG9zaXRvcnkgPSBSZXBvc2l0b3J5O1xyXG5cclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgVXRlbnRlIG9uIDI0LzA1LzIwMTcuXHJcbiAqL1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciAkID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJyQnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJyQnXSA6IG51bGwpLFxyXG4gICAgUHJvbWlzZSA9IHJlcXVpcmUoJ2JsdWViaXJkJyk7XHJcblxyXG5mdW5jdGlvbiBSZXBvc2l0b3J5KHNlcnZlcikge1xyXG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJlcG9zaXRvcnkpKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXBvc2l0b3J5KHNlcnZlcik7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9zZXJ2ZXIgPSBzZXJ2ZXIgfHwgJyc7XHJcbn1cclxuXHJcblJlcG9zaXRvcnkucHJvdG90eXBlLmxvZ291dCA9IGZ1bmN0aW9uIChhcGl0b2tlbikge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgdmFyIGF1dGggPSAnQVBJVG9rZW4gJythcGl0b2tlbjtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBzZWxmLl9zZXJ2ZXIgKyAnL2FwaS9hdXRoJyxcclxuICAgICAgICAgICAgdHlwZTogJ0RFTEVURScsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6e1xyXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBhdXRoXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQucmVzdWx0KTtcclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihlcnJvclRocm93bik7XHJcbiAgICAgICAgICAgIGVycm9yLnRleHRTdGF0dXMgPSB0ZXh0U3RhdHVzO1xyXG4gICAgICAgICAgICBlcnJvci5qcVhIUiA9IGpxWEhSO1xyXG4gICAgICAgICAgICBlcnJvci5lcnJvcnMgPSBqcVhIUi5yZXNwb25zZUpTT04uZXJyb3JzO1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5leHBvcnRzLlJlcG9zaXRvcnkgPSBSZXBvc2l0b3J5O1xyXG5leHBvcnRzLmNyZWF0ZVJlcG9zaXRvcnkgPSBSZXBvc2l0b3J5O1xyXG5cclxuIiwiLypqc2xpbnQgbm9kZTp0cnVlLCBub21lbjogdHJ1ZSAqL1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciAkID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJyQnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJyQnXSA6IG51bGwpLFxyXG4gICAgUHJvbWlzZSA9IHJlcXVpcmUoJ2JsdWViaXJkJyk7XHJcblxyXG5mdW5jdGlvbiBSZXBvc2l0b3J5KHNlcnZlcikge1xyXG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJlcG9zaXRvcnkpKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXBvc2l0b3J5KHNlcnZlcik7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9zZXJ2ZXIgPSBzZXJ2ZXIgfHwgJyc7XHJcbn1cclxuXHJcblJlcG9zaXRvcnkucHJvdG90eXBlLnZhbGlkYXRlQW5kU2VuZCA9IGZ1bmN0aW9uIChmdWxsbmFtZSx1c2VybmFtZSxwd2QxLHJvbGUpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIC8vcGVyIGkgdGVzdCBkYWRhLCBkYWRhLCBsZWdpbGltZW50cyAtPiByZWdpc3RyYXRvIGNvbiBzdWNjZXNzb1xyXG4gICAgLy9hbmNoZSBkYWRhMSxkYWRhMSxsZWdpbGltZW50c1xyXG4gICAgLy9hbGVydChcIlN0byBwZXIgZmFyZSBpbCBQcm9taXNlIGNvbiBkYXRpXCIgKyBmdWxsbmFtZSArIHVzZXJuYW1lICsgcHdkMSArIHJvbGUpO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IHNlbGYuX3NlcnZlciArICcvYXBpL3VzZXInLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczp7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6J2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxuYW1lOiBmdWxsbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICB1c2VybmFtZTogdXNlcm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHB3ZDEsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogcm9sZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAvL2FsZXJ0KFwiSG8gaW52aWF0byBpbCBtZXNzYWdnaW9cIik7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5yZXN1bHQpO1xyXG4gICAgICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcclxuICAgICAgICAgICAgICAgIC8vYWxlcnQoXCJIbyBmYWxsaXRvXCIpO1xyXG4gICAgICAgICAgICAgICAgLyphbGVydCh0ZXh0U3RhdHVzKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHggaW4ganFYSFIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoanFYSFJbeF0pO1xyXG4gICAgICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgICAgICAvLzQwNCwgTm90IEZvdW5kIC0+IGNyZWRvIGlsIHByb2JsZW1hIHNpYSBjaGUgbm9uIGFjY2hpYXBwaSBpbCBzaXRvXHJcbiAgICAgICAgICAgICAgICAvL1JJU09MVE8gaW5zZXJlbmRvIGNvbWUgcGFyYW1ldHJvIHNlcnZlciBodHRwOi8vYXd0IGVjYy5cclxuICAgICAgICAgICAgICAgIC8vNDAxIFVuYXV0aG9yaXplZFxyXG4gICAgICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKGVycm9yVGhyb3duKTtcclxuICAgICAgICAgICAgICAgIGVycm9yLnRleHRTdGF0dXMgPSB0ZXh0U3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgZXJyb3IuanFYSFIgPSBqcVhIUjtcclxuICAgICAgICAgICAgICAgIGVycm9yLmVycm9ycyA9IEpTT04ucGFyc2UoanFYSFIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgICAgIC8vZXJyb3IuZXJyb3JzID0ganFYSFIucmVzcG9uc2VKU09OLmVycm9ycztcclxuICAgICAgICAgICAgICAgIC8qZm9yICh2YXIgeCBpbiBqcVhIUilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcIlBvc2l6aW9uZSBcIiArIHggKyBcIiAuLi4uIFwiICsganFYSFJbeF0pO1xyXG4gICAgICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxufTtcclxuXHJcbmV4cG9ydHMuUmVwb3NpdG9yeSA9IFJlcG9zaXRvcnk7XHJcbmV4cG9ydHMuY3JlYXRlUmVwb3NpdG9yeSA9IFJlcG9zaXRvcnk7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFV0ZW50ZSBvbiAyNS8wNS8yMDE3LlxyXG4gKi9cclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKSxcclxuICAgIFByb21pc2UgPSByZXF1aXJlKCdibHVlYmlyZCcpO1xyXG5cclxuZnVuY3Rpb24gUmVwb3NpdG9yeShzZXJ2ZXIpIHtcclxuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBSZXBvc2l0b3J5KSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVwb3NpdG9yeSgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fc2VydmVyID0gc2VydmVyIHx8ICcnO1xyXG59XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5zZXRBcGlUb2tlbiA9IGZ1bmN0aW9uIChhcGlUb2tlbikge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgLy9wZXIgaSB0ZXN0IGRhZGEsIGRhZGEsIGxlZ2lsaW1lbnRzICAocm9sZSBtYXN0ZXIpIC0+IHJlZ2lzdHJhdG8gY29uIHN1Y2Nlc3NvXHJcbiAgICAvL2FuY2hlIGRhZGExLGRhZGExLGxlZ2lsaW1lbnRzIChyb2xlIHdvcmtlcikgLT4gcmVnaXN0cmF0byBjb24gc3VjY2Vzc29cclxuICAgIHNlbGYuYXBpVG9rZW4gPSBhcGlUb2tlbjtcclxuICAgIHNlbGYuYXV0aEFwaVRva2VuID0gJ0FQSVRva2VuICcrYXBpVG9rZW47XHJcbn07XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5kZWxldGVBcGlUb2tlbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIC8vcGVyIGkgdGVzdCBkYWRhLCBkYWRhLCBsZWdpbGltZW50cyAgKHJvbGUgbWFzdGVyKSAtPiByZWdpc3RyYXRvIGNvbiBzdWNjZXNzb1xyXG4gICAgLy9hbmNoZSBkYWRhMSxkYWRhMSxsZWdpbGltZW50cyAocm9sZSB3b3JrZXIpIC0+IHJlZ2lzdHJhdG8gY29uIHN1Y2Nlc3NvXHJcbiAgICBzZWxmLmFwaVRva2VuID0gdW5kZWZpbmVkO1xyXG4gICAgc2VsZi5hdXRoQXBpVG9rZW4gPSB1bmRlZmluZWQ7XHJcbn07XHJcblJlcG9zaXRvcnkucHJvdG90eXBlLmdldEFwaVRva2VuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgcmV0dXJuIHNlbGYuYXBpVG9rZW47XHJcbn07XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5nZXRBdXRoQXBpVG9rZW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICByZXR1cm4gc2VsZi5hdXRoQXBpVG9rZW47XHJcbn07XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5zZXRTdWNjZXNzTmV4dCA9IGZ1bmN0aW9uIChuZXh0KXtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHNlbGYubmV4dCA9IG5leHQ7XHJcbn07XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5nZXRTdWNjZXNzTmV4dCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgcmV0dXJuIHNlbGYubmV4dDtcclxufTtcclxuXHJcblJlcG9zaXRvcnkucHJvdG90eXBlLmRlbGV0ZVN1Y2Nlc3NOZXh0ID0gZnVuY3Rpb24oKXtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIGRlbGV0ZSBzZWxmLm5leHQ7XHJcbn07XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5zZXRDdXJyZW50Q2FtcGFpZ24gPSBmdW5jdGlvbihjYW1wYWlnbil7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZWxmLmNhbXBhaWduID0gY2FtcGFpZ247XHJcbn07XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5nZXRDdXJyZW50Q2FtcGFpZ24gPSBmdW5jdGlvbigpe1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgcmV0dXJuIHNlbGYuY2FtcGFpZ247XHJcbn07XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5kZWxldGVDdXJyZW50Q2FtcGFpZ24gPSBmdW5jdGlvbigpe1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgZGVsZXRlIHNlbGYuY2FtcGFpZ247XHJcbn07XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5zZXRDdXJyZW50SW1hZ2UgPSBmdW5jdGlvbihpbWFnZSl7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZWxmLmltYWdlID0gaW1hZ2U7XHJcbn07XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5nZXRDdXJyZW50SW1hZ2UgPSBmdW5jdGlvbigpe1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgcmV0dXJuIHNlbGYuaW1hZ2U7XHJcbn07XHJcblJlcG9zaXRvcnkucHJvdG90eXBlLmRlbGV0ZUN1cnJlbnRJbWFnZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBkZWxldGUgc2VsZi5pbWFnZTtcclxufTtcclxuXHJcblJlcG9zaXRvcnkucHJvdG90eXBlLnNldEN1cnJlbnRUYXNrID0gZnVuY3Rpb24odGFzayl7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZWxmLnRhc2sgPSB0YXNrO1xyXG59O1xyXG5cclxuUmVwb3NpdG9yeS5wcm90b3R5cGUuZ2V0Q3VycmVudFRhc2sgPSBmdW5jdGlvbigpe1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgcmV0dXJuIHNlbGYudGFzaztcclxufTtcclxuUmVwb3NpdG9yeS5wcm90b3R5cGUuZGVsZXRlQ3VycmVudFRhc2sgPSBmdW5jdGlvbigpe1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgc2VsZi50YXNrID0gdW5kZWZpbmVkO1xyXG59O1xyXG5cclxuUmVwb3NpdG9yeS5wcm90b3R5cGUuc2V0Q3VycmVudEltYWdlU3RhdGlzdGljcyA9IGZ1bmN0aW9uKGltYWdlU3RhdGlzdGljcyl7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZWxmLmltYWdlU3RhdGlzdGljcyA9IGltYWdlU3RhdGlzdGljcztcclxufTtcclxuXHJcblJlcG9zaXRvcnkucHJvdG90eXBlLmdldEN1cnJlbnRJbWFnZVN0YXRpc3RpY3MgPSBmdW5jdGlvbigpe1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgcmV0dXJuIHNlbGYuaW1hZ2VTdGF0aXN0aWNzO1xyXG59O1xyXG5cclxuUmVwb3NpdG9yeS5wcm90b3R5cGUuZ2V0VXNlckluZm8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICByZXR1cm4gc2VsZi51c2VySW5mbztcclxufTtcclxuUmVwb3NpdG9yeS5wcm90b3R5cGUuZGVsZXRlVXNlckluZm8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZWxmLnVzZXJJbmZvID0gdW5kZWZpbmVkO1xyXG59O1xyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5zZXRVc2VySW5mbyA9IGZ1bmN0aW9uICh1c2VySW5mbykge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgc2VsZi51c2VySW5mbyA9IHVzZXJJbmZvO1xyXG59O1xyXG5cclxuUmVwb3NpdG9yeS5wcm90b3R5cGUuZ2V0VGFza3NJbmZvID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgcmV0dXJuIHNlbGYudGFza3NJbmZvO1xyXG59O1xyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5kZWxldGVUYXNrc0luZm8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZWxmLnRhc2tzSW5mbyA9IHVuZGVmaW5lZDtcclxufTtcclxuUmVwb3NpdG9yeS5wcm90b3R5cGUuc2V0VGFza3NJbmZvID0gZnVuY3Rpb24gKHRhc2tzSW5mbykge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgc2VsZi50YXNrc0luZm8gPSB0YXNrc0luZm87XHJcbn07XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5nZXRVc2VyQ2FtcGFpZ25zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgcmV0dXJuIHNlbGYudXNlckNhbXBhaWducztcclxufTtcclxuUmVwb3NpdG9yeS5wcm90b3R5cGUuZGVsZXRlVXNlckNhbXBhaWducyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHNlbGYudXNlckNhbXBhaWducyA9IHVuZGVmaW5lZDtcclxufTtcclxuUmVwb3NpdG9yeS5wcm90b3R5cGUuc2V0VXNlckNhbXBhaWducyA9IGZ1bmN0aW9uICh1c2VyQ2FtcGFpZ25zKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZWxmLnVzZXJDYW1wYWlnbnMgPSB1c2VyQ2FtcGFpZ25zO1xyXG59O1xyXG5cclxuUmVwb3NpdG9yeS5wcm90b3R5cGUuZ2V0Q3VycmVudENhbXBhaWduU3RhdGlzdGljcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHJldHVybiBzZWxmLmN1cnJlbnRDYW1wYWlnblN0YXRpc3RpY3M7XHJcbn07XHJcblJlcG9zaXRvcnkucHJvdG90eXBlLmRlbGV0ZUN1cnJlbnRDYW1wYWlnblN0YXRpc3RpY3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZWxmLmN1cnJlbnRDYW1wYWlnblN0YXRpc3RpY3MgPSB1bmRlZmluZWQ7XHJcbn07XHJcblJlcG9zaXRvcnkucHJvdG90eXBlLnNldEN1cnJlbnRDYW1wYWlnblN0YXRpc3RpY3MgPSBmdW5jdGlvbiAoY3VycmVudENhbXBhaWduU3RhdGlzdGljcykge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgc2VsZi5jdXJyZW50Q2FtcGFpZ25TdGF0aXN0aWNzID0gY3VycmVudENhbXBhaWduU3RhdGlzdGljcztcclxufTtcclxuXHJcblJlcG9zaXRvcnkucHJvdG90eXBlLnNldEN1cnJlbnRDYW1wYWlnblN0YXRpc3RpY3NJbWFnZXMgPSBmdW5jdGlvbihpbWdzKXtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHNlbGYuY3VycmVudENhbXBhaWduU3RhdGlzdGljc0ltYWdlcyA9IGltZ3M7XHJcbn1cclxuXHJcblJlcG9zaXRvcnkucHJvdG90eXBlLmdldEN1cnJlbnRDYW1wYWlnblN0YXRpc3RpY3NJbWFnZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICByZXR1cm4gc2VsZi5jdXJyZW50Q2FtcGFpZ25TdGF0aXN0aWNzSW1hZ2VzO1xyXG59O1xyXG5cclxuXHJcblJlcG9zaXRvcnkucHJvdG90eXBlLnNldEN1cnJlbnRDYW1wYWlnbkltYWdlcyA9IGZ1bmN0aW9uKGltZ3Mpe1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgc2VsZi5jdXJyZW50Q2FtcGFpZ25JbWFnZXMgPSBpbWdzO1xyXG59O1xyXG5cclxuUmVwb3NpdG9yeS5wcm90b3R5cGUuZ2V0Q3VycmVudENhbXBhaWduSW1hZ2VzID0gZnVuY3Rpb24oKXtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHJldHVybiBzZWxmLmN1cnJlbnRDYW1wYWlnbkltYWdlcztcclxufTtcclxuXHJcblJlcG9zaXRvcnkucHJvdG90eXBlLmRlbGV0ZUN1cnJlbnRDYW1wYWlnbkltYWdlcyA9IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZWxmLmN1cnJlbnRDYW1wYWlnbkltYWdlcyA9IHVuZGVmaW5lZDtcclxufTtcclxuXHJcblJlcG9zaXRvcnkucHJvdG90eXBlLnNldE9sZEltYWdlc1VybCA9IGZ1bmN0aW9uKG9sZCl7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZWxmLm9sZEltYWdlc1VybDtcclxufTtcclxuUmVwb3NpdG9yeS5wcm90b3R5cGUuZ2V0T2xkSW1hZ2VzVXJsID0gZnVuY3Rpb24oKXtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHJldHVybiBzZWxmLm9sZEltYWdlc1VybDtcclxufTtcclxuUmVwb3NpdG9yeS5wcm90b3R5cGUuZGVsZXRlT2xkSW1hZ2VzVXJsID0gZnVuY3Rpb24oKXtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHNlbGYub2xkSW1hZ2VzVXJsID0gdW5kZWZpbmVkO1xyXG59O1xyXG5cclxuXHJcblJlcG9zaXRvcnkucHJvdG90eXBlLmNsZWFyQ2FjaGUgPSBmdW5jdGlvbigpe1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgc2VsZi5kZWxldGVDdXJyZW50SW1hZ2UoKTtcclxuICAgIHNlbGYuZGVsZXRlQ3VycmVudENhbXBhaWduU3RhdGlzdGljcygpO1xyXG4gICAgc2VsZi5kZWxldGVDdXJyZW50Q2FtcGFpZ24oKTtcclxuICAgIHNlbGYuZGVsZXRlQXBpVG9rZW4oKTtcclxuICAgIHNlbGYuZGVsZXRlQ3VycmVudFRhc2soKTtcclxuICAgIHNlbGYuZGVsZXRlVXNlckluZm8oKTtcclxuICAgIHNlbGYuZGVsZXRlVGFza3NJbmZvKCk7XHJcbiAgICBzZWxmLmRlbGV0ZVVzZXJDYW1wYWlnbnMoKTtcclxuICAgIHNlbGYuZGVsZXRlQ3VycmVudENhbXBhaWduSW1hZ2VzKCk7XHJcbiAgICBzZWxmLmRlbGV0ZU9sZEltYWdlc1VybCgpO1xyXG59O1xyXG5cclxuZXhwb3J0cy5SZXBvc2l0b3J5ID0gUmVwb3NpdG9yeTtcclxuZXhwb3J0cy5jcmVhdGVSZXBvc2l0b3J5ID0gUmVwb3NpdG9yeTtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgVXRlbnRlIG9uIDEyLzA2LzIwMTcuXHJcbiAqL1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciAkID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJyQnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJyQnXSA6IG51bGwpLFxyXG4gICAgUHJvbWlzZSA9IHJlcXVpcmUoJ2JsdWViaXJkJyk7XHJcblxyXG5mdW5jdGlvbiBSZXBvc2l0b3J5KHNlcnZlcikge1xyXG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJlcG9zaXRvcnkpKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXBvc2l0b3J5KHNlcnZlcik7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9zZXJ2ZXIgPSBzZXJ2ZXIgfHwgJyc7XHJcbn1cclxuXHJcblJlcG9zaXRvcnkucHJvdG90eXBlLmdldFRhc2tTdGF0aXN0aWNzID0gZnVuY3Rpb24gKGFwaVRva2VuLHN0YXRpc3RpY3NVcmwpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgYWxlcnQoYXBpVG9rZW4pO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogc2VsZi5fc2VydmVyICsgc3RhdGlzdGljc1VybCxcclxuICAgICAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6e1xyXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBhcGlUb2tlblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIC8qZm9yKHZhciB4IGluIHJlc3VsdCl7XHJcbiAgICAgICAgICAgICAgICBhbGVydCh4K1wiIFwiK3Jlc3VsdFt4XSk7XHJcbiAgICAgICAgICAgIH0qL1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIHggaW4ganFYSFIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KGpxWEhSW3hdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoZXJyb3JUaHJvd24pO1xyXG4gICAgICAgICAgICBlcnJvci50ZXh0U3RhdHVzID0gdGV4dFN0YXR1cztcclxuICAgICAgICAgICAgZXJyb3IuanFYSFIgPSBqcVhIUjtcclxuICAgICAgICAgICAgZXJyb3IuZXJyb3JzID0ganFYSFIucmVzcG9uc2VKU09OO1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5leHBvcnRzLlJlcG9zaXRvcnkgPSBSZXBvc2l0b3J5O1xyXG5leHBvcnRzLmNyZWF0ZVJlcG9zaXRvcnkgPSBSZXBvc2l0b3J5O1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBVdGVudGUgb24gMTMvMDYvMjAxNy5cclxuICovXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCksXHJcbiAgICBQcm9taXNlID0gcmVxdWlyZSgnYmx1ZWJpcmQnKTtcclxuXHJcbmZ1bmN0aW9uIFJlcG9zaXRvcnkoc2VydmVyKSB7XHJcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmVwb3NpdG9yeSkpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJlcG9zaXRvcnkoc2VydmVyKTtcclxuICAgIH1cclxuICAgIHRoaXMuX3NlcnZlciA9IHNlcnZlciB8fCAnJztcclxufVxyXG5cclxuUmVwb3NpdG9yeS5wcm90b3R5cGUuc3RhcnRXb3JraW5nU2Vzc2lvbiA9IGZ1bmN0aW9uIChhcGlUb2tlbixzZXNzaW9uVXJsKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogc2VsZi5fc2VydmVyICsgc2Vzc2lvblVybCxcclxuICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOntcclxuICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYXBpVG9rZW5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XHJcbiAgICAgICAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihlcnJvclRocm93bik7XHJcbiAgICAgICAgICAgIGVycm9yLnRleHRTdGF0dXMgPSB0ZXh0U3RhdHVzO1xyXG4gICAgICAgICAgICBlcnJvci5qcVhIUiA9IGpxWEhSO1xyXG4gICAgICAgICAgICBlcnJvci5lcnJvcnMgPSBqcVhIUi5yZXNwb25zZUpTT047XHJcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5nZXROZXh0VGFza0luc3RhbmNlID0gZnVuY3Rpb24gKGFwaVRva2VuLHNlc3Npb25VcmwpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBzZWxmLl9zZXJ2ZXIgKyBzZXNzaW9uVXJsLFxyXG4gICAgICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICAgICAgZGF0YVR5cGU6XCJqc29uXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6e1xyXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBhcGlUb2tlblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KHJlc3VsdC5pbWFnZSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5pbWFnZSA9IFwiaHR0cDovL2F3dC5pZm1sZWRpdC5vcmdcIityZXN1bHQuaW1hZ2U7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcclxuICAgICAgICAgICAgLypmb3IgKHZhciB4IGluIGpxWEhSKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChqcVhIUlt4XSk7XHJcbiAgICAgICAgICAgIH0qL1xyXG4gICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoZXJyb3JUaHJvd24pO1xyXG4gICAgICAgICAgICBlcnJvci50ZXh0U3RhdHVzID0gdGV4dFN0YXR1cztcclxuICAgICAgICAgICAgZXJyb3IuanFYSFIgPSBqcVhIUjtcclxuICAgICAgICAgICAgZXJyb3IuZXJyb3JzID0ganFYSFIucmVzcG9uc2VKU09OO1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5zdWJtaXRBbm5vdGF0aW9uID0gZnVuY3Rpb24oYXBpVG9rZW4sc2Vzc2lvblVybCxza3lsaW5lKXtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBzZWxmLl9zZXJ2ZXIgKyBzZXNzaW9uVXJsLFxyXG4gICAgICAgICAgICB0eXBlOiAnUFVUJyxcclxuICAgICAgICAgICAgaGVhZGVyczp7XHJcbiAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGFwaVRva2VuLFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6XCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YTpKU09OLnN0cmluZ2lmeSh7XCJza3lsaW5lXCI6c2t5bGluZX0pXHJcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgeCBpbiBqcVhIUilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoanFYSFJbeF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihlcnJvclRocm93bik7XHJcbiAgICAgICAgICAgIGVycm9yLnRleHRTdGF0dXMgPSB0ZXh0U3RhdHVzO1xyXG4gICAgICAgICAgICBlcnJvci5qcVhIUiA9IGpxWEhSO1xyXG4gICAgICAgICAgICBlcnJvci5lcnJvcnMgPSBqcVhIUi5yZXNwb25zZUpTT047XHJcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcblJlcG9zaXRvcnkucHJvdG90eXBlLnN1Ym1pdFNlbGVjdGlvbiA9IGZ1bmN0aW9uKGFwaVRva2VuLHNlc3Npb25VcmwsYWNjZXB0ZWQpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBzZWxmLl9zZXJ2ZXIgKyBzZXNzaW9uVXJsLFxyXG4gICAgICAgICAgICB0eXBlOiAnUFVUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBhcGlUb2tlbixcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XCJhY2NlcHRlZFwiOiBhY2NlcHRlZH0pXHJcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcclxuICAgICAgICAgICAgLypmb3IgKHZhciB4IGluIGpxWEhSKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChqcVhIUlt4XSk7XHJcbiAgICAgICAgICAgIH0qL1xyXG4gICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoZXJyb3JUaHJvd24pO1xyXG4gICAgICAgICAgICBlcnJvci50ZXh0U3RhdHVzID0gdGV4dFN0YXR1cztcclxuICAgICAgICAgICAgZXJyb3IuanFYSFIgPSBqcVhIUjtcclxuICAgICAgICAgICAgZXJyb3IuZXJyb3JzID0ganFYSFIucmVzcG9uc2VKU09OO1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5leHBvcnRzLlJlcG9zaXRvcnkgPSBSZXBvc2l0b3J5O1xyXG5leHBvcnRzLmNyZWF0ZVJlcG9zaXRvcnkgPSBSZXBvc2l0b3J5O1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBVdGVudGUgb24gMDUvMDYvMjAxNy5cclxuICovXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCksXHJcbiAgICBQcm9taXNlID0gcmVxdWlyZSgnYmx1ZWJpcmQnKTtcclxuXHJcbmZ1bmN0aW9uIFJlcG9zaXRvcnkoc2VydmVyKSB7XHJcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmVwb3NpdG9yeSkpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJlcG9zaXRvcnkoc2VydmVyKTtcclxuICAgIH1cclxuICAgIHRoaXMuX3NlcnZlciA9IHNlcnZlciB8fCAnJztcclxufVxyXG5cclxuUmVwb3NpdG9yeS5wcm90b3R5cGUudXBsb2FkSW1hZ2VzID0gZnVuY3Rpb24gKGFwaXRva2VuLCBmaWxlcywgaW1hZ2VVcmwpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIC8vcmVmZXJlbmNlOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yMzIwMDY5L2pxdWVyeS1hamF4LWZpbGUtdXBsb2FkXHJcbiAgICAvL3JlZmVyZW5jZSBwcm9mLjogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTM5MjM0NC9zZW5kaW5nLW11bHRpcGFydC1mb3JtZGF0YS13aXRoLWpxdWVyeS1hamF4XHJcbiAgICAvL3ZhciBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgLy8gYWRkIGFzc29jIGtleSB2YWx1ZXMsIHRoaXMgd2lsbCBiZSBwb3N0cyB2YWx1ZXNcclxuICAgIC8vZm9ybURhdGEuYXBwZW5kKFwiZmlsZVwiLCBmaWxlLCBmaWxlLm5hbWUpO1xyXG4gICAgLy9mb3JtRGF0YS5hcHBlbmQoXCJ1cGxvYWRfZmlsZVwiLCB0cnVlKTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICB1cmw6IHNlbGYuX3NlcnZlciArIGltYWdlVXJsLFxyXG4gICAgICAgIGhlYWRlcnM6e1xyXG4gICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGFwaXRva2VuLFxyXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzonbXVsdGlwYXJ0L2Zvcm0tZGF0YSdcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRhdGE6IGZpbGVzLFxyXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICBwcm9jZXNzRGF0YTogZmFsc2UsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZmlsZXMpe1xyXG4gICAgICAgICAgICBhbGVydChcIkNhcmljYW1lbnRvIGF2dmVudXRvIGNvbiBzdWNjZXNzbyFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSkuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcclxuICAgICAgICAgICAgYWxlcnQoanFYSFIucmVzcG9uc2VKU09OLmVycm9yKTtcclxuICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKGVycm9yVGhyb3duKTtcclxuICAgICAgICAgICAgZXJyb3IudGV4dFN0YXR1cyA9IHRleHRTdGF0dXM7XHJcbiAgICAgICAgICAgIGVycm9yLmpxWEhSID0ganFYSFI7XHJcbiAgICAgICAgICAgIGVycm9yLmVycm9ycyA9IEpTT04ucGFyc2UoanFYSFIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuLy9sYSBjcmVhemlvbmUgZGkgdW5hIG51b3ZhIGNhbXBhZ25hIGxhIHNwb3N0ZXJlaSBpbiB1bidhbHRyYSBjb21wb25lbnQvcmVwb3NpdG9yeVxyXG5cclxuZXhwb3J0cy5SZXBvc2l0b3J5ID0gUmVwb3NpdG9yeTtcclxuZXhwb3J0cy5jcmVhdGVSZXBvc2l0b3J5ID0gUmVwb3NpdG9yeTtcclxuXHJcblxyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBVdGVudGUgb24gMjQvMDUvMjAxNy5cclxuICovXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCksXHJcbiAgICBQcm9taXNlID0gcmVxdWlyZSgnYmx1ZWJpcmQnKTtcclxuXHJcbmZ1bmN0aW9uIFJlcG9zaXRvcnkoc2VydmVyKSB7XHJcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmVwb3NpdG9yeSkpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJlcG9zaXRvcnkoc2VydmVyKTtcclxuICAgIH1cclxuICAgIHRoaXMuX3NlcnZlciA9IHNlcnZlciB8fCAnJztcclxufVxyXG5cclxuUmVwb3NpdG9yeS5wcm90b3R5cGUuZ2V0VXNlckluZm8gPSBmdW5jdGlvbiAoYXBpdG9rZW4pIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogc2VsZi5fc2VydmVyICsgJy9hcGkvdXNlci9tZScsXHJcbiAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBoZWFkZXJzOntcclxuICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYXBpdG9rZW5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGpxWEhSLnJlc3BvbnNlSlNPTi5lcnJvcik7XHJcbiAgICAgICAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihlcnJvclRocm93bik7XHJcbiAgICAgICAgICAgIGVycm9yLnRleHRTdGF0dXMgPSB0ZXh0U3RhdHVzO1xyXG4gICAgICAgICAgICBlcnJvci5qcVhIUiA9IGpxWEhSO1xyXG4gICAgICAgICAgICBlcnJvci5lcnJvcnMgPSBKU09OLnBhcnNlKGpxWEhSLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcblJlcG9zaXRvcnkucHJvdG90eXBlLmdldFRhc2tzSW5mbyA9IGZ1bmN0aW9uIChhcGl0b2tlbil7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IHNlbGYuX3NlcnZlciArICcvYXBpL3Rhc2snLFxyXG4gICAgICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgaGVhZGVyczp7XHJcbiAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGFwaXRva2VuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24gKGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge1xyXG4gICAgICAgICAgICBhbGVydChqcVhIUi5yZXNwb25zZUpTT04uZXJyb3IpO1xyXG4gICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoZXJyb3JUaHJvd24pO1xyXG4gICAgICAgICAgICBlcnJvci50ZXh0U3RhdHVzID0gdGV4dFN0YXR1cztcclxuICAgICAgICAgICAgZXJyb3IuanFYSFIgPSBqcVhIUjtcclxuICAgICAgICAgICAgZXJyb3IuZXJyb3JzID0gSlNPTi5wYXJzZShqcVhIUi5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5nZXRUYXNrSW5mbyA9IGZ1bmN0aW9uIChhcGl0b2tlbix0YXNrVXJsKXtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogc2VsZi5fc2VydmVyICsgdGFza1VybCxcclxuICAgICAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6e1xyXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBhcGl0b2tlblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgeCBpbiBqcVhIUikge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJcIiArIHggKyBcIjpcIiArIGpxWEhSW3hdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoZXJyb3JUaHJvd24pO1xyXG4gICAgICAgICAgICBlcnJvci50ZXh0U3RhdHVzID0gdGV4dFN0YXR1cztcclxuICAgICAgICAgICAgZXJyb3IuanFYSFIgPSBqcVhIUjtcclxuICAgICAgICAgICAgZXJyb3IuZXJyb3JzID0gSlNPTi5wYXJzZShqcVhIUi5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5nZXRDYW1wYWlnbkluZm8gPSBmdW5jdGlvbiAoaWQsYXBpdG9rZW4pe1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBzZWxmLl9zZXJ2ZXIgKyBpZCxcclxuICAgICAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6e1xyXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBhcGl0b2tlblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIC8vYWxlcnQoXCJzdWNjZXNzbyBnZXRDYW1wYWlnbkFqYXhcIik7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcclxuICAgICAgICAgICAgYWxlcnQoanFYSFIucmVzcG9uc2VKU09OLmVycm9yKTtcclxuICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKGVycm9yVGhyb3duKTtcclxuICAgICAgICAgICAgZXJyb3IudGV4dFN0YXR1cyA9IHRleHRTdGF0dXM7XHJcbiAgICAgICAgICAgIGVycm9yLmpxWEhSID0ganFYSFI7XHJcbiAgICAgICAgICAgIGVycm9yLmVycm9ycyA9IEpTT04ucGFyc2UoanFYSFIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgYWxlcnQoXCJGYWxsaXRvIGdldENhbXBhaWduQWpheFwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5SZXBvc2l0b3J5LnByb3RvdHlwZS5lZGl0VXNlckluZm8gPSBmdW5jdGlvbiAoZnVsbG5hbWUsIHBhc3N3b3JkLCBhcGl0b2tlbikge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBzZWxmLl9zZXJ2ZXIgKyAnL2FwaS91c2VyL21lJyxcclxuICAgICAgICAgICAgdHlwZTogJ1BVVCcsXHJcbiAgICAgICAgICAgIC8vZGF0YVR5cGUgOiAnanNvbicsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6e1xyXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBhcGl0b2tlbixcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOidhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgZnVsbG5hbWU6IGZ1bGxuYW1lLFxyXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAvL2FsZXJ0KFwiU3VjY2Vzc29BamF4XCIpO1xyXG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5yZXN1bHQpO1xyXG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24gKGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge1xyXG4gICAgICAgICAgICAvL2FsZXJ0KFwiRmFsbGl0b0FqYXhcIik7XHJcbiAgICAgICAgICAgIC8qZm9yICh2YXIgeCBpbiBqcVhIUikge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJcIiArIHggKyBcIjpcIiArIGpxWEhSW3hdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvKmZvcih2YXIgeCBpbiBqcVhIUi5lcnJvcil7XHJcbiAgICAgICAgICAgICAgICBhbGVydCggXCJcIit4K1wiIDpcIitqcVhIUi5lcnJvclt4XSk7XHJcbiAgICAgICAgICAgICAgICB0ZW1wRXJyb3JzLnB1c2goKFwiXCIreCtcIiA6XCIranFYSFIuZXJyb3JbeF0pKTtcclxuICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihlcnJvclRocm93bik7XHJcbiAgICAgICAgICAgIGVycm9yLnRleHRTdGF0dXMgPSB0ZXh0U3RhdHVzO1xyXG4gICAgICAgICAgICBlcnJvci5qcVhIUiA9IGpxWEhSO1xyXG4gICAgICAgICAgICBlcnJvci5lcnJvcnMgPSBKU09OLnBhcnNlKGpxWEhSLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcblJlcG9zaXRvcnkucHJvdG90eXBlLmdldFVzZXJDYW1wYWlnbnMgPSBmdW5jdGlvbiAoYXBpdG9rZW4pIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IHNlbGYuX3NlcnZlciArICcvYXBpL2NhbXBhaWduJyxcclxuICAgICAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlIDogJ2pzb24nLFxyXG4gICAgICAgICAgICBoZWFkZXJzOntcclxuICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYXBpdG9rZW4sXHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzonYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIC8vYWxlcnQoXCJTdWNjZXNzb0FqYXhDYW1wYWlnbnNcIik7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJGYWxsaXRvQWpheFwiKTtcclxuICAgICAgICAgICAgLypmb3IgKHZhciB4IGluIGpxWEhSKSB7XHJcbiAgICAgICAgICAgICBhbGVydChcIlwiICsgeCArIFwiOlwiICsganFYSFJbeF0pO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgLypmb3IodmFyIHggaW4ganFYSFIuZXJyb3Ipe1xyXG4gICAgICAgICAgICAgYWxlcnQoIFwiXCIreCtcIiA6XCIranFYSFIuZXJyb3JbeF0pO1xyXG4gICAgICAgICAgICAgdGVtcEVycm9ycy5wdXNoKChcIlwiK3grXCIgOlwiK2pxWEhSLmVycm9yW3hdKSk7XHJcbiAgICAgICAgICAgICB9Ki9cclxuICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKGVycm9yVGhyb3duKTtcclxuICAgICAgICAgICAgZXJyb3IudGV4dFN0YXR1cyA9IHRleHRTdGF0dXM7XHJcbiAgICAgICAgICAgIGVycm9yLmpxWEhSID0ganFYSFI7XHJcbiAgICAgICAgICAgIGVycm9yLmVycm9ycyA9IEpTT04ucGFyc2UoanFYSFIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuUmVwb3NpdG9yeS5wcm90b3R5cGUuc3RhcnRDYW1wYWlnbiA9IGZ1bmN0aW9uKGNhbXBhaWduLGFwaXRva2VuKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6IHNlbGYuX3NlcnZlciArIGNhbXBhaWduLFxyXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYXBpdG9rZW5cclxuICAgICAgICB9XHJcbiAgICB9KS5kb25lKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgIC8vIGFsZXJ0KFwiU3VjY2Vzc29BamF4U3RhcnRDYW1wYWlnblwiKTtcclxuICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICB9KS5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcclxuICAgICAgICBhbGVydChcIkZhbGxpdG9BamF4U3RhcnRDYW1wYWlnblwiKTtcclxuICAgICAgICBhbGVydCh0ZXh0U3RhdHVzKTtcclxuICAgICAgICBmb3IgKHZhciB4IGluIGpxWEhSKSB7XHJcbiAgICAgICAgIGFsZXJ0KFwiXCIgKyB4ICsgXCI6XCIgKyBqcVhIUlt4XSk7XHJcbiAgICAgICAgIH0vKlxyXG4gICAgICAgICBmb3IodmFyIHggaW4ganFYSFIuZXJyb3Ipe1xyXG4gICAgICAgICBhbGVydCggXCJcIit4K1wiIDpcIitqcVhIUi5lcnJvclt4XSk7XHJcbiAgICAgICAgIHRlbXBFcnJvcnMucHVzaCgoXCJcIit4K1wiIDpcIitqcVhIUi5lcnJvclt4XSkpO1xyXG4gICAgICAgICB9Ki9cclxuXHJcbiAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKGVycm9yVGhyb3duKTtcclxuICAgICAgICBlcnJvci50ZXh0U3RhdHVzID0gdGV4dFN0YXR1cztcclxuICAgICAgICBlcnJvci5qcVhIUiA9IGpxWEhSO1xyXG4gICAgICAgIGVycm9yLmVycm9ycyA9IEpTT04ucGFyc2UoanFYSFIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgfSk7XHJcbn0pfTtcclxuXHJcblJlcG9zaXRvcnkucHJvdG90eXBlLnRlcm1pbmF0ZUNhbXBhaWduID0gZnVuY3Rpb24oY2FtcGFpZ24sYXBpdG9rZW4pIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBzZWxmLl9zZXJ2ZXIgKyBjYW1wYWlnbixcclxuICAgICAgICAgICAgdHlwZTogJ0RFTEVURScsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYXBpdG9rZW5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgIC8vIGFsZXJ0KFwiU3VjY2Vzc29BamF4VGVybWluYXRlQ2FtcGFpZ25cIik7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJGYWxsaXRvQWpheFRlcm1pbmF0ZUNhbXBhaWduXCIpO1xyXG4gICAgICAgICAgICBhbGVydCh0ZXh0U3RhdHVzKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgeCBpbiBqcVhIUikge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJcIiArIHggKyBcIjpcIiArIGpxWEhSW3hdKTtcclxuICAgICAgICAgICAgfS8qXHJcbiAgICAgICAgICAgICBmb3IodmFyIHggaW4ganFYSFIuZXJyb3Ipe1xyXG4gICAgICAgICAgICAgYWxlcnQoIFwiXCIreCtcIiA6XCIranFYSFIuZXJyb3JbeF0pO1xyXG4gICAgICAgICAgICAgdGVtcEVycm9ycy5wdXNoKChcIlwiK3grXCIgOlwiK2pxWEhSLmVycm9yW3hdKSk7XHJcbiAgICAgICAgICAgICB9Ki9cclxuXHJcbiAgICAgICAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihlcnJvclRocm93bik7XHJcbiAgICAgICAgICAgIGVycm9yLnRleHRTdGF0dXMgPSB0ZXh0U3RhdHVzO1xyXG4gICAgICAgICAgICBlcnJvci5qcVhIUiA9IGpxWEhSO1xyXG4gICAgICAgICAgICBlcnJvci5lcnJvcnMgPSBKU09OLnBhcnNlKGpxWEhSLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KX07XHJcblxyXG4vL2xhIGNyZWF6aW9uZSBkaSB1bmEgbnVvdmEgY2FtcGFnbmEgbGEgc3Bvc3RlcmVpIGluIHVuJ2FsdHJhIGNvbXBvbmVudC9yZXBvc2l0b3J5XHJcblxyXG5leHBvcnRzLlJlcG9zaXRvcnkgPSBSZXBvc2l0b3J5O1xyXG5leHBvcnRzLmNyZWF0ZVJlcG9zaXRvcnkgPSBSZXBvc2l0b3J5O1xyXG5cclxuXHJcbiIsIi8qIEBwcmVzZXJ2ZVxyXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcclxuICogXHJcbiAqIENvcHlyaWdodCAoYykgMjAxMy0yMDE3IFBldGthIEFudG9ub3ZcclxuICogXHJcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcbiAqIFxyXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxyXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuICogXHJcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuICBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiAqIFRIRSBTT0ZUV0FSRS5cclxuICogXHJcbiAqL1xyXG4vKipcclxuICogYmx1ZWJpcmQgYnVpbGQgdmVyc2lvbiAzLjUuMFxyXG4gKiBGZWF0dXJlcyBlbmFibGVkOiBjb3JlLCByYWNlLCBjYWxsX2dldCwgZ2VuZXJhdG9ycywgbWFwLCBub2RlaWZ5LCBwcm9taXNpZnksIHByb3BzLCByZWR1Y2UsIHNldHRsZSwgc29tZSwgdXNpbmcsIHRpbWVycywgZmlsdGVyLCBhbnksIGVhY2hcclxuKi9cclxuIWZ1bmN0aW9uKGUpe2lmKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlKW1vZHVsZS5leHBvcnRzPWUoKTtlbHNlIGlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoW10sZSk7ZWxzZXt2YXIgZjtcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P2Y9d2luZG93OlwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWw/Zj1nbG9iYWw6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGYmJihmPXNlbGYpLGYuUHJvbWlzZT1lKCl9fShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgX2RlcmVxXz09XCJmdW5jdGlvblwiJiZfZGVyZXFfO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiBfZGVyZXFfPT1cImZ1bmN0aW9uXCImJl9kZXJlcV87Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcclxuXCJ1c2Ugc3RyaWN0XCI7XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oUHJvbWlzZSkge1xyXG52YXIgU29tZVByb21pc2VBcnJheSA9IFByb21pc2UuX1NvbWVQcm9taXNlQXJyYXk7XHJcbmZ1bmN0aW9uIGFueShwcm9taXNlcykge1xyXG4gICAgdmFyIHJldCA9IG5ldyBTb21lUHJvbWlzZUFycmF5KHByb21pc2VzKTtcclxuICAgIHZhciBwcm9taXNlID0gcmV0LnByb21pc2UoKTtcclxuICAgIHJldC5zZXRIb3dNYW55KDEpO1xyXG4gICAgcmV0LnNldFVud3JhcCgpO1xyXG4gICAgcmV0LmluaXQoKTtcclxuICAgIHJldHVybiBwcm9taXNlO1xyXG59XHJcblxyXG5Qcm9taXNlLmFueSA9IGZ1bmN0aW9uIChwcm9taXNlcykge1xyXG4gICAgcmV0dXJuIGFueShwcm9taXNlcyk7XHJcbn07XHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZS5hbnkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gYW55KHRoaXMpO1xyXG59O1xyXG5cclxufTtcclxuXHJcbn0se31dLDI6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxudmFyIGZpcnN0TGluZUVycm9yO1xyXG50cnkge3Rocm93IG5ldyBFcnJvcigpOyB9IGNhdGNoIChlKSB7Zmlyc3RMaW5lRXJyb3IgPSBlO31cclxudmFyIHNjaGVkdWxlID0gX2RlcmVxXyhcIi4vc2NoZWR1bGVcIik7XHJcbnZhciBRdWV1ZSA9IF9kZXJlcV8oXCIuL3F1ZXVlXCIpO1xyXG52YXIgdXRpbCA9IF9kZXJlcV8oXCIuL3V0aWxcIik7XHJcblxyXG5mdW5jdGlvbiBBc3luYygpIHtcclxuICAgIHRoaXMuX2N1c3RvbVNjaGVkdWxlciA9IGZhbHNlO1xyXG4gICAgdGhpcy5faXNUaWNrVXNlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5fbGF0ZVF1ZXVlID0gbmV3IFF1ZXVlKDE2KTtcclxuICAgIHRoaXMuX25vcm1hbFF1ZXVlID0gbmV3IFF1ZXVlKDE2KTtcclxuICAgIHRoaXMuX2hhdmVEcmFpbmVkUXVldWVzID0gZmFsc2U7XHJcbiAgICB0aGlzLl90cmFtcG9saW5lRW5hYmxlZCA9IHRydWU7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICB0aGlzLmRyYWluUXVldWVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNlbGYuX2RyYWluUXVldWVzKCk7XHJcbiAgICB9O1xyXG4gICAgdGhpcy5fc2NoZWR1bGUgPSBzY2hlZHVsZTtcclxufVxyXG5cclxuQXN5bmMucHJvdG90eXBlLnNldFNjaGVkdWxlciA9IGZ1bmN0aW9uKGZuKSB7XHJcbiAgICB2YXIgcHJldiA9IHRoaXMuX3NjaGVkdWxlO1xyXG4gICAgdGhpcy5fc2NoZWR1bGUgPSBmbjtcclxuICAgIHRoaXMuX2N1c3RvbVNjaGVkdWxlciA9IHRydWU7XHJcbiAgICByZXR1cm4gcHJldjtcclxufTtcclxuXHJcbkFzeW5jLnByb3RvdHlwZS5oYXNDdXN0b21TY2hlZHVsZXIgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLl9jdXN0b21TY2hlZHVsZXI7XHJcbn07XHJcblxyXG5Bc3luYy5wcm90b3R5cGUuZW5hYmxlVHJhbXBvbGluZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5fdHJhbXBvbGluZUVuYWJsZWQgPSB0cnVlO1xyXG59O1xyXG5cclxuQXN5bmMucHJvdG90eXBlLmRpc2FibGVUcmFtcG9saW5lSWZOZWNlc3NhcnkgPSBmdW5jdGlvbigpIHtcclxuICAgIGlmICh1dGlsLmhhc0RldlRvb2xzKSB7XHJcbiAgICAgICAgdGhpcy5fdHJhbXBvbGluZUVuYWJsZWQgPSBmYWxzZTtcclxuICAgIH1cclxufTtcclxuXHJcbkFzeW5jLnByb3RvdHlwZS5oYXZlSXRlbXNRdWV1ZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faXNUaWNrVXNlZCB8fCB0aGlzLl9oYXZlRHJhaW5lZFF1ZXVlcztcclxufTtcclxuXHJcblxyXG5Bc3luYy5wcm90b3R5cGUuZmF0YWxFcnJvciA9IGZ1bmN0aW9uKGUsIGlzTm9kZSkge1xyXG4gICAgaWYgKGlzTm9kZSkge1xyXG4gICAgICAgIHByb2Nlc3Muc3RkZXJyLndyaXRlKFwiRmF0YWwgXCIgKyAoZSBpbnN0YW5jZW9mIEVycm9yID8gZS5zdGFjayA6IGUpICtcclxuICAgICAgICAgICAgXCJcXG5cIik7XHJcbiAgICAgICAgcHJvY2Vzcy5leGl0KDIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnRocm93TGF0ZXIoZSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5Bc3luYy5wcm90b3R5cGUudGhyb3dMYXRlciA9IGZ1bmN0aW9uKGZuLCBhcmcpIHtcclxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgYXJnID0gZm47XHJcbiAgICAgICAgZm4gPSBmdW5jdGlvbiAoKSB7IHRocm93IGFyZzsgfTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGZuKGFyZyk7XHJcbiAgICAgICAgfSwgMCk7XHJcbiAgICB9IGVsc2UgdHJ5IHtcclxuICAgICAgICB0aGlzLl9zY2hlZHVsZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZm4oYXJnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBhc3luYyBzY2hlZHVsZXIgYXZhaWxhYmxlXFx1MDAwYVxcdTAwMGEgICAgU2VlIGh0dHA6Ly9nb28uZ2wvTXFyRm1YXFx1MDAwYVwiKTtcclxuICAgIH1cclxufTtcclxuXHJcbmZ1bmN0aW9uIEFzeW5jSW52b2tlTGF0ZXIoZm4sIHJlY2VpdmVyLCBhcmcpIHtcclxuICAgIHRoaXMuX2xhdGVRdWV1ZS5wdXNoKGZuLCByZWNlaXZlciwgYXJnKTtcclxuICAgIHRoaXMuX3F1ZXVlVGljaygpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBBc3luY0ludm9rZShmbiwgcmVjZWl2ZXIsIGFyZykge1xyXG4gICAgdGhpcy5fbm9ybWFsUXVldWUucHVzaChmbiwgcmVjZWl2ZXIsIGFyZyk7XHJcbiAgICB0aGlzLl9xdWV1ZVRpY2soKTtcclxufVxyXG5cclxuZnVuY3Rpb24gQXN5bmNTZXR0bGVQcm9taXNlcyhwcm9taXNlKSB7XHJcbiAgICB0aGlzLl9ub3JtYWxRdWV1ZS5fcHVzaE9uZShwcm9taXNlKTtcclxuICAgIHRoaXMuX3F1ZXVlVGljaygpO1xyXG59XHJcblxyXG5pZiAoIXV0aWwuaGFzRGV2VG9vbHMpIHtcclxuICAgIEFzeW5jLnByb3RvdHlwZS5pbnZva2VMYXRlciA9IEFzeW5jSW52b2tlTGF0ZXI7XHJcbiAgICBBc3luYy5wcm90b3R5cGUuaW52b2tlID0gQXN5bmNJbnZva2U7XHJcbiAgICBBc3luYy5wcm90b3R5cGUuc2V0dGxlUHJvbWlzZXMgPSBBc3luY1NldHRsZVByb21pc2VzO1xyXG59IGVsc2Uge1xyXG4gICAgQXN5bmMucHJvdG90eXBlLmludm9rZUxhdGVyID0gZnVuY3Rpb24gKGZuLCByZWNlaXZlciwgYXJnKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3RyYW1wb2xpbmVFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIEFzeW5jSW52b2tlTGF0ZXIuY2FsbCh0aGlzLCBmbiwgcmVjZWl2ZXIsIGFyZyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fc2NoZWR1bGUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZuLmNhbGwocmVjZWl2ZXIsIGFyZyk7XHJcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIEFzeW5jLnByb3RvdHlwZS5pbnZva2UgPSBmdW5jdGlvbiAoZm4sIHJlY2VpdmVyLCBhcmcpIHtcclxuICAgICAgICBpZiAodGhpcy5fdHJhbXBvbGluZUVuYWJsZWQpIHtcclxuICAgICAgICAgICAgQXN5bmNJbnZva2UuY2FsbCh0aGlzLCBmbiwgcmVjZWl2ZXIsIGFyZyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fc2NoZWR1bGUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBmbi5jYWxsKHJlY2VpdmVyLCBhcmcpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIEFzeW5jLnByb3RvdHlwZS5zZXR0bGVQcm9taXNlcyA9IGZ1bmN0aW9uKHByb21pc2UpIHtcclxuICAgICAgICBpZiAodGhpcy5fdHJhbXBvbGluZUVuYWJsZWQpIHtcclxuICAgICAgICAgICAgQXN5bmNTZXR0bGVQcm9taXNlcy5jYWxsKHRoaXMsIHByb21pc2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NjaGVkdWxlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcHJvbWlzZS5fc2V0dGxlUHJvbWlzZXMoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuQXN5bmMucHJvdG90eXBlLl9kcmFpblF1ZXVlID0gZnVuY3Rpb24ocXVldWUpIHtcclxuICAgIHdoaWxlIChxdWV1ZS5sZW5ndGgoKSA+IDApIHtcclxuICAgICAgICB2YXIgZm4gPSBxdWV1ZS5zaGlmdCgpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgZm4gIT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICBmbi5fc2V0dGxlUHJvbWlzZXMoKTtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByZWNlaXZlciA9IHF1ZXVlLnNoaWZ0KCk7XHJcbiAgICAgICAgdmFyIGFyZyA9IHF1ZXVlLnNoaWZ0KCk7XHJcbiAgICAgICAgZm4uY2FsbChyZWNlaXZlciwgYXJnKTtcclxuICAgIH1cclxufTtcclxuXHJcbkFzeW5jLnByb3RvdHlwZS5fZHJhaW5RdWV1ZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLl9kcmFpblF1ZXVlKHRoaXMuX25vcm1hbFF1ZXVlKTtcclxuICAgIHRoaXMuX3Jlc2V0KCk7XHJcbiAgICB0aGlzLl9oYXZlRHJhaW5lZFF1ZXVlcyA9IHRydWU7XHJcbiAgICB0aGlzLl9kcmFpblF1ZXVlKHRoaXMuX2xhdGVRdWV1ZSk7XHJcbn07XHJcblxyXG5Bc3luYy5wcm90b3R5cGUuX3F1ZXVlVGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy5faXNUaWNrVXNlZCkge1xyXG4gICAgICAgIHRoaXMuX2lzVGlja1VzZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX3NjaGVkdWxlKHRoaXMuZHJhaW5RdWV1ZXMpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuQXN5bmMucHJvdG90eXBlLl9yZXNldCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuX2lzVGlja1VzZWQgPSBmYWxzZTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQXN5bmM7XHJcbm1vZHVsZS5leHBvcnRzLmZpcnN0TGluZUVycm9yID0gZmlyc3RMaW5lRXJyb3I7XHJcblxyXG59LHtcIi4vcXVldWVcIjoyNixcIi4vc2NoZWR1bGVcIjoyOSxcIi4vdXRpbFwiOjM2fV0sMzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFByb21pc2UsIElOVEVSTkFMLCB0cnlDb252ZXJ0VG9Qcm9taXNlLCBkZWJ1Zykge1xyXG52YXIgY2FsbGVkQmluZCA9IGZhbHNlO1xyXG52YXIgcmVqZWN0VGhpcyA9IGZ1bmN0aW9uKF8sIGUpIHtcclxuICAgIHRoaXMuX3JlamVjdChlKTtcclxufTtcclxuXHJcbnZhciB0YXJnZXRSZWplY3RlZCA9IGZ1bmN0aW9uKGUsIGNvbnRleHQpIHtcclxuICAgIGNvbnRleHQucHJvbWlzZVJlamVjdGlvblF1ZXVlZCA9IHRydWU7XHJcbiAgICBjb250ZXh0LmJpbmRpbmdQcm9taXNlLl90aGVuKHJlamVjdFRoaXMsIHJlamVjdFRoaXMsIG51bGwsIHRoaXMsIGUpO1xyXG59O1xyXG5cclxudmFyIGJpbmRpbmdSZXNvbHZlZCA9IGZ1bmN0aW9uKHRoaXNBcmcsIGNvbnRleHQpIHtcclxuICAgIGlmICgoKHRoaXMuX2JpdEZpZWxkICYgNTAzOTcxODQpID09PSAwKSkge1xyXG4gICAgICAgIHRoaXMuX3Jlc29sdmVDYWxsYmFjayhjb250ZXh0LnRhcmdldCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG52YXIgYmluZGluZ1JlamVjdGVkID0gZnVuY3Rpb24oZSwgY29udGV4dCkge1xyXG4gICAgaWYgKCFjb250ZXh0LnByb21pc2VSZWplY3Rpb25RdWV1ZWQpIHRoaXMuX3JlamVjdChlKTtcclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAodGhpc0FyZykge1xyXG4gICAgaWYgKCFjYWxsZWRCaW5kKSB7XHJcbiAgICAgICAgY2FsbGVkQmluZCA9IHRydWU7XHJcbiAgICAgICAgUHJvbWlzZS5wcm90b3R5cGUuX3Byb3BhZ2F0ZUZyb20gPSBkZWJ1Zy5wcm9wYWdhdGVGcm9tRnVuY3Rpb24oKTtcclxuICAgICAgICBQcm9taXNlLnByb3RvdHlwZS5fYm91bmRWYWx1ZSA9IGRlYnVnLmJvdW5kVmFsdWVGdW5jdGlvbigpO1xyXG4gICAgfVxyXG4gICAgdmFyIG1heWJlUHJvbWlzZSA9IHRyeUNvbnZlcnRUb1Byb21pc2UodGhpc0FyZyk7XHJcbiAgICB2YXIgcmV0ID0gbmV3IFByb21pc2UoSU5URVJOQUwpO1xyXG4gICAgcmV0Ll9wcm9wYWdhdGVGcm9tKHRoaXMsIDEpO1xyXG4gICAgdmFyIHRhcmdldCA9IHRoaXMuX3RhcmdldCgpO1xyXG4gICAgcmV0Ll9zZXRCb3VuZFRvKG1heWJlUHJvbWlzZSk7XHJcbiAgICBpZiAobWF5YmVQcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xyXG4gICAgICAgIHZhciBjb250ZXh0ID0ge1xyXG4gICAgICAgICAgICBwcm9taXNlUmVqZWN0aW9uUXVldWVkOiBmYWxzZSxcclxuICAgICAgICAgICAgcHJvbWlzZTogcmV0LFxyXG4gICAgICAgICAgICB0YXJnZXQ6IHRhcmdldCxcclxuICAgICAgICAgICAgYmluZGluZ1Byb21pc2U6IG1heWJlUHJvbWlzZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGFyZ2V0Ll90aGVuKElOVEVSTkFMLCB0YXJnZXRSZWplY3RlZCwgdW5kZWZpbmVkLCByZXQsIGNvbnRleHQpO1xyXG4gICAgICAgIG1heWJlUHJvbWlzZS5fdGhlbihcclxuICAgICAgICAgICAgYmluZGluZ1Jlc29sdmVkLCBiaW5kaW5nUmVqZWN0ZWQsIHVuZGVmaW5lZCwgcmV0LCBjb250ZXh0KTtcclxuICAgICAgICByZXQuX3NldE9uQ2FuY2VsKG1heWJlUHJvbWlzZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldC5fcmVzb2x2ZUNhbGxiYWNrKHRhcmdldCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0O1xyXG59O1xyXG5cclxuUHJvbWlzZS5wcm90b3R5cGUuX3NldEJvdW5kVG8gPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICBpZiAob2JqICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLl9iaXRGaWVsZCA9IHRoaXMuX2JpdEZpZWxkIHwgMjA5NzE1MjtcclxuICAgICAgICB0aGlzLl9ib3VuZFRvID0gb2JqO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9iaXRGaWVsZCA9IHRoaXMuX2JpdEZpZWxkICYgKH4yMDk3MTUyKTtcclxuICAgIH1cclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLl9pc0JvdW5kID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuICh0aGlzLl9iaXRGaWVsZCAmIDIwOTcxNTIpID09PSAyMDk3MTUyO1xyXG59O1xyXG5cclxuUHJvbWlzZS5iaW5kID0gZnVuY3Rpb24gKHRoaXNBcmcsIHZhbHVlKSB7XHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS5iaW5kKHRoaXNBcmcpO1xyXG59O1xyXG59O1xyXG5cclxufSx7fV0sNDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG52YXIgb2xkO1xyXG5pZiAodHlwZW9mIFByb21pc2UgIT09IFwidW5kZWZpbmVkXCIpIG9sZCA9IFByb21pc2U7XHJcbmZ1bmN0aW9uIG5vQ29uZmxpY3QoKSB7XHJcbiAgICB0cnkgeyBpZiAoUHJvbWlzZSA9PT0gYmx1ZWJpcmQpIFByb21pc2UgPSBvbGQ7IH1cclxuICAgIGNhdGNoIChlKSB7fVxyXG4gICAgcmV0dXJuIGJsdWViaXJkO1xyXG59XHJcbnZhciBibHVlYmlyZCA9IF9kZXJlcV8oXCIuL3Byb21pc2VcIikoKTtcclxuYmx1ZWJpcmQubm9Db25mbGljdCA9IG5vQ29uZmxpY3Q7XHJcbm1vZHVsZS5leHBvcnRzID0gYmx1ZWJpcmQ7XHJcblxyXG59LHtcIi4vcHJvbWlzZVwiOjIyfV0sNTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG52YXIgY3IgPSBPYmplY3QuY3JlYXRlO1xyXG5pZiAoY3IpIHtcclxuICAgIHZhciBjYWxsZXJDYWNoZSA9IGNyKG51bGwpO1xyXG4gICAgdmFyIGdldHRlckNhY2hlID0gY3IobnVsbCk7XHJcbiAgICBjYWxsZXJDYWNoZVtcIiBzaXplXCJdID0gZ2V0dGVyQ2FjaGVbXCIgc2l6ZVwiXSA9IDA7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oUHJvbWlzZSkge1xyXG52YXIgdXRpbCA9IF9kZXJlcV8oXCIuL3V0aWxcIik7XHJcbnZhciBjYW5FdmFsdWF0ZSA9IHV0aWwuY2FuRXZhbHVhdGU7XHJcbnZhciBpc0lkZW50aWZpZXIgPSB1dGlsLmlzSWRlbnRpZmllcjtcclxuXHJcbnZhciBnZXRNZXRob2RDYWxsZXI7XHJcbnZhciBnZXRHZXR0ZXI7XHJcbmlmICghdHJ1ZSkge1xyXG52YXIgbWFrZU1ldGhvZENhbGxlciA9IGZ1bmN0aW9uIChtZXRob2ROYW1lKSB7XHJcbiAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKFwiZW5zdXJlTWV0aG9kXCIsIFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24ob2JqKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxyXG4gICAgICAgICAgICAndXNlIHN0cmljdCcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXHJcbiAgICAgICAgICAgIHZhciBsZW4gPSB0aGlzLmxlbmd0aDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcclxuICAgICAgICAgICAgZW5zdXJlTWV0aG9kKG9iaiwgJ21ldGhvZE5hbWUnKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxyXG4gICAgICAgICAgICBzd2l0Y2gobGVuKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBvYmoubWV0aG9kTmFtZSh0aGlzWzBdKTsgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcclxuICAgICAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIG9iai5tZXRob2ROYW1lKHRoaXNbMF0sIHRoaXNbMV0pOyAgICAgICAgICAgICBcXG5cXFxyXG4gICAgICAgICAgICAgICAgY2FzZSAzOiByZXR1cm4gb2JqLm1ldGhvZE5hbWUodGhpc1swXSwgdGhpc1sxXSwgdGhpc1syXSk7ICAgIFxcblxcXHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBvYmoubWV0aG9kTmFtZSgpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmoubWV0aG9kTmFtZS5hcHBseShvYmosIHRoaXMpOyAgICAgICAgICAgICAgICAgIFxcblxcXHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcclxuICAgICAgICB9OyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxyXG4gICAgICAgIFwiLnJlcGxhY2UoL21ldGhvZE5hbWUvZywgbWV0aG9kTmFtZSkpKGVuc3VyZU1ldGhvZCk7XHJcbn07XHJcblxyXG52YXIgbWFrZUdldHRlciA9IGZ1bmN0aW9uIChwcm9wZXJ0eU5hbWUpIHtcclxuICAgIHJldHVybiBuZXcgRnVuY3Rpb24oXCJvYmpcIiwgXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxyXG4gICAgICAgICd1c2Ugc3RyaWN0JzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXHJcbiAgICAgICAgcmV0dXJuIG9iai5wcm9wZXJ0eU5hbWU7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcclxuICAgICAgICBcIi5yZXBsYWNlKFwicHJvcGVydHlOYW1lXCIsIHByb3BlcnR5TmFtZSkpO1xyXG59O1xyXG5cclxudmFyIGdldENvbXBpbGVkID0gZnVuY3Rpb24obmFtZSwgY29tcGlsZXIsIGNhY2hlKSB7XHJcbiAgICB2YXIgcmV0ID0gY2FjaGVbbmFtZV07XHJcbiAgICBpZiAodHlwZW9mIHJldCAhPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgaWYgKCFpc0lkZW50aWZpZXIobmFtZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldCA9IGNvbXBpbGVyKG5hbWUpO1xyXG4gICAgICAgIGNhY2hlW25hbWVdID0gcmV0O1xyXG4gICAgICAgIGNhY2hlW1wiIHNpemVcIl0rKztcclxuICAgICAgICBpZiAoY2FjaGVbXCIgc2l6ZVwiXSA+IDUxMikge1xyXG4gICAgICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGNhY2hlKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkgZGVsZXRlIGNhY2hlW2tleXNbaV1dO1xyXG4gICAgICAgICAgICBjYWNoZVtcIiBzaXplXCJdID0ga2V5cy5sZW5ndGggLSAyNTY7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJldDtcclxufTtcclxuXHJcbmdldE1ldGhvZENhbGxlciA9IGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgIHJldHVybiBnZXRDb21waWxlZChuYW1lLCBtYWtlTWV0aG9kQ2FsbGVyLCBjYWxsZXJDYWNoZSk7XHJcbn07XHJcblxyXG5nZXRHZXR0ZXIgPSBmdW5jdGlvbihuYW1lKSB7XHJcbiAgICByZXR1cm4gZ2V0Q29tcGlsZWQobmFtZSwgbWFrZUdldHRlciwgZ2V0dGVyQ2FjaGUpO1xyXG59O1xyXG59XHJcblxyXG5mdW5jdGlvbiBlbnN1cmVNZXRob2Qob2JqLCBtZXRob2ROYW1lKSB7XHJcbiAgICB2YXIgZm47XHJcbiAgICBpZiAob2JqICE9IG51bGwpIGZuID0gb2JqW21ldGhvZE5hbWVdO1xyXG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBcIk9iamVjdCBcIiArIHV0aWwuY2xhc3NTdHJpbmcob2JqKSArIFwiIGhhcyBubyBtZXRob2QgJ1wiICtcclxuICAgICAgICAgICAgdXRpbC50b1N0cmluZyhtZXRob2ROYW1lKSArIFwiJ1wiO1xyXG4gICAgICAgIHRocm93IG5ldyBQcm9taXNlLlR5cGVFcnJvcihtZXNzYWdlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmbjtcclxufVxyXG5cclxuZnVuY3Rpb24gY2FsbGVyKG9iaikge1xyXG4gICAgdmFyIG1ldGhvZE5hbWUgPSB0aGlzLnBvcCgpO1xyXG4gICAgdmFyIGZuID0gZW5zdXJlTWV0aG9kKG9iaiwgbWV0aG9kTmFtZSk7XHJcbiAgICByZXR1cm4gZm4uYXBwbHkob2JqLCB0aGlzKTtcclxufVxyXG5Qcm9taXNlLnByb3RvdHlwZS5jYWxsID0gZnVuY3Rpb24gKG1ldGhvZE5hbWUpIHtcclxuICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpOztcclxuICAgIGlmICghdHJ1ZSkge1xyXG4gICAgICAgIGlmIChjYW5FdmFsdWF0ZSkge1xyXG4gICAgICAgICAgICB2YXIgbWF5YmVDYWxsZXIgPSBnZXRNZXRob2RDYWxsZXIobWV0aG9kTmFtZSk7XHJcbiAgICAgICAgICAgIGlmIChtYXliZUNhbGxlciAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgbWF5YmVDYWxsZXIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBhcmdzLCB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYXJncy5wdXNoKG1ldGhvZE5hbWUpO1xyXG4gICAgcmV0dXJuIHRoaXMuX3RoZW4oY2FsbGVyLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgYXJncywgdW5kZWZpbmVkKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIG5hbWVkR2V0dGVyKG9iaikge1xyXG4gICAgcmV0dXJuIG9ialt0aGlzXTtcclxufVxyXG5mdW5jdGlvbiBpbmRleGVkR2V0dGVyKG9iaikge1xyXG4gICAgdmFyIGluZGV4ID0gK3RoaXM7XHJcbiAgICBpZiAoaW5kZXggPCAwKSBpbmRleCA9IE1hdGgubWF4KDAsIGluZGV4ICsgb2JqLmxlbmd0aCk7XHJcbiAgICByZXR1cm4gb2JqW2luZGV4XTtcclxufVxyXG5Qcm9taXNlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAocHJvcGVydHlOYW1lKSB7XHJcbiAgICB2YXIgaXNJbmRleCA9ICh0eXBlb2YgcHJvcGVydHlOYW1lID09PSBcIm51bWJlclwiKTtcclxuICAgIHZhciBnZXR0ZXI7XHJcbiAgICBpZiAoIWlzSW5kZXgpIHtcclxuICAgICAgICBpZiAoY2FuRXZhbHVhdGUpIHtcclxuICAgICAgICAgICAgdmFyIG1heWJlR2V0dGVyID0gZ2V0R2V0dGVyKHByb3BlcnR5TmFtZSk7XHJcbiAgICAgICAgICAgIGdldHRlciA9IG1heWJlR2V0dGVyICE9PSBudWxsID8gbWF5YmVHZXR0ZXIgOiBuYW1lZEdldHRlcjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnZXR0ZXIgPSBuYW1lZEdldHRlcjtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGdldHRlciA9IGluZGV4ZWRHZXR0ZXI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5fdGhlbihnZXR0ZXIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBwcm9wZXJ0eU5hbWUsIHVuZGVmaW5lZCk7XHJcbn07XHJcbn07XHJcblxyXG59LHtcIi4vdXRpbFwiOjM2fV0sNjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFByb21pc2UsIFByb21pc2VBcnJheSwgYXBpUmVqZWN0aW9uLCBkZWJ1Zykge1xyXG52YXIgdXRpbCA9IF9kZXJlcV8oXCIuL3V0aWxcIik7XHJcbnZhciB0cnlDYXRjaCA9IHV0aWwudHJ5Q2F0Y2g7XHJcbnZhciBlcnJvck9iaiA9IHV0aWwuZXJyb3JPYmo7XHJcbnZhciBhc3luYyA9IFByb21pc2UuX2FzeW5jO1xyXG5cclxuUHJvbWlzZS5wcm90b3R5cGVbXCJicmVha1wiXSA9IFByb21pc2UucHJvdG90eXBlLmNhbmNlbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKCFkZWJ1Zy5jYW5jZWxsYXRpb24oKSkgcmV0dXJuIHRoaXMuX3dhcm4oXCJjYW5jZWxsYXRpb24gaXMgZGlzYWJsZWRcIik7XHJcblxyXG4gICAgdmFyIHByb21pc2UgPSB0aGlzO1xyXG4gICAgdmFyIGNoaWxkID0gcHJvbWlzZTtcclxuICAgIHdoaWxlIChwcm9taXNlLl9pc0NhbmNlbGxhYmxlKCkpIHtcclxuICAgICAgICBpZiAoIXByb21pc2UuX2NhbmNlbEJ5KGNoaWxkKSkge1xyXG4gICAgICAgICAgICBpZiAoY2hpbGQuX2lzRm9sbG93aW5nKCkpIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkLl9mb2xsb3dlZSgpLmNhbmNlbCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2hpbGQuX2NhbmNlbEJyYW5jaGVkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgcGFyZW50ID0gcHJvbWlzZS5fY2FuY2VsbGF0aW9uUGFyZW50O1xyXG4gICAgICAgIGlmIChwYXJlbnQgPT0gbnVsbCB8fCAhcGFyZW50Ll9pc0NhbmNlbGxhYmxlKCkpIHtcclxuICAgICAgICAgICAgaWYgKHByb21pc2UuX2lzRm9sbG93aW5nKCkpIHtcclxuICAgICAgICAgICAgICAgIHByb21pc2UuX2ZvbGxvd2VlKCkuY2FuY2VsKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlLl9jYW5jZWxCcmFuY2hlZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChwcm9taXNlLl9pc0ZvbGxvd2luZygpKSBwcm9taXNlLl9mb2xsb3dlZSgpLmNhbmNlbCgpO1xyXG4gICAgICAgICAgICBwcm9taXNlLl9zZXRXaWxsQmVDYW5jZWxsZWQoKTtcclxuICAgICAgICAgICAgY2hpbGQgPSBwcm9taXNlO1xyXG4gICAgICAgICAgICBwcm9taXNlID0gcGFyZW50O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLl9icmFuY2hIYXNDYW5jZWxsZWQgPSBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuX2JyYW5jaGVzUmVtYWluaW5nVG9DYW5jZWwtLTtcclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLl9lbm91Z2hCcmFuY2hlc0hhdmVDYW5jZWxsZWQgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLl9icmFuY2hlc1JlbWFpbmluZ1RvQ2FuY2VsID09PSB1bmRlZmluZWQgfHxcclxuICAgICAgICAgICB0aGlzLl9icmFuY2hlc1JlbWFpbmluZ1RvQ2FuY2VsIDw9IDA7XHJcbn07XHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZS5fY2FuY2VsQnkgPSBmdW5jdGlvbihjYW5jZWxsZXIpIHtcclxuICAgIGlmIChjYW5jZWxsZXIgPT09IHRoaXMpIHtcclxuICAgICAgICB0aGlzLl9icmFuY2hlc1JlbWFpbmluZ1RvQ2FuY2VsID0gMDtcclxuICAgICAgICB0aGlzLl9pbnZva2VPbkNhbmNlbCgpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9icmFuY2hIYXNDYW5jZWxsZWQoKTtcclxuICAgICAgICBpZiAodGhpcy5fZW5vdWdoQnJhbmNoZXNIYXZlQ2FuY2VsbGVkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5faW52b2tlT25DYW5jZWwoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuUHJvbWlzZS5wcm90b3R5cGUuX2NhbmNlbEJyYW5jaGVkID0gZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAodGhpcy5fZW5vdWdoQnJhbmNoZXNIYXZlQ2FuY2VsbGVkKCkpIHtcclxuICAgICAgICB0aGlzLl9jYW5jZWwoKTtcclxuICAgIH1cclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLl9jYW5jZWwgPSBmdW5jdGlvbigpIHtcclxuICAgIGlmICghdGhpcy5faXNDYW5jZWxsYWJsZSgpKSByZXR1cm47XHJcbiAgICB0aGlzLl9zZXRDYW5jZWxsZWQoKTtcclxuICAgIGFzeW5jLmludm9rZSh0aGlzLl9jYW5jZWxQcm9taXNlcywgdGhpcywgdW5kZWZpbmVkKTtcclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLl9jYW5jZWxQcm9taXNlcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMuX2xlbmd0aCgpID4gMCkgdGhpcy5fc2V0dGxlUHJvbWlzZXMoKTtcclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLl91bnNldE9uQ2FuY2VsID0gZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLl9vbkNhbmNlbEZpZWxkID0gdW5kZWZpbmVkO1xyXG59O1xyXG5cclxuUHJvbWlzZS5wcm90b3R5cGUuX2lzQ2FuY2VsbGFibGUgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLmlzUGVuZGluZygpICYmICF0aGlzLl9pc0NhbmNlbGxlZCgpO1xyXG59O1xyXG5cclxuUHJvbWlzZS5wcm90b3R5cGUuaXNDYW5jZWxsYWJsZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaXNQZW5kaW5nKCkgJiYgIXRoaXMuaXNDYW5jZWxsZWQoKTtcclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLl9kb0ludm9rZU9uQ2FuY2VsID0gZnVuY3Rpb24ob25DYW5jZWxDYWxsYmFjaywgaW50ZXJuYWxPbmx5KSB7XHJcbiAgICBpZiAodXRpbC5pc0FycmF5KG9uQ2FuY2VsQ2FsbGJhY2spKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvbkNhbmNlbENhbGxiYWNrLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RvSW52b2tlT25DYW5jZWwob25DYW5jZWxDYWxsYmFja1tpXSwgaW50ZXJuYWxPbmx5KTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKG9uQ2FuY2VsQ2FsbGJhY2sgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb25DYW5jZWxDYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgIGlmICghaW50ZXJuYWxPbmx5KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZSA9IHRyeUNhdGNoKG9uQ2FuY2VsQ2FsbGJhY2spLmNhbGwodGhpcy5fYm91bmRWYWx1ZSgpKTtcclxuICAgICAgICAgICAgICAgIGlmIChlID09PSBlcnJvck9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2F0dGFjaEV4dHJhVHJhY2UoZS5lKTtcclxuICAgICAgICAgICAgICAgICAgICBhc3luYy50aHJvd0xhdGVyKGUuZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBvbkNhbmNlbENhbGxiYWNrLl9yZXN1bHRDYW5jZWxsZWQodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuUHJvbWlzZS5wcm90b3R5cGUuX2ludm9rZU9uQ2FuY2VsID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgb25DYW5jZWxDYWxsYmFjayA9IHRoaXMuX29uQ2FuY2VsKCk7XHJcbiAgICB0aGlzLl91bnNldE9uQ2FuY2VsKCk7XHJcbiAgICBhc3luYy5pbnZva2UodGhpcy5fZG9JbnZva2VPbkNhbmNlbCwgdGhpcywgb25DYW5jZWxDYWxsYmFjayk7XHJcbn07XHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZS5faW52b2tlSW50ZXJuYWxPbkNhbmNlbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMuX2lzQ2FuY2VsbGFibGUoKSkge1xyXG4gICAgICAgIHRoaXMuX2RvSW52b2tlT25DYW5jZWwodGhpcy5fb25DYW5jZWwoKSwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5fdW5zZXRPbkNhbmNlbCgpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuUHJvbWlzZS5wcm90b3R5cGUuX3Jlc3VsdENhbmNlbGxlZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5jYW5jZWwoKTtcclxufTtcclxuXHJcbn07XHJcblxyXG59LHtcIi4vdXRpbFwiOjM2fV0sNzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE5FWFRfRklMVEVSKSB7XHJcbnZhciB1dGlsID0gX2RlcmVxXyhcIi4vdXRpbFwiKTtcclxudmFyIGdldEtleXMgPSBfZGVyZXFfKFwiLi9lczVcIikua2V5cztcclxudmFyIHRyeUNhdGNoID0gdXRpbC50cnlDYXRjaDtcclxudmFyIGVycm9yT2JqID0gdXRpbC5lcnJvck9iajtcclxuXHJcbmZ1bmN0aW9uIGNhdGNoRmlsdGVyKGluc3RhbmNlcywgY2IsIHByb21pc2UpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgdmFyIGJvdW5kVG8gPSBwcm9taXNlLl9ib3VuZFZhbHVlKCk7XHJcbiAgICAgICAgcHJlZGljYXRlTG9vcDogZm9yICh2YXIgaSA9IDA7IGkgPCBpbnN0YW5jZXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgdmFyIGl0ZW0gPSBpbnN0YW5jZXNbaV07XHJcblxyXG4gICAgICAgICAgICBpZiAoaXRlbSA9PT0gRXJyb3IgfHxcclxuICAgICAgICAgICAgICAgIChpdGVtICE9IG51bGwgJiYgaXRlbS5wcm90b3R5cGUgaW5zdGFuY2VvZiBFcnJvcikpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlIGluc3RhbmNlb2YgaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnlDYXRjaChjYikuY2FsbChib3VuZFRvLCBlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaXRlbSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWF0Y2hlc1ByZWRpY2F0ZSA9IHRyeUNhdGNoKGl0ZW0pLmNhbGwoYm91bmRUbywgZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hlc1ByZWRpY2F0ZSA9PT0gZXJyb3JPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hlc1ByZWRpY2F0ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hlc1ByZWRpY2F0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnlDYXRjaChjYikuY2FsbChib3VuZFRvLCBlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmICh1dGlsLmlzT2JqZWN0KGUpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIga2V5cyA9IGdldEtleXMoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGtleXMubGVuZ3RoOyArK2opIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIga2V5ID0ga2V5c1tqXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbVtrZXldICE9IGVba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZSBwcmVkaWNhdGVMb29wO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnlDYXRjaChjYikuY2FsbChib3VuZFRvLCBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gTkVYVF9GSUxURVI7XHJcbiAgICB9O1xyXG59XHJcblxyXG5yZXR1cm4gY2F0Y2hGaWx0ZXI7XHJcbn07XHJcblxyXG59LHtcIi4vZXM1XCI6MTMsXCIuL3V0aWxcIjozNn1dLDg6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihQcm9taXNlKSB7XHJcbnZhciBsb25nU3RhY2tUcmFjZXMgPSBmYWxzZTtcclxudmFyIGNvbnRleHRTdGFjayA9IFtdO1xyXG5cclxuUHJvbWlzZS5wcm90b3R5cGUuX3Byb21pc2VDcmVhdGVkID0gZnVuY3Rpb24oKSB7fTtcclxuUHJvbWlzZS5wcm90b3R5cGUuX3B1c2hDb250ZXh0ID0gZnVuY3Rpb24oKSB7fTtcclxuUHJvbWlzZS5wcm90b3R5cGUuX3BvcENvbnRleHQgPSBmdW5jdGlvbigpIHtyZXR1cm4gbnVsbDt9O1xyXG5Qcm9taXNlLl9wZWVrQ29udGV4dCA9IFByb21pc2UucHJvdG90eXBlLl9wZWVrQ29udGV4dCA9IGZ1bmN0aW9uKCkge307XHJcblxyXG5mdW5jdGlvbiBDb250ZXh0KCkge1xyXG4gICAgdGhpcy5fdHJhY2UgPSBuZXcgQ29udGV4dC5DYXB0dXJlZFRyYWNlKHBlZWtDb250ZXh0KCkpO1xyXG59XHJcbkNvbnRleHQucHJvdG90eXBlLl9wdXNoQ29udGV4dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLl90cmFjZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5fdHJhY2UuX3Byb21pc2VDcmVhdGVkID0gbnVsbDtcclxuICAgICAgICBjb250ZXh0U3RhY2sucHVzaCh0aGlzLl90cmFjZSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5Db250ZXh0LnByb3RvdHlwZS5fcG9wQ29udGV4dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLl90cmFjZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdmFyIHRyYWNlID0gY29udGV4dFN0YWNrLnBvcCgpO1xyXG4gICAgICAgIHZhciByZXQgPSB0cmFjZS5fcHJvbWlzZUNyZWF0ZWQ7XHJcbiAgICAgICAgdHJhY2UuX3Byb21pc2VDcmVhdGVkID0gbnVsbDtcclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVDb250ZXh0KCkge1xyXG4gICAgaWYgKGxvbmdTdGFja1RyYWNlcykgcmV0dXJuIG5ldyBDb250ZXh0KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBlZWtDb250ZXh0KCkge1xyXG4gICAgdmFyIGxhc3RJbmRleCA9IGNvbnRleHRTdGFjay5sZW5ndGggLSAxO1xyXG4gICAgaWYgKGxhc3RJbmRleCA+PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRleHRTdGFja1tsYXN0SW5kZXhdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxufVxyXG5Db250ZXh0LkNhcHR1cmVkVHJhY2UgPSBudWxsO1xyXG5Db250ZXh0LmNyZWF0ZSA9IGNyZWF0ZUNvbnRleHQ7XHJcbkNvbnRleHQuZGVhY3RpdmF0ZUxvbmdTdGFja1RyYWNlcyA9IGZ1bmN0aW9uKCkge307XHJcbkNvbnRleHQuYWN0aXZhdGVMb25nU3RhY2tUcmFjZXMgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBQcm9taXNlX3B1c2hDb250ZXh0ID0gUHJvbWlzZS5wcm90b3R5cGUuX3B1c2hDb250ZXh0O1xyXG4gICAgdmFyIFByb21pc2VfcG9wQ29udGV4dCA9IFByb21pc2UucHJvdG90eXBlLl9wb3BDb250ZXh0O1xyXG4gICAgdmFyIFByb21pc2VfUGVla0NvbnRleHQgPSBQcm9taXNlLl9wZWVrQ29udGV4dDtcclxuICAgIHZhciBQcm9taXNlX3BlZWtDb250ZXh0ID0gUHJvbWlzZS5wcm90b3R5cGUuX3BlZWtDb250ZXh0O1xyXG4gICAgdmFyIFByb21pc2VfcHJvbWlzZUNyZWF0ZWQgPSBQcm9taXNlLnByb3RvdHlwZS5fcHJvbWlzZUNyZWF0ZWQ7XHJcbiAgICBDb250ZXh0LmRlYWN0aXZhdGVMb25nU3RhY2tUcmFjZXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBQcm9taXNlLnByb3RvdHlwZS5fcHVzaENvbnRleHQgPSBQcm9taXNlX3B1c2hDb250ZXh0O1xyXG4gICAgICAgIFByb21pc2UucHJvdG90eXBlLl9wb3BDb250ZXh0ID0gUHJvbWlzZV9wb3BDb250ZXh0O1xyXG4gICAgICAgIFByb21pc2UuX3BlZWtDb250ZXh0ID0gUHJvbWlzZV9QZWVrQ29udGV4dDtcclxuICAgICAgICBQcm9taXNlLnByb3RvdHlwZS5fcGVla0NvbnRleHQgPSBQcm9taXNlX3BlZWtDb250ZXh0O1xyXG4gICAgICAgIFByb21pc2UucHJvdG90eXBlLl9wcm9taXNlQ3JlYXRlZCA9IFByb21pc2VfcHJvbWlzZUNyZWF0ZWQ7XHJcbiAgICAgICAgbG9uZ1N0YWNrVHJhY2VzID0gZmFsc2U7XHJcbiAgICB9O1xyXG4gICAgbG9uZ1N0YWNrVHJhY2VzID0gdHJ1ZTtcclxuICAgIFByb21pc2UucHJvdG90eXBlLl9wdXNoQ29udGV4dCA9IENvbnRleHQucHJvdG90eXBlLl9wdXNoQ29udGV4dDtcclxuICAgIFByb21pc2UucHJvdG90eXBlLl9wb3BDb250ZXh0ID0gQ29udGV4dC5wcm90b3R5cGUuX3BvcENvbnRleHQ7XHJcbiAgICBQcm9taXNlLl9wZWVrQ29udGV4dCA9IFByb21pc2UucHJvdG90eXBlLl9wZWVrQ29udGV4dCA9IHBlZWtDb250ZXh0O1xyXG4gICAgUHJvbWlzZS5wcm90b3R5cGUuX3Byb21pc2VDcmVhdGVkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGN0eCA9IHRoaXMuX3BlZWtDb250ZXh0KCk7XHJcbiAgICAgICAgaWYgKGN0eCAmJiBjdHguX3Byb21pc2VDcmVhdGVkID09IG51bGwpIGN0eC5fcHJvbWlzZUNyZWF0ZWQgPSB0aGlzO1xyXG4gICAgfTtcclxufTtcclxucmV0dXJuIENvbnRleHQ7XHJcbn07XHJcblxyXG59LHt9XSw5OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcclxuXCJ1c2Ugc3RyaWN0XCI7XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oUHJvbWlzZSwgQ29udGV4dCkge1xyXG52YXIgZ2V0RG9tYWluID0gUHJvbWlzZS5fZ2V0RG9tYWluO1xyXG52YXIgYXN5bmMgPSBQcm9taXNlLl9hc3luYztcclxudmFyIFdhcm5pbmcgPSBfZGVyZXFfKFwiLi9lcnJvcnNcIikuV2FybmluZztcclxudmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xyXG52YXIgY2FuQXR0YWNoVHJhY2UgPSB1dGlsLmNhbkF0dGFjaFRyYWNlO1xyXG52YXIgdW5oYW5kbGVkUmVqZWN0aW9uSGFuZGxlZDtcclxudmFyIHBvc3NpYmx5VW5oYW5kbGVkUmVqZWN0aW9uO1xyXG52YXIgYmx1ZWJpcmRGcmFtZVBhdHRlcm4gPVxyXG4gICAgL1tcXFxcXFwvXWJsdWViaXJkW1xcXFxcXC9danNbXFxcXFxcL10ocmVsZWFzZXxkZWJ1Z3xpbnN0cnVtZW50ZWQpLztcclxudmFyIG5vZGVGcmFtZVBhdHRlcm4gPSAvXFwoKD86dGltZXJzXFwuanMpOlxcZCs6XFxkK1xcKS87XHJcbnZhciBwYXJzZUxpbmVQYXR0ZXJuID0gL1tcXC88XFwoXSguKz8pOihcXGQrKTooXFxkKylcXCk/XFxzKiQvO1xyXG52YXIgc3RhY2tGcmFtZVBhdHRlcm4gPSBudWxsO1xyXG52YXIgZm9ybWF0U3RhY2sgPSBudWxsO1xyXG52YXIgaW5kZW50U3RhY2tGcmFtZXMgPSBmYWxzZTtcclxudmFyIHByaW50V2FybmluZztcclxudmFyIGRlYnVnZ2luZyA9ICEhKHV0aWwuZW52KFwiQkxVRUJJUkRfREVCVUdcIikgIT0gMCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAodHJ1ZSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5lbnYoXCJCTFVFQklSRF9ERUJVR1wiKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5lbnYoXCJOT0RFX0VOVlwiKSA9PT0gXCJkZXZlbG9wbWVudFwiKSk7XHJcblxyXG52YXIgd2FybmluZ3MgPSAhISh1dGlsLmVudihcIkJMVUVCSVJEX1dBUk5JTkdTXCIpICE9IDAgJiZcclxuICAgIChkZWJ1Z2dpbmcgfHwgdXRpbC5lbnYoXCJCTFVFQklSRF9XQVJOSU5HU1wiKSkpO1xyXG5cclxudmFyIGxvbmdTdGFja1RyYWNlcyA9ICEhKHV0aWwuZW52KFwiQkxVRUJJUkRfTE9OR19TVEFDS19UUkFDRVNcIikgIT0gMCAmJlxyXG4gICAgKGRlYnVnZ2luZyB8fCB1dGlsLmVudihcIkJMVUVCSVJEX0xPTkdfU1RBQ0tfVFJBQ0VTXCIpKSk7XHJcblxyXG52YXIgd0ZvcmdvdHRlblJldHVybiA9IHV0aWwuZW52KFwiQkxVRUJJUkRfV19GT1JHT1RURU5fUkVUVVJOXCIpICE9IDAgJiZcclxuICAgICh3YXJuaW5ncyB8fCAhIXV0aWwuZW52KFwiQkxVRUJJUkRfV19GT1JHT1RURU5fUkVUVVJOXCIpKTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLnN1cHByZXNzVW5oYW5kbGVkUmVqZWN0aW9ucyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHRhcmdldCA9IHRoaXMuX3RhcmdldCgpO1xyXG4gICAgdGFyZ2V0Ll9iaXRGaWVsZCA9ICgodGFyZ2V0Ll9iaXRGaWVsZCAmICh+MTA0ODU3NikpIHxcclxuICAgICAgICAgICAgICAgICAgICAgIDUyNDI4OCk7XHJcbn07XHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZS5fZW5zdXJlUG9zc2libGVSZWplY3Rpb25IYW5kbGVkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCh0aGlzLl9iaXRGaWVsZCAmIDUyNDI4OCkgIT09IDApIHJldHVybjtcclxuICAgIHRoaXMuX3NldFJlamVjdGlvbklzVW5oYW5kbGVkKCk7XHJcbiAgICBhc3luYy5pbnZva2VMYXRlcih0aGlzLl9ub3RpZnlVbmhhbmRsZWRSZWplY3Rpb24sIHRoaXMsIHVuZGVmaW5lZCk7XHJcbn07XHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZS5fbm90aWZ5VW5oYW5kbGVkUmVqZWN0aW9uSXNIYW5kbGVkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZmlyZVJlamVjdGlvbkV2ZW50KFwicmVqZWN0aW9uSGFuZGxlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5oYW5kbGVkUmVqZWN0aW9uSGFuZGxlZCwgdW5kZWZpbmVkLCB0aGlzKTtcclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLl9zZXRSZXR1cm5lZE5vblVuZGVmaW5lZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5fYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZCB8IDI2ODQzNTQ1NjtcclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLl9yZXR1cm5lZE5vblVuZGVmaW5lZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuICh0aGlzLl9iaXRGaWVsZCAmIDI2ODQzNTQ1NikgIT09IDA7XHJcbn07XHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZS5fbm90aWZ5VW5oYW5kbGVkUmVqZWN0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHRoaXMuX2lzUmVqZWN0aW9uVW5oYW5kbGVkKCkpIHtcclxuICAgICAgICB2YXIgcmVhc29uID0gdGhpcy5fc2V0dGxlZFZhbHVlKCk7XHJcbiAgICAgICAgdGhpcy5fc2V0VW5oYW5kbGVkUmVqZWN0aW9uSXNOb3RpZmllZCgpO1xyXG4gICAgICAgIGZpcmVSZWplY3Rpb25FdmVudChcInVuaGFuZGxlZFJlamVjdGlvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc3NpYmx5VW5oYW5kbGVkUmVqZWN0aW9uLCByZWFzb24sIHRoaXMpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuUHJvbWlzZS5wcm90b3R5cGUuX3NldFVuaGFuZGxlZFJlamVjdGlvbklzTm90aWZpZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLl9iaXRGaWVsZCA9IHRoaXMuX2JpdEZpZWxkIHwgMjYyMTQ0O1xyXG59O1xyXG5cclxuUHJvbWlzZS5wcm90b3R5cGUuX3Vuc2V0VW5oYW5kbGVkUmVqZWN0aW9uSXNOb3RpZmllZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuX2JpdEZpZWxkID0gdGhpcy5fYml0RmllbGQgJiAofjI2MjE0NCk7XHJcbn07XHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZS5faXNVbmhhbmRsZWRSZWplY3Rpb25Ob3RpZmllZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiAodGhpcy5fYml0RmllbGQgJiAyNjIxNDQpID4gMDtcclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLl9zZXRSZWplY3Rpb25Jc1VuaGFuZGxlZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuX2JpdEZpZWxkID0gdGhpcy5fYml0RmllbGQgfCAxMDQ4NTc2O1xyXG59O1xyXG5cclxuUHJvbWlzZS5wcm90b3R5cGUuX3Vuc2V0UmVqZWN0aW9uSXNVbmhhbmRsZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLl9iaXRGaWVsZCA9IHRoaXMuX2JpdEZpZWxkICYgKH4xMDQ4NTc2KTtcclxuICAgIGlmICh0aGlzLl9pc1VuaGFuZGxlZFJlamVjdGlvbk5vdGlmaWVkKCkpIHtcclxuICAgICAgICB0aGlzLl91bnNldFVuaGFuZGxlZFJlamVjdGlvbklzTm90aWZpZWQoKTtcclxuICAgICAgICB0aGlzLl9ub3RpZnlVbmhhbmRsZWRSZWplY3Rpb25Jc0hhbmRsZWQoKTtcclxuICAgIH1cclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLl9pc1JlamVjdGlvblVuaGFuZGxlZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiAodGhpcy5fYml0RmllbGQgJiAxMDQ4NTc2KSA+IDA7XHJcbn07XHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZS5fd2FybiA9IGZ1bmN0aW9uKG1lc3NhZ2UsIHNob3VsZFVzZU93blRyYWNlLCBwcm9taXNlKSB7XHJcbiAgICByZXR1cm4gd2FybihtZXNzYWdlLCBzaG91bGRVc2VPd25UcmFjZSwgcHJvbWlzZSB8fCB0aGlzKTtcclxufTtcclxuXHJcblByb21pc2Uub25Qb3NzaWJseVVuaGFuZGxlZFJlamVjdGlvbiA9IGZ1bmN0aW9uIChmbikge1xyXG4gICAgdmFyIGRvbWFpbiA9IGdldERvbWFpbigpO1xyXG4gICAgcG9zc2libHlVbmhhbmRsZWRSZWplY3Rpb24gPVxyXG4gICAgICAgIHR5cGVvZiBmbiA9PT0gXCJmdW5jdGlvblwiID8gKGRvbWFpbiA9PT0gbnVsbCA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4gOiB1dGlsLmRvbWFpbkJpbmQoZG9tYWluLCBmbikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xyXG59O1xyXG5cclxuUHJvbWlzZS5vblVuaGFuZGxlZFJlamVjdGlvbkhhbmRsZWQgPSBmdW5jdGlvbiAoZm4pIHtcclxuICAgIHZhciBkb21haW4gPSBnZXREb21haW4oKTtcclxuICAgIHVuaGFuZGxlZFJlamVjdGlvbkhhbmRsZWQgPVxyXG4gICAgICAgIHR5cGVvZiBmbiA9PT0gXCJmdW5jdGlvblwiID8gKGRvbWFpbiA9PT0gbnVsbCA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4gOiB1dGlsLmRvbWFpbkJpbmQoZG9tYWluLCBmbikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xyXG59O1xyXG5cclxudmFyIGRpc2FibGVMb25nU3RhY2tUcmFjZXMgPSBmdW5jdGlvbigpIHt9O1xyXG5Qcm9taXNlLmxvbmdTdGFja1RyYWNlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmIChhc3luYy5oYXZlSXRlbXNRdWV1ZWQoKSAmJiAhY29uZmlnLmxvbmdTdGFja1RyYWNlcykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbm5vdCBlbmFibGUgbG9uZyBzdGFjayB0cmFjZXMgYWZ0ZXIgcHJvbWlzZXMgaGF2ZSBiZWVuIGNyZWF0ZWRcXHUwMDBhXFx1MDAwYSAgICBTZWUgaHR0cDovL2dvby5nbC9NcXJGbVhcXHUwMDBhXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKCFjb25maWcubG9uZ1N0YWNrVHJhY2VzICYmIGxvbmdTdGFja1RyYWNlc0lzU3VwcG9ydGVkKCkpIHtcclxuICAgICAgICB2YXIgUHJvbWlzZV9jYXB0dXJlU3RhY2tUcmFjZSA9IFByb21pc2UucHJvdG90eXBlLl9jYXB0dXJlU3RhY2tUcmFjZTtcclxuICAgICAgICB2YXIgUHJvbWlzZV9hdHRhY2hFeHRyYVRyYWNlID0gUHJvbWlzZS5wcm90b3R5cGUuX2F0dGFjaEV4dHJhVHJhY2U7XHJcbiAgICAgICAgY29uZmlnLmxvbmdTdGFja1RyYWNlcyA9IHRydWU7XHJcbiAgICAgICAgZGlzYWJsZUxvbmdTdGFja1RyYWNlcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoYXN5bmMuaGF2ZUl0ZW1zUXVldWVkKCkgJiYgIWNvbmZpZy5sb25nU3RhY2tUcmFjZXMpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbm5vdCBlbmFibGUgbG9uZyBzdGFjayB0cmFjZXMgYWZ0ZXIgcHJvbWlzZXMgaGF2ZSBiZWVuIGNyZWF0ZWRcXHUwMDBhXFx1MDAwYSAgICBTZWUgaHR0cDovL2dvby5nbC9NcXJGbVhcXHUwMDBhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFByb21pc2UucHJvdG90eXBlLl9jYXB0dXJlU3RhY2tUcmFjZSA9IFByb21pc2VfY2FwdHVyZVN0YWNrVHJhY2U7XHJcbiAgICAgICAgICAgIFByb21pc2UucHJvdG90eXBlLl9hdHRhY2hFeHRyYVRyYWNlID0gUHJvbWlzZV9hdHRhY2hFeHRyYVRyYWNlO1xyXG4gICAgICAgICAgICBDb250ZXh0LmRlYWN0aXZhdGVMb25nU3RhY2tUcmFjZXMoKTtcclxuICAgICAgICAgICAgYXN5bmMuZW5hYmxlVHJhbXBvbGluZSgpO1xyXG4gICAgICAgICAgICBjb25maWcubG9uZ1N0YWNrVHJhY2VzID0gZmFsc2U7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBQcm9taXNlLnByb3RvdHlwZS5fY2FwdHVyZVN0YWNrVHJhY2UgPSBsb25nU3RhY2tUcmFjZXNDYXB0dXJlU3RhY2tUcmFjZTtcclxuICAgICAgICBQcm9taXNlLnByb3RvdHlwZS5fYXR0YWNoRXh0cmFUcmFjZSA9IGxvbmdTdGFja1RyYWNlc0F0dGFjaEV4dHJhVHJhY2U7XHJcbiAgICAgICAgQ29udGV4dC5hY3RpdmF0ZUxvbmdTdGFja1RyYWNlcygpO1xyXG4gICAgICAgIGFzeW5jLmRpc2FibGVUcmFtcG9saW5lSWZOZWNlc3NhcnkoKTtcclxuICAgIH1cclxufTtcclxuXHJcblByb21pc2UuaGFzTG9uZ1N0YWNrVHJhY2VzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIGNvbmZpZy5sb25nU3RhY2tUcmFjZXMgJiYgbG9uZ1N0YWNrVHJhY2VzSXNTdXBwb3J0ZWQoKTtcclxufTtcclxuXHJcbnZhciBmaXJlRG9tRXZlbnQgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgQ3VzdG9tRXZlbnQgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXCJDdXN0b21FdmVudFwiKTtcclxuICAgICAgICAgICAgdXRpbC5nbG9iYWwuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbihuYW1lLCBldmVudCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRvbUV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KG5hbWUudG9Mb3dlckNhc2UoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbDogZXZlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIXV0aWwuZ2xvYmFsLmRpc3BhdGNoRXZlbnQoZG9tRXZlbnQpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIEV2ZW50ID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KFwiQ3VzdG9tRXZlbnRcIik7XHJcbiAgICAgICAgICAgIHV0aWwuZ2xvYmFsLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24obmFtZSwgZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBkb21FdmVudCA9IG5ldyBFdmVudChuYW1lLnRvTG93ZXJDYXNlKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGRvbUV2ZW50LmRldGFpbCA9IGV2ZW50O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICF1dGlsLmdsb2JhbC5kaXNwYXRjaEV2ZW50KGRvbUV2ZW50KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIkN1c3RvbUV2ZW50XCIpO1xyXG4gICAgICAgICAgICBldmVudC5pbml0Q3VzdG9tRXZlbnQoXCJ0ZXN0aW5ndGhlZXZlbnRcIiwgZmFsc2UsIHRydWUsIHt9KTtcclxuICAgICAgICAgICAgdXRpbC5nbG9iYWwuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbihuYW1lLCBldmVudCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRvbUV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJDdXN0b21FdmVudFwiKTtcclxuICAgICAgICAgICAgICAgIGRvbUV2ZW50LmluaXRDdXN0b21FdmVudChuYW1lLnRvTG93ZXJDYXNlKCksIGZhbHNlLCB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAhdXRpbC5nbG9iYWwuZGlzcGF0Y2hFdmVudChkb21FdmVudCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZSkge31cclxuICAgIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5cclxudmFyIGZpcmVHbG9iYWxFdmVudCA9IChmdW5jdGlvbigpIHtcclxuICAgIGlmICh1dGlsLmlzTm9kZSkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3MuZW1pdC5hcHBseShwcm9jZXNzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICghdXRpbC5nbG9iYWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgICAgICB2YXIgbWV0aG9kTmFtZSA9IFwib25cIiArIG5hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgdmFyIG1ldGhvZCA9IHV0aWwuZ2xvYmFsW21ldGhvZE5hbWVdO1xyXG4gICAgICAgICAgICBpZiAoIW1ldGhvZCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBtZXRob2QuYXBwbHkodXRpbC5nbG9iYWwsIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn0pKCk7XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZVByb21pc2VMaWZlY3ljbGVFdmVudE9iamVjdChuYW1lLCBwcm9taXNlKSB7XHJcbiAgICByZXR1cm4ge3Byb21pc2U6IHByb21pc2V9O1xyXG59XHJcblxyXG52YXIgZXZlbnRUb09iamVjdEdlbmVyYXRvciA9IHtcclxuICAgIHByb21pc2VDcmVhdGVkOiBnZW5lcmF0ZVByb21pc2VMaWZlY3ljbGVFdmVudE9iamVjdCxcclxuICAgIHByb21pc2VGdWxmaWxsZWQ6IGdlbmVyYXRlUHJvbWlzZUxpZmVjeWNsZUV2ZW50T2JqZWN0LFxyXG4gICAgcHJvbWlzZVJlamVjdGVkOiBnZW5lcmF0ZVByb21pc2VMaWZlY3ljbGVFdmVudE9iamVjdCxcclxuICAgIHByb21pc2VSZXNvbHZlZDogZ2VuZXJhdGVQcm9taXNlTGlmZWN5Y2xlRXZlbnRPYmplY3QsXHJcbiAgICBwcm9taXNlQ2FuY2VsbGVkOiBnZW5lcmF0ZVByb21pc2VMaWZlY3ljbGVFdmVudE9iamVjdCxcclxuICAgIHByb21pc2VDaGFpbmVkOiBmdW5jdGlvbihuYW1lLCBwcm9taXNlLCBjaGlsZCkge1xyXG4gICAgICAgIHJldHVybiB7cHJvbWlzZTogcHJvbWlzZSwgY2hpbGQ6IGNoaWxkfTtcclxuICAgIH0sXHJcbiAgICB3YXJuaW5nOiBmdW5jdGlvbihuYW1lLCB3YXJuaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHt3YXJuaW5nOiB3YXJuaW5nfTtcclxuICAgIH0sXHJcbiAgICB1bmhhbmRsZWRSZWplY3Rpb246IGZ1bmN0aW9uIChuYW1lLCByZWFzb24sIHByb21pc2UpIHtcclxuICAgICAgICByZXR1cm4ge3JlYXNvbjogcmVhc29uLCBwcm9taXNlOiBwcm9taXNlfTtcclxuICAgIH0sXHJcbiAgICByZWplY3Rpb25IYW5kbGVkOiBnZW5lcmF0ZVByb21pc2VMaWZlY3ljbGVFdmVudE9iamVjdFxyXG59O1xyXG5cclxudmFyIGFjdGl2ZUZpcmVFdmVudCA9IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB2YXIgZ2xvYmFsRXZlbnRGaXJlZCA9IGZhbHNlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBnbG9iYWxFdmVudEZpcmVkID0gZmlyZUdsb2JhbEV2ZW50LmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgYXN5bmMudGhyb3dMYXRlcihlKTtcclxuICAgICAgICBnbG9iYWxFdmVudEZpcmVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZG9tRXZlbnRGaXJlZCA9IGZhbHNlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBkb21FdmVudEZpcmVkID0gZmlyZURvbUV2ZW50KG5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRUb09iamVjdEdlbmVyYXRvcltuYW1lXS5hcHBseShudWxsLCBhcmd1bWVudHMpKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBhc3luYy50aHJvd0xhdGVyKGUpO1xyXG4gICAgICAgIGRvbUV2ZW50RmlyZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkb21FdmVudEZpcmVkIHx8IGdsb2JhbEV2ZW50RmlyZWQ7XHJcbn07XHJcblxyXG5Qcm9taXNlLmNvbmZpZyA9IGZ1bmN0aW9uKG9wdHMpIHtcclxuICAgIG9wdHMgPSBPYmplY3Qob3B0cyk7XHJcbiAgICBpZiAoXCJsb25nU3RhY2tUcmFjZXNcIiBpbiBvcHRzKSB7XHJcbiAgICAgICAgaWYgKG9wdHMubG9uZ1N0YWNrVHJhY2VzKSB7XHJcbiAgICAgICAgICAgIFByb21pc2UubG9uZ1N0YWNrVHJhY2VzKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICghb3B0cy5sb25nU3RhY2tUcmFjZXMgJiYgUHJvbWlzZS5oYXNMb25nU3RhY2tUcmFjZXMoKSkge1xyXG4gICAgICAgICAgICBkaXNhYmxlTG9uZ1N0YWNrVHJhY2VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKFwid2FybmluZ3NcIiBpbiBvcHRzKSB7XHJcbiAgICAgICAgdmFyIHdhcm5pbmdzT3B0aW9uID0gb3B0cy53YXJuaW5ncztcclxuICAgICAgICBjb25maWcud2FybmluZ3MgPSAhIXdhcm5pbmdzT3B0aW9uO1xyXG4gICAgICAgIHdGb3Jnb3R0ZW5SZXR1cm4gPSBjb25maWcud2FybmluZ3M7XHJcblxyXG4gICAgICAgIGlmICh1dGlsLmlzT2JqZWN0KHdhcm5pbmdzT3B0aW9uKSkge1xyXG4gICAgICAgICAgICBpZiAoXCJ3Rm9yZ290dGVuUmV0dXJuXCIgaW4gd2FybmluZ3NPcHRpb24pIHtcclxuICAgICAgICAgICAgICAgIHdGb3Jnb3R0ZW5SZXR1cm4gPSAhIXdhcm5pbmdzT3B0aW9uLndGb3Jnb3R0ZW5SZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoXCJjYW5jZWxsYXRpb25cIiBpbiBvcHRzICYmIG9wdHMuY2FuY2VsbGF0aW9uICYmICFjb25maWcuY2FuY2VsbGF0aW9uKSB7XHJcbiAgICAgICAgaWYgKGFzeW5jLmhhdmVJdGVtc1F1ZXVlZCgpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICAgICAgIFwiY2Fubm90IGVuYWJsZSBjYW5jZWxsYXRpb24gYWZ0ZXIgcHJvbWlzZXMgYXJlIGluIHVzZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgUHJvbWlzZS5wcm90b3R5cGUuX2NsZWFyQ2FuY2VsbGF0aW9uRGF0YSA9XHJcbiAgICAgICAgICAgIGNhbmNlbGxhdGlvbkNsZWFyQ2FuY2VsbGF0aW9uRGF0YTtcclxuICAgICAgICBQcm9taXNlLnByb3RvdHlwZS5fcHJvcGFnYXRlRnJvbSA9IGNhbmNlbGxhdGlvblByb3BhZ2F0ZUZyb207XHJcbiAgICAgICAgUHJvbWlzZS5wcm90b3R5cGUuX29uQ2FuY2VsID0gY2FuY2VsbGF0aW9uT25DYW5jZWw7XHJcbiAgICAgICAgUHJvbWlzZS5wcm90b3R5cGUuX3NldE9uQ2FuY2VsID0gY2FuY2VsbGF0aW9uU2V0T25DYW5jZWw7XHJcbiAgICAgICAgUHJvbWlzZS5wcm90b3R5cGUuX2F0dGFjaENhbmNlbGxhdGlvbkNhbGxiYWNrID1cclxuICAgICAgICAgICAgY2FuY2VsbGF0aW9uQXR0YWNoQ2FuY2VsbGF0aW9uQ2FsbGJhY2s7XHJcbiAgICAgICAgUHJvbWlzZS5wcm90b3R5cGUuX2V4ZWN1dGUgPSBjYW5jZWxsYXRpb25FeGVjdXRlO1xyXG4gICAgICAgIHByb3BhZ2F0ZUZyb21GdW5jdGlvbiA9IGNhbmNlbGxhdGlvblByb3BhZ2F0ZUZyb207XHJcbiAgICAgICAgY29uZmlnLmNhbmNlbGxhdGlvbiA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAoXCJtb25pdG9yaW5nXCIgaW4gb3B0cykge1xyXG4gICAgICAgIGlmIChvcHRzLm1vbml0b3JpbmcgJiYgIWNvbmZpZy5tb25pdG9yaW5nKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5tb25pdG9yaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgUHJvbWlzZS5wcm90b3R5cGUuX2ZpcmVFdmVudCA9IGFjdGl2ZUZpcmVFdmVudDtcclxuICAgICAgICB9IGVsc2UgaWYgKCFvcHRzLm1vbml0b3JpbmcgJiYgY29uZmlnLm1vbml0b3JpbmcpIHtcclxuICAgICAgICAgICAgY29uZmlnLm1vbml0b3JpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgUHJvbWlzZS5wcm90b3R5cGUuX2ZpcmVFdmVudCA9IGRlZmF1bHRGaXJlRXZlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIFByb21pc2U7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBkZWZhdWx0RmlyZUV2ZW50KCkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHJcblByb21pc2UucHJvdG90eXBlLl9maXJlRXZlbnQgPSBkZWZhdWx0RmlyZUV2ZW50O1xyXG5Qcm9taXNlLnByb3RvdHlwZS5fZXhlY3V0ZSA9IGZ1bmN0aW9uKGV4ZWN1dG9yLCByZXNvbHZlLCByZWplY3QpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgZXhlY3V0b3IocmVzb2x2ZSwgcmVqZWN0KTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICByZXR1cm4gZTtcclxuICAgIH1cclxufTtcclxuUHJvbWlzZS5wcm90b3R5cGUuX29uQ2FuY2VsID0gZnVuY3Rpb24gKCkge307XHJcblByb21pc2UucHJvdG90eXBlLl9zZXRPbkNhbmNlbCA9IGZ1bmN0aW9uIChoYW5kbGVyKSB7IDsgfTtcclxuUHJvbWlzZS5wcm90b3R5cGUuX2F0dGFjaENhbmNlbGxhdGlvbkNhbGxiYWNrID0gZnVuY3Rpb24ob25DYW5jZWwpIHtcclxuICAgIDtcclxufTtcclxuUHJvbWlzZS5wcm90b3R5cGUuX2NhcHR1cmVTdGFja1RyYWNlID0gZnVuY3Rpb24gKCkge307XHJcblByb21pc2UucHJvdG90eXBlLl9hdHRhY2hFeHRyYVRyYWNlID0gZnVuY3Rpb24gKCkge307XHJcblByb21pc2UucHJvdG90eXBlLl9jbGVhckNhbmNlbGxhdGlvbkRhdGEgPSBmdW5jdGlvbigpIHt9O1xyXG5Qcm9taXNlLnByb3RvdHlwZS5fcHJvcGFnYXRlRnJvbSA9IGZ1bmN0aW9uIChwYXJlbnQsIGZsYWdzKSB7XHJcbiAgICA7XHJcbiAgICA7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBjYW5jZWxsYXRpb25FeGVjdXRlKGV4ZWN1dG9yLCByZXNvbHZlLCByZWplY3QpIHtcclxuICAgIHZhciBwcm9taXNlID0gdGhpcztcclxuICAgIHRyeSB7XHJcbiAgICAgICAgZXhlY3V0b3IocmVzb2x2ZSwgcmVqZWN0LCBmdW5jdGlvbihvbkNhbmNlbCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9uQ2FuY2VsICE9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJvbkNhbmNlbCBtdXN0IGJlIGEgZnVuY3Rpb24sIGdvdDogXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlsLnRvU3RyaW5nKG9uQ2FuY2VsKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHJvbWlzZS5fYXR0YWNoQ2FuY2VsbGF0aW9uQ2FsbGJhY2sob25DYW5jZWwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIHJldHVybiBlO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjYW5jZWxsYXRpb25BdHRhY2hDYW5jZWxsYXRpb25DYWxsYmFjayhvbkNhbmNlbCkge1xyXG4gICAgaWYgKCF0aGlzLl9pc0NhbmNlbGxhYmxlKCkpIHJldHVybiB0aGlzO1xyXG5cclxuICAgIHZhciBwcmV2aW91c09uQ2FuY2VsID0gdGhpcy5fb25DYW5jZWwoKTtcclxuICAgIGlmIChwcmV2aW91c09uQ2FuY2VsICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBpZiAodXRpbC5pc0FycmF5KHByZXZpb3VzT25DYW5jZWwpKSB7XHJcbiAgICAgICAgICAgIHByZXZpb3VzT25DYW5jZWwucHVzaChvbkNhbmNlbCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fc2V0T25DYW5jZWwoW3ByZXZpb3VzT25DYW5jZWwsIG9uQ2FuY2VsXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9zZXRPbkNhbmNlbChvbkNhbmNlbCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhbmNlbGxhdGlvbk9uQ2FuY2VsKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX29uQ2FuY2VsRmllbGQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhbmNlbGxhdGlvblNldE9uQ2FuY2VsKG9uQ2FuY2VsKSB7XHJcbiAgICB0aGlzLl9vbkNhbmNlbEZpZWxkID0gb25DYW5jZWw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhbmNlbGxhdGlvbkNsZWFyQ2FuY2VsbGF0aW9uRGF0YSgpIHtcclxuICAgIHRoaXMuX2NhbmNlbGxhdGlvblBhcmVudCA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuX29uQ2FuY2VsRmllbGQgPSB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhbmNlbGxhdGlvblByb3BhZ2F0ZUZyb20ocGFyZW50LCBmbGFncykge1xyXG4gICAgaWYgKChmbGFncyAmIDEpICE9PSAwKSB7XHJcbiAgICAgICAgdGhpcy5fY2FuY2VsbGF0aW9uUGFyZW50ID0gcGFyZW50O1xyXG4gICAgICAgIHZhciBicmFuY2hlc1JlbWFpbmluZ1RvQ2FuY2VsID0gcGFyZW50Ll9icmFuY2hlc1JlbWFpbmluZ1RvQ2FuY2VsO1xyXG4gICAgICAgIGlmIChicmFuY2hlc1JlbWFpbmluZ1RvQ2FuY2VsID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgYnJhbmNoZXNSZW1haW5pbmdUb0NhbmNlbCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBhcmVudC5fYnJhbmNoZXNSZW1haW5pbmdUb0NhbmNlbCA9IGJyYW5jaGVzUmVtYWluaW5nVG9DYW5jZWwgKyAxO1xyXG4gICAgfVxyXG4gICAgaWYgKChmbGFncyAmIDIpICE9PSAwICYmIHBhcmVudC5faXNCb3VuZCgpKSB7XHJcbiAgICAgICAgdGhpcy5fc2V0Qm91bmRUbyhwYXJlbnQuX2JvdW5kVG8pO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBiaW5kaW5nUHJvcGFnYXRlRnJvbShwYXJlbnQsIGZsYWdzKSB7XHJcbiAgICBpZiAoKGZsYWdzICYgMikgIT09IDAgJiYgcGFyZW50Ll9pc0JvdW5kKCkpIHtcclxuICAgICAgICB0aGlzLl9zZXRCb3VuZFRvKHBhcmVudC5fYm91bmRUbyk7XHJcbiAgICB9XHJcbn1cclxudmFyIHByb3BhZ2F0ZUZyb21GdW5jdGlvbiA9IGJpbmRpbmdQcm9wYWdhdGVGcm9tO1xyXG5cclxuZnVuY3Rpb24gYm91bmRWYWx1ZUZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHJldCA9IHRoaXMuX2JvdW5kVG87XHJcbiAgICBpZiAocmV0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBpZiAocmV0IGluc3RhbmNlb2YgUHJvbWlzZSkge1xyXG4gICAgICAgICAgICBpZiAocmV0LmlzRnVsZmlsbGVkKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXQudmFsdWUoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBsb25nU3RhY2tUcmFjZXNDYXB0dXJlU3RhY2tUcmFjZSgpIHtcclxuICAgIHRoaXMuX3RyYWNlID0gbmV3IENhcHR1cmVkVHJhY2UodGhpcy5fcGVla0NvbnRleHQoKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvbmdTdGFja1RyYWNlc0F0dGFjaEV4dHJhVHJhY2UoZXJyb3IsIGlnbm9yZVNlbGYpIHtcclxuICAgIGlmIChjYW5BdHRhY2hUcmFjZShlcnJvcikpIHtcclxuICAgICAgICB2YXIgdHJhY2UgPSB0aGlzLl90cmFjZTtcclxuICAgICAgICBpZiAodHJhY2UgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZiAoaWdub3JlU2VsZikgdHJhY2UgPSB0cmFjZS5fcGFyZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHJhY2UgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0cmFjZS5hdHRhY2hFeHRyYVRyYWNlKGVycm9yKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCFlcnJvci5fX3N0YWNrQ2xlYW5lZF9fKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXJzZWQgPSBwYXJzZVN0YWNrQW5kTWVzc2FnZShlcnJvcik7XHJcbiAgICAgICAgICAgIHV0aWwubm90RW51bWVyYWJsZVByb3AoZXJyb3IsIFwic3RhY2tcIixcclxuICAgICAgICAgICAgICAgIHBhcnNlZC5tZXNzYWdlICsgXCJcXG5cIiArIHBhcnNlZC5zdGFjay5qb2luKFwiXFxuXCIpKTtcclxuICAgICAgICAgICAgdXRpbC5ub3RFbnVtZXJhYmxlUHJvcChlcnJvciwgXCJfX3N0YWNrQ2xlYW5lZF9fXCIsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2hlY2tGb3Jnb3R0ZW5SZXR1cm5zKHJldHVyblZhbHVlLCBwcm9taXNlQ3JlYXRlZCwgbmFtZSwgcHJvbWlzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudCkge1xyXG4gICAgaWYgKHJldHVyblZhbHVlID09PSB1bmRlZmluZWQgJiYgcHJvbWlzZUNyZWF0ZWQgIT09IG51bGwgJiZcclxuICAgICAgICB3Rm9yZ290dGVuUmV0dXJuKSB7XHJcbiAgICAgICAgaWYgKHBhcmVudCAhPT0gdW5kZWZpbmVkICYmIHBhcmVudC5fcmV0dXJuZWROb25VbmRlZmluZWQoKSkgcmV0dXJuO1xyXG4gICAgICAgIGlmICgocHJvbWlzZS5fYml0RmllbGQgJiA2NTUzNSkgPT09IDApIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKG5hbWUpIG5hbWUgPSBuYW1lICsgXCIgXCI7XHJcbiAgICAgICAgdmFyIGhhbmRsZXJMaW5lID0gXCJcIjtcclxuICAgICAgICB2YXIgY3JlYXRvckxpbmUgPSBcIlwiO1xyXG4gICAgICAgIGlmIChwcm9taXNlQ3JlYXRlZC5fdHJhY2UpIHtcclxuICAgICAgICAgICAgdmFyIHRyYWNlTGluZXMgPSBwcm9taXNlQ3JlYXRlZC5fdHJhY2Uuc3RhY2suc3BsaXQoXCJcXG5cIik7XHJcbiAgICAgICAgICAgIHZhciBzdGFjayA9IGNsZWFuU3RhY2sodHJhY2VMaW5lcyk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBzdGFjay5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxpbmUgPSBzdGFja1tpXTtcclxuICAgICAgICAgICAgICAgIGlmICghbm9kZUZyYW1lUGF0dGVybi50ZXN0KGxpbmUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpbmVNYXRjaGVzID0gbGluZS5tYXRjaChwYXJzZUxpbmVQYXR0ZXJuKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobGluZU1hdGNoZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlckxpbmUgID0gXCJhdCBcIiArIGxpbmVNYXRjaGVzWzFdICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiOlwiICsgbGluZU1hdGNoZXNbMl0gKyBcIjpcIiArIGxpbmVNYXRjaGVzWzNdICsgXCIgXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhY2subGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGZpcnN0VXNlckxpbmUgPSBzdGFja1swXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJhY2VMaW5lcy5sZW5ndGg7ICsraSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodHJhY2VMaW5lc1tpXSA9PT0gZmlyc3RVc2VyTGluZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0b3JMaW5lID0gXCJcXG5cIiArIHRyYWNlTGluZXNbaSAtIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG1zZyA9IFwiYSBwcm9taXNlIHdhcyBjcmVhdGVkIGluIGEgXCIgKyBuYW1lICtcclxuICAgICAgICAgICAgXCJoYW5kbGVyIFwiICsgaGFuZGxlckxpbmUgKyBcImJ1dCB3YXMgbm90IHJldHVybmVkIGZyb20gaXQsIFwiICtcclxuICAgICAgICAgICAgXCJzZWUgaHR0cDovL2dvby5nbC9yUnFNVXdcIiArXHJcbiAgICAgICAgICAgIGNyZWF0b3JMaW5lO1xyXG4gICAgICAgIHByb21pc2UuX3dhcm4obXNnLCB0cnVlLCBwcm9taXNlQ3JlYXRlZCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlcHJlY2F0ZWQobmFtZSwgcmVwbGFjZW1lbnQpIHtcclxuICAgIHZhciBtZXNzYWdlID0gbmFtZSArXHJcbiAgICAgICAgXCIgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGEgZnV0dXJlIHZlcnNpb24uXCI7XHJcbiAgICBpZiAocmVwbGFjZW1lbnQpIG1lc3NhZ2UgKz0gXCIgVXNlIFwiICsgcmVwbGFjZW1lbnQgKyBcIiBpbnN0ZWFkLlwiO1xyXG4gICAgcmV0dXJuIHdhcm4obWVzc2FnZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdhcm4obWVzc2FnZSwgc2hvdWxkVXNlT3duVHJhY2UsIHByb21pc2UpIHtcclxuICAgIGlmICghY29uZmlnLndhcm5pbmdzKSByZXR1cm47XHJcbiAgICB2YXIgd2FybmluZyA9IG5ldyBXYXJuaW5nKG1lc3NhZ2UpO1xyXG4gICAgdmFyIGN0eDtcclxuICAgIGlmIChzaG91bGRVc2VPd25UcmFjZSkge1xyXG4gICAgICAgIHByb21pc2UuX2F0dGFjaEV4dHJhVHJhY2Uod2FybmluZyk7XHJcbiAgICB9IGVsc2UgaWYgKGNvbmZpZy5sb25nU3RhY2tUcmFjZXMgJiYgKGN0eCA9IFByb21pc2UuX3BlZWtDb250ZXh0KCkpKSB7XHJcbiAgICAgICAgY3R4LmF0dGFjaEV4dHJhVHJhY2Uod2FybmluZyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBwYXJzZWQgPSBwYXJzZVN0YWNrQW5kTWVzc2FnZSh3YXJuaW5nKTtcclxuICAgICAgICB3YXJuaW5nLnN0YWNrID0gcGFyc2VkLm1lc3NhZ2UgKyBcIlxcblwiICsgcGFyc2VkLnN0YWNrLmpvaW4oXCJcXG5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFhY3RpdmVGaXJlRXZlbnQoXCJ3YXJuaW5nXCIsIHdhcm5pbmcpKSB7XHJcbiAgICAgICAgZm9ybWF0QW5kTG9nRXJyb3Iod2FybmluZywgXCJcIiwgdHJ1ZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlY29uc3RydWN0U3RhY2sobWVzc2FnZSwgc3RhY2tzKSB7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0YWNrcy5sZW5ndGggLSAxOyArK2kpIHtcclxuICAgICAgICBzdGFja3NbaV0ucHVzaChcIkZyb20gcHJldmlvdXMgZXZlbnQ6XCIpO1xyXG4gICAgICAgIHN0YWNrc1tpXSA9IHN0YWNrc1tpXS5qb2luKFwiXFxuXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKGkgPCBzdGFja3MubGVuZ3RoKSB7XHJcbiAgICAgICAgc3RhY2tzW2ldID0gc3RhY2tzW2ldLmpvaW4oXCJcXG5cIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWVzc2FnZSArIFwiXFxuXCIgKyBzdGFja3Muam9pbihcIlxcblwiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlRHVwbGljYXRlT3JFbXB0eUp1bXBzKHN0YWNrcykge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGFja3MubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBpZiAoc3RhY2tzW2ldLmxlbmd0aCA9PT0gMCB8fFxyXG4gICAgICAgICAgICAoKGkgKyAxIDwgc3RhY2tzLmxlbmd0aCkgJiYgc3RhY2tzW2ldWzBdID09PSBzdGFja3NbaSsxXVswXSkpIHtcclxuICAgICAgICAgICAgc3RhY2tzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlQ29tbW9uUm9vdHMoc3RhY2tzKSB7XHJcbiAgICB2YXIgY3VycmVudCA9IHN0YWNrc1swXTtcclxuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgc3RhY2tzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgdmFyIHByZXYgPSBzdGFja3NbaV07XHJcbiAgICAgICAgdmFyIGN1cnJlbnRMYXN0SW5kZXggPSBjdXJyZW50Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRMYXN0TGluZSA9IGN1cnJlbnRbY3VycmVudExhc3RJbmRleF07XHJcbiAgICAgICAgdmFyIGNvbW1vblJvb3RNZWV0UG9pbnQgPSAtMTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaiA9IHByZXYubGVuZ3RoIC0gMTsgaiA+PSAwOyAtLWopIHtcclxuICAgICAgICAgICAgaWYgKHByZXZbal0gPT09IGN1cnJlbnRMYXN0TGluZSkge1xyXG4gICAgICAgICAgICAgICAgY29tbW9uUm9vdE1lZXRQb2ludCA9IGo7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yICh2YXIgaiA9IGNvbW1vblJvb3RNZWV0UG9pbnQ7IGogPj0gMDsgLS1qKSB7XHJcbiAgICAgICAgICAgIHZhciBsaW5lID0gcHJldltqXTtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRbY3VycmVudExhc3RJbmRleF0gPT09IGxpbmUpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQucG9wKCk7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50TGFzdEluZGV4LS07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjdXJyZW50ID0gcHJldjtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYW5TdGFjayhzdGFjaykge1xyXG4gICAgdmFyIHJldCA9IFtdO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGFjay5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIHZhciBsaW5lID0gc3RhY2tbaV07XHJcbiAgICAgICAgdmFyIGlzVHJhY2VMaW5lID0gXCIgICAgKE5vIHN0YWNrIHRyYWNlKVwiID09PSBsaW5lIHx8XHJcbiAgICAgICAgICAgIHN0YWNrRnJhbWVQYXR0ZXJuLnRlc3QobGluZSk7XHJcbiAgICAgICAgdmFyIGlzSW50ZXJuYWxGcmFtZSA9IGlzVHJhY2VMaW5lICYmIHNob3VsZElnbm9yZShsaW5lKTtcclxuICAgICAgICBpZiAoaXNUcmFjZUxpbmUgJiYgIWlzSW50ZXJuYWxGcmFtZSkge1xyXG4gICAgICAgICAgICBpZiAoaW5kZW50U3RhY2tGcmFtZXMgJiYgbGluZS5jaGFyQXQoMCkgIT09IFwiIFwiKSB7XHJcbiAgICAgICAgICAgICAgICBsaW5lID0gXCIgICAgXCIgKyBsaW5lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldC5wdXNoKGxpbmUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0YWNrRnJhbWVzQXNBcnJheShlcnJvcikge1xyXG4gICAgdmFyIHN0YWNrID0gZXJyb3Iuc3RhY2sucmVwbGFjZSgvXFxzKyQvZywgXCJcIikuc3BsaXQoXCJcXG5cIik7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0YWNrLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgdmFyIGxpbmUgPSBzdGFja1tpXTtcclxuICAgICAgICBpZiAoXCIgICAgKE5vIHN0YWNrIHRyYWNlKVwiID09PSBsaW5lIHx8IHN0YWNrRnJhbWVQYXR0ZXJuLnRlc3QobGluZSkpIHtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGkgPiAwICYmIGVycm9yLm5hbWUgIT0gXCJTeW50YXhFcnJvclwiKSB7XHJcbiAgICAgICAgc3RhY2sgPSBzdGFjay5zbGljZShpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdGFjaztcclxufVxyXG5cclxuZnVuY3Rpb24gcGFyc2VTdGFja0FuZE1lc3NhZ2UoZXJyb3IpIHtcclxuICAgIHZhciBzdGFjayA9IGVycm9yLnN0YWNrO1xyXG4gICAgdmFyIG1lc3NhZ2UgPSBlcnJvci50b1N0cmluZygpO1xyXG4gICAgc3RhY2sgPSB0eXBlb2Ygc3RhY2sgPT09IFwic3RyaW5nXCIgJiYgc3RhY2subGVuZ3RoID4gMFxyXG4gICAgICAgICAgICAgICAgPyBzdGFja0ZyYW1lc0FzQXJyYXkoZXJyb3IpIDogW1wiICAgIChObyBzdGFjayB0cmFjZSlcIl07XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXHJcbiAgICAgICAgc3RhY2s6IGVycm9yLm5hbWUgPT0gXCJTeW50YXhFcnJvclwiID8gc3RhY2sgOiBjbGVhblN0YWNrKHN0YWNrKVxyXG4gICAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gZm9ybWF0QW5kTG9nRXJyb3IoZXJyb3IsIHRpdGxlLCBpc1NvZnQpIHtcclxuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgIHZhciBtZXNzYWdlO1xyXG4gICAgICAgIGlmICh1dGlsLmlzT2JqZWN0KGVycm9yKSkge1xyXG4gICAgICAgICAgICB2YXIgc3RhY2sgPSBlcnJvci5zdGFjaztcclxuICAgICAgICAgICAgbWVzc2FnZSA9IHRpdGxlICsgZm9ybWF0U3RhY2soc3RhY2ssIGVycm9yKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtZXNzYWdlID0gdGl0bGUgKyBTdHJpbmcoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHByaW50V2FybmluZyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgIHByaW50V2FybmluZyhtZXNzYWdlLCBpc1NvZnQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbnNvbGUubG9nID09PSBcImZ1bmN0aW9uXCIgfHxcclxuICAgICAgICAgICAgdHlwZW9mIGNvbnNvbGUubG9nID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZmlyZVJlamVjdGlvbkV2ZW50KG5hbWUsIGxvY2FsSGFuZGxlciwgcmVhc29uLCBwcm9taXNlKSB7XHJcbiAgICB2YXIgbG9jYWxFdmVudEZpcmVkID0gZmFsc2U7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgbG9jYWxIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgbG9jYWxFdmVudEZpcmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKG5hbWUgPT09IFwicmVqZWN0aW9uSGFuZGxlZFwiKSB7XHJcbiAgICAgICAgICAgICAgICBsb2NhbEhhbmRsZXIocHJvbWlzZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsb2NhbEhhbmRsZXIocmVhc29uLCBwcm9taXNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBhc3luYy50aHJvd0xhdGVyKGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChuYW1lID09PSBcInVuaGFuZGxlZFJlamVjdGlvblwiKSB7XHJcbiAgICAgICAgaWYgKCFhY3RpdmVGaXJlRXZlbnQobmFtZSwgcmVhc29uLCBwcm9taXNlKSAmJiAhbG9jYWxFdmVudEZpcmVkKSB7XHJcbiAgICAgICAgICAgIGZvcm1hdEFuZExvZ0Vycm9yKHJlYXNvbiwgXCJVbmhhbmRsZWQgcmVqZWN0aW9uIFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFjdGl2ZUZpcmVFdmVudChuYW1lLCBwcm9taXNlKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZm9ybWF0Tm9uRXJyb3Iob2JqKSB7XHJcbiAgICB2YXIgc3RyO1xyXG4gICAgaWYgKHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIHN0ciA9IFwiW2Z1bmN0aW9uIFwiICtcclxuICAgICAgICAgICAgKG9iai5uYW1lIHx8IFwiYW5vbnltb3VzXCIpICtcclxuICAgICAgICAgICAgXCJdXCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN0ciA9IG9iaiAmJiB0eXBlb2Ygb2JqLnRvU3RyaW5nID09PSBcImZ1bmN0aW9uXCJcclxuICAgICAgICAgICAgPyBvYmoudG9TdHJpbmcoKSA6IHV0aWwudG9TdHJpbmcob2JqKTtcclxuICAgICAgICB2YXIgcnVzZWxlc3NUb1N0cmluZyA9IC9cXFtvYmplY3QgW2EtekEtWjAtOSRfXStcXF0vO1xyXG4gICAgICAgIGlmIChydXNlbGVzc1RvU3RyaW5nLnRlc3Qoc3RyKSkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld1N0ciA9IEpTT04uc3RyaW5naWZ5KG9iaik7XHJcbiAgICAgICAgICAgICAgICBzdHIgPSBuZXdTdHI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2goZSkge1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc3RyLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBzdHIgPSBcIihlbXB0eSBhcnJheSlcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKFwiKDxcIiArIHNuaXAoc3RyKSArIFwiPiwgbm8gc3RhY2sgdHJhY2UpXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzbmlwKHN0cikge1xyXG4gICAgdmFyIG1heENoYXJzID0gNDE7XHJcbiAgICBpZiAoc3RyLmxlbmd0aCA8IG1heENoYXJzKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgIH1cclxuICAgIHJldHVybiBzdHIuc3Vic3RyKDAsIG1heENoYXJzIC0gMykgKyBcIi4uLlwiO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsb25nU3RhY2tUcmFjZXNJc1N1cHBvcnRlZCgpIHtcclxuICAgIHJldHVybiB0eXBlb2YgY2FwdHVyZVN0YWNrVHJhY2UgPT09IFwiZnVuY3Rpb25cIjtcclxufVxyXG5cclxudmFyIHNob3VsZElnbm9yZSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gZmFsc2U7IH07XHJcbnZhciBwYXJzZUxpbmVJbmZvUmVnZXggPSAvW1xcLzxcXChdKFteOlxcL10rKTooXFxkKyk6KD86XFxkKylcXCk/XFxzKiQvO1xyXG5mdW5jdGlvbiBwYXJzZUxpbmVJbmZvKGxpbmUpIHtcclxuICAgIHZhciBtYXRjaGVzID0gbGluZS5tYXRjaChwYXJzZUxpbmVJbmZvUmVnZXgpO1xyXG4gICAgaWYgKG1hdGNoZXMpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBmaWxlTmFtZTogbWF0Y2hlc1sxXSxcclxuICAgICAgICAgICAgbGluZTogcGFyc2VJbnQobWF0Y2hlc1syXSwgMTApXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2V0Qm91bmRzKGZpcnN0TGluZUVycm9yLCBsYXN0TGluZUVycm9yKSB7XHJcbiAgICBpZiAoIWxvbmdTdGFja1RyYWNlc0lzU3VwcG9ydGVkKCkpIHJldHVybjtcclxuICAgIHZhciBmaXJzdFN0YWNrTGluZXMgPSBmaXJzdExpbmVFcnJvci5zdGFjay5zcGxpdChcIlxcblwiKTtcclxuICAgIHZhciBsYXN0U3RhY2tMaW5lcyA9IGxhc3RMaW5lRXJyb3Iuc3RhY2suc3BsaXQoXCJcXG5cIik7XHJcbiAgICB2YXIgZmlyc3RJbmRleCA9IC0xO1xyXG4gICAgdmFyIGxhc3RJbmRleCA9IC0xO1xyXG4gICAgdmFyIGZpcnN0RmlsZU5hbWU7XHJcbiAgICB2YXIgbGFzdEZpbGVOYW1lO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaXJzdFN0YWNrTGluZXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gcGFyc2VMaW5lSW5mbyhmaXJzdFN0YWNrTGluZXNbaV0pO1xyXG4gICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgZmlyc3RGaWxlTmFtZSA9IHJlc3VsdC5maWxlTmFtZTtcclxuICAgICAgICAgICAgZmlyc3RJbmRleCA9IHJlc3VsdC5saW5lO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RTdGFja0xpbmVzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHBhcnNlTGluZUluZm8obGFzdFN0YWNrTGluZXNbaV0pO1xyXG4gICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgbGFzdEZpbGVOYW1lID0gcmVzdWx0LmZpbGVOYW1lO1xyXG4gICAgICAgICAgICBsYXN0SW5kZXggPSByZXN1bHQubGluZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGZpcnN0SW5kZXggPCAwIHx8IGxhc3RJbmRleCA8IDAgfHwgIWZpcnN0RmlsZU5hbWUgfHwgIWxhc3RGaWxlTmFtZSB8fFxyXG4gICAgICAgIGZpcnN0RmlsZU5hbWUgIT09IGxhc3RGaWxlTmFtZSB8fCBmaXJzdEluZGV4ID49IGxhc3RJbmRleCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzaG91bGRJZ25vcmUgPSBmdW5jdGlvbihsaW5lKSB7XHJcbiAgICAgICAgaWYgKGJsdWViaXJkRnJhbWVQYXR0ZXJuLnRlc3QobGluZSkpIHJldHVybiB0cnVlO1xyXG4gICAgICAgIHZhciBpbmZvID0gcGFyc2VMaW5lSW5mbyhsaW5lKTtcclxuICAgICAgICBpZiAoaW5mbykge1xyXG4gICAgICAgICAgICBpZiAoaW5mby5maWxlTmFtZSA9PT0gZmlyc3RGaWxlTmFtZSAmJlxyXG4gICAgICAgICAgICAgICAgKGZpcnN0SW5kZXggPD0gaW5mby5saW5lICYmIGluZm8ubGluZSA8PSBsYXN0SW5kZXgpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBDYXB0dXJlZFRyYWNlKHBhcmVudCkge1xyXG4gICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xyXG4gICAgdGhpcy5fcHJvbWlzZXNDcmVhdGVkID0gMDtcclxuICAgIHZhciBsZW5ndGggPSB0aGlzLl9sZW5ndGggPSAxICsgKHBhcmVudCA9PT0gdW5kZWZpbmVkID8gMCA6IHBhcmVudC5fbGVuZ3RoKTtcclxuICAgIGNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIENhcHR1cmVkVHJhY2UpO1xyXG4gICAgaWYgKGxlbmd0aCA+IDMyKSB0aGlzLnVuY3ljbGUoKTtcclxufVxyXG51dGlsLmluaGVyaXRzKENhcHR1cmVkVHJhY2UsIEVycm9yKTtcclxuQ29udGV4dC5DYXB0dXJlZFRyYWNlID0gQ2FwdHVyZWRUcmFjZTtcclxuXHJcbkNhcHR1cmVkVHJhY2UucHJvdG90eXBlLnVuY3ljbGUgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBsZW5ndGggPSB0aGlzLl9sZW5ndGg7XHJcbiAgICBpZiAobGVuZ3RoIDwgMikgcmV0dXJuO1xyXG4gICAgdmFyIG5vZGVzID0gW107XHJcbiAgICB2YXIgc3RhY2tUb0luZGV4ID0ge307XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDAsIG5vZGUgPSB0aGlzOyBub2RlICE9PSB1bmRlZmluZWQ7ICsraSkge1xyXG4gICAgICAgIG5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgICAgbm9kZSA9IG5vZGUuX3BhcmVudDtcclxuICAgIH1cclxuICAgIGxlbmd0aCA9IHRoaXMuX2xlbmd0aCA9IGk7XHJcbiAgICBmb3IgKHZhciBpID0gbGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcclxuICAgICAgICB2YXIgc3RhY2sgPSBub2Rlc1tpXS5zdGFjaztcclxuICAgICAgICBpZiAoc3RhY2tUb0luZGV4W3N0YWNrXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHN0YWNrVG9JbmRleFtzdGFja10gPSBpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcclxuICAgICAgICB2YXIgY3VycmVudFN0YWNrID0gbm9kZXNbaV0uc3RhY2s7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gc3RhY2tUb0luZGV4W2N1cnJlbnRTdGFja107XHJcbiAgICAgICAgaWYgKGluZGV4ICE9PSB1bmRlZmluZWQgJiYgaW5kZXggIT09IGkpIHtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbm9kZXNbaW5kZXggLSAxXS5fcGFyZW50ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgbm9kZXNbaW5kZXggLSAxXS5fbGVuZ3RoID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBub2Rlc1tpXS5fcGFyZW50ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBub2Rlc1tpXS5fbGVuZ3RoID0gMTtcclxuICAgICAgICAgICAgdmFyIGN5Y2xlRWRnZU5vZGUgPSBpID4gMCA/IG5vZGVzW2kgLSAxXSA6IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBpZiAoaW5kZXggPCBsZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICBjeWNsZUVkZ2VOb2RlLl9wYXJlbnQgPSBub2Rlc1tpbmRleCArIDFdO1xyXG4gICAgICAgICAgICAgICAgY3ljbGVFZGdlTm9kZS5fcGFyZW50LnVuY3ljbGUoKTtcclxuICAgICAgICAgICAgICAgIGN5Y2xlRWRnZU5vZGUuX2xlbmd0aCA9XHJcbiAgICAgICAgICAgICAgICAgICAgY3ljbGVFZGdlTm9kZS5fcGFyZW50Ll9sZW5ndGggKyAxO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY3ljbGVFZGdlTm9kZS5fcGFyZW50ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgY3ljbGVFZGdlTm9kZS5fbGVuZ3RoID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgY3VycmVudENoaWxkTGVuZ3RoID0gY3ljbGVFZGdlTm9kZS5fbGVuZ3RoICsgMTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IGkgLSAyOyBqID49IDA7IC0taikge1xyXG4gICAgICAgICAgICAgICAgbm9kZXNbal0uX2xlbmd0aCA9IGN1cnJlbnRDaGlsZExlbmd0aDtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRDaGlsZExlbmd0aCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5DYXB0dXJlZFRyYWNlLnByb3RvdHlwZS5hdHRhY2hFeHRyYVRyYWNlID0gZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgIGlmIChlcnJvci5fX3N0YWNrQ2xlYW5lZF9fKSByZXR1cm47XHJcbiAgICB0aGlzLnVuY3ljbGUoKTtcclxuICAgIHZhciBwYXJzZWQgPSBwYXJzZVN0YWNrQW5kTWVzc2FnZShlcnJvcik7XHJcbiAgICB2YXIgbWVzc2FnZSA9IHBhcnNlZC5tZXNzYWdlO1xyXG4gICAgdmFyIHN0YWNrcyA9IFtwYXJzZWQuc3RhY2tdO1xyXG5cclxuICAgIHZhciB0cmFjZSA9IHRoaXM7XHJcbiAgICB3aGlsZSAodHJhY2UgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHN0YWNrcy5wdXNoKGNsZWFuU3RhY2sodHJhY2Uuc3RhY2suc3BsaXQoXCJcXG5cIikpKTtcclxuICAgICAgICB0cmFjZSA9IHRyYWNlLl9wYXJlbnQ7XHJcbiAgICB9XHJcbiAgICByZW1vdmVDb21tb25Sb290cyhzdGFja3MpO1xyXG4gICAgcmVtb3ZlRHVwbGljYXRlT3JFbXB0eUp1bXBzKHN0YWNrcyk7XHJcbiAgICB1dGlsLm5vdEVudW1lcmFibGVQcm9wKGVycm9yLCBcInN0YWNrXCIsIHJlY29uc3RydWN0U3RhY2sobWVzc2FnZSwgc3RhY2tzKSk7XHJcbiAgICB1dGlsLm5vdEVudW1lcmFibGVQcm9wKGVycm9yLCBcIl9fc3RhY2tDbGVhbmVkX19cIiwgdHJ1ZSk7XHJcbn07XHJcblxyXG52YXIgY2FwdHVyZVN0YWNrVHJhY2UgPSAoZnVuY3Rpb24gc3RhY2tEZXRlY3Rpb24oKSB7XHJcbiAgICB2YXIgdjhzdGFja0ZyYW1lUGF0dGVybiA9IC9eXFxzKmF0XFxzKi87XHJcbiAgICB2YXIgdjhzdGFja0Zvcm1hdHRlciA9IGZ1bmN0aW9uKHN0YWNrLCBlcnJvcikge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygc3RhY2sgPT09IFwic3RyaW5nXCIpIHJldHVybiBzdGFjaztcclxuXHJcbiAgICAgICAgaWYgKGVycm9yLm5hbWUgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgICAgICBlcnJvci5tZXNzYWdlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVycm9yLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmb3JtYXROb25FcnJvcihlcnJvcik7XHJcbiAgICB9O1xyXG5cclxuICAgIGlmICh0eXBlb2YgRXJyb3Iuc3RhY2tUcmFjZUxpbWl0ID09PSBcIm51bWJlclwiICYmXHJcbiAgICAgICAgdHlwZW9mIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICBFcnJvci5zdGFja1RyYWNlTGltaXQgKz0gNjtcclxuICAgICAgICBzdGFja0ZyYW1lUGF0dGVybiA9IHY4c3RhY2tGcmFtZVBhdHRlcm47XHJcbiAgICAgICAgZm9ybWF0U3RhY2sgPSB2OHN0YWNrRm9ybWF0dGVyO1xyXG4gICAgICAgIHZhciBjYXB0dXJlU3RhY2tUcmFjZSA9IEVycm9yLmNhcHR1cmVTdGFja1RyYWNlO1xyXG5cclxuICAgICAgICBzaG91bGRJZ25vcmUgPSBmdW5jdGlvbihsaW5lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBibHVlYmlyZEZyYW1lUGF0dGVybi50ZXN0KGxpbmUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHJlY2VpdmVyLCBpZ25vcmVVbnRpbCkge1xyXG4gICAgICAgICAgICBFcnJvci5zdGFja1RyYWNlTGltaXQgKz0gNjtcclxuICAgICAgICAgICAgY2FwdHVyZVN0YWNrVHJhY2UocmVjZWl2ZXIsIGlnbm9yZVVudGlsKTtcclxuICAgICAgICAgICAgRXJyb3Iuc3RhY2tUcmFjZUxpbWl0IC09IDY7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoKTtcclxuXHJcbiAgICBpZiAodHlwZW9mIGVyci5zdGFjayA9PT0gXCJzdHJpbmdcIiAmJlxyXG4gICAgICAgIGVyci5zdGFjay5zcGxpdChcIlxcblwiKVswXS5pbmRleE9mKFwic3RhY2tEZXRlY3Rpb25AXCIpID49IDApIHtcclxuICAgICAgICBzdGFja0ZyYW1lUGF0dGVybiA9IC9ALztcclxuICAgICAgICBmb3JtYXRTdGFjayA9IHY4c3RhY2tGb3JtYXR0ZXI7XHJcbiAgICAgICAgaW5kZW50U3RhY2tGcmFtZXMgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBjYXB0dXJlU3RhY2tUcmFjZShvKSB7XHJcbiAgICAgICAgICAgIG8uc3RhY2sgPSBuZXcgRXJyb3IoKS5zdGFjaztcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBoYXNTdGFja0FmdGVyVGhyb3c7XHJcbiAgICB0cnkgeyB0aHJvdyBuZXcgRXJyb3IoKTsgfVxyXG4gICAgY2F0Y2goZSkge1xyXG4gICAgICAgIGhhc1N0YWNrQWZ0ZXJUaHJvdyA9IChcInN0YWNrXCIgaW4gZSk7XHJcbiAgICB9XHJcbiAgICBpZiAoIShcInN0YWNrXCIgaW4gZXJyKSAmJiBoYXNTdGFja0FmdGVyVGhyb3cgJiZcclxuICAgICAgICB0eXBlb2YgRXJyb3Iuc3RhY2tUcmFjZUxpbWl0ID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgc3RhY2tGcmFtZVBhdHRlcm4gPSB2OHN0YWNrRnJhbWVQYXR0ZXJuO1xyXG4gICAgICAgIGZvcm1hdFN0YWNrID0gdjhzdGFja0Zvcm1hdHRlcjtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gY2FwdHVyZVN0YWNrVHJhY2Uobykge1xyXG4gICAgICAgICAgICBFcnJvci5zdGFja1RyYWNlTGltaXQgKz0gNjtcclxuICAgICAgICAgICAgdHJ5IHsgdGhyb3cgbmV3IEVycm9yKCk7IH1cclxuICAgICAgICAgICAgY2F0Y2goZSkgeyBvLnN0YWNrID0gZS5zdGFjazsgfVxyXG4gICAgICAgICAgICBFcnJvci5zdGFja1RyYWNlTGltaXQgLT0gNjtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZvcm1hdFN0YWNrID0gZnVuY3Rpb24oc3RhY2ssIGVycm9yKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzdGFjayA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIHN0YWNrO1xyXG5cclxuICAgICAgICBpZiAoKHR5cGVvZiBlcnJvciA9PT0gXCJvYmplY3RcIiB8fFxyXG4gICAgICAgICAgICB0eXBlb2YgZXJyb3IgPT09IFwiZnVuY3Rpb25cIikgJiZcclxuICAgICAgICAgICAgZXJyb3IubmFtZSAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZXJyb3IudG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZvcm1hdE5vbkVycm9yKGVycm9yKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcblxyXG59KShbXSk7XHJcblxyXG5pZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNvbnNvbGUud2FybiAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4obWVzc2FnZSk7XHJcbiAgICB9O1xyXG4gICAgaWYgKHV0aWwuaXNOb2RlICYmIHByb2Nlc3Muc3RkZXJyLmlzVFRZKSB7XHJcbiAgICAgICAgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24obWVzc2FnZSwgaXNTb2Z0KSB7XHJcbiAgICAgICAgICAgIHZhciBjb2xvciA9IGlzU29mdCA/IFwiXFx1MDAxYlszM21cIiA6IFwiXFx1MDAxYlszMW1cIjtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGNvbG9yICsgbWVzc2FnZSArIFwiXFx1MDAxYlswbVxcblwiKTtcclxuICAgICAgICB9O1xyXG4gICAgfSBlbHNlIGlmICghdXRpbC5pc05vZGUgJiYgdHlwZW9mIChuZXcgRXJyb3IoKS5zdGFjaykgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICBwcmludFdhcm5pbmcgPSBmdW5jdGlvbihtZXNzYWdlLCBpc1NvZnQpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiJWNcIiArIG1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU29mdCA/IFwiY29sb3I6IGRhcmtvcmFuZ2VcIiA6IFwiY29sb3I6IHJlZFwiKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcblxyXG52YXIgY29uZmlnID0ge1xyXG4gICAgd2FybmluZ3M6IHdhcm5pbmdzLFxyXG4gICAgbG9uZ1N0YWNrVHJhY2VzOiBmYWxzZSxcclxuICAgIGNhbmNlbGxhdGlvbjogZmFsc2UsXHJcbiAgICBtb25pdG9yaW5nOiBmYWxzZVxyXG59O1xyXG5cclxuaWYgKGxvbmdTdGFja1RyYWNlcykgUHJvbWlzZS5sb25nU3RhY2tUcmFjZXMoKTtcclxuXHJcbnJldHVybiB7XHJcbiAgICBsb25nU3RhY2tUcmFjZXM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBjb25maWcubG9uZ1N0YWNrVHJhY2VzO1xyXG4gICAgfSxcclxuICAgIHdhcm5pbmdzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gY29uZmlnLndhcm5pbmdzO1xyXG4gICAgfSxcclxuICAgIGNhbmNlbGxhdGlvbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZy5jYW5jZWxsYXRpb247XHJcbiAgICB9LFxyXG4gICAgbW9uaXRvcmluZzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZy5tb25pdG9yaW5nO1xyXG4gICAgfSxcclxuICAgIHByb3BhZ2F0ZUZyb21GdW5jdGlvbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHByb3BhZ2F0ZUZyb21GdW5jdGlvbjtcclxuICAgIH0sXHJcbiAgICBib3VuZFZhbHVlRnVuY3Rpb246IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBib3VuZFZhbHVlRnVuY3Rpb247XHJcbiAgICB9LFxyXG4gICAgY2hlY2tGb3Jnb3R0ZW5SZXR1cm5zOiBjaGVja0ZvcmdvdHRlblJldHVybnMsXHJcbiAgICBzZXRCb3VuZHM6IHNldEJvdW5kcyxcclxuICAgIHdhcm46IHdhcm4sXHJcbiAgICBkZXByZWNhdGVkOiBkZXByZWNhdGVkLFxyXG4gICAgQ2FwdHVyZWRUcmFjZTogQ2FwdHVyZWRUcmFjZSxcclxuICAgIGZpcmVEb21FdmVudDogZmlyZURvbUV2ZW50LFxyXG4gICAgZmlyZUdsb2JhbEV2ZW50OiBmaXJlR2xvYmFsRXZlbnRcclxufTtcclxufTtcclxuXHJcbn0se1wiLi9lcnJvcnNcIjoxMixcIi4vdXRpbFwiOjM2fV0sMTA6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihQcm9taXNlKSB7XHJcbmZ1bmN0aW9uIHJldHVybmVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbn1cclxuZnVuY3Rpb24gdGhyb3dlcigpIHtcclxuICAgIHRocm93IHRoaXMucmVhc29uO1xyXG59XHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZVtcInJldHVyblwiXSA9XHJcblByb21pc2UucHJvdG90eXBlLnRoZW5SZXR1cm4gPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFByb21pc2UpIHZhbHVlLnN1cHByZXNzVW5oYW5kbGVkUmVqZWN0aW9ucygpO1xyXG4gICAgcmV0dXJuIHRoaXMuX3RoZW4oXHJcbiAgICAgICAgcmV0dXJuZXIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB7dmFsdWU6IHZhbHVlfSwgdW5kZWZpbmVkKTtcclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlW1widGhyb3dcIl0gPVxyXG5Qcm9taXNlLnByb3RvdHlwZS50aGVuVGhyb3cgPSBmdW5jdGlvbiAocmVhc29uKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdGhlbihcclxuICAgICAgICB0aHJvd2VyLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwge3JlYXNvbjogcmVhc29ufSwgdW5kZWZpbmVkKTtcclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLmNhdGNoVGhyb3cgPSBmdW5jdGlvbiAocmVhc29uKSB7XHJcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8PSAxKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RoZW4oXHJcbiAgICAgICAgICAgIHVuZGVmaW5lZCwgdGhyb3dlciwgdW5kZWZpbmVkLCB7cmVhc29uOiByZWFzb259LCB1bmRlZmluZWQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgX3JlYXNvbiA9IGFyZ3VtZW50c1sxXTtcclxuICAgICAgICB2YXIgaGFuZGxlciA9IGZ1bmN0aW9uKCkge3Rocm93IF9yZWFzb247fTtcclxuICAgICAgICByZXR1cm4gdGhpcy5jYXVnaHQocmVhc29uLCBoYW5kbGVyKTtcclxuICAgIH1cclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLmNhdGNoUmV0dXJuID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8PSAxKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSkgdmFsdWUuc3VwcHJlc3NVbmhhbmRsZWRSZWplY3Rpb25zKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RoZW4oXHJcbiAgICAgICAgICAgIHVuZGVmaW5lZCwgcmV0dXJuZXIsIHVuZGVmaW5lZCwge3ZhbHVlOiB2YWx1ZX0sIHVuZGVmaW5lZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBfdmFsdWUgPSBhcmd1bWVudHNbMV07XHJcbiAgICAgICAgaWYgKF92YWx1ZSBpbnN0YW5jZW9mIFByb21pc2UpIF92YWx1ZS5zdXBwcmVzc1VuaGFuZGxlZFJlamVjdGlvbnMoKTtcclxuICAgICAgICB2YXIgaGFuZGxlciA9IGZ1bmN0aW9uKCkge3JldHVybiBfdmFsdWU7fTtcclxuICAgICAgICByZXR1cm4gdGhpcy5jYXVnaHQodmFsdWUsIGhhbmRsZXIpO1xyXG4gICAgfVxyXG59O1xyXG59O1xyXG5cclxufSx7fV0sMTE6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihQcm9taXNlLCBJTlRFUk5BTCkge1xyXG52YXIgUHJvbWlzZVJlZHVjZSA9IFByb21pc2UucmVkdWNlO1xyXG52YXIgUHJvbWlzZUFsbCA9IFByb21pc2UuYWxsO1xyXG5cclxuZnVuY3Rpb24gcHJvbWlzZUFsbFRoaXMoKSB7XHJcbiAgICByZXR1cm4gUHJvbWlzZUFsbCh0aGlzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gUHJvbWlzZU1hcFNlcmllcyhwcm9taXNlcywgZm4pIHtcclxuICAgIHJldHVybiBQcm9taXNlUmVkdWNlKHByb21pc2VzLCBmbiwgSU5URVJOQUwsIElOVEVSTkFMKTtcclxufVxyXG5cclxuUHJvbWlzZS5wcm90b3R5cGUuZWFjaCA9IGZ1bmN0aW9uIChmbikge1xyXG4gICAgcmV0dXJuIFByb21pc2VSZWR1Y2UodGhpcywgZm4sIElOVEVSTkFMLCAwKVxyXG4gICAgICAgICAgICAgIC5fdGhlbihwcm9taXNlQWxsVGhpcywgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMsIHVuZGVmaW5lZCk7XHJcbn07XHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZS5tYXBTZXJpZXMgPSBmdW5jdGlvbiAoZm4pIHtcclxuICAgIHJldHVybiBQcm9taXNlUmVkdWNlKHRoaXMsIGZuLCBJTlRFUk5BTCwgSU5URVJOQUwpO1xyXG59O1xyXG5cclxuUHJvbWlzZS5lYWNoID0gZnVuY3Rpb24gKHByb21pc2VzLCBmbikge1xyXG4gICAgcmV0dXJuIFByb21pc2VSZWR1Y2UocHJvbWlzZXMsIGZuLCBJTlRFUk5BTCwgMClcclxuICAgICAgICAgICAgICAuX3RoZW4ocHJvbWlzZUFsbFRoaXMsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBwcm9taXNlcywgdW5kZWZpbmVkKTtcclxufTtcclxuXHJcblByb21pc2UubWFwU2VyaWVzID0gUHJvbWlzZU1hcFNlcmllcztcclxufTtcclxuXHJcblxyXG59LHt9XSwxMjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG52YXIgZXM1ID0gX2RlcmVxXyhcIi4vZXM1XCIpO1xyXG52YXIgT2JqZWN0ZnJlZXplID0gZXM1LmZyZWV6ZTtcclxudmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xyXG52YXIgaW5oZXJpdHMgPSB1dGlsLmluaGVyaXRzO1xyXG52YXIgbm90RW51bWVyYWJsZVByb3AgPSB1dGlsLm5vdEVudW1lcmFibGVQcm9wO1xyXG5cclxuZnVuY3Rpb24gc3ViRXJyb3IobmFtZVByb3BlcnR5LCBkZWZhdWx0TWVzc2FnZSkge1xyXG4gICAgZnVuY3Rpb24gU3ViRXJyb3IobWVzc2FnZSkge1xyXG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBTdWJFcnJvcikpIHJldHVybiBuZXcgU3ViRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgICAgbm90RW51bWVyYWJsZVByb3AodGhpcywgXCJtZXNzYWdlXCIsXHJcbiAgICAgICAgICAgIHR5cGVvZiBtZXNzYWdlID09PSBcInN0cmluZ1wiID8gbWVzc2FnZSA6IGRlZmF1bHRNZXNzYWdlKTtcclxuICAgICAgICBub3RFbnVtZXJhYmxlUHJvcCh0aGlzLCBcIm5hbWVcIiwgbmFtZVByb3BlcnR5KTtcclxuICAgICAgICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcclxuICAgICAgICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgRXJyb3IuY2FsbCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpbmhlcml0cyhTdWJFcnJvciwgRXJyb3IpO1xyXG4gICAgcmV0dXJuIFN1YkVycm9yO1xyXG59XHJcblxyXG52YXIgX1R5cGVFcnJvciwgX1JhbmdlRXJyb3I7XHJcbnZhciBXYXJuaW5nID0gc3ViRXJyb3IoXCJXYXJuaW5nXCIsIFwid2FybmluZ1wiKTtcclxudmFyIENhbmNlbGxhdGlvbkVycm9yID0gc3ViRXJyb3IoXCJDYW5jZWxsYXRpb25FcnJvclwiLCBcImNhbmNlbGxhdGlvbiBlcnJvclwiKTtcclxudmFyIFRpbWVvdXRFcnJvciA9IHN1YkVycm9yKFwiVGltZW91dEVycm9yXCIsIFwidGltZW91dCBlcnJvclwiKTtcclxudmFyIEFnZ3JlZ2F0ZUVycm9yID0gc3ViRXJyb3IoXCJBZ2dyZWdhdGVFcnJvclwiLCBcImFnZ3JlZ2F0ZSBlcnJvclwiKTtcclxudHJ5IHtcclxuICAgIF9UeXBlRXJyb3IgPSBUeXBlRXJyb3I7XHJcbiAgICBfUmFuZ2VFcnJvciA9IFJhbmdlRXJyb3I7XHJcbn0gY2F0Y2goZSkge1xyXG4gICAgX1R5cGVFcnJvciA9IHN1YkVycm9yKFwiVHlwZUVycm9yXCIsIFwidHlwZSBlcnJvclwiKTtcclxuICAgIF9SYW5nZUVycm9yID0gc3ViRXJyb3IoXCJSYW5nZUVycm9yXCIsIFwicmFuZ2UgZXJyb3JcIik7XHJcbn1cclxuXHJcbnZhciBtZXRob2RzID0gKFwiam9pbiBwb3AgcHVzaCBzaGlmdCB1bnNoaWZ0IHNsaWNlIGZpbHRlciBmb3JFYWNoIHNvbWUgXCIgK1xyXG4gICAgXCJldmVyeSBtYXAgaW5kZXhPZiBsYXN0SW5kZXhPZiByZWR1Y2UgcmVkdWNlUmlnaHQgc29ydCByZXZlcnNlXCIpLnNwbGl0KFwiIFwiKTtcclxuXHJcbmZvciAodmFyIGkgPSAwOyBpIDwgbWV0aG9kcy5sZW5ndGg7ICsraSkge1xyXG4gICAgaWYgKHR5cGVvZiBBcnJheS5wcm90b3R5cGVbbWV0aG9kc1tpXV0gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIEFnZ3JlZ2F0ZUVycm9yLnByb3RvdHlwZVttZXRob2RzW2ldXSA9IEFycmF5LnByb3RvdHlwZVttZXRob2RzW2ldXTtcclxuICAgIH1cclxufVxyXG5cclxuZXM1LmRlZmluZVByb3BlcnR5KEFnZ3JlZ2F0ZUVycm9yLnByb3RvdHlwZSwgXCJsZW5ndGhcIiwge1xyXG4gICAgdmFsdWU6IDAsXHJcbiAgICBjb25maWd1cmFibGU6IGZhbHNlLFxyXG4gICAgd3JpdGFibGU6IHRydWUsXHJcbiAgICBlbnVtZXJhYmxlOiB0cnVlXHJcbn0pO1xyXG5BZ2dyZWdhdGVFcnJvci5wcm90b3R5cGVbXCJpc09wZXJhdGlvbmFsXCJdID0gdHJ1ZTtcclxudmFyIGxldmVsID0gMDtcclxuQWdncmVnYXRlRXJyb3IucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgaW5kZW50ID0gQXJyYXkobGV2ZWwgKiA0ICsgMSkuam9pbihcIiBcIik7XHJcbiAgICB2YXIgcmV0ID0gXCJcXG5cIiArIGluZGVudCArIFwiQWdncmVnYXRlRXJyb3Igb2Y6XCIgKyBcIlxcblwiO1xyXG4gICAgbGV2ZWwrKztcclxuICAgIGluZGVudCA9IEFycmF5KGxldmVsICogNCArIDEpLmpvaW4oXCIgXCIpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgdmFyIHN0ciA9IHRoaXNbaV0gPT09IHRoaXMgPyBcIltDaXJjdWxhciBBZ2dyZWdhdGVFcnJvcl1cIiA6IHRoaXNbaV0gKyBcIlwiO1xyXG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKTtcclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGxpbmVzLmxlbmd0aDsgKytqKSB7XHJcbiAgICAgICAgICAgIGxpbmVzW2pdID0gaW5kZW50ICsgbGluZXNbal07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0ciA9IGxpbmVzLmpvaW4oXCJcXG5cIik7XHJcbiAgICAgICAgcmV0ICs9IHN0ciArIFwiXFxuXCI7XHJcbiAgICB9XHJcbiAgICBsZXZlbC0tO1xyXG4gICAgcmV0dXJuIHJldDtcclxufTtcclxuXHJcbmZ1bmN0aW9uIE9wZXJhdGlvbmFsRXJyb3IobWVzc2FnZSkge1xyXG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIE9wZXJhdGlvbmFsRXJyb3IpKVxyXG4gICAgICAgIHJldHVybiBuZXcgT3BlcmF0aW9uYWxFcnJvcihtZXNzYWdlKTtcclxuICAgIG5vdEVudW1lcmFibGVQcm9wKHRoaXMsIFwibmFtZVwiLCBcIk9wZXJhdGlvbmFsRXJyb3JcIik7XHJcbiAgICBub3RFbnVtZXJhYmxlUHJvcCh0aGlzLCBcIm1lc3NhZ2VcIiwgbWVzc2FnZSk7XHJcbiAgICB0aGlzLmNhdXNlID0gbWVzc2FnZTtcclxuICAgIHRoaXNbXCJpc09wZXJhdGlvbmFsXCJdID0gdHJ1ZTtcclxuXHJcbiAgICBpZiAobWVzc2FnZSBpbnN0YW5jZW9mIEVycm9yKSB7XHJcbiAgICAgICAgbm90RW51bWVyYWJsZVByb3AodGhpcywgXCJtZXNzYWdlXCIsIG1lc3NhZ2UubWVzc2FnZSk7XHJcbiAgICAgICAgbm90RW51bWVyYWJsZVByb3AodGhpcywgXCJzdGFja1wiLCBtZXNzYWdlLnN0YWNrKTtcclxuICAgIH0gZWxzZSBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcclxuICAgICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcclxuICAgIH1cclxuXHJcbn1cclxuaW5oZXJpdHMoT3BlcmF0aW9uYWxFcnJvciwgRXJyb3IpO1xyXG5cclxudmFyIGVycm9yVHlwZXMgPSBFcnJvcltcIl9fQmx1ZWJpcmRFcnJvclR5cGVzX19cIl07XHJcbmlmICghZXJyb3JUeXBlcykge1xyXG4gICAgZXJyb3JUeXBlcyA9IE9iamVjdGZyZWV6ZSh7XHJcbiAgICAgICAgQ2FuY2VsbGF0aW9uRXJyb3I6IENhbmNlbGxhdGlvbkVycm9yLFxyXG4gICAgICAgIFRpbWVvdXRFcnJvcjogVGltZW91dEVycm9yLFxyXG4gICAgICAgIE9wZXJhdGlvbmFsRXJyb3I6IE9wZXJhdGlvbmFsRXJyb3IsXHJcbiAgICAgICAgUmVqZWN0aW9uRXJyb3I6IE9wZXJhdGlvbmFsRXJyb3IsXHJcbiAgICAgICAgQWdncmVnYXRlRXJyb3I6IEFnZ3JlZ2F0ZUVycm9yXHJcbiAgICB9KTtcclxuICAgIGVzNS5kZWZpbmVQcm9wZXJ0eShFcnJvciwgXCJfX0JsdWViaXJkRXJyb3JUeXBlc19fXCIsIHtcclxuICAgICAgICB2YWx1ZTogZXJyb3JUeXBlcyxcclxuICAgICAgICB3cml0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgRXJyb3I6IEVycm9yLFxyXG4gICAgVHlwZUVycm9yOiBfVHlwZUVycm9yLFxyXG4gICAgUmFuZ2VFcnJvcjogX1JhbmdlRXJyb3IsXHJcbiAgICBDYW5jZWxsYXRpb25FcnJvcjogZXJyb3JUeXBlcy5DYW5jZWxsYXRpb25FcnJvcixcclxuICAgIE9wZXJhdGlvbmFsRXJyb3I6IGVycm9yVHlwZXMuT3BlcmF0aW9uYWxFcnJvcixcclxuICAgIFRpbWVvdXRFcnJvcjogZXJyb3JUeXBlcy5UaW1lb3V0RXJyb3IsXHJcbiAgICBBZ2dyZWdhdGVFcnJvcjogZXJyb3JUeXBlcy5BZ2dyZWdhdGVFcnJvcixcclxuICAgIFdhcm5pbmc6IFdhcm5pbmdcclxufTtcclxuXHJcbn0se1wiLi9lczVcIjoxMyxcIi4vdXRpbFwiOjM2fV0sMTM6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xyXG52YXIgaXNFUzUgPSAoZnVuY3Rpb24oKXtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIHRoaXMgPT09IHVuZGVmaW5lZDtcclxufSkoKTtcclxuXHJcbmlmIChpc0VTNSkge1xyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICAgICAgZnJlZXplOiBPYmplY3QuZnJlZXplLFxyXG4gICAgICAgIGRlZmluZVByb3BlcnR5OiBPYmplY3QuZGVmaW5lUHJvcGVydHksXHJcbiAgICAgICAgZ2V0RGVzY3JpcHRvcjogT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcixcclxuICAgICAgICBrZXlzOiBPYmplY3Qua2V5cyxcclxuICAgICAgICBuYW1lczogT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMsXHJcbiAgICAgICAgZ2V0UHJvdG90eXBlT2Y6IE9iamVjdC5nZXRQcm90b3R5cGVPZixcclxuICAgICAgICBpc0FycmF5OiBBcnJheS5pc0FycmF5LFxyXG4gICAgICAgIGlzRVM1OiBpc0VTNSxcclxuICAgICAgICBwcm9wZXJ0eUlzV3JpdGFibGU6IGZ1bmN0aW9uKG9iaiwgcHJvcCkge1xyXG4gICAgICAgICAgICB2YXIgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBwcm9wKTtcclxuICAgICAgICAgICAgcmV0dXJuICEhKCFkZXNjcmlwdG9yIHx8IGRlc2NyaXB0b3Iud3JpdGFibGUgfHwgZGVzY3JpcHRvci5zZXQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn0gZWxzZSB7XHJcbiAgICB2YXIgaGFzID0ge30uaGFzT3duUHJvcGVydHk7XHJcbiAgICB2YXIgc3RyID0ge30udG9TdHJpbmc7XHJcbiAgICB2YXIgcHJvdG8gPSB7fS5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XHJcblxyXG4gICAgdmFyIE9iamVjdEtleXMgPSBmdW5jdGlvbiAobykge1xyXG4gICAgICAgIHZhciByZXQgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gbykge1xyXG4gICAgICAgICAgICBpZiAoaGFzLmNhbGwobywga2V5KSkge1xyXG4gICAgICAgICAgICAgICAgcmV0LnB1c2goa2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgT2JqZWN0R2V0RGVzY3JpcHRvciA9IGZ1bmN0aW9uKG8sIGtleSkge1xyXG4gICAgICAgIHJldHVybiB7dmFsdWU6IG9ba2V5XX07XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBPYmplY3REZWZpbmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIChvLCBrZXksIGRlc2MpIHtcclxuICAgICAgICBvW2tleV0gPSBkZXNjLnZhbHVlO1xyXG4gICAgICAgIHJldHVybiBvO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgT2JqZWN0RnJlZXplID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBPYmplY3RHZXRQcm90b3R5cGVPZiA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0KG9iaikuY29uc3RydWN0b3IucHJvdG90eXBlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcHJvdG87XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgQXJyYXlJc0FycmF5ID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdHIuY2FsbChvYmopID09PSBcIltvYmplY3QgQXJyYXldXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICAgICAgaXNBcnJheTogQXJyYXlJc0FycmF5LFxyXG4gICAgICAgIGtleXM6IE9iamVjdEtleXMsXHJcbiAgICAgICAgbmFtZXM6IE9iamVjdEtleXMsXHJcbiAgICAgICAgZGVmaW5lUHJvcGVydHk6IE9iamVjdERlZmluZVByb3BlcnR5LFxyXG4gICAgICAgIGdldERlc2NyaXB0b3I6IE9iamVjdEdldERlc2NyaXB0b3IsXHJcbiAgICAgICAgZnJlZXplOiBPYmplY3RGcmVlemUsXHJcbiAgICAgICAgZ2V0UHJvdG90eXBlT2Y6IE9iamVjdEdldFByb3RvdHlwZU9mLFxyXG4gICAgICAgIGlzRVM1OiBpc0VTNSxcclxuICAgICAgICBwcm9wZXJ0eUlzV3JpdGFibGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG59LHt9XSwxNDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFByb21pc2UsIElOVEVSTkFMKSB7XHJcbnZhciBQcm9taXNlTWFwID0gUHJvbWlzZS5tYXA7XHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZS5maWx0ZXIgPSBmdW5jdGlvbiAoZm4sIG9wdGlvbnMpIHtcclxuICAgIHJldHVybiBQcm9taXNlTWFwKHRoaXMsIGZuLCBvcHRpb25zLCBJTlRFUk5BTCk7XHJcbn07XHJcblxyXG5Qcm9taXNlLmZpbHRlciA9IGZ1bmN0aW9uIChwcm9taXNlcywgZm4sIG9wdGlvbnMpIHtcclxuICAgIHJldHVybiBQcm9taXNlTWFwKHByb21pc2VzLCBmbiwgb3B0aW9ucywgSU5URVJOQUwpO1xyXG59O1xyXG59O1xyXG5cclxufSx7fV0sMTU6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihQcm9taXNlLCB0cnlDb252ZXJ0VG9Qcm9taXNlLCBORVhUX0ZJTFRFUikge1xyXG52YXIgdXRpbCA9IF9kZXJlcV8oXCIuL3V0aWxcIik7XHJcbnZhciBDYW5jZWxsYXRpb25FcnJvciA9IFByb21pc2UuQ2FuY2VsbGF0aW9uRXJyb3I7XHJcbnZhciBlcnJvck9iaiA9IHV0aWwuZXJyb3JPYmo7XHJcbnZhciBjYXRjaEZpbHRlciA9IF9kZXJlcV8oXCIuL2NhdGNoX2ZpbHRlclwiKShORVhUX0ZJTFRFUik7XHJcblxyXG5mdW5jdGlvbiBQYXNzVGhyb3VnaEhhbmRsZXJDb250ZXh0KHByb21pc2UsIHR5cGUsIGhhbmRsZXIpIHtcclxuICAgIHRoaXMucHJvbWlzZSA9IHByb21pc2U7XHJcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgdGhpcy5oYW5kbGVyID0gaGFuZGxlcjtcclxuICAgIHRoaXMuY2FsbGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmNhbmNlbFByb21pc2UgPSBudWxsO1xyXG59XHJcblxyXG5QYXNzVGhyb3VnaEhhbmRsZXJDb250ZXh0LnByb3RvdHlwZS5pc0ZpbmFsbHlIYW5kbGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy50eXBlID09PSAwO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gRmluYWxseUhhbmRsZXJDYW5jZWxSZWFjdGlvbihmaW5hbGx5SGFuZGxlcikge1xyXG4gICAgdGhpcy5maW5hbGx5SGFuZGxlciA9IGZpbmFsbHlIYW5kbGVyO1xyXG59XHJcblxyXG5GaW5hbGx5SGFuZGxlckNhbmNlbFJlYWN0aW9uLnByb3RvdHlwZS5fcmVzdWx0Q2FuY2VsbGVkID0gZnVuY3Rpb24oKSB7XHJcbiAgICBjaGVja0NhbmNlbCh0aGlzLmZpbmFsbHlIYW5kbGVyKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGNoZWNrQ2FuY2VsKGN0eCwgcmVhc29uKSB7XHJcbiAgICBpZiAoY3R4LmNhbmNlbFByb21pc2UgIT0gbnVsbCkge1xyXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICBjdHguY2FuY2VsUHJvbWlzZS5fcmVqZWN0KHJlYXNvbik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY3R4LmNhbmNlbFByb21pc2UuX2NhbmNlbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdHguY2FuY2VsUHJvbWlzZSA9IG51bGw7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN1Y2NlZWQoKSB7XHJcbiAgICByZXR1cm4gZmluYWxseUhhbmRsZXIuY2FsbCh0aGlzLCB0aGlzLnByb21pc2UuX3RhcmdldCgpLl9zZXR0bGVkVmFsdWUoKSk7XHJcbn1cclxuZnVuY3Rpb24gZmFpbChyZWFzb24pIHtcclxuICAgIGlmIChjaGVja0NhbmNlbCh0aGlzLCByZWFzb24pKSByZXR1cm47XHJcbiAgICBlcnJvck9iai5lID0gcmVhc29uO1xyXG4gICAgcmV0dXJuIGVycm9yT2JqO1xyXG59XHJcbmZ1bmN0aW9uIGZpbmFsbHlIYW5kbGVyKHJlYXNvbk9yVmFsdWUpIHtcclxuICAgIHZhciBwcm9taXNlID0gdGhpcy5wcm9taXNlO1xyXG4gICAgdmFyIGhhbmRsZXIgPSB0aGlzLmhhbmRsZXI7XHJcblxyXG4gICAgaWYgKCF0aGlzLmNhbGxlZCkge1xyXG4gICAgICAgIHRoaXMuY2FsbGVkID0gdHJ1ZTtcclxuICAgICAgICB2YXIgcmV0ID0gdGhpcy5pc0ZpbmFsbHlIYW5kbGVyKClcclxuICAgICAgICAgICAgPyBoYW5kbGVyLmNhbGwocHJvbWlzZS5fYm91bmRWYWx1ZSgpKVxyXG4gICAgICAgICAgICA6IGhhbmRsZXIuY2FsbChwcm9taXNlLl9ib3VuZFZhbHVlKCksIHJlYXNvbk9yVmFsdWUpO1xyXG4gICAgICAgIGlmIChyZXQgPT09IE5FWFRfRklMVEVSKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgfSBlbHNlIGlmIChyZXQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBwcm9taXNlLl9zZXRSZXR1cm5lZE5vblVuZGVmaW5lZCgpO1xyXG4gICAgICAgICAgICB2YXIgbWF5YmVQcm9taXNlID0gdHJ5Q29udmVydFRvUHJvbWlzZShyZXQsIHByb21pc2UpO1xyXG4gICAgICAgICAgICBpZiAobWF5YmVQcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FuY2VsUHJvbWlzZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1heWJlUHJvbWlzZS5faXNDYW5jZWxsZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVhc29uID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBDYW5jZWxsYXRpb25FcnJvcihcImxhdGUgY2FuY2VsbGF0aW9uIG9ic2VydmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlLl9hdHRhY2hFeHRyYVRyYWNlKHJlYXNvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yT2JqLmUgPSByZWFzb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlcnJvck9iajtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1heWJlUHJvbWlzZS5pc1BlbmRpbmcoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXliZVByb21pc2UuX2F0dGFjaENhbmNlbGxhdGlvbkNhbGxiYWNrKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEZpbmFsbHlIYW5kbGVyQ2FuY2VsUmVhY3Rpb24odGhpcykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBtYXliZVByb21pc2UuX3RoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VlZCwgZmFpbCwgdW5kZWZpbmVkLCB0aGlzLCB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChwcm9taXNlLmlzUmVqZWN0ZWQoKSkge1xyXG4gICAgICAgIGNoZWNrQ2FuY2VsKHRoaXMpO1xyXG4gICAgICAgIGVycm9yT2JqLmUgPSByZWFzb25PclZhbHVlO1xyXG4gICAgICAgIHJldHVybiBlcnJvck9iajtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2hlY2tDYW5jZWwodGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIHJlYXNvbk9yVmFsdWU7XHJcbiAgICB9XHJcbn1cclxuXHJcblByb21pc2UucHJvdG90eXBlLl9wYXNzVGhyb3VnaCA9IGZ1bmN0aW9uKGhhbmRsZXIsIHR5cGUsIHN1Y2Nlc3MsIGZhaWwpIHtcclxuICAgIGlmICh0eXBlb2YgaGFuZGxlciAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gdGhpcy50aGVuKCk7XHJcbiAgICByZXR1cm4gdGhpcy5fdGhlbihzdWNjZXNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZmFpbCxcclxuICAgICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXNzVGhyb3VnaEhhbmRsZXJDb250ZXh0KHRoaXMsIHR5cGUsIGhhbmRsZXIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkKTtcclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLmxhc3RseSA9XHJcblByb21pc2UucHJvdG90eXBlW1wiZmluYWxseVwiXSA9IGZ1bmN0aW9uIChoYW5kbGVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcGFzc1Rocm91Z2goaGFuZGxlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHlIYW5kbGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHlIYW5kbGVyKTtcclxufTtcclxuXHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZS50YXAgPSBmdW5jdGlvbiAoaGFuZGxlcikge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Bhc3NUaHJvdWdoKGhhbmRsZXIsIDEsIGZpbmFsbHlIYW5kbGVyKTtcclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLnRhcENhdGNoID0gZnVuY3Rpb24gKGhhbmRsZXJPclByZWRpY2F0ZSkge1xyXG4gICAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XHJcbiAgICBpZihsZW4gPT09IDEpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFzc1Rocm91Z2goaGFuZGxlck9yUHJlZGljYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHlIYW5kbGVyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgIHZhciBjYXRjaEluc3RhbmNlcyA9IG5ldyBBcnJheShsZW4gLSAxKSxcclxuICAgICAgICAgICAgaiA9IDAsIGk7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbiAtIDE7ICsraSkge1xyXG4gICAgICAgICAgICB2YXIgaXRlbSA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgaWYgKHV0aWwuaXNPYmplY3QoaXRlbSkpIHtcclxuICAgICAgICAgICAgICAgIGNhdGNoSW5zdGFuY2VzW2orK10gPSBpdGVtO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0YXBDYXRjaCBzdGF0ZW1lbnQgcHJlZGljYXRlOiBcIlxyXG4gICAgICAgICAgICAgICAgICAgICsgXCJleHBlY3RpbmcgYW4gb2JqZWN0IGJ1dCBnb3QgXCIgKyB1dGlsLmNsYXNzU3RyaW5nKGl0ZW0pXHJcbiAgICAgICAgICAgICAgICApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaEluc3RhbmNlcy5sZW5ndGggPSBqO1xyXG4gICAgICAgIHZhciBoYW5kbGVyID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXNzVGhyb3VnaChjYXRjaEZpbHRlcihjYXRjaEluc3RhbmNlcywgaGFuZGxlciwgdGhpcyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxseUhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbnJldHVybiBQYXNzVGhyb3VnaEhhbmRsZXJDb250ZXh0O1xyXG59O1xyXG5cclxufSx7XCIuL2NhdGNoX2ZpbHRlclwiOjcsXCIuL3V0aWxcIjozNn1dLDE2OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcclxuXCJ1c2Ugc3RyaWN0XCI7XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oUHJvbWlzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBhcGlSZWplY3Rpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSU5URVJOQUwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5Q29udmVydFRvUHJvbWlzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBQcm94eWFibGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGVidWcpIHtcclxudmFyIGVycm9ycyA9IF9kZXJlcV8oXCIuL2Vycm9yc1wiKTtcclxudmFyIFR5cGVFcnJvciA9IGVycm9ycy5UeXBlRXJyb3I7XHJcbnZhciB1dGlsID0gX2RlcmVxXyhcIi4vdXRpbFwiKTtcclxudmFyIGVycm9yT2JqID0gdXRpbC5lcnJvck9iajtcclxudmFyIHRyeUNhdGNoID0gdXRpbC50cnlDYXRjaDtcclxudmFyIHlpZWxkSGFuZGxlcnMgPSBbXTtcclxuXHJcbmZ1bmN0aW9uIHByb21pc2VGcm9tWWllbGRIYW5kbGVyKHZhbHVlLCB5aWVsZEhhbmRsZXJzLCB0cmFjZVBhcmVudCkge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB5aWVsZEhhbmRsZXJzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgdHJhY2VQYXJlbnQuX3B1c2hDb250ZXh0KCk7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRyeUNhdGNoKHlpZWxkSGFuZGxlcnNbaV0pKHZhbHVlKTtcclxuICAgICAgICB0cmFjZVBhcmVudC5fcG9wQ29udGV4dCgpO1xyXG4gICAgICAgIGlmIChyZXN1bHQgPT09IGVycm9yT2JqKSB7XHJcbiAgICAgICAgICAgIHRyYWNlUGFyZW50Ll9wdXNoQ29udGV4dCgpO1xyXG4gICAgICAgICAgICB2YXIgcmV0ID0gUHJvbWlzZS5yZWplY3QoZXJyb3JPYmouZSk7XHJcbiAgICAgICAgICAgIHRyYWNlUGFyZW50Ll9wb3BDb250ZXh0KCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBtYXliZVByb21pc2UgPSB0cnlDb252ZXJ0VG9Qcm9taXNlKHJlc3VsdCwgdHJhY2VQYXJlbnQpO1xyXG4gICAgICAgIGlmIChtYXliZVByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSByZXR1cm4gbWF5YmVQcm9taXNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIFByb21pc2VTcGF3bihnZW5lcmF0b3JGdW5jdGlvbiwgcmVjZWl2ZXIsIHlpZWxkSGFuZGxlciwgc3RhY2spIHtcclxuICAgIGlmIChkZWJ1Zy5jYW5jZWxsYXRpb24oKSkge1xyXG4gICAgICAgIHZhciBpbnRlcm5hbCA9IG5ldyBQcm9taXNlKElOVEVSTkFMKTtcclxuICAgICAgICB2YXIgX2ZpbmFsbHlQcm9taXNlID0gdGhpcy5fZmluYWxseVByb21pc2UgPSBuZXcgUHJvbWlzZShJTlRFUk5BTCk7XHJcbiAgICAgICAgdGhpcy5fcHJvbWlzZSA9IGludGVybmFsLmxhc3RseShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9maW5hbGx5UHJvbWlzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpbnRlcm5hbC5fY2FwdHVyZVN0YWNrVHJhY2UoKTtcclxuICAgICAgICBpbnRlcm5hbC5fc2V0T25DYW5jZWwodGhpcyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBwcm9taXNlID0gdGhpcy5fcHJvbWlzZSA9IG5ldyBQcm9taXNlKElOVEVSTkFMKTtcclxuICAgICAgICBwcm9taXNlLl9jYXB0dXJlU3RhY2tUcmFjZSgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fc3RhY2sgPSBzdGFjaztcclxuICAgIHRoaXMuX2dlbmVyYXRvckZ1bmN0aW9uID0gZ2VuZXJhdG9yRnVuY3Rpb247XHJcbiAgICB0aGlzLl9yZWNlaXZlciA9IHJlY2VpdmVyO1xyXG4gICAgdGhpcy5fZ2VuZXJhdG9yID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5feWllbGRIYW5kbGVycyA9IHR5cGVvZiB5aWVsZEhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIlxyXG4gICAgICAgID8gW3lpZWxkSGFuZGxlcl0uY29uY2F0KHlpZWxkSGFuZGxlcnMpXHJcbiAgICAgICAgOiB5aWVsZEhhbmRsZXJzO1xyXG4gICAgdGhpcy5feWllbGRlZFByb21pc2UgPSBudWxsO1xyXG4gICAgdGhpcy5fY2FuY2VsbGF0aW9uUGhhc2UgPSBmYWxzZTtcclxufVxyXG51dGlsLmluaGVyaXRzKFByb21pc2VTcGF3biwgUHJveHlhYmxlKTtcclxuXHJcblByb21pc2VTcGF3bi5wcm90b3R5cGUuX2lzUmVzb2x2ZWQgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLl9wcm9taXNlID09PSBudWxsO1xyXG59O1xyXG5cclxuUHJvbWlzZVNwYXduLnByb3RvdHlwZS5fY2xlYW51cCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5fcHJvbWlzZSA9IHRoaXMuX2dlbmVyYXRvciA9IG51bGw7XHJcbiAgICBpZiAoZGVidWcuY2FuY2VsbGF0aW9uKCkgJiYgdGhpcy5fZmluYWxseVByb21pc2UgIT09IG51bGwpIHtcclxuICAgICAgICB0aGlzLl9maW5hbGx5UHJvbWlzZS5fZnVsZmlsbCgpO1xyXG4gICAgICAgIHRoaXMuX2ZpbmFsbHlQcm9taXNlID0gbnVsbDtcclxuICAgIH1cclxufTtcclxuXHJcblByb21pc2VTcGF3bi5wcm90b3R5cGUuX3Byb21pc2VDYW5jZWxsZWQgPSBmdW5jdGlvbigpIHtcclxuICAgIGlmICh0aGlzLl9pc1Jlc29sdmVkKCkpIHJldHVybjtcclxuICAgIHZhciBpbXBsZW1lbnRzUmV0dXJuID0gdHlwZW9mIHRoaXMuX2dlbmVyYXRvcltcInJldHVyblwiXSAhPT0gXCJ1bmRlZmluZWRcIjtcclxuXHJcbiAgICB2YXIgcmVzdWx0O1xyXG4gICAgaWYgKCFpbXBsZW1lbnRzUmV0dXJuKSB7XHJcbiAgICAgICAgdmFyIHJlYXNvbiA9IG5ldyBQcm9taXNlLkNhbmNlbGxhdGlvbkVycm9yKFxyXG4gICAgICAgICAgICBcImdlbmVyYXRvciAucmV0dXJuKCkgc2VudGluZWxcIik7XHJcbiAgICAgICAgUHJvbWlzZS5jb3JvdXRpbmUucmV0dXJuU2VudGluZWwgPSByZWFzb247XHJcbiAgICAgICAgdGhpcy5fcHJvbWlzZS5fYXR0YWNoRXh0cmFUcmFjZShyZWFzb24pO1xyXG4gICAgICAgIHRoaXMuX3Byb21pc2UuX3B1c2hDb250ZXh0KCk7XHJcbiAgICAgICAgcmVzdWx0ID0gdHJ5Q2F0Y2godGhpcy5fZ2VuZXJhdG9yW1widGhyb3dcIl0pLmNhbGwodGhpcy5fZ2VuZXJhdG9yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFzb24pO1xyXG4gICAgICAgIHRoaXMuX3Byb21pc2UuX3BvcENvbnRleHQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fcHJvbWlzZS5fcHVzaENvbnRleHQoKTtcclxuICAgICAgICByZXN1bHQgPSB0cnlDYXRjaCh0aGlzLl9nZW5lcmF0b3JbXCJyZXR1cm5cIl0pLmNhbGwodGhpcy5fZ2VuZXJhdG9yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkKTtcclxuICAgICAgICB0aGlzLl9wcm9taXNlLl9wb3BDb250ZXh0KCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9jYW5jZWxsYXRpb25QaGFzZSA9IHRydWU7XHJcbiAgICB0aGlzLl95aWVsZGVkUHJvbWlzZSA9IG51bGw7XHJcbiAgICB0aGlzLl9jb250aW51ZShyZXN1bHQpO1xyXG59O1xyXG5cclxuUHJvbWlzZVNwYXduLnByb3RvdHlwZS5fcHJvbWlzZUZ1bGZpbGxlZCA9IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICB0aGlzLl95aWVsZGVkUHJvbWlzZSA9IG51bGw7XHJcbiAgICB0aGlzLl9wcm9taXNlLl9wdXNoQ29udGV4dCgpO1xyXG4gICAgdmFyIHJlc3VsdCA9IHRyeUNhdGNoKHRoaXMuX2dlbmVyYXRvci5uZXh0KS5jYWxsKHRoaXMuX2dlbmVyYXRvciwgdmFsdWUpO1xyXG4gICAgdGhpcy5fcHJvbWlzZS5fcG9wQ29udGV4dCgpO1xyXG4gICAgdGhpcy5fY29udGludWUocmVzdWx0KTtcclxufTtcclxuXHJcblByb21pc2VTcGF3bi5wcm90b3R5cGUuX3Byb21pc2VSZWplY3RlZCA9IGZ1bmN0aW9uKHJlYXNvbikge1xyXG4gICAgdGhpcy5feWllbGRlZFByb21pc2UgPSBudWxsO1xyXG4gICAgdGhpcy5fcHJvbWlzZS5fYXR0YWNoRXh0cmFUcmFjZShyZWFzb24pO1xyXG4gICAgdGhpcy5fcHJvbWlzZS5fcHVzaENvbnRleHQoKTtcclxuICAgIHZhciByZXN1bHQgPSB0cnlDYXRjaCh0aGlzLl9nZW5lcmF0b3JbXCJ0aHJvd1wiXSlcclxuICAgICAgICAuY2FsbCh0aGlzLl9nZW5lcmF0b3IsIHJlYXNvbik7XHJcbiAgICB0aGlzLl9wcm9taXNlLl9wb3BDb250ZXh0KCk7XHJcbiAgICB0aGlzLl9jb250aW51ZShyZXN1bHQpO1xyXG59O1xyXG5cclxuUHJvbWlzZVNwYXduLnByb3RvdHlwZS5fcmVzdWx0Q2FuY2VsbGVkID0gZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAodGhpcy5feWllbGRlZFByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSB7XHJcbiAgICAgICAgdmFyIHByb21pc2UgPSB0aGlzLl95aWVsZGVkUHJvbWlzZTtcclxuICAgICAgICB0aGlzLl95aWVsZGVkUHJvbWlzZSA9IG51bGw7XHJcbiAgICAgICAgcHJvbWlzZS5jYW5jZWwoKTtcclxuICAgIH1cclxufTtcclxuXHJcblByb21pc2VTcGF3bi5wcm90b3R5cGUucHJvbWlzZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLl9wcm9taXNlO1xyXG59O1xyXG5cclxuUHJvbWlzZVNwYXduLnByb3RvdHlwZS5fcnVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5fZ2VuZXJhdG9yID0gdGhpcy5fZ2VuZXJhdG9yRnVuY3Rpb24uY2FsbCh0aGlzLl9yZWNlaXZlcik7XHJcbiAgICB0aGlzLl9yZWNlaXZlciA9XHJcbiAgICAgICAgdGhpcy5fZ2VuZXJhdG9yRnVuY3Rpb24gPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLl9wcm9taXNlRnVsZmlsbGVkKHVuZGVmaW5lZCk7XHJcbn07XHJcblxyXG5Qcm9taXNlU3Bhd24ucHJvdG90eXBlLl9jb250aW51ZSA9IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgIHZhciBwcm9taXNlID0gdGhpcy5fcHJvbWlzZTtcclxuICAgIGlmIChyZXN1bHQgPT09IGVycm9yT2JqKSB7XHJcbiAgICAgICAgdGhpcy5fY2xlYW51cCgpO1xyXG4gICAgICAgIGlmICh0aGlzLl9jYW5jZWxsYXRpb25QaGFzZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZS5jYW5jZWwoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZS5fcmVqZWN0Q2FsbGJhY2socmVzdWx0LmUsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xyXG4gICAgaWYgKHJlc3VsdC5kb25lID09PSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5fY2xlYW51cCgpO1xyXG4gICAgICAgIGlmICh0aGlzLl9jYW5jZWxsYXRpb25QaGFzZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZS5jYW5jZWwoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZS5fcmVzb2x2ZUNhbGxiYWNrKHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBtYXliZVByb21pc2UgPSB0cnlDb252ZXJ0VG9Qcm9taXNlKHZhbHVlLCB0aGlzLl9wcm9taXNlKTtcclxuICAgICAgICBpZiAoIShtYXliZVByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSkge1xyXG4gICAgICAgICAgICBtYXliZVByb21pc2UgPVxyXG4gICAgICAgICAgICAgICAgcHJvbWlzZUZyb21ZaWVsZEhhbmRsZXIobWF5YmVQcm9taXNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5feWllbGRIYW5kbGVycyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Byb21pc2UpO1xyXG4gICAgICAgICAgICBpZiAobWF5YmVQcm9taXNlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wcm9taXNlUmVqZWN0ZWQoXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFR5cGVFcnJvcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBIHZhbHVlICVzIHdhcyB5aWVsZGVkIHRoYXQgY291bGQgbm90IGJlIHRyZWF0ZWQgYXMgYSBwcm9taXNlXFx1MDAwYVxcdTAwMGEgICAgU2VlIGh0dHA6Ly9nb28uZ2wvTXFyRm1YXFx1MDAwYVxcdTAwMGFcIi5yZXBsYWNlKFwiJXNcIiwgU3RyaW5nKHZhbHVlKSkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkZyb20gY29yb3V0aW5lOlxcdTAwMGFcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YWNrLnNwbGl0KFwiXFxuXCIpLnNsaWNlKDEsIC03KS5qb2luKFwiXFxuXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBtYXliZVByb21pc2UgPSBtYXliZVByb21pc2UuX3RhcmdldCgpO1xyXG4gICAgICAgIHZhciBiaXRGaWVsZCA9IG1heWJlUHJvbWlzZS5fYml0RmllbGQ7XHJcbiAgICAgICAgO1xyXG4gICAgICAgIGlmICgoKGJpdEZpZWxkICYgNTAzOTcxODQpID09PSAwKSkge1xyXG4gICAgICAgICAgICB0aGlzLl95aWVsZGVkUHJvbWlzZSA9IG1heWJlUHJvbWlzZTtcclxuICAgICAgICAgICAgbWF5YmVQcm9taXNlLl9wcm94eSh0aGlzLCBudWxsKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCgoYml0RmllbGQgJiAzMzU1NDQzMikgIT09IDApKSB7XHJcbiAgICAgICAgICAgIFByb21pc2UuX2FzeW5jLmludm9rZShcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Byb21pc2VGdWxmaWxsZWQsIHRoaXMsIG1heWJlUHJvbWlzZS5fdmFsdWUoKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKChiaXRGaWVsZCAmIDE2Nzc3MjE2KSAhPT0gMCkpIHtcclxuICAgICAgICAgICAgUHJvbWlzZS5fYXN5bmMuaW52b2tlKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcHJvbWlzZVJlamVjdGVkLCB0aGlzLCBtYXliZVByb21pc2UuX3JlYXNvbigpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fcHJvbWlzZUNhbmNlbGxlZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblByb21pc2UuY29yb3V0aW5lID0gZnVuY3Rpb24gKGdlbmVyYXRvckZ1bmN0aW9uLCBvcHRpb25zKSB7XHJcbiAgICBpZiAodHlwZW9mIGdlbmVyYXRvckZ1bmN0aW9uICE9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiZ2VuZXJhdG9yRnVuY3Rpb24gbXVzdCBiZSBhIGZ1bmN0aW9uXFx1MDAwYVxcdTAwMGEgICAgU2VlIGh0dHA6Ly9nb28uZ2wvTXFyRm1YXFx1MDAwYVwiKTtcclxuICAgIH1cclxuICAgIHZhciB5aWVsZEhhbmRsZXIgPSBPYmplY3Qob3B0aW9ucykueWllbGRIYW5kbGVyO1xyXG4gICAgdmFyIFByb21pc2VTcGF3biQgPSBQcm9taXNlU3Bhd247XHJcbiAgICB2YXIgc3RhY2sgPSBuZXcgRXJyb3IoKS5zdGFjaztcclxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGdlbmVyYXRvciA9IGdlbmVyYXRvckZ1bmN0aW9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgdmFyIHNwYXduID0gbmV3IFByb21pc2VTcGF3biQodW5kZWZpbmVkLCB1bmRlZmluZWQsIHlpZWxkSGFuZGxlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFjayk7XHJcbiAgICAgICAgdmFyIHJldCA9IHNwYXduLnByb21pc2UoKTtcclxuICAgICAgICBzcGF3bi5fZ2VuZXJhdG9yID0gZ2VuZXJhdG9yO1xyXG4gICAgICAgIHNwYXduLl9wcm9taXNlRnVsZmlsbGVkKHVuZGVmaW5lZCk7XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH07XHJcbn07XHJcblxyXG5Qcm9taXNlLmNvcm91dGluZS5hZGRZaWVsZEhhbmRsZXIgPSBmdW5jdGlvbihmbikge1xyXG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImV4cGVjdGluZyBhIGZ1bmN0aW9uIGJ1dCBnb3QgXCIgKyB1dGlsLmNsYXNzU3RyaW5nKGZuKSk7XHJcbiAgICB9XHJcbiAgICB5aWVsZEhhbmRsZXJzLnB1c2goZm4pO1xyXG59O1xyXG5cclxuUHJvbWlzZS5zcGF3biA9IGZ1bmN0aW9uIChnZW5lcmF0b3JGdW5jdGlvbikge1xyXG4gICAgZGVidWcuZGVwcmVjYXRlZChcIlByb21pc2Uuc3Bhd24oKVwiLCBcIlByb21pc2UuY29yb3V0aW5lKClcIik7XHJcbiAgICBpZiAodHlwZW9mIGdlbmVyYXRvckZ1bmN0aW9uICE9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICByZXR1cm4gYXBpUmVqZWN0aW9uKFwiZ2VuZXJhdG9yRnVuY3Rpb24gbXVzdCBiZSBhIGZ1bmN0aW9uXFx1MDAwYVxcdTAwMGEgICAgU2VlIGh0dHA6Ly9nb28uZ2wvTXFyRm1YXFx1MDAwYVwiKTtcclxuICAgIH1cclxuICAgIHZhciBzcGF3biA9IG5ldyBQcm9taXNlU3Bhd24oZ2VuZXJhdG9yRnVuY3Rpb24sIHRoaXMpO1xyXG4gICAgdmFyIHJldCA9IHNwYXduLnByb21pc2UoKTtcclxuICAgIHNwYXduLl9ydW4oUHJvbWlzZS5zcGF3bik7XHJcbiAgICByZXR1cm4gcmV0O1xyXG59O1xyXG59O1xyXG5cclxufSx7XCIuL2Vycm9yc1wiOjEyLFwiLi91dGlsXCI6MzZ9XSwxNzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9XHJcbmZ1bmN0aW9uKFByb21pc2UsIFByb21pc2VBcnJheSwgdHJ5Q29udmVydFRvUHJvbWlzZSwgSU5URVJOQUwsIGFzeW5jLFxyXG4gICAgICAgICBnZXREb21haW4pIHtcclxudmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xyXG52YXIgY2FuRXZhbHVhdGUgPSB1dGlsLmNhbkV2YWx1YXRlO1xyXG52YXIgdHJ5Q2F0Y2ggPSB1dGlsLnRyeUNhdGNoO1xyXG52YXIgZXJyb3JPYmogPSB1dGlsLmVycm9yT2JqO1xyXG52YXIgcmVqZWN0O1xyXG5cclxuaWYgKCF0cnVlKSB7XHJcbmlmIChjYW5FdmFsdWF0ZSkge1xyXG4gICAgdmFyIHRoZW5DYWxsYmFjayA9IGZ1bmN0aW9uKGkpIHtcclxuICAgICAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKFwidmFsdWVcIiwgXCJob2xkZXJcIiwgXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXHJcbiAgICAgICAgICAgICd1c2Ugc3RyaWN0JzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcclxuICAgICAgICAgICAgaG9sZGVyLnBJbmRleCA9IHZhbHVlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxyXG4gICAgICAgICAgICBob2xkZXIuY2hlY2tGdWxmaWxsbWVudCh0aGlzKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXHJcbiAgICAgICAgICAgIFwiLnJlcGxhY2UoL0luZGV4L2csIGkpKTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIHByb21pc2VTZXR0ZXIgPSBmdW5jdGlvbihpKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBGdW5jdGlvbihcInByb21pc2VcIiwgXCJob2xkZXJcIiwgXCIgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxyXG4gICAgICAgICAgICAndXNlIHN0cmljdCc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXHJcbiAgICAgICAgICAgIGhvbGRlci5wSW5kZXggPSBwcm9taXNlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcclxuICAgICAgICAgICAgXCIucmVwbGFjZSgvSW5kZXgvZywgaSkpO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgZ2VuZXJhdGVIb2xkZXJDbGFzcyA9IGZ1bmN0aW9uKHRvdGFsKSB7XHJcbiAgICAgICAgdmFyIHByb3BzID0gbmV3IEFycmF5KHRvdGFsKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIHByb3BzW2ldID0gXCJ0aGlzLnBcIiArIChpKzEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgYXNzaWdubWVudCA9IHByb3BzLmpvaW4oXCIgPSBcIikgKyBcIiA9IG51bGw7XCI7XHJcbiAgICAgICAgdmFyIGNhbmNlbGxhdGlvbkNvZGU9IFwidmFyIHByb21pc2U7XFxuXCIgKyBwcm9wcy5tYXAoZnVuY3Rpb24ocHJvcCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxyXG4gICAgICAgICAgICAgICAgcHJvbWlzZSA9IFwiICsgcHJvcCArIFwiOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcclxuICAgICAgICAgICAgICAgIGlmIChwcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxyXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UuY2FuY2VsKCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcclxuICAgICAgICAgICAgXCI7XHJcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcclxuICAgICAgICB2YXIgcGFzc2VkQXJndW1lbnRzID0gcHJvcHMuam9pbihcIiwgXCIpO1xyXG4gICAgICAgIHZhciBuYW1lID0gXCJIb2xkZXIkXCIgKyB0b3RhbDtcclxuXHJcblxyXG4gICAgICAgIHZhciBjb2RlID0gXCJyZXR1cm4gZnVuY3Rpb24odHJ5Q2F0Y2gsIGVycm9yT2JqLCBQcm9taXNlLCBhc3luYykgeyAgICBcXG5cXFxyXG4gICAgICAgICAgICAndXNlIHN0cmljdCc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIFtUaGVOYW1lXShmbikgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcclxuICAgICAgICAgICAgICAgIFtUaGVQcm9wZXJ0aWVzXSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxyXG4gICAgICAgICAgICAgICAgdGhpcy5mbiA9IGZuOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFzeW5jTmVlZGVkID0gdHJ1ZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcclxuICAgICAgICAgICAgICAgIHRoaXMubm93ID0gMDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcclxuICAgICAgICAgICAgW1RoZU5hbWVdLnByb3RvdHlwZS5fY2FsbEZ1bmN0aW9uID0gZnVuY3Rpb24ocHJvbWlzZSkgeyAgICAgICAgICBcXG5cXFxyXG4gICAgICAgICAgICAgICAgcHJvbWlzZS5fcHVzaENvbnRleHQoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXHJcbiAgICAgICAgICAgICAgICB2YXIgcmV0ID0gdHJ5Q2F0Y2godGhpcy5mbikoW1RoZVBhc3NlZEFyZ3VtZW50c10pOyAgICAgICAgICAgXFxuXFxcclxuICAgICAgICAgICAgICAgIHByb21pc2UuX3BvcENvbnRleHQoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxyXG4gICAgICAgICAgICAgICAgaWYgKHJldCA9PT0gZXJyb3JPYmopIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS5fcmVqZWN0Q2FsbGJhY2socmV0LmUsIGZhbHNlKTsgICAgICAgICAgICAgICAgICAgXFxuXFxcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxyXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UuX3Jlc29sdmVDYWxsYmFjayhyZXQpOyAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcclxuICAgICAgICAgICAgfTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXHJcbiAgICAgICAgICAgIFtUaGVOYW1lXS5wcm90b3R5cGUuY2hlY2tGdWxmaWxsbWVudCA9IGZ1bmN0aW9uKHByb21pc2UpIHsgICAgICAgXFxuXFxcclxuICAgICAgICAgICAgICAgIHZhciBub3cgPSArK3RoaXMubm93OyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxyXG4gICAgICAgICAgICAgICAgaWYgKG5vdyA9PT0gW1RoZVRvdGFsXSkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYXN5bmNOZWVkZWQpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmMuaW52b2tlKHRoaXMuX2NhbGxGdW5jdGlvbiwgdGhpcywgcHJvbWlzZSk7ICAgICBcXG5cXFxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhbGxGdW5jdGlvbihwcm9taXNlKTsgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcclxuICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcclxuICAgICAgICAgICAgfTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXHJcbiAgICAgICAgICAgIFtUaGVOYW1lXS5wcm90b3R5cGUuX3Jlc3VsdENhbmNlbGxlZCA9IGZ1bmN0aW9uKCkgeyAgICAgICAgICAgICAgXFxuXFxcclxuICAgICAgICAgICAgICAgIFtDYW5jZWxsYXRpb25Db2RlXSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxyXG4gICAgICAgICAgICB9OyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcclxuICAgICAgICAgICAgcmV0dXJuIFtUaGVOYW1lXTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxyXG4gICAgICAgIH0odHJ5Q2F0Y2gsIGVycm9yT2JqLCBQcm9taXNlLCBhc3luYyk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXHJcbiAgICAgICAgXCI7XHJcblxyXG4gICAgICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoL1xcW1RoZU5hbWVcXF0vZywgbmFtZSlcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcW1RoZVRvdGFsXFxdL2csIHRvdGFsKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxbVGhlUGFzc2VkQXJndW1lbnRzXFxdL2csIHBhc3NlZEFyZ3VtZW50cylcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcW1RoZVByb3BlcnRpZXNcXF0vZywgYXNzaWdubWVudClcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcW0NhbmNlbGxhdGlvbkNvZGVcXF0vZywgY2FuY2VsbGF0aW9uQ29kZSk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgRnVuY3Rpb24oXCJ0cnlDYXRjaFwiLCBcImVycm9yT2JqXCIsIFwiUHJvbWlzZVwiLCBcImFzeW5jXCIsIGNvZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICh0cnlDYXRjaCwgZXJyb3JPYmosIFByb21pc2UsIGFzeW5jKTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIGhvbGRlckNsYXNzZXMgPSBbXTtcclxuICAgIHZhciB0aGVuQ2FsbGJhY2tzID0gW107XHJcbiAgICB2YXIgcHJvbWlzZVNldHRlcnMgPSBbXTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDg7ICsraSkge1xyXG4gICAgICAgIGhvbGRlckNsYXNzZXMucHVzaChnZW5lcmF0ZUhvbGRlckNsYXNzKGkgKyAxKSk7XHJcbiAgICAgICAgdGhlbkNhbGxiYWNrcy5wdXNoKHRoZW5DYWxsYmFjayhpICsgMSkpO1xyXG4gICAgICAgIHByb21pc2VTZXR0ZXJzLnB1c2gocHJvbWlzZVNldHRlcihpICsgMSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlamVjdCA9IGZ1bmN0aW9uIChyZWFzb24pIHtcclxuICAgICAgICB0aGlzLl9yZWplY3QocmVhc29uKTtcclxuICAgIH07XHJcbn19XHJcblxyXG5Qcm9taXNlLmpvaW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgbGFzdCA9IGFyZ3VtZW50cy5sZW5ndGggLSAxO1xyXG4gICAgdmFyIGZuO1xyXG4gICAgaWYgKGxhc3QgPiAwICYmIHR5cGVvZiBhcmd1bWVudHNbbGFzdF0gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIGZuID0gYXJndW1lbnRzW2xhc3RdO1xyXG4gICAgICAgIGlmICghdHJ1ZSkge1xyXG4gICAgICAgICAgICBpZiAobGFzdCA8PSA4ICYmIGNhbkV2YWx1YXRlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmV0ID0gbmV3IFByb21pc2UoSU5URVJOQUwpO1xyXG4gICAgICAgICAgICAgICAgcmV0Ll9jYXB0dXJlU3RhY2tUcmFjZSgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIEhvbGRlckNsYXNzID0gaG9sZGVyQ2xhc3Nlc1tsYXN0IC0gMV07XHJcbiAgICAgICAgICAgICAgICB2YXIgaG9sZGVyID0gbmV3IEhvbGRlckNsYXNzKGZuKTtcclxuICAgICAgICAgICAgICAgIHZhciBjYWxsYmFja3MgPSB0aGVuQ2FsbGJhY2tzO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1heWJlUHJvbWlzZSA9IHRyeUNvbnZlcnRUb1Byb21pc2UoYXJndW1lbnRzW2ldLCByZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXliZVByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heWJlUHJvbWlzZSA9IG1heWJlUHJvbWlzZS5fdGFyZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBiaXRGaWVsZCA9IG1heWJlUHJvbWlzZS5fYml0RmllbGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCgoYml0RmllbGQgJiA1MDM5NzE4NCkgPT09IDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXliZVByb21pc2UuX3RoZW4oY2FsbGJhY2tzW2ldLCByZWplY3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkLCByZXQsIGhvbGRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlU2V0dGVyc1tpXShtYXliZVByb21pc2UsIGhvbGRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob2xkZXIuYXN5bmNOZWVkZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICgoKGJpdEZpZWxkICYgMzM1NTQ0MzIpICE9PSAwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tzW2ldLmNhbGwocmV0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF5YmVQcm9taXNlLl92YWx1ZSgpLCBob2xkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCgoYml0RmllbGQgJiAxNjc3NzIxNikgIT09IDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXQuX3JlamVjdChtYXliZVByb21pc2UuX3JlYXNvbigpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldC5fY2FuY2VsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFja3NbaV0uY2FsbChyZXQsIG1heWJlUHJvbWlzZSwgaG9sZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFyZXQuX2lzRmF0ZVNlYWxlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhvbGRlci5hc3luY05lZWRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZG9tYWluID0gZ2V0RG9tYWluKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkb21haW4gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvbGRlci5mbiA9IHV0aWwuZG9tYWluQmluZChkb21haW4sIGhvbGRlci5mbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0Ll9zZXRBc3luY0d1YXJhbnRlZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXQuX3NldE9uQ2FuY2VsKGhvbGRlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7O1xyXG4gICAgaWYgKGZuKSBhcmdzLnBvcCgpO1xyXG4gICAgdmFyIHJldCA9IG5ldyBQcm9taXNlQXJyYXkoYXJncykucHJvbWlzZSgpO1xyXG4gICAgcmV0dXJuIGZuICE9PSB1bmRlZmluZWQgPyByZXQuc3ByZWFkKGZuKSA6IHJldDtcclxufTtcclxuXHJcbn07XHJcblxyXG59LHtcIi4vdXRpbFwiOjM2fV0sMTg6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihQcm9taXNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFByb21pc2VBcnJheSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBhcGlSZWplY3Rpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5Q29udmVydFRvUHJvbWlzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBJTlRFUk5BTCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Zykge1xyXG52YXIgZ2V0RG9tYWluID0gUHJvbWlzZS5fZ2V0RG9tYWluO1xyXG52YXIgdXRpbCA9IF9kZXJlcV8oXCIuL3V0aWxcIik7XHJcbnZhciB0cnlDYXRjaCA9IHV0aWwudHJ5Q2F0Y2g7XHJcbnZhciBlcnJvck9iaiA9IHV0aWwuZXJyb3JPYmo7XHJcbnZhciBhc3luYyA9IFByb21pc2UuX2FzeW5jO1xyXG5cclxuZnVuY3Rpb24gTWFwcGluZ1Byb21pc2VBcnJheShwcm9taXNlcywgZm4sIGxpbWl0LCBfZmlsdGVyKSB7XHJcbiAgICB0aGlzLmNvbnN0cnVjdG9yJChwcm9taXNlcyk7XHJcbiAgICB0aGlzLl9wcm9taXNlLl9jYXB0dXJlU3RhY2tUcmFjZSgpO1xyXG4gICAgdmFyIGRvbWFpbiA9IGdldERvbWFpbigpO1xyXG4gICAgdGhpcy5fY2FsbGJhY2sgPSBkb21haW4gPT09IG51bGwgPyBmbiA6IHV0aWwuZG9tYWluQmluZChkb21haW4sIGZuKTtcclxuICAgIHRoaXMuX3ByZXNlcnZlZFZhbHVlcyA9IF9maWx0ZXIgPT09IElOVEVSTkFMXHJcbiAgICAgICAgPyBuZXcgQXJyYXkodGhpcy5sZW5ndGgoKSlcclxuICAgICAgICA6IG51bGw7XHJcbiAgICB0aGlzLl9saW1pdCA9IGxpbWl0O1xyXG4gICAgdGhpcy5faW5GbGlnaHQgPSAwO1xyXG4gICAgdGhpcy5fcXVldWUgPSBbXTtcclxuICAgIGFzeW5jLmludm9rZSh0aGlzLl9hc3luY0luaXQsIHRoaXMsIHVuZGVmaW5lZCk7XHJcbn1cclxudXRpbC5pbmhlcml0cyhNYXBwaW5nUHJvbWlzZUFycmF5LCBQcm9taXNlQXJyYXkpO1xyXG5cclxuTWFwcGluZ1Byb21pc2VBcnJheS5wcm90b3R5cGUuX2FzeW5jSW5pdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5faW5pdCQodW5kZWZpbmVkLCAtMik7XHJcbn07XHJcblxyXG5NYXBwaW5nUHJvbWlzZUFycmF5LnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uICgpIHt9O1xyXG5cclxuTWFwcGluZ1Byb21pc2VBcnJheS5wcm90b3R5cGUuX3Byb21pc2VGdWxmaWxsZWQgPSBmdW5jdGlvbiAodmFsdWUsIGluZGV4KSB7XHJcbiAgICB2YXIgdmFsdWVzID0gdGhpcy5fdmFsdWVzO1xyXG4gICAgdmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoKCk7XHJcbiAgICB2YXIgcHJlc2VydmVkVmFsdWVzID0gdGhpcy5fcHJlc2VydmVkVmFsdWVzO1xyXG4gICAgdmFyIGxpbWl0ID0gdGhpcy5fbGltaXQ7XHJcblxyXG4gICAgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICAgIGluZGV4ID0gKGluZGV4ICogLTEpIC0gMTtcclxuICAgICAgICB2YWx1ZXNbaW5kZXhdID0gdmFsdWU7XHJcbiAgICAgICAgaWYgKGxpbWl0ID49IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5GbGlnaHQtLTtcclxuICAgICAgICAgICAgdGhpcy5fZHJhaW5RdWV1ZSgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faXNSZXNvbHZlZCgpKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChsaW1pdCA+PSAxICYmIHRoaXMuX2luRmxpZ2h0ID49IGxpbWl0KSB7XHJcbiAgICAgICAgICAgIHZhbHVlc1tpbmRleF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5fcXVldWUucHVzaChpbmRleCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHByZXNlcnZlZFZhbHVlcyAhPT0gbnVsbCkgcHJlc2VydmVkVmFsdWVzW2luZGV4XSA9IHZhbHVlO1xyXG5cclxuICAgICAgICB2YXIgcHJvbWlzZSA9IHRoaXMuX3Byb21pc2U7XHJcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gdGhpcy5fY2FsbGJhY2s7XHJcbiAgICAgICAgdmFyIHJlY2VpdmVyID0gcHJvbWlzZS5fYm91bmRWYWx1ZSgpO1xyXG4gICAgICAgIHByb21pc2UuX3B1c2hDb250ZXh0KCk7XHJcbiAgICAgICAgdmFyIHJldCA9IHRyeUNhdGNoKGNhbGxiYWNrKS5jYWxsKHJlY2VpdmVyLCB2YWx1ZSwgaW5kZXgsIGxlbmd0aCk7XHJcbiAgICAgICAgdmFyIHByb21pc2VDcmVhdGVkID0gcHJvbWlzZS5fcG9wQ29udGV4dCgpO1xyXG4gICAgICAgIGRlYnVnLmNoZWNrRm9yZ290dGVuUmV0dXJucyhcclxuICAgICAgICAgICAgcmV0LFxyXG4gICAgICAgICAgICBwcm9taXNlQ3JlYXRlZCxcclxuICAgICAgICAgICAgcHJlc2VydmVkVmFsdWVzICE9PSBudWxsID8gXCJQcm9taXNlLmZpbHRlclwiIDogXCJQcm9taXNlLm1hcFwiLFxyXG4gICAgICAgICAgICBwcm9taXNlXHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAocmV0ID09PSBlcnJvck9iaikge1xyXG4gICAgICAgICAgICB0aGlzLl9yZWplY3QocmV0LmUpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBtYXliZVByb21pc2UgPSB0cnlDb252ZXJ0VG9Qcm9taXNlKHJldCwgdGhpcy5fcHJvbWlzZSk7XHJcbiAgICAgICAgaWYgKG1heWJlUHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcclxuICAgICAgICAgICAgbWF5YmVQcm9taXNlID0gbWF5YmVQcm9taXNlLl90YXJnZXQoKTtcclxuICAgICAgICAgICAgdmFyIGJpdEZpZWxkID0gbWF5YmVQcm9taXNlLl9iaXRGaWVsZDtcclxuICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICBpZiAoKChiaXRGaWVsZCAmIDUwMzk3MTg0KSA9PT0gMCkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChsaW1pdCA+PSAxKSB0aGlzLl9pbkZsaWdodCsrO1xyXG4gICAgICAgICAgICAgICAgdmFsdWVzW2luZGV4XSA9IG1heWJlUHJvbWlzZTtcclxuICAgICAgICAgICAgICAgIG1heWJlUHJvbWlzZS5fcHJveHkodGhpcywgKGluZGV4ICsgMSkgKiAtMSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKChiaXRGaWVsZCAmIDMzNTU0NDMyKSAhPT0gMCkpIHtcclxuICAgICAgICAgICAgICAgIHJldCA9IG1heWJlUHJvbWlzZS5fdmFsdWUoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgoKGJpdEZpZWxkICYgMTY3NzcyMTYpICE9PSAwKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVqZWN0KG1heWJlUHJvbWlzZS5fcmVhc29uKCkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jYW5jZWwoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhbHVlc1tpbmRleF0gPSByZXQ7XHJcbiAgICB9XHJcbiAgICB2YXIgdG90YWxSZXNvbHZlZCA9ICsrdGhpcy5fdG90YWxSZXNvbHZlZDtcclxuICAgIGlmICh0b3RhbFJlc29sdmVkID49IGxlbmd0aCkge1xyXG4gICAgICAgIGlmIChwcmVzZXJ2ZWRWYWx1ZXMgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlsdGVyKHZhbHVlcywgcHJlc2VydmVkVmFsdWVzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9yZXNvbHZlKHZhbHVlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuTWFwcGluZ1Byb21pc2VBcnJheS5wcm90b3R5cGUuX2RyYWluUXVldWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgcXVldWUgPSB0aGlzLl9xdWV1ZTtcclxuICAgIHZhciBsaW1pdCA9IHRoaXMuX2xpbWl0O1xyXG4gICAgdmFyIHZhbHVlcyA9IHRoaXMuX3ZhbHVlcztcclxuICAgIHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwICYmIHRoaXMuX2luRmxpZ2h0IDwgbGltaXQpIHtcclxuICAgICAgICBpZiAodGhpcy5faXNSZXNvbHZlZCgpKSByZXR1cm47XHJcbiAgICAgICAgdmFyIGluZGV4ID0gcXVldWUucG9wKCk7XHJcbiAgICAgICAgdGhpcy5fcHJvbWlzZUZ1bGZpbGxlZCh2YWx1ZXNbaW5kZXhdLCBpbmRleCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5NYXBwaW5nUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fZmlsdGVyID0gZnVuY3Rpb24gKGJvb2xlYW5zLCB2YWx1ZXMpIHtcclxuICAgIHZhciBsZW4gPSB2YWx1ZXMubGVuZ3RoO1xyXG4gICAgdmFyIHJldCA9IG5ldyBBcnJheShsZW4pO1xyXG4gICAgdmFyIGogPSAwO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICAgIGlmIChib29sZWFuc1tpXSkgcmV0W2orK10gPSB2YWx1ZXNbaV07XHJcbiAgICB9XHJcbiAgICByZXQubGVuZ3RoID0gajtcclxuICAgIHRoaXMuX3Jlc29sdmUocmV0KTtcclxufTtcclxuXHJcbk1hcHBpbmdQcm9taXNlQXJyYXkucHJvdG90eXBlLnByZXNlcnZlZFZhbHVlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLl9wcmVzZXJ2ZWRWYWx1ZXM7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBtYXAocHJvbWlzZXMsIGZuLCBvcHRpb25zLCBfZmlsdGVyKSB7XHJcbiAgICBpZiAodHlwZW9mIGZuICE9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICByZXR1cm4gYXBpUmVqZWN0aW9uKFwiZXhwZWN0aW5nIGEgZnVuY3Rpb24gYnV0IGdvdCBcIiArIHV0aWwuY2xhc3NTdHJpbmcoZm4pKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgbGltaXQgPSAwO1xyXG4gICAgaWYgKG9wdGlvbnMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5jb25jdXJyZW5jeSAhPT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBUeXBlRXJyb3IoXCInY29uY3VycmVuY3knIG11c3QgYmUgYSBudW1iZXIgYnV0IGl0IGlzIFwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5jbGFzc1N0cmluZyhvcHRpb25zLmNvbmN1cnJlbmN5KSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxpbWl0ID0gb3B0aW9ucy5jb25jdXJyZW5jeTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwib3B0aW9ucyBhcmd1bWVudCBtdXN0IGJlIGFuIG9iamVjdCBidXQgaXQgaXMgXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwuY2xhc3NTdHJpbmcob3B0aW9ucykpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBsaW1pdCA9IHR5cGVvZiBsaW1pdCA9PT0gXCJudW1iZXJcIiAmJlxyXG4gICAgICAgIGlzRmluaXRlKGxpbWl0KSAmJiBsaW1pdCA+PSAxID8gbGltaXQgOiAwO1xyXG4gICAgcmV0dXJuIG5ldyBNYXBwaW5nUHJvbWlzZUFycmF5KHByb21pc2VzLCBmbiwgbGltaXQsIF9maWx0ZXIpLnByb21pc2UoKTtcclxufVxyXG5cclxuUHJvbWlzZS5wcm90b3R5cGUubWFwID0gZnVuY3Rpb24gKGZuLCBvcHRpb25zKSB7XHJcbiAgICByZXR1cm4gbWFwKHRoaXMsIGZuLCBvcHRpb25zLCBudWxsKTtcclxufTtcclxuXHJcblByb21pc2UubWFwID0gZnVuY3Rpb24gKHByb21pc2VzLCBmbiwgb3B0aW9ucywgX2ZpbHRlcikge1xyXG4gICAgcmV0dXJuIG1hcChwcm9taXNlcywgZm4sIG9wdGlvbnMsIF9maWx0ZXIpO1xyXG59O1xyXG5cclxuXHJcbn07XHJcblxyXG59LHtcIi4vdXRpbFwiOjM2fV0sMTk6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPVxyXG5mdW5jdGlvbihQcm9taXNlLCBJTlRFUk5BTCwgdHJ5Q29udmVydFRvUHJvbWlzZSwgYXBpUmVqZWN0aW9uLCBkZWJ1Zykge1xyXG52YXIgdXRpbCA9IF9kZXJlcV8oXCIuL3V0aWxcIik7XHJcbnZhciB0cnlDYXRjaCA9IHV0aWwudHJ5Q2F0Y2g7XHJcblxyXG5Qcm9taXNlLm1ldGhvZCA9IGZ1bmN0aW9uIChmbikge1xyXG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFByb21pc2UuVHlwZUVycm9yKFwiZXhwZWN0aW5nIGEgZnVuY3Rpb24gYnV0IGdvdCBcIiArIHV0aWwuY2xhc3NTdHJpbmcoZm4pKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHJldCA9IG5ldyBQcm9taXNlKElOVEVSTkFMKTtcclxuICAgICAgICByZXQuX2NhcHR1cmVTdGFja1RyYWNlKCk7XHJcbiAgICAgICAgcmV0Ll9wdXNoQ29udGV4dCgpO1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHRyeUNhdGNoKGZuKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIHZhciBwcm9taXNlQ3JlYXRlZCA9IHJldC5fcG9wQ29udGV4dCgpO1xyXG4gICAgICAgIGRlYnVnLmNoZWNrRm9yZ290dGVuUmV0dXJucyhcclxuICAgICAgICAgICAgdmFsdWUsIHByb21pc2VDcmVhdGVkLCBcIlByb21pc2UubWV0aG9kXCIsIHJldCk7XHJcbiAgICAgICAgcmV0Ll9yZXNvbHZlRnJvbVN5bmNWYWx1ZSh2YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH07XHJcbn07XHJcblxyXG5Qcm9taXNlLmF0dGVtcHQgPSBQcm9taXNlW1widHJ5XCJdID0gZnVuY3Rpb24gKGZuKSB7XHJcbiAgICBpZiAodHlwZW9mIGZuICE9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICByZXR1cm4gYXBpUmVqZWN0aW9uKFwiZXhwZWN0aW5nIGEgZnVuY3Rpb24gYnV0IGdvdCBcIiArIHV0aWwuY2xhc3NTdHJpbmcoZm4pKTtcclxuICAgIH1cclxuICAgIHZhciByZXQgPSBuZXcgUHJvbWlzZShJTlRFUk5BTCk7XHJcbiAgICByZXQuX2NhcHR1cmVTdGFja1RyYWNlKCk7XHJcbiAgICByZXQuX3B1c2hDb250ZXh0KCk7XHJcbiAgICB2YXIgdmFsdWU7XHJcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICBkZWJ1Zy5kZXByZWNhdGVkKFwiY2FsbGluZyBQcm9taXNlLnRyeSB3aXRoIG1vcmUgdGhhbiAxIGFyZ3VtZW50XCIpO1xyXG4gICAgICAgIHZhciBhcmcgPSBhcmd1bWVudHNbMV07XHJcbiAgICAgICAgdmFyIGN0eCA9IGFyZ3VtZW50c1syXTtcclxuICAgICAgICB2YWx1ZSA9IHV0aWwuaXNBcnJheShhcmcpID8gdHJ5Q2F0Y2goZm4pLmFwcGx5KGN0eCwgYXJnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB0cnlDYXRjaChmbikuY2FsbChjdHgsIGFyZyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhbHVlID0gdHJ5Q2F0Y2goZm4pKCk7XHJcbiAgICB9XHJcbiAgICB2YXIgcHJvbWlzZUNyZWF0ZWQgPSByZXQuX3BvcENvbnRleHQoKTtcclxuICAgIGRlYnVnLmNoZWNrRm9yZ290dGVuUmV0dXJucyhcclxuICAgICAgICB2YWx1ZSwgcHJvbWlzZUNyZWF0ZWQsIFwiUHJvbWlzZS50cnlcIiwgcmV0KTtcclxuICAgIHJldC5fcmVzb2x2ZUZyb21TeW5jVmFsdWUodmFsdWUpO1xyXG4gICAgcmV0dXJuIHJldDtcclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLl9yZXNvbHZlRnJvbVN5bmNWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgaWYgKHZhbHVlID09PSB1dGlsLmVycm9yT2JqKSB7XHJcbiAgICAgICAgdGhpcy5fcmVqZWN0Q2FsbGJhY2sodmFsdWUuZSwgZmFsc2UpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9yZXNvbHZlQ2FsbGJhY2sodmFsdWUsIHRydWUpO1xyXG4gICAgfVxyXG59O1xyXG59O1xyXG5cclxufSx7XCIuL3V0aWxcIjozNn1dLDIwOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcclxuXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciB1dGlsID0gX2RlcmVxXyhcIi4vdXRpbFwiKTtcclxudmFyIG1heWJlV3JhcEFzRXJyb3IgPSB1dGlsLm1heWJlV3JhcEFzRXJyb3I7XHJcbnZhciBlcnJvcnMgPSBfZGVyZXFfKFwiLi9lcnJvcnNcIik7XHJcbnZhciBPcGVyYXRpb25hbEVycm9yID0gZXJyb3JzLk9wZXJhdGlvbmFsRXJyb3I7XHJcbnZhciBlczUgPSBfZGVyZXFfKFwiLi9lczVcIik7XHJcblxyXG5mdW5jdGlvbiBpc1VudHlwZWRFcnJvcihvYmopIHtcclxuICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBFcnJvciAmJlxyXG4gICAgICAgIGVzNS5nZXRQcm90b3R5cGVPZihvYmopID09PSBFcnJvci5wcm90b3R5cGU7XHJcbn1cclxuXHJcbnZhciByRXJyb3JLZXkgPSAvXig/Om5hbWV8bWVzc2FnZXxzdGFja3xjYXVzZSkkLztcclxuZnVuY3Rpb24gd3JhcEFzT3BlcmF0aW9uYWxFcnJvcihvYmopIHtcclxuICAgIHZhciByZXQ7XHJcbiAgICBpZiAoaXNVbnR5cGVkRXJyb3Iob2JqKSkge1xyXG4gICAgICAgIHJldCA9IG5ldyBPcGVyYXRpb25hbEVycm9yKG9iaik7XHJcbiAgICAgICAgcmV0Lm5hbWUgPSBvYmoubmFtZTtcclxuICAgICAgICByZXQubWVzc2FnZSA9IG9iai5tZXNzYWdlO1xyXG4gICAgICAgIHJldC5zdGFjayA9IG9iai5zdGFjaztcclxuICAgICAgICB2YXIga2V5cyA9IGVzNS5rZXlzKG9iaik7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xyXG4gICAgICAgICAgICBpZiAoIXJFcnJvcktleS50ZXN0KGtleSkpIHtcclxuICAgICAgICAgICAgICAgIHJldFtrZXldID0gb2JqW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuICAgIHV0aWwubWFya0FzT3JpZ2luYXRpbmdGcm9tUmVqZWN0aW9uKG9iaik7XHJcbiAgICByZXR1cm4gb2JqO1xyXG59XHJcblxyXG5mdW5jdGlvbiBub2RlYmFja0ZvclByb21pc2UocHJvbWlzZSwgbXVsdGlBcmdzKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24oZXJyLCB2YWx1ZSkge1xyXG4gICAgICAgIGlmIChwcm9taXNlID09PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICB2YXIgd3JhcHBlZCA9IHdyYXBBc09wZXJhdGlvbmFsRXJyb3IobWF5YmVXcmFwQXNFcnJvcihlcnIpKTtcclxuICAgICAgICAgICAgcHJvbWlzZS5fYXR0YWNoRXh0cmFUcmFjZSh3cmFwcGVkKTtcclxuICAgICAgICAgICAgcHJvbWlzZS5fcmVqZWN0KHdyYXBwZWQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIW11bHRpQXJncykge1xyXG4gICAgICAgICAgICBwcm9taXNlLl9mdWxmaWxsKHZhbHVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTs7XHJcbiAgICAgICAgICAgIHByb21pc2UuX2Z1bGZpbGwoYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb21pc2UgPSBudWxsO1xyXG4gICAgfTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBub2RlYmFja0ZvclByb21pc2U7XHJcblxyXG59LHtcIi4vZXJyb3JzXCI6MTIsXCIuL2VzNVwiOjEzLFwiLi91dGlsXCI6MzZ9XSwyMTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFByb21pc2UpIHtcclxudmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xyXG52YXIgYXN5bmMgPSBQcm9taXNlLl9hc3luYztcclxudmFyIHRyeUNhdGNoID0gdXRpbC50cnlDYXRjaDtcclxudmFyIGVycm9yT2JqID0gdXRpbC5lcnJvck9iajtcclxuXHJcbmZ1bmN0aW9uIHNwcmVhZEFkYXB0ZXIodmFsLCBub2RlYmFjaykge1xyXG4gICAgdmFyIHByb21pc2UgPSB0aGlzO1xyXG4gICAgaWYgKCF1dGlsLmlzQXJyYXkodmFsKSkgcmV0dXJuIHN1Y2Nlc3NBZGFwdGVyLmNhbGwocHJvbWlzZSwgdmFsLCBub2RlYmFjayk7XHJcbiAgICB2YXIgcmV0ID1cclxuICAgICAgICB0cnlDYXRjaChub2RlYmFjaykuYXBwbHkocHJvbWlzZS5fYm91bmRWYWx1ZSgpLCBbbnVsbF0uY29uY2F0KHZhbCkpO1xyXG4gICAgaWYgKHJldCA9PT0gZXJyb3JPYmopIHtcclxuICAgICAgICBhc3luYy50aHJvd0xhdGVyKHJldC5lKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc3VjY2Vzc0FkYXB0ZXIodmFsLCBub2RlYmFjaykge1xyXG4gICAgdmFyIHByb21pc2UgPSB0aGlzO1xyXG4gICAgdmFyIHJlY2VpdmVyID0gcHJvbWlzZS5fYm91bmRWYWx1ZSgpO1xyXG4gICAgdmFyIHJldCA9IHZhbCA9PT0gdW5kZWZpbmVkXHJcbiAgICAgICAgPyB0cnlDYXRjaChub2RlYmFjaykuY2FsbChyZWNlaXZlciwgbnVsbClcclxuICAgICAgICA6IHRyeUNhdGNoKG5vZGViYWNrKS5jYWxsKHJlY2VpdmVyLCBudWxsLCB2YWwpO1xyXG4gICAgaWYgKHJldCA9PT0gZXJyb3JPYmopIHtcclxuICAgICAgICBhc3luYy50aHJvd0xhdGVyKHJldC5lKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBlcnJvckFkYXB0ZXIocmVhc29uLCBub2RlYmFjaykge1xyXG4gICAgdmFyIHByb21pc2UgPSB0aGlzO1xyXG4gICAgaWYgKCFyZWFzb24pIHtcclxuICAgICAgICB2YXIgbmV3UmVhc29uID0gbmV3IEVycm9yKHJlYXNvbiArIFwiXCIpO1xyXG4gICAgICAgIG5ld1JlYXNvbi5jYXVzZSA9IHJlYXNvbjtcclxuICAgICAgICByZWFzb24gPSBuZXdSZWFzb247XHJcbiAgICB9XHJcbiAgICB2YXIgcmV0ID0gdHJ5Q2F0Y2gobm9kZWJhY2spLmNhbGwocHJvbWlzZS5fYm91bmRWYWx1ZSgpLCByZWFzb24pO1xyXG4gICAgaWYgKHJldCA9PT0gZXJyb3JPYmopIHtcclxuICAgICAgICBhc3luYy50aHJvd0xhdGVyKHJldC5lKTtcclxuICAgIH1cclxufVxyXG5cclxuUHJvbWlzZS5wcm90b3R5cGUuYXNDYWxsYmFjayA9IFByb21pc2UucHJvdG90eXBlLm5vZGVpZnkgPSBmdW5jdGlvbiAobm9kZWJhY2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMpIHtcclxuICAgIGlmICh0eXBlb2Ygbm9kZWJhY2sgPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgdmFyIGFkYXB0ZXIgPSBzdWNjZXNzQWRhcHRlcjtcclxuICAgICAgICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkICYmIE9iamVjdChvcHRpb25zKS5zcHJlYWQpIHtcclxuICAgICAgICAgICAgYWRhcHRlciA9IHNwcmVhZEFkYXB0ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3RoZW4oXHJcbiAgICAgICAgICAgIGFkYXB0ZXIsXHJcbiAgICAgICAgICAgIGVycm9yQWRhcHRlcixcclxuICAgICAgICAgICAgdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICB0aGlzLFxyXG4gICAgICAgICAgICBub2RlYmFja1xyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxufTtcclxuXHJcbn0se1wiLi91dGlsXCI6MzZ9XSwyMjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG52YXIgbWFrZVNlbGZSZXNvbHV0aW9uRXJyb3IgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gbmV3IFR5cGVFcnJvcihcImNpcmN1bGFyIHByb21pc2UgcmVzb2x1dGlvbiBjaGFpblxcdTAwMGFcXHUwMDBhICAgIFNlZSBodHRwOi8vZ29vLmdsL01xckZtWFxcdTAwMGFcIik7XHJcbn07XHJcbnZhciByZWZsZWN0SGFuZGxlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlLlByb21pc2VJbnNwZWN0aW9uKHRoaXMuX3RhcmdldCgpKTtcclxufTtcclxudmFyIGFwaVJlamVjdGlvbiA9IGZ1bmN0aW9uKG1zZykge1xyXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IobXNnKSk7XHJcbn07XHJcbmZ1bmN0aW9uIFByb3h5YWJsZSgpIHt9XHJcbnZhciBVTkRFRklORURfQklORElORyA9IHt9O1xyXG52YXIgdXRpbCA9IF9kZXJlcV8oXCIuL3V0aWxcIik7XHJcblxyXG52YXIgZ2V0RG9tYWluO1xyXG5pZiAodXRpbC5pc05vZGUpIHtcclxuICAgIGdldERvbWFpbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciByZXQgPSBwcm9jZXNzLmRvbWFpbjtcclxuICAgICAgICBpZiAocmV0ID09PSB1bmRlZmluZWQpIHJldCA9IG51bGw7XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH07XHJcbn0gZWxzZSB7XHJcbiAgICBnZXREb21haW4gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH07XHJcbn1cclxudXRpbC5ub3RFbnVtZXJhYmxlUHJvcChQcm9taXNlLCBcIl9nZXREb21haW5cIiwgZ2V0RG9tYWluKTtcclxuXHJcbnZhciBlczUgPSBfZGVyZXFfKFwiLi9lczVcIik7XHJcbnZhciBBc3luYyA9IF9kZXJlcV8oXCIuL2FzeW5jXCIpO1xyXG52YXIgYXN5bmMgPSBuZXcgQXN5bmMoKTtcclxuZXM1LmRlZmluZVByb3BlcnR5KFByb21pc2UsIFwiX2FzeW5jXCIsIHt2YWx1ZTogYXN5bmN9KTtcclxudmFyIGVycm9ycyA9IF9kZXJlcV8oXCIuL2Vycm9yc1wiKTtcclxudmFyIFR5cGVFcnJvciA9IFByb21pc2UuVHlwZUVycm9yID0gZXJyb3JzLlR5cGVFcnJvcjtcclxuUHJvbWlzZS5SYW5nZUVycm9yID0gZXJyb3JzLlJhbmdlRXJyb3I7XHJcbnZhciBDYW5jZWxsYXRpb25FcnJvciA9IFByb21pc2UuQ2FuY2VsbGF0aW9uRXJyb3IgPSBlcnJvcnMuQ2FuY2VsbGF0aW9uRXJyb3I7XHJcblByb21pc2UuVGltZW91dEVycm9yID0gZXJyb3JzLlRpbWVvdXRFcnJvcjtcclxuUHJvbWlzZS5PcGVyYXRpb25hbEVycm9yID0gZXJyb3JzLk9wZXJhdGlvbmFsRXJyb3I7XHJcblByb21pc2UuUmVqZWN0aW9uRXJyb3IgPSBlcnJvcnMuT3BlcmF0aW9uYWxFcnJvcjtcclxuUHJvbWlzZS5BZ2dyZWdhdGVFcnJvciA9IGVycm9ycy5BZ2dyZWdhdGVFcnJvcjtcclxudmFyIElOVEVSTkFMID0gZnVuY3Rpb24oKXt9O1xyXG52YXIgQVBQTFkgPSB7fTtcclxudmFyIE5FWFRfRklMVEVSID0ge307XHJcbnZhciB0cnlDb252ZXJ0VG9Qcm9taXNlID0gX2RlcmVxXyhcIi4vdGhlbmFibGVzXCIpKFByb21pc2UsIElOVEVSTkFMKTtcclxudmFyIFByb21pc2VBcnJheSA9XHJcbiAgICBfZGVyZXFfKFwiLi9wcm9taXNlX2FycmF5XCIpKFByb21pc2UsIElOVEVSTkFMLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5Q29udmVydFRvUHJvbWlzZSwgYXBpUmVqZWN0aW9uLCBQcm94eWFibGUpO1xyXG52YXIgQ29udGV4dCA9IF9kZXJlcV8oXCIuL2NvbnRleHRcIikoUHJvbWlzZSk7XHJcbiAvKmpzaGludCB1bnVzZWQ6ZmFsc2UqL1xyXG52YXIgY3JlYXRlQ29udGV4dCA9IENvbnRleHQuY3JlYXRlO1xyXG52YXIgZGVidWcgPSBfZGVyZXFfKFwiLi9kZWJ1Z2dhYmlsaXR5XCIpKFByb21pc2UsIENvbnRleHQpO1xyXG52YXIgQ2FwdHVyZWRUcmFjZSA9IGRlYnVnLkNhcHR1cmVkVHJhY2U7XHJcbnZhciBQYXNzVGhyb3VnaEhhbmRsZXJDb250ZXh0ID1cclxuICAgIF9kZXJlcV8oXCIuL2ZpbmFsbHlcIikoUHJvbWlzZSwgdHJ5Q29udmVydFRvUHJvbWlzZSwgTkVYVF9GSUxURVIpO1xyXG52YXIgY2F0Y2hGaWx0ZXIgPSBfZGVyZXFfKFwiLi9jYXRjaF9maWx0ZXJcIikoTkVYVF9GSUxURVIpO1xyXG52YXIgbm9kZWJhY2tGb3JQcm9taXNlID0gX2RlcmVxXyhcIi4vbm9kZWJhY2tcIik7XHJcbnZhciBlcnJvck9iaiA9IHV0aWwuZXJyb3JPYmo7XHJcbnZhciB0cnlDYXRjaCA9IHV0aWwudHJ5Q2F0Y2g7XHJcbmZ1bmN0aW9uIGNoZWNrKHNlbGYsIGV4ZWN1dG9yKSB7XHJcbiAgICBpZiAoc2VsZiA9PSBudWxsIHx8IHNlbGYuY29uc3RydWN0b3IgIT09IFByb21pc2UpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwidGhlIHByb21pc2UgY29uc3RydWN0b3IgY2Fubm90IGJlIGludm9rZWQgZGlyZWN0bHlcXHUwMDBhXFx1MDAwYSAgICBTZWUgaHR0cDovL2dvby5nbC9NcXJGbVhcXHUwMDBhXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImV4cGVjdGluZyBhIGZ1bmN0aW9uIGJ1dCBnb3QgXCIgKyB1dGlsLmNsYXNzU3RyaW5nKGV4ZWN1dG9yKSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKSB7XHJcbiAgICBpZiAoZXhlY3V0b3IgIT09IElOVEVSTkFMKSB7XHJcbiAgICAgICAgY2hlY2sodGhpcywgZXhlY3V0b3IpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fYml0RmllbGQgPSAwO1xyXG4gICAgdGhpcy5fZnVsZmlsbG1lbnRIYW5kbGVyMCA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuX3JlamVjdGlvbkhhbmRsZXIwID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5fcHJvbWlzZTAgPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLl9yZWNlaXZlcjAgPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLl9yZXNvbHZlRnJvbUV4ZWN1dG9yKGV4ZWN1dG9yKTtcclxuICAgIHRoaXMuX3Byb21pc2VDcmVhdGVkKCk7XHJcbiAgICB0aGlzLl9maXJlRXZlbnQoXCJwcm9taXNlQ3JlYXRlZFwiLCB0aGlzKTtcclxufVxyXG5cclxuUHJvbWlzZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gXCJbb2JqZWN0IFByb21pc2VdXCI7XHJcbn07XHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZS5jYXVnaHQgPSBQcm9taXNlLnByb3RvdHlwZVtcImNhdGNoXCJdID0gZnVuY3Rpb24gKGZuKSB7XHJcbiAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcclxuICAgIGlmIChsZW4gPiAxKSB7XHJcbiAgICAgICAgdmFyIGNhdGNoSW5zdGFuY2VzID0gbmV3IEFycmF5KGxlbiAtIDEpLFxyXG4gICAgICAgICAgICBqID0gMCwgaTtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuIC0gMTsgKytpKSB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBpZiAodXRpbC5pc09iamVjdChpdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgY2F0Y2hJbnN0YW5jZXNbaisrXSA9IGl0ZW07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYXBpUmVqZWN0aW9uKFwiQ2F0Y2ggc3RhdGVtZW50IHByZWRpY2F0ZTogXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZXhwZWN0aW5nIGFuIG9iamVjdCBidXQgZ290IFwiICsgdXRpbC5jbGFzc1N0cmluZyhpdGVtKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2hJbnN0YW5jZXMubGVuZ3RoID0gajtcclxuICAgICAgICBmbiA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICByZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCwgY2F0Y2hGaWx0ZXIoY2F0Y2hJbnN0YW5jZXMsIGZuLCB0aGlzKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCwgZm4pO1xyXG59O1xyXG5cclxuUHJvbWlzZS5wcm90b3R5cGUucmVmbGVjdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLl90aGVuKHJlZmxlY3RIYW5kbGVyLFxyXG4gICAgICAgIHJlZmxlY3RIYW5kbGVyLCB1bmRlZmluZWQsIHRoaXMsIHVuZGVmaW5lZCk7XHJcbn07XHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZS50aGVuID0gZnVuY3Rpb24gKGRpZEZ1bGZpbGwsIGRpZFJlamVjdCkge1xyXG4gICAgaWYgKGRlYnVnLndhcm5pbmdzKCkgJiYgYXJndW1lbnRzLmxlbmd0aCA+IDAgJiZcclxuICAgICAgICB0eXBlb2YgZGlkRnVsZmlsbCAhPT0gXCJmdW5jdGlvblwiICYmXHJcbiAgICAgICAgdHlwZW9mIGRpZFJlamVjdCAhPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgdmFyIG1zZyA9IFwiLnRoZW4oKSBvbmx5IGFjY2VwdHMgZnVuY3Rpb25zIGJ1dCB3YXMgcGFzc2VkOiBcIiArXHJcbiAgICAgICAgICAgICAgICB1dGlsLmNsYXNzU3RyaW5nKGRpZEZ1bGZpbGwpO1xyXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICBtc2cgKz0gXCIsIFwiICsgdXRpbC5jbGFzc1N0cmluZyhkaWRSZWplY3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl93YXJuKG1zZyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5fdGhlbihkaWRGdWxmaWxsLCBkaWRSZWplY3QsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQpO1xyXG59O1xyXG5cclxuUHJvbWlzZS5wcm90b3R5cGUuZG9uZSA9IGZ1bmN0aW9uIChkaWRGdWxmaWxsLCBkaWRSZWplY3QpIHtcclxuICAgIHZhciBwcm9taXNlID1cclxuICAgICAgICB0aGlzLl90aGVuKGRpZEZ1bGZpbGwsIGRpZFJlamVjdCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCk7XHJcbiAgICBwcm9taXNlLl9zZXRJc0ZpbmFsKCk7XHJcbn07XHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZS5zcHJlYWQgPSBmdW5jdGlvbiAoZm4pIHtcclxuICAgIGlmICh0eXBlb2YgZm4gIT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIHJldHVybiBhcGlSZWplY3Rpb24oXCJleHBlY3RpbmcgYSBmdW5jdGlvbiBidXQgZ290IFwiICsgdXRpbC5jbGFzc1N0cmluZyhmbikpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuYWxsKCkuX3RoZW4oZm4sIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBBUFBMWSwgdW5kZWZpbmVkKTtcclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciByZXQgPSB7XHJcbiAgICAgICAgaXNGdWxmaWxsZWQ6IGZhbHNlLFxyXG4gICAgICAgIGlzUmVqZWN0ZWQ6IGZhbHNlLFxyXG4gICAgICAgIGZ1bGZpbGxtZW50VmFsdWU6IHVuZGVmaW5lZCxcclxuICAgICAgICByZWplY3Rpb25SZWFzb246IHVuZGVmaW5lZFxyXG4gICAgfTtcclxuICAgIGlmICh0aGlzLmlzRnVsZmlsbGVkKCkpIHtcclxuICAgICAgICByZXQuZnVsZmlsbG1lbnRWYWx1ZSA9IHRoaXMudmFsdWUoKTtcclxuICAgICAgICByZXQuaXNGdWxmaWxsZWQgPSB0cnVlO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmlzUmVqZWN0ZWQoKSkge1xyXG4gICAgICAgIHJldC5yZWplY3Rpb25SZWFzb24gPSB0aGlzLnJlYXNvbigpO1xyXG4gICAgICAgIHJldC5pc1JlamVjdGVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXQ7XHJcbn07XHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZS5hbGwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB0aGlzLl93YXJuKFwiLmFsbCgpIHdhcyBwYXNzZWQgYXJndW1lbnRzIGJ1dCBpdCBkb2VzIG5vdCB0YWtlIGFueVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZUFycmF5KHRoaXMpLnByb21pc2UoKTtcclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKGZuKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jYXVnaHQodXRpbC5vcmlnaW5hdGVzRnJvbVJlamVjdGlvbiwgZm4pO1xyXG59O1xyXG5cclxuUHJvbWlzZS5nZXROZXdMaWJyYXJ5Q29weSA9IG1vZHVsZS5leHBvcnRzO1xyXG5cclxuUHJvbWlzZS5pcyA9IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgIHJldHVybiB2YWwgaW5zdGFuY2VvZiBQcm9taXNlO1xyXG59O1xyXG5cclxuUHJvbWlzZS5mcm9tTm9kZSA9IFByb21pc2UuZnJvbUNhbGxiYWNrID0gZnVuY3Rpb24oZm4pIHtcclxuICAgIHZhciByZXQgPSBuZXcgUHJvbWlzZShJTlRFUk5BTCk7XHJcbiAgICByZXQuX2NhcHR1cmVTdGFja1RyYWNlKCk7XHJcbiAgICB2YXIgbXVsdGlBcmdzID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgPyAhIU9iamVjdChhcmd1bWVudHNbMV0pLm11bHRpQXJnc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZmFsc2U7XHJcbiAgICB2YXIgcmVzdWx0ID0gdHJ5Q2F0Y2goZm4pKG5vZGViYWNrRm9yUHJvbWlzZShyZXQsIG11bHRpQXJncykpO1xyXG4gICAgaWYgKHJlc3VsdCA9PT0gZXJyb3JPYmopIHtcclxuICAgICAgICByZXQuX3JlamVjdENhbGxiYWNrKHJlc3VsdC5lLCB0cnVlKTtcclxuICAgIH1cclxuICAgIGlmICghcmV0Ll9pc0ZhdGVTZWFsZWQoKSkgcmV0Ll9zZXRBc3luY0d1YXJhbnRlZWQoKTtcclxuICAgIHJldHVybiByZXQ7XHJcbn07XHJcblxyXG5Qcm9taXNlLmFsbCA9IGZ1bmN0aW9uIChwcm9taXNlcykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlQXJyYXkocHJvbWlzZXMpLnByb21pc2UoKTtcclxufTtcclxuXHJcblByb21pc2UuY2FzdCA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgIHZhciByZXQgPSB0cnlDb252ZXJ0VG9Qcm9taXNlKG9iaik7XHJcbiAgICBpZiAoIShyZXQgaW5zdGFuY2VvZiBQcm9taXNlKSkge1xyXG4gICAgICAgIHJldCA9IG5ldyBQcm9taXNlKElOVEVSTkFMKTtcclxuICAgICAgICByZXQuX2NhcHR1cmVTdGFja1RyYWNlKCk7XHJcbiAgICAgICAgcmV0Ll9zZXRGdWxmaWxsZWQoKTtcclxuICAgICAgICByZXQuX3JlamVjdGlvbkhhbmRsZXIwID0gb2JqO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJldDtcclxufTtcclxuXHJcblByb21pc2UucmVzb2x2ZSA9IFByb21pc2UuZnVsZmlsbGVkID0gUHJvbWlzZS5jYXN0O1xyXG5cclxuUHJvbWlzZS5yZWplY3QgPSBQcm9taXNlLnJlamVjdGVkID0gZnVuY3Rpb24gKHJlYXNvbikge1xyXG4gICAgdmFyIHJldCA9IG5ldyBQcm9taXNlKElOVEVSTkFMKTtcclxuICAgIHJldC5fY2FwdHVyZVN0YWNrVHJhY2UoKTtcclxuICAgIHJldC5fcmVqZWN0Q2FsbGJhY2socmVhc29uLCB0cnVlKTtcclxuICAgIHJldHVybiByZXQ7XHJcbn07XHJcblxyXG5Qcm9taXNlLnNldFNjaGVkdWxlciA9IGZ1bmN0aW9uKGZuKSB7XHJcbiAgICBpZiAodHlwZW9mIGZuICE9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiZXhwZWN0aW5nIGEgZnVuY3Rpb24gYnV0IGdvdCBcIiArIHV0aWwuY2xhc3NTdHJpbmcoZm4pKTtcclxuICAgIH1cclxuICAgIHJldHVybiBhc3luYy5zZXRTY2hlZHVsZXIoZm4pO1xyXG59O1xyXG5cclxuUHJvbWlzZS5wcm90b3R5cGUuX3RoZW4gPSBmdW5jdGlvbiAoXHJcbiAgICBkaWRGdWxmaWxsLFxyXG4gICAgZGlkUmVqZWN0LFxyXG4gICAgXywgICAgcmVjZWl2ZXIsXHJcbiAgICBpbnRlcm5hbERhdGFcclxuKSB7XHJcbiAgICB2YXIgaGF2ZUludGVybmFsRGF0YSA9IGludGVybmFsRGF0YSAhPT0gdW5kZWZpbmVkO1xyXG4gICAgdmFyIHByb21pc2UgPSBoYXZlSW50ZXJuYWxEYXRhID8gaW50ZXJuYWxEYXRhIDogbmV3IFByb21pc2UoSU5URVJOQUwpO1xyXG4gICAgdmFyIHRhcmdldCA9IHRoaXMuX3RhcmdldCgpO1xyXG4gICAgdmFyIGJpdEZpZWxkID0gdGFyZ2V0Ll9iaXRGaWVsZDtcclxuXHJcbiAgICBpZiAoIWhhdmVJbnRlcm5hbERhdGEpIHtcclxuICAgICAgICBwcm9taXNlLl9wcm9wYWdhdGVGcm9tKHRoaXMsIDMpO1xyXG4gICAgICAgIHByb21pc2UuX2NhcHR1cmVTdGFja1RyYWNlKCk7XHJcbiAgICAgICAgaWYgKHJlY2VpdmVyID09PSB1bmRlZmluZWQgJiZcclxuICAgICAgICAgICAgKCh0aGlzLl9iaXRGaWVsZCAmIDIwOTcxNTIpICE9PSAwKSkge1xyXG4gICAgICAgICAgICBpZiAoISgoYml0RmllbGQgJiA1MDM5NzE4NCkgPT09IDApKSB7XHJcbiAgICAgICAgICAgICAgICByZWNlaXZlciA9IHRoaXMuX2JvdW5kVmFsdWUoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlY2VpdmVyID0gdGFyZ2V0ID09PSB0aGlzID8gdW5kZWZpbmVkIDogdGhpcy5fYm91bmRUbztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9maXJlRXZlbnQoXCJwcm9taXNlQ2hhaW5lZFwiLCB0aGlzLCBwcm9taXNlKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZG9tYWluID0gZ2V0RG9tYWluKCk7XHJcbiAgICBpZiAoISgoYml0RmllbGQgJiA1MDM5NzE4NCkgPT09IDApKSB7XHJcbiAgICAgICAgdmFyIGhhbmRsZXIsIHZhbHVlLCBzZXR0bGVyID0gdGFyZ2V0Ll9zZXR0bGVQcm9taXNlQ3R4O1xyXG4gICAgICAgIGlmICgoKGJpdEZpZWxkICYgMzM1NTQ0MzIpICE9PSAwKSkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHRhcmdldC5fcmVqZWN0aW9uSGFuZGxlcjA7XHJcbiAgICAgICAgICAgIGhhbmRsZXIgPSBkaWRGdWxmaWxsO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKChiaXRGaWVsZCAmIDE2Nzc3MjE2KSAhPT0gMCkpIHtcclxuICAgICAgICAgICAgdmFsdWUgPSB0YXJnZXQuX2Z1bGZpbGxtZW50SGFuZGxlcjA7XHJcbiAgICAgICAgICAgIGhhbmRsZXIgPSBkaWRSZWplY3Q7XHJcbiAgICAgICAgICAgIHRhcmdldC5fdW5zZXRSZWplY3Rpb25Jc1VuaGFuZGxlZCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNldHRsZXIgPSB0YXJnZXQuX3NldHRsZVByb21pc2VMYXRlQ2FuY2VsbGF0aW9uT2JzZXJ2ZXI7XHJcbiAgICAgICAgICAgIHZhbHVlID0gbmV3IENhbmNlbGxhdGlvbkVycm9yKFwibGF0ZSBjYW5jZWxsYXRpb24gb2JzZXJ2ZXJcIik7XHJcbiAgICAgICAgICAgIHRhcmdldC5fYXR0YWNoRXh0cmFUcmFjZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgIGhhbmRsZXIgPSBkaWRSZWplY3Q7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhc3luYy5pbnZva2Uoc2V0dGxlciwgdGFyZ2V0LCB7XHJcbiAgICAgICAgICAgIGhhbmRsZXI6IGRvbWFpbiA9PT0gbnVsbCA/IGhhbmRsZXJcclxuICAgICAgICAgICAgICAgIDogKHR5cGVvZiBoYW5kbGVyID09PSBcImZ1bmN0aW9uXCIgJiZcclxuICAgICAgICAgICAgICAgICAgICB1dGlsLmRvbWFpbkJpbmQoZG9tYWluLCBoYW5kbGVyKSksXHJcbiAgICAgICAgICAgIHByb21pc2U6IHByb21pc2UsXHJcbiAgICAgICAgICAgIHJlY2VpdmVyOiByZWNlaXZlcixcclxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRhcmdldC5fYWRkQ2FsbGJhY2tzKGRpZEZ1bGZpbGwsIGRpZFJlamVjdCwgcHJvbWlzZSwgcmVjZWl2ZXIsIGRvbWFpbik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHByb21pc2U7XHJcbn07XHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZS5fbGVuZ3RoID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2JpdEZpZWxkICYgNjU1MzU7XHJcbn07XHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZS5faXNGYXRlU2VhbGVkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuICh0aGlzLl9iaXRGaWVsZCAmIDExNzUwNjA0OCkgIT09IDA7XHJcbn07XHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZS5faXNGb2xsb3dpbmcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gKHRoaXMuX2JpdEZpZWxkICYgNjcxMDg4NjQpID09PSA2NzEwODg2NDtcclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLl9zZXRMZW5ndGggPSBmdW5jdGlvbiAobGVuKSB7XHJcbiAgICB0aGlzLl9iaXRGaWVsZCA9ICh0aGlzLl9iaXRGaWVsZCAmIC02NTUzNikgfFxyXG4gICAgICAgIChsZW4gJiA2NTUzNSk7XHJcbn07XHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZS5fc2V0RnVsZmlsbGVkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5fYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZCB8IDMzNTU0NDMyO1xyXG4gICAgdGhpcy5fZmlyZUV2ZW50KFwicHJvbWlzZUZ1bGZpbGxlZFwiLCB0aGlzKTtcclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLl9zZXRSZWplY3RlZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuX2JpdEZpZWxkID0gdGhpcy5fYml0RmllbGQgfCAxNjc3NzIxNjtcclxuICAgIHRoaXMuX2ZpcmVFdmVudChcInByb21pc2VSZWplY3RlZFwiLCB0aGlzKTtcclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLl9zZXRGb2xsb3dpbmcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLl9iaXRGaWVsZCA9IHRoaXMuX2JpdEZpZWxkIHwgNjcxMDg4NjQ7XHJcbiAgICB0aGlzLl9maXJlRXZlbnQoXCJwcm9taXNlUmVzb2x2ZWRcIiwgdGhpcyk7XHJcbn07XHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZS5fc2V0SXNGaW5hbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuX2JpdEZpZWxkID0gdGhpcy5fYml0RmllbGQgfCA0MTk0MzA0O1xyXG59O1xyXG5cclxuUHJvbWlzZS5wcm90b3R5cGUuX2lzRmluYWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gKHRoaXMuX2JpdEZpZWxkICYgNDE5NDMwNCkgPiAwO1xyXG59O1xyXG5cclxuUHJvbWlzZS5wcm90b3R5cGUuX3Vuc2V0Q2FuY2VsbGVkID0gZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLl9iaXRGaWVsZCA9IHRoaXMuX2JpdEZpZWxkICYgKH42NTUzNik7XHJcbn07XHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZS5fc2V0Q2FuY2VsbGVkID0gZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLl9iaXRGaWVsZCA9IHRoaXMuX2JpdEZpZWxkIHwgNjU1MzY7XHJcbiAgICB0aGlzLl9maXJlRXZlbnQoXCJwcm9taXNlQ2FuY2VsbGVkXCIsIHRoaXMpO1xyXG59O1xyXG5cclxuUHJvbWlzZS5wcm90b3R5cGUuX3NldFdpbGxCZUNhbmNlbGxlZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5fYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZCB8IDgzODg2MDg7XHJcbn07XHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZS5fc2V0QXN5bmNHdWFyYW50ZWVkID0gZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAoYXN5bmMuaGFzQ3VzdG9tU2NoZWR1bGVyKCkpIHJldHVybjtcclxuICAgIHRoaXMuX2JpdEZpZWxkID0gdGhpcy5fYml0RmllbGQgfCAxMzQyMTc3Mjg7XHJcbn07XHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZS5fcmVjZWl2ZXJBdCA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgdmFyIHJldCA9IGluZGV4ID09PSAwID8gdGhpcy5fcmVjZWl2ZXIwIDogdGhpc1tcclxuICAgICAgICAgICAgaW5kZXggKiA0IC0gNCArIDNdO1xyXG4gICAgaWYgKHJldCA9PT0gVU5ERUZJTkVEX0JJTkRJTkcpIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfSBlbHNlIGlmIChyZXQgPT09IHVuZGVmaW5lZCAmJiB0aGlzLl9pc0JvdW5kKCkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYm91bmRWYWx1ZSgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJldDtcclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLl9wcm9taXNlQXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgIHJldHVybiB0aGlzW1xyXG4gICAgICAgICAgICBpbmRleCAqIDQgLSA0ICsgMl07XHJcbn07XHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZS5fZnVsZmlsbG1lbnRIYW5kbGVyQXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgIHJldHVybiB0aGlzW1xyXG4gICAgICAgICAgICBpbmRleCAqIDQgLSA0ICsgMF07XHJcbn07XHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZS5fcmVqZWN0aW9uSGFuZGxlckF0ID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICByZXR1cm4gdGhpc1tcclxuICAgICAgICAgICAgaW5kZXggKiA0IC0gNCArIDFdO1xyXG59O1xyXG5cclxuUHJvbWlzZS5wcm90b3R5cGUuX2JvdW5kVmFsdWUgPSBmdW5jdGlvbigpIHt9O1xyXG5cclxuUHJvbWlzZS5wcm90b3R5cGUuX21pZ3JhdGVDYWxsYmFjazAgPSBmdW5jdGlvbiAoZm9sbG93ZXIpIHtcclxuICAgIHZhciBiaXRGaWVsZCA9IGZvbGxvd2VyLl9iaXRGaWVsZDtcclxuICAgIHZhciBmdWxmaWxsID0gZm9sbG93ZXIuX2Z1bGZpbGxtZW50SGFuZGxlcjA7XHJcbiAgICB2YXIgcmVqZWN0ID0gZm9sbG93ZXIuX3JlamVjdGlvbkhhbmRsZXIwO1xyXG4gICAgdmFyIHByb21pc2UgPSBmb2xsb3dlci5fcHJvbWlzZTA7XHJcbiAgICB2YXIgcmVjZWl2ZXIgPSBmb2xsb3dlci5fcmVjZWl2ZXJBdCgwKTtcclxuICAgIGlmIChyZWNlaXZlciA9PT0gdW5kZWZpbmVkKSByZWNlaXZlciA9IFVOREVGSU5FRF9CSU5ESU5HO1xyXG4gICAgdGhpcy5fYWRkQ2FsbGJhY2tzKGZ1bGZpbGwsIHJlamVjdCwgcHJvbWlzZSwgcmVjZWl2ZXIsIG51bGwpO1xyXG59O1xyXG5cclxuUHJvbWlzZS5wcm90b3R5cGUuX21pZ3JhdGVDYWxsYmFja0F0ID0gZnVuY3Rpb24gKGZvbGxvd2VyLCBpbmRleCkge1xyXG4gICAgdmFyIGZ1bGZpbGwgPSBmb2xsb3dlci5fZnVsZmlsbG1lbnRIYW5kbGVyQXQoaW5kZXgpO1xyXG4gICAgdmFyIHJlamVjdCA9IGZvbGxvd2VyLl9yZWplY3Rpb25IYW5kbGVyQXQoaW5kZXgpO1xyXG4gICAgdmFyIHByb21pc2UgPSBmb2xsb3dlci5fcHJvbWlzZUF0KGluZGV4KTtcclxuICAgIHZhciByZWNlaXZlciA9IGZvbGxvd2VyLl9yZWNlaXZlckF0KGluZGV4KTtcclxuICAgIGlmIChyZWNlaXZlciA9PT0gdW5kZWZpbmVkKSByZWNlaXZlciA9IFVOREVGSU5FRF9CSU5ESU5HO1xyXG4gICAgdGhpcy5fYWRkQ2FsbGJhY2tzKGZ1bGZpbGwsIHJlamVjdCwgcHJvbWlzZSwgcmVjZWl2ZXIsIG51bGwpO1xyXG59O1xyXG5cclxuUHJvbWlzZS5wcm90b3R5cGUuX2FkZENhbGxiYWNrcyA9IGZ1bmN0aW9uIChcclxuICAgIGZ1bGZpbGwsXHJcbiAgICByZWplY3QsXHJcbiAgICBwcm9taXNlLFxyXG4gICAgcmVjZWl2ZXIsXHJcbiAgICBkb21haW5cclxuKSB7XHJcbiAgICB2YXIgaW5kZXggPSB0aGlzLl9sZW5ndGgoKTtcclxuXHJcbiAgICBpZiAoaW5kZXggPj0gNjU1MzUgLSA0KSB7XHJcbiAgICAgICAgaW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMuX3NldExlbmd0aCgwKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaW5kZXggPT09IDApIHtcclxuICAgICAgICB0aGlzLl9wcm9taXNlMCA9IHByb21pc2U7XHJcbiAgICAgICAgdGhpcy5fcmVjZWl2ZXIwID0gcmVjZWl2ZXI7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBmdWxmaWxsID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZnVsZmlsbG1lbnRIYW5kbGVyMCA9XHJcbiAgICAgICAgICAgICAgICBkb21haW4gPT09IG51bGwgPyBmdWxmaWxsIDogdXRpbC5kb21haW5CaW5kKGRvbWFpbiwgZnVsZmlsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgcmVqZWN0ID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVqZWN0aW9uSGFuZGxlcjAgPVxyXG4gICAgICAgICAgICAgICAgZG9tYWluID09PSBudWxsID8gcmVqZWN0IDogdXRpbC5kb21haW5CaW5kKGRvbWFpbiwgcmVqZWN0KTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBiYXNlID0gaW5kZXggKiA0IC0gNDtcclxuICAgICAgICB0aGlzW2Jhc2UgKyAyXSA9IHByb21pc2U7XHJcbiAgICAgICAgdGhpc1tiYXNlICsgM10gPSByZWNlaXZlcjtcclxuICAgICAgICBpZiAodHlwZW9mIGZ1bGZpbGwgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICB0aGlzW2Jhc2UgKyAwXSA9XHJcbiAgICAgICAgICAgICAgICBkb21haW4gPT09IG51bGwgPyBmdWxmaWxsIDogdXRpbC5kb21haW5CaW5kKGRvbWFpbiwgZnVsZmlsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgcmVqZWN0ID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgdGhpc1tiYXNlICsgMV0gPVxyXG4gICAgICAgICAgICAgICAgZG9tYWluID09PSBudWxsID8gcmVqZWN0IDogdXRpbC5kb21haW5CaW5kKGRvbWFpbiwgcmVqZWN0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLl9zZXRMZW5ndGgoaW5kZXggKyAxKTtcclxuICAgIHJldHVybiBpbmRleDtcclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLl9wcm94eSA9IGZ1bmN0aW9uIChwcm94eWFibGUsIGFyZykge1xyXG4gICAgdGhpcy5fYWRkQ2FsbGJhY2tzKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBhcmcsIHByb3h5YWJsZSwgbnVsbCk7XHJcbn07XHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZS5fcmVzb2x2ZUNhbGxiYWNrID0gZnVuY3Rpb24odmFsdWUsIHNob3VsZEJpbmQpIHtcclxuICAgIGlmICgoKHRoaXMuX2JpdEZpZWxkICYgMTE3NTA2MDQ4KSAhPT0gMCkpIHJldHVybjtcclxuICAgIGlmICh2YWx1ZSA9PT0gdGhpcylcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVqZWN0Q2FsbGJhY2sobWFrZVNlbGZSZXNvbHV0aW9uRXJyb3IoKSwgZmFsc2UpO1xyXG4gICAgdmFyIG1heWJlUHJvbWlzZSA9IHRyeUNvbnZlcnRUb1Byb21pc2UodmFsdWUsIHRoaXMpO1xyXG4gICAgaWYgKCEobWF5YmVQcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkpIHJldHVybiB0aGlzLl9mdWxmaWxsKHZhbHVlKTtcclxuXHJcbiAgICBpZiAoc2hvdWxkQmluZCkgdGhpcy5fcHJvcGFnYXRlRnJvbShtYXliZVByb21pc2UsIDIpO1xyXG5cclxuICAgIHZhciBwcm9taXNlID0gbWF5YmVQcm9taXNlLl90YXJnZXQoKTtcclxuXHJcbiAgICBpZiAocHJvbWlzZSA9PT0gdGhpcykge1xyXG4gICAgICAgIHRoaXMuX3JlamVjdChtYWtlU2VsZlJlc29sdXRpb25FcnJvcigpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGJpdEZpZWxkID0gcHJvbWlzZS5fYml0RmllbGQ7XHJcbiAgICBpZiAoKChiaXRGaWVsZCAmIDUwMzk3MTg0KSA9PT0gMCkpIHtcclxuICAgICAgICB2YXIgbGVuID0gdGhpcy5fbGVuZ3RoKCk7XHJcbiAgICAgICAgaWYgKGxlbiA+IDApIHByb21pc2UuX21pZ3JhdGVDYWxsYmFjazAodGhpcyk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICAgICAgICBwcm9taXNlLl9taWdyYXRlQ2FsbGJhY2tBdCh0aGlzLCBpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc2V0Rm9sbG93aW5nKCk7XHJcbiAgICAgICAgdGhpcy5fc2V0TGVuZ3RoKDApO1xyXG4gICAgICAgIHRoaXMuX3NldEZvbGxvd2VlKHByb21pc2UpO1xyXG4gICAgfSBlbHNlIGlmICgoKGJpdEZpZWxkICYgMzM1NTQ0MzIpICE9PSAwKSkge1xyXG4gICAgICAgIHRoaXMuX2Z1bGZpbGwocHJvbWlzZS5fdmFsdWUoKSk7XHJcbiAgICB9IGVsc2UgaWYgKCgoYml0RmllbGQgJiAxNjc3NzIxNikgIT09IDApKSB7XHJcbiAgICAgICAgdGhpcy5fcmVqZWN0KHByb21pc2UuX3JlYXNvbigpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIHJlYXNvbiA9IG5ldyBDYW5jZWxsYXRpb25FcnJvcihcImxhdGUgY2FuY2VsbGF0aW9uIG9ic2VydmVyXCIpO1xyXG4gICAgICAgIHByb21pc2UuX2F0dGFjaEV4dHJhVHJhY2UocmVhc29uKTtcclxuICAgICAgICB0aGlzLl9yZWplY3QocmVhc29uKTtcclxuICAgIH1cclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLl9yZWplY3RDYWxsYmFjayA9XHJcbmZ1bmN0aW9uKHJlYXNvbiwgc3luY2hyb25vdXMsIGlnbm9yZU5vbkVycm9yV2FybmluZ3MpIHtcclxuICAgIHZhciB0cmFjZSA9IHV0aWwuZW5zdXJlRXJyb3JPYmplY3QocmVhc29uKTtcclxuICAgIHZhciBoYXNTdGFjayA9IHRyYWNlID09PSByZWFzb247XHJcbiAgICBpZiAoIWhhc1N0YWNrICYmICFpZ25vcmVOb25FcnJvcldhcm5pbmdzICYmIGRlYnVnLndhcm5pbmdzKCkpIHtcclxuICAgICAgICB2YXIgbWVzc2FnZSA9IFwiYSBwcm9taXNlIHdhcyByZWplY3RlZCB3aXRoIGEgbm9uLWVycm9yOiBcIiArXHJcbiAgICAgICAgICAgIHV0aWwuY2xhc3NTdHJpbmcocmVhc29uKTtcclxuICAgICAgICB0aGlzLl93YXJuKG1lc3NhZ2UsIHRydWUpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fYXR0YWNoRXh0cmFUcmFjZSh0cmFjZSwgc3luY2hyb25vdXMgPyBoYXNTdGFjayA6IGZhbHNlKTtcclxuICAgIHRoaXMuX3JlamVjdChyZWFzb24pO1xyXG59O1xyXG5cclxuUHJvbWlzZS5wcm90b3R5cGUuX3Jlc29sdmVGcm9tRXhlY3V0b3IgPSBmdW5jdGlvbiAoZXhlY3V0b3IpIHtcclxuICAgIGlmIChleGVjdXRvciA9PT0gSU5URVJOQUwpIHJldHVybjtcclxuICAgIHZhciBwcm9taXNlID0gdGhpcztcclxuICAgIHRoaXMuX2NhcHR1cmVTdGFja1RyYWNlKCk7XHJcbiAgICB0aGlzLl9wdXNoQ29udGV4dCgpO1xyXG4gICAgdmFyIHN5bmNocm9ub3VzID0gdHJ1ZTtcclxuICAgIHZhciByID0gdGhpcy5fZXhlY3V0ZShleGVjdXRvciwgZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICBwcm9taXNlLl9yZXNvbHZlQ2FsbGJhY2sodmFsdWUpO1xyXG4gICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xyXG4gICAgICAgIHByb21pc2UuX3JlamVjdENhbGxiYWNrKHJlYXNvbiwgc3luY2hyb25vdXMpO1xyXG4gICAgfSk7XHJcbiAgICBzeW5jaHJvbm91cyA9IGZhbHNlO1xyXG4gICAgdGhpcy5fcG9wQ29udGV4dCgpO1xyXG5cclxuICAgIGlmIChyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBwcm9taXNlLl9yZWplY3RDYWxsYmFjayhyLCB0cnVlKTtcclxuICAgIH1cclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLl9zZXR0bGVQcm9taXNlRnJvbUhhbmRsZXIgPSBmdW5jdGlvbiAoXHJcbiAgICBoYW5kbGVyLCByZWNlaXZlciwgdmFsdWUsIHByb21pc2VcclxuKSB7XHJcbiAgICB2YXIgYml0RmllbGQgPSBwcm9taXNlLl9iaXRGaWVsZDtcclxuICAgIGlmICgoKGJpdEZpZWxkICYgNjU1MzYpICE9PSAwKSkgcmV0dXJuO1xyXG4gICAgcHJvbWlzZS5fcHVzaENvbnRleHQoKTtcclxuICAgIHZhciB4O1xyXG4gICAgaWYgKHJlY2VpdmVyID09PSBBUFBMWSkge1xyXG4gICAgICAgIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlLmxlbmd0aCAhPT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICB4ID0gZXJyb3JPYmo7XHJcbiAgICAgICAgICAgIHguZSA9IG5ldyBUeXBlRXJyb3IoXCJjYW5ub3QgLnNwcmVhZCgpIGEgbm9uLWFycmF5OiBcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwuY2xhc3NTdHJpbmcodmFsdWUpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB4ID0gdHJ5Q2F0Y2goaGFuZGxlcikuYXBwbHkodGhpcy5fYm91bmRWYWx1ZSgpLCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB4ID0gdHJ5Q2F0Y2goaGFuZGxlcikuY2FsbChyZWNlaXZlciwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgdmFyIHByb21pc2VDcmVhdGVkID0gcHJvbWlzZS5fcG9wQ29udGV4dCgpO1xyXG4gICAgYml0RmllbGQgPSBwcm9taXNlLl9iaXRGaWVsZDtcclxuICAgIGlmICgoKGJpdEZpZWxkICYgNjU1MzYpICE9PSAwKSkgcmV0dXJuO1xyXG5cclxuICAgIGlmICh4ID09PSBORVhUX0ZJTFRFUikge1xyXG4gICAgICAgIHByb21pc2UuX3JlamVjdCh2YWx1ZSk7XHJcbiAgICB9IGVsc2UgaWYgKHggPT09IGVycm9yT2JqKSB7XHJcbiAgICAgICAgcHJvbWlzZS5fcmVqZWN0Q2FsbGJhY2soeC5lLCBmYWxzZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRlYnVnLmNoZWNrRm9yZ290dGVuUmV0dXJucyh4LCBwcm9taXNlQ3JlYXRlZCwgXCJcIiwgIHByb21pc2UsIHRoaXMpO1xyXG4gICAgICAgIHByb21pc2UuX3Jlc29sdmVDYWxsYmFjayh4KTtcclxuICAgIH1cclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLl90YXJnZXQgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciByZXQgPSB0aGlzO1xyXG4gICAgd2hpbGUgKHJldC5faXNGb2xsb3dpbmcoKSkgcmV0ID0gcmV0Ll9mb2xsb3dlZSgpO1xyXG4gICAgcmV0dXJuIHJldDtcclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLl9mb2xsb3dlZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3JlamVjdGlvbkhhbmRsZXIwO1xyXG59O1xyXG5cclxuUHJvbWlzZS5wcm90b3R5cGUuX3NldEZvbGxvd2VlID0gZnVuY3Rpb24ocHJvbWlzZSkge1xyXG4gICAgdGhpcy5fcmVqZWN0aW9uSGFuZGxlcjAgPSBwcm9taXNlO1xyXG59O1xyXG5cclxuUHJvbWlzZS5wcm90b3R5cGUuX3NldHRsZVByb21pc2UgPSBmdW5jdGlvbihwcm9taXNlLCBoYW5kbGVyLCByZWNlaXZlciwgdmFsdWUpIHtcclxuICAgIHZhciBpc1Byb21pc2UgPSBwcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZTtcclxuICAgIHZhciBiaXRGaWVsZCA9IHRoaXMuX2JpdEZpZWxkO1xyXG4gICAgdmFyIGFzeW5jR3VhcmFudGVlZCA9ICgoYml0RmllbGQgJiAxMzQyMTc3MjgpICE9PSAwKTtcclxuICAgIGlmICgoKGJpdEZpZWxkICYgNjU1MzYpICE9PSAwKSkge1xyXG4gICAgICAgIGlmIChpc1Byb21pc2UpIHByb21pc2UuX2ludm9rZUludGVybmFsT25DYW5jZWwoKTtcclxuXHJcbiAgICAgICAgaWYgKHJlY2VpdmVyIGluc3RhbmNlb2YgUGFzc1Rocm91Z2hIYW5kbGVyQ29udGV4dCAmJlxyXG4gICAgICAgICAgICByZWNlaXZlci5pc0ZpbmFsbHlIYW5kbGVyKCkpIHtcclxuICAgICAgICAgICAgcmVjZWl2ZXIuY2FuY2VsUHJvbWlzZSA9IHByb21pc2U7XHJcbiAgICAgICAgICAgIGlmICh0cnlDYXRjaChoYW5kbGVyKS5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgPT09IGVycm9yT2JqKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlLl9yZWplY3QoZXJyb3JPYmouZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGhhbmRsZXIgPT09IHJlZmxlY3RIYW5kbGVyKSB7XHJcbiAgICAgICAgICAgIHByb21pc2UuX2Z1bGZpbGwocmVmbGVjdEhhbmRsZXIuY2FsbChyZWNlaXZlcikpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocmVjZWl2ZXIgaW5zdGFuY2VvZiBQcm94eWFibGUpIHtcclxuICAgICAgICAgICAgcmVjZWl2ZXIuX3Byb21pc2VDYW5jZWxsZWQocHJvbWlzZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc1Byb21pc2UgfHwgcHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2VBcnJheSkge1xyXG4gICAgICAgICAgICBwcm9taXNlLl9jYW5jZWwoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZWNlaXZlci5jYW5jZWwoKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBoYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICBpZiAoIWlzUHJvbWlzZSkge1xyXG4gICAgICAgICAgICBoYW5kbGVyLmNhbGwocmVjZWl2ZXIsIHZhbHVlLCBwcm9taXNlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoYXN5bmNHdWFyYW50ZWVkKSBwcm9taXNlLl9zZXRBc3luY0d1YXJhbnRlZWQoKTtcclxuICAgICAgICAgICAgdGhpcy5fc2V0dGxlUHJvbWlzZUZyb21IYW5kbGVyKGhhbmRsZXIsIHJlY2VpdmVyLCB2YWx1ZSwgcHJvbWlzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChyZWNlaXZlciBpbnN0YW5jZW9mIFByb3h5YWJsZSkge1xyXG4gICAgICAgIGlmICghcmVjZWl2ZXIuX2lzUmVzb2x2ZWQoKSkge1xyXG4gICAgICAgICAgICBpZiAoKChiaXRGaWVsZCAmIDMzNTU0NDMyKSAhPT0gMCkpIHtcclxuICAgICAgICAgICAgICAgIHJlY2VpdmVyLl9wcm9taXNlRnVsZmlsbGVkKHZhbHVlLCBwcm9taXNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlY2VpdmVyLl9wcm9taXNlUmVqZWN0ZWQodmFsdWUsIHByb21pc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChpc1Byb21pc2UpIHtcclxuICAgICAgICBpZiAoYXN5bmNHdWFyYW50ZWVkKSBwcm9taXNlLl9zZXRBc3luY0d1YXJhbnRlZWQoKTtcclxuICAgICAgICBpZiAoKChiaXRGaWVsZCAmIDMzNTU0NDMyKSAhPT0gMCkpIHtcclxuICAgICAgICAgICAgcHJvbWlzZS5fZnVsZmlsbCh2YWx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcHJvbWlzZS5fcmVqZWN0KHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZS5fc2V0dGxlUHJvbWlzZUxhdGVDYW5jZWxsYXRpb25PYnNlcnZlciA9IGZ1bmN0aW9uKGN0eCkge1xyXG4gICAgdmFyIGhhbmRsZXIgPSBjdHguaGFuZGxlcjtcclxuICAgIHZhciBwcm9taXNlID0gY3R4LnByb21pc2U7XHJcbiAgICB2YXIgcmVjZWl2ZXIgPSBjdHgucmVjZWl2ZXI7XHJcbiAgICB2YXIgdmFsdWUgPSBjdHgudmFsdWU7XHJcbiAgICBpZiAodHlwZW9mIGhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIGlmICghKHByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSkge1xyXG4gICAgICAgICAgICBoYW5kbGVyLmNhbGwocmVjZWl2ZXIsIHZhbHVlLCBwcm9taXNlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9zZXR0bGVQcm9taXNlRnJvbUhhbmRsZXIoaGFuZGxlciwgcmVjZWl2ZXIsIHZhbHVlLCBwcm9taXNlKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSB7XHJcbiAgICAgICAgcHJvbWlzZS5fcmVqZWN0KHZhbHVlKTtcclxuICAgIH1cclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLl9zZXR0bGVQcm9taXNlQ3R4ID0gZnVuY3Rpb24oY3R4KSB7XHJcbiAgICB0aGlzLl9zZXR0bGVQcm9taXNlKGN0eC5wcm9taXNlLCBjdHguaGFuZGxlciwgY3R4LnJlY2VpdmVyLCBjdHgudmFsdWUpO1xyXG59O1xyXG5cclxuUHJvbWlzZS5wcm90b3R5cGUuX3NldHRsZVByb21pc2UwID0gZnVuY3Rpb24oaGFuZGxlciwgdmFsdWUsIGJpdEZpZWxkKSB7XHJcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXMuX3Byb21pc2UwO1xyXG4gICAgdmFyIHJlY2VpdmVyID0gdGhpcy5fcmVjZWl2ZXJBdCgwKTtcclxuICAgIHRoaXMuX3Byb21pc2UwID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5fcmVjZWl2ZXIwID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5fc2V0dGxlUHJvbWlzZShwcm9taXNlLCBoYW5kbGVyLCByZWNlaXZlciwgdmFsdWUpO1xyXG59O1xyXG5cclxuUHJvbWlzZS5wcm90b3R5cGUuX2NsZWFyQ2FsbGJhY2tEYXRhQXRJbmRleCA9IGZ1bmN0aW9uKGluZGV4KSB7XHJcbiAgICB2YXIgYmFzZSA9IGluZGV4ICogNCAtIDQ7XHJcbiAgICB0aGlzW2Jhc2UgKyAyXSA9XHJcbiAgICB0aGlzW2Jhc2UgKyAzXSA9XHJcbiAgICB0aGlzW2Jhc2UgKyAwXSA9XHJcbiAgICB0aGlzW2Jhc2UgKyAxXSA9IHVuZGVmaW5lZDtcclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLl9mdWxmaWxsID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICB2YXIgYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZDtcclxuICAgIGlmICgoKGJpdEZpZWxkICYgMTE3NTA2MDQ4KSA+Pj4gMTYpKSByZXR1cm47XHJcbiAgICBpZiAodmFsdWUgPT09IHRoaXMpIHtcclxuICAgICAgICB2YXIgZXJyID0gbWFrZVNlbGZSZXNvbHV0aW9uRXJyb3IoKTtcclxuICAgICAgICB0aGlzLl9hdHRhY2hFeHRyYVRyYWNlKGVycik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlamVjdChlcnIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fc2V0RnVsZmlsbGVkKCk7XHJcbiAgICB0aGlzLl9yZWplY3Rpb25IYW5kbGVyMCA9IHZhbHVlO1xyXG5cclxuICAgIGlmICgoYml0RmllbGQgJiA2NTUzNSkgPiAwKSB7XHJcbiAgICAgICAgaWYgKCgoYml0RmllbGQgJiAxMzQyMTc3MjgpICE9PSAwKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zZXR0bGVQcm9taXNlcygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFzeW5jLnNldHRsZVByb21pc2VzKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLl9yZWplY3QgPSBmdW5jdGlvbiAocmVhc29uKSB7XHJcbiAgICB2YXIgYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZDtcclxuICAgIGlmICgoKGJpdEZpZWxkICYgMTE3NTA2MDQ4KSA+Pj4gMTYpKSByZXR1cm47XHJcbiAgICB0aGlzLl9zZXRSZWplY3RlZCgpO1xyXG4gICAgdGhpcy5fZnVsZmlsbG1lbnRIYW5kbGVyMCA9IHJlYXNvbjtcclxuXHJcbiAgICBpZiAodGhpcy5faXNGaW5hbCgpKSB7XHJcbiAgICAgICAgcmV0dXJuIGFzeW5jLmZhdGFsRXJyb3IocmVhc29uLCB1dGlsLmlzTm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKChiaXRGaWVsZCAmIDY1NTM1KSA+IDApIHtcclxuICAgICAgICBhc3luYy5zZXR0bGVQcm9taXNlcyh0aGlzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fZW5zdXJlUG9zc2libGVSZWplY3Rpb25IYW5kbGVkKCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZS5fZnVsZmlsbFByb21pc2VzID0gZnVuY3Rpb24gKGxlbiwgdmFsdWUpIHtcclxuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICB2YXIgaGFuZGxlciA9IHRoaXMuX2Z1bGZpbGxtZW50SGFuZGxlckF0KGkpO1xyXG4gICAgICAgIHZhciBwcm9taXNlID0gdGhpcy5fcHJvbWlzZUF0KGkpO1xyXG4gICAgICAgIHZhciByZWNlaXZlciA9IHRoaXMuX3JlY2VpdmVyQXQoaSk7XHJcbiAgICAgICAgdGhpcy5fY2xlYXJDYWxsYmFja0RhdGFBdEluZGV4KGkpO1xyXG4gICAgICAgIHRoaXMuX3NldHRsZVByb21pc2UocHJvbWlzZSwgaGFuZGxlciwgcmVjZWl2ZXIsIHZhbHVlKTtcclxuICAgIH1cclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLl9yZWplY3RQcm9taXNlcyA9IGZ1bmN0aW9uIChsZW4sIHJlYXNvbikge1xyXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgIHZhciBoYW5kbGVyID0gdGhpcy5fcmVqZWN0aW9uSGFuZGxlckF0KGkpO1xyXG4gICAgICAgIHZhciBwcm9taXNlID0gdGhpcy5fcHJvbWlzZUF0KGkpO1xyXG4gICAgICAgIHZhciByZWNlaXZlciA9IHRoaXMuX3JlY2VpdmVyQXQoaSk7XHJcbiAgICAgICAgdGhpcy5fY2xlYXJDYWxsYmFja0RhdGFBdEluZGV4KGkpO1xyXG4gICAgICAgIHRoaXMuX3NldHRsZVByb21pc2UocHJvbWlzZSwgaGFuZGxlciwgcmVjZWl2ZXIsIHJlYXNvbik7XHJcbiAgICB9XHJcbn07XHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZS5fc2V0dGxlUHJvbWlzZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZDtcclxuICAgIHZhciBsZW4gPSAoYml0RmllbGQgJiA2NTUzNSk7XHJcblxyXG4gICAgaWYgKGxlbiA+IDApIHtcclxuICAgICAgICBpZiAoKChiaXRGaWVsZCAmIDE2ODQyNzUyKSAhPT0gMCkpIHtcclxuICAgICAgICAgICAgdmFyIHJlYXNvbiA9IHRoaXMuX2Z1bGZpbGxtZW50SGFuZGxlcjA7XHJcbiAgICAgICAgICAgIHRoaXMuX3NldHRsZVByb21pc2UwKHRoaXMuX3JlamVjdGlvbkhhbmRsZXIwLCByZWFzb24sIGJpdEZpZWxkKTtcclxuICAgICAgICAgICAgdGhpcy5fcmVqZWN0UHJvbWlzZXMobGVuLCByZWFzb24pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuX3JlamVjdGlvbkhhbmRsZXIwO1xyXG4gICAgICAgICAgICB0aGlzLl9zZXR0bGVQcm9taXNlMCh0aGlzLl9mdWxmaWxsbWVudEhhbmRsZXIwLCB2YWx1ZSwgYml0RmllbGQpO1xyXG4gICAgICAgICAgICB0aGlzLl9mdWxmaWxsUHJvbWlzZXMobGVuLCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3NldExlbmd0aCgwKTtcclxuICAgIH1cclxuICAgIHRoaXMuX2NsZWFyQ2FuY2VsbGF0aW9uRGF0YSgpO1xyXG59O1xyXG5cclxuUHJvbWlzZS5wcm90b3R5cGUuX3NldHRsZWRWYWx1ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGJpdEZpZWxkID0gdGhpcy5fYml0RmllbGQ7XHJcbiAgICBpZiAoKChiaXRGaWVsZCAmIDMzNTU0NDMyKSAhPT0gMCkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVqZWN0aW9uSGFuZGxlcjA7XHJcbiAgICB9IGVsc2UgaWYgKCgoYml0RmllbGQgJiAxNjc3NzIxNikgIT09IDApKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Z1bGZpbGxtZW50SGFuZGxlcjA7XHJcbiAgICB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBkZWZlclJlc29sdmUodikge3RoaXMucHJvbWlzZS5fcmVzb2x2ZUNhbGxiYWNrKHYpO31cclxuZnVuY3Rpb24gZGVmZXJSZWplY3Qodikge3RoaXMucHJvbWlzZS5fcmVqZWN0Q2FsbGJhY2sodiwgZmFsc2UpO31cclxuXHJcblByb21pc2UuZGVmZXIgPSBQcm9taXNlLnBlbmRpbmcgPSBmdW5jdGlvbigpIHtcclxuICAgIGRlYnVnLmRlcHJlY2F0ZWQoXCJQcm9taXNlLmRlZmVyXCIsIFwibmV3IFByb21pc2VcIik7XHJcbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKElOVEVSTkFMKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcHJvbWlzZTogcHJvbWlzZSxcclxuICAgICAgICByZXNvbHZlOiBkZWZlclJlc29sdmUsXHJcbiAgICAgICAgcmVqZWN0OiBkZWZlclJlamVjdFxyXG4gICAgfTtcclxufTtcclxuXHJcbnV0aWwubm90RW51bWVyYWJsZVByb3AoUHJvbWlzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICBcIl9tYWtlU2VsZlJlc29sdXRpb25FcnJvclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIG1ha2VTZWxmUmVzb2x1dGlvbkVycm9yKTtcclxuXHJcbl9kZXJlcV8oXCIuL21ldGhvZFwiKShQcm9taXNlLCBJTlRFUk5BTCwgdHJ5Q29udmVydFRvUHJvbWlzZSwgYXBpUmVqZWN0aW9uLFxyXG4gICAgZGVidWcpO1xyXG5fZGVyZXFfKFwiLi9iaW5kXCIpKFByb21pc2UsIElOVEVSTkFMLCB0cnlDb252ZXJ0VG9Qcm9taXNlLCBkZWJ1Zyk7XHJcbl9kZXJlcV8oXCIuL2NhbmNlbFwiKShQcm9taXNlLCBQcm9taXNlQXJyYXksIGFwaVJlamVjdGlvbiwgZGVidWcpO1xyXG5fZGVyZXFfKFwiLi9kaXJlY3RfcmVzb2x2ZVwiKShQcm9taXNlKTtcclxuX2RlcmVxXyhcIi4vc3luY2hyb25vdXNfaW5zcGVjdGlvblwiKShQcm9taXNlKTtcclxuX2RlcmVxXyhcIi4vam9pblwiKShcclxuICAgIFByb21pc2UsIFByb21pc2VBcnJheSwgdHJ5Q29udmVydFRvUHJvbWlzZSwgSU5URVJOQUwsIGFzeW5jLCBnZXREb21haW4pO1xyXG5Qcm9taXNlLlByb21pc2UgPSBQcm9taXNlO1xyXG5Qcm9taXNlLnZlcnNpb24gPSBcIjMuNS4wXCI7XHJcbl9kZXJlcV8oJy4vbWFwLmpzJykoUHJvbWlzZSwgUHJvbWlzZUFycmF5LCBhcGlSZWplY3Rpb24sIHRyeUNvbnZlcnRUb1Byb21pc2UsIElOVEVSTkFMLCBkZWJ1Zyk7XHJcbl9kZXJlcV8oJy4vY2FsbF9nZXQuanMnKShQcm9taXNlKTtcclxuX2RlcmVxXygnLi91c2luZy5qcycpKFByb21pc2UsIGFwaVJlamVjdGlvbiwgdHJ5Q29udmVydFRvUHJvbWlzZSwgY3JlYXRlQ29udGV4dCwgSU5URVJOQUwsIGRlYnVnKTtcclxuX2RlcmVxXygnLi90aW1lcnMuanMnKShQcm9taXNlLCBJTlRFUk5BTCwgZGVidWcpO1xyXG5fZGVyZXFfKCcuL2dlbmVyYXRvcnMuanMnKShQcm9taXNlLCBhcGlSZWplY3Rpb24sIElOVEVSTkFMLCB0cnlDb252ZXJ0VG9Qcm9taXNlLCBQcm94eWFibGUsIGRlYnVnKTtcclxuX2RlcmVxXygnLi9ub2RlaWZ5LmpzJykoUHJvbWlzZSk7XHJcbl9kZXJlcV8oJy4vcHJvbWlzaWZ5LmpzJykoUHJvbWlzZSwgSU5URVJOQUwpO1xyXG5fZGVyZXFfKCcuL3Byb3BzLmpzJykoUHJvbWlzZSwgUHJvbWlzZUFycmF5LCB0cnlDb252ZXJ0VG9Qcm9taXNlLCBhcGlSZWplY3Rpb24pO1xyXG5fZGVyZXFfKCcuL3JhY2UuanMnKShQcm9taXNlLCBJTlRFUk5BTCwgdHJ5Q29udmVydFRvUHJvbWlzZSwgYXBpUmVqZWN0aW9uKTtcclxuX2RlcmVxXygnLi9yZWR1Y2UuanMnKShQcm9taXNlLCBQcm9taXNlQXJyYXksIGFwaVJlamVjdGlvbiwgdHJ5Q29udmVydFRvUHJvbWlzZSwgSU5URVJOQUwsIGRlYnVnKTtcclxuX2RlcmVxXygnLi9zZXR0bGUuanMnKShQcm9taXNlLCBQcm9taXNlQXJyYXksIGRlYnVnKTtcclxuX2RlcmVxXygnLi9zb21lLmpzJykoUHJvbWlzZSwgUHJvbWlzZUFycmF5LCBhcGlSZWplY3Rpb24pO1xyXG5fZGVyZXFfKCcuL2ZpbHRlci5qcycpKFByb21pc2UsIElOVEVSTkFMKTtcclxuX2RlcmVxXygnLi9lYWNoLmpzJykoUHJvbWlzZSwgSU5URVJOQUwpO1xyXG5fZGVyZXFfKCcuL2FueS5qcycpKFByb21pc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIHV0aWwudG9GYXN0UHJvcGVydGllcyhQcm9taXNlKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIHV0aWwudG9GYXN0UHJvcGVydGllcyhQcm9taXNlLnByb3RvdHlwZSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIGZ1bmN0aW9uIGZpbGxUeXBlcyh2YWx1ZSkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICB2YXIgcCA9IG5ldyBQcm9taXNlKElOVEVSTkFMKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICBwLl9mdWxmaWxsbWVudEhhbmRsZXIwID0gdmFsdWU7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICBwLl9yZWplY3Rpb25IYW5kbGVyMCA9IHZhbHVlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICBwLl9wcm9taXNlMCA9IHZhbHVlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICBwLl9yZWNlaXZlcjAgPSB2YWx1ZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIC8vIENvbXBsZXRlIHNsYWNrIHRyYWNraW5nLCBvcHQgb3V0IG9mIGZpZWxkLXR5cGUgdHJhY2tpbmcgYW5kICAgICAgICAgICBcclxuICAgIC8vIHN0YWJpbGl6ZSBtYXAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIGZpbGxUeXBlcyh7YTogMX0pOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIGZpbGxUeXBlcyh7YjogMn0pOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIGZpbGxUeXBlcyh7YzogM30pOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIGZpbGxUeXBlcygxKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIGZpbGxUeXBlcyhmdW5jdGlvbigpe30pOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIGZpbGxUeXBlcyh1bmRlZmluZWQpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIGZpbGxUeXBlcyhmYWxzZSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIGZpbGxUeXBlcyhuZXcgUHJvbWlzZShJTlRFUk5BTCkpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIGRlYnVnLnNldEJvdW5kcyhBc3luYy5maXJzdExpbmVFcnJvciwgdXRpbC5sYXN0TGluZUVycm9yKTsgICAgICAgICAgICAgICBcclxuICAgIHJldHVybiBQcm9taXNlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcbn07XHJcblxyXG59LHtcIi4vYW55LmpzXCI6MSxcIi4vYXN5bmNcIjoyLFwiLi9iaW5kXCI6MyxcIi4vY2FsbF9nZXQuanNcIjo1LFwiLi9jYW5jZWxcIjo2LFwiLi9jYXRjaF9maWx0ZXJcIjo3LFwiLi9jb250ZXh0XCI6OCxcIi4vZGVidWdnYWJpbGl0eVwiOjksXCIuL2RpcmVjdF9yZXNvbHZlXCI6MTAsXCIuL2VhY2guanNcIjoxMSxcIi4vZXJyb3JzXCI6MTIsXCIuL2VzNVwiOjEzLFwiLi9maWx0ZXIuanNcIjoxNCxcIi4vZmluYWxseVwiOjE1LFwiLi9nZW5lcmF0b3JzLmpzXCI6MTYsXCIuL2pvaW5cIjoxNyxcIi4vbWFwLmpzXCI6MTgsXCIuL21ldGhvZFwiOjE5LFwiLi9ub2RlYmFja1wiOjIwLFwiLi9ub2RlaWZ5LmpzXCI6MjEsXCIuL3Byb21pc2VfYXJyYXlcIjoyMyxcIi4vcHJvbWlzaWZ5LmpzXCI6MjQsXCIuL3Byb3BzLmpzXCI6MjUsXCIuL3JhY2UuanNcIjoyNyxcIi4vcmVkdWNlLmpzXCI6MjgsXCIuL3NldHRsZS5qc1wiOjMwLFwiLi9zb21lLmpzXCI6MzEsXCIuL3N5bmNocm9ub3VzX2luc3BlY3Rpb25cIjozMixcIi4vdGhlbmFibGVzXCI6MzMsXCIuL3RpbWVycy5qc1wiOjM0LFwiLi91c2luZy5qc1wiOjM1LFwiLi91dGlsXCI6MzZ9XSwyMzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFByb21pc2UsIElOVEVSTkFMLCB0cnlDb252ZXJ0VG9Qcm9taXNlLFxyXG4gICAgYXBpUmVqZWN0aW9uLCBQcm94eWFibGUpIHtcclxudmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xyXG52YXIgaXNBcnJheSA9IHV0aWwuaXNBcnJheTtcclxuXHJcbmZ1bmN0aW9uIHRvUmVzb2x1dGlvblZhbHVlKHZhbCkge1xyXG4gICAgc3dpdGNoKHZhbCkge1xyXG4gICAgY2FzZSAtMjogcmV0dXJuIFtdO1xyXG4gICAgY2FzZSAtMzogcmV0dXJuIHt9O1xyXG4gICAgY2FzZSAtNjogcmV0dXJuIG5ldyBNYXAoKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gUHJvbWlzZUFycmF5KHZhbHVlcykge1xyXG4gICAgdmFyIHByb21pc2UgPSB0aGlzLl9wcm9taXNlID0gbmV3IFByb21pc2UoSU5URVJOQUwpO1xyXG4gICAgaWYgKHZhbHVlcyBpbnN0YW5jZW9mIFByb21pc2UpIHtcclxuICAgICAgICBwcm9taXNlLl9wcm9wYWdhdGVGcm9tKHZhbHVlcywgMyk7XHJcbiAgICB9XHJcbiAgICBwcm9taXNlLl9zZXRPbkNhbmNlbCh0aGlzKTtcclxuICAgIHRoaXMuX3ZhbHVlcyA9IHZhbHVlcztcclxuICAgIHRoaXMuX2xlbmd0aCA9IDA7XHJcbiAgICB0aGlzLl90b3RhbFJlc29sdmVkID0gMDtcclxuICAgIHRoaXMuX2luaXQodW5kZWZpbmVkLCAtMik7XHJcbn1cclxudXRpbC5pbmhlcml0cyhQcm9taXNlQXJyYXksIFByb3h5YWJsZSk7XHJcblxyXG5Qcm9taXNlQXJyYXkucHJvdG90eXBlLmxlbmd0aCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLl9sZW5ndGg7XHJcbn07XHJcblxyXG5Qcm9taXNlQXJyYXkucHJvdG90eXBlLnByb21pc2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcHJvbWlzZTtcclxufTtcclxuXHJcblByb21pc2VBcnJheS5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbiBpbml0KF8sIHJlc29sdmVWYWx1ZUlmRW1wdHkpIHtcclxuICAgIHZhciB2YWx1ZXMgPSB0cnlDb252ZXJ0VG9Qcm9taXNlKHRoaXMuX3ZhbHVlcywgdGhpcy5fcHJvbWlzZSk7XHJcbiAgICBpZiAodmFsdWVzIGluc3RhbmNlb2YgUHJvbWlzZSkge1xyXG4gICAgICAgIHZhbHVlcyA9IHZhbHVlcy5fdGFyZ2V0KCk7XHJcbiAgICAgICAgdmFyIGJpdEZpZWxkID0gdmFsdWVzLl9iaXRGaWVsZDtcclxuICAgICAgICA7XHJcbiAgICAgICAgdGhpcy5fdmFsdWVzID0gdmFsdWVzO1xyXG5cclxuICAgICAgICBpZiAoKChiaXRGaWVsZCAmIDUwMzk3MTg0KSA9PT0gMCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fcHJvbWlzZS5fc2V0QXN5bmNHdWFyYW50ZWVkKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZXMuX3RoZW4oXHJcbiAgICAgICAgICAgICAgICBpbml0LFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVqZWN0LFxyXG4gICAgICAgICAgICAgICAgdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgdGhpcyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmVWYWx1ZUlmRW1wdHlcclxuICAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKChiaXRGaWVsZCAmIDMzNTU0NDMyKSAhPT0gMCkpIHtcclxuICAgICAgICAgICAgdmFsdWVzID0gdmFsdWVzLl92YWx1ZSgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoKChiaXRGaWVsZCAmIDE2Nzc3MjE2KSAhPT0gMCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlamVjdCh2YWx1ZXMuX3JlYXNvbigpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY2FuY2VsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdmFsdWVzID0gdXRpbC5hc0FycmF5KHZhbHVlcyk7XHJcbiAgICBpZiAodmFsdWVzID09PSBudWxsKSB7XHJcbiAgICAgICAgdmFyIGVyciA9IGFwaVJlamVjdGlvbihcclxuICAgICAgICAgICAgXCJleHBlY3RpbmcgYW4gYXJyYXkgb3IgYW4gaXRlcmFibGUgb2JqZWN0IGJ1dCBnb3QgXCIgKyB1dGlsLmNsYXNzU3RyaW5nKHZhbHVlcykpLnJlYXNvbigpO1xyXG4gICAgICAgIHRoaXMuX3Byb21pc2UuX3JlamVjdENhbGxiYWNrKGVyciwgZmFsc2UpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodmFsdWVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIGlmIChyZXNvbHZlVmFsdWVJZkVtcHR5ID09PSAtNSkge1xyXG4gICAgICAgICAgICB0aGlzLl9yZXNvbHZlRW1wdHlBcnJheSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVzb2x2ZSh0b1Jlc29sdXRpb25WYWx1ZShyZXNvbHZlVmFsdWVJZkVtcHR5KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuX2l0ZXJhdGUodmFsdWVzKTtcclxufTtcclxuXHJcblByb21pc2VBcnJheS5wcm90b3R5cGUuX2l0ZXJhdGUgPSBmdW5jdGlvbih2YWx1ZXMpIHtcclxuICAgIHZhciBsZW4gPSB0aGlzLmdldEFjdHVhbExlbmd0aCh2YWx1ZXMubGVuZ3RoKTtcclxuICAgIHRoaXMuX2xlbmd0aCA9IGxlbjtcclxuICAgIHRoaXMuX3ZhbHVlcyA9IHRoaXMuc2hvdWxkQ29weVZhbHVlcygpID8gbmV3IEFycmF5KGxlbikgOiB0aGlzLl92YWx1ZXM7XHJcbiAgICB2YXIgcmVzdWx0ID0gdGhpcy5fcHJvbWlzZTtcclxuICAgIHZhciBpc1Jlc29sdmVkID0gZmFsc2U7XHJcbiAgICB2YXIgYml0RmllbGQgPSBudWxsO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICAgIHZhciBtYXliZVByb21pc2UgPSB0cnlDb252ZXJ0VG9Qcm9taXNlKHZhbHVlc1tpXSwgcmVzdWx0KTtcclxuXHJcbiAgICAgICAgaWYgKG1heWJlUHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcclxuICAgICAgICAgICAgbWF5YmVQcm9taXNlID0gbWF5YmVQcm9taXNlLl90YXJnZXQoKTtcclxuICAgICAgICAgICAgYml0RmllbGQgPSBtYXliZVByb21pc2UuX2JpdEZpZWxkO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGJpdEZpZWxkID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpc1Jlc29sdmVkKSB7XHJcbiAgICAgICAgICAgIGlmIChiaXRGaWVsZCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbWF5YmVQcm9taXNlLnN1cHByZXNzVW5oYW5kbGVkUmVqZWN0aW9ucygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChiaXRGaWVsZCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoKChiaXRGaWVsZCAmIDUwMzk3MTg0KSA9PT0gMCkpIHtcclxuICAgICAgICAgICAgICAgIG1heWJlUHJvbWlzZS5fcHJveHkodGhpcywgaSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXNbaV0gPSBtYXliZVByb21pc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKChiaXRGaWVsZCAmIDMzNTU0NDMyKSAhPT0gMCkpIHtcclxuICAgICAgICAgICAgICAgIGlzUmVzb2x2ZWQgPSB0aGlzLl9wcm9taXNlRnVsZmlsbGVkKG1heWJlUHJvbWlzZS5fdmFsdWUoKSwgaSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKChiaXRGaWVsZCAmIDE2Nzc3MjE2KSAhPT0gMCkpIHtcclxuICAgICAgICAgICAgICAgIGlzUmVzb2x2ZWQgPSB0aGlzLl9wcm9taXNlUmVqZWN0ZWQobWF5YmVQcm9taXNlLl9yZWFzb24oKSwgaSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpc1Jlc29sdmVkID0gdGhpcy5fcHJvbWlzZUNhbmNlbGxlZChpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlzUmVzb2x2ZWQgPSB0aGlzLl9wcm9taXNlRnVsZmlsbGVkKG1heWJlUHJvbWlzZSwgaSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKCFpc1Jlc29sdmVkKSByZXN1bHQuX3NldEFzeW5jR3VhcmFudGVlZCgpO1xyXG59O1xyXG5cclxuUHJvbWlzZUFycmF5LnByb3RvdHlwZS5faXNSZXNvbHZlZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLl92YWx1ZXMgPT09IG51bGw7XHJcbn07XHJcblxyXG5Qcm9taXNlQXJyYXkucHJvdG90eXBlLl9yZXNvbHZlID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICB0aGlzLl92YWx1ZXMgPSBudWxsO1xyXG4gICAgdGhpcy5fcHJvbWlzZS5fZnVsZmlsbCh2YWx1ZSk7XHJcbn07XHJcblxyXG5Qcm9taXNlQXJyYXkucHJvdG90eXBlLl9jYW5jZWwgPSBmdW5jdGlvbigpIHtcclxuICAgIGlmICh0aGlzLl9pc1Jlc29sdmVkKCkgfHwgIXRoaXMuX3Byb21pc2UuX2lzQ2FuY2VsbGFibGUoKSkgcmV0dXJuO1xyXG4gICAgdGhpcy5fdmFsdWVzID0gbnVsbDtcclxuICAgIHRoaXMuX3Byb21pc2UuX2NhbmNlbCgpO1xyXG59O1xyXG5cclxuUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fcmVqZWN0ID0gZnVuY3Rpb24gKHJlYXNvbikge1xyXG4gICAgdGhpcy5fdmFsdWVzID0gbnVsbDtcclxuICAgIHRoaXMuX3Byb21pc2UuX3JlamVjdENhbGxiYWNrKHJlYXNvbiwgZmFsc2UpO1xyXG59O1xyXG5cclxuUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fcHJvbWlzZUZ1bGZpbGxlZCA9IGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgpIHtcclxuICAgIHRoaXMuX3ZhbHVlc1tpbmRleF0gPSB2YWx1ZTtcclxuICAgIHZhciB0b3RhbFJlc29sdmVkID0gKyt0aGlzLl90b3RhbFJlc29sdmVkO1xyXG4gICAgaWYgKHRvdGFsUmVzb2x2ZWQgPj0gdGhpcy5fbGVuZ3RoKSB7XHJcbiAgICAgICAgdGhpcy5fcmVzb2x2ZSh0aGlzLl92YWx1ZXMpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fcHJvbWlzZUNhbmNlbGxlZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5fY2FuY2VsKCk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcblByb21pc2VBcnJheS5wcm90b3R5cGUuX3Byb21pc2VSZWplY3RlZCA9IGZ1bmN0aW9uIChyZWFzb24pIHtcclxuICAgIHRoaXMuX3RvdGFsUmVzb2x2ZWQrKztcclxuICAgIHRoaXMuX3JlamVjdChyZWFzb24pO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG5Qcm9taXNlQXJyYXkucHJvdG90eXBlLl9yZXN1bHRDYW5jZWxsZWQgPSBmdW5jdGlvbigpIHtcclxuICAgIGlmICh0aGlzLl9pc1Jlc29sdmVkKCkpIHJldHVybjtcclxuICAgIHZhciB2YWx1ZXMgPSB0aGlzLl92YWx1ZXM7XHJcbiAgICB0aGlzLl9jYW5jZWwoKTtcclxuICAgIGlmICh2YWx1ZXMgaW5zdGFuY2VvZiBQcm9taXNlKSB7XHJcbiAgICAgICAgdmFsdWVzLmNhbmNlbCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICBpZiAodmFsdWVzW2ldIGluc3RhbmNlb2YgUHJvbWlzZSkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWVzW2ldLmNhbmNlbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuUHJvbWlzZUFycmF5LnByb3RvdHlwZS5zaG91bGRDb3B5VmFsdWVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG5Qcm9taXNlQXJyYXkucHJvdG90eXBlLmdldEFjdHVhbExlbmd0aCA9IGZ1bmN0aW9uIChsZW4pIHtcclxuICAgIHJldHVybiBsZW47XHJcbn07XHJcblxyXG5yZXR1cm4gUHJvbWlzZUFycmF5O1xyXG59O1xyXG5cclxufSx7XCIuL3V0aWxcIjozNn1dLDI0OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcclxuXCJ1c2Ugc3RyaWN0XCI7XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oUHJvbWlzZSwgSU5URVJOQUwpIHtcclxudmFyIFRISVMgPSB7fTtcclxudmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xyXG52YXIgbm9kZWJhY2tGb3JQcm9taXNlID0gX2RlcmVxXyhcIi4vbm9kZWJhY2tcIik7XHJcbnZhciB3aXRoQXBwZW5kZWQgPSB1dGlsLndpdGhBcHBlbmRlZDtcclxudmFyIG1heWJlV3JhcEFzRXJyb3IgPSB1dGlsLm1heWJlV3JhcEFzRXJyb3I7XHJcbnZhciBjYW5FdmFsdWF0ZSA9IHV0aWwuY2FuRXZhbHVhdGU7XHJcbnZhciBUeXBlRXJyb3IgPSBfZGVyZXFfKFwiLi9lcnJvcnNcIikuVHlwZUVycm9yO1xyXG52YXIgZGVmYXVsdFN1ZmZpeCA9IFwiQXN5bmNcIjtcclxudmFyIGRlZmF1bHRQcm9taXNpZmllZCA9IHtfX2lzUHJvbWlzaWZpZWRfXzogdHJ1ZX07XHJcbnZhciBub0NvcHlQcm9wcyA9IFtcclxuICAgIFwiYXJpdHlcIiwgICAgXCJsZW5ndGhcIixcclxuICAgIFwibmFtZVwiLFxyXG4gICAgXCJhcmd1bWVudHNcIixcclxuICAgIFwiY2FsbGVyXCIsXHJcbiAgICBcImNhbGxlZVwiLFxyXG4gICAgXCJwcm90b3R5cGVcIixcclxuICAgIFwiX19pc1Byb21pc2lmaWVkX19cIlxyXG5dO1xyXG52YXIgbm9Db3B5UHJvcHNQYXR0ZXJuID0gbmV3IFJlZ0V4cChcIl4oPzpcIiArIG5vQ29weVByb3BzLmpvaW4oXCJ8XCIpICsgXCIpJFwiKTtcclxuXHJcbnZhciBkZWZhdWx0RmlsdGVyID0gZnVuY3Rpb24obmFtZSkge1xyXG4gICAgcmV0dXJuIHV0aWwuaXNJZGVudGlmaWVyKG5hbWUpICYmXHJcbiAgICAgICAgbmFtZS5jaGFyQXQoMCkgIT09IFwiX1wiICYmXHJcbiAgICAgICAgbmFtZSAhPT0gXCJjb25zdHJ1Y3RvclwiO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gcHJvcHNGaWx0ZXIoa2V5KSB7XHJcbiAgICByZXR1cm4gIW5vQ29weVByb3BzUGF0dGVybi50ZXN0KGtleSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzUHJvbWlzaWZpZWQoZm4pIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgcmV0dXJuIGZuLl9faXNQcm9taXNpZmllZF9fID09PSB0cnVlO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhc1Byb21pc2lmaWVkKG9iaiwga2V5LCBzdWZmaXgpIHtcclxuICAgIHZhciB2YWwgPSB1dGlsLmdldERhdGFQcm9wZXJ0eU9yRGVmYXVsdChvYmosIGtleSArIHN1ZmZpeCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvbWlzaWZpZWQpO1xyXG4gICAgcmV0dXJuIHZhbCA/IGlzUHJvbWlzaWZpZWQodmFsKSA6IGZhbHNlO1xyXG59XHJcbmZ1bmN0aW9uIGNoZWNrVmFsaWQocmV0LCBzdWZmaXgsIHN1ZmZpeFJlZ2V4cCkge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXQubGVuZ3RoOyBpICs9IDIpIHtcclxuICAgICAgICB2YXIga2V5ID0gcmV0W2ldO1xyXG4gICAgICAgIGlmIChzdWZmaXhSZWdleHAudGVzdChrZXkpKSB7XHJcbiAgICAgICAgICAgIHZhciBrZXlXaXRob3V0QXN5bmNTdWZmaXggPSBrZXkucmVwbGFjZShzdWZmaXhSZWdleHAsIFwiXCIpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJldC5sZW5ndGg7IGogKz0gMikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldFtqXSA9PT0ga2V5V2l0aG91dEFzeW5jU3VmZml4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBwcm9taXNpZnkgYW4gQVBJIHRoYXQgaGFzIG5vcm1hbCBtZXRob2RzIHdpdGggJyVzJy1zdWZmaXhcXHUwMDBhXFx1MDAwYSAgICBTZWUgaHR0cDovL2dvby5nbC9NcXJGbVhcXHUwMDBhXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoXCIlc1wiLCBzdWZmaXgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcHJvbWlzaWZpYWJsZU1ldGhvZHMob2JqLCBzdWZmaXgsIHN1ZmZpeFJlZ2V4cCwgZmlsdGVyKSB7XHJcbiAgICB2YXIga2V5cyA9IHV0aWwuaW5oZXJpdGVkRGF0YUtleXMob2JqKTtcclxuICAgIHZhciByZXQgPSBbXTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IG9ialtrZXldO1xyXG4gICAgICAgIHZhciBwYXNzZXNEZWZhdWx0RmlsdGVyID0gZmlsdGVyID09PSBkZWZhdWx0RmlsdGVyXHJcbiAgICAgICAgICAgID8gdHJ1ZSA6IGRlZmF1bHRGaWx0ZXIoa2V5LCB2YWx1ZSwgb2JqKTtcclxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIgJiZcclxuICAgICAgICAgICAgIWlzUHJvbWlzaWZpZWQodmFsdWUpICYmXHJcbiAgICAgICAgICAgICFoYXNQcm9taXNpZmllZChvYmosIGtleSwgc3VmZml4KSAmJlxyXG4gICAgICAgICAgICBmaWx0ZXIoa2V5LCB2YWx1ZSwgb2JqLCBwYXNzZXNEZWZhdWx0RmlsdGVyKSkge1xyXG4gICAgICAgICAgICByZXQucHVzaChrZXksIHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjaGVja1ZhbGlkKHJldCwgc3VmZml4LCBzdWZmaXhSZWdleHApO1xyXG4gICAgcmV0dXJuIHJldDtcclxufVxyXG5cclxudmFyIGVzY2FwZUlkZW50UmVnZXggPSBmdW5jdGlvbihzdHIpIHtcclxuICAgIHJldHVybiBzdHIucmVwbGFjZSgvKFskXSkvLCBcIlxcXFwkXCIpO1xyXG59O1xyXG5cclxudmFyIG1ha2VOb2RlUHJvbWlzaWZpZWRFdmFsO1xyXG5pZiAoIXRydWUpIHtcclxudmFyIHN3aXRjaENhc2VBcmd1bWVudE9yZGVyID0gZnVuY3Rpb24obGlrZWx5QXJndW1lbnRDb3VudCkge1xyXG4gICAgdmFyIHJldCA9IFtsaWtlbHlBcmd1bWVudENvdW50XTtcclxuICAgIHZhciBtaW4gPSBNYXRoLm1heCgwLCBsaWtlbHlBcmd1bWVudENvdW50IC0gMSAtIDMpO1xyXG4gICAgZm9yKHZhciBpID0gbGlrZWx5QXJndW1lbnRDb3VudCAtIDE7IGkgPj0gbWluOyAtLWkpIHtcclxuICAgICAgICByZXQucHVzaChpKTtcclxuICAgIH1cclxuICAgIGZvcih2YXIgaSA9IGxpa2VseUFyZ3VtZW50Q291bnQgKyAxOyBpIDw9IDM7ICsraSkge1xyXG4gICAgICAgIHJldC5wdXNoKGkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJldDtcclxufTtcclxuXHJcbnZhciBhcmd1bWVudFNlcXVlbmNlID0gZnVuY3Rpb24oYXJndW1lbnRDb3VudCkge1xyXG4gICAgcmV0dXJuIHV0aWwuZmlsbGVkUmFuZ2UoYXJndW1lbnRDb3VudCwgXCJfYXJnXCIsIFwiXCIpO1xyXG59O1xyXG5cclxudmFyIHBhcmFtZXRlckRlY2xhcmF0aW9uID0gZnVuY3Rpb24ocGFyYW1ldGVyQ291bnQpIHtcclxuICAgIHJldHVybiB1dGlsLmZpbGxlZFJhbmdlKFxyXG4gICAgICAgIE1hdGgubWF4KHBhcmFtZXRlckNvdW50LCAzKSwgXCJfYXJnXCIsIFwiXCIpO1xyXG59O1xyXG5cclxudmFyIHBhcmFtZXRlckNvdW50ID0gZnVuY3Rpb24oZm4pIHtcclxuICAgIGlmICh0eXBlb2YgZm4ubGVuZ3RoID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KE1hdGgubWluKGZuLmxlbmd0aCwgMTAyMyArIDEpLCAwKTtcclxuICAgIH1cclxuICAgIHJldHVybiAwO1xyXG59O1xyXG5cclxubWFrZU5vZGVQcm9taXNpZmllZEV2YWwgPVxyXG5mdW5jdGlvbihjYWxsYmFjaywgcmVjZWl2ZXIsIG9yaWdpbmFsTmFtZSwgZm4sIF8sIG11bHRpQXJncykge1xyXG4gICAgdmFyIG5ld1BhcmFtZXRlckNvdW50ID0gTWF0aC5tYXgoMCwgcGFyYW1ldGVyQ291bnQoZm4pIC0gMSk7XHJcbiAgICB2YXIgYXJndW1lbnRPcmRlciA9IHN3aXRjaENhc2VBcmd1bWVudE9yZGVyKG5ld1BhcmFtZXRlckNvdW50KTtcclxuICAgIHZhciBzaG91bGRQcm94eVRoaXMgPSB0eXBlb2YgY2FsbGJhY2sgPT09IFwic3RyaW5nXCIgfHwgcmVjZWl2ZXIgPT09IFRISVM7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2VuZXJhdGVDYWxsRm9yQXJndW1lbnRDb3VudChjb3VudCkge1xyXG4gICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRTZXF1ZW5jZShjb3VudCkuam9pbihcIiwgXCIpO1xyXG4gICAgICAgIHZhciBjb21tYSA9IGNvdW50ID4gMCA/IFwiLCBcIiA6IFwiXCI7XHJcbiAgICAgICAgdmFyIHJldDtcclxuICAgICAgICBpZiAoc2hvdWxkUHJveHlUaGlzKSB7XHJcbiAgICAgICAgICAgIHJldCA9IFwicmV0ID0gY2FsbGJhY2suY2FsbCh0aGlzLCB7e2FyZ3N9fSwgbm9kZWJhY2spOyBicmVhaztcXG5cIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXQgPSByZWNlaXZlciA9PT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICA/IFwicmV0ID0gY2FsbGJhY2soe3thcmdzfX0sIG5vZGViYWNrKTsgYnJlYWs7XFxuXCJcclxuICAgICAgICAgICAgICAgIDogXCJyZXQgPSBjYWxsYmFjay5jYWxsKHJlY2VpdmVyLCB7e2FyZ3N9fSwgbm9kZWJhY2spOyBicmVhaztcXG5cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldC5yZXBsYWNlKFwie3thcmdzfX1cIiwgYXJncykucmVwbGFjZShcIiwgXCIsIGNvbW1hKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZW5lcmF0ZUFyZ3VtZW50U3dpdGNoQ2FzZSgpIHtcclxuICAgICAgICB2YXIgcmV0ID0gXCJcIjtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50T3JkZXIubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgcmV0ICs9IFwiY2FzZSBcIiArIGFyZ3VtZW50T3JkZXJbaV0gK1wiOlwiICtcclxuICAgICAgICAgICAgICAgIGdlbmVyYXRlQ2FsbEZvckFyZ3VtZW50Q291bnQoYXJndW1lbnRPcmRlcltpXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXQgKz0gXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcclxuICAgICAgICBkZWZhdWx0OiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxyXG4gICAgICAgICAgICB2YXIgYXJncyA9IG5ldyBBcnJheShsZW4gKyAxKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXHJcbiAgICAgICAgICAgIHZhciBpID0gMDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxyXG4gICAgICAgICAgICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcclxuICAgICAgICAgICAgYXJnc1tpXSA9IG5vZGViYWNrOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxyXG4gICAgICAgICAgICBbQ29kZUZvckNhbGxdICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXHJcbiAgICAgICAgICAgIGJyZWFrOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcclxuICAgICAgICBcIi5yZXBsYWNlKFwiW0NvZGVGb3JDYWxsXVwiLCAoc2hvdWxkUHJveHlUaGlzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcInJldCA9IGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3MpO1xcblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcInJldCA9IGNhbGxiYWNrLmFwcGx5KHJlY2VpdmVyLCBhcmdzKTtcXG5cIikpO1xyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGdldEZ1bmN0aW9uQ29kZSA9IHR5cGVvZiBjYWxsYmFjayA9PT0gXCJzdHJpbmdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gKFwidGhpcyAhPSBudWxsID8gdGhpc1snXCIrY2FsbGJhY2srXCInXSA6IGZuXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcImZuXCI7XHJcbiAgICB2YXIgYm9keSA9IFwiJ3VzZSBzdHJpY3QnOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXHJcbiAgICAgICAgdmFyIHJldCA9IGZ1bmN0aW9uIChQYXJhbWV0ZXJzKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcclxuICAgICAgICAgICAgJ3VzZSBzdHJpY3QnOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxyXG4gICAgICAgICAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXHJcbiAgICAgICAgICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoSU5URVJOQUwpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcclxuICAgICAgICAgICAgcHJvbWlzZS5fY2FwdHVyZVN0YWNrVHJhY2UoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxyXG4gICAgICAgICAgICB2YXIgbm9kZWJhY2sgPSBub2RlYmFja0ZvclByb21pc2UocHJvbWlzZSwgXCIgKyBtdWx0aUFyZ3MgKyBcIik7ICAgXFxuXFxcclxuICAgICAgICAgICAgdmFyIHJldDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxyXG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSB0cnlDYXRjaChbR2V0RnVuY3Rpb25Db2RlXSk7ICAgICAgICAgICAgICAgICAgICAgIFxcblxcXHJcbiAgICAgICAgICAgIHN3aXRjaChsZW4pIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcclxuICAgICAgICAgICAgICAgIFtDb2RlRm9yU3dpdGNoQ2FzZV0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXHJcbiAgICAgICAgICAgIGlmIChyZXQgPT09IGVycm9yT2JqKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuXFxcclxuICAgICAgICAgICAgICAgIHByb21pc2UuX3JlamVjdENhbGxiYWNrKG1heWJlV3JhcEFzRXJyb3IocmV0LmUpLCB0cnVlLCB0cnVlKTtcXG5cXFxyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXHJcbiAgICAgICAgICAgIGlmICghcHJvbWlzZS5faXNGYXRlU2VhbGVkKCkpIHByb21pc2UuX3NldEFzeW5jR3VhcmFudGVlZCgpOyAgICAgXFxuXFxcclxuICAgICAgICAgICAgcmV0dXJuIHByb21pc2U7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxyXG4gICAgICAgIH07ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxcblxcXHJcbiAgICAgICAgbm90RW51bWVyYWJsZVByb3AocmV0LCAnX19pc1Byb21pc2lmaWVkX18nLCB0cnVlKTsgICAgICAgICAgICAgICAgICAgXFxuXFxcclxuICAgICAgICByZXR1cm4gcmV0OyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG5cXFxyXG4gICAgXCIucmVwbGFjZShcIltDb2RlRm9yU3dpdGNoQ2FzZV1cIiwgZ2VuZXJhdGVBcmd1bWVudFN3aXRjaENhc2UoKSlcclxuICAgICAgICAucmVwbGFjZShcIltHZXRGdW5jdGlvbkNvZGVdXCIsIGdldEZ1bmN0aW9uQ29kZSk7XHJcbiAgICBib2R5ID0gYm9keS5yZXBsYWNlKFwiUGFyYW1ldGVyc1wiLCBwYXJhbWV0ZXJEZWNsYXJhdGlvbihuZXdQYXJhbWV0ZXJDb3VudCkpO1xyXG4gICAgcmV0dXJuIG5ldyBGdW5jdGlvbihcIlByb21pc2VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInJlY2VpdmVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid2l0aEFwcGVuZGVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibWF5YmVXcmFwQXNFcnJvclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5vZGViYWNrRm9yUHJvbWlzZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRyeUNhdGNoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZXJyb3JPYmpcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJub3RFbnVtZXJhYmxlUHJvcFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIklOVEVSTkFMXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkpKFxyXG4gICAgICAgICAgICAgICAgICAgIFByb21pc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZm4sXHJcbiAgICAgICAgICAgICAgICAgICAgcmVjZWl2ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2l0aEFwcGVuZGVkLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heWJlV3JhcEFzRXJyb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZWJhY2tGb3JQcm9taXNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHV0aWwudHJ5Q2F0Y2gsXHJcbiAgICAgICAgICAgICAgICAgICAgdXRpbC5lcnJvck9iaixcclxuICAgICAgICAgICAgICAgICAgICB1dGlsLm5vdEVudW1lcmFibGVQcm9wLFxyXG4gICAgICAgICAgICAgICAgICAgIElOVEVSTkFMKTtcclxufTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWFrZU5vZGVQcm9taXNpZmllZENsb3N1cmUoY2FsbGJhY2ssIHJlY2VpdmVyLCBfLCBmbiwgX18sIG11bHRpQXJncykge1xyXG4gICAgdmFyIGRlZmF1bHRUaGlzID0gKGZ1bmN0aW9uKCkge3JldHVybiB0aGlzO30pKCk7XHJcbiAgICB2YXIgbWV0aG9kID0gY2FsbGJhY2s7XHJcbiAgICBpZiAodHlwZW9mIG1ldGhvZCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIGNhbGxiYWNrID0gZm47XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBwcm9taXNpZmllZCgpIHtcclxuICAgICAgICB2YXIgX3JlY2VpdmVyID0gcmVjZWl2ZXI7XHJcbiAgICAgICAgaWYgKHJlY2VpdmVyID09PSBUSElTKSBfcmVjZWl2ZXIgPSB0aGlzO1xyXG4gICAgICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoSU5URVJOQUwpO1xyXG4gICAgICAgIHByb21pc2UuX2NhcHR1cmVTdGFja1RyYWNlKCk7XHJcbiAgICAgICAgdmFyIGNiID0gdHlwZW9mIG1ldGhvZCA9PT0gXCJzdHJpbmdcIiAmJiB0aGlzICE9PSBkZWZhdWx0VGhpc1xyXG4gICAgICAgICAgICA/IHRoaXNbbWV0aG9kXSA6IGNhbGxiYWNrO1xyXG4gICAgICAgIHZhciBmbiA9IG5vZGViYWNrRm9yUHJvbWlzZShwcm9taXNlLCBtdWx0aUFyZ3MpO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNiLmFwcGx5KF9yZWNlaXZlciwgd2l0aEFwcGVuZGVkKGFyZ3VtZW50cywgZm4pKTtcclxuICAgICAgICB9IGNhdGNoKGUpIHtcclxuICAgICAgICAgICAgcHJvbWlzZS5fcmVqZWN0Q2FsbGJhY2sobWF5YmVXcmFwQXNFcnJvcihlKSwgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghcHJvbWlzZS5faXNGYXRlU2VhbGVkKCkpIHByb21pc2UuX3NldEFzeW5jR3VhcmFudGVlZCgpO1xyXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgfVxyXG4gICAgdXRpbC5ub3RFbnVtZXJhYmxlUHJvcChwcm9taXNpZmllZCwgXCJfX2lzUHJvbWlzaWZpZWRfX1wiLCB0cnVlKTtcclxuICAgIHJldHVybiBwcm9taXNpZmllZDtcclxufVxyXG5cclxudmFyIG1ha2VOb2RlUHJvbWlzaWZpZWQgPSBjYW5FdmFsdWF0ZVxyXG4gICAgPyBtYWtlTm9kZVByb21pc2lmaWVkRXZhbFxyXG4gICAgOiBtYWtlTm9kZVByb21pc2lmaWVkQ2xvc3VyZTtcclxuXHJcbmZ1bmN0aW9uIHByb21pc2lmeUFsbChvYmosIHN1ZmZpeCwgZmlsdGVyLCBwcm9taXNpZmllciwgbXVsdGlBcmdzKSB7XHJcbiAgICB2YXIgc3VmZml4UmVnZXhwID0gbmV3IFJlZ0V4cChlc2NhcGVJZGVudFJlZ2V4KHN1ZmZpeCkgKyBcIiRcIik7XHJcbiAgICB2YXIgbWV0aG9kcyA9XHJcbiAgICAgICAgcHJvbWlzaWZpYWJsZU1ldGhvZHMob2JqLCBzdWZmaXgsIHN1ZmZpeFJlZ2V4cCwgZmlsdGVyKTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gbWV0aG9kcy5sZW5ndGg7IGkgPCBsZW47IGkrPSAyKSB7XHJcbiAgICAgICAgdmFyIGtleSA9IG1ldGhvZHNbaV07XHJcbiAgICAgICAgdmFyIGZuID0gbWV0aG9kc1tpKzFdO1xyXG4gICAgICAgIHZhciBwcm9taXNpZmllZEtleSA9IGtleSArIHN1ZmZpeDtcclxuICAgICAgICBpZiAocHJvbWlzaWZpZXIgPT09IG1ha2VOb2RlUHJvbWlzaWZpZWQpIHtcclxuICAgICAgICAgICAgb2JqW3Byb21pc2lmaWVkS2V5XSA9XHJcbiAgICAgICAgICAgICAgICBtYWtlTm9kZVByb21pc2lmaWVkKGtleSwgVEhJUywga2V5LCBmbiwgc3VmZml4LCBtdWx0aUFyZ3MpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBwcm9taXNpZmllZCA9IHByb21pc2lmaWVyKGZuLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtYWtlTm9kZVByb21pc2lmaWVkKGtleSwgVEhJUywga2V5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4sIHN1ZmZpeCwgbXVsdGlBcmdzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHV0aWwubm90RW51bWVyYWJsZVByb3AocHJvbWlzaWZpZWQsIFwiX19pc1Byb21pc2lmaWVkX19cIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIG9ialtwcm9taXNpZmllZEtleV0gPSBwcm9taXNpZmllZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB1dGlsLnRvRmFzdFByb3BlcnRpZXMob2JqKTtcclxuICAgIHJldHVybiBvYmo7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByb21pc2lmeShjYWxsYmFjaywgcmVjZWl2ZXIsIG11bHRpQXJncykge1xyXG4gICAgcmV0dXJuIG1ha2VOb2RlUHJvbWlzaWZpZWQoY2FsbGJhY2ssIHJlY2VpdmVyLCB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2ssIG51bGwsIG11bHRpQXJncyk7XHJcbn1cclxuXHJcblByb21pc2UucHJvbWlzaWZ5ID0gZnVuY3Rpb24gKGZuLCBvcHRpb25zKSB7XHJcbiAgICBpZiAodHlwZW9mIGZuICE9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiZXhwZWN0aW5nIGEgZnVuY3Rpb24gYnV0IGdvdCBcIiArIHV0aWwuY2xhc3NTdHJpbmcoZm4pKTtcclxuICAgIH1cclxuICAgIGlmIChpc1Byb21pc2lmaWVkKGZuKSkge1xyXG4gICAgICAgIHJldHVybiBmbjtcclxuICAgIH1cclxuICAgIG9wdGlvbnMgPSBPYmplY3Qob3B0aW9ucyk7XHJcbiAgICB2YXIgcmVjZWl2ZXIgPSBvcHRpb25zLmNvbnRleHQgPT09IHVuZGVmaW5lZCA/IFRISVMgOiBvcHRpb25zLmNvbnRleHQ7XHJcbiAgICB2YXIgbXVsdGlBcmdzID0gISFvcHRpb25zLm11bHRpQXJncztcclxuICAgIHZhciByZXQgPSBwcm9taXNpZnkoZm4sIHJlY2VpdmVyLCBtdWx0aUFyZ3MpO1xyXG4gICAgdXRpbC5jb3B5RGVzY3JpcHRvcnMoZm4sIHJldCwgcHJvcHNGaWx0ZXIpO1xyXG4gICAgcmV0dXJuIHJldDtcclxufTtcclxuXHJcblByb21pc2UucHJvbWlzaWZ5QWxsID0gZnVuY3Rpb24gKHRhcmdldCwgb3B0aW9ucykge1xyXG4gICAgaWYgKHR5cGVvZiB0YXJnZXQgIT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgdGFyZ2V0ICE9PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcInRoZSB0YXJnZXQgb2YgcHJvbWlzaWZ5QWxsIG11c3QgYmUgYW4gb2JqZWN0IG9yIGEgZnVuY3Rpb25cXHUwMDBhXFx1MDAwYSAgICBTZWUgaHR0cDovL2dvby5nbC9NcXJGbVhcXHUwMDBhXCIpO1xyXG4gICAgfVxyXG4gICAgb3B0aW9ucyA9IE9iamVjdChvcHRpb25zKTtcclxuICAgIHZhciBtdWx0aUFyZ3MgPSAhIW9wdGlvbnMubXVsdGlBcmdzO1xyXG4gICAgdmFyIHN1ZmZpeCA9IG9wdGlvbnMuc3VmZml4O1xyXG4gICAgaWYgKHR5cGVvZiBzdWZmaXggIT09IFwic3RyaW5nXCIpIHN1ZmZpeCA9IGRlZmF1bHRTdWZmaXg7XHJcbiAgICB2YXIgZmlsdGVyID0gb3B0aW9ucy5maWx0ZXI7XHJcbiAgICBpZiAodHlwZW9mIGZpbHRlciAhPT0gXCJmdW5jdGlvblwiKSBmaWx0ZXIgPSBkZWZhdWx0RmlsdGVyO1xyXG4gICAgdmFyIHByb21pc2lmaWVyID0gb3B0aW9ucy5wcm9taXNpZmllcjtcclxuICAgIGlmICh0eXBlb2YgcHJvbWlzaWZpZXIgIT09IFwiZnVuY3Rpb25cIikgcHJvbWlzaWZpZXIgPSBtYWtlTm9kZVByb21pc2lmaWVkO1xyXG5cclxuICAgIGlmICghdXRpbC5pc0lkZW50aWZpZXIoc3VmZml4KSkge1xyXG4gICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwic3VmZml4IG11c3QgYmUgYSB2YWxpZCBpZGVudGlmaWVyXFx1MDAwYVxcdTAwMGEgICAgU2VlIGh0dHA6Ly9nb28uZ2wvTXFyRm1YXFx1MDAwYVwiKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIga2V5cyA9IHV0aWwuaW5oZXJpdGVkRGF0YUtleXModGFyZ2V0KTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHRhcmdldFtrZXlzW2ldXTtcclxuICAgICAgICBpZiAoa2V5c1tpXSAhPT0gXCJjb25zdHJ1Y3RvclwiICYmXHJcbiAgICAgICAgICAgIHV0aWwuaXNDbGFzcyh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgcHJvbWlzaWZ5QWxsKHZhbHVlLnByb3RvdHlwZSwgc3VmZml4LCBmaWx0ZXIsIHByb21pc2lmaWVyLFxyXG4gICAgICAgICAgICAgICAgbXVsdGlBcmdzKTtcclxuICAgICAgICAgICAgcHJvbWlzaWZ5QWxsKHZhbHVlLCBzdWZmaXgsIGZpbHRlciwgcHJvbWlzaWZpZXIsIG11bHRpQXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBwcm9taXNpZnlBbGwodGFyZ2V0LCBzdWZmaXgsIGZpbHRlciwgcHJvbWlzaWZpZXIsIG11bHRpQXJncyk7XHJcbn07XHJcbn07XHJcblxyXG5cclxufSx7XCIuL2Vycm9yc1wiOjEyLFwiLi9ub2RlYmFja1wiOjIwLFwiLi91dGlsXCI6MzZ9XSwyNTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFxyXG4gICAgUHJvbWlzZSwgUHJvbWlzZUFycmF5LCB0cnlDb252ZXJ0VG9Qcm9taXNlLCBhcGlSZWplY3Rpb24pIHtcclxudmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xyXG52YXIgaXNPYmplY3QgPSB1dGlsLmlzT2JqZWN0O1xyXG52YXIgZXM1ID0gX2RlcmVxXyhcIi4vZXM1XCIpO1xyXG52YXIgRXM2TWFwO1xyXG5pZiAodHlwZW9mIE1hcCA9PT0gXCJmdW5jdGlvblwiKSBFczZNYXAgPSBNYXA7XHJcblxyXG52YXIgbWFwVG9FbnRyaWVzID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGluZGV4ID0gMDtcclxuICAgIHZhciBzaXplID0gMDtcclxuXHJcbiAgICBmdW5jdGlvbiBleHRyYWN0RW50cnkodmFsdWUsIGtleSkge1xyXG4gICAgICAgIHRoaXNbaW5kZXhdID0gdmFsdWU7XHJcbiAgICAgICAgdGhpc1tpbmRleCArIHNpemVdID0ga2V5O1xyXG4gICAgICAgIGluZGV4Kys7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG1hcFRvRW50cmllcyhtYXApIHtcclxuICAgICAgICBzaXplID0gbWFwLnNpemU7XHJcbiAgICAgICAgaW5kZXggPSAwO1xyXG4gICAgICAgIHZhciByZXQgPSBuZXcgQXJyYXkobWFwLnNpemUgKiAyKTtcclxuICAgICAgICBtYXAuZm9yRWFjaChleHRyYWN0RW50cnksIHJldCk7XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH07XHJcbn0pKCk7XHJcblxyXG52YXIgZW50cmllc1RvTWFwID0gZnVuY3Rpb24oZW50cmllcykge1xyXG4gICAgdmFyIHJldCA9IG5ldyBFczZNYXAoKTtcclxuICAgIHZhciBsZW5ndGggPSBlbnRyaWVzLmxlbmd0aCAvIDIgfCAwO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xyXG4gICAgICAgIHZhciBrZXkgPSBlbnRyaWVzW2xlbmd0aCArIGldO1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IGVudHJpZXNbaV07XHJcbiAgICAgICAgcmV0LnNldChrZXksIHZhbHVlKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXQ7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBQcm9wZXJ0aWVzUHJvbWlzZUFycmF5KG9iaikge1xyXG4gICAgdmFyIGlzTWFwID0gZmFsc2U7XHJcbiAgICB2YXIgZW50cmllcztcclxuICAgIGlmIChFczZNYXAgIT09IHVuZGVmaW5lZCAmJiBvYmogaW5zdGFuY2VvZiBFczZNYXApIHtcclxuICAgICAgICBlbnRyaWVzID0gbWFwVG9FbnRyaWVzKG9iaik7XHJcbiAgICAgICAgaXNNYXAgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIga2V5cyA9IGVzNS5rZXlzKG9iaik7XHJcbiAgICAgICAgdmFyIGxlbiA9IGtleXMubGVuZ3RoO1xyXG4gICAgICAgIGVudHJpZXMgPSBuZXcgQXJyYXkobGVuICogMik7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcclxuICAgICAgICAgICAgZW50cmllc1tpXSA9IG9ialtrZXldO1xyXG4gICAgICAgICAgICBlbnRyaWVzW2kgKyBsZW5dID0ga2V5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuY29uc3RydWN0b3IkKGVudHJpZXMpO1xyXG4gICAgdGhpcy5faXNNYXAgPSBpc01hcDtcclxuICAgIHRoaXMuX2luaXQkKHVuZGVmaW5lZCwgaXNNYXAgPyAtNiA6IC0zKTtcclxufVxyXG51dGlsLmluaGVyaXRzKFByb3BlcnRpZXNQcm9taXNlQXJyYXksIFByb21pc2VBcnJheSk7XHJcblxyXG5Qcm9wZXJ0aWVzUHJvbWlzZUFycmF5LnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uICgpIHt9O1xyXG5cclxuUHJvcGVydGllc1Byb21pc2VBcnJheS5wcm90b3R5cGUuX3Byb21pc2VGdWxmaWxsZWQgPSBmdW5jdGlvbiAodmFsdWUsIGluZGV4KSB7XHJcbiAgICB0aGlzLl92YWx1ZXNbaW5kZXhdID0gdmFsdWU7XHJcbiAgICB2YXIgdG90YWxSZXNvbHZlZCA9ICsrdGhpcy5fdG90YWxSZXNvbHZlZDtcclxuICAgIGlmICh0b3RhbFJlc29sdmVkID49IHRoaXMuX2xlbmd0aCkge1xyXG4gICAgICAgIHZhciB2YWw7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzTWFwKSB7XHJcbiAgICAgICAgICAgIHZhbCA9IGVudHJpZXNUb01hcCh0aGlzLl92YWx1ZXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhbCA9IHt9O1xyXG4gICAgICAgICAgICB2YXIga2V5T2Zmc2V0ID0gdGhpcy5sZW5ndGgoKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMubGVuZ3RoKCk7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICAgICAgICAgICAgdmFsW3RoaXMuX3ZhbHVlc1tpICsga2V5T2Zmc2V0XV0gPSB0aGlzLl92YWx1ZXNbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fcmVzb2x2ZSh2YWwpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuUHJvcGVydGllc1Byb21pc2VBcnJheS5wcm90b3R5cGUuc2hvdWxkQ29weVZhbHVlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcblByb3BlcnRpZXNQcm9taXNlQXJyYXkucHJvdG90eXBlLmdldEFjdHVhbExlbmd0aCA9IGZ1bmN0aW9uIChsZW4pIHtcclxuICAgIHJldHVybiBsZW4gPj4gMTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIHByb3BzKHByb21pc2VzKSB7XHJcbiAgICB2YXIgcmV0O1xyXG4gICAgdmFyIGNhc3RWYWx1ZSA9IHRyeUNvbnZlcnRUb1Byb21pc2UocHJvbWlzZXMpO1xyXG5cclxuICAgIGlmICghaXNPYmplY3QoY2FzdFZhbHVlKSkge1xyXG4gICAgICAgIHJldHVybiBhcGlSZWplY3Rpb24oXCJjYW5ub3QgYXdhaXQgcHJvcGVydGllcyBvZiBhIG5vbi1vYmplY3RcXHUwMDBhXFx1MDAwYSAgICBTZWUgaHR0cDovL2dvby5nbC9NcXJGbVhcXHUwMDBhXCIpO1xyXG4gICAgfSBlbHNlIGlmIChjYXN0VmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlKSB7XHJcbiAgICAgICAgcmV0ID0gY2FzdFZhbHVlLl90aGVuKFxyXG4gICAgICAgICAgICBQcm9taXNlLnByb3BzLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXQgPSBuZXcgUHJvcGVydGllc1Byb21pc2VBcnJheShjYXN0VmFsdWUpLnByb21pc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2FzdFZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xyXG4gICAgICAgIHJldC5fcHJvcGFnYXRlRnJvbShjYXN0VmFsdWUsIDIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJldDtcclxufVxyXG5cclxuUHJvbWlzZS5wcm90b3R5cGUucHJvcHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gcHJvcHModGhpcyk7XHJcbn07XHJcblxyXG5Qcm9taXNlLnByb3BzID0gZnVuY3Rpb24gKHByb21pc2VzKSB7XHJcbiAgICByZXR1cm4gcHJvcHMocHJvbWlzZXMpO1xyXG59O1xyXG59O1xyXG5cclxufSx7XCIuL2VzNVwiOjEzLFwiLi91dGlsXCI6MzZ9XSwyNjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5mdW5jdGlvbiBhcnJheU1vdmUoc3JjLCBzcmNJbmRleCwgZHN0LCBkc3RJbmRleCwgbGVuKSB7XHJcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGxlbjsgKytqKSB7XHJcbiAgICAgICAgZHN0W2ogKyBkc3RJbmRleF0gPSBzcmNbaiArIHNyY0luZGV4XTtcclxuICAgICAgICBzcmNbaiArIHNyY0luZGV4XSA9IHZvaWQgMDtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gUXVldWUoY2FwYWNpdHkpIHtcclxuICAgIHRoaXMuX2NhcGFjaXR5ID0gY2FwYWNpdHk7XHJcbiAgICB0aGlzLl9sZW5ndGggPSAwO1xyXG4gICAgdGhpcy5fZnJvbnQgPSAwO1xyXG59XHJcblxyXG5RdWV1ZS5wcm90b3R5cGUuX3dpbGxCZU92ZXJDYXBhY2l0eSA9IGZ1bmN0aW9uIChzaXplKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY2FwYWNpdHkgPCBzaXplO1xyXG59O1xyXG5cclxuUXVldWUucHJvdG90eXBlLl9wdXNoT25lID0gZnVuY3Rpb24gKGFyZykge1xyXG4gICAgdmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoKCk7XHJcbiAgICB0aGlzLl9jaGVja0NhcGFjaXR5KGxlbmd0aCArIDEpO1xyXG4gICAgdmFyIGkgPSAodGhpcy5fZnJvbnQgKyBsZW5ndGgpICYgKHRoaXMuX2NhcGFjaXR5IC0gMSk7XHJcbiAgICB0aGlzW2ldID0gYXJnO1xyXG4gICAgdGhpcy5fbGVuZ3RoID0gbGVuZ3RoICsgMTtcclxufTtcclxuXHJcblF1ZXVlLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGZuLCByZWNlaXZlciwgYXJnKSB7XHJcbiAgICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGgoKSArIDM7XHJcbiAgICBpZiAodGhpcy5fd2lsbEJlT3ZlckNhcGFjaXR5KGxlbmd0aCkpIHtcclxuICAgICAgICB0aGlzLl9wdXNoT25lKGZuKTtcclxuICAgICAgICB0aGlzLl9wdXNoT25lKHJlY2VpdmVyKTtcclxuICAgICAgICB0aGlzLl9wdXNoT25lKGFyZyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdmFyIGogPSB0aGlzLl9mcm9udCArIGxlbmd0aCAtIDM7XHJcbiAgICB0aGlzLl9jaGVja0NhcGFjaXR5KGxlbmd0aCk7XHJcbiAgICB2YXIgd3JhcE1hc2sgPSB0aGlzLl9jYXBhY2l0eSAtIDE7XHJcbiAgICB0aGlzWyhqICsgMCkgJiB3cmFwTWFza10gPSBmbjtcclxuICAgIHRoaXNbKGogKyAxKSAmIHdyYXBNYXNrXSA9IHJlY2VpdmVyO1xyXG4gICAgdGhpc1soaiArIDIpICYgd3JhcE1hc2tdID0gYXJnO1xyXG4gICAgdGhpcy5fbGVuZ3RoID0gbGVuZ3RoO1xyXG59O1xyXG5cclxuUXVldWUucHJvdG90eXBlLnNoaWZ0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZyb250ID0gdGhpcy5fZnJvbnQsXHJcbiAgICAgICAgcmV0ID0gdGhpc1tmcm9udF07XHJcblxyXG4gICAgdGhpc1tmcm9udF0gPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLl9mcm9udCA9IChmcm9udCArIDEpICYgKHRoaXMuX2NhcGFjaXR5IC0gMSk7XHJcbiAgICB0aGlzLl9sZW5ndGgtLTtcclxuICAgIHJldHVybiByZXQ7XHJcbn07XHJcblxyXG5RdWV1ZS5wcm90b3R5cGUubGVuZ3RoID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xlbmd0aDtcclxufTtcclxuXHJcblF1ZXVlLnByb3RvdHlwZS5fY2hlY2tDYXBhY2l0eSA9IGZ1bmN0aW9uIChzaXplKSB7XHJcbiAgICBpZiAodGhpcy5fY2FwYWNpdHkgPCBzaXplKSB7XHJcbiAgICAgICAgdGhpcy5fcmVzaXplVG8odGhpcy5fY2FwYWNpdHkgPDwgMSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5RdWV1ZS5wcm90b3R5cGUuX3Jlc2l6ZVRvID0gZnVuY3Rpb24gKGNhcGFjaXR5KSB7XHJcbiAgICB2YXIgb2xkQ2FwYWNpdHkgPSB0aGlzLl9jYXBhY2l0eTtcclxuICAgIHRoaXMuX2NhcGFjaXR5ID0gY2FwYWNpdHk7XHJcbiAgICB2YXIgZnJvbnQgPSB0aGlzLl9mcm9udDtcclxuICAgIHZhciBsZW5ndGggPSB0aGlzLl9sZW5ndGg7XHJcbiAgICB2YXIgbW92ZUl0ZW1zQ291bnQgPSAoZnJvbnQgKyBsZW5ndGgpICYgKG9sZENhcGFjaXR5IC0gMSk7XHJcbiAgICBhcnJheU1vdmUodGhpcywgMCwgdGhpcywgb2xkQ2FwYWNpdHksIG1vdmVJdGVtc0NvdW50KTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUXVldWU7XHJcblxyXG59LHt9XSwyNzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFxyXG4gICAgUHJvbWlzZSwgSU5URVJOQUwsIHRyeUNvbnZlcnRUb1Byb21pc2UsIGFwaVJlamVjdGlvbikge1xyXG52YXIgdXRpbCA9IF9kZXJlcV8oXCIuL3V0aWxcIik7XHJcblxyXG52YXIgcmFjZUxhdGVyID0gZnVuY3Rpb24gKHByb21pc2UpIHtcclxuICAgIHJldHVybiBwcm9taXNlLnRoZW4oZnVuY3Rpb24oYXJyYXkpIHtcclxuICAgICAgICByZXR1cm4gcmFjZShhcnJheSwgcHJvbWlzZSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIHJhY2UocHJvbWlzZXMsIHBhcmVudCkge1xyXG4gICAgdmFyIG1heWJlUHJvbWlzZSA9IHRyeUNvbnZlcnRUb1Byb21pc2UocHJvbWlzZXMpO1xyXG5cclxuICAgIGlmIChtYXliZVByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSB7XHJcbiAgICAgICAgcmV0dXJuIHJhY2VMYXRlcihtYXliZVByb21pc2UpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBwcm9taXNlcyA9IHV0aWwuYXNBcnJheShwcm9taXNlcyk7XHJcbiAgICAgICAgaWYgKHByb21pc2VzID09PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm4gYXBpUmVqZWN0aW9uKFwiZXhwZWN0aW5nIGFuIGFycmF5IG9yIGFuIGl0ZXJhYmxlIG9iamVjdCBidXQgZ290IFwiICsgdXRpbC5jbGFzc1N0cmluZyhwcm9taXNlcykpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciByZXQgPSBuZXcgUHJvbWlzZShJTlRFUk5BTCk7XHJcbiAgICBpZiAocGFyZW50ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXQuX3Byb3BhZ2F0ZUZyb20ocGFyZW50LCAzKTtcclxuICAgIH1cclxuICAgIHZhciBmdWxmaWxsID0gcmV0Ll9mdWxmaWxsO1xyXG4gICAgdmFyIHJlamVjdCA9IHJldC5fcmVqZWN0O1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHByb21pc2VzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgICAgdmFyIHZhbCA9IHByb21pc2VzW2ldO1xyXG5cclxuICAgICAgICBpZiAodmFsID09PSB1bmRlZmluZWQgJiYgIShpIGluIHByb21pc2VzKSkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFByb21pc2UuY2FzdCh2YWwpLl90aGVuKGZ1bGZpbGwsIHJlamVjdCwgdW5kZWZpbmVkLCByZXQsIG51bGwpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJldDtcclxufVxyXG5cclxuUHJvbWlzZS5yYWNlID0gZnVuY3Rpb24gKHByb21pc2VzKSB7XHJcbiAgICByZXR1cm4gcmFjZShwcm9taXNlcywgdW5kZWZpbmVkKTtcclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLnJhY2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gcmFjZSh0aGlzLCB1bmRlZmluZWQpO1xyXG59O1xyXG5cclxufTtcclxuXHJcbn0se1wiLi91dGlsXCI6MzZ9XSwyODpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFByb21pc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgUHJvbWlzZUFycmF5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFwaVJlamVjdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0cnlDb252ZXJ0VG9Qcm9taXNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIElOVEVSTkFMLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnKSB7XHJcbnZhciBnZXREb21haW4gPSBQcm9taXNlLl9nZXREb21haW47XHJcbnZhciB1dGlsID0gX2RlcmVxXyhcIi4vdXRpbFwiKTtcclxudmFyIHRyeUNhdGNoID0gdXRpbC50cnlDYXRjaDtcclxuXHJcbmZ1bmN0aW9uIFJlZHVjdGlvblByb21pc2VBcnJheShwcm9taXNlcywgZm4sIGluaXRpYWxWYWx1ZSwgX2VhY2gpIHtcclxuICAgIHRoaXMuY29uc3RydWN0b3IkKHByb21pc2VzKTtcclxuICAgIHZhciBkb21haW4gPSBnZXREb21haW4oKTtcclxuICAgIHRoaXMuX2ZuID0gZG9tYWluID09PSBudWxsID8gZm4gOiB1dGlsLmRvbWFpbkJpbmQoZG9tYWluLCBmbik7XHJcbiAgICBpZiAoaW5pdGlhbFZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBpbml0aWFsVmFsdWUgPSBQcm9taXNlLnJlc29sdmUoaW5pdGlhbFZhbHVlKTtcclxuICAgICAgICBpbml0aWFsVmFsdWUuX2F0dGFjaENhbmNlbGxhdGlvbkNhbGxiYWNrKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5faW5pdGlhbFZhbHVlID0gaW5pdGlhbFZhbHVlO1xyXG4gICAgdGhpcy5fY3VycmVudENhbmNlbGxhYmxlID0gbnVsbDtcclxuICAgIGlmKF9lYWNoID09PSBJTlRFUk5BTCkge1xyXG4gICAgICAgIHRoaXMuX2VhY2hWYWx1ZXMgPSBBcnJheSh0aGlzLl9sZW5ndGgpO1xyXG4gICAgfSBlbHNlIGlmIChfZWFjaCA9PT0gMCkge1xyXG4gICAgICAgIHRoaXMuX2VhY2hWYWx1ZXMgPSBudWxsO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9lYWNoVmFsdWVzID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fcHJvbWlzZS5fY2FwdHVyZVN0YWNrVHJhY2UoKTtcclxuICAgIHRoaXMuX2luaXQkKHVuZGVmaW5lZCwgLTUpO1xyXG59XHJcbnV0aWwuaW5oZXJpdHMoUmVkdWN0aW9uUHJvbWlzZUFycmF5LCBQcm9taXNlQXJyYXkpO1xyXG5cclxuUmVkdWN0aW9uUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fZ290QWNjdW0gPSBmdW5jdGlvbihhY2N1bSkge1xyXG4gICAgaWYgKHRoaXMuX2VhY2hWYWx1ZXMgIT09IHVuZGVmaW5lZCAmJiBcclxuICAgICAgICB0aGlzLl9lYWNoVmFsdWVzICE9PSBudWxsICYmIFxyXG4gICAgICAgIGFjY3VtICE9PSBJTlRFUk5BTCkge1xyXG4gICAgICAgIHRoaXMuX2VhY2hWYWx1ZXMucHVzaChhY2N1bSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5SZWR1Y3Rpb25Qcm9taXNlQXJyYXkucHJvdG90eXBlLl9lYWNoQ29tcGxldGUgPSBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgaWYgKHRoaXMuX2VhY2hWYWx1ZXMgIT09IG51bGwpIHtcclxuICAgICAgICB0aGlzLl9lYWNoVmFsdWVzLnB1c2godmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuX2VhY2hWYWx1ZXM7XHJcbn07XHJcblxyXG5SZWR1Y3Rpb25Qcm9taXNlQXJyYXkucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24oKSB7fTtcclxuXHJcblJlZHVjdGlvblByb21pc2VBcnJheS5wcm90b3R5cGUuX3Jlc29sdmVFbXB0eUFycmF5ID0gZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLl9yZXNvbHZlKHRoaXMuX2VhY2hWYWx1ZXMgIT09IHVuZGVmaW5lZCA/IHRoaXMuX2VhY2hWYWx1ZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5faW5pdGlhbFZhbHVlKTtcclxufTtcclxuXHJcblJlZHVjdGlvblByb21pc2VBcnJheS5wcm90b3R5cGUuc2hvdWxkQ29weVZhbHVlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcblJlZHVjdGlvblByb21pc2VBcnJheS5wcm90b3R5cGUuX3Jlc29sdmUgPSBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgdGhpcy5fcHJvbWlzZS5fcmVzb2x2ZUNhbGxiYWNrKHZhbHVlKTtcclxuICAgIHRoaXMuX3ZhbHVlcyA9IG51bGw7XHJcbn07XHJcblxyXG5SZWR1Y3Rpb25Qcm9taXNlQXJyYXkucHJvdG90eXBlLl9yZXN1bHRDYW5jZWxsZWQgPSBmdW5jdGlvbihzZW5kZXIpIHtcclxuICAgIGlmIChzZW5kZXIgPT09IHRoaXMuX2luaXRpYWxWYWx1ZSkgcmV0dXJuIHRoaXMuX2NhbmNlbCgpO1xyXG4gICAgaWYgKHRoaXMuX2lzUmVzb2x2ZWQoKSkgcmV0dXJuO1xyXG4gICAgdGhpcy5fcmVzdWx0Q2FuY2VsbGVkJCgpO1xyXG4gICAgaWYgKHRoaXMuX2N1cnJlbnRDYW5jZWxsYWJsZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcclxuICAgICAgICB0aGlzLl9jdXJyZW50Q2FuY2VsbGFibGUuY2FuY2VsKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5faW5pdGlhbFZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xyXG4gICAgICAgIHRoaXMuX2luaXRpYWxWYWx1ZS5jYW5jZWwoKTtcclxuICAgIH1cclxufTtcclxuXHJcblJlZHVjdGlvblByb21pc2VBcnJheS5wcm90b3R5cGUuX2l0ZXJhdGUgPSBmdW5jdGlvbiAodmFsdWVzKSB7XHJcbiAgICB0aGlzLl92YWx1ZXMgPSB2YWx1ZXM7XHJcbiAgICB2YXIgdmFsdWU7XHJcbiAgICB2YXIgaTtcclxuICAgIHZhciBsZW5ndGggPSB2YWx1ZXMubGVuZ3RoO1xyXG4gICAgaWYgKHRoaXMuX2luaXRpYWxWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdmFsdWUgPSB0aGlzLl9pbml0aWFsVmFsdWU7XHJcbiAgICAgICAgaSA9IDA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhbHVlID0gUHJvbWlzZS5yZXNvbHZlKHZhbHVlc1swXSk7XHJcbiAgICAgICAgaSA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fY3VycmVudENhbmNlbGxhYmxlID0gdmFsdWU7XHJcblxyXG4gICAgaWYgKCF2YWx1ZS5pc1JlamVjdGVkKCkpIHtcclxuICAgICAgICBmb3IgKDsgaSA8IGxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIHZhciBjdHggPSB7XHJcbiAgICAgICAgICAgICAgICBhY2N1bTogbnVsbCxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZXNbaV0sXHJcbiAgICAgICAgICAgICAgICBpbmRleDogaSxcclxuICAgICAgICAgICAgICAgIGxlbmd0aDogbGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgYXJyYXk6IHRoaXNcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5fdGhlbihnb3RBY2N1bSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGN0eCwgdW5kZWZpbmVkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX2VhY2hWYWx1ZXMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHZhbHVlID0gdmFsdWVcclxuICAgICAgICAgICAgLl90aGVuKHRoaXMuX2VhY2hDb21wbGV0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMsIHVuZGVmaW5lZCk7XHJcbiAgICB9XHJcbiAgICB2YWx1ZS5fdGhlbihjb21wbGV0ZWQsIGNvbXBsZXRlZCwgdW5kZWZpbmVkLCB2YWx1ZSwgdGhpcyk7XHJcbn07XHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZS5yZWR1Y2UgPSBmdW5jdGlvbiAoZm4sIGluaXRpYWxWYWx1ZSkge1xyXG4gICAgcmV0dXJuIHJlZHVjZSh0aGlzLCBmbiwgaW5pdGlhbFZhbHVlLCBudWxsKTtcclxufTtcclxuXHJcblByb21pc2UucmVkdWNlID0gZnVuY3Rpb24gKHByb21pc2VzLCBmbiwgaW5pdGlhbFZhbHVlLCBfZWFjaCkge1xyXG4gICAgcmV0dXJuIHJlZHVjZShwcm9taXNlcywgZm4sIGluaXRpYWxWYWx1ZSwgX2VhY2gpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gY29tcGxldGVkKHZhbHVlT3JSZWFzb24sIGFycmF5KSB7XHJcbiAgICBpZiAodGhpcy5pc0Z1bGZpbGxlZCgpKSB7XHJcbiAgICAgICAgYXJyYXkuX3Jlc29sdmUodmFsdWVPclJlYXNvbik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFycmF5Ll9yZWplY3QodmFsdWVPclJlYXNvbik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlZHVjZShwcm9taXNlcywgZm4sIGluaXRpYWxWYWx1ZSwgX2VhY2gpIHtcclxuICAgIGlmICh0eXBlb2YgZm4gIT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIHJldHVybiBhcGlSZWplY3Rpb24oXCJleHBlY3RpbmcgYSBmdW5jdGlvbiBidXQgZ290IFwiICsgdXRpbC5jbGFzc1N0cmluZyhmbikpO1xyXG4gICAgfVxyXG4gICAgdmFyIGFycmF5ID0gbmV3IFJlZHVjdGlvblByb21pc2VBcnJheShwcm9taXNlcywgZm4sIGluaXRpYWxWYWx1ZSwgX2VhY2gpO1xyXG4gICAgcmV0dXJuIGFycmF5LnByb21pc2UoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ290QWNjdW0oYWNjdW0pIHtcclxuICAgIHRoaXMuYWNjdW0gPSBhY2N1bTtcclxuICAgIHRoaXMuYXJyYXkuX2dvdEFjY3VtKGFjY3VtKTtcclxuICAgIHZhciB2YWx1ZSA9IHRyeUNvbnZlcnRUb1Byb21pc2UodGhpcy52YWx1ZSwgdGhpcy5hcnJheS5fcHJvbWlzZSk7XHJcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlKSB7XHJcbiAgICAgICAgdGhpcy5hcnJheS5fY3VycmVudENhbmNlbGxhYmxlID0gdmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlLl90aGVuKGdvdFZhbHVlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGhpcywgdW5kZWZpbmVkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGdvdFZhbHVlLmNhbGwodGhpcywgdmFsdWUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnb3RWYWx1ZSh2YWx1ZSkge1xyXG4gICAgdmFyIGFycmF5ID0gdGhpcy5hcnJheTtcclxuICAgIHZhciBwcm9taXNlID0gYXJyYXkuX3Byb21pc2U7XHJcbiAgICB2YXIgZm4gPSB0cnlDYXRjaChhcnJheS5fZm4pO1xyXG4gICAgcHJvbWlzZS5fcHVzaENvbnRleHQoKTtcclxuICAgIHZhciByZXQ7XHJcbiAgICBpZiAoYXJyYXkuX2VhY2hWYWx1ZXMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldCA9IGZuLmNhbGwocHJvbWlzZS5fYm91bmRWYWx1ZSgpLCB2YWx1ZSwgdGhpcy5pbmRleCwgdGhpcy5sZW5ndGgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXQgPSBmbi5jYWxsKHByb21pc2UuX2JvdW5kVmFsdWUoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY2N1bSwgdmFsdWUsIHRoaXMuaW5kZXgsIHRoaXMubGVuZ3RoKTtcclxuICAgIH1cclxuICAgIGlmIChyZXQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XHJcbiAgICAgICAgYXJyYXkuX2N1cnJlbnRDYW5jZWxsYWJsZSA9IHJldDtcclxuICAgIH1cclxuICAgIHZhciBwcm9taXNlQ3JlYXRlZCA9IHByb21pc2UuX3BvcENvbnRleHQoKTtcclxuICAgIGRlYnVnLmNoZWNrRm9yZ290dGVuUmV0dXJucyhcclxuICAgICAgICByZXQsXHJcbiAgICAgICAgcHJvbWlzZUNyZWF0ZWQsXHJcbiAgICAgICAgYXJyYXkuX2VhY2hWYWx1ZXMgIT09IHVuZGVmaW5lZCA/IFwiUHJvbWlzZS5lYWNoXCIgOiBcIlByb21pc2UucmVkdWNlXCIsXHJcbiAgICAgICAgcHJvbWlzZVxyXG4gICAgKTtcclxuICAgIHJldHVybiByZXQ7XHJcbn1cclxufTtcclxuXHJcbn0se1wiLi91dGlsXCI6MzZ9XSwyOTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG52YXIgdXRpbCA9IF9kZXJlcV8oXCIuL3V0aWxcIik7XHJcbnZhciBzY2hlZHVsZTtcclxudmFyIG5vQXN5bmNTY2hlZHVsZXIgPSBmdW5jdGlvbigpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIk5vIGFzeW5jIHNjaGVkdWxlciBhdmFpbGFibGVcXHUwMDBhXFx1MDAwYSAgICBTZWUgaHR0cDovL2dvby5nbC9NcXJGbVhcXHUwMDBhXCIpO1xyXG59O1xyXG52YXIgTmF0aXZlUHJvbWlzZSA9IHV0aWwuZ2V0TmF0aXZlUHJvbWlzZSgpO1xyXG5pZiAodXRpbC5pc05vZGUgJiYgdHlwZW9mIE11dGF0aW9uT2JzZXJ2ZXIgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIHZhciBHbG9iYWxTZXRJbW1lZGlhdGUgPSBnbG9iYWwuc2V0SW1tZWRpYXRlO1xyXG4gICAgdmFyIFByb2Nlc3NOZXh0VGljayA9IHByb2Nlc3MubmV4dFRpY2s7XHJcbiAgICBzY2hlZHVsZSA9IHV0aWwuaXNSZWNlbnROb2RlXHJcbiAgICAgICAgICAgICAgICA/IGZ1bmN0aW9uKGZuKSB7IEdsb2JhbFNldEltbWVkaWF0ZS5jYWxsKGdsb2JhbCwgZm4pOyB9XHJcbiAgICAgICAgICAgICAgICA6IGZ1bmN0aW9uKGZuKSB7IFByb2Nlc3NOZXh0VGljay5jYWxsKHByb2Nlc3MsIGZuKTsgfTtcclxufSBlbHNlIGlmICh0eXBlb2YgTmF0aXZlUHJvbWlzZSA9PT0gXCJmdW5jdGlvblwiICYmXHJcbiAgICAgICAgICAgdHlwZW9mIE5hdGl2ZVByb21pc2UucmVzb2x2ZSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICB2YXIgbmF0aXZlUHJvbWlzZSA9IE5hdGl2ZVByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgc2NoZWR1bGUgPSBmdW5jdGlvbihmbikge1xyXG4gICAgICAgIG5hdGl2ZVByb21pc2UudGhlbihmbik7XHJcbiAgICB9O1xyXG59IGVsc2UgaWYgKCh0eXBlb2YgTXV0YXRpb25PYnNlcnZlciAhPT0gXCJ1bmRlZmluZWRcIikgJiZcclxuICAgICAgICAgICEodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJlxyXG4gICAgICAgICAgICB3aW5kb3cubmF2aWdhdG9yICYmXHJcbiAgICAgICAgICAgICh3aW5kb3cubmF2aWdhdG9yLnN0YW5kYWxvbmUgfHwgd2luZG93LmNvcmRvdmEpKSkge1xyXG4gICAgc2NoZWR1bGUgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgdmFyIG9wdHMgPSB7YXR0cmlidXRlczogdHJ1ZX07XHJcbiAgICAgICAgdmFyIHRvZ2dsZVNjaGVkdWxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBkaXYyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICB2YXIgbzIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZGl2LmNsYXNzTGlzdC50b2dnbGUoXCJmb29cIik7XHJcbiAgICAgICAgICAgIHRvZ2dsZVNjaGVkdWxlZCA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG8yLm9ic2VydmUoZGl2Miwgb3B0cyk7XHJcblxyXG4gICAgICAgIHZhciBzY2hlZHVsZVRvZ2dsZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAodG9nZ2xlU2NoZWR1bGVkKSByZXR1cm47XHJcbiAgICAgICAgICAgIHRvZ2dsZVNjaGVkdWxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGRpdjIuY2xhc3NMaXN0LnRvZ2dsZShcImZvb1wiKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gc2NoZWR1bGUoZm4pIHtcclxuICAgICAgICAgICAgdmFyIG8gPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIG8uZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgZm4oKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG8ub2JzZXJ2ZShkaXYsIG9wdHMpO1xyXG4gICAgICAgICAgICBzY2hlZHVsZVRvZ2dsZSgpO1xyXG4gICAgICAgIH07XHJcbiAgICB9KSgpO1xyXG59IGVsc2UgaWYgKHR5cGVvZiBzZXRJbW1lZGlhdGUgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIHNjaGVkdWxlID0gZnVuY3Rpb24gKGZuKSB7XHJcbiAgICAgICAgc2V0SW1tZWRpYXRlKGZuKTtcclxuICAgIH07XHJcbn0gZWxzZSBpZiAodHlwZW9mIHNldFRpbWVvdXQgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIHNjaGVkdWxlID0gZnVuY3Rpb24gKGZuKSB7XHJcbiAgICAgICAgc2V0VGltZW91dChmbiwgMCk7XHJcbiAgICB9O1xyXG59IGVsc2Uge1xyXG4gICAgc2NoZWR1bGUgPSBub0FzeW5jU2NoZWR1bGVyO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gc2NoZWR1bGU7XHJcblxyXG59LHtcIi4vdXRpbFwiOjM2fV0sMzA6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPVxyXG4gICAgZnVuY3Rpb24oUHJvbWlzZSwgUHJvbWlzZUFycmF5LCBkZWJ1Zykge1xyXG52YXIgUHJvbWlzZUluc3BlY3Rpb24gPSBQcm9taXNlLlByb21pc2VJbnNwZWN0aW9uO1xyXG52YXIgdXRpbCA9IF9kZXJlcV8oXCIuL3V0aWxcIik7XHJcblxyXG5mdW5jdGlvbiBTZXR0bGVkUHJvbWlzZUFycmF5KHZhbHVlcykge1xyXG4gICAgdGhpcy5jb25zdHJ1Y3RvciQodmFsdWVzKTtcclxufVxyXG51dGlsLmluaGVyaXRzKFNldHRsZWRQcm9taXNlQXJyYXksIFByb21pc2VBcnJheSk7XHJcblxyXG5TZXR0bGVkUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fcHJvbWlzZVJlc29sdmVkID0gZnVuY3Rpb24gKGluZGV4LCBpbnNwZWN0aW9uKSB7XHJcbiAgICB0aGlzLl92YWx1ZXNbaW5kZXhdID0gaW5zcGVjdGlvbjtcclxuICAgIHZhciB0b3RhbFJlc29sdmVkID0gKyt0aGlzLl90b3RhbFJlc29sdmVkO1xyXG4gICAgaWYgKHRvdGFsUmVzb2x2ZWQgPj0gdGhpcy5fbGVuZ3RoKSB7XHJcbiAgICAgICAgdGhpcy5fcmVzb2x2ZSh0aGlzLl92YWx1ZXMpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuU2V0dGxlZFByb21pc2VBcnJheS5wcm90b3R5cGUuX3Byb21pc2VGdWxmaWxsZWQgPSBmdW5jdGlvbiAodmFsdWUsIGluZGV4KSB7XHJcbiAgICB2YXIgcmV0ID0gbmV3IFByb21pc2VJbnNwZWN0aW9uKCk7XHJcbiAgICByZXQuX2JpdEZpZWxkID0gMzM1NTQ0MzI7XHJcbiAgICByZXQuX3NldHRsZWRWYWx1ZUZpZWxkID0gdmFsdWU7XHJcbiAgICByZXR1cm4gdGhpcy5fcHJvbWlzZVJlc29sdmVkKGluZGV4LCByZXQpO1xyXG59O1xyXG5TZXR0bGVkUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fcHJvbWlzZVJlamVjdGVkID0gZnVuY3Rpb24gKHJlYXNvbiwgaW5kZXgpIHtcclxuICAgIHZhciByZXQgPSBuZXcgUHJvbWlzZUluc3BlY3Rpb24oKTtcclxuICAgIHJldC5fYml0RmllbGQgPSAxNjc3NzIxNjtcclxuICAgIHJldC5fc2V0dGxlZFZhbHVlRmllbGQgPSByZWFzb247XHJcbiAgICByZXR1cm4gdGhpcy5fcHJvbWlzZVJlc29sdmVkKGluZGV4LCByZXQpO1xyXG59O1xyXG5cclxuUHJvbWlzZS5zZXR0bGUgPSBmdW5jdGlvbiAocHJvbWlzZXMpIHtcclxuICAgIGRlYnVnLmRlcHJlY2F0ZWQoXCIuc2V0dGxlKClcIiwgXCIucmVmbGVjdCgpXCIpO1xyXG4gICAgcmV0dXJuIG5ldyBTZXR0bGVkUHJvbWlzZUFycmF5KHByb21pc2VzKS5wcm9taXNlKCk7XHJcbn07XHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZS5zZXR0bGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gUHJvbWlzZS5zZXR0bGUodGhpcyk7XHJcbn07XHJcbn07XHJcblxyXG59LHtcIi4vdXRpbFwiOjM2fV0sMzE6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPVxyXG5mdW5jdGlvbihQcm9taXNlLCBQcm9taXNlQXJyYXksIGFwaVJlamVjdGlvbikge1xyXG52YXIgdXRpbCA9IF9kZXJlcV8oXCIuL3V0aWxcIik7XHJcbnZhciBSYW5nZUVycm9yID0gX2RlcmVxXyhcIi4vZXJyb3JzXCIpLlJhbmdlRXJyb3I7XHJcbnZhciBBZ2dyZWdhdGVFcnJvciA9IF9kZXJlcV8oXCIuL2Vycm9yc1wiKS5BZ2dyZWdhdGVFcnJvcjtcclxudmFyIGlzQXJyYXkgPSB1dGlsLmlzQXJyYXk7XHJcbnZhciBDQU5DRUxMQVRJT04gPSB7fTtcclxuXHJcblxyXG5mdW5jdGlvbiBTb21lUHJvbWlzZUFycmF5KHZhbHVlcykge1xyXG4gICAgdGhpcy5jb25zdHJ1Y3RvciQodmFsdWVzKTtcclxuICAgIHRoaXMuX2hvd01hbnkgPSAwO1xyXG4gICAgdGhpcy5fdW53cmFwID0gZmFsc2U7XHJcbiAgICB0aGlzLl9pbml0aWFsaXplZCA9IGZhbHNlO1xyXG59XHJcbnV0aWwuaW5oZXJpdHMoU29tZVByb21pc2VBcnJheSwgUHJvbWlzZUFycmF5KTtcclxuXHJcblNvbWVQcm9taXNlQXJyYXkucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLl9pbml0aWFsaXplZCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLl9ob3dNYW55ID09PSAwKSB7XHJcbiAgICAgICAgdGhpcy5fcmVzb2x2ZShbXSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5faW5pdCQodW5kZWZpbmVkLCAtNSk7XHJcbiAgICB2YXIgaXNBcnJheVJlc29sdmVkID0gaXNBcnJheSh0aGlzLl92YWx1ZXMpO1xyXG4gICAgaWYgKCF0aGlzLl9pc1Jlc29sdmVkKCkgJiZcclxuICAgICAgICBpc0FycmF5UmVzb2x2ZWQgJiZcclxuICAgICAgICB0aGlzLl9ob3dNYW55ID4gdGhpcy5fY2FuUG9zc2libHlGdWxmaWxsKCkpIHtcclxuICAgICAgICB0aGlzLl9yZWplY3QodGhpcy5fZ2V0UmFuZ2VFcnJvcih0aGlzLmxlbmd0aCgpKSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5Tb21lUHJvbWlzZUFycmF5LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5faW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5faW5pdCgpO1xyXG59O1xyXG5cclxuU29tZVByb21pc2VBcnJheS5wcm90b3R5cGUuc2V0VW53cmFwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5fdW53cmFwID0gdHJ1ZTtcclxufTtcclxuXHJcblNvbWVQcm9taXNlQXJyYXkucHJvdG90eXBlLmhvd01hbnkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faG93TWFueTtcclxufTtcclxuXHJcblNvbWVQcm9taXNlQXJyYXkucHJvdG90eXBlLnNldEhvd01hbnkgPSBmdW5jdGlvbiAoY291bnQpIHtcclxuICAgIHRoaXMuX2hvd01hbnkgPSBjb3VudDtcclxufTtcclxuXHJcblNvbWVQcm9taXNlQXJyYXkucHJvdG90eXBlLl9wcm9taXNlRnVsZmlsbGVkID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICB0aGlzLl9hZGRGdWxmaWxsZWQodmFsdWUpO1xyXG4gICAgaWYgKHRoaXMuX2Z1bGZpbGxlZCgpID09PSB0aGlzLmhvd01hbnkoKSkge1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlcy5sZW5ndGggPSB0aGlzLmhvd01hbnkoKTtcclxuICAgICAgICBpZiAodGhpcy5ob3dNYW55KCkgPT09IDEgJiYgdGhpcy5fdW53cmFwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Jlc29sdmUodGhpcy5fdmFsdWVzWzBdKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9yZXNvbHZlKHRoaXMuX3ZhbHVlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG5cclxufTtcclxuU29tZVByb21pc2VBcnJheS5wcm90b3R5cGUuX3Byb21pc2VSZWplY3RlZCA9IGZ1bmN0aW9uIChyZWFzb24pIHtcclxuICAgIHRoaXMuX2FkZFJlamVjdGVkKHJlYXNvbik7XHJcbiAgICByZXR1cm4gdGhpcy5fY2hlY2tPdXRjb21lKCk7XHJcbn07XHJcblxyXG5Tb21lUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fcHJvbWlzZUNhbmNlbGxlZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLl92YWx1ZXMgaW5zdGFuY2VvZiBQcm9taXNlIHx8IHRoaXMuX3ZhbHVlcyA9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhbmNlbCgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fYWRkUmVqZWN0ZWQoQ0FOQ0VMTEFUSU9OKTtcclxuICAgIHJldHVybiB0aGlzLl9jaGVja091dGNvbWUoKTtcclxufTtcclxuXHJcblNvbWVQcm9taXNlQXJyYXkucHJvdG90eXBlLl9jaGVja091dGNvbWUgPSBmdW5jdGlvbigpIHtcclxuICAgIGlmICh0aGlzLmhvd01hbnkoKSA+IHRoaXMuX2NhblBvc3NpYmx5RnVsZmlsbCgpKSB7XHJcbiAgICAgICAgdmFyIGUgPSBuZXcgQWdncmVnYXRlRXJyb3IoKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gdGhpcy5sZW5ndGgoKTsgaSA8IHRoaXMuX3ZhbHVlcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fdmFsdWVzW2ldICE9PSBDQU5DRUxMQVRJT04pIHtcclxuICAgICAgICAgICAgICAgIGUucHVzaCh0aGlzLl92YWx1ZXNbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVqZWN0KGUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhbmNlbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcblNvbWVQcm9taXNlQXJyYXkucHJvdG90eXBlLl9mdWxmaWxsZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdG90YWxSZXNvbHZlZDtcclxufTtcclxuXHJcblNvbWVQcm9taXNlQXJyYXkucHJvdG90eXBlLl9yZWplY3RlZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLl92YWx1ZXMubGVuZ3RoIC0gdGhpcy5sZW5ndGgoKTtcclxufTtcclxuXHJcblNvbWVQcm9taXNlQXJyYXkucHJvdG90eXBlLl9hZGRSZWplY3RlZCA9IGZ1bmN0aW9uIChyZWFzb24pIHtcclxuICAgIHRoaXMuX3ZhbHVlcy5wdXNoKHJlYXNvbik7XHJcbn07XHJcblxyXG5Tb21lUHJvbWlzZUFycmF5LnByb3RvdHlwZS5fYWRkRnVsZmlsbGVkID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICB0aGlzLl92YWx1ZXNbdGhpcy5fdG90YWxSZXNvbHZlZCsrXSA9IHZhbHVlO1xyXG59O1xyXG5cclxuU29tZVByb21pc2VBcnJheS5wcm90b3R5cGUuX2NhblBvc3NpYmx5RnVsZmlsbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLmxlbmd0aCgpIC0gdGhpcy5fcmVqZWN0ZWQoKTtcclxufTtcclxuXHJcblNvbWVQcm9taXNlQXJyYXkucHJvdG90eXBlLl9nZXRSYW5nZUVycm9yID0gZnVuY3Rpb24gKGNvdW50KSB7XHJcbiAgICB2YXIgbWVzc2FnZSA9IFwiSW5wdXQgYXJyYXkgbXVzdCBjb250YWluIGF0IGxlYXN0IFwiICtcclxuICAgICAgICAgICAgdGhpcy5faG93TWFueSArIFwiIGl0ZW1zIGJ1dCBjb250YWlucyBvbmx5IFwiICsgY291bnQgKyBcIiBpdGVtc1wiO1xyXG4gICAgcmV0dXJuIG5ldyBSYW5nZUVycm9yKG1lc3NhZ2UpO1xyXG59O1xyXG5cclxuU29tZVByb21pc2VBcnJheS5wcm90b3R5cGUuX3Jlc29sdmVFbXB0eUFycmF5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5fcmVqZWN0KHRoaXMuX2dldFJhbmdlRXJyb3IoMCkpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gc29tZShwcm9taXNlcywgaG93TWFueSkge1xyXG4gICAgaWYgKChob3dNYW55IHwgMCkgIT09IGhvd01hbnkgfHwgaG93TWFueSA8IDApIHtcclxuICAgICAgICByZXR1cm4gYXBpUmVqZWN0aW9uKFwiZXhwZWN0aW5nIGEgcG9zaXRpdmUgaW50ZWdlclxcdTAwMGFcXHUwMDBhICAgIFNlZSBodHRwOi8vZ29vLmdsL01xckZtWFxcdTAwMGFcIik7XHJcbiAgICB9XHJcbiAgICB2YXIgcmV0ID0gbmV3IFNvbWVQcm9taXNlQXJyYXkocHJvbWlzZXMpO1xyXG4gICAgdmFyIHByb21pc2UgPSByZXQucHJvbWlzZSgpO1xyXG4gICAgcmV0LnNldEhvd01hbnkoaG93TWFueSk7XHJcbiAgICByZXQuaW5pdCgpO1xyXG4gICAgcmV0dXJuIHByb21pc2U7XHJcbn1cclxuXHJcblByb21pc2Uuc29tZSA9IGZ1bmN0aW9uIChwcm9taXNlcywgaG93TWFueSkge1xyXG4gICAgcmV0dXJuIHNvbWUocHJvbWlzZXMsIGhvd01hbnkpO1xyXG59O1xyXG5cclxuUHJvbWlzZS5wcm90b3R5cGUuc29tZSA9IGZ1bmN0aW9uIChob3dNYW55KSB7XHJcbiAgICByZXR1cm4gc29tZSh0aGlzLCBob3dNYW55KTtcclxufTtcclxuXHJcblByb21pc2UuX1NvbWVQcm9taXNlQXJyYXkgPSBTb21lUHJvbWlzZUFycmF5O1xyXG59O1xyXG5cclxufSx7XCIuL2Vycm9yc1wiOjEyLFwiLi91dGlsXCI6MzZ9XSwzMjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFByb21pc2UpIHtcclxuZnVuY3Rpb24gUHJvbWlzZUluc3BlY3Rpb24ocHJvbWlzZSkge1xyXG4gICAgaWYgKHByb21pc2UgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHByb21pc2UgPSBwcm9taXNlLl90YXJnZXQoKTtcclxuICAgICAgICB0aGlzLl9iaXRGaWVsZCA9IHByb21pc2UuX2JpdEZpZWxkO1xyXG4gICAgICAgIHRoaXMuX3NldHRsZWRWYWx1ZUZpZWxkID0gcHJvbWlzZS5faXNGYXRlU2VhbGVkKClcclxuICAgICAgICAgICAgPyBwcm9taXNlLl9zZXR0bGVkVmFsdWUoKSA6IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX2JpdEZpZWxkID0gMDtcclxuICAgICAgICB0aGlzLl9zZXR0bGVkVmFsdWVGaWVsZCA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxufVxyXG5cclxuUHJvbWlzZUluc3BlY3Rpb24ucHJvdG90eXBlLl9zZXR0bGVkVmFsdWUgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLl9zZXR0bGVkVmFsdWVGaWVsZDtcclxufTtcclxuXHJcbnZhciB2YWx1ZSA9IFByb21pc2VJbnNwZWN0aW9uLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy5pc0Z1bGZpbGxlZCgpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImNhbm5vdCBnZXQgZnVsZmlsbG1lbnQgdmFsdWUgb2YgYSBub24tZnVsZmlsbGVkIHByb21pc2VcXHUwMDBhXFx1MDAwYSAgICBTZWUgaHR0cDovL2dvby5nbC9NcXJGbVhcXHUwMDBhXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuX3NldHRsZWRWYWx1ZSgpO1xyXG59O1xyXG5cclxudmFyIHJlYXNvbiA9IFByb21pc2VJbnNwZWN0aW9uLnByb3RvdHlwZS5lcnJvciA9XHJcblByb21pc2VJbnNwZWN0aW9uLnByb3RvdHlwZS5yZWFzb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMuaXNSZWplY3RlZCgpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImNhbm5vdCBnZXQgcmVqZWN0aW9uIHJlYXNvbiBvZiBhIG5vbi1yZWplY3RlZCBwcm9taXNlXFx1MDAwYVxcdTAwMGEgICAgU2VlIGh0dHA6Ly9nb28uZ2wvTXFyRm1YXFx1MDAwYVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9zZXR0bGVkVmFsdWUoKTtcclxufTtcclxuXHJcbnZhciBpc0Z1bGZpbGxlZCA9IFByb21pc2VJbnNwZWN0aW9uLnByb3RvdHlwZS5pc0Z1bGZpbGxlZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuICh0aGlzLl9iaXRGaWVsZCAmIDMzNTU0NDMyKSAhPT0gMDtcclxufTtcclxuXHJcbnZhciBpc1JlamVjdGVkID0gUHJvbWlzZUluc3BlY3Rpb24ucHJvdG90eXBlLmlzUmVqZWN0ZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gKHRoaXMuX2JpdEZpZWxkICYgMTY3NzcyMTYpICE9PSAwO1xyXG59O1xyXG5cclxudmFyIGlzUGVuZGluZyA9IFByb21pc2VJbnNwZWN0aW9uLnByb3RvdHlwZS5pc1BlbmRpbmcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gKHRoaXMuX2JpdEZpZWxkICYgNTAzOTcxODQpID09PSAwO1xyXG59O1xyXG5cclxudmFyIGlzUmVzb2x2ZWQgPSBQcm9taXNlSW5zcGVjdGlvbi5wcm90b3R5cGUuaXNSZXNvbHZlZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiAodGhpcy5fYml0RmllbGQgJiA1MDMzMTY0OCkgIT09IDA7XHJcbn07XHJcblxyXG5Qcm9taXNlSW5zcGVjdGlvbi5wcm90b3R5cGUuaXNDYW5jZWxsZWQgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiAodGhpcy5fYml0RmllbGQgJiA4NDU0MTQ0KSAhPT0gMDtcclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLl9faXNDYW5jZWxsZWQgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiAodGhpcy5fYml0RmllbGQgJiA2NTUzNikgPT09IDY1NTM2O1xyXG59O1xyXG5cclxuUHJvbWlzZS5wcm90b3R5cGUuX2lzQ2FuY2VsbGVkID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdGFyZ2V0KCkuX19pc0NhbmNlbGxlZCgpO1xyXG59O1xyXG5cclxuUHJvbWlzZS5wcm90b3R5cGUuaXNDYW5jZWxsZWQgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiAodGhpcy5fdGFyZ2V0KCkuX2JpdEZpZWxkICYgODQ1NDE0NCkgIT09IDA7XHJcbn07XHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZS5pc1BlbmRpbmcgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiBpc1BlbmRpbmcuY2FsbCh0aGlzLl90YXJnZXQoKSk7XHJcbn07XHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZS5pc1JlamVjdGVkID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gaXNSZWplY3RlZC5jYWxsKHRoaXMuX3RhcmdldCgpKTtcclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLmlzRnVsZmlsbGVkID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gaXNGdWxmaWxsZWQuY2FsbCh0aGlzLl90YXJnZXQoKSk7XHJcbn07XHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZS5pc1Jlc29sdmVkID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gaXNSZXNvbHZlZC5jYWxsKHRoaXMuX3RhcmdldCgpKTtcclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdmFsdWUuY2FsbCh0aGlzLl90YXJnZXQoKSk7XHJcbn07XHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZS5yZWFzb24gPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciB0YXJnZXQgPSB0aGlzLl90YXJnZXQoKTtcclxuICAgIHRhcmdldC5fdW5zZXRSZWplY3Rpb25Jc1VuaGFuZGxlZCgpO1xyXG4gICAgcmV0dXJuIHJlYXNvbi5jYWxsKHRhcmdldCk7XHJcbn07XHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZS5fdmFsdWUgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLl9zZXR0bGVkVmFsdWUoKTtcclxufTtcclxuXHJcblByb21pc2UucHJvdG90eXBlLl9yZWFzb24gPSBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuX3Vuc2V0UmVqZWN0aW9uSXNVbmhhbmRsZWQoKTtcclxuICAgIHJldHVybiB0aGlzLl9zZXR0bGVkVmFsdWUoKTtcclxufTtcclxuXHJcblByb21pc2UuUHJvbWlzZUluc3BlY3Rpb24gPSBQcm9taXNlSW5zcGVjdGlvbjtcclxufTtcclxuXHJcbn0se31dLDMzOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcclxuXCJ1c2Ugc3RyaWN0XCI7XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oUHJvbWlzZSwgSU5URVJOQUwpIHtcclxudmFyIHV0aWwgPSBfZGVyZXFfKFwiLi91dGlsXCIpO1xyXG52YXIgZXJyb3JPYmogPSB1dGlsLmVycm9yT2JqO1xyXG52YXIgaXNPYmplY3QgPSB1dGlsLmlzT2JqZWN0O1xyXG5cclxuZnVuY3Rpb24gdHJ5Q29udmVydFRvUHJvbWlzZShvYmosIGNvbnRleHQpIHtcclxuICAgIGlmIChpc09iamVjdChvYmopKSB7XHJcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIFByb21pc2UpIHJldHVybiBvYmo7XHJcbiAgICAgICAgdmFyIHRoZW4gPSBnZXRUaGVuKG9iaik7XHJcbiAgICAgICAgaWYgKHRoZW4gPT09IGVycm9yT2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0KSBjb250ZXh0Ll9wdXNoQ29udGV4dCgpO1xyXG4gICAgICAgICAgICB2YXIgcmV0ID0gUHJvbWlzZS5yZWplY3QodGhlbi5lKTtcclxuICAgICAgICAgICAgaWYgKGNvbnRleHQpIGNvbnRleHQuX3BvcENvbnRleHQoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJldDtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGVuID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgaWYgKGlzQW55Qmx1ZWJpcmRQcm9taXNlKG9iaikpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXQgPSBuZXcgUHJvbWlzZShJTlRFUk5BTCk7XHJcbiAgICAgICAgICAgICAgICBvYmouX3RoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0Ll9mdWxmaWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIHJldC5fcmVqZWN0LFxyXG4gICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICByZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgbnVsbFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRvVGhlbmFibGUob2JqLCB0aGVuLCBjb250ZXh0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2JqO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkb0dldFRoZW4ob2JqKSB7XHJcbiAgICByZXR1cm4gb2JqLnRoZW47XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFRoZW4ob2JqKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHJldHVybiBkb0dldFRoZW4ob2JqKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBlcnJvck9iai5lID0gZTtcclxuICAgICAgICByZXR1cm4gZXJyb3JPYmo7XHJcbiAgICB9XHJcbn1cclxuXHJcbnZhciBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XHJcbmZ1bmN0aW9uIGlzQW55Qmx1ZWJpcmRQcm9taXNlKG9iaikge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gaGFzUHJvcC5jYWxsKG9iaiwgXCJfcHJvbWlzZTBcIik7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkb1RoZW5hYmxlKHgsIHRoZW4sIGNvbnRleHQpIHtcclxuICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoSU5URVJOQUwpO1xyXG4gICAgdmFyIHJldCA9IHByb21pc2U7XHJcbiAgICBpZiAoY29udGV4dCkgY29udGV4dC5fcHVzaENvbnRleHQoKTtcclxuICAgIHByb21pc2UuX2NhcHR1cmVTdGFja1RyYWNlKCk7XHJcbiAgICBpZiAoY29udGV4dCkgY29udGV4dC5fcG9wQ29udGV4dCgpO1xyXG4gICAgdmFyIHN5bmNocm9ub3VzID0gdHJ1ZTtcclxuICAgIHZhciByZXN1bHQgPSB1dGlsLnRyeUNhdGNoKHRoZW4pLmNhbGwoeCwgcmVzb2x2ZSwgcmVqZWN0KTtcclxuICAgIHN5bmNocm9ub3VzID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKHByb21pc2UgJiYgcmVzdWx0ID09PSBlcnJvck9iaikge1xyXG4gICAgICAgIHByb21pc2UuX3JlamVjdENhbGxiYWNrKHJlc3VsdC5lLCB0cnVlLCB0cnVlKTtcclxuICAgICAgICBwcm9taXNlID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZXNvbHZlKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKCFwcm9taXNlKSByZXR1cm47XHJcbiAgICAgICAgcHJvbWlzZS5fcmVzb2x2ZUNhbGxiYWNrKHZhbHVlKTtcclxuICAgICAgICBwcm9taXNlID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZWplY3QocmVhc29uKSB7XHJcbiAgICAgICAgaWYgKCFwcm9taXNlKSByZXR1cm47XHJcbiAgICAgICAgcHJvbWlzZS5fcmVqZWN0Q2FsbGJhY2socmVhc29uLCBzeW5jaHJvbm91cywgdHJ1ZSk7XHJcbiAgICAgICAgcHJvbWlzZSA9IG51bGw7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0O1xyXG59XHJcblxyXG5yZXR1cm4gdHJ5Q29udmVydFRvUHJvbWlzZTtcclxufTtcclxuXHJcbn0se1wiLi91dGlsXCI6MzZ9XSwzNDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFByb21pc2UsIElOVEVSTkFMLCBkZWJ1Zykge1xyXG52YXIgdXRpbCA9IF9kZXJlcV8oXCIuL3V0aWxcIik7XHJcbnZhciBUaW1lb3V0RXJyb3IgPSBQcm9taXNlLlRpbWVvdXRFcnJvcjtcclxuXHJcbmZ1bmN0aW9uIEhhbmRsZVdyYXBwZXIoaGFuZGxlKSAge1xyXG4gICAgdGhpcy5oYW5kbGUgPSBoYW5kbGU7XHJcbn1cclxuXHJcbkhhbmRsZVdyYXBwZXIucHJvdG90eXBlLl9yZXN1bHRDYW5jZWxsZWQgPSBmdW5jdGlvbigpIHtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLmhhbmRsZSk7XHJcbn07XHJcblxyXG52YXIgYWZ0ZXJWYWx1ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiBkZWxheSgrdGhpcykudGhlblJldHVybih2YWx1ZSk7IH07XHJcbnZhciBkZWxheSA9IFByb21pc2UuZGVsYXkgPSBmdW5jdGlvbiAobXMsIHZhbHVlKSB7XHJcbiAgICB2YXIgcmV0O1xyXG4gICAgdmFyIGhhbmRsZTtcclxuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0ID0gUHJvbWlzZS5yZXNvbHZlKHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgLl90aGVuKGFmdGVyVmFsdWUsIG51bGwsIG51bGwsIG1zLCB1bmRlZmluZWQpO1xyXG4gICAgICAgIGlmIChkZWJ1Zy5jYW5jZWxsYXRpb24oKSAmJiB2YWx1ZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcclxuICAgICAgICAgICAgcmV0Ll9zZXRPbkNhbmNlbCh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXQgPSBuZXcgUHJvbWlzZShJTlRFUk5BTCk7XHJcbiAgICAgICAgaGFuZGxlID0gc2V0VGltZW91dChmdW5jdGlvbigpIHsgcmV0Ll9mdWxmaWxsKCk7IH0sICttcyk7XHJcbiAgICAgICAgaWYgKGRlYnVnLmNhbmNlbGxhdGlvbigpKSB7XHJcbiAgICAgICAgICAgIHJldC5fc2V0T25DYW5jZWwobmV3IEhhbmRsZVdyYXBwZXIoaGFuZGxlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldC5fY2FwdHVyZVN0YWNrVHJhY2UoKTtcclxuICAgIH1cclxuICAgIHJldC5fc2V0QXN5bmNHdWFyYW50ZWVkKCk7XHJcbiAgICByZXR1cm4gcmV0O1xyXG59O1xyXG5cclxuUHJvbWlzZS5wcm90b3R5cGUuZGVsYXkgPSBmdW5jdGlvbiAobXMpIHtcclxuICAgIHJldHVybiBkZWxheShtcywgdGhpcyk7XHJcbn07XHJcblxyXG52YXIgYWZ0ZXJUaW1lb3V0ID0gZnVuY3Rpb24gKHByb21pc2UsIG1lc3NhZ2UsIHBhcmVudCkge1xyXG4gICAgdmFyIGVycjtcclxuICAgIGlmICh0eXBlb2YgbWVzc2FnZSAhPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIGlmIChtZXNzYWdlIGluc3RhbmNlb2YgRXJyb3IpIHtcclxuICAgICAgICAgICAgZXJyID0gbWVzc2FnZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBlcnIgPSBuZXcgVGltZW91dEVycm9yKFwib3BlcmF0aW9uIHRpbWVkIG91dFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGVyciA9IG5ldyBUaW1lb3V0RXJyb3IobWVzc2FnZSk7XHJcbiAgICB9XHJcbiAgICB1dGlsLm1hcmtBc09yaWdpbmF0aW5nRnJvbVJlamVjdGlvbihlcnIpO1xyXG4gICAgcHJvbWlzZS5fYXR0YWNoRXh0cmFUcmFjZShlcnIpO1xyXG4gICAgcHJvbWlzZS5fcmVqZWN0KGVycik7XHJcblxyXG4gICAgaWYgKHBhcmVudCAhPSBudWxsKSB7XHJcbiAgICAgICAgcGFyZW50LmNhbmNlbCgpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZnVuY3Rpb24gc3VjY2Vzc0NsZWFyKHZhbHVlKSB7XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy5oYW5kbGUpO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmYWlsdXJlQ2xlYXIocmVhc29uKSB7XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy5oYW5kbGUpO1xyXG4gICAgdGhyb3cgcmVhc29uO1xyXG59XHJcblxyXG5Qcm9taXNlLnByb3RvdHlwZS50aW1lb3V0ID0gZnVuY3Rpb24gKG1zLCBtZXNzYWdlKSB7XHJcbiAgICBtcyA9ICttcztcclxuICAgIHZhciByZXQsIHBhcmVudDtcclxuXHJcbiAgICB2YXIgaGFuZGxlV3JhcHBlciA9IG5ldyBIYW5kbGVXcmFwcGVyKHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZW91dFRpbWVvdXQoKSB7XHJcbiAgICAgICAgaWYgKHJldC5pc1BlbmRpbmcoKSkge1xyXG4gICAgICAgICAgICBhZnRlclRpbWVvdXQocmV0LCBtZXNzYWdlLCBwYXJlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sIG1zKSk7XHJcblxyXG4gICAgaWYgKGRlYnVnLmNhbmNlbGxhdGlvbigpKSB7XHJcbiAgICAgICAgcGFyZW50ID0gdGhpcy50aGVuKCk7XHJcbiAgICAgICAgcmV0ID0gcGFyZW50Ll90aGVuKHN1Y2Nlc3NDbGVhciwgZmFpbHVyZUNsZWFyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkLCBoYW5kbGVXcmFwcGVyLCB1bmRlZmluZWQpO1xyXG4gICAgICAgIHJldC5fc2V0T25DYW5jZWwoaGFuZGxlV3JhcHBlcik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldCA9IHRoaXMuX3RoZW4oc3VjY2Vzc0NsZWFyLCBmYWlsdXJlQ2xlYXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQsIGhhbmRsZVdyYXBwZXIsIHVuZGVmaW5lZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJldDtcclxufTtcclxuXHJcbn07XHJcblxyXG59LHtcIi4vdXRpbFwiOjM2fV0sMzU6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xyXG5cInVzZSBzdHJpY3RcIjtcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoUHJvbWlzZSwgYXBpUmVqZWN0aW9uLCB0cnlDb252ZXJ0VG9Qcm9taXNlLFxyXG4gICAgY3JlYXRlQ29udGV4dCwgSU5URVJOQUwsIGRlYnVnKSB7XHJcbiAgICB2YXIgdXRpbCA9IF9kZXJlcV8oXCIuL3V0aWxcIik7XHJcbiAgICB2YXIgVHlwZUVycm9yID0gX2RlcmVxXyhcIi4vZXJyb3JzXCIpLlR5cGVFcnJvcjtcclxuICAgIHZhciBpbmhlcml0cyA9IF9kZXJlcV8oXCIuL3V0aWxcIikuaW5oZXJpdHM7XHJcbiAgICB2YXIgZXJyb3JPYmogPSB1dGlsLmVycm9yT2JqO1xyXG4gICAgdmFyIHRyeUNhdGNoID0gdXRpbC50cnlDYXRjaDtcclxuICAgIHZhciBOVUxMID0ge307XHJcblxyXG4gICAgZnVuY3Rpb24gdGhyb3dlcihlKSB7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe3Rocm93IGU7fSwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2FzdFByZXNlcnZpbmdEaXNwb3NhYmxlKHRoZW5hYmxlKSB7XHJcbiAgICAgICAgdmFyIG1heWJlUHJvbWlzZSA9IHRyeUNvbnZlcnRUb1Byb21pc2UodGhlbmFibGUpO1xyXG4gICAgICAgIGlmIChtYXliZVByb21pc2UgIT09IHRoZW5hYmxlICYmXHJcbiAgICAgICAgICAgIHR5cGVvZiB0aGVuYWJsZS5faXNEaXNwb3NhYmxlID09PSBcImZ1bmN0aW9uXCIgJiZcclxuICAgICAgICAgICAgdHlwZW9mIHRoZW5hYmxlLl9nZXREaXNwb3NlciA9PT0gXCJmdW5jdGlvblwiICYmXHJcbiAgICAgICAgICAgIHRoZW5hYmxlLl9pc0Rpc3Bvc2FibGUoKSkge1xyXG4gICAgICAgICAgICBtYXliZVByb21pc2UuX3NldERpc3Bvc2FibGUodGhlbmFibGUuX2dldERpc3Bvc2VyKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWF5YmVQcm9taXNlO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZGlzcG9zZShyZXNvdXJjZXMsIGluc3BlY3Rpb24pIHtcclxuICAgICAgICB2YXIgaSA9IDA7XHJcbiAgICAgICAgdmFyIGxlbiA9IHJlc291cmNlcy5sZW5ndGg7XHJcbiAgICAgICAgdmFyIHJldCA9IG5ldyBQcm9taXNlKElOVEVSTkFMKTtcclxuICAgICAgICBmdW5jdGlvbiBpdGVyYXRvcigpIHtcclxuICAgICAgICAgICAgaWYgKGkgPj0gbGVuKSByZXR1cm4gcmV0Ll9mdWxmaWxsKCk7XHJcbiAgICAgICAgICAgIHZhciBtYXliZVByb21pc2UgPSBjYXN0UHJlc2VydmluZ0Rpc3Bvc2FibGUocmVzb3VyY2VzW2krK10pO1xyXG4gICAgICAgICAgICBpZiAobWF5YmVQcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSAmJlxyXG4gICAgICAgICAgICAgICAgbWF5YmVQcm9taXNlLl9pc0Rpc3Bvc2FibGUoKSkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBtYXliZVByb21pc2UgPSB0cnlDb252ZXJ0VG9Qcm9taXNlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXliZVByb21pc2UuX2dldERpc3Bvc2VyKCkudHJ5RGlzcG9zZShpbnNwZWN0aW9uKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VzLnByb21pc2UpO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aHJvd2VyKGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG1heWJlUHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF5YmVQcm9taXNlLl90aGVuKGl0ZXJhdG9yLCB0aHJvd2VyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCwgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaXRlcmF0b3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaXRlcmF0b3IoKTtcclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIERpc3Bvc2VyKGRhdGEsIHByb21pc2UsIGNvbnRleHQpIHtcclxuICAgICAgICB0aGlzLl9kYXRhID0gZGF0YTtcclxuICAgICAgICB0aGlzLl9wcm9taXNlID0gcHJvbWlzZTtcclxuICAgICAgICB0aGlzLl9jb250ZXh0ID0gY29udGV4dDtcclxuICAgIH1cclxuXHJcbiAgICBEaXNwb3Nlci5wcm90b3R5cGUuZGF0YSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcclxuICAgIH07XHJcblxyXG4gICAgRGlzcG9zZXIucHJvdG90eXBlLnByb21pc2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb21pc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIERpc3Bvc2VyLnByb3RvdHlwZS5yZXNvdXJjZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9taXNlKCkuaXNGdWxmaWxsZWQoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9taXNlKCkudmFsdWUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIE5VTEw7XHJcbiAgICB9O1xyXG5cclxuICAgIERpc3Bvc2VyLnByb3RvdHlwZS50cnlEaXNwb3NlID0gZnVuY3Rpb24oaW5zcGVjdGlvbikge1xyXG4gICAgICAgIHZhciByZXNvdXJjZSA9IHRoaXMucmVzb3VyY2UoKTtcclxuICAgICAgICB2YXIgY29udGV4dCA9IHRoaXMuX2NvbnRleHQ7XHJcbiAgICAgICAgaWYgKGNvbnRleHQgIT09IHVuZGVmaW5lZCkgY29udGV4dC5fcHVzaENvbnRleHQoKTtcclxuICAgICAgICB2YXIgcmV0ID0gcmVzb3VyY2UgIT09IE5VTExcclxuICAgICAgICAgICAgPyB0aGlzLmRvRGlzcG9zZShyZXNvdXJjZSwgaW5zcGVjdGlvbikgOiBudWxsO1xyXG4gICAgICAgIGlmIChjb250ZXh0ICE9PSB1bmRlZmluZWQpIGNvbnRleHQuX3BvcENvbnRleHQoKTtcclxuICAgICAgICB0aGlzLl9wcm9taXNlLl91bnNldERpc3Bvc2FibGUoKTtcclxuICAgICAgICB0aGlzLl9kYXRhID0gbnVsbDtcclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfTtcclxuXHJcbiAgICBEaXNwb3Nlci5pc0Rpc3Bvc2VyID0gZnVuY3Rpb24gKGQpIHtcclxuICAgICAgICByZXR1cm4gKGQgIT0gbnVsbCAmJlxyXG4gICAgICAgICAgICAgICAgdHlwZW9mIGQucmVzb3VyY2UgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG4gICAgICAgICAgICAgICAgdHlwZW9mIGQudHJ5RGlzcG9zZSA9PT0gXCJmdW5jdGlvblwiKTtcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gRnVuY3Rpb25EaXNwb3NlcihmbiwgcHJvbWlzZSwgY29udGV4dCkge1xyXG4gICAgICAgIHRoaXMuY29uc3RydWN0b3IkKGZuLCBwcm9taXNlLCBjb250ZXh0KTtcclxuICAgIH1cclxuICAgIGluaGVyaXRzKEZ1bmN0aW9uRGlzcG9zZXIsIERpc3Bvc2VyKTtcclxuXHJcbiAgICBGdW5jdGlvbkRpc3Bvc2VyLnByb3RvdHlwZS5kb0Rpc3Bvc2UgPSBmdW5jdGlvbiAocmVzb3VyY2UsIGluc3BlY3Rpb24pIHtcclxuICAgICAgICB2YXIgZm4gPSB0aGlzLmRhdGEoKTtcclxuICAgICAgICByZXR1cm4gZm4uY2FsbChyZXNvdXJjZSwgcmVzb3VyY2UsIGluc3BlY3Rpb24pO1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBtYXliZVVud3JhcERpc3Bvc2VyKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKERpc3Bvc2VyLmlzRGlzcG9zZXIodmFsdWUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzb3VyY2VzW3RoaXMuaW5kZXhdLl9zZXREaXNwb3NhYmxlKHZhbHVlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIFJlc291cmNlTGlzdChsZW5ndGgpIHtcclxuICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICAgICAgICB0aGlzLnByb21pc2UgPSBudWxsO1xyXG4gICAgICAgIHRoaXNbbGVuZ3RoLTFdID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBSZXNvdXJjZUxpc3QucHJvdG90eXBlLl9yZXN1bHRDYW5jZWxsZWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgbGVuID0gdGhpcy5sZW5ndGg7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICAgICAgICB2YXIgaXRlbSA9IHRoaXNbaV07XHJcbiAgICAgICAgICAgIGlmIChpdGVtIGluc3RhbmNlb2YgUHJvbWlzZSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5jYW5jZWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgUHJvbWlzZS51c2luZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcclxuICAgICAgICBpZiAobGVuIDwgMikgcmV0dXJuIGFwaVJlamVjdGlvbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ5b3UgbXVzdCBwYXNzIGF0IGxlYXN0IDIgYXJndW1lbnRzIHRvIFByb21pc2UudXNpbmdcIik7XHJcbiAgICAgICAgdmFyIGZuID0gYXJndW1lbnRzW2xlbiAtIDFdO1xyXG4gICAgICAgIGlmICh0eXBlb2YgZm4gIT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICByZXR1cm4gYXBpUmVqZWN0aW9uKFwiZXhwZWN0aW5nIGEgZnVuY3Rpb24gYnV0IGdvdCBcIiArIHV0aWwuY2xhc3NTdHJpbmcoZm4pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGlucHV0O1xyXG4gICAgICAgIHZhciBzcHJlYWRBcmdzID0gdHJ1ZTtcclxuICAgICAgICBpZiAobGVuID09PSAyICYmIEFycmF5LmlzQXJyYXkoYXJndW1lbnRzWzBdKSkge1xyXG4gICAgICAgICAgICBpbnB1dCA9IGFyZ3VtZW50c1swXTtcclxuICAgICAgICAgICAgbGVuID0gaW5wdXQubGVuZ3RoO1xyXG4gICAgICAgICAgICBzcHJlYWRBcmdzID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaW5wdXQgPSBhcmd1bWVudHM7XHJcbiAgICAgICAgICAgIGxlbi0tO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcmVzb3VyY2VzID0gbmV3IFJlc291cmNlTGlzdChsZW4pO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgICAgICAgdmFyIHJlc291cmNlID0gaW5wdXRbaV07XHJcbiAgICAgICAgICAgIGlmIChEaXNwb3Nlci5pc0Rpc3Bvc2VyKHJlc291cmNlKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRpc3Bvc2VyID0gcmVzb3VyY2U7XHJcbiAgICAgICAgICAgICAgICByZXNvdXJjZSA9IHJlc291cmNlLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgIHJlc291cmNlLl9zZXREaXNwb3NhYmxlKGRpc3Bvc2VyKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBtYXliZVByb21pc2UgPSB0cnlDb252ZXJ0VG9Qcm9taXNlKHJlc291cmNlKTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXliZVByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2UgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXliZVByb21pc2UuX3RoZW4obWF5YmVVbndyYXBEaXNwb3NlciwgbnVsbCwgbnVsbCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VzOiByZXNvdXJjZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogaVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzb3VyY2VzW2ldID0gcmVzb3VyY2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgcmVmbGVjdGVkUmVzb3VyY2VzID0gbmV3IEFycmF5KHJlc291cmNlcy5sZW5ndGgpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVmbGVjdGVkUmVzb3VyY2VzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIHJlZmxlY3RlZFJlc291cmNlc1tpXSA9IFByb21pc2UucmVzb2x2ZShyZXNvdXJjZXNbaV0pLnJlZmxlY3QoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciByZXN1bHRQcm9taXNlID0gUHJvbWlzZS5hbGwocmVmbGVjdGVkUmVzb3VyY2VzKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihpbnNwZWN0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbnNwZWN0aW9ucy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbnNwZWN0aW9uID0gaW5zcGVjdGlvbnNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluc3BlY3Rpb24uaXNSZWplY3RlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yT2JqLmUgPSBpbnNwZWN0aW9uLmVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlcnJvck9iajtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFpbnNwZWN0aW9uLmlzRnVsZmlsbGVkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0UHJvbWlzZS5jYW5jZWwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpbnNwZWN0aW9uc1tpXSA9IGluc3BlY3Rpb24udmFsdWUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHByb21pc2UuX3B1c2hDb250ZXh0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZm4gPSB0cnlDYXRjaChmbik7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmV0ID0gc3ByZWFkQXJnc1xyXG4gICAgICAgICAgICAgICAgICAgID8gZm4uYXBwbHkodW5kZWZpbmVkLCBpbnNwZWN0aW9ucykgOiBmbihpbnNwZWN0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJvbWlzZUNyZWF0ZWQgPSBwcm9taXNlLl9wb3BDb250ZXh0KCk7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Zy5jaGVja0ZvcmdvdHRlblJldHVybnMoXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0LCBwcm9taXNlQ3JlYXRlZCwgXCJQcm9taXNlLnVzaW5nXCIsIHByb21pc2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZhciBwcm9taXNlID0gcmVzdWx0UHJvbWlzZS5sYXN0bHkoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBpbnNwZWN0aW9uID0gbmV3IFByb21pc2UuUHJvbWlzZUluc3BlY3Rpb24ocmVzdWx0UHJvbWlzZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBkaXNwb3NlKHJlc291cmNlcywgaW5zcGVjdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmVzb3VyY2VzLnByb21pc2UgPSBwcm9taXNlO1xyXG4gICAgICAgIHByb21pc2UuX3NldE9uQ2FuY2VsKHJlc291cmNlcyk7XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIFByb21pc2UucHJvdG90eXBlLl9zZXREaXNwb3NhYmxlID0gZnVuY3Rpb24gKGRpc3Bvc2VyKSB7XHJcbiAgICAgICAgdGhpcy5fYml0RmllbGQgPSB0aGlzLl9iaXRGaWVsZCB8IDEzMTA3MjtcclxuICAgICAgICB0aGlzLl9kaXNwb3NlciA9IGRpc3Bvc2VyO1xyXG4gICAgfTtcclxuXHJcbiAgICBQcm9taXNlLnByb3RvdHlwZS5faXNEaXNwb3NhYmxlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5fYml0RmllbGQgJiAxMzEwNzIpID4gMDtcclxuICAgIH07XHJcblxyXG4gICAgUHJvbWlzZS5wcm90b3R5cGUuX2dldERpc3Bvc2VyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNwb3NlcjtcclxuICAgIH07XHJcblxyXG4gICAgUHJvbWlzZS5wcm90b3R5cGUuX3Vuc2V0RGlzcG9zYWJsZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLl9iaXRGaWVsZCA9IHRoaXMuX2JpdEZpZWxkICYgKH4xMzEwNzIpO1xyXG4gICAgICAgIHRoaXMuX2Rpc3Bvc2VyID0gdW5kZWZpbmVkO1xyXG4gICAgfTtcclxuXHJcbiAgICBQcm9taXNlLnByb3RvdHlwZS5kaXNwb3NlciA9IGZ1bmN0aW9uIChmbikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZm4gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEZ1bmN0aW9uRGlzcG9zZXIoZm4sIHRoaXMsIGNyZWF0ZUNvbnRleHQoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcclxuICAgIH07XHJcblxyXG59O1xyXG5cclxufSx7XCIuL2Vycm9yc1wiOjEyLFwiLi91dGlsXCI6MzZ9XSwzNjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XHJcblwidXNlIHN0cmljdFwiO1xyXG52YXIgZXM1ID0gX2RlcmVxXyhcIi4vZXM1XCIpO1xyXG52YXIgY2FuRXZhbHVhdGUgPSB0eXBlb2YgbmF2aWdhdG9yID09IFwidW5kZWZpbmVkXCI7XHJcblxyXG52YXIgZXJyb3JPYmogPSB7ZToge319O1xyXG52YXIgdHJ5Q2F0Y2hUYXJnZXQ7XHJcbnZhciBnbG9iYWxPYmplY3QgPSB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOlxyXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6XHJcbiAgICB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDpcclxuICAgIHRoaXMgIT09IHVuZGVmaW5lZCA/IHRoaXMgOiBudWxsO1xyXG5cclxuZnVuY3Rpb24gdHJ5Q2F0Y2hlcigpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgdmFyIHRhcmdldCA9IHRyeUNhdGNoVGFyZ2V0O1xyXG4gICAgICAgIHRyeUNhdGNoVGFyZ2V0ID0gbnVsbDtcclxuICAgICAgICByZXR1cm4gdGFyZ2V0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgZXJyb3JPYmouZSA9IGU7XHJcbiAgICAgICAgcmV0dXJuIGVycm9yT2JqO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHRyeUNhdGNoKGZuKSB7XHJcbiAgICB0cnlDYXRjaFRhcmdldCA9IGZuO1xyXG4gICAgcmV0dXJuIHRyeUNhdGNoZXI7XHJcbn1cclxuXHJcbnZhciBpbmhlcml0cyA9IGZ1bmN0aW9uKENoaWxkLCBQYXJlbnQpIHtcclxuICAgIHZhciBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XHJcblxyXG4gICAgZnVuY3Rpb24gVCgpIHtcclxuICAgICAgICB0aGlzLmNvbnN0cnVjdG9yID0gQ2hpbGQ7XHJcbiAgICAgICAgdGhpcy5jb25zdHJ1Y3RvciQgPSBQYXJlbnQ7XHJcbiAgICAgICAgZm9yICh2YXIgcHJvcGVydHlOYW1lIGluIFBhcmVudC5wcm90b3R5cGUpIHtcclxuICAgICAgICAgICAgaWYgKGhhc1Byb3AuY2FsbChQYXJlbnQucHJvdG90eXBlLCBwcm9wZXJ0eU5hbWUpICYmXHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eU5hbWUuY2hhckF0KHByb3BlcnR5TmFtZS5sZW5ndGgtMSkgIT09IFwiJFwiXHJcbiAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzW3Byb3BlcnR5TmFtZSArIFwiJFwiXSA9IFBhcmVudC5wcm90b3R5cGVbcHJvcGVydHlOYW1lXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFQucHJvdG90eXBlID0gUGFyZW50LnByb3RvdHlwZTtcclxuICAgIENoaWxkLnByb3RvdHlwZSA9IG5ldyBUKCk7XHJcbiAgICByZXR1cm4gQ2hpbGQucHJvdG90eXBlO1xyXG59O1xyXG5cclxuXHJcbmZ1bmN0aW9uIGlzUHJpbWl0aXZlKHZhbCkge1xyXG4gICAgcmV0dXJuIHZhbCA9PSBudWxsIHx8IHZhbCA9PT0gdHJ1ZSB8fCB2YWwgPT09IGZhbHNlIHx8XHJcbiAgICAgICAgdHlwZW9mIHZhbCA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgdmFsID09PSBcIm51bWJlclwiO1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcclxuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiB8fFxyXG4gICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZSAhPT0gbnVsbDtcclxufVxyXG5cclxuZnVuY3Rpb24gbWF5YmVXcmFwQXNFcnJvcihtYXliZUVycm9yKSB7XHJcbiAgICBpZiAoIWlzUHJpbWl0aXZlKG1heWJlRXJyb3IpKSByZXR1cm4gbWF5YmVFcnJvcjtcclxuXHJcbiAgICByZXR1cm4gbmV3IEVycm9yKHNhZmVUb1N0cmluZyhtYXliZUVycm9yKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdpdGhBcHBlbmRlZCh0YXJnZXQsIGFwcGVuZGVlKSB7XHJcbiAgICB2YXIgbGVuID0gdGFyZ2V0Lmxlbmd0aDtcclxuICAgIHZhciByZXQgPSBuZXcgQXJyYXkobGVuICsgMSk7XHJcbiAgICB2YXIgaTtcclxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICAgIHJldFtpXSA9IHRhcmdldFtpXTtcclxuICAgIH1cclxuICAgIHJldFtpXSA9IGFwcGVuZGVlO1xyXG4gICAgcmV0dXJuIHJldDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RGF0YVByb3BlcnR5T3JEZWZhdWx0KG9iaiwga2V5LCBkZWZhdWx0VmFsdWUpIHtcclxuICAgIGlmIChlczUuaXNFUzUpIHtcclxuICAgICAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpO1xyXG5cclxuICAgICAgICBpZiAoZGVzYyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkZXNjLmdldCA9PSBudWxsICYmIGRlc2Muc2V0ID09IG51bGxcclxuICAgICAgICAgICAgICAgICAgICA/IGRlc2MudmFsdWVcclxuICAgICAgICAgICAgICAgICAgICA6IGRlZmF1bHRWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB7fS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSA/IG9ialtrZXldIDogdW5kZWZpbmVkO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBub3RFbnVtZXJhYmxlUHJvcChvYmosIG5hbWUsIHZhbHVlKSB7XHJcbiAgICBpZiAoaXNQcmltaXRpdmUob2JqKSkgcmV0dXJuIG9iajtcclxuICAgIHZhciBkZXNjcmlwdG9yID0ge1xyXG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgd3JpdGFibGU6IHRydWVcclxuICAgIH07XHJcbiAgICBlczUuZGVmaW5lUHJvcGVydHkob2JqLCBuYW1lLCBkZXNjcmlwdG9yKTtcclxuICAgIHJldHVybiBvYmo7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRocm93ZXIocikge1xyXG4gICAgdGhyb3cgcjtcclxufVxyXG5cclxudmFyIGluaGVyaXRlZERhdGFLZXlzID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGV4Y2x1ZGVkUHJvdG90eXBlcyA9IFtcclxuICAgICAgICBBcnJheS5wcm90b3R5cGUsXHJcbiAgICAgICAgT2JqZWN0LnByb3RvdHlwZSxcclxuICAgICAgICBGdW5jdGlvbi5wcm90b3R5cGVcclxuICAgIF07XHJcblxyXG4gICAgdmFyIGlzRXhjbHVkZWRQcm90byA9IGZ1bmN0aW9uKHZhbCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXhjbHVkZWRQcm90b3R5cGVzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIGlmIChleGNsdWRlZFByb3RvdHlwZXNbaV0gPT09IHZhbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoZXM1LmlzRVM1KSB7XHJcbiAgICAgICAgdmFyIGdldEtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcztcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgICAgIHZhciByZXQgPSBbXTtcclxuICAgICAgICAgICAgdmFyIHZpc2l0ZWRLZXlzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuICAgICAgICAgICAgd2hpbGUgKG9iaiAhPSBudWxsICYmICFpc0V4Y2x1ZGVkUHJvdG8ob2JqKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGtleXM7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGtleXMgPSBnZXRLZXlzKG9iaik7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2aXNpdGVkS2V5c1trZXldKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICB2aXNpdGVkS2V5c1trZXldID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkZXNjICE9IG51bGwgJiYgZGVzYy5nZXQgPT0gbnVsbCAmJiBkZXNjLnNldCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldC5wdXNoKGtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgb2JqID0gZXM1LmdldFByb3RvdHlwZU9mKG9iaik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJldDtcclxuICAgICAgICB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihvYmopIHtcclxuICAgICAgICAgICAgaWYgKGlzRXhjbHVkZWRQcm90byhvYmopKSByZXR1cm4gW107XHJcbiAgICAgICAgICAgIHZhciByZXQgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIC8qanNoaW50IGZvcmluOmZhbHNlICovXHJcbiAgICAgICAgICAgIGVudW1lcmF0aW9uOiBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGFzUHJvcC5jYWxsKG9iaiwga2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldC5wdXNoKGtleSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXhjbHVkZWRQcm90b3R5cGVzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYXNQcm9wLmNhbGwoZXhjbHVkZWRQcm90b3R5cGVzW2ldLCBrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZSBlbnVtZXJhdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXQucHVzaChrZXkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbn0pKCk7XHJcblxyXG52YXIgdGhpc0Fzc2lnbm1lbnRQYXR0ZXJuID0gL3RoaXNcXHMqXFwuXFxzKlxcUytcXHMqPS87XHJcbmZ1bmN0aW9uIGlzQ2xhc3MoZm4pIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBmbiA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgIHZhciBrZXlzID0gZXM1Lm5hbWVzKGZuLnByb3RvdHlwZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgaGFzTWV0aG9kcyA9IGVzNS5pc0VTNSAmJiBrZXlzLmxlbmd0aCA+IDE7XHJcbiAgICAgICAgICAgIHZhciBoYXNNZXRob2RzT3RoZXJUaGFuQ29uc3RydWN0b3IgPSBrZXlzLmxlbmd0aCA+IDAgJiZcclxuICAgICAgICAgICAgICAgICEoa2V5cy5sZW5ndGggPT09IDEgJiYga2V5c1swXSA9PT0gXCJjb25zdHJ1Y3RvclwiKTtcclxuICAgICAgICAgICAgdmFyIGhhc1RoaXNBc3NpZ25tZW50QW5kU3RhdGljTWV0aG9kcyA9XHJcbiAgICAgICAgICAgICAgICB0aGlzQXNzaWdubWVudFBhdHRlcm4udGVzdChmbiArIFwiXCIpICYmIGVzNS5uYW1lcyhmbikubGVuZ3RoID4gMDtcclxuXHJcbiAgICAgICAgICAgIGlmIChoYXNNZXRob2RzIHx8IGhhc01ldGhvZHNPdGhlclRoYW5Db25zdHJ1Y3RvciB8fFxyXG4gICAgICAgICAgICAgICAgaGFzVGhpc0Fzc2lnbm1lbnRBbmRTdGF0aWNNZXRob2RzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB0b0Zhc3RQcm9wZXJ0aWVzKG9iaikge1xyXG4gICAgLypqc2hpbnQgLVcwMjcsLVcwNTUsLVcwMzEqL1xyXG4gICAgZnVuY3Rpb24gRmFrZUNvbnN0cnVjdG9yKCkge31cclxuICAgIEZha2VDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBvYmo7XHJcbiAgICB2YXIgbCA9IDg7XHJcbiAgICB3aGlsZSAobC0tKSBuZXcgRmFrZUNvbnN0cnVjdG9yKCk7XHJcbiAgICByZXR1cm4gb2JqO1xyXG4gICAgZXZhbChvYmopO1xyXG59XHJcblxyXG52YXIgcmlkZW50ID0gL15bYS16JF9dW2EteiRfMC05XSokL2k7XHJcbmZ1bmN0aW9uIGlzSWRlbnRpZmllcihzdHIpIHtcclxuICAgIHJldHVybiByaWRlbnQudGVzdChzdHIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaWxsZWRSYW5nZShjb3VudCwgcHJlZml4LCBzdWZmaXgpIHtcclxuICAgIHZhciByZXQgPSBuZXcgQXJyYXkoY291bnQpO1xyXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGNvdW50OyArK2kpIHtcclxuICAgICAgICByZXRbaV0gPSBwcmVmaXggKyBpICsgc3VmZml4O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJldDtcclxufVxyXG5cclxuZnVuY3Rpb24gc2FmZVRvU3RyaW5nKG9iaikge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gb2JqICsgXCJcIjtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICByZXR1cm4gXCJbbm8gc3RyaW5nIHJlcHJlc2VudGF0aW9uXVwiO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpc0Vycm9yKG9iaikge1xyXG4gICAgcmV0dXJuIG9iaiAhPT0gbnVsbCAmJlxyXG4gICAgICAgICAgIHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIgJiZcclxuICAgICAgICAgICB0eXBlb2Ygb2JqLm1lc3NhZ2UgPT09IFwic3RyaW5nXCIgJiZcclxuICAgICAgICAgICB0eXBlb2Ygb2JqLm5hbWUgPT09IFwic3RyaW5nXCI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1hcmtBc09yaWdpbmF0aW5nRnJvbVJlamVjdGlvbihlKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIG5vdEVudW1lcmFibGVQcm9wKGUsIFwiaXNPcGVyYXRpb25hbFwiLCB0cnVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoKGlnbm9yZSkge31cclxufVxyXG5cclxuZnVuY3Rpb24gb3JpZ2luYXRlc0Zyb21SZWplY3Rpb24oZSkge1xyXG4gICAgaWYgKGUgPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgcmV0dXJuICgoZSBpbnN0YW5jZW9mIEVycm9yW1wiX19CbHVlYmlyZEVycm9yVHlwZXNfX1wiXS5PcGVyYXRpb25hbEVycm9yKSB8fFxyXG4gICAgICAgIGVbXCJpc09wZXJhdGlvbmFsXCJdID09PSB0cnVlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2FuQXR0YWNoVHJhY2Uob2JqKSB7XHJcbiAgICByZXR1cm4gaXNFcnJvcihvYmopICYmIGVzNS5wcm9wZXJ0eUlzV3JpdGFibGUob2JqLCBcInN0YWNrXCIpO1xyXG59XHJcblxyXG52YXIgZW5zdXJlRXJyb3JPYmplY3QgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAoIShcInN0YWNrXCIgaW4gbmV3IEVycm9yKCkpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChjYW5BdHRhY2hUcmFjZSh2YWx1ZSkpIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgdHJ5IHt0aHJvdyBuZXcgRXJyb3Ioc2FmZVRvU3RyaW5nKHZhbHVlKSk7fVxyXG4gICAgICAgICAgICBjYXRjaChlcnIpIHtyZXR1cm4gZXJyO31cclxuICAgICAgICB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKGNhbkF0dGFjaFRyYWNlKHZhbHVlKSkgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKHNhZmVUb1N0cmluZyh2YWx1ZSkpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn0pKCk7XHJcblxyXG5mdW5jdGlvbiBjbGFzc1N0cmluZyhvYmopIHtcclxuICAgIHJldHVybiB7fS50b1N0cmluZy5jYWxsKG9iaik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvcHlEZXNjcmlwdG9ycyhmcm9tLCB0bywgZmlsdGVyKSB7XHJcbiAgICB2YXIga2V5cyA9IGVzNS5uYW1lcyhmcm9tKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xyXG4gICAgICAgIGlmIChmaWx0ZXIoa2V5KSkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgZXM1LmRlZmluZVByb3BlcnR5KHRvLCBrZXksIGVzNS5nZXREZXNjcmlwdG9yKGZyb20sIGtleSkpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChpZ25vcmUpIHt9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG52YXIgYXNBcnJheSA9IGZ1bmN0aW9uKHYpIHtcclxuICAgIGlmIChlczUuaXNBcnJheSh2KSkge1xyXG4gICAgICAgIHJldHVybiB2O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5pZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBTeW1ib2wuaXRlcmF0b3IpIHtcclxuICAgIHZhciBBcnJheUZyb20gPSB0eXBlb2YgQXJyYXkuZnJvbSA9PT0gXCJmdW5jdGlvblwiID8gZnVuY3Rpb24odikge1xyXG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHYpO1xyXG4gICAgfSA6IGZ1bmN0aW9uKHYpIHtcclxuICAgICAgICB2YXIgcmV0ID0gW107XHJcbiAgICAgICAgdmFyIGl0ID0gdltTeW1ib2wuaXRlcmF0b3JdKCk7XHJcbiAgICAgICAgdmFyIGl0UmVzdWx0O1xyXG4gICAgICAgIHdoaWxlICghKChpdFJlc3VsdCA9IGl0Lm5leHQoKSkuZG9uZSkpIHtcclxuICAgICAgICAgICAgcmV0LnB1c2goaXRSZXN1bHQudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfTtcclxuXHJcbiAgICBhc0FycmF5ID0gZnVuY3Rpb24odikge1xyXG4gICAgICAgIGlmIChlczUuaXNBcnJheSh2KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdjtcclxuICAgICAgICB9IGVsc2UgaWYgKHYgIT0gbnVsbCAmJiB0eXBlb2YgdltTeW1ib2wuaXRlcmF0b3JdID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIEFycmF5RnJvbSh2KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9O1xyXG59XHJcblxyXG52YXIgaXNOb2RlID0gdHlwZW9mIHByb2Nlc3MgIT09IFwidW5kZWZpbmVkXCIgJiZcclxuICAgICAgICBjbGFzc1N0cmluZyhwcm9jZXNzKS50b0xvd2VyQ2FzZSgpID09PSBcIltvYmplY3QgcHJvY2Vzc11cIjtcclxuXHJcbnZhciBoYXNFbnZWYXJpYWJsZXMgPSB0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJlxyXG4gICAgdHlwZW9mIHByb2Nlc3MuZW52ICE9PSBcInVuZGVmaW5lZFwiO1xyXG5cclxuZnVuY3Rpb24gZW52KGtleSkge1xyXG4gICAgcmV0dXJuIGhhc0VudlZhcmlhYmxlcyA/IHByb2Nlc3MuZW52W2tleV0gOiB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldE5hdGl2ZVByb21pc2UoKSB7XHJcbiAgICBpZiAodHlwZW9mIFByb21pc2UgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24oKXt9KTtcclxuICAgICAgICAgICAgaWYgKHt9LnRvU3RyaW5nLmNhbGwocHJvbWlzZSkgPT09IFwiW29iamVjdCBQcm9taXNlXVwiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRvbWFpbkJpbmQoc2VsZiwgY2IpIHtcclxuICAgIHJldHVybiBzZWxmLmJpbmQoY2IpO1xyXG59XHJcblxyXG52YXIgcmV0ID0ge1xyXG4gICAgaXNDbGFzczogaXNDbGFzcyxcclxuICAgIGlzSWRlbnRpZmllcjogaXNJZGVudGlmaWVyLFxyXG4gICAgaW5oZXJpdGVkRGF0YUtleXM6IGluaGVyaXRlZERhdGFLZXlzLFxyXG4gICAgZ2V0RGF0YVByb3BlcnR5T3JEZWZhdWx0OiBnZXREYXRhUHJvcGVydHlPckRlZmF1bHQsXHJcbiAgICB0aHJvd2VyOiB0aHJvd2VyLFxyXG4gICAgaXNBcnJheTogZXM1LmlzQXJyYXksXHJcbiAgICBhc0FycmF5OiBhc0FycmF5LFxyXG4gICAgbm90RW51bWVyYWJsZVByb3A6IG5vdEVudW1lcmFibGVQcm9wLFxyXG4gICAgaXNQcmltaXRpdmU6IGlzUHJpbWl0aXZlLFxyXG4gICAgaXNPYmplY3Q6IGlzT2JqZWN0LFxyXG4gICAgaXNFcnJvcjogaXNFcnJvcixcclxuICAgIGNhbkV2YWx1YXRlOiBjYW5FdmFsdWF0ZSxcclxuICAgIGVycm9yT2JqOiBlcnJvck9iaixcclxuICAgIHRyeUNhdGNoOiB0cnlDYXRjaCxcclxuICAgIGluaGVyaXRzOiBpbmhlcml0cyxcclxuICAgIHdpdGhBcHBlbmRlZDogd2l0aEFwcGVuZGVkLFxyXG4gICAgbWF5YmVXcmFwQXNFcnJvcjogbWF5YmVXcmFwQXNFcnJvcixcclxuICAgIHRvRmFzdFByb3BlcnRpZXM6IHRvRmFzdFByb3BlcnRpZXMsXHJcbiAgICBmaWxsZWRSYW5nZTogZmlsbGVkUmFuZ2UsXHJcbiAgICB0b1N0cmluZzogc2FmZVRvU3RyaW5nLFxyXG4gICAgY2FuQXR0YWNoVHJhY2U6IGNhbkF0dGFjaFRyYWNlLFxyXG4gICAgZW5zdXJlRXJyb3JPYmplY3Q6IGVuc3VyZUVycm9yT2JqZWN0LFxyXG4gICAgb3JpZ2luYXRlc0Zyb21SZWplY3Rpb246IG9yaWdpbmF0ZXNGcm9tUmVqZWN0aW9uLFxyXG4gICAgbWFya0FzT3JpZ2luYXRpbmdGcm9tUmVqZWN0aW9uOiBtYXJrQXNPcmlnaW5hdGluZ0Zyb21SZWplY3Rpb24sXHJcbiAgICBjbGFzc1N0cmluZzogY2xhc3NTdHJpbmcsXHJcbiAgICBjb3B5RGVzY3JpcHRvcnM6IGNvcHlEZXNjcmlwdG9ycyxcclxuICAgIGhhc0RldlRvb2xzOiB0eXBlb2YgY2hyb21lICE9PSBcInVuZGVmaW5lZFwiICYmIGNocm9tZSAmJlxyXG4gICAgICAgICAgICAgICAgIHR5cGVvZiBjaHJvbWUubG9hZFRpbWVzID09PSBcImZ1bmN0aW9uXCIsXHJcbiAgICBpc05vZGU6IGlzTm9kZSxcclxuICAgIGhhc0VudlZhcmlhYmxlczogaGFzRW52VmFyaWFibGVzLFxyXG4gICAgZW52OiBlbnYsXHJcbiAgICBnbG9iYWw6IGdsb2JhbE9iamVjdCxcclxuICAgIGdldE5hdGl2ZVByb21pc2U6IGdldE5hdGl2ZVByb21pc2UsXHJcbiAgICBkb21haW5CaW5kOiBkb21haW5CaW5kXHJcbn07XHJcbnJldC5pc1JlY2VudE5vZGUgPSByZXQuaXNOb2RlICYmIChmdW5jdGlvbigpIHtcclxuICAgIHZhciB2ZXJzaW9uID0gcHJvY2Vzcy52ZXJzaW9ucy5ub2RlLnNwbGl0KFwiLlwiKS5tYXAoTnVtYmVyKTtcclxuICAgIHJldHVybiAodmVyc2lvblswXSA9PT0gMCAmJiB2ZXJzaW9uWzFdID4gMTApIHx8ICh2ZXJzaW9uWzBdID4gMCk7XHJcbn0pKCk7XHJcblxyXG5pZiAocmV0LmlzTm9kZSkgcmV0LnRvRmFzdFByb3BlcnRpZXMocHJvY2Vzcyk7XHJcblxyXG50cnkge3Rocm93IG5ldyBFcnJvcigpOyB9IGNhdGNoIChlKSB7cmV0Lmxhc3RMaW5lRXJyb3IgPSBlO31cclxubW9kdWxlLmV4cG9ydHMgPSByZXQ7XHJcblxyXG59LHtcIi4vZXM1XCI6MTN9XX0se30sWzRdKSg0KVxyXG59KTsgICAgICAgICAgICAgICAgICAgIDtpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93ICE9PSBudWxsKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5QID0gd2luZG93LlByb21pc2U7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiBzZWxmICE9PSBudWxsKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLlAgPSBzZWxmLlByb21pc2U7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XHJcblxyXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcclxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXHJcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcclxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cclxuXHJcbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xyXG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xyXG5cclxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xyXG59XHJcbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcclxufVxyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xyXG4gICAgfVxyXG4gICAgdHJ5IHtcclxuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcclxuICAgICAgICB9XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcclxuICAgIH1cclxufSAoKSlcclxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcclxuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XHJcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXHJcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcclxuICAgIH1cclxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXHJcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcclxuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcclxuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xyXG4gICAgfVxyXG4gICAgdHJ5IHtcclxuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXHJcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcclxuICAgIH0gY2F0Y2goZSl7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XHJcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcclxuICAgICAgICB9IGNhdGNoKGUpe1xyXG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxyXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xyXG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XHJcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXHJcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xyXG4gICAgfVxyXG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxyXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XHJcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xyXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcclxuICAgIH1cclxuICAgIHRyeSB7XHJcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xyXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcclxuICAgIH0gY2F0Y2ggKGUpe1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XHJcbiAgICAgICAgfSBjYXRjaCAoZSl7XHJcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxyXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XHJcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxufVxyXG52YXIgcXVldWUgPSBbXTtcclxudmFyIGRyYWluaW5nID0gZmFsc2U7XHJcbnZhciBjdXJyZW50UXVldWU7XHJcbnZhciBxdWV1ZUluZGV4ID0gLTE7XHJcblxyXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XHJcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xyXG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcclxuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XHJcbiAgICB9XHJcbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XHJcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xyXG4gICAgaWYgKGRyYWluaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XHJcbiAgICBkcmFpbmluZyA9IHRydWU7XHJcblxyXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcclxuICAgIHdoaWxlKGxlbikge1xyXG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xyXG4gICAgICAgIHF1ZXVlID0gW107XHJcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xyXG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcclxuICAgIH1cclxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XHJcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xyXG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xyXG59XHJcblxyXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xyXG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xyXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcclxuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XHJcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcclxuICAgIH1cclxufTtcclxuXHJcbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcclxuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XHJcbiAgICB0aGlzLmZ1biA9IGZ1bjtcclxuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcclxufVxyXG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcclxufTtcclxucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcclxucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcclxucHJvY2Vzcy5lbnYgPSB7fTtcclxucHJvY2Vzcy5hcmd2ID0gW107XHJcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xyXG5wcm9jZXNzLnZlcnNpb25zID0ge307XHJcblxyXG5mdW5jdGlvbiBub29wKCkge31cclxuXHJcbnByb2Nlc3Mub24gPSBub29wO1xyXG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcclxucHJvY2Vzcy5vbmNlID0gbm9vcDtcclxucHJvY2Vzcy5vZmYgPSBub29wO1xyXG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcclxucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xyXG5wcm9jZXNzLmVtaXQgPSBub29wO1xyXG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XHJcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XHJcblxyXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XHJcblxyXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xyXG59O1xyXG5cclxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcclxucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XHJcbn07XHJcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XHJcbiJdfQ==
