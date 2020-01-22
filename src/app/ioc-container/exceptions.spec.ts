import { NoProviderError } from './exceptions';

describe('Exceptions', () => {
  it('should create an instance', () => {
    expect(new NoProviderError('token', 'traceMessage')).toBeTruthy();
  });
});
