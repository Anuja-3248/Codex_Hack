export const DEMO_AUTH_STORAGE_KEY = "pathforge-demo-auth";

export type DemoSession = {
  email: string;
  signedInAt: string;
};

export function readDemoSession() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const value = window.localStorage.getItem(DEMO_AUTH_STORAGE_KEY);

    return value ? (JSON.parse(value) as DemoSession) : null;
  } catch {
    return null;
  }
}

export function saveDemoSession(email: string) {
  if (typeof window === "undefined") {
    return;
  }

  const session: DemoSession = {
    email,
    signedInAt: new Date().toISOString()
  };

  window.localStorage.setItem(DEMO_AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function clearDemoSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(DEMO_AUTH_STORAGE_KEY);
}
