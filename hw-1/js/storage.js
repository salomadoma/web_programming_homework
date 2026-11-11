// Работа с Local Storage API отделена от интерфейса.
export const FAVORITES_KEY = "kickboard:favorites";
const STORAGE_VERSION = 1;

const getBrowserStorage = () => window.localStorage;

export function readFavorites(validIds, getStorage = getBrowserStorage) {
    try {
        const storage = getStorage();
        if (!storage) throw new Error("Storage unavailable");

        const raw = storage.getItem(FAVORITES_KEY);
        if (raw === null) return { ids: [], message: "" };

        const saved = JSON.parse(raw);
        if (
            saved?.version !== STORAGE_VERSION ||
            !Array.isArray(saved.ids) ||
            !saved.ids.every(Number.isInteger)
        ) {
            return {
                ids: [],
                message: "Сохранённое избранное повреждено или устарело. Выберите матчи заново.",
            };
        }

        // Убираем дубликаты и матчи, которых больше нет в данных приложения.
        return {
            ids: [...new Set(saved.ids)].filter((id) => validIds.includes(id)),
            message: "",
        };
    } catch (error) {
        return {
            ids: [],
            message: error instanceof SyntaxError
                ? "Не удалось прочитать сохранённое избранное. Выберите матчи заново."
                : "Хранилище браузера недоступно. Избранное будет работать до перезагрузки страницы.",
        };
    }
}

export function writeFavorites(ids, getStorage = getBrowserStorage) {
    try {
        const storage = getStorage();
        if (!storage) throw new Error("Storage unavailable");

        if (ids.length === 0) {
            storage.removeItem(FAVORITES_KEY);
        } else {
            storage.setItem(FAVORITES_KEY, JSON.stringify({ version: STORAGE_VERSION, ids }));
        }
        return "";
    } catch (error) {
        return error.name === "QuotaExceededError"
            ? "В хранилище браузера нет места. Текущий выбор работает, но после перезагрузки может потеряться."
            : "Не удалось сохранить избранное. Текущий выбор работает, но после перезагрузки может потеряться.";
    }
}
