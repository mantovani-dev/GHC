/**
 * Quadro de vagas da GHC.
 *
 * Fonte: "VAGAS ABERTAS - GHC - 24-08-2026.pdf". Ao atualizar o quadro,
 * troque também `VACANCIES_UPDATED_AT` — a data alimenta o texto da seção
 * e o `datePosted` do JSON-LD de JobPosting.
 *
 * Câmbio usado na conversão para real na data acima:
 * 1 PLN = R$ 1,40 · 1 EUR = R$ 6,00.
 */

export type CountryCode = "pl" | "me" | "hr" | "dk";

/** Prazo de ingresso, como definido na legenda do material. */
export type EntryType = "imediato" | "futuro" | "confirmar";

export interface Vacancy {
  /** Código interno da vaga, usado como âncora e identificador. */
  code: string;
  country: CountryCode;
  /** Cargo. */
  title: string;
  /** Contexto que vem depois do travessão no material (empresa/setor). */
  context?: string;
  /** Faixa em real, já convertida. `null` quando o material diz "sob consulta". */
  salaryBRL: string | null;
  /** Remuneração na moeda local, como escrita no material. */
  salaryLocal: string;
  /** Valores numéricos para o JSON-LD. */
  salaryValue: { min: number; max?: number; unit: "MONTH" | "HOUR" };
  location: string;
  schedule: string;
  requirements: string;
  benefits: string;
  entry: EntryType;
  /** Destaque de "VAGA NOVA" no material. */
  isNew?: boolean;
  /** Ressalva que aparece com ⚠ no material. */
  warning?: string;
}

export interface Country {
  code: CountryCode;
  name: string;
  /** Formulário de inscrição do país. `null` = inscrição pelo WhatsApp. */
  formUrl: string | null;
  /** ISO 3166-1 alfa-2, usado no JSON-LD. */
  isoCode: string;
}

export const VACANCIES_UPDATED_AT = "2026-08-24";

export const countries: Country[] = [
  { code: "pl", name: "Polônia", isoCode: "PL", formUrl: "https://forms.gle/UFGi51QKLQFfRNA48" },
  { code: "hr", name: "Croácia", isoCode: "HR", formUrl: "https://forms.gle/xeRvXUuJAjmgp2Rq9" },
  { code: "me", name: "Montenegro", isoCode: "ME", formUrl: "https://forms.gle/EVKFuMc4gEqeX9jx9" },
  { code: "dk", name: "Dinamarca", isoCode: "DK", formUrl: null },
];

