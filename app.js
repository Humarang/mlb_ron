const API = "https://statsapi.mlb.com/api/v1";
const CDN_HEADSHOT = id => `https://img.mlbstatic.com/mlb-photos/image/upload/w_220,q_100/v1/people/${id}/headshot/67/current`;

const FALLBACK_TEAMS = [
  {id:108,name:"Los Angeles Angels",abbreviation:"LAA",league:{name:"American League"},division:{name:"AL West"},venue:{name:"Angel Stadium"},firstYearOfPlay:"1961"},
  {id:109,name:"Arizona Diamondbacks",abbreviation:"AZ",league:{name:"National League"},division:{name:"NL West"},venue:{name:"Chase Field"},firstYearOfPlay:"1998"},
  {id:110,name:"Baltimore Orioles",abbreviation:"BAL",league:{name:"American League"},division:{name:"AL East"},venue:{name:"Oriole Park at Camden Yards"},firstYearOfPlay:"1901"},
  {id:111,name:"Boston Red Sox",abbreviation:"BOS",league:{name:"American League"},division:{name:"AL East"},venue:{name:"Fenway Park"},firstYearOfPlay:"1901"},
  {id:112,name:"Chicago Cubs",abbreviation:"CHC",league:{name:"National League"},division:{name:"NL Central"},venue:{name:"Wrigley Field"},firstYearOfPlay:"1874"},
  {id:113,name:"Cincinnati Reds",abbreviation:"CIN",league:{name:"National League"},division:{name:"NL Central"},venue:{name:"Great American Ball Park"},firstYearOfPlay:"1882"},
  {id:114,name:"Cleveland Guardians",abbreviation:"CLE",league:{name:"American League"},division:{name:"AL Central"},venue:{name:"Progressive Field"},firstYearOfPlay:"1901"},
  {id:115,name:"Colorado Rockies",abbreviation:"COL",league:{name:"National League"},division:{name:"NL West"},venue:{name:"Coors Field"},firstYearOfPlay:"1993"},
  {id:116,name:"Detroit Tigers",abbreviation:"DET",league:{name:"American League"},division:{name:"AL Central"},venue:{name:"Comerica Park"},firstYearOfPlay:"1901"},
  {id:117,name:"Houston Astros",abbreviation:"HOU",league:{name:"American League"},division:{name:"AL West"},venue:{name:"Daikin Park"},firstYearOfPlay:"1962"},
  {id:118,name:"Kansas City Royals",abbreviation:"KC",league:{name:"American League"},division:{name:"AL Central"},venue:{name:"Kauffman Stadium"},firstYearOfPlay:"1969"},
  {id:119,name:"Los Angeles Dodgers",abbreviation:"LAD",league:{name:"National League"},division:{name:"NL West"},venue:{name:"Dodger Stadium"},firstYearOfPlay:"1884"},
  {id:120,name:"Washington Nationals",abbreviation:"WSH",league:{name:"National League"},division:{name:"NL East"},venue:{name:"Nationals Park"},firstYearOfPlay:"1968"},
  {id:121,name:"New York Mets",abbreviation:"NYM",league:{name:"National League"},division:{name:"NL East"},venue:{name:"Citi Field"},firstYearOfPlay:"1962"},
  {id:133,name:"Athletics",abbreviation:"ATH",league:{name:"American League"},division:{name:"AL West"},venue:{name:"Sutter Health Park"},firstYearOfPlay:"1901"},
  {id:134,name:"Pittsburgh Pirates",abbreviation:"PIT",league:{name:"National League"},division:{name:"NL Central"},venue:{name:"PNC Park"},firstYearOfPlay:"1882"},
  {id:135,name:"San Diego Padres",abbreviation:"SD",league:{name:"National League"},division:{name:"NL West"},venue:{name:"Petco Park"},firstYearOfPlay:"1969"},
  {id:136,name:"Seattle Mariners",abbreviation:"SEA",league:{name:"American League"},division:{name:"AL West"},venue:{name:"T-Mobile Park"},firstYearOfPlay:"1977"},
  {id:137,name:"San Francisco Giants",abbreviation:"SF",league:{name:"National League"},division:{name:"NL West"},venue:{name:"Oracle Park"},firstYearOfPlay:"1883"},
  {id:138,name:"St. Louis Cardinals",abbreviation:"STL",league:{name:"National League"},division:{name:"NL Central"},venue:{name:"Busch Stadium"},firstYearOfPlay:"1882"},
  {id:139,name:"Tampa Bay Rays",abbreviation:"TB",league:{name:"American League"},division:{name:"AL East"},venue:{name:"George M. Steinbrenner Field"},firstYearOfPlay:"1996"},
  {id:140,name:"Texas Rangers",abbreviation:"TEX",league:{name:"American League"},division:{name:"AL West"},venue:{name:"Globe Life Field"},firstYearOfPlay:"1961"},
  {id:141,name:"Toronto Blue Jays",abbreviation:"TOR",league:{name:"American League"},division:{name:"AL East"},venue:{name:"Rogers Centre"},firstYearOfPlay:"1977"},
  {id:142,name:"Minnesota Twins",abbreviation:"MIN",league:{name:"American League"},division:{name:"AL Central"},venue:{name:"Target Field"},firstYearOfPlay:"1901"},
  {id:143,name:"Philadelphia Phillies",abbreviation:"PHI",league:{name:"National League"},division:{name:"NL East"},venue:{name:"Citizens Bank Park"},firstYearOfPlay:"1883"},
  {id:144,name:"Atlanta Braves",abbreviation:"ATL",league:{name:"National League"},division:{name:"NL East"},venue:{name:"Truist Park"},firstYearOfPlay:"1871"},
  {id:145,name:"Chicago White Sox",abbreviation:"CWS",league:{name:"American League"},division:{name:"AL Central"},venue:{name:"Rate Field"},firstYearOfPlay:"1901"},
  {id:146,name:"Miami Marlins",abbreviation:"MIA",league:{name:"National League"},division:{name:"NL East"},venue:{name:"loanDepot park"},firstYearOfPlay:"1993"},
  {id:147,name:"New York Yankees",abbreviation:"NYY",league:{name:"American League"},division:{name:"AL East"},venue:{name:"Yankee Stadium"},firstYearOfPlay:"1903"},
  {id:158,name:"Milwaukee Brewers",abbreviation:"MIL",league:{name:"National League"},division:{name:"NL Central"},venue:{name:"American Family Field"},firstYearOfPlay:"1968"}
];

