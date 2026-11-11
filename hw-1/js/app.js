import { matches, matchEvents, players, standings } from "./data.js";
import {
    renderMatchGroups,
    renderMatchRows,
    renderPlayers,
    renderStandings,
    renderTimeline,
} from "./ui.js";

function initDashboard() {
    const recentMatches = document.querySelector('[data-js="recent-matches"]');
    if (!recentMatches) return;

    const completedMatches = matches.filter((match) => match.score !== null).slice(0, 3);
    renderMatchRows(recentMatches, completedMatches);
}

function initMatches() {
    const container = document.querySelector('[data-js="matches-list"]');
    const buttons = document.querySelectorAll("[data-match-filter]");
    if (!container || buttons.length === 0) return;

    const applyFilter = (filter) => {
        const filteredMatches = filter === "all"
            ? matches
            : matches.filter((match) => match.day === filter);

        renderMatchGroups(container, filteredMatches);
    };

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            buttons.forEach((item) => item.classList.remove("filter--active"));
            button.classList.add("filter--active");
            applyFilter(button.dataset.matchFilter);
        });
    });

    applyFilter("today");
}

function initStandings() {
    const tableBody = document.querySelector('[data-js="standings-body"]');
    const form = document.querySelector('[data-js="team-search-form"]');
    const input = document.querySelector('[data-js="team-search-input"]');
    if (!tableBody || !form || !input) return;

    const filterTeams = () => {
        const query = input.value.trim().toLowerCase();
        const filteredTeams = standings.filter((team) =>
            team.name.toLowerCase().includes(query),
        );
        renderStandings(tableBody, filteredTeams);
    };

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        filterTeams();
    });

    input.addEventListener("input", filterTeams);
    renderStandings(tableBody, standings);
}

function initMatch() {
    const timeline = document.querySelector('[data-js="timeline"]');
    const favoriteButton = document.querySelector('[data-js="favorite-button"]');
    if (!timeline || !favoriteButton) return;

    let isFavorite = false;
    renderTimeline(timeline, matchEvents);

    favoriteButton.addEventListener("click", () => {
        isFavorite = !isFavorite;
        favoriteButton.classList.toggle("favorite-button--active", isFavorite);
        favoriteButton.setAttribute("aria-pressed", String(isFavorite));
        favoriteButton.textContent = isFavorite
            ? "★ Матч в избранном"
            : "☆ Добавить в избранное";
    });
}

function initPlayers() {
    const container = document.querySelector('[data-js="players-list"]');
    const form = document.querySelector('[data-js="player-search-form"]');
    const input = document.querySelector('[data-js="player-search-input"]');
    const message = document.querySelector('[data-js="player-search-message"]');
    if (!container || !form || !input || !message) return;

    const searchPlayers = () => {
        const query = input.value.trim().toLowerCase();
        const filteredPlayers = players.filter((player) =>
            `${player.name} ${player.club}`.toLowerCase().includes(query),
        );

        renderPlayers(container, filteredPlayers);
        message.textContent = query
            ? `Найдено игроков: ${filteredPlayers.length}`
            : `Всего игроков: ${players.length}`;
    };

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        searchPlayers();
    });

    input.addEventListener("input", searchPlayers);
    renderPlayers(container, players);
    message.textContent = `Всего игроков: ${players.length}`;
}

const pageInitializers = {
    dashboard: initDashboard,
    matches: initMatches,
    standings: initStandings,
    match: initMatch,
    players: initPlayers,
};

const currentPage = document.body.dataset.page;
pageInitializers[currentPage]?.();
