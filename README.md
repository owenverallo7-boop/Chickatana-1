# CHICKATANA – Website

> Every Deal is Worth Clucking About.

Static, single-page website for CHICKATANA (Sibonga, Cebu). Pure HTML/CSS/JS — no build tools, no backend.

## Repository map

```text
chickatana/
├── index.html                  # All page sections
├── README.md
├── css/
│   └── style.css               # Branding, layout, responsive rules
├── js/
│   └── main.js                 # Nav, filter, order list, SMS/email ordering
└── images/
    ├── home-banner.jpg         # Hero (Poppers bucket + mocktails)
    ├── chicken-poppers.png     # Our Menu
    ├── soul-tide.png           # Our Menu
    ├── summer-fling.png        # Our Menu
    ├── whole-dressed-chicken.png
    ├── buchi.png
    ├── intestines.png
    └── chicken-head.png
```

## Section map (index.html)

| Section ID   | Content source           | Images used |
|--------------|--------------------------|-------------|
| `#home`      | Tagline                  | home-banner.jpg |
| `#menu`      | Our Menu                 | chicken-poppers, soul-tide, summer-fling |
| `#products`  | Other Products           | whole-dressed-chicken, buchi, intestines, chicken-head (Soy Chicken, Gizzard, Liver use emoji placeholders) |
| `#about`     | About Us                 | – |
| `#location`  | Location (Google Maps embed) | – |
| `#contact`   | Contact                  | – |

## Features
- Sticky header with mobile hamburger menu and active-section highlighting
- Sauce picker for Chicken Poppers (Cheese / Cheesy Jalapeño / Barbecue)
- Product filter (All / Whole & Meals / Chicken Parts)
- Order list saved in the browser (localStorage), sent via **SMS** or **Email**
- Contact form that opens the visitor's email app pre-filled

## Run locally
Open `index.html` in a browser, or:
```bash
python -m http.server 8000
# visit http://localhost:8000
```

## Deploy on GitHub Pages
1. Create a new public repository, e.g. `chickatana`.
2. Upload all files/folders (keep the structure above) and commit to `main`.
3. Go to **Settings → Pages → Build and deployment**.
4. Source: **Deploy from a branch** → Branch: `main` → Folder: `/ (root)` → **Save**.
5. Your site will be live at `https://<your-username>.github.io/chickatana/`.

## Customizing
- Contact number / email for orders: top of `js/main.js` (`BUSINESS_SMS`, `BUSINESS_EMAIL`).
- Colors: CSS variables at the top of `css/style.css`.
- Missing photos: replace the `<div class="placeholder">` blocks with `<img src="images/...">`.
