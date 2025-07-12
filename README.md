# 🚀 Installation Guide
Follow these steps to get the project up and running:

### 1. Clone the Repository
```bash
git clone https://github.com/rizkypujiraharja/mini-crm-with-mock-voip.git
cd mini-crm-with-mock-voip
```

### 2. Copy Environment File
```bash
cp .env.example .env
```
`You can edit the .env file to adjust ports or service names if needed.`

### 3. Build and Start the Containers
```bash
docker-compose --env-file .env up --build
```
`This will build and start Laravel, MySQL, and Vue app containers.`

### 4. Seed the Database
Once the containers are running, seed the database:
```bash
docker exec -it mini_crm_laravel_app php artisan db:seed
```

## 🔐 User Login
You can log in using the following credentials:
- Email: user_0@example.com to user_9@example.com
- Password: password


# ✅ Brief Explanation of My Approach
I built the app in two parts: backend (Laravel) and frontend (Vue.js 2 SPA).

### 1. Contacts Page
- I created an API to show contacts with filters by company and role.
- Filters are saved in the URL query so they stay after refresh.
- I used debounce to avoid too many API calls when typing.
- Each contact has a Call button.

### 2. Call Simulation
- Clicking the Call button sends a request to the backend.
- The backend creates a fake call log with random duration and status like “Completed” or “Missed”.
- The frontend shows a simple call UI with a timer.

### 3. Call Logs Page
- Shows a list of past calls: contact, time, duration, and status.
- There is an optional filter by date range.

### 4. Authentication
- I added simple login using Laravel Sanctum.
- The token is stored in localStorage.
- After login, the user info is fetched and stored using Vuex.

### 5. Favorite Contact
- I added a toggle favorite feature.
- Right now, the favorite is saved in the contacts table.
- But maybe it should be per user in the future (so each user has their own favorites).

### 6. State Management
- I used Vuex to manage state for contacts, call logs, auth, and filters.

### 7. UI and Styling
- I used Ant Design Vue (antdv) for UI components.
- I also added Tailwind CSS to make styling faster using utility classes.

### 8. Docker Setup
- The project uses Docker with Laravel, Vue frontend, and MySQL.
- You can run it easily using docker-compose.


# ✅ Assumptions Made
- Login is basic and for testing only.
- The VoIP call is just a simulation — no real calls.
- Favorite contacts are global now, but should be per user later.
- The app is meant for local development, not production.