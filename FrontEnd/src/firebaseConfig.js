import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyBmh6VJ7RU9KBAAQ6jvJUHatEt80dFJbrM',
    authDomain: 'library-management-syste-4c8f7.firebaseapp.com',
    projectId: 'library-management-syste-4c8f7',
    storageBucket: 'library-management-syste-4c8f7.appspot.com',
    messagingSenderId: '594700576929',
    appId: '1:594700576929:web:c77ce643e2df86d1c028e0',
    measurementId: 'G-GN6LPQ8VKF',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
