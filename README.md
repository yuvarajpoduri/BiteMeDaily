# BiteMeDaily 🍎

A mobile-only, vertically scrollable information platform that provides funny, quirky, and 100% factually correct bite-sized content.

## Features

- **Mobile First Design**: Vertical infinite scroll, card-based UI, bottom navigation.
- **Dark Mode Only**: Sleek black aesthetic with vibrant accent colors.
- **Categories**: News, Entertainment, History, Facts, Health, Placements, Companies, CS Tools.
- **Authentication**: Secure signup and login using NextAuth.js and MongoDB.
- **Personalization**: Lightweight interaction tracking to customize your feed.
- **Saved Items**: Bookmark your favorite bites.

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB Atlas (Mongoose)
- **Auth**: NextAuth.js (Credentials)
- **Animations**: Framer Motion

## Getting Started

1.  **Clone the repository**
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Environment Setup**:
    Create a `.env.local` file in the root directory:
    ```env
    MONGODB_URI=your_mongodb_connection_string
    AUTH_SECRET=generate_a_secure_secret_here
    ```
4.  **Run Locally**:
    ```bash
    npm run dev
    ```
    Open `http://localhost:3000` on your mobile device or use browser developer tools (toggle device toolbar) to view the mobile layout.

## Deployment

Deploy easily to **Vercel**:
1.  Push code to GitHub.
2.  Import project in Vercel.
3.  Add environment variables (`MONGODB_URI`, `AUTH_SECRET`) in Vercel project settings.
4.  Deploy!

## License

MIT
