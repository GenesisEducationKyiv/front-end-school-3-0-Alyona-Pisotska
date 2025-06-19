import { describe, expect, test } from 'vitest';
import { isValidImageUrl } from './is-valid-image-url';

describe('isValidImageUrl', () => {
  test('returns true for valid image URLs', () => {
    expect(isValidImageUrl('https://example.com/image.jpg')).toBe(true);
    expect(isValidImageUrl('http://example.com/photo.png')).toBe(true);
    expect(isValidImageUrl('https://example.com/assets/icon.svg')).toBe(true);
    expect(isValidImageUrl('https://example.com/image.JPEG')).toBe(true);
  });

  test('returns true for URL with query string', () => {
    expect(isValidImageUrl('https://example.com/image.png?version=1')).toBe(true);
  });

  test('returns false for URLs with invalid extensions', () => {
    expect(isValidImageUrl('https://example.com/script.js')).toBe(false);
    expect(isValidImageUrl('https://example.com/index.html')).toBe(false);
    expect(isValidImageUrl('https://example.com/file.txt')).toBe(false);
  });

  test('returns false for valid URL without image extension', () => {
    expect(isValidImageUrl('https://example.com')).toBe(false);
    expect(isValidImageUrl('https://example.com/images')).toBe(false);
  });

  test('returns false for unsupported protocols', () => {
    expect(isValidImageUrl('ftp://example.com/image.jpg')).toBe(false);
    expect(isValidImageUrl('file://example.com/image.png')).toBe(false);
  });

  test('returns false for URL with missing protocol', () => {
    expect(isValidImageUrl('example.com/image.png')).toBe(false);
  });

  test('returns false for invalid URL format', () => {
    expect(isValidImageUrl('not-a-valid-url')).toBe(false);
  });

  test('returns false for empty string', () => {
    expect(isValidImageUrl('')).toBe(false);
  });

  test('returns false for string with only spaces', () => {
    expect(isValidImageUrl('   ')).toBe(false);
  });

  test('returns false for malformed URL', () => {
    expect(isValidImageUrl('http://')).toBe(false);
  });
});
