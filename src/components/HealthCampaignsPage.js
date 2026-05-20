// src/components/HealthCampaignsPage.js
import React, { useState } from "react";
import { Calendar, MapPin, Map, ArrowLeft } from "lucide-react";
import { campaigns } from "../data/healthCampaigns.js";

export function HealthCampaignsPage({ setActivePage }) {
  // Estado que guarda qual campanha foi clicada (null = nenhuma = mostra a lista)
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  // === RENDERIZAÇÃO DA TELA DE DETALHES ===
  if (selectedCampaign) {
    return (
      <div style={{ padding: '1rem', maxWidth: '100%', margin: '0 auto' }}>
        {/* Botão para voltar para a lista de campanhas */}
        <button 
          className="back-button" 
          onClick={() => setSelectedCampaign(null)}
          style={{ background: 'none', border: 'none', color: '#0b3b2e', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', cursor: 'pointer' }}
        >
          <ArrowLeft size={18} /> Voltar para Campanhas
        </button>

        {/* Card de Detalhes */}
        <section className="about-card about-card-white" style={{ padding: '0', overflow: 'hidden' }}>
          {/* Imagem da Campanha */}
          <img 
            src={selectedCampaign.imageUrl} 
            alt={selectedCampaign.title} 
            style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
          />
          
          <div style={{ padding: '1.5rem' }}>
            <h2 style={{ color: '#0b3b2e', marginBottom: '1rem', fontSize: '1.5rem' }}>
              {selectedCampaign.title}
            </h2>
            
            <p style={{ lineHeight: '1.6', color: '#4d6b63', marginBottom: '1.5rem' }}>
              {selectedCampaign.fullDescription}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', backgroundColor: '#f1fbff', padding: '1rem', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0b3b2e' }}>
                <Calendar size={18} /> <strong>Data:</strong> {selectedCampaign.date}
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0b3b2e' }}>
                <MapPin size={18} style={{ minWidth: '18px' }} /> <strong>Local:</strong> {selectedCampaign.location}
              </div>

              {selectedCampaign.mapsLink && (
                <a 
                  href={selectedCampaign.mapsLink} 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', backgroundColor: '#0b3b2e', color: 'white', padding: '0.8rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}
                >
                  <Map size={18} /> Ver no Mapa
                </a>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // === RENDERIZAÇÃO DA LISTA PRINCIPAL (O padrão) ===
  return (
    <>
      <section className="about-hero">
        {/* Esse botão volta para a tela inicial do App */}
        <button type="button" className="back-button" onClick={() => setActivePage("home")}>
          ← Voltar
        </button>
        <h2>Campanhas de Saúde</h2>
        <p>Acompanhe as campanhas e ações de saúde pública</p>
      </section>

      <section className="about-card about-card-white">
        <div className="ps-list">
          {campaigns.map((c) => (
            <div 
              key={c.id} 
              className="ps-item" 
              onClick={() => setSelectedCampaign(c)}
              style={{ cursor: 'pointer', transition: 'background 0.2s' }}
            >
              <div className={`ps-icon ${c.color}`}>
                <c.icon size={22} />
              </div>

              <div className="ps-content">
                <div className="ps-row">
                  <h3 className="ps-title">{c.title}</h3>
                  <span className="ps-chip">{c.status}</span>
                </div>
                <p className="ps-desc">{c.description}</p>
                <div className="ps-meta">
                  <Calendar size={16} />
                  <span>{c.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-card about-card-white">
        <h3>Como participar?</h3>
        <ol className="ps-steps">
          <li>Dirija-se à Unidade Básica de Saúde mais próxima</li>
          <li>Leve seu documento de identidade e cartão SUS</li>
          <li>Informe-se sobre os horários de atendimento de cada campanha</li>
        </ol>
      </section>
    </>
  );
}

export default HealthCampaignsPage;