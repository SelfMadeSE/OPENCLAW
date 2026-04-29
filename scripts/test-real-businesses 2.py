# Real Grand Prairie/Alberta Businesses for Testing
REAL_BUSINESSES = [
    {
        "name": "Boston Pizza Grande Prairie",
        "url": "https://bostonpizza.com",
        "type": "Restaurant Chain",
        "location": "Grande Prairie, AB"
    },
    {
        "name": "Grande Prairie Furniture", 
        "url": "https://gpff.ca",
        "type": "Furniture Store",
        "location": "Grande Prairie, AB"
    },
    {
        "name": "City of Grande Prairie",
        "url": "https://cityofgp.com",
        "type": "Municipal Government",
        "location": "Grande Prairie, AB"
    },
    {
        "name": "Prairie Wood Flooring",
        "url": "https://prairiewoodflooring.ca", 
        "type": "Flooring Service",
        "location": "Grande Prairie, AB"
    }
]

print("Real businesses ready for audit testing:")
for biz in REAL_BUSINESSES:
    print(f"- {biz['name']}: {biz['url']}")