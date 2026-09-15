import React from 'react';
import {interpolate, useCurrentFrame, Easing} from 'remotion';
import {COLORS} from '../theme';

type Props = {
  children: React.ReactNode;
  /** Frame (relativo a cena) em que o marca-texto comeca a ser pintado. */
  paintStartFrame: number;
  /** Duracao da pintura em frames (padrao ~0.35s a 30fps). */
  paintDuration?: number;
  bgColor?: string;
  textColor?: string;
  /** Halo atras do texto p/ garantir contraste antes do fundo terminar de pintar. */
  glow?: string;
  style?: React.CSSProperties;
};

// Marca-texto amarelo (ou invertido) pintado da esquerda para a direita atras
// da palavra-chave, via clip-path animado. E a assinatura grafica do feed.
export const Highlight: React.FC<Props> = ({
  children,
  paintStartFrame,
  paintDuration = 11,
  bgColor = COLORS.yellow,
  textColor = COLORS.blue,
  glow = 'rgba(255,255,255,0.85)',
  style,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(
    frame,
    [paintStartFrame, paintStartFrame + paintDuration],
    [0, 100],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.ease)}
  );

  return (
    <span
      style={{
        position: 'relative',
        display: 'inline-block',
        padding: '0.05em 0.18em',
        color: textColor,
        ...style,
      }}
    >
      <span
        style={{
          position: 'absolute',
          inset: 0,
          background: bgColor,
          clipPath: `inset(0 ${100 - progress}% 0 0)`,
          borderRadius: 6,
        }}
      />
      <span style={{position: 'relative', textShadow: `0 0 10px ${glow}, 0 0 18px ${glow}`}}>
        {children}
      </span>
    </span>
  );
};
