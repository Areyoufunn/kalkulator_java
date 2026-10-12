import { add, subtract, multiply, divide } from './math.js';

const display = document.getElementById('display');
let prev = '', curr = '', op = null;

const mathOps = { add, subtract, multiply, divide };

document.querySelectorAll('.btn').forEach(btn => {
    btn.onclick = () => {
        const val = btn.dataset.value;
        const act = btn.dataset.action;

        if (val) {
            if (val === '.' && curr.includes('.')) return;
            curr += val;
        } else if (act === 'clear') {
            prev = curr = ''; op = null;
        } else if (act === 'delete') {
            curr = curr.slice(0, -1);
        } else if (act === 'calculate') {
            if (prev && curr && op) {
                curr = String(mathOps[op](parseFloat(prev), parseFloat(curr)));
                prev = ''; op = null;
            }
        } else if (curr) { 
            if (prev) curr = String(mathOps[op](parseFloat(prev), parseFloat(curr)));
            op = act;
            prev = curr;
            curr = '';
        }

        display.value = curr || prev || '0';
    };
});