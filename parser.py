import pandas as pd
import pyodbc 

path = "http://c2-217-73-58-127.elastic.cloud.croc.ru:8680/RTDM/PoolDiagnostics.jsp"
data = pd.read_html(path)
data = data[0]

table1 = data[0:8][[7, 8]].dropna().drop([0, 1])

data1 = data.fillna(0)
data1 = data1[9:][0]
names = data1[data1 != '0'][data1 != 0]
table2 = data[9:].dropna()
table2[0] = names.values
if "Resource Name" in table2[0].to_list():
    table2 = table2.drop(table2.index[0])

server = 'c2-185-12-28-165.elastic.cloud.croc.ru,1433' 
database = 'db_Team7' 
username = 'Team7' 
password = 'Team71!ijn' 
cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+ password)
cursor = cnxn.cursor()
for row in table2.iterrows():
    inf = ', '.join([f"'{row[1][i]}'" for i in range(9)])
    cursor.execute(f"INSERT INTO RTDM_TECH.METRICS VALUES({inf})")
cnxn.commit()

cursor.close()
cnxn.close()