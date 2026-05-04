/* ============================================================
   Happy Birthday, Chiamaka Princess
   ============================================================ */

(() => {
  'use strict';

  /* ---------- config ---------- */
  const WHATSAPP_NUMBER = '2349153203421'; // +234 915 320 3421
  const STORAGE_KEY = 'follow-bday-v1';

  /* ---------- ?reset / ?test URL trick (private to you) ---------- */
  // visiting /?reset=1 wipes the local choice so you can preview both gift paths
  // visiting /?test=1 wipes on every load (handy while QA-ing)
  const params = new URLSearchParams(location.search);
  if (params.has('reset') || params.has('test')) {
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    if (params.has('reset')) {
      // strip the param so the URL stays clean for sharing
      params.delete('reset');
      const clean = location.pathname + (params.toString() ? '?' + params.toString() : '') + location.hash;
      history.replaceState(null, '', clean);
      // tiny confirmation toast
      window.addEventListener('DOMContentLoaded', () => {
        const t = document.createElement('div');
        t.textContent = 'reset · pick again';
        Object.assign(t.style, {
          position: 'fixed', top: '60px', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(217, 119, 154, 0.95)', color: 'white',
          padding: '8px 16px', borderRadius: '999px', fontSize: '13px',
          fontFamily: 'Quicksand, sans-serif', letterSpacing: '0.06em',
          zIndex: '9999', boxShadow: '0 8px 24px -8px rgba(75, 50, 110, 0.4)',
          opacity: '0', transition: 'opacity 0.4s ease'
        });
        document.body.appendChild(t);
        requestAnimationFrame(() => { t.style.opacity = '1'; });
        setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 500); }, 1800);
      });
    }
  }

  /* ---------- 50 things (specific, real, no attributions) ---------- */
  const FIFTY = [
    "She started in FUTO. She has been growing ever since.",
    "Follow-up secretary. Then assistant. Then secretary again. The girl just doesn't leave.",
    "She does follow-up like it's actually personal. Because to her, it is.",
    "She's the reason somebody is still in church.",
    "She's the reason somebody came back.",
    "New convert today, your number is in her phone before evening.",
    "She follows up on people who stopped coming. Yes, you. She tried.",
    "She serves in places nobody is clapping. She doesn't mind.",
    "Half the fellowship runs because she's behind it. You'd never know.",
    "She'll arrange chairs at 5am if that's what is needed.",
    "She doesn't wait to be seen. She just shows up.",
    "She has grown. Anybody who knew her two years ago will tell you.",
    "She has grown in the knowledge of God. Quietly. Steadily. Like roots.",
    "Her Bible has annotations. With dates.",
    "She finishes her devotional. (Have you?)",
    "She prays. Long ones. Real ones.",
    "Sometimes she's quiet for ten minutes. Leave her alone. She's praying.",
    "She prays for things you forgot you told her about.",
    "Her amen is a real amen. Not a polite one.",
    "Her hallelujah comes from her belly.",
    "She'll send you a Bible verse on a random Tuesday.",
    "She puts herself out there. Even when it's awkward. Even when it's hard.",
    "The shy face is a decoy. The girl is bold.",
    "She is troublesome. Mildly. Don't push it though.",
    "She'll argue with you for ten minutes and then send you food.",
    "Very, very troublesome. In the way you start to enjoy.",
    "Academics? Serious girl. She doesn't joke with books.",
    "You'll find her with a textbook when other people are with the phone.",
    "She remembers people's names. All of them. Don't ask how.",
    "She greets the security men. By name.",
    "She greets the older people first. Always.",
    "She doesn't post her good deeds. She just does them.",
    "She doesn't talk about people behind their backs. It's almost suspicious.",
    "She is loyal in a way that's almost old-fashioned.",
    "Forgive quickly. Forget slowly. She does both.",
    "She'll tell you the truth in love. Not in tweet.",
    "Her dressing is sharp without trying to win anything.",
    "She has a laugh that's too loud for her face. It's her best laugh.",
    "She'll volunteer for anything you tell her actually matters.",
    "She's softer than she pretends. And tougher than she looks.",
    "She doesn't do half things. Whatever she lays her hands on, she finishes.",
    "She'll cry with you. And not make it weird.",
    "She apologises first, even when it's not her fault.",
    "She has a notebook. She actually uses it.",
    "She listens with her whole face.",
    "Consistency is her thing. Most underrated compliment.",
    "She is going to be a doctor. Mark this page.",
    "And she's adding data analysis to it. Two wings, not one.",
    "FUTO didn't change her. If anything, she set FUTO straight.",
    "One day somebody is going to look at her and just say: thank You, Lord, for this one.",
  ];

  /* ---------- Build 50 cards ---------- */
  const cardsEl = document.getElementById('cards');
  if (cardsEl) {
    FIFTY.forEach((text, i) => {
      const n = i + 1;
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="card-inner">
          <div class="card-face card-front">
            <div class="card-num">${String(n).padStart(2, '0')}</div>
            <p class="card-text">${escape(text)}</p>
            <p class="card-tap">tap me</p>
          </div>
          <div class="card-face card-back">
            <p class="back-num">${String(n).padStart(2, '0')}</p>
            <p class="back-heart">♡</p>
            <p class="back-tag">of fifty</p>
          </div>
        </div>`;
      card.addEventListener('click', () => {
        card.classList.toggle('flipped');
        if (Math.random() < 0.22) burstHearts(card);
      });
      cardsEl.appendChild(card);
    });
  }

  function escape(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* ---------- Polaroid gallery ---------- */
  const polaroids = document.getElementById('polaroids');
  const captions = [
    "barefoot, brave",
    "joy, looking good on you",
    "regal — and not even trying",
    "HBD to me ✿"
  ];
  if (polaroids) {
    [1, 2, 3, 4].forEach((n, i) => {
      const item = document.createElement('div');
      item.className = 'polaroid';
      item.innerHTML = `
        <img src="assets/photos/${n}.jpg" alt="moment ${n}" onerror="this.style.opacity='0.2'" />
        <div class="pcap">${escape(captions[i] || "")}</div>`;
      polaroids.appendChild(item);
    });
  }

  /* ---------- Today's date stamp (typewriter reveal) ---------- */
  const todayDateEl = document.getElementById('todayDate');
  if (todayDateEl) {
    const d = new Date();
    const fmt = d.toLocaleDateString('en-GB', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    }).toLowerCase();
    todayDateEl.textContent = '';
    // Reveal letter-by-letter when the section comes into view
    const startTyping = () => {
      let i = 0;
      const tick = () => {
        if (i <= fmt.length) {
          todayDateEl.textContent = fmt.slice(0, i) + (i < fmt.length ? '▍' : '');
          i++;
          setTimeout(tick, 38);
        }
      };
      tick();
    };
    const obs = new IntersectionObserver((es) => {
      es.forEach(e => {
        if (e.isIntersecting) {
          startTyping();
          obs.disconnect();
        }
      });
    }, { threshold: 0.4 });
    const todaySection = document.getElementById('today');
    if (todaySection) obs.observe(todaySection);
  }

  /* ---------- Hero name letter-by-letter pop ---------- */
  const heroNameEl = document.getElementById('heroName');
  if (heroNameEl) {
    const words = heroNameEl.querySelectorAll('.hn-word');
    words.forEach((w, wi) => {
      const text = w.textContent;
      w.textContent = '';
      // wrap each letter in a span; preserve gradient by keeping word's class
      [...text].forEach((ch, ci) => {
        const span = document.createElement('span');
        span.className = 'hn-letter';
        span.textContent = ch;
        span.style.animationDelay = `${0.05 * (wi * 9 + ci)}s`;
        // make individual letters share the gradient color via inheritance
        span.style.background = 'inherit';
        span.style.webkitBackgroundClip = 'text';
        span.style.backgroundClip = 'text';
        span.style.color = 'transparent';
        w.appendChild(span);
      });
    });
  }

  /* ---------- Scroll progress gold line ---------- */
  const progressEl = document.getElementById('scrollProgress');
  function updateProgress() {
    if (!progressEl) return;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const pct = Math.max(0, Math.min(1, window.scrollY / Math.max(1, h)));
    progressEl.style.width = (pct * 100) + '%';
  }
  document.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ---------- Enter overlay ---------- */
  const enterEl = document.getElementById('enter');
  const envelope = document.getElementById('envelope');
  if (envelope) {
    envelope.addEventListener('click', () => {
      envelope.classList.add('opening');
      setTimeout(() => {
        enterEl.classList.add('gone');
        startMusic();
        burstConfetti();
      }, 600);
    });
  }

  /* ---------- Petals (background) ---------- */
  const petalCanvas = document.getElementById('petals');
  const petalCtx = petalCanvas?.getContext('2d');
  let petals = [];
  function sizeCanvas(c) {
    if (!c) return;
    c.width = window.innerWidth * devicePixelRatio;
    c.height = window.innerHeight * devicePixelRatio;
    c.style.width = window.innerWidth + 'px';
    c.style.height = window.innerHeight + 'px';
  }
  sizeCanvas(petalCanvas);
  window.addEventListener('resize', () => {
    sizeCanvas(petalCanvas);
    sizeCanvas(confettiCanvas);
    sizeCanvas(balloonCanvas);
    sizeCanvas(heartsCanvas);
    sizeCanvas(sparkleCanvas);
  });

  function spawnPetal() {
    return {
      x: Math.random() * window.innerWidth * devicePixelRatio,
      y: -20,
      r: (8 + Math.random() * 10) * devicePixelRatio,
      vx: (Math.random() - 0.5) * 0.6 * devicePixelRatio,
      vy: (0.3 + Math.random() * 0.6) * devicePixelRatio,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.02,
      hue: Math.random() < 0.5 ? '#FFB088' : '#E89AB1',
      alpha: 0.4 + Math.random() * 0.4,
    };
  }

  function petalLoop() {
    if (!petalCtx) return;
    petalCtx.clearRect(0, 0, petalCanvas.width, petalCanvas.height);
    if (petals.length < 28 && Math.random() < 0.5) petals.push(spawnPetal());
    petals = petals.filter(p => p.y < petalCanvas.height + 40);
    petals.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.rot += p.vr;
      petalCtx.save();
      petalCtx.translate(p.x, p.y);
      petalCtx.rotate(p.rot);
      petalCtx.globalAlpha = p.alpha;
      petalCtx.fillStyle = p.hue;
      petalCtx.beginPath();
      petalCtx.ellipse(0, 0, p.r, p.r * 0.6, 0, 0, Math.PI * 2);
      petalCtx.fill();
      petalCtx.restore();
    });
    requestAnimationFrame(petalLoop);
  }
  petalLoop();

  /* ---------- Balloons (floating up, with strings, gentle sway) ---------- */
  const balloonCanvas = document.getElementById('balloons');
  const balloonCtx = balloonCanvas?.getContext('2d');
  sizeCanvas(balloonCanvas);
  let balloons = [];
  const BALLOON_COLORS = [
    { body: '#F8B5C7', shine: '#FFFAF4' },  // pink
    { body: '#C8B6E8', shine: '#FFFAF4' },  // lavender
    { body: '#FFC9A4', shine: '#FFFAF4' },  // peach
    { body: '#B0DDF0', shine: '#FFFAF4' },  // sky
    { body: '#F4D08C', shine: '#FFFAF4' },  // soft gold
    { body: '#E89AB1', shine: '#FFFAF4' },  // rose
  ];

  function spawnBalloon() {
    const color = BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)];
    const r = (22 + Math.random() * 14) * devicePixelRatio;
    return {
      baseX: Math.random() * balloonCanvas.width,
      x: 0,
      y: balloonCanvas.height + r * 4,
      r,
      vy: (0.45 + Math.random() * 0.35) * devicePixelRatio,
      sway: 18 * devicePixelRatio + Math.random() * 24 * devicePixelRatio,
      swayPhase: Math.random() * Math.PI * 2,
      swaySpeed: 0.012 + Math.random() * 0.014,
      color,
      alpha: 0.85,
      stringWobble: Math.random() * Math.PI * 2,
    };
  }

  // pre-seed a few balloons at varying heights so they appear immediately
  for (let i = 0; i < 5; i++) {
    const b = spawnBalloon();
    b.y = balloonCanvas.height * (0.3 + Math.random() * 0.7);
    balloons.push(b);
  }

  function balloonLoop() {
    if (!balloonCtx) return;
    balloonCtx.clearRect(0, 0, balloonCanvas.width, balloonCanvas.height);
    if (balloons.length < 8 && Math.random() < 0.04) balloons.push(spawnBalloon());
    balloons = balloons.filter(b => b.y > -b.r * 6);

    balloons.forEach(b => {
      b.y -= b.vy;
      b.swayPhase += b.swaySpeed;
      b.stringWobble += 0.05;
      b.x = b.baseX + Math.sin(b.swayPhase) * b.sway;

      balloonCtx.save();
      balloonCtx.globalAlpha = b.alpha;

      // string
      balloonCtx.beginPath();
      balloonCtx.moveTo(b.x, b.y + b.r * 1.05);
      const segs = 8;
      for (let i = 1; i <= segs; i++) {
        const t = i / segs;
        const sx = b.x + Math.sin(b.stringWobble + t * 4) * 4 * devicePixelRatio * t;
        const sy = b.y + b.r * 1.05 + b.r * 1.6 * t;
        balloonCtx.lineTo(sx, sy);
      }
      balloonCtx.strokeStyle = 'rgba(120, 100, 140, 0.45)';
      balloonCtx.lineWidth = 1 * devicePixelRatio;
      balloonCtx.stroke();

      // tie
      balloonCtx.fillStyle = b.color.body;
      balloonCtx.beginPath();
      balloonCtx.moveTo(b.x - 3 * devicePixelRatio, b.y + b.r);
      balloonCtx.lineTo(b.x + 3 * devicePixelRatio, b.y + b.r);
      balloonCtx.lineTo(b.x, b.y + b.r * 1.12);
      balloonCtx.closePath();
      balloonCtx.fill();

      // body (slight pear shape)
      balloonCtx.beginPath();
      balloonCtx.ellipse(b.x, b.y, b.r * 0.92, b.r * 1.05, 0, 0, Math.PI * 2);
      balloonCtx.fill();

      // shine
      balloonCtx.globalAlpha = b.alpha * 0.55;
      balloonCtx.fillStyle = b.color.shine;
      balloonCtx.beginPath();
      balloonCtx.ellipse(b.x - b.r * 0.32, b.y - b.r * 0.35, b.r * 0.18, b.r * 0.32, -0.4, 0, Math.PI * 2);
      balloonCtx.fill();

      balloonCtx.restore();
    });
    requestAnimationFrame(balloonLoop);
  }
  balloonLoop();

  /* ---------- Floating hearts (occasional, slow drift up) ---------- */
  const heartsCanvas = document.getElementById('hearts');
  const heartsCtx = heartsCanvas?.getContext('2d');
  sizeCanvas(heartsCanvas);
  let hearts = [];
  function spawnHeart() {
    return {
      x: Math.random() * heartsCanvas.width,
      y: heartsCanvas.height + 20 * devicePixelRatio,
      r: (10 + Math.random() * 8) * devicePixelRatio,
      vy: (0.4 + Math.random() * 0.6) * devicePixelRatio,
      sway: 14 * devicePixelRatio + Math.random() * 22 * devicePixelRatio,
      phase: Math.random() * Math.PI * 2,
      speed: 0.018 + Math.random() * 0.015,
      baseX: 0,
      hue: Math.random() < 0.5 ? '#E89AB1' : '#F8B5C7',
      alpha: 0.55 + Math.random() * 0.3,
    };
  }
  function drawHeart(ctx, x, y, r, color, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y - r * 0.2);
    ctx.bezierCurveTo(x + r, y - r, x + r, y + r * 0.4, x, y + r);
    ctx.bezierCurveTo(x - r, y + r * 0.4, x - r, y - r, x, y - r * 0.2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  function heartsLoop() {
    if (!heartsCtx) return;
    heartsCtx.clearRect(0, 0, heartsCanvas.width, heartsCanvas.height);
    if (hearts.length < 5 && Math.random() < 0.008) {
      const h = spawnHeart();
      h.baseX = h.x;
      hearts.push(h);
    }
    hearts = hearts.filter(h => h.y > -40);
    hearts.forEach(h => {
      h.y -= h.vy;
      h.phase += h.speed;
      h.x = h.baseX + Math.sin(h.phase) * h.sway;
      drawHeart(heartsCtx, h.x, h.y, h.r, h.hue, h.alpha);
    });
    requestAnimationFrame(heartsLoop);
  }
  heartsLoop();

  /* ---------- Tap-anywhere sparkle ---------- */
  const sparkleCanvas = document.getElementById('sparkles');
  const sparkleCtx = sparkleCanvas?.getContext('2d');
  sizeCanvas(sparkleCanvas);
  let sparkles = [];
  const SPARK_COLORS = ['#D9779A', '#A48EDC', '#F59A6E', '#C29852', '#FFFAF4'];

  function emitSparkle(x, y) {
    const cx = x * devicePixelRatio;
    const cy = y * devicePixelRatio;
    for (let i = 0; i < 8; i++) {
      const a = (Math.PI * 2 * i) / 8 + Math.random() * 0.6;
      const v = (1.5 + Math.random() * 2.5) * devicePixelRatio;
      sparkles.push({
        x: cx, y: cy,
        vx: Math.cos(a) * v, vy: Math.sin(a) * v - 1.2 * devicePixelRatio,
        r: (1.5 + Math.random() * 2) * devicePixelRatio,
        color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
        life: 0, max: 32 + Math.random() * 18,
      });
    }
  }

  function sparkleLoop() {
    if (!sparkleCtx) return;
    sparkleCtx.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);
    sparkles = sparkles.filter(s => s.life < s.max);
    sparkles.forEach(s => {
      s.life++;
      s.vy += 0.06 * devicePixelRatio;
      s.x += s.vx; s.y += s.vy;
      const alpha = 1 - s.life / s.max;
      sparkleCtx.save();
      sparkleCtx.globalAlpha = alpha;
      sparkleCtx.fillStyle = s.color;
      sparkleCtx.beginPath();
      sparkleCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      sparkleCtx.fill();
      sparkleCtx.restore();
    });
    requestAnimationFrame(sparkleLoop);
  }
  sparkleLoop();

  // Listen for taps anywhere on the page (but not on form inputs)
  document.addEventListener('pointerdown', (e) => {
    const tag = (e.target.tagName || '').toLowerCase();
    if (['input', 'textarea', 'select', 'button'].includes(tag)) return;
    // skip taps inside any form field area
    if (e.target.closest('input, textarea, select')) return;
    emitSparkle(e.clientX, e.clientY);
  }, { passive: true });

  /* ---------- Confetti ---------- */
  const confettiCanvas = document.getElementById('confetti');
  const confettiCtx = confettiCanvas?.getContext('2d');
  sizeCanvas(confettiCanvas);
  let confetti = [];

  const CONFETTI_COLORS = ['#E89AB1', '#FFB088', '#B8A4E3', '#D4AF6A', '#FFFAF4', '#E5F1FB'];

  function burstConfetti(amount = 90, originX, originY) {
    if (!confettiCtx) return;
    const cx = originX != null ? originX * devicePixelRatio : confettiCanvas.width / 2;
    const cy = originY != null ? originY * devicePixelRatio : confettiCanvas.height * 0.35;
    for (let i = 0; i < amount; i++) {
      confetti.push({
        x: cx,
        y: cy,
        r: (4 + Math.random() * 5) * devicePixelRatio,
        vx: (Math.random() - 0.5) * 12 * devicePixelRatio,
        vy: (Math.random() * -10 - 4) * devicePixelRatio,
        ay: 0.35 * devicePixelRatio,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.3,
        life: 0,
        max: 90 + Math.random() * 60,
      });
    }
  }

  function confettiLoop() {
    if (!confettiCtx) return;
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confetti = confetti.filter(p => p.life < p.max && p.y < confettiCanvas.height + 40);
    confetti.forEach(p => {
      p.life++;
      p.vy += p.ay;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      const alpha = Math.max(0, 1 - p.life / p.max);
      confettiCtx.save();
      confettiCtx.translate(p.x, p.y);
      confettiCtx.rotate(p.rot);
      confettiCtx.globalAlpha = alpha;
      confettiCtx.fillStyle = p.color;
      confettiCtx.fillRect(-p.r, -p.r * 0.4, p.r * 2, p.r * 0.8);
      confettiCtx.restore();
    });
    requestAnimationFrame(confettiLoop);
  }
  confettiLoop();

  function burstHearts(el) {
    const rect = el.getBoundingClientRect();
    burstConfetti(20, rect.left + rect.width / 2, rect.top + rect.height / 2);
  }

  /* ---------- Heart button ---------- */
  const heartBtn = document.getElementById('heartButton');
  if (heartBtn) {
    heartBtn.addEventListener('click', () => {
      const r = heartBtn.getBoundingClientRect();
      burstConfetti(40, r.left + r.width / 2, r.top + r.height / 2);
      vibrate(20);
    });
  }

  /* ---------- Music toggle (background track, looped) ---------- */
  const musicBtn = document.getElementById('musicToggle');
  const bgMusic = document.getElementById('bgMusic');
  let musicOn = false;

  if (bgMusic) {
    bgMusic.volume = 0.0;
    bgMusic.loop = true;
  }

  function fadeMusic(target, ms = 1200) {
    if (!bgMusic) return;
    const start = bgMusic.volume;
    const t0 = performance.now();
    function step(t) {
      const k = Math.min(1, (t - t0) / ms);
      bgMusic.volume = start + (target - start) * k;
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function startMusic() {
    if (!bgMusic || musicOn) return;
    const playPromise = bgMusic.play();
    if (playPromise && typeof playPromise.then === 'function') {
      playPromise.then(() => {
        musicOn = true;
        musicBtn?.classList.add('playing');
        fadeMusic(0.55, 1800);
      }).catch(() => {
        // autoplay blocked — wait for next gesture
        musicOn = false;
        musicBtn?.classList.remove('playing');
      });
    } else {
      musicOn = true;
      musicBtn?.classList.add('playing');
      fadeMusic(0.55, 1800);
    }
  }

  function stopMusic() {
    if (!bgMusic || !musicOn) return;
    fadeMusic(0.0, 600);
    setTimeout(() => { try { bgMusic.pause(); } catch {} }, 650);
    musicOn = false;
    musicBtn?.classList.remove('playing');
  }

  if (musicBtn) {
    musicBtn.addEventListener('click', () => {
      musicOn ? stopMusic() : startMusic();
    });
  }

  /* ---------- Prayer toggle ---------- */
  const prayerBtn = document.getElementById('prayerBtn');
  const prayer = document.getElementById('prayer');
  if (prayerBtn && prayer) {
    prayerBtn.addEventListener('click', () => {
      prayer.classList.toggle('hidden');
      prayerBtn.textContent = prayer.classList.contains('hidden')
        ? 'a small prayer for you →'
        : 'fold it back ←';
    });
  }

  /* ---------- Candles ---------- */
  const candles = document.querySelectorAll('.candle');
  const wishMessage = document.getElementById('wishMessage');
  candles.forEach(c => {
    c.addEventListener('click', () => {
      if (c.classList.contains('out')) return;
      c.classList.add('out');
      vibrate(15);
      const remaining = [...candles].filter(x => !x.classList.contains('out')).length;
      if (remaining === 0) {
        setTimeout(() => {
          wishMessage?.classList.remove('hidden');
          burstConfetti(140);
        }, 400);
      }
    });
  });

  /* ---------- Hug button ---------- */
  const hugBtn = document.getElementById('hugBtn');
  if (hugBtn) {
    hugBtn.addEventListener('click', () => {
      hugBtn.classList.add('hugging');
      const r = hugBtn.getBoundingClientRect();
      burstConfetti(50, r.left + r.width / 2, r.top + r.height / 2);
      vibrate([20, 40, 20]);
      setTimeout(() => hugBtn.classList.remove('hugging'), 600);
    });
  }

  /* ---------- Secret 7-tap ---------- */
  const secretBtn = document.getElementById('secretBtn');
  const secretMsg = document.getElementById('secretMessage');
  let taps = 0;
  if (secretBtn && secretMsg) {
    secretBtn.addEventListener('click', () => {
      taps++;
      if (taps >= 7) {
        secretMsg.classList.remove('hidden');
        secretBtn.style.display = 'none';
        burstConfetti(120);
      } else {
        const left = 7 - taps;
        secretBtn.textContent = `${left} more…`;
      }
    });
  }

  /* ---------- Hero photo tap easter egg ---------- */
  const heroPhoto = document.querySelector('.photo-hero');
  let heroTaps = 0;
  if (heroPhoto) {
    heroPhoto.addEventListener('click', () => {
      heroTaps++;
      const r = heroPhoto.getBoundingClientRect();
      burstConfetti(15, r.left + r.width / 2, r.top + r.height / 2);
      heroPhoto.style.transform = 'scale(1.05)';
      setTimeout(() => { heroPhoto.style.transform = ''; }, 200);
      if (heroTaps === 5) {
        showFloatingNote("you really are something else, you know that?");
      }
    });
  }

  function showFloatingNote(text) {
    const note = document.createElement('div');
    note.className = 'floating-note';
    note.textContent = text;
    Object.assign(note.style, {
      position: 'fixed',
      top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(255, 250, 244, 0.95)',
      backdropFilter: 'blur(10px)',
      padding: '18px 24px',
      borderRadius: '20px',
      boxShadow: '0 14px 40px -10px rgba(75, 50, 110, 0.3)',
      fontFamily: '"Caveat", cursive',
      fontSize: '24px',
      color: '#3B2A4A',
      textAlign: 'center',
      maxWidth: '280px',
      zIndex: '500',
      opacity: '0',
      transition: 'opacity 0.4s ease',
    });
    document.body.appendChild(note);
    requestAnimationFrame(() => { note.style.opacity = '1'; });
    setTimeout(() => {
      note.style.opacity = '0';
      setTimeout(() => note.remove(), 500);
    }, 2400);
  }

  /* ---------- Pull-to-refresh egg ---------- */
  let touchStartY = 0;
  const pullEgg = document.getElementById('pullEgg');
  document.addEventListener('touchstart', (e) => {
    if (window.scrollY <= 0) touchStartY = e.touches[0].clientY;
  }, { passive: true });
  document.addEventListener('touchmove', (e) => {
    if (window.scrollY <= 0) {
      const dy = e.touches[0].clientY - touchStartY;
      if (dy > 80) pullEgg?.classList.add('show');
    }
  }, { passive: true });
  document.addEventListener('touchend', () => {
    if (pullEgg?.classList.contains('show')) {
      setTimeout(() => pullEgg.classList.remove('show'), 1200);
    }
  });

  /* ---------- Reveal on scroll ---------- */
  // threshold: 0 + bottom rootMargin so sections reveal as their top edge enters
  // (a higher threshold breaks tall sections like the 50-card grid which take a
  // long scroll before any % is met)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        if (entry.target.id === 'thirty') {
          const cs = entry.target.querySelectorAll('.card');
          cs.forEach((c, i) => {
            setTimeout(() => c.classList.add('in'), Math.min(i * 30, 1200));
          });
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Safety net: if a .reveal element is already on screen at load (or the
  // observer doesn't fire on iOS for any reason), force-reveal anything within
  // the viewport after a short delay.
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.querySelectorAll('.reveal:not(.in)').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          el.classList.add('in');
          if (el.id === 'thirty') {
            el.querySelectorAll('.card').forEach((c, i) => {
              setTimeout(() => c.classList.add('in'), Math.min(i * 30, 1200));
            });
          }
        }
      });
    }, 250);
  });

  /* ---------- Gift: Money or Advice ---------- */
  const giftStage = document.getElementById('giftStage');
  const giftChoose = document.getElementById('giftChoose');
  const giftMoney = document.getElementById('giftMoney');
  const giftAdvice = document.getElementById('giftAdvice');
  const giftLocked = document.getElementById('giftLocked');
  const seeAgainBtn = document.getElementById('seeAgain');

  const saved = readState();

  if (saved && saved.choice) {
    showLocked();
  }

  function readState() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); }
    catch { return null; }
  }
  function writeState(s) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {}
  }

  function showLocked() {
    giftChoose?.classList.add('hidden');
    giftMoney?.classList.add('hidden');
    giftAdvice?.classList.add('hidden');
    giftLocked?.classList.remove('hidden');
  }

  function pickMoney() {
    writeState({ choice: 'money', at: Date.now() });
    giftChoose?.classList.add('hidden');
    giftLocked?.classList.add('hidden');
    giftMoney?.classList.remove('hidden');
    giftMoney?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    burstConfetti(70);
  }

  function pickAdvice() {
    writeState({ choice: 'advice', at: Date.now() });
    giftChoose?.classList.add('hidden');
    giftLocked?.classList.add('hidden');
    giftAdvice?.classList.remove('hidden');
    giftAdvice?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    burstConfetti(70);
  }

  document.querySelectorAll('.gift-card').forEach(btn => {
    btn.addEventListener('click', () => {
      const pick = btn.dataset.pick;
      if (pick === 'money') pickMoney();
      if (pick === 'advice') pickAdvice();
    });
  });

  seeAgainBtn?.addEventListener('click', () => {
    const s = readState();
    giftLocked?.classList.add('hidden');
    if (s?.choice === 'money') giftMoney?.classList.remove('hidden');
    if (s?.choice === 'advice') giftAdvice?.classList.remove('hidden');
  });

  /* ---------- Money form -> mailto ---------- */
  const moneyForm = document.getElementById('moneyForm');
  const moneyThanks = document.getElementById('moneyThanks');

  moneyForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(moneyForm);
    const name = (fd.get('name') || '').toString().trim();
    const phone = (fd.get('phone') || '').toString().trim();
    const network = (fd.get('network') || '').toString().trim();
    const note = (fd.get('note') || '').toString().trim();

    if (!name || !phone || !network) {
      shake(moneyForm);
      return;
    }

    const message =
`hi 👋 it's me — Princess.

I picked the airtime on the birthday page 🎁

• name: ${name}
• phone: ${phone}
• network: ${network}${note ? `

note: ${note}` : ''}

thank you. ♡`;

    const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(wa, '_blank');

    setTimeout(() => {
      moneyForm.classList.add('hidden');
      moneyThanks?.classList.remove('hidden');
      burstConfetti(120);
      writeState({ choice: 'money', at: Date.now(), submitted: true });
    }, 400);
  });

  /* ---------- Advice closing — token form (also via WhatsApp) ---------- */
  const tokenForm = document.getElementById('tokenForm');
  const tokenThanks = document.getElementById('tokenThanks');
  tokenForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(tokenForm);
    const name = (fd.get('name') || '').toString().trim();
    const phone = (fd.get('phone') || '').toString().trim();
    const network = (fd.get('network') || '').toString().trim();

    if (!name || !phone || !network) {
      shake(tokenForm);
      return;
    }

    const message =
`hi 👋 it's me — Princess.

I picked advice on the birthday page, but you said something would still come 😄

• name: ${name}
• phone: ${phone}
• network: ${network}

thank you. ♡`;

    const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(wa, '_blank');

    setTimeout(() => {
      tokenForm.classList.add('hidden');
      tokenThanks?.classList.remove('hidden');
      burstConfetti(80);
    }, 400);
  });

  function shake(el) {
    el.animate([
      { transform: 'translateX(0)' },
      { transform: 'translateX(-8px)' },
      { transform: 'translateX(8px)' },
      { transform: 'translateX(-4px)' },
      { transform: 'translateX(0)' },
    ], { duration: 320, easing: 'ease-in-out' });
    vibrate(60);
  }

  /* ---------- Vibrate helper ---------- */
  function vibrate(p) {
    if (navigator.vibrate) navigator.vibrate(p);
  }

  /* ---------- First-paint: schedule a small entrance after page load ---------- */
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });

})();
