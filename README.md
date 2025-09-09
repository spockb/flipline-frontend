# FlipLine - Real Estate Investment Platform

A full-stack web application built with React that connects real estate investors with curated property opportunities in Los Angeles. Features user authentication, property management, and an admin dashboard for property listings.

## Live Demo

[View Live Demo](https://flipline.netlify.app)

## Features

### User Authentication

- Secure login and registration system
- Role-based access control (Member/Admin)
- Protected routes and session management
- User context with React Context API

### Property Management

- Browse and filter property listings
- Detailed property view with image galleries
- Advanced search with multiple criteria (bedrooms, bathrooms, square footage)
- Favorites system with persistent storage
- Property sharing functionality

### Admin Dashboard

- Create, edit, and delete property listings
- Property form validation and error handling
- Admin-only access controls
- Real-time property updates

### User Experience

- Fully responsive design for mobile and desktop
- Modern UI with Tailwind CSS and DaisyUI
- Loading states and error handling
- Intuitive navigation and user flows

## Tech Stack

- **Frontend**: React 19, React Router DOM
- **Styling**: Tailwind CSS, DaisyUI
- **Icons**: React Icons
- **Build Tool**: Vite
- **Code Quality**: ESLint, Prettier
- **State Management**: React Context API

## Key Technical Implementations

### State Management

- Custom context providers for authentication and favorites
- Centralized state management without external libraries
- Efficient re-rendering with proper dependency arrays

### Component Architecture

- Reusable component design (PropertyCard, Badge, Filter)
- Custom hooks for data fetching and state management
- Clean separation of concerns between UI and business logic

### Routing & Navigation

- Protected routes with authentication guards
- Nested routing for admin dashboard
- Dynamic routing for property details
- Breadcrumb navigation

### Responsive Design

- Mobile-first approach with Tailwind CSS
- Flexible grid layouts for property listings
- Responsive navigation and forms
- Optimized images and loading states

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/flipline.git
cd flipline
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── PropertyListings/
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── ...
├── routes/             # Page components
│   ├── Home.jsx
│   ├── PropertyDetails.jsx
│   ├── Login.jsx
│   └── ...
├── auth-context.jsx    # Authentication context
├── fav-context.jsx     # Favorites context
└── App.jsx            # Main application component
```

## Development Highlights

- Built with modern React patterns and hooks
- Implemented custom context providers for global state
- Created reusable component library
- Applied responsive design principles
- Integrated third-party APIs and services
- Implemented proper error handling and loading states

## Future Enhancements

- Image upload functionality
- Advanced search filters
- Property comparison feature
- Email notifications
- Mobile app development

## Contact

[Your Name] - [your.email@example.com]
[LinkedIn Profile](https://linkedin.com/in/yourprofile)
[Portfolio Website](https://yourportfolio.com)

## License

This project is licensed under the MIT License.
