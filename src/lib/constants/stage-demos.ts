import type { AspectRatio } from '@/types';

export const STAGE_DEMO_HTML: Record<AspectRatio, string> = {
  '16:9': `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Demo Motion Graphic — Continuous Action (16:9)</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 100vw; height: 100vh; overflow: hidden;
      background: #0b0b0e; color: #fafafa;
      font-family: system-ui, -apple-system, sans-serif;
      display: grid; place-items: center;
    }
    .stage {
      position: relative; width: 100%; height: 100%;
      background: radial-gradient(circle at 22% 25%, #1c1b15 0%, #09090b 65%);
      overflow: hidden;
    }
    .grid {
      position: absolute; inset: -10%;
      background-image:
        linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px);
      background-size: 48px 48px;
      animation: drift 10s linear infinite;
    }
    .camera {
      position: absolute; inset: 0;
      display: flex; flex-direction: column; justify-content: center; padding: 8%;
      animation: camMove 8s cubic-bezier(0.22, 1, 0.36, 1) infinite;
    }
    .kicker {
      font-size: clamp(11px, 1.5vw, 15px); letter-spacing: 0.16em;
      text-transform: uppercase; color: #f2b705; margin-bottom: 14px;
      opacity: 0; animation: rise 8s ease infinite;
    }
    .headline {
      font-size: clamp(28px, 6vw, 68px); font-weight: 800; line-height: 1.02;
      letter-spacing: -0.03em; max-width: 14ch;
      opacity: 0; animation: rise 8s ease 0.18s infinite;
    }
    .bar {
      margin-top: 24px; height: 4px; width: 0; background: #f2b705;
      animation: growBar 8s cubic-bezier(0.16, 1, 0.3, 1) infinite;
    }
    .orbit {
      position: absolute; right: 9%; top: 50%; transform: translateY(-50%);
      width: clamp(120px, 24vw, 260px); height: clamp(120px, 24vw, 260px);
      border: 1px solid rgba(242,183,5,0.4); border-radius: 999px;
      animation: spin 12s linear infinite;
    }
    .orbit::after {
      content: ""; position: absolute; top: -6px; left: 50%;
      width: 12px; height: 12px; border-radius: 999px; background: #f2b705;
    }
    .orbit-inner {
      position: absolute; inset: 22%; border: 1px dashed rgba(255,255,255,0.22);
      border-radius: 999px; animation: spinReverse 9s linear infinite;
    }
    @keyframes drift {
      from { transform: translate3d(0, 0, 0); }
      to { transform: translate3d(48px, 48px, 0); }
    }
    @keyframes camMove {
      0%, 100% { transform: scale(1) translate3d(0, 0, 0); }
      50% { transform: scale(1.04) translate3d(-1.5%, -1%, 0); }
    }
    @keyframes rise {
      0% { opacity: 0; transform: translateY(28px); }
      14%, 82% { opacity: 1; transform: translateY(0); }
      95%, 100% { opacity: 0; transform: translateY(-18px); }
    }
    @keyframes growBar {
      0%, 8% { width: 0; opacity: 0; }
      22%, 80% { width: 160px; opacity: 1; }
      95%, 100% { width: 0; opacity: 0; }
    }
    @keyframes spin { to { transform: translateY(-50%) rotate(360deg); } }
    @keyframes spinReverse { to { transform: rotate(-360deg); } }
  </style>
</head>
<body>
  <div class="stage">
    <div class="grid"></div>
    <div class="orbit"><div class="orbit-inner"></div></div>
    <div class="camera">
      <div class="kicker">00:00 — Stage Preview Ready</div>
      <h1 class="headline">Gerak Kontinyu Tanpa Slide Statis.</h1>
      <div class="bar"></div>
    </div>
  </div>
</body>
</html>`,
  '9:16': `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Demo Motion Graphic — Vertical Reels (9:16)</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 100vw; height: 100vh; overflow: hidden;
      background: #f5efe0; color: #1c1b18;
      font-family: system-ui, -apple-system, sans-serif;
    }
    .stage {
      position: relative; width: 100%; height: 100%;
      display: flex; flex-direction: column; justify-content: center; align-items: center;
      padding: 12% 9%; text-align: center; overflow: hidden;
      background-image: radial-gradient(rgba(28,27,24,0.08) 1px, transparent 1px);
      background-size: 20px 20px;
      animation: paperPan 8s ease-in-out infinite;
    }
    .cutout {
      background: #ffffff; border: 3px solid #1c1b18;
      padding: 18px 22px; box-shadow: 6px 6px 0 #1c1b18;
      transform: rotate(-2deg);
      animation: popCard 6s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
    }
    .title {
      font-size: clamp(22px, 7vw, 38px); font-weight: 800; line-height: 1.1;
      letter-spacing: -0.02em;
    }
    .highlight {
      display: inline-block; background: #f4c430; padding: 2px 8px; margin-top: 8px;
    }
    .sub {
      margin-top: 22px; font-size: clamp(13px, 3.6vw, 17px); font-weight: 600; max-width: 24ch;
      opacity: 0; animation: fadeUp 6s ease 0.4s infinite;
    }
    @keyframes paperPan {
      0%, 100% { background-position: 0 0; }
      50% { background-position: 18px 24px; }
    }
    @keyframes popCard {
      0% { opacity: 0; transform: scale(0.84) rotate(-6deg) translateY(20px); }
      18%, 82% { opacity: 1; transform: scale(1) rotate(-2deg) translateY(0); }
      100% { opacity: 0; transform: scale(0.92) rotate(2deg) translateY(-16px); }
    }
    @keyframes fadeUp {
      0%, 10% { opacity: 0; transform: translateY(14px); }
      26%, 80% { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(-10px); }
    }
  </style>
</head>
<body>
  <div class="stage">
    <div class="cutout">
      <div class="title">Format 9:16<br /><span class="highlight">Cartoon Collage</span></div>
    </div>
    <p class="sub">Tempel kode HTML hasil Gemini Web Mode Tugas ke editor untuk pratinjau animasi.</p>
  </div>
</body>
</html>`,
  '1:1': `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Demo Motion Graphic — White Catalog (1:1)</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 100vw; height: 100vh; overflow: hidden;
      background: #f8f8f6; color: #111113;
      font-family: system-ui, -apple-system, sans-serif;
    }
    .grid {
      display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr;
      width: 100%; height: 100%;
    }
    .cell {
      border: 1px solid #e4e4e7; padding: 10%;
      display: flex; flex-direction: column; justify-content: space-between;
    }
    .accent { background: #111113; color: #fafafa; }
    .num { font-family: monospace; font-size: 12px; opacity: 0.55; }
    .big {
      font-size: clamp(20px, 6vw, 40px); font-weight: 800; line-height: 1.05;
      letter-spacing: -0.03em; animation: slideIn 5s cubic-bezier(0.16, 1, 0.3, 1) infinite;
    }
    .dot {
      width: 36px; height: 36px; background: #e11d48;
      animation: morph 5s ease-in-out infinite;
    }
    @keyframes slideIn {
      0% { opacity: 0; transform: translateX(-16px); }
      20%, 82% { opacity: 1; transform: translateX(0); }
      100% { opacity: 0; transform: translateX(12px); }
    }
    @keyframes morph {
      0%, 100% { border-radius: 0; transform: rotate(0deg); }
      50% { border-radius: 999px; transform: rotate(90deg) scale(1.15); }
    }
  </style>
</head>
<body>
  <div class="grid">
    <div class="cell"><span class="num">01 / GRID</span><div class="big">Swiss<br/>Motion</div></div>
    <div class="cell accent"><span class="num">02 / 1:1</span><div class="dot"></div></div>
    <div class="cell accent"><span class="num">03 / RATIO</span><div class="big">Feed &amp;<br/>Square</div></div>
    <div class="cell"><span class="num">04 / READY</span><div class="big">Paste<br/>HTML</div></div>
  </div>
</body>
</html>`,
};
