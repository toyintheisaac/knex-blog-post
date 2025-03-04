

class CustomError extends Error {
  /**
   * 
   * @param name name of the error type
   * @param message error message
   */
  constructor(name:string, message: string) {
    super(message);
    this.name = name;
  }

}

export default CustomError;