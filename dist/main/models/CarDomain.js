"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carBodyDomainSchema = exports.BrandId = exports.PaintColor = exports.TransmissionType = void 0;
var TransmissionType;
(function (TransmissionType) {
    TransmissionType["AUTOMATIC"] = "automatic";
    TransmissionType["MANUAL"] = "manual";
})(TransmissionType = exports.TransmissionType || (exports.TransmissionType = {}));
var PaintColor;
(function (PaintColor) {
    PaintColor["BLUE"] = "blue";
    PaintColor["GREEN"] = "green";
    PaintColor["ORANGE"] = "orange";
    PaintColor["RED"] = "red";
})(PaintColor = exports.PaintColor || (exports.PaintColor = {}));
var BrandId;
(function (BrandId) {
    BrandId[BrandId["AUDI"] = 1] = "AUDI";
    BrandId[BrandId["BMW"] = 2] = "BMW";
    BrandId[BrandId["FORD"] = 3] = "FORD";
    BrandId[BrandId["TOYOTA"] = 4] = "TOYOTA";
})(BrandId = exports.BrandId || (exports.BrandId = {}));
exports.carBodyDomainSchema = {
    type: "object",
    properties: {
        brandId: {
            type: "number",
            enum: [BrandId.AUDI, BrandId.BMW, BrandId.FORD, BrandId.TOYOTA],
        },
        color: {
            type: "string",
            enum: [
                PaintColor.BLUE,
                PaintColor.GREEN,
                PaintColor.ORANGE,
                PaintColor.RED,
            ],
            nullable: true,
        },
        hasAccident: { type: "boolean", nullable: true },
        seats: { type: "number", nullable: true },
        transmission: {
            type: "string",
            enum: [TransmissionType.AUTOMATIC, TransmissionType.MANUAL],
        },
    },
    required: ["brandId", "transmission"],
    additionalProperties: false,
};
