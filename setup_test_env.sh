#!/bin/bash

# BROWSERSTACK_USERNAME
if [ ! -n "${BROWSERSTACK_USERNAME}" ]; then
  echo -n "BrowserStack User: ";
  read BROWSERSTACK_USERNAME
  export BROWSERSTACK_USERNAME
fi

# BROWSERSTACK_ACCESS_KEY
if [ ! -n "${BROWSERSTACK_ACCESS_KEY}" ]; then
  echo -n "BrowserStack Key: ";
  read BROWSERSTACK_ACCESS_KEY
  export BROWSERSTACK_ACCESS_KEY
fi

# SELENIUM_PROMISE_MANAGER
if [ ! -n "${SELENIUM_PROMISE_MANAGER}" ]; then
  echo "Disabling Selenium promise manager.";
  export SELENIUM_PROMISE_MANAGER=0
fi

# PROXY
if [ ! -n "${PROXY}" ]; then
  echo -n "Proxy you want to use: ";
  read PROXY
  if [ ! -n "${PROXY}" ]; then
    export PROXY
  fi
fi

# TESTING_HOST
if [ ! -n "${TESTING_HOST}" ]; then
  echo -n "Host you want to test: ";
  read TESTING_HOST
  if [ ! -n "${TESTING_HOST}" ]; then
    export TESTING_HOST
  fi
fi
