/**
 * CONFIGURAÇÃO DO FIREBASE - projeto "bragaday-a19f8"
 * ---------------------------------------------------
 * Passos que faltam na consola (console.firebase.google.com):
 * 1. Ativar o Firestore Database (Build → Firestore Database → Criar)
 * 2. Aplicar as regras de segurança que estão no README.md
 *
 * Com isto feito, o stock passa a sincronizar em tempo real
 * entre todos os dispositivos.
 */

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxy4fQSMbt-EUeZK_jVH6WogVCNJQaL2Y",
  authDomain: "bragaday-a19f8.firebaseapp.com",
  projectId: "bragaday-a19f8",
  storageBucket: "bragaday-a19f8.firebasestorage.app",
  messagingSenderId: "358155381686",
  appId: "1:358155381686:web:058a3e462fa7397d5d6f17",
};

export const firebaseAtivo = true;

export const db: Firestore | null = getFirestore(
  getApps().length ? getApp() : initializeApp(firebaseConfig)
);
