import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {COLORS} from '../theme';
import {FONT_JOST} from '../fonts';
import {Highlight} from '../components/Highlight';
import {SafeArea} from '../components/SafeArea';
import {scene1Copy, HANDLE} from '../copy';
import {SCENE1, SAFE_TOP} from '../timeline';

const InvoicePaper: React.FC<{
  side: 'left' | 'right';
  fallStart: number;
  fallEnd: number;
  shakeStart: number;
  shakeEnd: number;
  struckThrough: boolean;
  strikeStart: number;
  strikeEnd: number;
}> = ({side, fallStart, fallEnd, shakeStart, shakeEnd, struckThrough, strikeStart, strikeEnd}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const baseRotation = side === 'left' ? -8 : 10;

  const fall = spring({
    frame: frame - fallStart,
    fps,
    config: {damping: 11, mass: 0.6, stiffness: 140},
    durationInFrames: fallEnd - fallStart + 6,
  });
  const y = interpolate(fall, [0, 1], [-700, side === 'left' ? 430 : 470]);
  const rotate = interpolate(fall, [0, 1], [baseRotation * 2.4, baseRotation]);

  let shakeX = 0;
  if (frame >= shakeStart && frame <= shakeEnd) {
    const t = (frame - shakeStart) / (shakeEnd - shakeStart);
    shakeX = Math.sin(t * Math.PI * 7) * 10 * (1 - t);
  }

  const strikeProgress = interpolate(frame, [strikeStart, strikeEnd], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.ease),
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: side === 'left' ? 90 : undefined,
        right: side === 'right' ? 90 : undefined,
        width: 380,
        height: 480,
        transform: `translateY(${y}px) translateX(${shakeX}px) rotate(${rotate}deg)`,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          background: COLORS.white,
          borderRadius: 14,
          boxShadow: '0 24px 50px rgba(6,17,72,0.28)',
          padding: 28,
          position: 'relative',
        }}
      >
        <div style={{width: '60%', height: 22, background: COLORS.blue, borderRadius: 4, opacity: 0.85}} />
        <div style={{marginTop: 26, width: '90%', height: 12, background: '#D7E0F5', borderRadius: 3}} />
        <div style={{marginTop: 12, width: '75%', height: 12, background: '#D7E0F5', borderRadius: 3}} />
        <div style={{marginTop: 12, width: '82%', height: 12, background: '#D7E0F5', borderRadius: 3}} />
        <div style={{marginTop: 40, width: '50%', height: 34, background: COLORS.ice, borderRadius: 6}} />

        {struckThrough && (
          <svg
            viewBox="0 0 380 480"
            style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}}
          >
            <line
              x1={30}
              y1={40}
              x2={350}
              y2={440}
              stroke={COLORS.yellow}
              strokeWidth={16}
              strokeLinecap="round"
              strokeDasharray={560}
              strokeDashoffset={560 * (1 - strikeProgress)}
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();

  const word1Progress = spring({
    frame: frame - SCENE1.titleWord1Start,
    fps: 30,
    config: {damping: 12, mass: 0.5},
  });
  const word2Progress = spring({
    frame: frame - SCENE1.titleWord2Start,
    fps: 30,
    config: {damping: 12, mass: 0.5},
  });

  const word1Scale = interpolate(word1Progress, [0, 1], [1.08, 1]);
  const word1Opacity = interpolate(frame, [SCENE1.titleWord1Start, SCENE1.titleWord1Start + 6], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const word2Scale = interpolate(word2Progress, [0, 1], [1.08, 1]);
  const word2Opacity = interpolate(frame, [SCENE1.titleWord2Start, SCENE1.titleWord2Start + 6], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const subtitleOpacity = interpolate(
    frame,
    [SCENE1.subtitleStart, SCENE1.subtitleSettled, SCENE1.subtitleEnd, SCENE1.subtitleEnd + 15],
    [0, 1, 1, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );
  const subtitleY = interpolate(frame, [SCENE1.subtitleStart, SCENE1.subtitleSettled], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  // Colapso final para o centro
  const collapseProgress = interpolate(frame, [SCENE1.collapseStart, SCENE1.transitionCircleEnd], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.ease),
  });
  const contentScale = interpolate(collapseProgress, [0, 1], [1, 0.72]);
  const contentOpacity = interpolate(collapseProgress, [0, 0.8, 1], [1, 0.4, 0]);

  // Transicao: circulo amarelo expandindo ate cobrir a tela - corte com forma
  const circleProgress = interpolate(
    frame,
    [SCENE1.transitionCircleStart, SCENE1.transitionCircleEnd],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.cubic)}
  );
  const circleRadius = interpolate(circleProgress, [0, 1], [0, 150]);

  // fundo sutil sempre em leve movimento (regra: nada fica parado > 1.5s)
  const bgDrift = Math.sin(frame / 40) * 8;

  return (
    <AbsoluteFill style={{background: COLORS.ice}}>
      <div
        style={{
          position: 'absolute',
          top: -200 + bgDrift,
          left: -150,
          width: 900,
          height: 900,
          borderRadius: '50%',
          background:
            'repeating-radial-gradient(circle at center, rgba(10,28,140,0.05) 0px, rgba(10,28,140,0.05) 2px, transparent 2px, transparent 46px)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: SAFE_TOP + 24,
          right: 32,
          fontFamily: FONT_JOST,
          fontWeight: 500,
          fontSize: 26,
          color: 'rgba(10,28,140,0.45)',
        }}
      >
        {HANDLE}
      </div>

      <AbsoluteFill
        style={{
          transform: `scale(${contentScale})`,
          opacity: contentOpacity,
        }}
      >
        <InvoicePaper
          side="left"
          fallStart={SCENE1.invoicesFallStart}
          fallEnd={SCENE1.invoicesFallEnd}
          shakeStart={SCENE1.shakeStart}
          shakeEnd={SCENE1.shakeEnd}
          struckThrough
          strikeStart={SCENE1.strikeStart}
          strikeEnd={SCENE1.strikeEnd}
        />
        <InvoicePaper
          side="right"
          fallStart={SCENE1.invoicesFallStart + 2}
          fallEnd={SCENE1.invoicesFallEnd + 2}
          shakeStart={SCENE1.shakeStart}
          shakeEnd={SCENE1.shakeEnd}
          struckThrough={false}
          strikeStart={SCENE1.strikeStart}
          strikeEnd={SCENE1.strikeEnd}
        />

        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', paddingTop: SAFE_TOP}}>
          <div style={{textAlign: 'center', fontFamily: FONT_JOST}}>
            <div
              style={{
                fontSize: 84,
                fontWeight: 700,
                color: COLORS.blue,
                lineHeight: 1.08,
                transform: `scale(${word1Scale})`,
                opacity: word1Opacity,
              }}
            >
              {scene1Copy.titleLine1}
            </div>
            <div
              style={{
                fontSize: 84,
                fontWeight: 700,
                lineHeight: 1.08,
                transform: `scale(${word2Scale})`,
                opacity: word2Opacity,
                marginTop: 6,
              }}
            >
              <Highlight paintStartFrame={SCENE1.highlightPaintStart} paintDuration={11}>
                {scene1Copy.titleLine2}
              </Highlight>
            </div>

            <div
              style={{
                marginTop: 48,
                fontSize: 40,
                fontWeight: 400,
                color: COLORS.deepBlue,
                opacity: subtitleOpacity,
                transform: `translateY(${subtitleY}px)`,
              }}
            >
              {scene1Copy.subtitle}
            </div>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>

      {circleProgress > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '1px',
            height: '1px',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${circleRadius * 20}px`,
              height: `${circleRadius * 20}px`,
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              background: COLORS.yellow,
            }}
          />
        </div>
      )}

      <SafeArea />
    </AbsoluteFill>
  );
};
