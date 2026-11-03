import json
import sys
sys.path.append('scripts')
from build_physics_ch4_part1 import part1_raw
from build_physics_ch4_part2 import part2_raw
from build_physics_ch4_part3 import part3_raw

all_raw = part1_raw + part2_raw + part3_raw
print(f"Total raw Chapter 4 questions loaded: {len(all_raw)}")

ch4_questions = []
for item in all_raw:
    num, q_text, opts, ans_idx, topic, src, exp = item
    ch4_questions.append({
        "id": f"phy_ch4_{num}",
        "chapterId": 4,
        "number": num,
        "question": q_text,
        "options": opts,
        "correctAnswer": ans_idx,
        "topic": topic,
        "source": src,
        "explanation": exp,
        "subject": "physics"
    })

# Verify sort and continuous numbering
ch4_questions.sort(key=lambda x: x["number"])
assert len(ch4_questions) == 243, f"Expected 243 questions, got {len(ch4_questions)}"
for i, q in enumerate(ch4_questions, 1):
    assert q["number"] == i, f"Mismatch at index {i}: question number is {q['number']}"

with open('src/data/questions/physics/phy_ch4.ts', 'w', encoding='utf-8') as f:
    f.write(f"""import {{ Question }} from '../../../types';\n\nexport const PHYSICS_CHAPTER_4_QUESTIONS: Question[] = {json.dumps(ch4_questions, ensure_ascii=False, indent=2)};\n""")

print(f"Successfully wrote src/data/questions/physics/phy_ch4.ts with {len(ch4_questions)} questions!")
