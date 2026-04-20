const SUPABASE_URL = "PASTE_YOUR_SUPABASE_URL_HERE";
const SUPABASE_KEY = "PASTE_YOUR_SUPABASE_ANON_KEY_HERE";

const statusEl = document.getElementById("status");

function setStatus(message) {
  if (statusEl) statusEl.textContent = message;
  console.log(message);
}

let supabaseClient;

try {
  supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  setStatus("Supabase client created.");
} catch (err) {
  setStatus("Error creating Supabase client: " + err.message);
}

async function signIn() {
  try {
    const email = document.getElementById("email").value.trim();

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

checkUser();
