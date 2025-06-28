const ErrorComponent = () => {
  return (
    <section className='border-accent text-muted-foreground m-8 flex flex-col items-center justify-center rounded-[12px] border border-dashed p-8'>
      <ErrorIcon />
      <p className='mt-1'>Oops!</p>
      <p>An unexpected error seems to occur.</p>
      <p>We are working on solving the problem</p>
    </section>
  );
};

const ErrorIcon = () => (
  <svg width='50' height='54' viewBox='0 0 50 54' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M30.5556 0.333344V16.3333C30.5556 17.8061 31.7992 19 33.3333 19H50L30.5556 0.333344Z' fill='#2F50FF' />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M8.33334 53.6667L41.6667 53.6667C46.269 53.6667 50 50.085 50 45.6667L50 19H33.3333C31.7992 19 30.5556 17.8061 30.5556 16.3333V0.333344H8.33333C3.73097 0.333344 0 3.91506 0 8.33334V45.6667C5.29819e-06 50.085 3.73097 53.6667 8.33334 53.6667ZM27.7778 21.6667C27.7778 20.1939 26.5342 19 25.0001 19C23.4659 19 22.2223 20.1939 22.2223 21.6667V29.6667C22.2223 31.1394 23.4659 32.3333 25.0001 32.3333C26.5342 32.3333 27.7778 31.1394 27.7778 29.6667V21.6667ZM22.2223 37.6667C22.2223 36.1939 23.4659 35 25.0001 35C26.5342 35 27.7778 36.1939 27.7778 37.6667C27.7778 39.1394 26.5342 40.3333 25.0001 40.3333C23.4659 40.3333 22.2223 39.1394 22.2223 37.6667Z'
      fill='url(#paint0_linear)'
    />
    <defs>
      <linearGradient id='paint0_linear' x1='25' y1='0.333344' x2='25' y2='53.6667' gradientUnits='userSpaceOnUse'>
        <stop stopColor='#0000D2' />
        <stop offset='0.84375' stopColor='#536EFF' />
      </linearGradient>
    </defs>
  </svg>
);

export { ErrorComponent };
