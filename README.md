<p align="center">
  <img src="https://utfs.io/f/d0b7e9b5-b512-42d5-b387-133d1f18f9d2-1x5rt.png" width="100" alt="project-logo">
</p>
<p align="center">
    <h1 align="center">t3twilio</h1>
</p>
<p align="center">
    <em>Empowering seamless communication, one code line at a time.</em>
</p>
<p align="center">
	<a href="https://opensource.org/license/mit/">
    <img src="https://img.shields.io/github/license/eli64s/readme-ai?logo=opensourceinitiative&logoColor=white&label=License&color=0080ff"
    alt="license">
  </a>
	<img src="https://img.shields.io/github/languages/top/dhruvbansal26/t3twilio?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/dhruvbansal26/t3twilio?style=default&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
	<!-- default option, no dependency badges. -->
</p>

## Overview

The t3twilio project integrates Twilios communication capabilities, enabling users to set call reminders through the Notion interface.

---

## Demo

(insert video)

---

## Features

|     | Feature           | Description                                                                                                                                                                                                                                                                 |
| --- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ⚙️  | **Architecture**  | The project has a modular architecture leveraging Next.js for frontend, FastAPI and Python backend for server-side logic. It uses Twilio for SMS/voice and integrates with Notion API for task management. Environment variables are managed for configuration flexibility. |
| 🔩  | **Code Quality**  | The codebase follows TypeScript for type safety, ESLint for linting, and Prettier for code formatting. It maintains consistent coding styles across components and enforces best practices.                                                                                 |
| 📄  | **Documentation** | The repository contains detailed inline comments, configuration files, and README documentation. It explains setup instructions, code structure, and functionality to onboard developers effectively.                                                                       |
| 🔌  | **Integrations**  | Key integrations include Twilio, Notion API, and Cloudflare AI Workers API.                                                                                                                                                                                                 |
| 🧩  | **Modularity**    | The codebase is structured into reusable components and utilities for enhanced maintainability. It separates concerns between frontend and backend, enabling easy scalability and extension of features.                                                                    |

---

## Modules

<details closed><summary>src.app._utils</summary>

