# Project Baseline - 2026-08-19

Este documento é um snapshot do estado do projeto ARKHE | AIO no início do roteiro de saneamento e estabilização.

## Fase 0: Reconhecimento

### 1. Repositórios

*   **Fonte de Verdade:** O trabalho está focado no repositório `All-in-One`, acessado localmente.
*   **Limitação:** A enumeração de todos os repositórios da organização `ARKHE/AIO` não é possível através das ferramentas atuais. O escopo está limitado ao diretório de trabalho atual.

### 2. Default Branch

*   **Branch Padrão:** `main`
*   **Remote URL:** `https://github.com/arkhe-aio-valley/AIO.git`

### 3. Branch Protection

*   **Limitação:** A configuração de proteção de branch não pode ser inspecionada diretamente via git. Esta informação precisa ser verificada na interface do GitHub.

### 4. Pull Requests (PRs)

Com base no contexto fornecido:

*   **PRs Estruturais:**
    *   `#32 fix: restaurar baseline verde e portabilidade de domínio` (Substitui #30)
    *   `#31 feat: harden data governance drift gates`
*   **PRs do Dependabot:** Fila extensa cobrindo React, TS, Node, Vite, ESLint, Actions, etc.

### 5. Issues

*   **Limitação:** A listagem de issues não é diretamente acessível.

### 6. Workflows (CI/CD)

Os seguintes workflows estão definidos em `.github/workflows`:

*   `cloudflare-config-validation.yml`
*   `production-health.yml`
*   `public-cloud-confidentiality.yml`

### 7. Alertas (Dependabot/Security)

*   **Limitação:** Alertas de segurança e do Dependabot são visíveis apenas na interface do GitHub.

### 8. Deployments

*   **Destino:** `https://brasildesconto.com.br`
*   **Tecnologia:** Cloudflare Workers com Assets Estáticos.
*   **Método:** O deploy é feito através de uma Workers Route para o pattern `brasildesconto.com.br/*`.
*   **Saúde:** Um endpoint de health check está definido em `/.well-known/arkhe-health.json`.

### 9. Ambientes

*   **Produção:** O ambiente principal é a Cloudflare, servindo o domínio `brasildesconto.com.br`.
*   **Desenvolvimento:** O desenvolvimento local é feito com `wrangler dev`.

### 10. Snapshot de Configuração

*   **`package.json`:**
    *   **Nome:** `@arkhe-aio/public`
    *   **Scripts Principais:** `deploy`, `dev`, `check`.
    *   **Dependências:** Apenas `wrangler` está listado como devDependency.
*   **`wrangler.jsonc`:**
    *   **Nome do Worker:** `aio`
    *   **Data de Compatibilidade:** `2026-08-17`
    *   **Assets:** Diretório `./public`
    *   **Rota:** `brasildesconto.com.br/*`
*   **`DEPLOYMENT.md`:**
    *   Confirma que o deploy é para `https://brasildesconto.com.br` usando uma Workers Route para preservar o DNS existente.
    *   Reforça a necessidade de consistência no nome do worker (`aio`) entre `wrangler.jsonc` e o projeto no Cloudflare Workers Builds.
    *   Descreve scripts de validação para garantir a integridade da configuração e da superfície pública antes do deploy.
