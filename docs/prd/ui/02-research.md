# Reference research: clean, minimal, 2026 (2026-11-05)

## Method
Web searches found mostly vendor listicles. They agree on clarity, white space used for balance (not as filler), one main CTA, bold type, subtle micro-interactions and performance over flashy autoplay. Sources: [Zoho](https://www.zoho.com/landingpage/landing-page-design-trends.html), [GetResponse](https://www.getresponse.com/blog/landing-page-design-trends), [Moburst](https://www.moburst.com/blog/landing-page-design-trends-2026/), [Muzli](https://store.muz.li/articles/landing-page-design-trends-2026), [involve.me](https://www.involve.me/blog/minimalist-landing-page-examples), [KrishaWeb](https://www.krishaweb.com/blog/ai-powered-agency-websites/). Pinterest returned no indexable results.

The more useful evidence comes from **measuring computed styles** on four live sites that are widely cited as the current bar for clean product sites. They were measured at 1440px on 2026-11-05.

| Site | H1 | H2 | Body | Page height |
|---|---|---|---|---|
| Linear | 64px · 510 · lh 1.0 · −0.022em | 48px · 510 · lh 1.0 · −0.022em | 15px · **400** · lh 1.6 · grey #8A8F98 | 9,954 |
| Attio | 64px · 600 · lh 0.95 · −0.02em | 40px · 500 · −0.01em | (UI labels 10px/500) | 17,598 |
| Resend | 96px serif · 400 · lh 1.0 · −0.01em | 56px · 400 · lh 1.2 · −0.05em | 18px · **400** · lh 1.5 · grey | 12,317 |
| Granola | 86px serif · 400 · lh 0.93 · −0.02em | 48px · 400 · lh 1.0 | 14px · 400 | 14,388 |
| **Newseed now** | 60px · 500 · lh **1.08** · −0.025em | 49–52px · 500 · lh **1.14** | **500** · 13.5–20px · −0.015em tracking on body · ~6 greys | 13,988 |

## What the references share
1. **Body is weight 400 and set in one calm grey.** Weight contrast between heading and body carries the hierarchy. Ours is 500 everywhere, which makes the page feel heavy and flat (decision Q17).
2. **Headlines are set tight:** line-height 0.95–1.0 and tracking −0.02em. Ours (lh 1.08–1.14) reads looser and less editorial.
3. **Body tracking is 0** (Linear goes only slightly negative at 15px). Ours applies −0.015em to body copy.
4. **Two-tone headings** (Linear: ink + grey within one H2) are the common 2026 way to add emphasis without colour. We already have the distinctive equivalent, the **Instrument Serif gradient italic**, so we keep it and use it only once per heading.
5. **One accent, used sparingly**, on the primary CTA and key data. There are no eyebrow pills or decorative numbering above every section.
6. Page heights are similar to ours. The problem is the **gaps between sections**, not the number of sections (decision Q15).
7. Product mocks are dense and realistic, at 10–12px inside the mock and full contrast inside their own surface. Our approach matches this (decision Q12).

## Antislop checks against the current page
- **R-02 (identical bento):** the hero's 3 bento cards share the same white box, size and treatment. Make the grid asymmetric and give each card its own content-led treatment.
- **R-03:** OK. The data is real, labelled actual/estimated, with no fake logos.
- **Cheap meta-labels:** eyebrow pills like "Work / Studi kasus" repeat what the H2 already says. Remove them where the H2 carries the meaning.
- **R-04:** headings fit in 2 lines. Tighten the line-height and use `text-balance`.
- **R-05:** press scale is inconsistent (34 places). Normalise it to 0.96 (decision Q14).
- **R-06:** stale comments mention "Velie", "elev" and "Meeting". Remove them during the section passes.
