"use client"
import { Button } from '@/components/ui/button';
import { CylinderThrobber } from '@/components/ui/throbber';
import { auth } from '@/lib/auth/firebase';
import { signInWithPopup, GoogleAuthProvider, signInAnonymously } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useIdToken } from 'react-firebase-hooks/auth';


const SignIn = () => {
    const [user, loading, error] = useIdToken(auth);
    const route = useRouter();
    if (loading) {
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <CylinderThrobber />
            </div>
        )
    }
    if (user) {
        route.push(`/lobby`);
    }
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

                <h3 className="text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                    To be able to play you'll need to sign in.
                </h3>

                <div className="flex gap-4 items-center flex-col sm:flex-row">
                    <Button onClick={() => signInAnonymously(auth)}>Sign in anonymously</Button>
                    <>{JSON.stringify(error)}</>    
                </div>
            </main>
        </div>
    );
};

export default SignIn;
