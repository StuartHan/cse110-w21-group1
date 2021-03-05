# Site Additional Features

* Status: Accepted
* Deciders: Everyone is present
* Date: 2021-03-02

## Context and Problem Statement

The Teams feature will be implemented by Suk Chan (Kevin) Lee, but we're not sure what we should include in that feature so that it is minimally attention stealing
yet a nice feature for teams to have.

## Decision Drivers
1. Teams feature should be discreet - people who don't want to use it may just ignore it easily.
2. Features shouldn't be cluttered - interface and options given should remain intuitive and clear
3. People should be able to login into accounts or create their own account.

## Considered Options

1. Teams that consist of Admins and users - Admins may start a synchronized timer for the team
2. Ability to add users to a team by an invite link or code.
3. Teams should have their own statistics page so that they can keep track of what they did.
4. Messaging feature?

## Decision Outcome

Option 4 seems like a bit much - this might be either too distacting or something too far away from what our app is supposed to be.
We'll stick to mostly Options 1 and 2 since they'll be a core part of the teams feature. Option 3 will be a last priority since it's
not required to create a team.

### Positive Consequences

- More incentive for users to use the app and stick with it.
- Gives users the option of cooperating as a team with a leader(s)
- Retains full usability of the web application while also increasing communication levels.

### Negative Consequences

- We'll need to put the features in that they don't impact the users experience with the app and also find a way to synchronize the timers.