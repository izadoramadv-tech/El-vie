import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS} from '../theme';
import {FONT_JOST} from '../fonts';

type Props = {
  /** Frame (relativo a cena) em que a faixa entra, tipo carimbo. */
  appearFrame: number;
  style?: React.CSSProperties;
  /** Cores do selo "NOVO AGORA" - inverta em fundos amarelos p/ manter contraste. */
  sparkBg?: string;
  sparkColor?: string;
};

// Faixa "Mes do Cliente / Condicao exclusiva" - a arte que marca a campanha.
// Entra com efeito de carimbo (squash + overshoot) e nunca fica 100% parada
// (leve brilho pulsante na metade vermelha).
export const RibbonBadge: React.FC<Props> = ({
  appearFrame,
  style,
  sparkBg = COLORS.yellow,
  sparkColor = COLORS.deepBlue,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const stamp = spring({
    frame: frame - appearFrame,
    fps,
    config: {damping: 10, mass: 0.6, stiffness: 200},
  });
  const translateY = interpolate(stamp, [0, 1], [-70, 0]);
  const scaleY = interpolate(stamp, [0, 0.5, 1], [0.6, 1.12, 1]);
  const opacity = interpolate(frame, [appearFrame, appearFrame + 6], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const shine = 0.5 + Math.sin(frame / 12) * 0.25;

  // Selo "NOVO" no canto - reforca que a condicao foi inaugurada agora,
  // nao e uma promocao recorrente. Pulsa e balanca devagar (nunca parado).
  const sparkSpring = spring({
    frame: frame - appearFrame - 8,
    fps,
    config: {damping: 8, mass: 0.5},
  });
  const sparkScale = interpolate(sparkSpring, [0, 1], [0, 1]) * (1 + Math.sin(frame / 10) * 0.06);
  const sparkWobble = Math.sin(frame / 18) * 6;

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        opacity,
        transform: `translateX(-50%) translateY(${translateY}px)`,
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'stretch',
          borderRadius: 999,
          overflow: 'hidden',
          boxShadow: '0 14px 28px rgba(6,17,72,0.35)',
          transform: `scaleY(${scaleY})`,
          fontFamily: FONT_JOST,
        }}
      >
        <div
          style={{
            background: COLORS.deepBlue,
            color: COLORS.white,
            padding: '12px 22px 12px 26px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontWeight: 700,
            fontSize: 24,
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{color: COLORS.yellow}}>&#9733;</span> MÊS DO CLIENTE
        </div>
        <div
          style={{
            position: 'relative',
            background: COLORS.red,
            color: COLORS.white,
            padding: '12px 26px 12px 20px',
            fontWeight: 700,
            fontSize: 24,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          CONDIÇÃO EXCLUSIVA
          <span
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(115deg, transparent 40%, rgba(255,255,255,${shine * 0.35}) 50%, transparent 60%)`,
            }}
          />
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          top: -26,
          right: -28,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: sparkBg,
          color: sparkColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: FONT_JOST,
          fontWeight: 800,
          fontSize: 12.5,
          textAlign: 'center',
          lineHeight: 1.05,
          boxShadow: '0 8px 16px rgba(6,17,72,0.4)',
          border: `2px solid ${sparkColor}`,
          transform: `rotate(${14 + sparkWobble}deg) scale(${sparkScale})`,
        }}
      >
        NOVO
        <br />
        AGORA
      </div>
    </div>
  );
};
