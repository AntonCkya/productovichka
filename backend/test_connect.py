import psycopg2

try:
    conn = psycopg2.connect(
        dbname="mydb",
        user="admin",
        password="aboba",
        host="localhost",
        port="5432"
    )
    print("Connection successful!")
    conn.close()
except Exception as e:
    print(f"Error: {e}")