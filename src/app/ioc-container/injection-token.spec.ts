import { InjectionToken } from './injection-token';

describe('InjectionToken', () => {
  it('should create an instance', () => {
    expect(new InjectionToken('token')).toBeTruthy();
  });
});
