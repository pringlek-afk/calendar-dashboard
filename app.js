const SUPABASE_URL = "PASTE_YOUR_SUPABASE_URL_HERE";
const SUPABASE_KEY = "PASTE_YOUR_SUPABASE_ANON_KEY_HERE";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function signIn() {
  const email = document.getElementById("email").value;

  const { error } = await supabaseClient.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: "https://pringlek-afk.github.io/calendar-dashboard/"
    }
  });

  if (error) {
    alert(error.message);
  } else {
    alert("Check your email for the sign-in link.");
  }
}

async function checkUser() {
  const { data, error } = await supabaseClient.auth.getUser();
  console.log("USER:", data.user, error);

  const status = document.getElementById("status");
  if (status) {
    status.textContent = data.user
      ? `Signed in as ${data.user.email}`
      : "Not signed in";
  }
}

checkUser();
