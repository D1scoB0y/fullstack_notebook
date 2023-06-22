import os
import dotenv


dotenv.load_dotenv()


class Config():
    '''App config'''

    SECRET_KEY = os.environ.get('SECRET_KEY', '')

    DB_URL = os.environ.get('DB_URL')

    ACCESS_TOKEN_EXPIRE_MINUTES = 43200

    # Next.js origin (need for configuring CORS middleware)
    FRONTEND_APP_URL = "http://localhost:3000"
