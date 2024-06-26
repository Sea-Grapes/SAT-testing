# SAT Testing Lookup
A simple webpage to easily check where/when you can take the SAT. Uses the CollegeBoard API to find locations, currently only works for the US.

## Features
- Input zip code to search around the area
- Maximum distance (miles) to limit search region
- Schedules API fetches every x hours (prevent CollegeBoard API from becoming angry).
- Links to google map school location
- Better organization (maybe)

## Why?
The CollegeBoard search page requires you to manually look through each test day rather than displaying everything at once. Centralized searching helps prevent students from missing out on new available sessions.

## Notes
Lots of inefficiencies and potential bugs but idc lol. Data managing turned into a mess, still uses tailwind playcdn, and no ui framework... but its whatever. Maybe will remake in the future