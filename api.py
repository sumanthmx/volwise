from flask import Flask
from decimal import Decimal
from datetime import datetime
from datetime import timedelta
import json
import psycopg2

app = Flask(__name__)
host = '192.168.2.5'  # local windows postgresql on eblamda pc
port = '5432'
database = 'market_data'  # google cloud db postgres
user = 'md_admin'  # user on windows desktop eb lambda
password = 'Ced43tes!m1'  # local windows postgresql
current_time = datetime.now()
@app.route('/api/data')
def get_data():
    data = [{'Inst1': 'SPX', 'Inst2': 'GOOG', '1w': 0.42, '2w': 0.35, '1m': 0.31, '2m': 0.27, '3m': 0.25,
            '6m': 0.23,	'9m': 0.21,	'12m': 0.20, '1m1m': 0.34, '1m2m': 0.30, '2m1m': 0.28,
            '2m2m': 0.26, '3m3m': 0.28,	'6m3m': 0.25, '6m6m': 0.22, '9m3m': 0.20, '1w rlzd': 0.18,
            '2w rlzd': 0.17, '1m rlzd': 0.16, '1w spd': 0.15, '2w spd': 0.15, '1m spd': 0.15},
    {'Inst1': 'SPX', 'Inst2': 'AAPL', '1w': 0.42, '2w': 0.35, '1m': 0.31, '2m': 0.27, '3m': 0.25,
     '6m': 0.23, '9m': 0.21, '12m': 0.20, '1m1m': 0.34, '1m2m': 0.30, '2m1m': 0.28,
     '2m2m': 0.26, '3m3m': 0.28, '6m3m': 0.25, '6m6m': 0.22, '9m3m': 0.20, '1w rlzd': 0.18,
     '2w rlzd': 0.17, '1m rlzd': 0.16, '1w spd': 0.15, '2w spd': 0.15, '1m spd': 0.15}]
    return json.dumps(data, sort_keys=False)
''' 
We have a list of instruments. We have a list of expiry dates. We look for an option with the desired
expiry date and the desired underlying. 
'''
@app.route('/api/equity_vol_data')
def get_equity_vol_data():
    data = [{'Inst': 'GOOG', '1w': 0.42, '2w': 0.35, '1m': 0.31, '2m': 0.27, '3m': 0.25,
            '6m': 0.23,	'9m': 0.21,	'12m': 0.20, '1m1m': 0.34, '1m2m': 0.30, '2m1m': 0.28,
            '2m2m': 0.26, '3m3m': 0.28,	'6m3m': 0.25, '6m6m': 0.22, '9m3m': 0.20, '1w rlzd': 0.18,
            '2w rlzd': 0.17, '1m rlzd': 0.16, '1w spd': 0.15, '2w spd': 0.15, '1m spd': 0.15},
    {'Inst': 'AAPL', '1w': 0.42, '2w': 0.35, '1m': 0.31, '2m': 0.27, '3m': 0.25,
     '6m': 0.23, '9m': 0.21, '12m': 0.20, '1m1m': 0.34, '1m2m': 0.30, '2m1m': 0.28,
     '2m2m': 0.26, '3m3m': 0.28, '6m3m': 0.25, '6m6m': 0.22, '9m3m': 0.20, '1w rlzd': 0.18,
     '2w rlzd': 0.17, '1m rlzd': 0.16, '1w spd': 0.15, '2w spd': 0.15, '1m spd': 0.15}]
    return json.dumps(data, sort_keys=False)

@app.route('/api/temp_connection')
def get_temp_vol_data():
    conn = psycopg2.connect(
        host=host,
        port=port,
        database=database,
        user=user,
        password=password
    )
    cur = conn.cursor()
    '''
    cur.execute("""
    SELECT "inst", "1w"::numeric(4,3), "2w"::numeric(4,3), "1m"::numeric(4,3), "2m"::numeric(4,3), "3m"::numeric(4,3), "6m"::numeric(4,3), "9m"::numeric(4,3), "12m"::numeric(4,3), 
    "1m1m"::numeric(4,3), "1m2m"::numeric(4,3), "2m1m"::numeric(4,3), "2m2m"::numeric(4,3), "3m3m"::numeric(4,3), "6m3m"::numeric(4,3), "6m6m"::numeric(4,3), "9m3m"::numeric(4,3), 
    "1w rlzd"::numeric(4,3), "2w rlzd"::numeric(4,3), "1m rlzd"::numeric(4,3), "1w spd"::numeric(4,3), "2w spd"::numeric(4,3), "1m spd"::numeric(4,3) 
      from sm_vol_data where date_trunc('day', quote_date) = date_trunc('day', %s)
      """, (current_time,))
    '''
    cur.execute("""
        SELECT "inst", to_char("1w", 'FM9.000'), to_char("2w", 'FM9.000'), to_char("1m", 'FM9.000'), to_char("2m", 'FM9.000'), to_char("3m", 'FM9.000'), to_char("6m", 'FM9.000'), to_char("9m", 'FM9.000'), to_char("12m", 'FM9.000'), 
        to_char("1m1m", 'FM9.000'), to_char("1m2m", 'FM9.000'), to_char("2m1m", 'FM9.000'), to_char("2m2m", 'FM9.000'), to_char("3m3m", 'FM9.000'), to_char("6m3m", 'FM9.000'), to_char("6m6m", 'FM9.000'), to_char("9m3m", 'FM9.000'), 
        to_char("1w rlzd", 'FM9.000'), to_char("2w rlzd", 'FM9.000'), to_char("1m rlzd", 'FM9.000'), to_char("1w spd", 'FM9.000'), to_char("2w spd", 'FM9.000'), to_char("1m spd", 'FM9.000')
          from sm_vol_data where date_trunc('day', quote_date) = date_trunc('day', %s)
          """, (current_time,))
    data = cur.fetchall()
    converted_data = [[float(val) if isinstance(val, Decimal) else val for val in row] for row in data]
    return json.dumps(converted_data, sort_keys=False)

