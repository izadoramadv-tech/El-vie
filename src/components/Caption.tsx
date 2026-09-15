import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {captions} from '../copy';
import {FONT_JOST} from '../fonts';
import {SAFE_BOTTOM} from '../timeline';

// Legenda queimada no terco inferior, dentro da area segura. Le o frame
// absoluto da composicao mestre (este componente deve ser montado uma unica
// vez, fora dos Sequence de cada cena, para ter acesso ao frame global).
export const Caption: React.FC = () => {
  const frame = useCurrentFrame();
  const active = captions.find((c) => frame >= c.start && frame < c.end);

  if (!active) {
    return null;
  }

  const fadeIn = interpolate(frame, [active.start, active.start + 4], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(frame, [active.end - 4, active.end], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: SAFE_BOTTOM + 20,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          maxWidth: '86%',
          textAlign: 'center',
          fontFamily: FONT_JOST,
          fontWeight: 600,
          fontSize: 44,
          lineHeight: 1.25,
          color: '#FFFFFF',
          textShadow: '0 2px 10px rgba(0,0,0,0.55), 0 0 4px rgba(0,0,0,0.35)',
          opacity,
        }}
      >
        {active.text}
      </div>
    </AbsoluteFill>
  );
};
