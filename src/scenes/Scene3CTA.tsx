import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {COLORS} from '../theme';
import {FONT_JOST, FONT_ARCHIVO_BLACK} from '../fonts';
import {Highlight} from '../components/Highlight';
import {SafeArea} from '../components/SafeArea';
import {RibbonBadge} from '../components/RibbonBadge';
import {scene3Copy, SLOGAN, HANDLE} from '../copy';
import {SCENE3, SAFE_TOP, SAFE_BOTTOM} from '../timeline';

const SlotDigit: React.FC<{digit: string; settleFrame: number}> = ({digit, settleFrame}) => {
  const frame = useCurrentFrame();
  const spinStart = settleFrame - 9;
  const cycle = 3;
  const inSpin = frame >= spinStart && frame < settleFrame;
  const shown = inSpin
    ? String((Math.floor((frame - spinStart) / cycle) + Number(digit)) % 10)
    : frame < spinStart
    ? '0'
    : digit;

  const tick = spring({frame: frame - settleFrame, fps: 30, config: {damping: 7, mass: 0.4}});
  const scale = frame >= settleFrame ? interpolate(tick, [0, 1], [1.3, 1]) : 1;
  const blur = inSpin ? 2 : 0;

  return (
    <span
      style={{
        display: 'inline-block',
        width: 90,
        textAlign: 'center',
        transform: `scale(${scale})`,
        filter: `blur(${blur}px)`,
      }}
    >
      {shown}
    </span>
  );
};

