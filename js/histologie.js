// Lernatlas – Block 2 · Histologie
// 4 Blöcke (je ein Podcast) → Präparate (ausklappbar) → Kernaussage, Auffinden, Fragen mit ausklappbaren Antworten.

(function (root) {
    'use strict';

    const MD = (typeof Physio !== 'undefined' ? Physio : (typeof require !== 'undefined' ? require('./physiologie.js') : root.Physio));
    const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const KEY = 'medat_histo_block_v1';
    const store = {
        get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } },
        set(v) { try { localStorage.setItem(KEY, v); } catch (e) { /* optional */ } }
    };

    function podLink(url, label) {
        return url
            ? '<a class="ph-pod-link" href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">🎧 ' + esc(label) + '</a>'
            : '<span class="ph-pod-link ph-pod-soon">🎧 Podcast: Link folgt</span>';
    }

    function prepHtml(p) {
        const auf = p.sections.filter(s => /^Auffinden/.test(s.title));
        const rest = p.sections.filter(s => !/^Auffinden/.test(s.title));
        const sec = s => '<h4 class="hi-sec">' + esc(s.title) + '</h4><div class="ph-a-body">' + MD.renderMarkdown(s.md) + '</div>';
        return '<details class="ph-item hi-prep"><summary><span class="ph-nr">Präparat ' + p.nr + ' · ' + esc(p.meta) + '</span>' +
            '<span class="ph-q">' + esc(p.title) + '</span></summary>' +
            '<div class="ph-a hi-body">' +
            (p.kern ? '<div class="hi-kern"><strong>Kernaussage:</strong> ' + MD.inline(p.kern) + '</div>' : '') +
            auf.map(sec).join('') +
            (p.fragen.length ? '<h4 class="hi-sec">Fragen / Diskussion</h4>' + p.fragen.map(q =>
                '<details class="ph-item hi-q"><summary><span class="ph-q">' + MD.inline(q.q) + '</span></summary>' +
                '<div class="ph-a">' + MD.renderMarkdown(q.a) + '</div></details>').join('') : '') +
            rest.map(sec).join('') +
            '</div></details>';
    }

    function mount(el, blocks) {
        if (!blocks.length) { el.innerHTML = '<p class="cp-caption">Keine Präparate geladen.</p>'; return; }
        let cur = blocks.find(b => b.id === store.get()) || blocks[0];
        el.innerHTML = '<section class="ph hi"><div class="fc-pills ph-pills" role="tablist" data-ref="pills"></div><div data-ref="body"></div></section>';
        const pills = el.querySelector('[data-ref=pills]');
        const body = el.querySelector('[data-ref=body]');

        function render() {
            pills.innerHTML = blocks.map(b => '<button class="fc-pill' + (b === cur ? ' active' : '') + '" role="tab" aria-selected="' + (b === cur) + '" data-block="' + b.id + '">' +
                esc(b.title) + ' <span class="ph-count">' + b.preps.length + '</span></button>').join('');
            body.innerHTML =
                '<div class="ph-head"><h3>' + esc(cur.title) + '</h3>' +
                '<div class="ph-tools">' + podLink(cur.podcast, 'Podcast zu ' + cur.title.split(' · ')[0]) +
                '<button class="btn btn-quiet" data-all="open">Alle aufklappen</button><button class="btn btn-quiet" data-all="close">Alle zuklappen</button></div></div>' +
                cur.preps.map(prepHtml).join('');
        }

        el.addEventListener('click', e => {
            const b = e.target.closest('button');
            if (!b) return;
            if (b.dataset.block) { cur = blocks.find(x => x.id === b.dataset.block); store.set(cur.id); render(); window.scrollTo({ top: 0 }); }
            else if (b.dataset.all) body.querySelectorAll('details').forEach(d => { d.open = b.dataset.all === 'open'; });
        });
        render();
    }

    const api = { mount };
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
    root.Histo = api;

    if (typeof document !== 'undefined') {
        document.addEventListener('DOMContentLoaded', () => {
            const el = document.getElementById('b2histo-module');
            if (!el) return;
            try { mount(el, typeof block2Histologie !== 'undefined' ? block2Histologie : []); } catch (e) { console.error(e); }
        });
    }
})(typeof window !== 'undefined' ? window : globalThis);
