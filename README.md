# EverYoung_AI_Project
From Skyrim Wu to complete it 
## Purpose
This project aims to

* get candidate up to speed with company’s development environment, programming language, infrastructure setup
* get candidate’s technical skills up to speed with OpenAI’s evolving API and features
* help candidate to understand the best practice of LLM programming, particularly handling inconsistency, hallucination etc

## Goal
Write an AWS Lambda that match a human name in a list of human names.

## Example
### With a list of user names
* David Smith 大卫 斯密斯
* Yueling Zhang 月林张
* Huawen Wu 华文吴
* Annie Lee 李安妮

### Given user’s input
* 吴华文 or Wu HuaWen，

### Find the match
* Huawen Wu 华文吴
  

## Acceptance Criteria
* code the lambda in TypeScript
* deploy the lambda in AWS cloud
* the lambda is testable in Postman
* ideally, the lambda can return the best matched name consistently

## Deployment options
* manual deployment of zip file
* AWS CDK cli

## Out of scope
security
