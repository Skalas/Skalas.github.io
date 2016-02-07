---
layout: post
title: "Chronos, Cron. "
description: ""
category: Automating
header-img: "img/post-bg-02.jpg"
tags: [ubuntu, automation, cron]
date: 2016-02-06 12:00:00
permalink: related
comments: True
author: Miguel Escalante
---

If you are working with data, chances are that you need to do a certain set of tasks periodically; whether its your daily report, daily cleaning of the incoming database, you don't have to waste time running them everyday. The procedure I'm about to describe is very rudimentary, there are simpler tools to achieve this but from my opinion those tools are a big overkill to the task. 

Cron is a tool for Unix-like operative systems that automatically triggers processes at a given time frame. It uses jobs that each user installs individually and then deppending on the times set, it will run them accordingly.


* * * * * whoami > /tmp/weeeee.log


In order to use it you only need the script or the command you want to run. For the first example I had a question regarding cron:

Q: If its automatic then who runs it? 
A: The user that installed the cronjob. 

