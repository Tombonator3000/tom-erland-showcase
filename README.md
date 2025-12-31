# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/0535bc71-f2be-4267-b4ba-4dec0c86ac39

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/0535bc71-f2be-4267-b4ba-4dec0c86ac39) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

This project supports **two deployment methods**:

### 1. Lovable (Primary)
Simply open [Lovable](https://lovable.dev/projects/0535bc71-f2be-4267-b4ba-4dec0c86ac39) and click on Share -> Publish.

### 2. GitHub Pages (Backup/Alternative)
The project is configured for automatic deployment to GitHub Pages:
- **Live URL**: https://tombonator3000.github.io/tom-erland-showcase/
- Automatically deploys when pushing to `main` or `master` branch
- See `DEPLOYMENT.md` for detailed setup instructions

### Test GitHub Pages build locally
```bash
npm run build:github
npm run preview:github
```

## Can I connect a custom domain?

Yes, you can connect a custom domain to both platforms!

**For Lovable:**
Navigate to Project > Settings > Domains and click Connect Domain.
Read more: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

**For GitHub Pages:**
1. Add a `CNAME` file in the `public/` folder
2. Configure DNS with your domain provider
3. Enable HTTPS in GitHub Pages settings

See `DEPLOYMENT.md` for complete deployment documentation.
