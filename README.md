# 🍽️ Nourish Network

A full-stack web application that connects food donors with recipients to reduce food waste and fight hunger in local communities. Built with the MERN stack (MongoDB, Express.js, React, Node.js) and designed to support Sustainable Development Goal 12 (Responsible Consumption and Production). 

Frontend deployment link; https://nourishnetwork.netlify.app/

## 🌟 Features

### Role-Based Access
- **Donors**: Post surplus food, manage listings, track donations
- **Recipients**: Browse available food, claim items, track claims
- **Secure Authentication**: JWT-based protected routes

### Food Management
- **Post Food Items**: Image upload, descriptions, location, expiry dates
- **Browse Listings**: View available food items
- **Claim System**: Recipients can claim available food
- **Donation Tracking**: Donors can see their impact

### User Experience
- **Responsive Design**: Mobile-first approach
- **Role-Based Navigation**: Custom interfaces for donors/recipients
- **Real-time Updates**: Automatic redirects and state management
- **Modern UI**: Tailwind CSS with warm, food-inspired color scheme

## Tech Stack

### Frontend
- **React 18** - Component-based UI
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client for API calls
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## Project Structure

```
nourish-network/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # Auth context
│   │   ├── pages/          # Route components
│   │   ├── utils/          # API configuration
│   │   └── hooks/
│   ├── public/
│   └── package.json
├── server/                 # Express backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Route handlers
│   ├── middleware/         # Auth middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── server.js           # Entry point
│   └── package.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd nourish-network
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

Create a `.env` file in the client directory:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Food Items
- `GET /api/food` - Get all food listings
- `POST /api/food` - Create new food item (protected)
- `GET /api/food/my-donations` - Get user's donations (protected)

### User Management
- Role-based access control
- Protected routes for authenticated users
- Automatic redirects based on user role

## Color Scheme

The application uses a warm, food-inspired color palette:
- **Primary**: Amber/Orange (`amber-500` to `amber-700`)
- **Accents**: Yellow and warm browns
- **Backgrounds**: Gray scales for contrast

## User Roles & Permissions

### Donor
- Post food items with images
- View personal donation history
- Manage food listings
- Cannot claim food items

### Recipient
- Browse available food items
- Claim food items
- View claim history
- Cannot post food items

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- CORS configuration
- Input validation
- Role-based access control

## Deployment

### Backend (Render)
1. Connect GitHub repository
2. Set environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
3. Build command: `npm install`
4. Start command: `npm start`

### Frontend (Netlify)
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Environment variable: `VITE_API_URL=your-render-backend-url`

## Environmental Impact

Nourish Network directly supports **SDG 12.3**:
> "By 2030, halve per capita global food waste at the retail and consumer levels and reduce food losses along production and supply chains."

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email [your-email] or create an issue in the repository.

## Acknowledgments

- Ubuntu philosophy inspiration
- SDG 12 for guiding principles
- Community food sharing initiatives
- Open source contributors

---

