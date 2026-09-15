import React from 'react';
import {interpolate, useCurrentFrame, Easing} from 'remotion';

type Props = {
  from?: number;
  to: number;
  startFrame: number;
  duration: number;
  padStart?: number;
  style?: React.CSSProperties;
};

// Numero "rodando" ate o valor final - usado nos centavos do preco e nos
// badges de canais/conteudos, porque e o que prende o olho no feed.
export const CountUp: React.FC<Props> = ({
  from = 0,
  to,
  startFrame,
  duration,
  padStart,
  style,
}) => {
  const frame = useCurrentFrame();
  const raw = interpolate(frame, [startFrame, startFrame + duration], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const value = Math.round(raw);
  const text = padStart ? String(value).padStart(padStart, '0') : String(value);

  return <span style={style}>{text}</span>;
};
