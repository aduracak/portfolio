import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { Calendar, MapPin, GraduationCap, Code, Heart } from 'lucide-react'

const SkillBar = ({ skill, percentage, delay = 0 }) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        setAnimatedPercentage(percentage)
      }, delay)
    }
  }, [isInView, percentage, delay])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <span className="text-dark-50 font-medium">{skill}</span>
        <span className="text-primary-500 font-bold">{animatedPercentage}%</span>
      </div>
      <div className="h-3 bg-dark-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${animatedPercentage}%` }}
          transition={{ duration: 1.5, delay: delay / 1000, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  )
}

const TimelineItem = ({ year, title, description, icon: Icon, isLast }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative flex gap-6"
    >
      {/* Timeline line and dot */}
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full shadow-lg">
          <Icon className="w-6 h-6 text-white" />
        </div>
        {!isLast && (
          <div className="w-px h-16 bg-gradient-to-b from-primary-500 to-transparent mt-4" />
        )}
      </div>
      
      {/* Content */}
      <div className="flex-1 pb-12">
        <div className="bg-dark-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 bg-primary-500 text-white text-sm font-medium rounded-full">
              {year}
            </span>
            <h3 className="text-xl font-heading font-semibold text-dark-50">
              {title}
            </h3>
          </div>
          <p className="text-dark-300 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const skills = [
    { name: "JavaScript", percentage: 90 },
    { name: "React", percentage: 85 },
    { name: "HTML/CSS", percentage: 95 },
    { name: "Node.js", percentage: 80 },
    { name: "Python", percentage: 75 },
    { name: "C++", percentage: 70 }
  ]

  const timeline = [
    {
      year: "2024",
      title: "Advanced Web Development",
      description: "Mastering modern frameworks like React, exploring Three.js for 3D web experiences, and building full-stack applications with Node.js and databases.",
      icon: Code
    },
    {
      year: "2023",
      title: "Software Engineering Studies",
      description: "Started my journey at International University of Sarajevo, diving deep into computer science fundamentals, algorithms, and software design principles.",
      icon: GraduationCap
    },
    {
      year: "2022",
      title: "Web Development Journey",
      description: "Began learning web development, starting with HTML, CSS, and JavaScript. Built my first interactive websites and discovered my passion for creating digital experiences.",
      icon: Heart
    }
  ]

  return (
    <section id="about" ref={ref} className="py-20 bg-dark-800/30">
      <div className="container-width section-padding">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark-50 mb-6">
              About <span className="text-gradient">Me</span>
            </h2>
            <p className="text-xl text-dark-300 max-w-3xl mx-auto leading-relaxed">
              Passionate about crafting digital experiences that merge creativity with functionality
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Personal Info & Description */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="bg-dark-800 rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-heading font-semibold text-dark-50 mb-6">
                  Get to Know Me
                </h3>
                
                <div className="space-y-6 text-dark-300 leading-relaxed">
                  <p>
                    I'm a passionate Software Engineering student at the International University of Sarajevo, 
                    dedicated to creating innovative digital solutions that make a difference. My journey in 
                    technology started with curiosity and has evolved into a deep love for building 
                    user-centered applications.
                  </p>
                  
                  <p>
                    When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
                    projects, or learning about the latest trends in web development. I believe in the power 
                    of clean code, thoughtful design, and continuous learning.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary-500" />
                    <span className="text-dark-300">Sarajevo, Bosnia</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-primary-500" />
                    <span className="text-dark-300">Software Engineering</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary-500" />
                    <span className="text-dark-300">Available for work</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-primary-500" />
                    <span className="text-dark-300">Web Development</span>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div className="bg-dark-800 rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-heading font-semibold text-dark-50 mb-6">
                  Technical Skills
                </h3>
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <SkillBar
                      key={skill.name}
                      skill={skill.name}
                      percentage={skill.percentage}
                      delay={index * 200}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div variants={itemVariants} className="space-y-8">
              <h3 className="text-2xl font-heading font-semibold text-dark-50 text-center lg:text-left">
                My Journey
              </h3>
              
              <div className="space-y-0">
                {timeline.map((item, index) => (
                  <TimelineItem
                    key={index}
                    {...item}
                    isLast={index === timeline.length - 1}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About