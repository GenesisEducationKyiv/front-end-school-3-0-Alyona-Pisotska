const isValidImageUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    const validProtocols = ['http:', 'https:'];
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];

    const isProtocolValid = validProtocols.includes(parsedUrl.protocol);

    const pathname = parsedUrl.pathname.toLowerCase();
    const hasValidExtension = validExtensions.some((ext) => pathname.endsWith(ext));

    return isProtocolValid && hasValidExtension;
  } catch {
    return false;
  }
};

export { isValidImageUrl };
