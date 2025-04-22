const isValidImageUrl = (url?: string): boolean => {
  if (!url || url.trim() === '') return true;

  try {
    const parsedUrl = new URL(url);
    const validProtocols = ['http:', 'https:'];

    return validProtocols.includes(parsedUrl.protocol);
  } catch {
    return false;
  }
};

export { isValidImageUrl };
