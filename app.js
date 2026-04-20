const SUPABASE_URL = "https://jbbkugzkdqsxmwzevijp.supabase.co";
const SUPABASE_KEY = "sb_publishable_cXiF4_yc_YDQprQNiNzWIQ_nE2Ub1w2";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Get status element safely after page loads
function getStatusEl() {
  return document.getElementById("status");
}

function setStatus(message) {
  const el = getStatusEl();
  if (el) el.textContent = message;
  console.log(message);
}

// ✉️ Send Magic Link
async function signIn() {
  try {
    const emailInput = document.getElementById("email");
    const email = emailInput ? emailInput.value.trim() : "";

    if (!email) {
      setStatus("Please enter your email.");
      return;
    }

    setStatus("Sending magic link...");

    const { error } = await supabaseClient.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "https://pringlek-afk.github.io/calendar-dashboard/"
      }
    });

    if (error) {
      setStatus("Sign-in error: " + error.message);
    } else {
      setStatus("Magic link sent. Check your email.");
    }
  } catch (err) {
    setStatus("Sign-in crash: " + err.message);
  }
}

// 🔍 Check if user is already signed in
async function checkUser() {
  try {
    setStatus("Checking sign-in status...");

    const { data, error } = await supabaseClient.auth.getUser();

    if (error) {
      setStatus("User check error: " + error.message);
      return;
    }

    if (data.user) {
      setStatus(`Signed in as ${data.user.email}`);
    } else {
      setStatus("Not signed in");
    }
  } catch (err) {
    setStatus("User check crash: " + err.message);
  }
}

// 🔄 Listen for login changes (important for Magic Link return)
supabaseClient.auth.onAuthStateChange((event, session) => {
  if (session?.user) {
    setStatus(`Signed in as ${session.user.email}`);
  }
});

// Run on page load
document.addEventListener("DOMContentLoaded", () => {
  checkUser();
});
