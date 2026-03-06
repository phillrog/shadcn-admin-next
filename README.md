# Shadcn Admin - Next.js Migration 🚀

Este projeto é uma evolução direta do excelente trabalho feito pelo [satnaing/shadcn-admin](https://github.com/satnaing/shadcn-admin). Eu peguei a base sólida daquela aplicação (originalmente construída com Vite e TanStack Router) e a recriei do zero utilizando as convenções modernas do **Next.js App Router**.

O meu objetivo principal foi transformar um SPA (Single Page Application) tradicional em uma aplicação robusta, escalável e pronta para o mercado atual, aproveitando os benefícios de SSR (Server Side Rendering), roteamento baseado em arquivos e otimizações nativas do Next.js.

## 🛠️ Pontos Importantes da Mudança

A migração não foi apenas um "copia e cola". Houve uma reestruturação profunda para alinhar com os padrões da indústria:

- **Arquitetura de Rotas:** Implementei **Route Groups** (`(app)`, `(auth)`, `(errors)`) para organizar os layouts de forma lógica e independente.
- **Next.js Layouts:** Substituí o componente `Outlet` do TanStack Router pelo padrão de `children` do Next.js, permitindo o uso de `layout.tsx` para persistência de estado e performance.
- **Componentização Baseada em Features:** Mantive e refinei o **Feature-Sliced Design**, isolando a lógica de negócio (formulários, hooks, stores) em pastas dedicadas, o que facilita a manutenção.
- **Roteamento Nativo:** Migrei todas as navegações e links para `next/link` e `next/navigation`, garantindo o pré-carregamento de páginas e transições suaves.
- **Validação de Formulários:** Utilizei a stack padrão de mercado (**Zod + React Hook Form**) para garantir integridade total dos dados.

## 🧩 A Principal Dificuldade

O maior desafio técnico foi a **mudança do paradigma de roteamento**. Sair de um roteador declarativo baseado em objetos (TanStack) para o sistema baseado em arquivos do Next.js exigiu uma refatoração cirúrgica em componentes de UI que estavam fortemente acoplados ao router anterior. Tive que tratar erros de "Module not found" e ajustar logicamente como os dados de configuração (como as fontes e temas) eram passados através da árvore de componentes, garantindo que as chaves do React fossem únicas e eficientes.

## ✅ Objetivo Concluído

O resultado final é uma aplicação administrativa moderna que:
1.  **Respeita as melhores práticas de SEO e Performance.**
2.  **Utiliza uma stack de ponta** (Next.js 15, Tailwind CSS, shadcn/ui).
3.  **É extremamente fácil de escalar** graças à organização por funcionalidades.
4.  **Está pronta para produção**, com rotas de autenticação e tratamento de erros totalmente funcionais.


## Como rodar o projeto

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) e explore o resultado desta migração!
