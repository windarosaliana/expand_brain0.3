export type View = 'dashboard' | 'library' | 'latihan' | 'pengaturan';
export type LibraryStep = 'kategori' | 'subkategori' | 'paket' | 'detail-paket';

export interface Category {
  id: string;
  name: string;
}

export interface SubCategory {
  id: string;
  categoryId: string;
  name: string;
}

export interface Materi {
  id: string;
  judul: string;
  konten: string;
}

export interface Soal {
  id: string;
  pertanyaan: string;
  opsi: string[];
  jawaban: number; // index opsi yang benar
}

export interface LearningPackage {
  id: string;
  subCategoryId: string;
  name: string;
  materi: Materi[];
  soal: Soal[];
}

export interface LatihanHistoryEntry {
  id: string;
  packageId: string;
  packageName: string;
  soal: Soal[];
  answers: Record<string, number>;
  correctCount: number;
  total: number;
  date: string;
}