# Решение задания "Шестеренка"

Для парсинга метрик со страницы http://c2-217-73-58-127.elastic.cloud.croc.ru:8680/RTDM/PoolDiagnostics.jsp был написан скрипт parser.py, который запускается по расписанию cron и сохраняет метрики в MSSQL [db_Team7].[RTDM_TECH].[METRICS]. При помощи интеграции Prometheus Exporter - Prometheus собирает метрики из MSSQL и отдаёт для визуализации в Grafana. Серверы развернуты на платформе виртуализации docker.

## Grafana
http://gpbhack.ineutov.me:3000/ (Логин/Пароль: admin/admin)

## Prometheus
http://gpbhack.ineutov.me:9090/graph

## Prometheus Exporter for MSSQL
http://gpbhack.ineutov.me:4000/metrics
