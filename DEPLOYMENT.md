# Deploy do AIO

Destino: `https://brasildesconto.com`

A publicação usa **Cloudflare Workers Static Assets** e Custom Domain.

## Pré-requisitos de ambiente

A autenticação deve existir fora do Git, por exemplo via sessão do Wrangler ou variáveis protegidas do ambiente. Nenhum token, Account ID ou Zone ID deve ser gravado neste repositório.

## Comando

```bash
npm install
npm run deploy
```

Antes do deploy, execute a validação da raiz do pacote ARKHE | AIO.
