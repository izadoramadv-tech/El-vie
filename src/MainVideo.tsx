import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {Scene1Hook} from './scenes/Scene1Hook';
import {Scene2Offer} from './scenes/Scene2Offer';
import {Scene3CTA} from './scenes/Scene3CTA';
import {SCENE_1_START, SCENE_1_DURATION, SCENE_2_START, SCENE_2_DURATION, SCENE_3_START, SCENE_3_DURATION} from './timeline';

// Timeline mestre - cada cena e um Sequence isolado (a cena so conhece o
// proprio frame relativo, ver src/timeline.ts). Sem audio e sem legenda
// queimada - so o visual.
export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#000'}}>
      <Sequence from={SCENE_1_START} durationInFrames={SCENE_1_DURATION} name="Cena 1 - Gancho">
        <Scene1Hook />
      </Sequence>
      <Sequence from={SCENE_2_START} durationInFrames={SCENE_2_DURATION} name="Cena 2 - Oferta">
        <Scene2Offer />
      </Sequence>
      <Sequence from={SCENE_3_START} durationInFrames={SCENE_3_DURATION} name="Cena 3 - Chamada">
        <Scene3CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
