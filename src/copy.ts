// Todos os textos do video em um so lugar - reescreva aqui sem caçar strings pelo codigo.

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
  reinforceLine1: 'Sem antena',
  reinforceLine2: 'e sem furação.',
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
// Roteiro de referencia (sem audio nem legenda queimada no corte atual -
// util se um dia voltar a gravar locucao):
// "Se voce paga internet e TV separado, presta atencao nos proximos dez segundos."
// "No combo voce leva internet e TV na mesma conta, a partir de cento e vinte e
//  quatro e noventa e nove por mes. Com dezessete canais ao vivo e tres mil
//  conteudos no catalogo. Sem antena e sem furacao."
// "Comenta COMBO que a gente te chama. A oferta vai ate trinta de setembro."
// ============================================================
