---
title: transmission.2026.07.31.17.57.47
draft: false
---

<div class="yt">
<iframe width="800" height="450" src="https://www.youtube.com/embed/1Wl-IhXyPik?si=ckNHE5jXJbuhYyeV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

Strudel attacking the RYTM and Harmor.

Code:

```javascript
setcpm(160 / 4);
const RYTM_PORT = "Elektron Analog Rytm MKII";
const STAB1_PORT = "IAC Driver Bus 1";
const STAB2_PORT = "IAC Driver Bus 2";
const LAYER1_PORT = "IAC Driver Bus 3";
const LAYER2_PORT = "IAC Driver Bus 4";
const mute = (_) => silence;
const on = (x) => x;
const drumsOn = on;
const stab1On = on;
const stab2On = on;
const anchor1On = on;
const anchor2On = on;
const layer1On = on;
const layer22On = on;

const channelTransform = (pattern) =>
  pattern.sometimesBy(perlin.slow(5.111).range(0, 1), (x) =>
    x.add(midichan(-2)),
  );

const stabChannel = "<3 5 4 6 2 7>/3";
const layerChannel = 8;

const drumSeq = "{3 3 3@3 3@3    3 7 8 7 4 7}%16";
const stabSeq = "{1 1 1@3 1@3    1@4 0@2}%16";

const transform = (pattern) =>
  pattern
    .mask("{1 1 [1 0]/2 1 0}%2")
    .someCyclesBy(0.2, (x) => x.linger(3 / 16))
    .chunk(4, (x) => x.rev());

const rytmProgram = "<0 3 8 2 5 4 1 6 7>/5";

const rytmProgramChannel = 15;

$: progNum(rytmProgram).midichan(rytmProgramChannel).midi(RYTM_PORT);

$: drumsOn(
  transform(channelTransform(midichan(drumSeq).note("c2").velocity(1))).midi(
    RYTM_PORT,
  ),
);

$: stab1On(
  transform(
    stack(
      note("c3").struct(stabSeq).midichan(stabChannel).velocity(1),
      note("c3").struct(invert(stabSeq)).midichan(stabChannel).velocity(0.1),
    ),
  ),
).midi(STAB1_PORT);

$: stab2On(
  transform(
    stack(
      note("c3").struct(invert(stabSeq)).midichan(stabChannel).velocity(1),
      note("c3").struct(stabSeq).midichan(stabChannel).velocity(0.1),
    ),
  ),
).midi(STAB2_PORT);

$: anchor1On(note("c2").fast(2).velocity(1).midichan(9).midi(RYTM_PORT));

$: anchor2On(note("~ c2").velocity(1).midichan(11).midi(RYTM_PORT));

$: layer1On(
  note("c3").slow(8).velocity(1).midichan(layerChannel).midi(LAYER1_PORT),
);

$: layer22On(
  note("c3").slow(9.1).velocity(1).midichan(layerChannel).midi(LAYER2_PORT),
);
```
