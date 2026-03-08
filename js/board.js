import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDgH2GqHOv0M1OfBgK-Y4LMxPhU2hpJWrY",
  authDomain: "reviewpf-8e806.firebaseapp.com",
  projectId: "reviewpf-8e806",
  storageBucket: "reviewpf-8e806.firebasestorage.app",
  messagingSenderId: "932858367050",
  appId: "1:932858367050:web:153b7aa939dd89796beab3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let form = document.querySelector("#requestForm");
let msg = document.querySelector("#feedback");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let name = document.querySelector("#name").value;
  let message = document.querySelector("#message").value;

  if (!name || !message) {
    msg.textContent = "모든 항목을 입력해주세요";
    msg.classList.add("err");
    return;
  }
  try {
    await addDoc(collection(db, "requests"), {
      name,
      message,
      createAt: serverTimestamp(),
    });

    msg.textContent = " 신청이 정상적으로 접수되었습니다.";
    msg.classList.remove("err");
    msg.classList.add("ok");
    form.reset();
  } catch (error) {
    msg.textContent = "저장중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.";
    msg.classList.remove("ok");
    msg.classList.add("err");
    console.log(error);
    msg.textContent = "저장중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.";
  }
});
