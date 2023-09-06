import { ref, onBeforeUnmount } from "vue";
import { auth, projectFirestore } from "@/firebase/config";

export function useAuth() {
  const isAdmin = ref(false);

  const isAuthenticated = () => {
    return auth.currentUser !== null;
  };

  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    if (user) {
      try {
        const userDoc = await projectFirestore.collection("users").doc(user.uid).get();
        isAdmin.value = userDoc.data().isAdmin === true;
      } catch (error) {
        console.error("Error getting user data:", error);
      }
    } else {
      isAdmin.value = false;
    }
  });

  onBeforeUnmount(() => {
    unsubscribe();
  });

  return {
    isAdmin,
    isAuthenticated,
  };
}
