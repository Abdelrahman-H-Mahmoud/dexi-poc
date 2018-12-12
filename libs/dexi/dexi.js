const _ = require('lodash');
const request = require('./make-request');
const helpers = require('./helpers');

class DexiError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "DexiError";
    }
}

class Dexi {
    /**
      * a class responsible for communicating with dexi platform
      * @param {Object} config
      * @param {string} config.access_key - the access key ti call the api 
      * @param {string} config.account_id - your account id
      */
    constructor(config) {
        if (!_.isPlainObject(config)) {
            throw new DexiError('config must be a plain object');
        }
        if (_.isNil(config.access_key) || !_.isString(config.access_key)) {
            throw new DexiError('access_key be must be a string');
        }
        if (_.isNil(config.account_id) || !_.isString(config.account_id)) {
            throw new DexiError('account_id be must be a string');
        }
        this.access_key = config.access_key;
        this.account_id = config.account_id;
    }

    get API_URL() {
        return 'https://api.dexi.io/';
    }

    /**
      * this function gets run states for a chosen configuration
      * @param {string} configurationId - the configuration id for a robot or a pipe
      * @param {Object} options
      * @param {number} limit - this is optional
      * @param {number} offset - this is optional
      */

    getRunStates(configurationId, options = {}) {
        let qs = options;

        let headers = {
            "X-DexiIO-Access": this.access_key,
            "X-DexiIO-Account": this.account_id,
            "Accept": "application/json",
            "Accept-Encoding": "gzip"
        }
        return request.get(`${this.API_URL}runs/${configurationId}/executions`, {
            headers: headers,
            qs: qs
        });
    }

    /**
      * this function gets run states for a chosen configuration
      * @param {string} runId - the run id for an execution
      */

    getRunResult(runId) {
        let headers = {
            "X-DexiIO-Access": this.access_key,
            "X-DexiIO-Account": this.account_id,
            "Accept": "application/json"
        }
        return request.get(`${this.API_URL}executions/${runId}/result`, {
            headers: headers,
        }).then(res => {
            return helpers.formatResults(res);
        }).catch(err=>{
            throw err;
        });
    }

    /**
      * this function gets run states for a chosen configuration
      * @param {string} configurationId - the configuration id for a robot to run
      */

    executeRobot(configurationId) {
        let headers = {
            "X-DexiIO-Access": this.access_key,
            "X-DexiIO-Account": this.account_id,
            "Accept": "application/json",
            "Accept-Encoding": "gzib"
        }

        return request.post(`${this.API_URL}runs/${configurationId}/execute`, {}, {
            headers: headers,
        });
    }

    /**
      * this function gets run states for a chosen configuration
      * @param {string} executionId - the run id for an execution
      */
    stopExecution(executionId) {
        let headers = {
            "X-DexiIO-Access": this.access_key,
            "X-DexiIO-Account": this.account_id,
            "Accept": "application/json",
            "Accept-Encoding": "gzib"
        }

        return request.post(`${this.API_URL}executions/${executionId}/stop`, {}, {
            headers: headers,
        });
    }
}

module.exports = { Dexi, DexiError };