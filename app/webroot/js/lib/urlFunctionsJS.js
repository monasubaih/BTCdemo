// routing class
function getLength(thing) {
    var count = 0;
    for (var test in thing) {
        count++;
    }
    return count;
}
//195ml 40 30 JN
//250ml 27  33 
function route(settings) {
    var self = this;

    var defaultSettings = {
        mainUrl: getGlobalVar('HTTP_HOST_PATH'),
        pattern: getGlobalVar('GET_PARAM_PATTERN'),
        currentController: getGlobalVar('currentController'),
        currentAction: getGlobalVar('currentAction')

    };
    if (!settings)
        var settings = {};

    self.mainUrl = (settings.hasOwnProperty('mainUrl')) ? settings.mainUrl : defaultSettings.mainUrl;
    self.pattern = (settings.hasOwnProperty('pattern')) ? settings.pattern : defaultSettings.pattern;
    self.currentController = (settings.hasOwnProperty('currentController')) ? settings.currentController : defaultSettings.currentController;
    self.currentAction = (settings.hasOwnProperty('currentAction')) ? settings.currentAction : defaultSettings.currentAction;


    //functions 
    self.getURL = function (linkArray, mainURL) {
        self.mainUrl = (mainURL != null) ? mainURL : defaultSettings.mainUrl;

        var url = '';
        var controller = linkArray['controller'];
        var action = linkArray['action'];
        var params = '';
        var paramsArr = linkArray['params'];
        if (paramsArr != null) {
            if (getLength(paramsArr) > 0) {
                for (var key in paramsArr) {
                    if (typeof (key) == 'string' && key % 1 != 0)
                        paramsArr[key] = key + self.pattern + paramsArr[key];
                    params += paramsArr[key] + '/';
                }
            }
        }
        for (var key in mapArray) {
            if (String(mapArray[key]['controller']).toLowerCase() == String(
                    linkArray['controller']).toLowerCase()
                    && String(mapArray[key]['action']).toLowerCase() == String(
                    linkArray['action']).toLowerCase()) {
                if (mapArray[key]['format'] != undefined
                        && getLength(paramsArr) > 0) {
                    var matches = preg_match_all("\{[0-9]\}",
                            mapArray[key]['format']);
                    if (Object.prototype.toString.call(matches) === '[object Array]') {
                        // is array (there is a matches)
                        matches.sort();
                        var counter = 0;
                        var valueParam = '';
                        var formatString = mapArray[key]['format'];
                        for (var keyParam in paramsArr) {
                            if (paramsArr[keyParam].indexOf(self.pattern) != -1) {
                                valueParam = paramsArr[keyParam].substr(
                                        paramsArr[keyParam].indexOf(self.pattern) + 1,
                                        paramsArr[keyParam].length
                                        - paramsArr[keyParam].indexOf(self.pattern)
                                        + 1);
                                if (matches[counter] != undefined) {
                                    formatString = formatString.replace(
                                            matches[counter], valueParam);
                                    counter++;

                                }

                            }

                        }
                    }
                }
                url = self.mainUrl
                        + key
                        .replace(
                                self.pattern,
                                ((formatString != undefined && mapArray[key]['format'] != formatString) ? formatString
                                        : params));
            }
        }
        if (url == '') {
            url = self.mainUrl + controller + '/' + action;
            if (params != null)
                url += '/' + params;
        }
        return url;
    }


    self.getURLParam = function (moreParams) {
        var hash = window.location.hash;
        var url = window.location.href.replace(hash, '');
        url = url.replace('#', '');
        var replaceString = String(getURL({
            controller: self.currentController,
            action: self.currentAction
        }, self.pattern));
        replaceString = (replaceString[replaceString.length - 1] != '/') ? replaceString
                + '/'
                : replaceString;
        replaceString = replaceString.replace("/placeholder", "");
        url = (url[url.length - 1] != '/') ? url + '/' : url;
        
        var params = url.replace(new RegExp(replaceString, 'gi'), '');
        var paramsArr = [];
        if(!params){
            //get paramaters from window hash
            if(hash != ''){
                var hashesArr = hash.split("/");
                hashesArr.splice(0, 1);
                hashesArr.splice(0, 1);
                paramsArr = hashesArr;
            }
        }
        else{
            if (params[0] == '/')
                params = params.slice(0, 1);
            if (params[params.length - 1] == '/')
                params = params.slice(0, -1);
            if (params != '')
                paramsArr = params.split("/");
        }
        var keyParam;
        var valueParam;
        var arguments = new Array();
        if (getLength(paramsArr) > 0) {
            for (var i in paramsArr) {
                if (paramsArr[i].indexOf(self.pattern) != -1) {
                    valueParam = paramsArr[i].substr(paramsArr[i].indexOf(self.pattern) + 1,
                            paramsArr[i].length - paramsArr[i].indexOf(self.pattern) + 1);
                    keyParam = paramsArr[i].replace(self.pattern + valueParam, '');
                    arguments[keyParam] = valueParam;
                    valueParam = keyParam = '';
                } else {
                    arguments[i] = paramsArr[i];
                }
            }
        }
        if (moreParams != null) {
            for (var key in moreParams) {
                arguments[key] = moreParams[key];
            }
        }
        return arguments;
    }

    self.redirectTo = function (url, target) {
        var redirectURL = '';
        if (Object.prototype.toString.call(url) === '[object Array]' || Object.prototype.toString.call(url) === '[object Object]') {
            redirectURL = self.getURL(url);
        }
        else
            redirectURL = url;
        if (target) {
            location.target = target;
            if (target != '_blank')
                activeElementAcc(redirectURL);
            window.top.open(redirectURL, target);

        }
        else
            window.top.location.href = redirectURL;

    }


    self.getResponse = function (data) {
        /**/
        return data;
    }
    self.sendRequest = function (ajaxObj, callback) {
        if (!ajaxObj.hasOwnProperty('async') || !ajaxObj.async)
        {
            maskAllBody(true);
        }
        var params = {};
        var data = '';
        if (ajaxObj.url.params != undefined) {
            params = ajaxObj.url.params;
        }
        controller = ajaxObj.url.controller;
        action = ajaxObj.url.action;

        URL = router.getURL({'controller': controller,
            'action': action,
            'params': params
        }, ajaxObj.url.mainURL);
        if (ajaxObj.data != undefined) {
            data = ajaxObj.data;
        }

        ajaxObj.url = URL;
        var xhr = $.ajax({type: ajaxObj.type,
            url: ajaxObj.url,
            async: ((ajaxObj.async != null) ? ajaxObj.async : false),
            cache: ((ajaxObj.cache != null) ? ajaxObj.cache : false),
            contentType: ((ajaxObj.contentType != null) ? ajaxObj.contentType : 'application/json'),
            data: data,
            dataType: ((ajaxObj.dataType != null) ? ajaxObj.dataType : null),
            beforeSend: function () {//notify(_tl('loading')) ;
            },
            success: function (data) {

                dataObj = router.getResponse(data);
                maskAllBody(false);
                if (dataObj) {
                    callback(dataObj);
                }
            },
            error: function () {
                //	unnotify ();
                //notify (['error',_tl('something went wrong, please try again later')]);	
            }
        });

        //requestArray.push(xhr);
    }
}
var router = new route();


