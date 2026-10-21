export interface EcosystemEntity { name: string; tag: string; description: string }
export interface Strength { title: string; text: string }
export interface Leader { name: string; role: string; summary: string; tags: string[]; photo: string }
export type InquiryType = 'Estuscia Group' | 'Estuscia Capital' | 'Froi Studio' | 'Estivoxx Technologies' | 'Zedeo Cart' | 'Animalo Fashion' | 'Estuscia Global' | 'Chai with trade' | 'MaQcala Perfumes' | 'General Inquiry';
export interface ContactFormData { fullName: string; email: string; phone: string; organization: string; message: string }
export interface LeadSubmission extends ContactFormData { id: string; createdAt: string; status: 'new' }
export type FormErrors = Partial<Record<keyof ContactFormData, string>>;