export const vacancies: Vacancy[] = [
  /* ---------------------------- POLÔNIA ---------------------------- */
  {
    code: "069",
    country: "pl",
    title: "Operador de Produção",
    context: "Fábrica de Kebab",
    salaryBRL: "R$ 7.900 a R$ 12.400",
    salaryLocal: "PLN 5.650 a 8.850 líquidos — pagamento por produção (0,65 PLN/kg)",
    salaryValue: { min: 5650, max: 8850, unit: "MONTH" },
    location: "Połajewo (Wielkopolska)",
    schedule: "Turno noturno de 8h, seg a sex + 6h no sábado — domingos livres",
    requirements: "Sem exigência de idioma",
    benefits:
      "Contrato com registro (ZUS) · acomodação 500 PLN · transporte grátis · cartão de residência de até 3 anos",
    entry: "futuro",
  },
  {
    code: "061",
    country: "pl",
    title: "Operador(a) de Armazém",
    context: "Centro Logístico",
    salaryBRL: "R$ 7.800 a R$ 10.900",
    salaryLocal: "PLN 5.554 a 7.776 líquidos",
    salaryValue: { min: 5554, max: 7776, unit: "MONTH" },
    location: "Krzyżowice (Wrocław)",
    schedule: "200 a 280h/mês — turnos de 12h, 5 a 6 dias",
    requirements: "A partir de 18 anos · não exige idioma · não exige experiência",
    benefits:
      "Treinamento no local · transporte grátis · alojamento 900-930 PLN · até 34 PLN/h para estudante menor de 26",
    entry: "futuro",
    warning: "Embarque previsto em 6 a 10 semanas",
  },
  {
    code: "074",
    country: "pl",
    title: "Instalador de Painéis Solares Fotovoltaicos",
    salaryBRL: "R$ 8.600 a R$ 10.300",
    salaryLocal: "PLN 6.120 a 7.344 por mês — 25,50 PLN por hora",
    salaryValue: { min: 6120, max: 7344, unit: "MONTH" },
    location: "Projetos em todo o país",
    schedule: "240 a 288h/mês — segunda a sábado, 10 a 12h por dia",
    requirements:
      "Passaporte vigente · disponibilidade para trabalho em altura · o perfil auxiliar não exige experiência",
    benefits:
      "Alojamento de 300 PLN — o mais barato do quadro · preparação antes do embarque · acompanhamento migratório",
    entry: "imediato",
    isNew: true,
  },
  {
    code: "072",
    country: "pl",
    title: "Operador(a) de Armazém",
    context: "Amazon",
    salaryBRL: "R$ 5.700 a R$ 10.200",
    salaryLocal: "PLN 4.058 a 7.304 líquidos",
    salaryValue: { min: 4058, max: 7304, unit: "MONTH" },
    location: "Nowa Niedrzwica (Gorzów Wielkopolski)",
    schedule: "160 a 288h/mês — turnos de 8 a 12h, 5 a 6 dias",
    requirements: "Inglês · até 55 anos · não exige experiência",
    benefits:
      "Alojamento a partir de 600 PLN · transporte grátis · capacitação remunerada · bônus de até 800 PLN · aceita casais",
    entry: "imediato",
    isNew: true,
  },
  {
    code: "062",
    country: "pl",
    title: "Operador(a) de Armazém",
    context: "Setor de Roupas",
    salaryBRL: "R$ 6.900 a R$ 10.300",
    salaryLocal: "PLN 4.894 a 7.341 líquidos",
    salaryValue: { min: 4894, max: 7341, unit: "MONTH" },
    location: "Szczecin",
    schedule: "200 a 300h/mês",
    requirements: "Inglês + vídeo de apresentação em inglês (obrigatório)",
    benefits: "Alojamento 750 PLN com quarto privativo para casal · empresa procura casais",
    entry: "confirmar",
  },
  {
    code: "067",
    country: "pl",
    title: "Operador(a) de Produção",
    context: "Frigorífico de Aves",
    salaryBRL: "R$ 5.500 a R$ 9.900",
    salaryLocal: "PLN 3.920 a 7.056 líquidos",
    salaryValue: { min: 3920, max: 7056, unit: "MONTH" },
    location: "Siedlce (90 km de Varsóvia)",
    schedule: "160 a 288h/mês — 8 a 12h/dia, 5 a 6 dias",
    requirements: "Até 58 anos · sem exigência de idioma",
    benefits:
      "Alojamento 500 PLN · 1 refeição grátis · roupa de trabalho grátis · homens, mulheres e casais",
    entry: "futuro",
  },
  {
    code: "073",
    country: "pl",
    title: "Operador(a) de Logística Postal",
    salaryBRL: "R$ 6.500 a R$ 9.700",
    salaryLocal: "PLN 4.608 a 6.912 líquidos — 24 PLN/h (+1 PLN/h com moradia própria)",
    salaryValue: { min: 4608, max: 6912, unit: "MONTH" },
    location: "Poznań",
    schedule: "192 a 288h/mês — 6 dias, turnos de 8 a 12h, incluindo noturno",
    requirements: "Boa condição física · não exige idioma · não exige experiência",
    benefits:
      "10 posições abertas · alojamento 500 PLN · transporte grátis · contrato que pode virar registro em carteira",
    entry: "imediato",
    isNew: true,
  },
  {
    code: "057",
    country: "pl",
    title: "Operador(a) de Embalagem em Armazém",
    salaryBRL: "R$ 7.500 a R$ 9.300",
    salaryLocal: "PLN 5.328 a 6.660 líquidos",
    salaryValue: { min: 5328, max: 6660, unit: "MONTH" },
    location: "Kąty Wrocławskie (Wrocław)",
    schedule: "Turnos de 10h",
    requirements: "Não exige experiência",
    benefits: "Alojamento 400 PLN · transporte grátis · refeição a 1 PLN · homens, mulheres e casais",
    entry: "futuro",
    warning: "Embarque previsto para outubro/2026",
  },
  {
    code: "053",
    country: "pl",
    title: "Operador(a) de Armazém",
    context: "SHEIN",
    salaryBRL: "R$ 7.000 a R$ 8.400",
    salaryLocal: "PLN 5.000 a 6.000 líquidos",
    salaryValue: { min: 5000, max: 6000, unit: "MONTH" },
    location: "Kąty Wrocławskie (Wrocław)",
    schedule: "~50h semanais — 10h/dia, seg a sex, 2 turnos",
    requirements: "Não exige experiência",
    benefits:
      "Alojamento 400 PLN · transporte grátis · refeição a 1 PLN · bônus de presença · até 32 PLN/h para estudante",
    entry: "futuro",
  },
  {
    code: "047",
    country: "pl",
    title: "Operador(a) de Produção",
    context: "Padaria Industrial",
    salaryBRL: "R$ 7.000 a R$ 8.400",
    salaryLocal: "PLN 5.024 a 6.028 líquidos",
    salaryValue: { min: 5024, max: 6028, unit: "MONTH" },
    location: "Região de Varsóvia",
    schedule: "40 a 48h semanais — turnos de 8h, não rotativos",
    requirements: "Preparo físico moderado",
    benefits: "Turno fixo — não roda entre manhã e noite",
    entry: "confirmar",
  },
  {
    code: "070",
    country: "pl",
    title: "Operador de Produção",
    context: "Componentes para Tesla",
    salaryBRL: "R$ 7.000",
    salaryLocal: "PLN 5.000 líquidos",
    salaryValue: { min: 5000, unit: "MONTH" },
    location: "Poznań",
    schedule: "~200h/mês — turnos de até 12h, seg a sáb",
    requirements: "Inglês, polonês ou espanhol · boa condição física",
    benefits: "17 posições abertas · alojamento 750–1.000 PLN · seguro de saúde · uniforme incluso",
    entry: "imediato",
    warning: "EXCLUSIVA para quem JÁ está legalmente na Polônia — não é embarque do Brasil",
  },
  {
    code: "068",
    country: "pl",
    title: "Operador(a) de Produção",
    context: "Frigorífico de Aves",
    salaryBRL: "R$ 5.600 a R$ 7.000",
    salaryLocal: "PLN 4.000 a 4.992 líquidos",
    salaryValue: { min: 4000, max: 4992, unit: "MONTH" },
    location: "Międzyrzec Podlaski (100 km de Lublin)",
    schedule: "160 a 192h/mês — turnos de 8h, 5 a 6 dias",
    requirements: "Até 60 anos · sem exigência de idioma",
    benefits:
      "Alojamento 500 PLN a 15 min a pé · almoço grátis · roupa de trabalho grátis · homens, mulheres e casais",
    entry: "futuro",
  },
  {
    code: "056",
    country: "pl",
    title: "Operador(a) de Triagem de Encomendas",
    salaryBRL: "R$ 5.600 a R$ 7.300",
    salaryLocal: "PLN 4.000 a 5.220 líquidos (moradia já descontada)",
    salaryValue: { min: 4000, max: 5220, unit: "MONTH" },
    location: "Varsóvia · Wrocław · Poznań · Katowice · Piotrków",
    schedule: "200 a 240h/mês — turno noturno (23h–07h)",
    requirements: "Não exige experiência · homens e mulheres",
    benefits:
      "Registro no ZUS · alojamento a pé do trabalho · apoio com PESEL, conta bancária e cartão de residência · bônus de até 700 PLN",
    entry: "futuro",
  },
  {
    code: "066",
    country: "pl",
    title: "Operador(a) de Produção",
    context: "Frigorífico",
    salaryBRL: "R$ 5.300 a R$ 7.500",
    salaryLocal: "PLN 3.760 a 5.390 líquidos",
    salaryValue: { min: 3760, max: 5390, unit: "MONTH" },
    location: "Sokołów Podlaski (100 km de Varsóvia)",
    schedule: "160 a 220h/mês — turnos de 12h",
    requirements: "Caderneta sanitária (Sanepid) · sem exigência de idioma",
    benefits: "Moradia 600 PLN · 2 refeições quentes por dia · uniforme grátis · homens, mulheres e casais",
    entry: "futuro",
  },
  {
    code: "060",
    country: "pl",
    title: "Operário(a) de Fábrica de Café",
    salaryBRL: null,
    salaryLocal: "31,40 a 32,50 PLN por hora (bruto)",
    salaryValue: { min: 31.4, max: 32.5, unit: "HOUR" },
    location: "Żory",
    schedule: "~260h/mês — turnos de 12h, seg a sex",
    requirements: "Sem exigência de idioma",
    benefits: "Apoio na permissão de trabalho · caderneta sanitária",
    entry: "futuro",
  },
  {
    code: "058",
    country: "pl",
    title: "Operador(a) de Maquinário",
    context: "Indústria Automotiva",
    salaryBRL: null,
    salaryLocal: "31,40 PLN por hora (bruto)",
    salaryValue: { min: 31.4, unit: "HOUR" },
    location: "Polônia",
    schedule: "Contrato de 18 meses",
    requirements: "Homens de 18 a 45 anos",
    benefits: "Hospedagem 600 PLN/mês · apoio na permissão de trabalho",
    entry: "futuro",
  },
  {
    code: "059",
    country: "pl",
    title: "Especialista em Vulcanização",
    context: "Indústria Automotiva",
    salaryBRL: null,
    salaryLocal: "31,40 PLN por hora (bruto)",
    salaryValue: { min: 31.4, unit: "HOUR" },
    location: "Polônia",
    schedule: "Contrato de 18 meses",
    requirements: "Homens de 18 a 45 anos",
    benefits: "Mesma fábrica da vaga 058 · apoio na permissão de trabalho",
    entry: "futuro",
  },

  /* --------------------------- MONTENEGRO -------------------------- */
  {
    code: "064",
    country: "me",
    title: "Mecânico de Ônibus",
    context: "Diesel",
    salaryBRL: "R$ 7.800 a R$ 9.600",
    salaryLocal: "EUR 1.300 no inverno · EUR 1.500 a 1.600 no verão",
    salaryValue: { min: 1300, max: 1600, unit: "MONTH" },
    location: "Montenegro",
    schedule: "8h/dia, 6 dias por semana",
    requirements: "Inglês básico · experiência em mecânica diesel",
    benefits: "Acomodação + alimentação inclusas",
    entry: "imediato",
  },
  {
    code: "063",
    country: "me",
    title: "Motorista de Ônibus",
    salaryBRL: "R$ 6.000",
    salaryLocal: "EUR 1.000 por mês",
    salaryValue: { min: 1000, unit: "MONTH" },
    location: "Montenegro",
    schedule: "8h/dia, 6 dias por semana",
    requirements: "Inglês básico · habilitação para ônibus",
    benefits:
      "5 posições abertas · acomodação + 1 refeição · contrato mínimo de 1 ano · 7º dia e horas extras pagos à parte",
    entry: "imediato",
  },
  {
    code: "065",
    country: "me",
    title: "Ajudante de Cozinha",
    salaryBRL: "R$ 4.800",
    salaryLocal: "EUR 800 líquidos por mês",
    salaryValue: { min: 800, unit: "MONTH" },
    location: "Montenegro",
    schedule: "9h/dia, 6 dias por semana, 1 folga",
    requirements: "Inglês básico obrigatório",
    benefits:
      "Apenas 2 posições · apartamento privado · contrato de 1 ano renovável · horas extras remuneradas · preferência para casal ou dupla",
    entry: "imediato",
  },

  /* ---------------------------- CROÁCIA ---------------------------- */
  {
    code: "043",
    country: "hr",
    title: "Carpinteiro",
    salaryBRL: "R$ 7.200",
    salaryLocal: "EUR 1.200 por mês",
    salaryValue: { min: 1200, unit: "MONTH" },
    location: "Croácia",
    schedule: "60h por semana — contrato de 3 anos",
    requirements: "Experiência em carpintaria · inglês básico",
    benefits: "Hospedagem + transporte + alimentação inclusos",
    entry: "confirmar",
  },
  {
    code: "044",
    country: "hr",
    title: "Pintor",
    salaryBRL: "R$ 7.200",
    salaryLocal: "EUR 1.200 por mês",
    salaryValue: { min: 1200, unit: "MONTH" },
    location: "Croácia",
    schedule: "60h por semana — contrato de 3 anos",
    requirements: "Experiência em pintura predial · inglês básico",
    benefits: "Hospedagem + transporte + alimentação inclusos",
    entry: "confirmar",
  },
  {
    code: "045",
    country: "hr",
    title: "Pedreiro",
    salaryBRL: "R$ 7.200",
    salaryLocal: "EUR 1.200 por mês",
    salaryValue: { min: 1200, unit: "MONTH" },
    location: "Croácia",
    schedule: "60h por semana — contrato de 3 anos",
    requirements: "Experiência em construção civil · inglês básico",
    benefits: "Hospedagem + transporte + alimentação inclusos",
    entry: "confirmar",
  },
  {
    code: "071",
    country: "hr",
    title: "Auxiliar de Supermercado",
    salaryBRL: "R$ 6.600",
    salaryLocal: "EUR 1.100 líquidos por mês",
    salaryValue: { min: 1100, unit: "MONTH" },
    location: "Rab (ilha)",
    schedule: "40h por semana em turnos — contrato de 12 meses renovável",
    requirements: "Inglês A2 a B1 · idade de 25 a 45 anos",
    benefits:
      "10 posições abertas · transporte + seguro-saúde inclusos · 20 dias de férias · horas extras pagas",
    entry: "futuro",
    warning: "Alojamento e alimentação a confirmar",
  },

  /* --------------------------- DINAMARCA --------------------------- */
  {
    code: "054",
    country: "dk",
    title: "Açougueiro / Abatedor de Suínos",
    salaryBRL: "R$ 16.200",
    salaryLocal: "EUR 2.700 líquidos por mês",
    salaryValue: { min: 2700, unit: "MONTH" },
    location: "Dinamarca",
    schedule: "40h por semana — pagamento quinzenal",
    requirements: "Experiência em açougue ou abate",
    benefits: "O maior salário do nosso quadro de vagas",
    entry: "confirmar",
  },
];

export const countryOf = (code: CountryCode): Country =>
  countries.find((c) => c.code === code) as Country;

export const countByCountry = (code: CountryCode): number =>
  vacancies.filter((v) => v.country === code).length;

/** Moeda local de cada país, para o JSON-LD. */
export const currencyOf = (code: CountryCode): string => (code === "pl" ? "PLN" : "EUR");
