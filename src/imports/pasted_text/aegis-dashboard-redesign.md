Redesign the existing AEGIS Defense Console dashboard 
with a more PREMIUM, MINIMALISTIC, and SOPHISTICATED look.
Keep all 4 panels and functionality exactly the same,
only change the visual design.

PROBLEM WITH CURRENT DESIGN:
- Too many neon glows everywhere
- Borders are too bright/loud
- Feels like a video game, not a real defense system
- Color overload — too much green/red/orange together

NEW DESIGN DIRECTION:
Think: Bloomberg Terminal meets Apple Vision Pro
Clean, data-dense, quietly powerful. No flashy effects.

NEW COLOR SCHEME:
- Background: #080c14 (almost black, slight blue tint)
- Surface/Cards: #0d1117 (GitHub dark style)
- Border: #1c2333 (very subtle, barely visible)
- Primary accent: #58a6ff (muted steel blue — NOT neon)
- Safe/Online: #3fb950 (muted green, NOT neon)
- Warning: #d29922 (muted amber/gold)
- Critical/Danger: #f85149 (muted red, NOT hot pink)
- Text primary: #e6edf3 (soft white)
- Text secondary: #7d8590 (grey for labels)
- Text muted: #484f58 (very subtle info)

TYPOGRAPHY CHANGES:
- Headers: 'IBM Plex Mono' — clean, professional monospace
- Body/Data: 'JetBrains Mono' — developer terminal feel
- NO Orbitron font — too gamey
- Font sizes: smaller and tighter, more data-dense
- Letter spacing: slightly wider on headings (0.08em)

HEADER BAR CHANGES:
- Height: reduce to 48px — sleek and thin
- Remove heavy border glow
- "AEGIS DEFENSE CONSOLE" — white text, no neon green
- Subtitle in muted grey, smaller
- "ACTIVE THREATS: 4" — subtle red pill badge, no blinking
- "SHADOW CONTROLLER: UNIDENTIFIED" — amber text, 
  no border box, just text with small icon
- Clock: top right, monospace, steel blue
- "THREAT LEVEL: CRITICAL" — small red tag, not loud

LEFT SIDEBAR CHANGES:
- Width: 56px, minimal
- Icons only, no labels
- Active icon: steel blue (#58a6ff) with very subtle 
  background highlight
- Inactive: grey (#484f58)
- No glowing borders

PANEL DESIGN (All 4 panels):
- Background: #0d1117
- Border: 1px solid #1c2333 (thin, barely visible)
- NO neon border glow effect
- Border radius: 8px (subtle rounding)
- Panel title: small, uppercase, letter-spaced, 
  color #7d8590 (grey label style)
- Thin 1px accent line under title in steel blue

PANEL 1 - FORENSIC CITY MAP:
- Node redesign: smaller circles, cleaner
- Safe nodes: #3fb950 fill, no outer pulse ring
- Warning nodes: #d29922 fill
- Critical nodes: #f85149 fill with ONLY ONE 
  thin subtle pulse ring (not 3 glowing rings)
- Connection lines: #1c2333 (very subtle dark lines)
- Grid background: remove or make extremely subtle
- Node labels: 10px, #7d8590 grey, clean font
- Remove heavy dark background — use panel bg only

PANEL 2 - RESPONSE TIME ANOMALY DETECTOR:
- Chart lines: use muted colors (#58a6ff, #f85149, #d29922)
- NO area fill under lines — just clean lines
- Grid lines: extremely faint #1c2333
- Axis labels: 10px grey
- "3 SLEEPER NODES DETECTED" badge: 
  small, subtle red background #21130d, 
  red text #f85149, no heavy border
- Legend: small, bottom, minimal

PANEL 3 - SCHEMA VERSION MONITOR:
- Terminal background: #090d14 (slightly different 
  from panel bg for depth)
- Log text: 12px JetBrains Mono
- Normal logs: #7d8590 (muted grey)
- Rotation warnings: #d29922 (amber, not orange)
- Active schema line: #3fb950 (muted green)
- Current Cookie badge: 
  very small, #1c2333 background, 
  #58a6ff text, thin border
- NO blinking cursor — just static underscore

PANEL 4 - ASSET REGISTRY TABLE:
- Table header: #7d8590 text, uppercase, 
  10px letter-spaced, NO background
- Thin 1px #1c2333 border under header
- Row hover: #161b22 subtle highlight
- Alternating rows: very subtle #0d1117 / #0a0e16
- Status badges: 
  ONLINE → #0d2117 bg + #3fb950 text (pill)
  OFFLINE → #2d0f0f bg + #f85149 text (pill)
  DEGRADED → #2d1f0a bg + #d29922 text (pill)
- Threat text: colored text only, no badge

REMOVE THESE ELEMENTS:
- All heavy neon border glows on cards
- Multiple pulsing rings on nodes
- Scanline/CRT overlay effect
- Any gradient that is too saturated
- Heavy outer glow on any text

KEEP THESE ELEMENTS:
- All 4 panel layout and grid structure
- All data and functionality
- Dark overall theme
- Monospace fonts throughout
- Left sidebar navigation
- Header with threat info

FINAL FEEL:
Should look like a tool used by actual 
cybersecurity analysts at a Fortune 500 company —
professional, data-dense, quietly serious.
NOT a gaming dashboard or sci-fi movie prop.
Reference aesthetic: GitHub Dark + Linear App + 
Bloomberg Terminal