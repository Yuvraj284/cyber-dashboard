from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import base64
import time
import math
import os

app = Flask(__name__)
CORS(app)

# =========================
# LOAD CSV FILES
# =========================

node_df = pd.read_csv("node_registry.csv")
logs_df = pd.read_csv("system_logs.csv")
schema_df = pd.read_csv("schema_config.csv")


# =========================
# HELPER FUNCTIONS
# =========================

def decode_base64(encoded_str):
    try:
        return base64.b64decode(encoded_str).decode()
    except:
        return "Invalid"


def get_active_column(current_time):
    try:
        current = schema_df[schema_df["time_start"] <= current_time].iloc[-1]
        return current["active_column"], current["version"]
    except:
        return "load_val", 1


# =========================
# API 1: MAIN NODE DATA
# =========================

@app.route("/api/nodes")
def get_nodes():

    current_time = int(time.time() * 1000) % 10000
    active_column, version = get_active_column(current_time)

    result = []

    for _, row in logs_df.iterrows():

        # 🔗 Find matching node
        node_row = node_df[node_df["node_uuid"] == row["node_id"]]

        if not node_row.empty:
            node_info = node_row.iloc[0]
            user_agent = node_info["user_agent"]
            infected = bool(node_info["is_infected"])
        else:
            user_agent = ""
            infected = False

        # 🔐 Decode
        try:
            encoded = user_agent.split()[-1]
        except:
            encoded = ""

        decoded = decode_base64(encoded)

        # 🚨 Alert detection
        alert = (
            row["json_status"] == "OPERATIONAL" and
            row["http_response_code"] != 200
        )

        # 🔥 Anomaly detection
        anomaly = row["response_time_ms"] > 200

        # 🔄 Schema value (SAFE for JSON)
        try:
            schema_value = row[active_column]
            if pd.isna(schema_value):
                schema_value = None
        except:
            schema_value = None

        result.append({
            "node_id": int(row["node_id"]),   # ✅ FIXED
            "http_status": int(row["http_response_code"]),
            "json_status": row["json_status"],
            "response_time": int(row["response_time_ms"]),
            "alert": alert,
            "anomaly": anomaly,
            "decoded_id": decoded,
            "infected": infected,
            "schema_value": schema_value,
            "schema_version": int(version)
        })

    return jsonify(result)


# =========================
# API 2: HEATMAP
# =========================

@app.route("/api/heatmap")
def heatmap():

    result = []

    for _, row in logs_df.iterrows():
        anomaly = row["response_time_ms"] > 200

        result.append({
            "node_id": int(row["node_id"]),
            "response_time": int(row["response_time_ms"]),
            "anomaly": anomaly
        })

    return jsonify(result)


# =========================
# API 3: SCHEMA
# =========================

@app.route("/api/schema")
def schema():

    current_time = int(time.time() * 1000) % 10000
    active_column, version = get_active_column(current_time)

    return jsonify({
        "version": int(version),
        "active_column": active_column
    })


# =========================
# API 4: ASSETS
# =========================

@app.route("/api/assets")
def assets():

    result = []

    for _, row in node_df.iterrows():

        try:
            encoded = row["user_agent"].split()[-1]
        except:
            encoded = ""

        decoded = decode_base64(encoded)

        result.append({
            "node_id": int(row["node_uuid"]),
            "encoded": encoded,
            "decoded": decoded,
            "infected": bool(row["is_infected"])
        })

    return jsonify(result)


# =========================
# HOME
# ======================

@app.route("/")
def home():
    return "Backend is running 🚀"


# =========================
# RUN
# =========================

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)