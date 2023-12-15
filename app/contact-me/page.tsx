import React from 'react'

const ContactMe = () => {
  return (
    <>
      <div className='w-full py-8'>
        <div className='max-w-5xl h-screen mx-auto'>
          {/* Google Calendar Appointment Scheduling begin */}
          <iframe src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0sKX_f3sdmknsuWO5J1QnYAUPwLwOSJvZVjviJJzgsktfnjf30lMhvIJrLHoIwYJOGaf6LTKNA?gv=true"
            className="w-full h-full border-none"
          ></iframe>
          {/* end Google Calendar Appointment Scheduling */}
        </div>
      </div>
    </>
  )
}

export default ContactMe