const DEMO_PLAYERS = [
  {id:624133, name:"Ranger Suarez", position:"P", team:"Boston Red Sox", img:CDN_HEADSHOT(624133), hitting:null, pitching:{gamesPitched:17,inningsPitched:"91.0",strikeOuts:96,era:"3.16",whip:"1.15"}},
  {id:660271, name:"Shohei Ohtani", position:"DH", team:"Los Angeles Dodgers", img:CDN_HEADSHOT(660271), hitting:{gamesPlayed:83,hits:94,homeRuns:28,rbi:61,strikeOuts:78,avg:".301",ops:"1.025",totalBases:192}, pitching:null},
  {id:592450, name:"Aaron Judge", position:"RF", team:"New York Yankees", img:CDN_HEADSHOT(592450), hitting:{gamesPlayed:81,hits:88,homeRuns:31,rbi:70,strikeOuts:82,avg:".292",ops:"1.056",totalBases:191}, pitching:null},
  {id:605141, name:"Mookie Betts", position:"SS", team:"Los Angeles Dodgers", img:CDN_HEADSHOT(605141), hitting:{gamesPlayed:78,hits:84,homeRuns:15,rbi:47,strikeOuts:42,avg:".286",ops:".865",totalBases:145}, pitching:null},
  {id:665742, name:"Vladimir Guerrero Jr.", position:"1B", team:"Toronto Blue Jays", img:CDN_HEADSHOT(665742), hitting:{gamesPlayed:82,hits:91,homeRuns:18,rbi:55,strikeOuts:50,avg:".304",ops:".904",totalBases:158}, pitching:null},
  {id:543037, name:"Gerrit Cole", position:"P", team:"New York Yankees", img:CDN_HEADSHOT(543037), hitting:null, pitching:{gamesPitched:14,inningsPitched:"82.2",strikeOuts:94,era:"3.10",whip:"1.09"}}
];

const DEMO_GAME_LOGS = {
  "624133:pitching:2026": [
    {date:"2026-04-02", opponent:"BAL", team:"BOS", value:7, raw:{inningsPitched:"6.0", strikeOuts:7}},
    {date:"2026-04-08", opponent:"TOR", team:"BOS", value:5, raw:{inningsPitched:"5.2", strikeOuts:5}},
    {date:"2026-04-14", opponent:"NYY", team:"BOS", value:8, raw:{inningsPitched:"6.1", strikeOuts:8}},
    {date:"2026-04-20", opponent:"TB", team:"BOS", value:4, raw:{inningsPitched:"5.0", strikeOuts:4}},
    {date:"2026-04-26", opponent:"CLE", team:"BOS", value:6, raw:{inningsPitched:"6.0", strikeOuts:6}},
    {date:"2026-05-02", opponent:"DET", team:"BOS", value:9, raw:{inningsPitched:"7.0", strikeOuts:9}},
    {date:"2026-05-08", opponent:"SEA", team:"BOS", value:5, raw:{inningsPitched:"5.2", strikeOuts:5}},
    {date:"2026-05-14", opponent:"ATL", team:"BOS", value:7, raw:{inningsPitched:"6.1", strikeOuts:7}},
    {date:"2026-05-20", opponent:"PHI", team:"BOS", value:3, raw:{inningsPitched:"4.2", strikeOuts:3}},
    {date:"2026-05-26", opponent:"MIA", team:"BOS", value:6, raw:{inningsPitched:"6.0", strikeOuts:6}},
    {date:"2026-06-01", opponent:"TEX", team:"BOS", value:8, raw:{inningsPitched:"6.2", strikeOuts:8}},
    {date:"2026-06-07", opponent:"HOU", team:"BOS", value:4, raw:{inningsPitched:"5.1", strikeOuts:4}},
    {date:"2026-06-13", opponent:"KC", team:"BOS", value:7, raw:{inningsPitched:"6.0", strikeOuts:7}},
    {date:"2026-06-19", opponent:"MIN", team:"BOS", value:10, raw:{inningsPitched:"7.0", strikeOuts:10}},
    {date:"2026-06-25", opponent:"CWS", team:"BOS", value:6, raw:{inningsPitched:"6.0", strikeOuts:6}},
    {date:"2026-07-01", opponent:"WSH", team:"BOS", value:5, raw:{inningsPitched:"5.2", strikeOuts:5}},
    {date:"2026-07-06", opponent:"ATH", team:"BOS", value:8, raw:{inningsPitched:"6.1", strikeOuts:8}}
  ]
};

const state = {
  teams: [],
  games: [],
  players: [],
  propPlayers: [],
  propLogs: [],
  propLine: 5.5,
  propDragging: false,
  propChart: { padding: {left: 58, right: 24, top: 28, bottom: 58}, minY: 0, maxY: 12 },
  snapshots: JSON.parse(localStorage.getItem("mlbSnapshots") || "[]"),
  slip: JSON.parse(localStorage.getItem("mlbSlip") || "[]")
};

const $ = id => document.getElementById(id);
const fmt = v => (v === undefined || v === null || v === "" ? "—" : v);
const number = v => Number(String(v ?? "0").replace(/^\./, "0.")) || 0;
const setStatus = (text, cls="") => { const el = $("connectionStatus"); el.textContent = text; el.className = `status-pill ${cls}`; };
const todayISO = () => new Date().toISOString().slice(0,10);
const season = () => $("seasonInput").value || new Date().getFullYear();

