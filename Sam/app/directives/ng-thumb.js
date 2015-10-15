var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var App;
(function (App) {
    /**
    * The ng-thumb directive
    * @author: nerv
    * @version: 0.1.2, 2014-01-09
    */
    var NgThumb = (function (_super) {
        __extends(NgThumb, _super);
        function NgThumb() {
            _super.apply(this, arguments);
            this.restrict = 'A';
            this.template = '<canvas />';
        }
        NgThumb.prototype.isSupportFile = function () {
            return !!(this.$window['FileReader'] && this.$window['CanvasRenderingContext2D']);
        };
        NgThumb.prototype.isFile = function (item) {
            return angular.isObject(item) && item instanceof this.$window['File'];
        };
        NgThumb.prototype.isImage = function (file) {
            var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|png'.indexOf(type) !== -1;
        };
        NgThumb.prototype.isUrl = function (file) {
            return typeof file === "string";
        };
        NgThumb.prototype.isSupportedImage = function (file) {
            return this.isSupportFile() && (this.isUrl(file) || this.isFile(file) && this.isImage(file));
        };
        NgThumb.prototype.onLoadImage = function (img, params, el) {
            var left = 0;
            var top = 0;
            var width = img.width;
            var height = img.height;
            if (params.stretch) {
                width = params.width || img.width / img.height * params.height;
                height = params.height || img.height / img.width * params.width;
            }
            else {
                params.width = params.width || width;
                params.height = params.height || height;
                if (width <= params.width && height <= params.height) {
                    left = (params.width - width) / 2;
                    top = (params.height - height) / 2;
                }
                else if (width > params.width && height <= params.height) {
                    width = params.width;
                    height = img.height / img.width * params.width;
                    top = (params.height - height) / 2;
                }
                else if (width <= params.width && height > params.height) {
                    height = params.height;
                    width = img.width / img.height * params.height;
                    left = (params.width - width) / 2;
                }
                else {
                    if (img.width > img.height) {
                        width = params.width;
                        height = img.height / img.width * params.width;
                        top = (params.height - height) / 2;
                    }
                    else {
                        height = params.height;
                        width = img.width / img.height * params.height;
                        left = (params.width - width) / 2;
                    }
                }
            }
            var canvas = el.find('canvas');
            canvas.attr({ width: width + left, height: height + top });
            canvas[0].getContext('2d').drawImage(img, left, top, width, height);
        };
        NgThumb.prototype.Link = function (scope, element, attributes) {
            var _this = this;
            var params = scope.$eval(attributes.ngThumb);
            if (this.isSupportedImage(params.file)) {
                var img = new Image();
                img.onload = function (ev) { return _this.onLoadImage(ev.target, params, element); };
                if (this.isUrl(params.file)) {
                    img.src = params.file;
                }
                else {
                    var reader = new FileReader();
                    reader.onload = function (event) { return img.src = event.target['result']; };
                    reader.readAsDataURL(params.file);
                }
            }
        };
        return NgThumb;
    })(App.Directive);
    App.app.directive('ngThumb', NgThumb.Factory());
})(App || (App = {}));
