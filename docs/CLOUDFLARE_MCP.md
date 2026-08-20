# Cloudflare MCP — padrão oficial do ARKHE | AIO

## Decisão

O ARKHE | AIO usa o **Cloudflare API MCP oficial e gerenciado pela Cloudflare** como caminho canônico para administração da conta:

```text
https://mcp.cloudflare.com/mcp
```

A autenticação é realizada por OAuth no cliente MCP. O servidor oficial fornece acesso à API Cloudflare inteira por meio do padrão search/execute e deve ser preferido a um Worker MCP customizado quando o objetivo for administrar DNS, Workers, R2, Zero Trust e demais recursos da conta.

## Servidores auxiliares configurados

O arquivo `.vscode/mcp.json` mantém também servidores oficiais especializados:

- documentação: `https://docs.mcp.cloudflare.com/mcp`
- Workers Bindings: `https://bindings.mcp.cloudflare.com/mcp`
- Workers Builds: `https://builds.mcp.cloudflare.com/mcp`
- Observability: `https://observability.mcp.cloudflare.com/mcp`

Esses servidores complementam o MCP de API para desenvolvimento, inspeção de builds e diagnóstico de produção.

## Por que não usamos `remote-mcp-authless`

O template `cloudflare/ai/demos/remote-mcp-authless` é apropriado para demonstrar ou publicar ferramentas MCP próprias sem autenticação. Ele não é um proxy necessário para a API Cloudflare e não substitui os servidores MCP oficiais da Cloudflare.

Por ser authless, qualquer cliente que alcance o endpoint pode tentar usar as ferramentas expostas. Para administração da infraestrutura ARKHE | AIO, criar esse Worker aumentaria a superfície operacional sem benefício técnico correspondente.

Se futuramente o projeto precisar expor **ferramentas próprias do ARKHE | AIO** via MCP, deve ser criado um servidor separado com autenticação/autorização, least privilege e revisão de segurança. Um endpoint authless não deve receber capacidades administrativas, credenciais ou ferramentas com efeitos sobre infraestrutura e dados.

## ChatGPT

Quando o plano/workspace do ChatGPT permitir apps MCP personalizados, cadastrar o endpoint oficial Cloudflare diretamente:

```text
https://mcp.cloudflare.com/mcp
```

Configuração esperada:

1. habilitar Developer Mode / criação de app MCP quando exigido pelo workspace;
2. criar um app personalizado em **Settings / Workspace Settings → Apps → Create**;
3. informar o endpoint acima;
4. selecionar OAuth quando solicitado;
5. executar **Scan Tools**;
6. concluir a autorização Cloudflare concedendo somente as permissões necessárias;
7. criar/publicar o app conforme as regras do workspace.

A criação/publicação do app no ChatGPT é uma operação administrativa de UI/workspace e não deve ser substituída por credenciais gravadas no Git.

## Segurança

- nunca gravar OAuth tokens, API tokens, Account IDs sensíveis ou secrets no repositório;
- conceder somente permissões necessárias no consentimento OAuth;
- usar `https://mcp.cloudflare.com/mcp`, não endpoints históricos `/sse`, para novas conexões;
- manter o servidor MCP administrativo separado de qualquer MCP público de produto;
- não implantar MCP administrativo authless;
- qualquer servidor MCP próprio com ações de escrita deve possuir autenticação e autorização explícitas.

## Referências canônicas

- Cloudflare: `https://developers.cloudflare.com/agents/model-context-protocol/cloudflare/servers-for-cloudflare/`
- OpenAI: `https://help.openai.com/en/articles/12584461-developer-mode-and-full-mcp-connectors-in-chatgpt`
