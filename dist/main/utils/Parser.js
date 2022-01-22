"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCarBody = exports.carIdParserMiddelware = void 0;
var uuid = __importStar(require("uuid"));
var ajv_1 = __importDefault(require("ajv"));
var CarDomain_1 = require("../models/CarDomain");
var ajv = new ajv_1.default({ removeAdditional: true });
var carIdParserMiddelware = function (req, res, next) {
    var isIdValid = uuid.validate(req.params.id);
    if (!isIdValid) {
        res.status(400).send("Car id was not valid. Please submit a valid uuid");
    }
    next();
};
exports.carIdParserMiddelware = carIdParserMiddelware;
var parseCarBody = function (req, res, callback) {
    var body = req.body;
    console.log(body);
    var validateCarBodyDomain = ajv.compile(CarDomain_1.carBodyDomainSchema);
    if (validateCarBodyDomain(body)) {
        callback(body);
    }
    else {
        res.status(400).json(validateCarBodyDomain.errors);
    }
};
exports.parseCarBody = parseCarBody;
