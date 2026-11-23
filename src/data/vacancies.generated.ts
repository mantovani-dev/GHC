/**
 * GERADO AUTOMATICAMENTE — não edite este arquivo à mão.
 *
 * Fonte: GESTAODEVAGAS_GHC.xlsx (17/11/2026), só as linhas marcadas como
 * BLACK na coluna BLACKFRIDAY. Durante a campanha, só elas ficam no site.
 *
 * 6 vagas publicadas (todas na Polônia), na ordem em que a campanha as lista.
 *
 * Valores em real a 1 PLN = R$ 1,42, arredondados. A planilha dá o salário
 * em PLN BRUTO, salvo onde ela própria escreve "líquidos".
 *
 * Cada vaga leva o link do formulário já preenchido com ela. O texto no fim
 * de cada link tem que bater letra por letra com a opção do formulário — por
 * isso a 060 mantém o espaço duplo de "060 -  Fábrica de café".
 */
import type { Vacancy } from "./vacancies";

/** Data da última sincronização com a planilha. */
export const VACANCIES_UPDATED_AT = "2026-11-23";

const FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLSdKENvxvYVDwHjccLCaomyy6-7CoWKyFplSfYb8M-XL64JfMw/viewform?usp=pp_url&entry.1060472253=";

export const vacancies: Vacancy[] = [
  {
    code: "098",
    country: "pl",
    title: "Operador(a) de Produção",
    context: "Fábrica de Sushi",
    salaryBRL: "R$ 12.200",
    salaryLocal: "PLN 8.580 brutos por mês — 33 PLN brutos por hora",
    salaryValue: { min: 8580, unit: "MONTH" },
    location: "Zawiercie",
    schedule: "260h/mês — turnos de 8h, 5 a 6 dias por semana",
    requirements: "Homens, mulheres e casais · até 50 anos",
    duties: "Produção de sushi.",
    benefits:
      "Alojamento estimado entre 300 e 900 PLN · condição especial para menores de 30 anos",
    warning: "O salário informado é bruto.",
    formUrl: FORM + "098+-+F%C3%A1brica+de+Sushi",
    blackFriday: true,
    postedAt: "2026-11-23",
  },
  {
    code: "118",
    country: "pl",
    title: "Operário de Granja de Ovos",
    salaryBRL: "R$ 7.200 a R$ 8.700",
    salaryLocal: "PLN 5.100 a 6.120 líquidos por mês — 25,50 PLN líquidos por hora",
    salaryValue: { min: 5100, max: 6120, unit: "MONTH" },
    location: "Região de Mazowieckie, perto de Varsóvia",
    schedule: "200 a 240h/mês — 8 a 10h por dia, segunda a sábado",
    requirements: "Exclusiva para homens · idade máxima a confirmar",
    duties: "Coleta, manuseio e classificação de ovos.",
    benefits: "Alojamento de 600 a 700 PLN por mês",
    entry: "futuro",
    warning: "O início está previsto para o final de janeiro de 2027.",
    formUrl: FORM + "118+-+Granja+de+ovos",
    blackFriday: true,
    postedAt: "2026-11-23",
  },
  {
    code: "093",
    country: "pl",
    title: "Operador de Armazém",
    context: "Autopeças",
    salaryBRL: "R$ 38,30",
    salaryLocal: "27 PLN brutos por hora",
    salaryValue: { min: 27, unit: "HOUR" },
    location: "Komorniki (Poznań)",
    schedule: "10h por dia — turnos rotativos",
    requirements: "Exclusiva para homens · até 50 anos · aceita casais e famílias",
    duties: "Preparação de produtos e trabalho com scanner.",
    benefits: "Alojamento estimado entre 300 e 900 PLN",
    entry: "futuro",
    warning: "O salário informado é bruto.",
    formUrl: FORM + "093+-+auto+pe%C3%A7as",
    blackFriday: true,
    postedAt: "2026-11-23",
  },
  {
    code: "095",
    country: "pl",
    title: "Operador(a) de Armazém",
    context: "Logística de Roupas",
    salaryBRL: "R$ 10.700",
    salaryLocal: "PLN 7.500 brutos por mês — 25 PLN brutos por hora",
    salaryValue: { min: 7500, unit: "MONTH" },
    location: "Cracóvia",
    schedule: "300h/mês — segunda a sábado",
    requirements: "Homens, mulheres e casais · até 50 anos",
    duties: "Logística e distribuição de roupas.",
    benefits: "Alojamento estimado entre 300 e 900 PLN",
    entry: "futuro",
    warning: "O salário informado é bruto, e a jornada de 300h/mês é bem acima do habitual.",
    formUrl: FORM + "095+-+log%C3%ADstica+de+roupas",
    blackFriday: true,
    postedAt: "2026-11-23",
  },
  {
    code: "060",
    country: "pl",
    title: "Operário(a) de Fábrica de Café",
    salaryBRL: "R$ 9.200 a R$ 9.400",
    salaryLocal: "PLN 6.500 a 6.630 brutos por mês — 25 a 25,50 PLN brutos por hora",
    salaryValue: { min: 6500, max: 6630, unit: "MONTH" },
    location: "Żory",
    schedule: "260h/mês — turnos a confirmar",
    requirements: "Homens e mulheres · até 50 anos · casais a confirmar",
    duties: "Produção em fábrica de café.",
    benefits: "Alojamento estimado entre 300 e 900 PLN",
    entry: "futuro",
    warning: "O salário informado é bruto.",
    formUrl: FORM + "060+-++F%C3%A1brica+de+caf%C3%A9",
    blackFriday: true,
    postedAt: "2026-11-23",
  },
  {
    code: "121",
    country: "pl",
    title: "Operador(a) de Produção",
    context: "Fábrica de Kebab",
    salaryBRL: "R$ 7.400 a R$ 8.900",
    salaryLocal: "PLN 5.200 a 6.240 brutos por mês — 26 PLN brutos por hora",
    salaryValue: { min: 5200, max: 6240, unit: "MONTH" },
    location: "Poznań",
    schedule: "200 a 240h/mês — 8 a 10h por dia, segunda a sábado",
    requirements: "Homens, mulheres e casais · até 50 anos",
    duties: "Produção de alimentos em fábrica de kebab.",
    benefits: "Alojamento de 600 a 700 PLN por mês",
    entry: "futuro",
    warning: "O salário informado é bruto.",
    formUrl: FORM + "121+-+F%C3%A1brica+de+Kebab",
    blackFriday: true,
    postedAt: "2026-11-23",
  },
];
