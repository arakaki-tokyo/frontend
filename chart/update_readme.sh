#!/bin/bash

ls -1d */ | sed -E 's/^(.+)$/## [\1](\1)/' > README.md