function init() {
  $("dateInput").value = todayISO();
  $("seasonInput").value = new Date().getFullYear();
  bindEvents();
  renderTeams(FALLBACK_TEAMS);
  state.propPlayers = [DEMO_PLAYERS[0], ...DEMO_PLAYERS.slice(1)];
  renderPropPlayerOptions();
  renderSlip();
  renderSnapshots();
  loadDemo();
  loadAll();
}

function bindEvents() {
  $("loadBtn").addEventListener("click", loadAll);
  $("demoBtn").addEventListener("click", loadDemo);
  $("teamSelect").addEventListener("change", loadRoster);
  $("teamSearch").addEventListener("input", () => renderTeamsTable(filterTeams($("teamSearch").value)));
  $("playerSearch").addEventListener("input", () => renderPlayers(filterPlayers($("playerSearch").value)));
  $("addSlipBtn").addEventListener("click", addSlip);
  $("saveSnapshotBtn").addEventListener("click", saveSnapshot);
  $("exportRosterBtn").addEventListener("click", () => exportCSV("mlb-roster.csv", rosterRows()));
  $("exportGamesBtn").addEventListener("click", () => exportCSV("mlb-games.csv", gameRows()));
  $("findPlayerBtn").addEventListener("click", findPlayerByName);
  $("loadPropBtn").addEventListener("click", loadPropGraph);
  $("propLineInput").addEventListener("input", () => {
    state.propLine = Math.max(0, number($("propLineInput").value));
    renderPropAnalysis();
  });
  $("propMarket").addEventListener("change", () => {
    const market = parseMarket();
    $("propLineInput").value = market.group === "pitching" ? "5.5" : market.key === "homeRuns" ? "0.5" : "1.5";
    state.propLine = number($("propLineInput").value);
  });
  document.querySelectorAll(".tab").forEach(btn => btn.addEventListener("click", () => openTab(btn.dataset.tab)));
  bindChartDragging();
}

function openTab(tabId) {
  document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t.dataset.tab === tabId));
  document.querySelectorAll(".tab-page").forEach(p => p.classList.toggle("active", p.id === tabId));
  if (tabId === "props") setTimeout(drawPropChart, 50);
}

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
}

async function loadAll() {
  setStatus("Loading MLB data…", "loading");
  try {
    const [teamsData, scheduleData] = await Promise.all([
      fetchJSON(`${API}/teams?sportIds=1&activeStatus=Y`),
      fetchJSON(`${API}/schedule?sportId=1&date=${$("dateInput").value}&hydrate=probablePitcher,linescore,team,lineups`)
    ]);
    state.teams = (teamsData.teams || []).sort((a,b) => a.name.localeCompare(b.name));
    state.games = flattenGames(scheduleData);
    renderTeams(state.teams.length ? state.teams : FALLBACK_TEAMS);
    renderGames();
    await loadRoster();
    renderDashboard();
    setStatus("Live MLB data loaded", "ok");
  } catch (err) {
    console.warn("Live data failed:", err);
    setStatus("Live fetch blocked — demo loaded", "error");
    loadDemo();
  }
}

async function loadRoster() {
  if (!$("teamSelect").value) return;
  setStatus("Loading roster + player stats…", "loading");
  const teamId = $("teamSelect").value || 119;
  const mode = $("rosterMode").value || "active";
  try {
    let rosterData;
    try {
      rosterData = await fetchJSON(`${API}/teams/${teamId}/roster?rosterType=${mode}&season=${season()}`);
    } catch (err) {
      rosterData = await fetchJSON(`${API}/teams/${teamId}/roster?rosterType=active&season=${season()}`);
    }
    const roster = rosterData.roster || [];
    const chunks = [];
    for (let i = 0; i < roster.length; i += 6) chunks.push(roster.slice(i, i + 6));
    const players = [];
    for (const chunk of chunks) {
      const batch = await Promise.all(chunk.map(async item => {
        try {
          const personId = item.person.id;
          const detail = await fetchJSON(`${API}/people/${personId}?hydrate=stats(group=[hitting,pitching],type=[season],season=${season()})`);
          return normalizePlayer(item, detail.people?.[0]);
        } catch (err) {
          return normalizePlayer(item, null);
        }
      }));
      players.push(...batch);
    }
    state.players = players;
    mergePropPlayers(players);
    renderAllPlayerViews();
    setStatus("Roster loaded", "ok");
  } catch (err) {
    console.warn("Roster failed:", err);
    state.players = DEMO_PLAYERS;
    mergePropPlayers(DEMO_PLAYERS);
    renderAllPlayerViews();
    setStatus("Roster demo loaded", "error");
  }
}

function normalizePlayer(rosterItem, detail) {
  const person = detail || rosterItem.person || {};
  const stats = person.stats || [];
  const hitting = stats.find(s => (s.group?.displayName || "").toLowerCase() === "hitting")?.splits?.[0]?.stat || null;
  const pitching = stats.find(s => (s.group?.displayName || "").toLowerCase() === "pitching")?.splits?.[0]?.stat || null;
  return {
    id: person.id || rosterItem.person?.id,
    name: person.fullName || rosterItem.person?.fullName || "Unknown Player",
    position: rosterItem.position?.abbreviation || person.primaryPosition?.abbreviation || "—",
    jersey: rosterItem.jerseyNumber || "",
    status: rosterItem.status?.description || "Active",
    team: selectedTeam()?.name || person.currentTeam?.name || "Selected team",
    img: CDN_HEADSHOT(person.id || rosterItem.person?.id),
    hitting,
    pitching,
    raw: person
  };
}

function flattenGames(data) {
  return (data.dates || []).flatMap(d => (d.games || []).map(g => ({
    id: g.gamePk,
    date: g.gameDate,
    status: g.status?.detailedState || g.status?.abstractGameState || "Scheduled",
    away: g.teams?.away?.team?.name || "Away",
    home: g.teams?.home?.team?.name || "Home",
    awayScore: g.teams?.away?.score,
    homeScore: g.teams?.home?.score,
    awayPitcher: g.teams?.away?.probablePitcher?.fullName || "TBA",
    homePitcher: g.teams?.home?.probablePitcher?.fullName || "TBA"
  })));
}

