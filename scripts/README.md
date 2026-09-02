# Sincronização das vagas com a planilha

O quadro de vagas do site vem de uma planilha no OneDrive. Ninguém edita
`src/data/vacancies.generated.ts` à mão — ele é reescrito a cada sync.

```
Planilha (OneDrive, aba SITE)
   ↓  GitHub Action a cada 30 min, ou botão "Run workflow"
baixa → valida → gera src/data/vacancies.generated.ts
   ↓  commita só se mudou
push → Netlify rebuilda → /vagas com os JSON-LD atualizados
```

## Como ligar (uma vez)

1. **Gerar a planilha de partida**, já preenchida com as vagas que estão no ar:

   ```bash
   npm run vagas:planilha
   ```

   Sai um `CONTROLE-VAGAS-SITE.xlsx` na raiz, com a aba `SITE` (dados, com
   listas suspensas nas colunas de valor fixo) e a aba `INSTRUÇÕES`.
   O arquivo está no `.gitignore` — a fonte é o OneDrive, não o repo.

2. **Subir para o OneDrive** e compartilhar: *Qualquer pessoa com o link* →
   **Pode exibir**. O link não pode exigir login, senão a automação recebe
   uma página HTML em vez do arquivo.

   > A planilha publicada não deve conter coluna interna (recrutador,
   > agência parceira, razão social, margem). O link é aberto.

3. **Guardar o link** em `Settings → Secrets and variables → Actions` do
   repositório, com o nome `VAGAS_XLSX_URL`.

Pronto. O primeiro sync roda na meia hora seguinte, ou na hora pelo botão
*Run workflow* na aba Actions.

## Rodar na mão

```bash
npm run vagas:check -- --file ./CONTROLE-VAGAS-SITE.xlsx   # valida, não grava
npm run vagas:sync  -- --file ./CONTROLE-VAGAS-SITE.xlsx   # valida e grava
npm run vagas:sync  -- --url  "<link do OneDrive>"
```

## O que faz o sync recusar

Qualquer um destes aborta o processo **sem gravar nada**, e o site anterior
continua no ar:

| Situação | Por quê |
|---|---|
| País fora de `pl / hr / me / dk` | O site só tem bandeira e formulário para esses |
| Prazo fora de `imediato / futuro / confirmar` | Alimenta o selo do card |
| `SAL_MIN` não numérico, ou `SAL_MAX` menor que ele | Vai para o `baseSalary` do Google Jobs |
| Campo obrigatório em branco | Cargo, local, jornada, requisitos, condições, salário local |
| `CODIGO` repetido ou fora de 3 dígitos | É a âncora da vaga e o identificador no Google |
| Nenhuma linha com `PUBLICAR = sim` | Deixaria o site sem vagas |
| Queda de mais de 40% no total | Protege contra apagar linhas sem querer |
| Falta coluna, ou a aba `SITE` não existe | Contrato quebrado |
| O link devolveu HTML em vez de `.xlsx` | Compartilhamento expirou ou pede login |

Erro de linha vem com o número da linha e o nome da coluna.

## Arquivos

| | |
|---|---|
| `lib/vacancies-schema.mjs` | **Único lugar** que conhece os nomes das colunas. Mudou cabeçalho na planilha? Ajuste `COLUMNS` aqui. |
| `lib/emit-ts.mjs` | Escreve o TypeScript gerado |
| `sync-vacancies.mjs` | Baixa, valida, grava. É o que a Action roda |
| `export-vacancies-xlsx.mjs` | Gera a planilha modelo. Só no começo |
| `../.github/workflows/sync-vagas.yml` | Agendamento e commit |

## Detalhes que economizam tempo

- **Listas com `·`** — `REQUISITOS`, `DOCUMENTACAO` e `CONDICOES` viram
  lista com marcadores no card. Separe cada item por ` · `.
- **`VALIDA_ATE`** — sem essa data o Google considera a vaga expirada cerca
  de 30 dias depois de `PUBLICADA_EM` e ela some da busca de empregos.
- **`DOCUMENTACAO` × `CONDICOES`** — a primeira é o que o *candidato* precisa
  apresentar; a segunda é o que a *empresa/GHC* oferece, incluindo o apoio
  documental.
- **Commit da Action** não dispara outros workflows do GitHub (proteção
  anti-loop), mas **dispara o Netlify** normalmente, que escuta o webhook
  de push.
