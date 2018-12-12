
const request = require('request-promise');

function get(uri, options = {}) {
    let headers = options.headers || {};
    let qs = options.qs || {};
    return request({ uri: uri, headers: headers, qs: qs, json: true });
}

function post(uri, body = {}, options = {}) {
    let headers = options.headers || {};
    let qs = options.qs || {};
    return request({ uri: uri, headers: headers, qs: qs, json: true, method: "POST", body: body });
}

module.exports = {
    get,
    post
}