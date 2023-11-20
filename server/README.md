### Steps to setup the Server in Local

1. Create a Sample Postgres DB
2. Create a .env file with required values
3. Install all required packages using poetry 
4. Create necessary tables using alembic migrations
5. Run the app using given command in next section 

### Development Commands

To setup a DB instance, run:

```
docker run --rm -d --name postgres -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -p 5432:5432 postgres
```

Create a sample DB:

```
docker exec -it postgres psql -U myuser -c 'CREATE DATABASE mydb;'
```

Generate secret key value using this command:

```
openssl rand -hex 32
```

Setup this variables in a .env file

```
SQL_DB_URI=postgresql+psycopg://myuser:mypassword@0.0.0.0:5432/mydb
ALLOWED_ORIGINS={allowed_origin_urls}
APP_NAME=SAMPLE_APP
SECRET_KEY={secret_key_value}
JWT_HASHING_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRING_MINUTES=3600
PASSWORD_HASHING_SCHEME=bcrypt
```

To install dependencies, use:

```
poetry install
```

To activate poetry virtual environment, use:

```
poetry shell
```

Creating migration:
```
alembic revision --autogenerate -m "Migration Context Message"
```
Applying all migrations:

```
alembic upgrade head
```

Viewing migration history:

```
alembic history --verbose
```

To run the app locally, use:

```
poetry run uvicorn main:app --reload
```