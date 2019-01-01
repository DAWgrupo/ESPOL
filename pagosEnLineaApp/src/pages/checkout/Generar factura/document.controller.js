(function () {
    angular.module('starter').controller('DocumentController', ['$scope', '$ionicModal', 'Service', DocumentController]);

    function DocumentController($scope, $ionicModal, FacturaService) {
        var vm = this;

        setDefaultsForPdfViewer($scope);

        // Inicializa la vista 
        $ionicModal.fromTemplateUrl('pdf-viewer.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            vm.modal = modal;
        });

        vm.createFactura = function () {
            var factura = getDummyData();

            FacturaService.createPdf(factura)
                .then(function (pdf) {
                    var blob = new Blob([pdf], { type: 'application/pdf' });
                    $scope.pdfUrl = URL.createObjectURL(blob);

                    // Muestra la vista
                    vm.modal.show();
                });
        };

        // Clean up the modal view.
        $scope.$on('$destroy', function () {
            vm.modal.remove();
        });

        return vm;
    }

    function setDefaultsForPdfViewer($scope) {
        $scope.scroll = 0;
        $scope.loading = 'Cargando....';

        $scope.onError = function (error) {
            console.error(error);
        };

        $scope.onLoad = function () {
            $scope.loading = '';
        };

        $scope.onProgress = function (progress) {
            console.log(progress);
        };
    }

    function getDummyData() {
        return {
            Date: new Date().toLocaleDateString("en-IE", { año: "numeric", mes: "long", dia: "numeric" }), //Agrega la fecha actual
            AddressFrom: {
                Name: chance.name(),
                Address: chance.address(),
                Country: chance.country({ full: true })
            },
            AddressTo: {
                Name: chance.name(),
                Address: chance.address(),
                Country: chance.country({ full: true })
            },
            Items: [
                { Detalles: 'iPhone', Cantidad: '1', Precio: '700' },
                { Detalles: 'Samsung', Cantidad: '2', Precio: '655' }
            ],
            Subtotal: '2010',
            Envio: '6',
            Total: '2016'
        };
    }
})();