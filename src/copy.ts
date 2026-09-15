// Todos os textos do video em um so lugar - reescreva aqui sem caçar strings pelo codigo.
import {SCENE_2_START, SCENE_3_START} from './timeline';

export const HANDLE = '@eleviemais';

export const SLOGAN = 'Conecte-se ao que eleva a sua vida.';

// ============================================================
// CENA 1 - GANCHO
// ============================================================
export const scene1Copy = {
  titleLine1: 'Para de pagar',
  titleLine2: 'duas contas.',
  titleHighlightWord: 'duas contas.',
  subtitle: 'Internet de um lado, TV do outro.',
};

// ============================================================
// CENA 2 - OFERTA
// ============================================================
export const scene2Copy = {
  titlePrefix: 'Fibra',
  titleHighlight: '+ SKY+',
  titleSuffix: 'juntos.',
  cards: [
    {label: 'Fibra', speed: '500 Mega', price: '124', cents: '99', featured: false},
    {label: 'Max', speed: '600 Mega', price: '134', cents: '99', featured: false},
    {label: 'Turbo', speed: '700 Mega', price: '144', cents: '99', featured: true},
  ],
  badges: [
    {value: 17, suffix: '', label: 'canais ao vivo'},
    {value: 3, suffix: ' mil', label: 'conteúdos'},
  ],
  reinforceText: 'Sem antena e sem furação.',
  reinforceHighlightWord: 'sem furação.',
};

// ============================================================
// CENA 3 - CHAMADA
// ============================================================
export const scene3Copy = {
  dateLine1: 'Só até',
  dateLine2: '30 de setembro.',
  dateHighlightWord: '30 de setembro.',
  countdownDigits: ['0', '1', '5'],
  countdownLabel: 'DIAS PARA APROVEITAR',
  ctaText: 'Comenta COMBO ou chama no link da bio',
  finePrint:
    'Oferta válida até 30/09/2026 para novos contratos na área de cobertura, sujeita a viabilidade ' +
    'técnica e análise de crédito. Valores mensais com impostos inclusos. Velocidade de download ' +
    'conforme Res. Anatel nº 574/2011. SKY+ Light é serviço de streaming entregue por aplicativo. ' +
    'Condições completas no link da bio.',
};

// ============================================================
// LEGENDAS QUEIMADAS - sincronizadas com a locucao
// Frames absolutos (30fps, video de 540 frames / 18s)
// Locucao completa:
// "Se voce paga internet e TV separado, presta atencao nos proximos dez segundos."
// "No combo voce leva internet e TV na mesma conta, a partir de cento e vinte e
//  quatro e noventa e nove por mes. Com dezessete canais ao vivo e tres mil
//  conteudos no catalogo. Sem antena e sem furacao."
// "Comenta COMBO que a gente te chama. A oferta vai ate trinta de setembro."
// ============================================================
export type CaptionBlock = {text: string; start: number; end: number};

export const captions: CaptionBlock[] = [
  // Cena 1
  {text: 'Se você paga', start: 12, end: 36},
  {text: 'internet e TV separado,', start: 36, end: 66},
  {text: 'presta atenção nos', start: 66, end: 96},
  {text: 'próximos dez segundos.', start: 96, end: 150},

  // Cena 2 (comeca em SCENE_2_START = 150)
  {text: 'No combo você leva', start: SCENE_2_START + 8, end: SCENE_2_START + 34},
  {text: 'internet e TV', start: SCENE_2_START + 34, end: SCENE_2_START + 56},
  {text: 'na mesma conta,', start: SCENE_2_START + 56, end: SCENE_2_START + 78},
  {text: 'a partir de R$ 124,99', start: SCENE_2_START + 78, end: SCENE_2_START + 108},
  {text: 'por mês.', start: SCENE_2_START + 108, end: SCENE_2_START + 122},
  {text: 'Com 17 canais ao vivo', start: SCENE_2_START + 122, end: SCENE_2_START + 154},
  {text: 'e 3 mil conteúdos', start: SCENE_2_START + 154, end: SCENE_2_START + 184},
  {text: 'no catálogo.', start: SCENE_2_START + 184, end: SCENE_2_START + 198},
  {text: 'Sem antena e sem furação.', start: SCENE_2_START + 198, end: SCENE_2_START + 210},

  // Cena 3 (comeca em SCENE_3_START = 360)
  {text: 'Comenta COMBO', start: SCENE_3_START + 6, end: SCENE_3_START + 40},
  {text: 'que a gente te chama.', start: SCENE_3_START + 40, end: SCENE_3_START + 80},
  {text: 'A oferta vai até', start: SCENE_3_START + 80, end: SCENE_3_START + 118},
  {text: 'trinta de setembro.', start: SCENE_3_START + 118, end: SCENE_3_START + 150},
  // Sem legenda apos este ponto: o logo + slogan em tela ja repetem a
  // mensagem como grafismo, e a letra miuda (exigencia legal) precisa do
  // terco inferior livre nos ultimos frames.
];
