const db = firebase.firestore();
const messagesEl = document.getElementById('messages');
auth.onAuthStateChanged(user => {
  if(!user) window.location.href = "login.html";
  db.collection("chats").orderBy("time").onSnapshot(snapshot => {
    messagesEl.innerHTML = "";
    snapshot.forEach(doc => {
      const msg = doc.data();
      const div = document.createElement('div');
      div.classList.add(msg.uid === user.uid? 'my-msg' : 'other-msg');
      div.innerHTML = `<b>${msg.name}:</b> ${msg.text}`;
      messagesEl.appendChild(div);
    });
    messagesEl.scrollTop = messagesEl.scrollHeight;
  });
});
function sendMessage(){
  const input = document.getElementById('messageInput'); const text = input.value;
  if(text === "") return;
  const user = auth.currentUser;
  db.collection("chats").add({uid: user.uid, name: user.email.split('@')[0], text: text, time: firebase.firestore.FieldValue.serverTimestamp()});
  input.value = "";
}
function logout(){ auth.signOut().then(() => { window.location.href = "index.html"; }); }