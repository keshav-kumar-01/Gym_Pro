# Deployment Guide

## Production Deployment

### Frontend (React App)

#### Option 1: Netlify
1. Build the React app: `cd frontend && npm run build`
2. Upload the `build` folder to Netlify
3. Configure environment variables in Netlify dashboard

#### Option 2: Vercel
1. Connect your repository to Vercel
2. Set build command: `cd frontend && npm run build`
3. Set output directory: `frontend/build`
4. Configure environment variables

#### Option 3: Traditional Hosting
1. Build the app: `cd frontend && npm run build`
2. Upload the `build` folder contents to your web server
3. Configure web server to serve React app (handle routing)

### Backend (Express.js API)

#### Option 1: Heroku
1. Create a new Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy using Git: `git push heroku main`

#### Option 2: DigitalOcean App Platform
1. Connect your repository
2. Set build command: `cd backend && npm install`
3. Set run command: `cd backend && npm start`
4. Configure environment variables

#### Option 3: Traditional VPS
1. Set up Node.js on your server
2. Clone the repository
3. Install dependencies: `cd backend && npm install`
4. Set up PM2 for process management
5. Configure nginx as reverse proxy

### Environment Variables

#### Backend (.env)
```
PORT=3001
NODE_ENV=production
SUPABASE_URL=your-production-supabase-url
SUPABASE_KEY=your-production-supabase-key
JWT_SECRET=your-secure-jwt-secret
JWT_EXPIRES_IN=24h
```

#### Frontend (build time)
```
REACT_APP_API_URL=https://your-backend-domain.com/api
REACT_APP_SUPABASE_URL=your-production-supabase-url
REACT_APP_SUPABASE_ANON_KEY=your-production-supabase-anon-key
```

### Database Setup (Supabase)

1. Create a new Supabase project
2. Run the SQL schema from `docs/database-schema.sql`
3. Configure Row Level Security policies
4. Set up authentication providers if needed

### SSL/HTTPS Configuration

Ensure both frontend and backend are served over HTTPS in production:
- Use Let's Encrypt for free SSL certificates
- Configure your hosting provider's SSL settings
- Update CORS settings to allow HTTPS origins

### Performance Optimization

#### Frontend
- Enable gzip compression
- Use CDN for static assets
- Implement code splitting
- Optimize images and assets

#### Backend
- Use compression middleware
- Implement caching (Redis)
- Optimize database queries
- Use load balancing for high traffic

### Monitoring and Logging

- Set up error tracking (Sentry, Rollbar)
- Implement application monitoring (New Relic, DataDog)
- Configure log aggregation
- Set up uptime monitoring

### Security Checklist

- [ ] Use HTTPS everywhere
- [ ] Set secure JWT secrets
- [ ] Configure CORS properly
- [ ] Implement rate limiting
- [ ] Use environment variables for secrets
- [ ] Regular security updates
- [ ] Database access restrictions
- [ ] API input validation
