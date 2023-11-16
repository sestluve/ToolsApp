import sys

sys.path.append('c:\python311\lib\site-packages')

from flask import Flask, redirect, request, jsonify, Response
import string
import random
import json
import re
import datetime


from flask_cors import CORS
import requests
import pyodbc
import psycopg2
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


'''
def connect_db_leaks():
    server ="10.2.0.11"
    database ="postgres"
    username ="postgres"
    password ="Daisy#2022"

    conn = psycopg2.connect(host=server, database=database, user=username, password=password)

    return conn
'''

def connect_db_apps():
    server ="10.2.0.9"
    database ="postgres"
    username ="postgres"
    password ="Daisy#2022"

    conn = psycopg2.connect(host=server, database=database, user=username, password=password)

    return conn

def connect_db_rcp():
    server ="10.2.0.16"
    database ="rcp"
    username ="rcp"
    password ="rcp"
    driver= '{ODBC Driver 17 for SQL Server}'

    cnxn = pyodbc.connect('DRIVER=' + str(driver) + ';SERVER=' + str(server) + ';PORT=1433;DATABASE=' + str(database) + ';UID=' + str(username) + ';PWD=' + str(password))

    return cnxn
    



@app.route('/api/login', methods=['POST'])
def login():
    jsonData = request.json
    token = jsonData.get('token')

    if not token:
        return jsonify({'result': 'error', 'message': 'You have to specify a token!'})

    conn = connect_db_rcp()
    conn2 = connect_db_apps()
    cur = conn.cursor()

    if token == "admin":
        password = jsonData.get('password')
        if not password:
            return jsonify({'result': 'error', 'message': 'You have to enter a password!'})
        
        
        
        if password == "7AqHj42Guz":
            cur3 = conn2.cursor()
            cur3.execute("SELECT * FROM leaks where end_time >= %s and end_time <= %s ORDER BY end_time DESC", (dateStart, dateEnd))
            result3 = cur3.fetchall()
            
            return jsonify({'result': 'success'})
        else:
            return jsonify({'result': 'error', 'message': 'Incorrect password'})
    else:
        # Execute a query to check if the user exists
        cur.execute("select * from dbo.RCP_Karty_Pracownika inner join dbo.Pracownik on dbo.Pracownik.id = dbo.RCP_Karty_Pracownika.IDPracownika inner join dbo.RCP_Karty on dbo.RCP_Karty.ID = IDKarty where NumerLogiczny=?", (token, ))

        # fetch the first row of the result set
        result = cur.fetchone()

        # Check if any results were returned
        if result:
            conn2 = connect_db_apps()
            cur2 = conn2.cursor()
            cur2.execute("SELECT * FROM tools")
            result2 = cur2.fetchall()

            # Process the tools data
            grouped_tools = {}
            for row in result2:
                group = row[1]  # Replace with the index of the group column
                tool_name = row[2]  # Replace with the index of the tool name column
                if group not in grouped_tools:
                    grouped_tools[group] = []
                grouped_tools[group].append(tool_name)


            return jsonify({'result': 'success', 'id': result[9], 'name': result[8], 'surname': result[7], 'data': grouped_tools})
        else:
            return jsonify({'result': 'error', 'message': 'Invalid token.'})
    



@app.route('/api/save', methods=['POST'])
def save():
    jsonData = request.json
    userId = jsonData.get('userId')
    userName = jsonData.get('userName')
    userSurname = jsonData.get('userSurname')
    data = jsonData.get('data')
    recordId = jsonData.get('recordId')

    if not userId:
        return jsonify({'result': 'error', 'message': 'You have to specify user id!'})

    conn = connect_db_apps()
    cur = conn.cursor()

    if recordId:
        '''
        # Execute a query to check if the user exists
        cur.execute("SELECT * FROM tools_presence where end_time id=%s", (fixId, ))

        # fetch the first row of the result set
        result = cur.fetchone()

        # Check if any results were returned
        if result:
            num_rows_affected = cur.execute("UPDATE tools_presence SET end_time=NULL WHERE id=%s", (fixId, ))
            conn.commit()

            if(num_rows_affected == 0):
                return jsonify({'result': 'error', 'message': 'Something went wrong!'})
                
            num_rows_affected = cur.execute("UPDATE leaks2_actions SET end_time=CURRENT_TIMESTAMP WHERE fix_id=%s AND start_time = (SELECT MAX(start_time) FROM leaks2_actions WHERE fix_id=%s)", (fixId, fixId))
            conn.commit()

            if(num_rows_affected == 0):
                return jsonify({'result': 'error', 'message': 'Something went wrong!'})
            
            if not postpone:
                num_rows_affected = cur.execute("UPDATE leaks SET end_time=CURRENT_TIMESTAMP WHERE id=%s", (fixId, ))
                conn.commit()

                if(num_rows_affected == 0):
                    return jsonify({'result': 'error', 'message': 'Something went wrong!'})

            return jsonify({'result': 'success'})
        '''


    if not data:
        return jsonify({'result': 'error', 'message': 'Data is incomplete!'})
    num_rows_affected = cur.execute("INSERT INTO tools_presence (user_id, user_name, user_surname, workplace, tool_name, tool_state, shift) VALUES (%s) RETURNING id;", (userId, userName, userSurname ))
    
    result = cur.fetchone()
    if(result is None):
        return jsonify({'result': 'error', 'message': 'Something went wrong!'})
    recordId = result[0]
    
    conn.commit()
    return jsonify({'result': 'success', 'recordId': recordId})








if __name__ == '__main__':
    app.run(debug=True, port=5003, host="0.0.0.0")