// Lernatlas – Block 2 · Physiologie
// Themenblöcke → Fragen untereinander, Antworten ausklappbar (Markdown aus data/block2/physiologie.js).

(function (root) {
    'use strict';

    const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Inline-Markdown: **fett**, *kursiv* (Text wird vorher escaped)
    function inline(s) {
        return esc(s)
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
            .replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?!\*)/g, '$1<em>$2</em>');
    }

    // Mini-Markdown: Absätze, verschachtelte Listen (- / 1.), Tabellen, Trennlinien
    function renderMarkdown(md) {
        const lines = md.split('\n');
        let html = '';
        let stack = [];
        const closeLists = () => { while (stack.length) { html += '</li></' + stack.pop().tag + '>'; } };
        const cells = row => row.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim());

        for (let i = 0; i < lines.length; i++) {
            const l = lines[i];
            if (!l.trim()) { closeLists(); continue; }

            const li = l.match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
            if (li) {
                const n = li[1].length, tag = /\d/.test(li[2]) ? 'ol' : 'ul', text = inline(li[3]);
                while (stack.length && n < stack[stack.length - 1].indent) { html += '</li></' + stack.pop().tag + '>'; }
                const top = stack[stack.length - 1];
                if (top && n === top.indent) {
                    if (top.tag === tag) html += '</li><li>' + text;
                    else { html += '</li></' + top.tag + '><' + tag + '><li>' + text; top.tag = tag; }
                } else {
                    html += '<' + tag + '><li>' + text;
                    stack.push({ indent: n, tag });
                }
                continue;
            }

            closeLists();
            if (l.trim().startsWith('|')) {
                const rows = [];
                while (i < lines.length && lines[i].trim().startsWith('|')) { rows.push(lines[i]); i++; }
                i--;
                const head = cells(rows[0]);
                const body = rows.slice(/^[\s|:-]+$/.test(rows[1] || '') ? 2 : 1).map(cells);
                html += '<div class="ph-table-wrap"><table class="ph-table"><thead><tr>' + head.map(c => '<th>' + inline(c) + '</th>').join('') +
                        '</tr></thead><tbody>' + body.map(r => '<tr>' + r.map(c => '<td>' + inline(c) + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>';
                continue;
            }
            if (l.trim() === '---') { html += '<hr>'; continue; }
            html += '<p>' + inline(l.trim()) + '</p>';
        }
        closeLists();
        return html;
    }

    const KEY = 'medat_physio_topic_v1';
    const store = {
        get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } },
        set(v) { try { localStorage.setItem(KEY, v); } catch (e) { /* optional */ } }
    };

    function mount(el, topics) {
        if (!topics.length) { el.innerHTML = '<p class="cp-caption">Keine Fragen geladen.</p>'; return; }
        let cur = topics.find(t => t.id === store.get()) || topics[0];

        el.innerHTML = '<section class="ph"><div class="fc-pills ph-pills" role="tablist" data-ref="pills"></div><div data-ref="body"></div></section>';
        const pills = el.querySelector('[data-ref=pills]');
        const body = el.querySelector('[data-ref=body]');

        function podLink(it) {
            return it.podcast
                ? '<a class="ph-pod-link" href="' + esc(it.podcast) + '" target="_blank" rel="noopener noreferrer">🎧 Podcast anhören</a>'
                : '<span class="ph-pod-link ph-pod-soon">🎧 Podcast: Link folgt</span>';
        }

        function render() {
            pills.innerHTML = topics.map(t => '<button class="fc-pill' + (t === cur ? ' active' : '') + '" role="tab" aria-selected="' + (t === cur) + '" data-topic="' + t.id + '">' +
                esc(t.title) + ' <span class="ph-count">' + t.items.length + '</span></button>').join('');
            const sim = cur.id === 'calcium' && typeof switchModule === 'function'
                ? '<button class="btn ph-sim" data-sim>Interaktive Simulation öffnen</button>' : '';
            body.innerHTML =
                '<div class="ph-head"><h3>' + esc(cur.title) + '</h3>' +
                '<div class="ph-tools"><button class="btn btn-quiet" data-all="open">Alle aufklappen</button><button class="btn btn-quiet" data-all="close">Alle zuklappen</button>' + sim + '</div></div>' +
                cur.items.map(it =>
                    '<details class="ph-item"><summary><span class="ph-nr">Frage ' + it.nr + ' · ' + esc(it.title) + '</span>' +
                    '<span class="ph-q">' + inline(it.q) + '</span>' + podLink(it) + '</summary>' +
                    '<div class="ph-a">' + renderMarkdown(it.a) + '</div></details>').join('');
        }

        el.addEventListener('click', e => {
            const b = e.target.closest('button');
            if (!b) return;
            if (b.dataset.topic) { cur = topics.find(t => t.id === b.dataset.topic); store.set(cur.id); render(); window.scrollTo({ top: 0 }); }
            else if (b.dataset.all) body.querySelectorAll('details').forEach(d => { d.open = b.dataset.all === 'open'; });
            else if (b.hasAttribute('data-sim')) switchModule('b2calcium');
        });
        render();
    }

    const api = { renderMarkdown, inline, mount };
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
    root.Physio = api;

    if (typeof document !== 'undefined') {
        document.addEventListener('DOMContentLoaded', () => {
            const el = document.getElementById('b2physio-module');
            if (!el) return;
            try { mount(el, typeof block2Physiologie !== 'undefined' ? block2Physiologie : []); } catch (e) { console.error(e); }
        });
    }
})(typeof window !== 'undefined' ? window : globalThis);
