/**
 * Represents a response obtained by making a request to the API clients.
 * Contains information regarding whether the request was successfull,
 * an infromative message, and the actual API response body.
 */
class ClientResponse {
  #isOk;

  #message;

  #response;

  /**
   * Creates a new `ClientResponse` with the given data.
   *
   * @param {boolean} isOk whether the request was successfully processed
   * @param {string} message an informative message associated with the given response
   * @param {object} response body of the response
   */
  constructor(isOk = false, message = '', response = {}) {
    this.#isOk = isOk;
    this.#message = message;
    this.#response = response;
  }

  get isOk() {
    return this.#isOk;
  }

  get message() {
    return this.#message;
  }

  get response() {
    return { ...this.#response };
  }

  get clientResponse() {
    return {
      isOk: this.#isOk,
      message: this.#message,
      response: { ...this.#response },
    };
  }
}

export default ClientResponse;
