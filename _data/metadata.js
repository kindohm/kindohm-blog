const colorable = require("colorable");

const rand255 = () => {
  return Math.floor(Math.random() * 255);
};

const randHex = () => rand255().toString(16).padStart(2, "0");

const randHexColor = () => `#${randHex()}${randHex()}${randHex()}`;

const getCombo = () => {
  const randColors = new Array(10).fill(null).reduce((acc, col, i) => {
    return { ...acc, [`color${i}`]: randHexColor() };
  }, {});

  const result = colorable(randColors, { compact: true, threshold: 0 });

  const ideals = result
    .map((c) => {
      const match = c.combinations.find((cc) => cc.accessibility.aaa === true);
      if (!match) return null;
      const foreground = c.hex;
      const background = match.hex;
      return { foreground, background };
    })
    .filter((x) => !!x);

  if (ideals.length === 0) {
    console.log("random color combo not found, trying again");
    return getCombo();
  }

  return ideals[0];
};

const { foreground, background } = getCombo();

console.log("colors:", { foreground, background });

module.exports = {
  risks: [
    "dry mouth",
    "sudden death or dismemberment",
    "night sweats",
    "drowsiness",
    "dizziness",
    "hallucinations",
    "loud noises",
    "dry cough",
    "temporary loss of left and right",
    "unexplained soreness in one calf",
    "excessive blinking",
    "mild but persistent deja vu",
    `thinking it's Tuesday when it isn't`,
    `moments of intense nostalgia for events that never happened`,
    `saying "you too" when inappropriate`,
    `headphones catching on door handles`,
    `brief awareness of the void`,
    `questioning whether a hot dog is a sandwich`,
    `wondering where socks go`,
    `sudden interest in weather patterns`,
  ],
  foreground,
  background,
};
