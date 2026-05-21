"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
  }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    function handler(e: Event) {
      e.preventDefault();

      setDeferredPrompt(
        e as BeforeInstallPromptEvent
      );

      if (window.innerWidth < 768) {
        setShowBanner(true);
      }
    }

    window.addEventListener(
      "beforeinstallprompt",
      handler
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handler
      );
    };
  }, []);

  async function handleInstall() {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();

    const choice =
      await deferredPrompt.userChoice;

    if (choice.outcome === "accepted") {
      setShowBanner(false);
    }
  }

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 rounded-2xl bg-blue-600 p-4 text-white shadow-2xl md:hidden">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-semibold">
            Install SkyBook
          </p>

          <p className="text-sm text-blue-100">
            Get the app experience on your phone.
          </p>
        </div>

        <button
          onClick={handleInstall}
          className="rounded-xl bg-white px-4 py-2 font-semibold text-blue-600"
        >
          Install
        </button>
      </div>
    </div>
  );
}