"use client";

import { ArrowLeft } from "@untitledui/icons";
import { useRouter } from "next/navigation";
import { Button } from "@/components/base/buttons/button";

export default function NotFound() {
    const router = useRouter();

    return (
        <section className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-primary px-4">
            <div className="flex w-full max-w-3xl flex-col items-center gap-8 text-center">
                <div className="flex flex-col items-center gap-6">
                    <span className="text-md font-semibold text-brand-secondary">404 error</span>
                    <h1 className="text-display-md font-semibold text-primary md:text-display-lg lg:text-display-xl">
                        We can't find that page
                    </h1>
                    <p className="text-lg text-tertiary md:text-xl">
                        Sorry, the page you are looking for doesn&apos;t exist or has been moved.
                    </p>
                </div>

                <div className="flex flex-col-reverse gap-3 sm:flex-row">
                    <Button color="secondary" size="xl" iconLeading={ArrowLeft} onClick={() => router.back()}>
                        Go back
                    </Button>
                    <Button size="xl" onClick={() => router.push("/")}>
                        Take me home
                    </Button>
                </div>
            </div>
        </section>
    );
}
