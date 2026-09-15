import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';

type Props = {
  color?: string;
  opacity?: number;
};

// Ondas concentricas de fundo - a "onda de sinal" da marca. Nunca para de
// se mover: gira devagar e pulsa a escala continuamente.
export const Waves: React.FC<Props> = ({color = 'rgba(63,200,245,0.35)', opacity = 1}) => {
  const frame = useCurrentFrame();
  const rotation = (frame / 30) * 4; // graus, giro lento continuo
  const pulse = 1 + Math.sin(frame / 45) * 0.04;

  return (
    <AbsoluteFill style={{overflow: 'hidden', opacity}}>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 2400,
          height: 2400,
          transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${pulse})`,
          borderRadius: '50%',
          backgroundImage: `repeating-radial-gradient(circle at center, ${color} 0px, ${color} 3px, transparent 3px, transparent 64px)`,
        }}
      />
    </AbsoluteFill>
  );
};
