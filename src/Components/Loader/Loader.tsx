const Loader = () => {
  return (
    <div className='flex h-full items-center justify-center' data-testid='loading-indicator'>
      <div className='border-accent h-16 w-16 animate-spin rounded-full border-t-4 border-solid'></div>
    </div>
  );
};

export { Loader };
