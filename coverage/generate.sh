#!/usr/bin/env bash

# Make sure to install jscoverage
# https://github.com/visionmedia/node-jscoverage

jscoverage lib lib-cov
TEST_COV=1 mocha -R html-cov > coverage/coverage.html
rm -rf lib-cov

echo "open ./coverage/coverage.html in your browser to view the coverage report"