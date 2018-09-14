#!/bin/bash
cat database/data.sql | sqlite3 data.db
