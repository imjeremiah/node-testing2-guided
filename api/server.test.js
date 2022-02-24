test('verify we are using the correct environment', ()  => {
    expect(process.env.NODE_ENV).toBe('testing');
});