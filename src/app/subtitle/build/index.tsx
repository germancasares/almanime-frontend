import Video from './_components/video';

const Build = () => (
  <>
    Hello world
    <Video options={{
      autoplay: true,
      controls: true,
      sources: [{
        src: 'http://vjs.zencdn.net/v/oceans.mp4',
        type: 'video/mp4',
      }],
    }}
    />
  </>
);

export default Build;
