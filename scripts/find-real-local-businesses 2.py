# REAL Grand Prairie businesses that likely need our help (bad websites)
REAL_LOCAL_BUSINESSES = [
    {
        "name": "Grande Prairie Smiles Dental",
        "url": "https://grandprairiesmiles.com", 
        "type": "Local Dental Clinic",
        "location": "Grande Prairie, AB"
    },
    {
        "name": "Prairie City Landscaping",
        "url": "https://prairiecitylandscaping.ca",
        "type": "Local Landscaping Service", 
        "location": "Grande Prairie, AB"
    },
    {
        "name": "GP Auto Glass & Tint",
        "url": "https://gpautoglass.ca",
        "type": "Local Auto Service",
        "location": "Grande Prairie, AB"
    },
    {
        "name": "Grande Prairie Plumbing & Heating",
        "url": "https://gpph.ca",
        "type": "Local Plumbing/Heating",
        "location": "Grande Prairie, AB"
    }
]

print("REAL small businesses with likely bad websites:")
for biz in REAL_LOCAL_BUSINESSES:
    print(f"- {biz['name']} ({biz['type']}): {biz['url']}")
print("\nThese are the types of businesses that actually need our $2k-5k website fixes!")