function selectedTeam() {
  return state.teams.find(t => String(t.id) === String($("teamSelect").value)) || FALLBACK_TEAMS.find(t => String(t.id) === String($("teamSelect").value));
}

function renderTeams(teams) {
  state.teams = teams;
  const select = $("teamSelect");
  const current = select.value || "119";
  select.innerHTML = teams.map(t => `<option value="${t.id}">${escapeHTML(t.name)}</option>`).join("");
  select.value = teams.some(t => String(t.id) === current) ? current : teams[0]?.id || "119";
  renderTeamsTable(teams);
  $("teamsCount").textContent = teams.length;
}

function renderTeamsTable(teams) {
  $("teamsTable").innerHTML = teams.map(t => `
    <tr>
      <td><strong>${escapeHTML(fmt(t.name))}</strong></td>
      <td>${escapeHTML(fmt(t.abbreviation))}</td>
      <td>${escapeHTML(fmt(t.league?.name))}</td>
      <td>${escapeHTML(fmt(t.division?.name))}</td>
      <td>${escapeHTML(fmt(t.venue?.name))}</td>
      <td>${escapeHTML(fmt(t.firstYearOfPlay))}</td>
    </tr>
  `).join("");
}

function filterTeams(q) {
  q = q.toLowerCase();
  return state.teams.filter(t => [t.name,t.abbreviation,t.league?.name,t.division?.name,t.venue?.name].join(" ").toLowerCase().includes(q));
}

function renderGames() {
  $("gamesCount").textContent = state.games.length;
  $("gameCards").innerHTML = state.games.slice(0, 8).map(g => `
    <div class="game-card">
      <div>
        <strong>${escapeHTML(g.away)} @ ${escapeHTML(g.home)}</strong>
        <small>${new Date(g.date).toLocaleString()} · ${escapeHTML(g.status)}</small><br>
        <small>Pitchers: ${escapeHTML(g.awayPitcher)} vs ${escapeHTML(g.homePitcher)}</small>
      </div>
      <div class="score-chip">${scoreText(g)}</div>
    </div>
  `).join("") || emptyState();
  $("gamesTable").innerHTML = state.games.map(g => `
    <tr>
      <td>${new Date(g.date).toLocaleString()}</td>
      <td>${escapeHTML(g.away)}</td>
      <td>${escapeHTML(g.home)}</td>
      <td>${escapeHTML(g.awayPitcher)} vs ${escapeHTML(g.homePitcher)}</td>
      <td>${escapeHTML(g.status)}</td>
      <td>${scoreText(g)}</td>
      <td>${gameNote(g)}</td>
    </tr>
  `).join("") || `<tr><td colspan="7">No games loaded.</td></tr>`;
}

function scoreText(g) {
  if (g.awayScore === undefined || g.homeScore === undefined) return "—";
  return `${g.awayScore} - ${g.homeScore}`;
}

function gameNote(g) {
  const hasPitchers = g.awayPitcher !== "TBA" && g.homePitcher !== "TBA";
  return hasPitchers ? "Check pitcher K props, team totals, and recent batting form" : "Wait for probable pitchers / lineups before betting";
}

function renderAllPlayerViews() {
  const ranked = rankedPlayers(state.players);
  $("playersCount").textContent = state.players.length;
  renderTopPlayers(ranked);
  renderLineup(ranked);
  renderPlayers(state.players);
  renderBettingSignals(ranked);
  renderDashboard();
}

function rankedPlayers(players) {
  return [...players].sort((a,b) => impactScore(b) - impactScore(a));
}

function impactScore(p) {
  const h = p.hitting || {};
  const pit = p.pitching || {};
  return number(h.hits) + number(h.homeRuns) * 6 + number(h.rbi) * 1.2 + number(h.ops) * 80 - number(h.strikeOuts) * 0.22 + number(pit.strikeOuts) * 0.7 - number(pit.era) * 3;
}

function signalClass(score) {
  if (score >= 80) return "good";
  if (score >= 40) return "medium";
  return "risky";
}

function signalText(score) {
  if (score >= 80) return "Strong";
  if (score >= 40) return "Watch";
  return "Risky";
}

function renderTopPlayers(players) {
  const top = players.slice(0, 6);
  $("topSignal").textContent = top[0]?.name || "—";
  $("topPlayers").innerHTML = top.map(p => `
    <div class="player-mini">
      <img class="avatar" src="${p.img}" alt="${escapeAttr(p.name)}" onerror="this.src='${genericAvatar(p.name)}'" />
      <div>
        <strong>${escapeHTML(p.name)}</strong>
        <small>${escapeHTML(p.position)} · ${escapeHTML(p.team)}</small>
      </div>
      <span class="signal ${signalClass(impactScore(p))}">${signalText(impactScore(p))}</span>
    </div>
  `).join("") || emptyState();
}

function renderLineup(players) {
  $("lineupTable").innerHTML = players.map((p, i) => {
    const h = p.hitting || {};
    const pit = p.pitching || {};
    const score = impactScore(p);
    return `
      <tr>
        <td>${i + 1}</td>
        <td class="player-cell"><img class="avatar" src="${p.img}" alt="${escapeAttr(p.name)}" onerror="this.src='${genericAvatar(p.name)}'" /><strong>${escapeHTML(p.name)}</strong></td>
        <td>${escapeHTML(p.position)}</td>
        <td>${fmt(h.gamesPlayed || pit.gamesPitched)}</td>
        <td>${fmt(h.hits)}</td>
        <td>${fmt(h.homeRuns)}</td>
        <td>${fmt(h.rbi)}</td>
        <td>${fmt(h.strikeOuts)}</td>
        <td>${fmt(h.avg)}</td>
        <td>${fmt(h.ops)}</td>
        <td>${fmt(pit.strikeOuts)}</td>
        <td>${fmt(pit.era)}</td>
        <td><span class="signal ${signalClass(score)}">${Math.round(score)}</span></td>
        <td><button class="small prop-btn" onclick="openPropLabForPlayer(${p.id}, '${escapeAttr(p.name)}', '${escapeAttr(p.position)}')">Open graph</button></td>
      </tr>`;
  }).join("") || `<tr><td colspan="14">No roster loaded.</td></tr>`;
}

