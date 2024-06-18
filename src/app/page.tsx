import Link from "next/link";
import { CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header className="flex h-14 items-center px-4 lg:px-6">
        <Link
          href="#"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <Image alt="" src="/another-icon.png" height={50} width={50} />
          <span className="text-black">t3twilio</span>
        </Link>
      </header>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm ">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Never forget again
                </h2>
                <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our notion integration will seamlessly schedule call reminders
                  for your tasks and watch as your workspace updates itself
                  automatically.
                </p>
              </div>
              <ul className="grid gap-2 py-4">
                <li>
                  <CheckIcon className="mr-2 inline" />
                  Schedule Call Reminders
                </li>
                <li>
                  <CheckIcon className="mr-2 inline" />
                  Automatic Task Updates
                </li>
                <li>
                  <CheckIcon className="mr-2 inline" />
                  Voice-Activated Task Setup
                </li>
              </ul>
            </div>
            <Image
              src="/icon.png"
              width="550"
              height="310"
              alt="Features"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            />
          </div>
        </div>
      </section>
      <section className="w-full bg-gray-100 py-12 md:py-24 lg:py-32 ">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Made for the{" "}
              <Link
                href="https://dev.to/"
                className="underline-offset-2 hover:underline"
              >
                dev.to
              </Link>{" "}
              -
              <Link
                href="https://dev.to/challenges/twilio"
                className="italic text-rose-600 underline underline-offset-2 hover:text-rose-900"
              >
                Twilio challenge
              </Link>
            </h2>
            <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our integration is designed to help you stay on top of your tasks.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
            <Button>Watch Demo</Button>
          </div>
        </div>
      </section>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          &copy; Made by Kanav & Dhruv.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link
            href="#"
            className="text-xs underline-offset-4 hover:underline"
            prefetch={false}
          >
            Source Code
          </Link>
          <Link
            href="#"
            className="text-xs underline-offset-4 hover:underline"
            prefetch={false}
          >
            Submission
          </Link>
        </nav>
      </footer>
    </div>
  );
}