| File                                                                                                      | Summary                                                                                                                                                                                                                                                                                                                       |
| --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [twilioHelpers.ts](https://github.com/dhruvbansal26/t3twilio/blob/master/src/app/_utils/twilioHelpers.ts) | Facilitates automated call initiation and scheduling follow-up actions via Twilio API. Integrates with Node.js scheduler and Axios for API calls. Key features include dynamic call content and scheduled follow-up tasks based on specified contact information. Also includes helper function that handles email reminders. |

</details>

<details closed><summary>src.app.privacy</summary>

| File                                                                                       | Summary                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [page.tsx](https://github.com/dhruvbansal26/t3twilio/blob/master/src/app/privacy/page.tsx) | Defines PrivacyPage component rendering a minimal UI for the privacy page. Displays a centered flex container with default styling, serving as a key visual element within the applications interface. |

</details>

<details closed><summary>src.app.terms</summary>

| File                                                                                     | Summary                                                                                                                                                            |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [page.tsx](https://github.com/dhruvbansal26/t3twilio/blob/master/src/app/terms/page.tsx) | Defines a React component rendering the TermsPage view, adding a white background with black text and centering content vertically and horizontally on the screen. |

</details>

<details closed><summary>src.app.actions</summary>

| File                                                                                       | Summary                                                                                                                    |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| [index.ts](https://github.com/dhruvbansal26/t3twilio/blob/master/src/app/actions/index.ts) | Handles authentication callback by fetching Notion API, saving credentials to the database, and returning response status. |

</details>

<details closed><summary>src.app.callback</summary>

| File                                                                                        | Summary                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [page.tsx](https://github.com/dhruvbansal26/t3twilio/blob/master/src/app/callback/page.tsx) | Enables authentication callback handling with message display and loading animation, enhancing user experience in the React-based app. Uses `authCallback` to process authentication code, updating message accordingly. |

</details>

<details closed><summary>api.gather</summary>

| File                                                                                          | Summary                                                                                                                                                                                    |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [route.ts](https://github.com/dhruvbansal26/t3twilio/blob/master/src/app/api/gather/route.ts) | Handles POST requests, parsing and processing Twilio voice responses to update task status. Parses request body, checks user input, sends status update request, and returns XML response. |

</details>

<details closed><summary>api.get-task</summary>

| File                                                                                            | Summary                                                                                                                                                                                               |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [route.ts](https://github.com/dhruvbansal26/t3twilio/blob/master/src/app/api/get-task/route.ts) | Retrieves task details from the database based on the bot_id, then queries Notion API to fetch specific information. Subsequently, initiates a job by sending a POST request with the retrieved data. |

</details>

<details closed><summary>api.schedule-task</summary>

| File                                                                                                 | Summary                                                                                                                                                                                                                                |
| ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [route.ts](https://github.com/dhruvbansal26/t3twilio/blob/master/src/app/api/schedule-task/route.ts) | Defines voice interaction for scheduling tasks via Twilio, utilizing NGROK for API connection. Generates a response prompting users to speak task details, followed by processing and returning XML response for server communication. |

</details>

<details closed><summary>api.add-task</summary>

| File                                                                                            | Summary                                                                                                                                                                                                               |
| ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [route.ts](https://github.com/dhruvbansal26/t3twilio/blob/master/src/app/api/add-task/route.ts) | Handles adding a task via AI text analysis, sending extracted details to a database, and responding with TwiML message via Twilio API. Parses request body, runs AI model, and extracts task information for storage. |

</details>

<details closed><summary>api.initiate-job</summary>

| File                                                                                                | Summary                                                                                                                                                                                                               |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [route.ts](https://github.com/dhruvbansal26/t3twilio/blob/master/src/app/api/initiate-job/route.ts) | Initiates job scheduling and AI processing for cloud-based reminders. Parses time data, triggers calls, and sends reminder messages. Handles API requests, utilizing environment variables for secure authentication. |

</details>

<details closed><summary>api.follow-up</summary>

| File                                                                                             | Summary                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [route.ts](https://github.com/dhruvbansal26/t3twilio/blob/master/src/app/api/follow-up/route.ts) | Implements follow-up call initiation with Twilio, prompting user input through speech, capturing response, and redirecting. Key functions include setting up the call, defining user prompts, and handling responses, enhancing user engagement and interactivity. |

</details>

<details closed><summary>src.server.python_backend</summary>

| File                                                                                               | Summary                                                                                                                                                                                                                                        |
| -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [main.py](https://github.com/dhruvbansal26/t3twilio/blob/master/src/server/python_backend/main.py) | Enables updating task status and adding tasks in Notion database via FastAPI routes. Utilizes Notion API for CRUD operations and handles errors gracefully. Supports dynamic task properties and authentication through environment variables. |

</details>

<details closed><summary>src.server.db</summary>

| File                                                                                       | Summary                                                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [schema.ts](https://github.com/dhruvbansal26/t3twilio/blob/master/src/server/db/schema.ts) | Defines a database schema for tokens in t3twilio, using Drizzle ORMs multi-project schema feature. It includes fields for bot ID, access token, user ID, template ID, workspace ID, and creation timestamp with timezone. |
| [index.ts](https://github.com/dhruvbansal26/t3twilio/blob/master/src/server/db/index.ts)   | Establishes database connection caching for development to improve Hot Module Replacement. Initializes a database connection with schema and environment setup using drizzle-orm/postgres-js and postgres libraries.      |

</details>

---

## Getting Started

Checkout .env.example file for API keys.

### Installation

<h4>From <code>source</code></h4>

> 1. Clone the t3twilio repository:
>
> ```console
> $ git clone https://github.com/dhruvbansal26/t3twilio
> ```
>
> 2. Change to the project directory:
>
> ```console
> $ cd t3twilio
> ```
>
> 3. Install the dependencies:
>
> ```console
> $ pnpm install
> ```

### Usage

<h4>From <code>src</code></h4>

> Run t3twilio using the commands below:
>
> ```console
> $ pnpm dev
> ```
>
> ```console
> $ ngrok http --domain=anemone-central-aardvark.ngrok-free.app 3000
> ```

<h4>From <code>src/server/python_backend</code></h4>

> ```console
> $ uvicorn main:app --reload --port 8080
> ```

---

## Project Roadmap

This is to be implemented as we progress the development of the integration.

- [ ] Implement SMS & WhatsApp reminder capabilities.
- [ ] Allow user to choose frequency of the reminder.
- [ ] Have an end date for the reminder automation.

---

## Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Report Issues](https://github.com/dhruvbansal26/t3twilio/issues)**: Submit bugs found or log feature requests for the `t3twilio` project.
- **[Submit Pull Requests](https://github.com/dhruvbansal26/t3twilio/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/dhruvbansal26/t3twilio/discussions)**: Share your insights, provide feedback, or ask questions.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/dhruvbansal26/t3twilio
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="center">
   <a href="https://github.com{/dhruvbansal26/t3twilio/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=dhruvbansal26/t3twilio">
   </a>
</p>
</details>
