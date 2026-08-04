import { useEffect, useMemo, useRef, useState } from "react";
import { GalaxyCanvas } from "./GalaxyCanvas";
import {
  ArrowLeft,
  ArrowRight,
  ArrowSquareOut,
  CaretDown,
  CheckCircle,
  Compass,
  DiceFive,
  MagicWand,
  Plus,
  SlidersHorizontal,
  Sparkle,
  X,
} from "@phosphor-icons/react";

const scene = (name) => `${import.meta.env.BASE_URL}assets/scenes/${name}`;

const worlds = [
  {
    id: "realtime-visuals",
    title: "Realtime Visuals",
    shortTitle: "Live Visuals",
    index: "01",
    category: "Visual model",
    description: "Continuous image and video transformation that keeps motion, identity, and structure alive while the scene changes.",
    research: "Lucy · Krea Realtime",
    accent: "#7ed5d8",
    layout: { x: 13, y: 9, size: 25, depth: 3, delay: -4 },
    images: [
      scene("generated/neon-city-v1.webp"),
      scene("generated/alpine-village-v1.webp"),
      scene("generated/underwater-city-v1.webp"),
    ],
  },
  {
    id: "world-models",
    title: "World Models",
    shortTitle: "World Models",
    index: "02",
    category: "Interactive world",
    description: "Action-conditioned environments that continue beyond one clip and respond to direction, movement, and state.",
    research: "Oasis · Genie · Cosmos",
    accent: "#d4c899",
    layout: { x: 34, y: 39, size: 16, depth: 2, delay: -11 },
    images: [
      scene("generated/underwater-city-v1.webp"),
      scene("generated/forest-cottage-v1.webp"),
      scene("generated/desert-expedition-v1.webp"),
    ],
  },
  {
    id: "avatars",
    title: "Live Avatars",
    shortTitle: "Avatars",
    index: "03",
    category: "Realtime character",
    description: "A conversational chain of speech recognition, language, voice, expression, lip sync, and streamed video.",
    research: "Anam · HeyGen · Tavus",
    accent: "#db9273",
    layout: { x: 73, y: 17, size: 24, depth: 3, delay: -7 },
    images: [
      scene("generated/alpine-village-v1.webp"),
      scene("generated/neon-city-v1.webp"),
      scene("generated/forest-cottage-v1.webp"),
    ],
  },
  {
    id: "motion-capture",
    title: "Motion Capture",
    shortTitle: "Motion",
    index: "04",
    category: "Structured motion",
    description: "Video becomes skeletons, keypoints, and editable 3D motion that can drive characters, tools, and machines.",
    research: "Move AI · DeepMotion",
    accent: "#aab2bf",
    layout: { x: 51, y: 45, size: 22, depth: 3, delay: -15 },
    images: [
      scene("generated/desert-expedition-v1.webp"),
      scene("generated/robot-frontier-v1.webp"),
      scene("generated/neon-city-v1.webp"),
    ],
  },
  {
    id: "try-on",
    title: "Virtual Try-On",
    shortTitle: "Try-On",
    index: "05",
    category: "Fashion AI",
    description: "Person and garment references are aligned through pose, parsing, correspondence, and generative synthesis.",
    research: "FASHN VTON · Lucy VTON",
    accent: "#b994ad",
    layout: { x: -7, y: 67, size: 36, depth: 4, delay: -2 },
    images: [
      scene("generated/fashion-atelier-v1.webp"),
      scene("generated/neon-city-v1.webp"),
      scene("generated/alpine-village-v1.webp"),
    ],
  },
  {
    id: "evidence-systems",
    title: "Evidence Systems",
    shortTitle: "Evidence",
    index: "06",
    category: "Information system",
    description: "Sources become normalized events, evidence chains, change signals, explanations, and decision-ready views.",
    research: "Crucix · World Monitor",
    accent: "#70a7a5",
    layout: { x: 61, y: 7, size: 11, depth: 1, delay: -18 },
    images: [
      scene("generated/evidence-archive-v1.webp"),
      scene("generated/alpine-village-v1.webp"),
      scene("generated/forest-cottage-v1.webp"),
    ],
  },
  {
    id: "robotics",
    title: "Physical AI",
    shortTitle: "Robotics",
    index: "07",
    category: "Action loop",
    description: "Observation, policy, action, and new world state form a closed loop for robotics and driving simulation.",
    research: "Cosmos · GAIA-2",
    accent: "#c4a467",
    layout: { x: 43, y: 78, size: 13, depth: 2, delay: -9 },
    images: [
      scene("generated/robot-frontier-v1.webp"),
      scene("generated/desert-expedition-v1.webp"),
      scene("generated/evidence-archive-v1.webp"),
    ],
  },
  {
    id: "prompt-systems",
    title: "Prompt Systems",
    shortTitle: "Prompts",
    index: "08",
    category: "Control language",
    description: "Intent becomes an executable contract: target, operation, constraints, evidence, and completion criteria.",
    research: "Prompt Master",
    accent: "#d88868",
    layout: { x: 72, y: 63, size: 13, depth: 2, delay: -13 },
    images: [
      scene("generated/forest-cottage-v1.webp"),
      scene("generated/evidence-archive-v1.webp"),
      scene("generated/underwater-city-v1.webp"),
    ],
  },
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

function WorldDetail({ world, frame, onFrameChange, onClose, onPrevious, onNext }) {
  if (!world) return null;

  return (
    <aside className="world-detail" aria-label={`${world.title} details`}>
      <button className="icon-button detail-close" type="button" onClick={onClose} aria-label="Close world details">
        <X size={18} weight="regular" />
      </button>
      <p className="detail-kicker">World {world.index} · {world.category}</p>
      <h1>{world.title}</h1>
      <p className="detail-description">{world.description}</p>
      <div className="detail-scenes" aria-label="World scene images">
        {world.images.map((image, index) => (
          <button
            key={image}
            className={index === frame ? "is-active" : ""}
            type="button"
            onClick={() => onFrameChange(index)}
            aria-label={`Show scene ${index + 1}`}
            aria-pressed={index === frame}
          >
            <img src={image} alt="" />
          </button>
        ))}
      </div>
      <div className="detail-meta">
        <span>Research trail</span>
        <strong>{world.research}</strong>
      </div>
      <div className="detail-nav">
        <button type="button" onClick={onPrevious}><ArrowLeft size={18} />Previous</button>
        <button type="button" onClick={onNext}>Next<ArrowRight size={18} /></button>
      </div>
    </aside>
  );
}

function WorldComposer({ open, onClose }) {
  const dialogRef = useRef(null);
  const [theme, setTheme] = useState("");
  const [category, setCategory] = useState("Visual world");
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const close = () => {
    setComplete(false);
    onClose();
  };

  const submit = (event) => {
    event.preventDefault();
    if (!theme.trim()) return;
    setComplete(true);
  };

  return (
    <dialog ref={dialogRef} className="composer" onClose={close} onCancel={close}>
      <button className="icon-button composer-close" type="button" onClick={close} aria-label="Close world composer">
        <X size={18} />
      </button>
      {complete ? (
        <div className="composer-success" aria-live="polite">
          <CheckCircle size={38} weight="thin" />
          <p>World sketch ready</p>
          <h2>{theme}</h2>
          <span>{category} · local concept only</span>
          <button className="primary-action" type="button" onClick={close}>Return to the worlds</button>
        </div>
      ) : (
        <form onSubmit={submit}>
          <p className="detail-kicker">Local world composer</p>
          <h2>Create a new world</h2>
          <p>Describe the atmosphere. This prototype creates the interaction state only—no model or token is used.</p>
          <label htmlFor="world-theme">World direction</label>
          <input
            id="world-theme"
            value={theme}
            onChange={(event) => setTheme(event.target.value)}
            placeholder="A quiet city that remembers every conversation"
            autoComplete="off"
            required
          />
          <fieldset>
            <legend>World type</legend>
            <div className="category-options">
              {["Visual world", "Avatar space", "Physical AI"].map((option) => (
                <button
                  key={option}
                  className={category === option ? "is-active" : ""}
                  type="button"
                  onClick={() => setCategory(option)}
                  aria-pressed={category === option}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>
          <button className="primary-action" type="submit"><Sparkle size={17} />Create local sketch</button>
        </form>
      )}
    </dialog>
  );
}

export function App() {
  const [frameTick, setFrameTick] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [hoveredWorldInfo, setHoveredWorldInfo] = useState(null);
  const [manualFrames, setManualFrames] = useState({});
  const [mode, setMode] = useState("explore");
  const [composerOpen, setComposerOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  const selectedIndex = worlds.findIndex((world) => world.id === selectedId);
  const selectedWorld = selectedIndex >= 0 ? worlds[selectedIndex] : null;
  const hoveredWorld = hoveredWorldInfo
    ? worlds.find((world) => world.id === hoveredWorldInfo.id)
    : null;

  useEffect(() => {
    if (reducedMotion || selectedWorld) return undefined;
    const timer = window.setInterval(() => setFrameTick((current) => current + 1), 5200);
    return () => window.clearInterval(timer);
  }, [reducedMotion, selectedWorld]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key !== "Escape") return;
      if (composerOpen) {
        setComposerOpen(false);
        return;
      }
      if (selectedId) setSelectedId(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selectedId, composerOpen]);

  const frames = useMemo(() => Object.fromEntries(
    worlds.map((world, index) => [world.id, manualFrames[world.id] ?? ((frameTick + index) % world.images.length)]),
  ), [frameTick, manualFrames]);

  const moveSelection = (direction) => {
    const current = selectedIndex >= 0 ? selectedIndex : 0;
    const next = (current + direction + worlds.length) % worlds.length;
    setHoveredWorldInfo(null);
    setSelectedId(worlds[next].id);
  };

  const selectWorld = (worldId) => {
    setHoveredWorldInfo(null);
    setSelectedId(worldId);
  };

  const focusRandomWorld = () => {
    const candidates = worlds.filter((world) => world.id !== selectedId);
    const world = candidates[Math.floor(Math.random() * candidates.length)];
    selectWorld(world.id);
  };

  return (
    <main className={`app-shell mode-${mode}${selectedWorld ? " has-selection" : ""}`}>
      <div
        className="ambient-backdrop"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 44%, #081222 0%, #030813 48%, #01040a 100%)",
        }}
        aria-hidden="true"
      />

      <header className="topbar">
        <a className="brand" href="#world-stage" aria-label="Glass Worlds Gallery home">
          <span className="brand-mark"><MagicWand size={18} weight="fill" /></span>
          <span>Glass Worlds</span>
        </a>
        <nav aria-label="World gallery modes">
          <button className={mode === "explore" ? "is-active" : ""} type="button" onClick={() => setMode("explore")}>
            <Compass size={18} />Explore
          </button>
          <button className={mode === "directing" ? "is-active" : ""} type="button" onClick={() => setMode("directing")}>
            <SlidersHorizontal size={18} />Directing
          </button>
        </nav>
        <div className="topbar-meta">
          <span>Research 05</span>
          <a
            className="reference-link"
            href="https://www.happyoyster.com/home"
            target="_blank"
            rel="noreferrer"
            aria-label="Open the original Happy Oyster visual reference"
          >
            Original reference <ArrowSquareOut size={14} />
          </a>
          <button className="quiet-button" type="button" onClick={() => setComposerOpen(true)}>Open composer</button>
        </div>
      </header>

      <section className="stage-scroll" id="world-stage" aria-label="Interactive research worlds">
        <GalaxyCanvas
          worlds={worlds}
          selectedId={selectedId}
          reducedMotion={reducedMotion}
          onSelect={selectWorld}
          onHoverChange={setHoveredWorldInfo}
        />
        <div className="keyboard-worlds" aria-label="World selection shortcuts">
          {worlds.map((world) => (
            <button key={world.id} type="button" onClick={() => selectWorld(world.id)}>
              <span>{world.index}</span>{world.title}
            </button>
          ))}
        </div>
      </section>

      {hoveredWorld && hoveredWorldInfo && !selectedWorld && (
        <div
          className={`world-hover-card${hoveredWorldInfo.y < 190 ? " is-below" : ""}`}
          style={{ left: hoveredWorldInfo.x, top: hoveredWorldInfo.y }}
          aria-hidden="true"
        >
          <span>WORLD {hoveredWorld.index} · {hoveredWorld.category}</span>
          <strong>{hoveredWorld.title}</strong>
          <em>Explore</em>
        </div>
      )}

      {mode === "directing" && !selectedWorld && (
        <div className="directing-hint" role="status">
          <Sparkle size={16} />Choose a world to direct its scene sequence
        </div>
      )}

      <WorldDetail
        world={selectedWorld}
        frame={selectedWorld ? frames[selectedWorld.id] : 0}
        onFrameChange={(frame) => setManualFrames((current) => ({ ...current, [selectedWorld.id]: frame }))}
        onClose={() => selectWorld(null)}
        onPrevious={() => moveSelection(-1)}
        onNext={() => moveSelection(1)}
      />

      <div className="bottom-controls">
        <button className="create-button" type="button" onClick={() => setComposerOpen(true)}>
          <Plus size={20} weight="light" />Create a new world
        </button>
        <button className="random-button" type="button" onClick={focusRandomWorld} aria-label="Open a random world">
          <DiceFive size={20} />
        </button>
      </div>

      <div className="explore-cue" aria-hidden="true">
        <span>Move to drift · scroll to travel · click to enter</span><CaretDown size={16} />
      </div>

      <WorldComposer open={composerOpen} onClose={() => setComposerOpen(false)} />
    </main>
  );
}
