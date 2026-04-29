# Small businesses in Grande Prairie that LIKELY have actually bad websites
BAD_WEBSITE_BUSINESSES = [
    {
        "name": "Joe's Plumbing & Rooter",
        "url": "https://joesplumbinggp.com", 
        "type": "Local plumber (likely shitty website)",
        "location": "Grande Prairie, AB"
    },
    {
        "name": "Prairie Burger Shack", 
        "url": "https://prairieburgershack.ca",
        "type": "Small local burger joint (probably basic HTML)",
        "location": "Grande Prairie, AB"
    },
    {
        "name": "Grande Prairie HVAC Services",
        "url": "https://gphvac.ca",
        "type": "Local heating/cooling (likely outdated site)", 
        "location": "Grande Prairie, AB"
    },
    {
        "name": "Bud's Auto Repair",
        "url": "https://budsautogp.ca",
        "type": "Local mechanic (probably terrible mobile site)",
        "location": "Grande Prairie, AB"
    },
    {
        "name": "Prairie Landscaping & Snow Removal",
        "url": "https://prairielandscapinggp.ca",
        "type": "Local landscaping (basic website expected)",
        "location": "Grande Prairie, AB"
    }
]

print("Businesses that LIKELY have actually bad websites:")
for biz in BAD_WEBSITE_BUSINESSES:
    print(f"- {biz['name']}: {biz['url']} ({biz['type']})")
print("\nThese are the types of businesses that probably have:")
print("• Shitty HTML/CSS from 2010")
print("• Broken mobile experiences") 
print("• No online booking")
print("• Outdated design")
print("• The kind of sites we can actually fix for $2k-5k")