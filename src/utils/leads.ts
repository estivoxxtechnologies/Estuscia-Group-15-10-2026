import type { ContactFormData, LeadSubmission } from '../types';
const KEY = 'estuscia_leads';
/** Browser-local convenience copy only — NOT a CRM, not secure, not shared. Safe against bad JSON / blocked storage. */
export function saveLeadLocally(data: ContactFormData) {
  try {
    let list: LeadSubmission[] = [];
    try { const p = JSON.parse(localStorage.getItem(KEY) || '[]'); if (Array.isArray(p)) list = p; } catch { list = []; }
    list.unshift({ id: 'lead-' + Date.now(), ...data, createdAt: new Date().toISOString(), status: 'new' });
    localStorage.setItem(KEY, JSON.stringify(list.slice(0, 50)));
  } catch { /* storage unavailable — ignore */ }
}
