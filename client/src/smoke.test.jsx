import { describe, it, expect, vi } from 'vitest';

// Simple smoke test to verify the test framework works
describe('MERN App', () => {
  it('should have installed dependencies', () => {
    expect(true).toBe(true);
  });

  it('should have React imported correctly', async () => {
    const React = await import('react');
    expect(React.default).toBeDefined();
  });

  it('should be able to create JSX elements', () => {
    const element = <div>Hello</div>;
    expect(element.type).toBe('div');
  });
});
