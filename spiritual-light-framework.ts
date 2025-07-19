// This file describes my way of seeing how Life is Experienced.
// Written in Typescript :)

// JHWH (ether creates all 4)
export type TetragrammatonElement = "Fire" | "Water" | "Air" | "Earth" | "Ether";
export type Emotion = "Desire" | "Joy" | "Grief" | "Fear";

export type StateOfBeing =
    | { type: "Elemental"; element: TetragrammatonElement; emotion: Emotion }
    | { type: "Shadow"; description: string }
    | { type: "Presence" }
    | { type: "Suffering"; from: StateOfBeing };

export type Mandala = {
    label: string;
    color: string;
    symbol: string;
    describe: () => string;
};

export type Experience = {
    light: Light;
    state: StateOfBeing;
    mandala?: Mandala;
    describe: () => string;
};

export type Light = {
    through: (state: StateOfBeing) => Experience;
};

export const Source = {
    flash: (): Light => ({
        through: (state: StateOfBeing): Experience => {
            const mandala =
                state.type === "Elemental" ? mandalas[state.element] :
                    state.type === "Shadow" ? ShadowMandala :
                        undefined;

            return {
                light: Source.flash(),
                state,
                mandala,
                describe: () => {
                    if (state.type === "Presence") return `☀️ The Light simply *is*.`;
                    if (state.type === "Suffering") return `⚠️ Suffering arises from resisting:\n→ ${describeState(state.from)}`;
                    return `🌀 The Light is experiencing:\n→ ${mandala?.describe()}`;
                }
            };
        }
    })
};

export const mandalas: Record<TetragrammatonElement, Mandala> = {
    Fire: { label: "Fire", color: "Red", symbol: "🔥", describe() { return `Mandala of Fire 🔥 (Red)`; } },
    Water: { label: "Water", color: "Blue", symbol: "💧", describe() { return `Mandala of Water 💧 (Blue)`; } },
    Air: { label: "Air", color: "Yellow", symbol: "🌬️", describe() { return `Mandala of Air 🌬️ (Yellow)`; } },
    Earth: { label: "Earth", color: "Green", symbol: "🌱", describe() { return `Mandala of Earth 🌱 (Green)`; } },
    Ether: { label: "Ether", color: "White", symbol: "💡", describe() { return `Mandala of Ether 💡 (White)`; } },
};

export const ShadowMandala: Mandala = {
    label: "Shadow",
    color: "Black",
    symbol: "🌑",
    describe: () => `Mandala of Shadow 🌑 (Black)`
};

export const describeState = (state: StateOfBeing): string => {
    switch (state.type) {
        case "Presence": return "Presence — Nirvana (Pure Being)";
        case "Shadow": return `Shadow: ${state.description}`;
        case "Elemental": return `${state.emotion} (${state.element})`;
        case "Suffering": return `Suffering from:\n→ ${describeState(state.from)}`;
    }
};

// ===

const nirvana = Source.flash().through({ type: "Presence" });
const desire = Source.flash().through({ type: "Elemental", element: "Fire", emotion: "Desire" });
const shadowWorkToBeDone = Source.flash().through({ type: "Shadow", description: "Unacknowledged fear of weakness" });
const sufferingFromResistingShadow = Source.flash().through({ type: "Suffering", from: { type: "Shadow", description: "Abandoned inner child" } });

// === Result ===

console.log(desire.describe()); // 🔥
console.log(nirvana.describe()); // ☀️
console.log(shadowWorkToBeDone.describe()); // 🌑
console.log(sufferingFromResistingShadow.describe()); // ⚠️

/*
[LOG]: "🌀 The Light is experiencing:
→ Mandala of Fire 🔥 (Red)" 
[LOG]: "☀️ The Light simply *is*." 
[LOG]: "🌀 The Light is experiencing:
→ Mandala of Shadow 🌑 (Black)" 
[LOG]: "⚠️ Suffering arises from resisting:
→ Shadow: Abandoned inner child" 
*/
