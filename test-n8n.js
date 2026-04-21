const URL = "https://n8n-n8n.bg5sbc.easypanel.host/webhook/0da8393d-57aa-4682-b391-35f212495148";
const SESSION_ID = `test-session-${Date.now()}`;

async function test() {
  console.log("Sending first message...");
  let res = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionId: SESSION_ID,
      sessionKey: SESSION_ID,
      session_id: SESSION_ID,
      session_key: SESSION_ID,
      action: "sendMessage",
      chatInput: "Hola",
      message: "Hola",
      text: "Hola",
      metadata: {
        sessionId: SESSION_ID,
        sessionKey: SESSION_ID
      }
    })
  });
  console.log("Status 1:", res.status);
  console.log("Response 1:", await res.text());

  console.log("Sending second message...");
  res = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionId: SESSION_ID,
      sessionKey: SESSION_ID,
      session_id: SESSION_ID,
      session_key: SESSION_ID,
      action: "sendMessage",
      chatInput: "Dime más",
      message: "Dime más",
      text: "Dime más",
      metadata: {
        sessionId: SESSION_ID,
        sessionKey: SESSION_ID
      }
    })
  });
  console.log("Status 2:", res.status);
  console.log("Response 2:", await res.text());
}
test();
