const BACKEND_ROUTE =  "http://localhost:5000";

export const handleCreateAccount = async ({ email, password, username, setUser }) => {
  try {
    const res = await fetch(`${BACKEND_ROUTE}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, username }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.msg || "Registration failed");
    }

    const loginRes = await fetch(`${BACKEND_ROUTE}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const loginData = await loginRes.json();

    if (!loginRes.ok) {
      throw new Error(loginData.msg || "Login after registration failed");
    }

    localStorage.setItem("authToken", loginData.access_token);

    const userRes = await fetch(`${BACKEND_ROUTE}/users/me`, {
      headers: {
        Authorization: `Bearer ${loginData.access_token}`,
      },
    });

    if (!userRes.ok) {
      throw new Error("Failed to fetch user data after registration");
    }

    const user = await userRes.json();
    setUser(user); // updates user in context

    return { success: true, user };
  } catch (err) {
    console.error("Create account error:", err);
    return { success: false, error: err.message };
  }
};