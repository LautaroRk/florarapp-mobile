class Requester {
  /**
   * @desc Metodo nativo de React.js
   *
   * @doc https://reactjs.org/docs/react-component.html#constructor
   * @return { void }
   */
  constructor() {
    this.headersArray = new Headers();

    // Cabeceras
    this.headersArray.append('Accept', 'application/json');
    this.headersArray.append('Content-Type', 'application/json');
    this.dispatch = false;
  }

  /**
   * metodo para obtener el dispatch y despachar acciones
   * @return { void }
   */
  addDispatch = (dispatch) => {
    this.dispatch = dispatch;
  };
  /**
   * @desc Añade cabeceras a la request
   *
   * @param { Object } headersArray
   *
   * @return { Headers }
   */
  addHeaders(newHeaders = {}) {
    //
    let {headersArray} = this;

    // Recorremos y añadimos las cabeceras.
    Object.keys(headersArray).length > 0 &&
      headersArray.forEach((prop, value) => {
        headersArray.append(prop, value);
      });
  }

  /**
   * @desc
   *
   * @param { String } endpoint
   *
   * @return { Promise }
   */
  get(endpoint, responseType = 'json') {
    return new Promise((resolve, reject) => {
      /**
       * @desc
       */
      try {
        // Cabeceras.
        let headers = this.headersArray;

        // Armamos el requester
        let request = new Request(endpoint, {
          method: 'GET',
          headers,
          cache: 'default',
        });

        let responseHeader = null;
        //
        fetch(request)
          .then((result) => {
            responseHeader = result.headers;

            if (result.status !== 200) {
              reject(result);
              return result;
            }
            return result[responseType]();
          })
          .then((response) => {
            response.headers = responseHeader;
            resolve(response);
          })
          .catch(reject);
      } catch (e) {
        reject(e.stack);
      }
    });
  }

  /**
   * Metodo para hacer request post
   * @param  { String } endpoint
   * @param  { Object } data
   * @return { Promise }
   */
  async post(endpoint, data) {
    try {
      // Cabeceras.
      let headers = this.headersArray;

      // Instancia del request.
      let request = new Request(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
        cache: 'default',
      });

      // Solicitud
      const response = await fetch(request);

      // Parseamos a json.
      const result = await response.json();

      // Asignamos la cabecera.
      result.headers = response.headers;
      result.statusCode = response.status;

      return result;
    } catch (err) {
      return {
        error: {
          message: 'No se pudo conectar con el servidor',
          body: err,
        },
      };
    }
  }
}

export default Requester;
