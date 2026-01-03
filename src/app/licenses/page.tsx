"use client";

import Link from "next/link";
import { ArrowLeft, FileCode01, ChevronRight, Home05, LinkExternal01 } from "@untitledui/icons";

const licenses = [
  {
    name: "React",
    version: "18.x",
    license: "MIT License",
    url: "https://github.com/facebook/react",
    description: "A JavaScript library for building user interfaces",
  },
  {
    name: "Next.js",
    version: "14.x",
    license: "MIT License",
    url: "https://github.com/vercel/next.js",
    description: "The React Framework for the Web",
  },
  {
    name: "Tailwind CSS",
    version: "3.x",
    license: "MIT License",
    url: "https://github.com/tailwindlabs/tailwindcss",
    description: "A utility-first CSS framework",
  },
  {
    name: "Untitled UI Icons",
    version: "Latest",
    license: "Commercial License",
    url: "https://www.untitledui.com",
    description: "Premium icon library for modern interfaces",
  },
  {
    name: "React Aria Components",
    version: "Latest",
    license: "Apache 2.0",
    url: "https://react-spectrum.adobe.com/react-aria/",
    description: "Accessible UI primitives for React",
  },
  {
    name: "Framer Motion",
    version: "Latest",
    license: "MIT License",
    url: "https://github.com/framer/motion",
    description: "Production-ready motion library for React",
  },
];

export default function LicensesPage() {
  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="relative overflow-hidden bg-brand-solid">
        {/* Background decorations */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -right-40 size-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 size-80 rounded-full bg-white/10 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='3' cy='3' r='1.5' fill='%23ffffff'/%3E%3C/svg%3E")`,
              backgroundSize: '24px 24px',
            }}
          />
        </div>

        <div className="relative mx-auto max-w-8xl px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
            <Link
              href="/"
              className="flex items-center gap-1 sm:gap-1.5 text-white/70 transition-colors hover:text-white"
            >
              <Home05 className="size-3 sm:size-4" />
              <span>Home</span>
            </Link>
            <ChevronRight className="size-3 sm:size-4 text-white/40" />
            <span className="text-white">Licenses</span>
          </nav>

          {/* Header content */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="flex size-10 sm:size-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <FileCode01 className="size-5 sm:size-7 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
                  Licenses
                </h1>
                <p className="mt-2 hidden text-brand-200 sm:block">
                  Open source and third-party licenses
                </p>
              </div>
            </div>

            <Link
              href="/"
              className="group mt-3 hidden items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:flex"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-8xl px-4 py-6 sm:py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="rounded-2xl border border-secondary bg-primary p-6 shadow-sm sm:p-8 lg:p-10">
          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">Open Source Acknowledgments</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              AdView is built using various open source and third-party libraries. We are grateful to the developers and communities who maintain these projects. Below is a list of the major libraries we use along with their respective licenses.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">Third-Party Libraries</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {licenses.map((lib) => (
                <div key={lib.name} className="rounded-xl border border-secondary bg-secondary p-6 transition-all hover:border-brand-300">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-primary">{lib.name}</h3>
                      <p className="mt-1 text-sm text-tertiary">{lib.description}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-600">
                      v{lib.version}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-tertiary">{lib.license}</span>
                    <a
                      href={lib.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:underline"
                    >
                      View Source
                      <LinkExternal01 className="size-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">MIT License</h2>
            <div className="mt-4 rounded-xl border border-secondary bg-secondary p-6">
              <pre className="whitespace-pre-wrap text-sm text-tertiary">
{`MIT License

Copyright (c) [year] [copyright holders]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`}
              </pre>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">Apache License 2.0</h2>
            <div className="mt-4 rounded-xl border border-secondary bg-secondary p-6">
              <pre className="whitespace-pre-wrap text-sm text-tertiary">
{`Apache License
Version 2.0, January 2004
http://www.apache.org/licenses/

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.`}
              </pre>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">AdView Proprietary License</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              The AdView platform, including its original code, design, and content, is proprietary software owned by AdView Inc. All rights reserved. Unauthorized copying, modification, distribution, or use of this software is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">Contact</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              If you have any questions about the licenses or wish to report a potential license violation, please contact us at:
            </p>
            <div className="mt-4 rounded-xl border border-secondary bg-secondary p-6">
              <p className="font-semibold text-primary">AdView Inc.</p>
              <p className="mt-1 text-tertiary">Email: legal@adview.com</p>
              <p className="text-tertiary">Address: San Francisco, CA, USA</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
