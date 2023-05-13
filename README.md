# Getting Started

If you're starting a new project either fork this repo or clone it then reset git ,

```bash
git clone git@git.torchbox.com:innovation/tbx-innovation-starter.git your-new-project-name
cd your-new-project-name
rm -rf .git
git init
```

> Make sure to head into `package.json` and `package-lock.json` and rename your project!

## Get the project up and running

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load fonts. It currently uses Google's Courier Prime but can be changed within @/utils/fonts.ts. The available google fonts are viewable by 'cmd' clicking Courier_Prime and opening the index.d.ts file.

It also uses [Tailwind](https://tailwindcss.com/docs/utility-first).

## Deploying

We deploy to [Vercel](https://vercel.com). If you don't have an invite to the Torchbox Vercel team, get one from Tom U.

We currently use the [Vercel CLI](https://vercel.com/docs/cli) to deploy from `main`.

Install the cli, make sure you're signed in as the team and deploy!

```bash
npm i -g vercel
vercel login
vercel teams switch
npm run deploy
```
