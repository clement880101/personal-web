import { collection, getDocs, query, orderBy, limit, doc, getDoc} from "firebase/firestore";
import {db} from "./firebaseConfig.js"

export async function getArticleList(lim){
    try{
        const qr = query(collection(db, "articles"), orderBy("Date"), limit(lim))
        const docSnap = await getDocs(qr);
        const out = []
        docSnap.forEach((document) => {
            out.push([document.id, document.data()])
        });
        console.log(out)
        return [true, out];
    }catch(error){
        return [false, String(error)]
    }
}

export async function getArticle(id){
    try{
        const qr = doc(db, "articles", id)
        const docSnap = await getDoc(qr);
        if (docSnap.exists()) {
            return [true, docSnap.data()]
        } else {
            return [false, "Cannot find the indicated article!"]
        }
    }catch(error){
        return [false, String(error)]
    }
}