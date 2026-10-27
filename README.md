# 💸 NossoFinanceiro — Gestão Financeira de Casal & Individual

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Vibe Coding](https://img.shields.io/badge/100%25-Vibe_Coding_✨-10b981?style=for-the-badge)

> **Nota de Desenvolvimento:** Este projeto foi construído **100% no estilo Vibe Coding**, servindo como um laboratório prático para explorar, testar e entender até onde vai o potencial da Inteligência Artificial no desenvolvimento de software moderno — da arquitetura de banco de dados à criação de algoritmos complexos de leitura de arquivos, guiado puramente por prompts, revisão de regras de negócio e iteração contínua.

---

## 🧠 Sobre o Experimento (IA & Vibe Coding)

Em vez do fluxo tradicional de digitar cada linha de código manualmente do zero, este aplicativo nasceu com dois objetivos principais:
1. **Resolver um problema real do dia a dia:** Substituir planilhas manuais por um Web App completo, responsivo e sincronizado em nuvem para controle financeiro de casal, enxoval de casa nova e perfis isolados.
2. **Estudar Engenharia de Prompt e Colaboração com IA:** Validar como estruturar requisitos lógicos, corrigir bugs de compilação/deploy, modularizar componentes e desenhar algoritmos sob medida conversando com a IA como um par de programação (*pair programming*).

---

## ✨ Funcionalidades Principais

* **👥 Multi-Contas com Isolamento de Dados:** Sistema de autenticação leve com separação de ambientes no banco de dados (Conta Principal do Casal e Conta Individual compartilhada), com redefinição de senha sincronizada em nuvem.
* **📊 Dashboard & Extrato Inteligente:** Cálculo automático de Saldo Livre, Entradas, Gastos e Poupança, com divisão clara de quem realizou cada gasto ou se foi uma despesa conjunta do casal.
* **🏦 Importador Inteligente de Extratos Bancários (PDF, OFX, CSV, XLSX e Texto):**
  * Leitura direta de extratos em PDF (como Itaú, Nubank e Inter) reconstruindo as linhas da página.
  * **Filtro de Mês Alvo:** Descarta automaticamente lançamentos de outros meses em extratos de 60 ou 90 dias.
  * **Detector de Transferências Internas (`⇄`):** Cruza saídas e entradas de mesmo valor e data entre contas próprias para marcá-las como *Movimentação Interna*, evitando que transferências inflem os ganhos ou gastos do mês.
  * **Tela de Revisão (Preview):** Permite editar descrições, categorias e responsáveis antes de confirmar a importação.
* **🏠 Controle de Enxoval da Casa Nova:**
  * Cadastro e acompanhamento de progresso (`% concluído`, valor já comprado vs. valor estimado pendente) separado por cômodos e nível de prioridade (*Alta, Média, Baixa*).
  * Algoritmo de importação em lote de planilhas de enxoval com múltiplas abas/tabelas.
* **📝 Mural de Observações do Mês:** Espaço estilo diário financeiro para registrar acontecimentos atípicos do mês (cartão emprestado, reembolsos pendentes, compras parceladas para terceiros) com controle de status (*Pendente* ou *Resolvido/Pago*).
* **🐷 Gestão de Poupança & Teto de Gastos:**
  * Registro tanto de depósitos (*Guardei*) quanto de retiradas (*Tirei da Poupança*), mantendo o histórico sem distorcer o orçamento mensal do salário.
  * Metas de gastos mensais personalizáveis por categoria com barras de alerta visual.
* **📱 Design Mobile-First:** Layout adaptado para uso no celular como um app nativo, com *Bottom Navigation* dedicada e sincronização em tempo real via **Supabase Realtime**.

---

## 🛠️ Tecnologias Utilizadas

* **Frontend:** React 18 + TypeScript + Vite
* **Estilização:** Tailwind CSS + Lucide Icons
* **Backend & Banco de Dados:** Supabase (PostgreSQL + Realtime Subscriptions) + Fallback Offline (`localStorage`)
* **Processamento de Arquivos:** `xlsx` (SheetJS) para planilhas Excel/CSV e `pdfjs-dist` para extração de texto de extratos em PDF
* **Deploy:** Vercel

---

## 🚀 Como Rodar o Projeto Localmente

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/Juancls/meu-financeiro.git](https://github.com/Juancls/meu-financeiro.git)
   cd meu-financeiro
