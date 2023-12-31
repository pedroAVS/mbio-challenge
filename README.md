# MBio Tech Challenge

This project is a test automation framework for the Mbio Tech Challenge. 

It was built with Node.js and uses the WebdriverIO testing tool.

## Personal notes

The test is running fine for chrome, for firefox sometimes it struggle to deal with the loader wheel. 
With more time I would focus on making all the element interactions more robust, I would use the test.sh to test the performance of the test, by measuring the fail rate.
I was hoping to also execute some tests directly on mobile browsers, and for that I though of using saucelabs, however I'm unable to use it with WebDriverIO without an enterprise account.

The selection of viewport was based on this site: [stat counter](https://gs.statcounter.com/screen-resolution-stats/desktop/worldwide). 1920x1080 is the most used desktop screen resolution. 

## Prerequisites

- Node.js 20.10.0
- npm 10.2.5

## Quick Setup

Clone the repository:

```
git clone git@github.com:pedroAVS/mbio-challenge.git
```

To set up the project, run the following commands:

```shell
chmod +x setup.sh
./setup.sh
```
This will install Node.js, npm, and the project dependencies.

## Running the tests locally

```
npm run wdio
```
generate the report:
```
allure generate && allure open
```
## Running the test on Docker
By encapsulating the test suite into a container that behaves the same on every system, we can avoid flakiness due to different browser or platform versions.
Make sure docker is installed and the docker is running, then do:
```
docker build -t mytest -f Dockerfile .
docker run -it mytest
```
## Running the test on SauceLabs
Note: WebdriverIO Integration is currently limited to Enterprise customers, so I wasn't able to verify if it was working properly
[More here](https://docs.saucelabs.com/visual-testing/integrations/webdriverio/)
```
npm run wdio-sauce
```
## Running the tests on GitActions

Currently the tests will execute on push and pull requests to the Main repository. Report artifacts are made available, as well as an Allure report served on a github page (check the latest pages-build-deployment for the link of the page).

The workflow can be triggered manually by accessing "Run Tests and Publish Report" workflow and clicking on "Run workflow"

[Click here](https://pedroavs.github.io/mbio-challenge) to verify the report

## Project Structure
```
mbio-challenge
├── .github
│   └── workflows
│       └── TASK_3    
├── configs
├── src
│   ├── components
│   ├── pages
│   ├── tests
│   └── utils
└── TASK_1
```
