# Landing page de futebol — pronta para GitHub e Vercel

Projeto **HTML + CSS + JavaScript**, sem instalação, dependências ou build.

A página tem um **banner horizontal**, seguido por um **carrossel lateral automático de clubes**. Cada cartão contém um escudo (ou sigla demonstrativa), nome do clube e link para a coleção. Funciona no computador e no celular.

![Prévia da seção no computador](previews/desktop.png)

## Estrutura

```text
landing-futebol-github/
├── index.html                 Página de exemplo pronta para hospedar
├── configuracao.js            EDITE AQUI: título, banner, escudos e links
├── secao-liga.css             Estilos responsivos
├── secao-liga.js              Carrossel automático e interações
├── secao-para-colar.html      Apenas o trecho para site HTML existente
├── previews/                  Capturas de tela de referência
├── .gitignore
├── .nojekyll                 Compatibilidade com GitHub Pages
└── README.md
```

## 1. Personalizar conteúdo

**Edite apenas `configuracao.js`.**

- `titulo`: nome da liga (ex.: `CAMPEONATO BRASILEIRO`)
- `descricao`: frase do banner
- `bannerImagem`: URL **direta** para imagem `.webp`, `.png` ou `.jpg` hospedada (Cloudinary, ImageKit etc.)
- `clubes`: lista de times, na ordem em que aparecem
- `imagem`: URL **direta** para o escudo de cada time; vazio mostra sigla demonstrativa
- `link`: URL da coleção do time; vazio mantém o cartão como demonstração, sem navegar

Exemplo:

```js
{ nome: 'Flamengo', sigla: 'FLA', cor: '#a40d1b',
  imagem: 'https://exemplo.com/escudo-flamengo.webp',
  link: 'https://sualoja.com/collections/flamengo' }
```

**Atenção:** imagens e links de clubes precisam ser fornecidos por você. As siglas estilizadas no modelo **não são escudos oficiais**. O banner usa um visual abstrato enquanto `bannerImagem` estiver vazio.

## 2. Testar antes de publicar

Basta abrir `index.html` no navegador. Não precisa instalar Node.js.

## 3. Enviar ao GitHub pelo navegador

1. Acesse [github.com/new](https://github.com/new) e entre na conta.
2. Nome sugerido: `landing-futebol`.
3. Crie o repositório (público, se quiser usar GitHub Pages; na Vercel pode ser privado).
4. No repositório, clique **Add file → Upload files**.
5. **Descompacte o ZIP** e arraste o **conteúdo da pasta** para o GitHub. O arquivo `index.html` precisa ficar na raiz do repositório, não dentro de outra pasta.
6. Clique **Commit changes**.

> Não envie apenas o ZIP: o GitHub não o descompacta como site.

## 4. Conectar GitHub à Vercel

1. Acesse [vercel.com/new](https://vercel.com/new).
2. Conecte sua conta GitHub, se ainda não estiver conectada.
3. Clique em **Import** ao lado do repositório `landing-futebol`.
4. Se solicitado, escolha **Framework Preset: Other**. **Root Directory: `./`**. Este projeto é estático e **não tem build nem dependências**; deixe os comandos de build/instalação vazios e não aponte a saída para uma pasta inexistente.
5. Clique em **Deploy**.
6. Ao concluir, abra a URL `.vercel.app` informada pela Vercel.
7. Nas próximas edições, faça mudanças e commits no GitHub: a Vercel publicará automaticamente as atualizações da branch de produção (geralmente `main`).

## 5. Opção: publicar diretamente pelo GitHub Pages

1. No repositório, abra **Settings → Pages**.
2. Em **Build and deployment**, selecione **Deploy from a branch**.
3. Escolha a branch **main** e a pasta **/(root)**; salve.
4. A URL do site aparecerá na própria tela do Pages.

A página usa caminhos relativos para funcionar em GitHub Pages e Vercel.

## 6. Inserir a seção em uma landing page HTML já existente

Se seu projeto atual **já possui um `index.html`**, **não substitua** esse arquivo pelo da demonstração sem revisar. Em vez disso:

1. Copie `configuracao.js`, `secao-liga.css` e `secao-liga.js` para a pasta do seu projeto.
2. Cole o HTML de `secao-para-colar.html` dentro do `<main>` na posição desejada.
3. No `<head>` da página existente, adicione:

```html
<link rel="stylesheet" href="secao-liga.css">
<script src="configuracao.js" defer></script>
<script src="secao-liga.js" defer></script>
```

4. Se já há um `<h1>` na página, converta o `<h1>` da seção para `<h2>` e o `<h2>` seguinte para `<h3>`.
5. Faça commit/push para a branch que a Vercel publica.

**Importante:** para um projeto **Next.js/React**, esse HTML não deve ser colado diretamente em um arquivo JSX. É preciso adaptar a seção para um componente React.

## Comportamento do carrossel

- Avança automaticamente a cada 2,8 segundos.
- Setas e gestos de toque funcionam.
- Pausa ao passar o mouse, ao usar o teclado e por alguns segundos após interação.
- Respeita a configuração do sistema de redução de movimento.
- Clicar no nome ou escudo aciona o mesmo link da coleção.

## Créditos e manutenção

Código demonstrativo pronto para personalização. Hospedagem de imagens/vídeos, marcas e escudos oficiais não são incluídos.
