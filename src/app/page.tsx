"use client";
import Link from "next/link";
import { CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { JSX, SVGProps } from "react";
import { SeparateAway } from "@/components/ui/seperate-away";
import GradualSpacing from "@/components/ui/gradual-spacing";

export default function HomePage() {
  function ArrowDownIcon(
    props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
  ) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 5v14" />
        <path d="m19 12-7 7-7-7" />
      </svg>
    );
  }
  return (
    <div className="flex min-h-[100dvh] flex-col scroll-smooth">
      <header className="flex h-14 items-center justify-between px-4 lg:px-6">
        <div>
          <Link
            href="#"
            className="flex items-center justify-center"
            prefetch={false}
          >
            <Image alt="" src="/another-icon.png" height={50} width={50} />
            <span className="text-black">t3twilio</span>
          </Link>
        </div>
        <div className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link
            href="https://github.com/dhruvbansal26/t3twilio"
            className="text-xs underline-offset-4 hover:underline"
            target="_undefined"
            prefetch={false}
          >
            Source Code
          </Link>
          <Link
            href="https://dev.to/kanav_gupta/t3twilio-never-forget-again-20bl"
            target="_undefined"
            className="text-xs underline-offset-4 hover:underline"
            prefetch={false}
          >
            Submission
          </Link>
        </div>
      </header>
      <section className="h-[500px] w-full scroll-smooth py-12 md:py-24 lg:py-32">
        <div className=" container scroll-smooth px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm ">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  t3twilio
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
              <Link
                href="#2"
                className="mt-8 animate-bounce scroll-smooth"
                prefetch={false}
              >
                {/* <ArrowDownIcon className="h-6 w-6" /> */}
              </Link>
            </div>
            <SeparateAway
              upper_text="Never forget"
              lower_text="again."
              duration={1.5}
              hidden_opacity={0}
              visible_opacity={1}
              className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-black dark:text-white md:text-7xl md:leading-[5rem]"
            />
          </div>
        </div>
      </section>
      <section className="w-full bg-black py-12 text-white md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="">
                  <GradualSpacing
                    className="font-display text-4xl font-bold tracking-[-0.1em]  text-white dark:text-white md:text-7xl md:leading-[5rem] "
                    text="How do we help you?"
                  />
                </div>
                <p className="text-muted-foreground md:text-xl">
                  We're here to help you stay on top of your tasks and make your
                  life easier.
                </p>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">
                    {" "}
                    Have someone in your family who suffers from dementia?
                  </h3>
                  <p className="text-muted-foreground md:text-lg">
                    Now, you can make sure they are on top of their tasks such
                    as taking meds on time!
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">
                    Are you someone who starts a task and then gets distracted?
                  </h3>
                  <p className="text-muted-foreground md:text-lg">
                    Our AI integration calculates the time it will take you
                    complete the task and give you a follow up call!
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">
                    Know someone who is lazy & doesn't wanna manually add a
                    task?
                  </h3>
                  <p className="text-muted-foreground md:text-lg">
                    They can control what task to add and remove by just
                    calling. We will do the rest!
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/icon.png"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full  py-12 md:py-24 lg:py-32 ">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Made for the{" "}
              <Link
                href="https://dev.to/"
                className="underline-offset-2 hover:underline"
                target="_blank"
              >
                dev.to
              </Link>{" "}
              -
              <Link
                target="_blank"
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
            <Button>
              <Link href="https://youtu.be/ouK9KJt6ai8" prefetch={false}>
                Watch Demo
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 bg-white px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          &copy; Made by Kanav & Dhruv.
        </p>
      </footer>
    </div>
  );
}
