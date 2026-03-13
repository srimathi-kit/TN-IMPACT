# Smart Circular Industry Exchange Platform (SCIEP)

SCIEP is a premium full-stack prototype designed to support the circular economy and sustainable manufacturing. It allows industries to share waste materials, turning one industry's waste into another's raw material.

## Features

- **Industry Authentication**: Secure JWT-based registration and login for industries.
- **Premium Dashboard**: Real-time visualization of circular economy metrics (Waste Uploaded, Reused, Landfill Reduced, Cost Savings).
- **Waste Marketplace**: A modern, card-based interface to browse available materials with smart matching recommendations.
- **Smart Matching System**: Intelligent suggestions for recycling/processing industries based on material type (Fabric, Plastic, Metal, etc.).
- **Impact Monitoring**: Detailed sustainability impact dashboard with charts showing CO2 offset, energy saved, and resource recovery.
- **Waste Upload Module**: Easy-to-use form with image preview and material categorization.

## Tech Stack

- **Frontend**: React.js, TailwindCSS, Lucide Icons, Recharts, Framer Motion.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose).
- **Authentication**: JSON Web Token (JWT), BcryptJS.

## Getting Started

### Prerequisites

- Node.js installed.
- MongoDB running locally on `mongodb://localhost:27017/sciep`.

### Setup Instructions

1. **Install Backend Dependencies**:
   ```bash
   cd server
   npm install
   ```

2. **Install Frontend Dependencies**:
   ```bash
   cd client
   npm install
   ```

3. **Start the Backend Server**:
   ```bash
   cd server
   node server.js
   ```

4. **Start the Frontend Development Server**:
   ```bash
   cd client
   npm run dev
   ```

5. **Access the Application**:
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

- `server/`: Express backend APIs, models, and authentication.
- `client/`: React frontend with modern UI components and pages.
- `server/seed.js`: Database seeding script (optional).

## License

MIT
