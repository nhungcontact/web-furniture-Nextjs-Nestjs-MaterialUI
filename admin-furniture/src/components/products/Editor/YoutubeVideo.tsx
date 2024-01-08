import YouTubeEmbed from "react-youtube";

const YoutubeVideo = (props) => {
  const { attributes, children, element } = props;
  const { youtubeId } = element;
  //   const editor = useSlateStatic();
  return (
    <>
      <div {...attributes}>
        <div contentEditable={false}>
          <YouTubeEmbed videoId={youtubeId} />
        </div>
        {children}
      </div>
    </>
  );
};

export default YoutubeVideo;
