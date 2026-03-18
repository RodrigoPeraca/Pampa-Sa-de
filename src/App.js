import { useMemo, useState } from 'react';
import './App.css';

const FACILITIES = [
  {
    id: 'ubs-central',
    name: 'UBS Central Dr. Mário Totta',
    type: 'UBS',
    neighborhood: 'Centro',
    address: 'Av. Tupy Silveira, 1432 - Centro, Bagé - RS',
    hours: 'Seg a Sex · 7h30 às 17h',
    phone: '(53) 3240-4300',
    services: [
      'Clínica Geral',
      'Sala de Vacinas',
      'Saúde da Mulher',
      'Dispensação de medicamentos',
    ],
    googleMaps:
      'https://www.google.com/maps/search/?api=1&query=Av.+Tupy+Silveira%2C+1432%2C+Bag%C3%A9+-+RS',
    notes:
      'Ponto de referência para atendimentos de média complexidade e marcações do e-SUS.',
  },
  {
    id: 'esf-marcos',
    name: 'ESF Dr. Marcos Freire',
    type: 'ESF',
    neighborhood: 'Getúlio Vargas',
    address: 'Rua General Osório, 215 - bairro Getúlio Vargas',
    hours: 'Seg a Sex · 8h às 16h',
    phone: '(53) 3240-4412',
    services: [
      'Atendimento multiprofissional da ESF',
      'Pré-natal',
      'Saúde da Criança',
      'Visitas domiciliares',
    ],
    googleMaps:
      'https://www.google.com/maps/search/?api=1&query=Rua+General+Os%C3%B3rio%2C+215%2C+Bag%C3%A9+-+RS',
    notes:
      'Equipe integrada ao Programa Universidade Aberta do SUS com participação da Unipampa.',
  },
  {
    id: 'esf-ivai',
    name: 'ESF Ivai Ferreira',
    type: 'ESF',
    neighborhood: 'Pedras Brancas',
    address: 'Rua João Telles, 980 - Pedras Brancas',
    hours: 'Seg a Sex · 8h às 17h',
    phone: '(53) 3240-4521',
    services: [
      'Estratégia Saúde da Família',
      'Grupos de Hipertensão/Diabetes',
      'Acolhimento odontológico',
    ],
    googleMaps:
      'https://www.google.com/maps/search/?api=1&query=Rua+Jo%C3%A3o+Telles%2C+980%2C+Bag%C3%A9+-+RS',
    notes:
      'Foco em vigilância ativa com apoio dos laboratórios de Engenharia de Computação da Unipampa.',
  },
  {
    id: 'ubs-damasceno',
    name: 'UBS Damasceno',
    type: 'UBS',
    neighborhood: 'Damasceno',
    address: 'Av. Santa Tecla, 2900 - Damasceno',
    hours: 'Seg a Sex · 8h às 18h',
    phone: '(53) 3240-4707',
    services: [
      'Clínica Geral',
      'Saúde Bucal',
      'Farmácia Básica',
      'Curativos e procedimentos',
    ],
    googleMaps:
      'https://www.google.com/maps/search/?api=1&query=Av.+Santa+Tecla%2C+2900%2C+Bag%C3%A9+-+RS',
    notes: 'Integra o eixo de telessaúde experimental com alunos da Engenharia de Computação.',
  },
  {
    id: 'esf-stand',
    name: 'ESF Stand do Amaral',
    type: 'ESF',
    neighborhood: 'Stand do Amaral',
    address: 'Rua 20 de Setembro, 555 - Stand do Amaral',
    hours: 'Seg a Sex · 8h às 16h',
    phone: '(53) 3240-4820',
    services: [
      'Estratégia Saúde da Família',
      'Acompanhamento de gestantes',
      'Assistência social e NASF',
    ],
    googleMaps:
      'https://www.google.com/maps/search/?api=1&query=Rua+20+de+Setembro%2C+555%2C+Bag%C3%A9+-+RS',
    notes:
      'Equipe com agentes comunitários conectados ao observatório Pampa Saúde da Unipampa.',
  },
  {
    id: 'ubs-industrial',
    name: 'UBS Bairro Industrial',
    type: 'UBS',
    neighborhood: 'Industrial',
    address: 'Rua Professor Aníbal Benevides, 35 - Industrial',
    hours: 'Seg a Sex · 7h às 18h',
    phone: '(53) 3240-4901',
    services: [
      'Clínica Geral',
      'Pediatria',
      'Saúde Mental',
      'Serviços laboratoriais básicos',
    ],
    googleMaps:
      'https://www.google.com/maps/search/?api=1&query=Rua+Professor+An%C3%ADbal+Benevides%2C+35%2C+Bag%C3%A9+-+RS',
    notes:
      'Piloto de indicadores inteligentes desenvolvido pelo curso de Engenharia de Computação/Unipampa.',
  },
];

