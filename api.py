from flask import Flask
import json
import psycopg2

app = Flask(__name__)
host = '192.168.2.5'  # local windows postgresql on eblamda pc
port = '5432'
database = 'market_data'  # google cloud db postgres
user = 'md_admin'  # user on windows desktop eb lambda
password = 'Ced43tes!m1'  # local windows postgresql
@app.route('/api/data')
def get_data():
    # Connect to the database
    '''
    conn = psycopg2.connect(
        host=host,
        port=port,
        database=database,
        user=user,
        password=password
    )
    cur = conn.cursor()
    cur.execute("SELECT name, id, instrument_type_id FROM sm_instrument_test where instrument_type_id in (2, 3, 8)")
    '''
    data = [{'Inst1': 'SPX', 'Inst2': 'GOOG', '1w': 0.42, '2w': 0.35, '1m': 0.31, '2m': 0.27, '3m': 0.25,
            '6m': 0.23,	'9m': 0.21,	'12m': 0.20, '1m1m': 0.34, '1m2m': 0.30, '2m1m': 0.28,
            '2m2m': 0.26, '3m3m': 0.28,	'6m3m': 0.25, '6m6m': 0.22, '9m3m': 0.20, '1w rlzd': 0.18,
            '2w rlzd': 0.17, '1m rlzd': 0.16, '1w spd': 0.15, '2w spd': 0.15, '1m spd': 0.15},
    {'Inst1': 'SPX', 'Inst2': 'AAPL', '1w': 0.42, '2w': 0.35, '1m': 0.31, '2m': 0.27, '3m': 0.25,
     '6m': 0.23, '9m': 0.21, '12m': 0.20, '1m1m': 0.34, '1m2m': 0.30, '2m1m': 0.28,
     '2m2m': 0.26, '3m3m': 0.28, '6m3m': 0.25, '6m6m': 0.22, '9m3m': 0.20, '1w rlzd': 0.18,
     '2w rlzd': 0.17, '1m rlzd': 0.16, '1w spd': 0.15, '2w spd': 0.15, '1m spd': 0.15}]

    return json.dumps(data, sort_keys=False)

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

if __name__ == '__main__':
    app.run(host='0.0.0.0')