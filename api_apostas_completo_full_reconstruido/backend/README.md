# Betting API — Local PostgreSQL Setup (No Docker)

This project includes a complete betting management system using:
- FastAPI (Python backend)
- PostgreSQL (installed on Windows)
- React (frontend interface)

---

## ✅ Requirements

### Backend:
- Python 3.8+
- PostgreSQL installed locally
- `pip install -r requirements.txt`

### Frontend:
- Node.js and npm
- `npm install` from `/frontend`

---

## 🔧 Setup Instructions (PostgreSQL local)

1. Make sure PostgreSQL is installed and running.
2. Create a database named `apostas_db`.
3. Use user: `postgres`, password: `senha123`.
4. Go to the `backend/` folder and run:

```bash
python init_db.py
uvicorn main:app --reload
```

API will be available at `http://localhost:8000/docs`.

---

## 🖼️ Running the Frontend

```bash
cd frontend
npm install
npm start
```

Frontend will load at `http://localhost:3000`.

---

## 📌 Default Credentials in database.py

```python
postgresql://postgres:senha123@localhost:5432/apostas_db
```

Feel free to update it if needed.
