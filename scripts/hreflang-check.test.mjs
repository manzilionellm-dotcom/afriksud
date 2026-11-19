import test from 'node:test';
import assert from 'node:assert/strict';
import {inspectHtml} from './html-audit.mjs';
import {validateCircles} from './hreflang-check.mjs';
const html = (lang, omit = false) => `<html lang='en-${lang}'><head><link href='https://iptvmzansi.com/en-${lang.toLowerCase()}' rel='canonical'><link href='https://iptvmzansi.com/en-za' hreflang='en-ZA' rel='alternate'>${omit?'':"<link rel='alternate' hreflang='en-GB' href='https://iptvmzansi.com/en-gb'>"}</head><body>Visible</body></html>`;
test('return circle and parser handle single quotes and attribute order',()=>assert.deepEqual(validateCircles(new Map([['/en-za',inspectHtml(html('ZA'))],['/en-gb',inspectHtml(html('GB'))]])),[]));
test('broken return tags fail',()=>assert.ok(validateCircles(new Map([['/en-za',inspectHtml(html('ZA'))],['/en-gb',inspectHtml(html('GB',true))]])).length));
test('noindex targets fail for indexed pages',()=>assert.ok(validateCircles(new Map([['/en-za',inspectHtml(html('ZA'))],['/en-gb',{...inspectHtml(html('GB')),robots:'noindex'}]])).some(e=>e.includes('noindex'))));
