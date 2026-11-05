/**
 * Post-build step: replaces a built case study with a password gate.
 *
 * The page and its images are encrypted (AES-256-GCM, key from PBKDF2), so dist/ holds no readable
 * copy of them and the password is what unlocks them, not a client-side check that could be skipped.
 * The password comes from CASE_STUDY_PASSWORD (a local .env file, or a GitHub Actions secret) and is
 * never written to dist/. With no password set, the build fails rather than publishing the page open.
 */
import { createCipheriv, pbkdf2Sync, randomBytes } from "node:crypto";
import { existsSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { extname, join } from "node:path";

const DIST = "dist";
const PAGE = join(DIST, "work", "ai-chat-interface", "index.html");
const ASSET_URL = "/images/ai-assistant/";
const ASSET_DIR = join(DIST, "images", "ai-assistant");
const ITERATIONS = 600_000;
const SIZE_WARNING_MB = 25;
const MIME = { ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif", ".svg": "image/svg+xml", ".mp4": "video/mp4", ".webm": "video/webm" };

if (existsSync(".env")) process.loadEnvFile(".env");
const password = process.env.CASE_STUDY_PASSWORD;
if (!password) {
  console.error("protect-case-study: CASE_STUDY_PASSWORD is not set. Refusing to publish the case study unprotected.");
  process.exit(1);
}

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

// Inline every protected asset, so it travels inside the encrypted page
const assets = readdirSync(ASSET_DIR);
let html = readFileSync(PAGE, "utf8");
for (const name of assets) {
  const pattern = new RegExp(escapeRegExp(ASSET_URL + name), "g");
  if (!pattern.test(html)) continue;
  const mime = MIME[extname(name).toLowerCase()];
  if (!mime) throw new Error(`protect-case-study: no MIME type for ${name}`);
  const data = `data:${mime};base64,${readFileSync(join(ASSET_DIR, name)).toString("base64")}`;
  html = html.replace(pattern, () => data);
}

// Remove the public copies, except anything another page still links to (the home card cover)
const publicText = walk(DIST)
  .filter((path) => path !== PAGE && /\.(html|css|js)$/.test(path))
  .map((path) => readFileSync(path, "utf8"))
  .join("\n");
const kept = assets.filter((name) => publicText.includes(ASSET_URL + name));
for (const name of assets) {
  if (!kept.includes(name)) rmSync(join(ASSET_DIR, name));
}

const salt = randomBytes(16);
const iv = randomBytes(12);
const key = pbkdf2Sync(password, salt, ITERATIONS, 32, "sha256");
const cipher = createCipheriv("aes-256-gcm", key, iv);
const payload = Buffer.concat([cipher.update(html, "utf8"), cipher.final(), cipher.getAuthTag()]);

const sizeMb = payload.length / 1024 / 1024;
if (sizeMb > SIZE_WARNING_MB) {
  console.warn(`protect-case-study: encrypted page is ${sizeMb.toFixed(1)} MB, which will be slow to load.`);
}

const gate = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex">
<title>Protected case study · Alice Zhou</title>
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600&family=VT323&family=Vollkorn:wght@400;500&display=swap" rel="stylesheet">
<style>
  *{box-sizing:border-box}
  body{margin:0;min-height:100dvh;display:flex;align-items:center;justify-content:center;padding:24px 16px;background:#C8C0B9;color:#0F0F0F;font-family:"Hanken Grotesk",system-ui,sans-serif}
  main{width:100%;max-width:440px;background:#F5F2ED;border-radius:14px;padding:32px;display:flex;flex-direction:column;gap:16px}
  .eyebrow{margin:0;font-family:"VT323",monospace;font-size:22px;color:#2F5D7C}
  h1{margin:0;font-family:"Vollkorn",serif;font-weight:500;font-size:32px;line-height:1.15}
  .intro{margin:0;font-size:16px;line-height:1.5;color:#3D3833}
  form{display:flex;flex-direction:column;gap:8px;margin-top:8px}
  label{font-size:14px;font-weight:600}
  input{width:100%;height:44px;padding:0 12px;font:inherit;font-size:16px;color:inherit;background:#fff;border:1.5px solid #0F0F0F;border-radius:8px}
  input:focus-visible,button:focus-visible,a:focus-visible{outline:2px solid #2F5D7C;outline-offset:2px}
  button{height:44px;margin-top:8px;font:inherit;font-weight:600;color:#F5F2ED;background:#0F0F0F;border:0;border-radius:8px;cursor:pointer}
  button:disabled{opacity:.6;cursor:progress}
  .error{min-height:20px;margin:0;font-size:14px;line-height:20px;color:#A32C2C}
  a{align-self:flex-start;font-family:"VT323",monospace;font-size:20px;color:inherit}
</style>
</head>
<body>
<main>
  <p class="eyebrow">CASE 01 / PASSWORD PROTECTED</p>
  <h1>This case study is password protected</h1>
  <p class="intro">It covers unreleased work. Enter the password to view it.</p>
  <form id="gate">
    <label for="password">Password</label>
    <input id="password" type="password" autocomplete="current-password" required autofocus aria-describedby="error">
    <button id="submit" type="submit">View case study</button>
    <p id="error" class="error" role="alert"></p>
  </form>
  <a href="/">← All projects</a>
</main>
<script id="payload" type="text/plain">${payload.toString("base64")}</script>
<script>
(function () {
  var SALT = "${salt.toString("base64")}";
  var IV = "${iv.toString("base64")}";
  var ITERATIONS = ${ITERATIONS};
  var STORE = "case-study-key:ai-chat-interface";
  var bytes = function (b64) { return Uint8Array.from(atob(b64), function (c) { return c.charCodeAt(0); }); };
  var form = document.getElementById("gate");
  var input = document.getElementById("password");
  var submit = document.getElementById("submit");
  var error = document.getElementById("error");

  function derive(password) {
    return crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"]).then(function (base) {
      return crypto.subtle.deriveKey(
        { name: "PBKDF2", salt: bytes(SALT), iterations: ITERATIONS, hash: "SHA-256" },
        base,
        { name: "AES-GCM", length: 256 },
        true,
        ["decrypt"]
      );
    });
  }

  function decrypt(key) {
    return crypto.subtle.decrypt({ name: "AES-GCM", iv: bytes(IV) }, key, bytes(document.getElementById("payload").textContent));
  }

  function show(plain) {
    var html = new TextDecoder().decode(plain);
    document.open();
    document.write(html);
    document.close();
  }

  // Stay unlocked for this tab, so moving between case studies doesn't ask again
  function remember(key) {
    return crypto.subtle.exportKey("raw", key).then(function (raw) {
      try { sessionStorage.setItem(STORE, btoa(String.fromCharCode.apply(null, new Uint8Array(raw)))); } catch (e) {}
    });
  }

  // Wait for load: replacing the document while it's still being parsed doesn't take effect
  window.addEventListener("load", function () {
    try {
      var saved = sessionStorage.getItem(STORE);
      if (saved) {
        crypto.subtle.importKey("raw", bytes(saved), "AES-GCM", false, ["decrypt"]).then(decrypt).then(show).catch(function () {
          try { sessionStorage.removeItem(STORE); } catch (e) {}
        });
      }
    } catch (e) {}
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    error.textContent = "";
    submit.disabled = true;
    submit.textContent = "Checking…";
    derive(input.value).then(function (key) {
      return decrypt(key).then(function (plain) {
        return remember(key).then(function () { show(plain); });
      });
    }).catch(function () {
      error.textContent = "That password didn't work. Check it and try again.";
      submit.disabled = false;
      submit.textContent = "View case study";
      input.select();
    });
  });
})();
</script>
</body>
</html>
`;

writeFileSync(PAGE, gate);
console.log(`protect-case-study: encrypted ${PAGE} (${sizeMb.toFixed(1)} MB). Public assets kept: ${kept.join(", ") || "none"}.`);