function renderPlayers(players) {
  const filtered = players.length ? players : state.players;
  $("playersGrid").innerHTML = filtered.map(p => {
    const h = p.hitting || {};
    const pit = p.pitching || {};
    const isPitcher = p.position === "P" || Object.keys(pit).length;
    return `<article class="player-card">
      <img class="avatar" src="${p.img}" alt="${escapeAttr(p.name)}" onerror="this.src='${genericAvatar(p.name)}'" />
      <div>
        <strong>${escapeHTML(p.name)}</strong>
        <p class="muted">${escapeHTML(p.position)} · ${escapeHTML(p.team)}</p>
      </div>
      <div class="stat-row">
        <div class="stat-box"><small>${isPitcher ? "ERA" : "Hits"}</small><strong>${fmt(isPitcher ? pit.era : h.hits)}</strong></div>
        <div class="stat-box"><small>${isPitcher ? "Ks" : "HR"}</small><strong>${fmt(isPitcher ? pit.strikeOuts : h.homeRuns)}</strong></div>
        <div class="stat-box"><small>${isPitcher ? "WHIP" : "SO"}</small><strong>${fmt(isPitcher ? pit.whip : h.strikeOuts)}</strong></div>
        <div class="stat-box"><small>${isPitcher ? "IP" : "OPS"}</small><strong>${fmt(isPitcher ? pit.inningsPitched : h.ops)}</strong></div>
      </div>
      <div style="display:flex;gap:10px;align-items:center;justify-content:space-between;flex-wrap:wrap">
        <span class="signal ${signalClass(impactScore(p))}">Betting signal: ${signalText(impactScore(p))}</span>
        <button class="small prop-btn" onclick="openPropLabForPlayer(${p.id}, '${escapeAttr(p.name)}', '${escapeAttr(p.position)}')">Prop graph</button>
      </div>
    </article>`;
  }).join("") || emptyState();
}

function filterPlayers(q) {
  q = q.toLowerCase();
  return state.players.filter(p => [p.name,p.position,p.team].join(" ").toLowerCase().includes(q));
}

function renderBettingSignals(players) {
  const hitters = players.filter(p => p.hitting).slice(0, 8);
  const pitchers = rankedPlayers(state.players.filter(p => p.pitching)).slice(0, 5);
  const cards = [];
  hitters.forEach(p => cards.push(signalCard(p, "Hitter / HR / RBI watch", `Hits ${fmt(p.hitting.hits)} · HR ${fmt(p.hitting.homeRuns)} · OPS ${fmt(p.hitting.ops)} · SO ${fmt(p.hitting.strikeOuts)}`)));
  pitchers.forEach(p => cards.push(signalCard(p, "Pitcher strikeout watch", `Ks ${fmt(p.pitching.strikeOuts)} · ERA ${fmt(p.pitching.era)} · WHIP ${fmt(p.pitching.whip)} · IP ${fmt(p.pitching.inningsPitched)}`)));
  $("bettingSignals").innerHTML = cards.join("") || emptyState();
}

function signalCard(p, title, detail) {
  return `<div class="signal-card">
    <img class="avatar" src="${p.img}" alt="${escapeAttr(p.name)}" onerror="this.src='${genericAvatar(p.name)}'" />
    <div><strong>${escapeHTML(p.name)}</strong><small class="muted">${escapeHTML(title)}<br>${escapeHTML(detail)}</small></div>
    <span class="signal ${signalClass(impactScore(p))}">${Math.round(impactScore(p))}</span>
  </div>`;
}

function renderDashboard() {
  $("teamsCount").textContent = state.teams.length;
  $("gamesCount").textContent = state.games.length;
  $("playersCount").textContent = state.players.length;
}

function mergePropPlayers(players) {
  const map = new Map(state.propPlayers.map(p => [String(p.id), p]));
  players.forEach(p => { if (p.id) map.set(String(p.id), p); });
  state.propPlayers = Array.from(map.values()).sort((a,b) => a.name.localeCompare(b.name));
  renderPropPlayerOptions();
}

function renderPropPlayerOptions() {
  const select = $("propPlayerSelect");
  const current = select.value || "624133";
  select.innerHTML = state.propPlayers.map(p => `<option value="${p.id}">${escapeHTML(p.name)} · ${escapeHTML(p.position || "—")} · ${escapeHTML(p.team || "MLB")}</option>`).join("");
  if (state.propPlayers.some(p => String(p.id) === String(current))) select.value = current;
}

async function findPlayerByName() {
  const query = $("propPlayerSearch").value.trim();
  if (!query) return alert("Enter a player name first.");
  setStatus("Searching player…", "loading");
  try {
    let people = [];
    try {
      const data = await fetchJSON(`${API}/people/search?names=${encodeURIComponent(query)}`);
      people = data.people || data.peopleSearchResults || [];
    } catch (err) {
      const data = await fetchJSON(`${API}/sports/1/players?season=${season()}`);
      people = (data.people || []).filter(p => (p.fullName || "").toLowerCase().includes(query.toLowerCase()));
    }
    if (!people.length) throw new Error("No player found");
    const normalized = people.slice(0, 10).map(p => ({
      id: p.id,
      name: p.fullName || p.nameFirstLast || query,
      position: p.primaryPosition?.abbreviation || "—",
      team: p.currentTeam?.name || "MLB",
      img: CDN_HEADSHOT(p.id),
      hitting: null,
      pitching: null,
      raw: p
    }));
    mergePropPlayers(normalized);
    $("propPlayerSelect").value = normalized[0].id;
    setStatus(`Found ${normalized[0].name}`, "ok");
  } catch (err) {
    console.warn(err);
    const ranger = DEMO_PLAYERS.find(p => p.id === 624133);
    mergePropPlayers([ranger]);
    $("propPlayerSelect").value = ranger.id;
    setStatus("Player search demo loaded", "error");
  }
}