@app.route('/api/vol_graph/<inst>/<expiry>')
def get_date_vols(inst, expiry):
    conn = psycopg2.connect(
        host=host,
        port=port,
        database=database,
        user=user,
        password=password
    )
    cur = conn.cursor()
    query = """SELECT TO_CHAR(quote_date, 'YYYY-MM-DD') as formatted_date, "{0}" FROM sm_vol_data WHERE inst = %s ORDER BY formatted_date ASC""".format(expiry)
    params = [inst]
    cur.execute(query, params)
    data = cur.fetchall()
    converted_data = [[float(val) if isinstance(val, Decimal) else val for val in row] for row in data]
    json_data = {item[0]: item[1] for item in converted_data}
    return json.dumps(json_data, sort_keys=False)


# edit this to include lookbacks later on (third argument)
@app.route('/api/vol_shade/<inst>/<expiry>/<value>')
def get_percent(inst, expiry, value):
    conn = psycopg2.connect(
        host=host,
        port=port,
        database=database,
        user=user,
        password=password
    )
    cur = conn.cursor()
    cur.execute("""SELECT count(*) FROM sm_vol_data WHERE inst = %s""", [inst])
    total = cur.fetchone()
    if total[0] == 0:
        return [0]
    query = """SELECT count(*) FROM sm_vol_data WHERE "{0}" >= %s AND inst = %s""".format(
        expiry)
    params = [value, inst]
    cur.execute(query, params)
    count = cur.fetchone()
    return [(total[0] - count[0]) / total[0]]

@app.route('/api/vol_perc/<lookback>')
def get_perc(lookback):
    conn = psycopg2.connect(
        host=host,
        port=port,
        database=database,
        user=user,
        password=password
    )
    cur = conn.cursor()
    percentiles = {}
    cur.execute("SELECT distinct inst from sm_vol_data")
    inst_list = cur.fetchall()
    columns = ['inst', '1w', '2w', '1m', '2m', '3m', '6m', '9m', '12m', '1m1m', '1m2m',
               '2m1m', '2m2m', '3m3m', '6m3m', '6m6m', '9m3m', '1w rlzd', '2w rlzd', '1m rlzd', '1w spd', '2w spd',
               '1m spd']
    for instrument in inst_list:
        instr = instrument[0]
        for expiry in columns:
            if expiry == 'inst':
                percentiles[instr+'-'+expiry] = instr
            elif lookback == 'none':
                cur.execute("""
                    SELECT "{0}" from sm_vol_data where inst = %s AND date_trunc('day', quote_date) = date_trunc('day', %s)
                          """.format(expiry), (instr, current_time))
                val = cur.fetchone()
                cur.execute("""SELECT count(*) FROM sm_vol_data WHERE inst = %s""", [instr])
                total = cur.fetchone()
                if total[0] == 0 or val is None:
                    percentiles[instr+'-'+expiry] = 0
                else:
                    query = """SELECT count(*) FROM sm_vol_data WHERE "{0}" >= %s AND inst = %s""".format(
                        expiry)
                    params = [val[0], instr]
                    cur.execute(query, params)
                    count = cur.fetchone()
                    percentiles[instr+'-'+expiry] = '%.3f'%((total[0] - count[0]) / total[0])
            else:
                time = lookback[0]
                if lookback[1] == 'm':
                    delta = timedelta(days=float(time) * 30)
                elif lookback[1] == 'd':
                    delta = timedelta(days=float(time))
                elif lookback[1] == 'w':
                    delta = timedelta(weeks=float(time))
                else:   # years
                    delta = timedelta(weeks=float(time) * 52)
                cur.execute("""SELECT "{0}" from sm_vol_data where inst = %s AND date_trunc('day', quote_date) = date_trunc('day', %s)
                    """.format(expiry), (instr, current_time))
                val = cur.fetchone()
                cur.execute("""SELECT count(*) FROM sm_vol_data WHERE inst = %s AND 
                quote_date >= NOW() - INTERVAL %s""", [instr, delta])
                total = cur.fetchone()
                if total[0] == 0 or val is None:
                    percentiles[instr + '-' + expiry] = 0
                else:
                    query = """SELECT count(*) FROM sm_vol_data WHERE "{0}" >= %s AND inst = %s
                    AND quote_date >= NOW() - INTERVAL %s""".format(
                        expiry)
                    params = [val[0], instr, delta]
                    cur.execute(query, params)
                    count = cur.fetchone()
                    percentiles[instr + '-' + expiry] = '%.3f'%((total[0] - count[0]) / total[0])
    return json.dumps(percentiles, sort_keys=False)

if __name__ == '__main__':
    app.run(host='0.0.0.0')