(function () {
  var statuses = ['Diagnosing…', 'Repairing…', 'Quality check…', 'Ready for pickup'];
  var statusEl = document.getElementById('ec-status');
  var i = 0;
  if (statusEl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setInterval(function () {
      i = (i + 1) % statuses.length;
      statusEl.textContent = statuses[i];
    }, 1800);
  }

  var scan = document.querySelector('.ec-scanline');
  var device = document.querySelector('.ec-ticket__device');
  if (scan && device && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var top = 24, dir = 1, max = 0;
    var raf;
    function measure() { max = device.clientHeight - 40; }
    measure();
    window.addEventListener('resize', measure);
    function step() {
      top += dir * 0.9;
      if (top > max || top < 24) dir *= -1;
      scan.style.top = top + 'px';
      raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
  }
})();
const devices = [
  {
    name: "Mobile Phones",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></svg>`,
    services: [
      ["Cracked screen replacement", "45 min"],
      ["Battery replacement", "30 min"],
      ["Charging port repair", "1 hr"],
      ["Water damage treatment", "24 hr"],
      ["Camera & speaker repair", "1 hr"],
      ["Back glass replacement", "1 hr"]
    ],
    note: "Most screens and batteries are done <strong>same visit</strong> — grab a coffee next door and it's ready before you finish it."
  },
  {
    name: "iPads & Tablets",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M10 19h4"/></svg>`,
    services: [
      ["Screen & digitiser replacement", "1–2 hr"],
      ["Battery replacement", "1 hr"],
      ["Charging port repair", "1 hr"],
      ["Button & speaker repair", "1 hr"],
      ["Software & iOS restore", "45 min"],
      ["Water damage treatment", "24 hr"]
    ],
    note: "Kids' tablets get priority handling — we know screen time doesn't pause for repairs."
  },
  {
    name: "Laptops",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="12" rx="1"/><path d="M1 19h22"/></svg>`,
    services: [
      ["Screen replacement", "2 hr"],
      ["Keyboard & trackpad repair", "2 hr"],
      ["Logic board / motherboard repair", "1–3 days"],
      ["SSD / RAM upgrade", "1 hr"],
      ["Battery replacement", "1 hr"],
      ["Data recovery", "1–2 days"]
    ],
    note: "<strong>Data recovery is quoted before we start</strong> — if we can't get it back, you don't pay the recovery fee."
  },
  {
    name: "Printers",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 9V3h12v6"/><rect x="4" y="9" width="16" height="8" rx="1"/><path d="M6 17h12v4H6z"/></svg>`,
    services: [
      ["Paper jam & feed repair", "45 min"],
      ["Print head cleaning / replacement", "1–2 hr"],
      ["Cartridge & sensor issues", "45 min"],
      ["Wi-Fi & network setup", "30 min"],
      ["Driver & software fixes", "30 min"],
      ["Preventive servicing", "1 hr"]
    ],
    note: "We service the office workhorse too — inkjets, lasers, and everything that keeps a small business printing."
  },
  {
    name: "PC Systems",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="14" rx="1"/><path d="M8 21h8M12 18v3"/></svg>`,
    services: [
      ["Full system diagnostics", "1 hr"],
      ["Virus & malware removal", "2 hr"],
      ["Component upgrade & build", "1–2 hr"],
      ["OS install & data migration", "2–4 hr"],
      ["Custom PC assembly", "1 day"],
      ["Network & peripheral setup", "1 hr"]
    ],
    note: "From a single overheating desktop to a full office rollout — we scope it and stick to it."
  }
];

const grid = document.getElementById('deviceGrid');
let openIndex = null;

function render(){
  grid.innerHTML = '';
  devices.forEach((d, i) => {
    const card = document.createElement('div');
    card.className = 'device-card' + (openIndex === i ? ' active' : '');
    card.tabIndex = 0;
    card.setAttribute('role','button');
    card.setAttribute('aria-expanded', openIndex === i ? 'true' : 'false');
    card.innerHTML = `
      <span class="idx mono">0${i+1}</span>
      <span class="plus">+</span>
      <div class="icon">${d.icon}</div>
      <h3>${d.name}</h3>
    `;
    const activate = () => {
      openIndex = (openIndex === i) ? null : i;
      render();
      if(openIndex === i){
        setTimeout(() => {
          const panel = document.getElementById('panel-'+i);
          if(panel) panel.scrollIntoView({behavior:'smooth', block:'nearest'});
        }, 50);
      }
    };
    card.addEventListener('click', activate);
    card.addEventListener('keydown', (e) => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); activate(); } });
    grid.appendChild(card);

    if(openIndex === i){
      const panel = document.createElement('div');
      panel.className = 'device-panel open';
      panel.id = 'panel-'+i;
      const half = Math.ceil(d.services.length / 2);
      const col1 = d.services.slice(0, half);
      const col2 = d.services.slice(half);
      const listHtml = (list) => `<ul>${list.map(([label,eta]) => `<li>${label}<span class="eta mono">${eta}</span></li>`).join('')}</ul>`;
      panel.innerHTML = `
        <div class="device-panel-inner">
          <div>
            <h4>Services for ${d.name}</h4>
            ${listHtml(col1)}
          </div>
          <div>
            <h4 style="opacity:0">.</h4>
            ${listHtml(col2)}
            <p class="device-panel-note" style="margin-top:18px;">${d.note}</p>
          </div>
        </div>
      `;
      grid.appendChild(panel);
    }
  });
}

render();