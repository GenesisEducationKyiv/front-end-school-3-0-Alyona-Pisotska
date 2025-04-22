const isValidImageUrl = (url?: string): boolean => {
  if (!url || url.trim() === '') return true;

  try {
    const parsedUrl = new URL(url);
    const validProtocols = ['http:', 'https:'];
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg', '.tiff', '.ico'];

    const pathname = parsedUrl.pathname.toLowerCase();
    const hasValidExtension = imageExtensions.some((ext) => pathname.endsWith(ext));

    return validProtocols.includes(parsedUrl.protocol) && hasValidExtension;
  } catch {
    return false;
  }
};

export { isValidImageUrl };
