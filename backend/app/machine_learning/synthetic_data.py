import numpy as np
import pandas as pd
from typing import Tuple, List, Dict

SCENARIOS: Dict[str, int] = {
    "stable": 0,
    "sleep_decline": 1,
    "hr_persistent": 2,
    "combined": 3,
    "missing_readings": 4,
}


def generate_synthetic_data(n_samples: int = 2000, random_state: int = 42) -> Tuple[pd.DataFrame, pd.Series]:
    rng = np.random.default_rng(random_state)
    labels = rng.choice(list(SCENARIOS.values()), size=n_samples)
    rows = []
    for lab in labels:
        if lab == SCENARIOS["stable"]:
            hr_mean = rng.normal(70, 5)
            hr_std = rng.normal(3, 1)
            bp_sys = rng.normal(118, 6)
            bp_dia = rng.normal(76, 4)
            spo2 = rng.normal(98, 0.8)
            activity = rng.normal(5000, 1000)
            sleep_hours = rng.normal(7.5, 0.6)
            symptom_score = rng.integers(0, 2)
            env_co2 = rng.normal(420, 20)
            env_temp = rng.normal(22, 1)
        elif lab == SCENARIOS["sleep_decline"]:
            hr_mean = rng.normal(75, 6)
            hr_std = rng.normal(4, 1.2)
            bp_sys = rng.normal(120, 7)
            bp_dia = rng.normal(78, 5)
            spo2 = rng.normal(97.5, 1.0)
            activity = rng.normal(4500, 1200)
            sleep_hours = rng.normal(5.5, 0.9)
            symptom_score = rng.integers(0, 4)
            env_co2 = rng.normal(430, 25)
            env_temp = rng.normal(22.5, 1.2)
        elif lab == SCENARIOS["hr_persistent"]:
            hr_mean = rng.normal(95, 8)
            hr_std = rng.normal(6, 2)
            bp_sys = rng.normal(125, 8)
            bp_dia = rng.normal(82, 6)
            spo2 = rng.normal(96.5, 1.5)
            activity = rng.normal(3000, 1500)
            sleep_hours = rng.normal(6.5, 1.0)
            symptom_score = rng.integers(1, 6)
            env_co2 = rng.normal(440, 30)
            env_temp = rng.normal(23, 1.5)
        elif lab == SCENARIOS["combined"]:
            hr_mean = rng.normal(88, 7)
            hr_std = rng.normal(5, 1.5)
            bp_sys = rng.normal(130, 10)
            bp_dia = rng.normal(85, 7)
            spo2 = rng.normal(96.0, 1.5)
            activity = rng.normal(2500, 1400)
            sleep_hours = rng.normal(5.0, 1.2)
            symptom_score = rng.integers(2, 7)
            env_co2 = rng.normal(460, 40)
            env_temp = rng.normal(23.5, 1.8)
        else:
            hr_mean = rng.normal(72, 10)
            hr_std = rng.normal(5, 3)
            bp_sys = rng.normal(118, 12)
            bp_dia = rng.normal(76, 8)
            spo2 = rng.normal(97.5, 2.5)
            activity = rng.normal(4000, 2000)
            sleep_hours = rng.normal(6.8, 2.0)
            symptom_score = rng.integers(0, 6)
            env_co2 = rng.normal(430, 60)
            env_temp = rng.normal(22, 2.5)
        row = {
            "hr_mean": float(hr_mean),
            "hr_std": float(hr_std),
            "bp_sys": float(bp_sys),
            "bp_dia": float(bp_dia),
            "spo2": float(spo2),
            "activity": float(activity),
            "sleep_hours": float(sleep_hours),
            "symptom_score": int(symptom_score),
            "env_co2": float(env_co2),
            "env_temp": float(env_temp),
            "label": int(lab),
        }
        rows.append(row)
    df = pd.DataFrame(rows)
    return df.drop(columns=["label"]), df["label"]


def get_label_map() -> Dict[int, str]:
    return {v: k for k, v in SCENARIOS.items()}
