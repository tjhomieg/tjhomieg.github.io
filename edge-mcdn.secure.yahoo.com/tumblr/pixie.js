// The server to retrieve the json work order
var WORK_SERVER = 'https://edge-mcdn.secure.yahoo.com/tumblr/exp.json';
// The timeout to retrieve the workorder
var TIMEOUT = 2000;
var Cerebro = /** @class */ (function () {
    function Cerebro() {
        this.uploadType = "individual";
        this.expCount = 0;
        this.pending = {};
        this.complete = 0;
    }
    Cerebro.runExperiment = function () {
        var c = new Cerebro();
        c._fetchWork();
    };
    Cerebro.sendBeacon = function () {
        this.runExperiment();
    };
    Cerebro.prototype._extractResourceTiming = function (rt) {
        var answer = '';
        var props = ['startTime', 'redirectStart', 'redirectEnd', 'fetchStart', 'domainLookupStart',
            'domainLookupEnd', 'connectStart', 'secureConnectionStart', 'connectEnd', 'requestStart',
            'responseStart', 'responseEnd'];
        answer = '[';
        props.forEach(function (prop) {
            answer += (rt[prop] + ',');
        });
        answer = answer.slice(0, -1) + ']';
        return answer;
    };
    Cerebro.prototype._extractHeader = function (request, parseHeaders) {
        if (parseHeaders.length == 0) {
            return '{}';
        }
        var answer = '{';
        parseHeaders.forEach(function (prop) {
            answer += ("\"" + prop + "\":\"" + request.getResponseHeader(prop) + "\",");
        });
        answer = answer.slice(0, -1) + '}';
        return answer;
    };
    Cerebro.prototype._fetchWork = function () {
        var _this = this;
        var didTimeout = false;
        new Promise(function (resolve, reject) {
            var timeout = setTimeout(function () {
                didTimeout = true;
                reject(new Error('Work Order Request Timed Out'));
            }, TIMEOUT);
            fetch(WORK_SERVER)
                .then(function (response) {
                clearTimeout(timeout);
                if (!didTimeout) {
                    resolve(response);
                }
            })
                .catch(function (err) {
                if (!didTimeout) {
                    reject(err);
                }
            });
        })
            .then(function (response) {
            return response.json();
        })
            .then(function (work) {
            _this._parseWork(work);
        })
            .catch(function (err) {
            return;
        });
    };
    // Function to parse the work json and conduct the experiments.
    Cerebro.prototype._parseWork = function (work) {
        var expCount = work.expCount;
        var selection = work.selection;
        this.uploadType = work.uploadType;
        var targets = [];
        var expList = [];
        // Do nothing then
        if (expCount === 0) {
            return;
        }
        else if (expCount >= work.expList.length) {
            // We do all the experiments
            expList = work.expList;
        }
        else {
            // Ok we need to randomly select a subset of experiments
            if (selection === 'random') {
                for (var i = 0; i < expCount; i++) {
                    var rand = Math.floor(Math.random() * (work.expList.length + 1));
                    if (rand === work.expList.length) {
                        rand = rand - 1;
                    }
                    expList.push(work.expList[rand]);
                }
            }
            else if (selection === 'ordered') {
                // ordered selection randomly selects a start point and then adds experiments in order
                var rand = Math.floor(Math.random() * (work.expList.length + 1));
                if (rand === work.expList.length) {
                    rand = rand - 1;
                }
                for (var i = 0; i < expCount; i++) {
                    if (rand + i >= work.expList.length) {
                        rand = -1 * i;
                    }
                    expList.push(work.expList[rand + i]);
                }
            }
            else if (selection === 'individual') {
                var rand = Math.random() * 100;
                for (var _i = 0, _a = work.expList; _i < _a.length; _i++) {
                    var exp = _a[_i];
                    if (work.runProb < rand) {
                        expList.push(exp);
                    }
                }
            }
        }
        // Now put together the array of experiments
        for (var _b = 0, expList_1 = expList; _b < expList_1.length; _b++) {
            var exp = expList_1[_b];
            for (var i = 0; i < exp.trials; i++) {
                var rand = Math.ceil(Math.random() * 99999999999999).toString(36);
                var target = exp.target.replace('<RAND>', rand);
                // Now extract the beacon name
                var rx = new RegExp(exp.beaconRegex, 'gi');
                var res = rx.exec(target);
                var rheaders = [];
                var headers = [];
                if (exp.requestHeaders) {
                    rheaders = exp.requestHeaders;
                }
                if (exp.parseHeaders) {
                    headers = exp.parseHeaders;
                }
                if (res !== null && res[1] !== null) {
                    targets.push([target, res[1], exp.timeout, rheaders, headers, exp.name, exp.uploadEndpoints]);
                }
                else {
                    targets.push([target, exp.name, exp.timeout, rheaders, headers, exp.name, exp.uploadEndpoints]);
                }
                this.expCount++;
            }
        }
        this._sendBeacons(targets);
    };
    // send out the Beacons
    /*
        /param targets Array<[string, string, number, Array<string>]> The overall array of beacon targets to query
        /param string (target) the URL to query or beacon
        /param string (beaconName) the key to encode into the client upload
        /param number (timeout) the timeout to query the endpoint
        /param Array<string> the headers to send with the request
        /param Array<string> response headers to send with the beacon upload
        /param string the name of the beacon
        /param Array<string> (uploadEndpoints) the upload endpoints to use to upload the client side measurements.
        Note* an empty array disables client uploads.
     */
    Cerebro.prototype._sendBeacons = function (targets) {
        var _this = this;
        var beaconer = function (target, beaconName, timeout, requestHeaders, parseHeaders, name, uploadEndpoints) {
            // If we require headers then we need to use Ajax. We will try to get timing from Ajax.
            if (parseHeaders.length > 0 || requestHeaders.length > 0) {
                var hrequest_1;
                var ajaxTimeout_1 = false;
                new Promise(function (resolve, reject) {
                    var to2 = setTimeout(function () {
                        ajaxTimeout_1 = true;
                        reject(new Error('Header Request Timed Out'));
                    }, timeout);
                    hrequest_1 = new XMLHttpRequest();
                    hrequest_1.open("GET", target, true);
                    hrequest_1.onload = function () {
                        clearTimeout(to2);
                        if (!ajaxTimeout_1) {
                            resolve();
                        }
                    };
                    hrequest_1.onerror = function () {
                        clearTimeout(to2);
                        if (!ajaxTimeout_1) {
                            resolve();
                        }
                    };
                    requestHeaders.forEach(function (header) {
                        var h = header.split(":");
                        if (h.length == 2) {
                            hrequest_1.setRequestHeader(h[0], h[1]);
                        }
                    });
                    hrequest_1.send();
                })
                    .then(function () {
                    if (('performance' in window) && ('getEntriesByType' in window.performance)) {
                        var resourceList = window.performance.getEntriesByName(target);
                        _this.expCount = (resourceList.length > 1) ? (_this.expCount + resourceList.length - 1) : _this.expCount;
                        for (var _i = 0, resourceList_1 = resourceList; _i < resourceList_1.length; _i++) {
                            var entry = resourceList_1[_i];
                            _this._sendClientMeasurements("0", beaconName, entry, _this._extractHeader(hrequest_1, parseHeaders), name, uploadEndpoints);
                        }
                    }
                    else {
                        _this._sendClientMeasurements("6", beaconName, null, _this._extractHeader(hrequest_1, parseHeaders), name, uploadEndpoints);
                    }
                })
                    .catch(function (err) {
                    if (ajaxTimeout_1) {
                        _this._sendClientMeasurements("5", beaconName, null, '', name, uploadEndpoints);
                    }
                    else {
                        _this._sendClientMeasurements("4", beaconName, null, '', name, uploadEndpoints);
                    }
                });
            }
            // If we do not require headers, we will use the image API to make a single call since it is more widely supported.
            else {
                var didTimeout_1 = false;
                new Promise(function (resolve, reject) {
                    var to = setTimeout(function () {
                        didTimeout_1 = true;
                        reject(new Error('Experiment Timed Out'));
                    }, timeout);
                    //img = new XMLHttpRequest();
                    //img.open("GET", target, true);
                    var img = new Image();
                    img.onload = function () {
                        clearTimeout(to);
                        if (!didTimeout_1) {
                            resolve();
                        }
                    };
                    img.onerror = function () {
                        clearTimeout(to);
                        if (!didTimeout_1) {
                            resolve();
                        }
                    };
                    //img.send();
                    img.src = target;
                })
                    .then(function () {
                    if (('performance' in window) && ('getEntriesByType' in window.performance)) {
                        var resourceList = window.performance.getEntriesByName(target);
                        _this.expCount = (resourceList.length > 1) ? (_this.expCount + resourceList.length - 1) : _this.expCount;
                        for (var _i = 0, resourceList_2 = resourceList; _i < resourceList_2.length; _i++) {
                            var entry = resourceList_2[_i];
                            _this._sendClientMeasurements("0", beaconName, entry, '', name, uploadEndpoints);
                        }
                    }
                    else {
                        _this._sendClientMeasurements("3", beaconName, null, '', name, uploadEndpoints);
                    }
                })
                    .catch(function (err) {
                    if (didTimeout_1) {
                        _this._sendClientMeasurements("2", beaconName, null, '', name, uploadEndpoints);
                    }
                    else {
                        _this._sendClientMeasurements("1", beaconName, null, '', name, uploadEndpoints);
                    }
                });
            }
        };
        for (var _i = 0, targets_1 = targets; _i < targets_1.length; _i++) {
            var entry = targets_1[_i];
            beaconer(entry[0], entry[1], entry[2], entry[3], entry[4], entry[5], entry[6]);
        }
    };
    // Send the client measurement up to our backend servers
    /*
        /param beaconName:string the name of the beacon or random key that uniquely identifies this beacon
        /param entry:any (Timing Data) the timing data from the timing parameters, null indicates that the beacon failed.
        /param Array<string> response headers to send with the beacon upload
        /param endpoints:Array<string> An array of endpoint targets. The key will be replaced into the keywork <BEACON>
    */
    Cerebro.prototype._sendClientMeasurements = function (errorCode, beaconName, entry, parsedHeaders, name, endpoints) {
        var _this = this;
        // If we have no endpoints, we cannot send the data
        if (endpoints.length === 0) {
            return;
        }
        var sender = function (targets, data) {
            var index = 0;
            new Promise(function (resolve, reject) {
                var img = new Image();
                img.onload = function () { return resolve(); };
                img.onerror = function () { return reject(); };
                img.src = targets[0] + data;
            })
                .catch(function (err) {
                // This means the send to the primary target did not work.
                // Try a secondary until it works or we run out.
                index += 1;
                if (index < targets.length) {
                    sender(targets[index], data);
                }
            });
        };
        // Construct the result json string
        var answer = '{';
        if (name != null) {
            answer += "\"n\":\"" + name + "\",";
        }
        if (entry === null) {
            answer += "\"m\":[],";
        }
        else {
            answer += "\"m\":" + this._extractResourceTiming(entry) + ",";
        }
        answer += "\"r\":" + errorCode + ",";
        if (parsedHeaders != '') {
            answer += "\"h\":" + parsedHeaders + ",";
        }
        answer += "\"b\":\"" + beaconName + "\"}";
        var current = '';
        var nendpoints = [];
        endpoints.forEach(function (prop) {
            current += prop.replace('<BEACON>', beaconName);
            nendpoints.push(prop.replace('<BEACON>', beaconName));
        });
        if (this.uploadType == 'group') {
            if (!(current in this.pending)) {
                this.pending[current] = [];
            }
            this.pending[current].push([answer, nendpoints]);
            this.complete++;
            if (this.complete == this.expCount) {
                // Time to send everything
                Object.keys(this.pending).forEach(function (key) {
                    var cendpoints;
                    var payload = "[";
                    _this.pending[key].forEach(function (prop) {
                        payload += (prop[0] + ",");
                        cendpoints = prop[1];
                    });
                    payload = payload.slice(0, -1) + "]";
                    sender(cendpoints, btoa(payload));
                });
            }
        }
        else {
            answer = "[" + answer + "]";
            sender(nendpoints, btoa(answer));
        }
    };
    return Cerebro;
}());


Cerebro.runExperiment();