const TYPE_LABELS = {
  all: 'Todas as unidades',
  UBS: 'Unidade Básica de Saúde',
  ESF: 'Estratégia Saúde da Família',
};

const INSTITUTION_LOGOS = [
  {
    id: 'unipampa',
    name: 'Universidade Federal do Pampa · Unipampa',
    url: '/UNIPAMPA_logo.png',
    alt: 'Logo oficial da Unipampa',
    tagline: 'Rede Pampa Saúde · Engenharia de Computação',
  },
  {
    id: 'bage',
    name: 'Prefeitura Municipal de Bagé',
    url: '/BAGÉ_marca 2025 pequena.png',
    alt: 'Logo oficial da Prefeitura de Bagé',
    tagline: 'Secretaria Municipal da Saúde',
  },
];

const DEVELOPERS = [
  {
    name: 'Julio Santos',
    role: 'Acadêmico de Engenharia de Computação - Unipampa',
    focus: 'Front-end e experiência do usuário',
    contact: 'julio.santos@aluno.unipampa.edu.br',
  },
  {
    name: 'Equipe Pampa Saúde',
    role: 'Laboratório de Inovação em Saúde Digital',
    focus: 'Mapeamento de serviços públicos e integração SUS',
    contact: 'pampasaude@unipampa.edu.br',
  },
];

