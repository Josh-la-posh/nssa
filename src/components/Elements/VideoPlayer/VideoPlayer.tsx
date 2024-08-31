import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

import { ReactComponent as ClosedCaptionIcon } from '@/assets/icons/cc.svg';
// import { ReactComponent as FullScreenIcon } from '@/assets/icons/full-screen.svg';
import { ReactComponent as PlayIcon } from '@/assets/icons/play.svg';
import { ReactComponent as SpeakerIcon } from '@/assets/icons/speaker.svg';

import { Button } from '../Button';
import { Tooltip } from '../Tooltip';

type VideoPlayerProps = {
  src: string;
  thumbnail?: string;
  duration?: number;
  captions?: string[];
  onVideoEnded?: () => void;
};

export const VideoPlayer = ({ src, duration: as, onVideoEnded }: VideoPlayerProps) => {
  const videoRef = useRef<ReactPlayer>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  // const [isFullscreen, setIsFullScreen] = useState(false);
  const [volume] = useState(1);
  const [showCC, setShowCC] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [duration, setDuration] = useState(as || 0);
  const [played, setPlayed] = useState(0);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (ReactPlayer.canPlay(src)) {
      setIsValid(true);
    }
    return () => {
      setPlayed(0);
      setIsValid(true);
      setIsPlaying(false);
    };
  }, [src]);

  function handlePlay() {
    if (videoRef.current) {
      setIsPlaying(true);
    }
  }

  function handlePause() {
    if (videoRef.current) {
      setIsPlaying(false);
    }
  }

  function handleMute() {
    if (videoRef.current) {
      // videoRef.current.showPreview();
      setIsMuted(!isMuted);
    }
  }

  function handleProgress(progress: any) {
    if (videoRef.current && !isSeeking) {
      setPlayed(progress.playedSeconds);
    }
  }

  // function handleFullscreen() {
  //   if (videoRef.current) {
  //     videoRef.current.requestFullscreen();
  //   }
  // }

  function handleClosedCaptions() {
    if (videoRef.current) {
      if (showCC) {
        setShowCC(false);
      } else {
        setShowCC(true);
      }
    }
  }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    if (videoRef.current) {
      setIsSeeking(true);
      videoRef.current.seekTo(e.target.valueAsNumber);
      setPlayed(e.target.valueAsNumber);
      setIsSeeking(false);
    }
  }

  function handleDuration(e: number) {
    if (videoRef.current) {
      setIsSeeking(true);
      setDuration(+e);
      setIsSeeking(false);
    }
  }

  return (
    <div
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      className="relative h-full overflow-hidden rounded-lg bg-blue-600"
    >
      <div className="relative h-full w-full">
        <ReactPlayer
          width={'100%'}
          height={'100%'}
          ref={videoRef}
          onPlay={handlePlay}
          playing={isPlaying}
          volume={volume}
          muted={isMuted}
          pip={true}
          onPause={handlePause}
          url={src}
          onProgress={handleProgress}
          onError={() => setIsValid(false)}
          onDuration={handleDuration}
          onEnded={onVideoEnded}
        />

        {ReactPlayer.canPlay(src) && isValid ? (
          <button
            onClick={isPlaying ? handlePause : handlePlay}
            className="group absolute left-0 top-0 flex h-full w-full items-center justify-center bg-transparent"
          >
            <div className="flex h-20 w-20 items-center rounded-full bg-blue-600/70 p-4 text-white opacity-0 shadow-sm group-hover:opacity-100">
              {isPlaying ? (
                <div className="flex h-full w-full items-center justify-center gap-2">
                  <span className="h-full w-4 rounded-md bg-white" />
                  <span className="h-full w-4 rounded-md bg-white" />
                </div>
              ) : (
                <PlayIcon className="h-full w-full text-white" />
              )}
            </div>
          </button>
        ) : (
          <div className="group absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-transparent text-white">
            <p className="pb-2 font-medium">This video seem to be broken </p>
            <p className="text-sm font-medium text-blue-200">Please contact our support team</p>
          </div>
        )}
      </div>
      {ReactPlayer.canPlay(src) && isValid && (
        <div
          className={clsx(
            'absolute bottom-0 z-20 w-full space-y-2 bg-blue-600/70 p-1 pb-2 transition-opacity duration-700',
            showControls ? 'opacity-100' : 'opacity-0'
          )}
        >
          <input
            type="range"
            min={0}
            step="any"
            max={duration}
            value={played}
            className={clsx(
              'h-1 w-full cursor-pointer appearance-none rounded-lg bg-gray-500 dark:bg-gray-700',
              '[&::-webkit-appearance]:hidden [&::-webkit-slider-thumb]:h-1 [&::-webkit-slider-thumb]:w-1  [&::-webkit-slider-thumb]:border-none [&::-webkit-slider-thumb]:bg-white',
              '[&::-moz-range-progress]:bg-orange-500 [&::-moz-range-progress]:transition-all [&::-moz-range-thumb]:h-2 [&::-moz-range-thumb]:w-2 [&::-moz-range-thumb]:border-none [&::-moz-range-track]:rounded-full'
            )}
            onChange={handleSeek}
          />
          <div className="z-10 flex justify-between px-4 text-white">
            <div className="z-10 flex items-center justify-between gap-4 text-sm font-semibold text-white">
              <div className="z-10 flex items-center justify-between gap-4 text-sm font-semibold text-white">
                <Tooltip content={isPlaying ? 'Pause' : 'Play'}>
                  <Button
                    variant="text"
                    color="secondary"
                    size="sm"
                    className="w-5"
                    onClick={isPlaying ? handlePause : handlePlay}
                  >
                    {isPlaying ? (
                      <div className="flex h-4 w-full items-center justify-center gap-1">
                        <span className="h-full w-1 rounded-md bg-white" />
                        <span className="h-full w-1 rounded-md bg-white" />
                      </div>
                    ) : (
                      <PlayIcon className="h-full w-5" />
                    )}
                  </Button>
                </Tooltip>
                <Tooltip content={isMuted ? 'Unmute' : 'Mute'}>
                  <Button
                    variant="text"
                    color="secondary"
                    className={clsx('relative')}
                    onClick={handleMute}
                  >
                    <SpeakerIcon className={clsx(isMuted ? 'opacity-50' : 'opacity-100')} />
                    <div
                      className={clsx(
                        'absolute -top-[1px] left-2.5 h-7 w-0.5 rotate-[35deg] rounded-xl bg-white',
                        isMuted ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </Button>
                </Tooltip>
              </div>
              <div className="flex items-center justify-center text-sm font-semibold">
                <Duration seconds={played} /> / <Duration seconds={duration} />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <Tooltip content={<span className="">Closed Captions</span>}>
                <Button
                  variant="text"
                  className={clsx('rounded-sm border-b-2', showCC ? '' : 'border-transparent')}
                  color="secondary"
                  onClick={handleClosedCaptions}
                >
                  <ClosedCaptionIcon />
                </Button>
              </Tooltip>
              {/* <Tooltip content={<span className="">Full screen</span>}>
                <Button variant="text" color="secondary" onClick={handleFullscreen}>
                  <FullScreenIcon />
                </Button>
              </Tooltip> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

type DurationProps = {
  className?: string;
  seconds: number;
};

export function Duration({ className, seconds }: DurationProps) {
  return (
    <time dateTime={`P${Math.round(seconds)}S`} className={className}>
      {format(seconds)}
    </time>
  );
}

function format(seconds: number) {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = pad(date.getUTCSeconds());
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`;
  }
  return `${mm}:${ss}`;
}

function pad(v: number) {
  return ('0' + v).slice(-2);
}
