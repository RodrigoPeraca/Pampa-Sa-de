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
      "Clinico Geral",
      "Ginecologia",
      "Vacinação",
      "Pre Natal",
      "Saúde da Família",
      "Praticas Integrativas",
      "Visita Domiciliar",
      "Encaminhamentos",
    ],
    googleMaps:
      'https://maps.app.goo.gl/QEk2Kc8hfdkmWR728',
    notes:
      'Unidade básica com atendimento clínico, vacinação, pré-natal e ações de promoção da saúde.',
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
      "Clinico Geral",
      "Vacinação",
      "Pre Natal",
      "Saúde da Família",
      "Visita Domiciliar",
      "Encaminhamentos",
    ],
    googleMaps:
      'https://maps.app.goo.gl/6NsLJbufWFrTmJTD8',
    notes:
      'Unidade de saúde da família que realiza atendimentos básicos, prevenção de doenças e acompanhamento comunitário.',
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
      "Clinico Geral",
      "Vacinação",
      "Pre Natal",
      "Saúde da Família",
      "Visita Domiciliar",
      "Encaminhamentos",
    ],
    googleMaps:
      'https://maps.app.goo.gl/8yeCTE56M6Vow9Be7',
    notes:
      'Posto de saúde com serviços básicos, incluindo consultas, vacinação e acompanhamento da saúde da população local.',
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
      "Clinico Geral",
      "Enfermagem",
      "Vacinação",
      "Pre Natal",
      "Acompanhamento Hipertensão Diabetes",
      "Visita Domiciliar",
      "Encaminhamentos",
      "Dispensação Medicamentos",
    ],
    googleMaps:
      'https://maps.app.goo.gl/dMaW6zD4dL3kMNqC6',
    notes: 'Unidade básica que oferece atendimento clínico, vacinação, pré-natal e acompanhamento de pacientes da comunidade.',
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
      "Clinico Geral",
      "Ginecologia",
      "Vacinação",
      "Pre Natal",
      "Saúde da Família",
      "Teleconsultoria",
      "Visita Domiciliar",
      "Encaminhamentos",
    ],
    googleMaps:
      'https://maps.app.goo.gl/LCpCQfUmqqijEz2d6',
    notes:
      'Posto de saúde que oferece consultas médicas, vacinação, pré-natal e acompanhamento da comunidade.',
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
      "Clinico Geral",
      "Vacinação",
      "Pre Natal",
      "Saúde da Família",
      "Visita Domiciliar",
      "Encaminhamentos",
    ],
    googleMaps:
      'https://maps.app.goo.gl/RDvrhRxRKW7EoE9P7',
    notes:
      'Unidade de saúde da família que oferece atendimento básico, vacinação, pré-natal e acompanhamento contínuo da comunidade.',
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
      "Clinico Geral",
      "Ginecologia",
      "Vacinação",
      "Pre Natal",
      "Saúde da Família",
      "Visita Domiciliar",
      "Acompanhamento Familiar",
      "Encaminhamentos",
      "Educação em Saúde",
    ],
    googleMaps:
      'https://maps.app.goo.gl/eztGbUAvzWFctPb97',
    notes:
      'Equipe de saúde da família com foco em prevenção, consultas médicas e acompanhamento contínuo das famílias da região.',
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
      "Clinico Geral",
      "Enfermagem",
      "Vacinação",
      "Pre Natal",
      "Saúde da Família",
      "Visita Domiciliar",
      "Acompanhamento Crónicos",
      "Encaminhamentos",
      "Promoção Saúde",
    ],
    googleMaps:
      'https://maps.app.goo.gl/BSDQySfhBWTYyYHW7',
    notes:
      'Unidade de atenção primária com atendimento básico, vacinação, pré-natal e visitas domiciliares.',
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
      "Clinico Geral",
      "Enfermagem",
      "Vacinação",
      "Pre Natal",
      "Saúde da Família",
      "Visita Domiciliar",
      "Encaminhamentos",
    ],
    googleMaps:
      'https://maps.app.goo.gl/nutertoSDxGP8s5YA',
    notes:
      'Unidade de atenção primária que atende a população da área com consultas básicas, vacinação, pré-natal e acompanhamento familiar.',
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
      "Clinico Geral",
      "Ginecologia",
      "Vacinação",
      "Pre Natal",
      "Saúde da Família",
      "Visita Domiciliar",
      "Encaminhamentos",
      "Educação em Saúde",
    ],
    googleMaps:
      'https://maps.app.goo.gl/k1iW7i8hjvxUnwz36',
    notes:
      'Equipe de saúde da família focada em prevenção, consultas médicas, vacinação e acompanhamento contínuo dos moradores da região.',
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
      "Clinico Geral",
      "Enfermagem",
      "Vacinação",
      "Pre Natal",
      "Dispensação Medicamentos",
      "Encaminhamentos",
    ],
    googleMaps:
      'https://maps.app.goo.gl/e1fgdUYuPsN4Am79A',
    notes:
      'Posto de saúde que oferece atendimento clínico básico, vacinação, curativos e encaminhamento para especialistas.',
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
      "Clinico Geral",
      "Ginecologia",
      "Vacinação",
      "Pre Natal",
      "Saúde da Família",
      "Teleconsultoria",
      "Visita Domiciliar",
      "Encaminhamentos",
    ],
    googleMaps:
      'https://maps.app.goo.gl/BBJ7h5F3wsfn1jZg6',
    notes:
      'Unidade de atenção primária com foco em consultas básicas, vacinação, pré-natal e saúde da família.',
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
      "Atencao Primária",
      "Consulta Ambulatorial",
      "Acompanhamento Pacientes",
      "Encaminhamentos",
      "Visita Domiciliar",
    ],
    googleMaps:
      'https://maps.app.goo.gl/pADDdEhcNWL21ry86',
    notes:
      'Equipe de saúde da família que atende com consultas, acompanhamento de pacientes e Encaminhamentos pelo SUS.',
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
      "Clinico Geral",
      "Vacinação",
      "Curativos",
      "Pre Natal",
      "Encaminhamentos",
    ],
    googleMaps:
      'https://maps.app.goo.gl/8uUGMHjPZHDhPH1P8',
    notes:
      'Unidade básica com atendimentos simples como consultas, vacinação, curativos e Encaminhamentos pelo SUS.',
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
      "Clinico Geral",
      "Odontologia",
      "Farmacia",
      "Pre Natal",
      "Prontuario Paciente",
      "Vacinação",
      "Encaminhamentos",
    ],
    googleMaps:
      'https://maps.app.goo.gl/U4RcQHBZsaN48xGQ9',
    notes:
      'Unidade básica com atendimento clínico, vacinação, pré-natal, farmácia e serviços odontológicos.',
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
      "Clinico Geral",
      "Vacinação",
      "Curativos",
      "Pre Natal",
      "Encaminhamentos",
    ],
    googleMaps:
      'https://maps.app.goo.gl/MuJGhk3iQ4TbA8B87',
    notes:
      'Posto voltado à atenção primária com serviços essenciais de saúde, prevenção e encaminhamento de pacientes.',
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
      "Diagnóstico Tuberculose",
      "Tratamento Tuberculose",
      "Acompanhamento Pacientes",
      "Dispensação Medicamentos",
      "Vigilância Epidemiológica",
    ],
    googleMaps:
      'https://maps.app.goo.gl/CnmwW8nMN1pRsv3m7',
    notes:
      'Unidade especializada no diagnóstico, tratamento e acompanhamento de pacientes com tuberculose.',
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
      "Atendimento Psicologico",
      "Atendimento Psiquiatrico",
      "Acompanhamento Intensivo",
      "Oficinas Terapeuticas",
      "Atendimento Infantil",
    ],
    googleMaps:
      'https://maps.app.goo.gl/sbki39gvefkDmT8D8',
    notes:
      'Centro de atenção psicossocial voltado ao atendimento de crianças e adolescentes com transtornos mentais.',
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
      "Atendimento Psicologico",
      "Atendimento Psiquiatrico",
      "Acompanhamento Continuo",
      "Grupos Terapeuticos",
      "Reabilitacao Psicossocial",
    ],
    googleMaps:
      'https://maps.app.goo.gl/em1ruGWbxFfw3gqq5',
    notes:
      'Unidade especializada em saúde mental para adultos, com acompanhamento psicológico, psiquiátrico e reabilitação.',
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
      "Tratamento Dependência Química",
      "Atendimento Psicologico",
      "Atendimento Psiquiatrico",
      "Grupos Apoio",
      "Redução Danos",
    ],
    googleMaps:
      'https://maps.app.goo.gl/NgAXio6RKQUsUDxp7',
    notes:
      'Centro especializado no tratamento de dependência de álcool e drogas, com apoio psicológico e psiquiátrico.',
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
      "Atendimento Especializado",
      "Consultas Especialidades",
      "Exames",
      "Encaminhamentos",
    ],
    googleMaps:
      'https://maps.app.goo.gl/h4n6jqa2fyJgd4qm8',
    notes:
      'Serviço de atendimento especializado com consultas médicas específicas, exames e Encaminhamentos.',
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
      "Clinico Geral",
      "enfermagem",
      "Vacinação",
      "Pre Natal",
      "Saúde da Família",
      "Visita Domiciliar",
      "Encaminhamentos",
    ],
    googleMaps:
      'https://maps.app.goo.gl/NgAXio6RKQUsUDxp7',
    notes:
      'Unidade de saúde da família com foco em atendimento básico, prevenção de doenças e acompanhamento da comunidade.',
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
      "Atendimento Pre Hospitalar",
      "Suporte Basico a Vida",
      "Suporte Avançado a Vida",
      "Remoção Pacientes",
    ],
    googleMaps:
      'https://maps.app.goo.gl/a6E4vfdJ8trZKajy9',
    notes:
      'Serviço móvel de urgência que atende emergências pelo telefone 192, realizando socorro e transporte de pacientes.',
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
      "Clinico Geral",
      "Vacinação",
      "Pre Natal",
      "Enfermagem",
      "Encaminhamentos",
    ],
    googleMaps:
      'https://maps.app.goo.gl/Bj6HJb9b6EXh9XbPA',
    notes:
      'Unidade básica com atendimento clínico, vacinação, pré-natal e encaminhamento dentro da rede SUS.',
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
      "Atendimento Urgência",
      "Atendimento Emergência",
      "Observação",
      "Estabilização Pacientes",
      "Exames Basicos"
    ],
    googleMaps:
      'https://maps.app.goo.gl/na7WGyFayy58ihoB6',
    notes:
      'Unidade de pronto atendimento para urgências e emergências, funcionando sem necessidade de agendamento.',
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
      "Internacao",
      "Cirurgias",
      "Consultas Especializadas",
      "Exames Complexos",
      "Atendimento Ambulatorial",
      "Ensino Pesquisa"
    ],
    googleMaps:
      'https://maps.app.goo.gl/Qiuj3jrw2XBYVpvh6',
    notes:
      'Hospital de média e alta complexidade com internações, cirurgias, exames e atendimento especializado.',
  },
  {
    id: 'ESF Castro Alves',
    name: 'ESF Castro Alves',
    type: 'ESF',
    neighborhood: 'Popular',
    address: 'R. Nice Nocchi, s/n - Castro Alves, Bagé - RS',
    hours: 'Segunda a Sexta · 7h30 às 12h, 13h30 às 17h',
    phone: '(53) 3247-7243',
    services: [
      "Clinico Geral",
      "Ginecologia",
      "Vacinação",
      "Pre Natal",
      "Saúde da Família",
      "Praticas Integrativas",
      "Teleconsultoria",
      "Visita Domiciliar",
      "Encaminhamentos",
    ],
    googleMaps:
      'https://maps.app.goo.gl/Qiuj3jrw2XBYVpvh6',
    notes:
      'Equipe de saúde da família que realiza atendimento básico, vacinação, acompanhamento familiar e Encaminhamentos.',
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
  // 👨‍🏫 ORIENTADORES
  {
    name: 'Julio Saraçol',
    role: 'Orientador(a) de Computação',
    focus: 'Coordenação técnica e desenvolvimento do sistema',
    contact: 'juliodomingues@unipampa.edu.br',
  },
  {
    name: 'Raquel Garcia',
    role: 'Orientador(a) da Saúde',
    focus: 'Validação das informações de saúde e integração com o SUS',
    contact: 'raquelgarcia@unipampa.edu.br',
  },

  // 👨‍💻 MONITORES - COMPUTAÇÃO
  {
    name: 'Abner Soares',
    role: 'Monitor(a) de Computação',
    focus: 'Desenvolvimento e manutenção do sistema',
    contact: 'abnersoares.aluno@unipampa.edu.br',
  },
  {
    name: 'Fernando Jose',
    role: 'Monitor(a) de Computação',
    focus: 'Desenvolvimento e suporte técnico',
    contact: 'fernandojose.aluno@unipampa.edu.br',
  },
  {
    name: 'Gabriel Machado',
    role: 'Monitor(a) de Computação',
    focus: 'Implementação de funcionalidades',
    contact: 'gabrielmachado.aluno@unipampa.edu.br',
  },
  {
    name: 'Leonardo Manzke',
    role: 'Monitor(a) de Computação',
    focus: 'Testes e otimização do sistema',
    contact: 'leonardomanzke.aluno@unipampa.edu.br',
  },
  {
    name: 'Rodrigo Peraça',
    role: 'Monitor(a) de Computação',
    focus: 'Desenvolvimento backend e APIs',
    contact: 'rodrigoperaca.aluno@unipampa.edu.br',
  },
  {
    name: 'Victor Moreira',
    role: 'Monitor(a) de Computação',
    focus: 'Integração e banco de dados',
    contact: 'victormoreira.aluno@unipampa.edu.br',
  },

  // 🏥 MONITORES - SAÚDE
  {
    name: 'Paolla Gonçalves',
    role: 'Monitor(a) da Saúde',
    focus: 'Levantamento de dados e validação de serviços',
    contact: 'paollagoncalves.aluno@unipampa.edu.br',
  },
  {
    name: 'Sahmira Chamorro',
    role: 'Monitor(a) da Saúde',
    focus: 'Organização das informações de saúde pública',
    contact: 'sahmirachamorro.aluno@unipampa.edu.br',
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

  const hasFilter = searchTerm.trim() !== '' || filterType !== 'all';

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
            <option value="CAPS">Centros de Atenção Psicossocial</option>
            <option value="SAIS">Serviços de Atenção Integral à Saúde</option>
            <option value="UPA">Unidades de Pronto Atendimento</option>
            <option value="Hospital">Hospitais</option>
            <option value="SAMU">Serviço de Atendimento Móvel de Urgência</option>
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

      {!hasFilter && (
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
      )}

      {!hasFilter && (
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
              {DEVELOPERS.map((person) => {
                const isHealthStaff = person.role.includes('Saúde');
                return (
                  <div key={person.name} className={`card ${isHealthStaff ? 'health-card' : ''}`}>
                    <h3 className="name">{isHealthStaff ? '🏥 ' : '👤 '}{person.name}</h3>
                    <p className="role">{person.role}</p>
                    <p className="focus">{isHealthStaff ? '🩺' : '💻'} {person.focus}</p>
                    <a className="email" href={`mailto:${person.contact}`}>
                      📧 {person.contact}
                    </a>
                  </div>
                );
              })}
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
      )}

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
