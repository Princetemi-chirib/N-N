export const MEASUREMENT_FIELDS = [
  { key: "headSize", label: "Head Size" },
  { key: "agbadaShoulder", label: "Agbada Shoulder" },
  { key: "agbadaLength", label: "Agbada Length" },
  { key: "shoulder", label: "Shoulder" },
  { key: "chest", label: "Chest" },
  { key: "neck", label: "Neck" },
  { key: "armHole", label: "Arm Hole" },
  { key: "roundSleeve", label: "Round Sleeve" },
  { key: "sleeveLength", label: "Sleeve Length" },
  { key: "foreArm", label: "Fore Arm" },
  { key: "clothLength", label: "Cloth Length" },
  { key: "tommy", label: "Tommy" },
  { key: "lapThigh", label: "Lap/Thigh" },
  { key: "calf", label: "Calf" },
  { key: "trouserBase", label: "Trouser Base" },
  { key: "cuffWrist", label: "Cuff/Wrist" },
  { key: "waist", label: "Waist" },
  { key: "knee", label: "Knee" },
  { key: "trouserLength", label: "Trouser Length" },
] as const;

export type MeasurementKey = (typeof MEASUREMENT_FIELDS)[number]["key"];
