
import React, { useState } from "react";
import axios from "axios";

const PainelApostas = () => {
  const [formData, setFormData] = useState({
    tipo: "",
    valor: "",
    odd: "",
    time: "",
    resultado: "",
    confianca: "",
    motivo: "",
    estrategia: "",
    sentimentoAntes: "",
    sentimentoDepois: "",
    tempoRestante: "",
    metaLimite: "",
    feedback: "",
    apostaFantasma: false,
  });

  const [mostrarAvancado, setMostrarAvancado] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const salvarAposta = async () => {
    try {
      const payload = {
        tipo: formData.tipo,
        valor: parseFloat(formData.valor),
        odd: parseFloat(formData.odd),
        time: formData.time,
        resultado: formData.resultado || undefined,
        confianca: formData.confianca ? parseInt(formData.confianca) : undefined,
        motivo: formData.motivo || undefined,
        estrategia: formData.estrategia || undefined,
        sentimentoAntes: formData.sentimentoAntes || undefined,
        sentimentoDepois: formData.sentimentoDepois || undefined,
        tempoRestante: formData.tempoRestante || undefined,
        metaLimite: formData.metaLimite || undefined,
        feedback: formData.feedback || undefined,
        apostaFantasma: formData.apostaFantasma,
      };

      await axios.post("http://localhost:8000/apostas", payload);
      alert("Aposta salva com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar aposta:", error);
      alert("Erro ao salvar aposta");
    }
  };

  return (
    <div>
      <h1>Dashboard de Apostas</h1>
      <button onClick={() => setFormData({ ...formData, tipo: "", valor: "", odd: "", time: "", resultado: "" })}>
        Nova Aposta
      </button>

      <h2>Filtrar Apostas</h2>
      <select><option>Simples</option></select>
      <select><option>Estratégia</option></select>
      <input placeholder="Confiança mínima" />
      <select><option>Não</option></select>
      <button>Consultar</button>

      <h2>Nova Aposta</h2>
      <input name="tipo" placeholder="Tipo de Aposta *" value={formData.tipo} onChange={handleChange} />
      <input name="valor" placeholder="Valor Investido *" value={formData.valor} onChange={handleChange} type="number" />
      <input name="odd" placeholder="Odd *" value={formData.odd} onChange={handleChange} type="number" step="0.01" />
      <input name="time" placeholder="Time / Jogador *" value={formData.time} onChange={handleChange} />
      <input name="resultado" placeholder="Resultado (posterior)" value={formData.resultado} onChange={handleChange} />
      <button onClick={() => setMostrarAvancado((v) => !v)}>
        {mostrarAvancado ? "Ocultar opções avançadas" : "Mostrar opções avançadas"}
      </button>

      {mostrarAvancado && (
        <>
          <input name="confianca" placeholder="Confiança (0-100)" value={formData.confianca} onChange={handleChange} type="number" />
          <input name="motivo" placeholder="Motivo da Aposta" value={formData.motivo} onChange={handleChange} />
          <input name="estrategia" placeholder="Estratégia" value={formData.estrategia} onChange={handleChange} />
          <input name="sentimentoAntes" placeholder="Sentimento Antes" value={formData.sentimentoAntes} onChange={handleChange} />
          <input name="sentimentoDepois" placeholder="Sentimento Depois" value={formData.sentimentoDepois} onChange={handleChange} />
          <input name="tempoRestante" placeholder="Tempo Restante (live)" value={formData.tempoRestante} onChange={handleChange} />
          <input name="metaLimite" placeholder="Meta / Limite de Perda" value={formData.metaLimite} onChange={handleChange} />
          <textarea name="feedback" placeholder="Feedback Livre" value={formData.feedback} onChange={handleChange} />
          <label>
            <input type="checkbox" name="apostaFantasma" checked={formData.apostaFantasma} onChange={handleChange} />
            Marcar como Aposta Fantasma
          </label>
        </>
      )}

      <button onClick={salvarAposta}>Salvar Aposta</button>
    </div>
  );
};

export default PainelApostas;
