import { ToasterProps } from 'sonner';

const isValidToasterTheme = (theme: unknown): theme is ToasterProps['theme'] => {
  return theme === 'light' || theme === 'dark' || theme === 'system';
};

export { isValidToasterTheme };
