// ============================================
// ЯНДЕКС ФОРМА — ВСТРАИВАНИЕ В САЙТ
// ============================================

(function () {
    const FORM_IFRAME_SRC = "https://forms.yandex.ru/u/696370c790fa7b948e40d55e?iframe=1";
    const FORM_NAME = "ya-form-696370c790fa7b948e40d55e";
    const EMBED_SCRIPT_SRC = "https://forms.yandex.ru/_static/embed.js";

    function loadScriptOnce(src) {
        return new Promise((resolve, reject) => {
            // если уже загружали — не грузим повторно
            const existing = document.querySelector(`script[src="${src}"]`);
            if (existing) return resolve();

            const s = document.createElement("script");
            s.src = src;
            s.async = true;
            s.onload = () => resolve();
            s.onerror = () => reject(new Error("Не удалось загрузить скрипт: " + src));
            document.head.appendChild(s);
        });
    }

    function mountYandexForm() {
        const container = document.getElementById("ya-form-container");
        if (!container) return;

        // очищаем на всякий случай
        container.innerHTML = "";

        const iframe = document.createElement("iframe");
        iframe.src = FORM_IFRAME_SRC;
        iframe.name = FORM_NAME;
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("title", "Опрос для гостей");

        container.appendChild(iframe);
    }

    document.addEventListener("DOMContentLoaded", async () => {
        try {
            await loadScriptOnce(EMBED_SCRIPT_SRC);
        } catch (e) {
            // даже если embed.js не загрузится, iframe всё равно покажется
            console.warn(e);
        }
        mountYandexForm();
    });
})();
