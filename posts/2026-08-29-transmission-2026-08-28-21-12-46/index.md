---
title: transmission.2026.08.28.21.12.46
draft: false
---

<div class="yt">
<iframe width="560" height="315" src="https://www.youtube.com/embed/_k0HKru59eY?si=cnd089FSVXaa7QaV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

Strudel is a bit different than Tidal. There's a few things I haven't figured out how to do efficiently, but
overall it's been a blast to learn.

```javascript
// kick
const kick = note("c2")
  .midichan(1)
  .midi(RYTM)
  .struct("1(3,8,<2 0 1 7>)")
  .chunk(3, (x) => x.late("0.25"))
  .degradeBy(0.2)
  .every("<32>", (x) => silence);

// anchor:
const anchor = note("c2")
  .midichan(4)
  .midi(RYTM)
  .late("0.5")
  .when("<1 0 0 0 0>/4", (x) => x.late("0.125"))
  .every("< 22>", (x) => silence);

// perc:
const perc = midichan("{[7 8] 7 8 ~}%8")
  .note("c2")
  .midi(RYTM)
  .chunk(4, (x) => x.rev())
  .every("<3 5>", (x) => x.late("0.125"))
  .sometimesBy(0.1, (x) =>
    x.off(1 / 16, () => note("f2 e2").midichan("7 8").midi(RYTM)),
  )
  .velocity(rand.range(0.5, 1))
  .every("<33>", (x) => silence);

// hats:
const hat = midichan("9")
  .note("c2")
  .midi(RYTM)
  .struct("1*8")
  .late(1)
  .degradeBy(0.3)
  .velocity(rand.range(0.05, 1))
  .every("<44>", (x) => silence);

$: stack(kick, anchor.slow("<1 2>/4"), perc, hat);
```