export const Scene3CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Wipe de entrada: cortina azul-profunda recua de baixo para cima
  const wipeProgress = interpolate(frame, [SCENE3.wipeStart, SCENE3.wipeEnd], [100, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });

  const dateOpacity = interpolate(frame, [SCENE3.dateTextStart, SCENE3.dateTextStart + 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const dateScale = spring({frame: frame - SCENE3.dateTextStart, fps, config: {damping: 12, mass: 0.5}});

  const countdownOpacity = interpolate(
    frame,
    [SCENE3.countdownStart, SCENE3.countdownStart + 8],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );

  const ctaSpringVal = spring({
    frame: frame - SCENE3.ctaStart,
    fps,
    config: {damping: 11, mass: 0.6, stiffness: 130},
  });
  const ctaScale = interpolate(ctaSpringVal, [0, 1], [0.5, 1]);
  const ctaPulse = frame > SCENE3.ctaStart + 18 ? 1 + Math.sin((frame / SCENE3.ctaPulseLoop) * Math.PI * 2) * 0.025 : 1;
  const ctaOpacity = interpolate(frame, [SCENE3.ctaStart, SCENE3.ctaStart + 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const tapT = interpolate(
    frame,
    [SCENE3.fingerTapAt - 4, SCENE3.fingerTapAt, SCENE3.fingerTapAt + 8],
    [0, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );

  const logoOpacity = interpolate(
    frame,
    [SCENE3.logoStart, SCENE3.logoStart + SCENE3.logoScaleDuration],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );
  const logoSpring = spring({frame: frame - SCENE3.logoStart, fps, config: {damping: 13, mass: 0.6}});
  const logoScale = interpolate(logoSpring, [0, 1], [0.7, 1]);

  const sloganOpacity = interpolate(frame, [SCENE3.sloganStart, SCENE3.sloganStart + 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const finePrintOpacity = interpolate(
    frame,
    [SCENE3.finePrintStart, SCENE3.finePrintStart + 8],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );

  const showHero = frame < SCENE3.logoStart + 4;

  return (
    <AbsoluteFill style={{background: COLORS.yellow}}>
      <div
        style={{
          position: 'absolute',
          top: SAFE_TOP + 24,
          right: 32,
          fontFamily: FONT_JOST,
          fontWeight: 500,
          fontSize: 26,
          color: 'rgba(10,28,140,0.55)',
        }}
      >
        {HANDLE}
      </div>

      {showHero && (
        <RibbonBadge
          appearFrame={SCENE3.wipeEnd}
          style={{top: SAFE_TOP + 32}}
          sparkBg={COLORS.deepBlue}
          sparkColor={COLORS.yellow}
        />
      )}

      {showHero && (
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', paddingTop: SAFE_TOP}}>
          <div style={{textAlign: 'center', fontFamily: FONT_JOST}}>
            <div
              style={{
                fontSize: 76,
                fontWeight: 700,
                color: COLORS.blue,
                opacity: dateOpacity,
                transform: `scale(${interpolate(dateScale, [0, 1], [0.85, 1])})`,
              }}
            >
              {scene3Copy.dateLine1}
            </div>
            <div
              style={{
                fontSize: 76,
                fontWeight: 700,
                opacity: dateOpacity,
                transform: `scale(${interpolate(dateScale, [0, 1], [0.85, 1])})`,
                marginTop: 4,
              }}
            >
              <Highlight
                paintStartFrame={SCENE3.dateHighlightStart}
                bgColor={COLORS.blue}
                textColor={COLORS.white}
                glow="rgba(6,17,72,0.55)"
              >
                {scene3Copy.dateHighlightWord}
              </Highlight>
            </div>

            <div
              style={{
                marginTop: 26,
                opacity: countdownOpacity,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  background: COLORS.blue,
                  borderRadius: 18,
                  padding: '18px 26px',
                  overflow: 'hidden',
                }}
              >
                {scene3Copy.countdownDigits.map((d, i) => (
                  <div
                    key={i}
                    style={{
                      fontFamily: FONT_ARCHIVO_BLACK,
                      fontSize: 84,
                      color: COLORS.yellow,
                    }}
                  >
                    <SlotDigit digit={d} settleFrame={SCENE3.countdownStart + 10 + i * 10} />
                  </div>
                ))}
              </div>
              <div
                style={{
                  marginTop: 14,
                  fontFamily: FONT_JOST,
                  fontWeight: 600,
                  fontSize: 26,
                  letterSpacing: 2,
                  color: COLORS.deepBlue,
                }}
              >
                {scene3Copy.countdownLabel}
              </div>
            </div>

            <div style={{marginTop: 30, position: 'relative', display: 'inline-block'}}>
              <div
                style={{
                  opacity: ctaOpacity,
                  transform: `scale(${ctaScale * ctaPulse})`,
                  background: COLORS.blue,
                  borderRadius: 999,
                  padding: '26px 48px',
                  fontFamily: FONT_JOST,
                  fontWeight: 600,
                  fontSize: 34,
                  color: COLORS.white,
                  maxWidth: 760,
                  textAlign: 'center',
                  boxShadow: '0 18px 44px rgba(6,17,72,0.35)',
                }}
              >
                {scene3Copy.ctaText}
              </div>

              {tapT > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    right: 60,
                    bottom: -10,
                    width: 46,
                    height: 46,
                    borderRadius: '50%',
                    background: 'rgba(6,17,72,0.85)',
                    transform: `scale(${interpolate(tapT, [0, 1], [1.4, 0.85])})`,
                    opacity: tapT,
                  }}
                />
              )}
            </div>
          </div>
        </AbsoluteFill>
      )}

      {frame >= SCENE3.logoStart && (
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
          <div style={{textAlign: 'center', opacity: logoOpacity, transform: `scale(${logoScale})`}}>
            <Img src={staticFile('logo-navy.png')} style={{width: 280, height: 'auto'}} />
            <div
              style={{
                marginTop: 28,
                fontFamily: FONT_JOST,
                fontWeight: 600,
                fontSize: 38,
                color: COLORS.blue,
                opacity: sloganOpacity,
              }}
            >
              {SLOGAN}
            </div>
          </div>
        </AbsoluteFill>
      )}

      {frame >= SCENE3.finePrintStart && (
        <AbsoluteFill
          style={{
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingBottom: SAFE_BOTTOM + 30,
            paddingLeft: 64,
            paddingRight: 64,
          }}
        >
          <div
            style={{
              fontFamily: FONT_JOST,
              fontWeight: 400,
              fontSize: 24,
              lineHeight: 1.4,
              color: 'rgba(10,28,140,0.85)',
              textAlign: 'center',
              opacity: finePrintOpacity,
            }}
          >
            {scene3Copy.finePrint}
          </div>
        </AbsoluteFill>
      )}

      {/* Cortina de wipe vertical na entrada da cena */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: `${wipeProgress}%`,
          background: COLORS.deepBlue,
          pointerEvents: 'none',
        }}
      />

      <SafeArea />
    </AbsoluteFill>
  );
};
