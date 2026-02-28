const BACKEND_ROUTE = "http://localhost:5000"; // Update this if your backend is running on a different URL or port

export const getProfile = async (token) => {
    try {
        const res = await fetch(`${BACKEND_ROUTE}/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.msg || "Failed to fetch profile");
        }
        const user = await res.json();
        return { success: true, user };
    } catch (err) {
        console.error("Get profile error:", err);
        return { success: false, error: err.message };
    }
};
