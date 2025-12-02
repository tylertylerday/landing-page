"use client";

import Navbar from "@/components/Navbar";
import BetaForm from "@/components/BetaForm";

export default function BetaPage() {
    return (
        <main className="grid grid-cols-1 min-h-screen">
            <Navbar />

            <div className="col-start-1 row-start-1 w-full z-30">
                <div className="relative">
                    <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center min-h-screen">
                        <div className="text-center mb-12 max-w-2xl">
                            <h1 className="text-5xl font-bold mb-6 font-heading text-white">
                                Join the Beta
                            </h1>
                            <p className="text-xl text-gray-300">
                                We're building the future of cosplay, and we want you to be a part of it.
                                Fill out the form below to request early access.
                            </p>
                        </div>

                        <BetaForm />
                    </div>
                </div>
            </div>
        </main>
    );
}
