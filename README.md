![tthk logo](https://github.com/marcusdotn/tthk-api/blob/main/src/api/docs/public/tthk_logo.png?raw=true)

# TTHK Timetable API

This is an unofficial, open source API to retrieve public timetable related information for
Tallinn Industrial Education Center

Timetable data is fetched from EduPage's public endpoints at configurable intervals and interpreted to make it easier to work with without being authenticated

All endpoints in this API are automatically generated using [swagger-autogen](https://swagger-autogen.github.io/) with short summaries to explain what they do.
The documentation is viewable upon running the server

You might notice that the documentation includes ApiKey authentication but that's not the case yet, though it will likely be implemented in the future.

## Usage

### Installation

#### Required dependencies

- **[bun](https://bun.sh)**

#### Instructions

- Clone the repository

  ```bash
  git clone https://github.com/marcusdotn/tthk-api.git
  ```

- Enter the directory

  ```bash
  cd tthk-api
  ```

- Install dependencies

  ```bash
  bun i
  ```

- Run the server

  ```bash
  bun start
  ```

- Test if everything works

  ```bash
  $ curl localhost:5637/api/timetable/928/classes?name=TARpe22
  ```
