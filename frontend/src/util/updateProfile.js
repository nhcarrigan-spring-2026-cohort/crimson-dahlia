const BACKEND_ROUTE = "http://localhost:5000"; // Update this if your backend is running on a different URL or port

export const updateProfile = async (userId, profileData, token) => {
    // profileData should be an object containing all of the updated fields
    try {
        const res = await fetch(`${BACKEND_ROUTE}/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(profileData),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.msg || "Profile update failed");
        }

        const updatedUser = await res.json();
        return { success: true, user: updatedUser };
    } catch (err) {
        console.error("Profile update error:", err);
        return { success: false, error: err.message };
    }
};