import requests

def parse_products(file_path):
    products = []

    with open(file_path, "r", encoding="utf-8") as file:
        for line in file:
            try:
                name, description, price, product_type = map(str.strip, line.split("|"))
                products.append({
                    "name": name,
                    "description": description,
                    "price": float(price),
                    "type": product_type
                })
            except ValueError:
                print(f"Skipping invalid line: {line.strip()}")

    return products

def add_products(products, domain):
    url = f"{domain}/add"
    headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json'
    }
    
    for product in products:
        try:
            response = requests.post(
                url,
                headers=headers,
                json={
                    "name": product["name"],
                    "description": product["description"],
                    "price": float(product["price"]),
                    "type": product["type"]
                }
            )

            if response.status_code == 200:
                print(f"Product '{product['name']}' added successfully.")
            else:
                print(f"Failed to add product '{product['name']}'. Status code: {response.status_code}, Response: {response.text}")
                
        except Exception as e:
            print(f"Error adding product '{product['name']}': {e}")

DOMAIN = "http://localhost:8000/api/v2"
PRODUCTS_FILE = "./products.txt"

products_to_add = parse_products(PRODUCTS_FILE)

add_products(products_to_add, DOMAIN)
