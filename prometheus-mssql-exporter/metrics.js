/**
 * Collection of metrics and their associated SQL requests
 * Created by Pierre Awaragi
 */
const debug = require("debug")("metrics");
const client = require('prom-client');

// UP metric
const up = new client.Gauge({name: 'up', help: "UP Status"});

const sas_server_metrics = {
    metrics: {
        sas_server_metrics: new client.Gauge({name: 'sas_server_metrics', help: 'SAS Server Metrics', labelNames: ['resource_name', 'type']}),
    },
    query: `SELECT [Resource Name]
      ,[Active]
      ,[High]
      ,[Max active]
      ,[Idle]
      ,[Max idle]
      ,[Min idle]
  FROM [db_Team7].[RTDM_TECH].[METRICS]`,
    collect: function (rows, metrics) {
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const resource_name = row[0].value;
            const active = row[1].value;
            const high = row[2].value;
            const max_active = row[3].value;
            const idle = row[4].value;
            const max_idle = row[5].value;
            const min_idle = row[6].value;
            debug("Fetch SAS servers activity");
            metrics.sas_server_metrics.set({resource_name: resource_name, type: "active"}, active);
            metrics.sas_server_metrics.set({resource_name: resource_name, type: "high"}, high);
            metrics.sas_server_metrics.set({resource_name: resource_name, type: "max_active"}, max_active);
            metrics.sas_server_metrics.set({resource_name: resource_name, type: "idle"}, idle);
            metrics.sas_server_metrics.set({resource_name: resource_name, type: "max_idle"}, max_idle);
            metrics.sas_server_metrics.set({resource_name: resource_name, type: "min_idle"}, min_idle);
        }
    }
};


const metrics = [
    sas_server_metrics
];

module.exports = {
    client: client,
    up: up,
    metrics: metrics,
};

// DOCUMENTATION of queries and their associated metrics (targeted to DBAs)
if (require.main === module) {
    metrics.forEach(function (m) {
        for(let key in m.metrics) {
            if(m.metrics.hasOwnProperty(key)) {
                console.log("--", m.metrics[key].name, m.metrics[key].help);
            }
        }
        console.log(m.query + ";");
        console.log("");
    });

    console.log("/*");
    metrics.forEach(function (m) {
        for (let key in m.metrics) {
            if(m.metrics.hasOwnProperty(key)) {
                console.log("* ", m.metrics[key].name + (m.metrics[key].labelNames.length > 0 ? ( "{" + m.metrics[key].labelNames + "}") : ""), m.metrics[key].help);
            }
        }
    });
    console.log("*/");
}