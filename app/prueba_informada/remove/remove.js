var miControlador = miModulo.controller(
    "prueba_informadaRemoveController",
    function ($scope, $routeParams, $location, promesasService, auth) {
        if (auth.data.status != 200 || auth.data.message.id_tipousuario == 2) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message.login;
            $scope.authLevel = auth.data.message.id_tipousuario_obj;
        }
        
        $scope.id = $routeParams.id;
        $scope.controller = "prueba_informadaRemoveController";
        $scope.fallo = false;
        $scope.hecho = false;

        $scope.falloMensaje = "";

        promesasService.ajaxGet('prueba_informada', $routeParams.id)
            .then(function (response) {
                $scope.id = response.data.message.id;
                $scope.informe = response.data.message.informe;
            }, function () {
                $scope.fallo = true;
            })

        $scope.remove = function () {

            promesasService.ajaxRemove('prueba_informada', $routeParams.id)
                .then(function (response) {
                    if (response.data.status != 200) {
                        $scope.fallo = true;
                        $scope.falloMensaje = response.data.message;
                    } else {
                        $scope.fallo = false;
                        $scope.hecho = true;
                    }
                }, function (error) {
                    $scope.hecho = true;
                    $scope.fallo = true;
                    $scope.falloMensaje = error.message + " " + error.stack;
                });
        }
        $scope.volver = function () {
            window.history.back();
        };

        $scope.cerrar = function () {
            $location.path('/');
        };
    }
)