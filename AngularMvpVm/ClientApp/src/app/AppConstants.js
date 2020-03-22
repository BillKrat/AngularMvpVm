"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppConstants = /** @class */ (function () {
    function AppConstants() {
    }
    Object.defineProperty(AppConstants, "BaseUrl", {
        get: function () { return document.getElementsByTagName('base')[0].href; },
        enumerable: true,
        configurable: true
    });
    return AppConstants;
}());
exports.AppConstants = AppConstants;
//# sourceMappingURL=AppConstants.js.map