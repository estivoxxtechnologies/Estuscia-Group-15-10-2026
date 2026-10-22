export interface EcosystemEntity { name: string; tag: string; description: string; comingSoon?: boolean }
export interface Strength { title: string; text: string }
export interface Leader { name: string; role: string; summary: string; tags: string[]; photo: string }
export interface ContactFormData { fullName: string; email: string; phone: string; organization: string; message: string }
export interface LeadSubmission extends ContactFormData { id: string; createdAt: string; status: 'new' }
export type FormErrors = Partial<Record<keyof ContactFormData, string>>;
