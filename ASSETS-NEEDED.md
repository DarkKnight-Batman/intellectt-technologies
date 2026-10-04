# Assets to replace before launch

The homepage is built to use real Intellectt media. Until it arrives, it shows
AI-generated stand-in images (each one is labelled "Illustrative image" on the page)
and 3D models built in code. Swap these files in; no code changes are needed
unless noted.

## Video (none exists yet)
| File | What to film | Notes |
|---|---|---|
| `video/intellectt-hero.mp4` | 15–20 second silent loop: engineer at a CAD screen, moulding machine cycling, harness on a formboard, test station | Plays automatically in the hero when the file is present. H.264, 1920×1080, under 8 MB, no audio |

## Photography (replace the stand-ins, keep the same file names)
| File | Section | Shot needed |
|---|---|---|
| `img/home-cad.webp` | Hero, Engineering | Engineering workstation with a real Intellectt CAD model on screen |
| `img/home-engineering.webp` | Engineering (small inset) | Prototype on a bench being measured |
| `img/home-machine.webp` | Hero, Precision Plastics | Moulding shop floor, machine running |
| `img/home-mould.webp` | Precision Plastics | Open mould tool with a moulded shot beside it |
| `img/home-harness.webp` | Hero, Wire Harness | Harness on a formboard (East Peoria / Minnesota) |
| `img/home-crimp.webp` | Wire Harness | Macro of real crimped terminals. Replace first: the stand-in's insulation wings look slightly open |
| `img/home-test.webp` | Hero, Wire Harness | Electrical test station in use |
| `img/home-displays.webp` | Medical Imaging Displays | Intellectt displays in a reading room (no patient data on screen) |
| `img/home-cmm.webp` | Quality | Inspection lab: measuring machine or test equipment |

Export as WebP, about 1600 px wide, 80% quality (roughly 100–250 KB each).


### Inner-page stand-ins (added in the light-theme pass)
Every page hero, industry tile and capability card now uses a photo. These are AI-generated illustrations with no people in them, each labelled "Illustrative image" on the page. Replace each one with real photography and keep the same file name.

| File | Used for | Real photo needed |
|---|---|---|
| img/photo-auto.webp | Automotive & Mobility | EV battery or harness line you have worked on (with client approval) |
| img/photo-ag.webp | Heavy Equipment & Agriculture | Off-highway or ag vehicle program |
| img/photo-aero.webp | Aerospace & Defense | Aerospace harness / avionics bay work |
| img/photo-meddev.webp | Medical Devices & Life Sciences | Medical-device lab or validation bench (background was blurred) |
| img/photo-health.webp | Healthcare | Healthcare client setting (no patients) |
| img/photo-tech.webp | Technology & Telecom, cloud | Data center or network room |
| img/photo-factory.webp | Industrial Manufacturing, automation | Automated line or cell |
| img/photo-retail.webp | Consumer & Retail | Retail operations |
| img/photo-office.webp | Talent pages, careers | Real Iselin / Hyderabad office interiors |
| img/photo-meeting.webp | PODs, SAP, contact | Real team room |
| img/photo-ai.webp | AI & Enterprise Platforms | Screenshot of a real platform you've delivered |
| img/photo-data.webp | Data Engineering, news | Real dashboard work (anonymised) |
| img/photo-building.webp | Global Presence, offices, About | **Real Iselin HQ and regional office exteriors.** The current image is not an Intellectt building |

## 3D models (optional upgrade)
The homepage 3D models (connector, moulded housings, diagnostic display) are built in
code. For true product accuracy, supply simplified CAD exports as `.glb` files
(under 3 MB each). Swapping them in needs a small code change in `productTheatre()`.

## Interfaces
- AI platforms window: replace the simulated workflow with real screenshots or short
  screen recordings of Nexus AI, Voice AI Connector, Template IQ, IVR Crawler and G2C Connect.
- Data dashboard: uses example data and is labelled as such. Replace with a real,
  anonymised dashboard screenshot or approved figures.
- Display QA panel: example view. Replace with a screenshot of the QA software.
