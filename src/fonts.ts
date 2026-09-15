// Fontes hospedadas localmente em public/fonts. Evita fetch de rede durante
// o render (Google Fonts ao vivo nao e confiavel em todo ambiente de CI/
// renderizacao). Carregadas uma unica vez, via FontFace API + delayRender,
// para garantir que nenhum frame seja capturado antes da fonte pronta.
import {continueRender, delayRender, staticFile} from 'remotion';

export const FONT_JOST = 'Jost Local';
export const FONT_ARCHIVO_BLACK = 'Archivo Black Local';

const loadLocalFont = (family: string, file: string, weight: string) => {
  if (typeof FontFace === 'undefined') {
    return;
  }
  const handle = delayRender(`Carregando fonte local ${family}`);
  const face = new FontFace(family, `url(${staticFile(file)})`, {weight});
  face
    .load()
    .then((loaded) => {
      (document.fonts as unknown as {add: (f: FontFace) => void}).add(loaded);
      continueRender(handle);
    })
    .catch((err) => {
      console.error(`Falha ao carregar fonte ${family}:`, err);
      continueRender(handle);
    });
};

loadLocalFont(FONT_JOST, 'fonts/Jost-Variable.woff2', '300 700');
loadLocalFont(FONT_ARCHIVO_BLACK, 'fonts/ArchivoBlack-Regular.woff2', '400');
