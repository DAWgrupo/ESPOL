class Constantes():

    ALGO_ANDA_MAL = "Algo ha salido mal"
    INTENTALO_NUEVAMENTE = "Lo sentimos, hay dificultades en la conexion. Por favor, intentalo de nuevo mas tarde"
    SIN_CONEXION = "Sin conexion!"
    REVISAR_CONEXION = "Por favor revisa tu conexion a internet"
    CARGANDO = "Cargando.."





    #Urls
    API_URL = 'http://navi.pythonanywhere.com/rest/'
    TAMANOS_URL =  API_URL  +"tamanos/"
    PORCIONES_URL =  API_URL + "porciones/"
    ADICIONALES_URL =  API_URL + "adicionales/"
    TAMANO_MASA_URL =  API_URL + "tamano_masa/"
    TAMANO_BORDE_URL =  API_URL + "tamano_borde/"
    TAMANO_INGREDIENTE_URL =  API_URL + "tamano_ingrediente/"
    CREAR_FAVORITA_URL =   API_URL + "crear_pizza_favorita"
    PIZZAS_TRADICIONALES =  API_URL + "pizzas_tradicionales"
    CREAR_PIZZA_FAVORITA =  API_URL + "crear_pizza_favorita"
    BORRAR_PIZZA_FAVORITA =  API_URL + "borrar_pizza_favorita"
    PIZZAS_FAVORITAS =     API_URL + "pizzas_favoritas"
    COMBOS_PROMOIONALES =  API_URL + "combos_promocionales/"
    LISTA_DIRECCIONES_FAV =  API_URL + "direccion_cliente/ver"
    CREAR_DIRECCION =  API_URL + "direccion_cliente/crear"
    VER_PIZZA =  API_URL + "ver_pizza"
    EDITAR_PERFIL =  API_URL +  "usuario/editar"
    VER_PERFIL =  API_URL + "usuario/ver"
    REGISTRO_FORM =  API_URL + "registrar"
    LOGIN =   API_URL + "login"
    ELIMINAR_DIRECCION =  API_URL + "direccion_cliente/borrar"
    CREAR_COMBINACION =  API_URL + "crear_combinacion/"
    CARRITO =  API_URL + "carrito/"
    BORRAR_ELEMENTO_CARRITO =  API_URL + "carrito/borrar_elemento/"

    #metodos

    def getTamanosUrl(token):
        return   Constantes.TAMANOS_URL+"?TOKEN="+token 
     

    def getPorcionesUrl(token): 
        return   Constantes.PORCIONES_URL + "?TOKEN="+token 
     

    def getAdicionalesUrl(token, tipo): 
        return   Constantes.ADICIONALES_URL+"?TOKEN="+token+"&TIPO="+tipo 
     

    def getTamanosMasasUrl(token, tamaño): 
        return   Constantes.TAMANO_MASA_URL + "?TOKEN="+token +"&TAMANO="+tamano
     

    def getTamanosBordesUrl(token, tamaño): 
        return   Constantes.TAMANO_BORDE_URL + "?TOKEN="+token +"&TAMANO="+tamano
     

    def getTamanosIngredientesUrl(token, tamaño): 
        return   Constantes.TAMANO_INGREDIENTE_URL + "?TOKEN="+token +"&TAMANO="+tamano
     

    def getTradicionalesUrl(token): 
        return   Constantes.PIZZAS_TRADICIONALES + "?TOKEN="+token 
     

    def getCrearPizzaFavoritasUrl(): 
        return   Constantes.CREAR_PIZZA_FAVORITA 
     

    def getBorrarPizzaFavoritasUrl(): 
        return   Constantes.BORRAR_PIZZA_FAVORITA 
     

    def getPizzasFavoritas(token): 
        return   Constantes.PIZZAS_FAVORITAS + "?TOKEN=" + token 
     

    def getPromocionalesUrl(token): 
        return   Constantes.COMBOS_PROMOIONALES + "?TOKEN="+token 
     

    def getListaDireccionesUrl(token): 
        return   Constantes.LISTA_DIRECCIONES_FAV + "?TOKEN="+token
     

    def postCrearDireccionUrl(): 
        return   Constantes.CREAR_DIRECCION 
     

    def postBorrarDireccionUrl(): 
        return   Constantes.ELIMINAR_DIRECCION 
     

    def getVerPizzaUrl(token, id): 
        return   Constantes.VER_PIZZA + "?TOKEN="+token +"&PIZZA_ID="+ id
     

    def getEditarPerfilUrl(): 
        return   Constantes.EDITAR_PERFIL 
     

    def getVerPefilUrl(token): 
        return   Constantes.VER_PERFIL + "?TOKEN=" +  token 
     

    def getRegistroFormUrl(): 
        return   Constantes.REGISTRO_FORM 
     

    def getLoginUrl(): 
        return   Constantes.LOGIN 
     

    def getCarritoUrl(token): 
        return   Constantes.CARRITO + "?TOKEN=" +  token 
     

 