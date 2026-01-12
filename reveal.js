    document.addEventListener('DOMContentLoaded', () => {
    const reduceMotion =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Элементы, которые анимируем по скроллу (шапку отдельно)
    const SELECTORS = [
    '.section-title',
    '.card',
    '.location-card',
    '.location-photo-card',
    '.request-card',
    '.map-links',
    '#yandex-map',
    '.timing-item'
    ].join(',');

    // Типы reveal (для твоих premium-reveal стилей)
    const getRevealType = (el) => {
    if (el.classList.contains('section-title')) return 'reveal--title';
    if (el.classList.contains('location-photo-card') || el.id === 'yandex-map') return 'reveal--media';
    if (el.classList.contains('card') || el.classList.contains('card--white') || el.classList.contains('request-card')) return 'reveal--card';
    return 'reveal--item';
};

    // 1) Назначаем reveal + stagger внутри секций (кроме header)
    const sections = document.querySelectorAll('.wedding-invitation > section');

    sections.forEach(section => {
    if (section.classList.contains('header-section')) return;

    const items = Array.from(section.querySelectorAll(SELECTORS));

    items.forEach((el, i) => {
    el.classList.add('reveal', getRevealType(el));
    el.style.setProperty('--reveal-delay', `${i * 90}ms`);
});

    // Премиум-каскад внутри карточек (текст/кнопки/таблицы)
    const cards = section.querySelectorAll('.card--white, .request-card, .location-card--white');
    cards.forEach(card => {
    const inner = card.querySelectorAll(
    'p, .map-links, .contact-buttons, .dress-dots, .calendar, .month-year'
    );
    let k = 0;
    inner.forEach(node => {
    if (node.classList.contains('reveal') || node.classList.contains('reveal-photo')) return;
    node.classList.add('reveal', 'reveal--item');
    node.style.setProperty('--reveal-delay', `${(k + 1) * 70}ms`);
    k++;
});
});
});

    // 2) Шапка: показываем "Мы женимся!" + дату + текст + сердце сразу, а фото — после загрузки с clip-mask
    const header = document.querySelector('.header-section');
    let headerPhotoImgs = [];

    if (header) {
    const burgundy = header.querySelector('.header-burgundy');

    if (burgundy) {
    // Эти элементы показываем сразу каскадом
    const headerTargets = Array.from(
    burgundy.querySelectorAll('.wedding-title, .wedding-date, .invitation-text, .heart-img')
    );

    headerTargets.forEach((el, i) => {
    el.classList.add('reveal', 'reveal--item');
    el.style.setProperty('--reveal-delay', `${i * 90}ms`);
});

    // Фото: clip-mask reveal
    headerPhotoImgs = Array.from(burgundy.querySelectorAll('.photos img'));
    headerPhotoImgs.forEach((img, idx) => {
    img.classList.add('reveal-photo');           // отдельный класс под clip-mask
    img.style.setProperty('--reveal-delay', `${idx * 100}ms`);
});
}
}

    // Собираем все элементы, которые анимируем наблюдателем
    const revealEls = document.querySelectorAll('.reveal');
    const photoEls  = document.querySelectorAll('.reveal-photo');

    if (reduceMotion) {
    revealEls.forEach(el => el.classList.add('in-view'));
    photoEls.forEach(el => el.classList.add('in-view'));
    return;
}

    // 3) Показ шапки при загрузке
    if (header) {
    // показываем текст/иконки из header-burgundy сразу
    const immediate = header.querySelectorAll(
    '.header-burgundy .wedding-title.reveal, ' +
    '.header-burgundy .wedding-date.reveal, ' +
    '.header-burgundy .invitation-text.reveal, ' +
    '.header-burgundy .heart-img.reveal'
    );

    immediate.forEach((el, i) => {
    setTimeout(() => el.classList.add('in-view'), i * 90);
});

    // фото — строго после загрузки, по очереди
    const showImg = (img) => img.classList.add('in-view');

    headerPhotoImgs.forEach((img, i) => {
    const delay = i * 110; // чуть “дороже”, чем 90
    const onReady = () => setTimeout(() => showImg(img), delay);

    if (img.complete && img.naturalWidth > 0) {
    onReady();
} else {
    img.addEventListener('load', onReady, { once: true });
    img.addEventListener('error', onReady, { once: true }); // если ошибка — всё равно покажем
}
});
}

    // 4) IntersectionObserver — для остальных секций (один раз)
    const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('in-view');
    observer.unobserve(entry.target);
});
}, {
    threshold: 0.16,
    rootMargin: '0px 0px -12% 0px'
});

    // Наблюдаем все .reveal кроме header-burgundy (он уже показан)
    revealEls.forEach(el => {
    if (header && el.closest('.header-burgundy')) return;
    io.observe(el);
});

    // Фото (clip-mask) по скроллу (если вдруг где-то ещё появятся)
    photoEls.forEach(el => {
    if (header && el.closest('.header-burgundy')) return; // шапку уже показали
    io.observe(el);
});
});