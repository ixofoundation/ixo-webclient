import os
import re
def find_svg_imports_and_replace(root_dir):
    # Regular expression to find both .svg and .svg?url imports
    svg_import_regex = re.compile(
        r'import\s+([A-Za-z0-9_]+)\s+from\s+[\'"]([^\'"]+\.svg(?:\?url)?)[\'"]\s*;?',
        re.IGNORECASE
    )
    
    # Regular expression to find SVG component usage in JSX/TSX
    svg_component_usage_regex = re.compile(r'<([A-Za-z0-9_]+)(\s*[^>]*)\/>', re.IGNORECASE)

    # Walk through all files in the root directory
    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            # Only process JavaScript/TypeScript files
            if filename.endswith(('.tsx')) and not filename.endswith('.styles.ts') and not filename.endswith('.styles.tsx'):
                file_path = os.path.join(dirpath, filename)
                with open(file_path, 'r', encoding='utf-8') as file:
                    content = file.read()

                # Find all SVG imports
                svg_imports = svg_import_regex.findall(content)
                
                if(len(svg_imports) > 0):
                    print(f"Found {len(svg_imports)} SVG imports in file: {file_path}")
                
                modified = False

                for svg_variable, svg_path in svg_imports:
                    # Check if the SVG is used as a React component
                    if svg_component_usage_regex.search(content):
                        # Update content by replacing SVG component with <img> tag
                        content = re.sub(
                            fr'<{svg_variable}(\s*[^>]*)\/>',
                            fr'<img src="/{svg_path.split("?")[0]}"\1 />',
                            content
                        )
                        modified = True

                        # Remove the SVG import statement
                        content = re.sub(
                            fr'import\s+{svg_variable}\s+from\s+[\'"]{re.escape(svg_path)}[\'"]\s*;?', 
                            '', 
                            content
                        )

                        # # Move the SVG file to the public folder
                        # original_svg_path = os.path.join(dirpath, svg_path.split('?')[0])
                        # public_svg_path = os.path.join(root_dir, 'public', os.path.basename(svg_path.split('?')[0]))
                        # os.makedirs(os.path.dirname(public_svg_path), exist_ok=True)
                        # if os.path.exists(original_svg_path):
                        #     os.rename(original_svg_path, public_svg_path)
                        #     print(f"Moved {original_svg_path} to {public_svg_path}")

                # Save changes if the file was modified
                if modified:
                    with open(file_path, 'w', encoding='utf-8') as file:
                        file.write(content)
                    print(f"Updated file: {file_path}")


# Example usage: replace with the actual path to your project
find_svg_imports_and_replace('./src')
