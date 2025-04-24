import { Layout, Toaster } from '@/Components/components.ts';

const TracksPage = () => {
  return (
    <>
      <Layout />
      <Toaster position='bottom-left' data-testid='toast-container' richColors />
    </>
  );
};

export default TracksPage;