function preg_match_all(regex, haystack) {

    var globalRegex = new RegExp(regex, 'g');
    haystack = haystack.replace(/\u00a0/g, ' ');
    var globalMatch = haystack.match(globalRegex);
    matchArray = new Array();

    for (var i in globalMatch) {
        nonGlobalRegex = new RegExp(regex);
        var b = new String(globalMatch[i]);
        b = b.replace(/\u00a0/g, ' ');
        nonGlobalMatch = b.match(nonGlobalRegex);
        matchArray[i] = nonGlobalMatch;
    }
    return matchArray;
}


function redirectTo(url, target) {
    router.redirectTo(url, target);
}
function getURL(linkArray, dm) {
    if (dm == '')
        router.pattern = dm;
    return router.getURL(linkArray);
}

function getURLParam(moreParams) {
    router.getURLParam(moreParams);
}

//move by hash and URL
function _moveAndLoad(redirectURL,hash){
        
        $("#viewPlaceHolder").load(redirectURL, function () {
            var urlOptionsObject = getElementByKey(hash, mainController.mapURLS);
            if(!urlOptionsObject){
                var hashParams = hash.split("/");
                urlOptionsObject = getElementByKey(hashParams[0]+'/'+hashParams[1], mainController.mapURLS);
            }
            if (urlOptionsObject) {
                
                mainController.loadNavigator(urlOptionsObject.controller,urlOptionsObject.action);
                var cssFile = urlOptionsObject.cssFiles.slice();
                var jsFiles = urlOptionsObject.jsFiles.slice();
                var basicJS = mainController.basicJSLoadFiles.slice();                
                mainController.loadCSSFiles(cssFile);
                mainController.loadJSFiles(basicJS);
                mainController.loadJSFiles(jsFiles);
                pageHeadModel.pageTitle(urlOptionsObject['prop']['title']);
                window.top.location.hash = hash;
                //$('#' + getGlobalVar('mainRotationTarget'), window.parent.document).height(urlOptionsObject['prop']['height']['desk']);
                //$(window.parent.document).prop('title', urlOptionsObject['prop']['title']);
            }
                
          });
}

//move from passed URL
function movePassURL(redirectURL){
        maskMainContainer(true,'#mainContentContainer');
        URL = (redirectURL[redirectURL.length - 1]==='/') ?  redirectURL.substring(0, redirectURL.length - 1) : redirectURL;
        var hash = URL.replace(getGlobalVar('HTTP_HOST_PATH'), "");
        if(hash !== window.top.location.hash){
            activeElementAcc(redirectURL);
            _moveAndLoad(redirectURL,hash);
        }
    
}
//move from href element 
function moveTo(e, element) {
    e.preventDefault();
    maskMainContainer(true,'#mainContentContainer');

    if (!element.parent().hasClass('active')) {
        var url = element.attr('href');

        var redirectURL = '';
        if (Object.prototype.toString.call(url) === '[object Array]' || Object.prototype.toString.call(url) === '[object Object]') {
            redirectURL = self.getURL(url);
        }
        else
            redirectURL = url;
        URL = (redirectURL[redirectURL.length - 1]=='/') ?  redirectURL.substring(0, redirectURL.length - 1) : redirectURL;
        var hash = URL.replace(getGlobalVar('HTTP_HOST_PATH'), "");

        if(hash != window.top.location.hash){
            activeElementAcc(redirectURL);
            _moveAndLoad(redirectURL,hash);
        }
        //router.redirectTo(URL, getGlobalVar('mainRotationTarget'));
    }
  
}



setGlobalVar('router', router);
setGlobalVar('mainRotationTarget', '_self');

function getPageIDHash() {
    var regex = new RegExp(/^.*#/);
    var url = regex.exec(window.location.href);
    url = String(url).replace(/#/, '');
    var hash = window.location.hash;
    hash = hash.replace(/^.*#/, '');
    pageID = hash.replace(/^.*\*/, '');
    return pageID;
}
if (!getGlobalVar('pageID')) {
    if (window.location.hash) {
        setGlobalVar('pageID', getPageIDHash());
    } else {
        setGlobalVar('pageID', 1);
        setGlobalVar('firstPage', 1);
    }
}



