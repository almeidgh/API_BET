from database import Base, engine
from main import Aposta

Base.metadata.create_all(bind=engine)
