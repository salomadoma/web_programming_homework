export const matches = [
    {
        id: 1,
        day: "today",
        league: "Premier League",
        country: "Англия",
        leagueCode: "PL",
        time: "19:30",
        home: { name: "Arsenal", code: "ARS", color: "red" },
        away: { name: "Chelsea", code: "CHE", color: "blue" },
        score: null,
    },
    {
        id: 2,
        day: "today",
        league: "Premier League",
        country: "Англия",
        leagueCode: "PL",
        time: "21:45",
        home: { name: "Manchester City", code: "MCI", color: "sky" },
        away: { name: "Liverpool", code: "LIV", color: "dark" },
        score: null,
    },
    {
        id: 3,
        day: "today",
        league: "Champions League",
        country: "Европа",
        leagueCode: "CL",
        time: "22:00",
        home: { name: "Inter", code: "INT", color: "blue" },
        away: { name: "Barcelona", code: "BAR", color: "red" },
        score: null,
    },
    {
        id: 4,
        day: "tomorrow",
        league: "Premier League",
        country: "Англия",
        leagueCode: "PL",
        time: "18:00",
        home: { name: "Tottenham", code: "TOT", color: "dark" },
        away: { name: "Newcastle", code: "NEW", color: "dark" },
        score: null,
    },
    {
        id: 5,
        day: "yesterday",
        league: "Premier League",
        country: "Англия",
        leagueCode: "PL",
        time: "Завершён",
        home: { name: "Manchester City", code: "MCI", color: "sky" },
        away: { name: "Chelsea", code: "CHE", color: "blue" },
        score: "3 : 1",
    },
    {
        id: 6,
        day: "yesterday",
        league: "Premier League",
        country: "Англия",
        leagueCode: "PL",
        time: "Завершён",
        home: { name: "Manchester United", code: "MUN", color: "red" },
        away: { name: "Tottenham", code: "TOT", color: "dark" },
        score: "1 : 1",
    },
    {
        id: 7,
        day: "yesterday",
        league: "Champions League",
        country: "Европа",
        leagueCode: "CL",
        time: "Завершён",
        home: { name: "Real Madrid", code: "RMA", color: "gold" },
        away: { name: "Bayern", code: "BAY", color: "red" },
        score: "2 : 0",
    },
];

export const standings = [
    { position: 1, name: "Arsenal", code: "ARS", color: "red", games: 18, wins: 13, draws: 3, losses: 2, goals: "39–17", form: ["W", "W", "D"], points: 42 },
    { position: 2, name: "Manchester City", code: "MCI", color: "sky", games: 18, wins: 12, draws: 4, losses: 2, goals: "42–19", form: ["W", "W", "W"], points: 40 },
    { position: 3, name: "Liverpool", code: "LIV", color: "dark", games: 18, wins: 11, draws: 5, losses: 2, goals: "35–18", form: ["D", "W", "L"], points: 38 },
    { position: 4, name: "Chelsea", code: "CHE", color: "blue", games: 18, wins: 10, draws: 4, losses: 4, goals: "31–22", form: ["W", "L", "W"], points: 34 },
    { position: 5, name: "Newcastle", code: "NEW", color: "dark", games: 18, wins: 9, draws: 4, losses: 5, goals: "29–23", form: ["L", "W", "D"], points: 31 },
    { position: 6, name: "Tottenham", code: "TOT", color: "dark", games: 18, wins: 8, draws: 4, losses: 6, goals: "28–25", form: ["W", "D", "L"], points: 28 },
];

// Учебные таблицы: результаты не загружаются из спортивного сервиса.
export const leagues = [
    { id: "premier-league", name: "Premier League", teams: standings },
    {
        id: "la-liga", name: "La Liga", teams: [
            { position: 1, name: "Real Madrid", code: "RMA", color: "gold", games: 18, wins: 13, draws: 3, losses: 2, goals: "40–16", form: ["W", "D", "W"], points: 42 },
            { position: 2, name: "Barcelona", code: "BAR", color: "red", games: 18, wins: 12, draws: 4, losses: 2, goals: "38–18", form: ["W", "W", "D"], points: 40 },
            { position: 3, name: "Atletico Madrid", code: "ATM", color: "red", games: 18, wins: 11, draws: 3, losses: 4, goals: "32–21", form: ["L", "W", "W"], points: 36 },
            { position: 4, name: "Villarreal", code: "VIL", color: "gold", games: 18, wins: 9, draws: 5, losses: 4, goals: "30–22", form: ["D", "W", "L"], points: 32 },
        ],
    },
    {
        id: "serie-a", name: "Serie A", teams: [
            { position: 1, name: "Inter", code: "INT", color: "blue", games: 18, wins: 13, draws: 4, losses: 1, goals: "41–14", form: ["W", "W", "D"], points: 43 },
            { position: 2, name: "Napoli", code: "NAP", color: "sky", games: 18, wins: 12, draws: 3, losses: 3, goals: "34–18", form: ["W", "L", "W"], points: 39 },
            { position: 3, name: "Juventus", code: "JUV", color: "dark", games: 18, wins: 10, draws: 6, losses: 2, goals: "29–15", form: ["D", "W", "D"], points: 36 },
            { position: 4, name: "Milan", code: "MIL", color: "red", games: 18, wins: 10, draws: 4, losses: 4, goals: "31–23", form: ["W", "D", "L"], points: 34 },
        ],
    },
    {
        id: "bundesliga", name: "Bundesliga", teams: [
            { position: 1, name: "Bayern", code: "BAY", color: "red", games: 18, wins: 14, draws: 2, losses: 2, goals: "48–17", form: ["W", "W", "W"], points: 44 },
            { position: 2, name: "Bayer Leverkusen", code: "B04", color: "red", games: 18, wins: 12, draws: 4, losses: 2, goals: "39–20", form: ["W", "D", "W"], points: 40 },
            { position: 3, name: "Borussia Dortmund", code: "BVB", color: "gold", games: 18, wins: 11, draws: 3, losses: 4, goals: "35–23", form: ["L", "W", "D"], points: 36 },
            { position: 4, name: "RB Leipzig", code: "RBL", color: "dark", games: 18, wins: 9, draws: 5, losses: 4, goals: "32–24", form: ["D", "W", "L"], points: 32 },
        ],
    },
];

export const players = [
    { name: "Erling Haaland", club: "Manchester City", position: "Нападающий", number: "09", matches: 18, goals: 16, assists: 4, imageClass: "one" },
    { name: "Mohamed Salah", club: "Liverpool", position: "Нападающий", number: "11", matches: 18, goals: 14, assists: 7, imageClass: "two" },
    { name: "Bukayo Saka", club: "Arsenal", position: "Полузащитник", number: "07", matches: 17, goals: 11, assists: 8, imageClass: "three" },
];

export const matchEvents = [
    { minute: "12′", title: "Гол Arsenal.", description: "Быстрая атака через правый фланг." },
    { minute: "31′", title: "Жёлтая карточка Liverpool.", description: "Нарушение в центре поля." },
    { minute: "44′", title: "Гол Liverpool.", description: "Точный удар из штрафной." },
    { minute: "57′", title: "Гол Arsenal.", description: "Счёт становится 2:1." },
    { minute: "65′", title: "Замена в составе Arsenal.", description: "На поле выходит свежий полузащитник." },
];
