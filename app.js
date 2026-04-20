// 🔑 You will replace these later
const SUPABASE_URL = "PASTE_YOUR_URL";
const SUPABASE_KEY = "PASTE_YOUR_KEY";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ✉️ Sign in
async function signIn() {
  const email = document.getElementById("email").value;

  const { error } = await supabaseClient.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: window.location.origin
    }
  });

  if (error) {
    alert(error.message);
  } else {
    alert("Check your email!");
  }
}

// 🧪 Test connection
async function testConnection() {
  const { data, error } = await supabaseClient
    .from("tasks")
    .select("*")
    .limit(1);

  console.log(data, error);
}

testConnection();
