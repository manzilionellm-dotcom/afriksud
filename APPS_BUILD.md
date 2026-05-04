# Mzansi Stream — Build the Android & Windows apps

This document explains how to generate the native installers for **Mzansi Stream** from this repository.

Stack chosen for 2026:

| Platform | Technology | Final size | Why |
|---|---|---|---|
| **Web (PWA)** | Service Worker + Web Manifest | 0 MB install | Chrome / Edge install automatically from the "Install" button. Works on Android, Windows, macOS, Linux, ChromeOS |
| **Android (Play Store)** | Bubblewrap (TWA) | ~3 MB | Official Google wrapper. Generates a `.aab` ready for Google Play. Auto-updates when the site changes |
| **Windows (.exe / .msi)** | Tauri 2 | ~5 MB | Native WebView2 + Rust. Much lighter than Electron (~150 MB) |
| **macOS (.dmg)** | Tauri 2 | ~5 MB | Same Tauri project, additional target |
| **Linux (.deb / .AppImage)** | Tauri 2 | ~5 MB | Same Tauri project, additional target |

---

## 1. PWA (Chrome / Edge install — no build needed)

Already live. Users only need to visit [https://espg.vercel.app](https://espg.vercel.app) in Chrome or Edge:

- **Android Chrome**: an "Add to Home Screen" banner appears.
- **Windows Edge / Chrome**: an "Install app" icon appears in the address bar.
- **iOS Safari**: Share → Add to Home Screen.

Required files (already in the repo):

- `public/manifest.webmanifest` — full PWA manifest.
- `public/sw.js` — service worker with offline cache + push notifications.
- `app/layout.tsx` — references the manifest + theme color.

---

## 2. Android (Bubblewrap — TWA)

Generates a signed `.aab` (Android App Bundle), ready to upload to Google Play Store.

### Requirements

- Node.js 20+
- JDK 17+ (`brew install openjdk@17` or equivalent)
- `npm i -g @bubblewrap/cli`

### Steps

```bash
# 1. Init (reads twa-manifest.json from the repo)
bubblewrap init --manifest=https://espg.vercel.app/manifest.webmanifest

# 2. Generate Android keystore (first run)
bubblewrap build

# Bubblewrap will ask for:
# - keystore alias (suggested: android)
# - password (store in a password manager — DO NOT lose it)
# - subject info (organization name, country code = ZA, etc.)

# 3. The build produces:
#    - app-release-bundle.aab → upload to Google Play
#    - app-release-signed.apk → side-load on any Android

# 4. Capture the keystore SHA-256 for Digital Asset Links
keytool -list -v -keystore ./android.keystore -alias android | grep SHA256

# 5. Paste the SHA-256 into assetlinks.json and deploy at
#    https://espg.vercel.app/.well-known/assetlinks.json
#    (Vercel serves this statically from public/.well-known/)

# 6. Validate the link
bubblewrap validate --twa-url=https://espg.vercel.app
```

### Upload to Google Play

1. Create a developer account at [Google Play Console](https://play.google.com/console) (R450 / 25 USD one-off).
2. Create a new app → upload the `.aab`.
3. Fill in the listing: description, screenshots, privacy policy, content rating.
4. Publish (typical review: 1–7 days).

### Repo files

- `twa-manifest.json` — Bubblewrap config.
- `assetlinks.json` — Digital Asset Links (paste at `public/.well-known/assetlinks.json` after the build).
- `public/manifest.webmanifest` — PWA manifest read by the TWA.

---

## 3. Windows / macOS / Linux (Tauri 2)

Generates `.exe` (NSIS), `.msi` (WiX), `.dmg`, `.deb`, `.AppImage` from a single Rust + WebView2 project.

### Requirements

**Windows:**
- Node.js 20+
- Rust ≥ 1.77 (`https://rustup.rs`)
- Microsoft C++ Build Tools (Visual Studio 2022 with "Desktop development with C++")
- WebView2 Runtime (built into Windows 11 / installed automatically by Tauri)

**macOS:**
- Xcode Command Line Tools

**Linux (Ubuntu/Debian):**
```bash
sudo apt install libwebkit2gtk-4.1-dev build-essential curl wget file libxdo-dev libssl-dev libayatana-appindicator3-dev librsvg2-dev
```

### Install dependencies

```bash
# At the repo root
npm install --save-dev @tauri-apps/cli@^2 @tauri-apps/api@^2

# Generate icons (from the existing icon-512.png in public/)
npx @tauri-apps/cli icon ./public/icon-512.png
```

### Scripts to add in `package.json`

```json
{
  "scripts": {
    "tauri": "tauri",
    "tauri:dev": "tauri dev",
    "tauri:build": "tauri build",
    "tauri:build:windows": "tauri build --target x86_64-pc-windows-msvc",
    "tauri:build:macos": "tauri build --target universal-apple-darwin",
    "tauri:build:linux": "tauri build --target x86_64-unknown-linux-gnu"
  }
}
```

### Build

```bash
# Local build for the current OS
npm run tauri:build

# Output:
# Windows: src-tauri/target/release/bundle/nsis/Mzansi Stream_1.0.0_x64-setup.exe
#          src-tauri/target/release/bundle/msi/Mzansi Stream_1.0.0_x64_en-ZA.msi
# macOS:   src-tauri/target/release/bundle/dmg/Mzansi Stream_1.0.0_universal.dmg
# Linux:   src-tauri/target/release/bundle/deb/mzansi-stream_1.0.0_amd64.deb
#          src-tauri/target/release/bundle/appimage/mzansi-stream_1.0.0_amd64.AppImage
```

### Auto-updater (optional but recommended)

```bash
# 1. Generate a signing key pair
npx tauri signer generate -w ~/.tauri/mzansi-keys.key

# 2. Paste the pubkey into src-tauri/tauri.conf.json (plugins.updater.pubkey)

# 3. For each release: upload the generated .sig to:
#    https://espg.vercel.app/updates/{target}/{version}.json
```

### Windows distribution

- **Direct distribution**: upload the `.exe` or `.msi` to `public/downloads/` on Vercel and link from the site.
- **Microsoft Store**: convert the `.msi` to `.appx`/`.msix` with [MSIX Packaging Tool](https://learn.microsoft.com/en-us/windows/msix/packaging-tool/tool-overview) (free).
- **MS Store dev account**: 19 USD one-off.

### Repo files

- `src-tauri/tauri.conf.json` — full bundle configuration.
- `src-tauri/Cargo.toml` — Rust dependencies.
- `src-tauri/src/main.rs` — entry point.
- `src-tauri/src/lib.rs` — runtime with plugins (single-instance, window-state, updater, shell).
- `src-tauri/build.rs` — build script.
- `src-tauri/capabilities/main.json` — WebView permissions.

---

## 4. Icons

Required in `public/`:

| File | Size | Usage |
|---|---|---|
| `icon-72.png`  | 72×72   | PWA badge / notifications |
| `icon-96.png`  | 96×96   | PWA shortcuts |
| `icon-128.png` | 128×128 | PWA |
| `icon-144.png` | 144×144 | Windows tile |
| `icon-152.png` | 152×152 | iOS Safari touch |
| `icon-192.png` | 192×192 | PWA Android |
| `icon-384.png` | 384×384 | PWA |
| `icon-512.png` | 512×512 | PWA + Tauri source + Bubblewrap source |
| `icon-512-maskable.png`   | 512×512 | Android adaptive (safe central zone) |
| `icon-512-monochrome.png` | 512×512 | Android themed icon |
| `favicon.ico`  | multi   | Web |

Generate quickly from a single `icon-512.png`:

```bash
# PWA icons (multiple sizes) with sharp-cli
npm i -g sharp-cli
for size in 72 96 128 144 152 192 384; do
  sharp -i public/icon-512.png -o public/icon-${size}.png resize ${size} ${size}
done

# Tauri icons
npx @tauri-apps/cli icon ./public/icon-512.png

# Bubblewrap auto-generates all sizes from the manifest URL
```

---

## 5. v1.0.0 release commands

```bash
# 1. Make sure the web is live
git push origin main  # → Vercel auto-deploys

# 2. Android — generate AAB
bubblewrap init --manifest=https://espg.vercel.app/manifest.webmanifest
bubblewrap build
# → app-release-bundle.aab → Google Play Console

# 3. Windows — generate .exe
npm run tauri:build:windows
# → src-tauri/target/release/bundle/nsis/Mzansi Stream_1.0.0_x64-setup.exe

# 4. (optional) macOS + Linux from the same Tauri project
npm run tauri:build:macos
npm run tauri:build:linux
```

---

## 6. Distribution table

| Channel | Cost | Approval time | Typical URL |
|---|---|---|---|
| Direct PWA | R0 | 0 | espg.vercel.app (Install button) |
| Google Play (Android) | R450 / 25 USD one-off | 1–7 days | play.google.com/store/apps/details?id=za.mzansistream.app |
| Microsoft Store (Windows) | 19 USD one-off | 1–3 days | apps.microsoft.com/detail/MzansiStream |
| App Store (iOS/macOS) | 99 USD/year | 1–7 days | apps.apple.com/za/app/mzansi-stream |
| Direct Windows download | R0 | instant | espg.vercel.app/downloads/MzansiStream-Setup.exe |
| F-Droid (Android open) | R0 | 2–4 weeks | f-droid.org (requires open-source) |

---

## Support

For build issues, open an issue at [github.com/manzilionellm-dotcom/espg/issues](https://github.com/manzilionellm-dotcom/espg/issues).
