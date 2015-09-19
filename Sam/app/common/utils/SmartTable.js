var App;
(function (App) {
    var Utils;
    (function (Utils) {
        var SmartTable;
        (function (SmartTable) {
            function EncodeFieldNames(src) {
                return src.replace(/ /g, '').replace(/\,/g, '___$___').replace(/\./g, '___$_$___').replace(/\//g, '___$_$___').replace(/\*/g, '___$_$_$___').replace(/\:/g, '___$_$_$_$___');
            }
            SmartTable.EncodeFieldNames = EncodeFieldNames;
            function DecodeFieldNames(src) {
                return src.replace(/___\$___/g, ',').replace(/___\$_\$___/g, '.').replace(/___\$_\$_\$___/g, '*').replace(/___\$_\$_\$_\$___/g, ':');
            }
            SmartTable.DecodeFieldNames = DecodeFieldNames;
        })(SmartTable = Utils.SmartTable || (Utils.SmartTable = {}));
    })(Utils = App.Utils || (App.Utils = {}));
})(App || (App = {}));
//# sourceMappingURL=SmartTable.js.map