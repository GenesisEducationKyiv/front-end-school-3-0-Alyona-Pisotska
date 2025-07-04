import { useActiveTrack } from '@/hooks/hooks';
import { Button } from '@/Components/components';

const PageTitle = () => {
  const { activeTrack } = useActiveTrack();

  return (
    <>
      <h1 className='text-accent mb-6 font-bold uppercase' data-testid='tracks-header'>
        Music tracks for every taste!&nbsp;
        {activeTrack.length > 0 && <span>Active track: {activeTrack}</span>}
      </h1>

      <Button
        onClick={() => {
          throw new Error('test error');
        }}
      >
        Error
      </Button>
    </>
  );
};

export { PageTitle };
