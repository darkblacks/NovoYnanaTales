// =======================
// Swiper inicialização
// =======================
if (window.Swiper) {
  new Swiper('.swiper', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    effect: "slide"
  });
}

// =======================
//  Tema Dinâmico Tailwind
// =======================
const body = document.getElementById('main-body');
const fundoDark = "Assents/background.png";
const fundoLight = "Assents/background-light.png";
const loginCardRoot = document.getElementById('login-card-root');

let darkPreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;
let currentDark = darkPreferred;
let lastScreen = "login";

// -----------------------------
// Troca o tema na página toda
// -----------------------------
function setTheme(isDark) {
  currentDark = isDark;
  document.documentElement.classList.toggle('dark', isDark);
  body.style.backgroundImage = `url('${isDark ? fundoDark : fundoLight}')`;

  // Renderiza a tela atual (NÃO força login, usa a última tela)
  renderCurrentCard();
}



// =====================
// Centralizador de Cards
// =====================
function renderCurrentCard() {
  switch (lastScreen) {
    case "register": renderRegisterCard(); break;
    case "forgot": renderForgotPasswordCard(); break;
    // Adicione outros cards se necessário
    default: renderLoginCard();
  }
}

// =====================
// Login Card
// =====================
function renderLoginCard() {
  lastScreen = "login";
  const isDark = currentDark;
  const logo = isDark ? "Assents/logo_svg_dark.png" : "Assents/logo_svg_light.png";
  const cor = isDark ? "#C42448" : "#229E93";

  loginCardRoot.innerHTML = `
    <div id="login-card"
      class="rounded-2xl shadow-2xl p-8 flex flex-col items-center w-full max-w-md border-2 ${isDark ? 'border-[#C42448] bg-[#181A20]' : 'border-[#229E93] bg-white'} transition-bg relative"
    >
      <button id="theme-toggle"
        class="absolute top-5 right-5 rounded-full shadow-md p-2 flex items-center justify-center transition"
        title="Alternar tema"
        type="button"
      >
        <svg id="icon-moon" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ${isDark ? 'hidden' : 'block'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 12.79A9 9 0 1111.21 3a7 7 0 0010.07 9.79z"/>
        </svg>
        <svg id="icon-sun" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ${isDark ? 'block' : 'hidden'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="none"/>
          <line x1="12" y1="1.5" x2="12" y2="4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="12" y1="20" x2="12" y2="22.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="4" y1="12" x2="1.5" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="20" y1="12" x2="22.5" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="5.85" y1="5.85" x2="4.07" y2="4.07" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="18.15" y1="18.15" x2="19.93" y2="19.93" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="18.15" y1="5.85" x2="19.93" y2="4.07" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="5.85" y1="18.15" x2="4.07" y2="19.93" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      <div class="flex items-center justify-center gap-4 mb-7 w-full">
        <img id="logo-img"
          src="${logo}"
          alt="Logo YnanaTales"
          class="w-16 h-16 transition-all duration-300"
          style="min-width: 100px; height: 100px;"
        />
        <h1 class="text-3xl md:text-4xl font-bold text-[${cor}] text-center tracking-tight transition-bg">
          YnanaTales
        </h1>
      </div>
      <form class="w-full flex flex-col gap-5">
        <div>
          <label class="block font-semibold mb-1 text-base ${isDark ? 'text-white' : 'text-[#1b1e24]'}" for="email">E-mail</label>
          <input
            id="email"
            type="email"
            required
            class="w-full px-4 py-3 rounded-md border ${isDark ? 'border-[#C42448] bg-[#181A20] text-white' : 'border-[#229E93] bg-white text-[#1b1e24]'} focus:border-[${cor}] outline-none transition"
          />
        </div>
        <div>
          <label class="block font-semibold mb-1 text-base ${isDark ? 'text-white' : 'text-[#1b1e24]'}" for="senha">Senha</label>
          <div class="relative flex items-center">
            <input
              id="senha"
              type="password"
              required
              class="w-full px-4 py-2 rounded-md border ${isDark ? 'border-[#C42448] bg-[#181A20] text-white' : 'border-[#229E93] bg-white text-[#1b1e24]'} focus:border-[${cor}] outline-none transition"
            />
            <button
              type="button"
              tabindex="-1"
              class="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-100 dark:hover:bg-[#181A20]"
              onclick="toggleSenha()"
              aria-label="Mostrar ou ocultar senha"
            >
              <span id="eye-on" class="block">
                <!-- SVG olho aberto aqui -->
              </span>
              <span id="eye-off" class="hidden">
                <!-- SVG olho fechado aqui -->
              </span>
            </button>
          </div>
          <div class="flex justify-between items-center mt-2">
            <button type="button" id="register-btn" class="text-sm ${isDark ? 'text-[#C42448]' : 'text-[#229E93]'} hover:underline font-semibold transition">Registre-se</button>
            <button type="button" id="forgot-btn" class="text-sm ${isDark ? 'text-[#C42448]' : 'text-[#229E93]'} hover:underline font-semibold transition">Esqueci a senha</button>
          </div>
        </div>
        <button
          type="submit"
          class="w-full py-3 text-base rounded-md font-bold transition mt-1 ${isDark ? 'bg-[#C42448] border-2 border-[#C42448]' : 'bg-[#229E93] border-2 border-[#229E93]'} text-white hover:opacity-90"
          id="submit-btn"
        >
          Entrar
        </button>
      </form>
    </div>
  `;
  ativarHandlers();
}

