import { Suspense } from "react";
import RecoveryClient from "./recoveryClient";

export default function RecoveryPage() {
    return <Suspense fallback={<RecoverySkeleton />}><RecoveryClient /></Suspense>
}

function RecoverySkeleton() {
    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
            <div className="w-full max-w-sm">
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-7">
                    <div className="h-7 w-40 bg-gray-200 rounded mb-2" />
                    <div className="h-4 w-72 bg-gray-200 rounded mb-6" />
                    <div className="space-y-4">
                        <div className="h-14 bg-gray-200 rounded-lg" />
                        <div className="h-14 bg-gray-200 rounded-lg" />
                        <div className="h-12 bg-gray-200 rounded-lg" />
                    </div>
                </div>
            </div>
        </main>
    );
}