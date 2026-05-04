// Mzansi Stream — Tauri desktop wrapper (Windows · macOS · Linux)
// Renders the web app https://espg.vercel.app inside a native WebView.

#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    mzansi_stream_lib::run()
}
