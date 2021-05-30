# Решение задания "Шестеренка"

Скрипт parser.py парсит метрики со страницы http://c2-217-73-58-127.elastic.cloud.croc.ru:8680/RTDM/PoolDiagnostics.jsp по расписанию cron и сохраняет метрики в MSSQL [db_Team7].[RTDM_TECH].[METRICS]. При помощи Prometheus Exporter - Prometheus собирает и отдаёт для визуализации в Grafana. Серверы развернуты на платформе виртуализации docker.

## Grafana
http://gpbhack.ineutov.me:3000/ (Логин/Пароль: admin/admin)

## Prometheus
http://gpbhack.ineutov.me:9090/graph

## Prometheus Exporter for MSSQL
http://gpbhack.ineutov.me:4000/metrics
