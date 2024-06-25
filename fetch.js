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

async function test() {

  data = {}

  let sessions = await (await fetch(`https://sat-admin-dates.collegeboard.org/`)).json()

  log('Recieved testing dates, scanning for sessions')

  await Promise.all(sessions.map( async({
    eventFormattedDate: dateAPI,
    eventDisplayDate: displayDate,
  }) => {
    let schools = await (await fetch(`https://aru-test-center-search.collegeboard.org/prod/test-centers?date=${dateAPI}&zip=${zipInput.value}&country=US`)).json()
    console.log(schools)
    schools = schools
    .filter(school => school.distance <= distanceInput.value)
    .filter(school => school.seatAvailability)
    .map(({
      name, distance,
      address1, city, state, zip,
    }) => [
      capitalize(name),
      `${capitalize(address1)} ${capitalize(city)} ${state.toUpperCase()} ${zip}`,
      distance.toFixed(2)
    ])
    data[displayDate] = schools
    log(`Added schools from ${dateAPI} to data`)
  })) 

  log('Finished fetching data')
  
}