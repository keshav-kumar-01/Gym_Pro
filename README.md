# GymFlow Pro - Modern Gym Management System

A comprehensive MERN stack gym management application with Material-UI, featuring modern design, responsive layouts, and customizable branding.

## 🌟 Features

### Core Management
- **Member Management**: Complete member profiles, membership tracking, and attendance history
- **Trainer Management**: Staff profiles, specializations, certifications, and scheduling
- **Class Management**: Class scheduling, capacity management, and enrollment tracking
- **Equipment Management**: Inventory tracking, maintenance scheduling, and lifecycle management

### Advanced Features
- **Dashboard Analytics**: Real-time statistics, membership growth charts, and activity tracking
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Dark/Light Mode**: Toggle between light and dark themes
- **Custom Branding**: Upload gym logos, customize colors, and set gym information
- **Material-UI Components**: Modern, accessible UI components with smooth animations

### Technical Features
- **Supabase Integration**: Real-time database with authentication
- **JWT Authentication**: Secure user authentication and authorization
- **Form Validation**: Client and server-side validation with react-hook-form and yup
- **Error Handling**: Comprehensive error handling and user feedback
- **API Rate Limiting**: Protection against abuse with express-rate-limit

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account (for database)

### Installation

1. **Clone or extract the project**
   ```bash
   cd gym-management-app
   ```

2. **Install dependencies**
   ```bash
   npm run install-deps
   ```

3. **Environment Setup**

   Copy `.env.example` to `.env` in the backend directory and configure:
   ```env
   PORT=3001
   NODE_ENV=development
   SUPABASE_URL=your-supabase-url
   SUPABASE_KEY=your-supabase-key
   JWT_SECRET=your-secret-key
   JWT_EXPIRES_IN=24h
   ```

4. **Database Setup**

   Create the following tables in your Supabase database:
   - `members`
   - `trainers`
   - `classes`
   - `equipment`
   - `attendance`
   - `payments`

   See `docs/database-schema.sql` for the complete schema.

5. **Start Development Servers**
   ```bash
   npm run dev
   ```

   This will start both frontend (http://localhost:3000) and backend (http://localhost:3001) servers.

## 📁 Project Structure

```
gym-management-app/
├── frontend/                 # React application
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── Auth/       # Authentication components
│   │   │   ├── Layout/     # Layout components
│   │   │   └── Common/     # Shared components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   ├── theme/          # Theme configuration
│   │   ├── services/       # API services
│   │   └── utils/          # Utility functions
├── backend/                 # Express.js API
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── routes/         # API routes
│   │   ├── models/         # Data models
│   │   ├── config/         # Configuration files
│   │   └── utils/          # Utility functions
├── docs/                   # Documentation
└── assets/                 # Static assets
```

## 🎨 Customization

### Theme Customization
- Access Settings → Theme & Appearance
- Choose from predefined themes or create custom colors
- Toggle between light and dark modes

### Gym Branding
- Upload your gym logo
- Set gym name and slogan
- Customize primary and secondary colors

### Adding New Features
The project is designed to be easily extensible:
- Add new pages in `frontend/src/pages/`
- Create new API endpoints in `backend/src/routes/`
- Add new components in `frontend/src/components/`

## 🔧 Available Scripts

### Root Directory
- `npm run dev` - Start both frontend and backend in development mode
- `npm run install-deps` - Install dependencies for all packages

### Frontend
- `npm start` - Start the React development server
- `npm run build` - Build the React app for production
- `npm test` - Run tests

### Backend
- `npm run dev` - Start the Express server with nodemon
- `npm start` - Start the Express server in production mode

## 📊 Default Login Credentials

For testing purposes, use these credentials:
- **Email**: admin@example.com
- **Password**: password

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS protection
- Helmet.js security headers

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔄 API Documentation

The backend provides RESTful APIs for:
- Authentication (`/api/auth`)
- Members (`/api/members`)
- Trainers (`/api/trainers`)
- Classes (`/api/classes`)
- Equipment (`/api/equipment`)
- Dashboard (`/api/dashboard`)
- Settings (`/api/settings`)

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify Supabase URL and key in `.env`
   - Check network connectivity

2. **Authentication Issues**
   - Ensure JWT_SECRET is set
   - Check token expiration settings

3. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
   - Check Node.js version compatibility

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Material-UI for the excellent component library
- Supabase for the backend-as-a-service platform
- React ecosystem for the robust frontend framework
- All contributors and the open-source community

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the documentation in the `docs/` folder
- Review the troubleshooting section

---

**Built with ❤️ using React, Material-UI, Express.js, and Supabase**
