/* Soft instrumental wedding music.
   - If WEDDING.musicUrl is set, a looping <audio> element is used.
   - Otherwise a gentle, royalty-free ambient piece is synthesised
     live with the WebAudio API (warm pad + soft arpeggio + bell). */

const CHORDS: number[][] = [
  [57, 60, 64], // Am
  [53, 57, 60], // F
  [60, 64, 67], // C
  [55, 59, 62], // G
];

const midiToFreq = (m: number) => 440 * Math.pow(2, (m - 69) / 12);

export class MusicPlayer {
  playing = false;
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private timer: number | null = null;
  private nextBar = 0;
  private barIndex = 0;
  private audioEl: HTMLAudioElement | null = null;

  start(fileUrl?: string | null) {
    if (this.playing) return;
    this.playing = true;
    if (fileUrl) {
      this.startFile(fileUrl);
    } else {
      this.startSynth();
    }
  }

  stop() {
    this.playing = false;
    if (this.audioEl) {
      const el = this.audioEl;
      this.audioEl = null;
      el.pause();
      el.src = "";
    }
    if (this.ctx && this.master) {
      const ctx = this.ctx;
      const master = this.master;
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setTargetAtTime(0, ctx.currentTime, 0.18);
      window.setTimeout(() => {
        if (!this.playing) void ctx.suspend();
      }, 900);
    }
    if (this.timer !== null) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
  }

  /* ------------------------- audio file ------------------------- */

  private startFile(url: string) {
    const el = new Audio(url);
    el.loop = true;
    el.volume = 0;
    el.play().then(() => {
      const t = window.setInterval(() => {
        if (el.volume < 0.75) el.volume = Math.min(0.75, el.volume + 0.03);
        else window.clearInterval(t);
      }, 120);
    });
    this.audioEl = el;
  }

  /* -------------------------- synthesizer ----------------------- */

  private ensureCtx() {
    if (this.ctx) return this.ctx;
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctor();

    const master = ctx.createGain();
    master.gain.value = 0;

    const reverbish = ctx.createDelay(2);
    reverbish.delayTime.value = 0.42;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.36;
    const damp = ctx.createBiquadFilter();
    damp.type = "lowpass";
    damp.frequency.value = 2400;
    const wet = ctx.createGain();
    wet.gain.value = 0.22;

    reverbish.connect(damp);
    damp.connect(feedback);
    feedback.connect(reverbish);
    damp.connect(wet);
    wet.connect(master);

    master.connect(ctx.destination);
    this.ctx = ctx;
    this.master = master;
    return ctx;
  }

  private startSynth() {
    const ctx = this.ensureCtx();
    void ctx.resume();

    const master = this.master!;
    const t0 = ctx.currentTime + 0.05;
    master.gain.cancelScheduledValues(t0);
    master.gain.setValueAtTime(0, t0);
    master.gain.linearRampToValueAtTime(0.85, t0 + 2.2);

    this.barIndex = 0;
    this.nextBar = ctx.currentTime + 0.15;
    this.tick();
    this.timer = window.setInterval(() => this.tick(), 400);
  }

  private tick() {
    if (!this.ctx || !this.master) return;
    const ctx = this.ctx;
    const BAR = 4.0; // 60 bpm
    while (this.nextBar < ctx.currentTime + 2.6) {
      this.scheduleBar(this.barIndex % CHORDS.length, this.nextBar, BAR);
      this.nextBar += BAR;
      this.barIndex += 1;
    }
  }

  private scheduleBar(chordIdx: number, t: number, BAR: number) {
    const ctx = this.ctx!;
    const out = this.master!;
    const chord = CHORDS[chordIdx];

    // warm pad across the whole bar
    chord.forEach((m, i) => {
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.value = midiToFreq(m);
      osc.detune.value = i === 1 ? 4 : -4;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.028, t + 1.1);
      g.gain.setValueAtTime(0.028, t + BAR - 1.2);
      g.gain.linearRampToValueAtTime(0, t + BAR);
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 750;
      osc.connect(g);
      g.connect(lp);
      lp.connect(out);
      osc.start(t);
      osc.stop(t + BAR + 0.1);
    });

    // deep root
    const sub = ctx.createOscillator();
    sub.type = "sine";
    sub.frequency.value = midiToFreq(chord[0] - 12);
    const sg = ctx.createGain();
    sg.gain.setValueAtTime(0, t);
    sg.gain.linearRampToValueAtTime(0.05, t + 0.5);
    sg.gain.linearRampToValueAtTime(0, t + BAR * 0.92);
    sub.connect(sg);
    sg.connect(out);
    sub.start(t);
    sub.stop(t + BAR);

    // soft arpeggio — 8 steps
    const step = BAR / 8;
    const pattern = [0, 1, 2, 1, 0, 1, 2, 1];
    pattern.forEach((p, i) => {
      const st = t + i * step + 0.02;
      const m = chord[p] + (i >= 4 ? 12 : 0);
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = midiToFreq(m);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, st);
      g.gain.exponentialRampToValueAtTime(0.085, st + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, st + 1.5);
      osc.connect(g);
      g.connect(out);
      osc.start(st);
      osc.stop(st + 1.6);
    });

    // high bell twinkle
    const bell = ctx.createOscillator();
    bell.type = "sine";
    bell.frequency.value = midiToFreq(chord[2] + 24);
    const bg = ctx.createGain();
    bg.gain.setValueAtTime(0.0001, t + 0.05);
    bg.gain.exponentialRampToValueAtTime(0.035, t + 0.08);
    bg.gain.exponentialRampToValueAtTime(0.0001, t + 3.2);
    bell.connect(bg);
    bg.connect(out);
    bell.start(t + 0.05);
    bell.stop(t + 3.4);
  }
}
