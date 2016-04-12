---
layout: post
title: "Chronos, Cron. "
description: ""
category: Automating
header-img: "img/post-bg-02.jpg"
tags: [ubuntu, automation, cron]
date: 2016-02-06 12:00:00
permalink: cron
comments: True
author: Miguel Escalante
---

If you are working with data, chances are that you need to do a certain set of tasks periodically; whether its your daily report, daily cleaning of the incoming database, you don't have to waste time running them everyday. The procedure I'm about to describe is very rudimentary, there are simpler tools to achieve this but from my opinion those tools are a big overkill to the task. 

Cron is a tool for Unix-like operative systems that automatically triggers processes at a given time frame. It uses jobs that each user installs individually and then deppending on the times set, it will run them accordingly.

I had a question regarding cron:

Q: If its automatic then who runs it? 
A: The user that installed the cronjob. 

So this is where my first example derives, in order to answer the question I made a cronjob that would log into a file the username of the cronjob "runner". To install such cronjob you just have to run:

	crontab -e

The first time it might ask you what text editor you want to set as default, nano is usually the simplest choice; so just type the number for your desired editor and press enter. Now you will be promted with the chosen editor and the following text is by deffault there:

    # Edit this file to introduce tasks to be run by cron.
    #
    # Each task to run has to be defined through a single line
    # indicating with different fields when the task will be run
    # and what command to run for the task
    #
    # To define the time you can provide concrete values for
    # minute (m), hour (h), day of month (dom), month (mon),
    # and day of week (dow) or use '*' in these fields (for 'any').
    # Notice that tasks will be started based on the cron's system
    # daemon's notion of time and timezones.
    #
    # Output of the crontab jobs (including errors) is sent through
    # email to the user the crontab file belongs to (unless redirected).
    #
    # For example, you can run a backup of all your user accounts
    # at 5 a.m every week with:
    # 0 5 * * 1 tar -zcf /var/backups/home.tgz /home/
    #
    # For more information see the manual pages of crontab(5) and cron(8)
    #
    # m h  dom mon dow   command

Notice that the whole file right now is just comments, nothing actionable yet; but we can read a very useful introduction on to how to use cron. In order to install a cron we just have to add a new line to the file we are edditing, the line has five slots to indicate minute, hour, day of the month and month.

The following line adds a cron that will run every minute, it's a simple command that outputs the user name (`whoami`) to the file `/tmp/weeeee.log`.

	* * * * * whoami > /tmp/weeeee.log

In the folder `/tmp/` every user has permision to write, so that's why I usually use that folder to write the output of scripts. The silly name helps the future me knowing that it the file with the silly name can be safely removed. 