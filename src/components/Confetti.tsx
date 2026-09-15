import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS} from '../theme';

// Hash deterministico (sem Math.random - precisa ser puro por frame para o
// Remotion renderizar fora de ordem sem inconsistencia).
const seeded = (seed: number) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const PIECE_COLORS = [COLORS.cyan, COLORS.yellow, COLORS.red, COLORS.white];

type Props = {
  count?: number;
  opacity?: number;
};

// Confete sutil da campanha "Mes do Cliente" - flutua devagar no fundo,
// atras do conteudo principal. Paleta restrita as cores da marca.
export const Confetti: React.FC<Props> = ({count = 16, opacity = 0.55}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();

  const pieces = Array.from({length: count}).map((_, i) => {
    const baseX = seeded(i) * width;
    const size = 8 + seeded(i + 100) * 10;
    const speed = 0.5 + seeded(i + 200) * 0.4;
    const delay = seeded(i + 300) * 400;
    const sway = 14 + seeded(i + 400) * 16;
    const rotSpeed = (seeded(i + 500) - 0.5) * 3;
    const color = PIECE_COLORS[i % PIECE_COLORS.length];
    const isCircle = i % 3 === 0;

    const travel = (frame * speed + delay) % (height + 120);
    const y = travel - 100;
    const x = baseX + Math.sin(frame / 40 + i) * sway;
    const rotate = frame * rotSpeed;

    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: size,
          height: size,
          background: color,
          opacity,
          borderRadius: isCircle ? '50%' : 3,
          transform: `rotate(${rotate}deg)`,
        }}
      />
    );
  });

  return <AbsoluteFill style={{overflow: 'hidden', pointerEvents: 'none'}}>{pieces}</AbsoluteFill>;
};
