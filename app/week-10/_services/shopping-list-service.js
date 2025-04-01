import { db } from "../_utils/firebase";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

// retrieve items by user id
async function getItems(userId) {
  try {
    const itemsCollection = collection(db, "users", userId, "items");
    const querySnapshot = await getDocs(itemsCollection);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching items: ", error);
    throw error;
  }
}

// add item
async function addItem(userId, item) {
  try {
    const itemsCollection = collection(db, "users", userId, "items");
    const docRef = await addDoc(itemsCollection, item);
    return docRef.id;
  } catch (error) {
    console.error("Error adding item: ", error);
    throw error;
  }
}

// delete item
async function removeItem(userId, item) {
  try {
    const itemDocRef = doc(db, "users", userId, "items", item.id);
    await deleteDoc(itemDocRef);
    console.log("Item successfully deleted");
  } catch (error) {
    console.error("Error removing item:", error.message);
  }
}

export { getItems, addItem, removeItem };
