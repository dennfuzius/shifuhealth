"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/lib/auth/auth-context";
import { createClient } from "@/lib/supabase/client";

type Profile = {
  display_name: string;
  birth_year: number | null;
  gender: string | null;
  health_goals: string[];
  dietary_preferences: string[];
};

export default function ProfileForm() {
  const t = useTranslations("profile");
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile>({
    display_name: "",
    birth_year: null,
    gender: null,
    health_goals: [],
    dietary_preferences: [],
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()
      .then(({ data }) => {
        if (data) {
          setProfile({
            display_name: data.display_name || "",
            birth_year: data.birth_year,
            gender: data.gender,
            health_goals: data.health_goals || [],
            dietary_preferences: data.dietary_preferences || [],
          });
        }
        setLoading(false);
      });
  }, [user, supabase]);

  const handleSave = async () => {
    if (!user) return;
    setSaved(false);
    await supabase
      .from("profiles")
      .update({
        display_name: profile.display_name,
        birth_year: profile.birth_year,
        gender: profile.gender,
        health_goals: profile.health_goals,
        dietary_preferences: profile.dietary_preferences,
      })
      .eq("id", user.id);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const toggleArrayItem = (
    field: "health_goals" | "dietary_preferences",
    value: string
  ) => {
    setProfile((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const inputClass =
    "w-full font-body text-sm px-4 py-3 rounded-btn outline-none";
  const inputStyle = {
    backgroundColor: "var(--color-bg)",
    border: "1px solid var(--color-border)",
    color: "var(--color-text)",
  };

  const goalKeys = [
    "goalEnergy",
    "goalSleep",
    "goalStress",
    "goalDigestion",
    "goalPain",
    "goalWeight",
    "goalImmune",
  ] as const;
  const dietKeys = [
    "dietVegetarian",
    "dietVegan",
    "dietGlutenFree",
    "dietLactoseFree",
  ] as const;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="font-body text-sm" style={{ color: "var(--color-text-muted)" }}>
          ...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Avatar + name */}
      <div className="flex items-center gap-4">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center font-body text-xl font-bold"
          style={{ backgroundColor: "var(--color-primary)", color: "#fff" }}
        >
          {profile.display_name
            ? profile.display_name.charAt(0).toUpperCase()
            : user?.email?.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-body text-base font-bold" style={{ color: "var(--color-text)" }}>
            {profile.display_name || user?.email}
          </p>
          <p className="font-body text-sm" style={{ color: "var(--color-text-muted)" }}>
            {user?.email}
          </p>
        </div>
      </div>

      {/* Personal info */}
      <section>
        <h2 className="font-body text-lg font-bold mb-4" style={{ color: "var(--color-text)" }}>
          {t("personalInfo")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-body text-sm font-medium block mb-1.5" style={{ color: "var(--color-text-secondary)" }}>
              {t("displayName")}
            </label>
            <input
              type="text"
              value={profile.display_name}
              onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
              className={inputClass}
              style={inputStyle}
            />
          </div>
          <div>
            <label className="font-body text-sm font-medium block mb-1.5" style={{ color: "var(--color-text-secondary)" }}>
              {t("birthYear")}
            </label>
            <input
              type="number"
              value={profile.birth_year || ""}
              onChange={(e) => setProfile({ ...profile, birth_year: e.target.value ? parseInt(e.target.value) : null })}
              placeholder="1990"
              className={inputClass}
              style={inputStyle}
            />
          </div>
          <div>
            <label className="font-body text-sm font-medium block mb-1.5" style={{ color: "var(--color-text-secondary)" }}>
              {t("gender")}
            </label>
            <select
              value={profile.gender || ""}
              onChange={(e) => setProfile({ ...profile, gender: e.target.value || null })}
              className={inputClass}
              style={inputStyle}
            >
              <option value="">{t("genderNone")}</option>
              <option value="male">{t("genderMale")}</option>
              <option value="female">{t("genderFemale")}</option>
              <option value="other">{t("genderOther")}</option>
            </select>
          </div>
        </div>
      </section>

      {/* Health info */}
      <section>
        <h2 className="font-body text-lg font-bold mb-2" style={{ color: "var(--color-text)" }}>
          {t("healthInfo")}
        </h2>
        <p className="font-body text-sm mb-4" style={{ color: "var(--color-text-muted)" }}>
          {t("note")}
        </p>

        <div className="mb-6">
          <label className="font-body text-sm font-medium block mb-2" style={{ color: "var(--color-text-secondary)" }}>
            {t("healthGoals")}
          </label>
          <div className="flex flex-wrap gap-2">
            {goalKeys.map((key) => {
              const active = profile.health_goals.includes(key);
              return (
                <button
                  key={key}
                  onClick={() => toggleArrayItem("health_goals", key)}
                  className="font-body text-sm px-4 py-2 rounded-full transition-colors"
                  style={{
                    backgroundColor: active ? "var(--color-primary)" : "var(--color-bg)",
                    color: active ? "#fff" : "var(--color-text-secondary)",
                    border: `1px solid ${active ? "var(--color-primary)" : "var(--color-border)"}`,
                  }}
                >
                  {t(key)}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="font-body text-sm font-medium block mb-2" style={{ color: "var(--color-text-secondary)" }}>
            {t("dietary")}
          </label>
          <div className="flex flex-wrap gap-2">
            {dietKeys.map((key) => {
              const active = profile.dietary_preferences.includes(key);
              return (
                <button
                  key={key}
                  onClick={() => toggleArrayItem("dietary_preferences", key)}
                  className="font-body text-sm px-4 py-2 rounded-full transition-colors"
                  style={{
                    backgroundColor: active ? "var(--color-primary)" : "var(--color-bg)",
                    color: active ? "#fff" : "var(--color-text-secondary)",
                    border: `1px solid ${active ? "var(--color-primary)" : "var(--color-border)"}`,
                  }}
                >
                  {t(key)}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Save */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          className="btn-primary font-body text-sm font-semibold px-8 py-3 rounded-btn"
        >
          {t("save")}
        </button>
        {saved && (
          <span className="font-body text-sm font-medium" style={{ color: "var(--color-primary)" }}>
            {t("saved")}
          </span>
        )}
      </div>
    </div>
  );
}
