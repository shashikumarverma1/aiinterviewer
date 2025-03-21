import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { model } from "@/utils/GeminiAi";

export default async function handler(req: {
  method: string; body: {
    question: string; answer: string
      ; name: string, email: string, isLast: boolean
  };
},
  res: {
    status: (arg0: number) => {
      json: {
        (arg0: { error?: string; message?: string; question?: string; answer?: string; }):
          void; new(): void;
      };
    };
  }) {
  if (req.method === 'POST') {
    const { question, answer, isLast, email, name } = req.body;

    if (!question || !answer || !email) {
      return res.status(400).json({ error: "Question and answer are required" });
    }
    console.log(isLast, email, "isLast")
    //   const datass = fs.readFileSync(filePath, 'utf-8');

    const prompt = `
      Evaluate the given answer to the following question:
      Question: "${question}"
      User Answer: "${answer}"

      Provide:
      1. A correctness score from 0 to 100.
      2. A brief review of the answer.
      3. Suggested improvements if the answer is incorrect.
      Format the response as JSON:
      {
        "score": number,
        "feedback": string,
        "improvement": string
      }
    `;
    const result = await model.generateContent(prompt);
    // Simulating storing feedback (In a real app, save to a database)
    const responseText = result.response.text();

    const cleanedData = responseText
      .replace(/```json/g, "") // Remove opening ```json
      .replace(/```/g, "") // Remove closing ```
      .trim();
    // console.log(cleanedData , "responseText")
    const data = JSON.parse(cleanedData)
    const feedbackResponse = {
      name, email,
      question,
      answer,
      score: data.score,
      feedback: data.feedback,
      improvement: data.improvement,
      timestamp: new Date().toISOString(),
    };

    const collectionName = `${email}`; // Change this to your collection name
    const docId = collectionName; // Unique document ID

    const docRefs = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRefs);

    if (!docSnap.exists()) {
      // First time: Create the document with the array
      await setDoc(docRefs, { result: [feedbackResponse] });
      console.log(feedbackResponse, "Document created & item added:");
    } else {
      // Document exists: Update it and push new item to array
      await updateDoc(docRefs, {
        result: arrayUnion(
          feedbackResponse
        ),
      });
      console.log(feedbackResponse, "New item added to existing array:",);
    }

    return res.status(200).json(feedbackResponse);

  }
}
