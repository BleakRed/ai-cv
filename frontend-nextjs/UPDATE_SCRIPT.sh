#!/bin/bash

# Next.js Migration Update Script
# This script helps you update component files for Next.js compatibility

echo "========================================="
echo "Next.js Migration Update Script"
echo "========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to update import statements
update_imports() {
    local file=$1
    echo "Updating imports in $file..."
    
    # Update relative imports to absolute imports with @/ alias
    sed -i '' 's|from "\./ui/|from "@/components/ui/|g' "$file"
    sed -i '' 's|from "\./components/|from "@/components/|g' "$file"
    sed -i '' 's|from "\./ThemeProvider"|from "@/components/providers/ThemeProvider"|g' "$file"
    sed -i '' 's|from "\./figma/|from "@/components/figma/|g' "$file"
}

# Function to add 'use client' directive
add_use_client() {
    local file=$1
    
    # Check if file already has 'use client'
    if ! grep -q '"use client"' "$file"; then
        echo "Adding 'use client' to $file..."
        # Add 'use client' as first line
        echo '"use client";' | cat - "$file" > temp && mv temp "$file"
        echo "" >> temp
        cat "$file" >> temp
        mv temp "$file"
    fi
}

echo "${YELLOW}This script will update your component files for Next.js compatibility.${NC}"
echo ""
echo "It will:"
echo "1. Update import paths from relative to absolute (@/ alias)"
echo "2. Add 'use client' directive to components that need it"
echo ""
echo "${RED}Make sure you have a backup of your files before proceeding!${NC}"
echo ""
read -p "Do you want to continue? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 1
fi

# Component files that need updating
COMPONENTS=(
    "components/Dashboard.tsx"
    "components/CVRatingPage.tsx"
    "components/CVCreatePage.tsx"
    "components/CVThemePage.tsx"
    "components/WireframeOverview.tsx"
    "components/DesignCanvas.tsx"
    "components/DatabaseSchema.tsx"
)

echo ""
echo "${GREEN}Starting migration...${NC}"
echo ""

for component in "${COMPONENTS[@]}"; do
    if [ -f "$component" ]; then
        echo "Processing $component..."
        update_imports "$component"
        add_use_client "$component"
        echo "${GREEN}✓ $component updated${NC}"
    else
        echo "${RED}✗ $component not found${NC}"
    fi
done

echo ""
echo "${GREEN}=========================================${NC}"
echo "${GREEN}Migration complete!${NC}"
echo "${GREEN}=========================================${NC}"
echo ""
echo "Next steps:"
echo "1. Review the updated files"
echo "2. Remove 'onNavigate' props from component interfaces"
echo "3. Replace onClick navigation with Next.js Link components"
echo "4. Test all functionality"
echo ""
echo "See COMPONENT_UPDATES.md for detailed instructions."
