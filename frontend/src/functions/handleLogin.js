const BACKEND_ROUTE =  "http://localhost:5000";


export const handleLogin = async (email, password, setUser) => {
  try {
    

    const res = await fetch(`${BACKEND_ROUTE}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.msg || "Login failed");
    }
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.msg || "Login failed");
    }

    // Store JWT token in localStorage
    localStorage.setItem("authToken", data.access_token);

    const userRes = await fetch(`${BACKEND_ROUTE}/users/me`, {
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    });

    if (!userRes.ok) {
      throw new Error("Failed to fetch user data");
    }

    const user = await userRes.json();
    setUser(user);

    return { success: true, user }; // returns the user object
  } catch (err) {
    console.error("Login error:", err);
    return { success: false, error: err.message };
  }
};