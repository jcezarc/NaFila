import os
from util.db.dynamo_table import DynamoTable
from util.db.sql_table import SqlTable
from util.db.mongo_table import MongoTable
from util.db.neo4j_table import Neo4Table
from util.db.lite_table import LiteTable

NAFILABR_USER = os.environ.get('NAFILABR_USER', '')
NAFILABR_PASSWORD = os.environ.get('NAFILABR_PASSWORD', '')
NAFILABR_HOST = os.environ.get('NAFILABR_HOST', 'localhost')

def get_table(schema):
    # # --- DynamoDB -----------------------
    # return DynamoTable(schema, {
    #     "service_name": "dynamodb",
    #     "region_name": "us-west-2",
    #     "endpoint_url": f"http://{NAFILABR_HOST}:8000",
    #     "aws_access_key_id": NAFILABR_USER,
    #     "aws_secret_access_key": NAFILABR_PASSWORD,
    # })
    # # --- Sql Server ----------------------
    # return SqlTable(schema, {
    #     "dialect": "mssql",
    #     "driver": "pyodbc",
    #     "username": NAFILABR_USER,
    #     "password": NAFILABR_PASSWORD,
    #     "host": NAFILABR_HOST,
    #     "port": "1433",
    #     "database": "nafilabr"
    # })
    # # --- MongoDB -------------------------
    # return MongoTable(schema, {
    #     "server": "mongodb+srv",
    #     "host_or_user": NAFILABR_USER,
    #     "port_or_password": NAFILABR_PASSWORD,
    #     "database": "nafilabr"
    # })
    # --- Postgres -------------------------
    # return SqlTable(schema, {
    #     "dialect": "postgresql",
    #     "driver": "psycopg2",
    #     "username": NAFILABR_USER,
    #     "password": NAFILABR_PASSWORD,
    #     "host": NAFILABR_HOST,
    #     "port": "5432",
    #     "database": "nafilabr"
    # })
    # # --- Neo4J -----------------------------
    # return Neo4Table(schema, {
    #     "host": NAFILABR_HOST,
    #     "port": 7687,
    #     "user": NAFILABR_USER,
    #     "password": NAFILABR_PASSWORD
    # })
    # # --- Sqlite ----------------------------
    # return LiteTable(schema, {
    #     "timeout": 5,
    #     "cached_statements": 100,
    #     "uri": True,
    #     "check_same_thread": True
    # })
    # --- MySql ----------------------------
    return LiteTable(schema, {
        "host": NAFILABR_HOST,
        "user": NAFILABR_USER,
        "password": NAFILABR_PASSWORD,
        "database": "nafila"
    })
