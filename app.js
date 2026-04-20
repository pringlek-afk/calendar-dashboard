import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://jbbkugzkdqsxmwzevijp.supabase.co";
const SUPABASE_KEY = "sb_publishable_cXiF4_yc_YDQprQNiNzWIQ_nE2Ub1w2";

const statusEl = document.getElementById("status");
const signInBtn = document.getElementById("signInBtn");
const emailInput = document.getElementById("email");

function setStatus(message) {
  if (statusEl) statusEl.textContent = message;
  console.log(message);
}

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

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

async function signIn() {
  try {
    const email = emailInput?.value?.trim() || "";

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

signInBtn?.addEventListener("click", signIn);

supabaseClient.auth.onAuthStateChange((_event, session) => {
  if (session?.user) {
    setStatus(`Signed in as ${session.user.email}`);
  }
});

checkUser();
