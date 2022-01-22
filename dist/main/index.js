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
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importStar(require("express"));
var Parser_1 = require("./utils/Parser");
var app = (0, express_1.default)();
var PORT = 3000;
app.get("/cars", function (req, res) {
    res.send("Here's a list of metadata");
});
app.get("/cars/:id", Parser_1.carIdParserMiddelware, function (req, res) {
    res.send("You submitted a good uuid");
});
app.post("/cars", (0, express_1.json)(), function (req, res) {
    (0, Parser_1.parseCarBody)(req, res, function (data) {
        console.log(data);
        res.status(201).send("Good job!");
    });
});
app.put("/cars/:id", (0, express_1.json)(), Parser_1.carIdParserMiddelware, function (req, res) {
    (0, Parser_1.parseCarBody)(req, res, function (data) {
        console.log(data);
        res.status(201).send("Good job!");
    });
});
app.delete("/cars/:id", Parser_1.carIdParserMiddelware, function (req, res) {
    res.send("You submitted a good uuid");
});
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
