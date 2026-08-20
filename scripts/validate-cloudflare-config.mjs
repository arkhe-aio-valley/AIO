import { readFileSync } from "node:fs";

const configUrl = new URL("../wrangler.jsonc", import.meta.url);
const config = JSON.parse(readFileSync(configUrl, "utf8"));
const errors = [];

if (config.name !== "aio") {
  errors.push(`Worker name must match the connected Workers Build: expected "aio", got "${config.name}".`);
}

const productionRoute = config.routes?.find(
  (route) => route.pattern === "brasildesconto.com.br/*",
);

if (!productionRoute) {
  errors.push('Missing production route "brasildesconto.com.br/*".');
} else if (productionRoute.zone_name !== "brasildesconto.com.br") {
  errors.push('Production route must use zone_name "brasildesconto.com.br".');
}

if (config.routes?.some((route) => route.custom_domain === true)) {
  errors.push(
    "Do not use custom_domain while brasildesconto.com.br has existing DNS records; use the Workers Route instead.",
  );
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Cloudflare deploy configuration validated.");
