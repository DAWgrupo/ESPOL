(function () {
    angular.module('starter').factory('FacturaService', ['$q', FacturaService]);

    function FacturaService($q) {
        function createPdf(factura) {
            return $q(function (resolve, reject) {
                var dd = createDocumentDefinition(factura);
                var pdf = pdfMake.createPdf(dd);

                pdf.getBase64(function (output) {
                    resolve(base64ToUint8Array(output));
                });
            });
        }

        return {
            createPdf: createPdf
        };
    }

    function createDocumentDefinition(factura) {

        var items = factura.Items.map(function (item) {
            return [item.Description, item.Quantity, item.Price];
        });

        var dd = {
            content: [
                { text: 'FECHA', style: 'header' },
                { text: factura.Date, alignment: 'right' },

                { text: 'Facturar a: ', style: 'subheader' },
                factura.AddressFrom.Name,
                factura.AddressFrom.Address,
                factura.AddressFrom.Country,

                { text: 'Enviar a: ', style: 'subheader' },
                factura.AddressTo.Name,
                factura.AddressTo.Address,
                factura.AddressTo.Country,

                { text: 'PRODUCTOS', style: 'subheader' },
                {
                    style: 'itemsTable',
                    table: {
                        widths: ['*', 80, 80],
                        body: [
                            [
                                { text: 'Detalles', style: 'itemsTableHeader' },
                                { text: 'Cantidad', style: 'itemsTableHeader' },
                                { text: 'Precio', style: 'itemsTableHeader' },
                            ]
                        ].concat(items)
                    }
                },
                {
                    style: 'totalsTable',
                    table: {
                        widths: ['*', 75, 75],
                        body: [
                            [
                                '',
                                'Subtotal',
                                factura.Subtotal,
                            ],
                            [
                                '',
                                'Envio',
                                factura.Envio,
                            ],
                            [
                                '',
                                'Total',
                                factura.Total,
                            ]
                        ]
                    },
                    layout: 'noBorders'
                },
            ],
            styles: {
                header: {
                    fontSize: 20,
                    bold: true,
                    margin: [0, 0, 0, 10],
                    alignment: 'right'
                },
                subheader: {
                    fontSize: 16,
                    bold: true,
                    margin: [0, 20, 0, 5]
                },
                itemsTable: {
                    margin: [0, 5, 0, 15]
                },
                itemsTableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                },
                totalsTable: {
                    bold: true,
                    margin: [0, 30, 0, 0]
                }
            },
            defaultStyle: {
            }
        }

        return dd;
    }

    function base64ToUint8Array(base64) {
        var raw = atob(base64);
        var uint8Array = new Uint8Array(raw.length);
        for (var i = 0; i < raw.length; i++) {
            uint8Array[i] = raw.charCodeAt(i);
        }
        return uint8Array;
    }
})();