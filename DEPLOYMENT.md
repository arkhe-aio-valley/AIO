# Deploy do AIO

Destino: `https://brasildesconto.com.br`

A publicação usa **Cloudflare Workers Static Assets** no Worker conectado `aio` e uma **Workers Route** sobre o hostname existente.

## Por que Route e não Custom Domain

`brasildesconto.com.br` já possui registros DNS. Um Custom Domain tenta criar/assumir o DNS do hostname e entra em conflito com esses registros. A Workers Route preserva o DNS existente e executa o Worker para `brasildesconto.com.br/*`.

O registro DNS do hostname deve permanecer **proxied pela Cloudflare** (orange cloud) para a Route receber tráfego.

## Consistência com Workers Builds

O projeto conectado no Cloudflare Workers Builds se chama `aio`. O campo `name` de `wrangler.jsonc` deve permanecer igual a `aio`; divergências fazem o CI sobrescrever o nome e podem provocar deploy parcial.

## Superfície pública verificável

A produção expõe `/.well-known/arkhe-health.json` como contrato público mínimo de saúde. O endpoint deve declarar `ARKHE | AIO`, ambiente `production`, host canônico `brasildesconto.com.br` e fonte `arkhe-aio-valley/AIO`.

O script `scripts/validate-public-surface.mjs` bloqueia deploy quando o `public/index.html` perde o título canônico, reintroduz o identificador legado `tmp-valley`, ou quando o contrato de saúde estiver ausente ou divergente.

## Pré-requisitos de ambiente

A autenticação deve existir fora do Git, por exemplo via sessão do Wrangler ou variáveis protegidas do ambiente. Nenhum token, Account ID ou Zone ID deve ser gravado neste repositório.

## Validação e deploy

```bash
npm ci
npm run check
npm run deploy
```

`npm run check` valida os invariantes da configuração de produção, a superfície pública canônica e executa `wrangler deploy --dry-run`, sem publicar na Cloudflare.

`npm run deploy` repete as validações antes do deploy real.
