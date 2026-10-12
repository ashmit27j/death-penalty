// ============================================================
// PLACEHOLDERS — fill these in. Empty strings hide the link.
// ============================================================
export const EXE_DOWNLOAD_URL = ""; // direct link to the Windows .exe / zip
export const UNITY_CLOUD_URL = ""; // Unity Cloud project link
export const GAMEPLAY_VIDEO_URL = ""; // e.g. "https://.../gameplay.mp4"
export const GAMEPLAY_VIDEO_DURATION = "00:42";

export const GAME_VERSION = "v0.x";
export const BUILD_FILE_SIZE = "— MB";
export const BUILD_LAST_UPDATED = "2026-—-—";
export const PROJECT_LAST_UPDATED = "2026-—-—";

export const PROJECT_GITHUB_URL = "";
export const ITCH_IO_URL = "";

export interface Developer {
  name: string;
  role: string;
  github: string; // GITHUB_URL
  linkedin: string; // LINKEDIN_URL
}

export const DEVELOPERS: Developer[] = [
  { name: "Ashmit Jain", role: "Gameplay Programming • Systems • UI", github: "", linkedin: "" },
  { name: "Sukhada Gulhane", role: "Game Design • Programming", github: "", linkedin: "" },
  { name: "Neerav Reddy", role: "Programming", github: "", linkedin: "" },
];

export const PRINCIPLES = [
  { title: "Momentum is everything.", body: "Speed is your armor — slow down and the run is over." },
  { title: "Every surface is a route.", body: "Walls, rails and rooftops are all paths if you read them right." },
  { title: "Fast to learn, hard to master.", body: "Simple inputs, deep movement tech for players who dig in." },
  { title: "One hit, one chance.", body: "Lethal for you and the enemy. Precision over spray." },
  { title: "Built in Unity.", body: "Made by a small team, iterated the hard way." },
];

export const META_ROW = ["Windows", "Unity", "Single-player", GAME_VERSION];
