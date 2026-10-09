import { useState } from "react";
import {
  FiAlertCircle,
  FiCheck,
  FiCheckCircle,
  FiEye,
  FiEyeOff,
  FiKey,
  FiLock,
  FiMonitor,
  FiShield,
  FiSmartphone,
} from "react-icons/fi";

const readPreference = (key, defaultValue) => {
  if (typeof window === "undefined") return defaultValue;
  const storedValue = window.localStorage.getItem(key);
  return storedValue === null ? defaultValue : storedValue === "true";
};

const Security = () => {
  const [twoStepEnabled, setTwoStepEnabled] = useState(() =>
    readPreference("accountTwoStepEnabled", false),
  );
  const [signInAlertsEnabled, setSignInAlertsEnabled] = useState(() =>
    readPreference("accountSignInAlertsEnabled", true),
  );
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  const updatePreference = (key, value, setter) => {
    window.localStorage.setItem(key, String(value));
    setter(value);
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    setPasswordMessage("");

    if (passwords.next.length < 8) {
      setPasswordError("Use at least 8 characters for your new password.");
      return;
    }
    if (passwords.next !== passwords.confirm) {
      setPasswordError("The new password and confirmation do not match.");
      return;
    }
    if (passwords.next === passwords.current) {
      setPasswordError("Choose a new password that differs from the current one.");
      return;
    }

    setPasswordError("");
    setPasswordMessage(
      "Password changes are not connected to an account service yet.",
    );
  };

  const toggleClassName = (enabled) =>
    `relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 ${
      enabled ? "bg-teal-700" : "bg-slate-300"
    }`;

  const passwordFieldClassName =
    "mt-1.5 h-11 w-full rounded-md border border-slate-300 bg-white px-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/15";

  return (
    <section className="mx-auto max-w-5xl text-left text-slate-900">
      <div className="mb-7">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-teal-700">
          Account
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">Security</h1>
        <p className="mt-2 text-sm text-slate-500">
          Manage your sign-in protection and account access.
        </p>
      </div>

      <div className="mb-6 flex items-start gap-4 border-y border-teal-200 bg-teal-50 px-5 py-4">
        <span className="mt-0.5 text-teal-700">
          {twoStepEnabled ? (
            <FiCheckCircle size={21} aria-hidden="true" />
          ) : (
            <FiShield size={21} aria-hidden="true" />
          )}
        </span>
        <div>
          <p className="text-sm font-semibold text-slate-900">
            {twoStepEnabled ? "Two-step verification is enabled" : "Protect your account"}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            {twoStepEnabled
              ? "Your account has an additional sign-in protection setting enabled."
              : "Enable two-step verification to add another layer to sign-in."}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <section className="border-y border-slate-200 bg-white">
          <div className="flex items-start gap-4 px-5 py-5 sm:px-6">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-slate-100 text-slate-700">
              <FiKey aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">Password</h2>
                  <p className="mt-1 text-sm text-slate-500">Update your account password.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordForm((current) => !current);
                    setPasswordError("");
                    setPasswordMessage("");
                  }}
                  className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md border border-slate-300 px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <FiLock aria-hidden="true" />
                  {showPasswordForm ? "Close form" : "Change password"}
                </button>
              </div>

              {showPasswordForm && (
                <form onSubmit={handlePasswordSubmit} className="mt-6 border-t border-slate-200 pt-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
                      Current password
                      <input
                        required
                        type={showPasswords ? "text" : "password"}
                        autoComplete="current-password"
                        value={passwords.current}
                        onChange={(event) =>
                          setPasswords((current) => ({ ...current, current: event.target.value }))
                        }
                        className={passwordFieldClassName}
                      />
                    </label>
                    <label className="block text-sm font-medium text-slate-700">
                      New password
                      <input
                        required
                        minLength={8}
                        type={showPasswords ? "text" : "password"}
                        autoComplete="new-password"
                        value={passwords.next}
                        onChange={(event) =>
                          setPasswords((current) => ({ ...current, next: event.target.value }))
                        }
                        className={passwordFieldClassName}
                      />
                    </label>
                    <label className="block text-sm font-medium text-slate-700">
                      Confirm new password
                      <input
                        required
                        minLength={8}
                        type={showPasswords ? "text" : "password"}
                        autoComplete="new-password"
                        value={passwords.confirm}
                        onChange={(event) =>
                          setPasswords((current) => ({ ...current, confirm: event.target.value }))
                        }
                        className={passwordFieldClassName}
                      />
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowPasswords((current) => !current)}
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
                  >
                    {showPasswords ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
                    {showPasswords ? "Hide passwords" : "Show passwords"}
                  </button>

                  {passwordError && (
                    <p role="alert" className="mt-3 flex items-center gap-2 text-sm text-rose-700">
                      <FiAlertCircle aria-hidden="true" />
                      {passwordError}
                    </p>
                  )}
                  {passwordMessage && (
                    <p role="status" className="mt-3 flex items-center gap-2 text-sm text-amber-800">
                      <FiAlertCircle aria-hidden="true" />
                      {passwordMessage}
                    </p>
                  )}

                  <div className="mt-5 border-t border-slate-200 pt-4">
                    <button
                      type="submit"
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-teal-700 px-4 text-sm font-semibold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2"
                    >
                      <FiCheck aria-hidden="true" />
                      Update password
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="flex items-start gap-4 px-5 py-5 sm:px-6">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-teal-50 text-teal-700">
              <FiSmartphone aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-base font-semibold text-slate-900">Sign-in protection</h2>
              <div className="mt-4 divide-y divide-slate-200">
                <div className="flex items-center justify-between gap-5 py-4 first:pt-0">
                  <div>
                    <p className="text-sm font-medium text-slate-800">Two-step verification</p>
                    <p className="mt-1 text-sm text-slate-500">
                      Require an additional verification step when signing in.
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={twoStepEnabled}
                    aria-label="Two-step verification"
                    onClick={() =>
                      updatePreference(
                        "accountTwoStepEnabled",
                        !twoStepEnabled,
                        setTwoStepEnabled,
                      )
                    }
                    className={toggleClassName(twoStepEnabled)}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                        twoStepEnabled ? "translate-x-5" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between gap-5 py-4 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-slate-800">New sign-in alerts</p>
                    <p className="mt-1 text-sm text-slate-500">
                      Get notified when your account is accessed from a new device.
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={signInAlertsEnabled}
                    aria-label="New sign-in alerts"
                    onClick={() =>
                      updatePreference(
                        "accountSignInAlertsEnabled",
                        !signInAlertsEnabled,
                        setSignInAlertsEnabled,
                      )
                    }
                    className={toggleClassName(signInAlertsEnabled)}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                        signInAlertsEnabled ? "translate-x-5" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="flex items-start gap-4 px-5 py-5 sm:px-6">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-sky-50 text-sky-700">
              <FiMonitor aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">Active session</h2>
                  <p className="mt-1 text-sm text-slate-500">Current browser</p>
                </div>
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  This device
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Security;