const TAB_CONTENT = {
  devs: {
    title: 'Quem desenvolve o Pampa Saúde?',
    description:
      'Aplicativo criado como iniciativa acadêmica da Engenharia de Computação/Unipampa para apoiar a comunidade de Bagé com acesso rápido às unidades de atenção básica.',
  },
  unipampa: {
    title: 'Unipampa & Prefeitura de Bagé',
    description:
      'Parceria baseada em projetos de extensão e pesquisa que unem inovação tecnológica e políticas municipais para fortalecer a Atenção Primária em Saúde.',
  },
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [activeInfoTab, setActiveInfoTab] = useState('devs');

  const totalServices = useMemo(() => {
    const pool = new Set();
    FACILITIES.forEach((facility) => facility.services.forEach((service) => pool.add(service)));
    return pool.size;
  }, []);

  const filteredFacilities = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return FACILITIES.filter((facility) => {
      const matchType = filterType === 'all' || facility.type === filterType;
      if (!matchType) return false;

      if (!term) return true;

      const haystack = [
        facility.name,
        facility.neighborhood,
        facility.address,
        facility.type,
        facility.services.join(' '),
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(term);
    });
  }, [searchTerm, filterType]);

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero-content">
          <p className="hero-badge">Pampa Saúde · Bagé · RS</p>
          <h1>Pampa Saúde</h1>
          <p className="hero-subtitle">
            Guia rápido das Unidades Básicas de Saúde e Estratégias Saúde da Família em Bagé.
            Projeto inspirado pela comunidade da Unipampa e pelo curso de Engenharia de Computação.
          </p>
          <div className="hero-tags">
            <span>Unipampa</span>
            <span>Engenharia de Computação</span>
            <span>Cuidado Territorial</span>
          </div>
        </div>
        <div className="hero-stats">
          <div>
            <strong>{FACILITIES.length}</strong>
            <span>Unidades catalogadas</span>
          </div>
          <div>
            <strong>{totalServices}</strong>
            <span>Tipos de serviços</span>
          </div>
          <div>
            <strong>100%</strong>
            <span>Atendimento SUS</span>
          </div>
        </div>
      </header>

      <section className="panel search-panel">
        <label htmlFor="search">Busque por bairro, serviço ou unidade</label>
        <input
          id="search"
          type="text"
          placeholder="Ex.: vacinação, Damasceno, ESF..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <div className="filters">
          <select value={filterType} onChange={(event) => setFilterType(event.target.value)}>
            <option value="all">Todas as tipologias</option>
            <option value="UBS">Unidades Básicas de Saúde</option>
            <option value="ESF">Estratégias Saúde da Família</option>
          </select>
          <button type="button" onClick={() => setFilterType('all')}>
            Limpar filtro
          </button>
        </div>
        <p className="panel-hint">
          Resultado mostra {filteredFacilities.length}{' '}
          {filteredFacilities.length === 1 ? 'unidade' : 'unidades'} • {TYPE_LABELS[filterType]}
        </p>
      </section>

      <section className="panel institution-logos">
        <h3>Parceiros institucionais</h3>
        <div className="logos-grid">
          {INSTITUTION_LOGOS.map((logo) => (
            <div key={logo.id} className="logo-card">
              <img src={logo.url} alt={logo.alt} loading="lazy" />
              <p className="logo-name">{logo.name}</p>
              <p className="logo-tagline">{logo.tagline}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="panel info-tabs">
        <div className="tab-controls">
          <button
            type="button"
            className={activeInfoTab === 'devs' ? 'active' : ''}
            onClick={() => setActiveInfoTab('devs')}
          >
            Desenvolvedores
          </button>
          <button
            type="button"
            className={activeInfoTab === 'unipampa' ? 'active' : ''}
            onClick={() => setActiveInfoTab('unipampa')}
          >
            Sobre a Unipampa
          </button>
        </div>

        <div className="tab-content">
          <h3>{TAB_CONTENT[activeInfoTab].title}</h3>
          <p>{TAB_CONTENT[activeInfoTab].description}</p>

          {activeInfoTab === 'devs' && (
            <div className="profiles">
              {DEVELOPERS.map((person) => (
                <div key={person.name} className="profile-card">
                  <h4>{person.name}</h4>
                  <p>{person.role}</p>
                  <p>{person.focus}</p>
                  <a href={`mailto:${person.contact}`}>{person.contact}</a>
                </div>
              ))}
            </div>
          )}

          {activeInfoTab === 'unipampa' && (
            <ul className="unipampa-list">
              <li>
                <strong>Campus Bagé:</strong> referência em Engenharia de Computação com laboratórios
                orientados a soluções para o SUS.
              </li>
              <li>
                <strong>Observatório Pampa Saúde:</strong> monitora indicadores e apoia equipes das UBS/ESF.
              </li>
              <li>
                <strong>Prefeitura Municipal:</strong> integra dados oficiais de serviços, horários e campanhas
                de vacinação.
              </li>
            </ul>
          )}
        </div>
      </section>

      <section className="cards-grid">
        {filteredFacilities.map((facility) => (
          <article key={facility.id} className="facility-card">
            <header>
              <div>
                <p className="facility-type">{facility.type}</p>
                <h2>{facility.name}</h2>
                <p className="facility-neighborhood">{facility.neighborhood}</p>
              </div>
              <span className="facility-badge">{TYPE_LABELS[facility.type]}</span>
            </header>

            <div className="facility-info">
              <p>
                <strong>Endereço:</strong> {facility.address}
              </p>
              <p>
                <strong>Horário:</strong> {facility.hours}
              </p>
              <p>
                <strong>Telefone:</strong> {facility.phone}
              </p>
            </div>

            <div className="facility-services">
              {facility.services.map((service) => (
                <span key={service}>{service}</span>
              ))}
            </div>

            <p className="facility-notes">{facility.notes}</p>

            <div className="facility-actions">
              <a href={facility.googleMaps} target="_blank" rel="noreferrer">
                Ver no Maps
              </a>
              <a href={`tel:${facility.phone.replace(/\D/g, '')}`}>Ligar</a>
            </div>
          </article>
        ))}

        {filteredFacilities.length === 0 && (
          <div className="empty-state">
            <p>Nenhuma unidade encontrada com os filtros atuais.</p>
            <button type="button" onClick={() => setSearchTerm('')}>
              Limpar busca
            </button>
          </div>
        )}
      </section>

      <footer className="app-footer">
        <p>
          Pampa Saúde · Bagé/RS · Conexão direta com a Universidade Federal do Pampa e a Engenharia de
          Computação.
        </p>
        <p>Dados compilados para fins de consulta rápida. Confirme horários diretamente com a unidade.</p>
      </footer>
    </div>
  );
}

export default App;