function parseMarket() {
  const [group, label, key] = $("propMarket").value.split(":");
  return { group, label, key };
}

async function loadPropGraph() {
  const market = parseMarket();
  const playerId = $("propPlayerSelect").value || "624133";
  const player = state.propPlayers.find(p => String(p.id) === String(playerId)) || DEMO_PLAYERS[0];
  state.propLine = number($("propLineInput").value);
  setStatus(`Loading ${player.name} game logs…`, "loading");
  try {
    const url = `${API}/people/${playerId}?hydrate=stats(group=${market.group},type=gameLog,season=${season()})`;
    const data = await fetchJSON(url);
    const person = data.people?.[0] || {};
    const stats = person.stats || [];
    const splits = stats.find(s => (s.group?.displayName || "").toLowerCase() === market.group)?.splits || [];
    if (!splits.length) throw new Error("No game logs found");
    state.propLogs = splits.map(split => normalizePropSplit(split, market)).filter(row => row.value !== null && row.value !== undefined).sort((a,b) => new Date(a.date) - new Date(b.date));
    if (!state.propLogs.length) throw new Error("No rows for selected market");
    setStatus("Prop logs loaded", "ok");
  } catch (err) {
    console.warn("Prop logs failed:", err);
    const key = `${playerId}:${market.group}:${season()}`;
    const demo = DEMO_GAME_LOGS[key] || synthesizeDemoLogs(player, market);
    state.propLogs = demo;
    setStatus("Prop demo logs loaded", "error");
  }
  openTab("props");
  renderPropAnalysis();
}

function normalizePropSplit(split, market) {
  const stat = split.stat || {};
  const team = split.team?.abbreviation || split.team?.name || "—";
  const opp = split.opponent?.abbreviation || split.opponent?.name || "—";
  const rawValue = stat[market.key];
  return {
    date: split.date || split.game?.gameDate || "",
    opponent: opp,
    team,
    value: rawValue === undefined ? null : number(rawValue),
    raw: stat
  };
}

function synthesizeDemoLogs(player, market) {
  const seed = String(player.id || player.name).split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  const base = market.group === "pitching" ? 5 : market.key === "homeRuns" ? 0 : market.key === "totalBases" ? 2 : 1;
  const rows = [];
  for (let i = 0; i < 18; i++) {
    const value = Math.max(0, Math.round(base + Math.sin((i + seed) * .9) * 2 + ((i + seed) % 4)));
    rows.push({
      date: new Date(Date.UTC(Number(season()), 3, 1 + i * 5)).toISOString().slice(0,10),
      opponent: ["NYY","BOS","TOR","TB","BAL","LAD","ATL","HOU"][i % 8],
      team: player.team?.split(" ").pop()?.slice(0,3).toUpperCase() || "MLB",
      value,
      raw: {[market.key]: value}
    });
  }
  return rows;
}

function renderPropAnalysis() {
  const market = parseMarket();
  const player = state.propPlayers.find(p => String(p.id) === String($("propPlayerSelect").value)) || DEMO_PLAYERS[0];
  const line = state.propLine;
  const rows = state.propLogs || [];
  const overs = rows.filter(r => r.value > line).length;
  const unders = rows.filter(r => r.value < line).length;
  const pushes = rows.filter(r => r.value === line).length;
  const pct = n => rows.length ? `${Math.round((n / rows.length) * 100)}%` : "—";

  const propHero = $("propHero");
  if (propHero) {
    propHero.innerHTML = `
      <img class="avatar" src="${player.img || CDN_HEADSHOT(player.id)}" alt="${escapeAttr(player.name)}" onerror="this.src='${genericAvatar(player.name)}'" />
      <div>
        <strong>${escapeHTML(player.name)} · ${escapeHTML(market.label)} prop graph</strong>
        <p class="muted">Line ${line}. Drag the chart line to test over/under by game, then copy your chosen market to the TAB.nz manual slip.</p>
      </div>`;
  }

  $("propSummary").innerHTML = `
    <article><span>Games</span><strong>${rows.length || "—"}</strong><small>${escapeHTML(player.name)} · ${escapeHTML(market.label)}</small></article>
    <article><span>Over hit rate</span><strong>${pct(overs)}</strong><small>${overs} over ${line}</small></article>
    <article><span>Under hit rate</span><strong>${pct(unders)}</strong><small>${unders} under ${line}</small></article>
    <article><span>Pushes</span><strong>${pushes}</strong><small>equal to line</small></article>
  `;

  $("propLogTable").innerHTML = rows.map(r => {
    const result = r.value > line ? "OVER" : r.value < line ? "UNDER" : "PUSH";
    const cls = result === "OVER" ? "result-over" : result === "UNDER" ? "result-under" : "result-push";
    return `<tr>
      <td>${escapeHTML(r.date)}</td>
      <td>${escapeHTML(r.opponent)}</td>
      <td>${escapeHTML(r.team)}</td>
      <td><strong>${r.value}</strong> ${escapeHTML(market.label)}</td>
      <td>${line}</td>
      <td class="${cls}">${result}</td>
      <td>${propNote(result, r.value, line, market)}</td>
    </tr>`;
  }).join("") || `<tr><td colspan="7">No game logs loaded yet. Click “Load prop graph.”</td></tr>`;
  drawPropChart();
}

function propNote(result, value, line, market) {
  if (result === "OVER") return `${market.label} cleared the line by ${(value - line).toFixed(1)}.`;
  if (result === "UNDER") return `${market.label} missed the line by ${(line - value).toFixed(1)}.`;
  return "Push / exact line.";
}

