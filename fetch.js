fetch(`https://sat-admin-dates.collegeboard.org/`).then(res => res.json()).then(days => {
  days = days.map(e => e.eventFormattedDate)
  window.days = days
  console.log(days)

  days.forEach(day => fetch(`https://aru-test-center-search.collegeboard.org/prod/test-centers?date=${day}&zip=98075&country=US`))
})
.catch(e => alert('Error with CollegeBoard API'))