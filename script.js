/* ============================================================
   Happy Birthday, Chiamaka Princess
   ============================================================ */

(() => {
  'use strict';

  /* ---------- config ---------- */
  const RECIPIENT_EMAIL = 'somtochukwu.okoma@ethnoscyber.com';
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

  /* ---------- 30 things ---------- */
  const THIRTY = [
    { text: "She's so prayerful — like, deeply.", from: "an aunty in church" },
    { text: "There's a softness in her that doesn't break under pressure.", from: "a sister friend" },
    { text: "She actually listens. Not the polite kind. The real kind.", from: "a brother" },
    { text: "Virtuous is the word. People throw it around — she earns it.", from: "her pastor's wife (probably)" },
    { text: "She makes new converts feel safe. That's a gift.", from: "from the follow-up team" },
    { text: "Her smile arrives a second before she does, somehow.", from: "from me" },
    { text: "Faithful in small things. People notice.", from: "Luke 16:10, basically" },
    { text: "She doesn't gossip. In a world like ours, that's rare.", from: "an honest friend" },
    { text: "She remembers the little things — names, dates, how you take your tea.", from: "someone she's checked on" },
    { text: "She gives without keeping score.", from: "from someone who watches quietly" },
    { text: "Servant-hearted. First to help, last to leave.", from: "from the church youth" },
    { text: "Her faith is contagious in the best way.", from: "a friend" },
    { text: "She walks in modesty without making it heavy.", from: "an older sister" },
    { text: "She corrects gently. Heals more than it hurts.", from: "from a junior" },
    { text: "She handles correction without crumbling.", from: "from a leader" },
    { text: "She's a builder, not a critic.", from: "from someone she's encouraged" },
    { text: "She makes ordinary days feel sacred.", from: "from me" },
    { text: "She reads her Bible for herself, not for show.", from: "her flatmate, probably" },
    { text: "When she calls God Daddy — she means it.", from: "anyone who's heard her pray" },
    { text: "She's loyal in a way that's almost old-fashioned.", from: "an old friend" },
    { text: "She carries people without making them feel carried.", from: "from a new convert" },
    { text: "There's wisdom in her that's older than her age.", from: "from her pastor" },
    { text: "She forgives faster than most people can offend.", from: "a brother" },
    { text: "She's funny when she's not even trying.", from: "from a close friend" },
    { text: "She shows up. Every single time.", from: "from the team" },
    { text: "She's working on herself, quietly. We see it.", from: "from me" },
    { text: "She's the daughter every mother prays for.", from: "an aunty" },
    { text: "She glows. There's no other word for it.", from: "from anyone with eyes" },
    { text: "God's hand is on her life. You can feel it in the room.", from: "from her pastor's wife" },
    { text: "Heaven smiles when she walks in.", from: "and that's me, signing off" },
  ];

  /* ---------- Build 30 cards ---------- */
  const cardsEl = document.getElementById('cards');
  if (cardsEl) {
    THIRTY.forEach((item, i) => {
      const n = i + 1;
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="card-inner">
          <div class="card-face card-front">
            <div class="card-num">${String(n).padStart(2, '0')}</div>
            <p class="card-text">${escape(item.text)}</p>
            <p class="card-tap">tap →</p>
          </div>
          <div class="card-face card-back">
            <p class="from">${escape(item.from)}</p>
            <p>♡</p>
          </div>
        </div>`;
      card.addEventListener('click', () => {
        card.classList.toggle('flipped');
        if (Math.random() < 0.18) burstHearts(card);
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

  /* ---------- Today's date stamp ---------- */
  const todayDateEl = document.getElementById('todayDate');
  if (todayDateEl) {
    const d = new Date();
    const fmt = d.toLocaleDateString('en-GB', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });
    todayDateEl.textContent = fmt.toLowerCase();
  }

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

  /* ---------- Voice note ---------- */
  const voiceBtn = document.getElementById('voicePlay');
  const voiceAudio = document.getElementById('voiceAudio');
  const voiceFill = document.getElementById('voiceFill');
  const voicePlayIcon = voiceBtn?.querySelector('.voice-play');
  const voicePauseIcon = voiceBtn?.querySelector('.voice-pause');

  if (voiceBtn && voiceAudio) {
    voiceBtn.addEventListener('click', () => {
      if (voiceAudio.paused) {
        voiceAudio.play().catch(() => {
          // Audio file likely missing — show a friendly indicator
          voiceFill.style.background = 'var(--ink-faint)';
          voiceFill.style.width = '100%';
          setTimeout(() => {
            voiceFill.style.width = '0%';
            voiceFill.style.background = '';
          }, 1200);
        });
      } else {
        voiceAudio.pause();
      }
    });
    let musicWasOnBeforeVoice = false;
    voiceAudio.addEventListener('play', () => {
      voicePlayIcon?.classList.add('hidden');
      voicePauseIcon?.classList.remove('hidden');
      if (musicOn) {
        musicWasOnBeforeVoice = true;
        fadeMusic(0.08, 400);
      }
    });
    voiceAudio.addEventListener('pause', () => {
      voicePlayIcon?.classList.remove('hidden');
      voicePauseIcon?.classList.add('hidden');
      if (musicOn && musicWasOnBeforeVoice) fadeMusic(0.55, 600);
    });
    voiceAudio.addEventListener('ended', () => {
      voicePlayIcon?.classList.remove('hidden');
      voicePauseIcon?.classList.add('hidden');
      voiceFill.style.width = '0%';
      if (musicOn && musicWasOnBeforeVoice) fadeMusic(0.55, 600);
      musicWasOnBeforeVoice = false;
    });
    voiceAudio.addEventListener('timeupdate', () => {
      if (!voiceAudio.duration) return;
      voiceFill.style.width = (voiceAudio.currentTime / voiceAudio.duration * 100) + '%';
    });
  }

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
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        if (entry.target.id === 'thirty') {
          // stagger card reveal
          const cs = entry.target.querySelectorAll('.card');
          cs.forEach((c, i) => {
            setTimeout(() => c.classList.add('in'), i * 60);
          });
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

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
    const bank = (fd.get('bank') || '').toString().trim();
    const account = (fd.get('account') || '').toString().trim();
    const whatsapp = (fd.get('whatsapp') || '').toString().trim();
    const note = (fd.get('note') || '').toString().trim();

    if (!name || !bank || !account || !whatsapp) {
      shake(moneyForm);
      return;
    }

    const subject = `🎁 from Princess — account details`;
    const body =
`hi —

it's Chiamaka. I picked the envelope. here are my details:

  • name      : ${name}
  • bank      : ${bank}
  • account # : ${account}
  • whatsapp  : ${whatsapp}

${note ? `note: ${note}\n\n` : ''}thank you for thinking of me. ♡
— Follow`;

    const mailto = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;

    setTimeout(() => {
      moneyForm.classList.add('hidden');
      moneyThanks?.classList.remove('hidden');
      burstConfetti(120);
      writeState({ choice: 'money', at: Date.now(), submitted: true });
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
