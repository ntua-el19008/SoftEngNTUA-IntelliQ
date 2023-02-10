import subprocess
import os
subprocess.check_call("pip install mysql-connector", shell=True)
import mysql.connector

# install npm packages
os.chdir('./api-backend')
subprocess.check_call("npm install", shell=True)


# Connect to MySQL server
cnx = mysql.connector.connect(user='root', host='localhost', password='', port=3306)

# Create cursor
cursor = cnx.cursor()

# Execute SQL scripts
with open('../data/tables.sql', 'r') as f:
    sql_script = f.read()

# Split the script into individual statements
statements = sql_script.split(';')

for statement in statements:
    if statement != '\n': # Ignore empty statements
        cursor.execute(statement)
        cnx.commit()


with open('../data/sample_data_tiny.sql', 'r') as f:
    sql_script = f.read()

# Split the script into individual statements
statements = sql_script.split(';')

for statement in statements:
    if statement != '\n': # Ignore empty statements
        cursor.execute(statement)
        cnx.commit()  
 


# Close cursor and connection
cursor.close()
cnx.close()

# Run the app
subprocess.call("node index.js", shell=True)