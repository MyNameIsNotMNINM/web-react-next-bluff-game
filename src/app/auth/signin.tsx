// import { auth } from '@/utils/auth/firebase';
// import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// const SignIn = () => {
//   const handleGoogleSignIn = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const idToken = await result.user.getIdToken();
//       // User is signed in!
//       const user = { user: result.user, token: idToken };
//       console.log('User signed in:', user);
//       // Redirect to your protected route or perform other actions
//     } catch (error) {
//       console.error('Error signing in:', error);
//     }
//   };

//   return (
//     <button onClick={handleGoogleSignIn}>Sign in with Google</button>
//   );
// };

// export default SignIn;