function drawPropChart() {
  const canvas = $("propChart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const cssWidth = canvas.clientWidth || 1200;
  const cssHeight = canvas.clientHeight || 460;
  if (canvas.width !== Math.floor(cssWidth * dpr) || canvas.height !== Math.floor(cssHeight * dpr)) {
    canvas.width = Math.floor(cssWidth * dpr);
    canvas.height = Math.floor(cssHeight * dpr);
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const width = cssWidth;
  const height = cssHeight;
  const pad = state.propChart.padding;
  const rows = state.propLogs || [];
  const market = parseMarket();
  const player = state.propPlayers.find(p => String(p.id) === String($("propPlayerSelect").value)) || DEMO_PLAYERS[0];
  const maxValue = Math.max(10, ...rows.map(r => r.value), state.propLine + 2);
  const minY = 0;
  const maxY = Math.ceil(maxValue + 1);
  state.propChart.minY = minY;
  state.propChart.maxY = maxY;

  ctx.clearRect(0, 0, width, height);
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#17051f");
  bgGrad.addColorStop(.52, "#100318");
  bgGrad.addColorStop(1, "#07010f");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const xFor = i => pad.left + (rows.length <= 1 ? plotW / 2 : (i / (rows.length - 1)) * plotW);
  const yFor = val => pad.top + (1 - (val - minY) / (maxY - minY)) * plotH;

  ctx.strokeStyle = "rgba(255,255,255,.12)";
  ctx.lineWidth = 1;
  ctx.fillStyle = "rgba(255,248,255,.62)";
  ctx.font = "12px Inter, system-ui, sans-serif";
  for (let y = 0; y <= maxY; y += Math.max(1, Math.ceil(maxY / 6))) {
    const yy = yFor(y);
    ctx.beginPath();
    ctx.moveTo(pad.left, yy);
    ctx.lineTo(width - pad.right, yy);
    ctx.stroke();
    ctx.fillText(String(y), 12, yy + 4);
  }

  const lineGrad = ctx.createLinearGradient(pad.left, 0, width - pad.right, 0);
  lineGrad.addColorStop(0, "#feda75");
  lineGrad.addColorStop(.25, "#fa7e1e");
  lineGrad.addColorStop(.5, "#d62976");
  lineGrad.addColorStop(.75, "#962fbf");
  lineGrad.addColorStop(1, "#4f5bd5");
  ctx.strokeStyle = lineGrad;
  ctx.lineWidth = 2;
  ctx.beginPath();
  rows.forEach((r, i) => {
    const x = xFor(i), y = yFor(r.value);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  if (rows.length) ctx.stroke();

  rows.forEach((r, i) => {
    const x = xFor(i), y = yFor(r.value);
    ctx.beginPath();
    ctx.fillStyle = r.value > state.propLine ? "#ff4fb0" : r.value < state.propLine ? "#fa7e1e" : "#feda75";
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
  });

  const lineY = yFor(state.propLine);
  ctx.strokeStyle = "#feda75";
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 6]);
  ctx.beginPath();
  ctx.moveTo(pad.left, lineY);
  ctx.lineTo(width - pad.right, lineY);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "#feda75";
  ctx.font = "700 13px Inter, system-ui, sans-serif";
  ctx.fillText(`Line ${state.propLine}`, width - pad.right - 88, lineY - 8);

  ctx.fillStyle = "#fff8ff";
  ctx.font = "700 18px Inter, system-ui, sans-serif";
  ctx.fillText(`${player.name} — ${market.label} per game`, pad.left, 24);
  ctx.fillStyle = "rgba(255,255,255,.75)";
  ctx.font = "12px Inter, system-ui, sans-serif";
  ctx.fillText("Drag the glowing horizontal line to change the betting line", pad.left, 43);
  ctx.fillStyle = "rgba(255,255,255,.65)";
  ctx.font = "12px Inter, system-ui, sans-serif";
  rows.forEach((r, i) => {
    if (i % Math.max(1, Math.ceil(rows.length / 8)) === 0 || i === rows.length - 1) {
      const x = xFor(i);
      ctx.save();
      ctx.translate(x, height - 18);
      ctx.rotate(-Math.PI / 5);
      ctx.fillText(r.date.slice(5), -10, 0);
      ctx.restore();
    }
  });

  if (!rows.length) {
    ctx.fillStyle = "rgba(255,255,255,.65)";
    ctx.font = "16px Inter, system-ui, sans-serif";
    ctx.fillText("No game logs loaded yet. Click Load prop graph.", pad.left, height / 2);
  }
}

function bindChartDragging() {
  const canvas = $("propChart");
  const handle = event => {
    if (!state.propDragging) return;
    const rect = canvas.getBoundingClientRect();
    const y = event.clientY - rect.top;
    const pad = state.propChart.padding;
    const plotH = rect.height - pad.top - pad.bottom;
    const ratio = Math.max(0, Math.min(1, (y - pad.top) / plotH));
    const value = state.propChart.maxY - ratio * (state.propChart.maxY - state.propChart.minY);
    state.propLine = Math.max(0, Math.round(value * 2) / 2);
    $("propLineInput").value = state.propLine.toFixed(1).replace(".0", "");
    renderPropAnalysis();
  };
  canvas.addEventListener("pointerdown", event => {
    state.propDragging = true;
    canvas.setPointerCapture(event.pointerId);
    handle(event);
  });
  canvas.addEventListener("pointermove", handle);
  canvas.addEventListener("pointerup", event => {
    state.propDragging = false;
    canvas.releasePointerCapture(event.pointerId);
  });
  canvas.addEventListener("pointerleave", () => { state.propDragging = false; });
  window.addEventListener("resize", drawPropChart);
}


window.openPropLabForPlayer = function(playerId, playerName, position) {
  const existing = state.propPlayers.find(p => String(p.id) === String(playerId));
  if (!existing) {
    mergePropPlayers([{id: playerId, name: playerName, position: position || "—", team: selectedTeam()?.name || "MLB", img: CDN_HEADSHOT(playerId), hitting: null, pitching: null}]);
  }
  $("propPlayerSelect").value = playerId;
  $("propPlayerSearch").value = playerName || "";
  const isPitcher = String(position || "").toUpperCase() === "P" || existing?.pitching;
  $("propMarket").value = isPitcher ? "pitching:Strikeouts:strikeOuts" : "hitting:Hits:hits";
  $("propLineInput").value = isPitcher ? "5.5" : "1.5";
  state.propLine = number($("propLineInput").value);
  openTab("props");
  loadPropGraph();
};

function addSlip() {
  const market = $("marketInput").value.trim();
  const odds = number($("oddsInput").value);
  const stake = number($("stakeInput").value);
  if (!market || odds < 1 || stake <= 0) return alert("Enter market, decimal odds, and stake.");
  state.slip.push({market, odds, stake, createdAt: new Date().toISOString()});
  localStorage.setItem("mlbSlip", JSON.stringify(state.slip));
  $("marketInput").value = $("oddsInput").value = $("stakeInput").value = "";
  renderSlip();
}

function renderSlip() {
  $("slipList").innerHTML = state.slip.map((s, i) => {
    const payout = s.odds * s.stake;
    const profit = payout - s.stake;
    return `<div class="slip-item">
      <div class="brand-mark" style="width:42px;height:42px;font-size:20px">TAB</div>
      <div><strong>${escapeHTML(s.market)}</strong><small class="muted">Odds ${s.odds.toFixed(2)} · Stake $${s.stake.toFixed(2)} · Return $${payout.toFixed(2)} · Profit $${profit.toFixed(2)}</small></div>
      <button class="small" onclick="removeSlip(${i})">Remove</button>
    </div>`;
  }).join("") || `<p class="muted">Copy the odds from TAB.nz manually, then add your market here.</p>`;
}

window.removeSlip = function(i) {
  state.slip.splice(i, 1);
  localStorage.setItem("mlbSlip", JSON.stringify(state.slip));
  renderSlip();
};

function saveSnapshot() {
  const team = selectedTeam();
  const snapshot = {
    team: team?.name || "Unknown team",
    season: season(),
    date: new Date().toISOString(),
    players: state.players.map(p => ({name:p.name, position:p.position, hitting:p.hitting, pitching:p.pitching}))
  };
  state.snapshots.unshift(snapshot);
  state.snapshots = state.snapshots.slice(0, 10);
  localStorage.setItem("mlbSnapshots", JSON.stringify(state.snapshots));
  renderSnapshots();
}

function renderSnapshots() {
  $("snapshotList").innerHTML = state.snapshots.map(s => `<div class="snapshot-item">
    <div class="brand-mark" style="width:42px;height:42px;font-size:20px">💾</div>
    <div><strong>${escapeHTML(s.team)} · ${escapeHTML(s.season)}</strong><small class="muted">${new Date(s.date).toLocaleString()} · ${s.players.length} players saved locally</small></div>
    <span class="tag">snapshot</span>
  </div>`).join("") || `<p class="muted">No local snapshots yet.</p>`;
}

function loadDemo() {
  state.teams = FALLBACK_TEAMS;
  state.players = DEMO_PLAYERS;
  state.games = [
    {date:new Date().toISOString(), away:"New York Yankees", home:"Tampa Bay Rays", awayPitcher:"TBA", homePitcher:"TBA", status:"Scheduled"},
    {date:new Date().toISOString(), away:"Toronto Blue Jays", home:"San Francisco Giants", awayPitcher:"TBA", homePitcher:"TBA", status:"Scheduled"},
    {date:new Date().toISOString(), away:"Colorado Rockies", home:"Los Angeles Dodgers", awayPitcher:"TBA", homePitcher:"TBA", status:"Scheduled"}
  ];
  renderTeams(FALLBACK_TEAMS);
  renderGames();
  mergePropPlayers(DEMO_PLAYERS);
  state.propLogs = DEMO_GAME_LOGS["624133:pitching:2026"] || DEMO_GAME_LOGS["624133:pitching:2026"];
  renderAllPlayerViews();
  renderPropAnalysis();
}

function rosterRows() {
  return state.players.map(p => ({
    name:p.name, position:p.position, team:p.team,
    games:p.hitting?.gamesPlayed || p.pitching?.gamesPitched || "", hits:p.hitting?.hits || "", home_runs:p.hitting?.homeRuns || "", rbi:p.hitting?.rbi || "", batting_strikeouts:p.hitting?.strikeOuts || "", avg:p.hitting?.avg || "", ops:p.hitting?.ops || "",
    pitching_k:p.pitching?.strikeOuts || "", era:p.pitching?.era || "", whip:p.pitching?.whip || "", innings:p.pitching?.inningsPitched || ""
  }));
}

function gameRows() {
  return state.games.map(g => ({time:g.date, away:g.away, home:g.home, away_pitcher:g.awayPitcher, home_pitcher:g.homePitcher, status:g.status, score:scoreText(g)}));
}

function exportCSV(filename, rows) {
  if (!rows.length) return alert("No rows to export.");
  const headers = Object.keys(rows[0]);
  const csv = [headers.join(","), ...rows.map(row => headers.map(h => JSON.stringify(row[h] ?? "")).join(","))].join("\n");
  const blob = new Blob([csv], {type:"text/csv"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function emptyState() {
  return $("emptyStateTemplate").innerHTML;
}

function genericAvatar(name) {
  const initials = escapeHTML((name || "MLB").split(" ").map(x => x[0]).join("").slice(0,2));
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='150' height='150'><rect width='100%' height='100%' rx='24' fill='%2317051f'/><text x='50%' y='55%' text-anchor='middle' fill='%23d62976' font-size='46' font-family='Arial' font-weight='700'>${initials}</text></svg>`;
  return `data:image/svg+xml,${svg}`;
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"]/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[ch]));
}

function escapeAttr(value) {
  return escapeHTML(value).replace(/'/g, "&#39;");
}

init();
