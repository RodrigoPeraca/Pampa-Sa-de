import { useMemo, useState } from 'react';
import './App.css';

const FACILITIES = [
  {
    id: 'ESF-Arvorezinha',
    name: 'ESF Arvorezinha',
    type: 'ESF',
    neighborhood: 'Tarumã',
    address: 'Rua Pompilio Nunes,275 - Tarumã, Bagé - RS',
    hours: 'Seg a Sex · 13h30 às 17h30',
    phone: '(53) 3241-1588',
    services: [
      'Clínica Geral',
      'Sala de Vacinas',
      'Saúde da Mulher',
      'Dispensação de medicamentos',
    ],
    googleMaps:
      'https://maps.app.goo.gl/QEk2Kc8hfdkmWR728',
    notes:
      'Ponto de referência para atendimentos de média complexidade e marcações do e-SUS.',
  },
  {
    id: 'ESF Centro-Social-Urbano',
    name: 'ESF Centro Social Urbano Áttila Taborda',
    type: 'ESF',
    neighborhood: 'Pedras Brancas',
    address: 'Rua General Osório, 215 - bairro Pedras Brancas, Bagé - RS',
    hours: 'Seg a Sex · 8h às 18h',
    phone: '(53) 3241-0042',
    services: [
      'Atendimento multiprofissional da ESF',
      'Pré-natal',
      'Saúde da Criança',
      'Visitas domiciliares',
    ],
    googleMaps:
      'https://maps.app.goo.gl/6NsLJbufWFrTmJTD8',
    notes:
      'Equipe integrada ao Programa Universidade Aberta do SUS com participação da Unipampa.',
  },
  {
    id: 'ESF-Damé',
    name: 'ESF Damé',
    type: 'ESF',
    neighborhood: 'Centro',
    address: 'Rua 93 - Centro, Bagé - RS',
    hours: 'Seg a Sex · 13h30 às 17h30',
    phone: '(53) 3242-2476',
    services: [
      'Estratégia Saúde da Família',
      'Grupos de Hipertensão/Diabetes',
      'Acolhimento odontológico',
    ],
    googleMaps:
      'https://maps.app.goo.gl/8yeCTE56M6Vow9Be7',
    notes:
      'Foco em vigilância ativa com apoio dos laboratórios de Engenharia de Computação da Unipampa.',
  },
  {
    id: 'UBS-Ivo-Ferronato',
    name: 'UBS Ivo Ferronato',
    type: 'UBS',
    neighborhood: 'Industrial I',
    address: 'R. Luiz Adão Médici, 2990 - Industrial I, Bagé - RS',
    hours: 'Seg a Sex · 7h30 às 12h, 13h30 às 17h',
    phone: '(53) 3247-6004',
    services: [
      'Clínica Geral',
      'Saúde Bucal',
      'Farmácia Básica',
      'Curativos e procedimentos',
    ],
    googleMaps:
      'https://maps.app.goo.gl/dMaW6zD4dL3kMNqC6',
    notes: 'Integra o eixo de telessaúde experimental com alunos da Engenharia de Computação.',
  },
  {
    id: 'UBS-Passo-das-Pedras',
    name: 'UBS Passo das Pedras',
    type: 'UBS',
    neighborhood: 'Castro Alves',
    address: 'R. Wilsom Rosa da Cruz, 135 - Castro Alves, Bagé - RS',
    hours: 'Seg a Sex · 13h30 às 17h',
    phone: '(53) 3240-6760',
    services: [
      'Estratégia Saúde da Família',
      'Acompanhamento de gestantes',
      'Assistência social e NASF',
    ],
    googleMaps:
      'https://maps.app.goo.gl/LCpCQfUmqqijEz2d6',
    notes:
      'Equipe com agentes comunitários conectados ao observatório Pampa Saúde da Unipampa.',
  },
  {
    id: 'UBS-ESF-Prado-Velho',
    name: 'UBS ESF Prado Velho',
    type: 'UBS',
    neighborhood: 'Prado Velho',
    address: 'R. 738, 140 - Prado Velho, Bagé - RS',
    hours: 'Seg a Sex · 7h30 às 17h',
    phone: '(53) 3247-3876',
    services: [
      'Clínica Geral',
      'Pediatria',
      'Saúde Mental',
      'Serviços laboratoriais básicos',
    ],
    googleMaps:
      'https://maps.app.goo.gl/RDvrhRxRKW7EoE9P7',
    notes:
      'Piloto de indicadores inteligentes desenvolvido pelo curso de Engenharia de Computação/Unipampa.',
  },
  {
    id: 'UBS-ESF-São-Martin',
    name: 'UBS ESF São Martin',
    type: 'UBS',
    neighborhood: 'São Martins',
    address: 'R. Onze, 265 - São Martins, Bagé - RS',
    hours: 'Seg a Sex · 13h30 às 17h30',
    phone: '(53) 3247-1385',
    services: [
      'Clínica Geral',
      'Pediatria',
      'Saúde Mental',
      'Serviços laboratoriais básicos',
    ],
    googleMaps:
      'https://maps.app.goo.gl/eztGbUAvzWFctPb97',
    notes:
      'Piloto de indicadores inteligentes desenvolvido pelo curso de Engenharia de Computação/Unipampa.',
  },
  {
    id: 'UBS-ESF-Floresta',
    name: 'UBS ESF Floresta',
    type: 'UBS',
    neighborhood: 'Floresta',
    address: 'Estr. do Passo do Apertado, 484-618 - Floresta, Bagé - RS',
    hours: 'Seg a Sex · 7h30 às 17h30',
    phone: '(53) ---------',
    services: [
      'Clínica Geral',
      'Pediatria',
      'Saúde Mental',
      'Serviços laboratoriais básicos',
    ],
    googleMaps:
      'https://maps.app.goo.gl/BSDQySfhBWTYyYHW7',
    notes:
      'Piloto de indicadores inteligentes desenvolvido pelo curso de Engenharia de Computação/Unipampa.',
  },
  {
    id: 'UBS-ESF-Morgado-Rosa',
    name: 'UBS ESF Morgado Rosa',
    type: 'UBS',
    neighborhood: 'Habilitar Brasil',
    address: 'R. Valdemar Milan, 690 - Habitar Brasil, Bagé - RS, 96418-020',
    hours: 'Seg a Sex · 13h30 às 17h30',
    phone: '(53) 3242-8518',
    services: [
      'Clínica Geral',
      'Pediatria',
      'Saúde Mental',
      'Serviços laboratoriais básicos',
    ],
    googleMaps:
      'https://maps.app.goo.gl/nutertoSDxGP8s5YA',
    notes:
      'Piloto de indicadores inteligentes desenvolvido pelo curso de Engenharia de Computação/Unipampa.',
  },
  {
    id: 'UBS-ESF-Santa-Cecília',
    name: 'UBS ESF Santa Cecília',
    type: 'UBS',
    neighborhood: 'Menino Deus',
    address: 'R. Armando Xavier Azambuja - Menino Deus, Bagé - RS,',
    hours: 'Seg a Sex · 13h30 às 17h30',
    phone: '(53) 3247-1356',
    services: [
      'Clínica Geral',
      'Pediatria',
      'Saúde Mental',
      'Serviços laboratoriais básicos',
    ],
    googleMaps:
      'https://maps.app.goo.gl/k1iW7i8hjvxUnwz36',
    notes:
      'Piloto de indicadores inteligentes desenvolvido pelo curso de Engenharia de Computação/Unipampa.',
  },
  {
    id: 'UBS-Malafáia',
    name: 'UBS Malafáia',
    type: 'UBS',
    neighborhood: 'Industrial I',
    address: 'R. Odilson Álvares, 1935 - Industrial I, Bagé - RS,',
    hours: 'Seg a Sex · 7h30 às 11h30, 13h30 às 16h30',
    phone: '(53) 3242-3016',
    services: [
      'Clínica Geral',
      'Pediatria',
      'Saúde Mental',
      'Serviços laboratoriais básicos',
    ],
    googleMaps:
      'https://maps.app.goo.gl/e1fgdUYuPsN4Am79A',
    notes:
      'Piloto de indicadores inteligentes desenvolvido pelo curso de Engenharia de Computação/Unipampa.',
  },
  {
    id: 'ESF-Dois-Irmãos',
    name: 'Posto de Saúde ESF Dois Irmãos',
    type: 'ESF',
    neighborhood: 'São Judas',
    address: 'R. Nossa Sra. dos Navegantes, 82 - São Judas, Bagé - RS,',
    hours: 'Seg a Sex · 8h às 17h',
    phone: '(53) 3241-0774',
    services: [
      'Clínica Geral',
      'Pediatria',
      'Saúde Mental',
      'Serviços laboratoriais básicos',
    ],
    googleMaps:
      'https://maps.app.goo.gl/BBJ7h5F3wsfn1jZg6',
    notes:
      'Piloto de indicadores inteligentes desenvolvido pelo curso de Engenharia de Computação/Unipampa.',
  },
  {
    id: 'UBS-São-Bernardo',
    name: 'UBS São Bernardo',
    type: 'UBS',
    neighborhood: 'Getúlio Vargas',
    address: 'R. Barão de Itaqui, 1010 - Getúlio Vargas, Bagé - RS,',
    hours: 'Seg a Sex · 7h30 às 12h, 13h30 às 17h',
    phone: '(53) 3241-7990',
    services: [
      'Clínica Geral',
      'Pediatria',
      'Saúde Mental',
      'Serviços laboratoriais básicos',
    ],
    googleMaps:
      'https://maps.app.goo.gl/pADDdEhcNWL21ry86',
    notes:
      'Piloto de indicadores inteligentes desenvolvido pelo curso de Engenharia de Computação/Unipampa.',
  },
  {
    id: 'Posto-de-Saúde-Sá-Mommany',
    name: 'Posto de Saúde Sá Mommany',
    type: 'ESF',
    neighborhood: 'Getúlio Vargas',
    address: 'R. Carlos Barbosa, 1385 - Getúlio Vargas, Bagé - RS',
    hours: 'Seg a Sex · 8h às 11h',
    phone: '(53) 3242-5390',
    services: [
      'Clínica Geral',
      'Pediatria',
      'Saúde Mental',
      'Serviços laboratoriais básicos',
    ],
    googleMaps:
      'https://maps.app.goo.gl/8uUGMHjPZHDhPH1P8',
    notes:
      'Piloto de indicadores inteligentes desenvolvido pelo curso de Engenharia de Computação/Unipampa.',
  },
  {
    id: 'UBS-CAIC',
    name: 'UBS CAIC',
    type: 'UBS',
    neighborhood: 'São Jorge',
    address: 'Av. Tupi Silveira, 141 - São Jorge, Bagé - RS',
    hours: 'Seg a Sex · 7h30 às 16h45',
    phone: '(53) 3241-1552',
    services: [
      'Clínica Geral',
      'Pediatria',
      'Saúde Mental',
      'Serviços laboratoriais básicos',
    ],
    googleMaps:
      'https://maps.app.goo.gl/U4RcQHBZsaN48xGQ9',
    notes:
      'Piloto de indicadores inteligentes desenvolvido pelo curso de Engenharia de Computação/Unipampa.',
  },
  {
    id: 'Posto-de-Saúde-Camilo-Gomes',
    name: 'Posto de Saúde Camilo Gomes',
    type: 'ESF',
    neighborhood: 'Centro',
    address: 'R. Fabrício Pilar, 1201 - Centro, Bagé - RS',
    hours: 'Seg a Sex · 7h30 às 17h30',
    phone: '(53) 3242-2433',
    services: [
      'Clínica Geral',
      'Pediatria',
      'Saúde Mental',
      'Serviços laboratoriais básicos',
    ],
    googleMaps:
      'https://maps.app.goo.gl/MuJGhk3iQ4TbA8B87',
    notes:
      'Piloto de indicadores inteligentes desenvolvido pelo curso de Engenharia de Computação/Unipampa.',
  },
  {
    id: 'Centro-Referência-em-Tuberculose',
    name: 'Centro de Referência em Tuberculose',
    type: 'UBS',
    neighborhood: 'Centro',
    address: 'R. Floriano Peixoto, 1752 - Centro, Santa Maria - RS',
    hours: 'Seg a Sex · *** às ***',
    phone: '(53) 3921-7060',
    services: [
      'Clínica Geral',
      'Pediatria',
      'Saúde Mental',
      'Serviços laboratoriais básicos',
    ],
    googleMaps:
      'https://maps.app.goo.gl/CnmwW8nMN1pRsv3m7',
    notes:
      'Piloto de indicadores inteligentes desenvolvido pelo curso de Engenharia de Computação/Unipampa.',
  },
  {
    id: 'Mathilde-Fayad-CAPS-I',
    name: 'Mathilde Fayad - CAPS I',
    type: 'CAPS',
    neighborhood: 'Centro',
    address: 'R. Caetano Gonçalves, 811 - Centro, Bagé - RS, 96400-040',
    hours: 'Seg a Sex · *** às ***',
    phone: '(53) 3242-1495',
    services: [
      'Clínica Geral',
      'Pediatria',
      'Saúde Mental',
      'Serviços laboratoriais básicos',
    ],
    googleMaps:
      'https://maps.app.goo.gl/sbki39gvefkDmT8D8',
    notes:
      'Piloto de indicadores inteligentes desenvolvido pelo curso de Engenharia de Computação/Unipampa.',
  },
  {
    id: 'CAPS-II-Saúde-Mental',
    name: 'CAPS II - Saúde Mental',
    type: 'CAPS',
    neighborhood: 'Centro',
    address: 'Av. Mal. Floriano, 1499 - Centro, Bagé - RS',
    hours: 'Seg a Sex · 8h às 17h',
    phone: '(53) 3247-3248',
    services: [
      'Clínica Geral',
      'Pediatria',
      'Saúde Mental',
      'Serviços laboratoriais básicos',
    ],
    googleMaps:
      'https://maps.app.goo.gl/em1ruGWbxFfw3gqq5',
    notes:
      'Piloto de indicadores inteligentes desenvolvido pelo curso de Engenharia de Computação/Unipampa.',
  },
  {
    id: 'CAPS-AD',
    name: 'CAPS AD',
    type: 'CAPS',
    neighborhood: 'São Jorge',
    address: 'Av. Gen. Osório, 320 - São Jorge, Bagé - RS',
    hours: 'Seg a Sex · *** às ***',
    phone: '(53) 3247-7243',
    services: [
      'Clínica Geral',
      'Pediatria',
      'Saúde Mental',
      'Serviços laboratoriais básicos',
    ],
    googleMaps:
      'https://maps.app.goo.gl/NgAXio6RKQUsUDxp7',
    notes:
      'Piloto de indicadores inteligentes desenvolvido pelo curso de Engenharia de Computação/Unipampa.',
  },
  {
    id: 'SAIS-Bagé',
    name: 'SAIS Bagé',
    type: 'SAIS',
    neighborhood: 'Centro',
    address: 'R. Fabrício Pilar, 1201 - Centro, Bagé - RS',
    hours: 'Seg a Sex · 7h30 às 17h',
    phone: '(53) 3242-2433',
    services: [
      'Clínica Geral',
      'Pediatria',
      'Saúde Mental',
      'Serviços laboratoriais básicos',
    ],
    googleMaps:
      'https://maps.app.goo.gl/h4n6jqa2fyJgd4qm8',
    notes:
      'Piloto de indicadores inteligentes desenvolvido pelo curso de Engenharia de Computação/Unipampa.',
  },
  {
    id: 'UBS-ESF-Doutor-Jorge-Sui-e-Grillo',
    name: 'UBS ESF Doutor Jorge Sui e Grillo',
    type: 'UBS',
    neighborhood: 'Centro',
    address: 'Av. Gen. Mallet - Centro, Bagé - RS',
    hours: 'Seg a Sex · 13h30 às 17h30',
    phone: '(53) 3242-7755',
    services: [
      'Clínica Geral',
      'Pediatria',
      'Saúde Mental',
      'Serviços laboratoriais básicos',
    ],
    googleMaps:
      'https://maps.app.goo.gl/NgAXio6RKQUsUDxp7',
    notes:
      'Piloto de indicadores inteligentes desenvolvido pelo curso de Engenharia de Computação/Unipampa.',
  },
  {
    id: 'SAMU-Base-Bagé',
    name: 'SAMU Base de Bagé',
    type: 'SAMU',
    neighborhood: 'Getúlio Vargas',
    address: 'Av. Santa Tecla, 299 - Getúlio Vargas, Bagé - RS',
    hours: 'Seg a Sex · *** às ***',
    phone: '(53) 99998-6283',
    services: [
      'Clínica Geral',
      'Pediatria',
      'Saúde Mental',
      'Serviços laboratoriais básicos',
    ],
    googleMaps:
      'https://maps.app.goo.gl/a6E4vfdJ8trZKajy9',
    notes:
      'Piloto de indicadores inteligentes desenvolvido pelo curso de Engenharia de Computação/Unipampa.',
  },
  {
    id: 'UBS-Ivone',
    name: 'UBS Ivone',
    type: 'UBS',
    neighborhood: 'Castro Alves',
    address: 'R. Cecira Falace Saraíva, 514 - Castro Alves, Bagé - RS',
    hours: 'Seg a Sex · 13h30 às 17h30',
    phone: '(53) 3247-3273',
    services: [
      'Clínica Geral',
      'Pediatria',
      'Saúde Mental',
      'Serviços laboratoriais básicos',
    ],
    googleMaps:
      'https://maps.app.goo.gl/Bj6HJb9b6EXh9XbPA',
    notes:
      'Piloto de indicadores inteligentes desenvolvido pelo curso de Engenharia de Computação/Unipampa.',
  },
  {
    id: 'UPA-Padre-Honorino',
    name: 'UPA Padre Honorino',
    type: 'UPA',
    neighborhood: 'Getúlio Vargas',
    address: 'Rua Felix Contreiras Rodrigues, 69 - Getúlio Vargas, Bagé - RS',
    hours: 'Todos os dias · 24h',
    phone: '(53) 3247-7243',
    services: [
      'Clínica Geral',
      'Pediatria',
      'Saúde Mental',
      'Serviços laboratoriais básicos',
    ],
    googleMaps:
      'https://maps.app.goo.gl/na7WGyFayy58ihoB6',
    notes:
      'Piloto de indicadores inteligentes desenvolvido pelo curso de Engenharia de Computação/Unipampa.',
  },
  {
    id: 'Hospital-Universitario-Dr-Mário-Araújo',
    name: 'Hospital Universitário Dr. Mário Araújo',
    type: 'Hospital',
    neighborhood: 'Popular',
    address: 'R. Gen. Flores da Cunha, 169 - Popular, Bagé - RS',
    hours: 'Todos os dias · 7h30 às 12h, 13h30 às 18h',
    phone: '(53) 3247-7243',
    services: [
      'Clínica Geral',
      'Pediatria',
      'Saúde Mental',
      'Serviços laboratoriais básicos',
    ],
    googleMaps:
      'https://maps.app.goo.gl/Qiuj3jrw2XBYVpvh6',
    notes:
      'Piloto de indicadores inteligentes desenvolvido pelo curso de Engenharia de Computação/Unipampa.',
  },
];

