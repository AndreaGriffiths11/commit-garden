# commit garden

A tiny, delightful widget that turns your GitHub contribution streak into a growing plant.

**0 commits** = seed in soil
**1-2 commits** = sprout
**3-5 commits** = seedling
**6-10 commits** = growing
**11-20 commits** = leafy canopy
**20+ commits** = full bloom with flowers

Longer streaks boost your plant stage too — a 30-day streak guarantees at least a leafy plant.

## Try it

Visit [andreagriffiths11.github.io/commit-garden](https://andreagriffiths11.github.io/commit-garden/) and enter any GitHub username.

Or link directly: `https://andreagriffiths11.github.io/commit-garden/?user=YOUR_USERNAME`

## Run locally

```bash
git clone https://github.com/AndreaGriffiths11/commit-garden.git
cd commit-garden
npm install
npm run dev
```

## How it works

- Fetches your GitHub contribution data (public, no token needed)
- Calculates today's commits, current streak, and yearly total
- Maps activity to one of 6 plant growth stages
- Renders an animated SVG plant with CSS animations
- Shows a 7-day sparkline of your recent activity

Zero dependencies beyond React and Tailwind. No backend. No API keys. Everything runs in the browser.

## License

MIT
