import json
import os

os.makedirs('src/data/questions', exist_ok=True)

# Helper to convert Bengali letter to 0-3 index
def ans_to_idx(letter):
    mapping = {'ক': 0, 'খ': 1, 'গ': 2, 'ঘ': 3}
    return mapping.get(letter.strip(), 0)

# Chapter 1 questions
# We will define the full questions for Chapter 1
print("Building Chapter 1 and 2...")
