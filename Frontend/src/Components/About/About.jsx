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
                <p >TaskScribe redefines digital productivity by combining traditional task management with visual brainstorming capabilities. Our hybrid platform enables seamless transition between detailed text entries and freeform sketches, catering to both analytical thinkers and creative planners. Designed for professionals, students, and creatives, TaskScribe's dual-input system helps capture complex ideas while maintaining organizational clarity.
                    <br />
                    <br />
                    With advanced features like contextual reminders, multi-format sorting, and instant sketch-to-task conversion, TaskScribe adapts to your cognitive workflow. Whether architecting project timelines, annotating concepts, or managing daily priorities, our platform maintains perfect sync between your textual and visual organizational systems. Join a new era of productivity where structured planning meets creative expression, all within a unified digital workspace.
                    </p>
                <Button>Launch Workspace</Button>
            </div>
        </div>
    )
}

export default About
