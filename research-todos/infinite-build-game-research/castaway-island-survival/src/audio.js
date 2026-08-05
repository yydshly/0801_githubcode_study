const SOUND_PREF_KEY = 'castaway.audio-muted.v1';

export function createAudioController() {
  let context = null;
  let master = null;
  let unlocked = false;
  let voices = 0;
  let muted = localStorage.getItem(SOUND_PREF_KEY) === 'true';
  const layers = {};

  function makeNoiseLayer(type, frequency, volume) {
    const length = context.sampleRate * 2;
    const buffer = context.createBuffer(1, length, context.sampleRate);
    const data = buffer.getChannelData(0);
    let previous = 0;
    for (let i = 0; i < length; i += 1) {
      const white = Math.random() * 2 - 1;
      previous = previous * 0.92 + white * 0.08;
      data[i] = type === 'brown' ? previous * 2.8 : white;
    }
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    const filter = context.createBiquadFilter();
    filter.type = type === 'brown' ? 'lowpass' : 'bandpass';
    filter.frequency.value = frequency;
    filter.Q.value = type === 'brown' ? 0.5 : 0.8;
    const gain = context.createGain();
    gain.gain.value = volume;
    source.connect(filter).connect(gain).connect(master);
    source.start();
    return gain;
  }

  async function unlock() {
    if (!context) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return false;
      context = new AudioContextClass();
      master = context.createGain();
      master.gain.value = muted ? 0 : 0.75;
      master.connect(context.destination);
      layers.ocean = makeNoiseLayer('brown', 280, 0.18);
      layers.wind = makeNoiseLayer('white', 760, 0.045);
      layers.rain = makeNoiseLayer('white', 2400, 0);
      layers.fire = makeNoiseLayer('brown', 1150, 0);
    }
    if (context.state === 'suspended') await context.resume();
    unlocked = true;
    return true;
  }

  function setMuted(nextMuted) {
    muted = Boolean(nextMuted);
    localStorage.setItem(SOUND_PREF_KEY, String(muted));
    if (master && context) master.gain.setTargetAtTime(muted ? 0 : 0.75, context.currentTime, 0.04);
    return muted;
  }

  async function toggle() {
    await unlock();
    return setMuted(!muted);
  }

  function update({ rain = 0, fire = 0, night = 0 }) {
    if (!unlocked || !context) return;
    const t = context.currentTime;
    layers.ocean.gain.setTargetAtTime(0.14 + rain * 0.08, t, 0.3);
    layers.wind.gain.setTargetAtTime(0.035 + rain * 0.09 + night * 0.025, t, 0.3);
    layers.rain.gain.setTargetAtTime(rain * 0.16, t, 0.18);
    layers.fire.gain.setTargetAtTime(fire * 0.085, t, 0.15);
  }

  function cue(name) {
    if (!unlocked || muted || !context || voices >= 6) return;
    const tones = {
      pickup: [520, 0.08], craft: [330, 0.18], build: [220, 0.24], fish: [620, 0.16],
      fuel: [180, 0.22], complete: [440, 0.42], sleep: [260, 0.55], dawn: [560, 0.62],
    };
    const [frequency, duration] = tones[name] ?? [400, 0.12];
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = name === 'fuel' || name === 'build' ? 'triangle' : 'sine';
    oscillator.frequency.setValueAtTime(frequency, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.35, context.currentTime + duration);
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);
    oscillator.connect(gain).connect(master);
    voices += 1;
    oscillator.onended = () => { voices = Math.max(0, voices - 1); oscillator.disconnect(); gain.disconnect(); };
    oscillator.start();
    oscillator.stop(context.currentTime + duration + 0.02);
  }

  document.addEventListener('visibilitychange', () => {
    if (!context) return;
    if (document.hidden) context.suspend();
    else if (unlocked) context.resume();
  });

  return { unlock, toggle, setMuted, update, cue, isMuted: () => muted, isUnlocked: () => unlocked };
}
