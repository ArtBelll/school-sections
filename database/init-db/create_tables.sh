#!/bin/bash
cat database/init-db/data.sql | sqlite3 data.db
