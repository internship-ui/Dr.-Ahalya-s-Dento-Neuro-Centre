/**
 * ============================================================================
 * LUMINA DENTAL CLINIC - LAUNCH EXPERIENCE ENGINE
 * Dual Side Pop Blasters, Crystalline Audio Synthesizer & 3-2-1 Dental Countdown
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// 1. Configuration & Persistent State
// ---------------------------------------------------------------------------
const DENTAL_LAUNCH_CONFIG = {
  clinicName: 'Dr. Ahalya’s Dento Neuro Centre',
  targetUrl: 'http://www.drahalyasdentoneurocentre.com/',
  openInNewTab: false,
  autoRedirect: true,
  theme: localStorage.getItem('launch_theme') || 'dark',
  redirectDelayMs: 2800,
  soundEnabled: true
};
try { localStorage.removeItem('launch_target_url'); } catch (e) {}

// ---------------------------------------------------------------------------
// 2. Procedural Crystal Audio Synthesizer (Dental Clinic Harmonies)
// ---------------------------------------------------------------------------
class DentalSoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Sparkling crystalline chime for countdown (3, 2, 1)
  playCrystalChime(freq = 587.33, duration = 0.35) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // Primary tone (triangle wave for pure bell-like warmth)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Shimmer overtone (2.5x frequency for crystal sparkle)
      const sparkleOsc = this.ctx.createOscillator();
      const sparkleGain = this.ctx.createGain();
      sparkleOsc.type = 'sine';
      sparkleOsc.frequency.setValueAtTime(freq * 2.76, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.24, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      sparkleGain.gain.setValueAtTime(0.001, now);
      sparkleGain.gain.linearRampToValueAtTime(0.08, now + 0.01);
      sparkleGain.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.7);

      osc.connect(gain);
      sparkleOsc.connect(sparkleGain);
      gain.connect(this.ctx.destination);
      sparkleGain.connect(this.ctx.destination);

      osc.start(now);
      sparkleOsc.start(now);
      osc.stop(now + duration);
      sparkleOsc.stop(now + duration);
    } catch (e) {
      console.warn('Audio playback error', e);
    }
  }

  // Pneumatic Celebration Cannon Pop Sound
  playPopBlaster() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.45;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);

      // White noise air-pop burst
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.055));
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1800, now);
      filter.frequency.exponentialRampToValueAtTime(250, now + 0.3);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.55, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

      // Low end thump
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.frequency.setValueAtTime(150, now);
      subOsc.frequency.exponentialRampToValueAtTime(50, now + 0.28);

      subGain.gain.setValueAtTime(0.45, now);
      subGain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);

      whiteNoise.start(now);
      subOsc.start(now);
      subOsc.stop(now + 0.3);
    } catch (e) {
      console.warn('Audio playback error', e);
    }
  }

  // Grand Dental Clinic Opening Harpsichord / Chime Fanfare
  playCelebrationFanfare() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // D Major / Ethereal chord arpeggio (D5, F#5, A5, D6)
      const notes = [587.33, 739.99, 880.00, 1174.66];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + idx * 0.09;
        const dur = 1.1;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.2, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + dur);
      });
    } catch (e) {
      console.warn('Audio playback error', e);
    }
  }

  // Realistic Staccato Cracker Pop Sequence
  playCracker() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const count = 3 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        const offset = i * 0.045 + Math.random() * 0.02;
        const dur = 0.07;
        const buffer = this.ctx.createBuffer(1, Math.floor(this.ctx.sampleRate * dur), this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let j = 0; j < data.length; j++) {
          data[j] = (Math.random() * 2 - 1) * Math.exp(-j / (this.ctx.sampleRate * 0.015));
        }
        const src = this.ctx.createBufferSource();
        src.buffer = buffer;
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.35, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + dur);
        src.connect(gain);
        gain.connect(this.ctx.destination);
        src.start(now + offset);
      }
    } catch (e) {}
  }

  // Aerial Firework Detonation Boom
  playFireworkBoom() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.4);
      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    } catch (e) {}
  }
}

const sounds = new DentalSoundEngine();

// ---------------------------------------------------------------------------
// 3. High-Performance Particle Engine for Side Pop Blasters
// ---------------------------------------------------------------------------
class DentalCelebrationEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.animId = null;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  // Trigger grand dual celebration burst from left & right sides
  blast() {
    const leftX = Math.min(window.innerWidth * 0.12, 130);
    const rightX = Math.max(window.innerWidth * 0.88, window.innerWidth - 130);
    const blastY = window.innerHeight - 85;

    // Wave 1: Immediate explosive eruption
    this.spawnSalvo(leftX, blastY, 52, 230);
    this.spawnSalvo(rightX, blastY, 128, 230);

    // Wave 2: Streamer ribbon flurry at +150ms
    setTimeout(() => {
      this.spawnSalvo(leftX, blastY, 58, 130);
      this.spawnSalvo(rightX, blastY, 122, 130);
    }, 150);

    // Wave 3: Pearl & Gold diamond rain at +350ms
    setTimeout(() => {
      this.spawnSalvo(leftX, blastY, 48, 110);
      this.spawnSalvo(rightX, blastY, 132, 110);
    }, 350);

    if (!this.animId) {
      this.loop();
    }
  }

  spawnSalvo(x, y, baseAngleDeg, count) {
    // Luxury dental celebration palette: Turquoise, Mint, Gold, Pearl White, Rose Quartz
    const colors = [
      '#00e5ff', '#00f5d4', '#48cae4', '#ffffff',
      '#ffd166', '#ffe082', '#ff758c', '#a0e7e5'
    ];

    for (let i = 0; i < count; i++) {
      const spread = (Math.random() - 0.5) * 46;
      const angleRad = ((baseAngleDeg + spread) * Math.PI) / 180;
      
      const speed = 23 + Math.random() * 27;
      const vx = Math.cos(angleRad) * speed;
      const vy = -Math.sin(angleRad) * speed;

      // 0 = metallic foil rectangle, 1 = streamer ribbon, 2 = diamond sparkle
      const type = Math.floor(Math.random() * 3);

      this.particles.push({
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 15,
        vx: vx,
        vy: vy,
        gravity: 0.44 + Math.random() * 0.18,
        drag: 0.983,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: type === 1 ? 18 + Math.random() * 16 : 7 + Math.random() * 9,
        aspectRatio: type === 1 ? 0.22 : 0.6 + Math.random() * 0.5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 20,
        flipSpeed: (Math.random() - 0.5) * 0.24,
        flip: Math.random() * Math.PI,
        type: type,
        opacity: 1,
        life: 0,
        maxLife: 260 + Math.random() * 130
      });
    }
  }

  loop() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      p.life++;
      p.vx *= p.drag;
      p.vy = (p.vy * p.drag) + p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;
      p.flip += p.flipSpeed;

      if (p.life > p.maxLife - 60) {
        p.opacity = Math.max(0, (p.maxLife - p.life) / 60);
      }

      this.drawParticle(p);

      if (p.life >= p.maxLife || p.y > this.height + 60) {
        this.particles.splice(i, 1);
      }
    }

    if (this.particles.length > 0) {
      this.animId = requestAnimationFrame(() => this.loop());
    } else {
      this.animId = null;
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
  }

  drawParticle(p) {
    this.ctx.save();
    this.ctx.translate(p.x, p.y);
    this.ctx.rotate((p.rotation * Math.PI) / 180);
    this.ctx.scale(1, Math.cos(p.flip));
    this.ctx.globalAlpha = p.opacity;
    this.ctx.fillStyle = p.color;

    if (p.type === 2) {
      // Sparkling diamond star
      const s = p.size * 0.6;
      this.ctx.beginPath();
      this.ctx.moveTo(0, -s);
      this.ctx.lineTo(s * 0.4, -s * 0.2);
      this.ctx.lineTo(s, 0);
      this.ctx.lineTo(s * 0.4, s * 0.2);
      this.ctx.lineTo(0, s);
      this.ctx.lineTo(-s * 0.4, s * 0.2);
      this.ctx.lineTo(-s, 0);
      this.ctx.lineTo(-s * 0.4, -s * 0.2);
      this.ctx.closePath();
      this.ctx.fill();
    } else {
      // Foil rectangle or ribbon strip
      const w = p.size;
      const h = p.size * p.aspectRatio;
      this.ctx.fillRect(-w / 2, -h / 2, w, h);
    }

    this.ctx.restore();
  }

  clear() {
    this.particles = [];
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}

// ---------------------------------------------------------------------------
// 4. Grand Fireworks & Crackers Engine (For Opened Webpage Celebration)
// ---------------------------------------------------------------------------
class FireworksCrackersEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.rockets = [];
    this.particles = [];
    this.running = false;
    this.animId = null;
    this.timerId = null;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  startShow(durationMs = 9000) {
    this.running = true;
    if (!this.animId) this.loop();

    // Launch barrage of rockets and cracker bursts
    clearInterval(this.timerId);
    this.timerId = setInterval(() => {
      if (!this.running) {
        clearInterval(this.timerId);
        return;
      }
      this.launchRocket();
      if (Math.random() > 0.35) {
        this.launchCrackerSalvo();
      }
    }, 450);

    // Initial immediate launch salvo
    this.launchRocket();
    this.launchRocket();
    this.launchCrackerSalvo();

    if (durationMs > 0) {
      setTimeout(() => {
        this.running = false;
        clearInterval(this.timerId);
      }, durationMs);
    }
  }

  launchRocket() {
    const x = this.width * 0.12 + Math.random() * (this.width * 0.76);
    const targetY = this.height * 0.12 + Math.random() * (this.height * 0.38);
    const speed = 13 + Math.random() * 5;
    const colors = ['#00e5ff', '#00f5d4', '#ffd166', '#ff758c', '#ffffff', '#a855f7', '#38bdf8'];
    this.rockets.push({
      x: x,
      y: this.height,
      vx: (Math.random() - 0.5) * 2.5,
      vy: -speed,
      targetY: targetY,
      color: colors[Math.floor(Math.random() * colors.length)],
      trail: []
    });
  }

  launchCrackerSalvo() {
    const x = this.width * 0.15 + Math.random() * (this.width * 0.7);
    const y = this.height * 0.2 + Math.random() * (this.height * 0.45);
    this.explodeCracker(x, y);
    sounds.playCracker();
  }

  explodeShell(x, y, color) {
    sounds.playFireworkBoom();
    const count = 80 + Math.floor(Math.random() * 50);
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.2;
      const speed = 3.5 + Math.random() * 8.5;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: color,
        alpha: 1,
        decay: 0.012 + Math.random() * 0.014,
        gravity: 0.11,
        isCracker: false
      });
    }
  }

  explodeCracker(x, y) {
    const count = 40 + Math.floor(Math.random() * 30);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.5 + Math.random() * 9;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: Math.random() > 0.45 ? '#ffd166' : '#ffffff',
        alpha: 1,
        decay: 0.03 + Math.random() * 0.03,
        gravity: 0.16,
        isCracker: true
      });
    }
  }

  loop() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Update rockets & trails
    for (let i = this.rockets.length - 1; i >= 0; i--) {
      const r = this.rockets[i];
      r.x += r.vx;
      r.y += r.vy;

      // Draw sparkle rocket head
      this.ctx.beginPath();
      this.ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
      this.ctx.fillStyle = '#ffffff';
      this.ctx.shadowBlur = 12;
      this.ctx.shadowColor = r.color;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;

      // Draw golden ascent spark
      this.ctx.beginPath();
      this.ctx.arc(r.x - r.vx * 1.5, r.y + 4, 2, 0, Math.PI * 2);
      this.ctx.fillStyle = '#ffd166';
      this.ctx.globalAlpha = 0.75;
      this.ctx.fill();
      this.ctx.globalAlpha = 1;

      if (r.y <= r.targetY || r.vy >= 0) {
        this.explodeShell(r.x, r.y, r.color);
        this.rockets.splice(i, 1);
      }
    }

    // Update particles (fireworks & crackers)
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.975;
      p.vy *= 0.975;
      p.alpha -= p.decay;

      if (p.isCracker) {
        // Crackling spark jitter
        p.x += (Math.random() - 0.5) * 1.6;
        p.y += (Math.random() - 0.5) * 1.6;
      }

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.beginPath();
      const radius = p.isCracker ? (1.5 + Math.random() * 1.2) : 2.5;
      this.ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.isCracker && Math.random() > 0.5 ? '#ffffff' : p.color;
      this.ctx.globalAlpha = p.alpha;
      this.ctx.shadowBlur = p.isCracker ? 6 : 12;
      this.ctx.shadowColor = p.color;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
      this.ctx.globalAlpha = 1;
    }

    if (this.rockets.length > 0 || this.particles.length > 0 || this.running) {
      this.animId = requestAnimationFrame(() => this.loop());
    } else {
      this.animId = null;
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
  }

  clear() {
    this.running = false;
    clearInterval(this.timerId);
    this.rockets = [];
    this.particles = [];
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}

// ---------------------------------------------------------------------------
// 5. Pearlescent Ambient Canvas (Gentle Orbs & Clinic Shimmer)
// ---------------------------------------------------------------------------
class PearlescentAmbientBackground {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.orbs = [];
    this.resize();
    this.initOrbs();
    window.addEventListener('resize', () => {
      this.resize();
      this.initOrbs();
    });
    this.render();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  initOrbs() {
    const orbCount = Math.floor((this.width * this.height) / 18000);
    this.orbs = [];
    for (let i = 0; i < orbCount; i++) {
      this.orbs.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 2.8 + 1,
        alpha: Math.random() * 0.6 + 0.2,
        twinkleSpeed: (Math.random() - 0.5) * 0.012,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        isGold: Math.random() > 0.7
      });
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let o of this.orbs) {
      o.x += o.vx;
      o.y += o.vy;
      o.alpha += o.twinkleSpeed;
      if (o.alpha > 0.85 || o.alpha < 0.15) o.twinkleSpeed *= -1;

      if (o.x < 0) o.x = this.width;
      if (o.x > this.width) o.x = 0;
      if (o.y < 0) o.y = this.height;
      if (o.y > this.height) o.y = 0;

      this.ctx.beginPath();
      this.ctx.arc(o.x, o.y, o.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = o.isGold
        ? `rgba(255, 209, 102, ${o.alpha})`
        : `rgba(0, 229, 255, ${o.alpha})`;
      this.ctx.fill();
    }

    requestAnimationFrame(() => this.render());
  }
}

// ---------------------------------------------------------------------------
// 5. Main Application Logic & Launch Controller
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const masterLaunchBtn = document.getElementById('master-launch-btn');
  const countdownOverlay = document.getElementById('countdown-overlay');
  const countdownDisplay = document.getElementById('countdown-display');
  const countdownLabel = document.getElementById('countdown-label');
  const progressCircle = document.getElementById('countdown-progress-circle');

  const celebrationPanel = document.getElementById('celebration-panel');
  const celebrationInfoText = document.getElementById('celebration-info-text');
  const redirectProgressBar = document.getElementById('redirect-progress-bar');
  const openNowBtn = document.getElementById('open-now-btn');
  const relaunchBtn = document.getElementById('relaunch-btn');

  const blasterLeft = document.getElementById('blaster-left');
  const blasterRight = document.getElementById('blaster-right');
  const muzzleFlashLeft = document.getElementById('muzzle-flash-left');
  const muzzleFlashRight = document.getElementById('muzzle-flash-right');

  const displayClinicName = document.getElementById('display-clinic-name');
  const previewUrlText = document.getElementById('preview-url-text');

  // Small Theme Switcher Elements
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeBtnText = document.getElementById('theme-btn-text');
  const themeSunIcon = themeToggleBtn ? themeToggleBtn.querySelector('.theme-sun-icon') : null;
  const themeMoonIcon = themeToggleBtn ? themeToggleBtn.querySelector('.theme-moon-icon') : null;

  function applyTheme(theme) {
    if (theme === 'light-gray') {
      document.body.classList.add('theme-light-gray');
      if (themeBtnText) themeBtnText.textContent = 'Dark Mode';
      if (themeSunIcon) themeSunIcon.style.display = 'none';
      if (themeMoonIcon) themeMoonIcon.style.display = 'block';
    } else {
      document.body.classList.remove('theme-light-gray');
      if (themeBtnText) themeBtnText.textContent = 'Light Gray';
      if (themeSunIcon) themeSunIcon.style.display = 'block';
      if (themeMoonIcon) themeMoonIcon.style.display = 'none';
    }
    DENTAL_LAUNCH_CONFIG.theme = theme;
    localStorage.setItem('launch_theme', theme);
  }

  // Apply initial saved theme
  applyTheme(DENTAL_LAUNCH_CONFIG.theme);

  // Theme Toggle Click Handler
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const nextTheme = DENTAL_LAUNCH_CONFIG.theme === 'light-gray' ? 'dark' : 'light-gray';
      applyTheme(nextTheme);
      if (nextTheme === 'light-gray') {
        sounds.playCrystalChime(784, 0.16); // High crisp bell
      } else {
        sounds.playCrystalChime(523, 0.16); // Deep warm bell
      }
    });
  }

  // Canvas Initializations
  const bgCanvas = document.getElementById('bg-canvas');
  const celebrationCanvas = document.getElementById('celebration-canvas');
  new PearlescentAmbientBackground(bgCanvas);
  const celebrationEngine = new DentalCelebrationEngine(celebrationCanvas);

  // Grand Fireworks & Crackers Engine for Website Launch
  const fireworksCanvas = document.getElementById('fireworks-canvas');
  const fireworksEngine = new FireworksCrackersEngine(fireworksCanvas);

  // Live Opened Website Portal Elements
  const websitePortalOverlay = document.getElementById('website-portal-overlay');
  const openedWebsiteIframe = document.getElementById('opened-website-iframe');
  const portalLiveClinicName = document.getElementById('portal-live-clinic-name');
  const fireworksBurstBtn = document.getElementById('fireworks-burst-btn');
  const portalOpenTabBtn = document.getElementById('portal-open-tab-btn');
  const portalCloseBtn = document.getElementById('portal-close-btn');

  // Circumference: 2 * Math.PI * 130 = ~816.81
  const CIRCLE_CIRCUMFERENCE = 816.81;
  progressCircle.style.strokeDasharray = CIRCLE_CIRCUMFERENCE;
  progressCircle.style.strokeDashoffset = 0;

  // Initialize UI State
  function syncDestinationUI() {
    if (displayClinicName) displayClinicName.textContent = DENTAL_LAUNCH_CONFIG.clinicName;
    if (previewUrlText) {
      previewUrlText.textContent = 'www.drahalyasdentoneurocentre.com';
      previewUrlText.href = DENTAL_LAUNCH_CONFIG.targetUrl;
    }
  }
  syncDestinationUI();

  // -------------------------------------------------------------------------
  // Interactive 3D Tooth Gyroscopic / Mouse Perspective Tracking
  // -------------------------------------------------------------------------
  const toothPerspectiveWrap = document.querySelector('.tooth-3d-perspective-wrap');
  if (masterLaunchBtn && toothPerspectiveWrap) {
    masterLaunchBtn.addEventListener('mousemove', (e) => {
      const rect = masterLaunchBtn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotY = (x / (rect.width / 2)) * 24; // Smooth horizontal 3D tilt
      const rotX = -(y / (rect.height / 2)) * 24; // Smooth vertical 3D tilt

      toothPerspectiveWrap.style.transform = `perspective(600px) rotateX(${rotX.toFixed(1)}deg) rotateY(${rotY.toFixed(1)}deg) translateZ(22px) scale(1.08)`;
    });

    masterLaunchBtn.addEventListener('mouseleave', () => {
      toothPerspectiveWrap.style.transform = `perspective(600px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)`;
    });
  }

  // -------------------------------------------------------------------------
  // 6. Launch Sequence (3, 2, 1 -> Dental Blasters -> Open Website)
  // -------------------------------------------------------------------------
  let redirectInterval = null;
  let redirectTimeout = null;

  function triggerSideBlasters() {
    blasterLeft.classList.add('firing');
    blasterRight.classList.add('firing');

    muzzleFlashLeft.classList.add('flash-active');
    muzzleFlashRight.classList.add('flash-active');

    setTimeout(() => {
      muzzleFlashLeft.classList.remove('flash-active');
      muzzleFlashRight.classList.remove('flash-active');
    }, 180);

    setTimeout(() => {
      blasterLeft.classList.remove('firing');
      blasterRight.classList.remove('firing');
    }, 450);

    // Audio: Pneumatic blast + grand celebration fanfare
    sounds.playPopBlaster();
    sounds.playCelebrationFanfare();

    // Trigger dual side particle celebration
    celebrationEngine.blast();

    // Subtle tactile page resonance
    document.body.style.transform = 'translateY(3px)';
    setTimeout(() => {
      document.body.style.transform = 'translateY(-2px)';
      setTimeout(() => {
        document.body.style.transform = 'none';
      }, 70);
    }, 70);
  }

  function executeWebsiteNavigation() {
    celebrationPanel.classList.remove('active');
    document.body.classList.add('portal-open');
    if (portalLiveClinicName) {
      portalLiveClinicName.textContent = DENTAL_LAUNCH_CONFIG.clinicName;
    }

    // Seamlessly open live website portal with continuous fireworks & crackers celebration!
    if (openedWebsiteIframe && websitePortalOverlay) {
      openedWebsiteIframe.src = DENTAL_LAUNCH_CONFIG.targetUrl;
      websitePortalOverlay.classList.add('active');
      fireworksEngine.startShow(10000); // 10s of rockets & crackling crackers
    } else {
      window.location.href = DENTAL_LAUNCH_CONFIG.targetUrl;
    }

    if (DENTAL_LAUNCH_CONFIG.openNewTab) {
      window.open(DENTAL_LAUNCH_CONFIG.targetUrl, '_blank', 'noopener,noreferrer');
    }
  }

  function startLaunchCountdown() {
    masterLaunchBtn.classList.add('launching');
    countdownOverlay.classList.add('active');

    let currentStep = 3;
    const stepMessages = {
      3: 'STEP 3: PRECISION DIAGNOSTICS',
      2: 'STEP 2: GENTLE LASER CARE',
      1: 'STEP 1: RADIANT SMILE FINISH',
      0: '✨ YOUR NEW SMILE AWAITS!'
    };

    function updateStep(step) {
      if (step === 3) sounds.playCrystalChime(587.33, 0.35); // D5
      if (step === 2) sounds.playCrystalChime(739.99, 0.35); // F#5
      if (step === 1) sounds.playCrystalChime(880.00, 0.4);  // A5

      countdownDisplay.classList.remove('animate-in', 'blast-off');
      void countdownDisplay.offsetWidth; // Force reflow

      if (step > 0) {
        countdownDisplay.textContent = step;
        countdownDisplay.classList.add('animate-in');
        countdownLabel.textContent = stepMessages[step];

        // Pulse the 3D tooth with radiant light
        if (toothPerspectiveWrap) {
          toothPerspectiveWrap.style.transform = `perspective(600px) scale(1.22) translateZ(30px)`;
          setTimeout(() => {
            toothPerspectiveWrap.style.transform = `perspective(600px) scale(1) translateZ(0px)`;
          }, 300);
        }

        // Sweep ring progress
        const offset = CIRCLE_CIRCUMFERENCE * (1 - (4 - step) / 4);
        progressCircle.style.strokeDashoffset = offset;
      } else {
        // Zero reached -> SMILES UNVEILED!
        countdownDisplay.textContent = 'UNVEILED!';
        countdownDisplay.classList.add('animate-in', 'blast-off');
        countdownLabel.textContent = stepMessages[0];
        progressCircle.style.strokeDashoffset = 0;

        // Fire dual side pop blasters!
        triggerSideBlasters();

        // Transition smoothly to celebration card
        setTimeout(() => {
          countdownOverlay.classList.remove('active');
          showCelebrationPanel();
        }, 900);
      }
    }

    // Step 3
    updateStep(3);

    // Step 2
    setTimeout(() => {
      updateStep(2);
    }, 1000);

    // Step 1
    setTimeout(() => {
      updateStep(1);
    }, 2000);

    // Unveiled at 3s
    setTimeout(() => {
      updateStep(0);
    }, 3000);
  }

  function showCelebrationPanel() {
    celebrationPanel.classList.add('active');

    const totalSeconds = 2.5;
    let remainingMs = totalSeconds * 1000;
    const intervalMs = 50;

    if (DENTAL_LAUNCH_CONFIG.autoRedirect) {
      celebrationInfoText.innerHTML = `Entering <strong>${DENTAL_LAUNCH_CONFIG.clinicName}</strong> in <span id="redirect-timer-seconds">2.5</span>s...`;
      redirectProgressBar.style.width = '0%';

      redirectInterval = setInterval(() => {
        remainingMs -= intervalMs;
        const pct = Math.min(100, ((totalSeconds * 1000 - remainingMs) / (totalSeconds * 1000)) * 100);
        redirectProgressBar.style.width = `${pct}%`;

        const secElem = document.getElementById('redirect-timer-seconds');
        if (secElem) {
          secElem.textContent = Math.max(0, (remainingMs / 1000)).toFixed(1);
        }

        if (remainingMs <= 0) {
          clearInterval(redirectInterval);
          executeWebsiteNavigation();
        }
      }, intervalMs);
    } else {
      celebrationInfoText.innerHTML = `Welcome to <strong>${DENTAL_LAUNCH_CONFIG.clinicName}</strong>! Click below to enter:`;
      redirectProgressBar.style.width = '100%';
    }
  }

  function resetLaunchExperience() {
    clearInterval(redirectInterval);
    clearTimeout(redirectTimeout);
    celebrationPanel.classList.remove('active');
    countdownOverlay.classList.remove('active');
    masterLaunchBtn.classList.remove('launching');
    progressCircle.style.strokeDashoffset = 0;
    celebrationEngine.clear();
    fireworksEngine.clear();
    document.body.classList.remove('portal-open');
    if (websitePortalOverlay) {
      websitePortalOverlay.classList.remove('active');
      if (openedWebsiteIframe) openedWebsiteIframe.src = 'about:blank';
    }
  }

  // Master Launch Button Click
  masterLaunchBtn.addEventListener('click', () => {
    startLaunchCountdown();
  });

  // Action Button Handlers
  openNowBtn.addEventListener('click', () => {
    clearInterval(redirectInterval);
    executeWebsiteNavigation();
  });

  relaunchBtn.addEventListener('click', () => {
    resetLaunchExperience();
  });

  // Live Portal Control Handlers
  if (fireworksBurstBtn) {
    fireworksBurstBtn.addEventListener('click', () => {
      fireworksEngine.startShow(6000);
    });
  }

  if (portalOpenTabBtn) {
    portalOpenTabBtn.addEventListener('click', () => {
      window.open(DENTAL_LAUNCH_CONFIG.targetUrl, '_blank', 'noopener,noreferrer');
    });
  }

  if (portalCloseBtn) {
    portalCloseBtn.addEventListener('click', () => {
      resetLaunchExperience();
    });
  }
});
