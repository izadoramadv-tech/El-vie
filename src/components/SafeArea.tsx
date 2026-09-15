import React from 'react';
import {AbsoluteFill} from 'remotion';
import {SAFE_TOP, SAFE_BOTTOM} from '../timeline';

// Marca em modo dev as faixas do topo/base cobertas pela UI do Reels.
// Ative com REMOTION_SHOW_SAFE_AREA=1 (ver package.json / README).
const SHOW_GUIDES = process.env.REMOTION_SHOW_SAFE_AREA === '1';

export const SafeArea: React.FC = () => {
  if (!SHOW_GUIDES) {
    return null;
  }

  const guideStyle: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    right: 0,
    border: '2px dashed rgba(255,0,0,0.8)',
    background: 'rgba(255,0,0,0.12)',
    pointerEvents: 'none',
    zIndex: 9999,
  };

  return (
    <AbsoluteFill>
      <div style={{...guideStyle, top: 0, height: SAFE_TOP}} />
      <div style={{...guideStyle, bottom: 0, height: SAFE_BOTTOM}} />
    </AbsoluteFill>
  );
};
