import { readFileSync } from "node:fs";

const index = readFileSync(new URL("../public/index.html", import.meta.url), "utf8");
const errors = [];

if (!index.includes("<title>ARKHE | AIO</title>")) {
  errors.push('public/index.html must declare the canonical title "ARKHE | AIO".');
}

if (/tmp-valley/i.test(index)) {
  errors.push('public/index.html must not contain the legacy identifier "tmp-valley".');
}

let health;
try {
  health = JSON.parse(
    readFileSync(new URL("../public/.well-known/arkhe-health.json", import.meta.url), "utf8"),
  );
} catch (error) {
  errors.push(`Missing or invalid public/.well-known/arkhe-health.json: ${error.message}`);
}

if (health) {
  if (health.service !== "ARKHE | AIO") {
    errors.push('Health endpoint service must be "ARKHE | AIO".');
  }

  if (health.status !== "ok") {
    errors.push('Health endpoint status must be "ok".');
  }

  if (health.environment !== "production") {
    errors.push('Health endpoint environment must be "production".');
  }

  if (health.canonical_host !== "brasildesconto.com.br") {
    errors.push('Health endpoint canonical_host must be "brasildesconto.com.br".');
  }

  if (health.source !== "arkhe-aio-valley/AIO") {
    errors.push('Health endpoint source must be "arkhe-aio-valley/AIO".');
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Public ARKHE | AIO surface validated.");
