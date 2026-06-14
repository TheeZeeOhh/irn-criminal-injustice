import os
import re

def replace_in_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Replace the URLs
    new_content = content.replace('https://injusticereformnetwork.org', 'https://theezeeohh.github.io/irn-criminal-injustice')
    
    # Replace plain text references not preceded by @
    new_content = re.sub(r'(?<!@)injusticereformnetwork\.org', 'theezeeohh.github.io/irn-criminal-injustice', new_content)

    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith(('.tsx', '.ts')):
            replace_in_file(os.path.join(root, file))
