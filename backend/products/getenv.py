import os
from dotenv import load_dotenv

def get_dotenv_vars():
    load_dotenv()
    vars = {}
    vars['DB_HOST'] = os.getenv('DB_HOST')
    vars['DB_PORT'] = os.getenv('DB_PORT')
    vars['DB_USER'] = os.getenv('DB_USER')
    vars['DB_PASSWORD'] = os.getenv('DB_PASSWORD')
    vars['DB_NAME'] = os.getenv('DB_NAME')
    return vars
