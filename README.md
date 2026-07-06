# MLB Baseball Betting DataHub v3

A static website prototype for MLB baseball betting research with an Instagram-style gradient UI. It is built for research and manual TAB.nz odds entry only — it does not scrape TAB.nz and it does not place bets.

## Highlights

- Instagram-style dark glass dashboard with pink / orange / purple / blue gradients.
- MLB teams, schedules, rosters, player cards, player images, and lineup-style position tables.
- Hitting stats: games, hits, home runs, RBI, batting strikeouts, AVG, OPS, total bases.
- Pitching stats: pitcher strikeouts, ERA, WHIP, innings pitched.
- Betting Lens ranking to find players worth researching.
- TAB.nz manual odds slip calculator. Copy odds from TAB.nz yourself; no odds API is required.
- CSV exports for game board and selected roster.
- Historical Vault for older seasons and local snapshots.

## Player Prop Lab

Use this for the exact workflow requested:

1. Search or select a player, for example `Ranger Suarez`.
2. Choose a prop market, for example `Pitcher strikeouts`.
3. Click `Load prop graph`.
4. A game-by-game line graph appears.
5. Drag the glowing horizontal betting line, or type a line such as `4.5`, `5.5`, or `6.5`.
6. The table and summary cards update immediately with `OVER`, `UNDER`, or `PUSH` per game.
7. Use the manual TAB.nz odds slip to record the market, odds, and stake.

Player cards and lineup-table rows now include a `Prop graph` button, so you can jump straight from a player to the graph.

## Data sources used in the frontend

- MLB Stats API base: `https://statsapi.mlb.com/api/v1`
- Teams: `/teams?sportIds=1&activeStatus=Y`
- Schedule: `/schedule?sportId=1&date=YYYY-MM-DD&hydrate=probablePitcher,linescore,team,lineups`
- Rosters: `/teams/{teamId}/roster?rosterType=active|40Man|fullSeason&season=YYYY`
- Player season stats: `/people/{playerId}?hydrate=stats(group=[hitting,pitching],type=[season],season=YYYY)`
- Player game logs: `/people/{playerId}?hydrate=stats(group=pitching|hitting,type=gameLog,season=YYYY)`
- Player images: MLBAM player ID headshot URL pattern with a generated fallback avatar.

## Run locally

For best results, run it from a local server instead of double-clicking the file:

```bash
cd mlb_betting_datahub
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Recommended production architecture

A browser-only prototype can show and analyze data, but a real “collect all past and present data” product should use a backend collector and database:

```text
Frontend dashboard
  -> API backend / collector service
      -> PostgreSQL
          teams
          players
          player_seasons
          games
          lineups
          player_game_stats
          pitching_game_logs
          batting_game_logs
          injuries
          probable_pitchers
          manual_tab_odds
```

Suggested collector jobs:

- Morning: schedules, probable pitchers, standings.
- Pre-game: confirmed lineups close to first pitch.
- In-game: live status, score, box score, pitch/game data.
- Post-game: final player game logs and team results.
- Historical backfill: every season you want to store locally.

## Betting-safe design notes

- This is for research, not guaranteed picks.
- Manual odds are safer than scraping bookmaker pages.
- Add bankroll rules before using real money.
- For public/commercial launch, check MLB data terms and image licensing.
