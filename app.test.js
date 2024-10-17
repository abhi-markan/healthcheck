const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

describe('Application initialization', () => {
  it.only('should throw an error if PORT environment variable is not specified', () => {
    delete process.env.PORT;

    try {
      require('./app');
    } catch (error) {
      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).toHaveBeenCalledWith('❌ Microservice intialisation failed %o', expect.any(Error));
    }
  });
});
