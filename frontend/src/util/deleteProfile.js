const BACKEND_ROUTE = "http://localhost:5000";

export const deleteProfile = async(userId, token) => {
    try {
        const res = await fetch(`${BACKEND_ROUTE}/users/${userId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.msg || "Profile deletion failed");
        }

        return { success: true };
    } catch (err) {
        console.error("Profile deletion error:", err);
        return { success: false, error: err.message };
    }
}