# 🍧 De Little a Big Açaí

> Sistema Fullstack desenvolvido para a microempresa **Little Açaí**, com foco na melhoria do controle operacional e suporte ao crescimento sustentável do negócio.
> A **Little Açaí** é uma microempresa delivery especializada em açaí. Fundada no início de 2025 e administrada por um casal de mulheres em Veleiros, zona sul de São Paulo.

---

## ✍️ Sobre o Projeto

Após uma análise interna detalhada, foram identificados alguns desafios enfrentados pela Little Açaí, como:

- Controle de estoque
- Registro de vendas
- Cadastro e gestão de clientes

O projeto **De Little a Big Açaí** foi desenvolvido com o objetivo de solucionar esses problemas por meio de uma aplicação web moderna, responsiva e de fácil utilização.

Este sistema foi idealizado, desenvolvido e mantido **integralmente por mim, Willian Ferreira**, como desenvolvedor fullstack. Envolve desde a modelagem do banco de dados até a interface do usuário, API REST e integrações com o backend.

> ⚠️ Este repositório está hospedado no meu GitHub pessoal para fins de portfólio profissional.  
> Foi desenvolvido exclusivamente para a microempresa **Little Açaí**, com permissão para exibição pública.

Com a implementação dessas soluções, espera-se que a Little Açaí aumente sua eficiência operacional, melhore a previsibilidade financeira e fortaleça o relacionamento com os clientes. O projeto também se alinha aos princípios da **ODS 8 – Trabalho Decente e Crescimento Econômico**.

---

## 🌐 Acesse a Aplicação Online

> 💻 Aplicação disponível para testes e demonstrações:  
🔗 [https://de-little-a-big-acai.vercel.app/estoque/cadastrar](https://de-little-a-big-acai.vercel.app/estoque/cadastrar)

---

## 🧩 Tecnologias Utilizadas

### Frontend
React.js
Bootstrap 5
Fetch API
React Router DOM
Deploy via Vercel

### Backend
- Spring Boot (Java)
- API RESTful
- JPA / Hibernate
- Empacotado com Docker
- Hospedado na plataforma Render

### Banco de Dados
- MySQL
- Fornecido via Railway

### Outros
- Git e GitHub
- Cloudflare Tunnel (para ambiente local)

---

## 🚀 Funcionalidades

- 📦 Cadastro e gerenciamento de produtos no estoque *(em desenvolvimento)*
- 🧾 Registro de vendas com cálculo automático
- 👥 Cadastro e busca de clientes
- 🔐 Autenticação de usuários 
- 📊 Painel administrativo com listagens e filtros
- 📱 Layout responsiva

---

## 🔧 Como Rodar o Projeto

### Backend (Spring Boot + Docker)
```bash
# Clone o repositório
git clone https://github.com/WillianFerreira-96/De_Little_a_Big_Acai/tree/main/BackEnd%20-%20De%20Little%20a%20Big%20A%C3%A7a%C3%AD/de-litte-a-big-acai
cd backend

# Build e execução com Docker
docker build -t little-acai-backend .
docker run -p 8080:8080 little-acai-backend
```

>☁️ Em produção, o backend está hospedado no Render, com conexão ao banco de dados remoto via Railway.

### Frontend
```bash
# Clone o repositório
git clone https://github.com/WillianFerreira-96/De_Little_a_Big_Acai/tree/main/FrontEnd%20-%20De%20Little%20a%20Big%20A%C3%A7a%C3%AD/de_litte_a_big_acai-frontend
cd frontend

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev
```

## 📸 Imagens
<p float="left"> 
    <img src="screenshots/versão Jul-25/cadastro.jpg" height="200"/> <img src="screenshots/versão Jul-25/cadastro responsivo.jpg" height="200"/>
    <img src="screenshots/versão Jul-25/cadastro-sucesso.jpg" height="200"/> <img src="screenshots/versão Jul-25/cadastro-sucesso responsivo.jpg" height="200"/>
    <img src="screenshots/versão Jul-25/cadastro-alerta.jpg" height="200"/> <img src="screenshots/versão Jul-25/cadastro-alerta responsivo.jpg" height="200"/>
    <img src="screenshots/versão Jul-25/busca.jpg" height="200"/> <img src="screenshots/versão Jul-25/busca responsiva.jpg" height="200"/>
    <img src="screenshots/versão Jul-25/filtro.jpg" height="200"/> <img src="screenshots/versão Jul-25/filtro responsivo.jpg" height="200"/>                 
    <img src="screenshots/versão Jul-25/detalhes.jpg" height="200"/> <img src="screenshots/versão Jul-25/detalhes responsivo.jpg" height="200"/>
    <img src="screenshots/versão Jul-25/navbar responsiva.jpg" height="200"/> 
</p>

## 👨‍💻 Desenvolvedor
Este projeto foi desenvolvido integralmente por:

**Willian Ferreira**  
[LinkedIn](https://www.linkedin.com/in/willian-ferreira-gomes-705483214/) • [GitHub](https://github.com/WillianFerreira-96) • E-mail: willian.ferreira.gomes96@gmail.com
