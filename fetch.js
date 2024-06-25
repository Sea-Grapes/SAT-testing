try {
  fetch(`https://sat-admin-dates.collegeboard.org/`).then(res => res.json()).then(sessions => {
    data = {}

    sessions.forEach(({
      eventFormattedDate: dateAPI,
      eventDisplayDate: displayDate,
    }) => {
      fetch(`https://aru-test-center-search.collegeboard.org/prod/test-centers?date=${dateAPI}&zip=${zipInput.value}&country=US`)
      .then(res => res.json())
      .then(schools => {
        schools = schools
        .filter(school => school.distance <= distanceInput.value)
        .filter(school => school.seatAvailability)
        .map(({
          name,
          address1, city, state, zip,
          distance
        }) => [
          capitalize(name),
          `${capitalize(address1)} ${capitalize(city)} ${state.toUpperCase()} ${zip}`,
          distance.toFixed(2)
        ])
        data[displayDate] = schools
      })
    })
  })
} catch(e) { log('Error with CollegeBoard API')}


async function fetchData() {
  const res = await fetch(`https://sat-admin-dates.collegeboard.org/`)
  let sessions = await res.json()

  sessions = await Promise.all(sessions.map(({
    eventFormattedDate: dateAPI,
    eventDisplayDate: displayDate,
  }) => fetch(`https://aru-test-center-search.collegeboard.org/prod/test-centers?date=${dateAPI}&zip=${zipInput.value}&country=US`))) 

  console.log(sessions)
}