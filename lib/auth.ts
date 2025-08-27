import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  updateProfile,
  User,
  UserCredential
} from "firebase/auth";
import { auth } from "./firebase";

// Types for auth functions
export interface AuthError {
  code: string;
  message: string;
}

export interface SignUpData {
  email: string;
  password: string;
  fullName?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

/**
 * Sign up a new user with email and password
 * @param email - User's email address
 * @param password - User's password
 * @param fullName - User's full name (optional)
 * @returns Promise<UserCredential> - Firebase user credential
 */
export const signUp = async ({ email, password, fullName }: SignUpData): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update user profile with full name if provided
    if (fullName && userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: fullName
      });
    }
    
    return userCredential;
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "code" in error) {
      const code = (error as { code: string }).code;
      throw {
        code,
        message: getAuthErrorMessage(code)
      } as AuthError;
    } else {
      throw {
        code: "unknown",
        message: "An unexpected error occurred. Please try again."
      } as AuthError;
    }
  }
};

/**
 * Sign in an existing user with email and password
 * @param email - User's email address
 * @param password - User's password
 * @returns Promise<UserCredential> - Firebase user credential
 */
export const signIn = async ({ email, password }: SignInData): Promise<UserCredential> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "code" in error) {
      const code = (error as { code: string }).code;
      throw {
        code,
        message: getAuthErrorMessage(code)
      } as AuthError;
    } else {
      throw {
        code: "unknown",
        message: "An unexpected error occurred. Please try again."
      } as AuthError;
    }
  }
};

/**
 * Sign out the current user
 * @returns Promise<void>
 */
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "code" in error) {
      const code = (error as { code: string }).code;
      throw {
        code,
        message: getAuthErrorMessage(code)
      } as AuthError;
    } else {
      throw {
        code: "unknown",
        message: "An unexpected error occurred. Please try again."
      } as AuthError;
    }
  }
};

/**
 * Get the current authenticated user
 * @returns User | null - Current user or null if not authenticated
 */
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

/**
 * Check if a user is currently authenticated
 * @returns boolean - True if user is authenticated, false otherwise
 */
export const isAuthenticated = (): boolean => {
  return auth.currentUser !== null;
};

/**
 * Helper function to get user-friendly error messages
 * @param errorCode - Firebase error code
 * @returns string - User-friendly error message
 */
export const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/operation-not-allowed':
      return 'Email/password accounts are not enabled.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/user-disabled':
      return 'This account has been disabled.';
    case 'auth/user-not-found':
      return 'No account found with this email address.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please check your credentials.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
};
