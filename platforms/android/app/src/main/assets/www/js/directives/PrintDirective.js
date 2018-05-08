/*global define*/

define(['angular'], function (angular) {
    "use strict";

    var directive = function () {

        var directive = {
            link: link,
            restrict: 'A'
        };

        return directive;


        function link(scope, element, attrs) {
            var printSection = document.getElementById('printSection');
            // if there is no printing section, create one
            if (!printSection) {
                printSection = document.createElement('div');
                printSection.id = 'printSection';
                document.body.appendChild(printSection);
            }

            element.on('click', function () {
                printSection.innerHTML = '';
                var elemToPrint = document.getElementById(attrs.printElementId);

                if (elemToPrint) {
                    printElement(elemToPrint);
                }
            });
            window.onafterprint = function () {
                printSection.innerHTML = '';
            }
        }

        function printElement(elem) {

            var domClone = elem.cloneNode(true);
            printSection.appendChild(domClone);
            window.print();
        }


    };

    directive.$inject = [];
    return directive;
});