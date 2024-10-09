import React from 'react'
import "./About.css"
import Button from 'react-bootstrap/esm/Button'

const About = () => {
    return (
        <div className='about d-flex justify-content-center align-items-center'>
            <div className="container ">
                <div className='d-flex'>
                    <h1 > About Us</h1>
                </div>
                <p >At QuickList, we believe that organization is essential for achieving your goals and maximizing productivity. Our Todo app is designed to help you manage tasks effortlessly, allowing you to focus on what matters most. With an intuitive interface, you can easily create, prioritize, and track your tasks, ensuring your to-do list reflects your unique workflow.No matter the complexity of your schedule, QuickList offers powerful features to keep you on top of your responsibilities.
                    <br />
                    <br />
                    QuickList offers powerful features to keep you organized, including reminders for deadlines and flexible sorting options to view tasks by priority. Whether managing personal errands or professional projects, QuickList streamlines your workflow. Join our community of users and take control of your tasks today, unlocking your potential for a more organized and fulfilling life!
                    </p>
                <Button>Create Todo</Button>
            </div>
        </div>
    )
}

export default About
