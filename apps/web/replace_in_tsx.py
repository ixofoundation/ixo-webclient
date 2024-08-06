import os
import re

def replace_in_file(file_path):
    try:
        with open(file_path, 'r') as file:
            content = file.read()

        # Remove ReactComponent import
        content = re.sub(r"import { ReactComponent as \w+Icon } from '.*\.svg'\n?", '', content)

        # Remove SvgBox import if present
        content = re.sub(r"import { SvgBox } from '.*'\n?", '', content)

        # Replace standalone icon components
        icon_pattern = r'<(\w+)Icon\s*/>'
        
        def replace_icon(match):
            icon_name = match.group(1)
            return f"<Image src={{Icon{icon_name}}} alt='{icon_name}' width={{5}} height={{5}} color={{theme.colors.blue[5]}} />"

        content, num_replacements = re.subn(icon_pattern, replace_icon, content)

        # Replace SvgBox wrapped icons
        svgbox_pattern = r'<SvgBox[^>]*>\s*<(\w+)Icon\s*/>\s*</SvgBox>'
        
        def replace_svgbox(match):
            icon_name = match.group(1)
            return f"<Image src={{Icon{icon_name}}} alt='{icon_name}' width={{5}} height={{5}} color={{theme.colors.blue[5]}} />"

        content, svgbox_replacements = re.subn(svgbox_pattern, replace_svgbox, content)

        num_replacements += svgbox_replacements

        # Debug: Print content after replacements
        print(f"Content after replacements in {file_path}:\n", content)

        # Add Image import if replacements were made
        if num_replacements > 0:
            if "import Image from 'next/image'" not in content:
                content = "import Image from 'next/image'\n" + content

        # Add imports for icons if replacements were made
        if num_replacements > 0:
            # Adjust the regex pattern to match the new format
            icon_imports = set(re.findall(r'Icon(\w+)}', content))
            import_statements = [f"import {{ Icon{icon} }} from 'components/IconPaths'" for icon in icon_imports]
            
            # Debug: Print identified icon imports
            print("Identified icon imports:", icon_imports)

            # Find the position to insert new imports
            import_position = 0
            for match in re.finditer(r'^import.*$', content, re.MULTILINE):
                import_position = max(import_position, match.end())

            # Debug: Print identified import statements and position
            print("Identified import statements to add:", import_statements)
            print("Position to insert new imports:", import_position)
        
            # Insert new imports after the last existing import
            if import_statements:
                content = content[:import_position] + '\n' + '\n'.join(import_statements) + '\n' + content[import_position:]

        with open(file_path, 'w') as file:
            file.write(content)
    except FileNotFoundError as e:
        print(f"Error: File not found - {file_path}")

def process_directory(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx'):
                file_path = os.path.join(root, file)
                replace_in_file(file_path)

# Usage
directory_path = './src/components'
process_directory(directory_path)
