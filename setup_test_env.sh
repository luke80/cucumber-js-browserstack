#!/bin/bash

DODOTENV=${1:-true}
DOTENVPATH='./'
if [ -d "tests" ]; then
  DOTENVPATH='./tests/'
fi

if [ "${DODOTENV}" = "true" ]; then
  if [ -f "${DOTENVPATH}.env" ]; then
    echo "There is already a .env file at your path (${DOTENVPATH}.env). Delete it or move it before running this script." >&2
    exit 1
  fi
  echo -e "Creating .env file with your input\n"
fi

commands=() # initialize the variable setting commands
variables=("BROWSERSTACK_USERNAME=%s" "BROWSERSTACK_ACCESS_KEY=%s" "TESTING_HOST=%s" "SELENIUM_PROMISE_MANAGER=0" "(optional) PROXY=%s")
for v in "${variables[@]}"
do
  name=$(echo "${v}" | cut -d= -f1)
  variable=${name/\(optional\) /}
  if [[ "${v}" == *"=%s"* ]]; then
    #prompt="${name//_/ }"
    echo -n "${name}="
    read input
    if [[ "${v}" != *"(optional)"* ]] || ([[ "${v}" == *"(optional)"* ]] && [ -n "${input}" ]); then
      v=${v/\(optional\) /}
      v=${v/\%s/$input}
      commands+=(${v})
    fi
  else
    commands+=(${v})
  fi
done

if [ ${#commands[@]} -gt 0 ]; then
  if [ "${DODOTENV}" = "true" ]; then
    command=$(printf "\n%s" "${commands[@]}")
    command=${command:1} # remove the leading '\n'
    echo -e "${command}" > "${DOTENVPATH}.env"
  else
    glue=" && export "
    command=$(printf "${glue}%s" "${commands[@]}")
    command=${command:${#glue}} # remove the leading glue

    echo "Run this command chain:"
    echo "export ${command}"
  fi
fi
