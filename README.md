# Elévie+ — Reels "Mês do Cliente"

Vídeo vertical animado de 18s (1080×1920, 30fps) para o Reels da Elévie+, feito em
[Remotion](https://www.remotion.dev) (React + TypeScript). Sem áudio e sem
legenda queimada — só o visual.

## Estrutura

```
src/
  timeline.ts        # todas as constantes de tempo (em frames) das 3 cenas
  copy.ts             # todos os textos: titulos, precos, letra miuda
  theme.ts            # paleta de cores oficial
  fonts.ts            # Jost + Archivo Black (self-hosted em public/fonts)
  Root.tsx            # registro da composicao MainVideo
  MainVideo.tsx        # timeline mestre: encadeia as 3 cenas
  components/
    SafeArea.tsx      # guia visual das areas seguras do Reels (so em modo dev)
    Highlight.tsx     # marca-texto amarelo animado
    Waves.tsx         # ondas concentricas de fundo (cena 2)
    Confetti.tsx      # particulas sutis nas cores da marca (cena 2)
    RibbonBadge.tsx   # faixa "Mes do Cliente / Condicao Exclusiva"
    CountUp.tsx       # numero "rodando" (centavos, badges)
  scenes/
    Scene1Hook.tsx    # 0-5s  — gancho
    Scene2Offer.tsx   # 5-12s — oferta (combos + SKY+)
    Scene3CTA.tsx     # 12-18s — chamada para acao + letra miuda
public/
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

## Adicionando narração (opcional)

O corte atual é mudo, de propósito. Para adicionar áudio depois:

1. Coloque o arquivo em `public/` (ex: `narracao.mp3`).
2. Importe `Audio` e `staticFile` de `remotion` em `src/MainVideo.tsx` e
   renderize `<Audio src={staticFile('narracao.mp3')} />` dentro do
   `AbsoluteFill`. O roteiro de referência (texto que cada cena cobre) está
   comentado em `src/copy.ts`.
3. Se a locução não bater exatamente com os 18s, ajuste os tempos em
   `src/timeline.ts` (todos os cortes de cena dependem dessas constantes).

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
