import React from 'react';
import {Composition} from 'remotion';
import {MainVideo} from './MainVideo';
import {FPS, WIDTH, HEIGHT, TOTAL_DURATION} from './timeline';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="MainVideo"
        component={MainVideo}
        durationInFrames={TOTAL_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
