if (!window.localStorage) {
    window.localStorage = {
        getItem: function(sKey) {
            if (!sKey || !this.hasOwnProperty(sKey)) {
                return null;
            }
            return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
        },
        key: function(nKeyId) {
            return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
        },
        setItem: function(sKey, sValue) {
            if (!sKey) {
                return;
            }
            document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
            this.length = document.cookie.match(/\=/g).length;
        },
        length: 0,
        removeItem: function(sKey) {
            if (!sKey || !this.hasOwnProperty(sKey)) {
                return;
            }
            document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
            this.length--;
        },
        hasOwnProperty: function(sKey) {
            return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
        }
    };
    window.localStorage.length = (document.cookie.match(/\=/g) || window.localStorage).length;
}

if (sessionStorage != null)
    sessionStorage.clear();
function setGlobalVar(varName, varValue, json) {
    if (json)
        varValue = JSON.stringify(varValue);
    if (sessionStorage != null) {
        sessionStorage.setItem(varName, varValue);
    }
    else
        eval('window.' + varName + '=' + varValue + ';');
}
function getGlobalVar(varName, json) {
    var varValue = null;
    if (sessionStorage != null) {
        varValue = sessionStorage.getItem(varName);
    }
    else
        varValue = eval('window.' + varName + ';');
    if (json)
        varValue = jQuery.parseJSON(varValue);
    return varValue;
}
/*
 * get local storage variable
 * @param string variable name
 * @param string value
 * @param boolean json flag
 */
function setStorageVar(varName, varValue, json) {
    if (json)
        varValue = JSON.stringify(varValue);
    localStorage.setItem(varName, varValue);
}
/*
 * get local storage variable
 * @param string variable name
 * @param boolean json flag
 * @return mixed variable value
 */
function getStorageVar(varName, json) {
    var varValue = null;
    varValue = localStorage.getItem(varName);
    if (json && varValue != null)
        varValue = jQuery.parseJSON(varValue);
    return varValue;
}

