import { featuredMatch, matches } from "./data.js";
import { FAVORITES_KEY, readFavorites, writeFavorites } from "./storage.js";
import { renderMatchRows } from "./ui.js";

const availableMatches = [...matches, featuredMatch];
const validIds = availableMatches.map((match) => match.id);
let favoriteIds = [];
let statusMessage = null;
let clearButton = null;

export function refreshFavorites() {
    const list = document.querySelector('[data-js="favorites-list"]');
    if (list) {
        const selected = availableMatches.filter((match) => favoriteIds.includes(match.id));
        if (selected.length > 0) {
            renderMatchRows(list, selected, { withFavorites: true });
        } else {
            const empty = document.createElement("p");
            empty.className = "empty-state";
            empty.textContent = "Пока нет избранных матчей. Откройте «Матчи» и нажмите звёздочку.";
            list.replaceChildren(empty);
        }
    }

    document.querySelectorAll("[data-favorite-id]").forEach((button) => {
        const selected = favoriteIds.includes(Number(button.dataset.favoriteId));
        button.classList.toggle("favorite-button--active", selected);
        button.setAttribute("aria-pressed", String(selected));
        button.textContent = selected ? "★ В избранном" : "☆ В избранное";
        button.setAttribute("aria-label", `${selected ? "Убрать из избранного" : "Добавить в избранное"}: ${button.dataset.matchName}`);
    });

    const count = document.querySelector('[data-js="favorites-count"]');
    if (count) count.textContent = `Матчей: ${favoriteIds.length}`;
    if (clearButton) clearButton.disabled = favoriteIds.length === 0;
}

export function initFavorites() {
    if (!document.querySelector('[data-favorite-id], [data-js="favorites-list"]')) return;

    const loaded = readFavorites(validIds);
    favoriteIds = loaded.ids;
    statusMessage = document.createElement("p");
    statusMessage.className = "storage-message";
    statusMessage.setAttribute("role", "status");
    document.querySelector(".topbar").after(statusMessage);

    function showMessage(message, isError = false) {
        statusMessage.textContent = message;
        statusMessage.hidden = !message;
        statusMessage.classList.toggle("storage-message--error", isError);
    }

    function saveAndRender(successMessage) {
        const errorMessage = writeFavorites(favoriteIds);
        // Даже при ошибке записи обновляем интерфейс и сохраняем выбор в памяти.
        refreshFavorites();
        showMessage(errorMessage || successMessage, Boolean(errorMessage));
    }

    document.addEventListener("click", (event) => {
        const button = event.target.closest("[data-favorite-id]");
        if (!button) return;

        const id = Number(button.dataset.favoriteId);
        if (!validIds.includes(id)) return;

        const wasSelected = favoriteIds.includes(id);
        favoriteIds = wasSelected
            ? favoriteIds.filter((item) => item !== id)
            : [...favoriteIds, id];
        saveAndRender(wasSelected ? "Матч удалён из избранного." : "Матч добавлен в избранное.");
    });

    clearButton = document.querySelector('[data-js="clear-favorites"]');
    clearButton?.addEventListener("click", () => {
        favoriteIds = [];
        saveAndRender("Избранное очищено.");
    });

    // Изменения в другой вкладке этого же сайта обновляют текущую страницу.
    window.addEventListener("storage", (event) => {
        if (event.key !== FAVORITES_KEY && event.key !== null) return;
        const updated = readFavorites(validIds);
        favoriteIds = updated.ids;
        refreshFavorites();
        showMessage(updated.message || "Избранное обновлено в другой вкладке.", Boolean(updated.message));
    });

    refreshFavorites();
    const initialHint = document.body.dataset.page === "match"
        ? "Избранные матчи сохраняются в этом браузере."
        : "";
    showMessage(loaded.message || initialHint, Boolean(loaded.message));
}
