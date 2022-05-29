// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import firebase from 'firebase';
import { app, database } from "../../firebase.config"
import { collection, addDoc } from "firebase/firestore"

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
