(() => {
    const container = document.querySelector(".wedding-invitation");
    const layer = document.querySelector(".decor-layer");
    if (!container || !layer) return;

    // ----- SVG шаблоны -----
    const lineSvgs = [
        `
    <svg viewBox="0 0 185 185" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.14497 2.51447C17.5848 -2.76898 52.3469 -0.890427 51.8766 48.8914C51.6806 73.9389 79.6692 126.417 118.145 102.5C136.645 90.9999 173.799 137.536 184.145 184.5"
            fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `,
        `
    <svg viewBox="0 0 127 162" xmlns="http://www.w3.org/2000/svg">
      <path d="M126.269 6.09261C119.269 1.09261 43.2391 -12.6892 42.7688 37.0926C42.5729 62.1401 93.792 67.4958 65.769 103.093C28.7689 150.093 -8.07739 114.129 2.26893 161.093"
            fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `,
        `
    <svg viewBox="0 0 231 43" xmlns="http://www.w3.org/2000/svg">
      <path d="M230.415 38.4843C223.415 33.4843 200.915 -18.5157 165.415 7.98428C140.915 24.4843 131.938 -6.61253 103.915 28.9843C66.9152 75.9843 25.9152 -21.0157 0.415183 16.9843"
            fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `
    ];

    const rareSvg1 = `
    <svg viewBox="0 0 136 124" xmlns="http://www.w3.org/2000/svg">
      <circle cx="63" cy="60" r="19.5" fill="none" stroke="currentColor" stroke-width="3"/>
      <path d="M62.5 36C60.1667 35 56 31.5 58 25.5C60.5 18 61 15 59.5 12C58 9 56.5 0.5 58 0.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M78 40C81.1667 39 87.4 36.1 87 32.5C86.5 28 91.2519 22.3321 92.5 21.5C94 20.5 104 15.5 104 12" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M70.5 37.5L77 17.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M66.4018 84.1473C68.8249 84.9042 73.3268 87.9611 71.949 94.1337C70.2268 101.85 70.0353 104.885 71.8334 107.716C73.6315 110.548 75.9904 118.85 74.4982 119.003" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M50.5747 81.7487C47.5265 83.0664 41.6214 86.5869 42.3864 90.1273C43.3426 94.5529 39.1934 100.676 38.0367 101.631C36.6465 102.779 27.2085 108.772 27.5654 112.254" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M58.2906 83.4709L53.8638 104.029" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M86.7295 50.0415C86.7004 47.5031 88.2162 42.2769 94.5125 41.6793C102.383 40.9324 105.329 40.1763 107.466 37.5912C109.603 35.006 116.77 30.1964 117.377 31.5682" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M89.3402 65.835C91.5355 68.3267 96.7087 72.8546 99.8394 71.0327C103.753 68.7555 110.858 70.809 112.124 71.614C113.645 72.5814 122.262 79.7048 125.463 78.2892" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M88.5932 57.9647L109.513 55.8205" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M37.9924 63.6677C37.1383 66.0583 33.902 70.4329 27.79 68.8068C20.1501 66.7743 17.1249 66.4603 14.2232 68.1425C11.3214 69.8247 2.93015 71.8462 2.83762 70.349" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M41.0286 47.9505C39.8352 44.8515 36.5562 38.809 32.9877 39.4303C28.5272 40.2069 22.5769 35.8137 21.6694 34.6193C20.5788 33.1838 14.9714 23.5113 11.4781 23.7272" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M38.9961 55.5904L18.6332 50.3365" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M80 79C82.1667 82.8333 87.8 90.8 93 92C99.5 93.5 106 100.5 107.5 105C108.7 108.6 111 110.167 112 110.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M42.3528 74.944C38.3338 76.7429 29.8755 81.607 28.1947 86.6721C26.0938 93.0034 18.517 98.8208 13.8965 99.8937C10.2001 100.752 8.42533 102.895 8 103.86" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M49.2856 39.0701C47.5269 35.0332 42.7476 26.5268 37.6996 24.7955C31.3895 22.6314 25.6482 14.9968 24.6216 10.3658C23.8003 6.66098 21.6746 4.86488 20.7144 4.42993" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

    const rareSvg2 = `
    <svg viewBox="0 0 158 98" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.3775 35.5725C-3.82251 49.1725 7.87749 58.9058 15.8775 62.0725C17.0775 75.6725 27.7108 74.7391 32.8775 72.5725C33.6775 80.9725 40.5442 83.0725 43.8775 83.0725C54.6775 83.8725 61.3775 78.7391 63.3775 76.0725C70.9775 91.2725 97.5442 90.0725 109.877 87.5725C134.677 83.5725 135.544 68.5725 132.877 61.5725C144.877 63.5725 150.877 54.7391 152.377 50.0725C156.377 39.2725 147.711 33.5725 142.877 32.0725C151.677 21.6725 141.877 10.4058 135.877 6.07246C123.877 -3.12754 113.544 3.57245 109.877 8.07245C101.477 -6.32755 94.0442 3.07245 91.3775 9.57245C90.1775 1.17245 87.2108 4.73912 85.8775 7.57246C77.0775 -3.22754 67.8775 5.73912 64.3775 11.5725C49.5775 -2.42755 36.5442 8.73912 31.8775 16.0725C15.4775 18.8725 14.7108 28.5725 16.3775 33.0725C13.9775 32.6725 13.3775 34.5725 13.3775 35.5725Z"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
    </svg>
  `;

    function pickWeighted() {
        const r = Math.random();
        if (r < 0.80) return lineSvgs[Math.floor(Math.random() * lineSvgs.length)];
        if (r < 0.93) return rareSvg1;
        return rareSvg2;
    }

    // ----- размещение без пересечений -----
    function rectsIntersect(a, b, gap = 10) {
        return !(
            a.x + a.w + gap < b.x ||
            b.x + b.w + gap < a.x ||
            a.y + a.h + gap < b.y ||
            b.y + b.h + gap < a.y
        );
    }

    function build() {
        layer.innerHTML = "";

        const { width: W, height: H } = container.getBoundingClientRect();

        // Настройки
        const COUNT = 60;          // сколько всего
        const MIN_SIZE = 100;      // px
        const MAX_SIZE = 180;      // px
        const MIN_OP = 0.05;
        const MAX_OP = 0.06;
        const MAX_TRIES = 120;     // попыток на один элемент
        const GAP = 20;            // "воздух" между фигурами

        const placed = []; // {x,y,w,h}

        for (let i = 0; i < COUNT; i++) {
            const size = Math.random() * (MAX_SIZE - MIN_SIZE) + MIN_SIZE;

            // bbox берём как квадрат size x size (достаточно для декоративного размещения)
            let rect = null;

            for (let t = 0; t < MAX_TRIES; t++) {
                const x = Math.random() * (W - size);
                const y = Math.random() * (H - size);

                const candidate = { x, y, w: size, h: size };

                let ok = true;
                for (const p of placed) {
                    if (rectsIntersect(candidate, p, GAP)) {
                        ok = false;
                        break;
                    }
                }

                if (ok) {
                    rect = candidate;
                    break;
                }
            }

            // Если не нашли место — просто пропускаем (иначе начнутся пересечения)
            if (!rect) continue;

            placed.push(rect);

            const wrapper = document.createElement("div");
            wrapper.innerHTML = pickWeighted().trim();
            const svg = wrapper.firstElementChild;

            const rotate = Math.random() * 360;
            const opacity = Math.random() * (MAX_OP - MIN_OP) + MIN_OP;

            svg.style.position = "absolute";
            svg.style.width = `${rect.w}px`;
            svg.style.left = `${rect.x}px`;
            svg.style.top = `${rect.y}px`;
            svg.style.transform = `rotate(${rotate}deg)`;
            svg.style.opacity = opacity;
            svg.style.color = "#4E170B";
            svg.style.pointerEvents = "none";

            layer.appendChild(svg);
        }
    }

    // Перестраиваем при загрузке и ресайзе (аккуратно)
    let resizeTimer = null;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(build, 150);
    });

    // Если высота контейнера меняется (контент прогрузился) — пересоберём чуть позже
    window.addEventListener("load", () => setTimeout(build, 0));

    // старт
    build();
})();