const TYPE_LABELS = {
  all: 'Todas as unidades',
  UBS: 'Unidade Básica de Saúde',
  ESF: 'Estratégia Saúde da Família',
  CAPS: 'Centro de Atenção Psicossocial',
  SAIS: 'Serviço de Atenção Integral à Saúde',
  UPA: 'Unidade de Pronto Atendimento',
  Hospital: 'Hospital',
  SAMU: 'Serviço de Atendimento Móvel de Urgência',
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
        <div className="tab-content">
          <div className="container">
            <h3>Parceiros institucionais</h3>
            <div className="grid">
              {INSTITUTION_LOGOS.map((logo) => (
                <div key={logo.id} className="card">
                  <img src={logo.url} alt={logo.alt} loading="lazy" />
                  <p className="name">{logo.name}</p>
                  <p className="role">{logo.tagline}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="panel info-tabs">
        <div className="tab-controls">
          <button
            className={activeInfoTab === 'devs' ? 'active' : ''}
            onClick={() => setActiveInfoTab('devs')}
          >
            Desenvolvedores
          </button>

          <button
            className={activeInfoTab === 'unipampa' ? 'active' : ''}
            onClick={() => setActiveInfoTab('unipampa')}
          >
            Unipampa  
          </button>
        </div>

        <div className="tab-content">
          <h3>{TAB_CONTENT[activeInfoTab].title}</h3>
          <p>{TAB_CONTENT[activeInfoTab].description}</p>

          {activeInfoTab === 'devs' && (
            <div className="container">
              <div className="grid"> 
              {DEVELOPERS.map((person) => (
                <div key={person.name} className="card">
                  <h3 className="name">👤 {person.name}</h3>
                  <p className="role">{person.role}</p>
                  <p className="focus">💻 {person.focus}</p>
                  <a href={`mailto:${person.contact}`}>📧 {person.contact}</a>
                </div>
              ))}
              </div>
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
