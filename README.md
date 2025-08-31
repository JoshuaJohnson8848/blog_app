# Blog Application Frontend (Next.js)

This is the **frontend** for the Blog Application built with **Next.js** and styled using **Tailwind CSS**.  
The frontend connects to the backend API (Node.js/Express) to provide full blog CRUD, authentication, and user management.

---

## 🚀 Features
- User Registration & Login (JWT authentication)
- Role-based access (Admin/User)
- Public blog listing page
- Blog detail page
- Create, update, and delete posts (based on role)
- comment section under blogs
- search for blogs
- User profile management
- Tailwind CSS

---

## 🔗 Live Demo
Frontend: [https://blog-85mulgnvb-joshuajohnson8848s-projects.vercel.app/](https://blog-85mulgnvb-joshuajohnson8848s-projects.vercel.app/)  
Backend API: [https://joshuadev.in/api](https://joshuadev.in/api)  

---

## 📂 Project Structure
```
frontend/
├── app/ or pages/      # Next.js routes
├── components/         # Reusable UI components
├── styles/             # Tailwind styles
├── utils/              # Helpers (auth, API calls)
└── ...
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/JoshuaJohnson8848/blog_app.git
cd blog-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Create `.env.local`:
```
NEXT_PUBLIC_API_URL=https://joshuadev.in/api (https://localhost:7700/api)
```

### 4. Run locally
```bash
npm run dev
```

---

## ✅ Deliverables Checklist
- [x] Authentication (register/login/logout with JWT)  
- [x] Role-based access (Admin/User)  
- [x] Blog CRUD (frontend integration)  
- [x] Public blog listing + detail page  
- [x] Search for blogs  
- [x] Profile management  
- [x] Comment Section under blogs
- [x] Deployment on Vercel  

---

## 👤 Author
- **Joshua Johnson**  
- GitHub: [https://github.com/JoshuaJohnson8848](https://github.com/JoshuaJohnson8848)  
- Email: joshuatjohnson255@gmail.com
