type PlayButtonProps = {
  onClickHandler: () => void;
  isPlaying: boolean;
};

export function PlayButton({
  onClickHandler,
  isPlaying,
}: PlayButtonProps): JSX.Element {
  return (
    <button type="button" className="player__play" onClick={onClickHandler}>
      {!isPlaying ? (
        <>
          <svg viewBox="0 0 19 19" width="19" height="19">
            <use href="#play-s"></use>
          </svg>
          <span>Play</span>
        </>
      ) : (
        <>
          <svg viewBox="0 0 19 19" width="19" height="19">
            <use href="#pause"></use>
          </svg>
          <span>Play</span>
        </>
      )}
    </button>
  );
}
export default PlayButton;
