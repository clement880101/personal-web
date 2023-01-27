import { collection, getDocs, query, orderBy, limit, doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig.js"

const format = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })

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
            out.push({
                id: document.id, doc: {
                    Tags: document.data().Tags,
                    Title: document.data().Title,
                    Link: document.data().Link,
                    Image: document.data().Image,
                    Date: String(format.format(document.data().Date.seconds * 1000)),
                    Desc: document.data().Desc,
                }
            })
        });

        return { success: true, data: out, err: null };
    } catch (error) {
        return { success: false, data: null, err: String(error) }
    }
}

export async function getArticle(id) {
    try {
        const qr = doc(db, "articles", id)
        const docSnap = await getDoc(qr);
        if (docSnap.exists()) {

            return {
                success: true, data: {
                    id: id,
                    doc: {
                        Subtitle: docSnap.data().Subtitle,
                        Title: docSnap.data().Title,
                        Content: docSnap.data().Content,
                        Image: docSnap.data().Image,
                        Date: String(format.format(docSnap.data().Date.seconds * 1000))
                    }
                }, err: null
            };
        } else {
            return { success: false, data: null, err: "Cannot find the indicated article!" }
        }
    } catch (error) {
        return { success: false, data: null, err: String(error) }
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