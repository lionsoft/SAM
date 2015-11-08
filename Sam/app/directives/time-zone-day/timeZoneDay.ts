'use strict';
module App.Directives {

    interface ITimeZoneDayScope extends ng.IScope {
        timeZoneDay: string;
        $item: TimeZoneDayWrapper;
    }


    class TimeZoneDayWrapper {

        constructor(private $scope: ITimeZoneDayScope | any) {
        }

        get title(): boolean {
            return this.$scope.timeZoneDay;
        }

        get isActive(): boolean {
            return this.$scope.$parent.$item[this.$scope.timeZoneDay + "IsActive"];
        }
        set isActive(value: boolean) {
            this.$scope.$parent.$item[this.$scope.timeZoneDay + "IsActive"] = value;
        }


        get from(): string {
            var res = "01.01.0001 " + (this.$scope.$parent.$item[this.$scope.timeZoneDay + "From"] || "");
            return res;
        }
        set from(value: string) {
            this.$scope.$parent.$item[this.$scope.timeZoneDay + "From"] = moment(value).format("HH:mm");
        }

        get to(): DateTime {
            var res = "01.01.0001 " + (this.$scope.$parent.$item[this.$scope.timeZoneDay + "To"] || "");
            return res;
        }
        set to(value: DateTime) {
            this.$scope.$parent.$item[this.$scope.timeZoneDay + "To"] = moment(value).format("HH:mm");
        }
}

    class TimeZoneDay extends TemplatedDirective {
        restrict = 'A';

        scope = {
            timeZoneDay: '@'
        }

        GetTemplateUrl(element: ng.IAugmentedJQuery, attrs: ng.IAttributes): string {
            this.LoadStyle("html/{0}.css".format(this.getName(false)).ExpandPath(this.rootFolder));
            return super.GetTemplateUrl(element, attrs);
        }
        Link($scope: ITimeZoneDayScope | any, $element, $attrs: ng.IAttributes | any) {
            $scope.$item = new TimeZoneDayWrapper($scope);
        }
    }


    app.directive("timeZoneDay", TimeZoneDay.Factory());
}