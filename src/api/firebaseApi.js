import { collection, getDocs, query, orderBy, limit, doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig.js"

export async function getArticleList(lim) {
    try {
        const qr = query(collection(db, "articles"), orderBy("Date", "desc"), limit(lim))
        const docSnap = await getDocs(qr);
        const out = []
        docSnap.forEach((document) => {
            out.push([document.id, document.data()])
        });
        return [true, out];
    } catch (error) {
        return [false, String(error)]
    }
}

export async function getProjectList(lim) {
    try {
        const qr = query(collection(db, "projects"), orderBy("Date", "desc"), limit(lim))
        const docSnap = await getDocs(qr);
        const out = []
        docSnap.forEach((document) => {
            out.push([document.id, document.data()])
        });
        return [true, out];
    } catch (error) {
        return [false, String(error)]
    }
}

export async function getArticle(id) {
    try {
        const qr = doc(db, "articles", id)
        const docSnap = await getDoc(qr);
        if (docSnap.exists()) {
            return [true, docSnap.data()]
        } else {
            return [false, "Cannot find the indicated article!"]
        }
    } catch (error) {
        return [false, String(error)]
    }
}

export async function getExperiences(lim) {
    try {
        const qr = query(collection(db, "experiences"), orderBy("From", "desc"), limit(lim))
        const docSnap = await getDocs(qr);
        const out = []
        docSnap.forEach((document) => {
            out.push([document.id, document.data()])
        });
        return [true, out];
    } catch (error) {
        return [false, String(error)]
    }
}

export async function getSkills() {
    try {
        const qr = query(collection(db, "skills"))
        const out = []
        const docSnap = await getDocs(qr);
        docSnap.forEach((document) => {
            out.push(document.data())
        });
        return [true, out];
    } catch (error) {
        return [false, String(error)]
    }
}