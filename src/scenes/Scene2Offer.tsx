import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {COLORS} from '../theme';
import {FONT_JOST, FONT_ARCHIVO_BLACK} from '../fonts';
import {Highlight} from '../components/Highlight';
import {Waves} from '../components/Waves';
import {CountUp} from '../components/CountUp';
import {SafeArea} from '../components/SafeArea';
import {scene2Copy, HANDLE} from '../copy';
import {SCENE2, SAFE_TOP} from '../timeline';

const WifiIcon: React.FC<{size?: number; color?: string}> = ({size = 64, color = COLORS.cyan}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M2 8.5C7 3.8 17 3.8 22 8.5M5.5 12.3C9 9 15 9 18.5 12.3M9 16.1C10.7 14.5 13.3 14.5 15 16.1"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
    />
    <circle cx="12" cy="19.6" r="1.6" fill={color} />
  </svg>
);

const PlayIcon: React.FC<{size?: number; color?: string}> = ({size = 64, color = COLORS.red}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="11" stroke={color} strokeWidth={2} />
    <path d="M10 8.3L16 12L10 15.7V8.3Z" fill={color} />
  </svg>
);

const PriceCard: React.FC<{
  index: number;
  label: string;
  speed: string;
  price: string;
  cents: string;
  featured: boolean;
  startFrame: number;
  recedeStart: number;
  recedeEnd: number;
}> = ({label, speed, price, cents, featured, startFrame, recedeStart, recedeEnd}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const enter = spring({
    frame: frame - startFrame,
    fps,
    config: {damping: 13, mass: 0.7, stiffness: 130},
  });
  const x = interpolate(enter, [0, 1], [520, 0]);

  const landPulse =
    featured &&
    interpolate(frame, [startFrame + 6, startFrame + 12, startFrame + 18], [1, 1.06, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  const recede = interpolate(frame, [recedeStart, recedeEnd], [1, 0.001], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.ease),
  });
  const recedeOpacity = interpolate(frame, [recedeStart, recedeStart + 8], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = (landPulse || 1) * recede;

  return (
    <div
      style={{
        transform: `translateX(${x}px) scale(${scale})`,
        opacity: interpolate(enter, [0, 1], [0, 1]) * recedeOpacity,
        width: 780,
        borderRadius: 22,
        padding: '26px 40px',
        marginBottom: 22,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: featured ? COLORS.yellow : COLORS.white,
        boxShadow: featured
          ? '0 18px 40px rgba(255,226,77,0.35)'
          : '0 14px 34px rgba(6,17,72,0.18)',
      }}
    >
      <div>
        <div style={{fontFamily: FONT_JOST, fontWeight: 600, fontSize: 26, color: COLORS.deepBlue, opacity: 0.7}}>
          {label}
        </div>
        <div style={{fontFamily: FONT_JOST, fontWeight: 700, fontSize: 44, color: COLORS.blue}}>{speed}</div>
      </div>
      <div style={{fontFamily: FONT_ARCHIVO_BLACK, fontSize: 52, color: COLORS.blue, display: 'flex', alignItems: 'baseline'}}>
        <span style={{fontSize: 28, marginRight: 4}}>R$</span>
        {price}
        <span style={{fontSize: 32}}>,</span>
        <CountUp
          to={Number(cents)}
          startFrame={startFrame + 10}
          duration={12}
          padStart={2}
          style={{fontSize: 32}}
        />
      </div>
    </div>
  );
};

const Badge: React.FC<{
  value: number;
  suffix: string;
  label: string;
  startFrame: number;
  duration: number;
  tiltDirection: 1 | -1;
}> = ({value, suffix, label, startFrame, duration, tiltDirection}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame: frame - startFrame, fps, config: {damping: 14, mass: 0.6}});
  const wobble = Math.sin((frame - startFrame) / 20) * 3 * tiltDirection;

  return (
    <div
      style={{
        opacity: enter,
        transform: `scale(${interpolate(enter, [0, 1], [0.7, 1])}) rotate(${wobble}deg)`,
        width: 320,
        height: 320,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.08)',
        border: `2px solid ${COLORS.cyan}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 20px',
      }}
    >
      <div style={{fontFamily: FONT_ARCHIVO_BLACK, fontSize: 76, color: COLORS.yellow, display: 'flex', gap: '0.12em'}}>
        <CountUp to={value} startFrame={startFrame} duration={duration} />
        <span>{suffix.trim()}</span>
      </div>
      <div style={{fontFamily: FONT_JOST, fontWeight: 500, fontSize: 30, color: COLORS.white, marginTop: 8, textAlign: 'center', maxWidth: 240}}>
        {label}
      </div>
    </div>
  );
};

export const Scene2Offer: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [SCENE2.titleStart, SCENE2.titleStart + 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const iconsT = interpolate(frame, [SCENE2.iconsSlideStart, SCENE2.iconsMergeAt], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const wifiX = interpolate(iconsT, [0, 1], [-160, -6]);
  const playX = interpolate(iconsT, [0, 1], [160, 6]);
  const flashOpacity = interpolate(
    frame,
    [SCENE2.flashStart, SCENE2.flashStart + 1, SCENE2.flashEnd],
    [0, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );
  // Onda de choque vermelha que se expande a partir do encaixe dos icones -
  // reforca o "pop" de impacto junto com o flash branco.
  const shockwaveProgress = interpolate(
    frame,
    [SCENE2.flashStart, SCENE2.flashStart + 10],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)}
  );
  const shockwaveOpacity = interpolate(shockwaveProgress, [0, 0.15, 1], [0, 0.9, 0]);

  const highlightOvershoot = spring({
    frame: frame - SCENE2.titleStart - 4,
    fps: 30,
    config: {damping: 7, mass: 0.6, stiffness: 180},
  });
  const highlightScale = interpolate(highlightOvershoot, [0, 1], [0.3, 1]);
  // Respiracao continua + brilho pulsante no SKY+ depois que ele assenta -
  // e o elemento mais "quente" da cena, precisa nunca ficar parado.
  const skyPulse = 1 + Math.sin(frame / 14) * 0.035;
  const skyGlow = 24 + Math.sin(frame / 14) * 10;

  const cardsBlockOpacity = interpolate(
    frame,
    [SCENE2.cardsStart, SCENE2.cardsStart + 6, SCENE2.cardsRecedeStart, SCENE2.cardsRecedeEnd],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );

  const badgesBlockOpacity = interpolate(
    frame,
    [SCENE2.badgesStart, SCENE2.badgesStart + 8, SCENE2.badgesEnd - 10, SCENE2.badgesEnd],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );

  const reinforceOpacity = interpolate(
    frame,
    [SCENE2.reinforceStart, SCENE2.reinforceStart + 10],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );
  const reinforceY = interpolate(frame, [SCENE2.reinforceStart, SCENE2.reinforceStart + 10], [24, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  const cardStarts = [SCENE2.card1Start, SCENE2.card2Start, SCENE2.card3Start];

  return (
    <AbsoluteFill style={{background: COLORS.blue}}>
      <Waves />

      <div
        style={{
          position: 'absolute',
          top: SAFE_TOP + 24,
          right: 32,
          fontFamily: FONT_JOST,
          fontWeight: 500,
          fontSize: 26,
          color: 'rgba(255,255,255,0.6)',
        }}
      >
        {HANDLE}
      </div>

      {frame < SCENE2.cardsRecedeEnd && (
        <AbsoluteFill style={{alignItems: 'center', paddingTop: SAFE_TOP + 70, opacity: titleOpacity}}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              fontFamily: FONT_JOST,
              fontWeight: 700,
              fontSize: 68,
              color: COLORS.white,
            }}
          >
            <span>{scene2Copy.titlePrefix}</span>
            <span style={{position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 10}}>
              <span style={{transform: `translateX(${wifiX}px)`}}>
                <WifiIcon size={58} />
              </span>
              <span
                style={{
                  color: COLORS.red,
                  fontSize: 108,
                  fontWeight: 800,
                  letterSpacing: -1,
                  display: 'inline-block',
                  transform: `scale(${highlightScale * skyPulse})`,
                  textShadow: `0 0 ${skyGlow}px rgba(255,59,59,0.75), 0 4px 18px rgba(255,59,59,0.4)`,
                }}
              >
                {scene2Copy.titleHighlight}
              </span>
              <span style={{transform: `translateX(${playX}px)`}}>
                <PlayIcon size={58} />
              </span>
              {shockwaveOpacity > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: 40,
                    height: 40,
                    marginLeft: -20,
                    marginTop: -20,
                    borderRadius: '50%',
                    border: `3px solid ${COLORS.red}`,
                    opacity: shockwaveOpacity,
                    transform: `scale(${1 + shockwaveProgress * 7})`,
                  }}
                />
              )}
              {flashOpacity > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    inset: -28,
                    background: COLORS.white,
                    opacity: flashOpacity,
                    borderRadius: 24,
                  }}
                />
              )}
            </span>
          </div>
          <div style={{fontFamily: FONT_JOST, fontWeight: 700, fontSize: 68, color: COLORS.white}}>
            {scene2Copy.titleSuffix}
          </div>
        </AbsoluteFill>
      )}

      <AbsoluteFill
        style={{alignItems: 'center', justifyContent: 'center', opacity: cardsBlockOpacity}}
      >
        <div>
          {scene2Copy.cards.map((card, i) => (
            <PriceCard
              key={card.label}
              index={i}
              label={card.label}
              speed={card.speed}
              price={card.price}
              cents={card.cents}
              featured={card.featured}
              startFrame={cardStarts[i]}
              recedeStart={SCENE2.cardsRecedeStart}
              recedeEnd={SCENE2.cardsRecedeEnd}
            />
          ))}
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{alignItems: 'center', justifyContent: 'center', opacity: badgesBlockOpacity}}
      >
        <div style={{display: 'flex'}}>
          <Badge
            value={scene2Copy.badges[0].value}
            suffix={scene2Copy.badges[0].suffix}
            label={scene2Copy.badges[0].label}
            startFrame={SCENE2.badge1Start}
            duration={SCENE2.badgeCountUpDuration}
            tiltDirection={1}
          />
          <Badge
            value={scene2Copy.badges[1].value}
            suffix={scene2Copy.badges[1].suffix}
            label={scene2Copy.badges[1].label}
            startFrame={SCENE2.badge2Start}
            duration={SCENE2.badgeCountUpDuration}
            tiltDirection={-1}
          />
        </div>
      </AbsoluteFill>

      {frame >= SCENE2.reinforceStart && (
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 560}}>
          <div
            style={{
              fontFamily: FONT_JOST,
              fontWeight: 600,
              fontSize: 44,
              color: COLORS.white,
              opacity: reinforceOpacity,
              transform: `translateY(${reinforceY}px)`,
              textAlign: 'center',
            }}
          >
            Sem antena e{' '}
            <Highlight
              paintStartFrame={SCENE2.reinforceHighlightStart}
              bgColor={COLORS.yellow}
              textColor={COLORS.blue}
            >
              {scene2Copy.reinforceHighlightWord}
            </Highlight>
          </div>
        </AbsoluteFill>
      )}

      <SafeArea />
    </AbsoluteFill>
  );
};
