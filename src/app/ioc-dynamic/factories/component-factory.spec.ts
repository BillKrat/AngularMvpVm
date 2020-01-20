import { ComponentFactory } from './component-factory';

describe('ComponentFactory', () => {
  it('should create an instance', () => {
    expect(new ComponentFactory(null, null)).toBeTruthy();
  });
});
