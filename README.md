# React Native Wallet

A modern, full-stack wallet application featuring a React Native mobile frontend and a Node.js/Express backend with Neon (serverless Postgres). The app enables users to securely manage their finances, track transactions, and view real-time summaries—all with a beautiful, responsive UI.


## Features
### Mobile App
- User authentication (sign up, sign in) via Clerk
- View current balance, income, and expenses
- Add, view, and delete transactions
- Categorize transactions (Food, Shopping, Bills, etc.)
- Themed, modern UI with multiple color schemes
- Responsive and smooth experience on iOS, Android, and web (Expo)

### Backend
- RESTful API for transaction management (CRUD)
- Transaction summary endpoints (balance, income, expenses)
- PostgreSQL (Neon serverless) integration
- Environment-based configuration
- Health check endpoint

---

## Architecture
- **Frontend:** React Native (Expo), Clerk for authentication, Expo Router for navigation
- **Backend:** Node.js, Express, Neon (serverless Postgres)
- **API:** RESTful, JSON-based

---

## Folder Structure
```
React-Native-Wallet/
  backend/        # Node.js/Express backend
    config/       # DB and cron config
    controllers/  # Business logic
    routes/       # API routes
    server.js     # Entry point
    ...
  mobile/         # React Native frontend
    app/          # App screens and routing
    assets/       # Images, fonts, styles
    components/   # Reusable UI components
    constants/    # API URLs, color themes
    hooks/        # Custom React hooks
    ...
```

---

## Getting Started

### Prerequisites
- Node.js (v19+ recommended for backend)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Neon/PostgreSQL account for backend database

### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `backend/`:
   ```env
   DATABASE_URL=<your_neon_postgres_connection_string>
   PORT=5001 # or any port you prefer
   ```
4. Start the backend server:
   - For development (auto-reload):
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm start
     ```
   The backend will run on `http://localhost:5001` by default.

### Mobile App Setup
1. Navigate to the mobile folder:
   ```bash
   cd mobile
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Expo development server:
   ```bash
   npx expo start
   ```
4. Open the app in Expo Go, an emulator, or a simulator.

---

## Environment Variables
### Backend
- `DATABASE_URL`: Neon/Postgres connection string
- `PORT`: Port for the server (default: 5001)

### Mobile
- API URL is set in `mobile/constants/api.js`:
  ```js
  export const API_URL = "PUT THE API_URL HERE";
  ```
  Update this if you run the backend locally or deploy elsewhere.

---

## API Documentation
All endpoints are prefixed with `/api/transactions`.

### Get All Transactions for a User
- **GET** `/api/transactions/:userId`
- Returns all transactions for the specified user, ordered by date (newest first).

### Create a Transaction
- **POST** `/api/transactions/`
- Body:
  ```json
  {
    "title": "string",
    "amount": number,
    "category": "string",
    "user_id": "string"
  }
  ```
- Returns the created transaction.

### Delete a Transaction
- **DELETE** `/api/transactions/:id`
- Deletes the transaction with the specified ID.

### Get Transaction Summary for a User
- **GET** `/api/transactions/summary/:userId`
- Returns an object with `balance`, `income`, and `expenses` for the user.

### Health Check
- **GET** `/api/health`
- Returns `{ status: "ok" }` if the server is running.

---

## Authentication
- The mobile app uses [Clerk](https://clerk.com/) for secure authentication.
- Users can sign up and sign in with email and password.
- Auth state is managed globally and required for all transaction actions.

---

## Theming & UI
- Multiple color themes available (see `mobile/constants/colors.js`): Coffee, Forest, Purple, Ocean, Finance.
- Clean, modern design with custom fonts and icons.
- Responsive layouts for all device sizes.

---

## Technologies Used
- **Frontend:**
  - React Native (Expo)
  - Clerk (authentication)
  - Expo Router
  - Custom hooks and components
- **Backend:**
  - Node.js, Express
  - Neon (serverless Postgres)
  - dotenv, cors, nodemon

---

## Contributing
Contributions are welcome! Please open an issue to discuss your ideas or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---

## Contact
For questions, suggestions, or support, please open an issue or contact the maintainer at [saad.rimeh.01@gmail.com]. 
