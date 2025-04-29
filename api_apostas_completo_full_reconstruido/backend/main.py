from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine, SessionLocal
from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, Float, Boolean
from sqlalchemy.orm import declarative_base
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session

Base = declarative_base()

class Aposta(Base):
    __tablename__ = "apostas"
    id = Column(Integer, primary_key=True, index=True)
    tipo = Column(String)
    valor = Column(Float)
    odd = Column(Float)
    time = Column(String)
    resultado = Column(String, nullable=True)
    confianca = Column(Integer, nullable=True)
    motivo = Column(String, nullable=True)
    estrategia = Column(String, nullable=True)
    sentimentoAntes = Column(String, nullable=True)
    sentimentoDepois = Column(String, nullable=True)
    tempoRestante = Column(String, nullable=True)
    metaLimite = Column(String, nullable=True)
    feedback = Column(String, nullable=True)
    fantasma = Column(Boolean, default=False)

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ApostaCreate(BaseModel):
    tipo: str
    valor: float
    odd: float
    time: str
    resultado: str | None = None
    confianca: int | None = None
    motivo: str | None = None
    estrategia: str | None = None
    sentimentoAntes: str | None = None
    sentimentoDepois: str | None = None
    tempoRestante: str | None = None
    metaLimite: str | None = None
    feedback: str | None = None
    fantasma: bool = False

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/apostas")
def create_aposta(aposta: ApostaCreate, db: Session = Depends(get_db)):
    db_aposta = Aposta(**aposta.dict())
    db.add(db_aposta)
    db.commit()
    db.refresh(db_aposta)
    return db_aposta

@app.get("/apostas")
def read_apostas(tipo: str = None, estrategia: str = None, confianca_min: int = None, fantasma: str = None, db: Session = Depends(get_db)):
    query = db.query(Aposta)
    if tipo:
        query = query.filter(Aposta.tipo == tipo)
    if estrategia:
        query = query.filter(Aposta.estrategia == estrategia)
    if confianca_min is not None:
        query = query.filter(Aposta.confianca >= confianca_min)
    if fantasma in ["true", "false"]:
        query = query.filter(Aposta.fantasma == (fantasma == "true"))
    return query.all()
