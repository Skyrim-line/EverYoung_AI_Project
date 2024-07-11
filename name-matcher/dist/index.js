"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const names = [
    { original: "David Smith 大卫 斯密斯", pinyin: "dawei simisi" },
    { original: "Yueling Zhang 月林张", pinyin: "yueling zhang" },
    { original: "Huawen Wu 华文吴", pinyin: "huawen wu" },
    { original: "Annie Lee 李安妮", pinyin: "li anni" }
];
function normalizeName(name) {
    return name.replace(/ /g, '').toLowerCase();
}
exports.handler = (event, context, callback) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const input = ((_a = event.queryStringParameters) === null || _a === void 0 ? void 0 : _a.name) || '';
    const normalizedInput = normalizeName(input);
    const bestMatch = names.find(name => name.pinyin.includes(normalizedInput) ||
        normalizeName(name.original).includes(normalizedInput));
    callback(null, {
        statusCode: 200,
        body: JSON.stringify(bestMatch ? bestMatch.original : 'No match found')
    });
});
