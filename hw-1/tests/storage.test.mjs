import test from "node:test";
import assert from "node:assert/strict";
import { FAVORITES_KEY, readFavorites, writeFavorites } from "../js/storage.js";

function createStorage(raw = null) {
    const items = new Map(raw === null ? [] : [[FAVORITES_KEY, raw]]);
    return {
        getItem: (key) => items.get(key) ?? null,
        setItem: (key, value) => items.set(key, value),
        removeItem: (key) => items.delete(key),
    };
}

test("первый запуск, запись, чтение и очистка избранного", () => {
    const storage = createStorage();
    const getStorage = () => storage;
    storage.setItem("another-app", "keep");
    assert.deepEqual(readFavorites([1, 2], getStorage), { ids: [], message: "" });
    assert.equal(writeFavorites([1, 2], getStorage), "");
    assert.deepEqual(readFavorites([1, 2], getStorage).ids, [1, 2]);
    assert.equal(writeFavorites([], getStorage), "");
    assert.equal(storage.getItem(FAVORITES_KEY), null);
    assert.equal(storage.getItem("another-app"), "keep");
});

test("повреждённые данные и неизвестная версия не ломают чтение", () => {
    for (const raw of ["{broken", "null", '{"version":1}', '{"version":1,"ids":["1"]}', '{"version":2,"ids":[1]}']) {
        const result = readFavorites([1], () => createStorage(raw));
        assert.deepEqual(result.ids, []);
        assert.ok(result.message);
    }
});

test("устаревшие id и дубликаты исключаются", () => {
    const storage = createStorage('{"version":1,"ids":[1,1,99]}');
    assert.deepEqual(readFavorites([1, 2], () => storage).ids, [1]);
});

test("отсутствие API или запрет доступа возвращают сообщение", () => {
    const denied = () => { throw new Error("Access denied"); };
    for (const getStorage of [() => undefined, denied]) {
        assert.ok(readFavorites([1], getStorage).message);
        assert.ok(writeFavorites([1], getStorage));
    }
});

test("ошибка квоты и ошибка удаления не выходят за пределы модуля", () => {
    const storage = createStorage();
    storage.setItem = () => { throw Object.assign(new Error("Full"), { name: "QuotaExceededError" }); };
    storage.removeItem = () => { throw new Error("Removal denied"); };
    assert.match(writeFavorites([1], () => storage), /нет места/);
    assert.ok(writeFavorites([], () => storage));
});
