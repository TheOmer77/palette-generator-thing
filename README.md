# Palette generator thing

Palette generator thing is a simple app that allows you to generate color palettes for user interfaces.

Check out the app at [palette-generator-thing.vercel.app](https://palette-generator-thing.vercel.app).

## Features

### Palette generation

Each palette includes various shades from light to dark, and is generated based on a base hex color. The app always generates the following palettes, as they're good defaults for general UI use:

- **Primary:** Generated based on the primary base color, which is required. While the exact hex color provided may not appear directly in the palette, its hue and saturation are used as the foundation for all generated palettes by default.
- **Neutral:** A muted version of the primary color, useful for backgrounds or general text. It can be changed from the default to one of several muted suggestions, or use any custom hex color.
- **Danger:** Used to indicate errors or destructive actions. By default, it will be some shade of red unless the primary color is already a shade of red - in which case, it will be some shade of orange. Like neutral, it can be changed to one of several suggestions or a custom hex color.

In addition, extra colors can be added to generate palettes from. These can be chosen from suggestions based on the primary color - like complementary, split complementary, etc, or use a custom hex color. They can also be given custom names.

The values of all chosen base colors are stored as search params in the page URL. You can copy and save a palette's URL to reopen it later or share it. ([Here's an example](https://palette-generator-thing.vercel.app/?primary=1740ea&neutral=neutral30))

### Code export

In the code page, the generated palettes can be exported as code in several languages and color formats.

Supported languages include CSS, SCSS and JSON. Many CSS color formats are available, including Hex, RGB, HSL, LAB, LCH, OKLAB, and OKLCH. \
All color formats (except hex) also have raw variants - these are similar to the original CSS formats, but include just the number values without the CSS function wrapping them. [This can be useful with Tailwind CSS.](https://tailwindcss.com/docs/customizing-colors#using-css-variables)

In addition to the palette colors, the generated code also includes some tokens - variables that reference other variables:

- **Main:** The closest shade to the original base color
- **Foreground:** A contrast color suitable for text on top of the main color.

> Note that in JSON format it's not possible to have variables that reference other variables in the same object, so the values are duplicated instead.

## Usage

- Choose a primary hex color from the sidebar (on desktop) or drawer (on mobile); The color can also be randomized.
- Optionally, specify neutral & danger colors.
- Add extra colors using the "Add extra color" button in the sidebar or drawer. Click on one to name it, choose its value or remove it.
- Click on a shade of any of the generated palettes to copy its hex value to clipboard.
- Access the code export page from the navigation bar.

## Development

This app is a [Next.js](https://nextjs.org) project, and uses [PNPM](https://pnpm.io/) as the preferred package manager.

To run the development server:

```bash
pnpm dev
```

The server will run at [localhost:3000](http://localhost:3000). Pages will auto-update in the browser as you edit them.
