# Elévie+ — Reels "Mês do Cliente"

Vídeo vertical animado de 18s (1080×1920, 30fps) para o Reels da Elévie+, feito em
[Remotion](https://www.remotion.dev) (React + TypeScript).

## Estrutura

```
src/
  timeline.ts        # todas as constantes de tempo (em frames) das 3 cenas
  copy.ts             # todos os textos: titulos, precos, legendas, letra miuda
  theme.ts            # paleta de cores oficial
  fonts.ts            # Jost + Archivo Black (self-hosted em public/fonts)
  Root.tsx            # registro da composicao MainVideo
  MainVideo.tsx        # timeline mestre: encadeia as 3 cenas + audio + legendas
  components/
    SafeArea.tsx      # guia visual das areas seguras do Reels (so em modo dev)
    Caption.tsx       # legenda queimada, terco inferior
    Highlight.tsx     # marca-texto amarelo animado
    Waves.tsx         # ondas concentricas de fundo (cena 2)
    CountUp.tsx       # numero "rodando" (centavos, badges)
  scenes/
    Scene1Hook.tsx    # 0-5s  — gancho
    Scene2Offer.tsx   # 5-12s — oferta (combos + SKY+)
    Scene3CTA.tsx     # 12-18s — chamada para acao + letra miuda
public/
  narracao.mp3        # narracao sintetica pt-BR (voz mbrola-br1), 18s - troque pela locucao humana quando gravar
  logo-navy.png        # logo real Elevie+, fundo transparente (usada no frame final)
  logo-white.png        # idem, versao clara para fundos escuros
  fonts/                # Jost + Archivo Black, hospedadas localmente
```

## Como rodar (preview)

```bash
npm install
npm start
```

Abre o Remotion Studio com o preview ao vivo da composicao `MainVideo`.

Para ver as faixas vermelhas das areas seguras do Instagram (250px topo / 420px
base) enquanto edita:

```bash
REMOTION_SHOW_SAFE_AREA=1 npm start
```

## Sobre a narração atual

`public/narracao.mp3` já tem uma narração sintética em pt-BR (voz `mbrola-br1`,
gerada com `espeak-ng`, offline — o ambiente de build não tem acesso a APIs de
TTS premium tipo Google/Microsoft/ElevenLabs). É robótica, serve como guia de
ritmo e placeholder, não como voz final de produção.

## Como trocar a narração

1. Grave a locução (ver os textos exatos em `src/copy.ts`, nos objetos
   `scene1Copy`, `scene2Copy`, `scene3Copy` — e no comentário com o roteiro
   completo acima do array `captions`).
2. Substitua o arquivo `public/narracao.mp3` pelo áudio real, mantendo o nome
   do arquivo (ou ajuste o `src` em `src/MainVideo.tsx`).
3. Se a duração da locução não bater exatamente com os 18s, ajuste os tempos
   em `src/timeline.ts` (todos os cortes de cena e o array `captions` em
   `src/copy.ts` dependem dessas constantes).

## Como exportar

**MP4 final (1080×1920):**

```bash
npm run build
# gera out/elevie-mes-do-cliente.mp4
```

**Frame final como PNG (capa do Reels):**

```bash
npm run still
# gera out/capa.png (frame 539, ja congelado com logo + slogan)
```

> Nota de ambiente: em contêineres sem acesso a `remotion.media` (download do
> Chrome Headless Shell), aponte o Remotion para um Chromium já instalado:
> `REMOTION_BROWSER_EXECUTABLE=/caminho/para/headless_shell npx remotion render ...`
> (não é necessário na maioria das máquinas locais — o Remotion baixa o
> browser sozinho no primeiro uso).

## Ajustando a oferta

Todos os números (velocidades, preços, canais, catálogo, data de validade,
slogan, perfil) estão em `src/copy.ts`. Nenhum valor está hardcoded nas cenas.

## Ajustando tempos e ritmo

Todas as durações, atrasos e curvas estão nomeados em `src/timeline.ts`
(`SCENE1`, `SCENE2`, `SCENE3` + constantes globais). Mudar um número lá
propaga para a cena correspondente sem precisar caçar frames no código.
