// Todas as constantes de tempo do video, em frames (30fps).
// Ajuste os numeros aqui - nenhuma cena hardcoda seus proprios tempos.

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

const s = (seconds: number) => Math.round(seconds * FPS);

// --- Duracao das 3 cenas (segundos) ---
export const SCENE_1_DURATION = s(5.0); // Gancho
export const SCENE_2_DURATION = s(7.0); // Oferta (5s -> 12s)
export const SCENE_3_DURATION = s(6.0); // Chamada (12s -> 18s)

export const TOTAL_DURATION =
  SCENE_1_DURATION + SCENE_2_DURATION + SCENE_3_DURATION; // 540 frames = 18s

// Frame absoluto em que cada cena comeca na composicao mestre
export const SCENE_1_START = 0;
export const SCENE_2_START = SCENE_1_START + SCENE_1_DURATION; // 150
export const SCENE_3_START = SCENE_2_START + SCENE_2_DURATION; // 360

// ============================================================
// CENA 1 - GANCHO (relativo ao inicio da cena)
// ============================================================
export const SCENE1 = {
  invoicesFallStart: s(0.0),
  invoicesFallEnd: s(0.4),
  titleWord1Start: s(0.4),
  titleWord1End: s(0.75),
  titleWord2Start: s(0.75),
  titleWord2End: s(1.2),
  highlightPaintStart: s(0.85),
  highlightPaintDuration: s(0.35),
  shakeStart: s(1.2),
  shakeEnd: s(1.5),
  strikeStart: s(1.5),
  strikeEnd: s(2.0),
  subtitleStart: s(2.0),
  subtitleSettled: s(2.5),
  subtitleEnd: s(4.2),
  collapseStart: s(4.2),
  transitionCircleStart: s(4.3),
  transitionCircleEnd: s(5.0),
};

// ============================================================
// CENA 2 - OFERTA (relativo ao inicio da cena)
// ============================================================
const CARD_STAGGER = s(0.35);
const CARD_ENTER_DURATION = s(0.5);

export const SCENE2 = {
  titleStart: s(0.0),
  titleEnd: s(0.6),
  iconsSlideStart: s(0.0),
  iconsMergeAt: s(0.45),
  flashStart: s(0.45),
  flashEnd: s(0.45) + 2, // 2 frames de flash branco no encaixe

  cardsStart: s(0.6),
  cardStagger: CARD_STAGGER,
  cardEnterDuration: CARD_ENTER_DURATION,
  card1Start: s(0.6),
  card2Start: s(0.6) + CARD_STAGGER,
  card3Start: s(0.6) + CARD_STAGGER * 2,
  centsCountUpDuration: s(0.4),
  cardsHoldEnd: s(3.6), // 8.6s absoluto

  cardsRecedeStart: s(3.6),
  cardsRecedeEnd: s(4.0),
  badgesStart: s(3.6),
  badge1Start: s(3.7),
  badge2Start: s(3.95),
  badgeCountUpDuration: s(0.6),
  badgesEnd: s(5.4), // 10.4s absoluto

  // Beat final da cena - "sem antena e sem furacao" ganha o centro da tela
  // com foco total (mais tempo de tela do que os outros beats do 1s).
  reinforceStart: s(5.4),
  reinforcePopAt: s(5.55),
  reinforceHighlight1Start: s(5.75),
  reinforceHighlight2Start: s(6.15),
  reinforceEnd: s(7.0),
};

// ============================================================
// CENA 3 - CHAMADA (relativo ao inicio da cena)
// ============================================================
export const SCENE3 = {
  wipeStart: s(0.0),
  wipeEnd: s(0.6),
  dateTextStart: s(0.6),
  dateHighlightStart: s(0.9),
  dateTextEnd: s(1.6),
  countdownStart: s(1.6),
  countdownSlotDuration: s(0.35), // por digito
  countdownEnd: s(3.0),
  ctaStart: s(3.0),
  ctaSpringDuration: s(0.5),
  ctaPulseLoop: s(1.2), // periodo do pulso continuo
  fingerTapAt: s(4.0),
  ctaEnd: s(4.6),
  logoStart: s(4.6),
  logoScaleDuration: s(0.6),
  sloganStart: s(5.0),
  freezeAt: s(5.4), // ultimo trecho fica estatico, serve de capa
  finePrintStart: s(5.6), // letra miuda so aparece nos ultimos frames
};

// Areas seguras do Instagram Reels (px, em 1080x1920)
export const SAFE_TOP = 250;
export const SAFE_BOTTOM = 420;

// Curvas de easing reutilizaveis
export const EASE_OUT_ENTER: [number, number, number, number] = [
  0.2, 0.9, 0.2, 1,
];
