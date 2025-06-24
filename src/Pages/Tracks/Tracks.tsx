import { Layout, Toaster } from '@/Components/components';

const TracksPage = () => {
  return (
    <>
      <Layout />
      <Toaster position='bottom-left' data-testid='toast-container' richColors />
    </>
  );
};

export default TracksPage;