// =========================
// Ativa handlers dos botões
// =========================
function ativarHandlers() {
  // Botão tema
  const btnTheme = document.getElementById('theme-toggle');
  if (btnTheme) btnTheme.onclick = () => setTheme(!currentDark);

  // Navegação
  const registerBtn = document.getElementById('register-btn');
  if (registerBtn) registerBtn.onclick = () => { lastScreen = "register"; renderCurrentCard(); };

  const forgotBtn = document.getElementById('forgot-btn');
  if (forgotBtn) forgotBtn.onclick = () => { lastScreen = "forgot"; renderCurrentCard(); };

  // Adicione outros handlers conforme necessário
}

// =========================
// Inicialização
// =========================
renderCurrentCard();

// Ativa os handlers do tema e dos botões de navegação
function ativarHandlers() {
  // Botão tema
  document.getElementById('theme-toggle').onclick = () => setTheme(!currentDark);


// ========== Registro ==========
function renderRegisterCard() {
  let isDark = currentDark;
  let logo = isDark ? "Assents/logo_svg_dark.png" : "Assents/logo_svg_light.png";
  let cor = isDark ? "#C42448" : "#229E93";

  loginCardRoot.innerHTML = `
    <div id="login-card"
      class="rounded-2xl shadow-2xl p-8 flex flex-col items-center w-full max-w-md border-2 ${isDark ? 'border-[#C42448] bg-[#181A20]' : 'border-[#229E93] bg-white'} transition-bg relative"
    >
      <button id="theme-toggle"
        class="absolute top-5 right-5 rounded-full shadow-md p-2 flex items-center justify-center ${isDark ? "dark" : "light"} transition"
        title="Alternar tema"
        type="button"
      >
        <svg id="icon-moon" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ${isDark ? 'hidden' : 'block'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 12.79A9 9 0 1111.21 3a7 7 0 0010.07 9.79z"/>
        </svg>
        <svg id="icon-sun" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ${isDark ? 'block' : 'hidden'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="none"/>
          <line x1="12" y1="1.5" x2="12" y2="4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="12" y1="20" x2="12" y2="22.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="4" y1="12" x2="1.5" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="20" y1="12" x2="22.5" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="5.85" y1="5.85" x2="4.07" y2="4.07" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="18.15" y1="18.15" x2="19.93" y2="19.93" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="18.15" y1="5.85" x2="19.93" y2="4.07" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="5.85" y1="18.15" x2="4.07" y2="19.93" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      <div class="flex items-center justify-center gap-4 mb-7 w-full">
        <img id="logo-img"
          src="${logo}"
          alt="Logo YnanaTales"
          class="w-16 h-16 transition-all duration-300"
          style="min-width: 100px; height: 100px;"
        />
        <h1 class="text-3xl md:text-4xl font-bold text-[${cor}] text-center tracking-tight transition-bg">
          YnanaTales
        </h1>
      </div>
      <form id="register-form" class="w-full flex flex-col gap-5">

  <input id="reg-username" type="text" placeholder="Nome de usuário" required
    class="px-4 py-3 rounded-md border text-sm ${isDark ? 'bg-[#181A20] text-white border-[#C42448]' : 'bg-white text-[#1b1e24] border-[#229E93]'}" />

  <input id="reg-email" type="email" placeholder="E-mail" required
    class="px-4 py-3 rounded-md border text-sm ${isDark ? 'bg-[#181A20] text-white border-[#C42448]' : 'bg-white text-[#1b1e24] border-[#229E93]'}" />

  <input id="reg-email-confirm" type="email" placeholder="Confirmar e-mail" required
    class="px-4 py-3 rounded-md border text-sm ${isDark ? 'bg-[#181A20] text-white border-[#C42448]' : 'bg-white text-[#1b1e24] border-[#229E93]'}" />
  <p id="senha-dica" class="text-xs mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}">

    Sua senha deve conter: <br><strong>1 letra maiúscula</strong>, <br><strong>1 minúscula</strong> e <br><strong>1 número</strong>,   com no mínimo <strong>6 caracteres</strong>.
  </p>
  <div class="relative">
    <input id="reg-password" type="password" placeholder="Senha" required
      class="w-full px-4 py-3 rounded-md border text-sm ${isDark ? 'bg-[#181A20] text-white border-[#C42448]' : 'bg-white text-[#1b1e24] border-[#229E93]'}" />
    <button type="button" tabindex="-1"
      class="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-100 dark:hover:bg-[#181A20]"
      onclick="toggleSenha('reg-password', 'eye-on1', 'eye-off1')">
      <span id="eye-on1" class="block">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
        </svg>
      </span>
      <span id="eye-off1" class="hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a10.06 10.06 0 013.042-4.362M9.88 9.88a3 3 0 104.24 4.24"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 3l18 18"/>
        </svg>
      </span>
    </button>
  </div>

  <input id="reg-password-confirm" type="password" placeholder="Confirmar senha" required
    class="w-full px-4 py-3 rounded-md border text-sm ${isDark ? 'bg-[#181A20] text-white border-[#C42448]' : 'bg-white text-[#1b1e24] border-[#229E93]'}" />

<label class="flex items-center gap-2 text-sm ${isDark ? 'text-white' : 'text-[#1b1e24]'}">
  <input type="checkbox" id="terms-checkbox" required class="accent-[${cor}]" />
  Concordo com a <a href="#" class="underline text-[${cor}]">política de privacidade</a>.
</label>

<p id="reg-error" class="text-red-500 text-sm hidden text-center font-semibold">Os campos não coincidem.</p>

<button type="submit"
  class="py-3 rounded-md font-bold ${isDark ? 'bg-[#C42448] text-white' : 'bg-[#229E93] text-white'} hover:opacity-90 transition">
  Registrar
</button>
</form> <!-- ⚠️ Aqui fecha o <form> corretamente -->

<!-- Botão fora do form -->
<button id="back-login-reg"
  class="mt-4 text-sm ${isDark ? 'text-[#C42448]' : 'text-[#229E93]'} hover:underline font-semibold transition">
  Voltar ao login
</button>
    </div>
  `;
  ativarHandlers();




document.getElementById("register-form").onsubmit = e => {
  e.preventDefault();

  const email = document.getElementById("reg-email").value.trim();
  const emailConf = document.getElementById("reg-email-confirm").value.trim();
  const senha = document.getElementById("reg-password").value;
  const senhaConf = document.getElementById("reg-password-confirm").value;
  const erro = document.getElementById("reg-error");

  const senhaForte = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

  const emailIgual = email === emailConf;
  const senhaIgual = senha === senhaConf;
  const senhaEhForte = senhaForte.test(senha);

  if (!emailIgual && !senhaIgual) {
    erro.textContent = "O e-mail e a senha não coincidem.";
  } else if (!emailIgual) {
    erro.textContent = "Os e-mails não coincidem.";
  } else if (!senhaEhForte) {
    erro.textContent = "A senha deve conter ao menos 1 letra maiúscula, 1 minúscula, 1 número e ter 6 caracteres.";
  } else if (!senhaIgual) {
    erro.textContent = "As senhas não coincidem.";
  } else {
    erro.classList.add("hidden");
    renderRegisterSuccess();
    return;
  }

  erro.classList.remove("hidden");
};

// 🟢 Ativação fora do onsubmit, depois do render
document.getElementById("back-login-reg").onclick = () => renderLoginCard();
}
  // Mostrar/ocultar senha
 window.toggleSenha = function() {
  const senhaInput = document.getElementById('reg-password');
  const eyeOn = document.getElementById('eye-on1');
  const eyeOff = document.getElementById('eye-off1');

  if (!senhaInput || !eyeOn || !eyeOff) {
    console.warn("🔍 Elemento(s) não encontrado(s) no toggleSenha");
    return;
  }

  const isPassword = senhaInput.type === "password";
  senhaInput.type = isPassword ? "text" : "password";
  eyeOn.classList.toggle('hidden', !isPassword);
  eyeOff.classList.toggle('hidden', isPassword);
};

// Botões de registro e esqueci senha
let btns = loginCardRoot.querySelectorAll("button.text-sm");
if (btns[0]) btns[0].onclick = () => renderRegisterCard();
if (btns[1]) btns[1].onclick = () => renderForgotPasswordCard();
// ========== Registro sucesso ==========
function renderRegisterSuccess() {
  let isDark = currentDark;
  let cor = isDark ? "#C42448" : "#229E93";
  let logo = isDark ? "Assents/logo_svg_dark.png" : "Assents/logo_svg_light.png";
  loginCardRoot.innerHTML = `
    <div id="login-card"
      class="rounded-2xl shadow-2xl p-8 flex flex-col items-center w-full max-w-md border-2 ${isDark ? 'border-[#C42448] bg-[#181A20]' : 'border-[#229E93] bg-white'} transition-bg relative"
    >
      <button id="theme-toggle"
        class="absolute top-5 right-5 rounded-full shadow-md p-2 flex items-center justify-center ${isDark ? "dark" : "light"} transition"
        title="Alternar tema"
        type="button"
      >
        <svg id="icon-moon" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ${isDark ? 'hidden' : 'block'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 12.79A9 9 0 1111.21 3a7 7 0 0010.07 9.79z"/>
        </svg>
        <svg id="icon-sun" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ${isDark ? 'block' : 'hidden'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="none"/>
          <line x1="12" y1="1.5" x2="12" y2="4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="12" y1="20" x2="12" y2="22.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="4" y1="12" x2="1.5" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="20" y1="12" x2="22.5" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="5.85" y1="5.85" x2="4.07" y2="4.07" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="18.15" y1="18.15" x2="19.93" y2="19.93" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="18.15" y1="5.85" x2="19.93" y2="4.07" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="5.85" y1="18.15" x2="4.07" y2="19.93" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      <div class="flex items-center justify-center gap-4 mb-7 w-full">
        <img id="logo-img"
          src="${logo}"
          alt="Logo YnanaTales"
          class="w-16 h-16 transition-all duration-300"
          style="min-width: 100px; height: 100px;"
        />
        <h1 class="text-3xl md:text-4xl font-bold text-[${cor}] text-center tracking-tight transition-bg">
          YnanaTales
        </h1>
      </div>
      <svg width="64" height="64" fill="none" class="mb-3">
        <circle cx="32" cy="32" r="32" class="fill-[${cor}]" opacity="0.13"/>
        <path d="M21 33l8.5 7L43 25" stroke="${cor}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <p class="text-lg mb-4 text-center ${isDark ? "text-white" : "text-[#1b1e24]"}">
        Verifique seu e-mail!<br>Enviamos um código de confirmação para o e-mail informado.
      </p>
      <button id="back-login-success" class="mt-2 text-sm ${isDark ? "text-[#C42448]" : "text-[#229E93]"} hover:underline font-semibold transition">
        Voltar ao login
      </button>
    </div>
  `;
  ativarHandlers();
  document.getElementById("back-login-success").onclick = () => renderLoginCard();
}

// ========== Recuperação de Senha ==========
function renderForgotPasswordCard() {
  let isDark = currentDark;
  let logo = isDark ? "Assents/logo_svg_dark.png" : "Assents/logo_svg_light.png";
  let cor = isDark ? "#C42448" : "#229E93";
  loginCardRoot.innerHTML = `
    <div id="login-card"
      class="rounded-2xl shadow-2xl p-8 flex flex-col items-center w-full max-w-md border-2 ${isDark ? 'border-[#C42448] bg-[#181A20]' : 'border-[#229E93] bg-white'} transition-bg relative"
    >
      <button id="theme-toggle"
        class="absolute top-5 right-5 rounded-full shadow-md p-2 flex items-center justify-center ${isDark ? "dark" : "light"} transition"
        title="Alternar tema"
        type="button"
      >
        <svg id="icon-moon" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ${isDark ? 'hidden' : 'block'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 12.79A9 9 0 1111.21 3a7 7 0 0010.07 9.79z"/>
        </svg>
        <svg id="icon-sun" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ${isDark ? 'block' : 'hidden'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="none"/>
          <line x1="12" y1="1.5" x2="12" y2="4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="12" y1="20" x2="12" y2="22.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="4" y1="12" x2="1.5" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="20" y1="12" x2="22.5" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="5.85" y1="5.85" x2="4.07" y2="4.07" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="18.15" y1="18.15" x2="19.93" y2="19.93" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="18.15" y1="5.85" x2="19.93" y2="4.07" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="5.85" y1="18.15" x2="4.07" y2="19.93" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      <div class="flex items-center justify-center gap-4 mb-7 w-full">
        <img id="logo-img"
          src="${logo}"
          alt="Logo YnanaTales"
          class="w-16 h-16 transition-all duration-300"
          style="min-width: 100px; height: 100px;"
        />
        <h1 class="text-3xl md:text-4xl font-bold text-[${cor}] text-center tracking-tight transition-bg">
          YnanaTales
        </h1>
      </div>
      <h2 class="text-2xl font-bold mb-4 text-[${cor}]">Recuperar Senha</h2>
      <div class="flex flex-col md:flex-row gap-4 w-full mb-4">
        <button id="rec-email" class="flex-1 flex flex-col items-center p-6 border ${isDark ? 'border-[#C42448]' : 'border-[#229E93]'} rounded-lg hover:bg-gray-100 dark:hover:bg-[#1d222b] transition">
          <svg width="48" height="48" fill="none" class="mb-2">
            <rect width="48" height="48" rx="12" class="fill-[${cor}]" opacity="0.13"/>
            <path d="M12 18l12 9 12-9" stroke="${cor}" stroke-width="2"/>
            <rect x="12" y="18" width="24" height="12" rx="2" stroke="${cor}" stroke-width="2"/>
          </svg>
          <span class="font-semibold ${isDark ? 'text-white' : 'text-[#1b1e24]'}">Recuperar com e-mail</span>
        </button>
        <button id="rec-username" class="flex-1 flex flex-col items-center p-6 border ${isDark ? 'border-[#C42448]' : 'border-[#229E93]'} rounded-lg hover:bg-gray-100 dark:hover:bg-[#1d222b] transition">
          <svg width="48" height="48" fill="none" class="mb-2">
            <rect width="48" height="48" rx="12" class="fill-[${cor}]" opacity="0.13"/>
            <circle cx="24" cy="20" r="8" stroke="${cor}" stroke-width="2"/>
            <path d="M10 36c0-6 8-9 14-9s14 3 14 9" stroke="${cor}" stroke-width="2"/>
          </svg>
          <span class="font-semibold ${isDark ? 'text-white' : 'text-[#1b1e24]'}">Recuperar com username</span>
        </button>
      </div>
      <button id="back-login-forgot" class="mt-2 text-sm ${isDark ? "text-[#C42448]" : "text-[#229E93]"} hover:underline font-semibold transition">Voltar ao login</button>
    </div>
  `;
  ativarHandlers();
  document.getElementById("rec-email").onclick = () => renderForgotEmailForm();
  document.getElementById("rec-username").onclick = () => renderForgotUsernameForm();
  document.getElementById("back-login-forgot").onclick = () => renderLoginCard();
}

// ====== Formulário de Recuperação por E-mail ======
function renderForgotEmailForm() {
  let isDark = currentDark;
  let logo = isDark ? "Assents/logo_svg_dark.png" : "Assents/logo_svg_light.png";
  let cor = isDark ? "#C42448" : "#229E93";
  loginCardRoot.innerHTML = `
    <div id="login-card"
      class="rounded-2xl shadow-2xl p-8 flex flex-col items-center w-full max-w-md border-2 ${isDark ? 'border-[#C42448] bg-[#181A20]' : 'border-[#229E93] bg-white'} transition-bg relative"
    >
      <button id="theme-toggle"
        class="absolute top-5 right-5 rounded-full shadow-md p-2 flex items-center justify-center ${isDark ? "dark" : "light"} transition"
        title="Alternar tema"
        type="button"
      >
        <svg id="icon-moon" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ${isDark ? 'hidden' : 'block'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 12.79A9 9 0 1111.21 3a7 7 0 0010.07 9.79z"/>
        </svg>
        <svg id="icon-sun" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ${isDark ? 'block' : 'hidden'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="none"/>
          <line x1="12" y1="1.5" x2="12" y2="4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="12" y1="20" x2="12" y2="22.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="4" y1="12" x2="1.5" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="20" y1="12" x2="22.5" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="5.85" y1="5.85" x2="4.07" y2="4.07" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="18.15" y1="18.15" x2="19.93" y2="19.93" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="18.15" y1="5.85" x2="19.93" y2="4.07" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="5.85" y1="18.15" x2="4.07" y2="19.93" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      <div class="flex items-center justify-center gap-4 mb-7 w-full">
        <img id="logo-img"
          src="${logo}"
          alt="Logo YnanaTales"
          class="w-16 h-16 transition-all duration-300"
          style="min-width: 100px; height: 100px;"
        />
        <h1 class="text-3xl md:text-4xl font-bold text-[${cor}] text-center tracking-tight transition-bg">
          YnanaTales
        </h1>
      </div>
      <p class="font-semibold mb-3 ${isDark ? 'text-white' : 'text-[#1b1e24]'}">Digite seu e-mail:</p>
      <form id="forgot-email-form" class="w-full flex flex-col gap-4">
        <input id="forgot-email" type="email" required class="w-full px-4 py-3 rounded-md border ${isDark ? 'border-[#C42448] bg-[#181A20] text-white' : 'border-[#229E93] bg-white text-[#1b1e24]'} focus:border-[${cor}] outline-none transition" />
        <button type="submit" class="w-full py-3 rounded-md font-bold transition bg-[${cor}] border-2 border-[${cor}] text-white hover:opacity-90">Enviar</button>
      </form>
      <button id="back-choice-email" class="mt-2 text-sm ${isDark ? "text-[#C42448]" : "text-[#229E93]"} hover:underline font-semibold transition">Voltar</button>
    </div>
  `;
  ativarHandlers();
  document.getElementById("forgot-email-form").onsubmit = e => {
    e.preventDefault();
    renderForgotSuccess("e-mail");
  };
  document.getElementById("back-choice-email").onclick = () => renderForgotPasswordCard();
}

// ====== Formulário de Recuperação por Username ======
function renderForgotUsernameForm() {
  let isDark = currentDark;
  let logo = isDark ? "Assents/logo_svg_dark.png" : "Assents/logo_svg_light.png";
  let cor = isDark ? "#C42448" : "#229E93";
  loginCardRoot.innerHTML = `
    <div id="login-card"
      class="rounded-2xl shadow-2xl p-8 flex flex-col items-center w-full max-w-md border-2 ${isDark ? 'border-[#C42448] bg-[#181A20]' : 'border-[#229E93] bg-white'} transition-bg relative"
    >
      <button id="theme-toggle"
        class="absolute top-5 right-5 rounded-full shadow-md p-2 flex items-center justify-center ${isDark ? "dark" : "light"} transition"
        title="Alternar tema"
        type="button"
      >
        <svg id="icon-moon" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ${isDark ? 'hidden' : 'block'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 12.79A9 9 0 1111.21 3a7 7 0 0010.07 9.79z"/>
        </svg>
        <svg id="icon-sun" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ${isDark ? 'block' : 'hidden'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="none"/>
          <line x1="12" y1="1.5" x2="12" y2="4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="12" y1="20" x2="12" y2="22.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="4" y1="12" x2="1.5" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="20" y1="12" x2="22.5" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="5.85" y1="5.85" x2="4.07" y2="4.07" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="18.15" y1="18.15" x2="19.93" y2="19.93" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="18.15" y1="5.85" x2="19.93" y2="4.07" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="5.85" y1="18.15" x2="4.07" y2="19.93" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      <div class="flex items-center justify-center gap-4 mb-7 w-full">
        <img id="logo-img"
          src="${logo}"
          alt="Logo YnanaTales"
          class="w-16 h-16 transition-all duration-300"
          style="min-width: 100px; height: 100px;"
        />
        <h1 class="text-3xl md:text-4xl font-bold text-[${cor}] text-center tracking-tight transition-bg">
          YnanaTales
        </h1>
      </div>
      <p class="font-semibold mb-3 ${isDark ? 'text-white' : 'text-[#1b1e24]'}">Digite seu nome de usuário:</p>
      <form id="forgot-username-form" class="w-full flex flex-col gap-4">
        <input id="forgot-username" type="text" required class="w-full px-4 py-3 rounded-md border ${isDark ? 'border-[#C42448] bg-[#181A20] text-white' : 'border-[#229E93] bg-white text-[#1b1e24]'} focus:border-[${cor}] outline-none transition" />
        <button type="submit" class="w-full py-3 rounded-md font-bold transition bg-[${cor}] border-2 border-[${cor}] text-white hover:opacity-90">Enviar</button>
      </form>
      <button id="back-choice-username" class="mt-2 text-sm ${isDark ? "text-[#C42448]" : "text-[#229E93]"} hover:underline font-semibold transition">Voltar</button>
    </div>
  `;
  ativarHandlers();
  document.getElementById("forgot-username-form").onsubmit = e => {
    e.preventDefault();
    renderForgotSuccess("usuário");
  };
  document.getElementById("back-choice-username").onclick = () => renderForgotPasswordCard();
}

// ====== Sucesso Recuperação ======
function renderForgotSuccess(modo) {
  let isDark = currentDark;
  let cor = isDark ? "#C42448" : "#229E93";
  let logo = isDark ? "Assents/logo_svg_dark.png" : "Assents/logo_svg_light.png";
  loginCardRoot.innerHTML = `
    <div id="login-card"
      class="rounded-2xl shadow-2xl p-8 flex flex-col items-center w-full max-w-md border-2 ${isDark ? 'border-[#C42448] bg-[#181A20]' : 'border-[#229E93] bg-white'} transition-bg relative"
    >
      <button id="theme-toggle"
        class="absolute top-5 right-5 rounded-full shadow-md p-2 flex items-center justify-center ${isDark ? "dark" : "light"} transition"
        title="Alternar tema"
        type="button"
      >
        <svg id="icon-moon" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ${isDark ? 'hidden' : 'block'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 12.79A9 9 0 1111.21 3a7 7 0 0010.07 9.79z"/>
        </svg>
        <svg id="icon-sun" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ${isDark ? 'block' : 'hidden'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="none"/>
          <line x1="12" y1="1.5" x2="12" y2="4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="12" y1="20" x2="12" y2="22.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="4" y1="12" x2="1.5" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="20" y1="12" x2="22.5" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="5.85" y1="5.85" x2="4.07" y2="4.07" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="18.15" y1="18.15" x2="19.93" y2="19.93" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="18.15" y1="5.85" x2="19.93" y2="4.07" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="5.85" y1="18.15" x2="4.07" y2="19.93" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      <div class="flex items-center justify-center gap-4 mb-7 w-full">
        <img id="logo-img"
          src="${logo}"
          alt="Logo YnanaTales"
          class="w-16 h-16 transition-all duration-300"
          style="min-width: 100px; height: 100px;"
        />
        <h1 class="text-3xl md:text-4xl font-bold text-[${cor}] text-center tracking-tight transition-bg">
          YnanaTales
        </h1>
      </div>
      <svg width="64" height="64" fill="none" class="mb-3">
        <circle cx="32" cy="32" r="32" class="fill-[${cor}]" opacity="0.13"/>
        <path d="M21 33l8.5 7L43 25" stroke="${cor}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <p class="text-lg mb-4 text-center ${isDark ? "text-white" : "text-[#1b1e24]"}">
        Verifique seu ${modo}!<br>Enviamos um link/código para redefinir sua senha.
      </p>
      <button id="back-login-forgot-success" class="mt-2 text-sm ${isDark ? "text-[#C42448]" : "text-[#229E93]"} hover:underline font-semibold transition">
        Voltar ao login
      </button>
    </div>
  `;
  ativarHandlers();
  document.getElementById("back-login-forgot-success").onclick = () => renderLoginCard();
}}
